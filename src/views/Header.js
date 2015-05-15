import React from "react";
import {Link} from "react-router";
import {Paper} from "material-ui";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper className="header" zDepth={0}>
        <h1><Link to="app">AnimeList</Link></h1>
      </Paper>
    );
  }
}
