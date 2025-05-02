import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAdminChoose = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'user') {
      navigate('/login'); 
    } else if (role === 'admin') {
      navigate('/admi');
    }
  };

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/4b7a971f-89e1-4c7e-94ea-35110b6e64f9'); 
        const data = await response.json();
        setBackgroundImage(data.url); 
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchBackgroundImage();

   
    document.body.style.background = `url('${backgroundImage}') no-repeat center center/cover`;
    document.body.style.overflow = 'hidden'; 

    return () => {
      document.body.style.background = ''; 
      document.body.style.overflow = ''; 
    };
  }, [backgroundImage]);

  const styles = {
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
      fontFamily: '"Arial", sans-serif',
    },
    box: {
      textAlign: 'center',
      color: '#fff',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '90%',
      maxWidth: '600px',
    },
    welcomeHeading: {
      fontSize: '3rem',
      marginBottom: '2rem',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
    },
    roleButton: {
      padding: '1rem 2.5rem',
      fontSize: '1.4rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#ff6f61',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
    },
    roleButtonHover: {
      backgroundColor: '#e55b4e',
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.content}>
      <div style={styles.box}>
        <h1 style={styles.welcomeHeading}>Welcome to BookStore! Choose Your Role</h1>
        <div style={styles.buttonContainer}>
          <button
            style={styles.roleButton}
            onClick={() => handleRoleSelection('user')}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.roleButtonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.roleButton.backgroundColor}
            onMouseDown={(e) => e.target.style.transform = styles.roleButtonHover.transform}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            User
          </button>
          <button
            style={styles.roleButton}
            onClick={() => handleRoleSelection('admin')}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.roleButtonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.roleButton.backgroundColor}
            onMouseDown={(e) => e.target.style.transform = styles.roleButtonHover.transform}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAdminChoose;
