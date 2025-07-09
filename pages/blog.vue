<template>
  <div class="container mx-auto px-6 py-12">
    <template v-if="!$route.meta.hideParent">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          技术博客
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          分享前端开发经验、技术思考和学习笔记
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <n-card
          v-for="item in articles"
          class="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700"
          @click="navigateToPost(item.path)"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <n-tag
                type="info"
                class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                size="small"
              >
                {{ getCategory(item) }}
              </n-tag>
              <span
                class="text-sm text-gray-500 dark:text-gray-400 flex items-center"
              >
                <n-icon size="12" class="mr-1"><TimeOutline /></n-icon>
                {{ getReadTime(item) }}
              </span>
            </div>

            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2"
            >
              {{ item?.title }}
            </h3>

            <p
              class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed"
            >
              {{ item?.description || getExcerpt(item) }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4" v-if="item?.tags?.length">
              <n-tag
                v-for="tag in item.tags.slice(0, 3)"
                :key="tag"
                size="small"
                class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <template #icon>
                  <n-icon size="10"><PricetagOutline /></n-icon>
                </template>
                {{ tag }}
              </n-tag>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{
                formatDate(item.date)
              }}</span>
              <div
                class="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm"
              >
                阅读更多
                <n-icon size="12" class="ml-1"><ArrowForwardOutline /></n-icon>
              </div>
            </div>

            <div
              v-if="checkUpdate(item.lastmod || (item?.meta?.lastmod as string | number | Date), item.date)"
              class="mt-2"
            >
              <span class="text-xs text-orange-500 dark:text-orange-400">
                {{
                  updateDateFromNow(
                    item.lastmod ||
                      (item?.meta?.lastmod as string | number | Date)
                  )
                }}更新
              </span>
            </div>
          </div>
        </n-card>
      </div>
    </template>
    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
import {
  TimeOutline,
  PricetagOutline,
  ArrowForwardOutline,
} from "@vicons/ionicons5";

const { formatDate, checkUpdate, updateDateFromNow } = useDayjs();

useHead({
  title: "blog - Jasper",
});

const { data: articles } = await useAsyncData(`blog-${useRoute().path}`, () => {
  return queryCollection("blog").all();
});

// Helper functions
const getCategory = (item: any) => {
  return item?.category || item?.tags?.[0] || "技术";
};

const getReadTime = (item: any) => {
  // Estimate reading time based on content length
  const content =
    item?.body?.children
      ?.map((child: any) => child?.children?.map((c: any) => c?.value).join(""))
      .join("") || "";
  const wordsPerMinute = 200;
  const words = content.length / 2; // Rough estimate for Chinese characters
  const readTime = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${readTime} min read`;
};

const getExcerpt = (item: any) => {
  // Extract excerpt from content
  const content =
    item?.body?.children
      ?.find((child: any) => child?.tag === "p")
      ?.children?.map((c: any) => c?.value)
      .join("") || "";
  return content.slice(0, 120) + (content.length > 120 ? "..." : "");
};

// Navigation function to handle card clicks
const navigateToPost = (path: string) => {
  if (path) {
    // Ensure the path is properly encoded for URLs
    const encodedPath = encodeURI(path);
    navigateTo(encodedPath);
  }
};
</script>

<style scoped lang="less">
/* Custom card hover effects */
:deep(.n-card) {
  border-radius: 12px !important;
  border: none !important;
}

:deep(.n-card:hover) {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}

/* Dark theme card styles */
:deep(.dark .n-card) {
  background-color: rgb(31 41 55) !important;
  border-color: rgb(55 65 81) !important;
}

:deep(.dark .n-card:hover) {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
}

:deep(.n-tag) {
  border-radius: 6px !important;
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
