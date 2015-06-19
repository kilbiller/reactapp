import React from "react";

// Stores
import LoginStore from "../stores/LoginStore";

// Actions
import LoginActions from "../actions/LoginActions";

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };

    // Bindings
    this.onLoginUpdated = this.onLoginUpdated.bind(this);
  }

  onLoginUpdated(data) {
    this.setState({
      data: data
    });
  }

  componentDidMount() {
    this.unsubscribe = LoginStore.listen(this.onLoginUpdated);
    LoginActions.logout(this.context.router);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return(
      <div>
      </div>
    );
  }
}

Logout.contextTypes = {
  router: React.PropTypes.func
};
