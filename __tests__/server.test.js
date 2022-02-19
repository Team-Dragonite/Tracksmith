const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();

app.get('/login', function (req, res) {
  res.status(200).json({ response: true });
});


app.post("/signup", (req, res) => {
  try {
    res
      .status(200)
      .json({ response: true });
  } catch (e) {
    console.error(e);
  }
});

describe('GET /login', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert(response.body.response, true)
        done();
      })
  });
});


describe('POST /signup', function () {
  it('responds with json', function (done) {
    request(app)
      .post('/signup')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert(response.body.response, true)
        done();
      })
  });
});