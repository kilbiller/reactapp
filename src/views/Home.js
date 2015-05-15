import React from "react";
import {Link} from "react-router";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Link to="anime">Anime</Link>
      </div>
    );
  }
}
