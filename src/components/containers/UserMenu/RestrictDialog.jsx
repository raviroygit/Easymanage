import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Keycloak from '../../../lib/keycloak/context';
import { I18n } from 'react-redux-i18n';

export default function AlertDialog(isRoleMissing, open) {

  const keyclock = useContext(Keycloak);

  const handleClickLogout = () => {
    keyclock.logout();

  }
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-access-denied"
      >
        <DialogTitle id="alert-dialog-access-denined">
          {I18n.t('USER_MENU.ACCESS_DENIED')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="access-denined-description">
            {!isRoleMissing.isRoleMissing ? I18n.t('USER_MENU.GROUP_MISSING_ACCESS_DENIED_CONTENT') : I18n.t('USER_MENU.ROLE_MISSING_ACCESS_DENIED_CONTENT')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={'primary'} onClick={handleClickLogout}>
            {I18n.t('USER_MENU.LOGOUT')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}