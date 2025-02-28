<template>
  <li
    :style="{ paddingLeft: `${item.depth / 3}rem` }"
    class="my-6px color-#73828c"
  >
    <span
      class="cursor-pointer block overflow-hidden text-nowrap text-ellipsis hover:overflow-visible hover:text-wrap"
      @click="navigateTo(`#${item.id}`, { replace: true })"
      >{{ item.text }}</span
    >
    <ul v-if="item.children.length > 0">
      <TocNode v-for="child in item.children" :key="child.id" :item="child" />
    </ul>
  </li>
</template>

<script setup lang="ts">
interface TocItem {
  id: string;
  text: string;
  depth: number;
  children: TocItem[];
}

defineProps<{
  item: TocItem;
}>();
</script>
