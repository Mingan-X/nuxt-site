---
date: 2023-04-12
title: JS之节流函数
---

# 前言

在上一篇文章中浅谈了什么是防抖函数，以及防抖函数的基本实现。这次我们一起学习 JavaScript 防抖节流函数的节流函数。首先，我们要知道什么是节流函数。

## 定义

节流函数是一种限制函数执行频率的技术，也称为`throttle`函数。节流函数可以控制函数在一定时间间隔内最多执行一次，从而减少函数的执行次数。

## 应用

在一些需要频繁触发事件的场景中，比如滚动事件、鼠标移动事件等，使用节流函数可以有效地减少函数执行的次数，提高页面的性能和响应速度。

## 代码演示

这里我们将通过一个简单的点击事件来进行节流函数的演示

1. 首先我们先实现一个点击监听事件

```js
<button id="btn">click me</button>
<script>
    function handleClick() {
        console.log('click');
    }

    function throttle(func) {
        return handleClick
    }
    document.getElementById('btn').addEventListener('click', throttle(handleClick));
</script>
```

此时当我们每点击一次按钮时就会在控制台打印一次`click`,这里作者踩了个坑，起初`throttle`函数中并没有`return handleClick`而是直接`handleClick()`这就导致由于 `throttle` 函数没有返回任何值，所以返回给监听的回调函数为 `undefined`，也就是不执行任何操作。只能看到页面加载完成后打印的一次`click`后续点击无效果,还是要注意一下小细节。  
2. 接下来添加定时器
对`throttle`进行修改，添加一个定时器

```js
function throttle(func, delay) {
  return () => {
    setTimeout(() => {
      handleClick();
    }, delay);
  };
}
document
  .getElementById("btn")
  .addEventListener("click", throttle(handleClick, 1000));
```

此时每点击一次`button`就会添加一个定时器，当定时器等待时间结束便会执行一次`handleClick`函数，在控制台进行输出，此时我们已经实现了每隔一定时间执行一次，但是还没有达到节流效果。**注意** 节流函数可以控制函数在一定时间间隔内最多执行一次，那么我们还需添加一个变量来实现最多执行这一要求。  
3. 添加变量控制次数
再次对`throttle`函数进行修改,添加变量`timeOut`初始为`null` 来识别当前时间间隔内是否执行了`handleClick`函数，如果没有则等待当前的点击事件处理结束后再进行下一段等待，否则执行后将`timerOut`再次赋值为`null`

```js
function throttle(func, delay) {
  let timerOut = null;
  return () => {
    if (!timerOut) {
      timerOut = setTimeout(() => {
        handleClick();
        timerOut = null;
      }, delay);
    }
  };
}
```

以上代码中第一次点击会将定时器赋给`timerOut`变量，在当前事件还未执行时间内，不会再添加新的等待事件，直到当前事件结束，`timerOut`重新赋值为`null`开启下一轮事件，以此来保证一定时间内最多执行一次。

# 结语

以上便是节流函数的简单实现，虽然已经有封装好的节流函数，节流相对于比较简单，但我们还是要了解了解。好了以上便是全部内容，虽然篇幅较短 😀😀😀。
