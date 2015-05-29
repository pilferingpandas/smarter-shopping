var mocha = require('mocha');
var should = require('chai').should();
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');
var Cache = mongoose.model('Cache');

// before each, clear the database
// 


describe('Item model', function() {
  it('should create a new item', function(done) {
    new Item({
      name: 'Bread',
      data: {
        frequency: 2,
        coupons: ['50% off', '$1 off'],
        food_category: 'bakery',
        expiration: new Date(15,5,10);
      }
    }).save(function(err, item) {
      if(err) console.error(err);
    });

    Item.findOne({name: 'Bread'}, function(err, item) {
      if (err) console.error(err);
      expect(item).to.not.equal(null);
    });
    done();
  });
});
