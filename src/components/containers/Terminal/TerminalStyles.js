export const TerminalStyles = (theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    width: "100%",
  },
  searchField: {
    top: "10px",
    position: "absolute",
    padding: "3px",
    marginLeft: "85%",
  },
  progressWrapper: {
    height: "10px",
    marginTop: "10px",
    width: "90%",
    float: "left",
    overflow: "hidden",
    backgroundColor: theme.palette.background.corner,
    borderRadius: "4px",
    WebkitBoxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
  },

  progressBar: {
    float: "left",
    width: "0",
    height: "100%",
    fontSize: "12px",
    lineHeight: "20px",
    color: theme.palette.background.original,
    textAlign: "center",
    backgroundColor: "#5cb85c",
    WebkitBoxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    boxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    WebkitTransition: "width .6s ease",
    Otransition: "width .6s ease",
    transition: "width .6s ease",
  },
  cancelButton: {
    marginTop: "5px",
    WebkitAppearance: "none",
    padding: 0,
    cursor: "pointer",
    background: "0 0",
    border: 0,
    float: "left",
    fontSize: "21px",
    fontWeight: 700,
    lineHeight: 1,
    color: theme.palette.colorGroup.black,
    textShadow: `0 1px 0 ${theme.palette.background.original}`,
    filter: "alpha(opacity=20)",
    opacity: ".2",
  },

  bslabel: {
    display: "inline-block",
    maxWidth: "100%",
    marginBottom: "5px",
    fontWeight: 700,
  },

  bsHelp: {
    display: "block",
    marginTop: "5px",
    marginBottom: "10px",
    color: theme.palette.colorGroup.gray,
  },
  bsHelp2: {
    marginLeft: "20px",
    display: "block",
    marginTop: "5px",
    marginBottom: "10px",
    color: theme.palette.colorGroup.gray,
  },

  bsButton: {
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "3px",
    color: theme.palette.background.original,
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    display: "inline-block",
    padding: "6px 12px",
    marginBottom: 0,
    fontWeight: 400,
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    backgroundImage: "none",
    border: "1px solid transparent",
  },
  button: {
    width: "50%",
    display: "block",
  },
  rightIcon: {
    marginLeft: 5,
    fontFamily: "Soho Gothic Pro",
  },
  uploadInput: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    opacity: 0,
    height: "100%",
    fontFamily: "Soho Gothic Pro",
  },
  chooseFileDiv: {
    display: "inline-flex",
    width: "100%",
  },
  divStyle: {
    width: "120%",
    marginLeft: "20px",
    border: `1px solid ${theme.palette.colorGroup.lightGray}`,
  },
  lableStyle: {
    marginTop: "7px",
    marginLeft: "7px",
  },
  snackbarColor: {
    background: theme.palette.error.main,
  },
  snackbarColorSuccess: {
    background: theme.palette.secondary.main,
  },
  btnStyle: {
    backgroundColor: theme.palette.background.original,
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: `${theme.palette.colorGroup.lightGray} !important`,
      color: theme.palette.error.main,
    },
  },
  form: {
    marginBottom: "15px",
  },
  div1: {
    width: "80%",
    border: `1px solid ${theme.palette.colorGroup.lightGray}`,
  },
  div5: {
    width: "80%",
    marginLeft: "20px",
    border: `1px solid ${theme.palette.colorGroup.lightGray}`,
  },
  span: {
    fontFamily: "Soho Gothic Pro",
    fontSize: "12px",
    marginLeft: "5px",
  },
  lable: {
    height: "40px",
  },
  div2: {
    width: "15%",
  },
  msgSpan: {
    color: theme.palette.error.main,
  },
  div3: {
    marginBottom: "15px",
    marginLeft: "20px",
  },
  div4: {
    clear: "left",
  },
  warningmsg: {
    color: theme.palette.error.main,
  },
  dialog: {
    margin: "70px",
  },
  errorDisplay: {
    color: theme.palette.error.main,
    marginRight: "20%",
  },
  import: {
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
  },
  ImportButton: {
    marginTop: "5%",
    marginLeft: "20%",
    marginRight: "20%",
    float: "right",
  },
  uploadButton: {
    marginLeft: "10px",
  },
  box: {
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "3%",
  },
  errorHandler: {
    marginTop: "2%",
    marginLeft: "20%",
    marginRight: "20%",
  },
  activeInactiveTerminal: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.original,
    border: "none",
    borderRadius: "5px",
    margin: "-20px 10px 20px 10px",
    width: "7%",
    height: "5%",
  },
  importBox: {
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "2%",
    border: "none",
  },
  importBoxHeading: {
    padding: "10px",
    backgroundColor: theme.palette.background.corner,
    borderRadius: "5px",
    color: "#b6c1c2",
  },
  TerminalPaper: {
    height: "100%",
  },
  importList: {
    height: "8%",
    display: "flex",
    flexDirection: "row",
  },
  terminalDataTable: {
    height: "100%",
    borderTop: "1px solid theme.palette.background.corner",
    backgroundColor: theme.palette.background.original,
  },
  importTitle: {
    marginLeft: "auto",
    marginRight: "1%",
    color: theme.palette.colorGroup.gray,
    marginTop: "0.8%",
    fontSize: "120%",
  },
  importButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.original,
    borderRadius: "30px",
    marginRight: "3%",
    cursor: "pointer",
    marginTop: "1.7%",
    "&:hover": {
      background: theme.palette.primary.main
    },
    margin: "auto",
    height: "50%",
    width: "7%",
  },
  importIcon: {
    marginLeft: '80%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.original,
    borderRadius: "30px",
    marginRight: "3%",
    cursor: "pointer",
    marginTop: "1.7%",
    "&:hover": {
      background: theme.palette.primary.main
    },
    margin: "auto",
    width: "7%",
    height: "50%"
  },
  terminalHeadingText: {
    color: theme.palette.primary.main,
    marginLeft: "1%",
    marginRight: "auto",
    marginTop: "-0%",
  },
  typographyStyle: {
    padding: "10px",
    backgroundColor: theme.palette.background.corner,
    borderRadius: "5px",
    color: theme.palette.primary.main,
  },
  typographyStyle1: { color: theme.palette.error.main, marginLeft: "18px" },
  resetPasswordErrorMessage: { color: theme.palette.error.main, marginLeft: "18px" },
  noErrorMessage: { display: "none" },
  card: {
    backgroundColor: theme.palette.background.corner, marginBottom: '30px'
  },
  dialogContent: {
    marginBottom: '50px'
  },
  container: {
    marginBottom: '50px'
  },
  groupSelect: {
    width: '100%',
    marginTop: '4px'
  },
  tls: {
    width: '100%',
    marginTop: '1%'
  },
  commentField: {
    marginTop: '1%'
  },
  statusSelect: {
    width: '100%'
  },
  validationMessage: {
    color: theme.palette.error.main, marginLeft: '18px'
  },
  terminalAccessLogsTable: {
    height: "85%",
    borderTop: `1px solid ${theme.palette.background.corner}`,
    overflow: 'hidden',
    marginTop: '-3%'
  },
  groupButtonStyle: {
    top: 70,
    right: 20,
    position: "fixed",
    opacity: "0.8",
    backgroundColor: theme.palette.background.original,
    zIndex: 5,
  },
  groupButtonStyleAdd: {
    top: 70,
    right: 70,
    position: "fixed",
    opacity: "0.8",
    backgroundColor: theme.palette.background.original,
    zIndex: 5,
  },
  speedDial: {
    top: 63,
    right: 120,
    zIndex: 5,
    position: "fixed",
    "& .MuiSpeedDial-fab": {
      backgroundColor: theme.palette.background.original,
      opacity: "0.8",
      "&:hover": {
        backgroundColor: theme.palette.background.corner,
      }
    }
  },
  selectTerminalIcon: {
    color: theme.palette.colorGroup.black,
  },
  moveCardStyle: {
    backgroundColor: theme.palette.background.corner,
    marginBottom: "30px"
  },
  dialogTitleStyle: {
    color: theme.palette.primary.main,
  },
  moveSelectStyle: {
    width: "95%",
  },
  aasInputGridStyle: {
    marginTop: "5px"
  },
  aasSelectStyle: {
    width: "95%"
  },
  moveSelectTerminalStyle: {
    maxHeight: "140px",
  },
  terminaldetailDiv: {
    width: "100%",
    height: "100%",
  },
  resetActionGrid: {
    marginRight: "auto"
  },
  resetPasswordButton: {
    border: `1px solid ${theme.palette.colorGroup.gray}`,
    margin: "0px 5px"
  },
  resetDatePicker: {
    width: "100%"
  }

});

export const MenuProps = {
  PaperProps: {
    style: {
      minHeight:"50px",
      maxHeight: "120px",
      width: "auto",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};