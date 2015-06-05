var Firebase = require("firebase");
var FirebaseTokenGenerator = require("firebase-token-generator");
var firebaseSecret = require("./firebaseSecret");

var FirebaseMakerFunction =  function() {
  this.refString = 'https://savagetadpole.firebaseio.com';
  this.ref = new Firebase(this.refString);
};

FirebaseMakerFunction.prototype.createUser = function(user, pass, request, response, next){

  console.log('creating user');
  this.ref.createUser({
    email    : user,
    password : pass
  }, function(error, authData) {
    if(error) { 
      console.log("User Creation Failed!", error);
      response.send("User creation Failed!");
    }  else {
      console.log("Created user successfully with payload:", authData.uid);
      this.signIn(user, pass, request, response, next);
    }
  }.bind(this));
};

FirebaseMakerFunction.prototype.signIn = function(user, pass, request, response, next){

  this.ref.authWithPassword({
    email    : user,
    password : pass
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
      response.redirect('/testSignIn.html');
    } else {
      console.log("Authenticated successfully with payload:", authData);
      console.log(Object.keys(request.session));
      request.session.token = authData.token;
      response.redirect('/testIndex.html');
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
        console.log("Authenticated Token successfully with payload:", authData);
        next();
      }
    });
  } else {
    response.redirect('/testSignIn.html');
  }
};

var firebaseObj = new FirebaseMakerFunction();

module.exports = firebaseObj;