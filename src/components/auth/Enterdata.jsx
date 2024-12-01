import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, set, get, child } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './CSS/Enterdata.css';
import { Modal, Button } from 'react-bootstrap';
import { getAuth } from "firebase/auth";


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




  const [vehicleNoError, setVehicleNoError] = useState('');
  const [tireNoError, setTireNoError] = useState('');
  const [kmReadingError, setKmReadingError] = useState('');
  const [threadDepthError, setThreadDepthError] = useState('');
  const [tyrePressureError, setTyrePressureError] = useState('');


  

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const [formattedDate, setFormattedDate] = useState(`${day}/${month}/${year}`);

  const hours = today.getHours();
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const timeHours = hours % 12;
  const timeHoursValue = timeHours ? timeHours : 12; // the hour '0' should be '12'

  const [Time, setTime] = useState(`${timeHoursValue}:${minutes} ${ampm}`);

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [enteredData, setEnteredData] = useState('');

  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const email = user.email; // Get the current user's email
      const dbRef = ref(db, 'UserauthList'); // Reference to the UserauthList node
  
      // Fetch the employee's data based on their email
      get(child(dbRef, user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const employeeData = snapshot.val();
          const employeeName = employeeData.firstName;
          setEmployeeName(employeeName);
        } else {
          console.log('No employee data found');
        }
      });
    }
  }, []);




  const handleSelectChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleSelectChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  const validateVehicleNo = (vehicleNo) => {
    // This regex matches a prefix (2 letters) followed by optional space and then 4 digits.
    const vehicleNoPattern = /^[A-Za-z]{2}\d{4}$/;
    return vehicleNoPattern.test(vehicleNo);
  };

  const validateTireNo = (tireNo) => {
    // The regex matches any amount of numbers and letters in both upper and lower cases, but no symbols.
    const tireNoPattern = /^[a-zA-Z0-9]*$/;
    return tireNoPattern.test(tireNo);
  };

  const validateKmReading = (kmReading) => /^\d+$/.test(kmReading);

  const handleKmReadingChange = (e) => {
    const inputValue = e.target.value;
    if (validateKmReading(inputValue) || inputValue === '') {
      setKmReading(inputValue);
      setKmReadingError('');
    } else {
      setKmReadingError('Km Reading must be a number.');
    }
  };

  const handleKmReadingBlur = () => {
    if (!validateKmReading(kmReading)) {
      setKmReadingError('Km Reading must be a number.');
    } else {
      setKmReadingError(''); // Clear error if valid on blur
    }
  };



  const validateThreadDepth = (threadDepth) => {
    const depth = parseFloat(threadDepth);
    return !isNaN(depth) && depth >= 0 && depth <= 40;
  };
  
  const handleThreadDepthChange = (e) => {
    const inputValue = e.target.value;
    const depth = parseFloat(inputValue);
  
    // Allow numeric input and validate range as the user types
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setThreadDepth(inputValue); // Allow any number to be typed
  
      // Check if the value is within the valid range (0-40)
      if (depth >= 0 && depth <= 40) {
        setThreadDepthError(''); // Clear error if within range
      } else {
        setThreadDepthError('Thread Depth must be between 0 and 40.'); // Show error if out of range
      }
    } else {
      setThreadDepthError('Thread Depth must be a number.'); // Invalid input error
    }
  };
  
  const handleThreadDepthBlur = () => {
    const depth = parseFloat(threadDepth);
  
    // If the field is empty, clear the error
    if (threadDepth === '') {
      setThreadDepthError(''); // Clear error if the field is empty
      return;
    }
  
    // Validate if the input value is within the valid range (0-40)
    if (!validateThreadDepth(threadDepth)) {
      setThreadDepthError('Thread Depth must be between 0 and 40.');
    } else {
      setThreadDepthError(''); // Clear error if the value is valid
    }
  };
  
  
  



  const validateTyrePressure = (tyrePressure) => {
    const pressure = parseFloat(tyrePressure);
    return !isNaN(pressure) && pressure >= 0 && pressure <= 160;
  };
  
  const handleTyrePressureChange = (e) => {
    const inputValue = e.target.value;
    const pressure = parseFloat(inputValue);
  
    // Allow numeric input and validate range as the user types
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setTyrePressure(inputValue); // Allow any number to be typed
  
      // Check if the value is within the valid range (0-160)
      if (pressure >= 0 && pressure <= 160) {
        setTyrePressureError(''); // Clear error if within range
      } else {
        setTyrePressureError('Tyre Pressure must be between 0 and 160.'); // Show error if out of range
      }
    } else {
      setTyrePressureError('Tyre Pressure must be a number.'); // Invalid input error
    }
  };
  
  const handleTyrePressureBlur = () => {
    const pressure = parseFloat(tyrePressure);
  
    // If the field is empty, clear the error
    if (tyrePressure === '') {
      setTyrePressureError(''); // Clear error if the field is empty
      return;
    }
  
    // Validate if the input value is within the valid range (0-160)
    if (!validateTyrePressure(tyrePressure)) {
      setTyrePressureError('Tyre Pressure must be between 0 and 160.');
    } else {
      setTyrePressureError(''); // Clear error if the value is valid
    }
  };
  

  

  


  const handleVehicleTypeSelect = (value) => {
    setSelectedOption(value);
    setVehicleNo(value); // Set the prefix
  };
  
  




  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Clear previous error states
    setVehicleNoError('');
    setTireNoError('');
    setKmReadingError('');
    setThreadDepthError('');
    setTyrePressureError('');

    // Validation flags
    let hasError = false;

    // Validate vehicle number
    if (!validateVehicleNo(vehicleNo)) {
      setVehicleNoError('Vehicle number must be two letters followed by four digits.');
      hasError = true; // Set error flag
    }

    // Validate tire number
    if (!validateTireNo(tireNo)) {
      setTireNoError('Tire number must have two or three digits.');
      hasError = true; // Set error flag
    }

    // Validate other fields if necessary
    if (kmReading && !validateKmReading(kmReading)) {
      setKmReadingError('Km Reading must be a number.');
      hasError = true; // Set error flag
    }

    if (threadDepth && !validateThreadDepth(threadDepth)) {
      setThreadDepthError('Thread depth must be a number.');
      hasError = true; // Set error flag
    }

    if (tyrePressure && !validateTyrePressure(tyrePressure)) {
      setTyrePressureError('Tyre pressure must be a number.');
      hasError = true; // Set error flag
    }

    // Check for required fields
    if (!tireNo || !vehicleNo || !tyrePressure || !threadDepth || !selectedOption || !selectedOption1 || !selectedOption2 || !selectedOption3 || !kmReading) {
      alert('Please fill in all required fields');
      return;
    }

    // If there are any errors, show alert
    if (hasError) {
      alert('Recheck the invalid data');
      return;
    }

    // Proceed if no errors
    const enteredData = `
      Vehicle Type: ${selectedOption}\n
      Vehicle Number: ${vehicleNo}\n
      Tire Serial Number: ${tireNo}\n
      Km Reading: ${kmReading}\n
      Tire Status: ${selectedOption2}\n
      Tire Brand: ${selectedOption3}\n
      Tire Position: ${selectedOption1}\n
      Thread Depth: ${threadDepth}\n
      Date: ${Date}\n,
      Time: ${Time}\n,
      Air Pressure: ${tyrePressure}\n`;

    setEnteredData(enteredData);
    setShowModal(true);
};


  const handleModalConfirm = () => {
    const auth = getAuth();
    const user = auth.currentUser; // Get the current authenticated user
    
    if (user) {
  
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB');  // Formats date as dd/mm/yyyy
  
      // Reference in Firebase with the formatted date
      const userRef = ref(db, `TireData/${formattedDate.replace(/\//g, '-')}/${tireNo}`);
  
      // Set the data in Firebase
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
        Date: formattedDate,
        Time: Time,
        employee: employeeName,  // Store the employee's name 
      })
      .then(() => {
        window.alert('Data entered successfully!');
        setShowModal(false);
        window.location.reload();
      });
    } else {
      window.alert('No authenticated user found.');
    }
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
    { value: 'RT', label: 'Rubber Tire Granty Crane', imgSrc: '/images/vehicals/RTG.png' },
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
        <p className='vtype'><b>Choose your Vehicle Type</b></p>
        <br />
        <div className="vehicle-options">
          {vehicleOptions.map(option => (
            <div
              key={option.value}
              className={`vehicle-option ${selectedOption === option.value ? 'selected' : ''}`}
              onClick={() => {
                setSelectedOption(option.value);
                setVehicleNo(option.value); // Automatically set the vehicle type value as the beginning of the vehicle number
                setVehicleNoError(''); // Clear error message when a vehicle type is selected
              }}
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
                className={`textbox ${vehicleNoError ? 'error' : ''}`}
                id="vehicleNo"
                value={vehicleNo}
                onFocus={() => {
                  // Show error if the vehicle type has not been selected
                  if (!selectedOption) {
                    setVehicleNoError('Please select a vehicle type from the above list first.');
                  } else {
                    setVehicleNoError(''); // Clear error if a vehicle type is selected
                  }
                }}
                onChange={(e) => {
                  const newValue = e.target.value;

                  // If no vehicle type is selected, prevent typing and show an error
                  if (!selectedOption) {
                    setVehicleNoError('Please select a vehicle type from the above list first.');
                    return; // Prevent typing
                  }

                  // Check if the input starts with the selected vehicle type
                  if (newValue.startsWith(selectedOption)) {
                    setVehicleNo(newValue); // Set the input value if valid
                    setVehicleNoError(''); // Clear error if valid

                    // Validate vehicle number format while typing
                    if (!validateVehicleNo(newValue)) {
                      setVehicleNoError('Vehicle number must be two letters followed by four digits.');
                    } else {
                      setVehicleNoError(''); // Clear error if valid
                    }
                  } else {
                    // Immediately show an error if the input doesn't start with the selected vehicle type
                    setVehicleNoError(`Vehicle number must start with the selected vehicle type: ${selectedOption}`);
                  }
                }}
                onBlur={() => {
                  if (!selectedOption) {
                    setVehicleNoError('Please select a vehicle type from the above list first.');
                  } else if (!vehicleNo.startsWith(selectedOption)) {
                    setVehicleNoError('Vehicle number must start with the selected vehicle type.');
                  } else if (!validateVehicleNo(vehicleNo)) {
                    setVehicleNoError('Vehicle number must be two letters followed by four digits.');
                  } else {
                    setVehicleNoError(''); // Clear the error if everything is valid
                  }
                }}
              />
              {vehicleNoError && <p className="error-text">{vehicleNoError}</p>}


              </div>
              <br />
              <label htmlFor="tireNo" className="label">Tire Serial Number</label>
              <div className="">
              <input
                type="text"
                className={`textbox ${tireNoError ? 'error' : ''}`}
                id="tireNo"
                value={tireNo}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setTireNo(inputValue);
                  if (validateTireNo(inputValue)) {
                    setTireNoError('');
                  } else {
                    setTireNoError('Tire number cannot contain symbols.');
                  }
                }}
                onBlur={() => {
                  if (!validateTireNo(tireNo)) {
                    setTireNoError('Tire number cannot contain symbols.');
                  } else {
                    setTireNoError('');
                  }
                }}
              />
                {tireNoError && <p className="error-text">{tireNoError}</p>} 
              </div>
              <br />
              <label htmlFor="kmReading" className='label'>Km Reading</label>
              <div className="">
              <input
                type="text"
                className={`textbox ${kmReadingError ? 'error' : ''}`}
                id="kmReading"
                value={kmReading}
                onChange={handleKmReadingChange}
                onBlur={() => {
                  if (kmReading !== '' && !validateKmReading(kmReading)) {
                    setKmReadingError('Km Reading must be a number.');
                  } else {
                    setKmReadingError('');
                  }
                }}
              />
                {kmReadingError && <p className="error-text">{kmReadingError}</p>} 
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
                  className={`textbox ${threadDepthError ? 'error' : ''}`}
                  id="threadDepth"
                  value={threadDepth}
                  onChange={handleThreadDepthChange}
                  onBlur={handleThreadDepthBlur}
                />
                {threadDepthError && <p className="error-text">{threadDepthError}</p>} 
              </div>
              <br />
              <label htmlFor="tyrePressure" className='label'>Air Pressure (psi)</label>
              <div className="">
                <input
                  type="text"
                  className={`textbox ${tyrePressureError ? 'error' : ''}`}
                  id="tyrePressure"
                  value={tyrePressure}
                  onChange={handleTyrePressureChange}
                  onBlur={handleTyrePressureBlur}
                />
                {tyrePressureError && <p className="error-text">{tyrePressureError}</p>} 
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
              <br />
              <p>Employee Name: {employeeName}</p>
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
