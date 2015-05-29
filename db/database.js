var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var Item = new Schema({
  name: String,
  timestamp: { type: Date, default: Date.now },
  data: {
    frequency: Number,
    coupons: [String],
    food_category: String,
    expiration: Date
  }
}); 

var Cache = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: 'Item'}]
})

var User = new Schema({
  username: String,
  list: [{ type: Schema.Types.ObjectId, ref: 'Item'}],
  past_items: [{ type: Schema.Types.ObjectId, ref: 'Item'}]
});

mongoose.model('Item', Item);
mongoose.model('Cache', Cache);
mongoose.model('User', User);
mongoose.connect('mongodb://localhost/smart-shopping');