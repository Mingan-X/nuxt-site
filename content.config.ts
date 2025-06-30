import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: {
        repository: "https://github.com/Mingan-X/nuxt-site-assets",
        include: "blog/**",
        authToken: process.env.GITHUB_TOKEN, // 用于访问私有仓库(建议放在部署平台的环境变量中)
      },
      schema: z.object({
        date: z.date(),
        title: z.string(), // 用于展示时的文章名，title 用作生成 url 了，中文不利于 seo
        lastmod: z.date(),
        tags: z.array(z.string()),
        versions: z.array(z.string()),
        rawbody: z.string(),
      }),
    }),
    // blog: defineCollection({
    //   type: "page",
    //   source: "blog/*.md",
    //   schema: z.object({
    //     date: z.date(),
    //     title: z.string(), // 用于展示时的文章名，title 用作生成 url 了，中文不利于 seo
    //     lastmod: z.date(),
    //     tags: z.array(z.string()),
    //     versions: z.array(z.string()),
    //     rawbody: z.string(),
    //   }),
    // }),
  },
});
