var React = require('react');

var Register = React.createClass({
  getInitialState: function() {
    this.setState({ error: false});
    this.handeSubmit = this.handeSubmit.bind(this);
  },
  
  handleSubmit: function(event) {
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var signupUrl = url + '/api/signup';
    $.post('/api/signup', function() {
      url: signupUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ data: data})
        console.log(data)
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ error: true })
        console.error(signupUrl, status, err);
      }.bind(this)
    })
  }
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
