const dns = require('dns');
const urlRegex = require('url-regex');
const ShortURL = require('../models/ShortUrl');

module.exports = (app) => {
  app.post('/api/shorturl/new', (req, res) => {
    if (urlRegex({ exact: true, strict: false }).test(req.body.url)) {
      const url = req.body.url.match(
        /\w+\.(com|org|edu|gov|uk|net|ca|de|jp|fr|au|us|co|biz|me)/,
      )[0];
      dns.lookup(url, (err, address) => {
        if (address) {
          ShortURL.findOne({ originalURL: req.body.url }).then((foundURL) => {
            if (foundURL) {
              res.send({ originalURL: foundURL.originalURL, shortURL: foundURL.shortURL });
            } else {
              ShortURL.countDocuments().then((count) => {
                ShortURL.create({ originalURL: req.body.url, shortURL: count })
                  .then((shortUrl) => res.send({ originalURL: req.body.url, shortURL: count }))
                  .catch((error) => console.warn('error', error));
              });
            }
          });
        } else {
          res.send({ error: 'invalid URL' });
        }
      });
    } else {
      res.send({ error: 'invalid URL' });
    }
  });

  app.get('/api/shorturl/:int', (req, res) => {
    ShortURL.findOne({ shortURL: req.params.int }).then((shortUrl) => {
      if (!shortUrl) {
        res.send({ error: 'Invalid URL' });
      } else {
        res.redirect(shortUrl.originalURL);
      }
    });
  });
};
