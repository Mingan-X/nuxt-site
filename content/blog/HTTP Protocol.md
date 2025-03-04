---
date: 2023-01-20
title: HTTP协议|青训营笔记
---

这是我参与「第五届字节青训营」伴学笔记创作活动的第 5 天。

# HTTP 的概念及特点

## HTTP 的概念

超文本传输协议（Hypertext Transfer Protocol，HTTP），是一个基于请求与响应，无状态的，应用层的协议，常基于 TCP/IP 协议传输数据，互联网上应用最为广泛的一种网络协议,所有的 WWW 文件都必须遵守这个标准。HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范。

## HTTP 的特点

### 无状态

HTTP 协议是无状态的，HTTP 协议自身不对请求和响应之间的通信状态进行保存，任何两次请求之间都没有依赖关系。

### 简单快速

在用户向服务器请求服务时，只需传送请求方法和路径，不需要发送额外过多的数据。请求方法常用的有`GET`、`HEAD`、`PUT`、`DELETE`、`POST`。每种方法规定了客户与服务器联系的类型不同。并且由于 HTTP 协议结构较为简单，使得 HTTP 服务器的程序规模小，因此通信速度很快。

### 简单可扩展

HTTP 协议对数据对象并没有要求，允许传输任意类型的数据对象。

# 协议分析

## 发展历程

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf8ec384369c4e60b5de21fd4d5aef1e~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

**备注**：1997 年提出了 http/1.1，2015 年提出 http/2，在 16 年中 68%的请求都是 http2，目前已有 http3 的草案提出。

## 报文结构

### 请求报文

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b171afda9dd64b9eb346e4af2b059514~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

### 响应报文

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25d4cd5d78514ea487e1d7780a1dfa2c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

### Method

| Method  |                                                                 |
| ------- | --------------------------------------------------------------- |
| GET     | 请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据 |
| HEAD    | 请求一个与 GET 请求的响应相同的响应，但没有响应体。             |
| POST    | 将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用。  |
| PUT     | 用请求有效载荷替换目标资源的所有当前表示。                      |
| DELETE  | 删除指定的资源                                                  |
| CONNECT | 建立一个到由目标资源标识的服务器的隧道。                        |
| OPTIONS | 用于描述目标资源的通信选项。                                    |
| TRACE   | 沿着到目标资源的路径执行一个消息环回测试。                      |
| PATCH   | 用于对资源应用部分修改。                                        |

### 安全(Safe)

如果说一个 HTTP 方法是`安全`的，是指这是个不会修改服务器的数据的方法。也就是说，这是一个对服务器只读操作的方法。这些方法是安全的：`GET`，`HEAD`和  `OPTIONS`。所有安全的方法都是`幂等`的，但并非所有幂等方法都是安全的.

### 幂等(Idempotent)

同样的请求被执行一次与连续执行多次的效果是一样的，服务器的状态也是一样的。

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e61c2bb044ef430a925ed5e5b3937ee6~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

更多具体状态码详情可以参考[MDN|状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

### 常用请求头

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7240cabfc2ef4a298e29c43da6f89395~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

### 常用响应头

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e4d0ecd29f9481ab5498498ddf31757~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

### 缓存

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ddfba3b35334153a1348e4b4b28546b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

### 缓存流程

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab07b89e3a34416ba18403f8efa45d49~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

### cookie

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f932c877a54485682997b68346a0183~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

以上便是本次学习的内容。通过本次的课程对 http 协议的的概念，发展和报文结构有了一定的了解。
