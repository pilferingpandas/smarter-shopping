var Firebase = require("firebase");
var refString = 'https://smarter-shopping.firebaseio.com/';
var ref = new Firebase(refString);

var listController = require('../lists/listController');

var createUser = function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  // firebase function
  // ref is what points to our unique instance of firebase
  ref.createUser({
    email: username,
    password: password
  }, function(error, authData) {
    if(error) {
      console.log("Error creating user", error)
      response.status(400).send("User creation Failed!");
    } else {
      console.log('AUTHDATA: ', authData);
      // TODO get this to work with username
      // Pass in username because username is the email
      // For adding friends we want to find users by email
      // This is the easier way so we don't have to have the unnecessary step to connect to firebase
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

var signOut = function(request, response) {
  request.session.token = null;
  response.redirect('/#/login');
};

var validateUserToken = function(request, response, next){
  if(request.session.token){
    // authWithCustomToken is a firebase method that checks to see if the token suceeds,
    // if it suceeds the token is added to the session
    // *note: in Firebase we must click the "Enable User and Password Auth" checkbox after we create a new table
      // we can also control session time as well
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
