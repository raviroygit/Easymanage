import { LANGUAGE_SELECTION, SUPPORTED_LANGUAGES } from '../../../constants/constants';

const menuLanguage = SUPPORTED_LANGUAGES[0];

export const LanguageReducer = (state = menuLanguage, action) => {
  switch (action.type) {
    case LANGUAGE_SELECTION:
      return action.payload;
    default:
      return state;
  }
};
