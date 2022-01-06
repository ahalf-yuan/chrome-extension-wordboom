import { loadNewTab } from './browser';

const DEV_HOST = 'http://localhost:8080';

function isValidUrl(URL) {
  var str = URL;
  //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
  //下面的代码中应用了转义字符"\"输出一个字符"/"
  var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var objExp = new RegExp(Expression);
  if (objExp.test(str) === true) {
    return true;
  } else {
    return false;
  }
}

function transDataToFormData(obj) {
  const res = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    res.append(key, value);
  });
  return res;
}

function checkStatus(response) {
  const status = response.status || -1000; // -1000 自己定义，连接错误的status
  if (status >= 200 && status < 400) {
    // 如果http状态码正常，则直接返回数据
    return response.data;
  }
  let errorInfo = '';
  switch (status) {
    case -1:
      errorInfo = '远程服务响应失败,请稍后重试';
      break;
    case 400:
      errorInfo = '400：错误请求';
      break;
    case 401:
      errorInfo = '401：访问令牌无效或已过期';
      break;
    case 403:
      errorInfo = '403：拒绝访问';
      break;
    case 404:
      errorInfo = '404：资源不存在';
      break;
    case 405:
      errorInfo = '405：请求方法未允许';
      break;
    case 408:
      errorInfo = '408：请求超时';
      break;
    case 500:
      errorInfo = '500：访问服务失败';
      break;
    case 501:
      errorInfo = '501：未实现';
      break;
    case 502:
      errorInfo = '502：无效网关';
      break;
    case 503:
      errorInfo = '503：服务不可用';
      break;
    default:
      errorInfo = `连接错误`;
  }
  return {
    status,
    msg: errorInfo,
  };
}

const defaultOpts = {
  method: 'GET',
  isHandleError: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
};

function request(url, opts = {}) {
  const options = {
    ...defaultOpts,
    ...opts,
    headers: {
      ...defaultOpts.headers,
      ...opts.headers
    }
  };

  if (!isValidUrl(url)) {
    url = `${DEV_HOST}${url}`;
  }

  if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.mothod)) {
    if (options.params) {
      const ask = url.includes('?') ? '&' : '?';
      url += `${ask}${new URLSearchParams(options.params)}`;
    }
  }

  const contentType = options.headers && options.headers['Content-Type'];
  if (/^(POST|PUT)$/i.test(options.method)) {
    if (contentType === 'application/x-www-form-urlencoded') {
      // handle it
      options.body= transDataToFormData(options.body)
    } else {
      // default "application/json"
      options.body = JSON.stringify(options.body);
    }
  }

  return fetch(url, options)
    .then((response) => {
      if (!/^(2|3)\d{2}$/.test(response.status)) {
        return Promise.reject(checkStatus(response));
      }

      return response.json();
    })
    .catch((error) => {
      //   if (!window.navigator.onLine) {
      //     return;
      //   }
      if (options.isHandleError) {
        if (error && error.status === 401) {
          console.log('没有登陆');
          loadNewTab('*://*/user/login');
        }
        return;
      }
      // 什么都没有，返回一个错误
      return Promise.reject(error);
    });
}

export default request;
