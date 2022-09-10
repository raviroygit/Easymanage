import { USER_INFO_SUCCESS } from '../../../constants/constants';


const logInUserInfoReducer = (state = false, action) => {
  switch (action.type) {
    case USER_INFO_SUCCESS:
      return Object.assign({}, action.payload);

    default:
      return state;
  }
};

export default logInUserInfoReducer;