---
date: 2023-05-02
title: 如何实现一个交互式导航栏
---

# 前言

在网页开发中，交互式导航栏是一个非常常见的元素。它可以帮助用户快速找到所需的页面或功能，并提供更好的用户体验。在本篇文章中，我们将学习如何使用 HTML、CSS 和 JavaScript 创建一个简单的交互式导航栏。

[jcode](https://code.juejin.cn/pen/7228588582981042213)

首先，我们需要使用 HTML 定义导航栏的结构。在这里，我们使用一个包含多个 section 的 nav 元素，并在每个 section 中添加一个 a 元素和一个 span 元素。a 元素用于显示图标，span 元素用于显示导航项的名称。例如：

```js
<nav>
  <section class="active">
    <a class="fa-brands fa-facebook" href="#"></a>
    <span>Facebook</span>
  </section>
  <section>
    <a class="fa-brands fa-twitter" href="#"></a>
    <span>Twitter</span>
  </section>
  <section>
    <a class="fa-brands fa-instagram" href="#"></a>
    <span>Instagram</span>
  </section>
  <section>
    <a class="fa-brands fa-github" href="#"></a>
    <span>Github</span>
  </section>
  <section>
    <a class="fa-brands fa-tiktok" href="#"></a>
    <span>Tiktok</span>
  </section>
</nav>
```

然后，我们需要使用 CSS 定义导航栏的样式和布局。在这里，我们使用了 flex 布局和 grid 布局，来实现导航栏的水平排列和自适应宽度。我们还使用了一些 CSS 属性来添加动画效果和活动状态。

```js
nav {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    height: 80px;
    position: relative;
}

nav section {
    display: flex;
    width: 80px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
    position: relative;
}

span {
    font-size: 0.8em;
    transition: all 0.2s linear;
    font-weight: bold;
    transform: translateY(30px);
    opacity: 0;
    position: absolute;
}

section.active a {
    transform: translateY(-120%);
    color: white;
}

section.active span {
    opacity: 1;
    transform: translateY(10px);
}
```

以下是具体样式的分析：

- `nav` 元素使用 grid 布局，其中 `grid-template-columns` 属性定义了每列的宽度，这里使用了 `repeat()` 函数和 `1fr` 单位，表示有 5 列，每列宽度相等。
- `nav section` 元素使用 flexbox 布局，其中 `flex-direction` 属性设置为 `column`，表示子元素在垂直方向排列。`width` 属性设置为 80px，表示每个导航按钮的宽度。`align-items` 和 `justify-content` 属性分别设置为 `center`，表示子元素在水平和垂直方向上都居中对齐。`cursor` 属性设置为 `pointer`，表示鼠标悬停在导航按钮上时显示手型光标。`z-index` 属性设置为 999，表示该元素在堆叠顺序中排在其他元素的前面。
- `span` 元素用于在导航按钮下方显示文本说明，其中 `font-size` 属性设置为 0.8em，表示字体大小相对于父元素缩小 20%。`transition` 属性表示这个元素的变化应用了一个线性过渡，具体时间为 0.2s。`font-weight` 属性设置为 `bold`，表示字体加粗。`transform` 属性设置为 `translateY(30px)`，表示将元素在垂直方向上向下移动 30px。`opacity` 属性设置为 0，表示元素不可见，即透明。
- `section.active a` 表示在当前导航按钮被激活时，其中的链接文字应该向上移动到导航按钮上方，同时字体颜色变为白色。使用 `transform` 属性将链接文字向上移动 120%，使用 `color` 属性将字体颜色设置为白色。
- `section.active span` 表示在当前导航按钮被激活时，其中的文本说明应该从下方向上移动到导航按钮下方，同时透明度设置为 1。使用 `transform` 属性将文本说明向上移动 10px，使用 `opacity` 属性将元素设置为不透明。

最后，我们需要使用 JavaScript 添加一些交互功能。在这里，我们使用了事件监听器和 CSS 样式来实现当用户鼠标悬停在导航项上时，导航栏会有一个小球跟随移动，同时当前导航项会有活动状态的效果。

```js
const main = document.querySelector("main");
const sections = main.querySelectorAll("section");
const ball = main.querySelector(".ball");

const clearClass = (section) => {
  sections.forEach((section) => {
    section.classList.remove("active");
  });
  section.classList.add("active");
};

sections.forEach((section, index) => {
  section.addEventListener("mouseenter", () => {
    clearClass(section);
    ball.style.cssText = `left: ${80 * index}px`;
  });
});
```

代码首先通过`document.querySelector`方法获取了`main`元素，`main.querySelectorAll`方法获取了所有的`section`元素，还获取了具了`.ball`类的元素。

接下来定义了一个`clearClass`函数，用于移除所有`section`元素的`active`类，并把指定的`section`元素加上`active`类。这个函数可以用于在鼠标进入某个`section`元素时设置该元素为活动状态。

最后，代码使用`sections.forEach`方法遍历了所有的`section`元素，并为每个元素添加了一个`mouseenter`事件监听器。当鼠标进入某个`section`元素时，触发事件监听器，调用`clearClass`函数将该元素设置为活动状态，同时通过计算该元素在所有`section`元素中的索引值，计算出`.ball`元素应该移动到的位置，并使用`ball.style.cssText`属性设置`.ball`元素的`left`样式值，从而实现`.ball`元素的移动效果。

# 结语

通过以上三个步骤，我们已经成功创建了一个简单的交互式导航栏。当用户悬停在导航项上时，导航栏会有一个小球跟随移动，同时当前导航项会有活动状态的效果。
