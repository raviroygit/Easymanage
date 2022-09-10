export const DashBoardStyle = (theme) => ({
  [theme.breakpoints.down('md')]: {
    mapOuterBox: {
      width: "100%",
      height: "100%",
    },
    dashboardPaper: {
      height: "100%",
      backgroundColor: theme.palette.background.original
    },
    mainContainer: {
      height: "100%",
      width: "100%",
      overflow: "auto",
    },
    mapContainer: {
      height: "50%",
      width: "100%",
      minHeight: "300px",
      border: `2px solid ${theme.palette.background.corner}`,
      backgroundColor: theme.palette.background.original
    },
    statusContainer: {
      height: "50%",
      width: "100%",
      minHeight: "300px",
      border: `2px solid ${theme.palette.background.corner}`,
      backgroundColor: theme.palette.background.original,
    },
    countPieHeading: {
      display: "flex",
      justifyContent: "space-between",
    },
    statsPie: {
      width: "100%",
      height: "80%"
    },
    statsHeading: {
      fontSize: "18px",
      color: theme.palette.colorGroup.gray,
      padding: "3%",
      marginLeft: "2%",
    },
    refreshButton: {
      color: theme.palette.secondary.main,
      border: "none",
      backgroundColor: theme.palette.background.original,
      cursor: "pointer",
    },
    modelContainer: {
      height: "50%",
      width: "100%",
      minHeight: "300px",
      border: `2px solid ${theme.palette.background.corner}`,
      backgroundColor: theme.palette.background.original
    },
    modelTextBox: {
      height: "12%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    modelHeading: {
      textAlign: "center",
      padding: "1%",
      color: theme.palette.colorGroup.gray,
      fontSize: "18px",
      marginLeft: "2%",
    },
    modelPieBox: {
      width: "100%",
      height: "90%",
    },
    groupContainer: {
      height: "50%",
      width: "100%",
      minHeight: "300px",
      border: `2px solid ${theme.palette.background.corner}`,
      backgroundColor: theme.palette.background.original
    },
    groupType: {
      width: "15%",
      height: "100%",
      marginRight: "2%",
    },
    groupBarBox: {
      width: "100%",
      height: "90%",
    },
  },
  [theme.breakpoints.up('md')]: {
    mapOuterBox: {
      width: "100%",
      height: "100%",
    },
    dashboardPaper: {
      height: "100%",
      backgroundColor: theme.palette.background.corner
    },
    mainContainer: {
      height: "100%",
      width: "100%",
      overflow: "auto",
    },
    mapContainer: {
      height: "50%",
      width: "60%",
      border: `4px solid ${theme.palette.background.corner}`,
      backgroundColor: theme.palette.background.original
    },
    statusContainer: {
      height: "50%",
      width: "40%",
      border: `4px solid ${theme.palette.background.corner}`,
      backgroundColor: theme.palette.background.original,
    },
    countPieHeading: {
      display: "flex",
      justifyContent: "space-between",
    },
    statsPie: {
      width: "100%",
      height: "85%"
    },
    statsHeading: {
      fontSize: "18px",
      color: theme.palette.colorGroup.gray,
      padding: "3%",
      marginLeft: "2%",
    },
    modelContainer: {
      height: "50%",
      width: "40%",
      border: `4px solid ${theme.palette.background.corner}`,
      backgroundColor: theme.palette.background.original
    },
    modelTextBox: {
      height: "12%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    modelHeading: {
      textAlign: "center",
      padding: "1%",
      color: theme.palette.colorGroup.gray,
      fontSize: "18px",
      marginLeft: "2%",
    },
    modelPieBox: {
      width: "100%",
      height: "85%",
    },
    groupContainer: {
      height: "50%",
      width: "60%",
      minHeight: "300px",
      border: `4px solid ${theme.palette.background.corner}`,
      backgroundColor: theme.palette.background.original
    },
    groupType: {
      width: "15%",
      height: "100%",
      marginRight: "2%",
    },
    groupBarBox: {
      width: "100%",
      height: "85%",
    },
    pieChart: {
      height: 250,
      width: 250,
    },
    barChart: {
      width: 150,
      height: 40,
    },
    type: {
      whiteSpace: 'wrap',
    }
  },
  graphContainer: {
    height: "100%",
    width: "100%"
  },
});


export const MenuProps = {
  PaperProps: {
    style: {
      minHeight: "50px",
      maxHeight: "120px",
      minWidth: "20px",
      width: "auto",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};