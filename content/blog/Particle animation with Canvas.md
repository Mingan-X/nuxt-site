---
date: 2023-05-05
showTitle: 用Canvas制作粒子动画
---

# 前言

本文介绍了如何用 Canvas 制作文字粒子动画。通过输入文字，程序可以将文字转换成粒子，并在画布上按照一定规律绘制出来。粒子具有一定的运动轨迹，形成独特的动感效果。
[jcode](https://code.juejin.cn/pen/7229687262815748133)

### 1. HTML 和 CSS

在 HTML 中，我们需要引入一个 canvas 元素，并设置它的宽度和高度。同时，在 CSS 中，需要对画布和输入框样式进行简单的设置。

```js
<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        #canvas {
            display: block;
            margin: 0 auto;
        }

        #wrap {
            width: 500px;
            height: 100px;
            margin: 0 auto;
            text-align: center;
        }
    </style>
</head>

<body>
    <canvas id="canvas" width="1000" height="500">浏览器不支持canvas</canvas>
    <div id="wrap">
        <input type="text" id="text" value="文字粒子" width="80px"><input type="submit" id="submit">
    </div>
```

### JS 部分

**1. 获取页面元素和初始化变量**

```js
var submitBtn = document.getElementById("submit"); // 获取提交按钮
var textInput = document.getElementById("text"); // 获取输入框
var canvas = document.getElementById("canvas"); // 获取画布元素
var ctx = canvas.getContext("2d"); // 获取画布上下文

var textValue = ""; // 输入框的值
var initZ = 250; // 粒子的初始 z 坐标
var thisTime = null; // 当前时间
var animTime = null; // 动画开始时间
var grains = []; // 粒子数组
```

**2. 初始化动画函数**

```js
function initAnimation() {
  grains = []; // 清空粒子数组
  textValue = textInput.value; // 获取输入框的值
  drawText(textValue); // 绘制文字
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height); // 获取画布像素数据
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
  // 遍历像素数据，如果像素值大于 128，则创建一个粒子对象并加入粒子数组
  for (var i = 0; i < imgData.width; i += 6) {
    for (var j = 0; j < imgData.height; j += 6) {
      var index = (j * imgData.width + i) * 4;
      if (imgData.data[index] > 128) {
        var grain = new Grain(i, j, 0, 3);
        grains.push(grain);
      }
    }
  }
  animate(); // 开始动画
}
```

- 清空粒子数组：通过  `grains = []`  将粒子数组  `grains`  清空，以便重新生成新的粒子数组。
- 获取输入框的值：通过  `textInput.value`  获取输入框中的值，并赋值给变量  `textValue`。
- 绘制文字：调用  `drawText(textValue)`  函数，将输入框中的文字绘制到画布上。
- 获取画布像素数据：通过  `ctx.getImageData(0, 0, canvas.width, canvas.height)`  获取画布上所有像素- 点的数据，存储在变量  `imgData`  中。
- 清空画布：通过  `ctx.clearRect(0, 0, canvas.width, canvas.height)`  清空画布，以便重新绘制粒子效果。
- 遍历像素数据并创建粒子对象：通过两个  `for`  循环遍历画布上的所有像素点，如果像素值大于 128，则创建一个粒子对象  `grain`，并将其坐标和速度等属性赋值，最后将粒子对象加入粒子数组  `grains`  中。
- 开始动画：调用  `animate()`  函数，开始执行粒子动画效果。

**3. 动画函数**

```js
function animate() {
  thisTime = new Date(); // 获取当前时间
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
  // 遍历粒子数组，更新粒子位置并绘制粒子
  grains.forEach(function (item) {
    if (lock) {
      // 如果锁定粒子位置
      // 如果粒子与目标位置距离小于 0.1，则将粒子位置设为目标位置，并在动画开始后 300 毫秒解锁
      if (
        Math.abs(item.targetX - item.x) < 0.1 &&
        Math.abs(item.targetY - item.y) < 0.1 &&
        Math.abs(item.targetZ - item.z) < 0.1
      ) {
        item.x = item.targetX;
        item.y = item.targetY;
        item.z = item.targetZ;
        if (thisTime - animTime > 300) lock = false;
      } else {
        // 否则更新粒子位置
        item.x += (item.targetX - item.x) * 0.1;
        item.y += (item.targetY - item.y) * 0.1;
        item.z += (item.targetZ - item.z) * 0.1;
        animTime = new Date(); // 更新动画开始时间
      }
    } else {
      // 如果不锁定粒子位置
      // 如果粒子与初始位置距离小于 0.1，则将粒子位置设为初始位置，并暂停动画
      if (
        Math.abs(item.initX - item.x) < 0.1 &&
        Math.abs(item.initY - item.y) < 0.1 &&
        Math.abs(item.initZ - item.z) < 0.1
      ) {
        item.x = item.initX;
        item.y = item.initY;
        item.z = item.initZ;
        pause = true;
        console.log("执行完毕！");
      } else {
        // 否则更新粒子位置
        item.x += (item.initX - item.x) * 0.1;
        item.y += (item.initY - item.y) * 0.1;
        item.z += (item.initZ - item.z) * 0.1;
        pause = false;
      }
    }
    item.draw(); // 绘制粒子
  });

  // 如果未暂停动画，则继续执行动画
  if (!pause) {
    if ("requestAnimationFrame" in window) {
      requestAnimationFrame(animate);
    } else if ("webkitRequestAnimationFrame" in window) {
      webkitRequestAnimationFrame(animate);
    } else if ("msRequestAnimationFrame" in window) {
      msRequestAnimationFrame(animate);
    } else if ("mozRequestAnimationFrame" in window) {
      mozRequestAnimationFrame(animate);
    }
  }
}
```

这段代码其作用是不断更新粒子的位置并绘制粒子，以实现动画效果。它遍历了一个粒子数组，更新粒子的位置并在画布上绘制粒子。粒子的位置更新分为两种情况：锁定粒子位置和不锁定粒子位置。如果锁定粒子位置，则粒子会向目标位置移动，并在到达目标位置后暂停动画一段时间。如果不锁定粒子位置，则粒子会回到其初始位置，并暂停动画。动画的循环是通过递归调用该函数实现的，直到动画暂停。

**4. 粒子构造函数**

```js
function Grain(x, y, z, r) {
  this.x = Math.random() * canvas.width; // x 轴坐标
  this.y = Math.random() * canvas.height; // y 轴坐标
  this.z = Math.random() * initZ * 2 - initZ; // z 轴坐标
  this.initX = Math.random() * canvas.width; // 初始 x 轴坐标
  this.initY = Math.random() * canvas.height; // 初始 y 轴坐标
  this.initZ = Math.random() * initZ * 2 - initZ; // 初始 z 轴坐标
  this.targetX = x; // 目标 x 轴坐标
  this.targetY = y; // 目标 y 轴坐标
  this.targetZ = 0; // 目标 z 轴坐标
  this.radius = r; // 粒子半径
}
```

这段代码定义了一个名为 Grain 的构造函数，用于创建一个粒子对象。粒子的坐标和半径等属性在初始化时随机生成，同时也设置了一个目标坐标。

**5. 粒子原型对象**

```js
Grain.prototype = {
  // 绘制粒子
  draw: function () {
    ctx.save();
    ctx.beginPath();
    var scale = initZ / (initZ + this.z); // 计算粒子缩放比例
    ctx.fillStyle = "rgba(50,50,50," + scale + ")"; // 设置粒子颜色及透明度
    ctx.arc(
      canvas.width / 2 + (this.x - canvas.width / 2) * scale,
      canvas.height / 2 + (this.y - canvas.height / 2) * scale,
      this.radius * scale,
      0,
      2 * Math.PI
    ); // 绘制圆形粒子
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
};
```

这段代码为 Grain 的原型对象添加了一个名为 draw 的方法，用于绘制粒子。先保存画布状态，开始绘制路径，计算粒子缩放比例，设置粒子颜色及透明度，绘制圆形粒子，关闭路径，填充颜色，恢复画布状态。

**6. 绘制文字函数**

```js
function drawText(text) {
  ctx.save();
  ctx.font = "200px 微软雅黑 bold";
  ctx.fillStyle = "rgba(168,168,168,1)";
  ctx.textAlign = "center";
  ctx.textBaseLine = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  ctx.restore();
}
```

这段代码定义了一个名为 `drawText` 的函数，用于在画布上绘制文本。

```
ctx.save();
```

这行代码是为了保存当前画布的状态，以便在绘制文本后能够恢复到之前的状态。

```
ctx.font = "200px 微软雅黑 bold";
```

这行代码设置文本的字体样式。其中，`200px` 表示字体大小为 200 像素，`微软雅黑` 是字体名称，`bold` 表示使用粗体。

```
ctx.fillStyle = "rgba(168,168,168,1)";
```

这行代码设置文本的填充颜色。其中，`rgba` 表示使用红、绿、蓝三原色加上透明度来定义颜色，`(168,168,168,1)` 表示颜色为灰色，透明度为 1，即不透明。

```
ctx.textAlign = "center"
```

这行代码设置文本的对齐方式为居中对齐。

```
ctx.textBaseLine = "middle";
```

这行代码设置文本的基线位置为中间。

```
ctx.fillText(text, canvas.width / 2, canvas.height / 2);
```

这行代码绘制文本。其中，`text` 是要绘制的文本内容，`canvas.width / 2` 和 `canvas.height / 2` 分别是画布宽度和高度的一半，用于确定文本的绘制位置。

```
ctx.restore();
```

这行代码用于恢复之前保存的画布状态，以便后续的绘制操作不受影响。

**7. 点击提交按钮时执行初始化动画并锁定粒子位置**

```js
submitBtn.onclick = function () {
  initAnimation();
  lock = true;
  pause = false;
};
```

**8. 页面加载完成后执行初始化动画**

```js
window.onload = function () {
  // ...
  initAnimation();
};
```

# 结语

通过以上代码便可以实现一个文字粒子动画啦！！！
