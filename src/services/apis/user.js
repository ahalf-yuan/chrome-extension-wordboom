import { loadNewTab } from '../../helper/browser';

const HOST = 'http://localhost:8080';

function signin() {
  return fetch(HOST + '/api/signin', {
    method: 'GET',
    body: JSON.stringify({}),
  });
}

export function getUserInfo() {
  return fetch(HOST + '/api/user/info', {
    method: 'POST',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response);
    })
    .then((user) => {
      console.log(user);
    })
    .catch((e) => {
      if (e.status === 401) {
        console.log(e);
        loadNewTab('*://*/user/login');
      }

      //   return Promise.reject(e.json());
      return e;
    });
}
