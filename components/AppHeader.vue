<template>
  <!-- PC端 -->
  <div class="fixed top-0 w-full z-999 backdrop-blur-10px">
    <div class="flex items-center py-4 md:px-12 max-md:px-4">
      <Logo @click="$router.push('/')" class="cursor-pointer" />
      <n-menu
        router
        class="max-md:hidden! mx-auto w-fit! text-16px"
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
      <div class="max-md:flex-1 flex items-center justify-end">
        <n-dropdown trigger="click" :options="menuOptions">
          <n-icon class="md:hidden! mr-8px" :size="26"><Menu /></n-icon>
        </n-dropdown>
        <n-icon
          @click="showSearchModal"
          class="mr-8px"
          size="20"
          color="#94a3b8"
          ><SearchCircleOutline
        /></n-icon>
        <ColorMode />
        <SearchModal ref="searchModal" />
      </div>
    </div>
  </div>
  <!-- 移动端 -->
</template>

<script setup lang="ts">
import type { MenuOption } from "naive-ui";
import { NIcon } from "naive-ui";
import {
  HomeOutline,
  HeartOutline,
  PersonOutline,
  LibraryOutline,
  GridOutline,
  Menu,
  SearchCircleOutline,
} from "@vicons/ionicons5";
import { RouterLink, useRouter } from "vue-router";

console.log(useRouter().getRoutes());

const searchModal = ref();
const activeKey = ref(null);
function renderIcon(icon: Component) {
  return () =>
    h(
      NIcon,
      {
        size: 18,
      },
      { default: () => h(icon) }
    );
}
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "index",
          },
        },
        { default: () => "Home" }
      ),
    key: "Home",
    icon: renderIcon(HomeOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "blog",
          },
        },
        { default: () => "Blog" }
      ),
    key: "Blog",
    icon: renderIcon(LibraryOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "project",
          },
        },
        { default: () => "Projects" }
      ),
    key: "Projects",
    icon: renderIcon(GridOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "favorite",
          },
        },
        { default: () => "Favorite" }
      ),
    key: "Favorite",
    icon: renderIcon(HeartOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "admin",
          },
        },
        { default: () => "Admin" }
      ),
    key: "Admin",
    icon: renderIcon(PersonOutline),
  },
];
const showSearchModal = () => {
  searchModal.value?.show();
};
</script>

<style scoped lang="less">
.n-menu.n-menu--horizontal {
  :deep(.n-menu-item-content::before) {
    display: initial !important;
  }
}
</style>
