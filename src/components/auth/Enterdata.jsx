import React, { useState } from 'react';
import { db } from './firebase';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'
import './CSS/Enterdata.css';

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
  const navigate = useNavigate();

  const backhandle = () => {
    navigate('/emplyeehome');
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

    if (!tireNo || !vehicleNo || !tyrePressure || !threadDepth || !selectedOption || !selectedOption1 || !selectedOption2 || !selectedOption3 || !kmReading) {
      alert('Please fill in all required fields');
      return;
    }

    const userRef = ref(db, `TireData/${tireNo}`);
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
      window.location.reload();
    });
  };

  return (
    <div className="log-in-container">
      <br />
      <button onClick={backhandle} className="btn btn-primary me-2">
        Back
      </button>
      <form action="" id="regform" className="w-25 m-4" onSubmit={handleFormSubmit}>
        <h2 className="mb-3">Input Tire Measurements</h2>
        <br />
        <table border={5}>
          <tr>
            <td>
              <div className="dropdown">
                <select id="dropdown" className="form-select" value={selectedOption} onChange={handleSelectChange}>
                  <option value="D">Select Vehicle Type</option>
                  <option value="PM">PM</option>
                  <option value="TT">TT</option>
                  <option value="PI">PI</option>
                  <option value="IT">IT</option>
                  <option value="FS">FS</option>
                  <option value="RS">RS</option>
                  <option value="RTG">RTG</option>
                </select>
              </div>
              <br />
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="vehicleNo"
                  placeholder="Vehicle Number"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                />
                <label htmlFor="vehicleNo">Vehicle Number</label>
              </div>
              <br />
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="tireNo"
                  placeholder="Tire Number"
                  value={tireNo}
                  onChange={(e) => setTireNo(e.target.value)}
                />
                <label htmlFor="tireNo">Tire Serial Number</label>
              </div>
            </td>
            <td>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="kmReading"
                  placeholder="Km reading"
                  value={kmReading}
                  onChange={(e) => setKmReading(e.target.value)}
                />
                <label htmlFor="kmReading">Km Reading</label>
              </div>
              <div className="dropdown">
                <select id="dropdown" className="form-select" value={selectedOption2} onChange={handleSelectChange2}>
                  <option value="">Tire Status</option>
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                  <option value="average">Average</option>
                </select>
              </div>
              <br />
              <div className="dropdown">
                <select id="dropdown" className="form-select" value={selectedOption3} onChange={handleSelectChange3}>
                  <option value="">Tire Brand</option>
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
              <div className="dropdown">
                <select id="dropdown" className="form-select" value={selectedOption1} onChange={handleSelectChange1}>
                  <option value="">Select Tire Position</option>
                  <option value="Front Right">Front Right</option>
                  <option value="Front left">Front left</option>
                  <option value="Rear Right">Rear Right</option>
                  <option value="Rear Left">Rear Left</option>
                </select>
              </div>
              <br />
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="threadDepth"
                  placeholder="Thread Depth (mm)"
                  value={threadDepth}
                  onChange={(e) => setThreadDepth(e.target.value)}
                />
                <label htmlFor="threadDepth">Thread Depth (mm)</label>
              </div>
              <br />
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="tyrePressure"
                  placeholder="Tyre Pressure (psi)"
                  value={tyrePressure}
                  onChange={(e) => setTyrePressure(e.target.value)}
                />
                <label htmlFor="tyrePressure">Air Pressure (psi)</label>
              </div>
            </td>
            <td>
              {selectedOption === "PM" && (
                <img
                  src="/images/vehicals/PM.png"
                  alt="Prime Mover"
                  style={{ width: '200px', height: 'auto' }}
                />
              )}
              {selectedOption === "IT" && (
                <img
                  src="/images/vehicals/IT.png"
                  alt="Internal Transport"
                  style={{ width: '200px', height: 'auto' }}
                />
              )}
              {selectedOption === "FS" && (
                <img
                  src="/images/vehicals/FS.png"
                  alt="Small Forklift"
                  style={{ width: '200px', height: 'auto' }}
                />
              )}
              {selectedOption === "D" && (
                <img
                  src=""
                  alt="Select Vehicale"
                />
              )}
              {selectedOption === "" && (
                <img
                  src=""
                  alt="Select Vehicale"
                />
              )}
              {["PM", "IT", "FS",].indexOf(selectedOption) === -1 && (
                <img
                  src="/images/vehicals/CAR.png"
                  alt="Default"
                  style={{ width: '200px', height: 'auto' }}
                />
              )}
            </td>
          </tr>
        </table>
        <button type="submit" className="btn btn-primary">
          Submit Measurements
        </button>
      </form>
    </div>
  );
};

export default EnterData;
