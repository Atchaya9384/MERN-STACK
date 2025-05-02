const mongoose = require('mongoose');
const Book = require('../models/Book'); // Adjust the path as necessary

mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('Connected to MongoDB');

    // Sample data
    const topRatedBooks = [
        { title: 'Matilda', author: 'Roald Dahl', rating: 5, originalPrice: 320, discountedPrice: 160, image: 'https://m.media-amazon.com/images/I/71Zg7RRuDgL._AC_UF1000,1000_QL80_.jpg', category: 'topRated' },
        { title: 'Chemistry Textbook Part - 1 for Class - 11', author: 'NCERT', rating: 5, originalPrice: 180, discountedPrice: 63, image: 'https://5.imimg.com/data5/HK/EX/MY-10953353/chemistry-part-1-class-11-ncert-book.jpg', category: 'topRated' }
    ];

    const childrenBooks = [
        { title: '101 Sight Words And Sentence', author: 'Author Unknown', originalPrice: 199, discountedPrice: 69, image: 'https://m.media-amazon.com/images/I/81m3mFHn1fL._AC_UF1000,1000_QL80_.jpg', category: 'children' },
        { title: '365 Facts on Space', author: 'Author Unknown', originalPrice: 300, discountedPrice: 105, image: 'https://m.media-amazon.com/images/I/814Dxuz74ZL._AC_UF1000,1000_QL80_.jpg', category: 'children' }
    ];

    await Book.deleteMany(); // Clear existing data
    await Book.insertMany(topRatedBooks);
    await Book.insertMany(childrenBooks);

    console.log('Database seeded');
    mongoose.connection.close();
})
.catch(error => console.error('Error connecting to MongoDB:', error));
