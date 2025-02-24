---
date: 2023-04-22
showTitle: css加载动画
---

# 前言

在网页设计中，加载动画是非常常见的元素之一。一个好的加载动画可以提高用户体验，让用户等待的时间变得更加愉快。在本文中，我们将学习如何使用 CSS 实现一个字母跳动加载动画。

### HTML 结构

在这段代码中，我们创建了一个包含多个  `.letter`  元素的  `.loader`  容器。每个  `.letter`  元素代表了加载动画中的一个字母，最后三个字母是省略号，用来表示加载过程的持续性。这些元素的样式将在 CSS 中进行定义。

### CSS 样式

首先，我们为  `.loader`  元素设置以下样式：

在上面的代码中，我们将  `.loader`  元素设置为一个 Flex 容器，使其内部的元素可以水平居中和垂直居中，并将其高度设置为整个视口的高度。

接下来，我们为  `.letter`  元素设置以下样式：

```js
.letter {
  font-size: 24px;
  font-weight: bold;
  color: #1abc9c;
  animation: bounce 2s ease-in-out infinite;
}
```

在上面的代码中，我们设置了  `.letter`  元素的字体大小、字体粗细和颜色，并为其添加了一个名为  `bounce`  的动画效果，该动画效果将在 2 秒内完成一次往返跳动，并且无限循环播放。

接下来，我们使用  `nth-child()`  选择器为每个  `.letter`  元素设置不同的动画延迟时间，以使它们在不同的时间开始跳动。

```js
.letter:nth-child(2) {
  --animation-delay: 0.2s;
}

.letter:nth-child(3) {
  --animation-delay: 0.3s;
}

.letter:nth-child(4) {
  --animation-delay: 0.4s;
}

.letter:nth-child(5) {
  --animation-delay: 0.5s;
}

.letter:nth-child(6) {
  --animation-delay: 0.6s;
}

.letter:nth-child(7) {
  --animation-delay: 0.7s;
}

.letter:nth-child(8) {
  --animation-delay: 0.8s;
}

.letter:nth-child(9) {
  --animation-delay: 0.9s;
}

.letter:nth-child(10) {
  --animation-delay: 1s;
}
```

在上面的代码中，我们使用  `--animation-delay`  自定义属性来设置每个  `.letter`  元素的动画延迟时间，以便每个字母在不同的时间开始跳动。

最后，我们使用  `keyframes`  关键字定义一个名为  `bounce`  的动画效果，如下所示：

```js
@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0) rotateY(0deg);
  }
  50% {
    transform: translate3d(0, -20px, 0) rotateY(180deg);
  }
  100% {
    transform: translate3d(0, 0, 0) rotateY(0deg);
  }
}
```

在上面的代码中，我们使用  `transform`  属性定义了一个从原始位置到向上移动 20 像素的动画效果，并使用  `rotateY`  函数实现了字母的翻转效果，这样就实现了一个既有跳动效果又有翻转效果的加载动画。

效果如下：

![1682172653187 -original-original.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ad665d5d01d437184bb57cbcc1362aa~tplv-k3u1fbpfcp-watermark.image?)

# 结语

总的来说，这是一个简单而有效的加载动画，可以帮助用户更好地体验页面加载过程。你可以根据需要对其中的样式和动画进行修改，以满足自己的需求。
