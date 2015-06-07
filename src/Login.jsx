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
      <div id="login">
        <h2>Login</h2>
        <form className="login-form" onSubmit={this.loginUser}>
          <input ref="username" placeholder="Username" />
          <input ref="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
});

module.exports = Login;
