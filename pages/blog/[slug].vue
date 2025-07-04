<template>
  <div id="article_page" class="flex flex-col">
    <ArticleToc
      class="hidden fixed position-right-[calc(50%-520px)] position-top-[6rem] lg:block w-220px h-[calc(100%-6rem)] overflow-y-auto"
      :toc="toc"
    />
    <aside
      class="fixed hidden lg:block position-left-[calc(50%-330px)] position-top-[8rem]"
    >
      <n-icon
        class="cursor-pointer"
        color="#07c160"
        :size="24"
        :component="LogoWechat"
        @click="getInnerHTML()"
      />
    </aside>
    <!-- Render the blog post as Prose & Vue components -->
    <article ref="curMdContentRef">
      <ContentRenderer v-if="post" :value="post" class="prose md mx-auto" />
    </article>
    <div
      v-if="surround"
      class="w-full px-4px grid grid-cols-4 gap-4 md:max-w-80ch!"
    >
      <n-card
        @click="$router.push(surround[0]?.path)"
        hoverable
        class="col-span-2 rounded-8px cursor-pointer"
        v-if="surround[0]"
        title="上一篇"
      >
        <p class="w-full text-truncate">{{ surround[0]?.title }}</p>
      </n-card>
      <n-card
        @click="$router.push(surround[1]?.path)"
        hoverable
        class="text-right col-span-2 col-start-3 rounded-8px cursor-pointer"
        v-if="surround[1]"
        title="下一篇"
        ><p class="w-full text-truncate">{{ surround[1]?.title }}</p></n-card
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { LogoWechat } from "@vicons/ionicons5";
const message = useMessage();
definePageMeta({
  hideParent: true,
});
const curMdContentRef = ref<HTMLElement | null>(null);
let copyHTML = ``;
const ExcludeClassList: any[] = [];
const IMG_WRAP_CLASS = "";
const _htmlCache: Record<string, any> = {};
const _styleValueCache: Record<string, any> = {};
const EffectCssAttrs = [
  // 'fontFamily',
  "fontSize",
  "fontWeight",
  "color",
  "textAlign",
  "lineHeight",
  "whiteSpace",
  "textSizeAdjust",
  "overflowX",
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "borderBottom",
  "borderTop",
  "borderRight",
  "borderLeft",
  "borderColor",
  "border",
  "borderBottomWidth",
  "borderLeftWidth",
  "backgroundColor",
  "borderRadius",
];
// 代码中，只有颜色属性有用
const PreCodeCssAttrs = ["color"];

const { data: post } = await useAsyncData(`article-${useRoute().path}`, () => {
  return queryCollection("blog").path(useRoute().path).first();
});
useHead({
  title: post.value?.title || post.value?.title,
});

const { data } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("blog", ["title"]);
});

const { data: surround } = await useAsyncData("surround", () => {
  return queryCollectionItemSurroundings("blog", useRoute().path);
});
// @ts-ignore
const toc = buildFullToc(post.value?.body.value) || [];

function camelCaseToHyphen(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
/**
 * 检测当前dom是不是包裹img，一般都需要特殊处理
 * @param dom dom元素
 */
function checkDomIsImg(dom: HTMLElement) {
  return Array.from(dom.classList)?.includes(IMG_WRAP_CLASS);
}
/**
 * 在imgWrapDom中提取到img html字符串
 * @param imgWrapDom
 */
function getImgDomHTML(imgWrapDom: any) {
  // console.log(`imgWrapDom`, imgWrapDom)
  // imgWrapDom
  const imgDom = findImgDom(imgWrapDom);

  return imgDom?.outerHTML;
}
function findImgDom(dom?: HTMLElement | ChildNode): HTMLElement {
  const childDoms: ChildNode[] = Array.from(dom?.childNodes ?? []).filter(
    (node: any) => node.nodeType === Node.ELEMENT_NODE
  );
  let imgDom = childDoms.find(
    (node: any) => node.tagName.toLowerCase() === "img"
  );

  if (!imgDom && childDoms && childDoms.length > 0) {
    imgDom = findImgDom(childDoms?.[0]);
  }

  return imgDom as HTMLElement;
}
function getContentDom() {
  const articleDom: any = curMdContentRef.value;
  // 默认内部会套一层div
  const contentDom = articleDom && articleDom.childNodes[0];
  return contentDom;
}
function getOneDomCssStyle(childDom: any, pointCssAttrs: string[] = []) {
  // 如果不存在，或是注释部分，则返回空字符串
  // 忽略掉button
  if (
    !childDom ||
    childDom.nodeType === Node.COMMENT_NODE ||
    childDom.tageName === "BUTTON" ||
    childDom.tageName === "STYLE"
  )
    return "";
  // 文本节点， 直接返回文本
  if (childDom.nodeType === Node.TEXT_NODE) {
    return childDom.nodeValue;
  }

  console.log(`childDom.tageName `, childDom.tagName, childDom.nodeType);
  const classList = Array.from(childDom.classList);
  // 如果元素的class在excludeClassList中，则忽略掉此元素， 一般是一些辅助类的元素
  if (classList.some((item) => ExcludeClassList.includes(item as string))) {
    return "";
  }

  // 特殊处理一下img元素
  if (checkDomIsImg(childDom)) {
    return getImgDomHTML(childDom);
  }
  // 如果有子元素, 需要递归处理
  const childNodes: Array<HTMLElement> = Array.from(childDom.childNodes);
  const tagName = childDom.tagName.toLowerCase();
  const childOutHTML = childDom.outerHTML;
  const childInnerHTML = childDom.innerHTML;

  let curCssStyles: Record<string, any> = {};
  let styleStrValue = ``;

  // 获取当前dom的所有样式
  // 如果有缓存，直接使用缓存
  // htmlcache key相同 意味着元素完全一致
  if (childOutHTML && _htmlCache[childOutHTML]) {
    curCssStyles = _htmlCache[childOutHTML];
    styleStrValue = _styleValueCache[childOutHTML];
  } else {
    // 没缓存, 获取对应的css
    const computedCssStyles = getComputedStyle(childDom, null);
    // console.log(`computedCssStyles`, computedCssStyles)
    const _effectCssAttrs =
      pointCssAttrs.length > 0 ? pointCssAttrs : EffectCssAttrs;
    _effectCssAttrs.forEach((cssAttr: any) => {
      const value = computedCssStyles[cssAttr];
      if (value) {
        curCssStyles[cssAttr] = value;
      }
    });
    // 如果当前元素有些属性需要添加进去
    // if (classList.some( item => !!customTagCssAttrs[item])) {
    //   console.log(`当前 classList ${classList} 存在自定义属性值`, )
    //   classList.forEach( item => {
    //     if (customTagCssAttrs[item]) {
    //       customTagCssAttrs[item].forEach( cssAttr => {
    //         const value = computedCssStyles[cssAttr]
    //         if (value) {
    //           curCssStyles[cssAttr] = value
    //           console.log(`自定义后的属性值为 => `, curCssStyles)
    //         }
    //       })
    //     }
    //   })
    // }

    // 设置缓存, 如果存在相同html, 则直接使用缓存
    _htmlCache[childOutHTML] = curCssStyles;
    // 组装style字符串
    Object.entries(curCssStyles).forEach((value) => {
      const cssKey = value[0];
      const cssValue = value[1];
      styleStrValue += `${camelCaseToHyphen(cssKey)}:${cssValue};`;
    });
    // 组装后的字符串缓存, 如果存在相同html, 则直接使用缓存
    _styleValueCache[childOutHTML] = styleStrValue;
  }
  // DOM的前半截
  let curDomAllHTML = `<${tagName} style="${styleStrValue}">`;
  // 如果存在子元素, 还需要递归处理子元素
  if (childNodes && childNodes.length > 0) {
    childNodes.forEach((child) => {
      const _pointCssAttrs: string[] =
        child.tagName === "pre" ? PreCodeCssAttrs : [];
      const childOwnHTML = getOneDomCssStyle(child, _pointCssAttrs);
      curDomAllHTML += childOwnHTML;
    });
    curDomAllHTML += `</${tagName}>`;
  } else {
    // 不存在子元素, 直接闭合标签
    curDomAllHTML = `<${tagName} style="${styleStrValue}">${childInnerHTML}</${tagName}>`;
  }

  return curDomAllHTML;
}
async function getInnerHTML() {
  // 获取内容区域的父级div
  const contentDom = getContentDom();
  let contentChildrens = contentDom.childNodes;
  let articleOutHTML = `<section style="padding-left:12px; padding-right:12px;background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);background-size: 20px 20px;">`;
  contentChildrens = Array.from(contentChildrens).filter(
    (item: any) => item.id !== "custom-pose-pre"
  );
  contentChildrens.forEach((childDom: any) => {
    const childInnerHTMLWithInlineStyle = getOneDomCssStyle(childDom);
    articleOutHTML += childInnerHTMLWithInlineStyle;
  });

  articleOutHTML += `</section>`;
  // 微信不支持div, 用section代替
  copyHTML = articleOutHTML
    ?.replaceAll("<div", "<section")
    ?.replaceAll("</div>", "</section>");
  const data = new Blob([copyHTML], { type: "text/html" });
  const data2 = new Blob([copyHTML], { type: "text/plain" });
  const item = new ClipboardItem({ "text/html": data, "text/plain": data2 });
  await navigator.clipboard.write([item]);
  message.success("已复制HTML到剪贴板!");
}
</script>
<style lang="less" scoped>
:deep(.n-card) > .n-card-header {
  font-size: inherit;
  padding: 10px 24px 0 24px;
}
:deep(.n-card) > .n-card__content {
  padding: 0 24px 10px 24px;
}
</style>
