export const ReportStyles = theme => ({

  paper: {
    position: 'absolute',
    top:10,
    right: 70,
    zIndex: 5,
    width: '200px',
    height: 'auto',
  },
  container: {
    overflowY: 'scroll',
    height: '300px',
  },
  formGroupRow: {
    marginLeft: '10px',
  },
  containerReport: {
    height: '100%'
  },
  paperReport: {
    width: '100%',
    height: "100%"
  },
  cityLabel: {
    width: '80%',
  },
  backButton: {
    marginLeft: "5px",
    fontSize:"18px",
    fontWeight: 900,
  },
  filterGrid: {
    top: 70,
    right: 70,
    position: "fixed",
    backgroundColor: "white",
    zIndex: 5,
  },
  filterIcon: {
  },
  outer_card: {
    width: '100%',
    height: '89vh',
    backgroundColor: theme.palette.background.original
  },
  inner_card: {
    width: '100%',
    height: '100%'
  },
  input_row: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    borderRadius: '24px'
  },

  input_txt: {
    width: '80%',
  },
  time_card: {
    width: '80%',
    padding: '1%'
  },
  button_container: {
    marginRight: '70px',
    display: 'flex',
    justifyContent: 'right'
  },
  reset_button: {
    width: '15vh',
  },
  search_box: {
    width: '100%',
    marginLeft: '3%',
    marginBottom: '2%',
    marginTop: '3%'
  },
  heading: {
    color: theme.palette.colorGroup.gray,
    marginLeft: "10%"
  },
  reportTableOuterBox: {
    height: "100%",
    backgroundColor: theme.palette.background.corner
  },
  returnBox: {
    top: 70,
    right: 20,
    position: "fixed",
    opacity: "0.8",
    backgroundColor: "white",
    zIndex: 5,
  },
  tableBox: {
    height: "100%",
  },
  table: {
    height: "100%"
  },

  validationMessage: {
    color: "red",
    marginTop: '2rem',
    display: 'flex',
  }
});

export const MenuProps = {
  PaperProps: {
    style: {
      minHeight:"50px",
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