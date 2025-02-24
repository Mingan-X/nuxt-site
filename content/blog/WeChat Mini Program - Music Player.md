---
date: 2023-04-05
showTitle: 微信小程序-音乐播放器
---

# 前言

本文主要通过微信小程序的媒体 API 来实现一个简单的音乐播放器，主要实现的功能有音乐的切换、单曲循环、播放进度条的拖拽、播放与暂停和自定义音乐列表弹窗功能。

## 效果图

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85621a02c23b4749acd5df3ab3fa38ff~tplv-k3u1fbpfcp-watermark.image?" alt="musicVideo.gif"/>

## 主要目录文件

```
|--images
|--pages
|  |--index  #页面
|  |  |--index.js
|  |  |--index.json
|  |  |--index.wxml
|  |  |--index.wxss
|--static
|  |--font
|  |  |--iconfont.wxss
|--app.js
|--app.json
|--app.wxss
```

以上主要列举了一些在编写本项目页面时编辑或可能会进行编辑的文件，其中所有页面文件都放在`page`目录下，`static`放置的是外部引入的静态资源。`app.js`、`app.json`、`app.wxss`是全局文件。  
`app.json`是对整个小程序的全局配置。我们可以在这个文件中配置小程序是由哪些页面组成，配置小程序的窗口颜色，配置导航条样式，配置默认标题以及默认首页等等 。  
**注意:** `app.json`文件中不支持注释，否则会报错。  
`app.wxss`定义整个小程序的公共样式，所有页面都可使用。  
`app.js`为项目入口文件掌控整个小程序的生命周期，同时有一些全局的属性、变量也存放在这个文件中。

## 准备工作

### 1. iconfont 图标字体库

这里我使用的是 CDN 导入图标字体库，首先在阿里巴巴字体库找到自己所需的图标，将其添加到自己新建的项目中导入到本地项目中。具体操作如下：  
**新建项目**
在阿里巴巴图标库界面，点击`资源管理`，进入到`我的项目`中新建项目。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9d34e5ff9f44e89911d4e6d6b7f81bc~tplv-k3u1fbpfcp-watermark.image?)
**将选中图标添加到项目**  
首先将自己选中的图标添加入购物车，再点击购物车选择`添加到至项目`
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07d0a7dd19e04565be8ff5cb894d0121~tplv-k3u1fbpfcp-watermark.image?)
**复制代码，引入使用**
在如下界面可以看到一个链接，点击后将显示页面的代码复制到微信小程序中自己新建的 iconont.wxss 文件中(不统一，这是我个人所建文件名)，最后在`app.wxss`文件中引用一下--`@import "static/font/iconfont.wxss"`路径为你自己创建文件的路径.
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f07230cbcf641cf9ebcc11760c373a5~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0f02de6a1494bc5a942fa7699f15d65~tplv-k3u1fbpfcp-watermark.image?)

小程序引入字体库的方式不局限于这一种，根据个人喜好和需求来即可，此处仅为作者个人使用方法。

### 2. 音乐数据准备

首先，因为此项目主要为音乐播放器的实现，所以作者个人并没有采用请求数据的方式获取音乐资源，作者是通过这以下 api 来获取网易音乐(不知是否是官方的)，只需将所需音乐其中的`x`替换为自己所需音乐`id`即可获取该音乐链接，**注意：** vip 音乐无效，更多音乐内容可以取用[网易云音乐开源 API](https://github.com/Binaryify/NeteaseCloudMusicApi)

```js
http://music.163.com/song/media/outer/url?id=xxxxxxx.mp3
```

# 实现代码

## 页面部分

### 页面标题

`index.json`文件

```js
{
  "usingComponents": {},
  "navigationBarTitleText": "音乐播放器"
}
```

### 播放页面

`index.wxml`文件

```
<view class="container">
    <!-- 当前播放歌曲名 -->
    <view class="title">{{name}}</view>
    <!-- 音乐背景图 -->
    <image class="myImg" src="{{src}}" mode="widthFix"/>
    <!-- 音乐进度条 -->
    <view class="range">
        <text>{{currentTime}}</text>
        <slider
        class="mySlider"
        step="0.01"
        value="{{value}}"
        max="{{maxValue}}"
        bindchange="toTime"
        block-size="12"
        />
        <text>{{duration}}</text>
    </view>
    <!-- 功能按钮 -->
    <view class="select">
        <button size="mini" bindtap="isSingle">
        <icon class="iconfont {{isSingle ? 'icon-danxunhuan' : 'icon-liebiaoxunhuan'}}"/>
        </button>
        <button size="mini" bindtap="pre">
        <icon class="iconfont icon-shangyishoushangyige"/>
        </button>
        <button size="mini" class="mid" bindtap="isPlay">
        <icon class="iconfont {{isPlay ? 'icon-zanting' : 'icon-bofangsanjiaoxing'}}"/>
        </button>
        <button size="mini" bindtap="next">
        <icon class="iconfont icon-xiayigexiayishou"/>
        </button>
        <button size="mini" catchtap="showActionSheet">
        <icon class="iconfont icon-liebiao"/>
        </button>
    </view>
</view>
<!-- 蒙层 -->
<view wx:if="{{showAlert}}" class="{{showAlert ? 'mask' : ''}}"  bindtap="closeAlert"></view>
<!-- 播放列表 -->
<view wx:if="{{showAlert}}">
  <scroll-view scroll-y="true" class="myalert">
    <view class="headline">播放列表</view>
    <view
    wx:for="{{list}}"
    wx:key="index"
    class="option {{index==currentInd ? 'active' : ''}}"
    catchtap="change"
    data-ind="{{index}}">
      {{item.name}} - <text class="sub {{index==currentInd ? 'active' : ''}}">{{item.singer}}</text>
    </view>
  </scroll-view>
</view>
```

**效果图**

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94c20964dcef43428e667536453a525a~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" />

## 功能部分

**声明：** 作者的项目没做数据请求所以采用数组下标来进行歌曲的切换。

### 数据

```js
data: {
      src: '../../images/beijin.png', // 背景图片
      isPlay: false,
      isSingle: false, // 是否单曲循环
      videoSrc: 'http://music.163.com/song/media/outer/url?id=1951069525.mp3', // 初始音乐链接
      name: '精卫', // 初始音乐名
      value: 0, // 进度条当前值
      maxValue: 0, // 进度条最大值
      currentTime: '0:00', // 当前歌曲播放进度
      duration: '0:00', // 当前歌曲总时长
      index: 0, // 用于切换歌曲
      currentInd: 0, // 当前播放歌曲下标
      showAlert: false, // 列表弹窗的显隐
      videos: [
      {name:'精卫', singer: '30年前，50年后', videoSrc:'http://music.163.com/song/media/outer/url?id=1951069525.mp3'},
      {name:'可能', singer: '程响', videoSrc: 'http://music.163.com/song/media/outer/url?id=1950343972.mp3'},
      {name:'雪 Distance', singer: 'Capper / 罗言', videoSrc: 'http://music.163.com/song/media/outer/url?id=2026224214.mp3'},
      {name:'我记得', singer: '赵雷', videoSrc: 'http://music.163.com/song/media/outer/url?id=1974443814.mp3'},
      {name:'梦醒', singer: 'handsome lau / HYPEEZY / 冯泳', videoSrc: 'http://music.163.com/song/media/outer/url?id=1395222212.mp3'},
      {name:'唯一', singer: '告五人', videoSrc: 'http://music.163.com/song/media/outer/url?id=1807799505.mp3'},
      {name:'罗生门（Follow）', singer: '梨冻紧 / Wiz_H张子豪', videoSrc: 'http://music.163.com/song/media/outer/url?id=1456890009.mp3'},
      {name:'还是会想你', singer: '林达浪 / h3R3', videoSrc: 'http://music.163.com/song/media/outer/url?id=1827600686.mp3'},
      {name:'爱人错过', singer: '告五人', videoSrc: 'http://music.163.com/song/media/outer/url?id=1368754688.mp3'},
      {name:'达尔文', singer: '林俊杰', videoSrc: 'http://music.163.com/song/media/outer/url?id=2019573476.mp3'},
      {name:'乐园', singer: '沧桑CangSang / 虎皮蛋 / 曲甲', videoSrc: 'http://music.163.com/song/media/outer/url?id=2021379728.mp3'},
      {name:'落泪', singer: '康熙 / TOYOKI', videoSrc: 'http://music.163.com/song/media/outer/url?id=2021434589.mp3'},
      {name:'谁', singer: '王贰浪', videoSrc: 'http://music.163.com/song/media/outer/url?id=2026812798.mp3'},
      {name:'我的爱如烈火', singer: 'xxxmiracle / mok', videoSrc: 'http://music.163.com/song/media/outer/url?id=2024654768.mp3'},
      ]
  }
```

### 初始化

在页面加载时，小程序使用`wx.createInnerAudioContext()`创建并返回内部`audio`上下文对象`innerAudioContext`，同时调用自定义函数`initialAudio()`函数初始化音频。

```js
onLoad: function (options) {
  this.audioCtx = wx.createInnerAudioContext()
  this.initialAudio()
}
```

#### 初始化音频

```js
// 初始化音频
initialAudio() {
  let audioCtx = this.audioCtx
  audioCtx.src = this.data.videoSrc // 初始歌曲
  audioCtx.loop = this.data.isSingle // 是否单曲循环
  // 当音乐自然播放完成后执行next()
  audioCtx.onEnded(() => {
      this.next()
  })
  // 获取音乐时长，当前进度
  audioCtx.onCanplay(() => {
  audioCtx.duration
  audioCtx.currentTime
  setTimeout(() => {
      this.setData({
          value: audioCtx.currentTime,
          maxValue: audioCtx.duration,
          currentTime: this.timeFormat(audioCtx.currentTime),
          duration: this.timeFormat(audioCtx.duration)
      })
  },1000)
  })
  // 音频播放进度更新后执行
  audioCtx.onTimeUpdate(() => {
      this.setData({
          value: audioCtx.currentTime,
          maxValue: audioCtx.duration,
          currentTime: this.timeFormat(audioCtx.currentTime),
          duration: this.timeFormat(audioCtx.duration)
      })
  })
},
```

这段代码主要是定义了初始音频，初始默认为列表循环，当音乐自然播放完后，调用`next()`切换列表下一首，其中`onCanplay()`监听音频是否进入可执行状态，若是，执行回调函数获取音乐总时长以及当前播放位置。**注意：** 初始获取时长建议这样写，不然获取不到，具体原因作者也没找到。`onTimeUpdate()`用于监听音频播放进度的改变，及时更新相关时间数据。其中以`audioCtx.`调用的属性和方法皆为小程序`innerAudioContext`对象自带的属性和方法。

### 时间格式转换

```js
timeFormat(e) {
    let time = Math.floor(e)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const result = `${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`
    return result
},
padTo2Digits(num) {
    return num.toString().padStart(2, '0');
},
```

因为通过小程序获取到的时间单位是`s`，所以我们需要将时间格式转换为`mm:ss`格式，其中需要使用 ES6 中的字符串新方法：`padStart()`用于头部补全，要传入两个参数第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

### 切换下一首

```js
next() {
  let index = this.data.index + 1 // 下一首下标
  let list = this.data.videos  // 歌曲数组
  let isPlay = this.data.isPlay
  let videoSrc = ''
  let name = ''
  // 如果超过列表长度，从列表第一首开始
  if(index>=list.length) {
      index = 0
  }
  videoSrc = list[index].videoSrc
  name = list[index].name
  if(isPlay) {
      isPlay = !isPlay
  }
  this.setData({
      isPlay,
      index,
      currentInd: index,
      videoSrc: videoSrc,
      name: name
  })
  this.isPlay()
},
```

修改当前播放音频链接，音频名，当前播放音频下标(用于播放列表的更新)，最后调用`isPlay()`进行歌曲播放。

### 播放功能

```js
isPlay() {
  let isPlay = this.data.isPlay
  if(!isPlay) {
  this.audioCtx.src = this.data.videoSrc
  this.audioCtx.play()
  } else {
  this.audioCtx.pause()
  }
  this.setData({
      isPlay: !isPlay,
  })
},
```

通过`isPlay`变量来实现切换歌曲后的自动播放以及手动暂停功能，根据其值来决定是调用播放还是暂停功能。

### 切换上一首

```js
pre() {
  let index = this.data.index - 1
  let list = this.data.videos
  let isPlay = this.data.isPlay
  let videoSrc = ''
  let name = ''
  if(index<0) {
      index = list.length - 1
  }
  videoSrc = list[index].videoSrc
  name = list[index].name
  if(isPlay) {
      isPlay = !isPlay
  }
  this.setData({
      isPlay,
      index,
      currentInd: index,
      videoSrc: videoSrc,
      name: name
  })
  this.isPlay()
}
```

基本实现与切换下一首无异，不同在于当下标`index`小于 0 时，将下标切换为音频列表最后一首的下标。

### 单曲循环

```js
isSingle() {
  let isSingle = this.data.isSingle
  this.setData({
      isSingle: !isSingle
  })
  this.audioCtx.loop = this.data.isSingle
}
```

主要通过小程序`innerAudioContext`上的`loop`属性来实现，其用于控制是否循环播放，默认为`false`。通过修改`isSingle`变量来控制。

### 进度条拖拽

```js
toTime(e) {
  console.log(e.detail);
  let time = e.detail.value
  this.audioCtx.seek(time)
}
```

```
<view class="range">
    // 当前音频进度
    <text>{{currentTime}}</text>
    <slider
    class="mySlider"
    value="{{value}}"
    max="{{maxValue}}"
    bindchange="toTime"
    block-size="12"
    />
    // 当前音频总时长
    <text>{{duration}}</text>
</view>
```

其中调用了`innerAudioContext`的`seek()`方法用于跳转音频进度到指定位置，由于播放进度更新，会执行上文的`onTimeUpdate()`方法,更新`value`的值，其中该值为进度条此时进度值，所以进度条进度也会同步更新。`maxValue`为当前音频总时长。

### 弹窗列表

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9ccd1a76562433c9ec40423c026604e~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" />

#### 展示弹窗

```js
showActionSheet() {
  let list = this.data.videos.map(x => {return {"name":x.name,"singer": x.singer}})
  console.log(list);
  // let that = this
  this.setData({
    showAlert: true,
    list
  })
}
```

通过`map()`函数将音频列表的歌手名，音频名组成一个新的对象数组，渲染到弹窗列表。

#### 关闭弹窗

```js
closeAlert() {
    this.setData({
      showAlert: false
    })
}
```

#### 弹窗列表选择音乐

```js
change(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.ind);
    let index = e.currentTarget.dataset.ind
    this.setData({
        currentInd: index,
        index: index,
        name: this.data.videos[index].name,
        videoSrc: this.data.videos[index].videoSrc,
        isPlay: false,
        showAlert: false
    })
    this.audioCtx.stop()
    this.isPlay()
}
```

通过点击事件获取被点击列表上的音频下标，修改播放链接和歌手名为选择下标的链接，同时隐藏弹窗。

### 弹窗列表页面

```
// 蒙层
<view wx:if="{{showAlert}}" class="{{showAlert ? 'mask' : ''}}"  bindtap="closeAlert"></view>
// 弹窗列表
<view wx:if="{{showAlert}}">
  <scroll-view scroll-y="true" class="myalert">
    <view class="headline">播放列表</view>
    <view
    wx:for="{{list}}"
    wx:key="index"
    class="option {{index==currentInd ? 'active' : ''}}"
    catchtap="change"
    data-ind="{{index}}">
      {{item.name}} - <text class="sub {{index==currentInd ? 'active' : ''}}">{{item.singer}}</text>
    </view>
  </scroll-view>
</view>
```

蒙层当弹窗列表弹出时添加一层背景色，同时给其关闭弹窗功能，点击列表外部时，弹窗会主动关闭，同时`data-`设置一个变量传递给点击事件用于替换歌曲，`currentInd`用于判断当前播放歌曲，将列表对应项添加`active`类，使其呈现红色。

# 结语

以上便是主要功能的代码实现，这里由于篇幅过长 css 样式并未给出，如需可以点击源码链接查看，如果觉得还不错的话，请给作者一个小小的赞吧! [源码链接](https://gitee.com/JCX2927917567/music)

![b4730e00638c7c8a30b5f3abd77a2dcf.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c8f7f888ba84e0b967134f37892d12d~tplv-k3u1fbpfcp-watermark.image?)
