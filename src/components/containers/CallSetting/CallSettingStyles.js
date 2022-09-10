export const CallSettingStyles = (theme) => ({
  paper: {
    height: "calc(100vh - 70px)",
    backgroundColor: theme.palette.background.original,
  },
  root: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.palette.background.original,
  },
  panel1: {
    marginfLeft: "50px",
    width: "200px",
  },
  panel2: {
    marginfLeft: "50px",
    width: "200px",
  },
  grid1: {
    marginLeft: "50px",
  },
  gridDate: {
    marginRight: '2%'
  },
  applyButton: {
    marginTop: "4%",
    width: "10%",
    marginLeft: '2%',
    marginRight: "3%",
  },
  cancelButton: {
    marginTop: "4%",
    width: "10%",
    marginLeft: '45%'
  },
  accordionDetails: {
    marginLeft: "20px",
  },
  card: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
  inputGrid: {
    marginTop: "10%",
  },
  type: {
    marginRight: "2%",
    marginBottom: "4%",
    marginTop: "1%",
  },
  formDisplay: {
    display: "none",
  },
  formDisable: {
    display: "hidden",
  },
  formControl: {
    width: "100%",
    marginTop: "-10%",
  },
  indeterminateColor: {
    color: theme.palette.error.main,
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
  typeStyle: {
    width: "100%",
    marginBottom: "-6%",
  },
  terminalStyle: {
    height: "200px",
    width: "98%",
    marginTop: "1%",
    marginLeft: "1%",
    overflow: "hidden",
    borderRadius: "5px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  formControlStyle: { width: "100%" },
  groupSelectStyle: {
    height: "145px",
    width: "100%",
    overflow: "auto",
  },
  formHelperStyle: { marginTop: "-5%" },
  helperTextStyle: { marginTop: "7%" },
  dateTimeHelperTextStyle: { marginTop: "0%", color: theme.palette.error.main },
  keyboardDTPstyle: { width: "100%", marginTop: "10%" },
  label1Style: { marginLeft: "2%" },
  menuItem1: { height: "21%" },
  checkboxIconCheck: {
    marginTop: "10px",
    marginBottom: "-5px",
    color: theme.palette.secondary.main,
  },
  checkboxIcoUncheck: {
    marginTop: "10px",
    marginBottom: "-5px",
    color: theme.palette.colorGroup.black,
  },
  checkboxIconHalfcheck: {
    marginTop: "10px",
    marginBottom: "-5px",
    color: theme.palette.secondary.main,
  },
  expandCloseIcon: {
    color: theme.palette.colorGroup.black,
    marginRight: "-10px",
    marginTop: "10px",
    marginBottom: "-5px",
  },
  expandOpenIcon: {
    color: theme.palette.colorGroup.gray,
    marginRight: "-10px",
    marginTop: "10px",
    marginBottom: "-5px",
  },
  callScheduleBox: {
    display: "flex",
  },
  callScheduleButton: {
    marginLeft: "auto",
    padding: "2%",
    marginBottom: "-4%",
    color: theme.palette.colorGroup.gray,
  },
  callScheduleOuterBox: {
    height: "100%",
    backgroundColor: theme.palette.background.original,
    overflow: 'hidden'
  },
  returnBox: { height: "3%" },
  returnButton: {
    backgroundColor: theme.palette.background.original, color: theme.palette.colorGroup.black, border: 'none',
  },
  backBtn: {
    height: "15px",
    width: "15px"
  },
  scheduleTableBox: {
    height: "100%",
    backgroundColor: theme.palette.background.original,
  },
  errorContainer: {
    marginTop: '2%',
    marginLeft: '3%',
    float: 'left'
  },
  errorAction: {
    color: theme.palette.error.main
  },
  gridDateTime: {
    marginTop: '-4%',
    marginRight: '2%'
  },
  addIcon: {
    top: 70,
    right: 25,
    position: "fixed",
    opacity: "0.8",
    backgroundColor: theme.palette.background.original,
    zIndex: 5,
  },
  iconOnTop: {
    color: theme.palette.colorGroup.black,
  },
  callSettingsDialogStyle: {
    width: '60%',
    marginLeft: '20%',
    marginRight: "00%",
  },
  content: {
    marginLeft: '2%',
    marginRight: '2%',
    overflow: 'hidden'
  },
  allCheckedGroup: {
    marginLeft: '1.5%'
  },
});

export const MenuProps = {
  PaperProps: {
    style: {
      minHeight: "50px",
      maxHeight: "120px",
      maxWidth: "auto",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};