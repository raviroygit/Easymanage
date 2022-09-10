import React from 'react';
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    }
  }

  componentDidCatch(error, info) {
    // log.error({error,info});
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>{I18n.t("ERROR_BOUNDARY.MESSAGE")}</h1>
    }
    return this.props.children
  }
};

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
  };
}

export default connect(mapStateToProps)(ErrorBoundary);
