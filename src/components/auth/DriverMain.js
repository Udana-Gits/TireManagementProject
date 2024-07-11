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
    <div>
      <div className="">
        <div>
          <NavBar authuser={authuser} />
        </div>
        {authuser? (
          <div>
            <br />
            <div>
                <div>
                  <button onClick={gototiredata} className="searchbutton">
                    Tire Data
                  </button> 
                  <br />
                  <br />
                  <button onClick={gotovehicledata} className="searchbutton">
                    VehicleData
                  </button> 
                </div>
            </div>
          </div>
        ) : (
          <p>Please sign in to access Driver Main.</p>
        )}
      </div>
    </div>
  );
};

export default DriverMain;