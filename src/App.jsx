var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var testData = {
  items: [
    { name: 'milk' },
    { name: 'bread' },
    { name: 'cheese' }
  ]
};

var url = 'http://localhost:3000';

var App = React.createClass({
  loadItemsFromServer: function() {
    var getUrl = url + '/api/list';
    $.get({
      url: getUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(getUrl, status, err);
      }.bind(this)
    })
  },

  addItemToDatabase: function(item) {
    var items = this.state.data;
    var updatedItems = items.concat([item]);
    var postUrl = url + '/api/item/add';
    $.post({
      url: postUrl,
      dataType: 'json',
      data: item,
      success: function(data) {
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(postUrl, status, err);
      }.bind(this)
    })
  },

  deleteItemFromList: function(item) {
    var items = this.state.data;
    var itemIndex = items.indexOf(item.id);
    var updatedItems = items.splice(itemIndex, 1);
    var deleteUrl = url + '/api/item/delete';

    $.ajax({
      url: deleteUrl,
      type: 'DELETE',
      dataType: 'json',
      data: item,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(deleteUrl, status, err);
      }.bind(this)
    })
  },

  archiveItem: function(item) {
    var items = this.state.data;
    var itemIndex = items.indexOf(item.id);
    var updatedItems = items.splice(itemIndex, 1);
    var archiveUrl = url + '/api/item/archive';

    $.ajax({
      url: deleteUrl,
      type: 'POST',
      dataType: 'json',
      data: item,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(deleteUrl, status, err);
      }.bind(this)
    })
  },

  getInitialState: function() {
    return {data: []};
  },

  //sends GET request on page load
  componentWillMount: function() {
    this.loadItemsFromServer();
  },
  
  render: function() {
    return (
      <div id="app">
        <RouteHandler data={testData} />
      </div>
    );
  }
});

module.exports = App;
