import {
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
} from '../../../constants/constants'



const uploadReducer = (state = [], action) => {
  switch (action.type) {
    case UPLOAD_FILE_SUCCESS:
      return true;
    case UPLOAD_FILE_FAILURE:
      return false;
    default: return state;
  }
}

export default uploadReducer;

