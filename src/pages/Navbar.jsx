import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaShoppingCart, FaCheckCircle, FaPhoneAlt, FaBars, FaTimes, FaHome, FaInfoCircle, FaBook } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [rightBarVisible, setRightBarVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  const toggleRightBar = () => {
    setRightBarVisible(!rightBarVisible);
  };

  return (
    <nav>
      <style>
        {`
          .navbar {
            background: linear-gradient(90deg, #0056b3, #007bff);
            padding: 15px 30px;
            color: #fff;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            font-family: 'Montserrat', sans-serif;
            display: flex;
            align-items: center;
            position: relative;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            margin: 0 auto;
          }
          .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
          .brand {
            font-size: 28px;
            color: #fff;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            transition: color 0.3s;
            margin-right: auto;
          }
          .navLinks {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            flex-wrap: wrap; /* Allows items to wrap to a new line */
          }
          .navItem {
            margin-left: 20px;
            position: relative;
          }
          .navLink {
            color: #fff;
            text-decoration: none;
            font-size: 18px;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.4s, color 0.4s, transform 0.3s;
            text-transform: uppercase;
            font-weight: 500;
            display: flex;
            align-items: center;
            box-sizing: border-box;
          }
          .icon {
            margin-right: 8px;
            transition: color 0.3s;
          }
          .dropdownMenu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #004a99;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            list-style-type: none;
            padding: 15px 0;
            margin: 0;
            min-width: 200px;
            border-radius: 8px;
            z-index: 1000;
            transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
          }
          .dropdownItem {
            padding: 10px 25px;
          }
          .dropdownLink {
            color: #fff;
            text-decoration: none;
            font-size: 16px;
            display: block;
            transition: background-color 0.3s, color 0.3s;
          }
          .dropdownLink:hover {
            background-color: #003a75;
            color: #f0f0f0;
          }
          .hamburger {
            display: none;
            cursor: pointer;
          }
          .rightBar {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: 250px;
            background-color: #007bff;
            color: #fff;
            box-shadow: -4px 0 10px rgba(0, 0, 0, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 1000;
            padding: 20px;
            overflow-y: auto;
            max-width: 100%; 
          }
          .rightBar.visible {
            transform: translateX(0);
          }
          .rightBarClose {
            font-size: 24px;
            cursor: pointer;
            margin-bottom: 20px;
          }
          .rightBarLinks {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          .rightBarItem {
            margin-bottom: 15px;
          }
          .rightBarLink {
            color: #fff;
            text-decoration: none;
            font-size: 18px;
            display: flex;
            align-items: center;
          }
          .rightBarLink .icon {
            margin-right: 8px;
          }
          @media (max-width: 768px) {
            .navLinks {
              display: none;
            }
            .hamburger {
              display: block;
            }
          }
        `}
      </style>
      <div className="navbar">
        <div className="container">
          <span className="brand">Book Rental</span>
          <div className="hamburger" onClick={toggleRightBar}>
            <FaBars size={24} color="#fff" />
          </div>
          <ul className="navLinks">
            <li className="navItem">
              <Link to="/home" className="navLink">Home</Link>
            </li>
            <li className="navItem">
              <Link to="/about" className="navLink">About</Link>
            </li>
            <li
              className="navItem"
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <div className="navLink">
                Category
                <ul
                  className="dropdownMenu"
                  style={{
                    opacity: dropdownVisible ? 1 : 0,
                    visibility: dropdownVisible ? 'visible' : 'hidden',
                    transform: dropdownVisible ? 'translateY(0)' : 'translateY(-10px)',
                  }}
                >
                  <li className="dropdownItem">
                    <Link to="/child" className="dropdownLink">Children Books</Link>
                  </li>
                  <li className="dropdownItem">
                    <Link to="/fiction" className="dropdownLink">Fiction</Link>
                  </li>
                  <li className="dropdownItem">
                    <Link to="/nonfic" className="dropdownLink">Non-Fiction</Link>
                  </li>
                  <li className="dropdownItem">
                    <Link to="/ece" className="dropdownLink">Electronics</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="navItem">
              <Link to="/wishlist" className="navLink">
                <FaRegHeart size={20} className="icon" /> Wishlist
              </Link>
            </li>
            <li className="navItem">
              <Link to="/cart" className="navLink">
                <FaShoppingCart size={20} className="icon" /> Cart
              </Link>
            </li>
            <li className="navItem">
              <Link to="/checkout" className="navLink">
                <FaCheckCircle size={20} className="icon" /> Checkout
              </Link>
            </li>
            <li className="navItem">
              <Link to="/contact" className="navLink">
                <FaPhoneAlt size={20} className="icon" /> Contact
              </Link>
            </li>
          </ul>
          <div className="hamburger" onClick={toggleRightBar}>
            <FaBars size={24} color="#fff" />
          </div>
        </div>
        <div className={`rightBar ${rightBarVisible ? 'visible' : ''}`}>
          <div className="rightBarClose" onClick={toggleRightBar}>
            <FaTimes />
          </div>
          <ul className="rightBarLinks">
            <li className="rightBarItem">
              <Link to="/home" className="rightBarLink">
                <FaHome size={20} className="icon" /> Home
              </Link>
            </li>
            <li className="rightBarItem">
              <Link to="/about" className="rightBarLink">
                <FaInfoCircle size={20} className="icon" /> About
              </Link>
            </li>
            <li className="rightBarItem">
              <Link to="/child" className="rightBarLink">
                <FaBook size={20} className="icon" /> Children Books
              </Link>
            </li>
            <li className="rightBarItem">
              <Link to="/fiction" className="rightBarLink">
                <FaBook size={20} className="icon" /> Fiction
              </Link>
            </li>
            <li className="rightBarItem">
              <Link to="/nonfic" className="rightBarLink">
                <FaBook size={20} className="icon" /> Non-Fiction
              </Link>
            </li>
            <li className="rightBarItem">
              <Link to="/wishlist" className="rightBarLink">
                <FaRegHeart size={20} className="icon" /> Wishlist
              </Link>
            </li>
            <li className="rightBarItem">
              <Link to="/cart" className="rightBarLink">
                <FaShoppingCart size={20} className="icon" /> Cart
              </Link>
            </li>
            <li className="rightBarItem">
              <Link to="/checkout" className="rightBarLink">
                <FaCheckCircle size={20} className="icon" /> Checkout
              </Link>
            </li>
            <li className="rightBarItem">
              <Link to="/contact" className="rightBarLink">
                <FaPhoneAlt size={20} className="icon" /> Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
