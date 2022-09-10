import {
  GET_MERCHANT_SUCCESS,
  GET_MERCHANT_FAILURE,
  RESET_MERCHANT,
} from '../../../constants/constants'


const getMerchantByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MERCHANT_SUCCESS:
      return Object.assign({}, action.payload)
    case GET_MERCHANT_FAILURE:
      return {};
    case RESET_MERCHANT:
      return {};
    default: return state;
  }
}

export default getMerchantByIdReducer;