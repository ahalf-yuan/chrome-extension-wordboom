import BackgroundServer from './server';

console.log('This is the background page.');

BackgroundServer.init();

chrome.runtime.onInstalled.addListener(() => {
  console.log('Put the background scripts here.');

  chrome.contextMenus.create({
    id: 'sampleContextMenu',
    title: 'Sample Context Menu',
    contexts: ['selection'],
  });
});
