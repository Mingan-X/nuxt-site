---
date: 2023-04-17
showTitle: JS验证码校验
---

# 前言

平常大家不论是娱乐还是工作应该都或多或少会遇到验证码校验，今天就来聊聊怎么实现一个简单的验证码验证功能。

### 验证界面

首先将 css 文件与 js 文件引入

```js
<link rel="stylesheet" href="index.css">

<script src="index.js"></script>
```

页面代码：

```js
<h1>验证码验证功能</h1>
<p>请输入下面的验证码：</p>
<input type="text" id="input_code">
<button onclick="validate()">验证</button>
<div class="codeBox">
    <div id="code"></div>
    <button class="change" onclick="showCode()">换一张</button>
</div>
```

页面布局为四部分，标题，提示，验证框，验证按钮，与验证码显示容器，其中容器内包含验证码显示区，与刷新验证码按钮。

接下来为页面编写 css 代码，显示一个具有简单样式的页面：

```js
.codeBox {
    display: flex;
    margin-top: 10px;
    width: 160px;
    justify-content: space-between;
    align-items: center;
}
/* 设置验证码框的样式 */
#code {
    font-size: 20px;
    width: 100px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    color: rgb(68, 182, 144);
    background-color: rgb(117, 131, 144);
}
.change {
    border-style: none;
    background-color: rgb(204, 204, 204, 0.2);
    color: rgb(9, 117, 117);
    height: 40px;
    line-height: 40px;
}
```

验证码容器采用弹性布局，使其内容居中，`justify-content: space-between` 子元素靠边对齐平均分剩余的空间，再对验证码码和按钮各自定义字体颜色，背景色。此时界面如下：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/224fba5713de4986a411b1e5f9437be7~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

可以看到此时，已经有了基本的样式，css 就此打住，因为此次的核心在 js 部分，接下来为该实例添加功能函数。

### 功能函数

生成随机验证码：

```js
function generateCode(length = 6) {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (var i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
```

首先我们定义了一个字符串在函数内，并定义了一个`code`变量用来保存最后要输出的验证码，通过`Math.floor(Math.random() * chars.length)` 产生一个随机整数，在截取字符串内指定元素，与`code`的值进行拼接，最后就得到一个指定长度验证码。  
对于 `generateCode(length=6)`，如果函数没有传入参数，则参数`length`默认值为 6，否则为自己输入的值。

显示验证码：

```js
function showCode() {
  var code = generateCode();
  var code_box = document.getElementById("code");
  code_box.innerHTML = code;
}
```

获取此时生成的验证码，再通过 js 的 DOM 操作将该字符串写到指定结点上。

验证验证码：

```js
function validate() {
  var input_code = document.getElementById("input_code").value;
  var actual_code = document.getElementById("code").innerHTML;
  if (input_code == actual_code) {
    alert("验证成功！");
    showCode();
  } else {
    alert("验证失败，请重新输入！");
    showCode();
  }
}
```

同理当点击验证按钮时将通过 js 的 DOM 操作获取指定`id`元素的值，将其与当前验证码显示值进行比较，相等则弹出成功信息，失败则提示失败，无论验证成功与否验证码皆会刷新，通过`showCode()`生成新的验证码，更换验证码码按钮执行函数同样为该函数。
**注意** 最后还要添加一下代码:

```js
window.onload = function () {
  showCode();
};
```

因为当验证页面加载完成时就应当显示验证码，而不是需要用户手动去点击才会实现，可以算一个小小的提升用户体验吧 2。

# 结语

以上便是全部内容了，总体来说，这只是提供了一个简单的案例和思路，所以代码比较简单，喜欢的小伙伴可以根据个人喜好和需求进行自己的扩展。
