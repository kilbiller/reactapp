import React from "react";

// Stores
import LoginStore from "../stores/LoginStore";

// Actions
import LoginActions from "../actions/LoginActions";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };

    // Bindings
    this.onLoginUpdated = this.onLoginUpdated.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  onLoginUpdated(data) {
    this.setState({
      data: data
    });
  }

  componentDidMount() {
    this.unsubscribe = LoginStore.listen(this.onLoginUpdated);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loginUser(e) {
    e.preventDefault();
    var user = {
      username: React.findDOMNode(this.refs.username).value.trim(),
      password: React.findDOMNode(this.refs.password).value.trim()
    };
    LoginActions.login(user, this.context.router);
  }

  render() {
    return(
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input ref="username" id="username" type="text" className="validate"/>
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s12">
              <input ref="password" id="password" type="password" className="validate"/>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light" onClick={this.loginUser}>Login</button>
        </form>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func
};
