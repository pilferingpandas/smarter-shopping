var Q = require('q');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);
var User = mongoose.model('User', models.user);

var checkUserExists = function(user, cb) {

  // TODO: if already in following do not add again

  User.find({username: user}, function (err, docs) {
    console.log('docs: ', docs);
    if (docs.length) {
      cb(true);
    } else {
      cb(false);
    }
  }); 
};

var getFollowerList = function(req, res) {
  var currentUser = req.uid;
  User.find({username: currentUser}, function (err, docs) {
    console.log('docs: ', docs);
    if (docs.length) {
      var following = docs[0].following;
      res.send(following);
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
            getFollowerList(req, res);
          }
        });
    } else {
      console.log('User Does Not Exist. Please Enter A Valid User!');
      res.send('User Does Not Exist. Please Enter A Valid User!');
    }
  });

};

var removeFollower = function() {
  // Allows users to unfollow other users once they are following them
};

var getFollowerItems = function() {
  // Renders follower items into the news feed when they are added to your followers lists

};

var addFollowerItem = function() {
  // Adds an individual item from the news feed to your list when you click on the "like" icon for a particular item
};

module.exports = {
  addFollower: addFollower,
  removeFollower: removeFollower,
  checkUserExists: checkUserExists,
  getFollowerList: getFollowerList,
  getFollowerItems: getFollowerItems,
  addFollowerItem: addFollowerItem
};


  
