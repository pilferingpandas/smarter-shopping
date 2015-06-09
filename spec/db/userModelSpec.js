var expect = require('chai').expect;
var should = require('chai').should();
var mocha = require('mocha');
var mongoose = require('mongoose');
var db = require('../../db/database.js');
var User = mongoose.model('User', db.user);

before(function(done) {
  var clearDb = function() {
    for (var i in mongoose.connection.collection) {
      mongoose.connection.collectioins[i].remove(function(){});
    }
      return done();
  };

  if (mongoose.connection.readyState === 0) {
    mongoose.connect("mongodb://savage:iamsavage@ds043972.mongolab.com:43972/savagetadpole_testing", function(err) {
      if (err) {
        console.log("Error connecting to testing db");
      }
      return clearDb();
    });
  } else {
    return clearDb();
  }
});

describe('User model', function() {
  it('should be able to create a new user instance', function() {
    var me = { name: 'aj42869@gmail.com' };
    User.create(me, function(err, newUser) {
      expect(newUser.name).to.equal('aj42869@gmail.com');
      done();
    })
  });

  it('should be able to find user', function() {
    User.findOne({name: 'aj42869@gmail.com'}, function(err, user) {
      if (err) console.error(err);
      expect(user.name).to.not.equal(null);
      done();
    });
  });

  it('should be able to delete user', function() {
    User.findOne({name: 'aj4869@gmail.com'}).remove().exec();
    User.findOne({name: 'aj42869@gmail.com'}, function(err, user) {
      if (err) console.log(err);
      expect(user).to.equal(null);
      done();
    }) 
  });
});


after(function (done) {
  clearDb();
  mongoose.discsonnect();
  return done();
});
