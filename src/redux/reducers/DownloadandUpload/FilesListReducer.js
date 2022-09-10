import {
  FILE_LIST_SUCCESS,
  FILE_LIST_FAILURE,
} from '../../../constants/constants'

const filesReducer = (state = [], action) => {
  switch (action.type) {
    case FILE_LIST_SUCCESS:
      return [...action.payload]

    case FILE_LIST_FAILURE:
      return [];
    default: return state;
  }
}

export default filesReducer;