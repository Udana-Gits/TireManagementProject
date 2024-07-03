// AdminHome.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { auth } from './firebase'; // Import the auth object from firebase.js
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function AdminHome() {
  const [authuser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => listen(); // Cleanup the listener when the component unmounts
  }, []);

  const handleAddNewUser = () => {
    navigate('/signup');
  };

  return (
    <div>
      <NavBar authuser={authuser} />
      <h1>Welcome to Admin Home</h1>
      <div>
        <button onClick={handleAddNewUser} class="btn btn-primary me-2">
          Add New User
        </button>
      </div>
    </div>
  );
}

export default AdminHome;