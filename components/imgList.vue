<!-- FileListComponent.vue -->
<template>
  <n-image-group>
    <n-space :size="8">
      <div
        class="relative w-100px h-100px border-1px border-[var(--border-color)]"
        v-for="(item, index) in files"
        :key="index"
      >
        <n-image
          class="w-full h-full"
          width="100"
          height="100"
          :src="item.download_url"
        />
        <div
          class="absolute top-0 right-0 bg-#151718b3 flex justify-center items-center gap-1"
        >
          <n-button
            @click="copyToClipboard(item.download_url)"
            class="text-#fff"
            text
            :focusable="false"
          >
            <n-icon><CopyOutline /></n-icon>
          </n-button>
          <n-button
            @click="handleDelete(item)"
            class="text-#fff"
            text
            :focusable="false"
          >
            <n-icon><TrashOutline /></n-icon>
          </n-button>
        </div>
      </div>
    </n-space>
  </n-image-group>
</template>

<script setup lang="ts">
import {
  EyeOutline,
  TrashOutline,
  ImageOutline,
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
  return ImageOutline;
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

<style scoped lang="less">
.n-icon {
  vertical-align: middle;
}
</style>
