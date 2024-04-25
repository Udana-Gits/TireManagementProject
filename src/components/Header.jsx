import React from 'react';

const Header = () => {
  return (
    <header className="header bg-primary text-white d-flex align-items-center">
      <div className="container">
        <div className="d-flex align-items-center">
          <img
            src="/images/A.png"
            alt="Pavara Tire Management System"
            className="img-fluid"
            style={{ width: '200px', height: 'auto' }}
          />
          <h1 className="text-center display-4 ml-3">Pavara Tire Management System</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;