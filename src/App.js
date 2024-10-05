import './components/auth/firebase';
import './App.css';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import AdminHome from './components/auth/AdminHome';
import Tire from './components/auth/Tire';
import Vehicle from './components/auth/Vehicle';
import Administrative from './components/auth/Administrative';
import DriverMain from './components/auth/DriverMain';
import EmployeeMain from './components/auth/EmployeeMain';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Enterdata from './components/auth/Enterdata';
import ProfileEdit from './components/auth/ProfileEdit';
import TireData from './components/auth/TireData';
import TireDataAdmin from './components/auth/TireDataAdmin';
import Navbar from './components/auth/NavBar';
import LayOut from './components/LayOut';
import VehicleData from './components/auth/VehicleData';
import AccountManage from './components/auth/AccountManage';
import TirePerformance from './components/auth/TirePerformance';
import EnteroldTireData from './components/auth/EnteroldTireData';
import { generateToken } from './components/auth/firebase';
import { useEffect } from 'react';
import PrivateRoute from './components/auth/PrivateRoute';  // Import PrivateRoute
import SessionTimeoutComponent from './components/auth/SessionTimeoutComponent'
import AuthProvider from './components/auth/AuthProvider';


function App() {

  

  
  return (
    <AuthProvider>
    <div className="App">
      <BrowserRouter>

      <SessionTimeoutComponent>


        <Routes>
          {/* Public Routes */}
          <Route index element={<LogIn />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<LayOut><SignUp /></LayOut>} />

          {/* Protected Routes */}
          <Route
            path='/adminhome'
            element={
              <PrivateRoute>
                <LayOut><AdminHome /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/employeehome'
            element={
              <PrivateRoute>
                <LayOut><EmployeeMain /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/tire'
            element={
              <PrivateRoute>
                <LayOut><Tire /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/vehicle'
            element={
              <PrivateRoute>
                <LayOut><Vehicle /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/administrative'
            element={
              <PrivateRoute>
                <LayOut><Administrative /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/driverhome'
            element={
              <PrivateRoute>
                <LayOut><DriverMain /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/enterdata'
            element={
              <PrivateRoute>
                <LayOut><Enterdata /></LayOut>
              </PrivateRoute>
            }
          />
          
          <Route
            path='/profileedit'
            element={
              <PrivateRoute>
                <LayOut><ProfileEdit /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/tiredata'
            element={
              <PrivateRoute>
                <LayOut><TireData /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/tiredataadmin'
            element={
              <PrivateRoute>
                <LayOut><TireDataAdmin /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/vehicledata'
            element={
              <PrivateRoute>
                <LayOut><VehicleData /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/accountmanage'
            element={
              <PrivateRoute>
                <LayOut><AccountManage /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/tireperformance'
            element={
              <PrivateRoute>
                <LayOut><TirePerformance /></LayOut>
              </PrivateRoute>
            }
          />
          <Route
            path='/enteroldtiredata'
            element={
              <PrivateRoute>
                <LayOut><EnteroldTireData /></LayOut>
              </PrivateRoute>
            }
          />
        </Routes>
        </SessionTimeoutComponent>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );

  
}

export default App;
