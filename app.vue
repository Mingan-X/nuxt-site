<template>
  <n-config-provider
    class="h-full"
    v-if="!$colorMode.unknown"
    :theme-overrides="themeOverrides"
    :theme="$colorMode.preference === 'dark' ? darkTheme : null"
  >
    <n-message-provider>
      <!-- 首页加载全屏动画 -->
      <FullLoading v-if="isFullLoading" />
      <NuxtLayout>
        <!-- 在页面导航之间显示一个进度条 -->
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
      <ParticlesBg />
      <n-back-top :right="30" />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import themeOverrides from "@/utils/theme";
import { darkTheme } from "naive-ui";

const theme = ref();
const nuxtApp = useNuxtApp();
// 是否首次加载
const isFullLoading = ref(true);
nuxtApp.hook("page:start", () => {
  isFullLoading.value = true;
});
nuxtApp.hook("page:finish", () => {
  isFullLoading.value = false;
});

// 替换全屏加载为懒加载
const FullLoading = defineAsyncComponent(() => 
  import('~/components/FullLoading/index.vue')
);

// 懒加载粒子背景
const ParticlesBg = defineAsyncComponent(() => 
  import('~/components/ParticlesBg/index.vue')
);
</script>
<style lang="less" scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
