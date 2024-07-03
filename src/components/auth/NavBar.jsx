import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase'; 
import { get, ref } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/navbar.css';

const Navbar = ({ authuser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (authuser) {
        const userRef = ref(db, `UserauthList/${authuser.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        if (userData && userData.profilePicture) {
          setProfilePicture(userData.profilePicture);
        }
      }
    };

    fetchProfilePicture();
  }, [authuser]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  const editProfile = () => {
    navigate('/profileedit');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <h4>Welcome to Admin Page {authuser ? authuser.email : 'Not Signed In'}</h4>
        </div>
        <div className="navbar-toggler-container">
          <button className="navbar-toggler" onClick={handleToggle}>
            <span className="navbar-toggler-icon"></span>
          </button>
          {isOpen && (
            <div className="navbar-profile-popup">
              {profilePicture && (
                <img src={profilePicture} alt="Profile" className="navbar-profile-picture" />
              )}
              <div className="profile-actions">
                {authuser ? (
                  <div>
                    <button onClick={editProfile} className="btn btn-primary">
                      Edit Profile
                    </button>
                    <button onClick={handleSignOut} className="btn btn-danger">
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <p>Signed out</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
