import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import './CSS/TirePerformance.css';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TirePerformance = () => {
  const [authUser, setAuthUser] = useState(null);
  const [tireData, setTireData] = useState([]);
  const [originalTireData, setOriginalTireData] = useState([]);
  const [tireNumber1, setTireNumber1] = useState('');
  const [tireNumber2, setTireNumber2] = useState('');
  const [noDataFound, setNoDataFound] = useState(false);
  const navigate = useNavigate();
  const [displayCharts, setDisplayCharts] = useState(false);

  const [chartData, setChartData] = useState({
    labels: [],
    tirePressureDataset: [],
    threadDepthDataset: [],
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
    return onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tireDataArray = Object.keys(data).flatMap((date) =>
            Object.keys(data[date]).map((tireNo) => ({
              id: tireNo,
              dateTime: new Date(data[date][tireNo].dateTime),
              ...data[date][tireNo],
            }))
          );
          setTireData(tireDataArray);
          setOriginalTireData(tireDataArray);
        }
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  useEffect(() => {
    if (tireData.length > 0) {
      const sortedTireData = [...tireData].sort(
        (a, b) => a.dateTime - b.dateTime
      );

      const labels = sortedTireData.map((tire) => tire.dateTime.toLocaleString());
      const tirePressureDataset = sortedTireData.map((tire) => tire.tyrePressure);
      const threadDepthDataset = sortedTireData.map((tire) => tire.threadDepth);

      setChartData({
        labels,
        tirePressureDataset,
        threadDepthDataset,
      });
    }
  }, [tireData]);

  const handleAnalyze = () => {
    if (tireNumber1.trim() === '' && tireNumber2.trim() === '') {
      setDisplayCharts(true);
      return;
    }

    const filterTireData = (tireNo) =>
      originalTireData.filter((tire) => {
        const tireNoValue =
          tire.tireNo && typeof tire.tireNo === 'object' ? tire.tireNo.Value : tire.tireNo || '';
        return tireNoValue.toLowerCase() === tireNo.toLowerCase();
      });

    const filteredData1 = filterTireData(tireNumber1);
    const filteredData2 =
      tireNumber2.trim() !== '' ? filterTireData(tireNumber2) : [];

    if (filteredData1.length === 0 && filteredData2.length === 0) {
      setNoDataFound(true);
    } else {
      setNoDataFound(false);

      const combinedData = [...filteredData1, ...filteredData2].sort(
        (a, b) => a.dateTime - b.dateTime
      );

      const labels = combinedData.map((tire) => tire.dateTime.toLocaleString());

      const tirePressureDataset = [
        {
          label: tireNumber1 || 'Tire 1',
          data: filteredData1.map((tire) => tire.tyrePressure),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ];

      const threadDepthDataset = [
        {
          label: tireNumber1 || 'Tire 1',
          data: filteredData1.map((tire) => tire.threadDepth),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: false,
        },
      ];

      if (filteredData2.length > 0) {
        tirePressureDataset.push({
          label: tireNumber2 || 'Tire 2',
          data: filteredData2.map((tire) => tire.tyrePressure),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        });

        threadDepthDataset.push({
          label: tireNumber2 || 'Tire 2',
          data: filteredData2.map((tire) => tire.threadDepth),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 2,
          fill: false,
        });
      }

      setChartData({
        labels,
        tirePressureDataset,
        threadDepthDataset,
      });
      setDisplayCharts(true);
    }
  };

  return (
    <div>
      <div className="">
        <br />
        <div></div>
        {authUser ? (
          <div>
            <br />
            <div>
              <div className="searchcontainer">
                <div className="inputbox">
                  <div className="">
                    <label htmlFor="tireNo1" className="Driverlabel">
                      Tire Number 1
                    </label>
                    <br />
                    <br />
                    <input
                      type="text"
                      className="vehicalenumberfield"
                      id="tireNo1"
                      placeholder="Eg: T01"
                      value={tireNumber1}
                      onChange={(e) => setTireNumber1(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="tireNo2" className="Driverlabel">
                      Tire Number 2 (Optional)
                    </label>
                    <br />
                    <br />
                    <input
                      type="text"
                      className="vehicalenumberfield"
                      id="tireNo2"
                      placeholder="Eg: T02"
                      value={tireNumber2}
                      onChange={(e) => setTireNumber2(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <br />
                  <br />
                  <button onClick={handleAnalyze} className="searchbutton">
                    Analyze
                  </button>
                  <br />
                  <br />
                </div>
              </div>
              {noDataFound && <p>No data found for the entered Tire Number(s).</p>}
              {displayCharts && (
                <div className="chart-row">
                  <div className="chart-container">
                    <Bar
                      data={{
                        labels: chartData.labels,
                        datasets: chartData.tirePressureDataset,
                      }}
                      options={{ responsive: true }}
                    />
                  </div>
                  <div className="chart-container">
                    <Line
                      data={{
                        labels: chartData.labels,
                        datasets: chartData.threadDepthDataset,
                      }}
                      options={{ responsive: true }}
                    />
                  </div>
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
