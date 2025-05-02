// contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel'); // Import the contact model

// POST route to handle contact form submissions
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the incoming data
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a new contact entry
  const newContact = new Contact({
    name,
    email,
    message,
    submittedAt: new Date()
  });

  try {
    await newContact.save();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

module.exports = router;