//LogIn.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // firebase realtime db import
import { sendPasswordResetEmail } from 'firebase/auth';
import './CSS/LogIn.css';
import { useEffect } from 'react';



const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); //  show/hide password define
  const navigate = useNavigate();
  const auth = getAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    window.history.pushState(null, null, null);
  }, []);
  

  const logIn = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userRef = ref(db, `UserauthList/${uid}`);
      const snapshot = await get(userRef);
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userOccupation = userData.occupation;
  
        switch (userOccupation) {
          case 'Admin':
            navigate('/adminhome');
            break;
          case 'Employee':
            navigate('/employeehome');
            break;
          case 'Driver':
            navigate('/driverhome');
            break;
          default:
            alert('Invalid occupation. Please try again.');
        }
      } else {
        alert('User data not found. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Invalid email or password. Please try again.');
    }
  };
  

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Please check your email.');
    } catch (error) {
      console.error(error);
      alert('Error sending password reset email. Please try again after entering your email in email box.');
    }
  };

  return (
    <body className="login-page">
      <div className='headiamge'>
        <img
          src="/images/components/header.png"
          alt="Pavara Tire Management System"
          className="loginheaderiamge"
        />
      </div>
      <div className="login-container">
        <form onSubmit={logIn} className="login-form">
          <h2 className="loginheading">LOGIN</h2>
          <div className="">
            <div className="input-wrapper">
              <input
                type="email"
                className="logininput"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <img
                    src="/images/components/pavaraacc.png"
                    alt="Pavara Tire Management System"
                    className="input-image1"
              />
            </div>
          </div>
          <br />
          <div className="">
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="logininput"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                  src="/images/components/pavaralock.png"
                  alt="Pavara Tire Management System"
                  className="input-image2"
              />
            </div>
          </div>
          <br /><br />
          <div className="password-actions">
          <button
              type="button"
              className="passwordvisibilitybutton"
              onClick={togglePasswordVisibility}
          >
              <img
                    src="/images/components/closedeye.png"
                    alt="show/hide button"
                    className="passwordimage"
              />&nbsp;&nbsp;
              {showPassword ? '  Hide' : '   Show'}  password
          </button>
          <button type="button" className="forgetpassword" onClick={resetPassword}>
            Forgot Password?
          </button>
          </div>
          <br /><br />
          <button type="submit" className="loginbutton">
            Log In
          </button>
        </form>
      </div>
    </body> 
  );
};

export default LogIn;