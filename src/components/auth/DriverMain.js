import React, { useEffect, useState } from 'react'; // Import React and hooks
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import onAuthStateChanged and signOut from the 'firebase/auth' module
import { auth } from './firebase'; // Import 'auth' from your firebase module (assuming you have a firebase.js file)
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from 'react-router-dom'
import { getDatabase, ref, onValue } from 'firebase/database'; // Import getDatabase, ref, and onValue from the 'firebase/database' module


export function DriverMain({ tireDataRef }) {
  const [authuser, setAuthUser] = useState(null);
  const [tireData, setTireData] = useState([]);
  const [originalTireData, setOriginalTireData] = useState([]); // New state to store original tire data
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [noDataFound, setNoDataFound] = useState(false);
  const navigate = useNavigate();
  const [displayTable, setDisplayTable]= useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => listen(); // Cleanup the listener when the component unmounts
  }, []);

  useEffect(() => {
    const dbRef = ref(getDatabase(), tireDataRef);
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      // Extract the tire data from the fetched object
      const tireDataObject = data.TireData || {};
      // Parse the tire data object into an array
      const tireDataArray = Object.keys(tireDataObject).map((key) => ({
        id: key,
        ...tireDataObject[key],
      }));
      // Update both original and filtered tire data states
      setTireData(tireDataArray);
      setOriginalTireData(tireDataArray);
    }, {
      onlyOnce: true,
    });
  }, [tireDataRef]);

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
        // Redirect to login page after signout
        navigate('/login');
      })
    .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

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
    setDisplayTable(true);
  };

  return (
    <div>
      <br />
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h1 className="ms-3">Welcome to Driver Main</h1>
        </div>
        {authuser ? (
          <div>
            <button onClick={handleSignOut} className="btn btn-primary me-5">Sign Out</button>
          </div>
        ) : (
          <p>Signed out</p>
        )}
      </div>
      <div>
        {authuser ? (
          <div>
            <p className="ms-3">Signed In as {authuser.email}</p>
            <br />
            <div>
              <div className="form-floating ms-3">
                <input type="text" className="form-control" id="VehicleNo" placeholder="VehicleNo" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} style={{ width: '200px' }} />
                <label htmlFor="VehicleNo">Vehicle Number</label>
              </div>
              <div>
                <br /><br />
                <button onClick={handleSearch} className="btn btn-primary ms-3">Search</button>
                <br />
                <br />
              </div>
              {noDataFound && <p>No data found for the entered vehicle number.</p>}
              {displayTable && (
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Tire Number</th>
                      <th>Tyre Pressure</th>
                      <th>Thread Depth</th>
                      <th>Tire Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tireData.map((tire) => (
                      <tr key={tire.id}>
                        <td>{tire.tireNo}</td>
                        <td>{tire.tyrePressure}</td>
                        <td>{tire.threadDepth}</td>
                        <td>{tire.tireStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          <p>Please sign in to access Driver Main.</p>
        )}
      </div>
    </div>
  );
}

export default DriverMain;