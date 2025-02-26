<template>
  <li :style="{ textIndent: `${item.depth}rem` }" class="my-6px color-#73828c">
    <a
      :href="`#${item.id}`"
      class="w-full overflow-hidden whitespace-nowrap text-ellipsis"
      >{{ item.text }}</a
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
