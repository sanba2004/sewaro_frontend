import React from 'react';

const Navbar = ({ onLoginClick, onHomeClick, menuItems }) => {
  return (
    <header className="menu-bar">
      <div className="menu-container">
        
        {/* Clicking the Logo now takes you Home */}
        <div className="menu-logo" onClick={onHomeClick} style={{cursor: 'pointer'}}>
          <img src="/logo.png" alt="Sewa Logistics Logo" className="logo-image" />
          <span className="text">SEWA LOGISTICS</span>
        </div>

        <nav className="menu-links">
          {menuItems.map((item) => (
            <button 
              key={item} 
              className="menu-item-btn"
              onClick={item === "Home" ? onHomeClick : undefined} // If button is "Home", trigger onHomeClick
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="menu-actions">
          <button className="login-btn" onClick={onLoginClick}>
            Operator Login
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;