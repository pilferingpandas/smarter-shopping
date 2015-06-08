var React = require('react');
var Eventful = require('eventful-react');

var Login = Eventful.createClass({
  loginUser: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    this.emit('login', {
      username: username,
      password: password
    });
  },

  render: function() {
    return (
      <div id="login" className="middle-box text-center loginscreen  animated fadeInDown">
        <div>
          <div>
            <h1 className="logo-name">SSL</h1>
          </div>
          <h3>Welcome to Smart Shopping List</h3>
          <p>Login</p>
          <form className="login-form" name="loginform" onSubmit={this.loginUser} role="form" novalidate>
            <div className="form-group">
              <input ref="username" placeholder="Username" />
            </div>
            <div className="form-group">
              <input ref="password" placeholder="Password" />
            </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <p className="text-muted text-center"><small>If you don't already have an account...</small></p>
                <a className="btn btn-sm btn-white btn-block" href="#/register">Register</a>
              </form>
            </div>
          </div>
    );
  }
});

module.exports = Login;
