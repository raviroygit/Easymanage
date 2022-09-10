import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector } from "react-redux";
import {
  ListItemText,
  Button,
  Grid
} from "@material-ui/core";
import { I18n } from "react-redux-i18n";
import { makeStyles } from "@material-ui/core/styles";
import { TransactionStyles } from './TransactionStyles';

const useStyles = makeStyles(TransactionStyles);

function TransactionDetailDialog(props) {
  const classes = useStyles();
  const allTransactions = useSelector((state) => state.transactionsDetail);
  const transactionDetailToShow = allTransactions.filter(el => el._id === props.transaction);
  const transactionDetail = { ...transactionDetailToShow[0] };
  const handleClose = () => {
    props.handleClose();
  };

  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="terminal-dialog"
        maxWidth="md"
        fullWidth={true}
        scroll="paper"
      >
        <DialogTitle id="transaction-dialog" className={classes.dialogTitleStyle} >
          {I18n.t("TRANSACTION.TRANSACTION_DETAIL")}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.SERIAL_NUMBER")}
                secondary={transactionDetail.serialNumber}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.SYSTEM_IDENTIFIER")}
                secondary={transactionDetail.systemIdentifier}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.DATE_AND_TIME_OF_TRANSACTION")}
                secondary={transactionDetail.createdAt}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.TRANSACTION_TYPE")}
                secondary={transactionDetail.paymentType}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.TRANSACTION_NUMBER")}
                secondary={transactionDetail.transactionNumber}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.TRANSACTION_AMOUNT")}
                secondary={transactionDetail.transactionAmount}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.CARD_HOLDER_NUMBER")}
                secondary={transactionDetail.cardHolderNumber}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.AID_SELECTED_FOR_THE_CARD")}
                secondary={transactionDetail.selectedAID}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.TVR_OF_THE_TRANSACTION")}
                secondary={transactionDetail.transactionTVR}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.ACCEPTING_ISSUE_NUMBER")}
                secondary={transactionDetail.acceptingIssueNumber}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.AUTHORIZATION_NUMBER")}
                secondary={transactionDetail.authorizationNumber}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.TRANSACTION_STATUS")}
                secondary={transactionDetail.transactionStatus}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.REASON_FOR_REFUSING")}
                secondary={transactionDetail.refusingReason}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                className={classes.listTextStyle}
                primary={I18n.t("TRANSACTION.SPDH_CODE")}
                secondary={transactionDetail.SPDHRefusalCode}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
          >
            {I18n.t("ACTIONS.CANCEL")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TransactionDetailDialog;