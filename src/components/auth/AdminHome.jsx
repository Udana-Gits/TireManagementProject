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

  const handleAddNewUser = () => {
    navigate('/signup');
  };
  
  const handleEntertireData = () => {
    navigate('/enterdata');
  };
  const tiredataview = () => {
    navigate('/tiredata');
  };
  const handlvehicleinfo = () => {
    navigate('/vehicledata');
  };
  
  const handleAccountmanage = () => {
    navigate('/accountmanage');
  };
  const handleTirePerformance = () => {
    navigate('/tireperformance');
  };
  
  return (
    <div>
      <NavBar authuser={authuser} />
      <br />
      <div className='adminbuttonbox'>
        <button onClick={handleEntertireData} class="adminhomebutton">
        Input Tire Measurements
        </button>
        <br /><br />
        <button onClick={tiredataview} class="adminhomebutton">
        View Tire Information
        </button>
        <br /><br />
        <button onClick={handlvehicleinfo} class="adminhomebutton">
        View Vehicle Information
        </button>
        <br /><br />
        <button onClick={handleTirePerformance} class="adminhomebutton">
        View Tire Performance
        </button>
        <br /><br />
        <button onClick={handleAccountmanage} class="adminhomebutton">
        User Account Management
        </button>
        <br /><br />
        <button onClick={handleAddNewUser} class="adminhomebutton">
          Add New User
        </button>
        <br /><br />
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
}

export default AdminHome;