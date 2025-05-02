const express = require('express');
const router = express.Router();

// Mock data for top-rated electronics books
const topRatedElectronicsBooks = [
    {
        title: "The Art of Electronics",
        author: "Paul Horowitz and Winfield Hill",
        rating: 5,
        originalPrice: 3000,
        discountedPrice: 2100,
        image: "https://m.media-amazon.com/images/I/81rnDbZJibL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Microelectronic Circuits",
        author: "Adel S. Sedra and Kenneth C. Smith",
        rating: 5,
        originalPrice: 2500,
        discountedPrice: 1750,
        image: "https://49thshelf.com/var/ezflow_site/storage/images/books/l/laboratory-explorations-to-accompany-microelectronic-circuits/9780199339259_cover/576013429-1-eng-CA/9780199339259_cover_wide_432.jpg"
    },
    {
        title: "Digital Design and Computer Architecture",
        author: "David Harris and Sarah Harris",
        rating: 5,
        originalPrice: 2000,
        discountedPrice: 1400,
        image: "https://m.media-amazon.com/images/I/71ZXI1yJr0S._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Electronic Devices and Circuit Theory",
        author: "Robert Boylestad and Louis Nashelsky",
        rating: 5,
        originalPrice: 2200,
        discountedPrice: 1540,
        image: "https://m.media-amazon.com/images/I/81ei3AqQUXL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Fundamentals of Electric Circuits",
        author: "Charles K. Alexander and Matthew N. O. Sadiku",
        rating: 5,
        originalPrice: 1800,
        discountedPrice: 1260,
        image: "https://m.media-amazon.com/images/I/81nVBpqSltL._AC_UF1000,1000_QL80_.jpg"
    }
];

// Mock data for electronics books
const electronicsBooks = [
    {
        title: "Practical Electronics for Inventors",
        author: "Paul Scherz and Simon Monk",
        originalPrice: 3000,
        discountedPrice: 2100,
        image: "https://qph.cf2.quoracdn.net/main-qimg-a245d0c908d8b2719a2642c5581f87ba-lq"
    },
    {
        title: "Power Electronics",
        author: "Muhammad H. Rashid",
        originalPrice: 2500,
        discountedPrice: 1750,
        image: "https://rukminim2.flixcart.com/image/850/1000/kiqbma80-0/book/z/g/1/power-electronics-original-imafygs759skrmrz.jpeg?q=90&crop=false"
    },
    {
        title: "Modern Digital Electronics",
        author: "R P Jain Kishor Sarawadekar",
        originalPrice: 2000,
        discountedPrice: 1400,
        image: "https://www.mheducation.co.in/media/catalog/product/cache/84c63a40cf0771f03c9446b22a7e0f08/9/7/9789355321770.jpeg"
    },
    {
        title: "Consumer Electronics",
        author: "Dr. B.R.Gupta and V. Singhal",
        originalPrice: 2200,
        discountedPrice: 1540,
        image: "https://cdn01.sapnaonline.com/bk_images/077/9789350144077.jpg"
    },
    {
        title: "Design of Electric Circuits",
        author: "Dr. A M Didhe",
        originalPrice: 1800,
        discountedPrice: 1260,
        image: "https://m.media-amazon.com/images/I/51UVh+9EhHL._SL500_.jpg"
    }
];

// Route to get top-rated electronics books
router.get('/category/topRated', (req, res) => {
    res.json({ topRatedElectronicsBooks });
});

// Route to get electronics books
router.get('/category/electronics', (req, res) => {
    res.json({ electronicsBooks });
});

// Route to add a new top-rated electronics book
router.post('/category/topRated', (req, res) => {
    const newBook = req.body;
    topRatedElectronicsBooks.push(newBook);
    res.status(201).json(newBook);
});

// Route to add a new electronics book
router.post('/category/electronics', (req, res) => {
    const newBook = req.body;
    electronicsBooks.push(newBook);
    res.status(201).json(newBook);
});

module.exports = router;
