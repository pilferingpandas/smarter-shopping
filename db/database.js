var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var Item = new Schema({
  name: ObjectId,
  timestamp: { type: Date, default: Date.now },
  data: []
}); 

var Cache = new Schema({
  items: [Item]
})

var User = new Schema({
  username: String,
  list: [Item],
  past_items: [Item]
});

mongoose.model('Item', Item);
mongoose.model('Cache', Cache);
mongoose.model('User', User);
mongoose.connect('mongodb://localhost/smart-shopping');