var Q = require('q');
var mongoose = require('mongoose');
var models = require('../../db/database.js');
var Item = mongoose.model('Item', models.item);
var User = mongoose.model('User', models.user);
var Suggestion = mongoose.mode('Suggestion', models.suggestion);

var findUser = Q.nbind(User.findOne,User);

var calculateSuggestions = function(uid) {
  return findUser({usename: uid})
  .then(function(user) {
    return user.past_items.reduce(function(item, past_items) {
      var iid = item.item_id;
      var date = item.purchase_dates[0];
      if (past_items[iid]) {
        past_items[iid].push(date);
      } else {
        past_items[iid] = [date];
      }
      return past_items;
    },{});
  })
  .then(function(past_items) {
    var pastItemOccurrences = {};
    for (var iid in past_items) {
      pastItemOccurrences[iid] = past_items[iid];
    }

    for (var iid in past_items) {
      var dates = past_items[iid];
      if (dates.length <= 1) delete past_items[iid];
      var intervals = [];
      for (var i = 1; i < dates.length; i++) {
        intervals[i-1] = new Date(dates[i]) - new Date(dates[i-1]);
      }
      past_items[iid] = intervals;
    }
    return [past_items, pastItemOccurrences];
  })
  .spread(function(pastItemIntervals, pastItemOccurrences) {
    for (var iid in past_items) {
      var sum = past_items[iid].reduce(function(interval,sum) {
        return sum + interval;
      },0);
      var avg = sum / past_items[iid].length;
      past_items[iid] = avg;
    }
    return [past_items, pastItemOccurrences];
  })
  .spread(function(pastItemFrequencies, pastItemOccurrences) {

  })
  .then(function(pastItemOccurrences) {
  })

  //    past_items          ([item_id: oid, purchase_dates: [Date]]) -> map
  //    past_items          ({oid: [Date]}) -> map
  // -> pastItemIntervals   ({oid: [Int]})  -> map
  // -> pastItemFrequencies ({oid: Float})  -> map
  // -> pastItemOccurrences ({oid: Int})    -> map
  // -> predictedItemDates  ({oid: Date})   -> map +/- predictionInterval
  // -> itemIsPredicted     ({oid: Bool})   -> filter
  // -> predictedItems      ([oid])         -> filter w/ user.past_items ([oid])
  // -> itemSuggestions     ([oid])         -> take 2
  // -> fill user.suggestions
};

module.exports = {
  getSuggestions: function(req, res) {
    var username = req.uid;
    User
    .findOne({username: username})
    .populate('suggestions')
    .exec(function(err, user) {
      if (err) console.error(err);
      console.log('in get suggestions, user:',user);
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