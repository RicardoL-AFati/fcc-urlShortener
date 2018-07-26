const mongoose = require('mongoose');
const { mongoTestURI } = require('../keys');

before((done) => {
  mongoose.connect(mongoTestURI);
  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => console.warn('Warning', error));
});

beforeEach((done) => {
  mongoose.connection.collections.shorturls.drop(() => {
    done();
  });
});
