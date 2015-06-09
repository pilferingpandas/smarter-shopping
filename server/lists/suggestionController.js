var Q = require('q');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);
var User = mongoose.model('User', models.user);
var Suggestion = mongoose.mode('Suggestion', models.suggestion);



var calculateSuggestions = function(uid) {
  //    past_items          ({oid: [Date]}) -> map
  // -> pastItemIntervals   ({oid: [Int]})  -> map
  // -> pastItemFrequencies ({oid: Float})  -> map
  // -> pastItemOccurrences ({oid: Int})    -> map
  // -> predictedItemDates  ({oid: Date})   -> map +/- predictionInterval
  // -> itemIsPredicted     ({oid: Bool})   -> filter
  // -> predictedItems      ([oid])         -> filter w/ user.past_items ([oid])
  // -> itemSuggestions     ([oid])         -> take 2
  // -> respond.send()
};

module.exports = {
  getSuggestions: function(req, res) {
    var username = req.uid;
    User
    .findOne({username: username})
    .populate('suggestions')
    .exec(function(err, user) {
      if (err) console.error(err);
      console.log('in get list, user:',user);
      res.send(user.suggestions);
    });
  },

  removeSuggestion: function(req, res) {
    var username = req.uid;
    var name = req.body.name;

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