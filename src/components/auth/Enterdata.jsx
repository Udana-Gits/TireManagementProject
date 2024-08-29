import React, { useState } from 'react';
import { db } from './firebase';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './CSS/Enterdata.css';
import { Modal, Button } from 'react-bootstrap';

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
  const [date, setDate] = useState(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  });
  
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [enteredData, setEnteredData] = useState('');


  const handleSelectChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleSelectChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!tireNo || !vehicleNo || !tyrePressure || !threadDepth || !selectedOption || !selectedOption1 || !selectedOption2 || !selectedOption3 || !kmReading) {
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

  const vehicleOptions = [
    { value: 'PM', label: 'Prime Mover', imgSrc: '/images/vehicals/PM.png' },
    { value: 'TT', label: 'Terminal Transport', imgSrc: '/images/vehicals/TT.png' },
    { value: 'PI', label: 'Prime Mover Internal', imgSrc: '/images/vehicals/PI.png' },
    { value: 'IT', label: 'Internal Transport', imgSrc: '/images/vehicals/IT.png' },
    { value: 'FS', label: 'Forklift', imgSrc: '/images/vehicals/FS.png' },
    { value: 'RS', label: 'Rings Tractor', imgSrc: '/images/vehicals/RS.png' },
    { value: 'RTG', label: 'Rubber Tire Granty Crane', imgSrc: '/images/vehicals/RTG.png' },
  ];

  return (
    <div className="">
      <div className='EnderBack'>
      <img
          src="/images/components/EnterDatabackground.png"
          alt="Background"
          className='EnderBackimg'
        />
      </div>

    <div className='title' > 
      <p><b>Input Tire Measurements</b></p>
    </div>
      
      <form action="" id="dropdown" className="contentbox" onSubmit={handleFormSubmit}>
        <p className='vtype'><b>Chose your Vehicle Type</b></p>
        <br />
        <div className="vehicle-options">
          {vehicleOptions.map(option => (
            <div
              key={option.value}
              className={`vehicle-option ${selectedOption === option.value ? 'selected' : ''}`}
              onClick={() => setSelectedOption(option.value)}
            >
              <img src={option.imgSrc} alt={option.label} className='vehicale' />
              <p>{option.label}</p>
            </div>
          ))}
        </div>

        <div id='tableenterdata'>
          
            <div className='td1'>
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
              <br />
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
              <br />

              <label htmlFor="tireStatus" className='label'>Tire Status</label>
              <div className="dropdown">
                <select id="dropdown" className="formdropdown" value={selectedOption2} onChange={handleSelectChange2}>
                  <option value="" disabled></option>
                  <option value="New">&nbsp;&nbsp;New</option>
                  <option value="Rebuild">&nbsp;&nbsp;Rebuild</option>
                  <option value="Broken">&nbsp;&nbsp;Broken</option>
                </select>
              </div>
              <br />

            </div>
            


            <div className='td2'>
            <label htmlFor="tireBrand" className='label'>Tire Brand</label>
              <div className="dropdown">
                <select id="dropdown" className="formdropdown" value={selectedOption3} onChange={handleSelectChange3}>
                  <option value="" disabled></option>
                  <option value="Magna">&nbsp;&nbsp;Magna</option>
                  <option value="GSR">&nbsp;&nbsp;GSR</option>
                  <option value="Continantal">&nbsp;&nbsp;Continantal</option>
                  <option value="Westlake">&nbsp;&nbsp;Westlake</option>
                  <option value="JK">&nbsp;&nbsp;JK</option>
                  <option value="Michalin">&nbsp;&nbsp;Michalin</option>
                  <option value="Advance">&nbsp;&nbsp;Advance</option>
                  <option value="Annaite">&nbsp;&nbsp;Annaite</option>
                  <option value="Jetsteel">&nbsp;&nbsp;Jetsteel</option>
                  <option value="Jetway">&nbsp;&nbsp;Jetway</option>
                </select>
              </div>
              <br />

              <label htmlFor="tirePosition" className='label'>Tire Position</label>
              <div className="dropdown">
                <select id="dropdown" className="formdropdown" value={selectedOption1} onChange={handleSelectChange1}>
                  <option value="" disabled></option>
                  <option value="P #01">&nbsp;&nbsp;P #01</option>
                  <option value="P #02">&nbsp;&nbsp;P #02</option>
                  <option value="P #03">&nbsp;&nbsp;P #03</option>
                  <option value="P #04">&nbsp;&nbsp;P #04</option>
                  <option value="P #05">&nbsp;&nbsp;P #05</option>
                  <option value="P #06">&nbsp;&nbsp;P #06</option>
                  <option value="P #07">&nbsp;&nbsp;P #07</option>
                  <option value="P #08">&nbsp;&nbsp;P #08</option>
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
            </div>
            {/* <td>
              {selectedOption && (
                <div className='selected-vehicle'>
                  <img
                    src={vehicleOptions.find(option => option.value === selectedOption).imgSrc}
                    alt={vehicleOptions.find(option => option.value === selectedOption).label}
                    className='vehicale'
                  />
                  <p>{vehicleOptions.find(option => option.value === selectedOption).label}</p>
                </div>
              )}
            </td> */}
          
        </div>

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
