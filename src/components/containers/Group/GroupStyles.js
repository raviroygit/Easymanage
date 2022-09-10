export const GroupStyles = theme => ({
  paper: {
    minHeight: '10vh',
    maxHeight: '100vh',
    marginTop: '0px',
    overflow: 'hidden'
  },
  dialog: {
    margin: '5%',
    marginLeft: "20%",
    overflow: "hidden"
  },
  root: {
    justifyContent: 'center'
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    float: 'right',
    alignItems: 'center',
  },
  treeView: {
    height: '93%'
  },
  openIconDiv: {
    marginLeft: "10px"
  },
  closeIcon: {
    cursor: "pointer",
  },
  openIcon: {
    position: 'absolute',
    cursor: "pointer",
  },
  mainGrid: {
    overflow: 'hidden'
  },
  groupType: {
    width: "100%",
  },
  multiSelect: {
    width: '100%',
    position: 'relative'
  },
  formHeading: {
    backgroundColor: theme.palette.colorGroup.lightGray,
    marginBottom: '30px'
  },
  heading: {
    backgroundColor: theme.palette.colorGroup.lightGray, marginBottom: '30px', margin: '5px'
  },
  addIconContent: {
    marginTop: '50px',
    marginLeft: '20%',
    width: '50px'
  },
  addIconDialog: {
    position: 'fixed',
    width: '150px',
    marginLeft: "6%",
    marginTop: '0%',
    zIndex: '1',
  },
  groupStyle: {
    cursor: 'pointer',
    "&:hover": {
      background: theme.palette.colorGroup.lightGray
    },
  },
  groupDropdownGrid: {
    margin: '6%'
  },
  addIconDialogContent: {
    backgroundColor: theme.palette.secondary.main
  },
  groupField: {
  },
  errorContainer: {
    flex: 'auto'
  },
  errorAction: {
    color: theme.palette.error.main,
    marginLeft: '18px'
  },
  groupNameStyle: {
    marginTop: "4px"
  },
  subGroupNameStyle: {
  },
  subGroupRow: {
    marginTop: '-0.7%'
  },
  chips: {
    width: '100%',
  },
  terminalChips: {
    width: '100%',
  },
  addSubGroupButton: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    marginLeft: '65%'
  },
  fieldAlign: {
    marginTop: "0.5%"
  },
  chip: {
    color: theme.palette.colorGroup.black
  },
  regionState: {
    width: "100%",
    border: "none",
    borderBottom: "",
    color: theme.palette.colorGroup.gray,
    fontSize: "15px",
  },
  dataTableBox: {
    height: "auto",
  },
  lgScreen: {
    height: "100vh",
  },
  merchantDrawerBox: {
    overflow: 'hidden',
    height: "100%",
  },
  merchantCard: {
    height: "89vh",
    width: "100%"
  },
  drawerBoxInner: {
    height: "91vh",
  },
  drawerBoxInnerLeftGrid: {
    height: "100%",
  },
  parameterType: {
    width: "100%",
  },
  drawerCard: {
    height: "7%",
    borderBottom: `1px solid ${theme.palette.background.corner}`
  },
  countryStyle: {
    width: "100%",
    border: "none",
    borderBottom: `1px solid ${theme.palette.colorGroup.gray}`,
    color: theme.palette.colorGroup.gray,
    fontSize: "15px",
    marginTop: "4%",
    boxShadow: "none",
    "&&:hover": {
      borderBottom: `2px solid ${theme.palette.colorGroup.black}`,
    },
    "&&:focus": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      boxShadow: "none",
      outline: "none"
    }
  },
  addUserHeading: {
    borderRadius: "5px",
    margin: '1px',
  },
  menu: {
    marginTop: '1%',
    position: 'fixed'
  },

  rootLabel: {
    color: "#295EA7",
    backgroundColor: "#295EA7"
  }

});

export const MenuProps = {
  PaperProps: {
    style: {
      minHeight:"auto",
      maxHeight: "120px",
      width: "250px",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

export const MenuPropsReactWindow = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};