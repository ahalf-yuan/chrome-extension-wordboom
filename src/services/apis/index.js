import request from '../../helper/request';

const YOUDAO_API = 'https://aidemo.youdao.com/trans';

function postTranslate(selectedText) {
  return request(YOUDAO_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      q: selectedText,
    },
  });
}

function createWordItem(data) {
  // return
}

function saveWord(body) {
  return request('/api/words', {
    method: 'POST',
    body,
  });
}

export { postTranslate, createWordItem, saveWord };
