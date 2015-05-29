var React = require('react');
var ListItem = require('./ListItem');

var List = React.createClass({
  createListItem: function(itemData, id) {
    return (
      <ListItem key={id} name={itemData.name} />
    );
  },
  render: function() {
    return (
      <ul className="list">
        {this.props.items.map(this.createListItem)}
      </ul>
    );
  }
});

module.exports = List;
