/* eslint-disable array-callback-return */
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableSortLabel,
  TableCell,
  TablePagination,
  Tooltip,
  withStyles,
  IconButton,
  Checkbox,
  Input,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  ListItemText,
  Link,
} from "@material-ui/core";
import PropTypes from "prop-types";
import moment from "moment";
import { I18n } from "react-redux-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DebounceInput } from "react-debounce-input";
import Workbook from "react-excel-workbook";
import { DataTableStyles } from "./DataTableStyles";
import GetApp from "@material-ui/icons/GetApp";
import _ from "lodash";
import { DATE_FORMAT } from "../../../constants/constants";
import {
  SelectedListAction,
  SelectedListResetAction,
} from "../../../redux/actions/Terminals/SelectedListAction";
import { SelectedAllListAction } from "../../../redux/actions/Terminals/SelectedAllListAction";
import withWidth from '@material-ui/core/withWidth';

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    const defaultPaginationOptions = {
      rowsArray: [5, 10, 15, 25],
      page: 0,
      rowsPerPage: this.props.width === "lg" || this.props.width === "xl" ? 15 : 10,
    };

    this.state = {
      columns: props.columns.map((x) => {
        if (!x.formatter) {
          x.formatter = (y) => y;
        }

        return x;
      }),
      allSelected: false,
      selected: [],
      order: props.order,
      orderBy: props.orderBy,
      paginationOptions: props.paginationOptions
        ? props.paginationOptions
        : defaultPaginationOptions,
      searchText: "",
      data: props.data,
      excelData: [],
      showFilterHeaderRow: false,
      stateOfDropdown: {},
      emptySearch: false,
      isDownload: props.isDownload,

    };
  }

  componentDidMount() {
    this.props.selectedListResetAction();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.width !== this.props.width && this.props.width) {
      const paginationOptionsCopy = { ...this.state.paginationOptions };
      paginationOptionsCopy.rowsPerPage = this.props.width === "lg" || this.props.width === "xl" ? 15 : 10;
      this.setState({ paginationOptions: paginationOptionsCopy });
    }
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data) && (this.state.searchText === "")) {
      const dataCopy = JSON.parse(JSON.stringify(this.props.data));

      this.setState({
        selected: [],
        allSelected: false,
        data: this.props.data,
        excelData: dataCopy.map((x) => {
          for (const key in x) {
            if (x[key] === 0) {
              x[key] = String(x[key]);
            }

            if (moment(x[key], moment.ISO_8601, true).isValid()) {
              x[key] = moment(x[key]).format("L[,] LT");
            }

            if (key === "EndDateTime") {
              if (!x[key]) {
                x[key] = "NA";
              }
            }
          }

          return x;
        }),
        columns: this.props.columns.map((x) => {
          if (!x.formatter) {
            x.formatter = (y) => y;
          }

          return x;
        }),
      });
    }

    if ((prevProps.columns !== this.props.columns) && (this.state.searchText === "")) {
      const dataCopy = JSON.parse(JSON.stringify(this.props.data));

      this.setState({
        selected: [],
        allSelected: false,
        data: this.props.data,
        excelData: dataCopy.map((x) => {
          for (const key in x) {
            if (x[key] === 0) {
              x[key] = String(x[key]);
            }

            if (
              moment(x[key], moment.ISO_8601, true).isValid() &&
              this.props.columns.findIndex(
                (xl) => xl.selector === key && xl.type === "date"
              ) !== -1
            ) {
              x[key] = moment(x[key]).format("L[,] LT");
            }

            if (key === "EndDateTime") {
              if (!x[key]) {
                x[key] = "NA";
              }
            }
          }

          return x;
        }),
        columns: this.props.columns.map((x) => {
          if (!x.formatter) {
            x.formatter = (y) => y;
          }

          return x;
        }),
      });
    }
  }

  handleToggleCheckAll = () => {
    const allSelected = !this.props.selectedAll;
    let selected = [];

    if (allSelected) {
      selected = this.props.data.map((x) => x[this.props.dataKey]);
    }

    this.setState({
      allSelected,
      selected,
    });
    this.props.selectedAllListAction(allSelected);
    this.props.selectedListAction(selected);
    this.props.onSelectionChange(selected);
  };

  handleToggleCheck = (id) => {
    const selected = this.props.selectedList;

    if (selected.includes(id)) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected.push(id);
    }

    this.setState({
      selected,
      allSelected:
        selected.length > 0 && selected.length === this.props.data.length,
    });
    this.props.selectedListAction(selected);
    if (this.state.searchText === '') {
      this.props.selectedAllListAction(
        selected.length > 0 && selected.length === this.props.data.length
      );
    }
    this.props.onSelectionChange(selected);
  };

  handleRequestSort = (property) => {
    const orderBy = property;

    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  renderTableHead = () => (
    <TableHead >
      <TableRow>
        {this.props.checkbox && (
          <TableCell className="data-table-checkboxAll">
            <Checkbox
              onChange={this.handleToggleCheckAll}
              checked={this.props.selectedAll}
            />
          </TableCell>
        )}
        {this.props.columns.map((column) => {
          if (column.type === "actions") {
            return (
              <TableCell
                className="data-table-action"
                colSpan={column.actions.length}
                key={column.name}
              >

                <div style={{ marginTop: '10px' }}>
                  {column.name}
                  </div>
              </TableCell>
            );
          }

          return (
            <TableCell
              key={column.selector}
              sortDirection={
                this.state.orderBy === column.selector && this.state.order
              }
            >
              <TableSortLabel

                style={{ marginTop: '10px' }}

                active={this.state.orderBy === column.selector}
                direction={this.state.order}
                onClick={() => this.handleRequestSort(column.selector)}
              >
                {column.name}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );

  handleChangePage = (event, page) => {
    const paginationOptionsCopy = { ...this.state.paginationOptions };

    paginationOptionsCopy.page = page;
    this.setState({ paginationOptions: paginationOptionsCopy });
  };

  handleChangeRowsPerPage = (rowsPerPage) => {
    const paginationOptionsCopy = { ...this.state.paginationOptions };

    paginationOptionsCopy.rowsPerPage = rowsPerPage.target.value;
    this.setState({ paginationOptions: paginationOptionsCopy });
  };

  handleSearch = (event) => {
    this.setState({ searchText: event.target.value });
    const query = event.target.value;

    const dataArray = [];

    if (query !== "") {
      this.props.data.filter((element) => {
        let flag = false;

        this.state.columns.map((column) => {
          if (
            column.selector &&
            column.type === "string" &&
            column
              .formatter(element[column.selector])
              .props.children.toString()
              .toLowerCase()
              .includes(query.toLowerCase())
          ) {
            if (flag === false) {
              dataArray.push(element);
            }

            flag = true;
          }

          if (
            column.selector &&
            column.type !== "date" &&
            column.type !== "string" &&
            element[column.selector] &&
            element[column.selector]
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase())
          ) {
            if (flag === false) {
              dataArray.push(element);
            }

            flag = true;
          }

          // For Date
          if (
            column.selector &&
            column.type === "date" &&
            column
              .formatter(moment(element[column.selector]).format("L[,] LT"))
              .toLowerCase()
              .includes(query.toLowerCase())
          ) {
            if (flag === false) {
              dataArray.push(element);
            }

            flag = true;
          }
        });
      });
      if (dataArray.length === 0) {
        this.setState({ data: dataArray, emptySearch: true });
      } else {
        this.setState({ data: dataArray, emptySearch: false });
      }
    }

    if (query === "") {
      this.setState({ data: this.props.data, emptySearch: false });
    }
  };

  disablingActionItems = (col, row, rowKey) => {
    if (
      this.props.selectedList &&
      this.props.selectedList.includes(row[rowKey])
    ) {
      return true;
    }

    if (col.disableOnClick) {
      return true;
    }

    if (col.actionsToDisable) {
      return col.actionsToDisable.includes(row[rowKey]);
    }
    let disabled = false;
    this.state.columns.map(x => {
      if (col.name === "EDIT" && x.selector === "startDateTime" && new Date(row[x.selector]) < new Date()) {
        disabled = true
      }
    })
    return disabled;
  };

  renderRows = () => {
    const { classes, columns, data, dataKey, pagination } = this.props;
    const { order, orderBy, paginationOptions } = this.state;
    const { page, rowsPerPage } = paginationOptions;

    return (
      <TableBody>
        {pagination
          ? stableSort(this.state.data, getSorting(order, orderBy, columns))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => this.renderRow(row, index, dataKey, classes))
          : stableSort(data, getSorting(order, orderBy, columns)).map(
            (row, index) => this.renderRow(row, index, dataKey, classes)
          )}
      </TableBody>
    );
  };

  renderPagination = () => {
    const { pagination, classes } = this.props;
    const { paginationOptions } = this.state;

    return (
      pagination && (
        <>
          {this.state.isDownload && (
            <Workbook
              filename="Data.xlsx"
              element={
                <IconButton
                  tooltip={I18n.t("UPLOAD.EXPORT")}
                  flow="right"
                  color="primary"
                  className={classes.icon}
                >
                  <GetApp className={classes.download} />
                </IconButton>
              }
            >
              <Workbook.Sheet data={this.state.excelData} name="Sheet A">
                {this.props.columns.map((x) => {
                  return (
                    <Workbook.Column
                      key={x.name}
                      label={x.name}
                      value={x.selector ? x.selector : ""}
                    />
                  );
                })}
              </Workbook.Sheet>
            </Workbook>
          )}
          <TablePagination
            rowsPerPageOptions={paginationOptions.rowsArray}
            component="div"
            count={this.state.data.length}
            rowsPerPage={paginationOptions.rowsPerPage}
            page={paginationOptions.page}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        </>
      )
    );
  };

  renderSearch = () => {
    const { searchBar } = this.props;
    const style = {
      position: "fixed",
      zIndex: 5,
      opacity: "0.5",
    }
    return (
      searchBar && (
        <DebounceInput
          placeholder={I18n.t("MISC.SEARCH")}
          variant="outlined"
          debounceTimeout={500}
          value={this.state.searchText}
          onChange={this.handleSearch}
          style={style}
          className="DebounceInput"
        />
      )
    );
  };

  handleValueSelection = (value, selectedColumn) => {
    const dropdownState = { ...this.state.stateOfDropdown };
    const col = selectedColumn;

    if (dropdownState[col]) {
      let arr = [];

      arr = dropdownState[col]; //wf
      arr.push(value);
    } else {
      dropdownState[col] = value;
    }

    this.setState({ stateOfDropdown: dropdownState });
  };
  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  renderFilterHead = () => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    return (
      this.state.showFilterHeaderRow && (
        <TableRow>
          <TableCell className="data-table-checkbox">
            <Checkbox disabled />
          </TableCell>
          {this.props.columns.map((column) => {
            return column.selector ? (
              <TableCell className="data-table-action" key={column.name}>
                <FormControl>
                  <InputLabel htmlFor="select-multiple-checkbox"></InputLabel>
                  <Select
                    multiple
                    value={[this.state.stateOfDropdown[column.selector]]}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {this.state.data &&
                      this.state.data.map((item) => {
                        return (
                          <MenuItem
                            key={item._id}
                            value={item[column.selector]}
                          >
                            <Checkbox
                              checked={
                                this.props.selectedList.indexOf(
                                  item[column.selector]
                                ) > -1
                              }
                              value={item[column.selector]}
                              color="primary"
                              onClick={(e) =>
                                this.handleValueSelection(
                                  e.target.value,
                                  column.selector
                                )
                              }
                            />
                            <ListItemText primary={item[column.selector]}>
                              {" "}
                              {item[column.selector]}
                            </ListItemText>
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </TableCell>
            ) : (
              column.actions.map((ele) => {
                return <TableCell key={ele.name} />;
              })
            );
          })}
        </TableRow>
      )
    );
  };

  clearSearchText = () => {
    this.setState({
      searchText: "",
      emptySearch: false,
      data: this.props.data,
    });
  };

  renderEmptySearchRow = () => {
    return (
      <div>
        {I18n.t("MISC.NO_RESULT_FOUND")}
        <Link onClick={this.clearSearchText}>
          {I18n.t("MISC.CLEAR_SEARCH_FILTERS")}
        </Link>
      </div>
    );
  };

  render = () => {
    const { classes } = this.props;

    return (
      <>
        <div
          className={this.props.heightClass}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {this.renderSearch()}
          <div className={classes.div}>
            <Table stickyHeader className={classes.innerTableList}>
              {this.renderTableHead()}
              {this.renderFilterHead()}
              {this.renderRows()}
            </Table>
            {this.state.emptySearch && this.renderEmptySearchRow()}
          </div>
          <div className="data-table-paginationBox" style={{ marginTop: "auto" }}>
            {this.renderPagination()}
          </div>
        </div>
      </>
    );
  };

  renderRow = (row, index, rowKey, classes) => {
    return (
      <TableRow
        key={row[rowKey]}
        className={classes.rowHover}
        onClick={() =>
          this.props.checkbox && this.handleToggleCheck(row[rowKey])
        }
      >
        {this.props.checkbox && (
          <TableCell className="data-table-checkbox">
            <Checkbox checked={this.props.selectedList.includes(row[rowKey])} />
          </TableCell>
        )}

        {this.state.columns.map((column) => {
          if (column.type !== "actions") {
            if (column.type === "date") {
              return (
                <Tooltip
                  disableFocusListener={true}
                  title={moment(row[column.selector]).format(
                    "YYYY-MM-DD HH:mm:ss.SSS"
                  )}
                  key={column.selector}
                >
                  <TableCell>
                    {row[column.selector]
                      ? column.formatter(
                        moment(row[column.selector]).format(DATE_FORMAT)
                      )
                      : "NA"}
                  </TableCell>
                </Tooltip>
              );
            }

            if (column.type === "link") {
              return (
                <TableCell key={column.selector} style={{ width: "35%" }}>
                  <Link onClick={(e) => column.clickHandler(e, row[rowKey])}>
                    {row[column.selector]}
                  </Link>
                </TableCell>
              );
            }

            if (column.rowSpan) {
              const firstIndex = _.findIndex(
                this.state.data,
                (ele) => ele.problem === row.problem
              );
              const lastIndex = _.findLastIndex(
                this.state.data,
                (ele) => ele.problem === row.problem
              );

              let diff = 0;

              if (firstIndex > -1 && lastIndex > -1) {
                diff = lastIndex - firstIndex;
              }

              const span = diff + 1;

              return (
                <>
                  {(index === 0 || index === firstIndex) && (
                    <TableCell
                      key={column.selector}
                      rowSpan={span}
                      style={
                        column.selector === "problem"
                          ? span > 1
                            ? { width: "35%" }
                            : { width: "50%" }
                          : {}
                      }
                    >
                      {column.formatter(row[column.selector])}
                    </TableCell>
                  )}
                </>
              );
            }

            return (
              <TableCell key={column.selector}>
                {column.formatter(row[column.selector])}
              </TableCell>
            );
          }

          if (column.type === "actions") {
            if (column.rowSpan) {
              const { columns } = this.props;
              const { order, orderBy, paginationOptions } = this.state;
              const { page, rowsPerPage } = paginationOptions;

              const data = stableSort(
                this.state.data,
                getSorting(order, orderBy, columns)
              ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
              const nextRowStatus =
                data && data.length > 0 && data[index + 1]
                  ? data[index + 1].Status
                  : "";
              const lastRowStatus =
                data && data.length > 0 && data[index - 1]
                  ? data[index - 1].Status
                  : "";
              const nextToNextRowStatus =
                data && data.length > 0 && data[index + 2]
                  ? data[index + 2].Status
                  : "";
              const lastToLastRowStatus =
                data && data.length > 0 && data[index - 2]
                  ? data[index - 2].Status
                  : "";

              if (
                row.Status === "Pending" &&
                row.Status === nextRowStatus &&
                row.Status === nextToNextRowStatus &&
                row.Status !== lastRowStatus &&
                row.Status !== lastToLastRowStatus
              ) {
                return column.actions.map((col) => (
                  <>
                    {!col.type && !col.data && (
                      <TableCell
                        className="data-table-action"
                        key={col.name}
                        style={DataTableStyles.tableCell}
                        rowSpan={column.rowSpan}
                      >
                        <Tooltip disableFocusListener={true} title={col.name} >
                          <span>
                            <IconButton
                              onClick={(e) => col.handler(e, row[rowKey])}
                              disabled={this.disablingActionItems(
                                col,
                                row,
                                rowKey
                              )}
                              color={
                                this.disablingActionItems(col, row, rowKey) &&
                                  col.color
                                  ? "disabled"
                                  : col.color
                              }
                              style={
                                this.disablingActionItems(col, row, rowKey) &&
                                  col.style
                                  ? {}
                                  : col.style
                              }
                            >
                              {col.icon}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    )}
                    {col.type && col.type === "excelDownload" && col.data && (
                      <TableCell
                        className="data-table-action"
                        key={col.name}
                        style={DataTableStyles.tableCell}
                        rowSpan={column.rowSpan}
                      >
                        <Workbook
                          filename={col.fileName}
                          element={
                            <Tooltip
                              disableFocusListener={true}
                              title={col.name}
                            >
                              <span>
                                <IconButton
                                  disabled={this.disablingActionItems(
                                    col,
                                    row,
                                    rowKey
                                  )}
                                  color={
                                    this.disablingActionItems(col, row, rowKey) &&
                                      col.color
                                      ? "disabled"
                                      : col.color
                                  }
                                  style={
                                    this.disablingActionItems(col, row, rowKey) &&
                                      col.style
                                      ? {}
                                      : col.style
                                  }
                                >
                                  {col.icon}
                                </IconButton>
                              </span>
                            </Tooltip>
                          }
                        >
                          <Workbook.Sheet data={col.data.data} name="Sheet A">
                            {col.data.columns.map((columns) => {
                              return (
                                <Workbook.Column
                                  key={columns}
                                  label={columns}
                                  value={columns}
                                />
                              );
                            })}
                          </Workbook.Sheet>
                        </Workbook>
                      </TableCell>
                    )}
                  </>
                ));
              }

              if (
                row.Status === "Pending" &&
                row.Status === nextRowStatus &&
                row.Status !== nextToNextRowStatus &&
                row.Status !== lastRowStatus &&
                row.Status !== lastToLastRowStatus
              ) {
                return column.actions.map((col) => (
                  <>
                    {!col.type && !col.data && (
                      <TableCell
                        className="data-table-action"
                        key={col.name}
                        style={DataTableStyles.tableCell}
                        rowSpan={2}
                      >
                        <Tooltip disableFocusListener={true} title={col.name}>
                          <span>
                            <IconButton
                              onClick={(e) => col.handler(e, row[rowKey])}
                              disabled={this.disablingActionItems(
                                col,
                                row,
                                rowKey
                              )}
                              color={
                                this.disablingActionItems(col, row, rowKey) &&
                                  col.color
                                  ? "disabled"
                                  : col.color
                              }
                              style={
                                this.disablingActionItems(col, row, rowKey) &&
                                  col.style
                                  ? {}
                                  : col.style
                              }
                            >
                              {col.icon}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    )}
                    {col.type && col.type === "excelDownload" && col.data && (
                      <TableCell
                        className="data-table-action"
                        key={col.name}
                        style={DataTableStyles.tableCell}
                        rowSpan={2}
                      >
                        <Workbook
                          filename={col.fileName}
                          element={
                            <Tooltip
                              disableFocusListener={true}
                              title={col.name}
                            >
                              <span>
                                <IconButton
                                  disabled={this.disablingActionItems(
                                    col,
                                    row,
                                    rowKey
                                  )}
                                  color={
                                    this.disablingActionItems(col, row, rowKey) &&
                                      col.color
                                      ? "disabled"
                                      : col.color
                                  }
                                  style={
                                    this.disablingActionItems(col, row, rowKey) &&
                                      col.style
                                      ? {}
                                      : col.style
                                  }
                                >
                                  {col.icon}
                                </IconButton>
                              </span>
                            </Tooltip>
                          }
                        >
                          <Workbook.Sheet data={col.data.data} name="Sheet A">
                            {col.data.columns.map((column) => {
                              return (
                                <Workbook.Column
                                  key={column}
                                  label={column}
                                  value={column}
                                />
                              );
                            })}
                          </Workbook.Sheet>
                        </Workbook>
                      </TableCell>
                    )}
                  </>
                ));
              }

              if (
                row.Status === "Pending" &&
                row.Status !== nextRowStatus &&
                row.Status !== lastRowStatus
              ) {
                return column.actions.map((col) => (
                  <>
                    {!col.type && !col.data && (
                      <TableCell
                        className="data-table-action"
                        key={col.name}
                        style={DataTableStyles.tableCell}
                        rowSpan={1}
                      >
                        <Tooltip disableFocusListener={true} title={col.name}>
                          <span>
                            <IconButton
                              onClick={(e) => col.handler(e, row[rowKey])}
                              disabled={this.disablingActionItems(
                                col,
                                row,
                                rowKey
                              )}
                              color={
                                this.disablingActionItems(col, row, rowKey) &&
                                  col.color
                                  ? "disabled"
                                  : col.color
                              }
                              style={
                                this.disablingActionItems(col, row, rowKey) &&
                                  col.style
                                  ? {}
                                  : col.style
                              }
                            >
                              {col.icon}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    )}
                    {col.type && col.type === "excelDownload" && col.data && (
                      <TableCell
                        className="data-table-action"
                        key={col.name}
                        style={DataTableStyles.tableCell}
                        rowSpan={1}
                      >
                        <Workbook
                          filename={col.fileName}
                          element={
                            <Tooltip
                              disableFocusListener={true}
                              title={col.name}
                            >
                              <span>
                                <IconButton
                                  disabled={this.disablingActionItems(
                                    col,
                                    row,
                                    rowKey
                                  )}
                                  color={
                                    this.disablingActionItems(col, row, rowKey) &&
                                      col.color
                                      ? "disabled"
                                      : col.color
                                  }
                                  style={
                                    this.disablingActionItems(col, row, rowKey) &&
                                      col.style
                                      ? {}
                                      : col.style
                                  }
                                >
                                  {col.icon}
                                </IconButton>
                              </span>
                            </Tooltip>
                          }
                        >
                          <Workbook.Sheet data={col.data.data} name="Sheet A">
                            {col.data.columns.map((column) => {
                              return (
                                <Workbook.Column
                                  key={column}
                                  label={column}
                                  value={column}
                                />
                              );
                            })}
                          </Workbook.Sheet>
                        </Workbook>
                      </TableCell>
                    )}
                  </>
                ));
              }

              return (
                <>
                  <TableCell
                    className="data-table-action"
                    style={DataTableStyles.tableCell}
                  ></TableCell>
                  <TableCell
                    className="data-table-action"
                    style={DataTableStyles.tableCell}
                  ></TableCell>
                </>
              );
            }

            return column.actions.map((col) => (
              <TableCell
                className="data-table-action"
                key={col.name}
                style={DataTableStyles.tableCell}
              >
                <Tooltip disableFocusListener={true} title={col.name}>
                  <span>
                    <IconButton
                      onClick={(e) => col.handler(e, row[rowKey])}
                      disabled={this.disablingActionItems(col, row, rowKey)}
                      color={
                        this.disablingActionItems(col, row, rowKey) && col.color
                          ? "disabled"
                          : col.color
                      }
                      style={
                        this.disablingActionItems(col, row, rowKey) && col.style
                          ? {}
                          : col.style
                      }
                    >
                      {col.icon}
                    </IconButton>
                  </span>
                </Tooltip>
              </TableCell>
            ));
          }
        })}
      </TableRow>
    );
  };
}

function mapStateToProps(state) {
  return {
    selectedList: state.selectedList,
    selectedAll: state.selectedAll,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectedListAction: SelectedListAction,
      selectedListResetAction: SelectedListResetAction,
      selectedAllListAction: SelectedAllListAction,
    },
    dispatch
  );
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  checkbox: PropTypes.bool,
  isDownload: PropTypes.bool,
  heightClass: PropTypes.string,
  pagination: PropTypes.bool,
  paginationOptions: PropTypes.object,
  onSelectionChange: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  classes: PropTypes.object,
  searchBar: PropTypes.bool,
  searchFieldCSS: PropTypes.object,
  selectedTerminalBar: PropTypes.bool,
};

DataTable.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(DataTableStyles)(withWidth()(DataTable)));

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const getSorting = (order, orderBy, columns) => {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy, columns)
    : (a, b) => -desc(a, b, orderBy, columns);
};

const desc = (a, b, orderBy, columns) => {
  let isDate = false;

  columns.map((column) => {
    if (column.selector === orderBy) {
      if (column.type === "date") {
        isDate = true;
      }
    }
  });

  if (isDate) {
    if (Math.sign(new Date(a[orderBy]) < new Date(b[orderBy]))) {
      return 1;
    }

    if (Math.sign(new Date(a[orderBy]) > new Date(b[orderBy]))) {
      return -1;
    }

    return 0;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};
