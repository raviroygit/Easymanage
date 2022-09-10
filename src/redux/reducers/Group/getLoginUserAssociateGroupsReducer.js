import {
  GET_LOGIN_USER_ASSOCIATE_GROUPS_SUCCESS,
  GET_LOGIN_USER_ASSOCIATE_GROUPS_FAILURE,
  RESET_USER_ASSOCIATE_GROUPS
} from '../../../constants/constants'

const getLoginUserAssociateGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_LOGIN_USER_ASSOCIATE_GROUPS_SUCCESS:
      return [...action.payload,"NA"]

    case GET_LOGIN_USER_ASSOCIATE_GROUPS_FAILURE:
      return [];

    case RESET_USER_ASSOCIATE_GROUPS:
      return [];

    default: return state;
  }
}

export default getLoginUserAssociateGroupsReducer;