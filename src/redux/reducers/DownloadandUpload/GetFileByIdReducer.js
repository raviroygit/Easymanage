import {
  GET_FILE_SUCCESS,
  GET_FILE_FAILURE,
  RESET_FILE
} from '../../../constants/constants'


const getFileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FILE_SUCCESS:
      return { ...action.payload }
    case GET_FILE_FAILURE:
      return {};
    case RESET_FILE:
      return {};
    default: return state;
  }
}

export default getFileReducer;