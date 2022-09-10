import {
  UPDATE_MERCHANT_SUCCESS,
  UPDATE_MERCHANT_FAILURE,
} from '../../../constants/constants'



const updateMerchantReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_MERCHANT_SUCCESS:
      return true;
    case UPDATE_MERCHANT_FAILURE:
      return false;
    default: return state;
  }
}

export default updateMerchantReducer;

