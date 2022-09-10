import { useContext } from 'react';
import PropTypes from 'prop-types';
import keycloack from './context';


const RenderOnRole = ({ children, roles }) => {
  const _kc = useContext(keycloack);

  const hasRole = (roles) => roles.some((role) => {
    let access;
    if (_kc && _kc.hasRealmRole) {
      access = _kc.hasRealmRole(role)
    }
    return access;
  });

  if (hasRole(roles)) {
    return children;
  } else {
    return null;
  }
}

RenderOnRole.PropTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default RenderOnRole;