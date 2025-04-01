<template>
  <div
    id="custom-pose-pre"
    class="flex flex-col relative .dark:bg-#020618 .dark:border-#314158 .light:bg-#fff border border-oklch(.929 .013 255.508) rounded-t-6px px-4"
  >
    <div>
      <span>{{ language }}</span>
    </div>
  </div>
  <pre
    :class="$props.class"
    class="border border-t-none .dark:border-#314158!"
  ><slot /></pre>
</template>

<script setup lang="ts">
import { CaretDown, CaretForward } from "@vicons/ionicons5";
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
console.log(props);
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
