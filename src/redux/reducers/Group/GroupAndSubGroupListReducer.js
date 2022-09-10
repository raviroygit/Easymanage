import {
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAILURE,
  RESET_GROUP_LIST,
} from '../../../constants/constants'

const groupListReducer = (state = [], action) => {
  switch (action.type) {
    case GROUP_LIST_SUCCESS:
      return [...action.payload]

    case GROUP_LIST_FAILURE:
      return [];

    case RESET_GROUP_LIST:
      return [];
    default: return state;
  }
}

export default groupListReducer;