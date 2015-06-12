var React = require('react');
var Eventful = require('eventful-react');
var ModeToggle = require('./ModeToggle');
var List = require('./List');
var Feed = require('./Feed');
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

    if (this.props.data.mode !== ModeToggle.FEED) {

      return (
        <div id="home">
          <ModeToggle mode={this.props.data.mode} />
          <List items={this.props.data.items} pastItems={this.props.data.pastItems} mode={this.props.data.mode} />
        </div>
      );

    } else {

      return (
        <div id="home">
          <ModeToggle mode={this.props.data.mode} />
          <Feed mode={this.props.data.mode} />
        </div>
      );

    }

  }
});

module.exports = Home;
