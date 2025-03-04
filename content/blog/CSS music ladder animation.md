---
date: 2023-04-20
title: css音乐阶梯动画
---

# 前言

今天同样是分享一个 css 动画-音乐耳机阶梯动画，先来看看预览吧。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77a79cb9a5644eaf84de3dbbca3ee87f~tplv-k3u1fbpfcp-watermark.image?" alt="1681975957281 -original-original.gif" width="100%" />

如图可以看到中间的元素就如同一个个跳动的阶梯般，那么接下来就让我们来看看它是如何实现的叭！

### 页面布局

```js
<div class="music">
  <span class="line line1"></span>
  <span class="line line2"></span>
  <span class="line line3"></span>
  <span class="line line4"></span>
  <span class="line line5"></span>
</div>
```

可以看到总容器为一个类名为`music`的`div`盒子，其中包裹着五个`span`标签即预览图中跳动五元素。

### 元素样式

```js
:root {
    --h: 10px
}
```

定义一个 css 变量`--h`后面用于设置每个`span`标签的高度。

接下来对最外层的`music`盒子进行样式设置：

```js
.music {
    position: relative;
    width: 180px;
    height: 160px;
    margin: 0 auto;
    border: 8px solid #90e4f5;
    border-bottom: 0;
    border-top-left-radius: 110px;
    border-top-right-radius: 110px;
}
```

设置宽高为 180px 和 160px，采用相对定位，通过`margin`让其在页面水平方向上居中，去除底部边框，对上边框左右圆角进行设置得到一下效果：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/644ce7595b744ac1a8f55ac2d00539e1~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

接下来通过伪元素来实现左右两个耳麦：

```js
.music::before{
    content: '';
    position: absolute;
    bottom: -10px;
    left: -24px;
    width: 40px;
    height: 82px;
    background-color: #6cb2d2;
    border-radius: 15px;
}
.music::after {
    content: '';
    position: absolute;
    right: 0px;
    bottom: -10px;
    right: -24px;
    width: 40px;
    height: 82px;
    background-color: #6cb2d2;
    border-radius: 15px;
}
```

对耳麦的宽、高、背景色和圆角进行进行设置，对两个伪元素采用绝对定位，相对元素为`music`盒子，通过调整偏移量将两个耳麦分别定位到两侧，此时效果如下：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c524f6e334e490d946e6602f243dac9~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

紧接着就是五个`span`标签的设置：

```js
.line {
    position: absolute;
    width: 8px;
    min-height: 20px;
    animation: equalize 3s 0s infinite;
    animation-timing-function: linear;
    vertical-align: middle;
    bottom: 0 !important;
    box-shadow: inset 0px 0px 16px -2px rgba(0, 0, 0, .15);
}
.line1 {
    left: 30%;
    height: calc(var(--h) * 4);
    animation-delay: -1.9s;
    background: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
}
.line2 {
    left: 40%;
    height: calc(var(--h) * 5);
    animation-delay: -2.9s;
    background: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
}
.line3 {
    left: 50%;
    height: calc(var(--h) * 6);
    animation-delay: -3.9s;
    background: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
}
.line4 {
    left: 60%;
    height: calc(var(--h) * 5);
    animation-delay: -4.9s;
    background: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
}
.line5 {
    left: 70%;
    height: calc(var(--h) * 4);
    animation-delay: -5.9s;
    background: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
}
```

首先对类名为`line`的元素进行通用样式的设置，采用绝对定位便于设置每个`span`元素的位置，同样的宽高设置，`animation: equalize 3s 0s infinite;`设置元素的动画效果。`equalize` 是动画的名称，3s 是动画的持续时间(3 秒)，0s 是动画的延迟时间(0 秒)，`infinite` 表示动画将无限循环播放。`animation-timing-function: linear;`指定动画在播放过程中以线性的速度进行。
`vertical-align: middle;`设置元素在垂直方向上对齐方式为居中对齐。
`box-shadow: inset 0px 0px 16px -2px rgba(0, 0, 0, .15);`设置元素的内阴影效果。`inset` 表示内阴影，`0px 0px 16px -2px` 是指定阴影的偏移、模糊、扩展和颜色值的属性，rgba(0, 0, 0, .15) 是阴影的颜色值。  
此时的效果：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4de0932d01e4e0581a7028c541fa734~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

最后为其添加动画：

```js
@keyframes equalize {
    0% {
        height: calc(var(--h) * 4 + 8px);
        background: linear-gradient(to top, #fa709a 0%, #fee140 100%);
    }
    10% {
        height: calc(var(--h) * 4 + 2px);
        background: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
    }
    20% {
        height: calc(var(--h) * 3 + 5px);
        background: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    }
    30% {
        height: calc(var(--h) * 2 + 6px);
        background: linear-gradient(to top, #befa70 0%, #86fe40 100%);
    }
    40% {
        height: calc(var(--h) * 2);
        background: linear-gradient(to top, #fa70ea 0%, #fb40fe 100%);
    }
    50% {
        height: calc(var(--h) * 3);
        background: linear-gradient(to top, #c070fa 0%, #40ebfe 100%);
    }
    60% {
        height: calc(var(--h) * 4 + 2px);
        background: linear-gradient(to top, #ecfa70 0%, #fea240 100%);
    }
    70% {
        height: calc(var(--h) * 3 + 5px);
        background: linear-gradient(to top, #70fa72 0%, #40ebfe 100%);
    }
    80% {
        height: calc(var(--h) * 4 + 3px);
        background: linear-gradient(to top, #a370fa 0%, #40fece 100%);
    }
    90% {
        height: calc(var(--h) * 3 + 8px);
        background: linear-gradient(to top, #70fac0 0%, #40fec8 100%);
    }
    100% {
        height: calc(var(--h) * 4 + 8px);
        background: linear-gradient(to top, #ee70fa 0%, #40fefb 100%);
    }
}
```

随着动画帧的改变对高度和背景渐变色进行改变。

# 结语

以上便是此次动画效果实现的全程和实现代码，喜欢的可以自己 c
