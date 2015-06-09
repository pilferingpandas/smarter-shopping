var express = require('express');
var listController = require('./lists/listController.js');
var itemController = require('./lists/itemController.js');
var firebaseAuth = require('./middleware/authFirebase.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://savage:iamsavage@ds043972.mongolab.com:43972/savagetadpole');

app.use(session({
  secret: 'savage tadpole',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  var ts = new Date();
  console.log(req.url + ' - ' + req.method);
  console.log('Time:', ts);
  next();
});

// STATIC FILE SERVING
app.use(express.static(__dirname + '/../public'));

// DATABASE ACCESS ROUTES
app.use('/api/*', firebaseAuth.validateUserToken);

app.get('/api/list', listController.getList);

app.use('/api/item/add', itemController.createNewItem);
app.post('/api/item/add', listController.addItemToList);

app.use('/api/item/update', itemController.createNewItem);
app.post('/api/item/update', listController.updateItem);

app.delete('/api/item/delete', listController.deleteItemFromList);
app.post('/api/item/archive', listController.addItemToArchive);

app.post('/api/suggestion/remove', suggestionController.removeSuggestion);

// AUTHENTICATION ROUTES
app.use('/auth/register', firebaseAuth.createUser);
app.post('/auth/register', firebaseAuth.signIn);

app.post('/auth/login', firebaseAuth.signIn);

app.get('/auth/token', firebaseAuth.validateUserToken, function(req, res) {
  res.send(true);
});

var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Smart Shopping listening at http://localhost:%s', port);
});
