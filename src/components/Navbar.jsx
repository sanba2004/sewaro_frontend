// import React from 'react';

// const Navbar = ({ onLoginClick, onHomeClick, onScannerClick, menuItems }) => {
//   return (
//     <header className="menu-bar">
//       <div className="menu-container">
        
//         {/* Clicking the Logo takes you Home */}
//         <div className="menu-logo" onClick={onHomeClick} style={{cursor: 'pointer'}}>
//           <img src="/logo.png" alt="Sewa Logistics Logo" className="logo-image" />
//           <span className="text">SEWA LOGISTICS</span>
//         </div>

//         <nav className="menu-links" style={{ display: 'flex', alignItems: 'center' }}>
//           {menuItems.map((item) => (
//             <React.Fragment key={item}>
//               <button 
//                 className="menu-item-btn"
//                 onClick={item === "Home" ? onHomeClick : undefined}
//               >
//                 {item}
//               </button>

//               {/* 📷 Inject the Scanner Icon right on the right side of Rates */}
//               {item === "Rates" && (
//                 <button 
//                   className="scanner-nav-btn"
//                   onClick={onScannerClick}
//                   title="Scan Tracking Code or Invoice Barcode"
//                   style={{
//                     background: '#e0a800',
//                     border: 'none',
//                     padding: '6px 12px',
//                     borderRadius: '4px',
//                     marginLeft: '8px',
//                     marginRight: '12px',
//                     cursor: 'pointer',
//                     display: 'inline-flex',
//                     alignItems: 'center',
//                     gap: '6px',
//                     fontWeight: 'bold',
//                     color: '#000',
//                     fontSize: '13px',
//                     transition: 'background 0.2s ease'
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.background = '#c69500'}
//                   onMouseOut={(e) => e.currentTarget.style.background = '#e0a800'}
//                 >
//                   📷 <span>Scan Code</span>
//                 </button>
//               )}
//             </React.Fragment>
//           ))}
//         </nav>

//         <div className="menu-actions">
//           <button className="login-btn" onClick={onLoginClick}>
//             Operator Login
//           </button>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import '/src/styles/Navbar.css';

const Navbar = ({ onLoginClick, onHomeClick, onScannerClick, onRequestQuoteClick, onCustomerServiceClick, menuItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   
  const handleMenuClick = (item) => {
    setIsMobileMenuOpen(false); // Auto-dismiss drawer layout on routing
    
    if (item === "Home") {
      onHomeClick();
    } else if (item === "Request a quote") {
      if (onRequestQuoteClick) onRequestQuoteClick();
    } else if (item === "Customer Service") {
      if (onCustomerServiceClick) onCustomerServiceClick();
    }
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    onHomeClick();
  };

  return (
    <header className="menu-bar">
      <div className="menu-container">
        
        {/* Branding Logo Block */}
        <div className="menu-logo" onClick={handleLogoClick}>
          <img src="/logo.png" alt="Sewa Logistics Logo" className="logo-image" />
          <span className="text">SEWA LOGISTICS</span>
        </div>

        {/* 🍔 Hamburger Trigger Icon */}
        <button 
          className="hamburger-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* 📱 Mobile Menu Navigation Drawer */}
        {/* Appends 'open' class dynamically when state is true */}
        <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="menu-links">
            {menuItems.map((item) => (
              <React.Fragment key={item}>
                <button 
                  className="menu-item-btn"
                  onClick={() => handleMenuClick(item)}
                >
                  {item}
                </button>

                {item === "Request a quote" && (
                  <button 
                    className="scanner-nav-btn"
                    onClick={() => { setIsMobileMenuOpen(false); onScannerClick(); }}
                    title="Scan Tracking Code or Invoice Barcode"
                  >
                    📷 <span>Scan Code</span>
                  </button>
                )}
              </React.Fragment>
            ))}
            
            {/* CTA Login Action */}
            <div className="menu-actions">
              <button className="login-btn" onClick={() => { setIsMobileMenuOpen(false); onLoginClick(); }}>
                 Login
              </button>
            </div>
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Navbar;