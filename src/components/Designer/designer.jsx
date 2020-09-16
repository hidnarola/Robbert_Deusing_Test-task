import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton } from "@material-ui/lab";
class Designer extends React.Component {
  render() {
    let { UserData, UserError } = this.props;

    return (
      <>
        {UserData ? (
          UserData.map((item, i) => (
            <div key={i}>
              {item.company ? (
                <p>{item.company}</p>
              ) : (
                <p>
                  {" "}
                  <Skeleton animation="wave" variant="rect" />
                </p>
              )}
            </div>
          ))
        ) : (
          <p>
            {" "}
            <Skeleton />
          </p>
        )}

        {UserError && <>Something went wrong</>}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  let { UserData, UserError } = state.UserReducer;

  return {
    UserData,
    UserError,
  };
};

export default withRouter(connect(mapStateToProps)(Designer));
