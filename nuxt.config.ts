import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  build: {
    analyze: true, // 启用构建分析，帮助找出可能的错误
  },
  nitro: {
    prerender: {
      crawlLinks: false, // 禁用爬虫抓取，可以逐一定位问题
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        },
      ],
    },
  },
  modules: [
    "@unocss/nuxt",
    "nuxtjs-naive-ui",
    "nuxt-particles",
    "@nuxtjs/color-mode",
    "@nuxt/content",
  ],
  // nuxt/content 配置
  content: {
    renderer: {
      anchorLinks: false,
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: "github-light",
            // Theme used if `html.dark`
            dark: "github-dark",
            // Theme used if `html.sepia`
            light: "monokai",
          },
          langs: [
            "typescript",
            "vue",
            "javascript",
            "go",
            "shell",
            "bash",
            "yaml",
            "markdown",
            "json",
            "html",
            "ts",
            "js",
          ],
        },
      },
    },
  },
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
    "~/assets/css/mdc.less",
    "~/assets/css/md.less",
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
    //       additionalData: '@import "~/assets/css/themes.less";',
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
  },
});
