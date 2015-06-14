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
    this.registerUser = this.registerUser.bind(this);
  }

  onLoginUpdated(data) {
    this.setState({
      data: data
    });

    if(this.state.data) {
      this.context.router.transitionTo("/");
    }
  }

  componentDidMount() {
    this.unsubscribe = LoginStore.listen(this.onLoginUpdated);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  registerUser(e) {
    e.preventDefault();
    var user = {
      username: React.findDOMNode(this.refs.username).value.trim(),
      password: React.findDOMNode(this.refs.password).value.trim()
    };
    LoginActions.register(user);
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
          <button className="btn waves-effect waves-light" onClick={this.registerUser}>Add</button>
        </form>
      </div>
    );
  }
}

Register.contextTypes = {
  router: React.PropTypes.func
};
