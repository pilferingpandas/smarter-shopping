var React = require('react');
var Eventful = require('eventful-react');

var ListItem = Eventful.createClass({
  getInitialState: function() {
    return {
      value: this.props.name,
      editable: false
    };
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({ value: newProps.name });
  },
  switchToEditable: function() {
    this.setState({editable: true}, function() {
      React.findDOMNode(this.refs.editInput).focus();
    });
  },
  updateValue: function(e) {
    this.setState({ value: e.target.value });
  },
  updateItem: function(e) {
    e.preventDefault();
    var name = e.target.itemName.value;
    this.emit('update-item',{
      index: this.props.index,
      name: name
    });
    this.setState({editable: false});
  },
  removeItem: function() {
    this.emit('remove-item', { index: this.props.index });
  },
  render: function() {
    var cssClasses = {
      staticItem: 'static-item ',
      editableItem: 'editable-item '
    };
    if (this.state.editable) {
      cssClasses.staticItem += 'hide';
      cssClasses.editableItem += 'show';
    } else {
      cssClasses.staticItem += 'show';
      cssClasses.editableItem += 'hide';
    }

    return (
      <li className="list-item">
        <div className={cssClasses.staticItem}>
          <i className="fa fa-check fa-lg remove-button" onClick={this.removeItem}></i> <div className="item-label" onClick={this.switchToEditable}>{this.props.name}</div> 
        </div>
        <div className={cssClasses.editableItem}>
          <form name={"item-form-" + this.props.index} onSubmit={this.updateItem}>
            <input type="text" ref="editInput" name="itemName" value={this.state.value} onChange={this.updateValue} />
          </form>
        </div>
      </li>
    );
  }
});

module.exports = ListItem;
