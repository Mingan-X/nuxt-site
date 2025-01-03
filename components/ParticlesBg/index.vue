<template>
  <NuxtParticles
    v-show="$colorMode.value === 'dark'"
    id="tsparticles-dark"
    :options="bgOptions.dark"
    @load="onLoad"
  ></NuxtParticles>
  <NuxtParticles
    id="tsparticles-light"
    :options="bgOptions.light"
    @load="onLoad"
  ></NuxtParticles>
</template>

<script setup lang="ts">
import bgOptions from "@/utils/bgOptions";
// @ts-ignore
import type { Container } from "tsparticles-engine";
const onLoad = (container: Container) => {
  // Do something with the container
  container.pause();
  setTimeout(() => container.play(), 100);
};
</script>

<style scoped lang="less"></style>
