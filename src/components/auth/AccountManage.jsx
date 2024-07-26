import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const AccountManage = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [occupation, setOccupation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(getDatabase(), `UserauthList`);
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const accountsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setAccounts(accountsArray);
      setFilteredAccounts(accountsArray);
    });
  }, []);

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
    const filteredAccounts = accounts.filter((account) => account.occupation === event.target.value);
    setFilteredAccounts(filteredAccounts);
  };

  const handleProfilePictureClick = (account) => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    const dbRef = ref(getDatabase(), `UserauthList/${selectedAccount.id}`);
    remove(dbRef)
      .then(() => {
        window.alert('Account deleted successfully!');
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
      });
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const backhandle = () => {
    navigate('/adminhome');
  };

  return (
    <div>
        <br />
      <button onClick={backhandle} className="backbutton">
        <img
          src="/images/components/Arrow_left.png"
          alt="leftarrow"
          className='leftarrow'
        />
        Back
      </button>
      <h2>Account Management</h2>
      <div>
        <label>Filter by Occupation:</label>
        <select value={occupation} onChange={handleOccupationChange}>
          <option value="">All</option>
          <option value="Admin">Admin</option>
          <option value="Driver">Driver</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Official Email</th>
            <th>Phone No</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.id}>
              <td>
                <button onClick={() => handleProfilePictureClick(account)}>
                  <img src={account.profilePicture} alt="Profile" className="navbar-profile-picture" />
                </button>
              </td>
              <td>{account.firstName} {account.lastName}</td>
              <td>{account.officeemail}</td>
              <td>{account.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleModalCancel} className="modal-confirm">
        <Modal.Header>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAccount && (
            <div>
              <img src={selectedAccount.profilePicture} alt="Profile" className="navbar-profile-picture" />
              <h4>
                {selectedAccount.firstName} {selectedAccount.lastName}
              </h4>
              <p>Personal Email: {selectedAccount.personalEmail}</p>
              <p>Email: {selectedAccount.officeemail}</p>
              <p>Address: {selectedAccount.address}</p>
              <p>Phone Number: {selectedAccount.phoneNumber}</p>
              <p>Date of Birth: {selectedAccount.dateOfBirth}</p>
              <p>Occupation: {selectedAccount.occupation}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalConfirm} className="promtbutton">
            Delete
          </Button>
          <Button variant="secondary" onClick={handleModalCancel} className="promtbutton">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <br /><br /><br /><br /><br />
    </div>
  );
};

export default AccountManage;