var url = require('./url');

module.exports = {
  //logout: function(cb) {
  //  localStorage.removeItem('token');
  //},

  //login: function(token) {
  //  localStorage.setItem('token',token);
  //},

  loggedIn: function(cb) {
    cb(true);
    //$.get(url.token)
    //.done(function(data) {
    //  cb(data);
    //})
    //.fail(function(xhr, status, err) {
    //  console.error('Not authorized:', status, err);
    //  cb(false);
    //});
  }
};
