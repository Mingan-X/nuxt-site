<template>
  <div class="h-full flex flex-col pt-72px overflow-y-auto">
    <AppHeader />
    <div class="flex-1 flex mx-auto">
      <slot />
    </div>
    <AppFooter />
    <n-back-top :right="30" />
  </div>
</template>
