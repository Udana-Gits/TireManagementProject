import React, { useState } from 'react';
import { db } from './firebase';
import { ref, set } from 'firebase/database';

const EnterData = () => {
  const [tireNo, setTireNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [tyrePressure, setTyrePressure] = useState('');
  const [threadDepth, setThreadDepth] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!tireNo ||!vehicleNo ||!tyrePressure ||!threadDepth ||!selectedOption) {
      alert('Please fill in all required fields');
      return;
    }

    const userRef = ref(db, `TireData/${tireNo}`);
    set(userRef, {
      tireNo: tireNo,
      vehicleNo: vehicleNo,
      tyrePressure: tyrePressure,
      threadDepth: threadDepth,
      vehicleType: selectedOption,
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
      <form action="" id="regform" className="w-25 m-4" onSubmit={handleFormSubmit}>
        <h2 className="mb-3">Input Tire Measurements</h2>
        <div className="dropdown">
          <select id="dropdown" className="form-select" value={selectedOption} onChange={handleSelectChange}>
            <option value="">Select Vehicale Type</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
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
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="tireNo"
            placeholder="Tire Number"
            value={tireNo}
            onChange={(e) => setTireNo(e.target.value)}
          />
          <label htmlFor="tireNo">Tire Number</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="tyrePressure"
            placeholder="Tyre Pressure (psi)"
            value={tyrePressure}
            onChange={(e) => setTyrePressure(e.target.value)}
          />
          <label htmlFor="tyrePressure">Tyre Pressure (psi)</label>
        </div>
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
        <button type="submit"className="btn btn-primary">
          Submit Measurements
        </button>
      </form>
    </div>
  );
};

export default EnterData;