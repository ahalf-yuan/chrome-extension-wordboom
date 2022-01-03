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

export { getPageInfo };
