<template>
  <div class="flex flex-1 max-md:flex-col">
    <div
      class="position-relative left_content flex flex-col items-center justify-center flex-1 gap-4"
    >
      <span class="text-40px font-bold">Hi，I am Jasper</span>
      <span class="text-20px">web developer</span>
      <span class="text-center"
        >「现实是此岸，理想是彼岸，中间隔着湍急的河流，行动则是架在河上的桥梁」test3</span
      >
    </div>
    <div class="flex flex-col items-center justify-center flex-1 min-w-200px">
      <div class="relative">
        <img
          ref="source"
          class="w-200px h-200px rounded-50% opacity-0"
          src="../assets/images/avatar.gif"
          alt=""
        />
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "Jasper",
});
const source = ref<HTMLImageElement | null>(null);
/**头像悬浮开启涟漪动画 */
const startAnimation = () => {
  const list = [".circle1", ".circle2", ".circle3"];
  const domList = list.map((item) => document.querySelector(item));
  source.value?.addEventListener("mouseenter", () => {
    domList.forEach((item) => {
      item?.classList.add("hovered");
    });
  });
  source.value?.addEventListener("mouseleave", () => {
    domList.forEach((item) => {
      item?.classList.remove("hovered");
    });
  });
};
onMounted(async () => {
  await nextTick(() => {
    // 重绘gif
    if (source.value) {
      useRenderGif(source.value); // canvas渲染gif
      startAnimation();
    }
  });
});
</script>
<style scoped lang="less">
.left_content::before {
  background-image: url(../assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0.15;
  position: absolute;
  right: 0;
  top: 0;
}
/* 扩散动画 */
.circle1,
.circle2,
.circle3 {
  z-index: 0;
  width: 200px;
  height: 200px;
  background: var(--circle-color);
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
}
.hovered {
  /* animation: circleChange 2s 1s ease-out infinite; */
  animation-name: circleChange;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.circle1 {
  animation-delay: 0s;
}
.circle2 {
  animation-delay: 1.25s;
}
.circle3 {
  animation-delay: 2.25s;
}

@keyframes circleChange {
  0% {
    transform: scale(1);
    opacity: 0.25;
  }
  25% {
    transform: scale(1.05);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.15;
  }
  75% {
    transform: scale(1.15);
    opacity: 0.1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.05;
  }
}
</style>
