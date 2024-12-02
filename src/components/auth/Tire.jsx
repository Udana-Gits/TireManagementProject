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

  
  const handleEntertireData = () => {
    navigate('/enterdata');
  };
  const tiredataview = () => {
    navigate('/tiredataadmin');
  };
  
  const handleTirePerformance = () => {
    navigate('/tireperformance');
  };
  
  return (
    <div className='admin-home-bg'>
      <NavBar authuser={authuser} />
      <br />
      <div className='adminbuttonbox'>
        <button onClick={handleEntertireData} class="adminhomebutton">
          <div>
              <img src="/images/components/TireMeasureIcon.png" alt=" " />
              <span class="text">Input Tire Measurements
              </span>
          </div>
        </button>
        <br />
        <button onClick={tiredataview} class="adminhomebutton">
        <div>
              <img src="/images/components/tire.png" alt=" " />
              <span class="text">View Tire Information
              </span>
          </div>
        </button>
        <br />
        <button onClick={handleTirePerformance} class="adminhomebutton">
        <div>
              <img src="/images/components/ReportIcon.png" alt=" " />
              <span class="text">View Tire Performance
              </span>
          </div>
        </button>
        <br />
        {/* <br />
        <button onClick={EnteroldTireData} class="adminhomebutton">
        <div>
              <img src="/images/components/ReportIcon.png" alt=" " />
              <span class="text">Enter Old Tire Data
              </span>
          </div>
        </button>
        <br /> */}
      </div>
      <br />
    </div>
  );
}

export default AdminHome;