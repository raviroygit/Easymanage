/* eslint-disable no-mixed-operators */
/* eslint-disable array-callback-return */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select, Checkbox, Chip, Grid, withStyles, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { I18n } from "react-redux-i18n";
import { addMerchant } from "../../../redux/actions/Group/AddGroupAction";
import { merchantsReset } from "../../../redux/actions/Group/GroupListAction";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import {
  getMerchantById,
  resetMerchant,
} from "../../../redux/actions/Group/MerchantByIdAction";
import { GroupStyles, MenuProps, MenuPropsReactWindow } from "./GroupStyles";
import { updateMerchant } from "../../../redux/actions/Group/MerchantUpdateAction";
import CancelIcon from "@material-ui/icons/Cancel";
import { updateTerminal } from "../../../redux/actions/Terminals/UpdateTerminalsAction";
import { loadFiles } from "../../../redux/actions/DownloadandUpload/FileListAction";
import { BLACKLIST } from "../../../constants/constants";
import { getTerminalSerialNumberList } from "../../../redux/actions/Terminals/GetTerminalsSerialNumber";
import { FixedSizeList as List } from "react-window";
import { createKeycloakGroups } from '../../../redux/actions/Group/CreateKeycloakGroup';
import { getKeycloakGroups } from '../../../redux/actions/Group/GetKeycloakGroups';
import { createKeycloakSubGroups } from '../../../redux/actions/Group/CreateKeycloakSubGroup';
import { updateKeycloakGroup } from '../../../redux/actions/Group/UpdateKeycloakGroups';
import { Country, State, City } from "country-state-city";

class AddGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      merchantName: "",
      streetAddress: "",
      region: "",
      city: "",
      country: "",
      open: false,
      terminal: [],
      subGroup: [],
      terminalList: [],
      groupList: [],
      state: "",
      terminalOptions: [],
      selectedChipTerminal: [],
      groupOptions: [],
      selectedChipGroupList: [],
      subGroupTerminals: [],
      checked: false,
      isAlertOpen: false,
      add: false,
      groupType: "",
      parameterFile: "",
      files: [],
      isGroup: false,
      isEditGroup: true,
      disabledTerminal: false,
      countries: Country.getAllCountries()
    };
  }

  resetState = () => {
    this.setState({
      merchantName: "",
      state: "",
      streetAddress: "",
      city: "",
      selectedChipGroupList: [],
      selectedChipTerminal: [],
      terminalList: [],
      country: "",
      groupType: "",
      validationMessage: "",
      messageType: "",
      groupOptions: [],
      parameterFile: "",
    });
  };
  componentDidMount() {
    this.props.getTerminalSerialNumberList();
    this.props.loadFiles();
    console.log(this.state.countries)
  }

  componentDidUpdate(prevProps) {
    if (this.props.admin && this.props.admin.access_token && JSON.stringify(prevProps.admin) !== JSON.stringify(this.props.admin)) {
      this.props.getKeycloakGroups(this.props.admin.access_token);
    }
  }

  terminalList = (data, selfId) => {
    let terminalAlreadyTaken = [];
    data.forEach(
      (item) => {
        if (!this.props.add && this.props.isEditGroup && this.props.loginUserAssociateGroups && this.props.loginUserAssociateGroups[0].name === item.merchantName) {
          this.setState({ disabledTerminal: true });
        } else {
          this.setState({ disabledTerminal: false });
        }
        if (item.isParent && item._id !== selfId) {
          terminalAlreadyTaken.push(...item.terminal)
        }
      }
    );
    if (this.props.isRoot) {
      const terminalSelectionList = this.props.terminalSerialNumberList.filter((elem) => !terminalAlreadyTaken.includes(elem._id));
      this.setState({ terminalList: terminalSelectionList });
    }
    if (!this.props.isRoot) {

      const terminalTakenBySubGroup = [];
      this.props.merchants.map(g => {
        g.subGroup.map(s => {
          terminalTakenBySubGroup.push(...s.terminal);
        })
      })
      const availableTerminal = terminalAlreadyTaken.filter(x => !terminalTakenBySubGroup.includes(x._id));
      this.setState({ terminalList: availableTerminal });
    }
    const terminalSelectionList = this.props.terminalSerialNumberList.filter((elem) => !terminalAlreadyTaken.find(({ _id }) => elem._id === _id));
    this.setState({ terminalList: terminalSelectionList });
  };

  subgroup = (data, selfId) => {
    let terminalAlreadyTaken = [];
    data && data.subGroup && data.subGroup.length > 0 && data.subGroup.forEach(
      (item) => {
        if (item._id !== selfId) {
          terminalAlreadyTaken.push(...item.terminal)
        }
      }
    );
    const terminalSelectionList = data && data.terminal.length > 0 && data.terminal.filter(terminal => !terminalAlreadyTaken.includes(terminal._id));

    this.setState({ terminalList: terminalSelectionList });
  };


  onEntering = () => {

    let merchantParent = [];
    this.setState({
      add: this.props.add,
      isGroup: this.props.isGroup,
      isEditGroup: this.props.isEditGroup
    });
    if (this.props.add) {
      this.resetState();
      this.terminalList(this.props.merchants);
      if (this.props.isGroup) {
        this.setState({ groupType: I18n.t("GROUP.GROUP_PARENT") });
      } else if (!this.props.isGroup) {
        this.subGroupList();
      }
    } else if (
      (this.props.merchantDetail && !this.props.add) ||
      this.props.isGroup
    ) {
      if (this.props.isEditGroup) {
        this.terminalList(this.props.merchants, this.props.merchantDetail._id);
        const subGroupTerminalCollection = []
        this.props.merchantDetail.subGroup.forEach(group => subGroupTerminalCollection.push(...group.terminal));
        this.setState({ subGroupTerminals: subGroupTerminalCollection });
      } else if (!this.props.isGroup) {
        this.setState({ subGroupTerminals: [], disabledTerminal: false });
        this.props.merchants.forEach((group) =>
          group && group.subGroup && group.subGroup.length > 0 && group.subGroup.forEach(
            (data) => data._id === this.props.merchantDetail._id &&
              merchantParent.push(group)
          )
        );
        this.subgroup(merchantParent[0], this.props.merchantDetail._id);
      }
      if (!this.props.isRoot) {
        this.props.merchants.map(x => {
          if (this.props.loginUserAssociateGroups && this.props.loginUserAssociateGroups[0].name === x.merchantName) {
            this.setState({
              terminalList: x.terminal.map((x) => {
                return { _id: x._id, serialNumber: x.serialNumber, status: x.status };
              })
            })
          }
        })
      }

      this.setState({
        isEditGroup: this.props.merchantDetail.isParent,
        merchantName: this.props.merchantDetail.merchantName
          ? this.props.merchantDetail.merchantName
          : "",
        state: this.props.merchantDetail.state
          ? this.props.merchantDetail.state
          : "",
        streetAddress: this.props.merchantDetail.streetAddress
          ? this.props.merchantDetail.streetAddress
          : "",
        city: this.props.merchantDetail.city
          ? this.props.merchantDetail.city
          : "",
        country: this.props.merchantDetail.country
          ? this.props.merchantDetail.country
          : "",
        groupType: this.props.merchantDetail.groupType
          ? this.props.merchantDetail.groupType
          : "",
        selectedChipTerminal: this.props.merchantDetail.terminal
          ? this.props.merchantDetail.terminal.map((x) => {
            return { name: x.serialNumber, id: x._id };
          })
          : [],
        selectedChipGroupList: this.props.merchantDetail.subGroup
          ? merchantParent[0] && !this.props.isEditGroup ?
            merchantParent.map(x => {
              return { name: x.merchantName, id: x._id };
            })
            : this.props.merchantDetail.subGroup.map((x) => {
              return { name: x.merchantName, id: x._id };
            })
          : [],
        parameterFile: this.props.merchantDetail.parameterFile
          ? this.props.merchantDetail.parameterFile : "",
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      validationMessage: "",
      messageType: "",
    });
  };

  onHandleCancel = () => {
    this.props.handleClose();
    this.resetState();
  };

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ state: val });
  }

  onSaveClick = () => {
    if (this.state.add) {
      if (!this.state.isGroup && !this.state.merchantName) {
        this.setState({
          validationMessage: I18n.t("GROUP.VALIDATION.SUB_GROUP_NAME"),
          messageType: "error",
        });
        return;
      }
      if (this.state.isGroup && !this.state.merchantName) {
        this.setState({
          validationMessage: I18n.t("GROUP.VALIDATION.NAME"),
          messageType: "error",
        });
        return;
      }

      if (!this.state.groupType) {
        this.setState({
          validationMessage: I18n.t("GROUP.VALIDATION.GROUP_TYPE"),
          messageType: "error",
        });
        return;
      }

      if (!this.state.isGroup && this.state.selectedChipGroupList.length === 0) {
        this.setState({
          validationMessage: I18n.t("GROUP.VALIDATION.GROUP"),
          messageType: "error",
        });
        return;
      }
      let merchantData = {
        merchantName: this.state.merchantName,
        groupType: this.state.groupType,
        state: this.state.state,
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        country: this.state.country,
        terminal: this.state.selectedChipTerminal.map((x) => {
          return x.id;
        }),
        parameterFile: this.state.parameterFile,
        isParent: this.state.isGroup ? true : false,
        subGroup: this.state.selectedChipGroupList.map((x) => {
          return x.id;
        }),
      }

      if (this.props.admin && this.props.admin.access_token) {
        if (this.state.isGroup) {
          this.props.createKeycloakGroups(this.props.admin.access_token, { name: this.state.merchantName })
        } else {
          const subGroup = this.state.selectedChipGroupList.map((x) => {
            return x.name;
          });
          const kecloakGroupId = this.props.keycloakAllGroup.filter(x => x.name === subGroup[0]);
          if (kecloakGroupId && kecloakGroupId.length > 0 && kecloakGroupId[0].id) {
            this.props.createKeycloakSubGroups(this.props.admin.access_token, kecloakGroupId[0].id, { name: this.state.merchantName });
          }
        }
        this.props.addMerchant(merchantData);
        this.props.getKeycloakGroups(this.props.admin.access_token);
      }

    } else {
      if (!this.state.merchantName) {
        this.setState({
          validationMessage: I18n.t("GROUP.VALIDATION.NAME"),
          messageType: "error",
        });
        return;
      }
      let merchantData = {
        merchantName: this.state.merchantName,
        groupType: this.state.groupType,
        state: this.state.state,
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        country: this.state.country,
        terminal: this.state.selectedChipTerminal.map((x) => {
          return x.id;
        }),
        parameterFile: this.state.parameterFile,
      }
      this.props.updateMerchant(this.props.id, merchantData);

      if (this.props.merchantDetail) {
        if (this.state.isEditGroup) {
          const KeycloakGroupId = this.props.keycloakGroup.filter(x => x.name === this.props.merchantDetail.merchantName);
          this.props.updateKeycloakGroup(localStorage.adminToken, KeycloakGroupId[0].id, { name: this.state.merchantName });

        } else {
          let KeycloakSubgroupId;
          this.props.keycloakAllGroup.map(keycloakGroup => (
            keycloakGroup.subGroups && keycloakGroup.subGroups.length > 0 &&
            keycloakGroup.subGroups.map(x => {
              if (x.name === this.props.merchantDetail.merchantName) {
                KeycloakSubgroupId = x.id;
              }
            })
          ))
          this.props.updateKeycloakGroup(localStorage.adminToken, KeycloakSubgroupId, { name: this.state.merchantName });
        }
      }
    }
    this.onHandleCancel();

  }

  subGroupList = () => {
    if (!this.state.isGroup) {
      const filterGroupList = this.props.merchants.filter(x => !x.isRoot);
      this.setState({
        groupOptions: [...filterGroupList],
      });
    }
  };

  terminalHandleChange = (e) => {
    if (!e.target.checked) {
      const selectedChipTerminal = this.state.selectedChipTerminal.filter(
        (x) => x.id !== e.target.value
      );
      this.setState({ selectedChipTerminal });
    } else {
      const selectedTerminals = this.props.terminalSerialNumberList.map((x) => {
        if (e.target.value === x._id) {
          return { name: x.serialNumber, id: x._id };
        }
      });
      const newSelectedTerminals = selectedTerminals.filter(
        (x) => x !== undefined
      );
      this.setState({
        selectedChipTerminal: [
          ...this.state.selectedChipTerminal,
          newSelectedTerminals[0],
        ],
      });
    }
  };
  groupHandleChange = (e) => {
    if (!e.target.checked) {
      const selectedChipGroupList = this.state.selectedChipGroupList.filter(
        (x) => x.id !== e.target.value
      );
      this.setState({ selectedChipGroupList });
    } else {
      const SelectedGroup = this.props.merchants.map((x) => {
        if (
          e.target.value === x._id &&
          this.state.selectedChipGroupList.length <= 1
        ) {
          return { name: x.merchantName, id: x._id };
        }
      });
      const newGroups = SelectedGroup.filter((x) => x !== undefined);
      this.setState({ selectedChipGroupList: [...newGroups] });
      let merchant = this.props.merchants.filter(
        (e) => e._id === [...newGroups][0].id
      );
      this.subgroup(merchant[0]);
    }
  };

  handleDeleteTerminal = (e, value) => {
    const selectedChipTerminal = this.state.selectedChipTerminal.filter(
      (x) => x.id !== value.id
    );
    this.setState({ selectedChipTerminal });
  };

  handleDeleteGroup = (e, value) => {
    const selectedChipGroupList = this.state.selectedChipGroupList.filter(
      (x) => x.id !== value.id
    );
    this.setState({ selectedChipGroupList, selectedChipTerminal: [], terminalList: [] });
  };

  addSubGroupForm = () => {
    this.props.addSubGroupForm();
  };

  containedSubGroupTerminalDisable = (passId) => {
    const matchTerminalId = this.state.subGroupTerminals.find(id => id === passId)
    if (!matchTerminalId) {
      return false
    }
    else {
      return true
    }
  };

  render() {
    const { classes } = this.props;
    const { selectedChipTerminal, selectedChipGroupList } = this.state;

    const Row = ({ index, key, style }) => (
      <MenuItem value={this.state.terminalList[index]._id} key={this.state.terminalList[index]._id} style={style}>
        <Checkbox
          value={this.state.terminalList[index]._id}
          onChange={(e) => this.terminalHandleChange(e)}
          checked={
            selectedChipTerminal
              .map(function (x) {
                return x.id;
              })
              .indexOf(this.state.terminalList[index]._id) > -1
          }
          disableRipple
          disabled={
            this.state.disabledTerminal ? this.state.disabledTerminal : this.containedSubGroupTerminalDisable(this.state.terminalList[index]._id)
          }
        />
        {this.state.terminalList[index].serialNumber}
      </MenuItem>
    );

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.onHandleCancel}
          aria-labelledby="merchant-dialog"
          maxWidth="md"
          fullWidth={true}
          scroll="paper"
          className={classes.dialog}
          TransitionProps={{
            onEntering: this.onEntering
          }}
        >
          {this.state.add ?
            this.state.isGroup ?
              <DialogTitle id="merchant-dialog">
                {I18n.t("GROUP.ADD_HEADING")}
              </DialogTitle>
              :
              <DialogTitle id="merchant-dialog">
                {I18n.t("GROUP.ADD_SUBGROUP")}
              </DialogTitle>
            :
            this.state.isEditGroup ?
              <DialogTitle id="merchant-dialog">
                {I18n.t("GROUP.DIALOG_HEADING")}
              </DialogTitle> :
              <DialogTitle id="merchant-dialog">
                {I18n.t("GROUP.DIALOG_HEADING_SUB")}
              </DialogTitle>
          }
          <DialogContent className={classes.mainGrid}>
            <Grid container spacing={3} className={classes.gridRowStyle}>
              <Grid item xs={4} className={classes.groupFormGrid}>
                <TextField
                  margin="dense"
                  className={classes.groupNameStyle}
                  fullWidth
                  id="group-name"
                  required
                  label={
                    this.state.isGroup && this.state.add || !this.state.add && this.state.isEditGroup
                      ? I18n.t("GROUP.GROUP_NAME")
                      : I18n.t("GROUP.SUB_GROUP_NAME")
                  }
                  value={this.state.merchantName}
                  type="text"
                  name="merchantName"
                  onChange={(e) => this.handleChange(e)}
                  autoFocus
                />
              </Grid>
              {!this.state.isGroup && this.state.add || !this.state.add && !this.state.isEditGroup ? (
                <Grid item xs={4} className={classes.groupFormGrid}>
                  <InputLabel id="groupType">{I18n.t("GROUP.GROUP_TYPE")}</InputLabel>
                  <Select
                    className={classes.groupType}
                    required
                    id="groupType"
                    select
                    name="groupType"
                    label={I18n.t("GROUP.GROUP_TYPE")}
                    value={this.state.groupType}
                    MenuProps={MenuProps}
                    onChange={(e) => this.handleChange(e)}
                  >
                    <MenuItem key="providerServices" value="providerServices">
                      {I18n.t("GROUP.PROVIDERSERVICES")}
                    </MenuItem>
                    <MenuItem key="simpleGroup" value="simpleGroup">
                      {I18n.t("GROUP.SIMPLEGROUP")}
                    </MenuItem>
                  </Select>
                </Grid>
              ) : null}
              {!this.state.isGroup && this.state.add || !this.state.add && !this.state.isEditGroup ?
                <>
                  <Grid
                    item
                    xs={4}
                    onClick={this.subGroupList}
                    className={classes.groupFormGrid}
                  >
                    <InputLabel
                      id="subgroup-list"
                      className={classes.subGroupNameStyle}
                    >
                      {!this.state.isGroup && this.state.add || !this.state.add && !this.state.isEditGroup
                        ? I18n.t("GROUP.GROUP") : I18n.t("GROUP.SUB_GROUP")}

                    </InputLabel>
                    <Select
                      fullWidth
                      required
                      labelId="subgroup-list"
                      multiple={true}
                      value={selectedChipGroupList}
                      onChange={(e) => this.groupHandleChange(e)}
                      MenuProps={MenuProps}
                      multiline
                      disabled={!this.state.add && true}
                      renderValue={(selectedChipGroupList) => (
                        <div className={classes.chips}>
                          {selectedChipGroupList.map((value) => (
                            <Chip
                              variant="outlined"
                              key={value.id}
                              disabled={!this.state.add && true}
                              label={value.name}
                              clickable
                              deleteIcon={
                                <CancelIcon
                                  onMouseDown={(event) =>
                                    event.stopPropagation()
                                  }
                                />
                              }
                              className={classes.chip}
                              color="primary"
                              focusVisible
                              onDelete={(e) =>
                                !this.state.isGroup &&
                                this.handleDeleteGroup(e, value)
                              }
                            />
                          ))}
                        </div>
                      )}
                    >
                      {!this.state.isGroup &&
                        this.state.add &&
                        this.state.groupOptions.map((e) => (
                          <MenuItem value={e._id} key={e._id}>
                            <Checkbox
                              value={e._id}
                              onChange={(e) => this.groupHandleChange(e)}
                              checked={
                                selectedChipGroupList
                                  .map(function (x) {
                                    return x.id;
                                  })
                                  .indexOf(e._id) > -1
                              }
                              disableRipple
                              disabled={
                                this.state.selectedChipGroupList.length >= 1
                              }
                            />
                            {e.merchantName}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </> : null}
              <Grid item xs={4} className={classes.groupFormGrid}>
                <InputLabel id="terminal-list">
                  {I18n.t("GROUP.TERMINAL")}
                </InputLabel>
                <Select
                  labelId="terminal-list"
                  // eslint-disable-next-line no-sequences
                  fullWidth
                  MenuProps={MenuPropsReactWindow}
                  multiple={true}
                  value={selectedChipTerminal}
                  onChange={(e) => this.terminalHandleChange(e)}
                  renderValue={(selectedChipTerminal) => (
                    <div className={classes.chips}>
                      {selectedChipTerminal.length > 0 && selectedChipTerminal.map((value) => (
                        <Chip
                          variant="outlined"
                          key={value.id}
                          color="primary"
                          label={value.name}
                          clickable
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(event) => event.stopPropagation()}
                            />
                          }
                          className={classes.chip}
                          disabled={this.containedSubGroupTerminalDisable(value.id) || !this.props.isRoot && !this.state.add && this.state.isEditGroup}
                          onDelete={(e) =>
                            this.handleDeleteTerminal(e, value)
                          }
                        />
                      ))}
                    </div>
                  )}

                >
                  <List
                    width={"100%"}
                    height={120}
                    itemCount={this.state.terminalList ? this.state.terminalList.length : 0}
                    itemSize={40}
                  >
                    {Row}
                  </List>
                </Select>
              </Grid>
              {!this.state.isGroup && this.state.add || !this.state.add && !this.state.isEditGroup ? (
                <Grid item xs={4} className={classes.groupFormGridState}>
                  <TextField
                    className={classes.parameterType}
                    id="parameterFile"
                    select
                    name="parameterFile"
                    label={I18n.t("GROUP.PARAMETER_FILE")}
                    value={this.state.parameterFile}
                    onChange={(e) => this.handleChange(e)}
                    SelectProps={{ MenuProps: MenuProps }}
                  >
                    {this.props.files.map(
                      (e) =>
                        e.type !== BLACKLIST && (
                          <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
                        )
                    )}
                  </TextField>
                </Grid>
              ) : null}
              <Grid item xs={4} className={classes.groupFormGridCountry}>
                <InputLabel id="group-country">
                  {I18n.t("GROUP.COUNTRY")}
                </InputLabel>
                <Select
                  className={classes.input_txt}
                  labelId={I18n.t("GROUP.COUNTRY")}
                  id="region"
                  name="region"
                  value={this.state.region}
                  onChange={this.handleChange}
                  MenuProps={MenuProps}
                  fullWidth
                >
                  <MenuItem value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                  {this.state.countries.map(country => (
                    <MenuItem value={country.isoCode}>{country.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4} className={classes.groupFormGridState}>
                <InputLabel id="group-country">
                  {I18n.t("GROUP.STATE")}
                </InputLabel>
                <Select
                  className={classes.input_txt}
                  labelId={I18n.t('REPORT.STATE')}
                  id="state"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                  MenuProps={MenuProps}
                  fullWidth
                >
                  <MenuItem value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                  {this.state.region && State.getStatesOfCountry(this.state.region).map(state => (
                    <MenuItem value={state.isoCode}>{state.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4} className={classes.groupFormGridCity}>
                <InputLabel id="group-country">
                  {I18n.t("GROUP.CITY")}
                </InputLabel>
                <Select
                  className={classes.input_txt}
                  labelId={I18n.t('REPORT.CITY')}
                  id="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                  MenuProps={MenuProps}
                  fullWidth
                >
                  <MenuItem value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                  {this.state.state && this.state.region && City.getCitiesOfState(this.state.region, this.state.state).map(city => (
                    <MenuItem value={city.name}>{city.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4} className={classes.groupFormGridCity}>
                <TextField
                  className={classes.fieldAlign}
                  margin="dense"
                  fullWidth
                  id="standard-basic"
                  label={I18n.t("GROUP.STREET_ADDRESS")}
                  value={this.state.streetAddress}
                  type="text"
                  name="streetAddress"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Typography >
              {this.state.validationMessage}
            </Typography>
            <Button
              onClick={this.onHandleCancel}
              color="secondary"
              variant="contained"
            >
              {I18n.t("ACTIONS.CANCEL")}
            </Button>
            <Button
              onClick={
                this.onSaveClick
              }
              color="primary"
              variant="contained"
            >
              {I18n.t("ACTIONS.SAVE")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addMerchant: addMerchant,
      resetMerchant: resetMerchant,
      getMerchantById: getMerchantById,
      updateMerchant: updateMerchant,
      merchantsReset: merchantsReset,
      updateTerminal: updateTerminal,
      loadFiles: loadFiles,
      getTerminalSerialNumberList: getTerminalSerialNumberList,
      createKeycloakGroups: createKeycloakGroups,
      getKeycloakGroups: getKeycloakGroups,
      createKeycloakSubGroups: createKeycloakSubGroups,
      updateKeycloakGroup: updateKeycloakGroup,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    addGroup: state.addGroup,
    merchants: state.merchants,
    merchantDetail: state.merchant,
    updateMerchantsStatus: state.updateMerchantsStatus,
    files: state.files,
    terminalSerialNumberList: state.terminalSerialNumberList,
    admin: state.adminAccess,
    keycloakAllGroup: state.keycloakAllGroup,
    logInUserInfo: state.logInUserInfo,
    loginUserAssociateGroups: state.loginUserAssociateGroups,
    keycloakGroup: state.keycloakAllGroup,
  };
}

AddGroup.propTypes = {
  merchantName: PropTypes.string,
  streetAddress: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  open: PropTypes.bool,
  terminal: PropTypes.array,
  subGroup: PropTypes.array,
  terminalList: PropTypes.array,
  groupList: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(GroupStyles)(AddGroup));