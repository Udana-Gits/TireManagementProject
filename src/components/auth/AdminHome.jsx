import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { auth } from './firebase'; // Import the auth object from firebase.js
import { Link, useNavigate } from 'react-router-dom';

function AdminHome() {
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
    const handleAddNewUser = () => {
        navigate('/signup');
    };

    return (
        <div>
            <h1>Welcome to Admin Home</h1>
            <h4>Signed In as {authuser ? authuser.email : 'Not Signed In'}</h4>
            <div>
                {authuser ? (
                    <div>
                        <button onClick={handleAddNewUser} class="btn btn-primary me-2">Add New User</button>
                        <button onClick={handleSignOut} class="btn btn-primary me-2">Sign Out</button>
                    </div>
                ) : (
                    <p>Signed out</p>
                )}
            </div>
        </div>
    );
}

export default AdminHome;