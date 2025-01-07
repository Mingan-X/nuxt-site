<template>
  <!-- PC端 -->
  <div class="flex items-center py-4 px-12">
    <Logo />
    <n-menu
      router
      class="mx-auto w-fit! text-16px"
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
    />
    <ColorMode />
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
} from "@vicons/ionicons5";
import { RouterLink } from "vue-router";

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
            name: "about",
          },
        },
        { default: () => "About" }
      ),
    key: "About",
    icon: renderIcon(PersonOutline),
  },
];
</script>

<style scoped lang="less">
.n-menu.n-menu--horizontal {
  :deep(.n-menu-item-content::before) {
    display: initial !important;
  }
}
</style>
