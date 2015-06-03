var Q = require('q');
var request = require('request');
var config = require('./config.js');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);


var mode = function(array) {
  var count = {};
  var maxCount = 0;
  var max;
  for (var i = 0; i < array.length; i++) {
    count[array[i]] = (count[array[i]] || 0) + 1;
    if (count[array[i]] > maxCount) {
      maxCount = count[array[i]];
      max = array[i];
    }
  }
  return max;
};

module.exports = {

  createNewItem: function(req, res, next) {
    var name = req.body.name.toLowerCase();
    var newItem = new Item({
      name: name,
      data: {
        frequency: req.body.frequency,
        coupons: ['none'],
        expiration: new Date(2015,8,16)
      }
    });

    var findItem = Q.nbind(Item.findOne, Item);
    var createItem = Q.nbind(Item.create, Item);

    findItem({name: name})
    .then(function(match) {
      if (match) {
        req.smartShoppingData = match;
        next();
      } else {
        var uri = 'http://api.nal.usda.gov/usda/ndb/search/'
        var api_key = config.usdaKey;
        var query = '?format=json&q=' + newItem.name + '&sort=r&max=25&offset=0&api_key=' + api_key;

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





