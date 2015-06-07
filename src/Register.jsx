var React = require('react');
var Eventful = require('eventful-react');

var Register = Eventful.createClass({
  registerUser: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    this.emit('register', {
      username: username,
      password: password
    });
  },

  render: function() {
    return (
      <div id="register">
        <h2>Register</h2>
        <form className="register-form" onSubmit={this.registerUser}>
          <input ref="username" placeholder="username" />
          <input ref="password" placeholder="password" />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
});

module.exports = Register;
