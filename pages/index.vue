<template>
  <div class="flex flex-1">
    <div
      class="position-relative left_content flex flex-col items-center justify-center flex-1 gap-4"
    >
      <span class="text-40px font-bold">Hi，I am Japer</span>
      <span class="text-20px">web developer</span>
      <span
        >「现实是此岸，理想是彼岸，中间隔着湍急的河流，行动则是架在河上的桥梁」</span
      >
    </div>
    <div class="flex flex-col items-center justify-center flex-1">
      <img
        class="w-200px h-200px rounded-50% gif-animation"
        src="../assets/images/avatar.gif"
        alt=""
      />
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "首页 - Jasper",
});
</script>
<style scoped lang="less">
.left_content::before {
  background-image: url(../assets/images/1.jpg);
  background-repeat: no-repeat;
  background-size: contain;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0.15;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}
.gif-animation {
  animation-duration: 60s; /* 设置GIF动画的播放时间为10秒 */
  animation-timing-function: linear; /* 设置动画速度为匀速 */
}
</style>
