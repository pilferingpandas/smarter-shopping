var React = require('react');
var Eventful = require('eventful-react');

var ListItem = Eventful.createClass({
  getInitialState: function() {
    return {
      editable: false
    };
  },
  switchToEditable: function() {
    this.setState({editable: true}, function() {
      React.findDOMNode(this.refs.editInput).focus();
    });
  },
  updateItem: function(e) {
    e.preventDefault();
    var name = e.target.itemName.value;
    this.emit('updated-item',this.props.index,name);
    this.setState({editable: false});
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
        <div className={cssClasses.staticItem} onClick={this.switchToEditable}>
          {this.props.name}
        </div>
        <div className={cssClasses.editableItem}>
          <form name={"item-form-" + this.props.index} onSubmit={this.updateItem}>
            <input type="text" ref="editInput" name="itemName" defaultValue={this.props.name} />
          </form>
          </div>
      </li>
    );
  }
});

module.exports = ListItem;
