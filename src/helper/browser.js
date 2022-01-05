/**
 * Deploy background proxy for self-messaging
 * This method should be invoked in background script
 */
function getPageInfo() {
  const result = {
    faviconURL: '',
    pageTitle: '',
    pageURL: '',
  };
  if (document) {
    result.pageTitle = document.title || '';
    result.pageURL = document.location.href || '';
  }
  return result;
}

function getExtUrl(name) {
  return chrome.runtime.getURL(name);
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function loadNewTab(url) {
  const currentTab = await getCurrentTab();

  chrome.tabs.query({ url }, (tabs) => {
    if (tabs.length > 0) {
      // remove all
      // chrome.tabs.highlight({ tabs: tabs[0].index });
      chrome.tabs.remove(tabs[0].id);
    }
    chrome.tabs.create({
      url: 'http://localhost:3001/user/login',
      index: currentTab.index + 1,
    });
  });
}

export { getPageInfo, getExtUrl, loadNewTab };
