import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // Import your Firebase Realtime Database instance
import { sendPasswordResetEmail } from 'firebase/auth';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle show/hide password
  const navigate = useNavigate();
  const auth = getAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const logIn = async (e) => {
    e.preventDefault();
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
            if (showPassword) {
              navigate('/adminhome', { state: { showPassword } });
            } else {
              navigate('/adminhome');
            }
            break;
          case 'Employee':
            if (showPassword) {
              navigate('/emplyeehome', { state: { showPassword } });
            } else {
              navigate('/emplyeehome');
            }
            break;
          case 'Driver':
            if (showPassword) {
              navigate('/driverhome', { state: { showPassword } });
            } else {
              navigate('/driverhome');
            }
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
      alert('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className='log-in-container'>
      <form onSubmit={logIn} className="w-25 m-4">
        <h2 className="mb-3">Log In for Users</h2>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email Address</label>
        </div>
        <br />
        <div className="form-floating position-relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <button
            type="button"
            className="btn btn-primary position-absolute end-0 translate-middle-y me-2"
            style={{ right: '1.5rem', top: '50%'  }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
        <button type="button" className="btn btn-link" onClick={resetPassword}>
          Forgot Password?
        </button>
      </form>
      <br /><br /><br /><br /><br />
      <div>
        <p>adminadmin@gmail.com --- Admin</p>
        <p>employeeemployee@gmail.com --- Employee</p>
        <p>driverdriver@gmail.com --- Driver</p>
        <p>password --- udanaudana</p>
      </div>
    </div>
  );
};

export default LogIn;