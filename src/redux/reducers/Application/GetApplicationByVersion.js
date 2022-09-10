import {
    GET_AAP_DETAILS_BY_VERSION_SUCCESS,
    GET_AAP_DETAILS_BY_VERSION_FAILURE,
    RESET_AAP_DETAILS_BY_VERSION
  } from '../../../constants/constants'
  
  
  const getApplicationVersionReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_AAP_DETAILS_BY_VERSION_SUCCESS:
        return { ...action.payload }
      case GET_AAP_DETAILS_BY_VERSION_FAILURE:
        return {};
      case RESET_AAP_DETAILS_BY_VERSION:
        return {};
      default: return state;
    }
  }
  
  export default getApplicationVersionReducer;