export const TerminalDetailStyle = (theme) => ({
  [theme.breakpoints.down('xl')]: {
    root: {
      width: "100%",
      minWidth: "400px",
      height: "100%",
      backgroundColor: theme.palette.background.original,
      overflowY: "hidden"
    },
    root2: {
      height: "100%",
      backgroundColor: theme.palette.background.original
    },
    card: {
      width: "100%",
      height: "60%",
      color: theme.palette.colorGroup.gray,
      borderRadius: "8px",
      borderBottom: `4px solid ${theme.palette.background.original}`,
    },
    card1: {
      color: theme.palette.colorGroup.gray,
      width: "100%",
      height: "40%",
      borderRadius: "12px",
      borderTop: `4px solid ${theme.palette.background.original}`,
    },
    tabStyles: {
      width: "95%"
    },
  },
  [theme.breakpoints.up('md')]: {
    root: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.background.original
    },
    root2: {
      height: "100%",
      backgroundColor: theme.palette.background.original
    },
    card: {
      width: "70%",
      color: theme.palette.colorGroup.gray,
      height: "100%",
      borderRadius: "8px",
      border: `1px solid ${theme.palette.background.original}`,
    },
    card1: {
      width: "30%",
      height: "100%",
      borderRadius: "12px",
      color: theme.palette.colorGroup.gray,
      border: `1px solid ${theme.palette.background.original}`,
    },
    tabStyles: {
      marginLeft: "10px",
      width: "95%",
    },
  },
  listTextStyle: {
    paddingLeft: "10px",
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word'
  },
  listText: {
    fontSize: "18px",
    paddingLeft: "10px"
  },
  tabRow: {
    display: "flex",
  },
  redirect: {
    border: "none",
    marginLeft: "5px",
    marginTop: "5px",
    opacity: "0.8",
    backgroundColor: theme.palette.background.original,
  },
  root3: {
    fontFamily: "consolas, sans-serif",
    textAlign: "center",
    position: "relative",
    width: "100%",
    height: "250px",
  },
  pieCard: {
    color: theme.palette.colorGroup.lightGray,
    backgroundColor: '#1e847f',
    width: '100%',
    textAlign: 'center',
  },
  technicalText: {
    color: theme.palette.colorGroup.lightGray,
    backgroundColor: '#1e847f',
    textAlign: 'center'
  },
  tab: {
    minWidth: "12px",
  },
  barChartRadial: {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  },
  tabBox: {
    '& .MuiBox-root': {
      // padding: '10px 0px 0px 0px',
      marginTop: "10px"
    },
  },
  backButton: {
    marginLeft: "5px",
    fontSize: "18px",
    fontWeight: 900,
  },
  cardApps: {
    minHeight: 'calc(100vh - 100px)',
    height: 'calc(100vh - 100px)',
    overflowY: "auto",
    marginTop: "10px"
  }
});
