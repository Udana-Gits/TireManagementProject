import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // Import your Firebase Realtime Database instance

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Get user's UID
        const uid = userCredential.user.uid;
        // Fetch user's data from Realtime Database
        const userRef = ref(db, `UserauthList/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userOccupation = userData.occupation;

          // Redirect based on user's occupation
          if (userOccupation === 'admin') {
            navigate('/adminhome');
          } else if (userOccupation === 'employee') {
            navigate('/emplyeehome');
          } else if (userOccupation === 'driver') {
            navigate('/driverhome');
          } else {
            // Handle other cases or show an alert
            alert('Invalid occupation. Please try again.');
          }
        } else {
          // Handle case where user data doesn't exist
          alert('User data not found. Please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Invalid email or password. Please try again.');
      });
  };

  return (
    <div className='log-in-container'>
      <form action="" id="regform" className="w-25 m-4" onSubmit={logIn}>
        <h2 className="mb-3">Log In for Users</h2>
        <div className="form-floating">
          <label htmlFor="floatingInput">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="form-floating">
          <label htmlFor="floatingPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" id="loginButton" className="btn btn-primary">
          Log In
        </button>
      </form>
      <p>udanaudana@gmail.com --- Admin</p>
      <p>udanaudana01@gmail.com --- Employee</p>
      <p>udanaudana02@gmail.com --- Driver</p>
      <p>password --- udanaudana</p>
    </div>
  );
};

export default LogIn;




