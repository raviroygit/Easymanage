import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { ApplicationStyles } from './ApplicationStyles';
import { getApplicationById } from '../../../redux/actions/Application/GetApplicationAction';
import {
    Paper,
    Fab,
    Typography,
    Grid,
    ListItemText,
    withStyles,
    Card,
    MenuItem,
    Divider,
    MenuList
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withRouter } from "react-router";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import moment from "moment";
import { getApplicationByVersion, resetApplicationByVersion } from '../../../redux/actions/Application/GetApplicationByVersion';


class ApplicationTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { applicationId: '', name: '', isResetDialogOpen: false, isOpenDialog: false, isAdd: false };
    };

    componentDidMount() {
        this.props.getApplicationById(this.props.match.params.id);
        this.props.getApplicationByVersion(this.props.match.params.id);
    };

    componentDidUpdate(prevProps) {
        if (this.props.application && this.props.application.versionList && this.props.application.versionList.length > 0 && JSON.stringify(this.props.application) !== JSON.stringify(prevProps.application)) {
            const defaultId = this.props.application.versionList[0]._id;
            this.props.getApplicationByVersion(defaultId);
        };
    };

    handleOnClick = (e) => {
        this.setState({ applicationId: e.target.id, redirected: true });

    };
    handleReturn = () => {
        this.props.history.push('/application');
        this.props.resetApplicationByVersion();
    };

    handleDetailsByVersion = (e) => {
        this.props.getApplicationByVersion(e.target.id);
    };

    render() {

        const { classes } = this.props;
        return (
            <>
                <Paper >
                    <Card>
                        <Grid container spacing={3}>
                            <Grid className={classes.backButtonContainer}>
                                <ArrowBackIosIcon className={classes.backButton} size="large" onClick={this.handleReturn} />
                            </Grid>
                            <Grid className={classes.detailsHeadingContainer}>
                                <Typography className={classes.detailsHeading}> {I18n.t("FILE_UPLOAD.HEADING")} </Typography>
                            </Grid>
                        </Grid>
                    </Card>

                    <Card className={classes.detailsCard}>
                        <Grid item md="auto" className={classes.card}>
                            <Typography className={classes.technicalText}>
                                {this.props.application && this.props.application.title}
                            </Typography>
                            <Grid container spacing={2}>
                                {this.props.application && this.props.application.isVerified &&
                                    <Grid item md={4} sm={6} xs={6}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.VERIFIED"
                                            )}`}
                                            secondary={<VerifiedUserIcon className={classes.verifiedIcon} />}
                                        />

                                    </Grid>
                                }

                                <Grid item md={4} sm={6} xs={6}>
                                    <ListItemText
                                        className={classes.listTextStyle}
                                        primary={`${I18n.t(
                                            "FILE_UPLOAD.DEVELOPER"
                                        )}`}
                                        secondary={this.props.application.developer ? this.props.application.developer : ""}
                                    />
                                </Grid>
                                <Grid item md={4} sm={6} xs={6}>
                                    <ListItemText
                                        className={classes.listTextStyle}
                                        primary={`${I18n.t(
                                            "FILE_UPLOAD.APPLICATION_NAME"
                                        )}`}
                                        secondary={this.props.application.name ? this.props.application.name : ""}
                                    />
                                </Grid>

                                <Grid item md={4} sm={6} xs={6}>
                                    <ListItemText
                                        className={classes.listTextStyle}
                                        primary={`${I18n.t(
                                            "FILE_UPLOAD.APP_TYPE"
                                        )}`}
                                        secondary={this.props.application.appType ? this.props.application.appType : ""}
                                    />
                                </Grid>
                                <Grid item md={4} sm={6} xs={6}>
                                    <ListItemText
                                        className={classes.listTextStyle}
                                        primary={`${I18n.t(
                                            "FILE_UPLOAD.PRICE"
                                        )}`}
                                        secondary={this.props.application.price ? this.props.application.price : ""}
                                    />
                                </Grid>
                                <Grid item md={4} sm={6} xs={6}>
                                    <ListItemText
                                        className={classes.listTextStyle}
                                        primary={`${I18n.t(
                                            "FILE_UPLOAD.BUSINESS_CATEGORIES"
                                        )}`}
                                        secondary={this.props.application.businessCategories ? this.props.application.businessCategories : ""}
                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Card>
                    <Grid container spacing={3} style={{ marginTop: "2px" }}>
                        <Grid item xs={3} sm={3}>
                            <Typography>{I18n.t("FILE_UPLOAD.VERSION_LIST")} ({this.props.application && this.props.application.versionList && this.props.application.versionList.length})</Typography>
                            <Divider light={true} />
                            {this.props.application && this.props.application.versionList && this.props.application.versionList.length > 0 && this.props.application.versionList.map(x => (
                                <Card style={{ marginTop: "5px" }}>
                                    <MenuList
                                        variant='selectedMenu'
                                        defaultInputValue
                                    >
                                        <MenuItem key={x.version} selected="62790dc8a795e74e9c8b94d7" id={x._id} onClick={this.handleDetailsByVersion}>
                                            {I18n.t("FILE_UPLOAD.VERSION")} {x.version}
                                            <br />
                                            {moment(x.createdAt).format("DD-MM-YYYY HH:MM:SS")}
                                        </MenuItem>
                                    </MenuList>
                                </Card>
                            ))}
                        </Grid>
                        <Grid item xs={9} sm={9}>
                            <Card>
                                <Grid container>
                                    <Grid item xs={3} sm={3}>
                                        <img width='100' height='60' src={`data:image/jpeg;base64,${this.props.applicationByVersion && this.props.applicationByVersion.logo ? this.props.applicationByVersion.logo : ""}`} alt="app" />
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                        <Typography >{this.props.applicationByVersion && this.props.applicationByVersion.title ? this.props.applicationByVersion.title : ""}
                                            {this.props.application && this.props.application.isVerified && <VerifiedUserIcon style={{ color: "blue", height: "15px", marginTop: "5px" }} />}
                                            <br />
                                            <span>Package Name : {this.props.applicationByVersion && this.props.applicationByVersion.name ? this.props.applicationByVersion.name : ""}</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider light={true} className={classes.backgroundColor} />
                                <Grid container style={{ margin: "5px" }}>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.DEVELOPER"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.developer ? this.props.applicationByVersion.developer : ""}
                                        />
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.VERSION"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.version ? this.props.applicationByVersion.version : ""}
                                        />
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.SIZE"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.size ? parseInt(this.props.applicationByVersion.size) + " MB" : ""}
                                        />
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.APP_TYPE"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.appType ? this.props.applicationByVersion.appType : ""}
                                        />
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.MODEL"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.model ? this.props.applicationByVersion.model : ""}
                                        />
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.BUSINESS_CATEGORIES"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.businessCategories ? this.props.applicationByVersion.businessCategories : ""}
                                        />
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.PRICE"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.price ? this.props.applicationByVersion.price : ""}
                                        />
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.PUBLISH_TIME"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.createdAt ? moment(this.props.applicationByVersion.createdAt).format("DD-MM-YYYY HH:MM:SS") : ""}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <Typography > {I18n.t("FILE_UPLOAD.SCREENSHOTS")}</Typography>
                                        <Grid style={{ marginTop: "4%" }}>
                                            {this.props.applicationByVersion && this.props.applicationByVersion.screenShots && this.props.applicationByVersion.screenShots.map(x => (
                                                <img width='250' height='200' src={`data:image/jpeg;base64,${x}`} alt="screenshots" />
                                            ))}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.DESCRIPTION"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.description ? this.props.applicationByVersion.description : ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <ListItemText
                                            className={classes.listTextStyle}
                                            primary={`${I18n.t(
                                                "FILE_UPLOAD.RELEASE_NOTE"
                                            )}`}
                                            secondary={this.props.applicationByVersion && this.props.applicationByVersion.releaseNote ? this.props.applicationByVersion.releaseNote : ""}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        );

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            enqueueSnackbar: enqueueSnackbar,
            getApplicationById: getApplicationById,
            getApplicationByVersion: getApplicationByVersion,
            resetApplicationByVersion: resetApplicationByVersion
        },
        dispatch
    );
}

function mapStateToProps(state) {
    return {
        i18n: state.i18n,
        application: state.application,
        applicationByVersion: state.getApplicationByVersion
    };
}

ApplicationTable.propTypes = {
    applicationId: PropTypes.string,
    name: PropTypes.string,
    isResetDialogOpen: PropTypes.bool,
    editDialog: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ApplicationStyles)(withRouter(ApplicationTable)));

