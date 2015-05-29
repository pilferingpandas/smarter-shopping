var mocha = require('mocha');
var should = require('chai').should();
var expect = require('chai').expect;
var mongoose = require('mongoose');
var db = require('../../db/database.js');
var User = mongoose.model('User');
var Item = mongoose.model('Item');
var Cache = mongoose.model('Cache');

var breadInfo = {
  name: 'Bread',
  data: {
    frequency: 2,
    coupons: ['50% off', '$1 off'],
    food_category: 'bakery',
    expiration: new Date(15,5,10)
  }
};


describe('Item model', function() {
  it('should create a new item', function(done) {
    Item.create(breadInfo, function(err, createdItem) {
      expect(createdItem.name).to.equal('Bread');
      expect(createdItem.data.food_category).to.equal('bakery');
      done();
    });
  });

  it ('should delete an item', function(done) {
    Item.findOne({name: 'Bread'}).remove().exec();
    Item.findOne({name: 'Bread'}, function(err, item) {
      if (err) console.error(err);
      expect(item).to.equal(null);
      done();
    });
  });

  it('should update an item', function(done) {
    Item.create(breadInfo, function(err, createdItem) {
      expect(createdItem.name).to.equal('Bread');
      expect(createdItem.data.frequency).to.equal(2);
      done();
    });
    Item.where({name: 'Bread'}).update({'data.frequency': 4});
    Item.findOne({name: 'Bread'}, function(err, item) {
      if (err) console.error(err);
      expect(item.data.frequency).to.equal(4);
      done();
    });
  });
});

