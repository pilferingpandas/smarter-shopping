var Q = require('q');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);
var User = mongoose.model('User', models.user);

var checkUserExists = function(user, cb) {
  User.find({username: user}, function (err, docs) {
    if (docs.length) {
      cb(true);
    } else {
      cb(false);
    }
  }); 
};

var addFollower = function(req, res) {

  var userToFollow = req.body.name;
  var currentUser = req.uid;
  console.log(userToFollow);
  console.log('currentuser id', currentUser);

  checkUserExists(userToFollow, function(exists) {
    if (exists) {
      User.findOneAndUpdate(
        {username: currentUser},
        {$push: {'following': userToFollow}},
        {upsert: true},
        function(err, user) {
          if (err) {
            console.error(err);
            res.status(500).send({ error: 'Server Error'});
          } else {
            res.send("Success");
          }
        });
    } else {
      console.log('User Does Not Exist. Please Enter A Valid User!');
      res.send('User Does Not Exist. Please Enter A Valid User!');
    }
  });

};

var removeFollower = function() {

};

module.exports = {
  addFollower: addFollower,
  removeFollower: removeFollower,
  checkUserExists: checkUserExists
};
