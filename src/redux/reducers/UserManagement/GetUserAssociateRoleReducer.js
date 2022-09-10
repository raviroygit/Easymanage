import {
  GET_USER_ASSOCIATE_ROLE_SUCCESS,
  GET_USER_ASSOCIATE_ROLE_FAILURE,
  RESET_USER_ASSOCIATE_ROLE,
} from '../../../constants/constants'

const getUserAssociateRoleReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_ASSOCIATE_ROLE_SUCCESS:
      return [...action.payload]
    case GET_USER_ASSOCIATE_ROLE_FAILURE:
      return [];
    case RESET_USER_ASSOCIATE_ROLE:
      return [];
    default: return state;
  }
}

export default getUserAssociateRoleReducer;