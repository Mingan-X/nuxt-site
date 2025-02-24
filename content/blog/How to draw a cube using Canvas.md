---
date: 2023-05-04
showTitle: 如何使用Canvas绘制一个立方体
---

# 前言

随着 Web 技术的不断发展，Canvas 作为 HTML5 中的一项重要特性，被广泛应用于图形和动画的绘制。本文将介绍如何使用 Canvas 绘制一个立方体，并通过旋转动画来展示其三维效果。
[jcode](https://code.juejin.cn/pen/7229320099902160896)

### 1. HTML 结构

首先，我们需要在 HTML 中添加一个 Canvas 元素，并设置其宽度和高度：

```
<canvas id="myCanvas"></canvas>
```

### 2. CSS 样式

为了让 Canvas 元素居中显示，并且在不同设备上保持一致的显示效果，我们可以使用 CSS 样式来设置 Canvas 元素的样式：

```
#myCanvas {
    width: 800px;
    height: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
}
@media screen and (max-width: 600px) {
    #myCanvas {
        width: 300px;
        height: 300px;
    }
}
```

### 3. JavaScript 代码

接下来，我们需要使用 JavaScript 代码来实现立方体的绘制和旋转动画。

首先，我们定义立方体的顶点坐标和面：

```
// 定义立方体的顶点坐标
var vertices = [
    [-50, -50, -50],
    [-50, -50, 50],
    [-50, 50, -50],
    [-50, 50, 50],
    [50, -50, -50],
    [50, -50, 50],
    [50, 50, -50],
    [50, 50, 50]
];

// 定义立方体的面
var faces = [
    { points: [0, 1, 3, 2], color: "#FF0000" },
    { points: [4, 5, 7, 6], color: "#00FF00" },
    { points: [0, 1, 5, 4], color: "#0000FF" },
    { points: [2, 3, 7, 6], color: "#FFFF00" },
    { points: [0, 2, 6, 4], color: "#FF00FF" },
    { points: [1, 3, 7, 5], color: "#00FFFF" }
];
```

其中，vertices 数组定义了立方体的 8 个顶点坐标，faces 数组定义了立方体的 6 个面，每个面由 4 个顶点组成，以及该面的颜色。

接下来，我们定义绘制函数 draw()和投影函数 project()：

```
// 定义绘制函数
function draw() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置立方体的中心点
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    // 遍历每个面
    for (var i = 0; i < faces.length; i++) {
        var face = faces[i];
        var point1 = project(vertices[face.points[0]]);
        var point2 = project(vertices[face.points[1]]);
        var point3 = project(vertices[face.points[2]]);
        var point4 = project(vertices[face.points[3]]);

        // 设置填充色
        ctx.fillStyle = face.color;

        // 绘制面
        ctx.beginPath();
        ctx.moveTo(point1[0] + centerX, point1[1] + centerY);
        ctx.lineTo(point2[0] + centerX, point2[1] + centerY);
        ctx.lineTo(point3[0] + centerX, point3[1] + centerY);
        ctx.lineTo(point4[0] + centerX, point4[1] + centerY);
        ctx.closePath();
        ctx.fill();
    }
}

// 定义投影函数
function project(vertex) {
    // 计算旋转后的坐标
    var x = vertex[0];
    var y = vertex[1];
    var z = vertex[2];
    var cosX = Math.cos(angleX);
    var sinX = Math.sin(angleX);
    var cosY = Math.cos(angleY);
    var sinY = Math.sin(angleY);
    var x1 = x * cosY * cosX - y * sinX + z * cosX * sinY;
    var y1 = x * cosY * sinX + y * cosX + z * sinX * sinY;
    var z1 = -x * sinY + z * cosY;

    // 计算投影后的坐标
    var scale = 200 / (200 - z1);
    var x2 = x1 * scale;
    var y2 = y1 * scale;

    return [x2, y2];
}
```

其中，draw()函数遍历每个面，在 Canvas 上绘制出立方体。project()函数用于将立方体的三维坐标投影到 Canvas 的二维坐标系中，并返回投影后的坐标。

最后，我们定义动画函数 animate()，来实现立方体的旋转动画：

```
// 定义动画函数
function animate(timestamp) {
    // 如果是第一次调用，初始化lastTime
    if (!lastTime) {
        lastTime = timestamp;
    }

    // 计算时间间隔
    var deltaTime = timestamp - lastTime;

    // 更新旋转角度
    angleX += deltaTime / 1000;
    angleY += deltaTime / 1000;

    // 绘制立方体
    draw();

    // 更新lastTime
    lastTime = timestamp;

    // 循环动画
    requestAnimationFrame(animate);
}

// 开始动画
requestAnimationFrame(animate);
```

在 animate()函数中，我们使用 requestAnimationFrame()函数来循环调用 animate()函数，实现立方体的旋转动画。其中，deltaTime 表示上一次调用 animate()函数和这一次调用之间的时间间隔，angleX 和 angleY 表示立方体绕 X 轴和 Y 轴的旋转角度。

### 4. 结语

通过以上代码，我们实现了一个简单的 Canvas 立方体，并通过旋转动画展示了其三维效果。当然，这只是一个简单的例子，我们可以通过修改代码来实现更加复杂的三维图形和动画效果。希望这篇文章能够帮助大家更好地理解 Canvas 的使用方法，以及如何在 Web 中创建出更加生动、有趣的图形和动画。
