import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from './Navbar';
import axios from 'axios';

const ContactPage = () => {
  const [contactDetails, setContactDetails] = useState({
    address: '',
    phone: '',
    email: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/01cb2890-9ef6-4fbf-8b30-655cc55fa5d7') 
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Contact Details:', data);
        setContactDetails({
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || ''
        });
      })
      .catch(error => console.error('Error fetching contact details:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5021/api/contact/contact', formData)
      .then(response => {
        console.log('Response:', response.data);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <div>
      <Navbar/>
    
    <div style={styles.page}>
      <h1 style={styles.title}>Contact Us</h1>
      <div style={styles.container}>
        <div style={styles.infoSection}>
          <h2 style={styles.infoTitle}>Get in Touch</h2>
          <div style={styles.infoItem}>
            <FaMapMarkerAlt size={24} style={styles.icon} />
            <p style={styles.infoText}>{contactDetails.address}</p>
          </div>
          <div style={styles.infoItem}>
            <FaPhone size={24} style={styles.icon} />
            <p style={styles.infoText}>{contactDetails.phone}</p>
          </div>
          <div style={styles.infoItem}>
            <FaEnvelope size={24} style={styles.icon} />
            <p style={styles.infoText}>{contactDetails.email}</p>
          </div>
        </div>
        <div style={styles.formSection}>
          <h2 style={styles.formTitle}>Send Us a Message</h2>
          {submitted && <p style={styles.successMessage}>Your message has been sent successfully!</p>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>
            <label style={styles.label}>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>
            <label style={styles.label}>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={styles.textarea}
                required
              ></textarea>
            </label>
            <button type="submit" style={styles.submitButton}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '40px',
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '40px',
  },
  infoSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  infoTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: '500',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  icon: {
    marginRight: '15px',
    color: '#007bff',
  },
  infoText: {
    fontSize: '16px',
    color: '#555',
  },
  formSection: {
    flex: 2,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: '500',
  },
  successMessage: {
    color: '#28a745',
    marginBottom: '20px',
    fontSize: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '15px',
    fontSize: '16px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginTop: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginTop: '5px',
    height: '150px',
  },
  submitButton: {
    padding: '12px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
};

export default ContactPage;