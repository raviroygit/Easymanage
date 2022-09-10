export const FileUploaderStyles = theme => ({
  progressWrapper: {
    height: '10px',
    marginTop: '10px',
    width: '90%',
    float: 'left',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.corner,
    borderRadius: '4px',
    WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
  },

  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: theme.palette.background.original,
    textAlign: 'center',
    backgroundColor: '#5cb85c',
    WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease'
  },
  cancelButton: {
    marginTop: '5px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: theme.palette.colorGroup.black,
    textShadow: `0 1px 0 ${theme.palette.background.original}`,
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  },

  bslabel: {
    display: 'inline-block',
    maxWidth: '100%',
    marginBottom: '5px',
    fontWeight: 700
  },

  bsHelp: {
    display: 'block',
    marginTop: '5px',
    marginBottom: '10px',
    color: theme.palette.colorGroup.gray
  },
  bsHelp2: {
    marginLeft: '20px',
    display: 'block',
    marginTop: '5px',
    marginBottom: '10px',
    color: theme.palette.colorGroup.gray
  },

  bsButton: {
    fontSize: '12px',
    lineHeight: '1.5',
    borderRadius: '3px',
    color: theme.palette.background.original,
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    display: 'inline-block',
    padding: '6px 12px',
    marginBottom: 0,
    fontWeight: 400,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    backgroundImage: 'none',
    border: '1px solid transparent'
  },
  button: {
    width: '50%',
    display: 'block'
  },
  rightIcon: {
    marginLeft: 5,
    fontFamily: 'Soho Gothic Pro'
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
  chooseFileDiv: {
    display: 'inline-flex',
    width: '100%'
  },
  divStyle: {
    width: '120%', marginLeft: '20px', border: `1px solid ${theme.palette.colorGroup.lightGray}`
  },
  lableStyle: {
    marginTop: '7px',
    marginLeft: '7px'
  },
  snackbarColor: {
    background: theme.palette.error.main
  },
  snackbarColorSuccess: {
    background: theme.palette.secondary.main
  },
  btnStyle: {
    backgroundColor: theme.palette.background.original,
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: `${theme.palette.colorGroup.lightGray} !important`, color: theme.palette.error.main
    }
  },
  form: {
    marginBottom: '15px'
  },
  div1: {
    width: '80%', border: `1px solid ${theme.palette.colorGroup.lightGray}`
  },
  div5: {
    width: '80%', marginLeft: '20px', border: `1px solid ${theme.palette.colorGroup.lightGray}`
  },
  span: {
    fontFamily: 'Soho Gothic Pro', fontSize: '12px', marginLeft: '5px'
  },
  lable: {
    height: '40px'
  },
  div2: {
    width: '15%'
  },
  msgSpan: {
    'color': theme.palette.error.main
  },
  div3: {
    marginBottom: '15px', marginLeft: '20px'
  },
  div4: {
    'clear': 'left'
  },
  warningmsg: {
    color: theme.palette.error.main
  },
  badge: {
    color: theme.palette.error.main,
    marginRight: '100px',
    whiteSpace: 'nowrap',
    lineBreak: 'auto'
  }
});