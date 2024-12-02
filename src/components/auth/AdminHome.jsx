import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase'; 
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './CSS/AdminHome.css';


function AdminHome() {
  // State to hold the authenticated user
  const [authuser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  // Listen for authentication state changes
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user); // Set the authenticated user
      } else {
        setAuthUser(null); // Clear the user state if not logged in
      }
    });
    return () => listen(); // Cleanup the listener when the component unmounts
  }, []);

  // Handlers to navigate to different sections (tire manage, vehicle manage, administrative)
  const handleTire = () => {
    navigate('/tire');
  };
  const handleVehicle = () => {
    navigate('/vehicle');
  };
  const handleAdministrative = () => {
    navigate('/administrative');
  };
  
  
  return (
    <div className='admin-home-bg'>
      <NavBar authuser={authuser} />
      <br />
      <div className='adminbuttonbox'>
        <button onClick={handleTire} class="adminhomebutton">
          <div>
              <img src="/images/components/tire.png" alt=" " />
              <span class="text">Tire Management
              </span>
          </div>
        </button>
        <br />
        <button onClick={handleVehicle} class="adminhomebutton">
        <div>
              <img src="/images/components/vehicle.png" alt=" " />
              <span class="text">Vehicle Management
              </span>
          </div>
        </button>
        <br />
        <button onClick={handleAdministrative} class="adminhomebutton">
        <div>
              <img src="/images/components/ManageAccountIcon.png" alt=" " />
              <span class="text">Administrative
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