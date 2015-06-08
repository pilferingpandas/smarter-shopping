var React = require('react');
var Eventful = require('eventful-react');
var ModeToggle = require('./ModeToggle');
var List = require('./List');
var auth = require('./auth');

var Home = Eventful.createClass({
  statics: {
    willTransitionTo: function (transition) {
      console.log(auth.loggedIn());
      if (!auth.loggedIn()) {
        transition.redirect('/login');
      }
    }
  },

  render: function() {
    return (
      <div id="home">
        <ModeToggle mode={this.props.data.mode} />
        <List items={this.props.data.items} />
      </div>
    );
  }
});

module.exports = Home;
