<template>
  <n-icon @click="show" class="mr-8px" size="20" color="#94a3b8"
    ><SearchCircleOutline
  /></n-icon>
  <n-modal
    v-model:show="showSearchModel"
    :show-icon="false"
    preset="dialog"
    :mask-closable="false"
    @after-leave="searchValue = ''"
  >
    <template #header>
      <div>全站搜索</div>
    </template>
    <div class="relative">
      <n-input
        :class="arctive ? 'article' : ''"
        v-model:value="searchValue"
        placeholder=""
        clearable
      ></n-input>
      <span
        class="absolute z-99 position-top-[6px] position-left-12px transition-all-500"
        >文章标题或简介</span
      >
    </div>
    <div class="search-result">
      <div
        v-for="item in result"
        class="hover:bg-zinc-100 .dark:hover:bg-zinc-600 cursor-pointer py-1 flex items-center"
        @click="routeTo(item)"
      >
        <Button severity="secondary" variant="text" rounded>
          <Icon name="icon-park-outline:read-book"></Icon>
        </Button>
        <span class="text-truncate cursor-pointer">{{ item.item.title }}</span>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { SearchCircleOutline } from "@vicons/ionicons5";
import Fuse from "fuse.js";

const showSearchModel = ref(false);
const searchValue = ref("");
const arctive = ref(false);
const fuse = ref();
const result = ref<any>([]);

const initSections = async () => {
  const { data, error } = await useAsyncData(
    "search-full-text",
    () => queryCollectionNavigation("blog", ["description"]),
    { lazy: true }
  );
  console.log(data.value, "data");
  if (data.value) {
    fuse.value = new Fuse(data.value[0]?.children as any, {
      ignoreLocation: true,
      includeMatches: true,
      threshold: 0.3,
      minMatchCharLength: 1,
      keys: ["title", "description"],
    });
    console.log(fuse.value, "fuse");
  }
};
const search = (value: string) => {
  if (value) {
    arctive.value = true;
  } else {
    arctive.value = false;
  }
};

const show = () => {
  showSearchModel.value = true;
  initSections();
};

watch(searchValue, () => {
  result.value = fuse.value.search(toValue(searchValue)).slice(0, 10);
  search(searchValue.value);
  console.log(result.value, "result");
});

const routeTo = (item: any) => {
  searchValue.value = "";
  navigateTo(item.item.path);
  showSearchModel.value = false;
};

onUnmounted(() => {
  fuse.value = null;
});
</script>

<style lang="less" scoped>
.n-input--focus + span {
  top: -10px;
  background: var(--n-color);
  font-size: 12px;
}
.article + span {
  top: -10px;
  background: var(--n-color);
  font-size: 12px;
}

:deep(.n-input__state-border) {
  box-shadow: none !important;
}
</style>
