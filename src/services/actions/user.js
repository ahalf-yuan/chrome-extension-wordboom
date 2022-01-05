import message from '../../helper/message';

export async function getUserInfo() {
  const res = await message.send({ type: 'USER_INFO', payload: null });
  return res;
}
