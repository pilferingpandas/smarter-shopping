var React = require('react');
var List = require('./List');

var Home = React.createClass({
  render: function() {
    return (
      <div id="home">
        <List items={this.props.data.items} />
      </div>
    );
  }
});

module.exports = Home;
