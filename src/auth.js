module.exports = {
  login: function(username, password, cb) {
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
    console.log('localStorage:',localStorage);
    return !!localStorage.token;
  }
};
