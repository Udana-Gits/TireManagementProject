import React from 'react';
import './auth/CSS/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="">
        <div>
          <img
            src="/images/components/header.png"
            alt="Pavara Tire Management System"
            className='headerimage'
          />
          
        </div>
      </div>
    </header>
  );
};

export default Header;