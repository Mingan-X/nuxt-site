---
date: 2023-05-08
title: JS的装箱与拆箱
---

## 前言

JavaScript 中的装箱和拆箱是一种与数据类型转换相关的概念。在本篇文章中，让我们来聊聊 JavaScript 中的装箱和拆箱。

### 一、装箱

**1. 定义**

装箱是指将一个基本数据类型转换成其对应的引用类型的过程。在 JavaScript 中，有七种基本数据类型：Undefined、Null、Boolean、Number、Symbol、BigInt 和 String。对于这些基本数据类型，它们都有对应的包装对象类型。

在 JavaScript 中，装箱是自动进行的。也就是说，当我们对一个基本数据类型使用该类型的某个属性或方法时，JavaScript 引擎会将该基本类型的值自动转换成其对应的包装对象类型，然后再调用该属性或方法。这个过程就是装箱。

**2. 示例代码**

下面是一个装箱的示例代码：

```javascript
var num = 111;
var str = "你好啊";
console.log(typeof num); // "number"
console.log(typeof str); // "string"
num.toFixed(2); // 装箱操作
str.toUpperCase(); // 装箱操作
```

在上面的代码中，我们定义了一个数字类型的变量 `num` 和一个字符串类型的变量 `str`。然后，我们分别输出这两个变量的数据类型，可以看到它们都是基本数据类型。接着，我们调用了 `num` 的 `toFixed()` 方法和 `str` 的 `toUpperCase()` 方法，这两个方法都是对应引用类型的方法，因此 JavaScript 引擎会自动将 `num` 和 `str` 装箱成其对应的包装对象类型，然后再调用这两个方法。

### 二、拆箱

**1. 定义**

拆箱是指将一个引用类型转换成其对应的基本数据类型的过程。在 JavaScript 中，有七种包装对象类型：Undefined、Null、Boolean、Number、Symbol、BigInt 和 String。对于这些包装对象类型，它们都有对应的基本数据类型。

在 JavaScript 中，拆箱同样是自动进行的。也就是说，当我们将一个引用类型的值赋值给一个基本数据类型的变量时，JavaScript 引擎会自动将该引用类型的值拆箱成其对应的基本数据类型，然后再赋值给该变量。这个过程就是拆箱。

**2. 示例代码**

下面是一个拆箱的示例代码：

```javascript
var numObj = new Number(111);
var strObj = new String("你好啊");
console.log(typeof numObj); // "object"
console.log(typeof strObj); // "object"
var num = numObj.valueOf(); // 拆箱操作
var str = strObj.valueOf(); // 拆箱操作
console.log(typeof num); // "number"
console.log(typeof str); // "string"
```

在上面的代码中，我们定义了一个数字类型的包装对象 `numObj` 和一个字符串类型的包装对象 `strObj`。然后，我们分别输出这两个变量的数据类型，可以看到它们都是对象类型。接着，我们调用了 `numObj` 的 `valueOf()` 方法和 `strObj` 的 `valueOf()` 方法，这两个方法都是对应基本数据类型的方法，因此 JavaScript 引擎会自动将 `numObj` 和 `strObj` 拆箱成其对应的基本数据类型，然后再赋值给 `num` 和 `str` 变量。

### 三、装箱和拆箱的应用

**1.类型判断**

在 JavaScript 中，有时候我们需要判断一个变量的类型，可以使用 `typeof` 运算符。但是，对于引用类型，使用 `typeof` 运算符会返回 `"object"`，而不是对应的引用类型。这时候，我们就可以利用装箱和拆箱的特性来判断一个变量的类型。

```javascript
function isNumber(value) {
  return typeof value === "number" || value instanceof Number;
}

console.log(isNumber(111)); // true
console.log(isNumber(new Number(111))); // true
```

在上面的代码中，我们定义了一个 `isNumber()` 函数，用于判断一个值是否为数字。这个函数使用了两种方式来判断：一种是使用 `typeof` 运算符来判断，另一种是使用 `instanceof` 运算符来判断。其中，使用 `instanceof` 运算符需要将引用类型拆箱成其对应的基本数据类型。

**2.类型转换**

在 JavaScript 中，有时候我们需要将一个值从一种类型转换成另一种类型，可以使用装箱和拆箱来实现。

```javascript
var num = 111;
var str = String(num); // 装箱操作
console.log(typeof str); // "string"
var bool = Boolean(num); // 装箱操作
console.log(typeof bool); // "boolean"
var num2 = Number(str); // 拆箱操作
console.log(typeof num2); // "number"
```

在上面的代码中，我们定义了一个数字类型的变量 `num`。然后，我们使用 `String()` 和 `Boolean()` 函数将 `num` 装箱成字符串类型和布尔类型。接着，我们使用 `Number()` 函数将字符串类型的 `str` 拆箱成数字类型。

# 总结

装箱和拆箱是 JavaScript 中重要的数据类型转换概念。装箱是将基本数据类型转换成包装对象类型，拆箱是将包装对象类型转换成基本数据类型。在 JavaScript 中，这两种转换是自动进行的。
