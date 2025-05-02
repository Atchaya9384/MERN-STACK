import React from 'react';

function UserDashboard({ user, rentals }) {
    const dashboardStyle = {
        padding: '2rem',
    };

    const listStyle = {
        listStyle: 'none',
        padding: 0,
    };

    const listItemStyle = {
        padding: '0.5rem 0',
        borderBottom: '1px solid #ddd',
    };

    return (
        <div style={dashboardStyle}>
            <h2>Welcome, {user.name}</h2>
            <h3>Your Rentals</h3>
            <ul style={listStyle}>
                {rentals.map(rental => (
                    <li key={rental.id} style={listItemStyle}>
                        {rental.bookTitle} - Due: {rental.dueDate}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserDashboard;
