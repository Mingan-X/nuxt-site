<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <!-- 首页加载全屏动画 -->
    <FullLoading v-if="isFullLoading" />
    <NuxtLayout>
      <!-- 在页面导航之间显示一个进度条 -->
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
    <NuxtParticles
      id="tsparticles"
      :options="options"
      @load="onLoad"
    ></NuxtParticles>
  </n-config-provider>
</template>

<script setup lang="ts">
import themeOverrides from "@/utils/theme";
// @ts-ignore
import type { Container } from "tsparticles-engine";
const nuxtApp = useNuxtApp();
// 是否首次加载
const isFullLoading = ref(true);
nuxtApp.hook("page:start", () => {
  isFullLoading.value = true;
});
nuxtApp.hook("page:finish", () => {
  isFullLoading.value = false;
});

const options = {
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    color: {
      value: "#94a3b8",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
    links: {
      enable: true,
      distance: 100,
      color: "#94a3b8",
      opacity: 1,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      grab: {
        distance: 50,
        links: {
          color: "#94a3b8",
          opacity: 0.5,
        },
      },
      bubble: {
        distance: 50,
        size: 10,
        duration: 2,
        opacity: 0.8,
      },
      repulse: {
        distance: 200,
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
    },
  },
  background: {
    // color: "#000000",
  },
};

const onLoad = (container: Container) => {
  // Do something with the container
  container.pause();
  setTimeout(() => container.play(), 2000);
};
</script>
