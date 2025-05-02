import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState([]);
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('creditCard');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [rentalDate, setRentalDate] = React.useState(new Date().toLocaleDateString('en-CA'));
  const [daysToRent, setDaysToRent] = React.useState(1);

  React.useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const generateTrackingId = () => {
    return 'TRK' + Math.floor(Math.random() * 1000000000); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const trackingId = generateTrackingId();
  
    const orderData = {
      name,
      address,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      rentalDate,
      daysToRent,
      totalAmount: cart.reduce((total, item) => total + item.discountedPrice * item.rentalDays, 0),
      trackingId,
      cart,
    };
  
    try {
      const response = await fetch('http://localhost:5021/api/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful order submission
        alert('Order successfully placed! Your tracking ID is: ' + trackingId);
        localStorage.removeItem('cart');
        setCart([]);
        navigate('/confirmation');
      } else {
        // Handle errors in order submission
        alert('Error processing order: ' + data.message);
      }
    } catch (error) {
      // Handle network or other errors
      alert('Network error: ' + error.message);
    }
  };
  

  if (cart.length === 0) {
    return <div style={styles.emptyCart}><Navbar/><br/><h3>Your cart is empty. Please add items to your cart before proceeding.</h3></div>;
  }

  const totalAmount = cart.reduce((total, item) => total + item.discountedPrice * item.rentalDays, 0);

  return (
    <div>
      <Navbar/>
    <div style={styles.page}>
      <h1 style={styles.title}>Checkout</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.sectionTitle}>Cart Items</h2>
        <div style={styles.cartItems}>
          {cart.map((item, index) => (
            <motion.div
              key={index}
              style={styles.cartItem}
              whileHover={{ scale: 1.02, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <img src={item.image} alt={item.title} style={styles.bookImage} />
              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p>Price: ₹{item.discountedPrice} x {item.rentalDays} days</p>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 style={styles.sectionTitle}>Shipping Information</h2>
        <label htmlFor="name" style={styles.label}>Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <label htmlFor="address" style={styles.label}>Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={styles.textarea}
        />

        <h2 style={styles.sectionTitle}>Payment Method</h2>
        <label htmlFor="paymentMethod" style={styles.label}>Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={styles.select}
        >
          <option value="creditCard">Credit Card</option>
          <option value="gpay">Gpay</option>
        </select>

        {paymentMethod === 'creditCard' && (
          <>
            <label htmlFor="cardNumber" style={styles.label}>Card Number:</label>
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              style={styles.input}
            />
            <label htmlFor="expiryDate" style={styles.label}>Expiry Date:</label>
            <input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              style={styles.input}
            />
            <label htmlFor="cvv" style={styles.label}>CVV:</label>
            <input
              id="cvv"
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              style={styles.input}
            />
          </>
        )}

        {paymentMethod === 'gpay' && (
          <div style={styles.gpayInfo}>
            <p>For Gpay, you will be redirected to the payment gateway after you confirm your order.</p>
          </div>
        )}

        <div style={styles.total}>
          <h2>Total Amount: ₹{totalAmount}</h2>
        </div>
        <motion.button
          type="submit"
          style={styles.submitButton}
          whileHover={{ scale: 1.05, backgroundColor: '#0056b3' }}
          transition={{ duration: 0.3 }}
        >
          Confirm Order
        </motion.button>
      </form>
    </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    maxWidth: '900px',
    margin: '40px auto',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionTitle: {
    fontSize: '22px',
    marginBottom: '15px',
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '5px',
    fontWeight: '500',
  },
  cartItems: {
    marginBottom: '20px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '15px 0',
    transition: '0.3s',
  },
  bookImage: {
    width: '120px',
    height: 'auto',
    borderRadius: '8px',
    marginRight: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#333',
    fontWeight: '500',
  },
  label: {
    marginBottom: '5px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  textarea: {
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    minHeight: '120px',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  select: {
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
  },
  total: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: '600',
  },
  submitButton: {
    padding: '12px 25px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    alignSelf: 'center',
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#666',
  },
  gpayInfo: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '15px',
    textAlign: 'center',
  },
};

export default CheckoutPage;