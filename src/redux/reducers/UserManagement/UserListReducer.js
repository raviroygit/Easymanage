import {
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE
} from '../../../constants/constants'

const userListReducer = (state = [], action) => {
  switch (action.type) {
    case USER_LIST_SUCCESS:
      return [...action.payload]

    case USER_LIST_FAILURE:
      return [];

    default: return state;
  }
}

export default userListReducer;