---
date: 2023-05-09
title: 浅谈JS闭包
---

# 前言

闭包是 JavaScript 中一种非常重要的概念，它允许函数访问其外部作用域中的变量。在本文中，让我们一起来看看什么是闭包，以及它有什么用途。

## 什么是闭包？

**闭包**是指有权访问另一个函数作用域中的变量的函数。

闭包的实现方式通常是在函数内部定义一个函数，并返回这个函数。这个返回的函数可以访问所在外部函数的变量，因为它们在同一个作用域链中。

下面来看一个简单的闭包示例。首先我们定义了一个外部函数`add`，它接受一个参数 x，然后返回一个内部函数，该函数接受一个参数 y，并将 x 和 y 相加返回。

```javascript
function add(x) {
  return function (y) {
    return x + y;
  };
}

const addFive = add(6);
console.log(addFive(4)); // 输出 10
console.log(addFive(10)); // 输出 16
```

在这个示例中，我们首先定义了一个`add`函数，它接受一个参数 x 并返回一个函数。这个返回的函数可以访问其所在外部函数的变量 x，上面的例子中此时 x 的值为 6。我们将`add`函数调用，并将结果存储在`addFive`变量中。然后我们调用`addFive`函数两次，分别传入 4 和 10 作为参数，输出它们的和，由于此时`addFive`函数中变量 x 为 6，所以当我们分别传入 4 和 10 时，都是与 6 进行求和得出 10 和 16。

这里的关键点是，`addFive`函数可以访问其所在外部函数`add`的变量 x。当我们调用`add(6)`时，它返回一个函数，该函数可以访问其外部函数`add`的变量 x，并将其保存在闭包中。当我们调用`addFive()`时，它将会使用保存在闭包中的 x 和传入的参数 y 计算结果。

## 闭包的用途

闭包在 JavaScript 中有许多用途。让我们来看看最常用的用途。

### 1. 私有变量

闭包可以用来创建私有变量。只有函数内部才可以使用这些变量。

下面是一个示例，其中我们使用闭包来创建一个私有变量 counter。我们定义了一个匿名函数，并返回一个对象，该对象具有两个方法：`increment`和`decrement`。这些方法可以访问 counter 变量，并分别将其自增加或自减少。

```javascript
const counter = (function () {
  let count = 0;

  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    getCount: function () {
      return count;
    },
  };
})();

console.log(counter.getCount()); // 输出 0
counter.increment();
console.log(counter.getCount()); // 输出 1
counter.decrement();
console.log(counter.getCount()); // 输出 0
```

在这个示例中，我们定义了一个立即执行函数函数。这个函数将会返回一个对象，该对象具有三个方法：`increment`、`decrement`和`getCount`。这些方法可以访问闭包中的变量 count，并分别将其自增加或自减少。`getCount`方法用于获取`count`的当前值。

2. 模块模式

闭包还可以用来创建模块，这是一种将相关的代码组合在一起的方式，以便于重用和维护。

同样来看一个简单的例子，其中我们使用闭包来创建一个模块，该模块具有两个私有变量和两个公共方法。同样我们定义了一个立即执行函数，并返回一个对象，该对象具有四个方法：`increment`、`decrement`、`getCount`和`setStep`。这些方法可以访问闭包中的私有变量 count 和 step，并分别对其值进行改变。

```javascript
const counterModule = (function () {
  let count = 0;
  let step = 1;

  return {
    increment: function () {
      count += step;
    },
    decrement: function () {
      count -= step;
    },
    getCount: function () {
      return count;
    },
    setStep: function (newStep) {
      step = newStep;
    },
  };
})();

console.log(counterModule.getCount()); // 输出 0
counterModule.increment();
console.log(counterModule.getCount()); // 输出 1
counterModule.setStep(2);
counterModule.decrement();
console.log(counterModule.getCount()); // 输出 -1
```

### 3. 事件处理程序

闭包还可以用来创建事件处理程序。在 JavaScript 中，事件处理程序是函数，它们在事件发生时被调用。使用闭包，我们可以创建一个事件处理程序，该处理程序可以访问其外部作用域中的变量，并在事件发生时执行特定的操作。

下面是一个示例，其中我们使用闭包来创建一个事件处理程序。我们定义了一个匿名函数，并将其传递给`addEventListener`方法，该方法将其注册为 click 事件的处理程序。这个函数返回一个函数，它可以访问闭包中的变量 count，并将其增加 1。当我们单击按钮时，事件处理程序被调用，并执行该函数。

```javascript
const button = document.getElementById("myButton");
let count = 0;

button.addEventListener("click", function () {
  count++;
  console.log("The button has been clicked " + count + " times.");
});
```

在这个示例中，我们获取一个按钮元素，并将其存储在 button 变量中。我们还定义了一个变量 count，并将其初始化为 0。我们调用`addEventListener`方法，并将一个匿名函数作为参数传递。这个函数返回一个函数，它可以访问闭包中的变量 count，并将其增加 1。当我们单击按钮时，事件处理程序被调用，并执行该函数。

# 结论

闭包是 JavaScript 中非常重要的概念，它可以用于创建私有变量、模块和事件处理程序。了解闭包的概念和用途可以帮助我们更好地理解 JavaScript 中的函数和作用域。
