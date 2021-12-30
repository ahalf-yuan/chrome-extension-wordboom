/**
 * official: https://ai.youdao.com/product-fanyi-text.s
 * API:https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html
 *
 */

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
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: transDataToFormData({
            q: selectedText
        })
    }).then(res => res.json())
    .then(res => {
        return res;
    }).catch((err) => {
        // handle error
    })
}

export { postTranslate }
