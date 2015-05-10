import React from "react";

// Stores
import TestStore from "./stores/TestStore";

// Actions
import TestActions from "./actions/TestActions";

// Components
import Test from "./components/TestComponent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: TestStore.list};

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
      {
        this.state.list.map(function(item, i){
          return <Test id={i} item={item} key={i}/>;
        })
      }
      <button onClick={this.deleteAll}>delete all</button>
    </div>;
  }
}

React.render(<App/>, document.body);
