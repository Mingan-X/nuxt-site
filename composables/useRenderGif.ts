export default function (dom: HTMLImageElement) {
  if (!dom || !dom.src) {
    return;
  }
  // gif图片的url地址
  const src = dom.src;
  // 创建的用来播放gif的canvas元素
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // 一些与GIF播放有关的变量
  let imageDecoder: any = null;
  let imageIndex = 0;
  let paused = true;

  // 绘制方法
  const renderImage = function (result: any) {
    // 清除画布
    context?.clearRect(0, 0, canvas.width, canvas.height);
    // 绘制圆形遮罩
    context?.beginPath();
    context?.arc(
      dom.clientWidth / 2,
      dom.clientHeight / 2,
      Math.min(dom.clientWidth, dom.clientHeight) / 2,
      0,
      2 * Math.PI
    );
    context?.clip();
    context?.drawImage(result.image, 0, 0, dom.clientWidth, dom.clientHeight);
    const track = imageDecoder.tracks.selectedTrack;
    // 如果播放结束，从头开始循环
    if (imageDecoder.complete) {
      if (track.frameCount === 1) {
        return;
      }
      if (imageIndex + 1 >= track.frameCount) {
        imageIndex = 0;
      }
    }
    // 绘制下一帧内容
    imageDecoder
      .decode({ frameIndex: ++imageIndex })
      .then((nextResult: any) => {
        if (paused === false) {
          setTimeout(() => {
            renderImage(nextResult);
          }, result.image.duration / 1000.0);
        } else {
          // @ts-ignore
          canvas.nextResult = nextResult;
        }
      })
      .catch((e: any) => {
        // imageIndex可能超出的容错处理
        if (e instanceof RangeError) {
          imageIndex = 0;
          imageDecoder.decode({ frameIndex: imageIndex }).then(renderImage);
        } else {
          throw e;
        }
      });
  };

  nextTick(() => {
    // 判断地址能够请求
    fetch(src).then((response) => {
      // 可以请求，进行样式处理
      // 设置canvas尺寸
      canvas.width = dom.naturalWidth;
      canvas.height = dom.naturalHeight;
      // 实际显示尺寸
      canvas.style.width = dom.clientWidth + "px";
      canvas.style.height = dom.clientHeight + "px";
      canvas.style.position = "relative";
      canvas.style.zIndex = "99";
      // 隐藏图片，显示画布
      dom.after(canvas);
      dom.style.position = "absolute";
      dom.style.opacity = "0";
      dom.style.zIndex = "999";
      context?.scale(
        canvas.width / dom.clientWidth,
        canvas.height / dom.clientHeight
      );
      // 将GIF绘制在canvas上
      // @ts-ignore
      imageDecoder = new ImageDecoder({
        data: response.body,
        type: "image/gif",
      });
      // 解析第一帧并绘制
      imageDecoder
        .decode({
          frameIndex: imageIndex,
        })
        .then(renderImage);
    });
  });
  // 事件绑定处理
  dom.addEventListener("mouseenter", function () {
    if (paused) {
      paused = false;
      // @ts-ignore
      renderImage(canvas.nextResult);
    }
  });
  dom.addEventListener("mouseleave", function () {
    paused = true;
  });
}
