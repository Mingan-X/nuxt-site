---
date: 2023-04-30
title: JS如何实现一个放大镜
---

# 前言

放大镜是一项非常实用的功能，可以帮助用户更好地查看图片的细节。今天就来分享一下如何使用 JS+CSS+HTML 实现一个简单的放大镜。

### HTML 框架

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>放大镜demo</title>
    <link rel="stylesheet" href="magnifier.css">
</head>
<body>
    <div class="container">
        <div class="image-box">
            <img class="image" src="https://picb.zhimg.com/v2-a603a42b65dce394c2ff3e443a3b2074_r.jpg" alt="">
            <div class="magnifier" id="magnifier"></div>
        </div>
    </div>
    <script src="magnifier.js"></script>
</body>
</html>
```

首先，创建类名为**container**的容器，用于包含整个放大镜和图片元素。图像和放大镜元素被包含在类名为**image-box**的 div 元素中。图像元素使用了一个 class 为**image**的类名，src 属性为展示图片的 URL 地址。最后，定义一个 class 为**magnifier**的放大镜元素，并设置其 id 为**magnifier**。这个元素被放置在图像元素的上层，用于实现鼠标移动时的放大效果。

### CSS 样式

```js
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.image-box {
    position: relative;
}

.image {
    display: block;
    max-width: 100%;
    height: 100vh;
}

.magnifier {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 50%;
    pointer-events: none;
    visibility: hidden;
    z-index: 1;
}
```

首先，容器的样式设定使用 flex 布局，使容器内的元素水平和垂直剧中显示，并设置容器高度为 100vh 以占据整个视图界面。接着，图像样式设定中设置**max-width**为 100%，使得图像能够自适应于父元素大小。同时，设定图像高度为 100vh，以实现在视图中占据整个高度的效果。最后，放大镜的样式设定包括了相对位置、大小、边框效果、圆角、指针事件设定等。其中，指针事件设定为**none**，表示鼠标指针不会与放大镜的元素相互干扰，避免干扰到鼠标事件的处理过程。放大镜初始时，将可见性设置为隐藏，以实现鼠标移动在图片上时才出现放大镜的效果。

### JavaScript

```js
// 获取需要操作的元素
const image = document.querySelector(".image");
const magnifier = document.getElementById("magnifier");
const imageUrl = image.src;
// 鼠标移入图片时显示放大镜
image.addEventListener("mouseover", function () {
  magnifier.style.visibility = "visible";
});
// 鼠标移出图片时隐藏放大镜
image.addEventListener("mouseout", function () {
  magnifier.style.visibility = "hidden";
});
// 鼠标移动时实现放大镜效果
image.addEventListener("mousemove", function (e) {
  // 获取放大镜和图片的宽度和高度
  const magnifierWidth = magnifier.offsetWidth;
  const magnifierHeight = magnifier.offsetHeight;
  const imageWidth = image.offsetWidth;
  const imageHeight = image.offsetHeight;
  // 将放大镜的背景图片放大两倍，使用两倍的图片大小以保证明显的放大效果
  const magnifierBackgroundSize = `${imageWidth * 2}px ${imageHeight * 2}px`;
  // 获取鼠标在图片上的位置坐标
  const offsetX = e.offsetX;
  const offsetY = e.offsetY;
  // 计算放大镜需要移动的位置
  const positionX = offsetX - magnifierWidth / 2;
  const positionY = offsetY - magnifierHeight / 2;
  // 计算图片背景的偏移量，这样放大的部分能够与原图对应
  const backgroundPositionX = -positionX * 2;
  const backgroundPositionY = -positionY * 2;
  // 将计算出的值应用于放大镜元素属性
  magnifier.style.background = `url(${imageUrl})`;
  magnifier.style.backgroundSize = magnifierBackgroundSize;
  magnifier.style.left = `${positionX}px`;
  magnifier.style.top = `${positionY}px`;
  magnifier.style.backgroundPositionX = `${backgroundPositionX}px`;
  magnifier.style.backgroundPositionY = `${backgroundPositionY}px`;
});
```

首先，获取到需要操作的元素，包括图片元素和放大镜元素。然后，监听鼠标在图片上的移入移出用来控制放大镜的显隐并监听鼠标的移动事件用来获取需要放大的区域。

接下来，声明一些变量。比如，获取放大镜和图片的宽度和高度。同时，我们需要将放大镜的背景图片放大两倍，使用两倍的图片大小以保证明显的放大效果。并且鼠标当前位置坐标减去放大镜宽度和高度的一半，这样可以使放大镜中心点与鼠标位置对齐。接着，计算图片背景的偏移量，这样放大的部分能够与原图对应。最后，将这些值应用于放大镜元素属性，包括背景图片、背景大小、位置和偏移量。这样就实现了简单的放大镜效果。

# 结语

以上小案例虽然代码量不多，但是功能齐全，易于理解和修改。
