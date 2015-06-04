var React = require('react');
var Eventful = require('eventful-react');
var List = require('./List');

var Home = Eventful.createClass({
  render: function() {
    return (
      <div id="home">
        <List items={this.props.data} />
      </div>
    );
  }
});

module.exports = Home;
