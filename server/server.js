/*
* Express server running at http://localhost:3000
* TODO: add routing
* */

var express = require('express');
var firebaseRequestHandler = require('./middleware/authFirebase');
var app = express();

//static files will be served from the public directory
app.use(function (req, res, next) {
  var ts = new Date();
  console.log(req.url + ' - ' + req.method);
  console.log('Time:', ts);
  next();
});

app.use(express.static('public'));

//server is listening on port 3000
var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Smart Shopping listening at http://localhost:%s', port);
});
