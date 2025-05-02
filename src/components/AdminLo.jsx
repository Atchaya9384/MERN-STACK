import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get('https://run.mocky.io/v3/48176afd-207c-4d28-9925-2883044c99c8'); 
        setBackgroundImage(response.data.backgroundImageUrl); 
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchBackgroundImage();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'password123') {
      setMessage('Login successful!');
      navigate('/admin/dashboard');
    } else {
      setMessage('Invalid email or password.');
    }
  };

  return (
    <div>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: url('${backgroundImage}') no-repeat center center/cover;
        }

        .container {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
          width: 400px;
          max-width: 100%;
          overflow: hidden;
          position: relative;
        }

        form {
          padding: 50px;
          text-align: center;
          width: 100%;
        }

        h1 {
          margin-bottom: 20px;
          font-size: 24px;
          color: white;
        }

        input {
          width: 100%;
          padding: 15px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }

        button {
          padding: 15px 20px;
          background-color: #d24323;
          border: none;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          margin-top: 10px;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #90250d;
        }

        p {
          margin-top: 20px;
          font-size: 14px;
          color: white;
        }

        .message {
          margin-top: 10px;
          color: yellow;
        }

        @media (max-width: 768px) {
          .container {
            width: 90%;
          }
        }
      `}</style>

      <div className="container">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLo;
