import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase'; 
import { get, ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './CSS/navbar.css';

const Navbar = ({ authuser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [occupation, setOccupation] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (authuser) {
        const userRef = ref(db, `UserauthList/${authuser.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        if (userData && userData.profilePicture) {
          setProfilePicture(userData.profilePicture);
          setOccupation(userData.occupation);
          setFirstName(userData.firstName);

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
          <h4>Welcome to  {occupation} Page {firstName}</h4>
        </div>
        <div className="">
            <img
              src="/images/components/threelinebutton.png"
              alt="Pavara Tire Management System"
              className="togglebuttonimage"
              onClick={handleToggle}
            />
          {isOpen && (
            <div className="navbar-profile-popup">
              {profilePicture && (
                <img src={profilePicture} alt="Profile" className="navbar-profile-picture" />
              )}
              <div className="profile-actions">
                {authuser ? (
                  <div>
                    <button onClick={editProfile} className="navbarbutton">
                      Edit Profile
                    </button>
                    <button onClick={handleSignOut} className="navbarbutton">
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
