import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: [
    "@unocss/nuxt",
    "nuxtjs-naive-ui",
    "nuxt-particles",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
  css: [
    "@unocss/reset/tailwind-compat.css",
    "~/assets/css/base.less",
    "~/assets/css/themes.less",
  ],
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       additionalData: '@import "~/assets/css/_colors.less";',
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
  },
});
