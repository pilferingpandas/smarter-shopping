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
        <List items={this.props.data.items} mode={this.props.data.mode} />
      </div>
    );
  }
});

module.exports = Home;

// render: function() {

//    var dataMode = this.props.data.mode;

//    if (dataMode !== 'FEED') {

//      return (
//        <div id="home">
//          <ModeToggle mode={this.props.data.mode} />
//          <List items={this.props.data.items} mode={this.props.data.mode} />
//        </div>
//      );

//    } else {

//      return (
//        <div id="home">
//          <ModeToggle mode={this.props.data.mode} />
//          Suck it
//        </div>
//      );

//    }

//  }


     // else {
     //    return (
     //      <input type="text" ref="????" name="followerInput" value={this.state.value} onChange={this.updateValue} />
     //    );
     // }













