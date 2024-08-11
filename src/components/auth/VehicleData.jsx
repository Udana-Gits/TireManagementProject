import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import './CSS/VehicleData.css';
import Modal from 'react-modal';

const VehicleData = ({ tireDataRef }) => {
  const [authuser, setAuthUser] = useState(null);
  const [tireData, setTireData] = useState([]);
  const [originalTireData, setOriginalTireData] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [noDataFound, setNoDataFound] = useState(false);
  const navigate = useNavigate();
  const [displayTable, setDisplayTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => listen();
  }, []);

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'TireData');
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tireDataArray = [];
        Object.keys(data).forEach(dateKey => {
          Object.keys(data[dateKey]).forEach(tireNo => {
            tireDataArray.push({
              id: tireNo,
              ...data[dateKey][tireNo]
            });
          });
        });
        setTireData(tireDataArray);
        setOriginalTireData(tireDataArray);
      }
    }, {
      onlyOnce: true,
    });
  }, []);

  // Handle Search function with search container visibility
  const handleSearch = () => {
    if (vehicleNumber.trim() === '') {
      setDisplayTable(true);
      return;
    }

    const filteredData = originalTireData.filter((tire) => {
      const vehicleNo = tire.vehicleNo || '';
      return vehicleNo.toLowerCase() === vehicleNumber.toLowerCase();
    });

    if (filteredData.length === 0) {
      setNoDataFound(true);
    } else {
      setNoDataFound(false);
    }

    setTireData(filteredData);
    setIsModalOpen(true);

    // Hide search container after modal opens
    document.querySelector('.searchcontainer').style.visibility = 'hidden';
  };

  const getTyrePressureColor = (tyrePressure) => {
    if (tyrePressure >= 140 && tyrePressure < 150) {
      return 'green';
    } else if (tyrePressure > 135 && tyrePressure < 140) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const getThreadDepthColor = (threadDepth) => {
    if (threadDepth >= 120 && threadDepth < 125) {
      return 'green';
    } else if (threadDepth >= 115 && threadDepth < 120) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const getTireStatus = (tyrePressure, threadDepth) => {
    const tyrePressureColor = getTyrePressureColor(tyrePressure);
    const threadDepthColor = getThreadDepthColor(threadDepth);

    if (tyrePressureColor === 'red' || threadDepthColor === 'red') {
      return 'BAD';
    } else if (tyrePressureColor === 'yellow' || threadDepthColor === 'yellow') {
      return 'BETTER TO CHECK';
    } else {
      return 'GOOD';
    }
  };

  const backhandle = () => {
    navigate(-1);
  };

  const ModalTable = () => {
    return (
      <Modal isOpen={isModalOpen} onRequestClose={() => {
        setIsModalOpen(false);
        // Show search container again when modal closes
        document.querySelector('.searchcontainer').style.visibility = 'visible';
      }} className="custom-modal">

        < h2 className='table-title' > Tire Details of Your Vehicale</h2 >
        <table className="">
          <thead>
            <tr>
              <th className='clm1'>Tire Number</th>
              <th className='clm2'>Tire Position</th>
              <th className='clm1'>Tire Pressure</th>
              <th className='clm2'>Thread Depth</th>
              <th className='clm1'>Tire Status</th>
            </tr>
          </thead>
          <tbody>
            {tireData.map((tire) => (
              <tr key={tire.id}>
                <td className='clm3'>{tire.tireNo}</td>
                <td className='clm4'>{tire.TirePosition}</td>
                <td className='clm3' style={{ color: getTyrePressureColor(tire.tyrePressure) }}>{tire.tyrePressure}</td>
                <td className='clm4' style={{ color: getThreadDepthColor(tire.threadDepth) }}>{tire.threadDepth}</td>
                <td className='clm3'>{getTireStatus(tire.tyrePressure, tire.threadDepth)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal >
    );
  };
  return (
    <div>
      <div className="vehicle-search-bg">
        {authuser ? (
          <div className="">
            <div className="searchcontainer">
              <div className="searchbox">
                <div className="input-container">
                  <label htmlFor="VehicleNo" className="Vehiclelabel">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    className="vehicalenumberfield"
                    id="VehicleNo"
                    placeholder="Eg: V0006"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                  />
                </div>
                <div className="button-container">
                  <button onClick={handleSearch} className="searchbutton1">
                    Search
                  </button>
                </div>
              </div>
            </div>
            {noDataFound && <p>No data found for the entered Tire Number.</p>}
            <ModalTable />
          </div>
        ) : (
          <p>Please log in to view your tire data.</p>
        )}
      </div>
    </div>
  );
};

export default VehicleData;
