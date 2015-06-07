var expect = require('chai').expect
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var 

describe('User Signup', function() {
  it('should be able to send request through api route', function() {
    api.post('/register')
    .set('Accept', 'application/json')
    .send({
      username: "aj42869@gmail.com",
      password: "password1"
    })
    .expect(200)
    .end(function(err, res) {
      expect(res.body.username).to.equal('aj42869@gmail.com');
      expect(res.body.password).to.equal('password1');
    })
  })

  // it('should register a new user to Firebase', function() {
    
  // })

})