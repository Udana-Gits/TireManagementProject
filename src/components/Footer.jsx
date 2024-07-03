import React from 'react';
import DateandTime from './DateandTime';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="bg-primary text-white mt-auto d-flex align-items-center">
        <div className="container text-center">
          <center><p></p></center>
          <center><DateandTime/></center>
          <center><p className="text-muted">Copyright © 2024 Pavara Tire Management System</p></center>
        </div>
      </footer>
    </div>
  );
};

export default Footer;