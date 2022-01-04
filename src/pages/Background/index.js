console.log('This is the background page.');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Put the background scripts here.');

  chrome.contextMenus.create({
    id: 'sampleContextMenu',
    title: 'Sample Context Menu',
    contexts: ['selection'],
  });
});

/**
 * get current page info,
 * including {title,favicon, url}
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message && message.type === 'page') {
    var result = _getPageInfo(sender);
    // Reply result to content script
    sendResponse(result);
  }
});

function _getPageInfo(sender) {
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
