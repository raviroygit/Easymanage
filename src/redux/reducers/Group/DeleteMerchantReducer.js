import {
  DELETE_MERCHANT_SUCCESS,
  DELETE_MERCHANT_FAILURE,
  RESET_MERCHANT,
} from '../../../constants/constants'


const deleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MERCHANT_SUCCESS:
      return {}
    case DELETE_MERCHANT_FAILURE:
      return {};
    case RESET_MERCHANT:
      return {};
    default: return state;
  }
}

export default deleteReducer;