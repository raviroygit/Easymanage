import {
  USER_NAME,
} from '../../../constants/constants';

const userNameReducer = (state = "", action) => {
  switch (action.type) {
    case USER_NAME:
      return action.payload;
    default:
      return state;
  }
};

export default userNameReducer;