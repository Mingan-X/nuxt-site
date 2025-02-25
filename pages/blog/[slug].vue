<template>
  <ArticleToc class="hidden md:block" :toc="toc" />
  <!-- Render the blog post as Prose & Vue components -->
  <ContentRenderer v-if="post" :value="post" class="prose md" />
</template>

<script setup lang="ts">
definePageMeta({
  hideParent: true,
});

const { data: post } = await useAsyncData(useRoute().path, () => {
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

const { data: surround } = await useAsyncData("foo-surround", () => {
  return queryCollectionSearchSections("blog", {
    ignoredTags: ["code"],
  });
});

console.log(data, "queryCollectionNavigation");
console.log(data1, "queryCollectionItemSurroundings");
console.log(surround, "queryCollectionSearchSections");
console.log(post, "queryCollection");
// @ts-ignore
const toc = buildFullToc(post.value?.body.value) || [];
</script>
