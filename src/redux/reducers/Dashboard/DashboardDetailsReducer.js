import {
  DASHBOARD_SUCCESS,
  DASHBOARD_FAILURE,
  DASHBOARD_RESET,
} from '../../../constants/constants'

const dashboardDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_SUCCESS:
      return Object.assign({}, action.payload)

    case DASHBOARD_FAILURE:
      return {};

    case DASHBOARD_RESET:
      return {};

    default: return state;
  }
}

export default dashboardDetailsReducer;