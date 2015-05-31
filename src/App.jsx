var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var testData = {
  items: [
    { name: 'milk' },
    { name: 'bread' },
    { name: 'cheese' }
  ]
};

var App = React.createClass({
  loadItemsFromServer: function() {
    $.get({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err);
      }.bind(this)
    })
  },

  addItemToDatabase: function(item) {
    var items = this.state.data;
    var updatedItems = items.concat([item]);
    $.post({
      url: this.props.url,
      dataType: 'json',
      data: item,
      success: function(data) {
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err);
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
