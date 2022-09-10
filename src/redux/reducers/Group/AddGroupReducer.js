import {
  ADD_MERCHANT_SUCCESS,
  ADD_MERCHANT_FAILURE,
} from '../../../constants/constants'



const addMerchantReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_MERCHANT_SUCCESS:
      return true;
    case ADD_MERCHANT_FAILURE:
      return false;
    default: return state;
  }
}

export default addMerchantReducer;

