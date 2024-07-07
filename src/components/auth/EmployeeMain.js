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
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        });
        return () => listen(); // Cleanup the listener when the component unmounts
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Redirect to login page after signout
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
            });
    };
    const inputmeasurement = () => {

        navigate('/enterdata');
    };

    return (
        <div>
        <NavBar authuser={authuser} />
            <div className='employeecontainer'>
                {authuser ? (
                    <div>
                        <br />
                        <button onClick={inputmeasurement} class="enterdatabutton">Input Tire Measurements</button>
                        <br />
                        <br />
                        <br />
                        <button onClick={inputmeasurement} class="enterdatabutton">View Tire Details</button>
                    </div>
                    
                    
                ) : (
                    <p>Signed out</p>
                )}
            </div>
        </div>
  );
}
export default EmployeeMain;
