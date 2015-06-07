module.exports = {
  // login function is not fully implemented
  login: function(email, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
    }
  },

  logout: function(cb) {
    delete localStorage.token
    if (cb) cb();
  },

  loggedIn: function() {
    return !!localStorage.token;
  }
}
