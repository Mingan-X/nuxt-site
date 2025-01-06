<template>
  <div class="home_card flex-1 flex items-center justify-center">
    <div class="home_center">
      <div class="home_title">
        <p class="text-20px">Hi, I'm Jasper</p>
        <p>web developer</p>
      </div>
      <div>
        <n-avatar
          round
          :size="48"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <div class="home_desc">
          <p class="desc_text">遇事不决，可问春风</p>
          <p class="desc_text indent-8 ml-6px">春风不语，即随本心</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "首页 - Jasper",
});
</script>
<style scoped lang="less">
.home_center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home_title {
  text-align: center;
  margin-bottom: 20px;
}
.home_desc {
  display: flex;
  .desc_text {
    writing-mode: vertical-lr;
    letter-spacing: 2px;
  }
}
</style>
