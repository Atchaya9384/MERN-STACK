const express = require('express');
const router = express.Router();


const topRatedFictionBooks = [
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "rating": 5,
        "originalPrice": 350,
        "discountedPrice": 120,
        "image": "https://m.media-amazon.com/images/I/811NqsxadrS.AC_UF1000,1000_QL80.jpg"
    },
    {
        "title": "1984",
        "author": "George Orwell",
        "rating": 5,
        "originalPrice": 250,
        "discountedPrice": 88,
        "image": "https://m.media-amazon.com/images/I/7180qjGSgDL.AC_UF1000,1000_QL80.jpg"
    },
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "rating": 5,
        "originalPrice": 300,
        "discountedPrice": 105,
        "image": "https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@.V1.jpg"
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "rating": 5,
        "originalPrice": 400,
        "discountedPrice": 140,
        "image": "https://m.media-amazon.com/images/I/91GjOmU7z1L.AC_UF1000,1000_QL80.jpg"
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "rating": 5,
        "originalPrice": 320,
        "discountedPrice": 112,
        "image": "https://static.tvtropes.org/pmwiki/pub/images/selindjer_nad_propastyu_vo_rji.jpg"
    }
];

const fictionBooks = [
    {
        "title": "Moby Dick",
        "author": "Herman Melville",
        "originalPrice": 450,
        "discountedPrice": 158,
        "image": "https://m.media-amazon.com/images/I/71d5wo+-MuL.AC_UF1000,1000_QL80.jpg"
    },
    {
        "title": "War and Peace",
        "author": "Leo Tolstoy",
        "originalPrice": 550,
        "discountedPrice": 193,
        "image": "https://m.media-amazon.com/images/I/91teiIZ5vwL.AC_UF1000,1000_QL80.jpg"
    },
    {
        "title": "The Odyssey",
        "author": "Homer",
        "originalPrice": 250,
        "discountedPrice": 88,
        "image": "https://cdn.kobo.com/book-images/1c003baf-c48d-45be-9fd3-bc9c2bc6a685/1200/1200/False/the-odyssey-172.jpg"
    },
    {
        "title": "Crime and Punishment",
        "author": "Fyodor Dostoevsky",
        "originalPrice": 400,
        "discountedPrice": 140,
        "image": "https://cdn.kobo.com/book-images/b1c96137-0ddf-4ee4-8f46-73bdfa9b8621/1200/1200/False/crime-and-punishment-by-fyodor-dostoevsky-1.jpg"
    },
    {
        "title": "The Brothers Karamazov",
        "author": "Fyodor Dostoevsky",
        "originalPrice": 500,
        "discountedPrice": 175,
        "image": "https://cdn.kobo.com/book-images/561f9624-ba0a-43dc-a569-dac6327e3804/1200/1200/False/the-brothers-karamazov-233.jpg"
    },
    {
        "title": "Jane Eyre",
        "author": "Charlotte Brontë",
        "originalPrice": 350,
        "discountedPrice": 122,
        "image": "https://m.media-amazon.com/images/I/41+VR4PNiEL.jpg"
    },
    {
        "title": "Wuthering Heights",
        "author": "Emily Brontë",
        "originalPrice": 320,
        "discountedPrice": 112,
        "image": "https://wp.dailybruin.com/images/2016/01/web.ae_.wuthering.COURTESY.jpg"
    },
    {
        "title": "Brave New World",
        "author": "Aldous Huxley",
        "originalPrice": 300,
        "discountedPrice": 105,
        "image": "https://m.media-amazon.com/images/I/81zE42gT3xL.AC_UF1000,1000_QL80.jpg"
    },
    {
        "title": "The Scarlet Letter",
        "author": "Nathaniel Hawthorne",
        "originalPrice": 150,
        "discountedPrice": 52,
        "image": "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487566_9780743487566_hr.jpg"
    },
    {
        "title": "The Count of Monte Cristo",
        "author": "Alexandre Dumas",
        "originalPrice": 650,
        "discountedPrice": 227,
        "image": "https://m.media-amazon.com/images/I/41PgrIe9HOL.jpg"
    }
];


// Route to get top-rated fiction books
router.get('/category/topRatedFiction', (req, res) => {
    res.json({ topRatedFictionBooks });
});

// Route to get fiction books
router.get('/category/fiction', (req, res) => {
    res.json({ fictionBooks });
});

// Route to add a new top-rated fiction book
router.post('/category/topRatedFiction', (req, res) => {
    const newBook = req.body;
    topRatedFictionBooks.push(newBook);
    res.status(201).json(newBook);
});

// Route to add a new fiction book
router.post('/category/fiction', (req, res) => {
    const newBook = req.body;
    fictionBooks.push(newBook);
    res.status(201).json(newBook);
});

// Route to update an existing top-rated fiction book
router.put('/category/topRatedFiction/:title', (req, res) => {
    const { title } = req.params;
    const updatedBook = req.body;
    const index = topRatedFictionBooks.findIndex(book => book.title === title);

    if (index !== -1) {
        topRatedFictionBooks[index] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Route to update an existing fiction book
router.put('/category/fiction/:title', (req, res) => {
    const { title } = req.params;
    const updatedBook = req.body;
    const index = fictionBooks.findIndex(book => book.title === title);

    if (index !== -1) {
        fictionBooks[index] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

module.exports = router;
