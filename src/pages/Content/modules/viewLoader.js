import UserSelection from './userSelection';
import '../views/index.jsx';

const WORDBOOM_ID = 'wordboom_app';

function createShadowdom() {
  const container = document.createElement('div');
  container.setAttribute('id', WORDBOOM_ID);
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: 'open' });
  // const target = document.querySelector(WORDBOOM_ID).shadowRoot;
  return shadow;
}

function createEvent(type, detail) {
  var wordboomEvent = new CustomEvent(type, {
    // objParams就是需要传递的参数，
    // 可以是任意的类型
    detail,
  });
  document.dispatchEvent(wordboomEvent);
}

function init() {
  createShadowdom();

  // 鼠标松开后，获取鼠标位置以及所选文本
  document.onmouseup = function () {
    setTimeout(function () {
      const userSelection = new UserSelection();
      const selectedText = userSelection.selectedText;
      if (selectedText.length > 0) {
        // get right bottom pos of the selection
        const { x, y } = userSelection.getPos('end');
        createEvent('wordboom_ee', {
          x,
          y,
          selectedText,
        });
      }
    }, 100);
  };

  // scroll event

  document.onclick = function (ev) {
    // 隐藏弹窗
    // wordboomIframe.hide();
    createEvent('wordboom_ee_hidden');
  };

  document.getElementById(WORDBOOM_ID).onmouseup = function (e) {
    // e.preventDefault();
    e.stopPropagation();
  };
}

/**
 *
 * init dom
 * insert dom into document.body
 * render -> views folder
 */
window.onload = function () {
  // console.log(chrome.runtime.getManifest().id);
  init();
};
