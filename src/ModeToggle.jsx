var React = require('react');
var Eventful = require('eventful-react');

var ModeToggle = Eventful.createClass({
  statics: {
    // modes enum
    SHOPPING: {},
    EDITING: {}
  },
  getInitialState: function() {
    return {
      mode: ModeToggle.editingMode
    };
  },
  changeHandler: function(e) {
    var newMode = ModeToggle[e.target.value];
    this.setState({ mode: mode });
    this.emit('change-mode', { mode: newMode })
  },
  render: function() {
    var mode = this.state.mode === ModeToggle.SHOPPING ? 'SHOPPING' : 'EDITING';
    return (
      <div id="mode-toggle">
        <select value={mode} onChange={this.changeHandler}>
          <option value="SHOPPING">Shopping Mode</option>
          <option value="EDITING">Editing Mode</option>
        </select>
      </div>
    );
  }
});

module.exports = ModeToggle;
