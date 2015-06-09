var React = require('react');
var Eventful = require('eventful-react');
var Suggestion = require('./Suggestion');
var ListItem = require('./ListItem');

var List = Eventful.createClass({
  addItem: function(e) {
    e.preventDefault();
    var newItemName = e.target.newItemInput.value;
    e.target.newItemInput.value = '';

    this.emit('add-item', { name: newItemName });
  },
  renderSuggestion: function(suggestionData, id) {
    return (
      <Suggestion key={id} name={suggestionData.name} />
    );
  },
  renderListItem: function(itemData, id) {
    return (
      <ListItem key={id} index={id} name={itemData.name} mode={this.props.mode} foodCategory={itemData.data.food_category}/>
    );
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="ibox float-e-margins" id="list-border">
            <div className="ibox-title">
              <h5>Shopping List</h5>
            </div>
            <div className="ibox-content">
              <div className="row">
                <ul>
                  {this.props.suggestions.map(this.renderSuggestion)}
                </ul>
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
