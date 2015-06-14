import Reflux from "reflux";

import LoginActions from "../actions/LoginActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(LoginActions);
    this.user = null;
  },
  onRegister: function() {
    console.log("Registering User...");
  },
  onRegisterCompleted: function(payload) {
    console.log("Registration successful.");
    this.user = payload.user;
    this.trigger(this.user);
  },
  onRegisterFailed: function(payload) {
    console.log("Error during registration : " + payload.error);
  },
  onLogin: function() {
    console.log("Login User...");
  },
  onLoginCompleted: function(payload) {
    console.log("Login successful.");
    this.user = payload.user;
    this.trigger(this.user);
  },
  onLoginFailed: function(payload) {
    console.log("Error during Login : " + payload.error);
  },
  onLogout: function() {
    console.log("Login out...");
  },
  onLogoutCompleted: function(payload) {
    console.log("Logout successful.");
    this.trigger(this.user);
  },
  onLogoutFailed: function(payload) {
    console.log("Error during logout : " + payload.error);
  }
});
