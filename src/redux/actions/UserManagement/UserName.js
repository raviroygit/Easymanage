import {
  USER_NAME,
} from '../../../constants/constants';

export function userNameAction(name) {
  return {
    type: USER_NAME,
    payload: name
  };
}
