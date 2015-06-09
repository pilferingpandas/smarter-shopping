var Firebase = require("firebase");
var refString = 'https://savagetadpoleapp.firebaseio.com';
var ref = new Firebase(refString);

var listController = require('../lists/listController');

var createUser = function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  ref.createUser({
    email: username,
    password: password
  }, function(error, authData) {
    if(error) { 
      console.log("Error creating user", error)
      response.status(400).send("User creation Failed!");
    } else {
      listController.createUser(authData.uid)
      .then(function() {
        signIn(request, response);
      });
    }
  });
};

var signIn = function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  ref.authWithPassword({
    email: username,
    password: password
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
      response.status(401).send({error: "Login Failed"});
    } else {
      request.session.token = authData.token;
      response.send(true);
    }
  });
};

var validateUserToken = function(request, response, next){
  if(request.session.token){
    ref.authWithCustomToken(request.session.token, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        response.status(401).send({error: "Login Failed"});
      } else {
        console.log('authorized with token for uid:',authData.uid);
        request.uid = authData.uid;
        next();
      }
    });
  } else {
    response.status(401).send({error: "Login Failed"});
  }
};

module.exports = {
  createUser: createUser,
  signIn: signIn,
  validateUserToken: validateUserToken
};
