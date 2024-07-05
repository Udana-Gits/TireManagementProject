// EmployeeMain.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { auth } from './firebase'; // Import the auth object from firebase.js
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';


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
            <div>
                {authuser ? (
                    <div>
                        <br />
                        <button onClick={inputmeasurement} class="btn btn-primary me-2">Input Measurementrs</button>
                    </div>
                ) : (
                    <p>Signed out</p>
                )}
            </div>
        </div>
  );
}
export default EmployeeMain;
