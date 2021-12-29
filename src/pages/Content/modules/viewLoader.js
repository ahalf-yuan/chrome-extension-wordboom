import WordboomIframe from './wbIframe';
import UserSelection from './userSelection';

function init() {
  const wordboomIframe = new WordboomIframe({
    src: 'chrome-extension://dpplhjgpebacpigmoanpofnkciianlge/content.html',
  });

  // 鼠标松开后，获取鼠标位置以及所选文本
  document.onmouseup = function () {
    setTimeout(function () {
      const userSelection = new UserSelection();
      const selectedText = userSelection.selectedText;
      if (selectedText.length > 0) {
        // get right bottom pos of the selection
        const { x, y } = userSelection.getPos('end');
        // 1. set pos to iframe;
        wordboomIframe.setIframeStyle({
          left: `${x}px`,
          top: `${y}px`,
        });
        // 2. send the selected text to iframe
        if (wordboomIframe.node) {
          wordboomIframe.node.contentWindow.postMessage(
            { wordboom_selection: selectedText },
            '*'
          );
          wordboomIframe.show();
        }
      }
    }, 100);
  };

  document.onclick = function (ev) {
    // 隐藏弹窗
    wordboomIframe.hide();
  };
}

/**
 *
 * init dom
 * insert dom into document.body
 * render -> views folder
 */
window.onload = function () {
  setTimeout(() => {
    init();
  }, 500);
};
