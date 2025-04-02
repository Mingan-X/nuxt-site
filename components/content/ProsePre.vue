<template>
  <div
    id="custom-pose-pre"
    class="flex flex-wrap relative .dark:bg-#020618 .dark:border-#314158 .light:bg-#fff border border-#e2e8f0 rounded-t-6px px-4"
  >
    <div class="w-full flex justify-between">
      <div class="flex items-center h-28px">
        <n-icon
          size="12"
          class="invert-80"
          @click="changeExpand"
          :component="expandStatus ? CaretDown : CaretForward"
        ></n-icon>
        <span class="text-12px ml-12px">{{ language }}</span>
      </div>
      <button
        @click="copyToClipboard"
        class="w-24px h-24px border rounded .dark:bg-#020618 .dark:border-#314158 bg-transparent hover:bg-#F0F0F0 .dark:hover:bg-#0f172b"
      >
        <n-icon><CopyOutline /></n-icon>
      </button>
    </div>
  </div>
  <pre
    :class="expandStatus ? $props.class : 'h-0 m-0! b-b-none'"
    class="border border-t-none .dark:border-#314158!"
  ><slot /></pre>
</template>

<script setup lang="ts">
import { CaretDown, CaretForward, CopyOutline } from "@vicons/ionicons5";
// @ts-ignore
import { useClipboard } from "@vueuse/core";
import { useMessage } from "naive-ui";
const message = useMessage();
const { copy, copied, isSupported } = useClipboard({ legacy: true });
const expandStatus = ref(true);
const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});
const changeExpand = () => {
  expandStatus.value = !expandStatus.value;
};
const copyToClipboard = async () => {
  await copy(props.code);
  if (!isSupported.value) {
    message.warning("您的浏览器不支持");
  } else if (copied.value) {
    message.success("复制成功");
  }
};
</script>

<style lang="less" scoped>
#custom-pose-pre:before {
  content: "";
  display: block;
  background-position: left;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NCIgaGVpZ2h0PSIxNCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBzdHJva2Utd2lkdGg9Ii41Ij48Y2lyY2xlIGN4PSI2IiBjeT0iNiIgcj0iNiIgZmlsbD0iI0ZGNUY1NiIgc3Ryb2tlPSIjRTA0NDNFIi8+PGNpcmNsZSBjeD0iMjYiIGN5PSI2IiByPSI2IiBmaWxsPSIjRkZCRDJFIiBzdHJva2U9IiNERUExMjMiLz48Y2lyY2xlIGN4PSI0NiIgY3k9IjYiIHI9IjYiIGZpbGw9IiMyN0M5M0YiIHN0cm9rZT0iIzFBQUIyOSIvPjwvZz48L3N2Zz4=);
  height: 30px;
  width: 100%;
  margin-bottom: -7px;
  background-size: 40px;
  background-repeat: no-repeat;
}
</style>
