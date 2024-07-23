import React from 'react';
import DateandTime from './DateandTime';
import './auth/CSS/Footer.css';

const Footer = () => {
  return (
    <div className="">
      <footer className="footer">
        <div >
          <div className='timer'>
            <br />
            <center><DateandTime /></center>
          </div>
          <center><p className="footercomponent">Copyright © 2024 TireOptiTrack (Pavara Tire Management System)</p></center>
        </div>
      </footer>
    </div>
  );
};

export default Footer;