var React = require('react');
var Eventful = require('eventful-react');
var ListItem = require('./ListItem');

var List = Eventful.createClass({
  getInitialState: function() {
    return {
      addingNewItem: false
    };
  },
  switchToAddingNewItem: function() {
    this.setState({addingNewItem: true}, function() {
      React.findDOMNode(this.refs.newItemInput).focus();
    });
  },
  addItem: function(e) {
    e.preventDefault();
    var newItemName = e.target.newItemInput.value;
    e.target.newItemInput.value = '';

    this.emit('add-item', { name: newItemName });
    this.setState({ addingNewItem: false });
  },
  renderListItem: function(itemData, id) {
    return (
      <ListItem key={id} index={id} name={itemData.name} />
    );
  },
  render: function() {
    var inputClasses = 'new-item-input ';
    inputClasses += this.state.addingNewItem ? 'show' : 'hide';
    var buttonClasses = 'add-item-button ';
    buttonClasses += !this.state.addingNewItem ? 'show' : 'hide';

    return (
      <div className="list">
        <div className={inputClasses}>
          <form name="new-item-form" onSubmit={this.addItem}>
            <input type="text" ref="newItemInput" name="newItemInput" placeholder="Enter an item" />
          </form>
        </div>
        <button className={buttonClasses} onClick={this.switchToAddingNewItem}>Add Item</button>
        <ul>
          {this.props.items.map(this.renderListItem)}
        </ul>
      </div>
    );
  }
});

module.exports = List;
