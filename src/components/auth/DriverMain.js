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
      <NavBar authuser={authuser} />
      {authuser ? (
        
          <div className="button-group">
            <button onClick={gototiredata} className="tire-data-button">
              <div className="icon-container">
                <img src="/images/components/tire.png" alt="Tire Icon" className="tire-icon" />
              </div>
              <span>View Tire Information</span>
            </button>
            <button onClick={gotovehicledata} className="vehicle-data-button">
              <div className="icon-container">
                <img src="/images/components/vehicle.png" alt="Vehicle Icon" className="vehicle-icon" />
              </div>
              <span>View Vehicle Information</span>
            </button>
          </div>
      ) : (
        <p>Please Sign in to Access Driver Dashboard.</p>
      )}
    </div>
  );
};

export default DriverMain;