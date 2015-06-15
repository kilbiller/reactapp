import Reflux from "reflux";
import log from "loglevel";

import LoginActions from "../actions/LoginActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(LoginActions);
    this.user = null;
  },
  onRegister: function() {
    log.info("Registering User...");
  },
  onRegisterCompleted: function(payload) {
    log.info("Registration successful.");
    this.user = payload.user;
    this.trigger(this.user);
  },
  onRegisterFailed: function(payload) {
    log.error("Error during registration : " + payload.error);
  },
  onLogin: function() {
    log.info("Login User...");
  },
  onLoginCompleted: function(payload) {
    log.info("Login successful.");
    this.user = payload.user;
    this.trigger(this.user);
  },
  onLoginFailed: function(payload) {
    log.error("Error during Login : " + payload.error);
  },
  onLogout: function() {
    log.info("Login out...");
  },
  onLogoutCompleted: function(payload) {
    log.info("Logout successful.");
    this.trigger(this.user);
  },
  onLogoutFailed: function(payload) {
    log.error("Error during logout : " + payload.error);
  }
});
