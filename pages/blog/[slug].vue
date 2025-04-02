<template>
  <div id="article_page" class="flex flex-col">
    <ArticleToc
      class="hidden fixed position-right-7xl position-top-[6rem] lg:block w-220px h-[calc(100%-6rem)] overflow-y-auto"
      :toc="toc"
    />
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer v-if="post" :value="post" class="prose md mx-auto" />
    <div
      v-if="surround"
      class="w-full px-4px grid grid-cols-4 gap-4 md:max-w-80ch!"
    >
      <n-card
        @click="$router.push(surround[0]?.path)"
        hoverable
        class="col-span-2 rounded-8px cursor-pointer"
        v-if="surround[0]"
        title="上一篇"
      >
        <p class="w-full text-truncate">{{ surround[0]?.title }}</p>
      </n-card>
      <n-card
        @click="$router.push(surround[1]?.path)"
        hoverable
        class="text-right col-span-2 col-start-3 rounded-8px cursor-pointer"
        v-if="surround[1]"
        title="下一篇"
        ><p class="w-full text-truncate">{{ surround[1]?.title }}</p></n-card
      >
    </div>
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
  title: post.value?.title || post.value?.title,
});

const { data } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("blog", ["title"]);
});

const { data: surround } = await useAsyncData("surround", () => {
  return queryCollectionItemSurroundings("blog", useRoute().path);
});
// @ts-ignore
const toc = buildFullToc(post.value?.body.value) || [];
</script>
<style lang="less" scoped>
:deep(.n-card) > .n-card-header {
  font-size: inherit;
  padding: 10px 24px 0 24px;
}
:deep(.n-card) > .n-card__content {
  padding: 0 24px 10px 24px;
}
</style>
