var express = require('express');
var listController = require('./lists/listController.js');
var itemController = require('./lists/itemController.js');
var firebaseAuth = require('./middleware/authFirebase.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/smart-shopping');

listController.createUser();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//static files will be served from the public directory
app.use(function (req, res, next) {
  var ts = new Date();
  console.log(req.url + ' - ' + req.method);
  console.log('Time:', ts);
  next();
});

app.use(express.static(__dirname + '/../public'));

app.get('/api/list', listController.getList);

app.use('/api/item/add', itemController.createNewItem);
app.post('/api/item/add', listController.addItemToList); 

app.delete('/api/item/delete', listController.deleteItemFromList);
app.post('/api/item/archive', listController.addItemToArchive);

var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Smart Shopping listening at http://localhost:%s', port);
});
