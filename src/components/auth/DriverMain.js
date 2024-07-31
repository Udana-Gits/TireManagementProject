import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './CSS/DriverMain.css';

const DriverMain = ({ tireDataRef }) => {
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
    return () => listen();
  }, []);

  const gototiredata = () => {
    navigate('/tiredata');
  };
  const gotovehicledata = () => {
    navigate('/vehicledata');
  };
  
  return (
    <div className="driver-main-page">
      <div className="header-container">
        <NavBar authuser={authuser} />
      </div>
      {authuser ? (
        <div className="main-content">
          <div className="button-group">
            <div className="button-container">
              <button onClick={gototiredata} className="tire-data-button">
                <img src="/images/components/tire.png" alt="Tire Icon" className="tire-icon" />
                Tire Data
              </button>
            </div>
            <div className="button-container">
              <button onClick={gotovehicledata} className="vehicle-data-button">
                <img src="/images/components/vehicle.png" alt="Vehicle Icon" className="vehicle-icon" />
                Vehicle Data
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Please sign in to access Driver Main.</p>
      )}
    </div>
  );
};

export default DriverMain;