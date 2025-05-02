// contactModel.js
const mongoose = require('mongoose');

// Define Mongoose Schema and Model for contact form submissions
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;