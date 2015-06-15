import React from "react";

// Stores
import LoginStore from "../stores/LoginStore";

// Actions
import LoginActions from "../actions/LoginActions";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };

    // Bindings
    this.onLoginUpdated = this.onLoginUpdated.bind(this);
    //this.loginUser = this.loginUser.bind(this);
  }

  onLoginUpdated(data) {
    this.setState({
      data: data
    });
    this.context.router.transitionTo("/");
  }

  componentDidMount() {
    this.unsubscribe = LoginStore.listen(this.onLoginUpdated);
    LoginActions.logout();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  /*loginUser(e) {
    e.preventDefault();
    var user = {
      username: React.findDOMNode(this.refs.username).value.trim(),
      password: React.findDOMNode(this.refs.password).value.trim()
    };
    LoginActions.login(user);
  }*/

  render() {
    return(
      <div>
      </div>
    );
  }
}

Register.contextTypes = {
  router: React.PropTypes.func
};
