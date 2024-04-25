import React from 'react';
import DateandTime from './DateandTime';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer fixed-bottom bg-primary text-white">
      <div className="container text-center">
        <center><p></p></center>
      <center><DateandTime/></center>
      <center><p className="text-muted">Copyright © 2024 Pavara Tire Management System</p></center>
      </div>
    </footer>
  );
};

export default Footer;