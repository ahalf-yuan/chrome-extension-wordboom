import WordboomIframe from './wbIframe';

function selectText() {
  if (document.selection) {
    //For ie
    return document.selection.createRange().text;
  } else {
    return window.getSelection().toString();
  }
}

window.onload = function () {
  // init dom
  // insert dom into document.body
  // render -> views folder
  const wordboomIframe = new WordboomIframe({
    src: 'chrome-extension://dpplhjgpebacpigmoanpofnkciianlge/content.html',
  });

  // 鼠标松开后，获取鼠标位置以及所选文本
  document.onmouseup = function (ev) {
    var ev = ev || window.event,
      left = ev.clientX,
      top = ev.clientY;

    setTimeout(function () {
      if (selectText().length > 0) {
        wordboomIframe.setIframeStyle({
          left: `${left}px`,
          top: `${top}px`,
        });
        wordboomIframe.show();
      }
    }, 200);
  };

  document.onclick = function (ev) {
    // 隐藏弹窗
    wordboomIframe.hide();
  };
};
