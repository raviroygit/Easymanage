import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DrawerMerchant from '../../containers/Group/DrawerMerchant';


class Merchant extends PureComponent {

  render() {
    return (
      <React.Fragment>
        <DrawerMerchant />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n
  };
}

Merchant.propTypes = {
};

export default connect(mapStateToProps)(Merchant);