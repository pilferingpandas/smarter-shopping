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
      <div className="ibox-content">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div id="mode-toggle">
            <div className="ibox float-e-margins">
            <div data-toggle="buttons" className="btn-group">
              <form>
                <label className="btn btn-sm btn-white"> <input type="radio" name="shopping" value="SHOPPING" />&nbsp;&nbsp;&nbsp;Shopping Mode</label>
                <label className="btn btn-sm btn-white active"> <input type="radio" name="editing" value="EDITING" />&nbsp;&nbsp;&nbsp;Editing Mode</label>
              </form>
            </div>
          </div>
            </div>
        </div>
        <div className="col-md-4"></div>
      </div>
      </div>
    );
  }
});

module.exports = ModeToggle;
