var Firebase = require("firebase");
var FirebaseTokenGenerator = require("firebase-token-generator");
var Q = require('q');

var FirebaseMakerFunction =  function() {
  this.refString = 'https://savagetadpole.firebaseio.com';
  this.ref = new Firebase(this.refString);
};

FirebaseMakerFunction.prototype.createUser = function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  this.ref.createUser({
    email    : user,
    password : pass
  }, function(error, authData) {
    if(error) { 
      console.log("Error creating user", error)
      response.send("User creation Failed!");
    }  else {
      this.signIn(request, response);
    }
  }.bind(this));
};

FirebaseMakerFunction.prototype.signIn = function(request, response) {
  var username = request.body.username;
  var password = request.body.passwords;

  this.ref.authWithPassword({
    email    : user,
    password : pass
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
      response.redirect('/');
    } else {
      request.session.token = authData.token;
      response.redirect('/'); 
    }
  });
};

FirebaseMakerFunction.prototype.validateUserToken = function(request, response, next){
  if(request.session.token){
    this.ref.authWithCustomToken(request.session.token, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        response.redirect('/testSignIn.html');
      } else {
        next();
      }
    });
  } else {
    response.redirect('/testSignIn.html');
  }
};

var firebaseObj = new FirebaseMakerFunction();

module.exports = firebaseObj;
