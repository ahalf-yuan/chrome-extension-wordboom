import message from '../../helper/message';

export async function saveWord(word) {
  const res = await message.send({ type: 'SAVE_WORD', payload: word });
  return res;
}

export async function getPageInfo() {
  const res = await message.send({ type: 'PAGE_INFO', payload: null });
  return res;
}

export async function postTranslate(selectedText) {
  const res = await message.send({
    type: 'YOUDAO_TRANS',
    payload: selectedText,
  });
  return res;
}
