var React = require('react');
var Eventful = require('eventful-react');

var Login = Eventful.createClass({
  // implemented the following static state per the auth-flow example
  statics: {
    attemptedTransition: null
  },

  loginUser: function(event) {
    event.preventDefault();
    var nextPath = router.getCurrentQuery().nextPath;
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    this.emit('login', email, password);
  },

  render: function() {
    return (
      <div id="login">
        <h2> Login </h2>
        <form class="login" onSubmit={this.loginUser}>
          <label><input ref="email" placeholder="email" ></label>
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

module.exports = Login;
