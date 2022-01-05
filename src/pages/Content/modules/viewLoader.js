import UserSelection from './userSelection';
import '../views/index.jsx';
import {
  WORDBOOM_ID,
  WORDBOOM_EE_VISIBLE_MINIPANEL,
  WORDBOOM_APP_STYLE,
} from '../helper/constant';
import { moveNodes } from '../helper/util';

function createShadowdom() {
  let container = null;
  if (!document.querySelector(`#${WORDBOOM_ID}`)) {
    container = document.createElement('div');
    container.setAttribute('id', WORDBOOM_ID);
    document.body.appendChild(container);
    const shadow = container.attachShadow({ mode: 'open' });
    // const target = document.querySelector(WORDBOOM_ID).shadowRoot;
    return shadow;
  }
  return document.querySelector(`#${WORDBOOM_ID}`).shadowRoot;
}

/**
 * the style container is created by webpack style-loader
 * so this function will move its inner nodes into app container,
 * and remove the style container.
 *
 * @param {*} destShawdom
 */
function moveStyleIntoAppDom(destShawdomNode) {
  // ensure the style container is mounted
  setTimeout(() => {
    const styleContainer = document.querySelector(`#${WORDBOOM_APP_STYLE}`);
    if (styleContainer) {
      const shadowRootNode = styleContainer.shadowRoot;
      moveNodes(shadowRootNode, destShawdomNode);
      styleContainer.remove();
    }
    moveStyleIntoAppDom(destShawdomNode);
  }, 500);
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
  const appShadowdom = createShadowdom();
  moveStyleIntoAppDom(appShadowdom);

  // 鼠标松开后，获取鼠标位置以及所选文本
  document.onmouseup = function () {
    setTimeout(function () {
      const userSelection = new UserSelection();
      const selectedText = userSelection.selectedText;
      const sentence = userSelection.sentence;
      if (selectedText.length > 0) {
        // get right bottom pos of the selection
        const { x, y } = userSelection.getPos('end');
        createEvent(WORDBOOM_EE_VISIBLE_MINIPANEL, {
          visible: true,
          x,
          y,
          selectedText,
          sentence,
        });
      }
    }, 100);
  };

  // scroll event

  document.onclick = function (ev) {
    // 隐藏弹窗
    // wordboomIframe.hide();
    createEvent(WORDBOOM_EE_VISIBLE_MINIPANEL, { visible: false });
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
  try {
    init();
  } catch (err) {
    // handle error
  }
};
