<template>
  <div id="article-toc">
    <ul>
      <TocNode v-for="item in toc" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import TocNode from "./TocNode.vue";
interface TocItem {
  id: string;
  text: string;
  depth: number;
  children: TocItem[];
}

defineProps<{
  toc: TocItem[];
}>();
</script>
