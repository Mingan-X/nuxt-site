<!-- FileListComponent.vue -->
<template>
  <n-list bordered hoverable>
    <n-list-item v-for="file in files" :key="file.id">
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
            :href="file.url"
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
            @click="copyToClipboard(file.url)"
          >
            <template #icon>
              <n-icon><CopyOutline /></n-icon>
            </template>
            复制链接
          </n-button>
          <n-popconfirm
            @positive-click="handleDelete(file.path)"
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
  <div>
    <n-image-group>
      <n-space>
        <div
          class="relative w-100px h-100px"
          v-for="(item, index) in files.filter((file) =>
            imgTypeList.includes(file.name.split('.').pop())
          )"
          :key="index"
        >
          <n-image
            class="w-full h-full"
            width="100"
            height="100"
            :src="item.url"
          />
          <div
            class="absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-#151718b3 flex justify-center items-center gap-4"
          >
            <n-button text :focusable="false">
              <n-icon><CopyOutline /></n-icon>
            </n-button>
            <n-button text :focusable="false">
              <n-icon><TrashOutline /></n-icon>
            </n-button>
          </div>
        </div>
      </n-space>
    </n-image-group>
  </div>
</template>

<script setup lang="ts">
import {
  EyeOutline,
  TrashOutline,
  DocumentTextOutline,
  ImageOutline,
  CopyOutline,
} from "@vicons/ionicons5";
import { useClipboard } from "@vueuse/core";
import { useMessage } from "naive-ui";
const message = useMessage();
const { copy, copied, isSupported } = useClipboard({ legacy: true });
const imgTypeList = ["png", "jpg", "jpeg", "bmp", "gif", "webp"];
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
  const suffix: string = fileName.split(".").pop() || "";
  if (imgTypeList.includes(suffix)) {
    return ImageOutline;
  } else {
    return DocumentTextOutline;
  }
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

const handleDelete = (path: string) => {
  emit("delete", path);
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
