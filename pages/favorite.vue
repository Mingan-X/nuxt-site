<template>
  <div class="container mx-auto px-6 py-12">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        我的收藏
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        收集有趣的网站、工具和资源
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <n-card
        class="border-0 shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-12 text-center">
          <div class="mb-6">
            <n-icon size="64" class="text-gray-300 dark:text-gray-600">
              <HeartOutline />
            </n-icon>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            即将推出
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            正在整理我的收藏夹，包括优秀的设计网站、开发工具、学习资源等。敬请期待！
          </p>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeartOutline } from "@vicons/ionicons5";

useHead({
  title: "favorite - Jasper",
});
</script>

<style scoped lang="less">
:deep(.n-card) {
  border-radius: 12px !important;
  border: none !important;
}

/* Dark theme card styles */
:deep(.dark .n-card) {
  background-color: rgb(31 41 55) !important;
  border-color: rgb(55 65 81) !important;
}
</style>
