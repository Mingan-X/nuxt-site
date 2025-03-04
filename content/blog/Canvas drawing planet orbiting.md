---
date: 2023-03-20
title: canvas绘制行星环绕
---

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/099e7c6c83e5400daafa0daf7a297e14~tplv-k3u1fbpfcp-watermark.image?" alt="太阳与月亮.gif" width="100%" />

## 前言

最近学校学了一些 JavaScript 课程，其中涉及到了部分有关于 canvas 的知识点，万万没想到老师只是用了一节课提了一下有关 canvas 的一些有关使用就布置下来了一个作业--采用 canvas 绘制一个简易太阳系，咱作为学生还能说啥，只能冲啦。

## 实现原理

只是单纯的 canvas 方法的使用再加上一点点 js 的使用就可以实现这个简单的实例啦。

## 实现代码

**html 部分**

```html
<!-- 画布元素 -->
<canvas id="canvas"></canvas>
```

**初始化画布**  
js 获取画布元素，初始化画布背景色为黑色，设置画布真实绘制宽高为 1200，浏览器呈现宽高为 600px,`getContext('2d')`获取画布的 2D 上下文。

```js
let canvas = document.getElementById("canvas");
canvas.style.background = "black";
// 浏览器渲染出画布宽高
canvas.style.width = 600 + "px";
canvas.style.height = 600 + "px";
// 绘制画布真实宽高
canvas.width = 1200;
canvas.height = 1200;
let context = canvas.getContext("2d");
```

**绘制太阳**  
绘制一个圆心为(600,600)半径为 100 的圆，在绘制前有几点要了解，因为 canvas 只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）,所以我们要使用到路径绘制函数。其中`beginPath()`新建一条路径，在该路径闭合前，图像绘制将在该路径中进行，其中`fillSyle`设置的是图像填充色，通常以`closePath()`闭合该路径，但由于`fill()`会自动闭合路径所以`closePath()`可以省去。详情可以参考[MDN|Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

```js
context.beginPath(); // 开始路径绘制
context.arc(600, 600, 100, 0, Math.PI * 2, true);
context.fillStyle = "red"; // 图形填充色
context.fill(); // 进行填充
```

**绘制地球轨道**  
与上面太阳的绘制相差不大，将填充换为了描边。`strokeStyle`定义图形轮廓颜色，`stroke()`开始绘制轮廓，最后采用`closePath()`闭合路径。

```js
context.beginPath();
context.arc(600, 600, 300, 0, Math.PI * 2, true); // 圆心(300,300) 半径为150的圆环
context.strokeStyle = "rgb(255,255,255,0.3)";
context.stroke();
context.closePath();
```

**绘制地球**  
**注意：** 这里地球的圆心坐标为(0,0)这是因为我们调用了`translate()`这一函数，通过这一函数我们将起始点偏移到指定位置，下文将以此坐标为新的起始点。此外需要用`save()`保存当前画布状态，不然后续循环会出问题。再调用`rotate()`方法实现旋转，其中`rotate()`是使得其下文绘制的图形实现旋转，旋转中心为当前起始点坐标。

```js
context.save(); // 保存当前状态

var angle = (time * Math.PI) / 180 / 8;
context.translate(600, 600); // 起始点偏移量,太阳中心
context.rotate(angle);

context.translate(300, 0); // 地球，月球轨道中心
context.beginPath();
context.arc(0, 0, 40, 0, 2 * Math.PI, false);
context.fillStyle = "blue";
context.strokeStyle = "blue";
context.fill();
```

**月球轨道及月球**

```js
// 月球轨道
context.beginPath();
context.arc(0, 0, 100, 0, Math.PI * 2, true);
context.strokeStyle = "rgb(255,255,255,0.3)";
context.stroke();
context.closePath();

context.rotate(-8 * angle);

// 月球
context.beginPath();
context.arc(100, 0, 20, 0, 2 * Math.PI, false);
context.fillStyle = "#fff";
context.fill();
```

**js 完整部分**  
定义一个绘制函数`draw()`，通过`setInterval()`函数循环调用，其中要注意在使用`save()`函数后要调用`restore()`函数恢复状态，为下次的绘制做准备。

```js
let canvas = document.getElementById("canvas");
canvas.style.background = "black";
// 浏览器渲染出画布宽高
canvas.style.width = 600 + "px";
canvas.style.height = 600 + "px";
// 绘制画布真实宽高
canvas.width = 1200;
canvas.height = 1200;
let context = canvas.getContext("2d");
// context.scale(2, 2)

let time = 0;
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // 清除所选区域
  // 绘制太阳
  context.beginPath(); // 开始路径绘制
  context.arc(600, 600, 100, 0, Math.PI * 2, true);
  context.fillStyle = "red"; // 图形填充色
  context.fill(); // 进行填充
  // 绘制地球轨道
  context.beginPath();
  context.arc(600, 600, 300, 0, Math.PI * 2, true); // 圆心(300,300) 半径为150的圆环
  context.strokeStyle = "rgb(255,255,255,0.3)";
  context.stroke();
  context.closePath();

  context.save(); // 保存当前状态

  var angle = (time * Math.PI) / 180 / 8;
  context.translate(600, 600); // 起始点偏移量,太阳中心
  context.rotate(angle);

  context.translate(300, 0); // 地球，月球轨道中心
  // 地球
  context.beginPath();
  context.arc(0, 0, 40, 0, 2 * Math.PI, false);
  context.fillStyle = "blue";
  context.strokeStyle = "blue";
  context.fill();

  // 月球轨道
  context.beginPath();
  context.arc(0, 0, 100, 0, Math.PI * 2, true);
  context.strokeStyle = "rgb(255,255,255,0.3)";
  context.stroke();
  context.closePath();

  context.rotate(-8 * angle);

  // 月球
  context.beginPath();
  context.arc(100, 0, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#fff";
  context.fill();

  context.restore(); // 恢复状态
  time++;
}
setInterval(draw, 30);
```

[jcode](https://code.juejin.cn/pen/7212259093598175265)

## 结语

以上过程便能简单的绘制一个简易太阳系图形动画了，通过文档就能快速的绘制一个简单的图形，但是要绘制复杂的图形的话还是要花时间去研究一下文档。
