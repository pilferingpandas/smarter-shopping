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
    <div id="register" className="middle-box text-center loginscreen  animated fadeInDown">
      <div>
        <div>
          <h2 className="logo-name"><i className="fa fa-cart-plus fa-spin"></i><br />SSL</h2>
        </div>
        <h3>Welcome to Smart Shopping List</h3>
        <p>Register</p>
        <form className="register-form" name="registerform" onSubmit={this.registerUser}>
          <div className="form-group">
            <i className="fa fa-user-plus fa-lg"></i>&nbsp;&nbsp;&nbsp;<input ref="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <i className="fa fa-key fa-lg"></i>&nbsp;&nbsp;&nbsp;<input ref="password" placeholder="Password" type="password" />
          </div>
          <button type="submit" className="btn btn-success btn-block" ><i className="fa fa-user-plus fa-lg"></i>&nbsp;&nbsp;&nbsp;Register</button>
          <p className="text-muted text-center"><small>If you already have an account...</small></p>
          <a className="btn btn-sm btn-primary btn-block" href="#/login"><i className="fa fa-user fa-lg"></i>&nbsp;&nbsp;&nbsp;Login</a>
        </form>
      </div>
    </div>
    );
  }
});

module.exports = Register;
