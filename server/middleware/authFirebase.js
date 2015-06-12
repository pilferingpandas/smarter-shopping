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
      console.log('Authdata Keys: ', Object.keys(authData));
      console.log('Authdata Obj: ', authData);
      // The entire authData object is not passed in until after signIn function is called
      // Prior to signIn function being called only the authData.uid property is accessible
      signIn(request, response);
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
      console.log('Authdata Keys: ', Object.keys(authData));
      console.log('Authdata Obj: ', authData);
      // Creates the user in the database after the user has been signed in
      // This gives us access to the entire authData object
      listController.createUser(authData.password.email)
      .then(function() {
        console.log('User Created In Database');
      });
      request.session.token = authData.token;
      // Saves the username to the session
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
