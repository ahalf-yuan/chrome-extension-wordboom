/**
 * singleton
 *
 * Usage: BackgroundServer.init()
 */
import { listeners as serverListeners } from '../../services/listeners';

class BackgroundServer {
  static instance;

  static getInstance() {
    return (
      BackgroundServer.instance ||
      (BackgroundServer.instance = new BackgroundServer())
    );
  }

  static init = BackgroundServer.getInstance;

  constructor() {
    this.initAddListener();
  }

  initAddListener() {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (serverListeners[msg.type]) {
        serverListeners[msg.type](msg.payload).then((response) => {
          sendResponse(response);
        });
        return true;
      }

      switch (msg.type) {
        case 'PAGE_INFO':
          const result = this._getPageInfo(sender);
          sendResponse(result);
          break;
        default:
        // todo
      }
      return true;
    });
  }

  // notifyWordSaved() {
  //   browser.tabs.query({}).then((tabs) => {
  //     tabs.forEach(async (tab) => {
  //       if (tab.id && tab.url) {
  //         try {
  //           await message.send(tab.id, { type: 'WORD_SAVED' });
  //         } catch (e) {
  //           console.warn(e);
  //         }
  //       }
  //     });
  //   });
  // }

  _getPageInfo(sender) {
    const result = {
      pageId: '',
      faviconURL: '',
      pageTitle: '',
      pageURL: '',
    };
    const tab = sender.tab;
    if (tab) {
      result.pageId = tab.id || '';
      if (tab.favIconUrl) {
        result.faviconURL = tab.favIconUrl;
      }
      if (tab.url) {
        result.pageURL = tab.url;
      }
      if (tab.title) {
        result.pageTitle = tab.title;
      }
    } else {
      // FRAGILE: Assume only browser action page is tabless
      result.pageId = 'popup';
      if (sender.url && !sender.url.startsWith('http')) {
        result.faviconURL = ''; // default
      }
    }
    return result;
  }
}

export default BackgroundServer;
