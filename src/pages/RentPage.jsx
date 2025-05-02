import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const RentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  const [days, setDays] = useState(1);

  const handleConfirmRental = () => {
    if (!book) return;

    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...book, rentalDays: days });
    localStorage.setItem('cart', JSON.stringify(cart));

    navigate('/cart');
  };

  if (!book) {
    return <div style={styles.error}>No book selected for rent</div>;
  }

  return (
    <div>
      <Navbar/>
   
    <div style={styles.page}>
      <h1 style={styles.title}>
        Rent "{book.title}" by {book.author}
      </h1>
      <img src={book.image} alt={book.title} style={styles.bookImage} />
      <p style={styles.price}>Price: ₹{book.discountedPrice} per day</p>
      <div style={styles.inputContainer}>
        <label htmlFor="days" style={styles.label}>Number of Days:</label>
        <input
          id="days"
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          style={styles.input}
        />
      </div>
      <button onClick={handleConfirmRental} style={styles.button}>Confirm Rental</button>
    </div></div>
  );
};

const styles = {
  page: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f6f8',
    maxWidth: '700px',
    margin: '40px auto',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#333',
    fontWeight: '700',
  },
  bookImage: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  price: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#e60000',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '12px 24px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    padding: '20px',
    fontSize: '20px',
    color: '#e60000',
    textAlign: 'center',
    backgroundColor: '#fbe9e7',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default RentPage;
