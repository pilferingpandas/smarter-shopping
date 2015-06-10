var Q = require('q');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);
var User = mongoose.model('User', models.user);

var addFollower = function(req, res) {
  // event occurs such as clicking on a button that says add a follower
    // logged in user inputs the user info they would like to add as a follower
  // push the follower into the following array
  // render all follower items into feed

  var userToFollow = req.body.name;
  var currentUser = req.uid;
  console.log(userToFollow);
  console.log('currentuser id', currentUser);

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
};

var removeFollower = function() {

};


module.exports = {
  addFollower: addFollower,
  removeFollower: removeFollower
};
