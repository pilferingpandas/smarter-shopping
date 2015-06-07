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

var url = 'http://localhost:3000';

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

  componentDidMount: function() {
    // functions from the auth-flow implementation
    auth.onChange = this.setStateOnAuth;
    auth.login();
    this.on('register', function(email, password) {
     //unsure of how to implement saving user to state
      this.registerUser(email, password);
    }.bind(this));
    this.on('login', function(email, password) {
      // same as above in regards to the state
      this.loginUser(email, password);
    }.bind(this));
    this.loadItemsFromServer();
  },

  loadItemsFromServer: function() {
    var getUrl = url + '/api/list';
    $.get({
      url: getUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(getUrl, status, err);
      }.bind(this)
    })
  },

  addItemToDatabase: function(item) {
    var postUrl = url + '/api/item/add';
    $.post({
      url: postUrl,
      dataType: 'json',
      data: item,
      success: function(data) {
        this.setState({ data: data })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(postUrl, status, err);
      }.bind(this)
    })
  },

  updateItemInList: function(item) {
    //TODO: implement
  },

  deleteItemFromList: function(item) {
    var items = this.state.data;
    var itemIndex = items.indexOf(item.id);
    var updatedItems = items.splice(itemIndex, 1);
    var deleteUrl = url + '/api/item/delete';

    $.ajax({
      url: deleteUrl,
      type: 'DELETE',
      dataType: 'json',
      data: item,
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(deleteUrl, status, err);
      }.bind(this)
    })
  },

  archiveItem: function(item) {
    var items = this.state.data;
    var itemIndex = items.indexOf(item.id);
    var updatedItems = items.splice(itemIndex, 1);
    var archiveUrl = url + '/api/item/archive';

    $.ajax({
      url: deleteUrl,
      type: 'POST',
      dataType: 'json',
      data: item,
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(deleteUrl, status, err);
      }.bind(this)
    })
  },

  registerUser: function(user) {
    var registerUrl = url + '/api/signup';
    $.post({
      url: signupUrl,
      dataType: 'json',
      cache: false,
      data: user,
      success: function(data) {
        this.setState({ user: user })
        console.log(data)
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ error: true })
        console.error(signupUrl, status, err);
      }.bind(this)
    });
  },


  componentDidMount: function() {
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
  },

  loginUser: function(user) {
    $.post({
      url: loginUrl,
      dataType: 'json',
      cache: false,
      data: user,
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ user: user });
        console.error(loginUrl, status, err);
      }.bind(this)
    });
  },

  render: function() {
    console.log(this.state.data);
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
