---
date: 2023-05-06
showTitle: 使用CSS实现加载动画
---

# 前言

相信大家都遇到过这种情况，在等待网页加载完成的过程中，界面是一片空白。为了提高用户体验，我们可以设计一个 Loading 效果，告诉用户页面正在加载中，让用户有所期待。本文将会为您介绍一个基于 CSS 动画实现的 Loading 效果的实现方法。
[jcode](https://code.juejin.cn/pen/7230084682124591136)

### HTML

首先，我们需要创建一个容器来放置我们的小球和动画效果。在这个例子中，我们使用了一个 div 元素，并为它添加了一个类名`loader`。接下来，我们将在这个容器中添加三个小球元素，并为它们添加了一个类名`circle`。

```js
<div class="loader">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

### CSS

接下来，在 CSS 中，我们将为这些元素添加样式。

首先，对总体容器进行样式设置：

```js
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```

这里定义了一个名为`loader`的容器，样式中设置了该容器的高度为 100vh，这样容器会占据整个屏幕的高度。此外，我们还使用了 CSS Flex 布局，使得三个圆形小球元素都居中显示。

接下来，对小球进行样式设置：

```js
.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0 10px;
    animation: pulse 1s ease-in-out infinite alternate;
}

.circle:nth-child(2) {
    animation-delay: 0.2s;
}

.circle:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.5);
    }
}
```

样式定义了三种`circle`样式（分别对应父容器中的三个子元素）。它们的大小都是以圆的形式显示，另外还采用了动画。我们可以看到，`animation`样式定义了动画的名称（pulse）、动画执行的时间（1s）、动画执行的方式（ease-in-out）和动画的循环次数（infinite），在这里我们设定成“alternate”，这样动画会在正向和反向两个方向上反复重复。

接下来，我们将使用 JavaScript 为小球添加随机颜色。

```js
// 获取所有的小球元素
const circles = document.querySelectorAll(".circle");

// 生成随机颜色
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 遍历所有的小球元素，为每个小球随机设置颜色
circles.forEach((circle) => {
  circle.style.backgroundColor = getRandomColor();
});
```

我们首先使用`querySelectorAll()`方法获取所有的小球元素。然后，我们创建一个名为`getRandomColor()`的函数来生成随机颜色。在这个函数中，我们使用了一个循环来生成一个六位的随机十六进制数，并将其转换为颜色值。最后，我们遍历所有的小球元素，为每个小球随机设置颜色。

在这个例子中，我们使用了 CSS 和 JavaScript 来创建一个简单的加载动画，并为小球添加了随机颜色。这个加载动画可以帮助用户更好地理解页面正在加载的情况，并且可以提高用户的体验感。

# 结语

在现代网页设计中，动画效果是非常重要的一部分。它可以帮助我们更好地表达页面内容，提高用户的体验感，同时也可以增加网站的视觉吸引力。通过上面的方法,我们可以轻松地实现一个简单的 Loading 页面，优化用户体验。希望本篇文章对你有所帮助！
