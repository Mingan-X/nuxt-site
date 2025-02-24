---
date: 2023-01-19
showTitle: TypeScript入门(1)|青训营笔记
---

这是我参与「第五届字节青训营」伴学笔记创作活动的第 4 天。

# 课程内容

1.TypeScript 历史及定义解析  
2.TypeScript 优势解读  
3.基本语法

# TypeScript 发展历史

1. 2012-10: 微软发布了 TypeScript 第一个版本(0.8)
2. 2014-10: Angular 发布了基于 TypeScript 的 2.0 版本
3. 2015-04: 微软发布了 Visual Studio Code
4. 2016-05: @types/react 发布，TypeScript 可开发 React
5. 2020-09: Vue 发布了 3.0 版本，官方支持 TypeScript
6. 2021-11: v4.5 版本发布

# TypeScript 定义

TypeScript 源于 JavaScript，JavaScript 是动态类型的语言，TypeScript 是静态类型的语言，但两者都是弱类型语言。动态类型是在执行阶段才能确定一个类型的匹配，而静态类型语言则会在执行前去完成这件事情。

# TypeScript 优势

## 静态类型

1. 可读性增强：基于语法解析 TSDoc，ide 增强
2. 可维护性增强：在编译阶段暴露大部分错误 => 多人合作的大型项目中，获得更好的稳定性和开发效率

## JS 的超集

1. 包含于兼容所有 JS 特性，支持共存
2. 支持渐进式引入与升级

# TypeScript 基本语法

## 基础数据类型

JavaScript 语法：

```js
// 字符串
const q = "string";
// 数字
const w = 1;
// 布尔值
const e = true;
// null
const r = null;
// undefined
const t = undefined;
```

TypeScript 语法：

```js
// 字符串
const q: string = "string";
// 数字
const w: number = 1;
// 布尔值
const e: boolean = true;
// null
const r: null = null;
// undefined
const t: undefined = undefined;
```

可以看到 TS 类型定义是在变量后+：变量类型。

## 对象数据类型

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d8a00412e024e3db0e2225cae350c22~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd61ba7b143a406aab3b87555b781951~tplv-k3u1fbpfcp-watermark.image?" alt="image (1).png" width="100%" />

自定义类型一般首字母大写，表示这是一个类型，通过 interface 关键字来定义。类似于对象的定义方式，采用 key-value 来定义，其中通过关键字 readonly 设置只读属性，后续无法更改；?:表示该属性为可选属性，该属性可有可无，其余一般为必选类型；any 表示任意属性。

## 函数类型

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98e9c715476b4fd4ae33fca5b2197c33~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

函数类型()内为参数类型，()外紧接着的为函数输出值类型。

## 数组类型

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83930a9c4f324d9b95f36f0c0b8090a2~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

## 补充类型

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11b52f4c353c43f8b67439d4d3004eed~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

## 泛型

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6b10aaca3d04508bdd1264bbe751d9b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a65b10d89d2416f8abf646cd24fea63~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20897e6abd8d4445a9ed7fe5a5eb2c32~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

## 类型别名&类型断言

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6aed133a4dd34fbdae9c675a76e87adf~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />

## 字符串/数字 字面量

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e33b75978815432b807ddfe2629692ec~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%" />
以上便是本次学习的一部分学习内容及笔记，后面还有高级类型等。
