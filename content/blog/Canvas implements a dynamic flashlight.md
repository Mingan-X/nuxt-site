---
date: 2023-05-01
showTitle: 用Canvas实现一个动态手电筒，让你体验真实光圈效果！
---

# 前言

今天我们要介绍的是一个基于 Canvas 的动态手电筒。这个手电筒可以通过鼠标的移动来模拟手电筒光圈，实现一个真实的手电筒体验。代码比较简单，让我们一起来看看如何实现。

首先让我们来看看这个手电筒的页面代码。我们可以看到这个页面主要由一个 canvas 元素构成，canvas 是 HTML5 提供的用于绘图的标签。

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>手电筒</title>
</head>
<body>
    <canvas></canvas>
</body>
</html>
```

接下来我们来看看 HTML 中的 style 部分。首先对内外边距进行样式重置并且我们设置了整个 body 元素的样式，使其铺满整个屏幕。

```js
* {
    margin: 0;
    padding: 0;
    }
body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(https://pic2.zhimg.com/v2-4d0f3e43e75bb67646215e259fc2e9ad_r.jpg) no-repeat;
    background-size: cover;
    background-position: center;
}
```

其中，background 属性指定了页面的背景图片，并设置了图片的尺寸和位置。

接下来我们来看 canvas 元素的样式：

```js
canvas {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    pointer-events: none;
}
```

这里我们将 canvas 的位置设置为定位（position: fixed），并将其置于屏幕最上方（z-index: 999）。pointer-events 属性设置为 none，这意味着我们可以忽略 canvas 元素的鼠标事件，让鼠标事件穿透并传递到下面的元素上。

接下来是 JavaScript 代码的部分。

我们首先获取了 canvas 元素和它的上下文（context）。然后声明了一个 position 对象，用于记录鼠标位置以及光圈的半径。

```js
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const position = {
  x: 0,
  y: 0,
  r: 50,
};
```

接下来是两个关键的函数：init 和 render。在 init 函数中，我们初始化了 canvas 元素并绘制了初始的黑色背景。而在 render 函数中，我们通过鼠标的位置来动态渲染光圈的大小，并在 canvas 上创建一个放射渐变效果，来模拟真实的手电筒光源。

```js
function render() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var radial = ctx.createRadialGradient(
    position.x,
    position.y,
    position.r,
    position.x,
    position.y,
    position.r * 3
  );
  radial.addColorStop(0, "rgba(255,255,255,0)");
  radial.addColorStop(1, "rgba(0,0,0,0.9)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function init() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var radial = ctx.createRadialGradient(
    position.x,
    position.y,
    position.r,
    position.x,
    position.y,
    position.r * 3
  );
  radial.addColorStop(1, "rgba(0,0,0,0.9)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
```

其中，createRadialGradient 函数可以创建一个放射渐变效果，其参数分别是光源的位置和大小。

最后，我们通过给 document 对象添加鼠标事件监听器来实现鼠标位置的实时更新。当鼠标移动时，我们便可以动态地渲染光圈的大小和位置了。

```js
document.onmousemove = (e) => {
  position.x = e.clientX;
  position.y = e.clientY;
  render();
};
window.onload = function () {
  init();
};
```

现在，我们已经可以鼠标在页面上的移动来模拟手电筒的光线了！

# 结语

以上便可以通过简短易懂的代码来实现一个有趣的效果动画，
