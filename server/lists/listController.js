var Q = require('q');
var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var User = mongoose.model('User');


module.exports = {
  
  getList: function(req, res, next, username) {
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
    .then(function(user) {
      user
        .populate('list')
        .exec(function(err, user) {
          res.send(user.list);
        });
    });
  };

  newItem: function(req, res, next) {
    var createItem = Q.nbind(Item.create, Item);
  }
};

newItem = function(req, res, next) {
  // create a new Item
  // add it to user's list
  // send it to the database
}