---
date: 2023-04-15
showTitle: 手撕call和apply
---

# 前言

call 和 apply 可以说是比较常用的方法了，今天就让我们来聊聊手写 call 和 apply 函数，在开始前我我们先来有关于这俩函数的一些内容。

### 作用与区别

`call()`和`apply()`是 JavaScript 中用于调用函数的方法，它们的作用是调用一个函数，并设置函数内部`this`关键字的指向。它们的区别在于传参的方式不同。

`call()`方法接受一个参数列表，第一个参数表示要将函数绑定到哪个对象上，后面的参数则是传递给函数的参数，以逗号分隔。例如：

```js
function sayHello() {
  console.log("Hello, " + this.name);
}

const person = { name: "John" };
sayHello.call(person); // Hello, John
```

在上面的例子中，`sayHello()`函数被绑定到了`person`对象上，并通过`call()`方法调用，输出了`"Hello, John"`。

`apply()`方法与`call()`方法类似，但它接受一个参数数组，第一个元素表示要将函数绑定到哪个对象上，第二个元素则是传递给函数的参数数组。例如：

```js
function sayHelloTo(name) {
  console.log("Hello, " + name);
}

const person = { name: "John" };
sayHelloTo.apply(null, ["Alice"]); // Hello, Alice
sayHelloTo.apply(person, ["Alice"]); // Hello, John
```

在上面的例子中，第一个`apply()`方法将`sayHelloTo()`函数绑定到了`null`对象上，并传递了一个参数数组`["Alice"]`。由于函数内部使用了`this.name`来访问对象属性，所以输出了`"Hello, Alice"`。第二个`apply()`方法将`sayHelloTo()`函数绑定到了`person`对象上，并传递了一个参数数组`["Alice"]`。由于函数内部使用了`this.name`来访问对象属性，所以输出了`"Hello, John"`。

总之，`call()`和`apply()`方法的主要区别在于传参的方式，前者使用参数列表，后者使用参数数组。它们都可以用于动态改变函数内部的`this`指向，并传递参数给函数。

好了接下来就让我们正式开始！

### 手写 call

首先进行准备工作，先看如下代码：

```js
let person = {
  getName: function () {
    return this.name;
  },
};

let person1 = {
  name: "张三",
};

console.log(person.getName.call(person1));
```

控制台：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91f925a13467487b94914b061ed4e7c2~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

可以看到成功打印出来结果为'张三'，接下来我们要做的就是手写一个自己的`call`函数来实现同样效果。
对上述代码进行修改：

```js
console.log(person.getName.myCall(person1));

function myCall() {
  console.log("手写call");
}
```

控制台:

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1e050de3fa54f30834b529db6c93562~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

我们新增了一个函数并将之前的 call 替换为我们自己的函数,可是控制台却进行报错，为什么呢？这就是我们将要解决的第一个问题。请看一下代码：

```js
Function.prototype.myCall = function () {};

console.log(person.getName.myCall(person1));
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f698166e3cd4e24babdb34572fe325d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

可以看到控制台已经不再报错，那么原因是什么呢？这是因为我们的`person`对象本身不具备这个方法，所以当我们调用这个函数时，会进行报错，而第二种则是在原型上对该函数进行定义，虽然`person`对象自身不具有该方法但是它可以通过原型链来查找和调用该方法，这就是利用了原型链的继承。

好了解决了这一步，让我们继续往下吧，接下来我们将要对`this`的指向进行改变。

```js
let person = {
  getName: function () {
    console.log(this, "///");
    return this.name;
  },
};

let person1 = {
  name: "张三",
};

Function.prototype.myCall = function (context) {
  // 这里this必须要是一个funcation
  if (typeof this !== "function") {
    throw new Error("error");
  }

  context = context || window;
  console.log(this);
  // 拿到除第一个参数的其他参数
  let args = [...arguments].slice(1);

  let result = this(...args);
  return result;
};

console.log(person.getName.myCall(person1, 1, 2, 3));
```

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d3e6a6697d14c86bc7013bc976d4e41~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

可以看到两个`this`的指向,第一个`this`指向没有问题，指向调用者，但是第二个`this`指向的却是`window`，而我们希望的是它指向`person1`这一对象，那么该如何进行修改呢?

很简单，只需将该方法调用对象改为`person1`即可，如下：

```js
Function.prototype.myCall = function (context) {
  // 这里this必须要是一个funcation
  if (typeof this !== "function") {
    throw new Error("error");
  }

  context = context || window;
  // console.log(this);
  // 拿到第一个参数
  let args = [...arguments].slice(1);
  context.getName = this;
  let result = context.getName(...args);
  delete context.getName; // 删除添加的getName属性
  return result;
};

console.log(person.getName.myCall(person1, 1, 2, 3));
```

控制台：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbb4d936f49d463f9bc08100fae8375a~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

可以看到成功地输出了`person1`中的内容，这是通过给`context`上添加了一个属性，将`this`给到该属性，由之前我们可以知道`this`指向的是`person.getName`的这一函数，所以此时`context.getName`指向的就是该函数，再调用`context.getName`这一函数，因为函数中的`this`指向的是最后调用该函数的对象，所以这样`this`指向的就是`context`，而此时`contxet`指向的是`person1`,由此就成功解决了`this`的指向问题。

### 手写 apply

经过上面`call`函数的手写，那么接下来对于`apply`函数的手写就会比较轻松了，如下：

```js
let person = {
  getName: function () {
    // console.log(this,'///');
    return this.name + [...arguments][1];
  },
};

let person1 = {
  name: "张三",
};

Function.prototype.myApply = function (context) {
  // 这里this必须要是一个funcation
  if (typeof this !== "function") {
    throw new Error("error");
  }

  context = context || window;

  context.getName = this;

  let result;
  if (arguments[1]) {
    result = context.getName(...arguments);
  } else {
    result = context.getName();
  }
  delete context.getName;
  return result;
};

console.log(person.getName.myApply(person1, 1, 2, 3));
```

控制台：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fc39c34e41e4e1d87c65296d75ec207~tplv-k3u1fbpfcp-watermark.image?)
可以也是直接成功实现了，两者其实只需注意对参数的处理即可，其他大致相同，后者如果参数数组下标为 1 的有值，这需将其作为参数传给函数，否则不用，另需要注意两次手写我们都需要加上`delete context.getName`这句代码，因为调用该函数的对象本身没有该属性，我们不能自行对其添加，所以用完后得删除，emmm...怎么有点渣渣的感觉 😅，总之大致为如此。

# 结语

好了，以上便是对于本次学习内容的一个分享，希望对大家有所帮助。
