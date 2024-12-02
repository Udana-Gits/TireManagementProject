import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import './CSS/TireData.css';
import Modal from 'react-modal';

const TireData = ({ tireDataRef }) => {
  const [authuser, setAuthUser] = useState(null);
  const [tireData, setTireData] = useState([]);
  const [originalTireData, setOriginalTireData] = useState([]);
  const [tireNumber, settireNumber] = useState('');
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
        const tireDataArray = Object.keys(data).flatMap((date) =>
          Object.keys(data[date]).map((tireNo) => ({
            id: tireNo,
            ...data[date][tireNo],
          }))
        );
        setTireData(tireDataArray);
        setOriginalTireData(tireDataArray);
      }
    }, {
      onlyOnce: true,
    });
  }, []);

  const handleSearch = () => {
    if (tireNumber.trim() === '') {
      setDisplayTable(true);
      return;
    }

    const filteredData = originalTireData.filter((tire) => {
      const tireNo = tire.tireNo && typeof tire.tireNo === 'object' ? tire.tireNo.Value : tire.tireNo || '';
      return tireNo.toLowerCase() === tireNumber.toLowerCase();
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
    if (tyrePressure >= 140 && tyrePressure < 160) {
      return 'green';
    } else if (tyrePressure > 115 && tyrePressure < 140) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const getThreadDepthColor = (threadDepth) => {
    if (threadDepth >= 10 && threadDepth < 40) {
      return 'green';
    } else if (threadDepth >= 5 && threadDepth < 10) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const getTireStatus = (tyrePressure, threadDepth ) => {
    const tyrePressureColor = getTyrePressureColor(tyrePressure);
    const threadDepthColor = getThreadDepthColor(threadDepth);

    if (tyrePressureColor === 'red' || threadDepthColor === 'red') {
      return 'BAD';
    } else if (tyrePressureColor === 'orange' || threadDepthColor === 'orange') {
      return 'BETTER TO CHECK';
    } else {
      return 'GOOD';
    }
  };

  

  const ModalTable = () => {
    return (
      <Modal isOpen={isModalOpen} onRequestClose={() => {
        setIsModalOpen(false);
        // Show search container again when modal closes
        document.querySelector('.searchcontainer').style.visibility = 'visible';
      }} className="custom-modal-Tire">

        <h2 className='table-title'>Tire Details of Your Vehicle</h2>
        {noDataFound ? (
        <div className="nodata-centered">
          <p>No data found for the given tire number.</p>
        </div>
      ) : (
        <table className="">
          <thead>
            <tr>
              <th className='tclm1'>Date</th>
              <th className='tclm2'>Vehicle Number</th>
              <th className='tclm1'>Tire Position</th>
              <th className='tclm2'>Tire Pressure</th>
              <th className='tclm1'>Thread Depth</th>
              <th className='tclm2'>Tire Status</th>
              <th className='tclm1'>Employee</th>
            </tr>
          </thead>
          <tbody>
            {tireData.map((tire) => (
              <tr key={tire.id}>
                <td className='tclm3'>{tire.Date}</td>
                <td className='tclm4'>{tire.vehicleNo}</td>
                <td className='tclm3'>{tire.TirePosition}</td>
                <td className='tclm4' style={{ color: getTyrePressureColor(tire.tyrePressure) }}>{tire.tyrePressure}</td>
                <td className='tclm3' style={{ color: getThreadDepthColor(tire.threadDepth) }}>{tire.threadDepth}</td>
                <td className='tclm4'>{tire.tirestatus}</td>
                <td className='tclm3'>{tire.employee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </Modal>
    );
  };

  return (
    <div>
      <div className="tire-search-bg">
        {authuser ? (
          <div className="">
            <div className="searchcontainer">
              <div className="searchbox">
                <div className="input-container">
                  <label htmlFor="tireNo" className="Tirelabel">
                    Tire Number
                  </label>
                  <input
                    type="text"
                    className="tirenumberfield"
                    id="tireNo"
                    placeholder="Eg: XYZ1234"
                    value={tireNumber}
                    onChange={(e) => settireNumber(e.target.value)}
                  />
                </div>
                <div className="button-container">
                  <button onClick={handleSearch} className="searchbutton1">
                    Search
                  </button>
                </div>
              </div>
            </div>
            
            <ModalTable />
          </div>
        ) : (
          <p>Please sign in to access Driver Main.</p>
        )}
      </div>
    </div>
  );
};

export default TireData;
