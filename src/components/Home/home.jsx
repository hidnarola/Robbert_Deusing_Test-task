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
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import "./home.scss";
import SearchIcon from "@material-ui/icons/Search";
import Designer from "../Designer/designer";
import Guru from "../Guru/guru";
import CloseIcon from "@material-ui/icons/Close";
import { Getalluser } from "../../redux/action/user-action";

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

        <Dialog
          fullScreen
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          TransitionComponent={Transition}
          className="modal-user-list"
        >
          <AppBar>
            <Toolbar className="m-title">
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <p>Test tasks</p>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent dividers>
            {UserData ? (
              <p>Undang Peserta Terbaik untuk Tim Baru mu! </p>
            ) : (
              <p>
                <Skeleton animation="wave" variant="rect" />
              </p>
            )}

            <Tabs
              value={this.state.value}
              onChange={this.handlepanleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Desainer" {...a11yProps(0)} />
              <Tab label="Guru" {...a11yProps(1)} />
            </Tabs>
            <Box display="flex" className="header-search-bx">
              <div className="search-bx">
                {/* <div className="icon-search">
                    <SearchIcon />
                </div> */}
                <>
                  <TextField
                    id="filled-text-input"
                    className="form-control"
                    placeholder="Cari Nama Peserta"
                    type="text"
                    variant="outlined"
                    value={this.state.searchValue}
                    onChange={(e) => {
                      this.setState({ searchValue: e.target.value });
                      this.SearchDesiner(e, e.target.value);
                    }}
                  />
                </>
              </div>
            </Box>

            <TabPanel value={this.state.value} index={0}>
              <Designer />
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <Guru />
            </TabPanel>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Save changes
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

  return {
    UserData,
    UserError,
  };
};

export default withRouter(connect(mapStateToProps)(Home));
