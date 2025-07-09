<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button circle text @click="toggleDark">
        <n-icon
          size="20"
          color="#94a3b8"
          :component="isDarkIcon ? MoonOutline : Sunny"
        />
      </n-button>
    </template>
    切换{{ $colorMode.preference === "dark" ? "白天" : "黑夜" }}模式
  </n-tooltip>
</template>

<script setup lang="ts">
import { Sunny, MoonOutline } from "@vicons/ionicons5";
const colorMode = useColorMode();
const isDarkIcon = ref(false);

// 切换模式
const setColorMode = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
  isDarkIcon.value = !isDarkIcon.value;
};

// 判断是否支持 startViewTransition API
const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

// 切换动画
async function toggleDark({ clientX: x, clientY: y }: MouseEvent) {
  const isDark = colorMode.preference === "dark";
  if (!enableTransitions()) {
    setColorMode();
    return;
  }
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];
  await document.startViewTransition(async () => {
    setColorMode();
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: !isDark ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${!isDark ? "old" : "new"}(root)`,
    }
  );
}

onMounted(() => {
  !colorMode.unknown && colorMode.preference === "dark"
    ? (isDarkIcon.value = true)
    : (isDarkIcon.value = false);
});
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>
