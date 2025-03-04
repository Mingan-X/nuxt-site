---
date: 2023-04-23
title: css+js滑块验证
---

# 前言

滑块验证可以说大家应该不陌生了，今天就来分享一下滑块验证，这是一个基于 JavaScript 和 CSS 实现的滑块拖拽验证功能。用户需要拖动滑块来完成验证。下面我们来逐一分析这段代码。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27a7b30c22ed46fe869765d30b21109e~tplv-k3u1fbpfcp-watermark.image?" alt="1682260897391 -original-original.gif" width="100%" />

### HTML 部分

```js
<div class="container">
  <div class="dragBg">
    <div class="drag">
      <div class="text">滑块拖拽验证</div>
      <div class="silde"></div>
    </div>
  </div>
</div>
```

在这段代码中,我们创建了一个包含多个元素的`.container`容器,用于包裹整个滑块验证功能。其中`.dragBg`元素代表了绿色背景层,`.drag`元素代表了包含文字和滑块的灰色背景层,`.silde`元素代表了滑块。这些元素的样式将在后面的 CSS 中进行定义。

### CSS 部分

```js
* {
  padding: 0;
  margin: 0;
}

body {
  user-select: none;
}

.container {
  width: 300px;
  height: 40px;
  background-color: #e8e8e8;
  margin: 100px auto;
  text-align: center;
  line-height: 40px;
  position: relative;
}

.drag {
  position: relative;
  width: 300px;
  height: 100%;
}

.dragBg {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #00b894;
}

.silde {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  background: #fff;
  border: 1px solid #ccc;
}
```

我们首先对所有元素应用了`padding:0`和`margin: 0`样式,以确保元素在页面中的位置准确无误。我们还将`user-select`属性设置为`none`,以防止用户选中页面中的文本。

接下来,我们为`.container`容器设置了宽度、高度、背景颜色、居中对齐等样式。`.drag`元素被设置为相对定位,并且它的宽度被设置为 0,因为绿色背景层的宽度将在 JavaScript 中动态计算。`.dragBg`元素被设置为绝对定位,表示它相对于`.container`容器定位,并且它的宽度被设置为 0,因为一开始的时候滑块是在最左边的位置。`.silde`元素被设置为绝对定位,表示它相对于`.dragBg`元素定位,并且它的宽度和高度被设置为 40px,它的背景颜色被设置为白色,边框颜色被设置为灰色。

### JS 部分

```js
//获取事件
var silde = document.querySelector(".silde");
var dragBg = document.querySelector(".dragBg");
var drag = document.querySelector(".drag");
var text = document.querySelector(".text");
var curX;

//注册事件
silde.onmousedown = function (e) {
  var initX = e.clientX;
  document.onmousemove = function (e) {
    var moveX = e.clientX;
    curX = moveX - initX;
    if (curX < 0) {
      curX = 0;
    }
    if (curX > 260) {
      curX = 260;
    }
    silde.style.left = curX + "px";
    dragBg.style.width = curX + "px";
    if (curX >= 260) {
      drag.style.color = "white";
      text.textContent = "验证通过";
      document.onmousemove = null;
      silde.onmousedown = null;
    }
  };
};

document.onmouseup = function () {
  document.onmousemove = null;
  if (curX < 260) {
    silde.style.left = 0;
    dragBg.style.width = 0;
  }
};
```

我们首先通过`document.querySelector`方法获取了`.silde`、`.dragBg`、`text`和`.drag`元素,并将它们分别赋值给了`silde`、`dragBg`、`text`和`drag`变量。接下来,我们注册了鼠标按下事件`onmousedown`,当用户按下鼠标时,会执行相应的函数。

在这个函数内部,我们首先通过`e.clientX`获取用户点击时鼠标的 X 坐标,并将其保存到`initX`变量中。接下来,我们注册了鼠标移动事件(`onmousemove`),当用户移动鼠标时,会执行相应的函数。

在这个函数内部,我们首先通过`e.clientX`获取用户移动时的鼠标 X 坐标,并将其减去`initX`,得到鼠标移动的距离,保存到  `curX`  变量中。接着,我们判断`curX`是否小于 0,如果是,将`curX`设置为 0,确保滑块不会超出左边界。然后,我们判断`curX`是否大于 260,如果是,将`curX`设置为 260,确保滑块不会超出右边界。然后,我们将`curX`赋值给`.silde`元素的`left`属性,使滑块随着鼠标的移动而移动。同时,我们还将`curX`赋值给`.dragBg`元素的`width`属性,使绿色背景层的宽度随着鼠标的移动而变化。最后,我们判断`curX`是否大于等于 260,如果是,就表示用户已经将滑块拖到了最右边,此时我们将`.drag`元素的文字颜色设置为白色,将`.text`元素的文字设置为验证通过,并且取消`document.onmousemove`和`silde.onmousedown`的事件绑定,使用户无法再次拖动滑块。

接下来,我们注册了鼠标抬起事件(`onmouseup`),当用户抬起鼠标时,会执行相应的函数。在这个函数内部,我们首先将`document.onmousemove`设置为`null`,这样就不会再触发鼠标移动事件了。然后,我们判断  `curX`  是否小于 260,如果是,就表示用户没有将滑块拖到最右边,此时我们将`.silde`元素的`left`属性设置为 0,将`.dragBg`元素的`width`属性设置为 0,使滑块回到初始位置。

# 结语

这段代码实现了一个简单的滑块拖拽验证功能，可以有效防止机器人恶意登录或注册。
