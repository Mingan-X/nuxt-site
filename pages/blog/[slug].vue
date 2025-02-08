<template>
  <!-- Render the blog post as Prose & Vue components -->
  <ContentRenderer v-if="post" :value="post" />
</template>

<script setup lang="ts">
const { data: post } = await useAsyncData(useRoute().path, () => {
  return queryCollection("blog").path(useRoute().path).first();
});
console.log(post);
</script>
