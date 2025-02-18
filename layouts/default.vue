<template>
  <div class="min-h-100vh flex flex-col">
    <AppHeader />
    <div class="flex-1 flex mx-auto">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
