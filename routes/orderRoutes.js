const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel'); // Import the model

// POST route to handle order submission
router.post('/checkout', async (req, res) => {
  const {
    name,
    address,
    paymentMethod,
    cardNumber,
    expiryDate,
    cvv,
    rentalDate,
    daysToRent,
    totalAmount,
    trackingId,
    cart
  } = req.body;

  const newOrder = new Order({
    name,
    address,
    paymentMethod,
    cardNumber,
    expiryDate,
    cvv,
    rentalDate,
    daysToRent,
    totalAmount,
    trackingId,
    cart
  });

  try {
    await newOrder.save();
    res.status(200).json({ message: 'Order successfully placed', trackingId });
  } catch (error) {
    res.status(500).json({ message: 'Error processing order', error });
  }
});

module.exports = router;