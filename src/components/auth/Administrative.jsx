// AdminHome.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { auth } from './firebase'; // Import the auth object from firebase.js
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './CSS/AdminHome.css';


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

  // navigation to various sections
  const handleAddNewUser = () => {
    navigate('/signup');
  };
  
  const handleAccountmanage = () => {
    navigate('/accountmanage');
  };
  
  return (
    <div className='admin-home-bg'>
      <NavBar authuser={authuser} />
      <br />
      <div className='adminbuttonbox'>
        <button onClick={handleAccountmanage} class="adminhomebutton">
        <div>
              <img src="/images/components/ManageAccountIcon.png" alt=" " />
              <span class="text">User Account Management
              </span>
          </div>
        </button>
        <br />
        <button onClick={handleAddNewUser} class="adminhomebutton">
        <div>
              <img src="/images/components/AddUserIcon.png" alt=" " />
              <span class="text">Add New User
              </span>
          </div>
        </button>
        <br />
      </div>
      <br />
    </div>
  );
}

export default AdminHome;