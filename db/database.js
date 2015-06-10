var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = {
  item : new Schema({
    name: String,
    timestamp: { type: Date, default: Date.now },
    data: {
      frequency: Number,
      coupons: [String],
      food_category: String,
      expiration: Date
    }
  }),

  user : new Schema({
    username: String,
    list: [{ type: Schema.Types.ObjectId, ref: 'Item'}],
    past_items: [{ type: Schema.Types.ObjectId, ref: 'Item'}],
    // put id of user we invite here
    // push into the element the friends array
    friends: [{ type: Schema.Types.ObjectId, ref: 'User'}]
  })
};