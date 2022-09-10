
import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  InputLabel,
  Grid,
  MenuItem,
  Paper,
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { I18n } from "react-redux-i18n";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStyles, MenuProps } from './ApplicationStyles';
import RichEditor from '../../presentation/TextEditor/TextEditor';
import { uploadApplicationFile } from '../../../redux/actions/Application/UploadApplicationAction'
import { getFilterList } from '../../../redux/actions/Report/getFilterLIst';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../../presentation/ProgressBar/ProgressBar';
import { assignAppsToTerminalAction } from '../../../redux/actions/Application/AssignAppsToTerminalAction';
import AppsDetailsTable from '../../presentation/DataTable/Table';

const useStyles = makeStyles(ApplicationStyles);

function getSteps(isEdit) {
  return [
    I18n.t('USER_MANAGEMENT.CREATE_USER'),
    I18n.t('USER_MANAGEMENT.GROUP_ASSIGN_TO_USER'),
    I18n.t('USER_MANAGEMENT.ROLE_MAPPING')
  ];
}
const ApplicationForm = (props) => {
  const { control } = useFormContext();
  const { classes } = useStyles(ApplicationStyles);
  const terminal = useSelector(state => state.filterList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilterList());
  }, []);

  const onChange = () => {

  }

  return (
    <>
      <Typography style={{ fontSize: "20px", marginBottom: "1rem" }}>AppDetails</Typography>
      <Grid container spacing={2} style={{ overflow: "hidden" }}>
        <Grid item xs={6} >
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                required
                id="title"
                fullWidth
                SelectProps={{ MenuProps: MenuProps }}
                name="title"
                {...field}
                label={I18n.t("FILE_UPLOAD.TITLE")}

              />
            )}
          />
        </Grid>
        <Grid item xs={6} >
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TextField
                id="file-type-select"
                name="type"
                required
                fullWidth
                {...field}
                SelectProps={{ MenuProps: MenuProps }}
                select
                label={I18n.t('FILE_UPLOAD.TYPE_HEADING')}
              >
                <MenuItem key='Application' value='Application'>{I18n.t('FILE_TYPE.APPLICATION')}</MenuItem>
                <MenuItem key='Kernel' value='Kernel'>{I18n.t('FILE_TYPE.KERNEL')}</MenuItem>
                <MenuItem key='OS' value='OS'>{I18n.t('FILE_TYPE.OS')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={6} >
          <Controller
            control={control}
            name="appType"
            render={({ field }) => (
              <TextField
                id="appType"
                SelectProps={{ MenuProps: MenuProps }}
                name="appType"
                {...field}
                select
                fullWidth
                label={I18n.t("FILE_UPLOAD.APP_TYPE")}
              >
                <MenuItem key='Android' value="Android">Android</MenuItem>
                <MenuItem key='IOS' value="IOS">IOS</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6} >
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <TextField
                id="price"
                SelectProps={{ MenuProps: MenuProps }}
                name="price"
                {...field}
                select
                fullWidth
                label={I18n.t("FILE_UPLOAD.PRICE")}
              >
                <MenuItem key='free' value="Free">Free</MenuItem>
                <MenuItem key='Paid' value="Paid">Paid</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6} >
          <Controller
            control={control}
            name="model"
            render={({ field }) => (
              <TextField
                id="model"
                SelectProps={{ MenuProps: MenuProps }}
                name="model"
                select
                fullWidth
                {...field}
                label={I18n.t("FILE_UPLOAD.MODEL")}
              >
                {terminal && terminal.terminalModel && terminal.terminalModel.length > 0 && terminal.terminalModel.map(x => (
                  <MenuItem key={x} value={x}>{x}</MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6} >
          <Controller
            control={control}
            name="businessCategories"
            render={({ field }) => (
              <TextField
                id="businessCategories"
                SelectProps={{ MenuProps: MenuProps }}
                name="businessCategories"
                {...field}
                select
                fullWidth
                label={I18n.t("FILE_UPLOAD.BUSINESS_CATEGORIES")}
              >
                <MenuItem key='POS' value="POS">POS</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid container>
          <InputLabel style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "12px" }}> {I18n.t("FILE_UPLOAD.DESCRIPTION")}</InputLabel>
          <Grid item xs={12} style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }}>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <RichEditor
                  className="textEditor"
                  onChange={onChange}
                />
              )}
            />
          </Grid>
        </Grid>


      </Grid>
    </>
  );
};

const FileUploadForm = (props) => {
  const { classes } = useStyles(ApplicationStyles);

  const handleSignInChosen = () => { };

  return (
    <Grid style={{ marginBottom: "120px" }}>
      <Typography style={{ fontSize: "20px", marginLeft: "4px", marginBottom: "10px" }}>File Upload</Typography>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: "40px", marginTop: "10px" }}>
          <Paper >
            <div  >
              <Button tooltip={I18n.t('UPLOAD.BROWSE')} variant="contained" color="primary" type="button" >
                <label  >{I18n.t('FILE_UPLOAD.CHOOSE_LOGO')}
                  <input hidden style={ApplicationStyles.uploadInput} type="file" accept=".jpg,.jpg,.png" name='file' id="file" onChange={e => props.handleLogoChosen(e.target.files[0])} />
                </label>
              </Button>
              <span >
                <label >{props.logoName}</label></span>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: "40px" }}>
          <Paper >
            <div >
              <Button tooltip={I18n.t('UPLOAD.BROWSE')} variant="contained" color="primary" type="button" >
                <label  >{I18n.t('FILE_UPLOAD.SCREENSHOTS')}
                  <input hidden style={ApplicationStyles.uploadInput} type="file" multiple="multiple" accept=".jpeg,.jpg,.png" name='file' id="file" onChange={e => props.handleScreenShotsChosen(e.target.files)} />
                </label>
              </Button>
              <span >
                <label >{props.screenShotsName}</label></span>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: "40px" }}>
          <Paper >
            <div  >
              <Button tooltip={I18n.t('UPLOAD.BROWSE')} variant="contained" color="primary" type="button" >
                <label  >{I18n.t('FILE_UPLOAD.CHOOSE_FILE')}
                  <input hidden style={ApplicationStyles.uploadInput} type="file" accept=".apk,.json,.zip" name='file' id="exampleInputFile" onChange={e => props.handleFileChosen(e.target.files[0])} />
                </label>
              </Button>
              <span >
                <label >{props.fileName}</label></span>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: "40px" }}>
          <Paper >
            <div  >
              <Button tooltip={I18n.t('UPLOAD.BROWSE')} variant="contained" color="primary" type="button" >
                <label  >{I18n.t('FILE_UPLOAD.SIGNING_KEY')}
                  <input hidden style={ApplicationStyles.uploadInput} type="file" accept=".apk,.json,.zip" name='file' id="exampleInputFile" onChange={e => handleSignInChosen(e.target.files[0])} />
                </label>
              </Button>
              <span >
                <label >{props.signInFileName}</label></span>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
const ReleaseDetails = (props) => {
  const { control } = useFormContext();
  const roles = useSelector(state => state.roles);
  const { classes } = useStyles(ApplicationStyles);

  const onChange = () => {

  }
  return (
    <Grid style={{ marginBottom: "60px" }}>
      <Typography style={{ fontSize: "20px", marginBottom: '20px' }}>Apps Details</Typography>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: "30px" }}>
          {/* <Controller
            control={control}
            name="releaseName"
            render={({ field }) => (
              <TextField
                id="releaseName"
                fullWidth
                SelectProps={{ MenuProps: MenuProps }}
                name="releaseName"
                {...field}
                label={I18n.t("FILE_UPLOAD.RELEASE_NAME")}
              />
            )}
          /> */}
          <AppsDetailsTable
            appResponse={props.appResponse}
            fileName={props.fileName}
          />
        </Grid>
      </Grid>
      <InputLabel style={{ marginTop: "10px" }}> {I18n.t("FILE_UPLOAD.RELEASE_NOTE")}</InputLabel>
      <Grid container>
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <RichEditor
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};


function getStepContent(step, handleFileChosen, handleLogoChosen, handleScreenShotsChosen, state, logoName, fileName, screenShotsName, appResponse) {
  switch (step) {
    case 0:
      return <ApplicationForm />;

    case 1:
      return <FileUploadForm
        handleFileChosen={handleFileChosen}
        handleLogoChosen={handleLogoChosen}
        handleScreenShotsChosen={handleScreenShotsChosen}
        logoName={logoName}
        fileName={fileName}
        screenShotsName={screenShotsName}
        state={state}
      />;
    case 2:
      return <ReleaseDetails
        fileName={fileName}
        appResponse={appResponse} />;
    default:
      return "unknown step";
  }
}

const UploadEditForm = (props) => {
  const { classes } = useStyles();
  const history = useHistory();
  const appResponse = useSelector(state => state.appResponse);

  const methods = useForm({
    defaultValues: {
      type: "",
      title: "",
      appType: "",
      price: "",
      model: "",
      description: "",
      releaseNote: '',
      businessCategories: '',
      releaseName: appResponse && appResponse.versionName ? appResponse.versionName : ""

    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps(props.isEdit);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoName, setLogoName] = useState("");
  const [screenShots, setScreenShots] = useState([]);
  const [screenShotsName, setScreenshotsName] = useState([]);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    validationMessage: "",
    messageType: "",
    username: "",
    uploadPercentage: 0,
    editor: false,
    isAdd: false,
    isSaveButtonDisabled: false,
  })


  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const onSaveClick = (details) => {
    if (!file) {
      setState({ validationMessage: I18n.t("FILE_UPLOAD.PLEASE_APPLICATION"), messageType: 'error' });
      return;
    }
    if (!logo) {
      setState({ validationMessage: I18n.t("FILE_UPLOAD.PLEASE_LOGO"), messageType: 'error' });
      return;
    }
    const progress = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total)
        if (percent <= 100) {
          setState({ uploadPercentage: percent })
        }
      }
    };
    const data = new FormData();
    screenShots && screenShots.length > 0 && screenShots.forEach(x => {
      data.append("screenShots", x);
    });
    data.append("file", file);
    data.append("type", details.type);
    data.append("description", details.description);
    data.append("releaseNote", details.releaseNote);
    data.append("appType", details.appType);
    data.append("price", details.price);
    data.append("title", details.title);
    data.append("logo", logo);
    data.append("businessCategories", details.businessCategories);
    data.append("model", details.model);
    dispatch(uploadApplicationFile(data, progress));
    // if (file && logo && state.uploadPercentage === 100) {
    //   setActiveStep(activeStep + 1);
    // };
    setState({ uploadPercentage: 0 });
  };

  const updateAppsDetails = () => {
    if (appResponse) {
      const data = {
        version: appResponse.versionName,
        versionCode: appResponse.versionCode,
        compileSdkVersion: appResponse.compileSdkVersion,
        package: appResponse.package,
        appsId: appResponse.id
      }
      dispatch(assignAppsToTerminalAction(data));
      handleReset();
    }
  }

  const handleNext = (data) => {
    if (activeStep === steps.length - 1) {
      updateAppsDetails();
    }
    if (activeStep === 0) {
      setActiveStep(activeStep + 1);
    }
    if (activeStep === 1) {
      onSaveClick(data);
      if (appResponse) {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setFile(null);
    setFileName("");
    setLogo(null);
    setLogoName("");
    setScreenShots(null);
    setScreenshotsName("");

    methods.reset({
      type: "",
      title: "",
      appType: "",
      price: "",
      model: "",
      description: "",
      validationMessage: "",
      uploadPercentage: 0
    });
    setState({ validationMessage: "" });
    setActiveStep(0);
  };


  const handleFileChosen = (file) => {
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (fileExtension === 'apk' || fileExtension === 'json' || fileExtension === 'zip') {
        setFile(file);
        setFileName(file.name);
      }
      else {
        setFileName('');
        props.enqueueSnackbar({
          message: I18n.t('APPLICATION.EXCEPT_ONLY'),
          options: {
            variant: 'warning'
          }
        });
      }
    } else {
      setFileName(null);
    };
  };

  const handleScreenShotsChosen = (file) => {
    const height = 500, width = 500, scResolution = true;
    findImageResolution(file[0], height, width, scResolution);

    if (file) {
      let screenShotsTmp = [], imageName = [], files = [...file];
      // eslint-disable-next-line array-callback-return
      files.map(x => {
        if (x) {
          const fileExtension = x.name.split('.').pop();
          if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg') {
            screenShotsTmp.push(x);
            imageName.push(x.name);
          } else {
            setScreenshotsName('');
            props.enqueueSnackbar({
              message: I18n.t('APPLICATION.EXCEPT_ONLY'),
              options: {
                variant: 'warning'
              }
            });
          };
          if (screenShotsTmp && screenShotsTmp.length > 0) {
            setScreenshotsName(imageName);
            setScreenShots(screenShotsTmp);
          }
        }
      })
    } else {
      setScreenshotsName(null);
    };

  };

  const findImageResolution = (file, height, width, isScResolution) => {
    const _URL = window.URL || window.webkitURL;
    const img = new Image();
    var objectUrl = _URL.createObjectURL(file);
    img.onload = function () {
      if (isScResolution && this.width * this.height > width * height) {
        setState({ validationMessage: I18n.t("FILE_UPLOAD.PLEASE_SELECT_SCREENSHOTS_SIZE") + `${height}px X ${width}px`, messageType: 'error' });
        return;
      } else {
        setState({ validationMessage: "", messageType: '' });
      };
      if (!isScResolution && this.width * this.height > width * height) {
        setState({ validationMessage: I18n.t("FILE_UPLOAD.PLEASE_SELECT_LOGO_SIZE") + `${height}px X ${width}px`, messageType: 'error' });
        return;
      } else {
        setState({ validationMessage: "", messageType: '' });
      }
      _URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  };
  const handleLogoChosen = (file) => {
    const height = 250, width = 150, scResolution = false;
    findImageResolution(file, height, width, scResolution);
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg') {
        setLogo(file);
        setLogoName(file.name);
      }
      else {
        setLogoName('');
        props.enqueueSnackbar({
          message: I18n.t('APPLICATION.EXCEPT_ONLY'),
          options: {
            variant: 'warning'
          }
        });
      }
    } else {
      setLogoName(null);
    };
  };

  const handleReturn = () => {
    history.push('/application');
  };

  useEffect(() => {

  }, [appResponse])


  return (
    <Grid style={{ overflow: "hidden" }}>
      {activeStep === steps.length ? (
        <>
          <Typography variant="h3" align="center">
            {I18n.t('FILE_UPLOAD.FILE_UPLOAD_SUCCESS')}
          </Typography>
          <Grid style={{ display: "flex", justifyContent: "center" }}>
            < Button
              style={{ marginTop: "10px", marginRight: "5px", display: "flex", justifyItems: "center" }}
              color="secondary"
              variant='contained'
              onClick={handleReset}
            >
              {I18n.t('ACTIONS.RESET')}
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep, handleFileChosen, handleLogoChosen, handleScreenShotsChosen, state, logoName, fileName, screenShotsName, appResponse)}
              <Typography style={{ color: "red" }}>
                {state.validationMessage}
              </Typography>
              <Grid container >
                <Grid item xs={12} sm={12}>
                  {activeStep === 1 && state.uploadPercentage > 0 ? <Box ><ProgressBar value={state.uploadPercentage} /></Box> : null}
                </Grid>
                <Grid item >
                  <div style={{ display: "flex" }}>
                    {activeStep === 0 && <Button
                      style={{ marginTop: "10px", marginRight: "5px", display: "flex", float: "right" }}
                      color="secondary"
                      variant='contained'
                      onClick={handleReturn}
                    >
                      {I18n.t('ACTIONS.CANCEL')}
                    </Button>}
                    {
                      isStepOptional(activeStep) && (
                        <Button
                          style={{ marginTop: "10px", marginRight: "5px" }}
                          onClick={handleBack}
                          color="secondary"
                          variant='contained'
                        >
                          {I18n.t('USER_MANAGEMENT.BACK_BUTTON')}
                        </Button>
                      )
                    }
                    <Button
                      style={{ marginTop: "10px", display: "flex", float: "right", position: "relative" }}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {activeStep === steps.length - 1 ? I18n.t('USER_MANAGEMENT.FINISH_BUTTON') : I18n.t('USER_MANAGEMENT.NEXT_BUTTON')}
                    </Button>
                  </div>

                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </>
      )
      }

    </Grid >
  );
};

export default UploadEditForm;