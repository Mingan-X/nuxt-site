<template>
  <n-card
    :class="[
      'group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-2 cursor-pointer',
      'bg-white dark:bg-gray-800 dark:border-gray-700',
      featured ? 'ring-2 ring-purple-200 dark:ring-purple-800' : '',
    ]"
  >
    <div class="p-6">
      <!-- 网站图标和标题 -->
      <div class="flex items-start space-x-4 mb-4">
        <div class="flex-shrink-0">
          <img
            :src="websiteIcon"
            :alt="website.title"
            class="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
            @error="handleImageError"
          />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-2">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white truncate"
            >
              {{ website.title }}
            </h3>
            <n-icon
              v-if="featured"
              size="16"
              class="text-yellow-500 flex-shrink-0 ml-2"
              title="精选推荐"
            >
              <StarOutline />
            </n-icon>
          </div>
          <p
            class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed"
          >
            {{ website.description }}
          </p>
        </div>
      </div>

      <!-- 分类标签 -->
      <div class="flex items-center justify-between mb-4">
        <n-tag
          :type="getCategoryColor(website.category)"
          size="small"
          class="px-3 py-1"
        >
          <template #icon>
            <n-icon size="12">
              <component :is="getCategoryIcon(website.category)" />
            </n-icon>
          </template>
          {{ getCategoryName(website.category) }}
        </n-tag>

        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ formatDate(website.addedDate) }}
        </span>
      </div>

      <!-- 标签列表 -->
      <div class="flex flex-wrap gap-2 mb-4">
        <n-tag
          v-for="(tag, index) in website.tags.slice(0, 3)"
          :key="tag"
          size="small"
          :type="getTagType(index)"
          :color="getTagColor(index)"
          class="text-xs font-medium"
        >
          {{ tag }}
        </n-tag>
        <n-tag
          v-if="website.tags.length > 3"
          size="small"
          type="default"
          class="text-xs font-medium"
        >
          +{{ website.tags.length - 3 }}
        </n-tag>
      </div>

      <!-- 操作按钮 -->
      <div
        class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700"
      >
        <div class="flex items-center space-x-2">
          <n-button
            size="small"
            type="default"
            ghost
            @click.stop="openWebsite"
            class="flex items-center space-x-1"
          >
            <n-icon size="14"><OpenOutline /></n-icon>
            <span>访问</span>
          </n-button>

          <n-button
            size="small"
            type="default"
            ghost
            @click.stop="copyUrl"
            class="flex items-center space-x-1"
          >
            <n-icon size="14"><CopyOutline /></n-icon>
            <span>复制</span>
          </n-button>
        </div>

        <div class="text-xs text-gray-400 dark:text-gray-500 truncate max-w-32">
          {{ getDomain(website.url) }}
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import {
  StarOutline,
  OpenOutline,
  CopyOutline,
  ColorPaletteOutline,
  CodeSlashOutline,
  BookOutline,
  FlashOutline,
  BulbOutline,
  EllipsisHorizontalOutline,
} from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
import type { FavoriteWebsite } from "~/config/favorites";

interface Props {
  website: FavoriteWebsite;
  featured?: boolean;
}

const props = defineProps<Props>();
const message = useMessage();
const { getCategoryById, formatDate, getWebsiteIcon } = useFavorites();

// 网站图标
const websiteIcon = ref(getWebsiteIcon(props.website));

// 处理图片加载错误
const handleImageError = () => {
  websiteIcon.value = "/favicon.ico";
};

// 获取分类信息
const getCategoryName = (categoryId: string) => {
  return getCategoryById(categoryId)?.name || "其他";
};

const getCategoryColor = (categoryId: string) => {
  const colorMap: Record<string, string> = {
    design: "info",
    development: "success",
    learning: "warning",
    productivity: "error",
    inspiration: "default",
    other: "default",
  };
  return colorMap[categoryId] || "default";
};

const getCategoryIcon = (categoryId: string) => {
  const iconMap: Record<string, any> = {
    design: ColorPaletteOutline,
    development: CodeSlashOutline,
    learning: BookOutline,
    productivity: FlashOutline,
    inspiration: BulbOutline,
    other: EllipsisHorizontalOutline,
  };
  return iconMap[categoryId] || EllipsisHorizontalOutline;
};

// 获取标签类型
const getTagType = (index: number) => {
  const types = ["primary", "info", "success", "warning", "error"];
  return types[index % types.length];
};

// 获取标签自定义颜色（解决浅色问题）
const getTagColor = (index: number) => {
  const colors = [
    {
      color: "#1890ff",
      borderColor: "#1890ff",
      textColor: "#ffffff",
    },
    {
      color: "#52c41a",
      borderColor: "#52c41a",
      textColor: "#ffffff",
    },
    {
      color: "#722ed1",
      borderColor: "#722ed1",
      textColor: "#ffffff",
    },
    {
      color: "#fa8c16", // 更深的橙色，替代浅黄色
      borderColor: "#fa8c16",
      textColor: "#ffffff",
    },
    {
      color: "#eb2f96",
      borderColor: "#eb2f96",
      textColor: "#ffffff",
    },
  ];
  return colors[index % colors.length];
};

// 获取域名
const getDomain = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

// 打开网站
const openWebsite = () => {
  window.open(props.website.url, "_blank", "noopener,noreferrer");
};

// 复制链接
const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(props.website.url);
    message.success("链接已复制到剪贴板");
  } catch {
    message.error("复制失败");
  }
};
</script>

<style scoped lang="less">
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.n-card) {
  border-radius: 12px !important;
  border: none !important;
}

:deep(.dark .n-card) {
  background-color: rgb(31 41 55) !important;
  border-color: rgb(55 65 81) !important;
}

:deep(.n-tag) {
  border-radius: 6px !important;
}
</style>
