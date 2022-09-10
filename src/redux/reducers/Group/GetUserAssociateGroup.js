import {
  GET_USER_GROUPS_SUCCESS,
  GET_USER_GROUPS_FAILURE,

} from '../../../constants/constants'

const getUserAssociateGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_GROUPS_SUCCESS:
      return [...action.payload]

    case GET_USER_GROUPS_FAILURE:
      return [];

    default: return state;
  }
}

export default getUserAssociateGroupsReducer;