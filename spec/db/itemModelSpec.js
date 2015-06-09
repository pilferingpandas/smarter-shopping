var mocha = require('mocha');
var should = require('chai').should();
var expect = require('chai').expect;
var mongoose = require('mongoose');
var db = require('../../db/database.js');
var User = mongoose.model('User', db.user);
var Item = mongoose.model('Item', db.item);

var breadInfo = {
  name: 'Bread',
  data: {
    frequency: 2,
    coupons: ['50% off', '$1 off'],
    food_category: 'bakery',
    expiration: new Date(15,5,10)
  }
};

before(function(done) {
  var clearDb = function() {
    for (var i in mongoose.connection.collection) {
      mongoose.connection.collectioins[i].remove(function(){});
    }
      return done();
  };

  if (mongoose.connection.readyState === 0) {
    mongoose.connect("mongodb://savage:iamsavage@ds043972.mongolab.com:43972/savagetadpole", function(err) {
      if (err) {
        console.log("Error connecting to testing db");
      }
      return clearDb();
    });
  } else {
    return clearDb();
  }
});



describe('Item model', function() {
  it('should create a new item', function(done) {
    var breadInfo = {
      name: 'Bread',
      data: {
        frequency: 2,
        coupons: ['50% off', '$1 off'],
        food_category: 'bakery',
        expiration: new Date(15,5,10)
      }
    };
    Item.create(breadInfo, function(err, createdItem) {
      if (err) throw err;
      expect(createdItem.name).to.equal('Bread');
      expect(createdItem.data.food_category).to.equal('bakery');
      done();
    });
  });

  it ('should delete an item', function(done) {
    var breadInfo = {
      name: 'Bread',
      data: {
        frequency: 2,
        coupons: ['50% off', '$1 off'],
        food_category: 'bakery',
        expiration: new Date(15,5,10)
      }
    };
    Item.create(breadInfo, function(err, createdItem) {
      if(err) throw err;
    })
    Item.findOne({name: 'Bread'}).remove().exec();
    Item.findOne({name: 'Bread'}, function(err, item) {
      if (err) throw err;
      expect(item).to.equal(null);
      done();
    });
  });

  it('should update an item', function(done) {
    Item.create(breadInfo, function(err, createdItem) {
      if (err) throw err;
      expect(createdItem.name).to.equal('Bread');
      expect(createdItem.data.frequency).to.equal(2);
      done();
    });
    Item.where({name: 'Bread'}).update({'data.frequency': 4});
    Item.findOne({name: 'Bread'}, function(err, item) {
      if (err) throw err;
      expect(item.data.frequency).to.equal(4);
      done();
    });
  });
});


after(function (done) {
  clearDb();
  mongoose.disconnect();
  return done();
});


