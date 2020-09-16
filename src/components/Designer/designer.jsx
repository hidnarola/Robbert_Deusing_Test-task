import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton } from "@material-ui/lab";

import StarIcon from "@material-ui/icons/Star";
import { Box, Avatar } from "@material-ui/core";

import "./designer.scss";
import { AddRecipent } from "../../redux/action/addRecipent-action";
class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.RecipentData !== prevProps.RecipentData) {
      if (this.props.RecipentData.length === 0) {
        console.log(this.props.RecipentData, "this.props.RecipentData");
        this.setState({ data: [] });
      }
    }
  };

  handleUserRecipent = (e, values) => {
    e.preventDefault();
    var recipt = [...this.state.data];
    recipt.push(values);
    this.setState({ data: recipt }, () => {
      this.props.dispatch(AddRecipent(this.state.data));
    });
  };
  render() {
    let { UserData, UserError } = this.props;

    return (
      <>
        {UserData ? (
          UserData.map((item, i) => (
            <Box
              className="lb-item"
              display="flex"
              alignItems="center"
              key={i}
              onClick={(e) => this.handleUserRecipent(e, item)}
            >
              <Avatar alt="Remy Sharp" src={item.picture} className="img" />
              <Box className="lbi-desc" display="block">
                <h4>{item.name}</h4>
                <p>
                  {item.company}{" "}
                  <svg
                    className="icon"
                    width="5"
                    height="5"
                    viewBox="0 0 5 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2.5" cy="2.5" r="2.5" fill="#636363" />
                  </svg>
                  Animasi
                </p>
                <Box
                  display="flex"
                  className="lbi-achivement"
                  alignItems="center"
                >
                  <span>
                    <StarIcon className="icon" />
                    4.9
                  </span>
                  <span>
                    <StarIcon className="icon" />
                    25
                  </span>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <p>
            {" "}
            <Skeleton animation="wave" variant="rect" />
          </p>
        )}

        {UserError && <>Something went wrong</>}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  let { UserData, UserError } = state.UserReducer;
  let { RecipentData } = state.RecipentReducer;
  return {
    UserData,
    UserError,
    RecipentData,
  };
};

export default withRouter(connect(mapStateToProps)(Designer));
