import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isRightBarOpen, setIsRightBarOpen] = useState(false);

  const toggleRightBar = () => {
    setIsRightBarOpen(!isRightBarOpen);
  };

  return (
    <div>
      <style>{`
        :root {
          --mainColor: #007bff; 
          --whiteColor: #ffffff; 
          --accentColor: #ffc107;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--mainColor);
          padding: 10px 20px;
        }

        .navbar-logo a {
          color: var(--whiteColor);
          font-size: 24px;
          font-weight: bold;
          text-decoration: none;
        }

        .navbar-links {
          list-style: none;
          display: flex;
          gap: 15px;
        }

        .navbar-links li a {
          color: var(--whiteColor);
          text-decoration: none;
          font-size: 18px;
        }

        .navbar-links li a:hover {
          color: var(--accentColor);
        }

        .right-bar {
          position: fixed;
          top: 0;
          right: 0;
          width: 250px;
          height: 100%;
          background-color: var(--mainColor);
          color: var(--whiteColor);
          padding: 20px;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .right-bar ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .right-bar li {
          margin: 10px 0;
        }

        .right-bar a {
          color: var(--whiteColor);
          text-decoration: none;
        }

        .right-bar a:hover {
          color: var(--accentColor);
        }

        .right-bar-close {
          background: none;
          border: none;
          color: var(--whiteColor);
          font-size: 24px;
          cursor: pointer;
          align-self: flex-end;
          margin-bottom: 20px;
        }

        .right-bar-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--whiteColor);
          font-size: 24px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }

          .right-bar-toggle {
            display: block;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Book Rental</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/manage-books">Manage Books</Link></li>
          <li><Link to="/admin/track-rentals">Track Rentals</Link></li>
          <li><Link to="/admin/user-management">User Management</Link></li>
          <li><Link to="/admin/reviews">Reviews</Link></li>
        </ul>
        <button className="right-bar-toggle" onClick={toggleRightBar}>
          ☰
        </button>
      </nav>
      {isRightBarOpen && (
        <div className="right-bar">
          <button className="right-bar-close" onClick={toggleRightBar}>✕</button>
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/manage-books">Manage Books</Link></li>
            <li><Link to="/admin/track-rentals">Track Rentals</Link></li>
            <li><Link to="/admin/user-management">User Management</Link></li>
            <li><Link to="/admin/reviews">Reviews</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
