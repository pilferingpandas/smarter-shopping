var Q = require('q');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);
var User = mongoose.model('User', models.user);
var interimUsername = 'emily';


var orderList = function(list) {
  list.sort(function(a, b) {
    if (a.data.food_category > b.data.food_category) {
      return 1;
    }
    if (a.data.food_category < b.data.food_category) {
      return -1;
    }

    return 0
  });

  return list;
};

var storeOrderedList = function(username, list) {
  User.findOne({username: username})
      .populate('list')
      .exec(function(err, user) {
        if (err) console.error(err);
        var orderedList = orderList(user.list);
        User.update({username: username}, {'list': orderedList}, {upsert: true}, function(err) {
          if (err) console.error(err);
        });
      });
}


module.exports = {

  createUser: function() {
    var user = new User({username:interimUsername, list:[], past_items:[]});

    User.find({username: interimUsername}, function(err, users) {
      if (err) console.error(err);
      if (users.length > 0) {
      } else {
        User.create(user, function(err, newUser) {
          if(err) console.error(err);
          console.log('User created! Welcome: ', newUser.username);
        });
      }
    });
  },
  
  getList: function(req, res) {
    console.log('hit listController.getList');
    var username = interimUsername;
    User
    .findOne({username: username})
    .populate('list')
    .exec(function(err, user) {
      if (err) console.error(err);
      res.send(user.list);
    });
  },

  addItemToList: function(req, res) {
    var username = interimUsername;
    var name = req.smartShoppingData.name;
 
    User.findOneAndUpdate(
      {username: username}, 
      {$push: {'list': req.smartShoppingData._id}}, 
      {upsert: true}, 
      function(err, user) {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'Server Error'});
        } 
        storeOrderedList(username, user.list);
        res.send(user.list);
      }); 
  },

  addItemToArchive: function(req, res) {
    var username = interimUsername;
    var index = Number(req.body.index);
    var tempId;

    User.findOne({username: username}, function(err, user) {
      var pushModifier = {$push: {}};
      pushModifier.$push['past_items'] = user.list[index];
      User.update({username: username}, pushModifier, {upsert: true}, function(err) {if (err) console.error(err)});
    });
    
    var setModifier = { $set: {} };
    setModifier.$set['list.' + index] = null;
    User.update({username: username}, setModifier, {upsert: true}, function(err) {
      if (err) {
        console.error(err);
        res.status(500).send({error: 'Server Error'});
      } 
    });

    User.findOneAndUpdate({username: username}, {$pull: {'list': null}}, {upsert: true}, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500).send({error: 'Server Error'});        
      }
      storeOrderedList(username, user.list);
      res.send(user.list);
    });
  },

  updateItem: function(req, res) {
    var username = interimUsername;
    var newName = req.body.name.toLowerCase();
    var index = req.body.index;

    var setModifier = { $set: {} };
    setModifier.$set['list.' + index] = req.smartShoppingData._id;
    User.findOneAndUpdate({username: username}, setModifier, {upsert: true}, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500).send({error: 'Server Error'});
      } 
      storeOrderedList(username, user.list);
      res.send(user.list);
    }); 
  },

  deleteItemFromList: function(req, res) {
    var username = interimUsername;
    var index = req.body.index;
    
    var setModifier = {$set: {}};
    setModifier.$set['list.' + index] = null;
    User.update({username: username}, setModifier, {upsert: true}, function(err) {
      if (err) {
        console.error(err);
        res.status(500).send({error: 'Server Error'});
      } 
    });

    User.findOneAndUpdate({username: username}, {$pull: {'list': null}}, {upsert: true}, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500).send({error: 'Server Error'});        
      }
      storeOrderedList(username, user.list);
      res.send(user.list);
    });
  }
};