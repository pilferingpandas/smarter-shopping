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

var getFollowerList = function(req, res) {
  var currentUser = req.uid;
  console.log('currentUser: ', currentUser);
  User.find({username: currentUser}, function (err, docs) {
    if (docs.length) {
      var following = docs[0].following;
      res.send(following);
    }
  }); 
};

var addFollower = function(req, res) {

  var userToFollow = req.body.name;
  var currentUser = req.uid;

  checkUserExists(userToFollow, function(exists) {
    if (exists) {
      User.findOneAndUpdate(
        {username: currentUser},
        {$addToSet: {'following': userToFollow}},
        {upsert: true},
        function(err, user) {
          if (err) {
            console.error(err);
            res.status(500).send({ error: 'Server Error'});
          } else {
            getFollowerList(req, res);
          }
        }
      );
    } else {
      console.log('User Does Not Exist. Please Enter A Valid User!');
      res.send('User Does Not Exist. Please Enter A Valid User!');
    }
  });

};

var getFollowerItems = function(req, res) {
  // Renders follower items into the news feed when they are added to your followers lists
  // each follower get the object Ids of items in the users table
      // for each objectID search in items table for corresponding object ids
        // if match push to new array
        // else 
          // return error
    // send array of items back to client
  
  var followerList = req.body.followerList;
  var allFollowerItems = [];

  var handleItems = function(followerItems) {
    console.log(followerItems);
    res.send(followerItems);
  };

  var getItems = function(user, callback) {
    User.findOne({username: user})
      .populate('list')
      .exec(function(error, user) {
        if (error) {
          console.error(error);
        }
        if (user) {
          // console.log('user.list: ', user.list);
          allFollowerItems = allFollowerItems.concat(user.list);
          // console.log('allFollowerItems: ', allFollowerItems);
        }
        callback();
    });
  };

  // console.log('followerList from getFollowerItems: ', followerList);
  for (var i = 0; i < followerList.length; i++) {
    // console.log('followerList[i]: ', followerList[i]);
    var calledback = 0;
    getItems(followerList[i], function() {
      calledback++;
      if (calledback === followerList.length) { 
        handleItems(allFollowerItems);
      }
    });
  }

};

var addFollowerItem = function() {
  // Adds an individual item from the news feed to your list when you click on the "like" icon for a particular item
};

var autocompleteUsername = function() {
  // Autofills the username in the input box on the news feed page
};

var replaceIdWithUsername = function() {
  // Replaces the reference to the user to follower to the username instead of the user id
};

module.exports = {
  addFollower: addFollower,
  checkUserExists: checkUserExists,
  getFollowerList: getFollowerList,
  getFollowerItems: getFollowerItems
  // addFollowerItem: addFollowerItem,
  // autocompleteUsername: autocompleteUsername,
  // replaceIdWithUsername: replaceIdWithUsername
};

  
