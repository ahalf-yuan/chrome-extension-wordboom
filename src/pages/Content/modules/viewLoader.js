import UserSelection from './userSelection';
import '../views/index.jsx';

function createShadowdom() {
  const container = document.createElement('div');
  container.setAttribute('id', 'wordboom_app');
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: 'open' });
  // const target = document.querySelector('wordboom_app').shadowRoot;
  return shadow;
}

function createEvent() {
  var myEvent = new CustomEvent('wordboom_ee', {
    // objParams就是需要传递的参数，
    // 可以是任意的类型
    detail: { a: 1 },
  });
  document.dispatchEvent(myEvent);
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
        // todo
        createEvent();
      }
    }, 100);
  };

  // scroll event

  document.onclick = function (ev) {
    // 隐藏弹窗
    // wordboomIframe.hide();
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
