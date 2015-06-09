var React = require('react');
var Eventful = require('eventful-react');

var Suggestion = Eventful.createClass({
  accept: function() {
    this.emit('add-item', { name: this.props.name });
    this.emit('remove-suggestion', { name: this.props.name });
  },
  dismiss: function() {
    this.emit('remove-suggestion', { name: this.props.name });
  },
  render: function() {
    return (
      <li className="suggestion">
        {this.props.name}
        <button onClick={this.accept}>&#10003;</button>
        <button onClick={this.dismiss}>&#10005;</button>
      </li>
    );
  }
});

module.exports = Suggestion;
