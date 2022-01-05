import { saveWord, postTranslate } from '../apis';

export const listeners = {
    'YOUDAO_TRANS': postTranslate,
    'SAVE_WORD': saveWord
}