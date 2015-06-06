var React = require('react');
var Eventful = require('eventful-react');
var RouteHandler = require('react-router').RouteHandler;

var testData = [
  { name: 'milk' },
  { name: 'bread' },
  { name: 'cheese' }
];

var url = 'http://localhost:3000';

var App = Eventful.createClass({
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
    var postUrl = url + '/api/item/add';
    $.post({
      url: postUrl,
      dataType: 'json',
      data: item,
      success: function(data) {
        //this.setState({data: data})
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(postUrl, status, err);
      }.bind(this)
    })
  },

  updateItemInList: function(item) {
    //TODO: implement
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
    return {data: testData};
  },

  //sends GET request on page load
  componentWillMount: function() {
    this.loadItemsFromServer();
  },

  componentDidMount: function() {
    this.on('updated-item', function(data) {
      this.setState(function(state) {
        state.data[data.key].name = data.name;
        return state;
      });
    }.bind(this));
    this.on('add-item', function(data) {
      this.setState(function(state) {
        state.data.push({ name: data.name });
        return state;
      });
      console.log('added item:',data);
    }.bind(this));
  },

  render: function() {
    return (
      <div id="app">
        <RouteHandler data={this.state.data} />
      </div>
    );
  }
});

module.exports = App;
