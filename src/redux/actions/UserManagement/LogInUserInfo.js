import { USER_INFO_SUCCESS } from '../../../constants/constants';

export function logInUserInfo(userInfo) {
  if (userInfo) {
    return {
      type: USER_INFO_SUCCESS,
      payload: userInfo
    };
  }
}
