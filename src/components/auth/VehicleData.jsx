import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import './CSS/DriverMain.css';
import Modal from 'react-modal';

const DriverMain = ({ tireDataRef }) => {
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
    const dbRef = ref(getDatabase(), tireDataRef);
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const tireDataObject = data.TireData || {};
      const tireDataArray = Object.keys(tireDataObject).map((key) => ({
        id: key,
        ...tireDataObject[key],
      }));
      setTireData(tireDataArray);
      setOriginalTireData(tireDataArray);
    }, {
      onlyOnce: true,
    });
  }, [tireDataRef]);  


  const handleSearch = () => {
    if (vehicleNumber.trim() === '') {
      setDisplayTable(true);
      return;
    }

    const filteredData = originalTireData.filter((tire) => {
      const vehicleNo = tire.vehicleNo && typeof tire.vehicleNo === 'object' ? tire.vehicleNo.Value : tire.vehicleNo || '';
      return vehicleNo.toLowerCase() === vehicleNumber.toLowerCase();
    });

    if (filteredData.length === 0) {
      setNoDataFound(true);
    } else {
      setNoDataFound(false);
    }

    setTireData(filteredData);
    setIsModalOpen(true);
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
    } else if (tyrePressureColor === 'yellow' || threadDepthColor === 'yello') {
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
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="custom-modal">
        <h2>Tire Details of Your Vehicale</h2>
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
                <td  className='clm3' style={{ color: getTyrePressureColor(tire.tyrePressure) }}>{tire.tyrePressure}</td>
                <td className='clm4' style={{ color: getThreadDepthColor(tire.threadDepth) }}>{tire.threadDepth}</td>
                <td className='clm3'>{getTireStatus(tire.tyrePressure, tire.threadDepth)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    );
  };

  return (
    <div>
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
        <div>
        </div>
        {authuser? (
          <div>
            <br />
            <div>
              <div className="searchcontainer">
                <div className="">
                  <label htmlFor="VehicleNo" className="Driverlabel">
                    Vehicle Number
                  </label>
                  <br />
                  <br />
                  <input
                    type="text"
                    className="vehicalenumberfield"
                    id="VehicleNo"
                    placeholder="Eg: V0006"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                  />
                </div>
                <div>
                  <br />
                  <br />
                  <button onClick={handleSearch} className="searchbutton">
                    Search
                  </button> 
                  <br />
                  <br />
                </div>
              </div>
              {noDataFound && <p>No data found for the entered vehicle number.</p>}
              <ModalTable />
            </div>
          </div>
        ) : (
          <p>Please sign in to access Driver Main.</p>
        )}
      </div>
    </div>
  );
};

export default DriverMain;