var React = require('react');
var Eventful = require('eventful-react');
var ListItem = require('./ListItem');

var List = Eventful.createClass({
  addItem: function(e) {
    e.preventDefault();
    var newItemName = e.target.newItemInput.value;
    e.target.newItemInput.value = '';

    this.emit('add-item', { name: newItemName });
  },
  renderListItem: function(itemData, id) {
    console.log('inside of renderListItem', itemData)
    return (
      <ListItem key={id} index={id} name={itemData.name} mode={this.props.mode} foodCategory={itemData.data.food_category}/>
    );
  },
   archiveAll: function (e) {
    //console.log('value',e )
    console.log('inside of archiving all');
    e.preventDefault();
    // emit a signal to app.jsx that user wants to archive all the items on the list
     this.emit('archive-items', {name : 'bread'});
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
                <div className="list">
                  <div className='new-item-input'>
                    <form name="new-item-form" onSubmit={this.addItem}>
                      <input className='new-item-input' type="text" ref="newItemInput" name="newItemInput" placeholder="Enter an item"/>
                      <input className='btn btn-sm btn-primary add-item-button' type="submit" value="Add Item"/>
                    </form>
                </div>
                  <div className='archive-all-input'  onSubmit={this.archiveAll(this.props.items)}>
                    <form name="archive-all-form" >
                      <input className='btn btn-sm btn-primary archive-all-button' type="submit" value="Archive all items on the list"/>
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
