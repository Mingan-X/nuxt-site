---
date: 2023-04-14
showTitle: JS数组去重
---

# 前言

数组可以说是经常与我们打交道的'老朋友'了，相信对于大家来说对于数组去重应该很熟悉了，今天就让我们来聊聊比较常见的几种数组去重的方法

## 去重方法

### 简单快速的 es6 的 Set

es6 提供的 Set 对象进行数组去重简单易用，且代码编写简洁易读，只需数组转换为 Set 对象再转换回来便可以实现一次去重，而且使用 Set 对象去重的效率比其他方法高，因为 Set 对象值储存唯一的值，可以在添加元素时进行快速比较。
如以下实例：

```js
let arr = [1, 2, 2, 3, 5, 6, 6];
// Set 去重
function uniq(arr) {
  return Array.from(new Set(arr));
}

console.log(arr);
console.log(uniq(arr));
```

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf5a7b09d7ac49d9862f1dd9dffe7429~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />
可以看到很简单的就实现了数组去重，但是这种方法有个弊端，它无法实现对象类型数组的去重。如下：

```js
let arr = [1, 2, 2, 3, 5, 6, 6, { a: 1 }, { a: 1 }];
// Set 去重
function uniq(arr) {
  return Array.from(new Set(arr));
}

console.log(arr);
console.log(uniq(arr));
```

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20f087d9f4144b8a8359d985deb96f47~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

可以看到数组中引用类型的数据并没有进行去重，这是因为 Set 的去重参照的是（===），数组中的元素对象，虽然可能数值相等，但是地址不相等。所以 Set 无法实现去重。

综上所述，使用 Set 方法去重是一种简单、高效、易用的方法，适用于大部分的数组去重需求。但如果需要去重的数组中包含对象元素，则需要使用其他方法进行去重。

### 原始的两层循环

采用两层循环可以对任何类型数组进行去重，且代码逻辑简单，如下：

```js
let arr = [1, 2, 2, 3, 5, 6, 6, { a: 1 }, { a: 1 }];
// 两次循环
function uniq(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1, len = arr.length; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
        len--;
      }
    }
  }
  return arr;
}

console.log(arr);
console.log(uniq(arr));
```

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ea10ecf1c584916bf7f31c0da9bf981~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />
可能会有人问，这对象数据不是没有进行去重吗？别急咱们接着往下看：

```js
let arr = [
  { id: 1, a: 1 },
  { id: 1, a: 1 },
];
// 两次循环
function uniq(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1, len = arr.length; j < len; j++) {
      if (arr[i].id === arr[j].id) {
        arr.splice(j, 1);
        j--;
        len--;
      }
    }
  }
  return arr;
}

console.log(arr);
console.log(uniq(arr));
```

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43173a9c799d49bbb6461cc83c8bf12b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />
可以看到对于对象类型的数组我们可以根据对象数据中的某一元素作为去重依据进行去重，当然这里只是一个简单的举例，实际中自己可以根据实际需要自行选择和对代码进行调整。

综上所述，双重循环遍历数组的方式虽然代码逻辑简单，但是代码逻辑简单效率低，适用于小型数组或者对性能要求不高的场景，但对于大型数组或者对性能要求较高的场景。

### indexOf 去重

indexOf 进行数组去重比较简单(对于上一个方法)，适用于简单数据类型数组，不适合对象类型数组。如下：

```js
let arr = [1, 2, 6, 2, 3, 4, 1];
function uniq(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

console.log(arr);
console.log(uniq(arr));
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1cb9fcb223d4b4e9ebd32a9043d1562~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />
可以看到对于简单数据类型的成功去重。

虽然使用 indexOf 方法去重相对简单易用，但只适用于简单数据类型的数组，对于复杂数据类型的数组不建议使用，而且效率较低。

### includes 去重

这与 indexOf 方法类似，只需对上述代码略微修改。如下：

```js
let arr = [1, 2, 6, 2, 3, 4, 1];
function uniq(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(arr);
console.log(uniq(arr));
```

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7926712e8a7c498289406373f1485adc~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

可以看到也是实现了对数组的去重，不过与上述方法一样不推荐。

### filter 数组去重

```js
function uniq(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item, 0) === index;
  });
}
console.log(arr);
console.log(uniq(arr));
```

filter 通过自定义添加的条件来判断当前元素是否满足条件，满足则留下，否则 pass。本例是通过判断当前元素下标在该元素在 arr 中第一次出现下标是否相同，是则保留，其中的判断语句, arr 表示要查找的数组，item 表示要查找的元素，0 表示从数组的 0 这个索引值开始查找，该参数可以为其他，默认值为 0。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d6a18167f5a41d4b2a6b004b0f0a15c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

# 结语

以上便是，本次分享的五种数组去重方法，当然数组去重的方法多种多样，还有 map、reduce 一些等等，这里就不再一一论述了，感兴趣的话可以自己找相关文章了解了解，好了本篇文章到此就结束了,Bye!!!
