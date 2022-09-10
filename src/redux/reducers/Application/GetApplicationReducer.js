import {
  GET_APPLICATION_SUCCESS,
  GET_APPLICATION_FAILURE,
  RESET_APPLICATION
} from '../../../constants/constants'


const getApplicationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_APPLICATION_SUCCESS:
      return { ...action.payload }
    case GET_APPLICATION_FAILURE:
      return {};
    case RESET_APPLICATION:
      return {};
    default: return state;
  }
}

export default getApplicationReducer;