---
date: 2023-01-16
showTitle: 理解CSS|青训营笔记
---

这是我参与「第五届字节青训营」伴学笔记创作活动的第 2 天。

# 课堂笔记

## CSS 的定义

CSS(Cascading Style Sheets)层叠样式表。用于定义页面元素的样式，如设置字体和颜色、设置位置和大小、添加动画效果等等。

## CSS 基础代码

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d78f71f1e354a5f958dd9aa43bc8a3c~tplv-k3u1fbpfcp-watermark.image?" alt="E4EFF34C537B7F40A8BFAAADBD12E0CB.jpg" width="100%" />

## 页面中使用 CSS

**外链**

```js
<!-- 外链 -->
    <link rel="stylesheet" href="/assets/style.csss">
```

**嵌入**

```js
 <!-- 嵌入 -->
    <style>
        li {margin: 0; list-style: none; }
        p {margin: lem 0; }
    </style>
```

**内联**

```js
<!-- 内联 -->
<p style="margin:lem 0">Example Content</p>
```

**提示：** 推荐使用外链方式调用 CSS，实现样式与内容的分离，便于维护。

## CSS 工作原理

下面的这张图简要概括了 CSS 是如何渲染到页面上的：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6da7fce341742bd8bab177e2f69da68~tplv-k3u1fbpfcp-watermark.image?" alt="BB0F146EDA10B5603CA31ADDD5E95B60.jpg" width="100%" />

## 选择器

**功能：** 找出页面中的元素，以便于给他们设置样式。  
**选择方式：**

- 按照标签名、类名、或 id
- 按照属性
- 按照 DOM 树中的位置

## 选择器类型示例

**通配选择器**

```js
<h1>标签</h1>
    <p>段落</p>
    <style>
      * {
        color: red;
        font-size: 20px
      }
    </style>
```

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c07e443ee39e4125a4d43bc688d64984~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />

**标签选择器**

```js
<h1>标签</h1>
<p>段落</p>

<style>
  h1 {
    color: orange;
  }
  p {
    color: gray;
  }
</style>
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08ed5b62ce9c46aebcc616c87318aa60~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />

**id 选择器**  
**注意**：id 值唯一

```js
<h1 id="logo">这是logo</h1>

<style>
  #logo {
    color: orange;
  }
</style>
```

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af05d2c1a06d400a9e4d2c4e1041bbd5~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />

**类选择器**  
类名可以不唯一

```js
<ul>
  <li class="done">first</li>
  <li class="done">second</li>
  <li>third</li>
</ul>

<style>
  .done {
    color: red;
  }
</style>
```

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d437afec9614f3cac408e1d5b525636~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />

**属性选择器**

```js
<label>用户名:</label>
<input value="user" disabled></input>
<label>密码:</label>
<input value="passowrd" type="password"></input>

<style>
  [disable] {
    background: #999;
  }
</style>
```

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2087e41c35304068815e1ae1a4260bbf~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

[属性选择器|MDN](https://codepen.io/webzhao/embed/PoJyozZ?default-tab=html%2Cresult&editable=true&theme-id=40116)查看。

## 伪类

**定义**：不基于标签和属性定位元素。  
**分类**：

- 状态伪类
- 结构性伪类

## 伪类示例

**状态伪类：**
根据不同状态显示不同的样式  
[演示链接](https://codepen.io/webzhao/embed/PoJyozZ?default-tab=html%2Cresult&editable=true&theme-id=40116)  
**结构伪类：**
根据不同其在 DOM 树不同节点位置显示不同的样式  
[演示链接](https://codepen.io/webzhao/embed/gOGBORr?default-tab=html%2Cresult&editable=true&theme-id=40116)

## 组合

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/729532443ed74151b0344cc17b83ee62~tplv-k3u1fbpfcp-watermark.image?" alt="3F67EF0E2DFB08739E22EA42CBA058A3.jpg" width="100%" />

## 组合示例

```js
<article>
  <h1>拉森火山国家公园</h1>
  <p>拉森火山国家公园是位于...</p>
  <section>
    <h2>气候</h2>
    <p>因为拉森火山国家公园...</p>
    <p>高于这个高度，气候非常寒冷...</p>
  </section>
</article>

<style>
  article p {
    color: black;
  }

  article > h1 {
    color: blue;
  }

  h2 + p {
    color: red;
  }

  h1~p {
    color: pink
  }
</style>
```

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b16daf07edeb4054a20a416e24cfddd9~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

## 颜色

**RGB**  
通过控制三原色的数量来显示不同的色彩 [示例](https://cdpn.io/webzhao/debug/bGomNLx)  
**HSL**  
H-Hue(色相)取值范围为(0-360)  
S-Saturation(饱和度)取值范围为(0-100%)  
L-Lightness(亮度)取值范围为(0-100%)  
[示例](https://cdpn.io/webzhao/debug/MWEPYMY)  
**alpha**  
**透明度** 取值范围为 0-1，可调节颜色透明度，如`rgba`、`hsla`等，第四参数为透明度值。

## 字体样式 font-family

定义字体样式类型，如`Optima`,`Georgia`等等。通常`font-family`后面定义多个字体类型，防止有些字体某些设备不支持。  
还可以通过`@font-face`调用服务器上的字体文件来使用  
**建议**

- 字体列表最后写上通用字体族
- 英文字体放在中文字体前面

## 字体大小 font-size

**关键字**  
small、medium、large  
**长度**  
px、em  
**百分数**  
相对于父元素字体大小  
**示例**

```js
<section>
  <h1>A web font example</h1>
  <p class="note">Notes: Web fonts ...</p>
  <p>With this in mind, let's build...</p>
</section>

<style>
  section {
    font-size: 20px;
  }

  section h1 {
    font-size: 2em;
  }

  section .note {
    font-size: 80%;
    color: orange;
  }
</style>
```

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbf2781ccf61424682bf18e357e2db4a~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

## 字体粗细 font-weight

值可以为 100、200、300...900，其中 400--normal，700--bold。有些字体不一定有这么多值。

## 行高 light-height

两行文字间的基准线，即两行文字间的距离。

## font 属性

可以将字体的多个属性缩写到 font 一个属性中。

```js
/* 样式 粗细 大小/行高 字体族 */
font: style weight size/height family
```

其中`size`与`family`不可省略。

## text-align 属性

定义文本对齐方式，如`center`(居中)、`left`(左对齐)等等。

## spacig 属性

`letter-spacing`属性定义字符间的间距。  
`word-spacing`属性定义单词间的间距。

## text-indent 属性

定义段落首行缩进量。

## text-decoration 属性

文本修饰属性，可以定义下划线(underline)、删除线(line-through)、上划线(overline)等等。

## white-space 属性

定义对空白符的处理方式。  
normal：默认行为  
nowrap：不换行  
pre：保留原始代码格式，空格及换行等。  
pre-wrap：保留空格同时该换行时会换行。  
pre-line：保留换行，但是合并空格。

## 调试 CSS

- 右键点击页面，选择「检查」
- 使用 快捷键
  - Ctrl+Shift+I (Windows)
  - Cmd+Opt+I (Mac)

## 总结

通过本节课的学习，对 CSS 的流程及构成有了一定的理解，同时对以往学过的 CSS 知识进行了梳理，完善了以往学习过程中所忽略的一些细节点。
