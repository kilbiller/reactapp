import React from "react";

// Stores
import UserStore from "../stores/UserStore";

// Actions
import UserActions from "../actions/UserActions";

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };

    // Bindings
    this.onUserUpdated = this.onUserUpdated.bind(this);
  }

  onUserUpdated(data) {
    this.setState({
      data: data
    });
  }

  componentDidMount() {
    this.unsubscribe = UserStore.listen(this.onUserUpdated);
    UserActions.logout();
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
