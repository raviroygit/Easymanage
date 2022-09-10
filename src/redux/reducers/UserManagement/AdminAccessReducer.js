import {
  ADMIN_ACCESS_SUCCESS,
  ADMIN_ACCESS_FAILURE,
  RESET_ADMIN_ACCESS
} from '../../../constants/constants'


const adminAccessReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ACCESS_SUCCESS:
      return Object.assign({}, action.payload)
    case ADMIN_ACCESS_FAILURE:
      return {};
    case RESET_ADMIN_ACCESS:
      return {};
    default: return state;
  }
}

export default adminAccessReducer;