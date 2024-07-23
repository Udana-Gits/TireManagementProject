//App.js
import './components/auth/firebase';
import './App.css';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import AdminHome from './components/auth/AdminHome';
import DriverMain from './components/auth/DriverMain';
import EmployeeMain from './components/auth/EmployeeMain';
import {BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Enterdata from './components/auth/Enterdata';
import ProfileEdit from './components/auth/ProfileEdit' ;
import TireData from './components/auth/TireData' ;
import Navbar from './components/auth/NavBar';
import LayOut from './components/LayOut';
import VehicleData from './components/auth/VehicleData' ;
import AccountManage from './components/auth/AccountManage';





function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route index element={<SignUp/>}/>
          <Route path='/signup' element={<LayOut><SignUp/></LayOut>} />
          <Route index element={<AdminHome/>}/>
          <Route path='/adminhome' element={<LayOut><AdminHome /></LayOut>} />
          <Route index element={<EmployeeMain/>}/>
          <Route path='/emplyeehome' element={<LayOut><EmployeeMain /></LayOut>} />
          <Route index element={<DriverMain/>}/>
          <Route path='/driverhome' element={<LayOut><DriverMain /></LayOut>} />
          <Route index element={<Enterdata/>}/>
          <Route path='/enterdata' element={<LayOut><Enterdata /></LayOut>} />
          <Route index element={<ProfileEdit/>}/>
          <Route path='/profileedit' element={<LayOut><ProfileEdit /></LayOut>} />
          <Route index element={<Navbar/>}/>
          <Route path='/navbar' element={<LayOut><Navbar /></LayOut>} />
          <Route index element={<TireData/>}/>
          <Route path='/tiredata' element={<LayOut><TireData /></LayOut>} />
          <Route index element={<VehicleData/>}/>
          <Route path='/vehicledata' element={<LayOut><VehicleData /></LayOut>} />
          <Route index element={<AccountManage/>}/>
          <Route path='/accountmanage' element={<LayOut><AccountManage /></LayOut>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;