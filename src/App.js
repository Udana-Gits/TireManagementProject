//App.js
import logo from './logo.svg';
import './App.css';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import AdminHome from './components/auth/AdminHome';
import DriverMain from './components/auth/DriverMain';
import EmployeeMain from './components/auth/EmployeeMain';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Enterdata from './components/auth/Enterdata';
import Footer from './components/Footer';
import Header from './components/Header';




function App() {
  return (
    <div className="App">
              <Header/>
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route index element={<SignUp/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route index element={<AdminHome/>}/>
          <Route path='/adminhome' element={<AdminHome/>}/>
          <Route index element={<EmployeeMain/>}/>
          <Route path='/emplyeehome' element={<EmployeeMain/>}/>
          <Route index element={<DriverMain/>}/>
          <Route path='/driverhome' element={<DriverMain/>}/>
          <Route index element={<DriverMain/>}/>
          <Route path='/enterdata' element={<Enterdata/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
    
  );
}

export default App;