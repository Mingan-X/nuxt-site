---
date: 2023-05-03
title: 初识HTML中的时钟制作
---

# 前言

时钟是我们生活中最常用的物品之一，它不仅可以帮助我们规划时间，还能作为家居装饰，甚至是一种时尚元素。本文将主要介绍如何使用 HTML 制作一个简单的时钟，并加入更改主题的按钮功能，同大家一起学习参考。
https://code.juejin.cn/pen/7228984386258436133?mode=light

### 准备工作

在制作时钟之前，我们需要先创建一个 HTML 页面，并在其中引入所需的 CSS 和 JavaScript 文件，在这里我使用的是内联样式表和内联脚本，具体代码如下面所示。

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>制作一个时钟</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
     <!-- 时钟容器 -->
    <div class="clockContainer">
        <!-- 刻度文本 -->
        <span>12</span><span>3</span><span>6</span><span>9</span>
        <!-- 时间显示及样式 -->
        <div class="timeDisplay"></div>
        <!-- 换肤按钮 -->
        <button class="btn" onclick="toggleTheme()">换肤</button>
        <!-- 时针及样式 -->
        <div class="hourHand"></div>
        <!-- 分针及样式 -->
        <div class="minHand"></div>
        <!-- 秒针及样式 -->
        <div class="secHand"></div>
        <!-- 中心点样式 -->
        <div class="circle"></div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

在上面代码中，我们使用了 HTML 来创建一个 div 容器，容器里包含了时钟所需的元素：12、3、6、9 四个数字、中心圆圈、时针、分针、秒针和时间显示，同时还有一个换肤按钮。

### 时钟样式

1.  通用样式部分：设置所有元素的 margin 和 padding 为 0，消除浏览器默认样式；

```js
/*全局样式重置*/
* {
    margin: 0;
    padding: 0;
}
```

2.  全局样式部分：设置 body 的背景颜色为深灰色，文本颜色为白色；

```js
/*设置背景色*/
body {
    height: 100vh;
    min-height: 600px;
    background: #333;
    color: #fff;
}
```

3.  时钟容器样式部分：设置时钟容器的位置为相对定位，水平和垂直居中显示，容器宽高为 400px，背景为淡紫色，圆角为 50%，添加圆形阴影；

```js
/*时钟容器，居中且有圆角效果*/
.clockContainer {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #c2c2ff;
    border-radius: 50%;
    box-shadow: 0 0 15px #c2c2ff;
}
```

4.  刻度文字样式部分：设置刻度文字的位置为绝对定位，水平和垂直居中，采用 Flex 布局，字体颜色为浅蓝色，字体大小为 25px，字体粗细为粗体，添加黑色阴影效果，根据不同位置的刻度采用不同的对齐方式；

```js
/*每个刻度文字，根据位置不同分别设置对齐方式*/
.clockContainer span {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    color: aliceblue;
    font-size: 25px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    text-shadow: 0 0 5px black;
}

.clockContainer span:nth-child(1) {
    align-items: flex-start;
    justify-content: center;
}

.clockContainer span:nth-child(2) {
    align-items: center;
    justify-content: flex-end;
}

.clockContainer span:nth-child(3) {
    align-items: flex-end;
    justify-content: center;
}

.clockContainer span:nth-child(4) {
    align-items: center;
    justify-content: flex-start;
}
```

5.  时针、分针和秒针样式部分：分别设置时针、分针和秒针的位置为相对定位，颜色和长度等根据需求设置，使用 transform-origin 属性设置旋转中心位置，使用 transform 属性移动针的位置，添加阴影效果；

```js
/*小时针样式*/
.hourHand {
  width: 8px;
  height: 30%;
  background: #ced6ea;
  left: 50%;
  top: 20%;
  position: absolute;
  border-radius: 4px;
  transform-origin: center bottom;
  box-shadow: -2px -2px 5px black;
  transform: translateX(-50%);
}

/*分钟针样式*/
.minHand {
  width: 4px;
  height: 35%;
  background: #c2ffff;
  left: 50%;
  top: 15%;
  position: absolute;
  border-radius: 2px;
  transform-origin: center bottom;
  box-shadow: -2px -2px 5px black;
  transform: translateX(-50%);
}

/*秒针样式*/
.secHand {
  width: 2px;
  height: 40%;
  background: #ff4757;
  left: 50%;
  top: 10%;
  position: absolute;
  border-radius: 1px;
 transform-origin: center bottom;
 box-shadow: -2px -2px 5px black;
 transform: translateX(-50%);
}
```

6. 中心点样式部分：设置一个圆形的背景色和阴影效果，让中心点看起来更加突出；

```js
/*中心点样式*/
.circle {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #1e90ff;
    box-shadow: 0 0 5px black;
}
```

7. 时间显示样式部分：置了字体大小、位置、颜色、背景色和边框的样式，让时间显示更加醒目；

```js
/*时间显示*/
.timeDisplay {
    position: absolute;
    font-size: 20px;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -50%);
    color: #1e90ff;
    background: black;
    padding: 4px;
    border-radius: 5px;
}
```

8. 按钮的样式：设置了按钮的大小、字体大小、圆角、位置和光标样式，让按钮看起来更加美观且易于操作；

```js
/*按钮样式*/
.btn {
    width: 80px;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    position: absolute;
    right: 40%;
    top: 20px;
    cursor: pointer;
}
```

9. 不同主题下的样式：lightTheme 表示浅色主题，darkTheme 表示深色主题。这两个样式类的主要效果是改变时钟页面中的背景色和文字颜色，实现了不同主题之间的快速切换

```js
/*不同皮肤颜色*/
.lightTheme {
    background-color: #f2f2f2;
    color: #333;
}

.darkTheme {
    background-color: #333;
    color: #f2f2f2;
}
```

### 时钟功能实现

1.  获取五个需要绑定的元素

这个部分代码的主要作用是获取时钟程序所需要用到的五个 HTML 元素，它们分别是：时针、分针、秒针、时间显示区域和时钟的主容器。这里使用了查询选择器  `querySelector`  来查找对应的元素，并使用  `const`  定义常量变量，保证了这些元素在后面的操作中不会被修改。

```js
/*获取五个需要绑定的元素*/
const hourHand = document.querySelector(".hourHand");
const minHand = document.querySelector(".minHand");
const secHand = document.querySelector(".secHand");
const timeDisplay = document.querySelector(".timeDisplay");
const clockContainer = document.querySelector(".clockContainer");
```

2.  时钟精灵

这段代码是主要的时钟程序，通过获取当前的时间来计算出时针、分针、秒针的旋转角度，并使用 CSS 的  `transform`  属性来实现指针的旋转，最后将时针、分针和秒针的角度和时间格式写入到页面上，并更新对应的 HTML 内容。

```js
/*时钟精灵*/
function clockSprite() {
  /*获取当前时间*/
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  /*时针旋转角度*/
  const hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;
  /*分针旋转角度*/
  const minAngle = (minutes / 60) * 360;
  /*秒针旋转角度*/
  const secAngle = (seconds / 60) * 360;

  /*旋转时针、分针、秒针*/
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
  minHand.style.transform = `rotate(${minAngle}deg)`;
  secHand.style.transform = `rotate(${secAngle}deg)`;

  /*时间显示*/
  timeDisplay.innerHTML = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
```

3.  开启定时任务

使用  `setInterval`  函数来开启一个每秒钟执行一次的定时任务，定时调用  `clockSprite`  函数，以便每秒钟更新一次时钟程序。

```js
/*开启定时任务*/
setInterval(clockSprite, 1000);
```

4.  切换皮肤的函数

这个部分代码是用来实现快速切换不同的皮肤主题的，这里使用  `toggle`  函数来切换时钟容器的类名，来实现页面样式的动态切换。这里使用了事件触发机制，当用户点击了切换主题按钮之后，就会调用这个函数来切换当前的皮肤样式。

```js
/*切换皮肤的函数*/
function toggleTheme() {
  clockContainer.classList.toggle("lightTheme");
  clockContainer.classList.toggle("darkTheme");
}
```

# 结语

通过 HTML 和 CSS 成功实现了时钟的样式，再利用 JavaScript 在处理时间方面的效果。这使得我们的时钟不仅外观漂亮，更具功能。
