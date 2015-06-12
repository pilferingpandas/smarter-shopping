var express = require('express');
var listController = require('./lists/listController.js');
var itemController = require('./lists/itemController.js');
var feedController = require('./lists/feedController.js');
var firebaseAuth = require('./middleware/authFirebase.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 3000;

// mongoose.connect('mongodb://savage:iamsavage@ds043972.mongolab.com:43972/savagetadpole');
mongoose.connect('mongodb://localhost/smarter-shopping')
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


app.post('/api/item/archiveAll',listController.addAllItemsToArchive);

app.get('/api/item/showPast', listController.showPast);

// AUTHENTICATION ROUTES
app.use('/auth/register', firebaseAuth.createUser);
app.post('/auth/register', firebaseAuth.signIn);

app.post('/auth/login', firebaseAuth.signIn);

app.post('/api/feed/follow', feedController.addFollower);

app.get('/auth/signOut', firebaseAuth.signOut);

app.get('/auth/token', firebaseAuth.validateUserToken, function(req, res) {
  res.send(true);
});

var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Smarter Shopping listening at http://localhost:%s', port);
});

///////////////////
/// Web Sockets ///
///////////////////

// var io = require('socket.io')(server);

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

// Client Side
  // confirm io.connect();
  // have event listeners for certain updating states
  // pass data along with them if you want, first arg is name of the event, second arg is optional data

// Server Side
