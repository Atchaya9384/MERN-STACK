const express = require('express');
const router = express.Router();

// Sample data for demonstration purposes
const topRatedNonFictionBooks = [
  {
    id: 1,
    title: "Educated: A Memoir",
    author: "Tara Westover",
    rating: 5,
    originalPrice: 450,
    discountedPrice: 315,
    image: "https://m.media-amazon.com/images/I/71N2HZwRo3L.AC_UF350,350_QL50.jpg"
  },
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    rating: 5,
    originalPrice: 500,
    discountedPrice: 350,
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/regionalbooks/b/e/o/sapience-a-brief-history-of-humankind-original-imagzbc62hfpfhx7.jpeg?q=90&crop=false"
  },
  {
    id: 3,
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    rating: 5,
    originalPrice: 400,
    discountedPrice: 280,
    image: "https://www.univ.ox.ac.uk/wp-content/uploads/2018/11/The-Immortal-Life-of-Henrietta-Lacks.jpg"
  },
  {
    id: 4,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5,
    originalPrice: 400,
    discountedPrice: 280,
    image: "https://m.media-amazon.com/images/I/71ONWR6eXDL.AC_UF350,350_QL50.jpg"
  },
  {
    id: 5,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    rating: 5,
    originalPrice: 550,
    discountedPrice: 385,
    image: "https://m.media-amazon.com/images/I/71f6DceqZAL.AC_UF350,350_QL50.jpg"
  }
];

  
  
const nonFictionBooks = [
  {
    id: 1,
    title: "Self-Publish & Succeed",
    author: "Julie Board",
    originalPrice: 500,
    discountedPrice: 350,
    image: "https://cdn.kobo.com/book-images/5d17e601-2e54-4b11-869b-470fb6cba2e6/353/569/90/False/self-publish-succeed-the-no-boring-books-way-to-writing-a-non-fiction-book-that-sells.jpg"
  },
  {
    id: 2,
    title: "The India Way",
    author: "S. Jaishankar",
    originalPrice: 450,
    discountedPrice: 315,
    image: "https://www.himalayanwritingretreat.com/wp-content/uploads/2022/11/images-2022-11-15T053305.836-210x300.jpeg"
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    originalPrice: 600,
    discountedPrice: 420,
    image: "https://bookstech.in/cdn/shop/products/Psychology-of-money-bookstech.in_400x.jpg?v=1639237062"
  },
  {
    id: 4,
    title: "To Name the Bigger Lie",
    author: "Sarah Viren",
    originalPrice: 400,
    discountedPrice: 280,
    image: "https://s26162.pcdn.co/wp-content/uploads/2023/05/Screen-Shot-2023-05-24-at-3.37.14-PM.png"
  },
  {
    id: 5,
    title: "The Universe and Dr. Einstein",
    author: "Lincoln Barnett",
    originalPrice: 350,
    discountedPrice: 245,
    image: "https://www.engineersgarage.com/wp-content/uploads/2019/07/dr_einstein_universe.jpg"
  },
  {
    id: 6,
    title: "The Power of Your Subconscious Mind",
    author: "Joseph Murphy",
    originalPrice: 550,
    discountedPrice: 385,
    image: "https://img.etimg.com/photo/msid-99753641,imgsize-95412/ThePowerofYourSubconsciousMindbyJosephMurphy.jpg"
  },
  {
    id: 7,
    title: "The Other Slavery",
    author: "Andres Resendez",
    originalPrice: 400,
    discountedPrice: 280,
    image: "https://s26162.pcdn.co/wp-content/uploads/2019/10/slavery-bookgif-684x1024.gif"
  },
  {
    id: 8,
    title: "Grit: The Power of Passion and Perseverance",
    author: "Angela Duckworth",
    originalPrice: 450,
    discountedPrice: 315,
    image: "https://demmelearning.com/wp-content/uploads/2018/12/grit-book-review-pinterest.jpg"
  },
  {
    id: 9,
    title: "Quiet: The Power of Introverts in a World That Can’t Stop Talking",
    author: "Susan Cain",
    originalPrice: 500,
    discountedPrice: 350,
    image: "https://m.media-amazon.com/images/I/41ijW+bp-DL.AC_UF1000,1000_QL80.jpg"
  },
  {
    id: 10,
    title: "Outliers: The Story of Success",
    author: "Malcolm Gladwell",
    originalPrice: 400,
    discountedPrice: 280,
    image: "https://m.media-amazon.com/images/I/61XsLQzCkRL.AC_UF1000,1000_QL80.jpg"
  }
];

  

  router.get('/top-rated', (req, res) => {
    res.json({ topRatedNonFictionBooks });
  });
  
  // Get non-fiction books
  router.get('/non-fiction', (req, res) => {
    res.json({ nonFictionBooks });
  });
  
  // Add a new non-fiction book
  router.post('/non-fiction', (req, res) => {
    const newBook = { id: Date.now(), ...req.body };
    nonFictionBooks.push(newBook);
    res.status(201).json(newBook);
  });
  
  // Update an existing non-fiction book
  router.put('/non-fiction/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = nonFictionBooks.findIndex(book => book.id === bookId);
  
    if (index !== -1) {
      nonFictionBooks[index] = { id: bookId, ...req.body };
      res.json(nonFictionBooks[index]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  });
  
  // Delete a non-fiction book
  router.delete('/non-fiction/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    nonFictionBooks = nonFictionBooks.filter(book => book.id !== bookId);
  
    res.status(204).end();
  });
  
  module.exports = router;
