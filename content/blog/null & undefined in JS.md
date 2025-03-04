---
date: 2023-05-10
title: JS中null&undefined
---

# 前言

在 JavaScript 中，null 和 undefined 是两个常见的数据类型，但总是在使用时由于对两者区别不清而导致错误，今天就让我们一起来看看这两种类型的区别。

## 定义

首先让我们来看看两者的定义：
**null**是 JavaScript 中的一个特殊值，表示“空值”或“无值”。当我们想要表示某个变量不包含任何值时，就可以将其设置为 null。
**undefined**是 JavaScript 中的另一种特殊值，表示“未定义的值”。当我们声明一个变量但没有给它赋值时，该变量的值就是 undefined。

## 异同点

相同点：

1. undefined 和 null 被转换为布尔值的时候，两者都为 false
2. undefined==null，结果为 true 都表示一个空值，两者判断值相等上是一样的

尽管**null**和**undefined**都表示“无值”，但它们之间还是有一些区别的。

不同点：

1. null 表示一个空对象指针，而 undefined 表示一个未定义的值。
2. 当我们声明一个变量但没有给它赋值时，该变量的值就是 undefined。当我们想要明确地表示某个变量不包含任何值时，就可以将其设置为 null。
3. 如果我们使用 typeof 运算符检查一个 null 值时，返回的结果是“object”。而如果检查一个未声明的变量时，返回的结果是 undefined。
4. undefined 不是关键字，而 null 是关键字
5. undefined 本质上是 window 的一个属性，而 null 是一个对象

接下来就让我们来结合一些小小的例子来进行理解：

```js
let firval = null;
let secval;
console.log(firval == secval); // 输出：true
console.log(firval === secval); // 输出：false
console.log(firval); // 输出：null
console.log(secval); // 输出：undefined
console.log(typeof firval); // 输出：object
console.log(typeof secval); // 输出：undefined
```

在上面的示例中，我们声明了两个变量 firval 和 secval。firval 的值被设置为 null，而 secval 没有被赋值，因此它的值是 undefined。当我们使用 console.log()函数打印这两个变量时，分别输出了 null 和 undefined。当我们使用 typeof 运算符检查这两个变量的类型时，分别输出了 object 和 undefined,同时需要注意 null 与 undefined 本质上是不同，当使用双等时输出为 true 相信大家应该都有所了解，没错，因为在 JavaScript 里，双等号判断相等时会进行隐式类型转换，所以是不严格的。

## 实际应用

在实际的开发中，我们经常需要使用 null 和 undefined 在某些特殊的情景。例如，当我们从服务器获取数据时，如果数据不存在，我们可能会将返回值设置为 null 或 undefined。这样做可以帮助我们更好地处理数据并避免出现错误。

以下便是一个 null 应用场景：

```
function getData() {
  let data = null;
  // 如果数据不存在，返回null
  if (!data) {
    return null;
  }
  // 处理数据
  // ...
  // 如果处理成功，返回处理结果
  return result;
}
```

在上面的示例中，我们定义了一个名为`getData`的函数，用于获取数据并处理它。如果数据不存在，我们将返回值设置为 null。否则，我们将处理数据并返回处理结果。

除此之外，null 还有一个前端人员都熟悉的作用:**作为对象原型链的终点**

对于 undefined 的作用，这里大致列举以下几种：

1. 如果变量声明了，但没有赋值，它就等于 undefined 。

2. 函数中的参数没有给时，该参数就等于 undefined 。

3. 对象没有进行赋值，该属性的值为 undefined。

4. 当函数没有返回值时，默认返回 undefined。

# 总结

在本文中，我们简单探讨了 JavaScript 中的 null 和 undefined 类型，需要记住的是，null 表示一个空对象指针，而 undefined 表示一个未定义的值。当我们想要明确地表示某个变量不包含任何值时，就可以将其设置为 null。而当我们声明一个变量但没有给它赋值时，该变量的值就是 undefined。
