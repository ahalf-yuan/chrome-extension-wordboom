import { saveWord, postTranslate } from '../apis';
import { getUserInfo } from '../apis/user';

export const listeners = {
  YOUDAO_TRANS: postTranslate,
  SAVE_WORD: saveWord,
  USER_INFO: getUserInfo,
};
