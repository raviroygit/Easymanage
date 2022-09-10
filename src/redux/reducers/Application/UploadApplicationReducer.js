import {
  UPLOAD_APPLICATION_SUCCESS,
  UPLOAD_APPLICATION_FAILURE,
} from '../../../constants/constants'



const uploadApplicationReducer = (state = [], action) => {
  switch (action.type) {
    case UPLOAD_APPLICATION_SUCCESS:
      return true;
    case UPLOAD_APPLICATION_FAILURE:
      return false;
    default: return state;
  }
}

export default uploadApplicationReducer;

