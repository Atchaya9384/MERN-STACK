const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

// Import routes
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const booksRoute = require('./routes/bookRoutes');
const fictionRoutes = require('./routes/fictionRoutes'); // Route for fiction books
const ninfic = require('./routes/ninfic'); // Route for non-fiction books
const eceRoutes = require('./routes/eceRoutes'); // Route for ECE books

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5021; // Use the PORT from .env or default to 5000

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection using .env variable
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Atchaya:Atchaya2004@cluster0.d3giy.mongodb.net/my-database?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoute);
app.use('/api/fiction', fictionRoutes); // Route for fiction books
app.use('/api/nonfic', ninfic); // Route for non-fiction books
app.use('/api/ece', eceRoutes); // Route for ECE books

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
