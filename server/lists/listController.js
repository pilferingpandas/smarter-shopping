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
      return -1
    }

    return 0
  });

  return list;
};


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
      var orderedList = orderList(user.list);
      User.update({username: username}, {'list': orderedList}, {upsert: true}, function(err) {
        console.error(err);
      })
      if (err) console.error(err);
      res.send(user.list);
    });
  },

  addItemToList: function(req, res) {
    var username = interimUsername;
    var name = req.smartShoppingData.name;
 
    var findUser = Q.nbind(User.findOne, User);

    findUser({username: username})
    .then(function(user) {
      User.findByIdAndUpdate(
        user._id,
        {$push: {'list': req.smartShoppingData._id}},
        {safe: true, upsert:true},
        function(err, model) {
          if (err) console.error(err);
        }
      );
      res.send(user.list);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send({error: 'Server Error'});
    })
    .done(function(err) {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Server Error' });
      }
    });
  },

  addItemToArchive: function(req, res) {
    var username = interimUsername;
    var itemName = req.body.name.toLowerCase();

    var findItem = Q.nbind(Item.findOne, Item);
    var findUser = Q.nbind(User.findOne, User);

    findItem({name: itemName})
    .then(function(match) {
      findUser({username: username})
      .then(function(user) {
        User.findByIdAndUpdate(
          user._id,
          {$pull: {'list': match._id}, $push: {'past_items': match._id}},
          {safe: true, upsert:true },
          function(err, model) {
            if (err) console.error(err);
          }
        );
      res.send(user.list)
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
      }) 
    })     
    .done(function(err) {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error'});
      }
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
        console.log(err);
        res.status(500).send({error: 'Server Error'});
      } 
      res.send(user.list);
    }); 
  },

  deleteItemFromList: function(req, res) {
    var username = interimUsername;
    var index = req.body.index;
    
    var setModifier = { $set: {} };
    setModifier.$set['list.' + index] = null;
    User.update({username: username}, setModifier, {upsert: true}, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});
      } 
    });

    User.findOneAndUpdate({username: username}, {$pull: {'list': null}}, {upsert: true}, function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error'});        
      }
      res.send(user.list);
    });
  }
};