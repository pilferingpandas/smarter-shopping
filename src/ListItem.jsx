var React = require('react');

var ListItem = React.createClass({
  render: function() {
    return (
      <li className="list-item">
        {this.props.name}
      </li>
    );
  }
});

module.exports = ListItem;
