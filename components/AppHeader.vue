<template>
  <!-- PC端 -->
  <n-menu
    class="mx-auto w-fit! py-4 text-16px"
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
  />
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
    label: "Home",
    key: "Home",
    icon: renderIcon(HomeOutline),
  },
  {
    label: "Blog",
    key: "Blog",
    icon: renderIcon(LibraryOutline),
  },
  {
    label: "Projects",
    key: "Projects",
    icon: renderIcon(GridOutline),
    children: [
      {
        label: "Project 1",
        key: "Project 1",
      },
      {
        label: "Project 2",
        key: "Project 2",
      },
    ],
  },
  {
    label: "Favorite",
    key: "Favorite",
    icon: renderIcon(HeartOutline),
  },
  {
    label: "About",
    key: "About",
    icon: renderIcon(PersonOutline),
  },
];
</script>

<style scoped lang="less"></style>
