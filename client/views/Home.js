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
        <ul>
          <li><Link to="/animes">Get All Anime</Link></li>
          <li><Link to="/animes/Guilty Crown">Get Guilty Crown</Link></li>
          <li><Link to="/addanime">Add an anime</Link></li>
          <li><Link to="/register">Create an account</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/logout">Logout</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
        </ul>
      </div>
    );
  }
}
