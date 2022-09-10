import React, { useState } from 'react';
import AlertDialog from "../../containers/AlertDialog/AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import { activeInactiveTerminals } from "../../../redux/actions/Terminals/ActiveInactiveTerminals";
import { deleteTerminals } from "../../../redux/actions/Terminals/DeleteTerminals";
import { ACTIVE, DELETE, PASSIVE } from '../../../constants/constants';

function ActivePassiveDeleteDialog(props) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const selectedTerminals = useSelector((state) => state.selectedList);

  const handleComment = (event) => {
    setComment(event.target.value)
  }

  const onAgree = () => {
    if (props.alertName === ACTIVE) {
      const data = {
        Ids: selectedTerminals,
        status: ACTIVE,
        comment: comment,
      };
      dispatch(activeInactiveTerminals(data));
    } else if (props.alertName === PASSIVE) {
      const data = {
        Ids: selectedTerminals,
        status: PASSIVE,
        comment: comment,
      };
      dispatch(activeInactiveTerminals(data));
    } else if (props.alertName === DELETE) {
      const data = {
        ids: selectedTerminals,
        comment: comment,
      };
      dispatch(deleteTerminals(data));
    }
    onAlertClose();
  };

  const onAlertClose = () => {
    setComment("");
    props.alertClose();
  };

  return (
    <>
      <AlertDialog
        open={props.alertOpen}
        onAgree={onAgree}
        onDisagree={onAlertClose}
        title={props.alertTitle}
        content={props.alertContent}
        comment={true}
        commented={(e) => handleComment(e)}
        alertIcon={true}
      />
    </>
  );
}

export default ActivePassiveDeleteDialog;