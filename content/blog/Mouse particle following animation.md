---
date: 2023-04-28
showTitle: 鼠标粒子跟随动画
---

# 前言

本文将详细介绍如何使用 JavaScript 和 Canvas 实现一个简单的粒子动画效果。在实现粒子动画效果之前,我们需要了解一些基本的概念。粒子动画效果,本质上是通过一组粒子的运动来实现的。每个粒子都有自己的位置、速度、加速度、颜色、大小和寿命等属性。在动画过程中,每个粒子的状态都会不断地更新,通过 Canvas 绘图 API 将粒子绘制到画布上,从而实现整个动画效果。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2e35ca0822c476aac685d1865ea62ae~tplv-k3u1fbpfcp-watermark.image?" alt="1682694903296 -original-original.gif" width="100%" />

### 基本架构

定义一个画布元素,并对画布及 body 样式初定义。

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>鼠标粒子跟随动画</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
</body>
</html>
```

### 功能实现

**1. 获取 canvas 元素和上下文**

在 JavaScript 中,我们可以使用 document.getElementById 方法获取指定 ID 的元素,然后使用该元素的 getContext 方法获取画布的上下文对象。在本例中,我们获取了 ID 为 canvas 的元素,并使用 2D 上下文进行绘图。

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```

接下来,我们需要设置画布的宽高,使其与浏览器窗口大小相同。

```js
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

**2. 创建粒子类**

我们创建了一个名为 Particle 的类,用于表示每个粒子的状态。在该类中,我们定义了粒子的位置、速度、加速度、颜色、大小和寿命等属性。同时,我们还实现了一个 draw 方法,用于将粒子绘制到画布上。

```js
class Particle {
  constructor(x, y) {
    // 粒子的位置和速度
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    // 粒子的加速度
    this.ax = 0;
    this.ay = 0;
    // 粒子的颜色、大小和寿命
    this.color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${Math.random()})`;
    this.size = 4;
    this.life = 300;
  }

  // 绘制粒子
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
```

在该类中,我们使用了 Math.random 方法生成了随机的位置、速度、加速度、颜色、大小和寿命等属性。在 draw 方法中,我们使用了 Canvas 绘图 API 中的 arc 方法绘制了一个圆形,该圆形的位置和大小等属性都是由粒子的属性决定的。

**3. 创建粒子集合类**

我们创建了一个名为 ParticleCollection 的类,用于管理多个粒子的状态。在该类中,我们定义了一个 particles 数组,用于存储所有的粒子对象。同时,我们还定义了一个 maxParticles 属性,用于限制粒子的数量。在该类中,我们实现了三个方法：

createParticles：用于创建新的粒子对象,并将其加入到 particles 数组中。如果 particles 数组中的粒子数量超过了 maxParticles 属性的限制,我们将删除最早创建的粒子对象。

updateParticles：用于更新所有粒子对象的状态。在该方法中,我们根据粒子的加速度更新其速度和位置,并减少其寿命。如果粒子的寿命为 0,我们将从 particles 数组中删除该粒子对象。

drawParticles：用于将所有粒子对象绘制到画布上。在该方法中,我们遍历 particles 数组,依次调用每个粒子对象的 draw 方法。

```js
class ParticleCollection {
  constructor() {
    // 粒子数组和最大粒子数
    this.particles = [];
    this.maxParticles = 300;
  }

  // 创建粒子
  createParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
      // 如果粒子数量超过最大值，则删除最早创建的粒子
      if (this.particles.length >= this.maxParticles) {
        this.particles.shift();
      }
      // 创建新的粒子并加入数组中
      const particle = new Particle(x, y);
      this.particles.push(particle);
      // 3秒后删除该粒子
      setTimeout(() => {
        const index = this.particles.indexOf(particle);
        if (index !== -1) {
          this.particles.splice(index, 1);
        }
      }, 3000);
    }
  }

  // 更新粒子状态
  updateParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      // 根据粒子的加速度更新速度和位置
      particle.vx += particle.ax;
      particle.vy += particle.ay;
      particle.x += particle.vx;
      particle.y += particle.vy;
      // 减少粒子寿命
      particle.life -= 1;
      // 如果粒子寿命为0，则从数组中删除
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
        i--;
      }
    }
  }

  // 绘制粒子
  drawParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.draw();
    }
  }
}
```

在该类中，我们使用了 setTimeout 方法,用于在粒子的寿命结束后将其从 particles 数组中删除。在 updateParticles 方法中,我们使用了一个 for 循环遍历 particles 数组,依次更新每个粒子对象的状态。在 drawParticles 方法中,我们同样使用了一个 for 循环遍历 particles 数组,依次绘制每个粒子对象。

**4. 监听鼠标移动事件，创建粒子**

我们使用 addEventListener 方法监听了鼠标移动事件。在事件回调函数中,我们调用了 ParticleCollection 类的 createParticles 方法,用于创建新的粒子对象。在本例中,我们设置了每次创建 5 个粒子对象,并将粒子对象的位置设置为鼠标当前位置。

```js
canvas.addEventListener("mousemove", (e) => {
  particleCollection.createParticles(e.clientX, e.clientY, 5);
});
```

**5. 循环更新并绘制粒子**

我们使用了一个名为 loop 的函数,用于不断地更新和绘制粒子对象。在该函数中,我们先清空画布,然后依次调用 ParticleCollection 类的 updateParticles 和 drawParticles 方法,更新和绘制所有粒子对象。最后,我们使用 requestAnimationFrame 方法循环调用 loop 函数,从而实现动画效果。

```js
function loop() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particleCollection.updateParticles();
  particleCollection.drawParticles();

  requestAnimationFrame(loop);
}

loop();
```

# 结语

通过以上操作,我们就可以使用 JavaScript 和 Canvas 实现一个简单的粒子动画效果。
