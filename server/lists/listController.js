var Q = require('q');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);
var User = mongoose.model('User', models.user);


module.exports = {

  createUser: function() {
    var user = new User({username:'emily', list:[], past_items:[]})

    User.find({username: 'emily'}, function(err, users) {
      if (err) console.error(err);
      console.log(users);
      if (users.length > 0) {
        console.log('This user already exists!')
      } else {
        User.create(user, function(err, newUser) {
          console.log('User created! Welcome: ', newUser.username);
        });
      }
    });
  },
  
  getList: function(req, res) {
    var username = 'emily';
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
    .then(function(user) {
      console.log('Found user! ', user);
      res.send(user.list);
        // .populate('list')
        // .exec(function(err, user) {
        //   if (err) console.error(err);
        //   console.log('Inside exec')
        //   res.json(user.list);
        // });
    });
  },

  addItem: function(req, res) {
    var username = 'emily';
    var name = req.body.name;
    var frequency = req.body.frequency;
    var item = new Item({
      name: name,
      data: {
        frequency: frequency,
        coupons: ['none'],
        food_category: 'none',
        expiration: new Date(15,9,16)
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
            {$push: {'list': createdItem._id}},
            {safe:true, upsert:true},
            function(err, model) {
              if(err) console.log(err);
              console.log("Updated model!", model);
            }
          );
        });
        res.send(match);
      } else {
        return createItem(item)
      }
    })
    .then(function(createdItem) {
      findUser({username: username})
      .then(function(user) {
        User.findByIdAndUpdate(
          user._id,
          {$push: {'list': createdItem._id}},
          {safe:true, upsert:true},
          function(err, model) {
            if(err) console.log(err);
            console.log("Updated model!", model);
          }
        );
      });
      res.send(createdItem);
    });
  }

  // TODO: Update, Delete
};
