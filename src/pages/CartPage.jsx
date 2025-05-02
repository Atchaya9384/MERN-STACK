import React from 'react';
import { useNavigate } from 'react-router-dom';
import { color, motion } from 'framer-motion';
import Navbar from './Navbar';
const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
   
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    
    navigate('/checkout');
  };

  if (cart.length === 0) {
    
    return <div style={styles.emptyCart}><Navbar/><h1>Your Cart</h1>Your cart is empty.</div>;
  }

  return (
    <div>
      <Navbar/>
    <div style={styles.page}>
    
      <h1 style={styles.title}>Your Cart</h1>
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
              <button onClick={() => handleRemoveFromCart(index)} style={styles.removeButton}>Remove</button>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.button
        onClick={handleCheckout}
        style={styles.checkoutButton}
        whileHover={{ scale: 1.05, backgroundColor: '#0056b3' }}
        transition={{ duration: 0.3 }}
      >
        Proceed to Checkout
      </motion.button>
    </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    maxWidth: '900px',
    margin: '20px auto',
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
  removeButton: {
    padding: '8px 15px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#e60000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  checkoutButton: {
    padding: '12px 25px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#666',
  },
};

export default CartPage;