import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Error404Component extends PureComponent {
  render() {
    return (
      <div>
        Error404Component Component
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

Error404Component.propTypes = {
};

export default connect(mapStateToProps)(Error404Component);