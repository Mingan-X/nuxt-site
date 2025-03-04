---
date: 2023-04-11
title: JS之防抖
---

# 前言

作为一名前端开发人员，JavaScript 的防抖节流函数是不得不知道的，一个是它经常会在面试中被问到，二则是在实际的项目开发中也几乎随处可见它的身影，它是闭包的一种实际应用，今天我们就来聊聊防抖节流函数中的防抖函数。

## 防抖函数

当持续触发某一事件时，只有在一定时间内，没有再次触发该事件，事件处理函数才会执行一次。如果在设定等待的一定时间内，再次触发了该事件，就需要重新开始延时，等待设定的时间后再执行事件处理函数。好了，既然我们已经知道了防抖的概念，那我们该怎么实现呢?

## 代码实现

接下来我们将借助输入框来展示一个防抖的实例。

```html
<!-- 借助input输入框来展示 -->
<input type="text" id="input" />
```

获取 id 为`input`的输入框节点

```js
var input = document.getElementById("input");
```

监听该输入框的`keyup`事件,给一个事件处理函数

```js
input.addEventListener("keyup", function (e) {
  debounce(1000, e.target.value);
});
```

定义一个防抖函数，第一个参数为自定义的等待时间，第二个为输入框的输入的值

```js
// 防抖函数
function debounce(delay, value) {
  setTimeout(function () {
    console.log(value);
  }, delay);
}
```

接下来运行看一下结果；

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/221a8ceb53aa42ecbef45dcaa555cce9~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

当我想输入`1111`时，可以看到此时输出的值并不仅仅包含最后的结果`1111`，它将连续输入期间还未输入完的的结果也一并输出了，这并不是我们所期待的结果。我们期待得到结果应当是只输出`1111`这一最后完整的输入的结果。那么该怎么去解决这一问题？\
**产生该问题的原因** 由于键盘每输入完一个字符时，便添加了一个定时器，当输入后续值时，并未对之前触发的定时器进行处理，所以每当等待时间结束时就会执行该定时器的事件，导致会输出中间值。\
**解决方法** 我们可以定义一个保存一直保存在内存中名为`timer`变量来存储定时器，当在等待时间内再次触发了`keyup`事件，就将之前的定时器清除，将新的定时器保存下来，以此来清除定时器保证事件处理函数在最后一次键入的定时器结束后执行。

```js
let input = document.getElementById("input");
let timer;
// 防抖函数
function debounce(delay, value) {
  clearTimeout(timer);
  timer = setTimeout(function () {
    console.log(value);
  }, delay);
}
// 监听input的keyup事件
input.addEventListener("keyup", function (e) {
  debounce(1000, e.target.value);
});
```

如上述代码，我们定义了一个`timer`变量，每次触发`keyup`时,便将之前的定时器清除，将当前定时器保存，以此避免连续输入时会将未输入完全的值打印出来，接下来看看代码效果

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a5bc91cc2c14ad884da5b578db0550b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

可以看到已经实现了我们所需的效果，但是并不建议将`timer`声明为全局变量，因为全局变量会导致一些不必要的麻烦，如\
**长期占用内存**：全局变量生命周期长，程序运行期一直存在，始终占有那块存储区\
**难以定位修改**：全局变量是公共的，全部函数都可以访问，难以定位全局变量在哪里被修改，加大了调试的难度

**函数难以理解**：使用全局变量的函数，需要关注全局变量的值，增加了理解的难度\
**污染命名空间**：全局变量会污染命名空间，在函数中局部变量会覆盖全局的值，会出现同一个变量名多个值的情况，造成困惑

所以这里可以采用函数闭包来实现：

```js
let input = document.getElementById("input");
function debounce(delay) {
  let timer;
  return function (value) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      console.log(value);
    }, delay);
  };
}
let debounceFunc = debounce(1000);
// 监听input的keyup事件
input.addEventListener("keyup", function (e) {
  debounceFunc(e.target.value);
});
```

这样就避免了由于全局变量所带来的一些不好的影响。\
到此我们的防抖函数也就实现了，但是我们还可以进行一些小小的优化，如上面代码中我们的打印是直接在定时器中编写代码，但是我们实际应用中需要实现的功能可能更加复杂，这就需要进行模块化处理，我们可以将定时器结束后要处理的事件单独封装层一个函数，通过回调函数来实现，如下：

```js
let input = document.getElementById("input");
function debounce(delay, callback) {
  let timer;
  return function (value) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      // console.log(value);
      callback(value);
    }, delay);
  };
}

function fn(value) {
  console.log(value);
}

let debounceFunc = debounce(1000, fn);
// 监听input的keyup事件
input.addEventListener("keyup", function (e) {
  debounceFunc(e.target.value);
});
```

我们定义了一个名为`fn`的函数用于执行用户输入完毕，等待时间后所要进行的操作，这样就做到了各司其职。

# 结语

以上便是有关于我对于防抖函数的一个简单分享，实际的业务场景可能会更复杂，但是其核心还是不会变的，主要目的是为了优化前端代码的性能，提高用户的使用体验。好了，如果对作者的分享还满意的话，请动动小手给作者一个赞吧!
