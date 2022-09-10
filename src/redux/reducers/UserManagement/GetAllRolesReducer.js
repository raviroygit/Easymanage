import {
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
} from '../../../constants/constants'

const getAllRolesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return [...action.payload]

    case GET_ROLES_FAILURE:
      return [];

    default: return state;
  }
}

export default getAllRolesReducer;