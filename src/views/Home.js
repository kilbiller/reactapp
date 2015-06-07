import React from "react";
import {
  Link
}
from "react-router";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Link to="/animes">Get All Anime</Link>
        <br/>
        <Link to="/animes/Guilty Crown">Get Guilty Crown</Link>
        <br/>
        <Link to="/addanime">Add an anime</Link>
      </div>
    );
  }
}
