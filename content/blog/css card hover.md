---
date: 2023-04-19
title: css卡片悬停
---

# 前言

今天分享一个简单的卡片鼠标悬停动画，初始显示一张图片，当鼠标移至卡片上方时，显示文字，先来看看预览效果：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53fda562fff34a7aa4cd67f033253c3a~tplv-k3u1fbpfcp-watermark.image?" alt="1.gif" width="100%" />

## 代码实现

### 页面布局

```js
<div class="view view-first">
  <img src="./images/1.webp" />
  <div class="mask">
    <h2>Title</h2>
    <p>Your Text</p>
    <a href="#" class="info">
      Read More
    </a>
  </div>
</div>
```

这段代码了一个用于展示图片的容器 `<div>` 元素，其中包含了一个图片 `<img>` 元素和一个用于显示图片标题、文字和链接的 `<div>` 元素。这个容器使用了类名为 `view` 和 `view-first` 的 CSS 类来进行样式控制。

### 页面样式

```js
.view {
    width: 1080px;
    height: 1430px;
    margin: 10px auto;
    border: 10px solid red;
    overflow: hidden;
    position: relative;
    text-align: center;
    box-shadow: 1px 1px 2px #e6e6e6;
    cursor: pointer;
}
.view .mask, .view .content {
    width: 1080px;
    height: 1430px;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0
}
.view h2 {
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    font-size: 180px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.6);
    margin: 220px 0 0 0
}
.view p {
    font-family: Georgia, serif;
    font-style: italic;
    font-size: 120px;
    color: #fff;
    padding: 10px 20px 20px;
    text-align: center
}
.view a.info {
    display: inline-block;
    text-decoration: none;
    padding: 7px 14px;
    font-size: 60px;
    background: #000;
    color: #fff;
    text-transform: uppercase;
    box-shadow: 0 0 1px #000
}
.view a.info:hover {
    box-shadow: 0 0 5px #000
}


.view-first img {
    transition: all 0.2s linear;
}
.view-first .mask {
    opacity: 0;
    background-color: rgba(219,127,8, 0.7);
    transition: all 0.4s ease-in-out;
}
.view-first h2 {
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.2s ease-in-out;
}
.view-first p {
    transform: translateY(100px);
    opacity: 0;
	transition: all 0.2s linear;
}
.view-first a.info{
    opacity: 0;
	transition: all 0.2s ease-in-out;
}

.view-first:hover img {
	transform: scale(1.2);
}
.view-first:hover .mask {
	opacity: 0.8;
}
.view-first:hover h2,
.view-first:hover p,
.view-first:hover a.info {
    opacity: 1;
    transform: translateY(0px);
}
.view-first:hover p {
    transition-delay: 0.1s;
}
.view-first:hover a.info {
    transition-delay: 0.2s;
}
```

这段 CSS 代码定义了 `.view` 和 `.view-first` 这两个类的样式属性。其中，`.view` 类定义了容器的基本样式，包括宽度、高度、边距、背景颜色、阴影等。`.view-first` 类定义了容器在鼠标悬停时的效果，包括图片放大、遮罩层透明度变化、标题、文字和链接的透明度和位置变化等。这段代码通过使用伪类 `:hover` 来控制在鼠标悬停时的效果。同时，这段 CSS 代码中包含了一些过渡效果（transition），通过设置不同的过渡时间和延迟时间，实现了在鼠标悬停时的平滑动画效果。同时，通过使用透明度（opacity）、位移（transform: translateY()）和缩放（transform: scale()）等属性，实现了图片和文字的渐现和渐变效果。接下来对各个样式进行详细解释：

```js
.view {
    width: 1080px;
    height: 1430px;
    margin: 10px auto;
    border: 10px solid red;
    overflow: hidden;
    position: relative;
    text-align: center;
    box-shadow: 1px 1px 2px #e6e6e6;
    cursor: pointer;
}
```

设置容器元素的宽度和高度，`margin: 10px auto;`设置容器元素的外边距，使其在水平方向上居中，上下边距为 10 像素，`text-align: center;`文本的水平对齐方式为居中，`box-shadow: 1px 1px 2px #e6e6e6;`设置容器元素的阴影效果，水平和垂直偏移都为 1 像素，模糊半径为 2 像素，阴影颜色为 #e6e6e6。`cursor: pointer;`设置鼠标悬停在容器元素上时的光标样式为手型。

```js
.view .mask, .view .content {
    width: 1080px;
    height: 1430px;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0
}
```

选中类名为 "mask" 和 "content" 的元素，采用绝对定位，设置`top`和`left`偏移量为 0。

```js
.view h2 {
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    font-size: 180px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.6);
    margin: 220px 0 0 0
}
```

对字体颜色和大小进行设置，文字水平居中，设置背景色等，`text-transform: uppercase;`设置标题文本转换为大写。

```js
.view p {
    font-family: Georgia, serif;
    font-style: italic;
    font-size: 120px;
    color: #fff;
    padding: 10px 20px 20px;
    text-align: center
}
.view a.info {
    display: inline-block;
    text-decoration: none;
    padding: 7px 14px;
    font-size: 60px;
    background: #000;
    color: #fff;
    text-transform: uppercase;
    box-shadow: 0 0 1px #000
}
.view a.info:hover {
    box-shadow: 0 0 5px #000
}
```

对子元素`p`标签和指定`a`标签进行字体样式进行设置，`text-decoration: none;`去除下划线，`a`元素在鼠标悬停状态下的添加阴影。

```js
.view-first img {
    transition: all 0.2s linear;
}
.view-first .mask {
    opacity: 0;
    background-color: rgba(219,127,8, 0.7);
    transition: all 0.4s ease-in-out;
}
.view-first h2 {
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.2s ease-in-out;
}
.view-first p {
    transform: translateY(100px);
    opacity: 0;
	transition: all 0.2s linear;
}
.view-first a.info{
    opacity: 0;
	transition: all 0.2s ease-in-out;
}

.view-first:hover img {
	transform: scale(1.2);
}
.view-first:hover .mask {
	opacity: 0.8;
}
.view-first:hover h2,
.view-first:hover p,
.view-first:hover a.info {
    opacity: 1;
    transform: translateY(0px);
}
.view-first:hover p {
    transition-delay: 0.1s;
}
.view-first:hover a.info {
    transition-delay: 0.2s;
}
```

对各元素在鼠标悬停状态下的样式进行设置，并添加动画效果，主要动画元素`transform: scale(1.2);`图片在悬停状态下缩放 1.2 倍，`transform: translateY(0px);`在 y 轴上偏移量，`transition-delay: 0.1s;`动画延迟时间，`ease-in-out`缓入缓出。

# 结语

以上便是全部代码了，总体比较简单，只需要使用一些简单的动画属性即可，喜欢的小伙伴可以拿去看看，根据自己想要的效果进行修改。
