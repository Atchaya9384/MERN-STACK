import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const headerStyle = {
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const navStyle = {
        listStyle: 'none',
        display: 'flex',
        gap: '1rem',
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
    };

    return (
        <header style={headerStyle}>
            <h1>Book Rental</h1>
            <nav>
                <ul style={navStyle}>
                    <li><Link to="/" style={linkStyle}>Home</Link></li>
                    <li><Link to="/books" style={linkStyle}>Browse Books</Link></li>
                    <li><Link to="/dashboard" style={linkStyle}>Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
