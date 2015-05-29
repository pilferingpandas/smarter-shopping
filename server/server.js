/*
* Express server running at http://localhost:3000
* TODO: add routing
* */

var express = require('express');

var app = express();

var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Smart Shopping listening at http://localhost:%s', port);
});

