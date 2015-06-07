var React = require('react');
var Eventful = require('eventful-react');

var Register = React.createClass({
  registerUser: function(event) {
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    this.emit('register', email, password);
  },

  render: function() {
    return (
      <div id="register">
        <h2> Register </h2>       
        <form class="register" onSubmit={this.registerUser}>
          <label><input ref="email" placeholder="email" /></label>
          <label><input ref="password" placeholder="password"/></label>
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
      </div>
    );
  }
});

module.exports = Register;
