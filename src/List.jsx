var React = require('react');
var Eventful = require('eventful-react');
var ListItem = require('./ListItem');

var List = Eventful.createClass({
  createListItem: function(itemData, id) {
    return (
      <ListItem key={id} index={id} name={itemData.name} />
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
