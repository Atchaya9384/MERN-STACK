import React from 'react';
import UserDashboard from '../com/UserDashboard';

function UserDashboardPage({ user, rentals }) {
    const pageStyle = {
        padding: '2rem',
    };

    return (
        <div style={pageStyle}>
            <UserDashboard user={user} rentals={rentals} />
        </div>
    );
}

export default UserDashboardPage;
