
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
function About() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <div className="about-us">
      <Navbar/>
      <style>{`
        .about-us {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
        }

        .hero-section {
          background: linear-gradient(to right, #1a2a6c, #b21f1f);
          color: white;
          text-align: center;
          padding: 80px 20px;
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

        .content-section {
          padding: 40px 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .content-section h2 {
          font-size: 2.8em;
          margin-bottom: 20px;
          color: #1a2a6c;
        }

        .content-section p {
          font-size: 1.3em;
          line-height: 1.6;
          color: #666;
        }

        .back-button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 1.2em;
          color: white;
          background-color: #3498db;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
          text-decoration: none;
        }

        .back-button:hover {
          background-color: #2980b9;
        }

        footer {
          background-color: #1a2a6c;
          color: white;
          text-align: center;
          padding: 20px 10px;
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
        <h1>About Us</h1>
        <p>Get to know us better!</p>
      </header>

      <section className="content-section">
        <h2>Our Mission</h2>
        <p>
          At Bookstore Library, we are dedicated to fostering a love for reading by providing a diverse and extensive collection of books. Our mission is to offer readers an enriching experience, whether they are seeking the latest bestsellers, timeless classics, or hidden gems. We aim to be a haven for book lovers of all genres and backgrounds, offering a welcoming and supportive environment where everyone can find their next great read.
        </p>

        <h2>Our Story</h2>
        <p>
          Founded in 2024, Bookstore Library began with a simple vision: to create a space where book enthusiasts could come together and explore the world of literature. Our founders, a group of passionate readers and industry experts, wanted to share their love of books with the community and provide a curated selection of titles that cater to all tastes and interests. Over the years, we have grown into a vibrant hub for book lovers, with a commitment to exceptional service and a continuously expanding collection.
        </p>

        <a className="back-button" onClick={handleHomeClick}>Back to Home</a>
      </section>

      <footer>
        <p>&copy; 2024 Bookstore Library. All rights reserved. <a href="/contact">Contact Us</a></p>
      </footer>
    </div>
  );
}

export default About;

