<template>
  <div class="container mx-auto px-6 py-12">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        管理面板
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        管理博客内容、RSS订阅和系统设置
      </p>
    </div>

    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <n-card class="border-0 shadow-lg">
          <div class="text-center p-4">
            <div class="flex items-center justify-center mb-2">
              <n-icon size="24" class="text-blue-500">
                <DocumentTextOutline />
              </n-icon>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {{ filesList.length }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">文章数量</div>
          </div>
        </n-card>

        <n-card class="border-0 shadow-lg">
          <div class="text-center p-4">
            <div class="flex items-center justify-center mb-2">
              <n-icon size="24" class="text-green-500">
                <LogoRss />
              </n-icon>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              78
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">订阅者</div>
          </div>
        </n-card>

        <n-card class="border-0 shadow-lg">
          <div class="text-center p-4">
            <div class="flex items-center justify-center mb-2">
              <n-icon size="24" class="text-purple-500">
                <PeopleOutline />
              </n-icon>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              4.5 KB
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Feed大小</div>
          </div>
        </n-card>

        <n-card class="border-0 shadow-lg">
          <div class="text-center p-4">
            <div class="flex items-center justify-center mb-2">
              <n-icon size="24" class="text-orange-500">
                <CalendarOutline />
              </n-icon>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              2025/7/8
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">最后更新</div>
          </div>
        </n-card>
      </div>

      <!-- RSS Management -->
      <n-card class="border-0 shadow-lg">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
              RSS Feed 管理
            </h3>
            <n-button type="primary" size="small"> 查看详情 </n-button>
          </div>
        </template>
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            管理和监控RSS feed的生成与分发
          </p>

          <div class="flex space-x-4">
            <n-button secondary>
              <template #icon>
                <n-icon><RefreshOutline /></n-icon>
              </template>
              刷新Feed
            </n-button>
            <n-button secondary>
              <template #icon>
                <n-icon><EyeOutline /></n-icon>
              </template>
              预览Feed
            </n-button>
            <n-button secondary>
              <template #icon>
                <n-icon><DownloadOutline /></n-icon>
              </template>
              下载Feed
            </n-button>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">
              RSS Feed URL
            </div>
            <div
              class="font-mono text-sm bg-white dark:bg-gray-700 dark:text-gray-200 p-2 rounded border dark:border-gray-600"
            >
              https://blog.mingxinx.top/api/rss
            </div>
          </div>
        </div>
      </n-card>

      <!-- File Upload -->
      <n-card class="border-0 shadow-lg">
        <template #header>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
            文件上传
          </h3>
        </template>
        <div
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer group"
        >
          <div class="mb-6">
            <div
              class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-colors"
            >
              <n-icon
                size="32"
                class="text-gray-400 dark:text-gray-500 group-hover:text-purple-500 transition-colors"
              >
                <CloudUploadOutline />
              </n-icon>
            </div>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
              点击或拖拽文件到此处上传
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              支持格式：image/*, .md
            </p>
          </div>

          <upload
            @upload-success="handleUploadSuccess"
            @upload-error="handleUploadError"
          />
        </div>
      </n-card>

      <!-- File Lists -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8"
        v-if="filesList.length > 0 || imgsList.length > 0"
      >
        <n-card v-if="filesList.length > 0" class="border-0 shadow-lg">
          <template #header>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              文件列表
            </h3>
          </template>
          <file-list :files="filesList" @delete="handleDeleteFile" />
        </n-card>

        <n-card v-if="imgsList.length > 0" class="border-0 shadow-lg">
          <template #header>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              图片列表
            </h3>
          </template>
          <img-list :files="imgsList" @delete="handleDeleteFile" />
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
import {
  DocumentTextOutline,
  LogoRss,
  PeopleOutline,
  CalendarOutline,
  RefreshOutline,
  EyeOutline,
  DownloadOutline,
  CloudUploadOutline,
} from "@vicons/ionicons5";

useHead({
  title: "Admin - Jasper",
});

const message = useMessage();
const filesList = ref<any>([]);
const imgsList = ref<any>([]);
const { loadImgFiles, deleteFiles, loadDocFiles } = useGitlabFiles();

onMounted(async () => {
  await refreshFileList();
});

const refreshFileList = async () => {
  try {
    const imgRes: any = await loadImgFiles();
    const docRes: any = await loadDocFiles();
    filesList.value = docRes.data || [];
    imgsList.value = imgRes.data || [];
  } catch (error) {
    message.error("加载文件列表失败");
  }
};

const handleUploadSuccess = async () => {
  await refreshFileList();
  message.success("文件上传成功！");
};

const handleUploadError = (error: any) => {
  message.error(`上传失败: ${error.data?.message || error.message}`);
};

const handleDeleteFile = async (deleteInfo: any) => {
  try {
    await deleteFiles({
      path: deleteInfo.path,
      sha: deleteInfo.sha,
    });
    await refreshFileList();
    message.success("文件删除成功");
  } catch (error: any) {
    message.error(`删除失败: ${error.data?.message}`);
  }
};
</script>

<style scoped lang="less">
:deep(.n-card) {
  border-radius: 12px !important;
  border: none !important;
}

:deep(.n-button--secondary) {
  border: 1px solid #d1d5db !important;
  background: transparent !important;
}

:deep(.n-button--secondary:hover) {
  border-color: #9333ea !important;
  background: rgba(147, 51, 234, 0.05) !important;
}

/* Dark mode styles */
:deep(.dark .n-card) {
  background-color: rgb(31 41 55) !important;
  border-color: rgb(55 65 81) !important;
}

:deep(.dark .n-button--secondary) {
  border: 1px solid rgb(55 65 81) !important;
  color: rgb(209 213 219) !important;
}

:deep(.dark .n-button--secondary:hover) {
  border-color: #a855f7 !important;
  background: rgba(168, 85, 247, 0.1) !important;
  color: rgb(196 181 253) !important;
}

:deep(.dark .n-input) {
  background-color: rgb(55 65 81) !important;
  border-color: rgb(75 85 99) !important;
  color: rgb(243 244 246) !important;
}
</style>
