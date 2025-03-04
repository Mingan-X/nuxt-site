---
date: 2023-04-21
title: css旋转导航
---

# 前言

今天刷视频看到一个有趣的 css 导航菜单，于是乎便拿来一起分享分享，老样子先看效果图：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/466def1a8e13497998ee1bfc44dec679~tplv-k3u1fbpfcp-watermark.image?" alt="1682067868469 -original-original.gif" width="70%" />

接下来让我们一步步实现它。

### 页面布局

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>旋转菜单</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 菜单部分 -->
    <nav class="menu">
        <input checked="checked" class="menu-toggler" id="menu-toggler" type="checkbox">
        <label for="menu-toggler"></label>
        <ul>
            <li class="menu-item">
                <a class="fa-brands fa-facebook" href="#"></a>
            </li>
            <li class="menu-item">
                <a class="fa-brands fa-twitter" href="#"></a>
            </li>
            <li class="menu-item">
                <a class="fa-brands fa-instagram" href="#"></a>
            </li>
            <li class="menu-item">
                <a class="fa-brands fa-github" href="#"></a>
            </li>
            <li class="menu-item">
                <a class="fa-brands fa-youtube" href="#"></a>
            </li>
            <li class="menu-item">
                <a class="fa-brands fa-tiktok" href="#"></a>
            </li>
        </ul>
    </nav>
</body>
</html>
```

这里`<nav>`定义一个导航菜单，`<input>`定义一个复选框，用于控制菜单的显示和隐藏，`<label>`与复选框关联，用于触发复选框的选中状态，`<ul>`定义一个无序列表，用于存放菜单项，`<li>`用于包含一个菜单项， `<a>`用于链接到其他页面或位置，`class="menu"`定义了一个 CSS 类，用于对导航菜单进行样式设置，`class="menu-toggler"`用于对复选框进行样式设置，`id="menu-toggler"`：定义了一个 ID，用于与标签进行关联，`class="menu-item"`用于对菜单项进行样式设置，同时这里各菜单选项的图标是采用`font-awesome`图标库的图标。  
写完页面结构后，此时页面：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e9aa5fd1a3d401588f3c4a8aedf1ebe~tplv-k3u1fbpfcp-watermark.image?)

接下来对各元素进行样式设置。

### 样式部分

对中心菜单展开选择元素进行设置：

```js
body {
    overflow: hidden;
    background: linear-gradient(to right, #55c883, #4fccc4);
}

.menu-toggler {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 40px;
    height: 40px;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
}
.menu-toggler + label {
    width: 40px;
    height: 5px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: rgba(255, 255, 255, 0.7);
    transition: transform 0.5s, top 0.5s;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
}

.menu-toggler + label:before, .menu-toggler + label:after {
    width: 40px;
    height: 5px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: rgba(255, 255, 255, 0.7);
    transition: transform 0.5s, top 0.5s;
    content: "";
    position: absolute;
    left: 0;
}

.menu-toggler + label:before {
    top: 10px;
}

.menu-toggler + label:after {
    top: -10px;
}

.menu-toggler:hover + label, .menu-toggler:hover + label:before, .menu-toggler:hover + label:after {
    background: white;
}

.menu-toggler:checked + label {
    background: transparent;
}

.menu-toggler:checked + label:before, .menu-toggler:checked + label:after {
    top: 0;
    width: 40px;
    transform-origin: 50% 50%;
}

.menu-toggler:checked + label:before {
    transform: rotate(45deg);
}

.menu-toggler:checked + label:after {
    transform: rotate(-45deg);
}
```

- `overflow: hidden;`：将页面的滚动条隐藏。

- `background: linear-gradient(to right, #55c883, #4fccc4);`：设置页面的背景颜色为从左到右渐变的绿色。

- 对复选框进行样式设置：`.menu-toggler`。

  - `position: absolute;`：将复选框设置为绝对定位，以便进行居中显示。
  - `display: block;`：将复选框设置为块级元素，以便设置宽度和高度。
  - `top: 0; bottom: 0; right: 0; left: 0;`：将复选框的上下左右都设置为 0，以便进行居中显示。
  - `margin: auto;`：将复选框的外边距设置为  `auto`，以便进行水平和垂直居中。
  - `width: 40px; height: 40px;`：设置复选框的宽度和高度为 40 像素。
  - `z-index: 2;`：将复选框的层级设置为 2，使其显示在菜单项之上。
  - `opacity: 0;`：将复选框的透明度设置为 0，使其不可见。
  - `cursor: pointer;`：将鼠标指针的样式设置为手型，以便提示用户可以进行单击操作。

- `.menu-toggler + label`：对关联的标签进行样式设置。

  - `width: 40px; height: 5px;`：设置标签的宽度为 40 像素，高度为 5 像素。
  - `display: block;`：将标签设置为块级元素，以便设置宽度和高度。
  - `z-index: 1;`：将标签的层级设置为 1，使其显示在菜单项之下。
  - `border-radius: 2.5px;`：将标签的边框半径设置为 2.5 像素，以便显示圆角。
  - `background: rgba(255, 255, 255, 0.7);`：设置标签的背景颜色为半透明的白色。
  - `transition: transform 0.5s, top 0.5s;`：设置标签的变换过渡效果为 0.5 秒，包括  `transform`  和  `top`  属性。
  - `position: absolute;`：将标签设置为绝对定位，以便进行居中显示。
  - `top: 0; bottom: 0; right: 0; left: 0;`：将标签的上下左右都设置为 0，以便进行居中显示。
  - `margin: auto;`：将标签的外边距设置为  `auto`，以便进行水平和垂直居中。

- `.menu-toggler + label:before, .menu-toggler + label:after`：对标签的伪元素进行样式设置。

  - `width: 40px; height: 5px;`：设置伪元素的宽度为 40 像素，高度为 5 像素。
  - `display: block;`：将伪元素设置为块级元素，以便设置宽度和高度。
  - `z-index: 1;`：将伪元素的层级设置为 1，使其显示在菜单项之下。
  - `border-radius: 2.5px;`：将伪元素的边框半径设置为 2.5 像素，以便显示圆角。
  - `background: rgba(255, 255, 255, 0.7);`：设置伪元素的背景颜色为半透明的白色。
  - `transition: transform 0.5s, top 0.5s;`：设置伪元素的变换过渡效果为 0.5 秒，包括  `transform`  和  `top`  属性。
  - `content: "";`：将伪元素的内容设置为空。
  - `position: absolute;`：将伪元素设置为绝对定位，以便进行居中显示。
  - `left: 0;`：将伪元素的左侧位置设置为 0。

- `.menu-toggler + label:before`：对标签的第一个伪元素进行样式设置。

  - `top: 10px;`：将伪元素的顶部位置设置为 10 像素。

- `.menu-toggler + label:after`：对标签的第二个伪元素进行样式设置。

  - `top: -10px;`：将伪元素的顶部位置设置为 -10 像素。

- `.menu-toggler:hover + label, .menu-toggler:hover + label:before, .menu-toggler:hover + label:after`：对鼠标悬停在复选框或标签上时的样式进行设置。

  - `background: white;`：将背景颜色设置为白色。

- `.menu-toggler:checked + label`：对复选框选中时的标签样式进行设置。

  - `background: transparent;`：将背景颜色设置为透明。

- `.menu-toggler:checked + label:before, .menu-toggler:checked + label:after`：对复选框选中时的标签伪元素进行样式设置。

  - `top: 0;`：将伪元素的顶部位置设置为 0，以便显示为横线。
  - `width: 40px;`：将伪元素的宽度设置为 40 像素，以便显示为横线。
  - `transform-origin: 50% 50%;`：将伪元素的变换原点设置为中心点。

- `.menu-toggler:checked + label:before`：对复选框选中时的标签第一个伪元素进行样式设置。

  - `transform: rotate(45deg);`：将伪元素顺时针旋转 45 度，以便显示为斜线。

- `.menu-toggler:checked + label:after`：对复选框选中时的标签第二个伪元素进行样式设置。

  - `transform: rotate(-45deg);`：将伪元素逆时针旋转 45 度，以便显示为斜线。

以上样式实现思路为，采用绝对定位对该元素进行定位居于页面中心，当复选框未被选中时，利用`label`及其伪元素实现三条横线的展示，当选中时，对两个伪元素分别进行顺逆时针的旋转，形成第二张图的效果，另外当是鼠标悬停时，会对背景颜色在透明与白色之间切换，以上已经对于各个属性及其主要作用进行了解释。
此时效果：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1618596c12ec49debaad9748994bb574~tplv-k3u1fbpfcp-watermark.image?)

选中时：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3caf5d2b961a4183a2feee4a1e8324dd~tplv-k3u1fbpfcp-watermark.image?)

接下来对各菜单选项进行样式设置：

```js
.menu-toggler:checked ~ ul .menu-item {
    opacity: 1;
}

.menu-toggler:checked ~ ul .menu-item:nth-child(1) {
    transform: rotate(0deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(2) {
    transform: rotate(60deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(3) {
    transform: rotate(120deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(4) {
    transform: rotate(180deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(5) {
    transform: rotate(240deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(6) {
    transform: rotate(300deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item a {
    pointer-events: auto;
}

.menu-item:nth-child(1) a {
    transform: rotate(0deg);
}

.menu-item:nth-child(2) a {
    transform: rotate(-60deg);
}

.menu-item:nth-child(3) a {
    transform: rotate(-120deg);
}

.menu-item:nth-child(4) a {
    transform: rotate(-180deg);
}

.menu-item:nth-child(5) a {
    transform: rotate(-240deg);
}

.menu-item:nth-child(6) a {
    transform: rotate(-300deg);
}

.menu-item {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 80px;
    height: 80px;
    opacity: 0;
    transition: 0.5s;
}

.menu-item a {
    display: block;
    width: inherit;
    height: inherit;
    line-height: 80px;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    text-align: center;
    text-decoration: none;
    font-size: 40px;
    pointer-events: none;
    transition: 0.2s;
}

.menu-item a:hover {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
    color: white;
    background: rgba(255, 255, 255, 0.3);
    font-size: 44.44px;
}
```

以上代码是对菜单选项进行设置，初始时，菜单选项`opacity: 0;`即进行隐藏，当复选框被选中时，改变透明度的值为`opacity: 1;`使其展现出来，同时，对所有选项在 x 轴上进行一定偏移，并且为每个选项设置单独的旋转角度，使得选项围绕中心复选框，同时由于菜单选项的角度旋转会导致超链接的图标也角度也有偏移，需再对各图标进行一定角度的旋转，以上样式主要是旋转，样式代码比较容易理解，其中`.menu-toggler:checked ~ ul .menu-item`是复合选择器选中紧接着被选中的`.menu-toggler` 元素后面的同级 `ul` 元素中的所有 class 为 `.menu-item`的元素,`transition`设置过渡动画时长，其余就不过多叙述了。

# 结语

以上便是全部代码，喜欢的小伙伴可以自取。
