var Firebase = require("firebase");
var FirebaseTokenGenerator = require("firebase-token-generator");
var Q = require('q');

var refString = 'https://savagetadpole.firebaseio.com';
var ref = new Firebase(refString);

var createUser = function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  ref.createUser({
<<<<<<< HEAD
    email: username,
    password: password
=======
    email    : user,
    password : pass
>>>>>>> refactor(server/client): integrating changes done across client and servers
  }, function(error, authData) {
    if(error) { 
      console.log("Error creating user", error)
      response.send("User creation Failed!");
    }  else {
      signIn(request, response);
    }
  });
};

var signIn = function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  ref.authWithPassword({
<<<<<<< HEAD
    email: username,
    password: password
=======
    email    : user,
    password : pass
>>>>>>> refactor(server/client): integrating changes done across client and servers
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
      response.status(401).send({error: "Login Failed"});
    } else {
      request.session.token = authData.token;
      response.send(authData.token);
    }
  });
};

<<<<<<< HEAD
//var validateUserToken = function(request, response, next){
//  if(request.session.token){
//    ref.authWithCustomToken(request.session.token, function(error, authData) {
//      if (error) {
//        console.log("Login Failed!", error);
//        response.redirect('/testSignIn.html');
//      } else {
//        next();
//      }
//    });
//  } else {
//    response.redirect('/testSignIn.html');
//  }
//};

module.exports = {
  createUser: createUser,
  signIn: signIn
};
=======
var validateUserToken = function(request, response, next){
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

module.exports = {
  createUser: createUser,
  signIn: signIn
};
>>>>>>> refactor(server/client): integrating changes done across client and servers
