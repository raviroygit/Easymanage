import {
  FEATURES_PERMISSIONS_SUCCESS,
  FEATURES_PERMISSIONS_FAILURE,
  FEATURES_PERMISSIONS_RESET
} from '../../../constants/constants'

const getFeaturesPermissionByRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case FEATURES_PERMISSIONS_SUCCESS:
      return Object.assign({}, action.payload)
    case FEATURES_PERMISSIONS_FAILURE:
      return {};
    case FEATURES_PERMISSIONS_RESET:
      return {};
    default: return state;
  }
}

export default getFeaturesPermissionByRoleReducer;