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
  render: function() {
    return (
      <div id="app">
        <RouteHandler data={testData} />
      </div>
    );
  }
});

module.exports = App;
