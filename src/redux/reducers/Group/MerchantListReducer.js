import {
  LIST_MERCHANT_SUCCESS,
  LIST_MERCHANT_FAILURE,
  LIST_MERCHANT_RESET,
} from '../../../constants/constants'

const merchantsReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_MERCHANT_SUCCESS:
      return [...action.payload]

    case LIST_MERCHANT_FAILURE:
      return [];

    case LIST_MERCHANT_RESET:
      return [];
    default: return state;
  }
}

export default merchantsReducer;