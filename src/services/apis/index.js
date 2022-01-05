 

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

function saveWord(selectedText) {
    return fetch(YOUDAO_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: transDataToFormData({
          q: selectedText || 'test',
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

export { postTranslate, createWordItem, saveWord };