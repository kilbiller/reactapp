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
        <br/>
        <Link to="/register">Create an account</Link>
        <br/>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/logout">Logout</Link>
      </div>
    );
  }
}
