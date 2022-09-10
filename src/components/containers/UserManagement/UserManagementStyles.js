export const UserManagementStyles = (theme) => ({
  userLogPage: {
    height: "100%",
    width: "100%",
  },
  userLogTitle: {
    fontSize: "18px",
    color: theme.palette.error.main,
    padding: "2px"
  },
  userTable: {
    height: "92%",
    border: `1px solid ${theme.palette.colorGroup.lightGray}`,
    backgroundColor: theme.palette.background.original
  },
  titleBox: {
    padding: "1%",
    height: "7%",
  },
  title: {
    fontSize: "18px",
    color: theme.palette.primary.main,
  },
  userList: {
    height: "100%",
    width: "100%",
    overflow: 'hidden'
  },
  userListTable: {
    height: "100%"
  },
  addIcon: {
    top: 70,
    right: 70,
    position: "fixed",
    opacity: "0.8",
    backgroundColor: theme.palette.background.original,
    zIndex: 5,
  },
  userSettings: {
    top: 70,
    right: 20,
    position: "fixed",
    opacity: "0.8",
    backgroundColor: theme.palette.background.original,
    zIndex: 5,
  },
  addUserDialog: {
    width: '55%',
    marginLeft: '30%',
    overflow: 'hidden'
  },
  rolesSelect: {
    marginTop: '1%',
    width: "100%"
  },
  validationMessage: {
    color: theme.palette.error.main,
  },
  temporaryPasswordForm:{
    width:"100%",
    marginTop:"4px",
  },
  content: {
    overflow: 'hidden',
    marginBottom: '5%'
  },
  resetPasswordDialogStyle: {
    width: '30%',
    marginLeft: '40%',
    overflow: 'hidden'
  },
  menuItems: {
    zIndex: '1', marginLeft: '76%', position: 'absolute', width: '6%'
  },
  item: {
    margin: '1%', cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.colorGroup.lightGray
    }
  },

  dialogActions: {
    marginTop: '-2%',
    marginLeft: '2%'
  },
  actionsForm: {
    display: 'flex',
    float: 'left',
    marginLeft: '2%'
  },
  menuButton: {
    marginLeft: '91%',
  },
  menu: {
    marginTop: '3%'
  },
  featuresPermissionDialog: {
    width: '40%',
    marginLeft: '40%',
    overflow: 'hidden'
  },
  chips: {
    maxHeight: '32px',
    display: "flex",
    flexWrap: "wrap",
    overflowY: 'hidden',
    overflowX: 'hidden'
  },
  list: {
    height: "200px",
    width: "98%",
    marginTop: "1%",
    marginLeft: "1%",
    overflowY: "auto",
    borderRadius: "5px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  stepperButtonDiv: {
    display: "flex",
    float: "right"
  },
  stepperButton:{
    marginTop:"10px",
    marginRight:"5px"
  },
  stepperDialog:{
    width:"100px"
  }
});

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "80px",
      width: "250px",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};