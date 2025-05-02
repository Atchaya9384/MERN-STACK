const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  rating: Number,
  originalPrice: Number,
  discountedPrice: Number,
  image: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
