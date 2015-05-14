import React from "react";
import {RaisedButton} from "material-ui";

// Actions
import TestActions from "../actions/TestActions";

export default class Test extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.delete = this.delete.bind(this);
  }

  delete() {
    TestActions.testDelete(this.props.id);
  }

  render() {
    return <div>
      <h2>{this.props.item.name}</h2>
      <RaisedButton label="Delete" onClick={this.delete}/>
      </div>;
  }
}
