import { LANGUAGE_SELECTION } from '../../../constants/constants';

export const LanguageAction = language => ({
  type: LANGUAGE_SELECTION,
  payload: language
});