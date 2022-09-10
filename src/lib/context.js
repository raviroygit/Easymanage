import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GREEN, COLOR_WHITE, LIGHT_GRAY, SLIGHT_GRAY } from '../constants/constants';

let TMSTheme = createTheme({
  palette: {
    primary: { main: COLOR_BLUE },
    secondary: { main: COLOR_GREEN },
    background: {
      original: COLOR_WHITE,
      corner: SLIGHT_GRAY,
    },
    colorGroup: {
      black: COLOR_BLACK,
      gray: COLOR_GRAY,
      lightGray: LIGHT_GRAY
    },
    error: { main: red[500] }

  },

  typography: {
    useNextVariants: true,
    fontFamily: "SohoGothicPro-Medium"
  },

  appBar: {
    color: COLOR_WHITE
  },

  card: {
    fontWeight: 600
  },

  flatButton: {
    fontWeight: 600
  },

  /* spell-checker: disable */
  subheader: {
    /* spell-checker: enable */
    fontWeight: 600
  },
  props: {
    MuiTypography: {
      className: 'innerAction'
    }
  },
  overrides: {
    MuiDialogContent: {
      root: {
        overflowY: "none"
      }
    },
    MuiDialogTitle: {
      root: {
        color: COLOR_BLUE,
        backgroundColor: LIGHT_GRAY,
        borderRadius: "5px",
        margin: '0px 1px 5px 1px',
        boxShadow: "0px 4px 4px -2px rgba(122,113,122,0.59)"
      },
    },
    MuiDialogActions: {
      root: {
        borderRadius: "5px",
        margin: "0px 12px",
        "& .innerAction": {
          color: red[500],
          marginRight: "auto",
        }
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.2)'
      }
    }
  }
});

TMSTheme = responsiveFontSizes(TMSTheme);

export default TMSTheme;
