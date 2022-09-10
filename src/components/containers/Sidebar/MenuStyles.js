export const MenuStyles = theme => ({
  link: {
    textDecorationLine: 'none',
    color: theme.palette.colorGroup.gray,
    '&:hover': {
    }
  },
  selected: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  subgroup: {
    marginLeft: '45px'
  },
  sidebarText: {
    marginRight: "5px"
  },
  sidebarIcon: {
    minWidth: "40px",
  },
});