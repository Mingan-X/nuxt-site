---
date: 2023-04-26
showTitle: 简约的登录界面
---

# 前言

今天我们来一起学习如何制作一个登录页面，让用户可以方便地登录我们的网站。我们将使用 HTML、CSS 和 JavaScript 来完成这个任务。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1aa95c97f7ca4119b84794ce589b6e0e~tplv-k3u1fbpfcp-watermark.image?" alt="1682522064531 -original-original.gif" width="100%" />

### 基本结构

首先，我们需要创建一个 HTML 文件，里面包含一个表单，让用户输入用户名和密码。

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="login-box">
      <div class="openleft"></div>
      <div class="openright"></div>
      <h2>欢迎登录</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="">
          <label>用户名</label>
        </div>
        <div class="user-box">
          <input type="password" name="" required="">
          <label>密码</label>
        </div>
        <a href="#" class="login-btn">提交</a>
        <a href="#" class="register-link">注册</a>
      </form>
    </div>
    <script src="./index.js"></script>
  </body>
</html>
```

首先新建了一个登录注册表单,`openleft`和`openright`是左右上角的图片类名`user-box`定义了容纳两个输入框及标签的容器。

接下来对表单进行样式定义：

```js
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: #f1f1f1;
  }

  .login-box {
    position: relative;
    max-width: 400px;
    height: 400px;
    margin: 100px auto;
    background: #fff;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
  }
```

`*`选择器用于选择所有元素,并设置它们的外边距、内边距和盒模型用来简单重置一下样式。`.login-box`类选择器用于设置登录框的样式,设置为绝对定位，最大宽度为 400px,通过`margin: 100px auto`使其在页面水平居中，同时对其添加了内边距与阴影，设置圆角为 5px 是四角稍微圆滑。

接下来对左右两张图片进行定义：

```js
  .login-box .openleft {
    width: 120px;
    height: 90px;
    top: 0;
    left: 0;
    position: absolute;
    background-image: url(./images/22_open.4ea5f239.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
  .login-box .closeleft {
    width: 120px;
    height: 90px;
    top: 0;
    left: 0;
    position: absolute;
    background-image: url(./images/22_close.9382a5a8.png);
    background-size: contain;
    background-repeat: no-repeat;
  }

  .login-box .openright {
    width: 120px;
    height: 90px;
    top: 0;
    right: -28px;
    position: absolute;
    background-image: url(./images/33_open.f7d7f655.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
  .login-box .closeright {
    width: 120px;
    height: 90px;
    top: 0;
    right: -28px;
    position: absolute;
    background-image: url(./images/33_close.a8c18fc8.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
```

`.login-box .openleft`类选择器用于设置左侧小图标的样式,包括位置、大小和背景图片等。`.login-box .closeleft`类选择器用于设置左侧小图标的样式,包括位置、大小和背景图片使其居于左上角。`.login-box .openright` 类选择器用于设置当密码输入框聚焦时右侧小图标的样式,样式与左边图片类似，不过是居右上角。`.login-box .closeright` 类选择器用于设置当密码输入框聚焦时右侧小图标的样式,包括位置、大小和背景图片等,以上都采用绝对定位进行背景图片位置的设置，同时背景图片按比例缩放,不重复。

对于表单样式：

```js
  .login-box h2 {
    text-align: center;
    margin-bottom: 30px;
  }

  .user-box {
    position: relative;
    margin-bottom: 20px;
  }

  .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #999;
    outline: none;
  }

  .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #999;
    pointer-events: none;
    transition: 0.5s;
  }

  .user-box input:focus ~ label,
  .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #1abc9c;
    font-size: 12px;
  }

  a {
    display: inline-block;
    background: #1abc9c;
    color: #fff;
    padding: 10px 20px;
    margin-top: 20px;
    border-radius: 25px;
    text-decoration: none;
    transition: 0.5s;
  }

  a:hover {
    background: #bbd3ce;
    color: #1abc9c;
  }

  .login-btn {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #342d2d;
  }

  .login-btn:hover {
    color: #1abc9c;
  }

  .register-link {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #342d2d;
  }

  .register-link:hover {
    color: #1abc9c;
  }
```

`.login-box h2`设置登录框标题的样式，包括文字居中和下方边距等。`.user-box`类选择器采用相对定位用于设置用户名和密码输入框的样式。`.user-box input`选择器设置输入框的样式，包括宽度、内边距、字体大小、边框和外边框等。`.user-box label`选择器用于采用绝对定位设置标签的样式使其在输入框内,当鼠标聚焦输入框时通过绝对定位调整位置向上偏移，同时改变字体颜色大小等。`.user-box input:focus ~ label`和`.user-box input:valid ~ label`选择器用于设置输入框获得焦点或输入有效内容时,标签的位置、颜色和字体大小,`a:hover`选择器用于设置鼠标悬停在链接上时的样式，包括背景颜色和字体颜色等。`.login-btn`类选择器用于设置提交按钮的样式，包括显示为块级元素、文本居中、上方外边距和字体颜色等。`.login-btn:hover`类选择器用于设置鼠标悬停在登录按钮上时的字体颜色。`.register-link`与`.register-link:hover`类选择器与登录的样式相同。

### JS 部分

```js
const passwordInput = document.querySelector('input[type="password"]');
let openleft = document.querySelector(".openleft");
let openright = document.querySelector(".openright");

passwordInput.addEventListener("focus", function () {
  openleft.classList.remove("openleft");
  openleft.classList.add("closeleft");
  openright.classList.remove("openright");
  openright.classList.add("closeright");
});

passwordInput.addEventListener("blur", function () {
  openleft.classList.add("openleft");
  openleft.classList.remove("closeleft");
  openright.classList.add("openright");
  openright.classList.remove("closeright");
});
```

js 代码比较简单,只需监听密码输入框的聚焦事件,当密码输入框聚焦时,删除`.openleft`和`.openright`类同时添加`closeleft`和`closeright`类名,两者类名的内容相同,只需将背景图片更换即可。

# 结语

以上便是一个简约的登录注册小界面,总体来说代码较简单比较容易接受,界面看着也比较舒服,好了,以上便是全部代码喽。
