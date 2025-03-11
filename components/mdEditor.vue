<template>
  <MdEditor class="h-full! w-90vw!" v-model="text" />
</template>

<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const { getFileContent } = useGitlabFiles();
const text = ref("");
const props = defineProps({
  path: {
    type: String,
    default: "",
  },
});

const initMDContent = async () => {
  const res: any = await getFileContent(props.path);
  const decodeContent = new TextDecoder().decode(
    Uint8Array.from(atob(res.content), (c) => c.charCodeAt(0))
  );
  text.value = decodeContent;
};

watch(
  () => props.path,
  () => {
    if (props.path) {
      console.log(props.path, "props.path");
      initMDContent();
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="less">
:deep(svg.md-editor-icon) {
  box-sizing: content-box !important;
}
</style>
