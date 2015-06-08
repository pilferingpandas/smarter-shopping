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
            <h2 className="logo-name"><i className="fa fa-shopping-cart fa-spin"></i><br />SSL</h2>
          </div>
          <h3>Welcome to Smart Shopping List</h3>
          <p>Login</p>
          <form className="login-form" name="loginform" onSubmit={this.loginUser} role="form">
            <div className="form-group">
              <i className="fa fa-user fa-lg"></i>&nbsp;&nbsp;&nbsp;<input ref="username" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <i className="fa fa-key fa-lg"></i>&nbsp;&nbsp;&nbsp;<input ref="password" placeholder="Password" type="password" />
            </div>
                <button type="submit" className="btn btn-primary btn-block"><i className="fa fa-user fa-lg"></i>&nbsp;&nbsp;&nbsp;Login</button>
                <p className="text-muted text-center"><small>If you don't already have an account...</small></p>
                <a className="btn btn-sm btn-success btn-block" href="#/register"><i className="fa fa-user-plus fa-lg"></i>&nbsp;&nbsp;&nbsp;Register</a>
              </form>
            </div>
          </div>
    );
  }
});

module.exports = Login;
