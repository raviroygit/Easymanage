/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, } from 'react';
import { useLocation } from 'react-router';
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import Terminal from '../Terminal/Terminal';
import Dashboard from '../Dashboard/Dashboard';
import Error404Component from '../Error404Component/Error404Component';
import Group from '../../presentation/Group/Group';
import DownloadAndUpload from '../DownloadAndUpload/FileTable';
import Application from '../Application/ApplicationTable';
import PasswordGenerator from '../PasswordGenerator/PasswordGenerator';
import TerminalDetails from '../Terminal/TerminalDetails';
import keycloak from '../../../lib/keycloak/context';
import Unauthorized from '../../presentation/Unauthorized/Unauthorized';
import Reports from '../Reports/Reports'
import { useSelector, useDispatch } from 'react-redux';
import CallScheduleTable from '../CallSetting/CallScheduleTable';
import UserLog from '../UserManagement/UserLog';
import UserList from '../UserManagement/UserList';
import { getPermissionByRole } from '../../../redux/actions/Permission/GetPermissionByRole';
import TransactionsDetails from '../Transactions/TransactionsDetails';
import AppDetails from '../Application/AppDetails';
import UploadEditForm from '../Application/UploadEditForm';

export default function Routing(props) {
  const userData = React.useContext(keycloak);
  let location = useLocation();
  const history = useHistory();
  const permission = useSelector(state => state.permission);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && userData.resourceAccess && userData.resourceAccess[process.env.REACT_APP_CLIENT_ID]) {
      const userRoles = userData.resourceAccess[process.env.REACT_APP_CLIENT_ID].roles;
      dispatch(getPermissionByRole({ role: `${userRoles[0]}` }));
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.resourceAccess && permission && permission.route && process.env.REACT_APP_AUTHORIZATION === 'true') {
      const permissionRoute = permission.route.length > 0 && permission.route.filter(x => '/' + x === window.location.pathname);
      if (permissionRoute.length === 0 && window.location.pathname !== `/unauthorized` && !window.location.pathname.includes('/terminaldetail') && !window.location.pathname.includes('/app-details')) {
        return history.push('/unauthorized');
      }
    }
  }, [location, userData, permission]);

  return (
    <Switch>
      <Redirect from="/" exact to="/dashboard" />
      <Route path="/report" component={Reports} />
      <Route path={"/terminaldetail/:id"} exact={true} component={TerminalDetails} />
      <Route path="/callsettings/schedule" component={CallScheduleTable} />
      <Route path="/groups" component={Group} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/terminals" component={Terminal} />
      <Route path="/downloadupload" component={DownloadAndUpload} />
      <Route path="/application" component={Application} />
      <Route path="/application-upload" component={UploadEditForm} />
      <Route path="/app-details/:id" component={AppDetails} />
      <Route path="/callsettings" component={CallScheduleTable} />
      <Route path="/password" component={PasswordGenerator} />
      <Route path="/transactions" component={TransactionsDetails} />
      <Route path="/userlogs" component={UserLog} />
      <Route path="/userlist" component={UserList} />
      <Route path="/unauthorized" component={Unauthorized} />
      <Route path='*' exact={true} component={Error404Component} />
    </Switch>

  )
}

