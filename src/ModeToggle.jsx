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
    this.setState({ mode: newMode });
    this.emit('change-mode', { mode: newMode })
  },
  render: function() {
    var mode = this.state.mode === ModeToggle.SHOPPING ? 'SHOPPING' : 'EDITING';
    return (
      <div id="mode-toggle">
        <form>
          <input type="radio" name="shopping" value="SHOPPING" />Shopping Mode
          <input type="radio" name="editing" value="EDITING" />Editing Mode
        </form>
      </div>
    );
  }
});

module.exports = ModeToggle;
