var React = require('react');
var Eventful = require('eventful-react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var ModeToggle = require('./ModeToggle');
var auth = require('./auth');
var url = require('./url');

var App = Eventful.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      items: [],
      mode: ModeToggle.EDITING
    };
  },

  getList: function() {
    $.get(url.list)
    .done(function(data) {
      this.setState({ items: data });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error getting item list:', status, err);
    });
  },

  addItem: function(item) {
    $.post(url.addItem, item)
    .done(function(data) {
      this.getList();
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error adding new item to list:', status, err);
    });
  },

  updateItem: function(item) {
    $.post(url.updateItem, item)
    .done(function(data) {
      this.getList();
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error updating item in list:', status, err);
    });
  },

  deleteItem: function(item) {
    $.ajax({
      url: url.deleteItem,
      type: 'DELETE',
      data: item
    })
    .done(function(data) {
      this.getList();
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error deleting item from list:', status, err);
    });
  },

  archiveItem: function(item) {
    console.log('inside of archiveITem: ', item)
    $.post(url.archiveItem, item)
    .done(function(data) {
      this.getList();
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error archiving item in list:', status, err);
    });
  },

  archiveAll : function (data){
      // access all the items in the list
      console.log('Inside of archiveAll, received data from the emitter, trying to post', data);
      // the post request should 
      $.post(url.archiveAllItems,  {index: 1})
    .done(function(data) {
      this.getList();
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error archiving item in list:', status, err);
    });
  },

  registerUser: function(userData) {
    $.post(url.register, userData)
    .done(function(data) {
      console.log('registered:',data);
      this.context.router.transitionTo('/');
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error registering user:', status, err);
    });
  },

  loginUser: function(userData) {
    $.post(url.login, userData)
    .done(function(data) {
      this.context.router.transitionTo('/');
      this.getList();
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error logging in user:', status, err);
    });
  },

  followUser: function(userData) {
    console.log('userData from app dot jsx event handler', userData);
    $.post(url.followUser, userData)
    .done(function(data) {
      console.log('Response data: ', data);
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error following user: ', status, err);
    });
  },

  changeMode: function(data) {
    this.setState({ mode: data.mode });
  },

  componentDidMount: function() {
    // eventful event listeners
    this.on('register', function(data) {
      this.registerUser(data);
    });
    this.on('login', function(data) {
      this.loginUser(data);
    });
    this.on('update-item', function(data) {
      this.updateItem(data)
    });
    this.on('add-item', function(data) {
      this.addItem(data);
    });
    this.on('archive-items', function(data) {
      console.log('Inside of archiveAll in app.jsx ', data);
      this.archiveAll(data);
    });
    this.on('remove-item', function(data) {
      if (this.state.mode === ModeToggle.SHOPPING) {
        this.archiveItem(data);
      } else {
        this.deleteItem(data);
      }
    });
    this.on('change-mode', function(data) {
      this.changeMode(data);
    });

    this.on('follow-user', function(data) {
      this.followUser(data);
    });

    this.getList();
  },

  render: function() {
    //var loginOrOut = this.state.loggedIn ?
    //  <Link to="register"> Register Account</Link> :
    //  <Link to="login"> Sign In</Link>;
    return (
      <div id="app">
        <RouteHandler data={this.state} />
      </div>
    );
  }
});

module.exports = App;
