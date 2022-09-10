import {
  GET_PERMISSION_BY_ROLE_SUCCESS,
  GET_PERMISSION_BY_ROLE_FAILURE,
} from '../../../constants/constants'

const getPermissionByRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PERMISSION_BY_ROLE_SUCCESS:
      return Object.assign({}, action.payload)
    case GET_PERMISSION_BY_ROLE_FAILURE:
      return {};
    default: return state;
  }
}

export default getPermissionByRoleReducer;