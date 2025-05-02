import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; 
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (index) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleRent = (book) => {
    navigate('/rent', { state: { book } });
  };

  const styles = {
    page: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
    },
    sectionTitle: {
      marginBottom: '30px',
      color: '#333',
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: '700',
    },
    bookList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    bookCard: {
      border: '1px solid #ddd',
      padding: '15px',
      width: '280px',
      margin: '15px',
      textAlign: 'center',
      borderRadius: '12px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    bookImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '15px',
    },
    price: {
      marginTop: '15px',
    },
    originalPrice: {
      textDecoration: 'line-through',
      color: '#888',
      marginRight: '5px',
    },
    discountedPrice: {
      color: '#e60000',
      fontWeight: '600',
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: '20px',
      color: '#666',
    },
    actions: {
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    removeButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
    },
    rentButton: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    buttonHover: {
      transform: 'scale(1.05)',
    },
  };

  const BookCard = ({ title, originalPrice, discountedPrice, image, index }) => (
    <div
      style={styles.bookCard}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
    >
      <img src={image} alt={title} style={styles.bookImage} />
      <h3 style={{ fontSize: '18px', margin: '10px 0', fontWeight: '500' }}>{title}</h3>
      <div style={styles.price}>
        <span style={styles.originalPrice}>₹{originalPrice}</span>
        <span style={styles.discountedPrice}>₹{discountedPrice}</span>
      </div>
      <div style={styles.actions}>
        <button
          style={{ ...styles.button, ...styles.removeButton }}
          onClick={() => removeFromWishlist(index)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
        >
          Remove
        </button>
        <button
          style={{ ...styles.button, ...styles.rentButton }}
          onClick={() => handleRent({ title, originalPrice, discountedPrice, image })}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Rent
        </button>
      </div>
    </div>
  );

  return (
    <div> <Navbar/>
    <div style={styles.page}>
    
      <h1 style={styles.sectionTitle}>Your Wishlist</h1>
      <div style={styles.bookList}>
        {wishlist.length > 0 ? (
          wishlist.map((book, index) => (
            <BookCard key={index} {...book} index={index} />
          ))
        ) : (
          <p style={styles.emptyMessage}>Your wishlist is empty.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default WishlistPage;