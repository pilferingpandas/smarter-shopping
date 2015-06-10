var Firebase = require("firebase");
var refString = 'https://smarter-shopping.firebaseio.com/';
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
      console.log('Authdata: ', authData.uid);
      // TODO: get this to work with username instead of authData.uid, so we can add followers using email, not id
      // Other option: instead of passing in authData.uid pass in an object instead with different properties
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
      // Save the username to the session
      request.session.username = username;
      response.send(true);
    }
  });
};

var signOut = function(request, response) {
  // Set token and username to null in session info upon user signing out
  request.session.token = null;
  request.session.username = null;
  response.redirect('/#/login');
};

var validateUserToken = function(request, response, next){
  // AuthWithCustomToken is a firebase method that checks to see if the token succeeds, if it suceeds the token is added to the session
  if(request.session.token){
    ref.authWithCustomToken(request.session.token, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        response.status(401).send({error: "Login Failed"});
      } else {
        console.log('authorized with token for uid:', authData.uid);
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
  validateUserToken: validateUserToken,
  signOut: signOut
};
