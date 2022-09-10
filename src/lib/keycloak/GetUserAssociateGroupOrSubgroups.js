import store from '../../redux/store/store';


export const GetUserAssociatedGroups = () => {
  const state = store.getState();
  const queryData = {};
  if (process.env.REACT_APP_AUTHORIZATION === 'false' || process.env.REACT_APP_MULTI_VENDER_MODE === 'false') {
    queryData.isParent = true
  } else {
    if (state.loginUserAssociateGroups && state.loginUserAssociateGroups.length > 0) {
      if (state.loginUserAssociateGroups[0].name && state.loginUserAssociateGroups[0].name !== process.env.REACT_APP_ROOT_GROUP_NAME) {
        queryData.groupName = state.loginUserAssociateGroups[0].name
      }
      if (state.loginUserAssociateGroups[0].path && state.loginUserAssociateGroups[0].name) {
        const checkTopLevelGroup = state.loginUserAssociateGroups[0].path.split('/');
        if (checkTopLevelGroup.length === 2) {
          queryData.isParent = true
        } else {
          queryData.isParent = false
        }
      }
    }
  }


  return queryData;
}