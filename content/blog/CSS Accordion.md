---
date: 2023-04-16
showTitle: css手风琴
---

# 前言

最近看到一个好玩的 css+js 动画案例，本着独乐乐不如众乐乐的想法，今天就来和大家一起分享分享快乐，好啦，废话不多说，让我们直接开始吧。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5d775f21dad4cc4869dcb87374a85aa~tplv-k3u1fbpfcp-watermark.image?" alt="original.gif" width="100%" />

### 准备工作

[Font Awesome 字体库](https://fontawesome.com/search) 根据个人需要选择图标  
[BootCDN](https://www.bootcdn.cn/font-awesome/) 获取字体库样式

### 正式开始

此案例总共有四个文件：  
页面文件：`index.html`  
功能文件：`index.js `  
样式文件：`index.css`  
静态资源：`images`

首先将我们所需要的 css 与 js 引入在页面文件：

```js
// 自定义样式文件引入
<link rel="stylesheet" href="index.css">
// 字体库样式引入
<link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<!-- 自定义js文件引入 -->
<script src="index.js"></script>
```

页面整体布局：

```js
<div class="container">
  <div class="item active" style="background-image: url(./images/1.jpg);">
    <div class="content">
      <div class="icon">
        <i class="fa-solid fa-heart fa-fade"></i>
      </div>
      <div class="text">
        <div class="title">这是标题</div>
        <div class="sub">这是一段描述</div>
      </div>
    </div>
  </div>
  <div class="item" style="background-image: url(./images/2.jpg);">
    <div class="content">
      <div class="icon">
        <i class="fa-solid fa-heart"></i>
      </div>
      <div class="text">
        <div class="title">这是标题</div>
        <div class="sub">这是一段描述</div>
      </div>
    </div>
  </div>
  <div class="item" style="background-image: url(./images/3.jpg);">
    <div class="content">
      <div class="icon">
        <i class="fa-solid fa-heart"></i>
      </div>
      <div class="text">
        <div class="title">这是标题</div>
        <div class="sub">这是一段描述</div>
      </div>
    </div>
  </div>
  <div class="item" style="background-image: url(./images/4.jpg);">
    <div class="content">
      <div class="icon">
        <i class="fa-solid fa-heart"></i>
      </div>
      <div class="text">
        <div class="title">这是标题</div>
        <div class="sub">这是一段描述</div>
      </div>
    </div>
  </div>
  <div class="item" style="background-image: url(./images/5.jpg);">
    <div class="content">
      <div class="icon">
        <i class="fa-solid fa-heart"></i>
      </div>
      <div class="text">
        <div class="title">这是标题</div>
        <div class="sub">这是一段描述</div>
      </div>
    </div>
  </div>
</div>
```

页面总体容器为`container`，里面放置 5 个`item`子容器每个子容器背景为所要展示的图片，每个子容器内有包裹着一个内容容器`content`,`content`容器内包含图标与介绍内容，默认第一个卡片为选中状态。此时页面效果：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef0bf5fd56154fe2ab0a72a307ca0556~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

接下来对页面添加样式：

```js
* {
    padding: 0;
    margin: 0;
}

body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at top center,#718497,#29323c);
}
```

先重置一下样式，将内外边距设为 0，对`body`采用`flex`弹性布局将整个`container`进行居中，并对背景进行渐变，`circle`指定了渐变形状为圆形，`at top center`指定了渐变的中心点在元素顶部的中心位置。`#718497`和`#29323c`是两个颜色值，表示渐变的起始颜色和结束颜色。此时效果：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ef69698d7354d9fad5528bc5dee730a~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

接下来对`container`容器中的子元素容器`item`进行样式编写：

```js
.container {
    display: flex;
    width: 80vw;
    max-width: 800px;
    height: 600px;
    overflow: hidden;
}

.item {
    position: relative;
    width: 80px;
    margin: 10px;
    cursor: pointer;
    border-radius: 30px;
    /* 保持原有尺寸比例，裁剪长边 */
    background-size: cover;
    /* 定位背景图像为中间 */
    background-position: center;
    /* 过渡动画 */
    transition: 0.5s cubic-bezier(0.05,0.61,0.41,0.95);
    overflow: hidden;
}

.item .content {
    display: flex;
    position: absolute;
    left: 20px;
    right: 0;
    bottom: 10px;
    height: 40px;
    transition: 0.5s cubic-bezier(0.05,0.61,0.41,0.95);
}
```

同样对`container`进行弹性布局，并设置宽高度以及最大宽度，对每张卡片容器`item`同样进行宽度与高度的设置，`cursor`设置为 poiner,当鼠标移至元素上方鼠标箭头会变为小手套，再就是对背景图片的尺寸及显示位置进行了设置，而该代码中的`transition`属性指定了元素的过渡效果，而`0.5s`指定了过渡的时间为 0.5 秒。`cubic-bezier(0.05,0.61,0.41,0.95)`是一个贝塞尔曲线，用于控制过渡效果的速度。具体来说，它表示过渡效果的速度在开始时比较慢，在中间时较快，最后再慢下来，从而产生一种平滑的加速和减速效果(后续过渡动画依旧使用)。此时页面效果:

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ac9c208c9564e50b7c66ce23816f882~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

接下来对每张卡片内部样式进行定义：  
首先是卡片内的图标：

```js
.item .content .icon {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
}
```

设置卡片图标的宽高，并设置字体大小为 16px,背景色设为白的，设置圆角使其形状为圆形，最小宽度为 40px。

实现效果：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01e879df67e04514bd1fef202d99fec9~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

再为其添加上选中时的状态样式：

```js
.item.active {
    flex: 1;
    margin: 0;
    border-radius: 0.1s;
}

.item.active .content {
    bottom: 20px;
    left: 20px;
}
```

选中时，该卡片占据剩余所有空间，并对内容部分的边距进行调整。

效果图:
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b9e7a13c5814ba3a093b99f506f47fb~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

当然这样还不够，还需对里面的文字进行调整：

```js
.item .content .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    color: #fff;
    width: 100%;
}

.item .content .text div {
    width: calc(100% - 70px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.5s ease-out ;
}

.item .content .text .title{
    font-size: 18px;
    font-weight: bold;
}

.item .content .text .sub{
    transition-delay: 0.1s;
}


.item.active .content .text div {
    opacity: 1;
}
```

对文本采用`flex`布局，排列方向为纵向，对存放文本内容的两个`div`盒子设置宽度，当文本超出盒子宽度时进行隐藏以省略号替代，初始时文本内容不显示，`opacity`设置为 0,当选中卡片为当前卡片时`opacity`设置为 1 进行显示，并添加动画效果`transition: opacity 0.5s ease-out;`实现缓出动画，不会显得突兀。此时效果图：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4492bf229ed64c1fb97975fb799c15e3~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

可以看到此时 css 已经基本实现，但是 icon 图标的颜色统一，不太美观，所以对 icon 图标添加样式，当其卡片为选中状态时，不同的卡片中的 icon 显示不同颜色，如下：

```js
.item.active:nth-child(1) i {
    color: #f08d5b;
}

.item.active:nth-child(2) i {
    color: #5ece03;
}

.item.active:nth-child(3) i {
    color: #03bdce;
}

.item.active:nth-child(4) i {
    color: #0351ce;
}

.item.active:nth-child(5) i {
    color: #03cece;
}
```

效果图：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ff31347395b4a6bada1e4c2f4791a38~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

以上根据不同的类名为`item`的元素为其选中状态时的`i`图标添加了不同的颜色，可以看到此时的 icon 已经有了颜色，接下来我们将要实现卡片的切换功能。js 代码如下：

```js
let items = document.querySelectorAll(".item");
let icons = document.querySelectorAll("i");

function setActive() {
  items.forEach((item) => {
    item.classList.remove("active");
  });
  icons.forEach((icon) => {
    icon.classList.remove("fa-fade");
  });
  let icon = this.getElementsByTagName("i");
  icon[0].classList.add("fa-fade");
  this.classList.add("active");
}
items.forEach((item) => {
  item.addEventListener("click", setActive);
});
```

首先我们获取了所有的类名为`item`的元素`items`和所有的`i`元素`icons`，通过遍历`items`为每个类名含有`item`的标签添加了一个点击事件，其中每次调用`setActive`函数都会遍历`items`和`icons`将之前选中标签的选中状态清除，再为当前选中标签添加激活样式，其中`fa-fade`样式为图标图自带，效果使图标闪烁。至此一个完整的图片手风琴效果就实现了。

# 结语

个人觉得这种还是挺好玩的，所以便拿来分享分享，以上便是所有的代码，喜欢的话可以给作者点点小赞。
