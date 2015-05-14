import React from "react";
import {RaisedButton} from "material-ui";

// Actions
import AnimeActions from "../actions/AnimeActions";

export default class Test extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.delete = this.delete.bind(this);
  }

  delete() {
    AnimeActions.testDelete(this.props.id);
  }

  render() {
    return <div>
      <h2>{this.props.item.name}</h2>
      <RaisedButton label="Delete" onClick={this.delete}/>
      </div>;
  }
}
