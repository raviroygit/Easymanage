/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton, Grid, withStyles,
  Dialog,
  DialogContent,
  MenuItem,
  Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { I18n } from "react-redux-i18n";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import { PASSWORD_VALIDATOR, USER_NAME_VALIDATOR, EMAIL_VALIDATOR, NAME_VALIDATION } from '../../../constants/constants';
import { createUser } from '../../../redux/actions/UserManagement/CreateUser';
import { updateUser } from '../../../redux/actions/UserManagement/UpdateUser';
import { getUserAssociateGroups, resetUserAssociateGroups } from '../../../redux/actions/Group/GetUserAssociateGroup';
import { assignGroupToUser } from '../../../redux/actions/UserManagement/AssignGroupToUser';
import { deleteAssignGroupFromUser } from '../../../redux/actions/UserManagement/DeleteGroupFromUser';
import { getUserAssociateRole, resetUserAssociateRole } from '../../../redux/actions/UserManagement/GetUserAssociateRole';
import { roleMappingToUser } from '../../../redux/actions/UserManagement/RoleMappingToUser';
import { deleteUserRoleByUserID } from '../../../redux/actions/UserManagement/DeleteUserRole';
import { UserManagementStyles, MenuProps } from './UserManagementStyles';

const useStyles = makeStyles(UserManagementStyles);

function getSteps(isEdit) {
  return [
    I18n.t('USER_MANAGEMENT.CREATE_USER'),
    I18n.t('USER_MANAGEMENT.GROUP_ASSIGN_TO_USER'),
    I18n.t('USER_MANAGEMENT.ROLE_MAPPING')
  ];
}
const UserForm = (props) => {
  const { control } = useFormContext();
  const { classes } = useStyles(UserManagementStyles);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    this.setState({ temPassword: event.target.value, validationMessage: '', messageType: '' });
  };
  return (
    <>
      <Grid>
        <Grid container spacing={3} >
          <Grid item xs={4}>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  id="username"
                  label={I18n.t("USER_MANAGEMENT.USER_NAME")}
                  type="text"
                  name="username"
                  onChange={(e) => this.handleChange(e)}
                  required
                  {...field}
                />
              )}
            />

          </Grid>
          <Grid item xs={4}>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  id="firstName"
                  label={I18n.t('USER_MANAGEMENT.FIRST_NAME')}
                  type="text"
                  name="firstName"
                  onChange={(e) => this.handleChange(e)}
                  required
                  {...field}
                />
              )}
            />

          </Grid>
          <Grid item xs={4}>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  id="lastName"
                  label={I18n.t("USER_MANAGEMENT.LAST_NAME")}
                  type="text"
                  name="lastName"
                  onChange={(e) => this.handleChange(e)}
                  required
                  {...field}
                />
              )} />

          </Grid>
        </Grid>
        <Grid container spacing={3} >
          <Grid item xs={4}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  id="email"
                  label={I18n.t("USER_MANAGEMENT.EMAIL")}
                  type="email"
                  name="email"
                  onChange={(e) => this.handleChange(e)}
                  required
                  {...field}
                />
              )} />

          </Grid>

          <Grid item xs={4}>
            <Controller
              control={control}
              name="tempPassword"
              render={({ field }) => (
                <FormControl required>
                  <InputLabel htmlFor="temp-password">{I18n.t("USER_MANAGEMENT.TEMPORARY_PASSWORD")}</InputLabel>
                  <Input
                    id="tempPassword"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle temporary password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...field}
                  />

                </FormControl>
              )} />

          </Grid>
        </Grid>
      </Grid>


    </>
  );
};

const GroupForm = (props) => {
  const { control } = useFormContext();
  const { classes } = useStyles(UserManagementStyles);

  return (
    <>
      <Grid item xs={12}>
        <Controller
          control={control}
          name="group"
          render={({ field }) => (
            <TextField
              margin="dense"
              fullWidth
              id="group"
              label={I18n.t("USER_MANAGEMENT.GROUP")}
              type="group"
              name="group"
              required
              SelectProps={{ MenuProps: MenuProps }}
              select
              {...field}
            >
              {props.groupSubGroupList && props.groupSubGroupList.length > 0 && props.groupSubGroupList.map(group => (
                <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>
              ))}
            </TextField>

          )}
        />
      </Grid>
    </>
  );
};
const RoleMappingToUser = () => {
  const { control } = useFormContext();
  const roles = useSelector(state => state.roles);
  const { classes } = useStyles(UserManagementStyles);

  return (
    <>
      <Grid item xs={12} >
        <InputLabel
          id="roles" >{I18n.t("USER_MANAGEMENT.ROLES")}</InputLabel>
        <Controller
          control={control}
          name="roles"
          render={({ field }) => (
            <Select
              labelId="roles"
              id="roles"
              name="roles"
              fullWidth
              MenuProps={MenuProps}
              {...field}
            >
              {roles && roles.map(role => (
                <MenuItem key={role.name} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </Grid>


    </>
  );
};


function getStepContent(step, id, isEdit, createMenu, isRoleMapping, handleNext, tempPassword, groupSubGroupList) {
  switch (step) {
    case 0:
      return <UserForm id={id} isEdit={isEdit} createMenu={createMenu} handleNext={handleNext} tempPassword={tempPassword} />;

    case 1:
      return <GroupForm
        groupSubGroupList={groupSubGroupList}
        id={id}
      />;
    case 2:
      return <RoleMappingToUser isGroupStep={true} id={id} isEdit={isEdit} createMenu={createMenu} />;
    default:
      return "unknown step";
  }
}

const UserDialogStepper = (props) => {
  const { classes } = useStyles();
  const methods = useForm({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      tempPassword: "",
      group: "",
      roles: ""

    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps(props.isEdit);
  const [tempPassword, setTempPassword] = useState("");
  const keycloakGroups = useSelector(state => state.keycloakAllGroup);
  const [groupSubGroupList, setGroupSubGroupList] = useState([]);
  const i18n = useSelector(state => state.i18n);
  const admin = useSelector(state => state.adminAccess);
  const userDetails = useSelector(state => state.userDetails);
  const userAssociateGroup = useSelector(state => state.userAssociateGroups);
  const users = useSelector(state => state.users);
  const userAssociateRole = useSelector(state => state.userAssociateRole);
  const roles = useSelector(state => state.roles);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    validationMessage: "",
    messageType: "",
    username: ""
  })
  const currentUser = users && users.length > 0 && users.filter(x => x.username === state.username);

  useEffect(() => {
    if (currentUser && currentUser.length > 0 && admin && admin.access_token) {
      dispatch(getUserAssociateGroups(admin.access_token, currentUser[0].id));
      dispatch(getUserAssociateRole(admin.access_token, currentUser[0].id));
    };
  }, []);


  const groupSubGroups = () => {
    keycloakGroups && keycloakGroups.length > 0 && keycloakGroups.map(group => {
      if (group) {
        groupSubGroupList.push(group)
      }
      if (group && group.subGroups && group.subGroups.length > 0) {
        groupSubGroupList.push(...group.subGroups)
      }
    })
  }
  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };


  const onSaveClickUser = (state) => {
    const usernameValidation = new RegExp(USER_NAME_VALIDATOR);
    if (!state.username || !usernameValidation.test(state.username)) {
      setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.USER_NAME'), messageType: 'error' });
      return;
    }
    if (state.firstName && NAME_VALIDATION.test(state.firstName)) {
      setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.FIRST_NAME'), messageType: 'error' });
      return;
    }
    if (!state.firstName || state.firstName.trim() === "") {
      setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.FIRST_NAME'), messageType: 'error' });
      return;
    }

    if (state.lastName && NAME_VALIDATION.test(state.lastName)) {
      setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.LAST_NAME'), messageType: 'error' });
      return;
    }
    if (!state.lastName || state.lastName.trim() === "") {
      setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.LAST_NAME'), messageType: 'error' });
      return;
    }
    if (!state.email) {
      setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.EMAIL'), messageType: 'error' });
      return;
    }
    if (!EMAIL_VALIDATOR.test(state.email) || state.email.trim() === '') {
      setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.EMAIL_VALIDATION'), messageType: 'error' });
      return;
    }
    if (!props.isEdit) {
      const PasswordValidation = new RegExp(PASSWORD_VALIDATOR);
      if (!PasswordValidation.test(state.tempPassword)) {
        setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.PASSWORD_VALIDATION'), messageType: 'error' });
        return;
      };


      let userData = {
        username: state.username,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        emailVerified: true,
        requiredActions: ['UPDATE_PASSWORD'],
        enabled: true,
        credentials: [{ "type": "password", "value": `${state.temPassword}`, "temporary": true }]
      }
      const getUserValidation = (msg) => {
        if (msg === 200) {
          setActiveStep(activeStep + 1);
        } else {
          setState({ validationMessage: I18n.t(`ERRORCODES.${[msg]}`), messageType: "error" });
          return;
        }
      }
      if (admin && admin.access_token) {
        dispatch(createUser(admin.access_token, userData, getUserValidation));
      }
    } else {
      let userEditData = {};

      if (userDetails && userDetails.firstName !== state.firstName && userDetails.firstName !== state.lastName) {
        userEditData.firstName = state.firstName;
        userEditData.lastName = state.lastName;
      };
      if (userDetails && userDetails.email !== state.email) {
        userEditData.email = state.email;
        userEditData.emailVerified = true;
      }

      if (userEditData && admin && admin.access_token) {
        dispatch(updateUser(admin.access_token, props.id, userEditData));
      }
    }
  };

  const onSaveClickGroup = (state) => {
    const newUserId = users && users.length > 0 && users.filter(x => x.username === state.username);
    if (admin && admin.access_token && newUserId && newUserId.length > 0) {
      if (userAssociateGroup && userAssociateGroup.length > 0) {
        dispatch(deleteAssignGroupFromUser(admin.access_token, newUserId[0].id, userAssociateGroup[0].id));
      }
      const keycloakGroup = groupSubGroupList.filter(x => state.group === x.name);
      if (keycloakGroup && keycloakGroup[0] && keycloakGroup[0].id) {
        dispatch(assignGroupToUser(admin.access_token, newUserId[0].id, keycloakGroup[0].id));
      }
    };
    setActiveStep(activeStep + 1)
  };

  const onSaveClickRoleMapping = (state) => {
    console.log(userAssociateRole, currentUser)
    const newUserId = users && users.length > 0 && users.filter(x => x.username === state.username);

    if (!state.roles) {
      setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.PROVIDE_ROLES'), messageType: 'error' });
      return;
    }
    if (userAssociateRole && userAssociateRole.length > 0) {
      const existingUserRole = [{ id: userAssociateRole[0].id, name: userAssociateRole[0].name }];
      dispatch(deleteUserRoleByUserID(admin.access_token, newUserId[0].id, existingUserRole));
    };
    const roleData = roles && roles.length > 0 && roles.map(role => {
      if (role.name === state.roles) {
        return { id: role.id, name: role.name };
      }
    });
    const newRoleData = roleData.filter(x => x !== undefined);
    if (newRoleData) {
      dispatch(roleMappingToUser(admin.access_token, newUserId[0].id, newRoleData));
    }

    setActiveStep(activeStep + 1);
    handleReset();
  };

  const handleNext = (data) => {
    setTempPassword(data.tempPassword);
    setState({ username: data.username });
    if (activeStep === steps.length - 1) {
      onSaveClickRoleMapping(data);
    } else {
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
      if (activeStep === 0) {
        onSaveClickUser(data)
      };
      if (activeStep === 1) {
        onSaveClickGroup(data)
      };
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    methods.reset({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      tempPassword: "",
      group: "",
      roles: "",
      validationMessage: ""
    });
    setState({ validationMessage: "" });
    setActiveStep(0);
    props.handleClose();
  };

  const handleClose = () => {
    handleReset();
    props.handleClose();
  }
  const onEntering = () => {
    groupSubGroups();
    setIsEdit(props.isEdit);
  };

  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionProps={{
        onEntering: onEntering,
      }}
    >
      <DialogContent
        style={{ width: "35rem", height: "20rem" }}
      >
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step {...stepProps} key={index}>
                <StepLabel {...labelProps}>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <Typography variant="h3" align="center">
            {I18n.t('USER_MANAGEMENT.USER_STEPPER_SUCCESS')}
          </Typography>
        ) : (
          <>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep, props.id, isEdit, props.createMenu, props.isRoleMapping, handleNext, tempPassword, groupSubGroupList)}
                <Typography style={{ color: "red" }}>
                  {state.validationMessage}
                </Typography>
                <Grid style={{ display: "flex", float: "right", marginTop: activeStep !== 0 ? "20px" : "auto" }}>
                  {activeStep === 0 &&
                    <Button
                      style={{ marginTop: "10px", marginRight: "5px" }}
                      color="secondary"
                      variant='contained'
                      onClick={handleClose}
                    >
                      {I18n.t('ACTIONS.CANCEL')}
                    </Button>
                  }
                  {activeStep === 2 &&
                    isStepOptional(activeStep) && (
                      <Button
                        style={{ marginTop: "10px", marginRight: "5px" }}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        color="secondary"
                        variant='contained'
                      >
                        {I18n.t('USER_MANAGEMENT.BACK_BUTTON')}
                      </Button>
                    )
                  }
                  <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {activeStep === steps.length - 1 ? I18n.t('USER_MANAGEMENT.FINISH_BUTTON') : I18n.t('USER_MANAGEMENT.NEXT_BUTTON')}
                  </Button>
                </Grid>
              </form>
            </FormProvider>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDialogStepper;