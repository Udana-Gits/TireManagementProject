import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { auth } from './firebase'; // Assuming you have firebase setup
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; // Import Modal from 'react-modal'
import './CSS/AccountManage.css'; // Assuming your CSS file is correctly linked

const AccountManage = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [occupation, setOccupation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSearchContainer, setShowSearchContainer] = useState(true); // State to control search container visibility

  const navigate = useNavigate();

  // Fetch data from Firebase Realtime Database on component mount
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

  // Handle changes in the occupation filter
  const handleOccupationChange = (event) => {
    const occupation = event.target.value;
    setOccupation(occupation);

  // Filter accounts based on selected occupation
    if (occupation === "") {
      setFilteredAccounts(accounts);
    } else {
      const filteredAccounts = accounts.filter(
        (account) => account.occupation === occupation
      );
      setFilteredAccounts(filteredAccounts);
    }
  };

  // Update search query state
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Perform search based on name
  const handleSearch = () => {
    const filteredAccounts = accounts.filter((account) => {
      const fullName = `${account.firstName} ${account.lastName}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredAccounts(filteredAccounts);
  };

  // Open modal with selected account details
  const handleProfilePictureClick = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
    setShowSearchContainer(false); // Hide search container
  };

  // Confirm deletion of selected account
  const handleModalConfirm = () => {
    const dbRef = ref(getDatabase(), `UserauthList/${selectedAccount.id}`);
    remove(dbRef)
      .then(() => {
        window.alert('Account deleted successfully!');
        setIsModalOpen(false);
        setShowSearchContainer(true); // Show search container again
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
      });
  };

  // Cancel modal and close it
  const handleModalCancel = () => {
    setIsModalOpen(false);
    setShowSearchContainer(true); // Show search container again
  };

  // Navigate back to admin home page
  const backhandle = () => {
    navigate('/adminhome');
  };

  // Modal to show account details and delete option
  const ModalDetails = () => {
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setShowSearchContainer(true); // Show search container again
        }}
        className="custom-modal1"
      >
        <h2 className="modal-title">Account Details</h2>

        <div className="modal-body">
          {selectedAccount && (
            <div className="modal-body-in">
              <img
                src={selectedAccount.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              <h4 className="account-name">
                {selectedAccount.firstName} {selectedAccount.lastName}
              </h4>
              <div className='info-container'>
                <p className="account-info">
                  <strong>Personal Email : </strong> {selectedAccount.personalEmail}
                </p>
                <p className="account-info">
                  <strong>Email : </strong> {selectedAccount.officeemail}
                </p>
                <p className="account-info">
                  <strong>Address : </strong> {selectedAccount.address}
                </p>
                <p className="account-info">
                  <strong>Phone Number : </strong> {selectedAccount.phoneNumber}
                </p>
                <p className="account-info">
                  <strong>Date of Birth : </strong> {selectedAccount.dateOfBirth}
                </p>
                <p className="account-info">
                  <strong>Occupation : </strong> {selectedAccount.occupation}
                </p>
              </div>
            </div>
          )}
          <div className='modal-buttons'>
            <button
              variant="secondary"
              onClick={handleModalCancel}
              className="cancel-button btn-secondary"
            >
              Cancel
            </button>
            <button
              variant="primary"
              onClick={handleModalConfirm}
              className="confirm-button btn-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className='account-manage-bg'>
      <div className="account-manage-container">
        <h2 className="account-manage-title">Account Management</h2>
        <br />
        <div className="filter-container">
          <label>Filter by Occupation: &nbsp; </label>
          <select
            value={occupation}
            onChange={handleOccupationChange}
            className="occupation-select"
          >
            <option value="">All</option>
            <option value="Admin">Admin</option>
            <option value="Driver">Driver</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <br />
        <div className="search-container" style={{ visibility: showSearchContainer ? 'visible' : 'hidden' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name"
            className="search-input"
          />{' '}
          &nbsp;
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        <br />
        <div className="account-list">
          {filteredAccounts.map((account) => (
            <div key={account.id} className="account-item">
              <div className="profile-picture-container">
                <button
                  onClick={() => handleProfilePictureClick(account)}
                  className="profile-picture-button"
                >
                  <img
                    src={account.profilePicture}
                    alt="Profile"
                    className="navbar-profile-picture"
                  />
                </button>
              </div>
              <div className="account-info-main">
                <h4>{account.firstName} {account.lastName}</h4>
                <p><strong>Official Email : </strong> {account.officeemail}</p>
                <p><strong>Phone No : </strong> {account.phoneNumber}</p>
              </div>
            </div>
          ))}
        </div>
        <ModalDetails /> {/* Render the ModalDetails component */}
      </div>
    </div>
  );
};

export default AccountManage;