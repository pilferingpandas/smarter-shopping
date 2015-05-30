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
          res.json(user.list);
        });
    });
  };

  addItem: function(req, res, next, username) {
    var name = req.body.name;
    var frequency = req.body.frequency;
    var newItem = {
      name: name,
      data: {
        frequency: frequency,
        coupons: ['none'],
        food_category: 'none',
        expiration: new Date(15,9,16)
      }
    };
    var createItem = Q.nbind(Item.create, Item);
    var findItem = Q.nbind(Item.find, Item);
    var findUser = Q.nbind(User.findOne, User);

    findItem({name : name})
    .then(function(match) {
      if (match) {
        findUser({username: username})
        .then(function(user) {
          user.list.push(match)
        });
        res.send(match);
      } else {
        return createItem(newItem)
      }
    })
    .then(function(createdItem) {
      findUser({username: username})
      .then(function(user) {
        user.list.push(createdItem._id);
      });
      res.send(createdItem);
    });
  };
};
