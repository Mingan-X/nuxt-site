---
date: 2023-01-31
showTitle: Node.js|青训营笔记
---

这是我参与「第五届字节青训营」伴学笔记创作活动的第 6 天。

## 课程内容

1. Node.js 的应用场景
2. Node.js 运行时结构
3. 编写 Http Server

## Node.js 的应用场景

1. 前端工程化
2. web 服务端应用
3. Electron 跨端桌面应用

## Node.js 运行时结构

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28f200de43504260854d1c1e8ebcf982~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

### Node.js 特点

1. 异步 I/O
   <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/945354671509449e984c3ed06e5b34c8~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />
2. 单线程
   <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b662410a72d4b1eaab7d4fbfb7848cc~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />
3. 跨平台
   <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9579f81d60b34b64a415cf65fd38e553~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />

## 编写 Http Server

### Node.js 安装

- Mac,Linux 推荐使用 nvm。多版本管理
- Windows 推荐 nvm4w 或是官方安装包

### 编写 Http Server

1. Hello World

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb9eeca7168e4de39db704b7ed1c99a3~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />

2. JSON

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f6fa480bc084722bdc9a67732a94a82~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />

### 编写 Http Client

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a72bf186a74d4b488d2574d55b31090a~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />

### 编写静态文件服务

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94d38769f4074dc9b03ac9c45191e43c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="70%" />

相较于高性能且可靠的服务还差：1.CDN：缓存+加速 2.分布式储存、容灾。

### SSR(server side rendering)

#### SSR 特点

- 相比传统 HTML 模板引擎：避免重复写代码
- 相比 SPA(single page application):首屏渲染更快，SEO 友好

##### 缺点

通常 qps 较低，前端代码编写时需要考虑服务端渲染情况

#### SSR 难点

1. 需要处理打包工具
2. 需要思考前端代码在服务端运行时的逻辑
3. 移除对服务端毫无意义的副作用，或重置环境

### Debug

- V8 Inspector:开箱即用、特性丰富强大、与前端开发一致、跨平台
  - node --inspect
  - open http://localhost:9229/json
- 场景
  - 查看 console.log 内容
  - breakpoint
  - 高 CPU、死循环：cpuprofile
  - 高内存占用：heapsnapshot
  - 性能分析

### 部署

#### 要解决的问题

- 守护进程：当进程退出时，重新拉起
- 多进程：cluster 便捷地利用多进程
- 记录进程状态，用于诊断

#### 容器环境

通常用健康检查的手段，只需考虑多核 cpu 利用率即可。

## 个人小结

通过本次课程的学习，对 Node.js 的优缺点、应用场景以及运行时的结构有了一定认识，对如何用其来编写 Http Server 有了一定的了解。
