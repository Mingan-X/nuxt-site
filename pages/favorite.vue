<template>
  <div class="container mx-auto px-6 py-12">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        我的收藏
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        收集有趣的网站、工具和资源，让工作和学习更高效
      </p>
    </div>

    <!-- 分类过滤器 -->
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
          @click="selectedCategory = 'all'"
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
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600',
          ]"
          @click="selectedCategory = category.id"
        >
          <div class="text-center">
            <div
              :class="[
                'w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center transition-colors',
                selectedCategory === category.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-800',
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
                  ? 'text-purple-700 dark:text-purple-300'
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
          v-model:value="searchQuery"
          placeholder="搜索网站名称、描述或标签..."
          size="large"
          clearable
          class="rounded-full"
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
          找到 {{ filteredWebsites.length }} 个相关网站
        </p>
      </div>
    </div>

    <!-- 精选推荐 -->
    <div
      v-if="
        selectedCategory === 'all' &&
        !searchQuery &&
        featuredWebsites.length > 0
      "
      class="mb-12"
    >
      <div class="flex items-center mb-6">
        <n-icon size="24" class="text-yellow-500 mr-2">
          <StarOutline />
        </n-icon>
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
          精选推荐
        </h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FavoriteCard
          v-for="website in featuredWebsites"
          :key="website.id"
          :website="website"
          :featured="true"
        />
      </div>
    </div>

    <!-- 网站列表 -->
    <div class="mb-8">
      <!-- 列表标题 -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
          {{ getListTitle() }}
        </h3>
        <div class="flex items-center space-x-4">
          <!-- 排序选择 -->
          <n-select
            v-model:value="sortBy"
            :options="sortOptions"
            size="small"
            class="w-32"
          />
          <!-- 视图切换 -->
          <n-button-group size="small">
            <n-button
              :type="viewMode === 'grid' ? 'primary' : 'default'"
              @click="viewMode = 'grid'"
            >
              <template #icon>
                <n-icon><GridOutline /></n-icon>
              </template>
            </n-button>
            <n-button
              :type="viewMode === 'list' ? 'primary' : 'default'"
              @click="viewMode = 'list'"
            >
              <template #icon>
                <n-icon><ListOutline /></n-icon>
              </template>
            </n-button>
          </n-button-group>
        </div>
      </div>

      <!-- 网站网格/列表 -->
      <div v-if="filteredWebsites.length > 0">
        <div
          :class="[
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4',
          ]"
        >
          <FavoriteCard
            v-for="website in sortedWebsites"
            :key="website.id"
            :website="website"
            :featured="false"
          />
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-16">
        <div class="mb-6">
          <n-icon size="64" class="text-gray-300 dark:text-gray-600">
            <SearchOutline />
          </n-icon>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {{ searchQuery ? "没有找到相关网站" : "该分类暂无网站" }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ searchQuery ? "尝试使用其他关键词搜索" : "敬请期待更多精彩内容" }}
        </p>
        <n-button v-if="searchQuery" type="primary" @click="clearSearch">
          清除搜索
        </n-button>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="mt-12 text-center">
      <div
        class="inline-flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
      >
        <span>共收录 {{ totalCount }} 个网站</span>
        <span>•</span>
        <span>{{ categoriesWithStats.length }} 个分类</span>
        <span>•</span>
        <span>{{ allTags.length }} 个标签</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  StarOutline,
  SearchOutline,
  GridOutline,
  ListOutline,
  ColorPaletteOutline,
  CodeSlashOutline,
  BookOutline,
  FlashOutline,
  BulbOutline,
  EllipsisHorizontalOutline,
} from "@vicons/ionicons5";
const {
  getAllFavorites,
  getFeaturedFavorites,
  getFavoritesByCategory,
  searchFavorites,
  getCategoryStats,
  getAllTags,
  getCategoryById,
} = useFavorites();

useHead({
  title: "favorite - Jasper",
});

// 响应式数据
const selectedCategory = ref("all");
const searchQuery = ref("");
const sortBy = ref("addedDate");
const viewMode = ref<"grid" | "list">("grid");

// 所有网站数据
const allWebsites = getAllFavorites();
const totalCount = allWebsites.length;

// 精选网站
const featuredWebsites = getFeaturedFavorites();

// 分类统计
const categoriesWithStats = getCategoryStats();

// 所有标签
const allTags = getAllTags();

// 排序选项
const sortOptions = [
  { label: "添加时间", value: "addedDate" },
  { label: "网站名称", value: "title" },
  { label: "分类", value: "category" },
];

// 计算属性：过滤后的网站
const filteredWebsites = computed(() => {
  let websites = allWebsites;

  // 按分类过滤
  if (selectedCategory.value !== "all") {
    websites = getFavoritesByCategory(selectedCategory.value);
  }

  // 按搜索关键词过滤
  if (searchQuery.value.trim()) {
    websites = searchFavorites(searchQuery.value.trim());
    // 如果有搜索关键词，忽略分类过滤
    if (selectedCategory.value !== "all") {
      websites = websites.filter(
        (site) => site.category === selectedCategory.value
      );
    }
  }

  return websites;
});

// 计算属性：排序后的网站
const sortedWebsites = computed(() => {
  const websites = [...filteredWebsites.value];

  switch (sortBy.value) {
    case "title":
      return websites.sort((a, b) => a.title.localeCompare(b.title));
    case "category":
      return websites.sort((a, b) => a.category.localeCompare(b.category));
    case "addedDate":
    default:
      return websites.sort(
        (a, b) =>
          new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      );
  }
});

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

// 获取列表标题
const getListTitle = () => {
  if (searchQuery.value.trim()) {
    return `搜索结果`;
  }

  if (selectedCategory.value === "all") {
    return "所有网站";
  }

  const category = getCategoryById(selectedCategory.value);
  return category?.name || "网站列表";
};

// 清除搜索
const clearSearch = () => {
  searchQuery.value = "";
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
