import request from '../../helper/request';

export function getUserInfo() {
  return request('/api/user/info', {
    method: 'POST',
  });
}
