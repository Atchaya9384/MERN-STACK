import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const L = () => {
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5021/api/auth/signin', signInData);
      console.log('Sign In Response:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Sign In Error:', error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5021/api/auth/signup', signUpData);
      console.log('Sign Up Response:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };

  const handleChange = (e, setData) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <style>
        {`
          /* Global Styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }

          :root {
            --mainColor: #89216b;
            --whiteColor: #ffffff;
            --titleColor: #555555;
            --labelColor: #333333;
          }

          html {
            font-size: 62.5%;
            scroll-behavior: smooth;
          }

          body {
            background: url('${backgroundImage}') no-repeat center center/cover;
            font-weight: 400;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
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

          input[type="radio"] {
            display: none;
          }

          .form-container {
            display: flex;
            width: 200%;
            transition: transform 0.5s ease-in-out;
          }

          #signin:checked ~ .form-container {
            transform: translateX(0);
          }

          #signup:checked ~ .form-container {
            transform: translateX(-50%);
          }

          form {
            padding: 50px;
            text-align: center;
            width: 50%;
            flex-shrink: 0;
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

          label {
            color: red;
            cursor: pointer;
            text-decoration: underline;
          }

          @media (max-width: 768px) {
            .container {
              width: 90%;
            }
          }
        `}
      </style>
      <div className="container">
        <input type="radio" id="signin" name="toggle" defaultChecked />
        <input type="radio" id="signup" name="toggle" />

        <div className="form-container">
          <form id="signin-form" onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signInData.email}
              onChange={(e) => handleChange(e, setSignInData)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signInData.password}
              onChange={(e) => handleChange(e, setSignInData)}
              required
            />
            <button type="submit">Sign In</button>
            <p>Don't have an account? <label htmlFor="signup">Sign Up</label></p>
          </form>

          <form id="signup-form" onSubmit={handleSignUp}>
            <h1>Sign Up</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signUpData.name}
              onChange={(e) => handleChange(e, setSignUpData)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={(e) => handleChange(e, setSignUpData)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={(e) => handleChange(e, setSignUpData)}
              required
            />
            <button type="submit">Sign Up</button>
            <p>Already have an account? <label htmlFor="signin">Sign In</label></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default L;