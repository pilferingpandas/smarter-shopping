var expect = require('chai').expect;
var should = require('chai').should();
var mocha = require('mocha');
var request = require('supertest');
var server = require('../../server/server.js');
var mongoose = require('mongoose');
var db = require('../../db/database.js');
var User = mongoose.model('User', db.user);
var Item = mongoose.model('Item', db.item);

before(function(done) {
  var clearDb = function() {
    for (var i in mongoose.connection.collection) {
      mongoose.connection.collectioins[i].remove(function(){});
    }
      return done();
  }
  if (mongoose.connection.readyState === 0) {
    mongoose.connect("http://localhost:3000/smart-shopping_testing", function(err) {
      if (err) {
        console.log("Error connecting to testing db");
      }
      return clearDb();
    });
  } else {
    return clearDb();
  }
});

describe('Retrieving list', function() {
  it('should use return a list of items', function() {
    request(server)
    .get('/api/list')
    .end(function(err, res){
      if(err) console.log('Error receiving list');
      expect(err).to.not.exist;
      expect(res.body).to.an('object')
      done();
    })
  });
});

describe('Adding items', function() {
  it('should be able to send an item from client to database', function() {
    request(server)
    .post('/api/item/add')
    .send({name: 'bacon'})
    .end(function(res) {
      console.log(res);
      res.should.be.json;
      done();
    })
  });

  it('should save item added to list in database', function() {
    Item.findOne({name: 'bacon'}, function(err, item) {
      if (err) console.log(err);
      expect(item.name).to.be('bacon');
      done();
    });
  });

  // should put something in here in regards to rending on the app.component.jsx
})

describe('Deleting items', function() {
  var milkData = {
    name: 'milk',
    data: {
      frequency: 2,
      coupons: ['50% off', '$1 off'],
      food_category: 'bakery',
      expiration: new Date(15,5,10)
    }
  }

  Item.create(milkData, function(err, createdItem) {
    if (err) console.log("Error creating milk item");
  });

  it('should be able to delete an item with request from client', function() {
    request(server)
    .delete('/api/item/delete')
    .send({name: 'milk'})

    Item.findOne({name: 'milk'}, function(err, item) {
      if (err) console.log(err);
      expect(item).to.equal(null);
      done();
    })
  });

})

describe('Updating items', function() {
  var milkData = {
    name: 'milk',
    data: {
      frequency: 2,
      coupons: ['50% off', '$1 off'],
      food_category: 'bakery',
      expiration: new Date(15,5,10)
    }
  }

  Item.create(milkData, function(err, createdItem) {
    if (err) console.log("Error creating milk item");
  });

  it('should be able to send a request to update item', function() {
    request(server)
    .post('/api/item/update')
    .send()
  })
})

after(function (done) {
  clearDb();
  mongoose.disconnect();
  return done();
});
