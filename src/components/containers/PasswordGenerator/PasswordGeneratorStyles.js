export const PasswordGeneratorStyles = theme => ({

  paper: {
    height: '100%',
    paddingTop: '10%',
    marginBottom: '0%',
    width: '100%',
    marginRight: '3%',
    overflowX: 'hidden'
  },
  dialog: {
    margin: '70px'
  },
  root: {
    justifyContent: 'center'
  },
  numberField: {
    "& .MuiInputLabel-formControl": {
      transform: "none"
    },
  },
  imputlabel: {
    whiteSpace: 'nowrap',
    marginBottom: '10px'
  },
  textField: {
    width: '100%',
  },
  passwordTable: {
    height: "100%"
  },
  backButton: {
    marginLeft: "5px",
    fontSize:"18px",
    fontWeight: 900,
  },
  returnBox: {
    top: 70,
    right: 20,
    position: "fixed",
    opacity: "0.8",
    backgroundColor: "white",
    zIndex: 5,
  },
  inputGrid: {
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '1%'
  },
  rangeGrid: {
    marginLeft: '2%',
    marginRight: '2%',
  },
  typography: {
    marginTop: '25%',
  },
  dateGrid: {
    width: '50%'
  },
  buttonCancel: {
    marginTop: '5px',
    margin: '1%'
  },
  buttonGenerate: {
    marginRight: '45%',
    float: 'right',
  },
  buttonGrid: {
    marginBottom: '1%',
    marginTop: '3%'
  },
  fileTypo: {
    marginLeft: '-3%'
  },
  fileButton: {
    marginTop: '5%'
  },
  fileChoose: {
    marginLeft: '2%',
    marginRight: '2%',
  },
  maintainer: {
    marginLeft: '4%'
  },
  selectGrid: {
    marginTop: '2%'
  },
  rangeTypo: {
    marginLeft: '-3%'
  },
  superPass: {
    marginLeft: '-2%'
  },
  paperTable: {
    height: '200px'
  },
  card: {
    marginTop: '5%',
    margin: '10%'
  },
  password: {
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  span: {
    marginLeft: '5%'
  },
  heightClass: {
    height: '80%'
  },
  divContainer: {
    marginLeft: '7%',
  }
});


export const MenuProps = {
  PaperProps: {
    style: {
      minHeight: "50px",
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