import {
  LOAD_USERS_DETAILS_SUCCESS,
  LOAD_USERS_DETAILS_FAILURE,
} from '../../../constants/constants'


const getUserDetails = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USERS_DETAILS_SUCCESS:
      return Object.assign({}, action.payload)
    case LOAD_USERS_DETAILS_FAILURE:
      return {};
    default: return state;
  }
}

export default getUserDetails;