import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './CSS/AccountManage.css';

const AccountManage = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [occupation, setOccupation] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Add a state for the search query
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
    const occupation = event.target.value;
    setOccupation(occupation);

    if (occupation === "") {
      // Show all accounts when "All" is selected
      setFilteredAccounts(accounts);
    } else {
      // Filter accounts by occupation when a specific occupation is selected
      const filteredAccounts = accounts.filter((account) => account.occupation === occupation);
      setFilteredAccounts(filteredAccounts);
    }
  };

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  };

  const handleSearch = () => {
    const filteredAccounts = accounts.filter((account) => {
      const fullName = `${account.firstName} ${account.lastName}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
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
    <div className="account-manage-container">
      <br />
      <button onClick={backhandle} className="backbutton">
        <img
          src="/images/components/Arrow_left.png"
          alt="leftarrow"
          className='left-arrow'
        />
        Back
      </button>
      <h2 className="account-manage-title">Account Management</h2>
      <br />
      <div className="filter-container">
        <label>Filter by Occupation: &nbsp; </label>
        <select value={occupation} onChange={handleOccupationChange} className="occupation-select">
          <option value="">All</option>
          <option value="Admin">Admin</option>
          <option value="Driver">Driver</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
      <br />
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <br />
      <table className="account-table">
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
            <tr key={account.id} className="account-row">
              <td>
                <button onClick={() => handleProfilePictureClick(account)} className="profile-picture-button">
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
          <Button variant="primary" onClick={handleModalConfirm} className="confirm-button">
            Delete
          </Button>
          <Button variant="secondary" onClick={handleModalCancel} className="cancel-button">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <br /><br /><br /><br /><br />
    </div>
  );
};

export default AccountManage;