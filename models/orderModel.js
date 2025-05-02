const mongoose = require('mongoose');

// Define Mongoose Schema and Model
const OrderSchema = new mongoose.Schema({
  name: String,
  address: String,
  paymentMethod: String,
  cardNumber: String,
  expiryDate: String,
  cvv: String,
  rentalDate: String,
  daysToRent: Number,
  totalAmount: Number,
  trackingId: String,
  cart: Array,
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;