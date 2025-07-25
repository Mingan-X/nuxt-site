<template>
  <header
    class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div
          class="flex items-center cursor-pointer"
          @click="$router.push('/')"
        >
          <Logo />
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <n-button
            v-for="item in menuOptions"
            :key="item.key"
            text
            :class="getNavButtonClass(item.key)"
            @click="handleNavClick(item)"
          >
            <template #icon>
              <n-icon size="16">
                <component :is="item.iconComponent" />
              </n-icon>
            </template>
            {{ item.label }}
          </n-button>
        </nav>

        <!-- Right side buttons -->
        <div class="flex items-center space-x-2">
          <!-- Search -->
          <n-button
            aria-label="Search"
            text
            class="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="showSearchModal"
          >
            <template #icon>
              <n-icon color="#94a3b8" size="20"><SearchCircleOutline /></n-icon>
            </template>
          </n-button>

          <!-- RSS Feed Link -->
          <n-button
            text
            class="rounded-full p-2 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400"
            tag="a"
            href="/api/rss"
            target="_blank"
            title="RSS订阅"
          >
            <template #icon>
              <n-icon color="#94a3b8" size="18"><LogoRss /></n-icon>
            </template>
          </n-button>

          <!-- Theme toggle -->
          <ColorMode />

          <!-- Mobile menu - only show on mobile -->
          <n-dropdown
            class="block md:hidden mobile-menu-dropdown"
            trigger="click"
            :options="mobileMenuOptions"
            placement="bottom-end"
            :show-arrow="false"
          >
            <n-button
              text
              class="md:hidden rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="菜单"
            >
              <template #icon>
                <n-icon color="#94a3b8" size="20"><Menu /></n-icon>
              </template>
            </n-button>
          </n-dropdown>
        </div>
      </div>
    </div>
    <SearchModal ref="searchModal" />
  </header>
</template>

<script setup lang="ts">
import {
  HomeOutline,
  HeartOutline,
  PersonOutline,
  LibraryOutline,
  GridOutline,
  Menu,
  SearchCircleOutline,
  LogoRss,
} from "@vicons/ionicons5";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const searchModal = ref();

const menuOptions = [
  {
    key: "index",
    label: "Home",
    iconComponent: HomeOutline,
    route: "/",
  },
  {
    key: "blog",
    label: "Blog",
    iconComponent: LibraryOutline,
    route: "/blog",
  },
  {
    key: "project",
    label: "Projects",
    iconComponent: GridOutline,
    route: "/project",
  },
  {
    key: "favorite",
    label: "Favorite",
    iconComponent: HeartOutline,
    route: "/favorite",
  },
  {
    key: "admin",
    label: "Admin",
    iconComponent: PersonOutline,
    route: "/admin",
  },
];

// Mobile menu options for dropdown
const mobileMenuOptions = computed(() =>
  menuOptions.map((item) => {
    const isActive =
      (item.key === "index" && route.name === "index") ||
      (item.key !== "index" && route.path.startsWith(`/${item.key}`));

    return {
      label: item.label,
      key: item.key,
      icon: () => h(item.iconComponent, { style: "width: 16px" }),
      props: {
        onClick: () => router.push(item.route),
        class: isActive
          ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
          : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20",
      },
    };
  })
);

const getNavButtonClass = (key: string) => {
  const isActive =
    (key === "index" && route.name === "index") ||
    (key !== "index" && route.path.startsWith(`/${key}`));

  return [
    "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200",
    isActive
      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
      : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20",
  ];
};

const handleNavClick = (item: any) => {
  router.push(item.route);
};

const showSearchModal = () => {
  searchModal.value?.show();
};
</script>

<style scoped lang="less">
/* Custom button styles for navigation */
:deep(.n-button) {
  border-radius: 9999px !important;
}

:deep(.n-button--text:hover) {
  background-color: rgba(147, 51, 234, 0.05) !important;
}

/* RSS button hover effect */
:deep(.n-button:hover .n-icon) {
  color: #ea580c !important;
}

/* Mobile dropdown menu styles - Higher specificity */
:deep(.n-dropdown-menu.n-dropdown-menu) {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(229, 231, 235, 0.8) !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  min-width: 180px !important;
  padding: 8px !important;
  margin-top: 8px !important;
}

:deep(.n-dropdown-option.n-dropdown-option) {
  border-radius: 8px !important;
  margin: 2px 0 !important;
  padding: 12px 16px !important;
  transition: all 0.2s ease !important;
  font-size: 14px !important;
  font-weight: 500 !important;
}

:deep(.n-dropdown-option.n-dropdown-option:hover) {
  background-color: rgba(147, 51, 234, 0.08) !important;
  transform: translateY(-1px) !important;
}

:deep(.n-dropdown-option .n-dropdown-option__icon) {
  margin-right: 12px !important;
  font-size: 16px !important;
}

/* Dark mode styles for mobile menu */
:deep(.dark .n-dropdown-menu.n-dropdown-menu) {
  background: rgba(17, 24, 39, 0.95) !important;
  border: 1px solid rgba(75, 85, 99, 0.8) !important;
}

:deep(.dark .n-dropdown-option.n-dropdown-option:hover) {
  background-color: rgba(147, 51, 234, 0.15) !important;
}

/* Force mobile menu to show only on mobile - double ensure it's hidden on desktop */
@media (min-width: 768px) {
  :deep(.mobile-menu-dropdown) {
    display: none !important;
  }

  :deep(.mobile-menu-dropdown .n-dropdown) {
    display: none !important;
  }

  :deep(.mobile-menu-dropdown .n-button) {
    display: none !important;
  }
}

/* Additional mobile menu styling with class selector */
:deep(.mobile-menu-dropdown .n-dropdown-menu) {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(229, 231, 235, 0.9) !important;
  border-radius: 16px !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  min-width: 200px !important;
  padding: 12px !important;
  margin-top: 12px !important;
}

:deep(.mobile-menu-dropdown .n-dropdown-option) {
  border-radius: 10px !important;
  margin: 4px 0 !important;
  padding: 14px 18px !important;
  transition: all 0.3s ease !important;
  font-size: 15px !important;
  font-weight: 600 !important;
}

:deep(.dark .mobile-menu-dropdown .n-dropdown-menu) {
  background: rgba(17, 24, 39, 0.98) !important;
  border: 1px solid rgba(75, 85, 99, 0.9) !important;
}
</style>
