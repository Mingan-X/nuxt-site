<!-- FileListComponent.vue -->
<template>
  <n-list bordered hoverable>
    <n-list-item v-for="(file, index) in files" :key="file.id">
      <div class="file-item">
        <n-space align="center" :size="16">
          <n-icon :component="getFileIcon(file.name)" size="20" />
          <n-ellipsis style="max-width: 150px">
            {{ file.name }}
            <template #tooltip>
              <n-text depth="3">文件名: {{ file.name }}</n-text>
            </template>
          </n-ellipsis>
          <n-tag size="small" :bordered="false" type="info">
            {{ formatFileType(file.name) }}
          </n-tag>
        </n-space>
        <n-space :size="8">
          <n-button
            text
            tag="a"
            :href="file.download_url"
            target="_blank"
            type="primary"
            :focusable="false"
          >
            <template #icon>
              <n-icon><EyeOutline /></n-icon>
            </template>
            查看
          </n-button>
          <n-button
            text
            type="primary"
            :focusable="false"
            @click="copyToClipboard(file.download_url)"
          >
            <template #icon>
              <n-icon><CopyOutline /></n-icon>
            </template>
            复制链接
          </n-button>
          <n-popconfirm
            @positive-click="handleDelete(file)"
            positive-text="确认"
            negative-text="取消"
          >
            <template #trigger>
              <n-button text type="error" :focusable="false">
                <template #icon>
                  <n-icon><TrashOutline /></n-icon>
                </template>
                删除
              </n-button>
            </template>
            确定要永久删除该文件吗？
          </n-popconfirm>
        </n-space>
      </div>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import {
  EyeOutline,
  TrashOutline,
  DocumentTextOutline,
  CopyOutline,
} from "@vicons/ionicons5";
// @ts-ignore
import { useClipboard } from "@vueuse/core";
import { useMessage } from "naive-ui";
const message = useMessage();
const { copy, copied, isSupported } = useClipboard({ legacy: true });
defineProps({
  files: {
    type: Array<any>,
    default: () => [],
  },
});

const copyToClipboard = async (url: string) => {
  await copy(url);
  if (!isSupported.value) {
    message.warning("您的浏览器不支持");
  } else if (copied.value) {
    message.success("复制成功");
  }
};

const emit = defineEmits(["delete"]);

// 文件类型图标映射（网页1提到Naive UI支持丰富的图标方案）
const getFileIcon = (fileName: string) => {
  return DocumentTextOutline;
};

// 格式化显示文件类型（网页1强调类型安全特性）
const formatFileType = (fileName: string) => {
  const suffix = fileName.split(".").pop();
  if (suffix) {
    return suffix.toUpperCase();
  } else {
    return "未知";
  }
};

const handleDelete = (deleteInfo: any) => {
  emit("delete", deleteInfo);
};
</script>

<style scoped>
.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 0;
}

.n-icon {
  vertical-align: middle;
}
</style>
