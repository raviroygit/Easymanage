export const AlertDialogStyles = theme => ({
  paper: {
    minHeight: 'calc(100vh - 100px)',
    height: 'calc(100vh - 100px)',
    marginTop: '0px',
    paddingBottom: '40px'
  },
  dialog: {
    width: '30%',
    marginLeft: '40%'
  },
  alertIcon: {
    color: theme.palette.error.main,
    fontSize: "80px"
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  alertComment: {
    width: "90%"
  },
})