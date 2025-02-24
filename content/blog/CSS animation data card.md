---
date: 2023-04-29
showTitle: css动画资料卡片
---

# 前言

动画资料卡片是一种常见的网页元素，可以用于展示各种不同的信息，例如人物介绍、产品特点、事件概览等。本文将结合相应的 HTML 和 CSS 代码，创建一个具有交互性和动画效果的动画资料卡片。

### HTML

首先，我们需要编写 HTML 代码，以便为卡片和其内容提供必要的结构和元素。以下是我们的 HTML 代码：

```js
<div class="card">
  <div class="imgBox">
    <img src="https://img2.huashi6.com/images/resource/thumbnail/2022/01/14/4113_7388320628.jpg?imageMogr2/quality/75/interlace/1/thumbnail/700x/gravity/North/crop/700x816/format/jpeg" alt="">
  </div>
  <div class="content">
    <div class="details">
      <h2>三月七<br/><p>冰系</p></h2>
      <div class="data">
        <h3>命途<br/><sub>存护</sub></h3>
        <h3>派系<br/><sub>无名客</sub></h3>
        <h3>所属<br/><sub>星穹列车</sub></h3>
      </div>
      <div class="actionBtn">
        <button>Follow</button>
        <button>Message</button>
      </div>
    </div>
  </div>
</div>
```

在上面的代码中，我们使用了一个`div`元素来创建一个名为“card”的容器，该容器包含两个子元素：一个名为“imgBox”的容器和一个名为“content”的容器。其中，“imgBox”容器用于显示卡片的图片，而“content”容器用于显示卡片的详细信息，包括标题、数据和操作按钮。

### CSS

接下来，我们需要编写 CSS 代码来为我们的卡片和其内容添加样式。以下是我们的 CSS 代码：

```js
/* 重置所有元素的外边距和内边距，将盒模型设置为border-box */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

在上面的代码中，我们使用了通配符选择器\*来为页面中的所有元素设置相同的样式。我们将所有元素的外边距和内边距设置为 0，并将盒模型设置为 border-box，以确保元素的宽度和高度包括其边框和内边距。

接下来，我们将为卡片和其内容添加具体的样式：

```js
/* 设置整个页面为一个flex容器，居中对齐和垂直对齐 */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(45deg,#fbda61,#ff5acd);
}

/* 设置卡片的基本样式 */
.card {
  position: relative;
  width: 350px;
  height: 200px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
  transition: 0.5s;
}

/* 当鼠标悬停在卡片上时，卡片高度会发生变化 */
.card:hover {
  height: 450px;
}

/* 设置图片框的基本样式 */
.imgBox {
  position: absolute;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  transition: 0.5s;
}

/* 当鼠标悬停在卡片上时，图片框的宽度和高度会发生变化 */
.card:hover .imgBox {
  width: 250px;
  height: 250px;
}

/* 设置图片的基本样式 */
.imgBox img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 设置卡片内容的基本样式 */
.card .content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

/* 设置卡片内容的详细信息 */
.card .content .details {
  padding: 40px;
  text-align: center;
  width: 100%;
  transition: 0.5s;
  transform: translateY(150px);
}

/* 当鼠标悬停在卡片上时，卡片内容会发生变化 */
.card:hover .content .details {
  transform: translateY(0px);
}

/* 设置卡片内容中标题的样式 */
.card .content .details h2 {
  font-size: 1.25em;
  font-weight: 600;
  color: #555;
  line-height: 1.2em;
}

/* 设置卡片内容中标题下的小段落的样式 */
.card .content .details h2 p {
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.5;
}

/* 设置卡片内容中详细信息的样式 */
.card .content .details .data {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

/* 设置卡片内容中详细信息中每个小标题的样式 */
.card .content .details .data h3 {
  width: 80px;
  padding: 0 auto;
  font-size: 1em;
  color: #555;
  line-height: 1.2em;
  font-weight: 600;
}

/* 设置卡片内容中详细信息中每个小标题下的小字体的样式 */
.card .content .details .data h3 sub {
  font-size: 0.85em;
  font-weight: 400;
  opacity: 0.5;
}

/* 设置卡片内容中操作按钮的样式 */
.card .content .details .actionBtn {
  display: flex;
  justify-content: space-between;
}

/* 设置卡片内容中操作按钮的样式 */
.card .content .details .actionBtn button {
  width: 120px;
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  outline-style: none;
  font-size: 1em;
  font-weight: 500;
  background: #ff5acd;
  color: #fff;
  cursor: pointer;
}
```

上面的代码中，我们首先为整个页面设置了一个 flex 容器，并将其居中对齐和垂直对齐。然后，我们为卡片和其内容添加了相应的样式。我们将卡片的宽度和高度设置为 350px 和 200px，并将其背景设置为白色，边框半径设置为 20px，阴影设置为 0 35px 80px rgba(0, 0, 0, 0.15)。我们还为卡片添加了过渡效果，当鼠标悬停在卡片上时，卡片的高度会发生变化。

接下来对图片框和卡片内容添加了相应的样式。我们将图片框的位置设置为相对于卡片的绝对定位，并将其位置设置为居中对齐和垂直对齐。我们还将图片框的宽度和高度设置为 150px，并将其背景设置为白色，边框半径设置为 20px，阴影设置为 0 15px 50px rgba(0, 0, 0, 0.35)。我们还为图片框添加了过渡效果，当鼠标悬停在卡片上时，图片框的宽度和高度会发生变化。

再为卡片内容添加了相应的样式。我们将其位置设置为相对于卡片的绝对定位，并将其高度设置为 100%。我们还将其内部元素的位置设置为居中对齐和垂直对齐，并将其 overflow 属性设置为 hidden，以便在动画过程中隐藏卡片内容的部分。我们还为卡片内容添加了过渡效果，当鼠标悬停在卡片上时，卡片内容会发生变化。

最后，我们为卡片内容中的标题、数据和操作按钮添加了相应的样式。我们将标题的字体大小设置为 1.25em，并将其字体加粗。我们还将小段落的字体大小设置为 0.75em，并将其不透明度设置为 0.5。我们将数据的位置设置为居中对齐，并将每个小标题的宽度设置为 80px。我们还将操作按钮的宽度设置为 120px，并将其背景颜色设置为#ff5acd。

# 结语

以上便完成了一个简单的动画资料卡片，上面便是全部代码哦。
