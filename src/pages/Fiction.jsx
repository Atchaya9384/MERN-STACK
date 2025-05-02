import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Fiction = () => {
  const [books, setBooks] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch fiction books
    fetch('http://localhost:5021/api/fiction/category/fiction')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Fiction Books:', data);
        setBooks(data.fictionBooks || []);
      })
      .catch(error => {
        console.error('Error fetching fiction books:', error);
        setBooks([]);
      });

    // Fetch top-rated books
    fetch('http://localhost:5021/api/fiction/category/topRatedFiction')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Top Rated Books:', data);
        setTopRatedBooks(data.topRatedFictionBooks || []);
      })
      .catch(error => {
        console.error('Error fetching top-rated books:', error);
        setTopRatedBooks([]);
      });
  }, []);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, []);

  const addToWishlist = (book) => {
    const updatedWishlist = [...wishlist, book];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleRentNow = (book) => {
    navigate('/rent', { state: { book } });
  };

  const handleWishlist = (book) => {
    addToWishlist(book);
    navigate('/wishlist');
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    page: {
      display: 'flex',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f8f9fa',
    },
    sidebar: {
      width: '250px',
      marginRight: '30px',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    mainContent: {
      flexGrow: 1,
    },
    sectionTitle: {
      marginBottom: '20px',
      color: '#343a40',
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: '600',
    },
    bookList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    topRatedList: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      maxHeight: '700px',
    },
    bookCard: {
      border: '1px solid #e0e0e0',
      padding: '15px',
      width: '180px',
      margin: '10px',
      textAlign: 'center',
      borderRadius: '10px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    bookImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '15px',
    },
    price: {
      marginTop: '10px',
    },
    originalPrice: {
      textDecoration: 'line-through',
      color: '#6c757d',
      marginRight: '5px',
    },
    discountedPrice: {
      color: '#dc3545',
      fontWeight: 'bold',
    },
    actions: {
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '10px',
    },
    button: {
      padding: '8px 12px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    topRatedTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#007bff',
    },
    searchBar: {
      marginBottom: '20px',
      textAlign: 'center',
    },
    searchInput: {
      width: '60%',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ced4da',
      outline: 'none',
    },
    bookTitleAuthor: {
      fontSize: '16px',
      margin: '10px 0',
    },
    bookAuthor: {
      fontSize: '14px',
      color: '#6c757d',
    },
  };

  const BookCard = ({ title, author, rating, originalPrice, discountedPrice, image }) => (
    <motion.div
      style={styles.bookCard}
      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
      transition={{ duration: 0.3 }}
    >
      <img src={image} alt={title} style={styles.bookImage} />
      <div style={styles.bookTitleAuthor}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {author && <p style={styles.bookAuthor}>by {author}</p>}
      </div>
      {rating && <p style={{ fontSize: '14px', color: '#495057' }}>Rated {rating} out of 5</p>}
      <div style={styles.price}>
        <span style={styles.originalPrice}>₹{originalPrice}</span>
        <span style={styles.discountedPrice}>₹{discountedPrice}</span>
      </div>
      <div style={styles.actions}>
        <button
          style={styles.button}
          onClick={() => handleRentNow({ title, author, originalPrice, discountedPrice, image })}
        >
          Rent Now!
        </button>
        <button
          style={styles.button}
          onClick={() => handleWishlist({ title, author, originalPrice, discountedPrice, image })}
        >
          Add to Wishlist
        </button>
      </div>
    </motion.div>
  );

  return (
    <div><Navbar/>
    <div style={styles.page}>
      <div style={styles.sidebar}>
        <h2 style={styles.topRatedTitle}>Top Rated Fiction Books</h2>
        {topRatedBooks.length ? (
          <div style={styles.topRatedList}>
            {topRatedBooks.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        ) : (
          <p>No top-rated books available.</p>
        )}
      </div>
      <div style={styles.mainContent}>
        <h2 style={styles.sectionTitle}>Fiction Books</h2>
        <div style={styles.searchBar}>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search by book title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredBooks.length ? (
          <div style={styles.bookList}>
            {filteredBooks.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Fiction;
