var React = require('react');
var Eventful = require('eventful-react');
var ModeToggle = require('./ModeToggle');
var List = require('./List');
var auth = require('./auth');

var Home = Eventful.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo: function (transition, _, _, cb) {
      auth.loggedIn(function(authed) {
        if (!authed) {
          transition.redirect('/login');
        }
        cb();
      });
    }
  },

  render: function() {
    return (
      <div id="home">
        <ModeToggle mode={this.props.data.mode} />
        <List suggestions={this.props.data.suggestions} items={this.props.data.items} mode={this.props.data.mode} />
      </div>
    );
  }
});

module.exports = Home;
