var expect = require('chai').expect;
var should = require('chai').should();
var mocha = require('mocha');
var request = require('supertest');
var server = require('../../server/server.js');
var firebaseAuth = require('../../server/middleware/authFirebase.js');

var user = {
  username: 'aj42869@gmail.com',
  password: 'password1'
};

describe('User Authentication', function() {

  it('should require a user to be logged in to render homepage', function(done) {
    request(server)
    .post('/api/*')
    .end(function(err, res) {
      expect(err).to.be(true)
      done();
    });
  })

  it('should not sign the same user up twice', function(done) {
    request(server)
    .post('/api/register')
    .send({
      username: 'aj42869@gmail.com',
      password: 'password1'
    })
    .expect(500)
    .end(function(err, res) {
      expect(err).to.be(true);
      done();
    })

  });

  it('should be able to signin a user that has been created', function(done) {
    request(server)
    .post('/api/login')
    .send({
      username: 'aj42869@gmail.com',
      password: 'password1'
    })
    .expect(200)
    .end(function(err, res) {
      expect(res.body.username).to.equal('aj42869@gmail.com');
      done();
    })
  })


})
