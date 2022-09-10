import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
/* spell-checker: disable */
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import Translation from '../../i18n/index';

/* spell-checker: disable */

const initialState = {
  i18n: i18nReducer
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    composeWithDevTools(
      applyMiddleware(...middleware)
    ))
);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(Translation));
store.dispatch(setLocale('en'));

export default store;
