import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [returnDate, setReturnDate] = React.useState('');
  const [trackingId, setTrackingId] = React.useState('');
  const [trackingStatus, setTrackingStatus] = React.useState('Processing');

  React.useEffect(() => {
    const rentalDate = localStorage.getItem('rentalDate');
    const daysToRent = parseInt(localStorage.getItem('daysToRent'), 10);
    const savedTrackingId = localStorage.getItem('trackingId');

    if (rentalDate && daysToRent) {
      const rentalDateObj = new Date(rentalDate);
      rentalDateObj.setDate(rentalDateObj.getDate() + daysToRent);
      setReturnDate(rentalDateObj.toLocaleDateString('en-CA'));
    }

    if (savedTrackingId) {
      setTrackingId(savedTrackingId);
    }
  }, []);

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Thank You for Your Order!</h1>
      <p style={styles.message}>
        Your order has been successfully placed. We will process it and get back to you shortly.
      </p>
      <p style={styles.message}>
        Your rental return date is: <strong>{returnDate}</strong>
      </p>
      <p style={styles.trackingInfo}>
        Tracking ID: <strong>{trackingId}</strong>
      </p>
      <p style={styles.trackingInfo}>
        Current Status: <strong>{trackingStatus}</strong>
      </p>
      <motion.button
        onClick={handleBackToHome}
        style={styles.button}
        whileHover={{ scale: 1.05, backgroundColor: '#0056b3' }}
        transition={{ duration: 0.3 }}
      >
        Back to Home
      </motion.button>
    </div>
  );
};

const styles = {
  page: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#eaf2f8',
    maxWidth: '700px',
    margin: '50px auto',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: '600',
  },
  message: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#555',
    lineHeight: '1.6',
  },
  trackingInfo: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#333',
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default ConfirmationPage;