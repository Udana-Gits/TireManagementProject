// Layout.js
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  let pageTitle = '';

  switch (location.pathname) {
    case '/adminhome':
      pageTitle = 'Admin Home Page';
      break;

    case '/emplyeehome':
      pageTitle = 'Employee Home Page';
      break;

    case '/driverhome':
      pageTitle = 'Driver Home Page';
      break;

    case '/enterdata':
      break;

    case '/profileedit':
      pageTitle = 'Edit Profile';
      break;

    case '/tiredata':
      pageTitle = 'View TireData';
      break;

    case '/signup':
      pageTitle = 'Add New User';
      break;
    
    case '/vehicledata':
        pageTitle = 'Vehicle Information';
        break;
    
    case '/accountmanage':
        pageTitle = 'User Account Management';
        break;
    
    case '/tireperformance':
        pageTitle = 'Tire Performance';
        break;

    default:
      pageTitle = 'Unknown Page';
  }
  
  if (location.pathname === '/login') {
    return children;
  }

  return (
    <>
      <Header pageTitle={pageTitle} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;