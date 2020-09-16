import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Guru extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    return <>hey Guru components</>;
  }
}

const mapStateToProps = (state) => ({ state });

export default withRouter(connect(mapStateToProps)(Guru));
