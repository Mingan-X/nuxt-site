<template>
  <div :class="[type, 'alert']">
    <slot mdc-unwrap="p" />
  </div>
</template>

<script setup lang="ts">
defineProps(["type"]);
</script>

<style scoped lang="less"></style>
