---
date: 2023-04-13
title: JS之深浅拷贝
---

# 前言

深浅拷贝是在`JavaScript`中处理数据时，不可避免需要接触到的重要概念，今天我们就来聊聊 JavaScript 的深浅拷贝，以及它们之间的区别。

## JS 数据类型存储方式

### 基本数据类型

基本数据类型的变量名与变量值都是存储在栈中。

### 复杂数据类型

复杂数据类型变量名与变量值存储在栈中，但是该变量值存储的只是只是值的一个内存地址，其真实值是存储在堆内。

## 深浅拷贝

### 浅拷贝

**浅拷贝的定义**是指创建一个新对象，新对象有原始对象属性的一份精确拷贝，如果属性是基本类型，拷贝的就是基本类型的值，如果是引用类型，拷贝的就是内存地址。也就是说，新旧对象或数组共享相同的内存地址，因此对新对象或数组的修改也会影响到原对象或数组。

### 深拷贝

**深拷贝的定义**是指将一个对象或数组复制一份，新对象或数组中的元素与原对象或数组中的元素是完全独立的，它们有不同的内存地址。因此，对新对象或数组的修改不会影响到原对象或数组。

## 代码演示

我们先来看一段简单的代码：

```js
<script>
    let obj = {
        name: '张三'
    }
    let object = obj
    object.name = '李四'

    console.log(object.name);
    console.log(obj.name);
    console.log(obj === object);
</script>
```

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3a70685e1b443c4800ef292b8048a6c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%">

可以看到改变 object 上 name 属性的值后，obj 对象上的值也被修改了，且两者满足恒等。那么这是我们说的浅拷贝吗?\
答案是不是的，以上这种只是进行了赋值，而非浅拷贝，浅拷贝的重点是创建了一个`新`对象。
接下来让我们开始手写一个浅拷贝：

```js
let person = {
  name: "张三",
  hobby: ["读书", "敲代码", "学法"],
};

// 浅拷贝
function shallowCopy(source) {
  // 突出创建一个新的对象
  let obj = {};

  for (let i in source) {
    // 判断 i 是否为自身所拥有的属性，而非原型继承
    if (source.hasOwnProperty(i)) {
      obj[i] = source[i];
    }
  }
  return obj;
}

let shallowPerson = shallowCopy(person);

(shallowPerson.name = "李四"), (shallowPerson.hobby[0] = "音乐");

console.log(person.name);
console.log(person.hobby);
console.log(shallowPerson.name);
console.log(shallowPerson.hobby);
```

控制台输出结果：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ef704e994d94a8e92d931dd3ad37dde~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%">

可以看到对新对象中的基本数据类型`name`进行修改时，原对象的值并未改变，而对引用数据类型`hobby`进行修改时，两个对象的值都进行了修改，由此可见，对于基本数据会对其值进行拷贝，即新对象另开了内存存储改值，两对象该属性的内存地址不同，互不相干；而引用式两者的`hobby`属性指向的是同一内存地址，所有改变其中任意一个另一个会同步，这就是**浅拷贝**。

深拷贝与浅拷贝不同的在于对引用式数据类型的处理，对于引用式数据类型，深拷贝会在堆内存中开辟一个新的内存地址存放新对象，由此使得新对象与原对象彼此完全独立，互不干扰。

以上我们聊完了浅拷贝，接下来让我们看看深拷贝：

```js
let deepPerson = JSON.parse(JSON.stringify(person));
deepPerson.hobby[0] = "音乐";

console.log(person.hobby);
console.log(deepPerson.hobby);
```

控制台输出：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/110c6ba597b64ef782632532d3a7303c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%">

可以看到修改新对象的引用式数据后原对象并没有同步修改，两者之间相互独立，证实了上面的深浅拷贝的不同。以上我是采用`JSON`自带的方法进行了拷贝，但这一方法有个弊端。
如以下实例：

```js
let person = {
  name: "张三",
  hobby: ["读书", "敲代码", "学法"],
  date: new Date(),
};
let deepPerson = JSON.parse(JSON.stringify(person));
deepPerson.hobby[0] = "音乐";

console.log(person);
console.log(deepPerson);
```

控制台输出： <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcac4487d0d2401c8c31277b117cf64b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%">
可以看到原对象中`date`是一个对象，而拷贝过来的却是一个字符串类型，变量类型都改变了，这肯定是不可以的。所以我们选择使用递归的方法:

```js
function deepClone(source) {
  // 递归出口
  if (source === null) return source;
  if (source instanceof Date) return new Date();
  if (source instanceof RegExp) return new RegExp(source);
  if (typeof source !== "object") return source;
  let obj = Array.isArray(source) ? {} : [];

  for (let i in source) {
    if (source.hasOwnProperty(i)) {
      obj[i] = deepClone(source[i]);
    }
  }
  return obj;
}

let deepPerson = deepClone(person);
deepPerson.hobby[0] = "音乐";

console.log(person);
console.log(deepPerson);
```

控制台输出:

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78944e9bf360490086e95649036906fb~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%">

此时可以看到已经成功实现了深拷贝。

# 结语

现在已经有很多现成的深浅拷贝方法提供使用，如`lodash`函数库或`Jquery`中的一些方法等，这篇文章主要是简单讲述了深浅拷贝的定义、不同之处以及实现原理。如果觉得对你有一定帮助的话，请为作者留下一个赞吧！
