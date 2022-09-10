import {
  UPDATE_FILE_SUCCESS,
  UPDATE_FILE_FAILURE,
} from '../../../constants/constants'

const updateFileReducer = (state = false, action) => {
  switch (action.type) {
    case UPDATE_FILE_SUCCESS:
      return true;
    case UPDATE_FILE_FAILURE:
      return false;
    default: return state;
  }
}

export default updateFileReducer;

