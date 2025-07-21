<template>
  <div class="mb-8">
    <!-- 分类标题 -->
    <div class="text-center mb-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        按分类浏览
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        选择感兴趣的分类查看相关网站
      </p>
    </div>

    <!-- 分类网格 -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <!-- 全部分类 -->
      <div
        :class="[
          'group cursor-pointer p-4 rounded-xl border-2 transition-all duration-300',
          'hover:shadow-lg hover:-translate-y-1',
          selectedCategory === 'all'
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400'
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600',
        ]"
        @click="selectCategory('all')"
      >
        <div class="text-center">
          <div
            :class="[
              'w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center transition-colors',
              selectedCategory === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-800',
            ]"
          >
            <n-icon size="24">
              <GridOutline />
            </n-icon>
          </div>
          <h4
            :class="[
              'font-medium text-sm mb-1',
              selectedCategory === 'all'
                ? 'text-purple-700 dark:text-purple-300'
                : 'text-gray-900 dark:text-white',
            ]"
          >
            全部
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ totalCount }} 个网站
          </p>
        </div>
      </div>

      <!-- 各个分类 -->
      <div
        v-for="category in categoriesWithStats"
        :key="category.id"
        :class="[
          'group cursor-pointer p-4 rounded-xl border-2 transition-all duration-300',
          'hover:shadow-lg hover:-translate-y-1',
          selectedCategory === category.id
            ? `border-${category.color}-500 bg-${category.color}-50 dark:bg-${category.color}-900/20 dark:border-${category.color}-400`
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600',
        ]"
        @click="selectCategory(category.id)"
      >
        <div class="text-center">
          <div
            :class="[
              'w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center transition-colors',
              selectedCategory === category.id
                ? `bg-${category.color}-500 text-white`
                : `bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-${category.color}-100 dark:group-hover:bg-${category.color}-800`,
            ]"
          >
            <n-icon size="20">
              <component :is="getCategoryIcon(category.icon)" />
            </n-icon>
          </div>
          <h4
            :class="[
              'font-medium text-sm mb-1',
              selectedCategory === category.id
                ? `text-${category.color}-700 dark:text-${category.color}-300`
                : 'text-gray-900 dark:text-white',
            ]"
          >
            {{ category.name }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ category.count }} 个网站
          </p>
        </div>
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="max-w-md mx-auto">
      <n-input
        :value="searchQuery"
        placeholder="搜索网站名称、描述或标签..."
        size="large"
        clearable
        class="rounded-full"
        @input="handleSearch"
      >
        <template #prefix>
          <n-icon size="18" class="text-gray-400">
            <SearchOutline />
          </n-icon>
        </template>
      </n-input>
    </div>

    <!-- 搜索结果提示 -->
    <div v-if="searchQuery" class="text-center mt-4">
      <p class="text-sm text-gray-600 dark:text-gray-300">
        找到 {{ filteredCount }} 个相关网站
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  GridOutline,
  SearchOutline,
  ColorPaletteOutline,
  CodeSlashOutline,
  BookOutline,
  FlashOutline,
  BulbOutline,
  EllipsisHorizontalOutline,
} from "@vicons/ionicons5";

interface Props {
  selectedCategory: string;
  searchQuery: string;
  totalCount: number;
  filteredCount: number;
}

interface Emits {
  (e: "update:selectedCategory", value: string): void;
  (e: "update:searchQuery", value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { getCategoryStats } = useFavorites();

// 获取分类统计信息
const categoriesWithStats = computed(() => getCategoryStats());

// 获取分类图标
const getCategoryIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    ColorPaletteOutline,
    CodeSlashOutline,
    BookOutline,
    FlashOutline,
    BulbOutline,
    EllipsisHorizontalOutline,
  };
  return iconMap[iconName] || EllipsisHorizontalOutline;
};

// 选择分类
const selectCategory = (categoryId: string) => {
  emit("update:selectedCategory", categoryId);
};

// 处理搜索
const handleSearch = (value: string) => {
  emit("update:searchQuery", value);
};
</script>

<style scoped lang="less">
:deep(.n-input) {
  border-radius: 9999px !important;
}

:deep(.n-input .n-input__input-el) {
  border-radius: 9999px !important;
}

:deep(.n-input .n-input-wrapper) {
  border-radius: 9999px !important;
}
</style>
