<template>
  <div class="container mx-auto px-6 py-12">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        我的项目
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        一些有趣的前端项目和实验
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <n-card
        v-for="project in projects"
        :key="project.id"
        class="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-8">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3
                class="text-2xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
              >
                {{ project.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {{ project.description }}
              </p>
            </div>
            <n-tag
              :type="project.status === 'completed' ? 'success' : 'warning'"
              :class="
                project.status === 'completed'
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
              "
            >
              {{ project.status === "completed" ? "已完成" : "进行中" }}
            </n-tag>
          </div>

          <div class="flex flex-wrap gap-2 mb-6">
            <n-tag
              v-for="tech in project.tech"
              :key="tech"
              size="small"
              class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {{ tech }}
            </n-tag>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">{{
              project.date
            }}</span>
            <n-button
              secondary
              size="small"
              class="hover:bg-purple-50 hover:border-purple-300"
              @click="openProject(project.link)"
            >
              查看项目
              <template #icon>
                <n-icon size="12"><Open /></n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Open } from "@vicons/ionicons5";

useHead({
  title: "Projects - Jasper",
});

const projects = [
  {
    id: 1,
    title: "Canvas绘制行星环境",
    description: "使用Canvas API创建一个交互式的太阳系模拟器",
    date: "2023年03月20日",
    tech: ["Canvas", "JavaScript", "动画"],
    status: "completed",
    link: "#",
  },
  {
    id: 2,
    title: "用Canvas实现一个动态手电筒，让你体验真实光圈效果！",
    description: "模拟真实的手电筒光照效果，支持鼠标跟随和光圈调节",
    date: "2023年05月01日",
    tech: ["Canvas", "JavaScript", "光影效果"],
    status: "completed",
    link: "#",
  },
  {
    id: 3,
    title: "TypeScript入门青训营笔记",
    description: "完整的TypeScript学习笔记和实践项目",
    date: "2023年01月15日",
    tech: ["TypeScript", "学习笔记"],
    status: "ongoing",
    link: "#",
  },
];

const openProject = (link: string) => {
  if (link && link !== "#") {
    window.open(link, "_blank");
  }
};
</script>

<style scoped lang="less">
/* Custom card styles */
:deep(.n-card) {
  border-radius: 12px !important;
  border: none !important;
}

:deep(.n-card:hover) {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}

:deep(.n-tag) {
  border-radius: 6px !important;
}

:deep(.n-button--secondary) {
  border: 1px solid #d1d5db !important;
  background: transparent !important;
}

:deep(.n-button--secondary:hover) {
  border-color: #9333ea !important;
  background: rgba(147, 51, 234, 0.05) !important;
}

/* Dark theme card styles */
:deep(.dark .n-card) {
  background-color: rgb(31 41 55) !important;
  border-color: rgb(55 65 81) !important;
}

:deep(.dark .n-card:hover) {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
}

:deep(.dark .n-button--secondary) {
  border-color: rgb(55 65 81) !important;
  color: rgb(209 213 219) !important;
}

:deep(.dark .n-button--secondary:hover) {
  border-color: #a855f7 !important;
  background: rgba(168, 85, 247, 0.1) !important;
}
</style>
