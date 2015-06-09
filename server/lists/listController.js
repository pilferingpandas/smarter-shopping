var Q = require('q');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);
var User = mongoose.model('User', models.user);

var orderList = function(list) {
  list.sort(function(a, b) {
    if (a.data.food_category > b.data.food_category) {
      return 1;
    }
    if (a.data.food_category < b.data.food_category) {
      return -1
    }

    return 0
  });

  return list;
};

var storeOrderedList = function(username, list, cb) {
  User.findOne({username: username})
      .populate('list')
      .exec(function(err, user) {
        if (err) console.error(err);
        var orderedList = orderList(user.list);
        User.update({username: username}, {'list': orderedList}, {upsert: true}, function(err) {
          if (err) { 
            console.error(err);
            cb(false);
          }
          cb(true);
        });
      });
};


module.exports = {
  createUser: function(uid) {
    var user = new User({username:uid, list:[], past_items:[]});
    var findUser = Q.nbind(User.find,User);
    var createUser = Q.nbind(User.create,User);

    return findUser({username: uid})
    .then(function(users) {
      if (users.length === 0) {
        return createUser(user);
      } else {
        throw new Error('Tried to create user which already exists');
      }
    })
    .then(function(newUser) {
      console.log('User created! Welcome: ', newUser.username);
    })
    .catch(function(err) {
      console.error('Error creating user:',err);
    });
  },

  getList: function(req, res) {
    var username = req.uid;
    User
    .findOne({username: username})
    .populate('list')
    .exec(function(err, user) {
      if (err) console.error(err);
      res.send(user.list);
    });
  },

  addItemToList: function(req, res) {
    var username = req.uid;
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
        storeOrderedList(username, user.list, function(complete) {
          if (complete) {
            res.send(user.list);
          } else {
            res.status(500).send({error: 'Could not order list!'});
          }
        });
      }); 
  },

  addItemToArchive: function(req, res) {
    var username = req.uid;
    var index = Number(req.body.index);
    var tempId;

    // {ObjId: [date, date, date], ObjId: [date]}

    User.findOne({username: username}, function(err, user) {
      var objectId = user.list[index];
      console.log("OBJECTID", objectId);
      console.log("USER LIST", user.list);
      var item = {"item_id": objectId, 'purchase_dates': [new Date()]};
      var pushModifier = {$push: {}};
      pushModifier.$push['past_items'] = item;
      User.update({username: username}, pushModifier, function(err) {if (err) console.error(err)});
    });
    
    var setModifier = { $set: {} };
    setModifier.$set['list.' + index] = null;
    User.update({username: username}, setModifier, {upsert: true}, function(err) {
      if (err) {
        console.error(err);
        res.status(500).send({error: 'Server Error'});
      } 
    });

    User.findOneAndUpdate({username: username}, {$pull: {'list': null}}, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500).send({error: 'Server Error'});        
      }
      storeOrderedList(username, user.list, function(complete) {
        if (complete) {
          res.send(user.list);
        } else {
          res.status(500).send({error: 'Could not store list'});
        }
      });
    });
  },

  updateItem: function(req, res) {
    var username = req.uid;
    var newName = req.body.name.toLowerCase();
    var index = req.body.index;

    var setModifier = { $set: {} };
    setModifier.$set['list.' + index] = req.smartShoppingData._id;
    User.findOneAndUpdate({username: username}, setModifier, {upsert: true}, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500).send({error: 'Server Error'});
      } 
      storeOrderedList(username, user.list, function(complete) {
        if (complete) {
          res.send(user.list);
        } else {
          res.status(500).send({error: 'Couldn\'t sort list!'});
        }
      });
    }); 
  },

  deleteItemFromList: function(req, res) {
    var username = req.uid;
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
      storeOrderedList(username, user.list, function(complete) {
        if (complete) {
          res.send(user.list);
        } else {
          res.status(500).send({error: 'Could not order list!'});
        }
      });
    });
  }
};