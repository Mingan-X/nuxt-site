<template>
  <div class="w-100%">
    <template v-if="!$route.meta.hideParent">
      <div class="grid md:cols-2 gap-5">
        <n-card class="w-80vw md:w-45vw" v-for="item in articles" hoverable>
          <template #header>
            <span
              class="cursor-pointer hover:underline"
              @click="$router.push(item.path)"
              >{{ item.showTitle }}</span
            >
          </template>
          <template #footer>
            <span>{{ formatDate(item.date) }}</span>
            <span
              v-if="checkUpdate(item.lastmod || item?.meta?.lastmod, item.date)"
              >|</span
            >
            <span>{{
              checkUpdate(item.lastmod || item?.meta?.lastmod, item.date)
                ? updateDateFromNow(item.lastmod || item?.meta?.lastmod) +
                  "更新"
                : ""
            }}</span>
          </template>
        </n-card>
      </div>
    </template>
    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
const { formatDate, checkUpdate, updateDateFromNow } = useDayjs();
useHead({
  title: "blog - Jasper",
});

const { data: articles } = await useAsyncData(useRoute().path, () => {
  return queryCollection("blog").all();
});
console.log(articles);
</script>

<style scoped lang="less"></style>
