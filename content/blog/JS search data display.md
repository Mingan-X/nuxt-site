---
date: 2023-04-18
title: JS搜索数据展示
---

# 前言

搜索功能相信大家都不陌生，我们几乎每天都在使用搜索功能，每当我们需要获取一些信息时，都习惯网上搜索检索我们所需的信息，而当我们输入信息时就会出现一些相似信息的展示，今天就用 js 来实现一个搜索数据展示的小案例。

### 页面布局

```js
<div class="content">
    <div class="box">
        <input type="text" id="val" placeholder="请输入课程">
        <button id="sub">提交</button>
        <ul class="show" id="showList"></ul>
    </div>
</div>
```

效果：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d26e03d568c64c689d37d791181d52fa~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%">

没错，不用怀疑你所看到的，这界面就是这么滴朴实无华，只有一个输入框，一个提交按钮(摆设一件)。其中还隐藏着一个`ul`列表，相信你也猜到它的位置在哪了，接下来就让我们看看 css 部分吧！

### 样式

```js
* {
    margin: 0;
    padding: 0;
}
.content {
    display: flex;
    justify-content: center;
    width: 100%;
}
.box {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 40px;
}

input, button {
    box-sizing: border-box;
    line-height: 20px;
    outline: none;
}
input {
    width: 200px;
}
button {
    width: 40px;
}

.show {
    width: 200px;
    position: absolute;
    display: none;
    box-sizing: border-box;
    list-style: none;
    top: 32px;
    left: 80px;
    border-radius: 0 0 3px 3px;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, .2);
    padding: 3px 0;
    font-size: 10px;
    background: white;
}
```

如你所见，对整体采用了弹性布局，使得容纳几个小控件的容器`box`页面水平居中，对于 box 容器，给定宽高，使用弹性布局并且采用相对定位以便于接下来数据展示列表的定位，同时对于输入框和按钮定制了专属于它们的宽度，并且将它们的轮廓线清除了。对于数据展示列表，为其位置做了调整使其在我们需要的位置，并给它添加了阴影。哦，对了最初时该列表隐藏。接下来就是核心部分，js 啦。

### js 代码

```js
let arr = [
  "web前端",
  "HTML技术",
  "http知识",
  "JavaScript核心",
  "JavaScript高级",
  "JavaScript初级",
  "Vue核心",
  "Vue基础",
];

let input = document.getElementById("val");
let show = document.getElementById("showList");
input.onkeyup = function () {
  show.style.display = "block";
  if (input.value === "") {
    show.style.display = "none";
  }
  let str = "";
  arr.forEach((item) => {
    let res = item.indexOf(input.value);
    if (res !== -1 && input.value !== "") {
      str += "<li>" + item + "</li>";
    }
  });
  if (!input.value || !str) {
    show.innerHTML = "<li>未查询到相应结果</li>";
  } else {
    show.innerHTML = str;
  }
};
input.onblur = function () {
  show.style.display = "none";
};
```

首先对了一个假的数组数据，通过 js 获取我们将要进行操作的结点元素：输入框与数据展示列表，当我们进行数据输入时，此时通过`show.style.display = 'block'`将列表展示出来，此时`arr.forEach`遍历数组如果输入的数据在遍历的数组元素中就将该元素拼接到 str 这个字符串中最后通过` show.innerHTML = str`写入数据查询列表展示出来，否则显示未查询到相关结果，另外当删除输入值导致输入框为空或者输入框失去焦点时，展示列表将会隐藏。效果如图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31641e7b68284f49b627436bc385d22f~tplv-k3u1fbpfcp-watermark.image?)

# 结语

以上便是一个简单的搜索数据展示案例了，虽然还有很多瑕疵还没有修改，但大致的意思还是可以表达出来了，需要的小伙伴可以自行进行优化哈。
