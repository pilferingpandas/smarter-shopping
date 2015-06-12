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
      return -1;
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
  // TODO
  // make it so createUser expects an object userData
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
    var username = req.session.username;
    User
    .findOne({username: username})
    .populate('list')
    .exec(function(err, user) {
      if (err) console.error(err);
      console.log('in get list, user:',user);
      if (user) {
        res.send(user.list);
      } else {
        res.send([]);
      }
    });
  },
  showPast: function (req, res){

    var username = req.session.username;

     User
     .findOne({username: username}).
    // .findById({_id: '5578e225c651fa905b93096d'}).
    populate('past_items')
    .exec(function(err, data) {
      if (err) console.error(err);
      var howmanyItems = data.past_items.length;
      var frequency = {};
      for (var i=0; i<howmanyItems; i++){
        var current = data.past_items[i].name;
         frequency[current] = frequency[current] || 0;
         frequency[current]++;
      }
      console.log('show data retrieved for the ID stuff',frequency);
      res.send(frequency);
    });  
  },

  addItemToList: function(req, res) {
    
    var username = req.session.username;
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

  addAllItemsToArchive:  function(req, res) {
    var username = req.session.username;
    var howmany = Number(req.body.howmany);
    var tempId;

    User.findOne({username: username}, function(err, user) {
      var pushModifier = {$push: {}};
      for (var i=0; i<howmany; i++){
        // push each item on the list
        pushModifier.$push['past_items'] = user.list[i];
      }
      
      User.update({username: username}, pushModifier, {upsert: true}, function(err) {if (err) console.error(err)});
    });

    var setModifier = { $set: {} };
    for (var i=0; i<howmany; i++){
      setModifier.$set['list.' + i] = null;
    }
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
        res.status(500).send({error: 'Could not store list'});
      }
    });
    });

  },



  addItemToArchive: function(req, res) {
   var username = req.session.username;
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
  var username = req.session.username;
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
    var username = req.session.username;
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
  });
},

  recipeCreateNewItems: function(recipeItems) {
    for(var i = 0; i < recipeItems.length; i++) {
      var newItem = new Item({
        name: recipeItems[i],
        data: {
          frequency: req.body.frequency,
          coupons: ['none'],
          expiration: new Date(2015,8,16)
        }
      });
      var findItem = Q.nbind(Item.findOne, Item);
      var createItem = Q.nbind(Item.create, Item);+
      findItem({name: name})
      .then(function(match) {
        if (match) {
          req.smartShoppingData = match;
          next();
        } else {
          var uri = 'http://api.nal.usda.gov/usda/ndb/search/'
          var api_key = config.usdaKey;
          var query = '?format=json&q=' + newItem.name + '&sort=r&max=10&offset=0&api_key=' + api_key;+
          request.get(uri + query, function(err, res, body) {
            if (err) {
              console.error(err);
            }
            var categories = [];
            if (JSON.parse(body).list) {
              var data = JSON.parse(body).list.item;
              for (var i = 0; i < data.length; i++) {
                categories.push(data[i].group);
              }
              newItem.data.food_category = mode(categories);
            } else {
              newItem.data.food_category = 'unknown';
            }
            createItem(newItem)
            .then(function(createdItem) {
              req.smartShoppingData = createdItem;
              next();
            })
            .catch(function(err) {
              console.error(err);
              res.status(500).send({error: 'Server Error'});
            });
          });
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send({error: 'Server Error'});
      });
    }
  }
};
