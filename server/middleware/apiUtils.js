var request = require('request');
var config = require('./config.js');


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

var parse = function(err, res, body) {
  if (err) {
    console.error(err);
  }
  var categories = [];
  var data = JSON.parse(res.list.item);
  for (var i = 0; i < data.length; i++) {
    categories.push(data[i].group);
  }

  newItem.food_category = mode(categories);
};


module.exports = {

  prepareData: function(req, res, next) {
    var newItem = {};
    newItem.name = req.body.name;
    if (req.body.frequency) {
      newItem.frequency = req.body.frequency
    }

    var uri = 'http://api.nal.usda.gov/usda/ndb/search/';
    var api_key = config.usdaKey;
    var query = '?format=json&q=" + newItem.name + "&sort=n&max=10&offset=0&api_key=' + api_key;

    request.get(uri + query, parse);
  }
}





