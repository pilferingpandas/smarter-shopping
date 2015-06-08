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
      <ListItem key={id} index={id} name={itemData.name} foodCategory={itemData.data.food_category}/>
    );
  },
  render: function() {
    var inputClasses = 'new-item-input ';
    inputClasses += this.state.addingNewItem ? 'show' : 'hide';
    var buttonClasses = 'btn btn-sm btn-primary add-item-button ';
    buttonClasses += !this.state.addingNewItem ? 'show' : 'hide';

    return (
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>Shopping List</h5>
            </div>
            <div className="ibox-content">
              <div className="row">
                <div className="list">
                  <div className='new-item-input'>
                    <form name="new-item-form" onSubmit={this.addItem}>
                      <input className='new-item-input' type="text" ref="newItemInput" name="newItemInput" placeholder="Enter an item"/>
                      <input className='btn btn-sm btn-primary add-item-button' type="submit" value="Add Item"/>
                    </form>
                </div>
                <ul>
                  {this.props.items.map(this.renderListItem)}
                </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    );
  }
});

module.exports = List;
