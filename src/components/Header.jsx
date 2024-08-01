import React from 'react';
import './auth/CSS/Header.css';

const Header = ({ pageTitle }) => {
  return (
    <header className="header">
      <div className="header-container">
        <img
          src="/images/components/header.png"
          alt="Pavara Tire Management System"
          className='headerimage'
        />
        <h2 className='header-heading'>{pageTitle}</h2>
      </div>
    </header>
  );
};

export default Header;