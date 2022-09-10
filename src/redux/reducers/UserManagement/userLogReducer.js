import {
  USER_LOG_SUCCESS,
  USER_LOG_FAILURE,
  USER_LOG_RESET,
} from '../../../constants/constants'

const userLogReducer = (state = [], action) => {
  switch (action.type) {
    case USER_LOG_SUCCESS:
      return [...action.payload]

    case USER_LOG_FAILURE:
      return [];

    case USER_LOG_RESET:
      return [];

    default: return state;
  }
}

export default userLogReducer;