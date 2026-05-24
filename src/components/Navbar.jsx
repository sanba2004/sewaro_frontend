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
import React from 'react';

const Navbar = ({ onLoginClick, onHomeClick, onScannerClick, onRequestQuoteClick, menuItems }) => {
  
  // Handle routing for different menu button clicks
  const handleMenuClick = (item) => {
    if (item === "Home") {
      onHomeClick();
    } else if (item === "Request a quote") {
      if (onRequestQuoteClick) onRequestQuoteClick();
    }
  };

  return (
    <header className="menu-bar">
      <div className="menu-container">
        
        {/* Clicking the Logo takes you Home */}
        <div className="menu-logo" onClick={onHomeClick} style={{cursor: 'pointer'}}>
          <img src="/logo.png" alt="Sewa Logistics Logo" className="logo-image" />
          <span className="text">SEWA LOGISTICS</span>
        </div>

        <nav className="menu-links" style={{ display: 'flex', alignItems: 'center' }}>
          {menuItems.map((item) => (
            <React.Fragment key={item}>
              <button 
                className="menu-item-btn"
                onClick={() => handleMenuClick(item)}
              >
                {item}
              </button>

              {/* ✅ FIX: Changed condition to match "Request a quote" from your App.jsx array */}
              {item === "Request a quote" && (
                <button 
                  className="scanner-nav-btn"
                  onClick={onScannerClick}
                  title="Scan Tracking Code or Invoice Barcode"
                  style={{
                    background: '#e0a800',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    marginLeft: '8px',
                    marginRight: '12px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: '13px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#c69500'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#e0a800'}
                >
                  📷 <span>Scan Code</span>
                </button>
              )}
            </React.Fragment>
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