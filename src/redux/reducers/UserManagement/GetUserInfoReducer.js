import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  RESET_USER
} from '../../../constants/constants'


const getUserInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return Object.assign({}, action.payload)
    case GET_USER_INFO_FAILURE:
      return {};
    case RESET_USER:
      return {}
    default: return state;
  }
}

export default getUserInfoReducer;