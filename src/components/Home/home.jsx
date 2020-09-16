import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Skeleton } from "@material-ui/lab";
import {
  Tabs,
  Button,
  Tab,
  TextField,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import "./home.scss";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import Designer from "../Designer/designer";
import Guru from "../Guru/guru";
import CloseIcon from "@material-ui/icons/Close";
import { Getalluser } from "../../redux/action/user-action";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { AddRecipent } from "../../redux/action/addRecipent-action";

// Create tab panner in react material Ui
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      searchValue: "",
      active: false,
    };
  }

  handlepanleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  // get user Details
  getUserData = () => {
    try {
      this.props.dispatch(Getalluser("_order=desc"));
    } catch (error) {
      console.log(error);
    }
  };

  SearchDesiner = (e, values) => {
    e.preventDefault();
    try {
      this.props.dispatch(Getalluser("q=" + values));
    } catch (error) {
      console.log(error);
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });

    this.getUserData();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRemoveRecipent = (e, value) => {
    e.preventDefault();
    if (value === null) {
      this.props.dispatch(AddRecipent([]));
    } else {
      var data = this.props.RecipentData.filter((x) => x._id !== value._id);

      this.props.dispatch(AddRecipent(data));
    }
  };
  render() {
    let { UserData } = this.props;

    return (
      <>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Open dialog
        </Button>
        {/* open={this.state.open} */}
        <Dialog
          fullScreen
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          // open={true}
          open={this.state.open}
          TransitionComponent={Transition}
          className="modal-user-list"
        >
          <AppBar>
            <Toolbar className="m-title">
              <IconButton edge="start" className="icon-back">
                <KeyboardBackspaceIcon />
              </IconButton>
              {UserData ? (
                <p>Undang Peserta Terbaik untuk Tim Baru mu! </p>
              ) : (
                <p>
                  <Skeleton animation="wave" variant="rect" />
                </p>
              )}
              <IconButton
                edge="start"
                className="icon-close"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent className="m-body">
            <Box className="tabs-bx">
              <Tabs
                value={this.state.value}
                onChange={this.handlepanleChange}
                className="tb-title"
                aria-label="simple tabs example"
                centered
              >
                <Tab className="t-btn" label="Desainer" {...a11yProps(0)} />
                <Tab className="t-btn" label="Guru" {...a11yProps(1)} />
              </Tabs>
              <Box display="flex" className="search-bx">
                <div
                  className={`icon-search ${this.state.active ? "active" : ""}`}
                >
                  <SearchIcon />
                </div>
                <>
                  <TextField
                    id="filled-text-input"
                    className="form-control"
                    placeholder="Cari Nama Peserta"
                    type="search"
                    variant="outlined"
                    value={this.state.searchValue}
                    onChange={(e) => {
                      this.setState({ searchValue: e.target.value });
                      this.SearchDesiner(e, e.target.value);
                    }}
                  />
                </>
              </Box>
              <TabPanel className="tb-body" value={this.state.value} index={0}>
                <h5>SUGGESTIONS</h5>
                <Box className="tb-lists-bx">
                  <Designer />
                </Box>
              </TabPanel>
              <TabPanel className="tb-body" value={this.state.value} index={1}>
                <Guru />
              </TabPanel>
            </Box>
          </DialogContent>
          <DialogActions className="m-footer">
            {this.props.RecipentData && this.props.RecipentData.length > 0 && (
              <Box className="recipent-bx">
                <Box
                  className="rb-top"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <h6>Recipent</h6>
                  <a
                    onClick={(e) => this.handleRemoveRecipent(e, null)}
                    className="clear-all"
                  >
                    Clear all
                  </a>
                </Box>
                <Box className="rb-bottom" display="flex" flexWrap="wrap">
                  {this.props.RecipentData.map((item, i) => {
                    return (
                      <Button className="btn-chip" key={i}>
                        {item.name}{" "}
                        <span
                          onClick={(e) => this.handleRemoveRecipent(e, item)}
                          className="cancel"
                        >
                          X
                        </span>
                      </Button>
                    );
                  })}
                </Box>
              </Box>
            )}

            <Button
              autoFocus
              className={`btn btn-undang ${
                this.props.RecipentData.length ? "active" : ""
              }`}
              onClick={this.handleClose}
            >
              <PersonAddIcon />
              Undang Bergabung{" "}
              {this.props.RecipentData.length > 0 && (
                <>({this.props.RecipentData.length})</>
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = (state) => {
  let { UserData, UserError } = state.UserReducer;
  let { RecipentData } = state.RecipentReducer;

  return {
    UserData,
    UserError,
    RecipentData,
  };
};

export default withRouter(connect(mapStateToProps)(Home));
