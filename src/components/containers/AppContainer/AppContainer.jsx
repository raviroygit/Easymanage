/* eslint-disable no-mixed-operators */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuList from '../Sidebar/MenuItems';
import Routing from '../Sidebar/Routing';
import UserMenu from '../UserMenu/UserMenu';
import '../../../static/styles/styles.css';
import Notifier from '../../presentation/Notifier/Notifier';
import Logo from '../../../static/images/pilotpark.png';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import RestrictDialog from '../UserMenu/RestrictDialog';
import Keycloak from '../../../lib/keycloak/context';
import { useDispatch, useSelector } from 'react-redux';
import { adminAccess } from '../../../redux/actions/UserManagement/AdminAccess';
import Loading from '../../presentation/Loader/Loader';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from '@material-ui/core';
import { COPY_RIGHT } from '../../../constants/constants';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    whiteSpace:"nowrap",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 100px)',
    overflow: 'hidden',
    marginTop: '68px',
    marginLeft: '10px'
  },
  contentSmallScreen: {
    flexGrow: 1,
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
    marginTop: '68px',
    marginLeft: '10px'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  imgPilotPark: { height: '50px', paddingTop: '5px', cursor: 'pointer' },
  menustyle: { height: 'calc(100vh - 100px)', overflowY: 'scroll' },
  backdrop: {
    display: "flex",
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1,
    flexDirection: "row",
    marginLeft: "35%",
    marginTop: "15%",
  },
}));

const AppContainer = ({ token }) => {
  const classes = useStyles();
  const [accessDenied, setAccessDenied] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const permission = useSelector(state => state.permission);
  const loginUserAssociateGroups = useSelector(state => state.loginUserAssociateGroups);
  const logInUserInfo = useSelector(state => state.logInUserInfo);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loader);
  const keycloack = useContext(Keycloak);
  const largeScreen = useMediaQuery('(min-width:1440px)');

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(adminAccess());
    handleOpenDenied();
  }, [token, keycloack])


  const handleOpenDenied = () => {
    let userRole;
    if (keycloack && keycloack.resourceAccess && keycloack.resourceAccess[process.env.REACT_APP_CLIENT_ID] && keycloack.resourceAccess[process.env.REACT_APP_CLIENT_ID].roles && keycloack.resourceAccess[process.env.REACT_APP_CLIENT_ID].roles.length >= 1) {
      userRole = keycloack.resourceAccess[process.env.REACT_APP_CLIENT_ID].roles;
      if (permission.role === userRole[0]) {
        setAccessDenied(false);
      }
    }
    if (keycloack && keycloack.resourceAccess && !keycloack.resourceAccess[process.env.REACT_APP_CLIENT_ID]) {
      setAccessDenied(true);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Notifier />
      <Router>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <Link href="/">
                <img className={classes.imgPilotPark} alt="Pilot Park"
                  src={Logo} />
              </Link>
            </Typography>
            <UserMenu token={token} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List >
            <MenuList drawerClose={open} className={classes.menustyle} />
          </List>
        </Drawer>
        {accessDenied === true || logInUserInfo && loginUserAssociateGroups && loginUserAssociateGroups.length === 1 ?
          null :
          <main className={largeScreen ? classes.content : classes.contentSmallScreen} >
            {isLoading && <Typography align='center' className={classes.backdrop}><Loading /></Typography>}
              <ErrorBoundary >
                <Routing className={classes.content} />
              </ErrorBoundary>
          </main>
        }

      </Router>
      {accessDenied === true || logInUserInfo && loginUserAssociateGroups && loginUserAssociateGroups.length === 1 ?
        <RestrictDialog
          open={true}
          context={keycloack}
          isRoleMissing={accessDenied ? true : false}
        />
        : null}
    </div>
  );
}

export default AppContainer;