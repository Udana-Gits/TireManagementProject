import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { get, set, ref } from 'firebase/database';
import { db, app } from './firebase';
import { getDownloadURL, getStorage, uploadBytes, ref as sRef } from 'firebase/storage';
import './CSS/ProfileEdit.css';


const ProfileEdit = () => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        
        // Retrieve user data from Realtime Database
        const userRef = ref(db, `UserauthList/${userAuth.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        if (userData) {
          setDateOfBirth(userData.dateOfBirth || '');
          setPhoneNumber(userData.phoneNumber || '');
          setAddress(userData.address || '');
          setProfilePicture(userData.profilePicture || '');
        }
      } else {
        setUser(null); // Clear user state if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    if (!db) {
      console.error("Database is not initialized");
      return;
    }

    // Retrieve existing user data from Realtime Database
    const userRef = ref(db, `UserauthList/${user.uid}`);
    get(userRef).then((snapshot) => {
      const existingUserData = snapshot.val();
      if (!existingUserData) {
        console.error("User data not found in database");
        return;
      }

      const updatedUserData = {
        ...existingUserData,
        phoneNumber: phoneNumber || existingUserData.phoneNumber,
        address: address || existingUserData.address,
        dateOfBirth: dateOfBirth || existingUserData.dateOfBirth,
        profilePicture: profilePicture || existingUserData.profilePicture,
      };
      
      // Update user object in Realtime Database
      set(userRef, updatedUserData)
        .then(() => {
          console.log("Profile updated successfully");
          window.location.reload(); // Refresh the page after successful update
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    });
  };

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      if (!user) {
        console.error("User is not authenticated");
        return;
      }
      try {
        setUploading(true);
        const storage = getStorage(app);
        const imageName = user.uid;
        const storageRef = sRef(storage, imageName);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setProfilePicture(downloadURL); // Update state with new profile picture URL

        // Retrieve existing user data from Realtime Database
        const userRef = ref(db, `UserauthList/${user.uid}`);
        const snapshot = await get(userRef);
        const existingUserData = snapshot.val();
        if (!existingUserData) {
          console.error("User data not found in database");
          return;
        }

        // Update profile picture in Realtime Database
        await set(userRef, { ...existingUserData, profilePicture: downloadURL });

        console.log("Profile picture uploaded successfully");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="edit-profile-container">
    <h2>Edit Profile</h2>
      <div className="profile-picture">
        {profilePicture ? ( <img src={profilePicture} alt="Profile" className="profile-picture" />) : ( <img src="https://firebasestorage.googleapis.com/v0/b/tiremngdtbase.appspot.com/o/default.jpg?alt=media&token=be7f47f4-42ac-421b-a775-be76dd0de1bb" alt="Default" className="profile-picture" /> )}
        <br />
        <input type="file" onChange={handleImageChange} />
        {/* <button disabled={uploading}>{uploading ? "Uploading..." : "Upload Image"}</button> */}
      </div>
      <br /><br /><br /><br /><br /> <br /><br /><br /><br /><br />
      <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-prim">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;