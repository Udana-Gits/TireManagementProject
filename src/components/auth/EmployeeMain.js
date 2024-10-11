// EmployeeMain.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { auth } from './firebase'; // Import the auth object from firebase.js
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './CSS/EmployeeMain.css';



export function EmployeeMain() {

    const [authuser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
                navigate('/login', { replace: true }); // Prevent going back after logging out
            }
        });
        return () => listen(); // Cleanup the listener when the component unmounts
    }, [navigate]);


    const inputmeasurement = () => {

        navigate('/enterdata');
    };

    const tiredataview = () => {

        navigate('/tiredata');
    };

    return (
        <div className="employee-main-page">
            <NavBar authuser={authuser} />
            {authuser ? (
                <div className="button-group">
                    <button onClick={inputmeasurement} className="input-data-button">
                        <div className="icon-container">
                            <img src="/images/components/TireMeasureIcon.png" alt="Input data Icon" className="input-data-icon" />
                        </div>
                        <span>Input Tire Measurements</span>
                    </button>
                    <button onClick={tiredataview} className="tire-data-button">
                        <div className="icon-container">
                            <img src="/images/components/tire.png" alt="Tire Icon" className="tire-icon" />
                        </div>
                        <span>View Tire Details</span>
                    </button>
                </div>
            ) : (
                <p>Please Sign in to Access Employee Dashboard</p>
            )}
        </div>
    );
}
export default EmployeeMain;
