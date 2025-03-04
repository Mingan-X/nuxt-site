---
date: 2023-04-27
title: canvas下雪动画
---

# 前言

当我们想要为网站或应用增加一些节日气氛或趣味性时，下雪动画是一个不错的选择。在网页或应用中添加下雪动画可以为用户带来一种浪漫、温馨的感觉，同时也能吸引用户的注意力。在这篇文章中，我们将介绍如何使用 canvas 来实现下雪动画效果。我们将会讲解如何定义雪花对象、如何绘制雪花、如何更新雪花的位置以及如何循环调用这些函数来实现动画效果。
[jcode](https://code.juejin.cn/pen/7226746124508332087)

### 画布

首先需要一个画布元素

```js
<canvas id="canvas"></canvas>
```

并对`body`元素和画布元素进行简单样式的设置

```js
body {
    margin: 0;
    padding: 0;
  }
canvas {
    display: block;
    background: #000;
}
```

获取画布元素，定义画布的大小

```js
// 获取canvas元素和绘图上下文
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 设置canvas大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

### 雪花对象

```js
// 定义雪花对象
function Snowflake(x, y, radius, speed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = speed;
  this.angle = Math.random() * Math.PI * 2;
}

// 定义雪花数组
var snowflakes = [];

// 添加雪花到数组中
for (var i = 0; i < 400; i++) {
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var radius = Math.random() * 3 + 1;
  var speed = Math.random() * 2 + 1;
  snowflakes.push(new Snowflake(x, y, radius, speed));
}
```

这段代码定义了一个`Snowflake`对象和一个`snowflakes`数组。`Snowflake`对象包含了 x、y、radius、speed 和 angle 五个属性，分别表示雪花的横纵坐标、半径、速度和角度。`snowflakes`数组用于存储所有的雪花对象。

接下来，我们使用一个 for 循环，将 400 个随机生成的雪花对象添加到`snowflakes`数组中。在 for 循环中，我们使用了`Math.random`函数来生成随机的横纵坐标、半径和速度，然后调用`Snowflake`构造函数来创建新的雪花对象，并将其添加到`snowflakes`数组中。

这段代码的作用是初始化雪花数组，以便后面可以对每个雪花对象进行绘制和更新。

### 雪花的绘制与更新

```js
// 绘制雪花
function drawSnowflake(snowflake) {
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

// 更新雪花位置
function updateSnowflake(snowflake) {
  snowflake.x += Math.cos(snowflake.angle) * snowflake.speed;
  snowflake.y += snowflake.speed;

  if (snowflake.x > canvas.width + snowflake.radius) {
    snowflake.x = -snowflake.radius;
  }
  if (snowflake.x < -snowflake.radius) {
    snowflake.x = canvas.width + snowflake.radius;
  }
  if (snowflake.y > canvas.height + snowflake.radius) {
    snowflake.y = -snowflake.radius;
  }
}
```

这里我们定义了`drawSnowflake`函数，用于绘制单个雪花。在函数中，我们使用`canvas`的`arc`方法绘制圆形雪花，并设置颜色为白色。

接着，我们定义了`updateSnowflake`函数，用于更新单个雪花的位置。在函数中，我们使用`cos`函数计算出雪花的 x 轴移动距离，使用`sin`函数计算出雪花的 y 轴移动距离，并根据雪花的速度进行移动。同时，我们还判断了雪花是否越界，并进行了处理。

```js
// 清空画布和绘制雪花
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < snowflakes.length; i++) {
    drawSnowflake(snowflakes[i]);
  }
}

// 更新雪花位置并重新绘制
function update() {
  for (var i = 0; i < snowflakes.length; i++) {
    updateSnowflake(snowflakes[i]);
  }
  draw();
}

// 每隔30毫秒更新一次
setInterval(update, 30);
```

这里我们定义了`draw`函数，用于清空画布并绘制所有的雪花。在函数中，我们使用`canvas`的`clearRect`方法清空画布，然后遍历`snowflakes`数组，对每个雪花对象调用`drawSnowflake`函数进行绘制。

接着，我们定义了`update`函数，用于更新所有雪花对象的位置并重新绘制画布。在函数中，我们遍历`snowflakes`数组，对每个雪花对象调用`updateSnowflake`函数进行位置更新，然后调用`draw`函数重新绘制画布。

最后，我们使用`setInterval`方法每隔 30 毫秒调用一次`update`函数，从而实现动画效果。

# 结语

总的来说，这段代码比较简单易懂，主要涉及到 canvas 的绘图方法和定时器的使用。
