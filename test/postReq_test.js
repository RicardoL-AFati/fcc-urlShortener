const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');

const ShortUrl = mongoose.model('shorturl');

describe('shortURL creation', (done) => {
  it('POSTS to /api/shorturl/new') {
    request(app)
      .post('/api/shorturl/new')
      .send({ url: 'https://www.freecodecamp.com' })
      .end(() => {
        ShortUrl.count
      })
  }
});
