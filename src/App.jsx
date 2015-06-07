var React = require('react');
var Eventful = require('eventful-react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var auth = require('./auth');

var testData = [
  { name: 'milk' },
  { name: 'bread' },
  { name: 'cheese' }
];

var url = {
  list: '/api/list',
  addItem: '/api/item/add',
  updateItem: '/api/item/update',
  deleteItem: '/api/item/delete',
  archiveItem: '/api/item/archive',
  register: '/api/register',
  login: '/api/login',
  logout: '/api/logout'
};

var App = Eventful.createClass({
  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn(),
      data: testData
    }
  },

  setStateOnAuth: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  loadItemsFromServer: function() {
    $.get(url.list)
    .done(function(data) {
      console.log('loaditemsfromserver success:',data);
      this.setState({ data: data });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error getting item list:', status, err);
    });
  },

  addItemToDatabase: function(item) {
    $.post(url.addItem, item)
    .done(function(data) {
      this.setState({ data: data })
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error adding new item to list:', status, err);
    });
  },

  updateItemInList: function(item) {
    //TODO: implement
  },

  deleteItemFromList: function(item) {
    //var items = this.state.data;
    //var itemIndex = items.indexOf(item.id);
    //var updatedItems = items.splice(itemIndex, 1);

    $.ajax({
      url: url.deleteItem,
      type: 'DELETE',
      data: item
    })
    .done(function(data) {
      this.setState({ data: data });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error deleting item from list:', status, err);
    });
  },

  archiveItem: function(item) {
    //var items = this.state.data;
    //var itemIndex = items.indexOf(item.id);
    //var updatedItems = items.splice(itemIndex, 1);

    $.post(url.archiveItem, item)
    .done(function(data) {
      this.setState({ data: data });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error archiving item in list:', status, err);
    });
  },

  registerUser: function(userData) {
    $.post(url.register, userData)
    .done(function(data) {
      this.setState({ user: user })
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error('Error registering user:', status, err);
    });
  },

  loginUser: function(userData) {
    $.post(url.login, userData)
    .done(function(data) {
      console.log('Successfully logged in user:',data);
    })
    .fail(function(xhr, status, err) {
      console.error('Error logging in user:', status, err);
    });
  },

  componentDidMount: function() {
    // eventful event listeners
    this.on('register', function(data) {
      this.registerUser(data);
    }.bind(this));
    this.on('login', function(data) {
      this.loginUser(data);
    }.bind(this));
    this.on('updated-item', function(data) {
      this.setState(function(state) {
        state.data[data.key].name = data.name;
        return state;
      });
    }.bind(this));
    this.on('add-item', function(data) {
      this.setState(function(state) {
        state.data.push({ name: data.name });
        return state;
      });
      console.log('added item:',data);
    }.bind(this));

    this.loadItemsFromServer();
  },

  render: function() {
    //var loginOrOut = this.state.loggedIn ?
    //  <Link to="register"> Register Account</Link> :
    //  <Link to="login"> Sign In</Link>;
    return (
      <div id="app">
        <RouteHandler data={this.state.data} />
      </div>
    );
  }
});

module.exports = App;
