<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <!-- 首页加载全屏动画 -->
    <FullLoading v-if="isFullLoading" />
    <NuxtLayout>
      <!-- 在页面导航之间显示一个进度条 -->
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
    <ParticlesBg />
  </n-config-provider>
</template>

<script setup lang="ts">
import themeOverrides from "@/utils/theme";

const nuxtApp = useNuxtApp();
// 是否首次加载
const isFullLoading = ref(true);
nuxtApp.hook("page:start", () => {
  isFullLoading.value = true;
});
nuxtApp.hook("page:finish", () => {
  isFullLoading.value = false;
});
</script>
