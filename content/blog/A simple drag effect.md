---
date: 2023-04-25
title: 如何使用HTML、CSS和JavaScript实现一个简单的拖拽效果？
---

# 前言

在前端开发中，拖拽是一种常见的交互方式。在本文中，我们将介绍如何使用 HTML、CSS 和 JS 实现一个简单的拖拽效果。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6368e27a917e4117be4c03bd1b54b633~tplv-k3u1fbpfcp-watermark.image?" alt="1682432343891 -original-original.gif" width="100%" />

### HTML

首先，我们需要在 HTML 中定义拖拽容器和拖拽项目。在本例中，我们使用了一个包含多个空容器和一个拖拽项目的 HTML 结构。其中，拖拽项目使用了**draggable**属性，表示该元素可以被拖拽，拖拽容器使用了 class 属性为**empty**。

```js
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>拖拽效果</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="empty">
    <div class="fill" draggable="true"></div>
  </div>
  <div class="empty"></div>
  <div class="empty"></div>
  <div class="empty"></div>
  <div class="empty"></div>
  <script src="script.js"></script>
</body>
</html>
```

### CSS

接下来，我们需要使用 CSS 样式来定义拖拽容器和拖拽项目的样式。在本例中，我们使用了 flex 布局来实现容器的排列，并使用 box-sizing 属性来定义元素的盒模型。同时，我们还定义了拖拽项目的样式，包括背景图片、大小和光标样式等。

```js
* {
  box-sizing: border-box;
}

body {
  background-color: steelblue;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

先利用通配符选择器，将所有元素的盒模型设置为 border-box，这样元素的宽度和高度就包括了边框和内边距。再对 body 元素的样式进行定义。其中，设置了背景颜色 steelblue,display 属性设置了元素为 flex 布局,align-items 和 justify-content 属性分别设置了元素在交叉轴和主轴上的对齐方式为居中，height 属性设置了元素的高度为 100vh，overflow 属性设置了元素的溢出隐藏，margin 属性设置了元素的外边距为 0。
此时页面效果：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d423bf563b394977a43b2bd58d1be974~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

此时总体容器样式已经有了，接下来将拖拽容器放入：

```js
.empty {
  height: 150px;
  width: 150px;
  margin: 10px;
  border: 3px solid black;
  background-color: white;
}

.fill {
  background-image: url('./source-404.jpg');
  background-size: cover;
  background-position: center;
  height:145px;
  width: 145px;
  cursor: pointer;
}

.hold {
  border: solid 5px #ccc;
}

.hovered {
  background-color: #333;
  border-color: white;
  border-style: dashed;
}
```

**empty**定义了拖拽容器的样式,对其宽高、外边距、边框和外边距进行了定义,**fill**定义了拖拽项目的样式,包括背景图片、大小、位置、高度、宽度和光标样式。**background-size: cover**设置背景图片的大小为 cover,即保持宽高比缩放图片以填充整个元素。**background-position: center**设置了背景图片的位置为中心,即将背景图片水平和垂直居中。而**cursor: pointer**设置了鼠标悬停在拖拽项目上时的光标样式为指针,表示该元素可被点击或拖拽。**hold**定义了拖拽项目被拖动时的样式,当拖动时对边框进行改变,表示正在被拖拽。**hovered**定义了拖拽容器被拖拽项目悬停时的样式,当拖拽元素位于该容器上方时,修改该容器背景颜色为#333 同时修改边框为白色虚线。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ecfeb0cfda14751a7ec9cf608368863~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

此时页面样式已经有了，但是还无法拖动，接下来就为其添加拖动事件。

### JavaScript

```js
const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");
for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
}
// 被拖拽元素
fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);
function dragStart() {
  this.className += " hold";
  setTimeout(() => (this.className = "invisble"), 0);
}

function dragEnd() {
  this.className = "fill";
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += " hovered";
}

function dragLeave() {
  this.className = "empty";
}

function dragDrop() {
  this.className = "empty";
  this.append(fill);
}
```

这段代码使用了`querySelectorAll`方法获取了所有类名为`empty`的元素，并使用`for...of`循环遍历每个元素。然后，为每个元素都添加了以下四个事件监听器：`dragover`：当一个被拖拽的元素在当前元素上方移动时触发，`dragenter`：当一个被拖拽的元素进入当前元素时触发。`dragleave`：当一个被拖拽的元素离开当前元素时触发，`drop`：当一个被拖拽的元素被放置在当前元素上时触发。这些事件监听器的作用是为了实现拖拽功能中的放置和移动操作。同时对`fill`类名的元素的拖放事件进行监听。

下面是对个函数功能的解释：

1. `dragStart()`：当被拖拽元素开始被拖拽时触发，给该元素添加`hold`类名，然后通过`setTimeout`将该元素的类名变为`invisible`，从而使该元素在开始被拖拽后变为透明不可见。
2. `dragEnd()`：当被拖拽元素结束被拖拽时触发，将该元素的类名重新变为  `fill`。
3. `dragOver(e)`：当被拖拽元素被拖拽到一个可放置的区域上时触发，通过`e.preventDefault()`阻止默认行为。
4. `dragEnter(e)`：当被拖拽元素进入一个可放置的区域时触发，给该区域添加`hovered`类名。
5. `dragLeave()`：当被拖拽元素离开一个可放置的区域时触发，将该区域的类名重新变为`empty`。
6. `dragDrop()`：当被拖拽元素被放置到一个可放置的区域上时触发，将该区域的类名重新变为`empty`，并将被拖拽元素添加到该区域中。

# 结语

这样我们就成功地实现了一个简单的拖拽功能。通过这个例子，我们可以看到 JavaScript 可以帮助我们实现很多有趣的功能，使网页变得更加丰富多彩。
