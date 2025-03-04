---
date: 2023-02-09
title: 我的名片
---

当青训营遇上码上掘金

## 介绍

本次活动主要有四个主题可供选择，其中前端后端各有两个可选。而我选择的是**我的名片**,毕竟谁不想要用代码写一张自己的名片呢 😜，这次我展示的是一部动漫中的人物信息。

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f6ecc6ab75541998a21486dd3b91bdf~tplv-k3u1fbpfcp-watermark.image?" alt="我的名片.gif" width="100%" />

## 实现原理

主要用到了弹性布局、定位和 css 动画来实现。

## 实现过程

### 页面结构

整张卡片使用`flex`布局，分为`left`和`right`两部分，其中`.left`占据四分之一作为头像区域，`.right`作为信息展示区占四分之三。代码如下：

```html
<div class="card">
  <i class="top"></i>
  <div class="left">
    <div class="icon">
      <img
        src="https://gitee.com/JCX2927917567/mtds/raw/master/img/202302042004578.webp"
      />
    </div>
  </div>
  <div class="right">
    <p>姓名：虎太郎</p>
    <p>年龄：2岁</p>
    <p>性别：男</p>
    <p>
      介绍：作为小孩子的他，又是和哥哥很相似，隐藏心思不希望给别人带来麻烦。更多时候还是如他的年龄一般的直率，第一次见到理事长就叫对方恶魔婆婆，之后把理事长的发型叫成鸟巢头。虽然感觉很成熟，但是自己喜欢的人(龙一)和别的小朋友在一起也会吃醋。很喜欢窝在龙一怀里，红起脸来非常可爱PS：忍耐力一流
    </p>
  </div>
  <i class="bottom"></i>
</div>
```

### 页面样式

给`body`一个背景色，设置`grid`布局将卡片位置居中，将卡片渐变背景色采用`background: linear-gradient(rgb(165, 244, 255), rgb(222, 229, 229), rgb(165, 244, 255));`来设置，并设置盒子阴影。代码如下：

```css
body {
  background-color: rgb(127, 255, 212, 0.6);
  height: 100vh;
  width: 100vw;
  display: grid;
  justify-items: center;
  align-items: center;
}
.card {
  display: flex;
  position: relative;
  width: 600px;
  height: 40vh;
  min-height: 270px;
  padding: 6px;
  overflow: hidden;
  box-shadow: 0 0 10px 0px rgb(168, 195, 187);
  background: linear-gradient(
    rgb(165, 244, 255),
    rgb(222, 229, 229),
    rgb(165, 244, 255)
  );
}
.left {
  border-right: 2px solid white;
  width: 25%;
  height: 100%;
}
.right {
  flex: 1;
  margin-left: 15px;
}
.icon {
  position: relative;
  z-index: 1;
  width: 100px;
  height: 100px;
  margin: 25px auto 0;
}
.icon img {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
```

### 头像边框动画

主要是利用伪元素加上定义动画帧来实现，将伪元素通过定位做到与`.icon`盒子重合且超出部分，再为该伪元素添加渐变背景，通过`@keyframes`来实现背景色的变换，从而达到边框动态的视觉效果。代码如下：

```css
.icon::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
  margin: -4px;
  border-radius: 50%;
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  0% {
    background: linear-gradient(0deg, #5dc246, #85e20c, #dd1dff);
  }
  100% {
    background: linear-gradient(360deg, #dd1dff, #0ce2c9, #5dc246);
  }
}
```

### 卡片流光边框

实现原理主要是通过控制动画帧来实现，首先是给`.card`添加伪元素`::before`和`::after`作为该卡片的前后边框，再定义两个`i`标签作为上下边框，并通过设置`top`、`bottom`、`left`、`right`来调整元素初始位置.例如给`.card::before`设置`top: -100%;left: 0;`使其位于卡片左边缘上方 100%处，通过动画帧使其在节点 50%,100%时`top:100%`来实现流光的视觉效果,同时要给动画设置`animation-delay`来达到动画顺序执行，上面节点 50%处便达到`top:100%`是为了预留动画等待时间达到动画衔接。代码如下：

```css
.card::before {
    content: '';
    position: absolute;
    width: 3px;
    height: 50%;
    top: -100%;
    left: 0;
    background: linear-gradient(0deg,transparent,#03e9f4,transparent);
    animation: one 4s linear infinite;
    animation-delay: 0s;
}
.card::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 50%;
    bottom: -100%;
    right: 0;
    background: linear-gradient(270deg,transparent,#03e9f4,transparent);
    animation: three 4s linear infinite;
    animation-delay: 2s;
}
.card i {
    position: absolute;
    display: inline-block;
    height: 3px;
    width: 50%;
}
.card .bottom {
    bottom: 0;
    left: -100%;
    background: linear-gradient(180deg,transparent,#03e9f4,transparent);
    animation: two 4s linear infinite;
    animation-delay: 1s;
}
.card .top {
    top: 0;
    right: -100%;
    background: linear-gradient(360deg,transparent,#03e9f4,transparent);
    animation: four 4s linear infinite;
    animation-delay: 3s;
}
@keyframes one {
    0% {
        top: -100%;
    }
    50%,
    100% {
        top: 100%;
    }
}
@keyframes two {
    0% {
        left: -100%;
    }
    50%,
    100% {
        left: 100%;
    }
}
@keyframes three {
    0% {
        bottom: -100%;
    }
    50%,
    100% {
        bottom: 100%;
    }
}
@keyframes four {
    0% {
        right: -100%;
    }
    50%,
    100% {
        right: 100%;
    }
```

## 完整作品

[jcode](https://code.juejin.cn/pen/7197635534397653053)

## 个人小结

以上便是本次我对于本次主题活动的一个创作，虽然该名片较为简易 🙃，但在创作是还是有不少的收获 🧐，综上便是本次所要分享的全部啦 😜。
