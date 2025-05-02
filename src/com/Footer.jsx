import React from 'react';

function Footer() {
    const footerStyle = {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem',
        marginTop: '2rem',
    };

    return (
        <footer style={footerStyle}>
            <p>© 2024 Book Rental. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
