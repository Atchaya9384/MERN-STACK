import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch('https://run.mocky.io/v3/08370cae-eb50-4bba-9260-f9b26fa0116c')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Featured Books:', data);
        setFeaturedBooks(data.featuredBooks || []);
      })
      .catch(error => console.error('Error fetching featured books:', error));
  }, []);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, []);

  const handleRentNow = (book) => {
    navigate('/rent', { state: { book } });
  };

  const handleWishlist = (book) => {
    const updatedWishlist = [...wishlist, book];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    navigate('/wishlist');
  };

  const handleAboutUsClick = () => {
    navigate('/about');
  };

  const BookCard = ({ title, author, rating, originalPrice, discountedPrice, image  }) => (
    <motion.div
      className="book-item"
      whileHover={{ scale: 1.05, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3 }}
    >
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{author}</p>
      <p className="rating">Rating: {rating ? `${rating} ★` : 'N/A'}</p>
      <p className="price">₹{discountedPrice}</p>
      <div className="book-actions">
        <button onClick={() => handleRentNow({ title, author, image,originalPrice, discountedPrice })}>Rent Now!</button>
        <button onClick={() => handleWishlist({ title, author, image,originalPrice, discountedPrice })}>Add to Wishlist</button>
      </div>
    </motion.div>
  );

  return (
    <div className="home">
      <Navbar/>
      <style>{`
        .home {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
        }

        .hero-section {
          background: linear-gradient(to right, #1a2a6c, #b21f1f); /* Gradient Background */
          color: white;
          text-align: center;
          padding: 80px 20px;
          background-size: cover;
          background-position: center;
        }

        .hero-section h1 {
          margin: 0;
          font-size: 4em;
          font-weight: bold;
        }

        .hero-section p {
          font-size: 1.8em;
          margin-top: 20px;
          line-height: 1.4;
        }

        .intro-section {
          padding: 40px 20px;
          background-color: #f0f0f0;
          text-align: center;
        }

        .intro-section h2 {
          font-size: 2.8em;
          margin-bottom: 20px;
          color: #1a2a6c;
        }

        .intro-section p {
          font-size: 1.3em;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          color: #666;
        }

        .intro-section button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 1.2em;
          color: white;
          background-color: #3498db;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .intro-section button:hover {
          background-color: #2980b9;
        }

        .featured-books {
          padding: 40px 20px;
          text-align: center;
        }

        .featured-books h2 {
          font-size: 2.8em;
          margin-bottom: 30px;
          color: #1a2a6c;
        }

        .book-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .book-item {
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          max-width: 220px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .book-item img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .book-item h3 {
          margin: 15px 0 5px;
          font-size: 1.3em;
          color: #1a2a6c;
        }

        .book-item p {
          margin: 5px 0;
          font-size: 1.1em;
          color: #666;
        }

        .rating {
          font-size: 1.1em;
          color: #f39c12; 
        }

        .price {
          font-size: 1.2em;
          font-weight: bold;
          color: #e74c3c;
        }

        .book-item:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .book-actions button {
          margin: 5px;
          padding: 10px 20px;
          font-size: 1em;
          color: white;
          background-color: #3498db;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .book-actions button:hover {
          background-color: #2980b9;
        }

        .testimonials {
          background-color: #e9ecef;
          padding: 40px 20px;
          text-align: center;
        }

        .testimonials h2 {
          font-size: 2.8em;
          margin-bottom: 30px;
          color: #1a2a6c;
        }

        .testimonial {
          margin-bottom: 30px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .testimonial p {
          font-size: 1.2em;
          line-height: 1.6;
          color: #333;
        }

        .cta-section {
          background-color: #3498db; 
          color: white;
          text-align: center;
          padding: 40px 20px;
          border-radius: 0 0 20px 20px;
          position: relative;
        }

        .cta-section h2 {
          font-size: 2.8em;
          margin: 0;
        }

        .cta-section p {
          font-size: 1.3em;
          margin: 10px 0;
        }

        .cta-section a {
          color: white;
          background-color: #e74c3c; 
          padding: 15px 25px;
          text-decoration: none;
          border-radius: 8px;
          font-size: 1.2em;
          transition: background-color 0.3s;
        }

        .cta-section a:hover {
          background-color: #c0392b; 
        }

        footer {
          background-color: #1a2a6c;
          color: white;
          text-align: center;
          padding: 20px 10px;
          position: relative;
        }

        footer p {
          margin: 0;
          font-size: 1.1em;
        }

        footer a {
          color: #f39c12; 
          text-decoration: none;
          font-weight: bold;
        }

        footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <header className="hero-section">
        <h1>Welcome to Bookstore Library</h1>
        <p>Your gateway to the best books in the world</p>
      </header>

      <section className="intro-section">
        <h2>About Us</h2>
        <p>
          At Bookstore Library, we are passionate about bringing you the best selection of books from around the world. 
          Whether you are looking for the latest bestsellers, timeless classics, or unique finds, our collection is curated 
          to meet all your reading needs. Our mission is to provide a welcoming space for book lovers and make your reading 
          experience exceptional.
        </p>
        <button onClick={handleAboutUsClick}>Learn More About Us</button>
      </section>

      <section className="featured-books">
        <h2>Featured Books</h2>
        <div className="book-grid">
          {featuredBooks.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              author={book.author}
              image={book.image}
              originalPrice={book.originalPrice}
              discountedPrice={book.discountedPrice}
              rating={book.rating}
            />
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Readers Say</h2>
        <div className="testimonial">
          <p>"A fantastic selection of books and a wonderful shopping experience! Highly recommended."</p>
          <p>- Jane Doe</p>
        </div>
        <div className="testimonial">
          <p>"The staff is knowledgeable and always ready to help. I love the cozy atmosphere of the store."</p>
          <p>- John Smith</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Explore More</h2>
        <p>Discover our full range of books and special offers. Join our community of book lovers today!</p>
        <br />
        <a href="/child">Explore Now</a>
      </section>

      <footer>
        <p>&copy; 2024 Bookstore Library. All rights reserved. <a href="/contact">Contact Us</a></p>
      </footer>
    </div>
  );
}

export default Home;
