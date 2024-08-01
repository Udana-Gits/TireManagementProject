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
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="custom-modal">
        <h2>Tire Details of Your Vehicle</h2>
        <table className="">
          <thead>
            <tr>
              <th className='clm1'>Date</th>
              <th className='clm2'>Vehicle Number</th>
              <th className='clm1'>Tire Position</th>
              <th className='clm2'>Tire Pressure</th>
              <th className='clm1'>Thread Depth</th>
              <th className='clm2'>Tire Status</th>
            </tr>
          </thead>
          <tbody>
            {tireData.map((tire) => (
              <tr key={tire.id}>
                <td className='clm3'>{tire.dateTime}</td>
                <td className='clm4'>{tire.vehicleNo}</td>
                <td className='clm3'>{tire.TirePosition}</td>
                <td className='clm4' style={{ color: getTyrePressureColor(tire.tyrePressure) }}>{tire.tyrePressure}</td>
                <td className='clm3' style={{ color: getThreadDepthColor(tire.threadDepth) }}>{tire.threadDepth}</td>
                <td className='clm4'>{getTireStatus(tire.tyrePressure, tire.threadDepth)}</td>
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
        {authuser ? (
          <div>
            <br />
            <div>
              <div className="searchcontainer">
                <div className="">
                  <label htmlFor="tireNo" className="Driverlabel">
                    Tire Number
                  </label>
                  <br />
                  <br />
                  <input
                    type="text"
                    className="vehicalenumberfield"
                    id="tireNo"
                    placeholder="Eg: T01"
                    value={tireNumber}
                    onChange={(e) => settireNumber(e.target.value)}
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
              {noDataFound && <p>No data found for the entered Tire Number.</p>}
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

export default TireData;
