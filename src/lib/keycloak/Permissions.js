import store from '../../redux/store/store';

export const isAuthorized = (key) => {
  const state = store.getState();
  const permission = state.permission;
  if (permission && permission.route && permission.route.includes(key) && process.env.REACT_APP_AUTHORIZATION === 'true') {
    return true;
  }
  if (permission && permission.features && permission.features.includes(key) && process.env.REACT_APP_AUTHORIZATION === 'true') {
    return true;
  }
  if (process.env.REACT_APP_AUTHORIZATION === 'false') {
    return true;
  } else {
    return false;
  }
};