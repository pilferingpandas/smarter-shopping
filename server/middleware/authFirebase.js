var Firebase = require("firebase");
var refString = 'https://savagetadpoleapp.firebaseio.com';
var ref = new Firebase(refString);

var listController = require('../lists/listController');

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
      response.send(true);
    }
  });
};

<<<<<<< HEAD
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
=======
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
>>>>>>> 7936219c0cd56b889f8077f0aebc91ee27b3ed22

module.exports = {
  createUser: createUser,
  signIn: signIn,
  validateUserToken: validateUserToken
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
