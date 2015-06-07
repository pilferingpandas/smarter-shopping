
module.exports = {
  // login function is not fully implemented
  login: function(email, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb true;
      this.onChange(true);
      return;
    }
  },

  logout: function(cb) {
    delete localStorage.token
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn: function() {
    return !!localStorage.token;
  }
}
