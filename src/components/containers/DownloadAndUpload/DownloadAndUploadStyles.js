export const DownloadAndUploadStyles = theme => ({

  paper: {
    minHeight: '100%',
    height: '100%',
    marginTop: '0px',
    backgroundColor: theme.palette.background.original,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  heading: {
    width: '100%'
  },
  searchField: {
    top: '10px', position: 'absolute', padding: '3px', marginLeft: '85%'
  },
  iconChange: {
    marginLeft: '96.5%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.original,
    borderRadius: "34px",
    marginRight: "1%",
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.primary.main
    },
    height: "94%",
    width: "2.5%",
  },
  btnStyle: {
    backgroundColor: theme.palette.background.original,
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: `${theme.palette.colorGroup.lightGray} !important`, color: theme.palette.error.main
    }
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
    height: '100%',
    fontFamily: 'Soho Gothic Pro'
  },
  span: {
    fontFamily: 'Soho Gothic Pro', fontSize: '12px', marginLeft: '5px'
  },
  lable: {
    height: '40px'
  },
  diaContent: {
    width: '700px',
    height: 'auto',
  },
  grid: {
    marginTop: '20px'
  },
  box: {
    marginLeft: '2%',
    marginRight: '2%'
  },
  uploadFileBox: {
    paddingBottom: "1%"
  },
  fileTableBox: {
    height: "100%",
  },
  DUOuterBox: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.background.original,
  },
  btnBox: {
    height: "5%",
  },
  tableBox: {
    height: "100%",
  },
  addIcon: {
    top: 70,
    right: 20,
    position: "fixed",
    opacity: "0.8",
    backgroundColor: theme.palette.background.original,
    zIndex: 5,
  },
  type: {
    marginTop: '-1.2%'
  },
  errorMsg: {
    color: theme.palette.error.main,
    marginLeft: '18px'
  },
  errorContainer: {
    display: 'flex',
    float: 'left',
  },
  cancelButton: {
    marginRight: '3%'

  },
  addUserHeading: {
    borderRadius: "5px",
    margin: '1px',
  },
})

export const MenuProps = {
  PaperProps: {
    style: {
      minHeight: "20px",
      maxHeight: "60px",
      width: "auto",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};
