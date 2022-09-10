import {
  UPDATE_APPLICATION_SUCCESS,
  UPDATE_APPLICATION_FAILURE,
} from '../../../constants/constants'

const updateApplicationReducer = (state = false, action) => {
  switch (action.type) {
    case UPDATE_APPLICATION_SUCCESS:
      return true;
    case UPDATE_APPLICATION_FAILURE:
      return false;
    default: return state;
  }
}

export default updateApplicationReducer;

