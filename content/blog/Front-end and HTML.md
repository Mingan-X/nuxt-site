---
date: 2023-01-15
showTitle: 前端与HTML|青训营笔记
---

这是我参与「第五届青训营」笔记创作活动的第 1 天

# 课堂笔记

## 课程重点

1. 前端工作的定义
2. 前端技术栈拆解与分析
3. HTML 作用解析
4. HTML 语义化

## 前端

### 前端的定义

- 解决 GUI 人机交互问题
- 跨终端
  - PC/移动浏览器
  - 客户端/小程序
  - VR/AR 等
- Web 技术栈

**总结**：前端工程师就是利用 Web 技术栈来解决多端图形界面下人机交互问题的工程师

### 前端技术栈

- HTML---负责页面结构与内容
- CSS---设置页面样式
- JavaScript---定义网页的行为

**补充**：HTML、CSS、JavaScript 都是运行在浏览器上，而浏览器可以通过网络协议与服务器进行通信从而实现页面的渲染与数据的交互。

### 前端关注点

前端应该关注哪些方面的问题？

- 界面的美观
- 安全性
- 功能完整
- 性能
- 兼容性
- 无障碍

## HTML

HTML(HyperText Markup Language)超文本标记语言，不是一门编程语言，而是一种用来告知浏览器如何组织页面的**标记语言**

### HTML 文件

`<!doctype html>`:标记当前 html 文件的版本，浏览器根据 html 版本来决定渲染模式，如果不写，浏览器可能会以一种老旧的怪异的模式进行渲染从而导致效果偏差。  
`<html>`:文档的根节点  
`<head>`:含有 HTML 中的元数据，如网页的标题，CSS 的链接等，head 部分不会显示在浏览器中。  
`<body>`:呈现给用户的主要内容。  
**DOM 树**:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10bbfad937774b1eb45b3f7acb3135b8~tplv-k3u1fbpfcp-watermark.image?)
**空标签**：空元素，没有结束标签。如`<input>`、`<img>`、`<br`>等

### HTML 语法

1. 标签和属性不区分大小写，推荐**小写**
2. 空标签可以不闭合
3. 属性值推荐用**双引号**包裹
4. 某些属性值可以省略，如 required、readonly。

### HTML 标签

- **标题 h1~h6**

```js
<h1>h1~h6标签</h1>
<h2>h1~h6标签</h2>
<h3>h1~h6标签</h3>
<h4>h1~h6标签</h4>
<h5>h1~h6标签</h5>
<h6>h1~h6标签</h6>
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cfa270f47544bfca3e36f1d7f4414d4~tplv-k3u1fbpfcp-watermark.image?)
**文档各级标题，级数越大，标题字体越小**

- **列表标签**

```js
<h2>有序列表</h2>
<ol>
  <li>列表项1</li>
  <li>列表项2</li>
</ol>
<h2>无序列表</h2>
<ul>
  <li>列表项1</li>
  <li>列表项2</li>
</ul>
<h2>描述列表</h2>
<dl>
  <dt>属性名:</dt>
  <dd>属性值</dd>
</dl>
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be119bf5beca429295ad3d3a415cc567~tplv-k3u1fbpfcp-watermark.image?)

- **链接标签**  
  `<a></a>`,`href`属性指定链接地址，`target`属性指定页面跳转方式，`_blank`新标签页打开，`_sel`f 原标签页打开
- **图片标签**  
  `<img>`,可不闭合标签，`src`属性：图片地址，`alt`属性：图片加载失败时显示的文档。
- **音频标签**  
  `<audio>`,可不闭合标签，`src`属性：音频地址，`controls`属性：显示浏览器默认音频控件。
- **视频标签**  
  `<video>`,可不闭合标签，`src`属性：视频地址，`controls`属性：显示浏览器默认视频控件。
- **输入框**  
  `<input>`,可不闭合标签，`type`属性：输入框类型，如`password`、`checkbox`、`text`等。
- **数据列表**  
  `<datalist><option></option>..</datalist>`，可以通过`id`值的绑定，作为`input`输入框输入时的提示信息。
- **文本框**  
  `<textarea></textarea>`，文本输入框，可以输入多行文本，可以调节大小。
- **下拉框**  
  `<select><option></option>..</select>`，`option`为下拉选项。
- **引用标签**
  - `<cite></cite>`，短引用，斜体显示。
  - `<q></q>`，短引用，双引号引用。
  - `<code></code>`，代码形式引用。
  - `<blockquote></blockquote>`，块级引用，可引用多行文本。
- **预文本**
  - `<pre></pre>`，将文本内容以原文本格式在浏览器中显示。
- **强调标签**
  - `<strong></strong>`，加粗文本表强调。
  - `<em></em>`，斜体样式表强调。
- **内容划分**
  - `<header></header>`，用于包裹页面头部部分。
  - `<nav></nav>`，用于包裹页面导航部分。
  - `<main></main>`，用于包裹页面主体部分。
  - `<article></article>`，通常用于表示文章部分。
  - `<aside></aside>`，通常用于表示侧边栏部分。
  - `<footer></footer>`，通常用于表示页面页脚部分。

### HTML 语义化

遵循语义来编写 HTML，可以提升代码的可读性，便于后期的维护，同时也优化了搜索引擎，不仅提升了性能和维护性，同时也更好的实现了无障碍阅读，对用户更加友好，提升用户的使用体验。

### 总结

通过这节课，我对前端这一概念有了更加深入的认识，同时也发现了曾经学习时所忽略的东西，如代码的性能，用户体验等等，以往只是简单将页面实现即可，而忽视了这些，以后我将规范我的编程习惯，提升编程能力的提升也要重视编程素养的提升。
