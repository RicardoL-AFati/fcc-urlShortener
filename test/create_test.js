const assert = require('assert');
const ShortURL = require('../models/ShortUrl');

describe('Creates records', () => {
  it('saves a shortened URL', (done) => {
    const shortGoogle = new ShortURL({
      originalURL: 'www.google.com',
      shortURL: 2,
    });
    shortGoogle.save().then((shortUrl) => {
      assert(!shortUrl.isNew);
      done();
    });
  });
});
