var React = require('react');
var Eventful = require('eventful-react');
var ListItem = require('./ListItem');
// var FeedItem = require('./FeedItem');

var Feed = Eventful.createClass({
  followUser: function(e) {
    e.preventDefault();
    var newItemName = e.target.newItemInput.value;
    e.target.newItemInput.value = '';

    this.emit('follow-user', { name: newItemName });
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
              <h5>Your Feed</h5>
            </div>

            <div className="ibox-content">
              <div className="row">
                <div className="list">
                  <div className='new-item-input'>
                    <form name="new-item-form" onSubmit={this.followUser}>
                      <input className='new-item-input' type="text" ref="newItemInput" name="newItemInput" placeholder="Enter a user to follow"/>
                      <input className='btn btn-sm btn-primary add-item-button' type="submit" value="Follow User"/>
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

module.exports = Feed;
