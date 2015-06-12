var React = require('react');
var Eventful = require('eventful-react');

var ModeToggle = Eventful.createClass({
  statics: {
    // modes enum
    SHOPPING: {},
    EDITING: {},
    FEED: {},
    RECIPES: {}
  },
  changeHandler: function(e) {
    var newMode = ModeToggle[e.target.value];
    this.emit('change-mode', { mode: newMode })
  },
  render: function() {
    var buttonClasses = {
      shopping: 'btn btn-sm btn-white',
      editing: 'btn btn-sm btn-white',
      feed: 'btn btn-sm btn-white',
      recipes: 'btn btn-sm btn-white'
    };
    if (this.props.mode === ModeToggle.SHOPPING) {
      buttonClasses.shopping += ' active';
    } else if (this.props.mode === ModeToggle.FEED) {
      buttonClasses.feed += ' active';
    } else if (this.props.mode === ModeToggle.RECIPES) {
      buttonClasses.recipes += ' active';
    } else {
      buttonClasses.editing += ' active';
    }

    return (
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div id="mode-toggle">
            <div className="ibox float-e-margins">
            <div data-toggle="buttons" className="btn-group" id="mode-toggle-buttons">
              <form onChange={this.changeHandler}>
                <label className={buttonClasses.shopping}>
                  <input type="radio" name="shopping" value="SHOPPING" checked={this.props.mode === ModeToggle.SHOPPING} onChange={this.changeHandler} />&nbsp;&nbsp;&nbsp;Shopping Mode
                </label>
                <label className={buttonClasses.editing}>
                  <input type="radio" name="editing" value="EDITING" checked={this.props.mode === ModeToggle.EDITING} onChange={this.changeHandler} />&nbsp;&nbsp;&nbsp;Editing Mode
                </label>
                <label className={buttonClasses.feed}>
                  <input type="radio" name="feed" value="FEED" checked={this.props.mode === ModeToggle.FEED} onChange={this.changeHandler} />&nbsp;&nbsp;&nbsp;Feed Mode
                </label>
                <label className={buttonClasses.recipes}>
                  <input type="radio" name="recipes" value="RECIPES" checked={this.props.mode === ModeToggle.RECIPES} onChange={this.changeHandler} />&nbsp;&nbsp;&nbsp;Recipes Mode
                </label>
              </form>
            </div>
            </div>
            <a href="/auth/signOut">Sign Out</a>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    );
  }
});

module.exports = ModeToggle;
