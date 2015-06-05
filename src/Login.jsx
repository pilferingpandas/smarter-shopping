var React = require('react');

var Login = React.createClass({

  handleSubmit: function(event) {
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.email.getDOMNode().value;
    var loginUrl = url + '/api/login';
    $.post('/api/login', function() {
      url: ,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ error: true })
        console.error(loginUrl, status, err);
      }.bind(this)
    })
  },

  render: function() {
    return (
      <div id="login">
        <h2> Login </h2>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" ></label>
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

module.exports = Login;
