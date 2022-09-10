import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { loadTranslations, setLocale, I18n } from 'react-redux-i18n';
import { MenuItem } from '@material-ui/core';
import { LanguageAction } from '../../../redux/actions/i18n/LanguageAction';
import { SUPPORTED_LANGUAGES } from '../../../constants/constants';

class LanguageSelection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { language: this.props.language };
  }

  handleChange = lang => {
    this.setState({ language: lang }, () => {
      this.props.languageChange(this.state.language);
      this.props.onSelect(this.state.language);
    });
  }

  render() {
    return (<>
      {SUPPORTED_LANGUAGES.map(language => (
        <MenuItem key={language.locale} value={language} onClick={() => this.handleChange(language)} >
          {I18n.t(language.key)}
        </MenuItem>
      ))}
    </>);
  }
}

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadTranslations: loadTranslations,
    setLocale: setLocale,
    languageChange: LanguageAction
  }, dispatch);
}

LanguageSelection.propTypes = {
  onSelect: PropTypes.func.isRequired,

  // Redux State
  language: PropTypes.object.isRequired,

  // Redux Actions
  loadTranslations: PropTypes.func,
  setLocale: PropTypes.func,
  languageChange: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelection);