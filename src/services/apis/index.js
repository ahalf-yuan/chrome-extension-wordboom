const YOUDAO_API = 'https://aidemo.youdao.com/trans';

function transDataToFormData(obj) {
  const res = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    res.append(key, value);
  });
  return res;
}

function postTranslate(selectedText) {
  return fetch(YOUDAO_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: transDataToFormData({
      q: selectedText,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // handle error
      return null;
    });
}

function createWordItem(data) {
  // return
}

const HOST = 'http://localhost:8080';

function saveWord(body) {
  return fetch(HOST + '/api/words/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // handle error
      return null;
    });
}

// function signin() {
//   return fetch(HOST + '/api/signin', {
//     method: 'GET',
//     body: JSON.stringify({}),
//   });
// }
export { postTranslate, createWordItem, saveWord };
