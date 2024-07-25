import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import './CSS/TirePerformance.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const TirePerformance = ({ tireDataRef }) => {
  const [authUser, setAuthUser] = useState(null);
  const [tireData, setTireData] = useState([]);
  const [originalTireData, setOriginalTireData] = useState([]);
  const [tireNumber, setTireNumber] = useState('');
  const [noDataFound, setNoDataFound] = useState(false);
  const navigate = useNavigate();
  const [displayTable, setDisplayTable] = useState(false);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tire Pressure',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Thread Depth',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

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

  useEffect(() => {
    if (tireData.length > 0) {
      const labels = tireData.map((tire) => tire.dateTime);
      const tirePressureData = tireData.map((tire) => tire.tyrePressure);
      const threadDepthData = tireData.map((tire) => tire.threadDepth);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Tire Pressure',
            data: tirePressureData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Thread Depth',
            data: threadDepthData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [tireData]);

  const handleSearch = () => {
    if (tireNumber.trim() === '') {
      setDisplayTable(true);
      return;
    }

    const filteredData = originalTireData.filter((tire) => {
      const tireNo = tire.tireNo && typeof tire.tireNo === 'object'? tire.tireNo.Value : tire.tireNo || '';
      return tireNo.toLowerCase() === tireNumber.toLowerCase();
    });

    if (filteredData.length === 0) {
      setNoDataFound(true);
    } else {
      setNoDataFound(false);
    }

    setTireData(filteredData);
    setDisplayTable(true);
  };

  const backhandle = () => {
    navigate(-1);
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
        {authUser ? (
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
                    onChange={(e) => setTireNumber(e.target.value)}
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
              {displayTable && (
                <div>
                  <Bar data={chartData} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Please sign in to access Driver Main.</p>
        )}
      </div>
    </div>
  );
};

export default TirePerformance;
