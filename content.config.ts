import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: "page",
      source: "**",
      schema: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        date: z.date(),
        showTitle: z.string(), // 用于展示时的文章名，title 用作生成 url 了，中文不利于 seo
        lastmod: z.date(),
        tags: z.array(z.string()),
        versions: z.array(z.string()),
        rawbody: z.string(),
      }),
    }),
  },
});
