<template>
  <div id="article_page" class="flex">
    <ArticleToc
      class="hidden fixed position-right-7xl position-top-[6rem] lg:block w-220px h-[calc(100%-6rem)] overflow-y-auto"
      :toc="toc"
    />
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer v-if="post" :value="post" class="prose md" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  hideParent: true,
});

const { data: post } = await useAsyncData(`article-${useRoute().path}`, () => {
  return queryCollection("blog").path(useRoute().path).first();
});
useHead({
  title: post.value?.showTitle || post.value?.title,
});

const { data } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("blog");
});

const { data: data1 } = await useAsyncData("surround", () => {
  return queryCollectionItemSurroundings("blog", "/blog/test");
});

console.log(data, "queryCollectionNavigation");
console.log(data1, "queryCollectionItemSurroundings");
console.log(post, "queryCollection");
// @ts-ignore
const toc = buildFullToc(post.value?.body.value) || [];
</script>
