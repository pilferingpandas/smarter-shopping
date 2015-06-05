var React = require('react');

var Register = React.createClass({
  render: function() {
    return (
      <div id="register">
        <h2> Register </h2>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" /></label>
          <label><input ref="pass" placeholder="password"/></label>
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
