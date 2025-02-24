---
date: 2022-12-22
showTitle: JS学习中prototype、__proto__与constructor
---

# 1.前言

JavaScript 作为前端三剑客之一，JS 在网页前端开发中占据着绝对的地位，作为一名前端人员对 JS 的掌握是必不可少的，而对于 JS 的学习中`prototype`、`__proto__`与`constructor`属性是必不可少的一部分，也是相当重要的一部分。今天就来分享一下我的学习心得。

首先`prototype`是独属于函数所有，`__proto__`与`constructor`是所有对象都拥有的，又因为 JS 中函数本身就是对象，所以函数拥有以上三个属性。接下来就让我们来聊聊它们。

首先，让我们看看一个简单的例子

```js
// 先定义一个构造函数
function Fn() {}
// 打印该构造函数的prorotype
console.log(Fn.prototype); // 输出Object{}
// 创建一个实例对象
var f = new Fn();
// 打印该对象的__proto__
console.log(f.__proto__); // 输出Object{}
// f.__proto__ === Fn.prototype
console.log(f.__proto__ === Fn.prototype); // 输出true
// 打印Fn.prototype.constructor
console.log(Fn.prototype.constructor); // 输出Fn() {}
```

# 2.prototype 属性

`prototype`是函数独有的属性称为**原型对象**也称为**显式原型**，它默认指向一个**Object 空对象**，它是由函数指向对象，其本身也是一个对象，每个函数再被创建时，都会默认获得一个`prototype`属性。那么`prototype`的作用是什么呢？
接着上面的实例

```js
Fn.prototype.name = "li";
console.log(f.name); // 输出li
Fn.prototype.myName = function () {
  return this.name;
};
f.myName(); // 输出li
```

可以看到通过`prototype`我们成功地向构造函数中添加了新的方法与属性。所以
当创建一个 JavaScript 对象时，都会从`prototype`继承公有的属性和方法，其次就是可以给对象的构造函数添加新的属性或方法。

# 3.**proto**属性

`__proto__`是对象所拥有的的一种属性，称为隐式原型，它是由对象指向对象，有上面实例可以看到一个对象的`__proto__`指向的是该实例对象对应的构造函数的显式原型，那么`__proto__`的作用又是什么呢？

如果我们需要某个方法或属性时，当前对象内部并没有我们所需要的，那么便会从当前对象的`__proto__`所指向的对象中寻找，若还没有找到，则接着目前对象的`__proto__`接着往下寻找，直到找到该属性或方法，或者找到原型链的顶端`null`,没有找到报错，而这种一条由`__proto__`连接对象的链称为**原型链**。

# 4.constructor 属性

`constructor`同样是对象所拥有的一种属性，它存在于每一个`function`的`prototype`属性中，它是由对象指向函数，由上述实例可以看到构造函数**Fn**的原型对象的`constructor`属性指向的是**Fn**本身,所以**函数和它的原型对象是互相引用的关系**,主要用于返回对创建当前对象的函数的引用。

接下来用一张图来表示`prototype`、`__proto__`与`constructor`三者的关系：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b36198f55d348138ac70dec95dd3c6c~tplv-k3u1fbpfcp-watermark.image?)

最后还有一个问题，那么**f.constructor**和**Fn.constructor**会指向谁呢？其实答案已经呼之欲出啦，根据原型链我们不难知道**f.constructor**指向的正是**Fn(){}**,这是由继承自**Fn.prototype**得来的,而**Fn.constructor**则是指向**Function(){}**,同样为继承，继承自**Function.prototype**。好啦就说到这里其实只需验证一下，很快便可得出结论，大致思想便是原型链的继承。

以上就是本次学习的一些小心得与大家一起分享交流，好啦，本篇文章就到此结束，如果觉得还不错的话，就留下你的赞吧，拜拜咯。
