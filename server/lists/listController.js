var Q = require('q');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);
var User = mongoose.model('User', models.user);
var interimUsername = 'emily'


module.exports = {

  createUser: function() {
    var user = new User({username:interimUsername, list:[], past_items:[]})

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
    var username = interimUsername;
    User
    .findOne({username: username})
    .populate('list')
    .exec(function(err, user) {
      if (err) console.error(err);
      res.send(user.list);
    })
  },

  addItem: function(req, res, string) {
    var username = interimUsername;
    var name = req.smartShoppingData.name;
    var item = new Item({
      name: name,
      data: {
        frequency: req.smartShoppingData.frequency,
        coupons: ['none'],
        food_category: req.smartShoppingData.food_category,
        expiration: new Date(2015,8,16)
      }
    });
    var createItem = Q.nbind(Item.create, Item);
    var findItem = Q.nbind(Item.findOne, Item);
    var findUser = Q.nbind(User.findOne, User);

    findItem({name : name})
    .then(function(match) {
      if (match) {
        findUser({username: username})
        .then(function(user) {
          User.findByIdAndUpdate(
            user._id,
            {$push: {'list': match._id}},
            {safe:true, upsert:true},
            function(err, model) {
              if(err) console.log(err);
            }
          );
          res.send(match);
        })
        .catch(function(err) {
          console.error(err);
          res.status(500).send({ error: 'Server Error' });
        })
      } else {
        createItem(item)
        .then(function(createdItem) {
          findUser({username: username})
          .then(function(user) {
            User.findByIdAndUpdate(
              user._id,
              {$push: {'list': createdItem._id}},
              {safe:true, upsert:true},
              function(err, model) {
                if(err) console.error(err);
              }
            );
            res.send(createdItem);
          })
          .catch(function(err) {
            console.error(err);
            res.status(500).send({ error: 'Server Error' });

          });
        })
        .catch(function(err) {
          console.error(err);
          res.status(500).send({ error: 'Server Error' });
        });
      }
    })
    .done(function(err) {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Server Error' });
      }
    });
  }

  // TODO: Update, Delete
};
