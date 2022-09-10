/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AccountCircle, Language, ExitToApp, AssignmentInd as ProfileIcon } from '@material-ui/icons';
import { IconButton, Menu, MenuItem, Typography, Grid } from '@material-ui/core';
import LanguageSelection from '../LanguageDialog/LanguageDialog';
import { loadTranslations, setLocale, syncTranslationWithStore, I18n } from 'react-redux-i18n';
import { LanguageAction } from '../../../redux/actions/i18n/LanguageAction';
import store from '../../../redux/store/store';
import Translation from '../../../i18n/index';
import { userMenuStyles } from './UserMenuStyles';
import KeycloakContext from '../../../lib/keycloak/context';
import decode from "jwt-decode";

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

class UserMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLang: false,
      showMenu: false,
      subMenuExpanded: false,
      userInfo: '',
      open: false
    };
  }
  static contextType = KeycloakContext;

  componentDidUpdate(prevProps) {

    if (prevProps.language.iso !== this.props.language.iso) {
      this.props.setLocale(this.props.language.iso);
    }
    if (this.props.token && this.props.token !== prevProps.token) {
      this.setState({
        userInfo: decode(this.props.token)
      });
      if (this.state.userInfo && this.state.userInfo.resource_access) {
        this.setState({
          open: true
        });
      }
    }
  }

  lang = () => {
    if (!this.state.showLang) {
      this.setState({ showLang: true, subMenuExpanded: true });
    }
  }

  langMouseOver = () => {
    if (!this.state.showLang && this.state.subMenuExpanded) {
      this.setState({ showLang: true, subMenuExpanded: false, showMenu: true });
    }
  }

  onProjectMouseOver = () => {
    if (!this.state.showProject && this.state.subMenuExpanded) {
      this.setState({ showProject: true, subMenuExpanded: false, showMenu: true });
    }
  }

  componentDidMount() {
    syncTranslationWithStore(store);
    this.props.loadTranslations(Translation);
    this.props.setLocale(this.props.language.iso);
    this.props.languageChange(this.props.language);
  }

  handleNestedClose = () => {
    if (this.state.showLang) {
      this.setState({ showLang: false, showMenu: false });
    }

    this.setState({ subMenuExpanded: true });
  }

  onProjectChange = (event, selectedProject) => {
    // todo
  }

  // eslint-disable-next-line no-unused-vars
  onLanguageChange = lang => {
    this.setState({ showLang: false, showMenu: false, subMenuExpanded: false });
  }

  onLogoutClick = () => {
    if (process.env.REACT_APP_AUTHORIZATION === 'true') {
      this.context.logout();
    }
  }

  onMouseOverLogout = () => {
    //todo
  }

  render() {
    return (
      <WithState >
        {({ anchorEl, updateAnchorEl }) => {
          const open = Boolean(anchorEl);

          const handleClose = () => {
            updateAnchorEl(null);
          };

          return (
            <React.Fragment>
              <div style={{ ...userMenuStyles.infoDiv }} >
                <Grid
                  container
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="flex-end"
                >
                  <Grid style={{ ...userMenuStyles.projectInfo }}>
                    <Typography
                      style={{ ...userMenuStyles.roleTypography }}
                    >ROLE
                    </Typography>
                    <Typography
                      style={{ ...userMenuStyles.projRoleSeparator }}
                    >|
                    </Typography>
                    <Typography
                      style={{ ...userMenuStyles.roleTypography }}
                    >
                      {this.state.userInfo && this.state.userInfo.resource_access && this.state.userInfo.resource_access[process.env.REACT_APP_CLIENT_ID] && this.state.userInfo.resource_access[process.env.REACT_APP_CLIENT_ID].roles && this.state.userInfo.resource_access[process.env.REACT_APP_CLIENT_ID].roles.length > 0 ?
                        this.state.userInfo.resource_access[process.env.REACT_APP_CLIENT_ID].roles[0] : null}
                    </Typography>
                  </Grid>
                  <Grid style={{ ...userMenuStyles.projectInfo }}>
                    <Typography
                      style={{ ...userMenuStyles.roleTypography }}
                    >
                      {this.props.loginUserAssociateGroups && this.props.loginUserAssociateGroups.length > 0 && this.props.loginUserAssociateGroups[0].name} | {this.state.userInfo ? this.state.userInfo.preferred_username : null}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <IconButton id='user_menu' onClick={e => {
                updateAnchorEl(e.currentTarget);
                this.setState({ showMenu: true, subMenuExpanded: false });
              }} style={userMenuStyles.iconButton}>
                <AccountCircle style={userMenuStyles.accountCircle} />
              </IconButton>
              <Menu style={userMenuStyles.menu} anchorEl={anchorEl} open={open && this.state.showMenu} onClose={handleClose}>
                <MenuItem
                  key="userName"
                  style={{ ...userMenuStyles.userNameTypography }}>
                  <ProfileIcon style={userMenuStyles.assignment} />
                  {this.state.userInfo ? this.state.userInfo.preferred_username : null}
                </MenuItem>
                <MenuItem key="language" onClick={this.lang} onMouseOver={this.langMouseOver}>
                  <Language style={userMenuStyles.language} />
                  {I18n.t('USER_MENU.LANGUAGE')}
                </MenuItem>
                <MenuItem key="logout" onClick={this.onLogoutClick} onMouseOver={this.onMouseOverLogout}>
                  <ExitToApp style={userMenuStyles.exitToApp} />
                  {I18n.t('USER_MENU.LOGOUT')}
                </MenuItem>
              </Menu>
              {
                this.state.showLang &&
                <Menu style={userMenuStyles.extendedMenu1} anchorEl={anchorEl} open={this.state.showLang} onClose={this.handleNestedClose}>
                  <LanguageSelection onSelect={lang => this.onLanguageChange(lang)} />
                </Menu>
              }

            </React.Fragment>
          );
        }}
      </WithState>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.language,
    i18n: state.i18n,
    loginUserAssociateGroups: state.loginUserAssociateGroups,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setLocale: setLocale,
    languageChange: LanguageAction,
    loadTranslations: loadTranslations,

  }, dispatch);
}

UserMenu.propTypes = {
  // Redux State
  language: PropTypes.object,

  // Redux Actions
  setLocale: PropTypes.func,
  languageChange: PropTypes.func,
  loadTranslations: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);