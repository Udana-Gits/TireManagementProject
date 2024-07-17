import React, { useState } from 'react';
import { db } from './firebase';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'eact-router-dom'
import './CSS/Enterdata.css';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap

const EnterData = () => {
  const [tireNo, setTireNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [tyrePressure, setTyrePressure] = useState('');
  const [kmReading, setKmReading] = useState('');
  const [threadDepth, setThreadDepth] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [date, setDate] = useState(new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  }));
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // State to show/hide the modal
  const [enteredData, setEnteredData] = useState(''); // State to store the entered data

  const backhandle = () => {
    navigate(-1);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectChange1 = (event) => {
    setSelectedOption1(event.target.value); // Corrected from setSelectedOption1
  };

  const handleSelectChange2 = (event) => {
    setSelectedOption2(event.target.value); // Corrected from setSelectedOption1
  };

  const handleSelectChange3 = (event) => {
    setSelectedOption3(event.target.value); // Corrected from setSelectedOption1
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!tireNo ||!vehicleNo ||!tyrePressure ||!threadDepth ||!selectedOption ||!selectedOption1 ||!selectedOption2 ||!selectedOption3 ||!kmReading) {
      alert('Please fill in all required fields');
      return;
    }

    const enteredData = `

      Vehicle Type: ${selectedOption}\n
      Vehicle Number: ${vehicleNo}\n
      Tire Serial Number: ${tireNo}\n
      Km Reading: ${kmReading}\n
      Tire Status: ${selectedOption2}\n
      Tire Brand: ${selectedOption3}\n
      Tire Position: ${selectedOption1}\n
      Thread Depth: ${threadDepth}\n
      Air Pressure: ${tyrePressure}\n`;

    setEnteredData(enteredData);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    const userRef = ref(db, `TireData/${date.replace(/\//g, '-')}/${tireNo}`);
    set(userRef, {
      vehicleNo: vehicleNo,
      tireNo: tireNo,
      tyrePressure: tyrePressure,
      threadDepth: threadDepth,
      kmReading: kmReading,
      vehicleType: selectedOption,
      TirePosition: selectedOption1,
      tirestatus: selectedOption2,
      tirebrand: selectedOption3,
      dateTime: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }),
    })
   .then(() => {
      window.alert('Data entered successfully!');
      setShowModal(false);
    });
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="">
      <br />
      <button onClick={backhandle} className="backbutton">
        <img
          src="/images/components/Arrow_left.png"
          alt="leftarrow"
          className='leftarrow'
        />
        Back
      </button>
      
      <form action="" id="dropdown" className="contentbox" onSubmit={handleFormSubmit}>
        <br />
        <table id='tableenterdata'>
          <tr>
            <td>
              <div className="">
              <label htmlFor="vehicleType" className='label'>Vehicle Type</label><br />
                <select id="dropdown" className="formdropdown" value={selectedOption} onChange={handleSelectChange}>
                  <option value="" disabled></option>
                  <option value="PM">PM</option>
                  <option value="TT">TT</option>
                  <option value="PI">PI</option>
                  <option value="IT">IT</option>
                  <option value="FS">FS</option>
                  <option value="RS">RS</option>
                  <option value="RTG">RTG</option>
                </select>
              </div>
              <br/>
              <label htmlFor="vehicaleNumber" className='label'>Vehicle Number</label>
              <div className="">
                <input
                  type="text"
                  className="textbox"
                  id="vehicleNo"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                />
              </div>
              <br />
              <label htmlFor="tireNo" className='label'>Tire Serial Number</label>
              <div className="">
                <input
                  type="text"
                  className="textbox"
                  id="tireNo"
                  value={tireNo}
                  onChange={(e) => setTireNo(e.target.value)}
                />
              </div>
            </td>
            <td>
            <label htmlFor="kmReading" className='label'>Km Reading</label>
              <div className="">
                <input
                  type="text"
                  className="textbox"
                  id="kmReading"
                  value={kmReading}
                  onChange={(e) => setKmReading(e.target.value)}
                />
              </div>
              <label htmlFor="tireStatus" className='label'>Tire Status</label>
              <div className="dropdown">
                <select id="dropdown" className="formdropdown" value={selectedOption2} onChange={handleSelectChange2}>
                  <option value="" disabled></option>
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                  <option value="average">Average</option>
                </select>
              </div>
              <br />
              <label htmlFor="tireBrand" className='label'>Tire Brand</label>
              <div className="dropdown">
                <select id="dropdown" className="formdropdown" value={selectedOption3} onChange={handleSelectChange3}>
                  <option value="" disabled></option>
                  <option value="MRF">MRF</option>
                  <option value="CEAT">CEAT</option>
                  <option value="DSI">DSI</option>
                </select>
              </div>
              <br />
              
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="tirePosition" className='label'>Tire Position</label>
              <div className="dropdown">
                <select id="dropdown" className="formdropdown" value={selectedOption1} onChange={handleSelectChange1}>
                  <option value="" disabled></option>
                  <option value="Front Right">Front Right</option>
                  <option value="Front left">Front left</option>
                  <option value="Rear Right">Rear Right</option>
                  <option value="Rear Left">Rear Left</option>
                </select>
              </div>
              <br />
              <label htmlFor="threadDepth" className='label'>Thread Depth (mm)</label>
              <div className="">
                <input
                  type="text"
                  className="textbox"
                  id="threadDepth"
                  value={threadDepth}
                  onChange={(e) => setThreadDepth(e.target.value)}
                />
              </div>
              <br />
              <label htmlFor="tyrePressure" className='label'>Air Pressure (psi)</label>
              <div className="">
                <input
                  type="text"
                  className="textbox"
                  id="tyrePressure"
                  value={tyrePressure}
                  onChange={(e) => setTyrePressure(e.target.value)}
                />
              </div>
            </td>
            <td>
              {selectedOption === "PM" && (
                <img
                  src="/images/vehicals/PM.png"
                  alt="Prime Mover"
                  className='vehicale'
                />
              )}
              {selectedOption === "TT" && (
                <img
                  src="/images/vehicals/TT.png"
                  alt="Terminal transport"
                  className='vehicale'
                />
              )}
              {selectedOption === "PI" && (
                <img
                  src="/images/vehicals/PI.png"
                  alt="Prome Mover Internal"
                  className='vehicale'
                />
              )}
{selectedOption === "IT" && (
                <img
                  src="/images/vehicals/IT.png"
                  alt="Internal Transport"
                  className='vehicale'
                />
              )}
              {selectedOption === "FS" && (
                <img
                  src="/images/vehicals/FS.png"
                  alt="Small Forklift"
                  className='vehicale'
                />
              )}
              {selectedOption === "RS" && (
                <img
                  src="/images/vehicals/RS.png"
                  alt="Rings Tractor"
                  className='vehicale'
                />
              )}
              {selectedOption === "RTG" && (
                <img
                  src="/images/vehicals/RTG.png"
                 alt="Rubber Tire Granty Crane"
                  className='vehicale'
                />
              )}
              {selectedOption === "" && (
                <img
                  src=""
                  
                />
              )}
            </td>
          </tr>
        </table>
        <br />
        <div>
          <button type="submit" className="submitbutton">
            Submit
          </button>
        </div>
      </form>

      <Modal show={showModal} onHide={handleModalCancel} className="modal-confirm">
  <Modal.Header>
    <Modal.Title>Click OK to confirm or Cancel to edit.</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div >
        <p className='leftpart'>Vehicle Type: {selectedOption}</p>
        <br />
        <p>Vehicle Number: {vehicleNo}</p>
        <br />
        <p>Tire Serial Number: {tireNo}</p>
        <br />
        <p>Km Reading: {kmReading}</p>
        <br />
        <p>Tire Status: {selectedOption2}</p>
      </div>
      <div className='rightpart'>
        <p>Tire Brand: {selectedOption3}</p>
        <br />
        <p>Tire Position: {selectedOption1}</p>
        <br />
        <p>Thread Depth: {threadDepth}</p>
        <br />
        <p>Air Pressure: {tyrePressure}</p>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={handleModalConfirm} className='promtbutton'>
      Confirm
    </Button>
    <Button variant="secondary" onClick={handleModalCancel} className='promtbutton' >
      Cancel
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};

export default EnterData;