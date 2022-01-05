/**
 *
 */
class ExtMessage {
  constructor() {
    console.log('== ExtMessage constructor ==');
  }

  /**
   * var sending = browser.tabs.sendMessage(
   * tabId,                   // integer
   * message,                 // any
   * options                  // optional object
   *)
   *
   * e.g. message.send({ type: 'DELETE_WORDS', payload: { } })
   *
   * @param  {...any} args
   * @returns
   */
  send(...args) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(args[0], function (data) {
        resolve(data);
      });
    });
  }

  /**
   * message.addListener('TYPE', ({ payload }) => {
   *    // doing what we want
   * })
   *
   * @param {string} type
   * @param {Promise} cb - return a Promise
   * @returns
   */
  addListener(type, cb) {
    return chrome.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      if (message && message.type === type) {
        if (!this._isFunction()) return; // 部分浏览器存在 bug，对于 HTML 的 object 元素和 embed 元素上运行 typeof 会返回 “function”。 

        if (this._isPromise(cb)) {
          cb(message, sender).then((res) => sendResponse(res));
        } else {
          const res = cb(message, sender)
          sendResponse(res);
        }
      }

      return true;
    });
  }

  _isFunction(cb) {
    return !!cb && typeof cb === 'function'
  }

  _isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === 'object' || typeof obj === 'function') &&
      typeof obj.then === 'function'
    );
  }

  removeListener() {}
}

const message = new ExtMessage();

export default message;
