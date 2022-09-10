import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getTerminalById, resetTerminal } from '../../../redux/actions/Terminals/GetTerminalById';
import TerminalDetail from '../../presentation/Terminal/TerminalDetail';
import PropTypes from "prop-types";
import {  withStyles } from "@material-ui/core";
import moment from 'moment';
import { DATE_FORMAT, INITIAL_ZERO, NOT_AVAILABLE } from '../../../constants/constants';
import { TerminalStyles } from "./TerminalStyles";

class TerminalDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      serialNumber: NOT_AVAILABLE,
      id: NOT_AVAILABLE,
      terminalModel: NOT_AVAILABLE,
      manufacturer: NOT_AVAILABLE,
      appVersion: NOT_AVAILABLE,
      kernelVersion: NOT_AVAILABLE,
      osVersion: NOT_AVAILABLE,
      acquirerIPAddress: NOT_AVAILABLE,
      acquiredPort: NOT_AVAILABLE,
      TLS: NOT_AVAILABLE,
      blackListVersion: NOT_AVAILABLE,
      operatorName: NOT_AVAILABLE,
      apn: NOT_AVAILABLE,
      simSerialNo: NOT_AVAILABLE,
      merchantName: NOT_AVAILABLE,
      address: NOT_AVAILABLE,
      city: NOT_AVAILABLE,
      createdAt: NOT_AVAILABLE,
      updatedAt: NOT_AVAILABLE,
      ram: INITIAL_ZERO,
      diskSpace: INITIAL_ZERO,
      lastCallDate: NOT_AVAILABLE
    };
  }

  getId() {
    let url = window.location.pathname
    let arr = url.split('/', 3)
    return arr[2]
  }

  componentDidMount() {
    this.props.getTerminalById(this.getId())
    this.props.resetTerminal()
  }

  componentDidUpdate(prevProps) {
    if (this.props.termDetail && JSON.stringify(prevProps.termDetail) !== JSON.stringify(this.props.termDetail)) {
      const ramUsedPercentage = Math.floor(this.props.termDetail.usedRam / this.props.termDetail.totalRam * 100);
      const diskSpaceUsed = Math.floor(this.props.termDetail.usedDiskSpace / this.props.termDetail.totalDiskSpace * 100);
      this.setState({
        serialNumber: this.props.termDetail.serialNumber ? this.props.termDetail.serialNumber : NOT_AVAILABLE,
        id: this.props.termDetail.id ? this.props.termDetail.id : NOT_AVAILABLE,
        systemIdentifier: this.props.termDetail.systemIdentifier ? this.props.termDetail.systemIdentifier : NOT_AVAILABLE,
        terminalModel: this.props.termDetail.terminalModel ? this.props.termDetail.terminalModel : NOT_AVAILABLE,
        manufacturer: this.props.termDetail.manufacturer ? this.props.termDetail.manufacturer : NOT_AVAILABLE,
        appVersion: this.props.termDetail.appVersion ? this.props.termDetail.appVersion : NOT_AVAILABLE,
        kernelVersion: this.props.termDetail.kernelVersion ? this.props.termDetail.kernelVersion : NOT_AVAILABLE,
        osVersion: this.props.termDetail.osVersion ? this.props.termDetail.osVersion : NOT_AVAILABLE,
        acquirerIPAddress: this.props.termDetail.acquirerIPAddress ? this.props.termDetail.acquirerIPAddress : NOT_AVAILABLE,
        acquiredPort: this.props.termDetail.acquiredPort ? this.props.termDetail.acquiredPort : NOT_AVAILABLE,
        TLS: this.props.termDetail.TLS ? 'True' : 'False',
        blackListVersion: this.props.termDetail.blVersion ? this.props.termDetail.blVersion : NOT_AVAILABLE,
        operatorName: this.props.termDetail.operatorName ? this.props.termDetail.operatorName : NOT_AVAILABLE,
        apn: this.props.termDetail.apn ? this.props.termDetail.apn : NOT_AVAILABLE,
        simSerialNo: this.props.termDetail.simSerialNo ? this.props.termDetail.simSerialNo : NOT_AVAILABLE,
        merchantName: this.props.termDetail.merchantName ? this.props.termDetail.merchantName : NOT_AVAILABLE,
        address: this.props.termDetail.address ? this.props.termDetail.address : NOT_AVAILABLE,
        city: this.props.termDetail.city ? this.props.termDetail.city : NOT_AVAILABLE,
        createdAt: moment(this.props.termDetail.createdAt).format(DATE_FORMAT),
        updatedAt: moment(this.props.termDetail.updatedAt).format(DATE_FORMAT),
        lastCallDate: moment(this.props.termDetail.lastCallDate).format(DATE_FORMAT),
        ram: ramUsedPercentage ? ramUsedPercentage : 0,
        diskSpace: diskSpaceUsed ? diskSpaceUsed : 0,
        group: this.props.termDetail.group ? this.props.termDetail.group : NOT_AVAILABLE,
        subGroup: this.props.termDetail.subGroup ? this.props.termDetail.subGroup : NOT_AVAILABLE
      });
    }
  }
  componentWillUnmount() {
    this.props.resetTerminal()
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.terminaldetailDiv}>
        <TerminalDetail
          serialNumber={this.state.serialNumber}
          id={this.state.id}
          systemIdentifier={this.state.systemIdentifier}
          terminalModel={this.state.terminalModel}
          manufacturer={this.state.manufacturer}
          appVersion={this.state.appVersion}
          kernelVersion={this.state.kernelVersion}
          osVersion={this.state.osVersion}
          acquirerIPAddress={this.state.acquirerIPAddress}
          acquiredPort={this.state.acquiredPort}
          TLS={this.state.TLS}
          blackListVersion={this.state.blackListVersion}
          operatorName={this.state.operatorName}
          apn={this.state.apn}
          simSerialNo={this.state.simSerialNo}
          merchantName={this.state.merchantName}
          address={this.state.address}
          city={this.state.city}
          createdAt={this.state.createdAt}
          updatedAt={this.state.updatedAt}
          ram={this.state.ram ? this.state.ram : 0}
          diskSpace={this.state.diskSpace ? this.state.diskSpace : 0}
          group={this.state.group}
          subGroup={this.state.subGroup}
          terminalKey={this.props.terminalKey}
          lastCallDate={this.state.lastCallDate}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTerminalById: getTerminalById,
    resetTerminal: resetTerminal
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    termDetail: state.terminal,
    I18n: state.i18n
  };
}

TerminalDetails.propTypes = {
  serialNumber: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(TerminalStyles)(TerminalDetails));