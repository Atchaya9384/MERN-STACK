const express = require('express');
const router = express.Router();


// Mock data
const topRatedBooks = [
    {
        title: "Matilda",
        author: "Roald Dahl",
        rating: 5,
        originalPrice: 320,
        discountedPrice: 160,
        image: "https://m.media-amazon.com/images/I/71Zg7RRuDgL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Chemistry Textbook Part - 1 for Class - 11",
        author: "NCERT",
        rating: 5,
        originalPrice: 180,
        discountedPrice: 63,
        image: "https://5.imimg.com/data5/HK/EX/MY-10953353/chemistry-part-1-class-11-ncert-book.jpg"
    },
    {
        title: "Charlotte's Web",
        author: "E.B. White",
        rating: 5,
        originalPrice: 350,
        discountedPrice: 175,
        image: "https://m.media-amazon.com/images/I/91NOcoxRkUL._AC_UF350,350_QL50_.jpg"
    },
    {
        title: "The Very Hungry Caterpillar",
        author: "Eric Carle",
        rating: 5,
        originalPrice: 299,
        discountedPrice: 150,
        image: "https://m.media-amazon.com/images/I/812LGxE94hS._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        rating: 5,
        originalPrice: 350,
        discountedPrice: 122,
        image: "https://m.media-amazon.com/images/I/91fQEUwFMyL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        rating: 5,
        originalPrice: 450,
        discountedPrice: 200,
        image: "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg"
    }
];

const childrenBooks = [
    {
        title: "101 Sight Words And Sentence",
        author: "Author Unknown",
        originalPrice: 199,
        discountedPrice: 69,
        image: "https://m.media-amazon.com/images/I/81m3mFHn1fL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "365 Facts on Space",
        author: "Author Unknown",
        originalPrice: 300,
        discountedPrice: 105,
        image: "https://m.media-amazon.com/images/I/814Dxuz74ZL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "365 Panchatantra Stories",
        author: "Author Unknown",
        originalPrice: 595,
        discountedPrice: 208,
        image: "https://www.crossword.in/cdn/shop/files/8101J25-t0L.jpg?v=1682506428"
    },
    {
        title: "365 Tales of Hanuman",
        author: "Author Unknown",
        originalPrice: 695,
        discountedPrice: 244,
        image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/book/e/d/u/story-book-365-tales-of-hanuman-indian-mythology-for-children-original-imagkpz5efg9yfap.jpeg?q=90&crop=false"
    },
    {
        title: "9 From the Nine Worlds",
        author: "Author Unknown",
        originalPrice: 299,
        discountedPrice: 105,
        image: "https://m.media-amazon.com/images/I/91WA8finZ0L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "A Brontosaurus Chorus",
        author: "Author Unknown",
        originalPrice: 350,
        discountedPrice: 122,
        image: "https://m.media-amazon.com/images/I/313MHLAsMnL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "A Girl to Remember",
        author: "Author Unknown",
        originalPrice: 195,
        discountedPrice: 68,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGP1TJLnMZ95COmacQbM-LkSdNqLc680eMQ&s"
    },
    {
        title: "A History of South India for Children",
        author: "Author Unknown",
        originalPrice: 499,
        discountedPrice: 175,
        image: "https://m.media-amazon.com/images/I/817bTXbugkL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "A Night with a Black Spider",
        author: "Author Unknown",
        originalPrice: 150,
        discountedPrice: 52,
        image: "https://m.media-amazon.com/images/I/51FpNpv5WQL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "A Reaper at the Gates",
        author: "Author Unknown",
        originalPrice: 499,
        discountedPrice: 175,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcHoR1tCFIolDIW6-ZkNKXclTYK0T7sKvqg&s"
    },
    {
        title: "A Torch Against The Night",
        author: "Author Unknown",
        originalPrice: 499,
        discountedPrice: 175,
        image: "https://m.media-amazon.com/images/I/71RIMxfAjXL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "ABC (Lovely Board Book)",
        author: "Author Unknown",
        originalPrice: 80,
        discountedPrice: 28,
        image: "https://m.media-amazon.com/images/I/61YEqz6hzlL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Adventures of Tintin: Tintin and Picaros",
        author: "Hergé",
        originalPrice: 550,
        discountedPrice: 193,
        image: "https://m.media-amazon.com/images/I/81o035RfxPL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Alice in Wonderland",
        author: "Lewis Carroll",
        originalPrice: 150,
        discountedPrice: 52,
        image: "https://m.media-amazon.com/images/I/71w2WxkPg8L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Alice Through the Looking Glass",
        author: "Lewis Carroll",
        originalPrice: 150,
        discountedPrice: 52,
        image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781665925822/through-the-looking-glass-9781665925822_hr.jpg"
    },
    {
        title: "Alices Adventures in Wonderland",
        author: "Lewis Carroll",
        originalPrice: 250,
        discountedPrice: 88,
        image: "https://m.media-amazon.com/images/I/91uMrXq+4RL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "An Ember In The Ashes",
        author: "Sabaa Tahir",
        originalPrice: 499,
        discountedPrice: 175,
        image: "https://m.media-amazon.com/images/I/81SIK7ms3RL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Animal ABC",
        author: "Author Unknown",
        originalPrice: 250,
        discountedPrice: 88,
        image: "https://cdn.kobo.com/book-images/26d435d9-e8d3-44b8-8ca4-2f7d66bfba59/1200/1200/False/abc-animal-alphabet-picture-book.jpg"
    }
];

// Route to get top-rated books
router.get('/category/topRated', (req, res) => {
    res.json({ topRatedBooks });
});

// Route to get children books
router.get('/category/children', (req, res) => {
    res.json({ childrenBooks });
});

// Route to add a new top-rated book
router.post('/category/topRated', (req, res) => {
    const newBook = req.body;
    topRatedBooks.push(newBook);
    res.status(201).json(newBook);
});

// Route to add a new children book
router.post('/category/children', (req, res) => {
    const newBook = req.body;
    childrenBooks.push(newBook);
    res.status(201).json(newBook);
});

module.exports = router;