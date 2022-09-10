/* eslint-disable no-mixed-operators */
import React, { PureComponent } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppContainer from "./components/containers/AppContainer/AppContainer";
import { Provider } from 'react-redux';
import store from './redux/store/store';
import TMSTheme from './lib/context';
import { SnackbarProvider } from 'notistack';
import { IconButton, Typography, withStyles, Grid } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Keycloak from 'keycloak-js';
import KeycloakContext from './lib/keycloak/context';
import { closeSnackbar } from "./redux/actions/Notifier/NotifierAction";
import { AppStyle } from './AppStyle.js';
import decode from "jwt-decode";
import { userNameAction } from "./redux/actions/UserManagement/UserName";
import { COPY_RIGHT, USER, COPY_RIGHT_NAME } from "../src/constants/constants";
import { logInUserInfo } from './redux/actions/UserManagement/LogInUserInfo';
import { getLoginUserAssociateGroups } from './redux/actions/Group/getLoginUserAssociateGroups';
import { getKeycloakGroups } from './redux/actions/Group/GetKeycloakGroups';
import { adminAccess } from './redux/actions/UserManagement/AdminAccess';
import './index.css'
import Loader from '../src/components/presentation/Loader/Loader';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false, keycloakData: '', token: '', user: "" };
  }

  onClickDismiss = key => () => {
    store.dispatch(closeSnackbar(key));
  }
  componentDidMount() {
    if (process.env.REACT_APP_AUTHORIZATION.toLowerCase() === 'true') {
      store.dispatch(adminAccess());
      const keycloak = Keycloak('/resource/keycloak.json');
      keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
        this.setState({ keycloak: keycloak, authenticated: authenticated });
        if (authenticated) {
          window.localStorage.setItem('token', keycloak.token);
          this.setState({
            token: keycloak.token
          })
        }
        const user = decode(keycloak.token);
        this.setState({ user });
        store.dispatch(logInUserInfo(user));
        const userName = user.preferred_username;
        this.setState({ keycloakData: keycloak });
        store.dispatch(userNameAction(userName));
      }).catch((error) => {
        return error;
      });
    } else {
      const userName = USER;
      store.dispatch(userNameAction(userName));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const state = store.getState();
    if (this.state.user && JSON.stringify(this.state.user) !== JSON.stringify(prevState.user)) {
      store.dispatch(getKeycloakGroups(state.adminAccess.access_token));
      store.dispatch(getLoginUserAssociateGroups(state.adminAccess.access_token, this.state.user.sub));
    }
  }
  render() {
    const { classes } = this.props;

    if (this.state.keycloak && this.state.authenticated || process.env.REACT_APP_AUTHORIZATION.toLowerCase() === 'false') return (
      <Provider store={store}>
        <MuiThemeProvider theme={TMSTheme}>
          <CssBaseline />
          <div style={{ height: "100vh" }}>
            <SnackbarProvider
              hideIconVariant={true}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              action={(key) => (
                <IconButton color="secondary" key="close-button" onClick={this.onClickDismiss(key)} size="small">
                  <CloseIcon />
                </IconButton>
              )}
              maxSnack={3}
              contentprops={{
                classes: {
                  message: 'snackbarContentStyle'
                }
              }}
            >
                <KeycloakContext.Provider value={this.state.keycloakData}>
                <Grid style={{ height: "100%" }}>
                  <Grid style={{ height: "97%" }}>
                    <AppContainer token={this.state.token} location={window.location} />
                  </Grid>
                  <Grid className={classes.gridStyle}>
                    <p className={classes.pStyle}> <span>&nbsp; &copy; &nbsp;</span>{new Date().getFullYear()}</p>
                  </Grid>
                </Grid>
              </KeycloakContext.Provider>
            </SnackbarProvider>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
    return (
      <>
        <Typography align='center' className={classes.typoGraphy}>
          <Loader />
        </Typography>
        <Typography align='center' >
          please wait...
        </Typography>
      </>
    )
  }
}


export default withStyles(AppStyle)(App);

