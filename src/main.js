import React from "react";
import Router, {Route, RouteHandler} from "react-router";
import {RaisedButton} from "material-ui";

// Stores
import TestStore from "./stores/TestStore";

// Actions
import TestActions from "./actions/TestActions";

// Components
import Test from "./components/TestComponent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: TestStore.list
    };

    // Bindings
    this.onTestChange = this.onTestChange.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  deleteAll() {
    TestActions.testDeleteAll();
  }

  onTestChange(test) {
    this.setState({
      list: test
    });
  }

  componentDidMount() {
    this.unsubscribe = TestStore.listen(this.onTestChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <div>
      <h1>Hello, world!</h1>
      {this.state.list.map(function(item, i) {
        return <Test id={i} item={item} key={i} />;
      })}
      <RaisedButton label="Delete all" onClick={this.deleteAll}/>
      <RouteHandler/>
    </div>;
  }
}

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="about" path="about" handler={App}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
