import React from "react";
import DataTable from "../../presentation/DataTable/DataTable";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReportStyles } from "./ReportStyles";

const useStyles = makeStyles(ReportStyles);

function ReportList({ columns }) {
  const classes = useStyles();
  const report = useSelector((state) => state.report);

  return (
    <Grid className={classes.table}>
      <DataTable
        columns={columns}
        data={report ? report : []}
        dataKey="_id"
        order="asc"
        orderBy="application"
        checkbox={false}
        heightClass="data-table-area-no-toolbar-for-terminal"
        pagination={true}
        isDownload={true}
        searchBar={true}
      />
    </Grid>
  );
}

export default ReportList;
