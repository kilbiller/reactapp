import React from "react";

// Stores
import UserStore from "../stores/UserStore";

// Actions
import UserActions from "../actions/UserActions";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };

    // Bindings
    this.onUserUpdated = this.onUserUpdated.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  onUserUpdated(data) {
    this.setState({
      data: data
    });
  }

  componentDidMount() {
    this.unsubscribe = UserStore.listen(this.onUserUpdated);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loginUser(e) {
    e.preventDefault();
    var user = {
      username: this.refs.username.value.trim(),
      password: this.refs.password.value.trim()
    };
    UserActions.login(user);
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
