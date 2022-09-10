/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import DataTable from '../../presentation/DataTable/DataTable';
import { I18n } from "react-redux-i18n";
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { transactionsList } from '../../../redux/actions/Transaction/TransactionDetail';
import { TransactionStyles } from './TransactionStyles';
import { makeStyles } from "@material-ui/core/styles";
import ListAltIcon from '@material-ui/icons/ListAlt';
import TransactionDetailDialog from './TransactionDetailDialog';

const useStyles = makeStyles(TransactionStyles);

function TransactionsDetails(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(transactionsList())
  }, []);
  const allTransactions = useSelector((state) => state.transactionsDetail);
  // eslint-disable-next-line no-unused-vars
  const i18n = useSelector((state) => state.i18n);

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [detailID, setDetailID] = useState("");
  const handleTransactionDetail = (e, id) => {
    setDetailDialogOpen(true);
    setDetailID(id);
  };
  const handleClose = () => {
    setDetailDialogOpen(false);
    setDetailID("");
  };

  const columns = [
    {
      name: `${I18n.t("TRANSACTION.SERIAL_NUMBER")}`,
      selector: "serialNumber",
    },
    {
      name: `${I18n.t("TRANSACTION.SYSTEM_IDENTIFIER")}`,
      selector: "systemIdentifier",
    },
    {
      name: `${I18n.t("TRANSACTION.TRANSACTION_TYPE")}`,
      selector: "paymentType",
    },
    {
      name: `${I18n.t("TRANSACTION.DATE_AND_TIME_OF_TRANSACTION")}`,
      type: "date",
      selector: "createdAt",
    },
    {
      name: `${I18n.t("TRANSACTION.TRANSACTION_AMOUNT")}`,
      selector: "transactionAmount",
    },
    {
      name: `${I18n.t("TRANSACTION.TRANSACTION_STATUS")}`,
      selector: "transactionStatus",
    },
    {
      type: "actions",
      actions: [
        {
          name: I18n.t("TRANSACTION.DETAIL"),
          handler: handleTransactionDetail,
          icon: <ListAltIcon />,
        },
      ]
    }
  ];

  return (
    <Grid className={classes.dataTableStyle} >
      <DataTable
        columns={columns}
        data={allTransactions ? allTransactions : []}
        dataKey="_id"
        order="desc"
        orderBy="createdAt"
        checkbox={false}
        pagination={true}
        isDownload={true}
        searchBar={true}
        heightClass="data-table-area-no-toolbar-for-terminal"
      />
      <TransactionDetailDialog
        isOpen={detailDialogOpen}
        transaction={detailID}
        handleClose={handleClose}
      />
    </Grid>
  );
}

export default TransactionsDetails;