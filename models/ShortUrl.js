const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShortUrlSchema = new Schema({
  originalURL: String,
  shortURL: Number,
});

const ShortURL = mongoose.model('shorturl', ShortUrlSchema);

module.exports = ShortURL;
