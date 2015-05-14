import React from "react";
import {Paper} from "material-ui";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper className="header" zDepth={0}>
        <h1>Header!!</h1>
      </Paper>
    );
  }
}
