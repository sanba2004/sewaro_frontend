
// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import LoginPage from './LoginPage'; 
// import Navbar from './Navbar';       
// import ShipmentStepper from './ShipmentStepper';
// import Dashboard from './Dashboard';
// import Register from './Register';
// import VerifyOTP from './VerifyOTP';
// import SuccessModal from './SuccessModal';

// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authMode, setAuthMode] = useState('login'); 
//   const [tempEmail, setTempEmail] = useState(''); 
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [userRole, setUserRole] = useState(null); // 'admin', 'agent', or 'customer'
//   const [currentUser, setCurrentUser] = useState(null); // Holds { id, name, role }
//   const [isLoadingCache, setIsLoadingCache] = useState(true); 

//   const [registerFormData, setRegisterFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });

//   const menuItems = ["Home", "Track Shipment", "Customer Service", "Rates"];
//   const scrollRef = useRef(null);

//   // --- Navigation Handlers ---
//   const handleGoToRegister = () => {
//     setAuthMode('register');
//   };

//   const handleBackToLogin = () => {
//     setAuthMode('login');
//   };


 

//   const handleLoginSuccess = (userData) => {
//     setIsLoggedIn(true);
//     setShowLogin(false);
//     setUserRole(userData.role); // Correctly sets admin, agent etc.
//     setCurrentUser(userData); // Sets state for immediate use
//     localStorage.setItem('sewa_user', JSON.stringify(userData));
//   };
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowLogin(false);
//     setAuthMode('login');
//     setTempEmail('');
//     setCurrentUser(null);
//     setUserRole(null);
//     localStorage.removeItem('sewa_user');
//     localStorage.removeItem('sewa_user_id');

//     localStorage.removeItem('shp_sender');
//     localStorage.removeItem('shp_receiver');
//     localStorage.removeItem('shp_packages');
//     //window.location.reload();
//   };

//   // --- Auto-scroll effect for Services Slider ---
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//         if (scrollLeft + clientWidth >= scrollWidth - 10) {
//           scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//         }
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('sewa_user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setIsLoggedIn(true);
//       setCurrentUser(parsedUser);
//       setUserRole(parsedUser.role);
//     }
//     setIsLoadingCache(false);
//    }, []);

//   if (isLoadingCache) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
//         <h3>Loading Secure Session Data...</h3>
//       </div>
//     );
//   }
//   return (
//     <div className="layout">
      
//       {/* Navbar logic */}
//       {!isLoggedIn && (
//         <Navbar 
//           menuItems={menuItems} 
//           onLoginClick={() => { 
//             setShowLogin(true); 
//             setAuthMode('login'); 
//             setIsLoggedIn(false); 
//           }} 
//           onHomeClick={() => { 
//             setShowLogin(false); 
//             setIsLoggedIn(false); 
//             setAuthMode('login');
//             setTempEmail('');
//           }}
//         />
//       )}

//       {/* Main Content Logic Tree */}
//       {isLoggedIn ? (
//       <Dashboard onLogout={handleLogout} userRole={userRole} user ={currentUser} />      ) : showLogin ? (
//         <div className="auth-container-wrapper">
//           {authMode === 'login' && (
//             <LoginPage 
//               onSignIn={handleLoginSuccess} 
//               onGoToRegister={handleGoToRegister} 
//             />
//           )}
//           {authMode === 'register' && (
//   <Register 
//     //  pass the state down to Register
//     formData={registerFormData} 
//     setFormData={setRegisterFormData} 
//     onBackToLogin={handleBackToLogin} 
//     onRegisterSuccess={(email) => {
//       setTempEmail(email);
//       setAuthMode('verify');
//     }} 
//   />
// )}

// {authMode === 'verify' && (
//   <VerifyOTP 
//     email={tempEmail} 
//     onVerifySuccess={() => {
//       setShowSuccess(true);
//       //  Clear out the persistent state here after a fully successful verification
//       setRegisterFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
//       setAuthMode('login'); 
//     }}
//     onBackToRegister={() => setAuthMode('register')}
//   />
// )}
          
          
//         </div>
//       ) : (
//         <>
//           {/* Hero Banner Section */}
//           <section className="hero-banner">
//             <div className="hero-overlay">
//               <div className="hero-content">
//                 <h1>Reliable Logistics for Nepal</h1>
//                 <p>Fast, secure, and real-time tracking for all your shipments.</p>
//                 <button className="cta-button">Track Package</button>
//               </div>
//             </div>
//           </section>

//           {/* Services Section */}
//           <section className="services-section">
//             <div className="container">
//               <div className="services-intro">
//                 <h2>Our Services</h2>
//                 <h3>Embark on a Global Journey with Namaste Sewaro Cargo Service</h3>
//                 <p>
//                   Experience the world at your doorstep with our extensive network of shipping destinations. 
//                   Our commitment to reliability, affordability, and convenience ensures that your cargo 
//                   travels seamlessly across borders.
//                 </p>
//               </div>

//               <div className="services-grid">
//                 <div className="services-slider" ref={scrollRef}>
//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/logo.png" alt="Global Shipping" />
//                     </div>
//                     <div className="service-info">
//                       <h4>International Express</h4>
//                       <p>Fast, efficient, and cost-effective shipping to USA, UK, Hong Kong, and more.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/middle-east.jpg" alt="Middle East Cargo" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Middle East Network</h4>
//                       <p>Daily cargo departures to Dubai and Malaysia with end-to-end tracking.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/asia-pacific.jpg" alt="Asia Cargo" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Asia-Pacific Logistics</h4>
//                       <p>Seamless door-to-door services across Japan, Portugal, and 50+ other countries.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/asia-pacific.jpg" alt="Asia Cargo" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Europe Express</h4>
//                       <p>Fast logistics handling for major European hubs including Germany and France.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/asia-pacific.jpg" alt="Asia Cargo" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Australian Logistics</h4>
//                       <p>Reliable freight and cargo services connecting Nepal to Oceania.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="destinations-badge">
//                 <span>Serving: USA • UK • Hong Kong • Portugal • Japan • Dubai • Malaysia • +Many more</span>
//               </div>
//             </div>
//           </section>

//           {/* Why Choose Us Section */}
//           <section className="why-us-section">
//             <div className="container">
//               <div className="section-title">
//                 <h2>Why Choose Sewa Logistics?</h2>
//               </div>

//               <div className="why-row">
//                 <div className="why-image-side">
//                   <div className="question-mark">?</div>
//                 </div>
//                 <div className="why-text-side">
//                   <div className="why-icon-small">🛡️</div>
//                   <h4>Is my cargo safe during transit?</h4>
//                   <p><strong>Absolutely.</strong> We provide Secure Handling with full insurance coverage. Every package is treated with professional care and stored in monitored facilities.</p>
//                 </div>
//               </div>

//               <div className="why-row reverse">
//                 <div className="why-image-side">
//                   <div className="question-mark color-2">?</div>
//                 </div>
//                 <div className="why-text-side">
//                   <div className="why-icon-small">⏱️</div>
//                   <h4>How fast can I get my delivery?</h4>
//                   <p><strong>Right on time.</strong> We value your schedule. Our express global network ensures that deadlines are met, providing the fastest routes from Nepal to the world.</p>
//                 </div>
//               </div>

//               <div className="why-row">
//                 <div className="why-image-side">
//                   <div className="question-mark color-3">?</div>
//                 </div>
//                 <div className="why-text-side">
//                   <div className="why-icon-small">📞</div>
//                   <h4>Can I get help at any hour?</h4>
//                   <p><strong>We are always here.</strong> Our 24/7 Support team provides real-time updates. Whether it's midnight in Kathmandu or morning in New York, we're ready to assist.</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Contact & Footer Section */}
//           <footer className="footer-section">
//             <div className="footer-container">
//               <div className="footer-column">
//                 <div className="footer-logo">
//                   <img src="/logo.png" alt="Sewa Logistics" className="logo-image-footer" />
//                   <span className="footer-logo-text">SEWA LOGISTICS</span>
//                 </div>
//                 <p className="footer-tagline">
//                   Your trusted partner for global logistics and cargo services from Nepal to the world.
//                 </p>
//               </div>

//               <div className="footer-column">
//                 <h4>Physical Address</h4>
//                 <p className="address-text">
//                   Kathmandu, Nepal<br />
//                   (Main Office)
//                 </p>
//                 <div className="footer-map">
//                   <iframe 
//                     title="Sewa Logistics Location"
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3274532187654!2d85.31233!3d27.71724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjEiTiA4NcKwMTgnNDQuNCJF!5e0!3m2!1sen!2snp!4v1620000000000!5m2!1sen!2snp"
//                     width="100%" 
//                     height="150" 
//                     style={{ border: 0, borderRadius: "8px", marginTop: "15px" }} 
//                     allowFullScreen="" 
//                     loading="lazy" 
//                     referrerPolicy="no-referrer-when-downgrade">
//                   </iframe>
//                 </div>
//               </div>

//               <div className="footer-column">
//                 <h4>Contact Info</h4>
//                 <div className="contact-links">
//                   <a href="tel:+9779851134936" className="contact-link">
//                     📞 +977 9851134936
//                   </a>
//                   <a href="mailto:namastesewaro@gmail.com" className="contact-link">
//                     ✉️ namastesewaro@gmail.com
//                   </a>
//                 </div>
//               </div>
//             </div>
            
//             <div className="footer-bottom">
//               <p>© {new Date().getFullYear()} Sewa Logistics. All Rights Reserved.</p>
//             </div>
//           </footer>
//         </>
//       )}
//       {showSuccess && (
//   <SuccessModal 
//     message="Your email has been verified. You can now sign in to your dashboard." 
//     onConfirm={() => {
//       setShowSuccess(false);
//       setAuthMode('login'); 
//       setTempEmail('');
//     }}
//   />
// )}
//     </div>
//   );
// }

// export default App;




// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import LoginPage from './LoginPage'; 
// import Navbar from './Navbar';       
// import ShipmentStepper from './ShipmentStepper';
// import Dashboard from './Dashboard';
// import Register from './Register';
// import VerifyOTP from './VerifyOTP';
// import SuccessModal from './SuccessModal';
// import BarcodeScannerModal from './BarcodeScannerModal'; // 💡 Imported scanner component

// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authMode, setAuthMode] = useState('login'); 
//   const [tempEmail, setTempEmail] = useState(''); 
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [userRole, setUserRole] = useState(null); 
//   const [currentUser, setCurrentUser] = useState(null); 
//   const [isLoadingCache, setIsLoadingCache] = useState(true); 
  
//   // 📸 Scanner View Panel States
//   const [isScannerOpen, setIsScannerOpen] = useState(false);

//   const [registerFormData, setRegisterFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });

//   const menuItems = ["Home", "Track Shipment", "Customer Service", "Rates"];
//   const scrollRef = useRef(null);

//   const handleGoToRegister = () => setAuthMode('register');
//   const handleBackToLogin = () => setAuthMode('login');

//   const handleLoginSuccess = (userData) => {
//     setIsLoggedIn(true);
//     setShowLogin(false);
//     setUserRole(userData.role); 
//     setCurrentUser(userData); 
//     localStorage.setItem('sewa_user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowLogin(false);
//     setAuthMode('login');
//     setTempEmail('');
//     setCurrentUser(null);
//     setUserRole(null);
//     localStorage.removeItem('sewa_user');
//     localStorage.removeItem('sewa_user_id');
//     localStorage.removeItem('shp_sender');
//     localStorage.removeItem('shp_receiver');
//     localStorage.removeItem('shp_packages');
//   };

//   // 🎯 Callback executed when a physical label or invoice is read by the camera lens
//   const handleBarcodeDetection = (detectedTrackingId) => {
//     setIsScannerOpen(false);

//     // Bypass authentication constraints to view tracking details instantly
//     const publicTrackerGuestUser = currentUser || { id: 'guest', name: 'Anonymous Tracker', role: 'customer' };
    
//     if (!isLoggedIn) {
//       setCurrentUser(publicTrackerGuestUser);
//       setUserRole('customer');
//       setIsLoggedIn(true);
//     }

//     // Force application rendering focus to display tracking files
//     setTimeout(() => {
//       const dispatchTrackingRequestEvent = new CustomEvent('render_shipment_details_view', {
//         detail: { trackingId: detectedTrackingId }
//       });
//       window.dispatchEvent(dispatchTrackingRequestEvent);
//     }, 100);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//         if (scrollLeft + clientWidth >= scrollWidth - 10) {
//           scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//         }
//       }
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('sewa_user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setIsLoggedIn(true);
//       setCurrentUser(parsedUser);
//       setUserRole(parsedUser.role);
//     }
//     setIsLoadingCache(false);
//   }, []);

//   if (isLoadingCache) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
//         <h3>Loading Secure Session Data...</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="layout">
      
//       {/* Navbar Logic Engine Wrapper */}
//       {!isLoggedIn && (
//         <Navbar 
//           menuItems={menuItems} 
//           onScannerClick={() => setIsScannerOpen(true)} // 💡 Embedded action listener handler
//           onLoginClick={() => { 
//             setShowLogin(true); 
//             setAuthMode('login'); 
//             setIsLoggedIn(false); 
//           }} 
//           onHomeClick={() => { 
//             setShowLogin(false); 
//             setIsLoggedIn(false); 
//             setAuthMode('login');
//             setTempEmail('');
//           }}
//         />
//       )}

//       {/* Global Embedded Overlay Hardware Module */}
//       <BarcodeScannerModal 
//         isOpen={isScannerOpen}
//         onClose={() => setIsScannerOpen(false)}
//         onScanSuccess={handleBarcodeDetection}
//       />

//       {/* Main Content Logic Tree */}
//       {isLoggedIn ? (
//         <Dashboard onLogout={handleLogout} userRole={userRole} user={currentUser} />
//       ) : showLogin ? (
//         <div className="auth-container-wrapper">
//           {authMode === 'login' && (
//             <LoginPage onSignIn={handleLoginSuccess} onGoToRegister={handleGoToRegister} />
//           )}
//           {authMode === 'register' && (
//             <Register formData={registerFormData} setFormData={setRegisterFormData} onBackToLogin={handleBackToLogin} onRegisterSuccess={(email) => { setTempEmail(email); setAuthMode('verify'); }} />
//           )}
//           {authMode === 'verify' && (
//             <VerifyOTP email={tempEmail} onVerifySuccess={() => { setShowSuccess(true); setRegisterFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); setAuthMode('login'); }} onBackToRegister={() => setAuthMode('register')} />
//           )}
//         </div>
//       ) : (
//         <>
//           {/* Hero Banner Section */}
//           <section className="hero-banner">
//             <div className="hero-overlay">
//               <div className="hero-content">
//                 <h1>Reliable Logistics for Nepal</h1>
//                 <p>Fast, secure, and real-time tracking for all your shipments.</p>
//                 <button className="cta-button" onClick={() => setIsScannerOpen(true)}>Track Package via Camera</button>
//               </div>
//             </div>
//           </section>

//           {/* Services Section */}
//           <section className="services-section">
//             <div className="container">
//               <div className="services-intro">
//                 <h2>Our Services</h2>
//                 <h3>Embark on a Global Journey with Namaste Sewaro Cargo Service</h3>
//                 <p>Experience the world at your doorstep with our extensive network of shipping destinations.</p>
//               </div>
//               <div className="services-grid">
//                 <div className="services-slider" ref={scrollRef}>
//                   <div className="service-card">
//                     <div className="service-img-wrapper"><img src="/logo.png" alt="Global Shipping" /></div>
//                     <div className="service-info">
//                       <h4>International Express</h4>
//                       <p>Fast, efficient, and cost-effective shipping to USA, UK, Hong Kong, and more.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Why Choose Us & Footer Elements continue undisturbed... */}
//           <footer className="footer-section">
//             <div className="footer-bottom">
//               <p>© {new Date().getFullYear()} Sewa Logistics. All Rights Reserved.</p>
//             </div>
//           </footer>
//         </>
//       )}

//       {showSuccess && (
//         <SuccessModal message="Your email has been verified. You can now sign in." onConfirm={() => { setShowSuccess(false); setAuthMode('login'); setTempEmail(''); }} />
//       )}
//     </div>
//   );
// }

// export default App;





// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import LoginPage from './LoginPage'; 
// import Navbar from './Navbar';       
// import Dashboard from './Dashboard';
// import Register from './Register';
// import VerifyOTP from './VerifyOTP';
// import SuccessModal from './SuccessModal';
// import BarcodeScannerModal from './BarcodeScannerModal'; 
// import ShippingLabel from './ShippingLabel'; // Ensure this matches your component's filename

// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authMode, setAuthMode] = useState('login'); 
//   const [tempEmail, setTempEmail] = useState(''); 
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [userRole, setUserRole] = useState(null); 
//   const [currentUser, setCurrentUser] = useState(null); 
//   const [isLoadingCache, setIsLoadingCache] = useState(true); 

//   // 📸 Scanner states & Standalone Public Label viewer states
//   const [isScannerOpen, setIsScannerOpen] = useState(false);
//   const [publicLabelData, setPublicLabelData] = useState(null);
//   const [isFetchingLabel, setIsFetchingLabel] = useState(false);
//   const [scanError, setScanError] = useState('');

//   const [registerFormData, setRegisterFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
//   const menuItems = ["Home", "Track Shipment", "Customer Service", "Rates"];
//   const scrollRef = useRef(null);

//   const handleGoToRegister = () => setAuthMode('register');
//   const handleBackToLogin = () => setAuthMode('login');

//   const handleLoginSuccess = (userData) => {
//     setIsLoggedIn(true);
//     setShowLogin(false);
//     setUserRole(userData.role); 
//     setCurrentUser(userData); 
//     localStorage.setItem('sewa_user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowLogin(false);
//     setAuthMode('login');
//     setTempEmail('');
//     setCurrentUser(null);
//     setUserRole(null);
//     localStorage.removeItem('sewa_user');
//     localStorage.removeItem('sewa_user_id');
//   };

//   // 🎯 Fetch and transform data for unauthenticated label viewing
//   const handleBarcodeDetection = async (detectedTrackingId) => {
//     setIsScannerOpen(false);
//     setIsFetchingLabel(true);
//     setScanError('');

//     try {
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${detectedTrackingId}`);
//       if (!response.ok) {
//         throw new Error(`Tracking reference #${detectedTrackingId} not found in database.`);
//       }
      
//       const dbData = await response.json();

//       // 🔄 Map backend schema explicitly to your ShippingLabel components props
//       const structuredLabel = {
//         previewTrackingId: dbData.tracking_id,
//         senderInfo: {
//           fullName: dbData.shipper_name,
//           contactNum: dbData.shipper_phone,
//           address: dbData.shipper_address,
//           city: dbData.shipper_city,
//           country: dbData.shipper_country
//         },
//         receiverInfo: {
//           fullName: dbData.receiver_name,
//           contactNumber: dbData.receiver_phone,
//           fullAddress: dbData.receiver_address,
//           city: dbData.receiver_city,
//           country: dbData.receiver_country,
//           email: dbData.receiver_email || "N/A"
//         },
//         billingInfo: {
//           method: dbData.payment_method,
//           total: dbData.total_amount,
//           currency: dbData.currency
//         },
//         // ShippingLabel component reads weight out of package.items nested maps
//         packages: (dbData.shipment_package || []).map(p => ({
//           id: p.id,
//           type: p.type,
//           items: (p.shipment_item || []).map(i => ({
//             weight: i.weight,
//             description: i.description,
//             qty: i.qty
//           }))
//         }))
//       };

//       setPublicLabelData(structuredLabel);

//     } catch (err) {
//       console.error("Scan fetch error:", err);
//       setScanError(err.message);
//     } finally {
//       setIsFetchingLabel(false);
//     }
//   };

//   useEffect(() => {
//     const savedUser = localStorage.getItem('sewa_user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setIsLoggedIn(true);
//       setCurrentUser(parsedUser);
//       setUserRole(parsedUser.role);
//     }
//     setIsLoadingCache(false);
//   }, []);

//   if (isLoadingCache) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
//         <h3>Loading Secure Session Data...</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="layout">
      
//       {!isLoggedIn && (
//         <Navbar 
//           menuItems={menuItems} 
//           onScannerClick={() => { setPublicLabelData(null); setIsScannerOpen(true); }} 
//           onLoginClick={() => { setShowLogin(true); setAuthMode('login'); setIsLoggedIn(false); setPublicLabelData(null); }} 
//           onHomeClick={() => { setShowLogin(false); setIsLoggedIn(false); setAuthMode('login'); setTempEmail(''); setPublicLabelData(null); }}
//         />
//       )}

//       {/* Camera Scanning Modal */}
//       <BarcodeScannerModal 
//         isOpen={isScannerOpen}
//         onClose={() => setIsScannerOpen(false)}
//         onScanSuccess={handleBarcodeDetection}
//       />

//       {/* Global Fetch Status Notifications */}
//       {isFetchingLabel && (
//         <div className="scan-loading-toast" style={{ position: 'fixed', top: '20px', right: '20px', background: '#333', color: '#fff', padding: '12px 24px', borderRadius: '4px', zIndex: 10000, fontWeight: 'bold' }}>
//           ⏳ Fetching shipment record...
//         </div>
//       )}

//       {scanError && (
//         <div style={{ maxWidth: '450px', margin: '20px auto', padding: '15px', backgroundColor: '#fff5f5', border: '1px solid #fc8181', borderRadius: '6px', color: '#c53030', textAlign: 'center' }}>
//           ⚠️ <strong>Scan Error:</strong> {scanError}
//           <button onClick={() => setScanError('')} style={{ display: 'block', margin: '10px auto 0', background: '#c53030', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>Dismiss</button>
//         </div>
//       )}

//       {/* ✨ DISPLAY COMPONENT OVERLAY FOR UNAUTHENTICATED USERS */}
//       {publicLabelData ? (
//         <div className="public-label-viewer" style={{ padding: '40px 20px', backgroundColor: '#f1f3f5', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
//             <button onClick={() => window.print()} style={{ background: '#212529', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
//               🖨️ Print Label
//             </button>
//             <button onClick={() => setPublicLabelData(null)} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
//               ✕ Close Label
//             </button>
//           </div>
          
//           {/* Your Custom Layout Model Rendering Engine */}
//           <ShippingLabel 
//             previewTrackingId={publicLabelData.previewTrackingId}
//             senderInfo={publicLabelData.senderInfo}
//             receiverInfo={publicLabelData.receiverInfo}
//             billingInfo={publicLabelData.billingInfo}
//             packages={publicLabelData.packages}
//           />
//         </div>
//       ) : isLoggedIn ? (
//         <Dashboard onLogout={handleLogout} userRole={userRole} user={currentUser} />
//       ) : showLogin ? (
//         <div className="auth-container-wrapper">
//           {authMode === 'login' && <LoginPage onSignIn={handleLoginSuccess} onGoToRegister={handleGoToRegister} />}
//           {authMode === 'register' && <Register formData={registerFormData} setFormData={setRegisterFormData} onBackToLogin={handleBackToLogin} onRegisterSuccess={(email) => { setTempEmail(email); setAuthMode('verify'); }} />}
//           {authMode === 'verify' && <VerifyOTP email={tempEmail} onVerifySuccess={() => { setShowSuccess(true); setRegisterFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); setAuthMode('login'); }} onBackToRegister={() => setAuthMode('register')} />}
//         </div>
//       ) : (
//         <>
//           {/* Home Hero Screen Interface */}
//           <section className="hero-banner">
//             <div className="hero-overlay">
//               <div className="hero-content">
//                 <h1>Reliable Logistics for Nepal</h1>
//                 <p>Fast, secure, and real-time tracking for all your shipments.</p>
//                 <button className="cta-button" onClick={() => setIsScannerOpen(true)}>📷 Scan Code to Print Label</button>
//               </div>
//             </div>
//           </section>

//           {/* Rest of your static page elements (Services, Sections, Footer) */}
//           <section className="services-section" style={{ paddingBottom: '40px' }}></section>
//         </>
//       )}

//       {showSuccess && (
//         <SuccessModal message="Your email has been verified. You can now sign in." onConfirm={() => { setShowSuccess(false); setAuthMode('login'); setTempEmail(''); }} />
//       )}
//     </div>
//   );
// }

// export default App;





// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import LoginPage from './LoginPage'; 
// import Navbar from './Navbar';       
// import Dashboard from './Dashboard';
// import Register from './Register';
// import VerifyOTP from './VerifyOTP';
// import SuccessModal from './SuccessModal';
// import BarcodeScannerModal from './BarcodeScannerModal'; 
// import ShippingLabel from './ShippingLabel'; 

// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authMode, setAuthMode] = useState('login'); 
//   const [tempEmail, setTempEmail] = useState(''); 
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [userRole, setUserRole] = useState(null); 
//   const [currentUser, setCurrentUser] = useState(null); 
//   const [isLoadingCache, setIsLoadingCache] = useState(true); 

//   // 📸 Scanner states & Standalone Public Label viewer states
//   const [isScannerOpen, setIsScannerOpen] = useState(false);
//   const [publicLabelData, setPublicLabelData] = useState(null);
//   const [isFetchingLabel, setIsFetchingLabel] = useState(false);
//   const [scanError, setScanError] = useState('');

//   const [registerFormData, setRegisterFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
//   const menuItems = ["Home", "Track Shipment", "Customer Service", "Rates"];
//   const scrollRef = useRef(null);

//   const handleGoToRegister = () => setAuthMode('register');
//   const handleBackToLogin = () => setAuthMode('login');

//   const handleLoginSuccess = (userData) => {
//     setIsLoggedIn(true);
//     setShowLogin(false);
//     setUserRole(userData.role); 
//     setCurrentUser(userData); 
//     localStorage.setItem('sewa_user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowLogin(false);
//     setAuthMode('login');
//     setTempEmail('');
//     setCurrentUser(null);
//     setUserRole(null);
//     localStorage.removeItem('sewa_user');
//     localStorage.removeItem('sewa_user_id');
//     localStorage.removeItem('shp_sender');
//     localStorage.removeItem('shp_receiver');
//     localStorage.removeItem('shp_packages');
//   };

//   // --- Auto-scroll effect for Services Slider ---
//   useEffect(() => {
//     if (isLoggedIn || showLogin || publicLabelData) return; // Only run on public homepage

//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//         if (scrollLeft + clientWidth >= scrollWidth - 10) {
//           scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//         }
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [isLoggedIn, showLogin, publicLabelData]);

//   // 🎯 Fetch and transform data for unauthenticated label viewing
//   const handleBarcodeDetection = async (detectedTrackingId) => {
//     setIsScannerOpen(false);
//     setIsFetchingLabel(true);
//     setScanError('');

//     try {
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${detectedTrackingId}`);
//       if (!response.ok) {
//         throw new Error(`Tracking reference #${detectedTrackingId} not found in database.`);
//       }
      
//       const dbData = await response.json();

//       // 🔄 Map backend schema explicitly to your ShippingLabel components props
//       const structuredLabel = {
//         previewTrackingId: dbData.tracking_id,
//         senderInfo: {
//           fullName: dbData.shipper_name,
//           contactNum: dbData.shipper_phone,
//           address: dbData.shipper_address,
//           city: dbData.shipper_city,
//           country: dbData.shipper_country
//         },
//         receiverInfo: {
//           fullName: dbData.receiver_name,
//           contactNumber: dbData.receiver_phone,
//           fullAddress: dbData.receiver_address,
//           city: dbData.receiver_city,
//           country: dbData.receiver_country,
//           email: dbData.receiver_email || "N/A"
//         },
//         billingInfo: {
//           method: dbData.payment_method,
//           total: dbData.total_amount,
//           currency: dbData.currency
//         },
//         packages: (dbData.shipment_package || []).map(p => ({
//           id: p.id,
//           type: p.type,
//           items: (p.shipment_item || []).map(i => ({
//             weight: i.weight,
//             description: i.description,
//             qty: i.qty
//           }))
//         }))
//       };

//       setPublicLabelData(structuredLabel);

//     } catch (err) {
//       console.error("Scan fetch error:", err);
//       setScanError(err.message);
//     } finally {
//       setIsFetchingLabel(false);
//     }
//   };

//   useEffect(() => {
//     const savedUser = localStorage.getItem('sewa_user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setIsLoggedIn(true);
//       setCurrentUser(parsedUser);
//       setUserRole(parsedUser.role);
//     }
//     setIsLoadingCache(false);
//   }, []);

//   if (isLoadingCache) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
//         <h3>Loading Secure Session Data...</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="layout">
      
//       {!isLoggedIn && (
//         <Navbar 
//           menuItems={menuItems} 
//           onScannerClick={() => { setPublicLabelData(null); setIsScannerOpen(true); }} 
//           onLoginClick={() => { setShowLogin(true); setAuthMode('login'); setIsLoggedIn(false); setPublicLabelData(null); }} 
//           onHomeClick={() => { setShowLogin(false); setIsLoggedIn(false); setAuthMode('login'); setTempEmail(''); setPublicLabelData(null); }}
//         />
//       )}

//       {/* Camera Scanning Modal */}
//       <BarcodeScannerModal 
//         isOpen={isScannerOpen}
//         onClose={() => setIsScannerOpen(false)}
//         onScanSuccess={handleBarcodeDetection}
//       />

//       {/* Global Fetch Status Notifications */}
//       {isFetchingLabel && (
//         <div className="scan-loading-toast" style={{ position: 'fixed', top: '20px', right: '20px', background: '#333', color: '#fff', padding: '12px 24px', borderRadius: '4px', zIndex: 10000, fontWeight: 'bold' }}>
//           ⏳ Fetching shipment record...
//         </div>
//       )}

//       {scanError && (
//         <div style={{ maxWidth: '450px', margin: '20px auto', padding: '15px', backgroundColor: '#fff5f5', border: '1px solid #fc8181', borderRadius: '6px', color: '#c53030', textAlign: 'center' }}>
//           ⚠️ <strong>Scan Error:</strong> {scanError}
//           <button onClick={() => setScanError('')} style={{ display: 'block', margin: '10px auto 0', background: '#c53030', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>Dismiss</button>
//         </div>
//       )}

//       {/* ✨ DISPLAY COMPONENT OVERLAY FOR UNAUTHENTICATED USERS */}
//       {publicLabelData ? (
//         <div className="public-label-viewer" style={{ padding: '40px 20px', backgroundColor: '#f1f3f5', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
//             <button onClick={() => window.print()} style={{ background: '#212529', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
//               🖨️ Print Label
//             </button>
//             <button onClick={() => setPublicLabelData(null)} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
//               ✕ Close Label
//             </button>
//           </div>
          
//           <ShippingLabel 
//             previewTrackingId={publicLabelData.previewTrackingId}
//             senderInfo={publicLabelData.senderInfo}
//             receiverInfo={publicLabelData.receiverInfo}
//             billingInfo={publicLabelData.billingInfo}
//             packages={publicLabelData.packages}
//           />
//         </div>
//       ) : isLoggedIn ? (
//         <Dashboard onLogout={handleLogout} userRole={userRole} user={currentUser} />
//       ) : showLogin ? (
//         <div className="auth-container-wrapper">
//           {authMode === 'login' && <LoginPage onSignIn={handleLoginSuccess} onGoToRegister={handleGoToRegister} />}
//           {authMode === 'register' && <Register formData={registerFormData} setFormData={setRegisterFormData} onBackToLogin={handleBackToLogin} onRegisterSuccess={(email) => { setTempEmail(email); setAuthMode('verify'); }} />}
//           {authMode === 'verify' && <VerifyOTP email={tempEmail} onVerifySuccess={() => { setShowSuccess(true); setRegisterFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); setAuthMode('login'); }} onBackToRegister={() => setAuthMode('register')} />}
//         </div>
//       ) : (
//         <>
//           {/* Home Hero Screen Interface */}
//           <section className="hero-banner">
//             <div className="hero-overlay">
//               <div className="hero-content">
//                 <h1>Reliable Logistics for Nepal</h1>
//                 <p>Fast, secure, and real-time tracking for all your shipments.</p>
//                 <button className="cta-button" onClick={() => setIsScannerOpen(true)}>📷 Scan Code to Print Label</button>
//               </div>
//             </div>
//           </section>

//           {/* 🛠️ Services Section restored from your previous code */}
//           <section className="services-section">
//             <div className="container">
//               <div className="services-intro">
//                 <h2>Our Services</h2>
//                 <h3>Embark on a Global Journey with Namaste Sewaro Cargo Service</h3>
//                 <p>
//                   Experience the world at your doorstep with our extensive network of shipping destinations. 
//                   Our commitment to reliability, affordability, and convenience ensures that your cargo 
//                   travels seamlessly across borders.
//                 </p>
//               </div>

//               <div className="services-grid">
//                 <div className="services-slider" ref={scrollRef}>
//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/logo.png" alt="Global Shipping" />
//                     </div>
//                     <div className="service-info">
//                       <h4>International Express</h4>
//                       <p>Fast, efficient, and cost-effective shipping to USA, UK, Hong Kong, and more.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/middle-east.jpg" alt="Middle East Cargo" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Middle East Network</h4>
//                       <p>Daily cargo departures to Dubai and Malaysia with end-to-end tracking.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/asia-pacific.jpg" alt="Asia Cargo" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Asia-Pacific Logistics</h4>
//                       <p>Seamless door-to-door services across Japan, Portugal, and 50+ other countries.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/asia-pacific.jpg" alt="Asia Cargo" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Europe Express</h4>
//                       <p>Fast logistics handling for major European hubs including Germany and France.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src="/asia-pacific.jpg" alt="Asia Cargo" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Australian Logistics</h4>
//                       <p>Reliable freight and cargo services connecting Nepal to Oceania.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="destinations-badge">
//                 <span>Serving: USA • UK • Hong Kong • Portugal • Japan • Dubai • Malaysia • +Many more</span>
//               </div>
//             </div>
//           </section>

//           {/* 🛠️ Why Choose Us Section restored from your previous code */}
//           <section className="why-us-section">
//             <div className="container">
//               <div className="section-title">
//                 <h2>Why Choose Sewa Logistics?</h2>
//               </div>

//               <div className="why-row">
//                 <div className="why-image-side">
//                   <div className="question-mark">?</div>
//                 </div>
//                 <div className="why-text-side">
//                   <div className="why-icon-small">🛡️</div>
//                   <h4>Is my cargo safe during transit?</h4>
//                   <p><strong>Absolutely.</strong> We provide Secure Handling with full insurance coverage. Every package is treated with professional care and stored in monitored facilities.</p>
//                 </div>
//               </div>

//               <div className="why-row reverse">
//                 <div className="why-image-side">
//                   <div className="question-mark color-2">?</div>
//                 </div>
//                 <div className="why-text-side">
//                   <div className="why-icon-small">⏱️</div>
//                   <h4>How fast can I get my delivery?</h4>
//                   <p><strong>Right on time.</strong> We value your schedule. Our express global network ensures that deadlines are met, providing the fastest routes from Nepal to the world.</p>
//                 </div>
//               </div>

//               <div className="why-row">
//                 <div className="why-image-side">
//                   <div className="question-mark color-3">?</div>
//                 </div>
//                 <div className="why-text-side">
//                   <div className="why-icon-small">📞</div>
//                   <h4>Can I get help at any hour?</h4>
//                   <p><strong>We are always here.</strong> Our 24/7 Support team provides real-time updates. Whether it's midnight in Kathmandu or morning in New York, we're ready to assist.</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* 🛠️ Contact & Footer Section restored from your previous code */}
//           <footer className="footer-section">
//             <div className="footer-container">
//               <div className="footer-column">
//                 <div className="footer-logo">
//                   <img src="/logo.png" alt="Sewa Logistics" className="logo-image-footer" />
//                   <span className="footer-logo-text">SEWA LOGISTICS</span>
//                 </div>
//                 <p className="footer-tagline">
//                   Your trusted partner for global logistics and cargo services from Nepal to the world.
//                 </p>
//               </div>

//               <div className="footer-column">
//   <h4>Physical Address</h4>
//   <p className="address-text">
//     Kathmandu, Nepal<br />
//     (Main Office)
//   </p>
//   <div className="footer-map">
//     <iframe 
//       title="Sewa Logistics Location"
//       src="https://maps.google.com/maps?q=Kathmandu,Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed"
//       width="100%" 
//       height="150" 
//       style={{ border: 0, borderRadius: "8px", marginTop: "15px" }} 
//       allowFullScreen="" 
//       loading="lazy" 
//       referrerPolicy="no-referrer-when-downgrade"
//     ></iframe> {/* Fixed tag closure */}
//   </div>
// </div>

//               <div className="footer-column">
//                 <h4>Contact Info</h4>
//                 <div className="contact-links">
//                   <a href="tel:+9779851134936" className="contact-link">
//                     📞 +977 9851134936
//                   </a>
//                   <a href="mailto:namastesewaro@gmail.com" className="contact-link">
//                     ✉️ namastesewaro@gmail.com
//                   </a>
//                 </div>
//               </div>
//             </div>
            
//             <div className="footer-bottom">
//               <p>© {new Date().getFullYear()} Sewa Logistics. All Rights Reserved.</p>
//             </div>
//           </footer>
//         </>
//       )}

//       {showSuccess && (
//         <SuccessModal message="Your email has been verified. You can now sign in." onConfirm={() => { setShowSuccess(false); setAuthMode('login'); setTempEmail(''); }} />
//       )}
//     </div>
//   );
// }

// export default App;





// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import LoginPage from './LoginPage'; 
// import Navbar from './Navbar';       
// import Dashboard from './Dashboard';
// import Register from './Register';
// import VerifyOTP from './VerifyOTP';
// import SuccessModal from './SuccessModal';
// import BarcodeScannerModal from './BarcodeScannerModal'; 
// import ShippingLabel from './ShippingLabel'; 
// import secureImg from './assets/SECURE.png';
// import fastServiceImg from './assets/FAST SERVICE.PNG';
// import reliableImg from './assets/RELIABLE.PNG';
// import affordableImg from './assets/AFFORDABLE.png';

// import airFreightImg from './assets/airfreight.png'
// import cargoStorageImg from './assets/cargostorage.png'
// import landTransportImg from './assets/landtransport.png'

// import Quote from './Quote';



// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authMode, setAuthMode] = useState('login'); 
//   const [tempEmail, setTempEmail] = useState(''); 
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [userRole, setUserRole] = useState(null); 
//   const [currentUser, setCurrentUser] = useState(null); 
//   const [isLoadingCache, setIsLoadingCache] = useState(true); 

//   // 📸 Scanner states & Standalone Public Label viewer states
//   const [isScannerOpen, setIsScannerOpen] = useState(false);
//   const [publicLabelData, setPublicLabelData] = useState(null);
//   const [isFetchingLabel, setIsFetchingLabel] = useState(false);
//   const [scanError, setScanError] = useState('');

//   // 🔍 Public Track Input Box Form States
//   const [trackingNumberInput, setTrackingNumberInput] = useState('');
//   const [publicTrackingData, setPublicTrackingData] = useState(null);
//   const [isSearchingTrack, setIsSearchingTrack] = useState(false);
//   const [trackSearchError, setTrackSearchError] = useState('');

//   const [registerFormData, setRegisterFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
//   const menuItems = ["Home", "Customer Service", "Request a quote"];
//   const scrollRef = useRef(null);

//   const handleGoToRegister = () => setAuthMode('register');
//   const handleBackToLogin = () => setAuthMode('login');

//   const [showQuote, setShowQuote] = useState(false);

//   const handleLoginSuccess = (userData) => {
//     setIsLoggedIn(true);
//     setShowLogin(false);
//     setUserRole(userData.role); 
//     setCurrentUser(userData); 
//     localStorage.setItem('sewa_user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowLogin(false);
//     setAuthMode('login');
//     setTempEmail('');
//     setCurrentUser(null);
//     setUserRole(null);
//     localStorage.removeItem('sewa_user');
//     localStorage.removeItem('sewa_user_id');
//     localStorage.removeItem('shp_sender');
//     localStorage.removeItem('shp_receiver');
//     localStorage.removeItem('shp_packages');
//   };

//   // --- Auto-scroll effect for Services Slider ---
//   useEffect(() => {
//     if (isLoggedIn || showLogin || publicLabelData) return; 

//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//         if (scrollLeft + clientWidth >= scrollWidth - 10) {
//           scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//         }
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [isLoggedIn, showLogin, publicLabelData]);

//   // 🔍 Manual Tracking Box Search Handler
//   const handlePublicTrackSearch = async (e) => {
//     if (e) e.preventDefault();
//     if (!trackingNumberInput.trim()) return;

//     setIsSearchingTrack(true);
//     setTrackSearchError('');
//     setPublicTrackingData(null);

//     try {
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${trackingNumberInput.trim()}`);
//       if (!response.ok) {
//         throw new Error(`Tracking reference "${trackingNumberInput}" not found. Please enter a valid reference ID.`);
//       }
//       const data = await response.json();
//       setPublicTrackingData(data);
//     } catch (err) {
//       console.error("Tracking field fetch error:", err);
//       setTrackSearchError(err.message);
//     } finally {
//       setIsSearchingTrack(false);
//     }
//   };

//   // 🎯 Fetch and transform data for unauthenticated label viewing
//   const handleBarcodeDetection = async (detectedTrackingId) => {
//     setIsScannerOpen(false);
//     setIsFetchingLabel(true);
//     setScanError('');

//     try {
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${detectedTrackingId}`);
//       if (!response.ok) {
//         throw new Error(`Tracking reference #${detectedTrackingId} is not correct. Please enter a valid Tracking number.`);
//       }
      
//       const dbData = await response.json();

//       const structuredLabel = {
//         previewTrackingId: dbData.tracking_id,
//         senderInfo: {
//           fullName: dbData.shipper_name,
//           contactNum: dbData.shipper_phone,
//           address: dbData.shipper_address,
//           city: dbData.shipper_city,
//           country: dbData.shipper_country
//         },
//         receiverInfo: {
//           fullName: dbData.receiver_name,
//           contactNumber: dbData.receiver_phone,
//           fullAddress: dbData.receiver_address,
//           city: dbData.receiver_city,
//           country: dbData.receiver_country,
//           email: dbData.receiver_email || "N/A"
//         },
//         billingInfo: {
//           method: dbData.payment_method,
//           total: dbData.total_amount,
//           currency: dbData.currency
//         },
//         packages: (dbData.shipment_package || []).map(p => ({
//           id: p.id,
//           type: p.type,
//           items: (p.shipment_item || []).map(i => ({
//             weight: i.weight,
//             description: i.description,
//             qty: i.qty
//           }))
//         }))
//       };

//       setPublicLabelData(structuredLabel);

//     } catch (err) {
//       console.error("Scan fetch error:", err);
//       setScanError(err.message);
//     } finally {
//       setIsFetchingLabel(false);
//     }
//   };

//   useEffect(() => {
//     const savedUser = localStorage.getItem('sewa_user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setIsLoggedIn(true);
//       setCurrentUser(parsedUser);
//       setUserRole(parsedUser.role);
//     }
//     setIsLoadingCache(false);
//   }, []);

//   if (isLoadingCache) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
//         <h3>Loading Secure Session Data...</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="layout">
      
//       {!isLoggedIn && (
//         <Navbar 
//           menuItems={menuItems} 
//           onScannerClick={() => { setPublicLabelData(null); setIsScannerOpen(true); }} 
//           onLoginClick={() => { setShowLogin(true); setAuthMode('login'); setIsLoggedIn(false); setPublicLabelData(null); }} 
//           onHomeClick={() => { setShowLogin(false); setIsLoggedIn(false); setAuthMode('login'); setTempEmail(''); setPublicLabelData(null); setPublicTrackingData(null); }}
//           onRequestQuoteClick={() => { setShowQuote(true); setShowLogin(false); setPublicLabelData(null); setPublicTrackingData(null); }}
//         />
//       )}

//       {/* Camera Scanning Modal */}
//       <BarcodeScannerModal 
//         isOpen={isScannerOpen}
//         onClose={() => setIsScannerOpen(false)}
//         onScanSuccess={handleBarcodeDetection}
//       />

//       {/* Global Fetch Status Notifications */}
//       {isFetchingLabel && (
//         <div className="scan-loading-toast" style={{ position: 'fixed', top: '20px', right: '20px', background: '#333', color: '#fff', padding: '12px 24px', borderRadius: '4px', zIndex: 10000, fontWeight: 'bold' }}>
//           ⏳ Fetching shipment record...
//         </div>
//       )}

//       {scanError && (
//         <div style={{ maxWidth: '450px', margin: '20px auto', padding: '15px', backgroundColor: '#fff5f5', border: '1px solid #fc8181', borderRadius: '6px', color: '#c53030', textAlign: 'center' }}>
//           ⚠️ <strong>Scan Error:</strong> {scanError}
//           <button onClick={() => setScanError('')} style={{ display: 'block', margin: '10px auto 0', background: '#c53030', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>Dismiss</button>
//         </div>
//       )}
      
//       {/* ✨ DISPLAY COMPONENT OVERLAY FOR UNAUTHENTICATED USERS */}
//       {showQuote ? (
//   <Quote onBackHome={() => setShowQuote(false)} />
// ) :publicLabelData ? (
//         <div className="public-label-viewer" style={{ padding: '40px 20px', backgroundColor: '#f1f3f5', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
//             <button onClick={() => window.print()} style={{ background: '#212529', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
//               🖨️ Print Label
//             </button>
//             <button onClick={() => setPublicLabelData(null)} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
//               ✕ Close Label
//             </button>
//           </div>
          
//           <ShippingLabel 
//             previewTrackingId={publicLabelData.previewTrackingId}
//             senderInfo={publicLabelData.senderInfo}
//             receiverInfo={publicLabelData.receiverInfo}
//             billingInfo={publicLabelData.billingInfo}
//             packages={publicLabelData.packages}
//           />
//         </div>
//       ) : isLoggedIn ? (
//         <Dashboard onLogout={handleLogout} userRole={userRole} user={currentUser} />
//       ) : showLogin ? (
//         <div className="auth-container-wrapper">
//           {authMode === 'login' && <LoginPage onSignIn={handleLoginSuccess} onGoToRegister={handleGoToRegister} />}
//           {authMode === 'register' && <Register formData={registerFormData} setFormData={setRegisterFormData} onBackToLogin={handleBackToLogin} onRegisterSuccess={(email) => { setTempEmail(email); setAuthMode('verify'); }} />}
//           {authMode === 'verify' && <VerifyOTP email={tempEmail} onVerifySuccess={() => { setShowSuccess(true); setRegisterFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); setAuthMode('login'); }} onBackToRegister={() => setAuthMode('register')} />}
//         </div>
//       ) : (
//         <>
//           {/* Home Hero Screen Interface */}
//           <section className="hero-banner">
//             <div className="hero-overlay">
//               <div className="hero-content">
//                 <h1>Reliable Logistics for Nepal</h1>
//                 <p>Fast, secure, and real-time tracking for all your shipments.</p>
                
//                 {/* 🔍 Track Search Bar Input Group Replacement */}
//                 <form onSubmit={handlePublicTrackSearch} style={{
//                   display: 'flex',
//                   backgroundColor: '#ffffff',
//                   padding: '6px',
//                   borderRadius: '30px',
//                   maxWidth: '520px',
//                   width: '90%',
//                   margin: '25px auto 0 auto',
//                   boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
//                   boxSizing: 'border-box'
//                 }}>
//                   <input 
//                     type="text" 
//                     placeholder="Enter Tracking Number or Invoice ID..." 
//                     value={trackingNumberInput}
//                     onChange={(e) => setTrackingNumberInput(e.target.value)}
//                     style={{
//                       flex: 1,
//                       border: 'none',
//                       outline: 'none',
//                       padding: '12px 20px',
//                       fontSize: '15px',
//                       borderRadius: '30px 0 0 30px',
//                       color: '#ffffff'
//                     }}
//                   />
//                   <button 
//                     type="submit" 
//                     disabled={isSearchingTrack}
//                     style={{
//                       background: '#0056b3',
//                       color: '#fff',
//                       border: 'none',
//                       padding: '12px 28px',
//                       borderRadius: '25px',
//                       fontWeight: 'bold',
//                       cursor: 'pointer',
//                       fontSize: '15px',
//                       transition: 'background 0.2s',
//                       whiteSpace: 'nowrap'
//                     }}
//                   >
//                     {isSearchingTrack ? 'Tracking...' : 'Track'}
//                   </button>
//                 </form>

//                 {trackSearchError && (
//                   <div style={{ marginTop: '15px', color: '#ff8787', fontWeight: 'bold', fontSize: '14px' }}>
//                     ⚠️ {trackSearchError}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* 📊 Visual Status Roadmap Panel */}
//           {publicTrackingData && (
//             <section style={{ padding: '40px 20px', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center' }}>
//               <div style={{
//                 backgroundColor: '#ffffff',
//                 maxWidth: '650px',
//                 width: '100%',
//                 padding: '30px',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
//                 borderTop: '5px solid #0056b3'
//               }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
//                   <div>
//                     <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold', textTransform: 'uppercase' }}>Shipment Reference</span>
//                     <h3 style={{ margin: '2px 0 0 0', color: '#0056b3', fontFamily: 'monospace', fontSize: '20px' }}>{publicTrackingData.tracking_id}</h3>
//                   </div>
//                   <div style={{ textAlign: 'right' }}>
//                     <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold' }}>Current Status</span>
//                     <div style={{
//                       marginTop: '4px',
//                       padding: '6px 14px',
//                       borderRadius: '20px',
//                       fontSize: '12px',
//                       fontWeight: 'bold',
//                       display: 'inline-block',
//                       backgroundColor: 
//                         publicTrackingData.status?.toLowerCase() === 'collected' ? '#d4edda' :
//                         publicTrackingData.status?.toLowerCase() === 'ready to collect' ? '#cce5ff' :
//                         publicTrackingData.status?.toLowerCase() === 'landed' ? '#d1ecf1' :
//                         publicTrackingData.status?.toLowerCase() === 'in transit' ? '#fff3cd' : '#e2e3e5',
//                       color: 
//                         publicTrackingData.status?.toLowerCase() === 'collected' ? '#155724' :
//                         publicTrackingData.status?.toLowerCase() === 'ready to collect' ? '#004085' :
//                         publicTrackingData.status?.toLowerCase() === 'landed' ? '#0c5460' :
//                         publicTrackingData.status?.toLowerCase() === 'in transit' ? '#856404' : '#383d41',
//                       textTransform: 'uppercase'
//                     }}>
//                       {publicTrackingData.status || 'Pending'}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Tracking Progress Node Graph */}
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', position: 'relative' }}>
//                   <div style={{ position: 'absolute', top: '15px', left: '8%', right: '8%', height: '4px', backgroundColor: '#e9ecef', zIndex: 1 }}></div>

//                   {['in transit', 'landed', 'ready to collect', 'collected'].map((step, idx) => {
//                     const currentStatusLower = (publicTrackingData.status || '').toLowerCase();
//                     const statusOrder = ['in transit', 'landed', 'ready to collect', 'collected'];
//                     const currentIdx = statusOrder.indexOf(currentStatusLower);
//                     const isCompleted = statusOrder.indexOf(step) <= currentIdx;

//                     return (
//                       <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 2 }}>
//                         <div style={{
//                           width: '32px', height: '32px', borderRadius: '50%',
//                           backgroundColor: isCompleted ? '#0056b3' : '#fff',
//                           border: isCompleted ? '2px solid #0056b3' : '2px solid #ced4da',
//                           color: isCompleted ? '#fff' : '#ced4da',
//                           display: 'flex', alignItems: 'center', justifyContent: 'center',
//                           fontWeight: 'bold', fontSize: '14px'
//                         }}>
//                           {isCompleted ? '✓' : idx + 1}
//                         </div>
//                         <span style={{ marginTop: '8px', fontSize: '11px', fontWeight: isCompleted ? 'bold' : 'normal', color: isCompleted ? '#212529' : '#6c757d', textTransform: 'capitalize', textAlign: 'center' }}>
//                           {step}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </section>
//           )}

//           {/* Restored Services Section */}
//           <section className="services-section">
//             <div className="container">
//               <div className="services-intro">
//                 <h2>Our Services</h2>
//                 <h3>Embark on a Global Journey with Namaste
//                     </h3> <h3>Sewaro Cargo Service</h3>
//                 <p>
//                   Experience the world at your doorstep with our extensive network of shipping destinations. 
//                   Our commitment to reliability, affordability, and convenience ensures that your cargo 
//                   travels seamlessly across borders.
//                 </p>
//               </div>

//               <div className="services-grid">
//   <div className="services-slider" ref={scrollRef}>
    
//     {/* --- CARD 1: AIR FREIGHT --- */}
//     <div className="service-card">
//       <div className="service-img-wrapper">
//         <img src={airFreightImg} alt="Air Freight" />
//       </div>
//       <div className="service-info">
//         <h4>Air Freight Services</h4>
//         <p>Fast and efficient air cargo facilitation operating out of Tribhuvan International Airport (TIA) connecting Kathmandu directly to global airlines.</p>
//       </div>
//     </div>

//     {/* --- CARD 2: LAND TRANSPORT --- */}
//     <div className="service-card">
//       <div className="service-img-wrapper">
//         <img src={landTransportImg} alt="Land Transport & Courier" />
//       </div>
//       <div className="service-info">
//         <h4>Land Transport & Courier</h4>
//         <p>Secure cross-border logistics and express courier handling optimized for small parcels, priority packages, and bulk ground shipments.</p>
//       </div>
//     </div>

//     {/* --- CARD 3: CARGO STORAGE --- */}
//     <div className="service-card">
//       <div className="service-img-wrapper">
//         <img src={cargoStorageImg} alt="Cargo Storage" />
//       </div>
//       <div className="service-info">
//         <h4>Secure Cargo Storage</h4>
//         <p>Premium warehouse facilities providing managed secure placement, 24/7 monitoring, and full protection for goods awaiting transit updates.</p>
//       </div>
//     </div>

//   </div>
// </div>

//               <div className="destinations-badge">
//                 <span>Serving: USA • UK • Hong Kong • Portugal • Japan • Dubai • Malaysia • +Many more</span>
//               </div>
//             </div>
//           </section>

//           {/* Why Choose Us Section */}
//           <section className="services-showcase-container">
      
//       {/* --- SECTION 1: SECURE HANDLING --- */}
//       <div className="services-showcase-row">
//         <div className="services-showcase-image-wrapper">
//           <img src={secureImg} alt="Secure Handling" />
//         </div>
//         {/* The text is now housed inside a padded card component border */}
//         <div className="services-card-wrapper">
//           <span className="services-mini-badge">🛡️ SECURE STORAGE</span>
//           <h4>Is my cargo safe during transit?</h4>
//           <p>
//             <strong>Absolutely secure.</strong> We provide premium logistics handling backed by 
//             comprehensive protection strategies. Every shipment is processed through monitored 
//             hubs with absolute, specialized professional care.
//           </p>
//         </div>
//       </div>

//       {/* --- SECTION 2: FAST SERVICE --- */}
//       <div className="services-showcase-row row-reverse">
//         <div className="services-showcase-image-wrapper">
//           <img src={fastServiceImg} alt="Fast Service" />
//         </div>
//         <div className="services-card-wrapper">
//           <span className="services-mini-badge">⏱️ EXPRESS DELIVERY</span>
//           <h4>How fast can I get my delivery?</h4>
//           <p>
//             <strong>Rapid and reliable.</strong> Our express routing network bypasses traditional 
//             supply chain bottlenecks, delivering the fastest possible transit windows from Nepal 
//             directly to global destinations right on schedule.
//           </p>
//         </div>
//       </div>

//       {/* --- SECTION 3: RELIABLE SUPPORT --- */}
//       <div className="services-showcase-row">
//         <div className="services-showcase-image-wrapper">
//           <img src={reliableImg} alt="Reliable Support" />
//         </div>
//         <div className="services-card-wrapper">
//           <span className="services-mini-badge">📞 24/7 AVAILABILITY</span>
//           <h4>Can I get help at any hour?</h4>
//           <p>
//             <strong>Always dependable.</strong> Logistics never sleeps, and neither do we. 
//             Our dedicated global support team tracks your cargo across time zones, keeping your supply 
//             chain completely predictable and clear from origin to destination.
//           </p>
//         </div>
//       </div>

//       {/* --- SECTION 4: AFFORDABLE PRICING --- */}
//       <div className="services-showcase-row row-reverse">
//         <div className="services-showcase-image-wrapper">
//           <img src={affordableImg} alt="Affordable Rates" />
//         </div>
//         <div className="services-card-wrapper">
//           <span className="services-mini-badge">💰 COST EFFECTIVE</span>
//           <h4>Are international shipping rates high?</h4>
//           <p>
//             <strong>Highly cost-effective.</strong> We combine optimized container pooling with 
//             transparent customs clearances to deliver competitive freight rates that fit your 
//             business scale without hidden operational surcharges.
//           </p>
//         </div>
//       </div>

//     </section>

//           {/* Contact & Footer Section */}
//           <footer className="footer-section">
//             <div className="footer-container">
//               <div className="footer-column">
//                 <div className="footer-logo">
//                   <img src="/logo.png" alt="Sewa Logistics" className="logo-image-footer" />
//                   <span className="footer-logo-text">SEWA LOGISTICS</span>
//                 </div>
//                 <p className="footer-tagline">
//                   Your trusted partner for global logistics and cargo services from Nepal to the world.
//                 </p>
//               </div>

//               <div className="footer-column">
//                 <h4>Physical Address</h4>
//                 <p className="address-text">
//                   Kathmandu, Nepal<br />
//                   (Main Office)
//                 </p>
//                 <div className="footer-map">
//                   <iframe 
//                     title="Sewa Logistics Location"
//                     src="https://maps.google.com/maps?q=Kathmandu,Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed"
//                     width="100%" 
//                     height="150" 
//                     style={{ border: 0, borderRadius: "8px", marginTop: "15px" }} 
//                     allowFullScreen="" 
//                     loading="lazy" 
//                     referrerPolicy="no-referrer-when-downgrade"
//                   ></iframe>
//                 </div>
//               </div>

//               <div className="footer-column">
//                 <h4>Contact Info</h4>
//                 <div className="contact-links">
//                   <a href="tel:+9779851134936" className="contact-link">
//                     📞 +977 9851134936
//                   </a>
//                   <a href="mailto:namastesewaro@gmail.com" className="contact-link">
//                     ✉️ namastesewaro@gmail.com
//                   </a>
//                 </div>
//               </div>
//             </div>
            
//             <div className="footer-bottom">
//               <p>© {new Date().getFullYear()} Sewa Logistics. All Rights Reserved.</p>
//             </div>
//           </footer>
//         </>
//       )}

//       {showSuccess && (
//         <SuccessModal message="Your email has been verified. You can now sign in." onConfirm={() => { setShowSuccess(false); setAuthMode('login'); setTempEmail(''); }} />
//       )}
//     </div>
//   );
// }

// export default App;




// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import LoginPage from './views/LoginPage'; 
// import Navbar from './components/Navbar';       
// import Dashboard from './views/Dashboard';
// import Register from './views/Register';
// import VerifyOTP from './views/VerifyOTP';
// import SuccessModal from './components/SuccessModal';
// import BarcodeScannerModal from './components/BarcodeScannerModal'; 
// import ShippingLabel from './views/ShippingLabel'; 
// import secureImg from './assets/SECURE.png';
// import fastServiceImg from './assets/FAST SERVICE.PNG';
// import reliableImg from './assets/RELIABLE.PNG';
// import affordableImg from './assets/AFFORDABLE.png';

// import airFreightImg from './assets/airfreight.png';
// import cargoStorageImg from './assets/cargostorage.png';
// import landTransportImg from './assets/landtransport.png';

// import Quote from './views/Quote';

// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authMode, setAuthMode] = useState('login'); 
//   const [tempEmail, setTempEmail] = useState(''); 
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [userRole, setUserRole] = useState(null); 
//   const [currentUser, setCurrentUser] = useState(null); 
//   const [isLoadingCache, setIsLoadingCache] = useState(true); 

//   // 📸 Scanner states & Standalone Public Label viewer states
//   const [isScannerOpen, setIsScannerOpen] = useState(false);
//   const [publicLabelData, setPublicLabelData] = useState(null);
//   const [isFetchingLabel, setIsFetchingLabel] = useState(false);
//   const [scanError, setScanError] = useState('');

//   // 🔍 Public Track Input Box Form States
//   const [trackingNumberInput, setTrackingNumberInput] = useState('');
//   const [publicTrackingData, setPublicTrackingData] = useState(null);
//   const [isSearchingTrack, setIsSearchingTrack] = useState(false);
//   const [trackSearchError, setTrackSearchError] = useState('');

//   const [registerFormData, setRegisterFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
//   const menuItems = ["Home", "Customer Service", "Request a quote"];
//   const scrollRef = useRef(null);

//   const handleGoToRegister = () => setAuthMode('register');
//   const handleBackToLogin = () => setAuthMode('login');

//   const [showQuote, setShowQuote] = useState(false);

//   // const handleLoginSuccess = (userData) => {
//   //   setIsLoggedIn(true);
//   //   setShowLogin(false);
//   //   setShowQuote(false); // Clear overlay views on login
//   //   setUserRole(userData.role); 
//   //   setCurrentUser(userData); 
//   //   localStorage.setItem('sewa_user', JSON.stringify(userData));
//   // };

//   // const handleLogout = () => {
//   //   setIsLoggedIn(false);
//   //   setShowLogin(false);
//   //   setShowQuote(false);
//   //   setAuthMode('login');
//   //   setTempEmail('');
//   //   setCurrentUser(null);
//   //   setUserRole(null);
//   //   localStorage.removeItem('sewa_user');
//   //   localStorage.removeItem('sewa_user_id');
//   //   localStorage.removeItem('shp_sender');
//   //   localStorage.removeItem('shp_receiver');
//   //   localStorage.removeItem('shp_packages');
//   //   localStorage.clear();
//   // };
//   const handleLoginSuccess = (userData) => {
//     setIsLoggedIn(true);
//     setShowLogin(false);
//     setShowQuote(false); // Clear overlay views on login
//     setUserRole(userData.role); 
//     setCurrentUser(userData); 
//     localStorage.setItem('sewa_user', JSON.stringify(userData));

//     // 🛡️ Create a unique history checkpoint for this active dashboard session.
//     // This allows us to catch the browser back arrow click.
//     window.history.pushState({ dashboardActive: true }, '', window.location.pathname);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowLogin(false);
//     setShowQuote(false);
//     setAuthMode('login');
//     setTempEmail('');
//     setCurrentUser(null);
//     setUserRole(null);
    
//     // Explicitly clean up security items
//     localStorage.removeItem('sewa_user');
//     localStorage.removeItem('sewa_user_id');
//     localStorage.removeItem('shp_sender');
//     localStorage.removeItem('shp_receiver');
//     localStorage.removeItem('shp_packages');
    
//     // Nuke any remaining local data configurations safely
//     localStorage.clear();

//     // 🛡️ Wipe the forward/back history context list
//     window.history.replaceState(null, '', window.location.pathname);
//   };
// // 🛡️ Monitor browser layout history and fix Back/Forward state leakage
// useEffect(() => {
//   const checkSessionSecurity = () => {
//     const savedUser = localStorage.getItem('sewa_user');
    
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setIsLoggedIn(true);
//       setCurrentUser(parsedUser);
//       setUserRole(parsedUser.role);
//     } else {
//       // Force exit out of dashboard state if cache was cleared or is invalid
//       setIsLoggedIn(false);
//       setCurrentUser(null);
//       setUserRole(null);
//     }
//   };
  
//   // --- Auto-scroll effect for Services Slider ---
//   useEffect(() => {
//     if (isLoggedIn || showLogin || publicLabelData || showQuote) return; 

//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//         if (scrollLeft + clientWidth >= scrollWidth - 10) {
//           scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//         }
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [isLoggedIn, showLogin, publicLabelData, showQuote]);

//   // 🔍 Manual Tracking Box Search Handler
//   const handlePublicTrackSearch = async (e) => {
//     if (e) e.preventDefault();
//     if (!trackingNumberInput.trim()) return;

//     setIsSearchingTrack(true);
//     setTrackSearchError('');
//     setPublicTrackingData(null);

//     try {
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${trackingNumberInput.trim()}`);
//       if (!response.ok) {
//         throw new Error(`Tracking reference "${trackingNumberInput}" not found. Please enter a valid reference ID.`);
//       }
//       const data = await response.json();
//       setPublicTrackingData(data);
//     } catch (err) {
//       console.error("Tracking field fetch error:", err);
//       setTrackSearchError(err.message);
//     } finally {
//       setIsSearchingTrack(false);
//     }
//   };


//   // Listen to popstate (back/forward history clicks)
//   window.addEventListener('popstate', checkSessionSecurity);
  
//   // Run on mount to catch active forward clicks
//   checkSessionSecurity();

//   return () => {
//     window.removeEventListener('popstate', checkSessionSecurity);
//   };
// }, [isLoggedIn]); // Triggers validation on state switches




//   // 🎯 Fetch and transform data for unauthenticated label viewing
//   const handleBarcodeDetection = async (detectedTrackingId) => {
//     setIsScannerOpen(false);
//     setIsFetchingLabel(true);
//     setScanError('');

//     try {
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${detectedTrackingId}`);
//       if (!response.ok) {
//         throw new Error(`Tracking reference # ${detectedTrackingId} is not correct. Please enter a valid Tracking number.`);
//       }
      
//       const dbData = await response.json();

//       const structuredLabel = {
//         previewTrackingId: dbData.tracking_id,
//         senderInfo: {
//           fullName: dbData.shipper_name,
//           contactNum: dbData.shipper_phone,
//           address: dbData.shipper_address,
//           city: dbData.shipper_city,
//           country: dbData.shipper_country
//         },
//         receiverInfo: {
//           fullName: dbData.receiver_name,
//           contactNumber: dbData.receiver_phone,
//           fullAddress: dbData.receiver_address,
//           city: dbData.receiver_city,
//           country: dbData.receiver_country,
//           email: dbData.receiver_email || "N/A"
//         },
//         billingInfo: {
//           method: dbData.payment_method,
//           total: dbData.total_amount,
//           currency: dbData.currency
//         },
//         packages: (dbData.shipment_package || []).map(p => ({
//           id: p.id,
//           type: p.type,
//           items: (p.shipment_item || []).map(i => ({
//             weight: i.weight,
//             description: i.description,
//             qty: i.qty
//           }))
//         }))
//       };

//       setPublicLabelData(structuredLabel);

//     } catch (err) {
//       console.error("Scan fetch error:", err);
//       setScanError(err.message);
//     } finally {
//       setIsFetchingLabel(false);
//     }
//   };

//   useEffect(() => {
//     const savedUser = localStorage.getItem('sewa_user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setIsLoggedIn(true);
//       setCurrentUser(parsedUser);
//       setUserRole(parsedUser.role);
//     }
//     setIsLoadingCache(false);
//   }, []);

//   if (isLoadingCache) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
//         <h3>Loading Secure Session Data...</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="layout">
      
//       {!isLoggedIn && (
//         <Navbar 
//           menuItems={menuItems} 
//           onScannerClick={() => { setPublicLabelData(null); setShowQuote(false); setIsScannerOpen(true); }} 
//           onLoginClick={() => { setShowLogin(true); setAuthMode('login'); setIsLoggedIn(false); setPublicLabelData(null); setShowQuote(false); }} 
//           onHomeClick={() => { setShowLogin(false); setIsLoggedIn(false); setAuthMode('login'); setTempEmail(''); setPublicLabelData(null); setPublicTrackingData(null); setShowQuote(false); }}
//           onRequestQuoteClick={() => { setShowQuote(true); setShowLogin(false); setPublicLabelData(null); setPublicTrackingData(null); }}
//         />
//       )}

//       {/* Global Fetch Status Notifications */}
//       {isFetchingLabel && (
//         <div className="scan-loading-toast" style={{ position: 'fixed', top: '20px', right: '20px', background: '#333', color: '#fff', padding: '12px 24px', borderRadius: '4px', zIndex: 10000, fontWeight: 'bold' }}>
//           ⏳ Fetching shipment record...
//         </div>
//       )}

//       {scanError && (
//         <div style={{ maxWidth: '450px', margin: '20px auto', padding: '15px', backgroundColor: '#fff5f5', border: '1px solid #fc8181', borderRadius: '6px', color: '#c53030', textAlign: 'center' }}>
//           ⚠️ <strong>Scan Error:</strong> {scanError}
//           <button onClick={() => setScanError('')} style={{ display: 'block', margin: '10px auto 0', background: '#c53030', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>Dismiss</button>
//         </div>
//       )}
      
//       {/* DISPLAY COMPONENT OVERLAY FOR UNAUTHENTICATED USERS */}
//       {showQuote ? (
//         <Quote onBackHome={() => setShowQuote(false)} />
//       ) : publicLabelData ? (
//         <div className="public-label-viewer" style={{ padding: '40px 20px', backgroundColor: '#f1f3f5', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
//             <button onClick={() => window.print()} style={{ background: '#212529', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
//               🖨️ Print Label
//             </button>
//             <button onClick={() => setPublicLabelData(null)} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
//               ✕ Close Label
//             </button>
//           </div>
          
//           <ShippingLabel 
//             previewTrackingId={publicLabelData.previewTrackingId}
//             senderInfo={publicLabelData.senderInfo}
//             receiverInfo={publicLabelData.receiverInfo}
//             billingInfo={publicLabelData.billingInfo}
//             packages={publicLabelData.packages}
//           />
//         </div>
//       ) : isLoggedIn ? (
//         <Dashboard onLogout={handleLogout} userRole={userRole} user={currentUser} />
//       ) : showLogin ? (
//         <div className="auth-container-wrapper">
//           {authMode === 'login' && <LoginPage onSignIn={handleLoginSuccess} onGoToRegister={handleGoToRegister} />}
//           {authMode === 'register' && <Register formData={registerFormData} setFormData={setRegisterFormData} onBackToLogin={handleBackToLogin} onRegisterSuccess={(email) => { setTempEmail(email); setAuthMode('verify'); }} />}
//           {authMode === 'verify' && <VerifyOTP email={tempEmail} onVerifySuccess={() => { setShowSuccess(true); setRegisterFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); setAuthMode('login'); }} onBackToRegister={() => setAuthMode('register')} />}
//         </div>
//       ) : (
//         <>
//           {/* Home Hero Screen Interface */}
//           <section className="hero-banner">
//             <div className="hero-overlay">
//               <div className="hero-content">
//                 <h1>Reliable Logistics for Nepal</h1>
//                 <p>Fast, secure, and real-time tracking for all your shipments.</p>
                
//                 <form onSubmit={handlePublicTrackSearch} style={{
//                   display: 'flex',
//                   backgroundColor: '#ffffff',
//                   padding: '6px',
//                   borderRadius: '30px',
//                   maxWidth: '520px',
//                   width: '90%',
//                   margin: '25px auto 0 auto',
//                   boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
//                   boxSizing: 'border-box'
//                 }}>
//                   <input 
//                     type="text" 
//                     placeholder="Enter Tracking Number or Invoice ID..." 
//                     value={trackingNumberInput}
//                     onChange={(e) => setTrackingNumberInput(e.target.value)}
//                     style={{
//                       flex: 1,
//                       border: 'none',
//                       outline: 'none',
//                       padding: '12px 20px',
//                       fontSize: '15px',
//                       borderRadius: '30px 0 0 30px',
//                       color: '#000000'
//                     }}
//                   />
//                   <button 
//                     type="submit" 
//                     disabled={isSearchingTrack}
//                     style={{
//                       background: '#0056b3',
//                       color: '#fff',
//                       border: 'none',
//                       padding: '12px 28px',
//                       borderRadius: '25px',
//                       fontWeight: 'bold',
//                       cursor: 'pointer',
//                       fontSize: '15px',
//                       transition: 'background 0.2s',
//                       whiteSpace: 'nowrap'
//                     }}
//                   >
//                     {isSearchingTrack ? 'Tracking...' : 'Track'}
//                   </button>
//                 </form>

//                 {trackSearchError && (
//                   <div style={{ marginTop: '15px', color: '#ff8787', fontWeight: 'bold', fontSize: '14px' }}>
//                     ⚠️ {trackSearchError}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* Visual Status Roadmap Panel */}
//           {publicTrackingData && (
//             <section style={{ padding: '40px 20px', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center' }}>
//               <div style={{
//                 backgroundColor: '#ffffff',
//                 maxWidth: '650px',
//                 width: '100%',
//                 padding: '30px',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
//                 borderTop: '5px solid #0056b3'
//               }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
//                   <div>
//                     <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold', textTransform: 'uppercase' }}>Shipment Reference</span>
//                     <h3 style={{ margin: '2px 0 0 0', color: '#0056b3', fontFamily: 'monospace', fontSize: '20px' }}>{publicTrackingData.tracking_id}</h3>
//                   </div>
//                   <div style={{ textAlign: 'right' }}>
//                     <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold' }}>Current Status</span>
//                     <div style={{
//                       marginTop: '4px',
//                       padding: '6px 14px',
//                       borderRadius: '20px',
//                       fontSize: '12px',
//                       fontWeight: 'bold',
//                       display: 'inline-block',
//                       backgroundColor: 
//                         publicTrackingData.status?.toLowerCase() === 'collected' ? '#d4edda' :
//                         publicTrackingData.status?.toLowerCase() === 'ready to collect' ? '#cce5ff' :
//                         publicTrackingData.status?.toLowerCase() === 'landed' ? '#d1ecf1' :
//                         publicTrackingData.status?.toLowerCase() === 'in transit' ? '#fff3cd' : '#e2e3e5',
//                       color: 
//                         publicTrackingData.status?.toLowerCase() === 'collected' ? '#155724' :
//                         publicTrackingData.status?.toLowerCase() === 'ready to collect' ? '#004085' :
//                         publicTrackingData.status?.toLowerCase() === 'landed' ? '#0c5460' :
//                         publicTrackingData.status?.toLowerCase() === 'in transit' ? '#856404' : '#383d41',
//                       textTransform: 'uppercase'
//                     }}>
//                       {publicTrackingData.status || 'Pending'}
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', position: 'relative' }}>
//                   <div style={{ position: 'absolute', top: '15px', left: '8%', right: '8%', height: '4px', backgroundColor: '#e9ecef', zIndex: 1 }}></div>

//                   {['in transit', 'landed', 'ready to collect', 'collected'].map((step, idx) => {
//                     const currentStatusLower = (publicTrackingData.status || '').toLowerCase();
//                     const statusOrder = ['in transit', 'landed', 'ready to collect', 'collected'];
//                     const currentIdx = statusOrder.indexOf(currentStatusLower);
//                     const isCompleted = statusOrder.indexOf(step) <= currentIdx;

//                     return (
//                       <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 2 }}>
//                         <div style={{
//                           width: '32px', height: '32px', borderRadius: '50%',
//                           backgroundColor: isCompleted ? '#0056b3' : '#fff',
//                           border: isCompleted ? '2px solid #0056b3' : '2px solid #ced4da',
//                           color: isCompleted ? '#fff' : '#ced4da',
//                           display: 'flex', alignItems: 'center', justifyContent: 'center',
//                           fontWeight: 'bold', fontSize: '14px'
//                         }}>
//                           {isCompleted ? '✓' : idx + 1}
//                         </div>
//                         <span style={{ marginTop: '8px', fontSize: '11px', fontWeight: isCompleted ? 'bold' : 'normal', color: isCompleted ? '#212529' : '#6c757d', textTransform: 'capitalize', textAlign: 'center' }}>
//                           {step}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </section>
//           )}

//           {/* Services Section */}
//           <section className="services-section">
//             <div className="container">
//               <div className="services-intro">
//                 <h2>Our Services</h2>
//                 <h3>Embark on a Global Journey with Namaste</h3> 
//                 <h3>Sewaro Cargo Service</h3>
//                 <p>
//                   Experience the world at your doorstep with our extensive network of shipping destinations. 
//                   Our commitment to reliability, affordability, and convenience ensures that your cargo 
//                   travel seamlessly across borders.
//                 </p>
//               </div>

//               <div className="services-grid">
//                 <div className="services-slider" ref={scrollRef}>
//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src={airFreightImg} alt="Air Freight" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Air Freight Services</h4>
//                       <p>Fast and efficient air cargo facilitation operating out of Tribhuvan International Airport (TIA) connecting Kathmandu directly to global airlines.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src={landTransportImg} alt="Land Transport & Courier" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Land Transport & Courier</h4>
//                       <p>Secure cross-border logistics and express courier handling optimized for small parcels, priority packages, and bulk ground shipments.</p>
//                     </div>
//                   </div>

//                   <div className="service-card">
//                     <div className="service-img-wrapper">
//                       <img src={cargoStorageImg} alt="Cargo Storage" />
//                     </div>
//                     <div className="service-info">
//                       <h4>Secure Cargo Storage</h4>
//                       <p>Premium warehouse facilities providing managed secure placement, 24/7 monitoring, and full protection for goods awaiting transit updates.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="destinations-badge">
//                 <span>Serving: USA • UK • Hong Kong • Portugal • Japan • Dubai • Malaysia • +Many more</span>
//               </div>
//             </div>
//           </section>

//           {/* Why Choose Us Section */}
//           <section className="services-showcase-container">
//             <div className="services-showcase-row">
//               <div className="services-showcase-image-wrapper">
//                 <img src={secureImg} alt="Secure Handling" />
//               </div>
//               <div className="services-card-wrapper">
//                 <span className="services-mini-badge">🛡️ SECURE STORAGE</span>
//                 <h4>Is my cargo safe during transit?</h4>
//                 <p>
//                   <strong>Absolutely secure.</strong> We provide premium logistics handling backed by 
//                   comprehensive protection strategies. Every shipment is processed through monitored 
//                   hubs with absolute, specialized professional care.
//                 </p>
//               </div>
//             </div>

//             <div className="services-showcase-row row-reverse">
//               <div className="services-showcase-image-wrapper">
//                 <img src={fastServiceImg} alt="Fast Service" />
//               </div>
//               <div className="services-card-wrapper">
//                 <span className="services-mini-badge">⏱️ EXPRESS DELIVERY</span>
//                 <h4>How fast can I get my delivery?</h4>
//                 <p>
//                   <strong>Rapid and reliable.</strong> Our express routing network bypasses traditional 
//                   supply chain bottlenecks, delivering the fastest possible transit windows from Nepal 
//                   directly to global destinations right on schedule.
//                 </p>
//               </div>
//             </div>

//             <div className="services-showcase-row">
//               <div className="services-showcase-image-wrapper">
//                 <img src={reliableImg} alt="Reliable Support" />
//               </div>
//               <div className="services-card-wrapper">
//                 <span className="services-mini-badge">📞 24/7 AVAILABILITY</span>
//                 <h4>Can I get help at any hour?</h4>
//                 <p>
//                   <strong>Always dependable.</strong> Logistics never sleeps, and neither do we. 
//                   Our dedicated global support team tracks your cargo across time zones, keeping your supply 
//                   chain completely predictable and clear from origin to destination.
//                 </p>
//               </div>
//             </div>

//             <div className="services-showcase-row row-reverse">
//               <div className="services-showcase-image-wrapper">
//                 <img src={affordableImg} alt="Affordable Rates" />
//               </div>
//               <div className="services-card-wrapper">
//                 <span className="services-mini-badge">💰 COST EFFECTIVE</span>
//                 <h4>Are international shipping rates high?</h4>
//                 <p>
//                   <strong>Highly cost-effective.</strong> We combine optimized container pooling with 
//                   transparent customs clearances to deliver competitive freight rates that fit your 
//                   business scale without hidden operational surcharges.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Contact & Footer Section */}
//           <footer className="footer-section">
//             <div className="footer-container">
//               <div className="footer-column">
//                 <div className="footer-logo">
//                   <img src="/logo.png" alt="Sewa Logistics" className="logo-image-footer" />
//                   <span className="footer-logo-text">SEWA LOGISTICS</span>
//                 </div>
//                 <p className="footer-tagline">
//                   Your trusted partner for global logistics and cargo services from Nepal to the world.
//                 </p>
//               </div>

//               <div className="footer-column">
//                 <h4>Physical Address</h4>
//                 <p className="address-text">
//                   Kathmandu, Nepal<br />
//                   (Main Office)
//                 </p>
//                 <div className="footer-map">
//                   <iframe 
//                     title="Sewa Logistics Location"
//                     src="https://maps.google.com/maps?q=Kathmandu,Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed"
//                     width="100%" 
//                     height="150" 
//                     style={{ border: 0, borderRadius: "8px", marginTop: "15px" }} 
//                     allowFullScreen="" 
//                     loading="lazy" 
//                     referrerPolicy="no-referrer-when-downgrade"
//                   ></iframe>
//                 </div>
//               </div>

//               <div className="footer-column">
//                 <h4>Contact Info</h4>
//                 <div className="contact-links">
//                   <a href="tel:+9779851134936" className="contact-link">
//                     📞 +977 9851134936
//                   </a>
//                   <a href="mailto:namastesewaro@gmail.com" className="contact-link">
//                     ✉️ namastesewaro@gmail.com
//                   </a>
//                 </div>
//               </div>
//             </div>
            
//             <div className="footer-bottom">
//               <p>© {new Date().getFullYear()} Sewa Logistics. All Rights Reserved.</p>
//             </div>
//           </footer>
//         </>
//       )}

//       {/* 🛠️ MOVE STRATEGIC MODALS OUTSIDE OF CONDITIONAL VIEWS */}
//       {/* This ensures the scanner renders cleanly over any page layout */}
//       <BarcodeScannerModal 
//         isOpen={isScannerOpen}
//         onClose={() => setIsScannerOpen(false)}
//         onScanSuccess={handleBarcodeDetection}
//       />

//       {showSuccess && (
//         <SuccessModal message="Your email has been verified. You can now sign in." onConfirm={() => { setShowSuccess(false); setAuthMode('login'); setTempEmail(''); }} />
//       )}
//     </div>
//   );
// }

// export default App;


















import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LoginPage from './views/LoginPage'; 
import Navbar from './components/Navbar';       
import Dashboard from './views/Dashboard';
import Register from './views/Register';
import VerifyOTP from './views/VerifyOTP';
import SuccessModal from './components/SuccessModal';
import BarcodeScannerModal from './components/BarcodeScannerModal'; 
import ShippingLabel from './views/ShippingLabel'; 

import secureimg from './assets/secure.png';
import fastserviceimg from './assets/fast_service.png';
import reliableimg from './assets/reliable.png';
import affordableimg from './assets/affordable.png';

import airfreightimg from './assets/airfreight.png';
import cargostorageimg from './assets/cargostorage.png';
import landtransportimg from './assets/landtransport.png';

import Quote from './views/Quote';
import CustomerService from './components/CustomerService'; 
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [tempEmail, setTempEmail] = useState(''); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [isLoadingCache, setIsLoadingCache] = useState(true); 

  // 📸 Scanner states & Standalone Public Label viewer states
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [publicLabelData, setPublicLabelData] = useState(null);
  const [isFetchingLabel, setIsFetchingLabel] = useState(false);
  const [scanError, setScanError] = useState('');

  // 🔍 Public Track Input Box Form States
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [publicTrackingData, setPublicTrackingData] = useState(null);
  const [isSearchingTrack, setIsSearchingTrack] = useState(false);
  const [trackSearchError, setTrackSearchError] = useState('');

  const [registerFormData, setRegisterFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const menuItems = ["Home", "Customer Service", "Request a quote"];
  const scrollRef = useRef(null);
const [showCustomerService, setShowCustomerService] = useState(false);
  const handleGoToRegister = () => setAuthMode('register');
  const handleBackToLogin = () => setAuthMode('login');

  const [showQuote, setShowQuote] = useState(false);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowQuote(false); 
    setUserRole(userData.role); 
    setCurrentUser(userData); 
    localStorage.setItem('sewa_user', JSON.stringify(userData));

    // 🛡️ Create a unique history checkpoint for this active dashboard session.
    window.history.pushState({ dashboardActive: true }, '', window.location.pathname);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(false);
    setShowQuote(false);
    setAuthMode('login');
    setTempEmail('');
    setCurrentUser(null);
    setUserRole(null);
    
    // Explicitly clean up security items
    localStorage.removeItem('sewa_user');
    localStorage.removeItem('sewa_user_id');
    localStorage.removeItem('shp_sender');
    localStorage.removeItem('shp_receiver');
    localStorage.removeItem('shp_packages');
    
    // Nuke any remaining local data configurations safely
    localStorage.clear();

    // 🛡️ Wipe the forward/back history context list
    window.history.replaceState(null, '', window.location.pathname);
  };

  // ✅ HOOK 1: Monitor session storage context changes
  useEffect(() => {
    const checkSessionSecurity = () => {
      const savedUser = localStorage.getItem('sewa_user');
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setIsLoggedIn(true);
        setCurrentUser(parsedUser);
        setUserRole(parsedUser.role);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setUserRole(null);
      }
    };

    window.addEventListener('popstate', checkSessionSecurity);
    checkSessionSecurity();

    return () => {
      window.removeEventListener('popstate', checkSessionSecurity);
    };
  }, []);

  // ✅ HOOK 2: Intercept back button click independently (Fixed Nesting Rule)
  useEffect(() => {
    const handlePopState = (event) => {
      if (isLoggedIn) {
        console.warn("🛡️ Security Alert: Back button navigation detected. Terminating user session.");
        handleLogout();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isLoggedIn]); 

  // ✅ HOOK 3: Auto-scroll effect for Services Slider
  useEffect(() => {
    if (isLoggedIn || showLogin || publicLabelData || showQuote) return; 

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isLoggedIn, showLogin, publicLabelData, showQuote]);

  // ✅ HOOK 4: Cold Startup Application Cache Loading Setup
  useEffect(() => {
    const savedUser = localStorage.getItem('sewa_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setCurrentUser(parsedUser);
      setUserRole(parsedUser.role);
    }
    setIsLoadingCache(false);
  }, []);

  // 🔍 Manual Tracking Box Search Handler
  const handlePublicTrackSearch = async (e) => {
    if (e) e.preventDefault();
    if (!trackingNumberInput.trim()) return;

    setIsSearchingTrack(true);
    setTrackSearchError('');
    setPublicTrackingData(null);

    try {
      const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${trackingNumberInput.trim()}`);
      if (!response.ok) {
        throw new Error(`Tracking reference "${trackingNumberInput}" not found. Please enter a valid reference ID.`);
      }
      const data = await response.json();
      setPublicTrackingData(data);
    } catch (err) {
      console.error("Tracking field fetch error:", err);
      setTrackSearchError(err.message);
    } finally {
      setIsSearchingTrack(false);
    }
  };

  // 🎯 Fetch and transform data for unauthenticated label viewing
  const handleBarcodeDetection = async (detectedTrackingId) => {
    setIsScannerOpen(false);
    setIsFetchingLabel(true);
    setScanError('');

    try {
      const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${detectedTrackingId}`);
      if (!response.ok) {
        throw new Error(`Tracking reference # {detectedTrackingId} is not correct. Please enter a valid Tracking number.`);
      }
      
      const dbData = await response.json();

      const structuredLabel = {
        previewTrackingId: dbData.tracking_id,
        senderInfo: {
          fullName: dbData.shipper_name,
          contactNum: dbData.shipper_phone,
          address: dbData.shipper_address,
          city: dbData.shipper_city,
          country: dbData.shipper_country
        },
        receiverInfo: {
          fullName: dbData.receiver_name,
          contactNumber: dbData.receiver_phone,
          fullAddress: dbData.receiver_address,
          city: dbData.receiver_city,
          country: dbData.receiver_country,
          email: dbData.receiver_email || "N/A"
        },
        billingInfo: {
          method: dbData.payment_method,
          total: dbData.total_amount,
          currency: dbData.currency
        },
        packages: (dbData.shipment_package || []).map(p => ({
          id: p.id,
          type: p.type,
          items: (p.shipment_item || []).map(i => ({
            weight: i.weight,
            description: i.description,
            qty: i.qty
          }))
        }))
      };

      setPublicLabelData(structuredLabel);

    } catch (err) {
      console.error("Scan fetch error:", err);
      setScanError(err.message);
    } finally {
      setIsFetchingLabel(false);
    }
  };

  if (isLoadingCache) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
        <h3>Loading Secure Session Data...</h3>
      </div>
    );
  }


  return (
    <div className="layout">
      {!isLoggedIn && (
        <Navbar 
          menuItems={menuItems} 
          onScannerClick={() => { setPublicLabelData(null); setShowQuote(false); setShowCustomerService(false); setIsScannerOpen(true); }} 
          onLoginClick={() => { setShowLogin(true); setAuthMode('login'); setIsLoggedIn(false); setPublicLabelData(null); setShowQuote(false); setShowCustomerService(false); }} 
          onHomeClick={() => { setShowLogin(false); setIsLoggedIn(false); setAuthMode('login'); setTempEmail(''); setPublicLabelData(null); setPublicTrackingData(null); setShowQuote(false); setShowCustomerService(false); }}
          onRequestQuoteClick={() => { setShowQuote(true); setShowLogin(false); setPublicLabelData(null); setPublicTrackingData(null); setShowCustomerService(false); }}
          onCustomerServiceClick={() => { setShowCustomerService(true); setShowQuote(false); setShowLogin(false); setPublicLabelData(null); setPublicTrackingData(null); }}
        />
      )}

      {isFetchingLabel && (
        <div className="scan-loading-toast" style={{ position: 'fixed', top: '20px', right: '20px', background: '#333', color: '#fff', padding: '12px 24px', borderRadius: '4px', zIndex: 10000, fontWeight: 'bold' }}>
          ⏳ Fetching shipment record...
        </div>
      )}

      {scanError && (
        <div style={{ maxWidth: '450px', margin: '20px auto', padding: '15px', backgroundColor: '#fff5f5', border: '1px solid #fc8181', borderRadius: '6px', color: '#c53030', textAlign: 'center' }}>
          ⚠️ <strong>Scan Error:</strong> {scanError}
          <button onClick={() => setScanError('')} style={{ display: 'block', margin: '10px auto 0', background: '#c53030', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>Dismiss</button>
        </div>
      )}
      
      {/* 🚀 MAIN CONTENT VIEW ROUTER */}
      {showCustomerService ? (
        <CustomerService onBackClick={() => setShowCustomerService(false)} />
      ) : showQuote ? (
        <Quote onBackHome={() => setShowQuote(false)} />
      ) : publicLabelData ? (
        <div className="public-label-viewer" style={{ padding: '40px 20px', backgroundColor: '#f1f3f5', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} style={{ background: '#212529', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              🖨️ Print Label
            </button>
            <button onClick={() => setPublicLabelData(null)} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              ✕ Close Label
            </button>
          </div>
          
          <ShippingLabel 
            previewTrackingId={publicLabelData.previewTrackingId}
            senderInfo={publicLabelData.senderInfo}
            receiverInfo={publicLabelData.receiverInfo}
            billingInfo={publicLabelData.billingInfo}
            packages={publicLabelData.packages}
          />
        </div>
      ) : isLoggedIn ? (
        <Dashboard onLogout={handleLogout} userRole={userRole} user={currentUser} />
      ) : showLogin ? (
        <div className="auth-container-wrapper">
          {authMode === 'login' && <LoginPage onSignIn={handleLoginSuccess} onGoToRegister={handleGoToRegister} />}
          {authMode === 'register' && <Register formData={registerFormData} setFormData={setRegisterFormData} onBackToLogin={handleBackToLogin} onRegisterSuccess={(email) => { setTempEmail(email); setAuthMode('verify'); }} />}
          {authMode === 'verify' && <VerifyOTP email={tempEmail} onVerifySuccess={() => { setShowSuccess(true); setRegisterFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); setAuthMode('login'); }} onBackToRegister={() => setAuthMode('register')} />}
        </div>
      ) : (
        <>
          <section className="hero-banner">
            <div className="hero-overlay">
              <div className="hero-content">
                <h1>Reliable Logistics for Nepal</h1>
                <p>Fast, secure, and real-time tracking for all your shipments.</p>
                
                {/* <form onSubmit={handlePublicTrackSearch} style={{
                  display: 'flex',
                  backgroundColor: '#ffffff',
                  padding: '6px',
                  borderRadius: '30px',
                  maxWidth: '520px',
                  width: '90%',
                  margin: '25px auto 0 auto',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                  boxSizing: 'border-box'
                }}>
                  <input 
                    type="text" 
                    placeholder="Enter Tracking Number or Invoice ID..." 
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      padding: '12px 20px',
                      fontSize: '15px',
                      borderRadius: '30px 0 0 30px',
                      color: '#fffcfc'
                    }}
                  />
                  <button 
  type="submit" 
  disabled={isSearchingTrack}
  style={{
    background: '#0056b3',
    color: '#fff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '25px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px',
    transition: 'background 0.2s',
    whiteSpace: 'nowrap'
  }}
>
}
  {isSearchingTrack ? 'Searching...' : 'Track Now'}
</button>
                </form> */}
                <form 
  onSubmit={handlePublicTrackSearch} 
  className="search-track-form"
  style={{
    display: 'flex',
    backgroundColor: '#a7a5a5',
    padding: '6px',
    borderRadius: '30px',
    maxWidth: '520px',
    width: '90%',
    margin: '25px auto 0 auto',
    boxShadow: '0 4px 15px rgba(202, 202, 202, 0.15)',
    boxSizing: 'border-box',
    alignItems: 'center' /* 🌟 Ensures vertical alignment stays centered */
  }}
>
  <input 
    type="text" 
    placeholder="Enter Tracking Number..." 
    className="track-input-field"
    value={trackingNumberInput}
    onChange={(e) => setTrackingNumberInput(e.target.value)}
    style={{
      flex: '1 1 auto', /* 🌟 Tells the input field to greedily grow and occupy all available space */
      minWidth: '0',    /* 🚀 CRUCIAL: Allows flexbox to shrink the input properly on tiny phone screens */
      border: 'none',
      outline: 'none',
      padding: '10px 15px',
      fontSize: '14px',
      borderRadius: '30px 0 0 30px',
      color: '#fbfbfb' 
    }}
  />
  <button 
    type="submit" 
    className="track-submit-btn"
    disabled={isSearchingTrack}
    style={{
      flex: '0 0 auto',   /* 🌟 Prevents the button from growing or hogging space */
      background: '#0056b3',
      color: '#e1dede',
      border: 'none',
      padding: '10px 18px', /* 🌟 Reduced horizontal padding so it looks sleek on mobile */
      borderRadius: '25px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '14px',    /* 🌟 Kept clean and legible without ballooning */
      transition: 'background 0.2s',
      whiteSpace: 'nowrap'
    }}
  >
    {isSearchingTrack ? '...' : 'Track'} {/* 🌟 'Track' is much cleaner for mobile space than 'Track Now' */}
  </button>
</form>

                {trackSearchError && (
                  <div style={{ marginTop: '15px', color: '#d6dc1c', fontWeight: 'bold', fontSize: '14px' }}>
                    ⚠️ {trackSearchError}
                  </div>
                )}
              </div>
            </div>
          </section>

          {publicTrackingData && (
            <section style={{ padding: '40px 20px', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                backgroundColor: '#ffffff',
                maxWidth: '650px',
                width: '100%',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                borderTop: '5px solid #0056b3'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold', textTransform: 'uppercase' }}>Shipment Reference</span>
                    <h3 style={{ margin: '2px 0 0 0', color: '#0056b3', fontFamily: 'monospace', fontSize: '20px' }}>{publicTrackingData.tracking_id}</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold' }}>Current Status</span>
                    <div style={{
                      marginTop: '4px',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      display: 'inline-block',
                      backgroundColor: 
                        publicTrackingData.status?.toLowerCase() === 'collected' ? '#d4edda' :
                        publicTrackingData.status?.toLowerCase() === 'ready to collect' ? '#cce5ff' :
                        publicTrackingData.status?.toLowerCase() === 'landed' ? '#d1ecf1' :
                        publicTrackingData.status?.toLowerCase() === 'in transit' ? '#fff3cd' : '#e2e3e5',
                      color: 
                        publicTrackingData.status?.toLowerCase() === 'collected' ? '#155724' :
                        publicTrackingData.status?.toLowerCase() === 'ready to collect' ? '#004085' :
                        publicTrackingData.status?.toLowerCase() === 'landed' ? '#0c5460' :
                        publicTrackingData.status?.toLowerCase() === 'in transit' ? '#856404' : '#383d41',
                      textTransform: 'uppercase'
                    }}>
                      {publicTrackingData.status || 'Pending'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '15px', left: '8%', right: '8%', height: '4px', backgroundColor: '#e9ecef', zIndex: 1 }}></div>

                  {['in transit', 'landed', 'ready to collect', 'collected'].map((step, idx) => {
                    const currentStatusLower = (publicTrackingData.status || '').toLowerCase();
                    const statusOrder = ['in transit', 'landed', 'ready to collect', 'collected'];
                    const currentIdx = statusOrder.indexOf(currentStatusLower);
                    const isCompleted = statusOrder.indexOf(step) <= currentIdx;

                    return (
                      <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 2 }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          backgroundColor: isCompleted ? '#0056b3' : '#fff',
                          border: isCompleted ? '2px solid #0056b3' : '2px solid #ced4da',
                          color: isCompleted ? '#fff' : '#ced4da',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 'bold', fontSize: '14px'
                        }}>
                          {isCompleted ? '✓' : idx + 1}
                        </div>
                        <span style={{ marginTop: '8px', fontSize: '11px', fontWeight: isCompleted ? 'bold' : 'normal', color: isCompleted ? '#212529' : '#6c757d', textTransform: 'capitalize', textAlign: 'center' }}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          <section className="services-section">
            <div className="container">
              <div className="services-intro">
                <h2>Our Services</h2>
                <h3>Embark on a Global Journey with Namaste</h3> 
                <h3>Sewaro Cargo Service</h3>
                <p>
                  Experience the world at your doorstep with our extensive network of shipping destinations. 
                  Our commitment to reliability, affordability, and convenience ensures that your cargo 
                  travel seamlessly across borders.
                </p>
              </div>

              <div className="services-grid">
                <div className="services-slider" ref={scrollRef}>
                  <div className="service-card">
                    <div className="service-img-wrapper">
                      <img src={airfreightimg} alt="Air Freight" />
                    </div>
                    <div className="service-info">
                      <h4>Air Freight Services</h4>
                      <p>Fast and efficient air cargo facilitation operating out of Tribhuvan International Airport (TIA) connecting Kathmandu directly to global airlines.</p>
                    </div>
                  </div>

                  <div className="service-card">
                    <div className="service-img-wrapper">
                      <img src={landtransportimg} alt="Land Transport & Courier" />
                    </div>
                    <div className="service-info">
                      <h4>Land Transport & Courier</h4>
                      <p>Secure cross-border logistics and express courier handling optimized for small parcels, priority packages, and bulk ground shipments.</p>
                    </div>
                  </div>

                  <div className="service-card">
                    <div className="service-img-wrapper">
                      <img src={cargostorageimg} alt="Cargo Storage" />
                    </div>
                    <div className="service-info">
                      <h4>Secure Cargo Storage</h4>
                      <p>Premium warehouse facilities providing managed secure placement, 24/7 monitoring, and full protection for goods awaiting transit updates.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="destinations-badge">
                <span>Serving: USA • UK • Hong Kong • Portugal • Japan • Dubai • Malaysia • +Many more</span>
              </div>
            </div>
          </section>

          <section className="services-showcase-container">
            <div className="services-showcase-row">
              <div className="services-showcase-image-wrapper">
                <img src={secureimg} alt="Secure Handling" />
              </div>
              <div className="services-card-wrapper">
                <span className="services-mini-badge">🛡️ SECURE STORAGE</span>
                <h4>Is my cargo safe during transit?</h4>
                <p>
                  <strong>Absolutely secure.</strong> We provide premium logistics handling backed by 
                  comprehensive protection strategies. Every shipment is processed through monitored 
                  hubs with absolute, specialized professional care.
                </p>
              </div>
            </div>

            <div className="services-showcase-row row-reverse">
              <div className="services-showcase-image-wrapper">
                <img src={fastserviceimg} alt="Fast Service" />
              </div>
              <div className="services-card-wrapper">
                <span className="services-mini-badge">⏱️ EXPRESS DELIVERY</span>
                <h4>How fast can I get my delivery?</h4>
                <p>
                  <strong>Rapid and reliable.</strong> Our express routing network bypasses traditional 
                  supply chain bottlenecks, delivering the fastest possible transit windows from Nepal 
                  directly to global destinations right on schedule.
                </p>
              </div>
            </div>

            <div className="services-showcase-row">
              <div className="services-showcase-image-wrapper">
                <img src={reliableimg} alt="Reliable Support" />
              </div>
              <div className="services-card-wrapper">
                <span className="services-mini-badge">📞 24/7 AVAILABILITY</span>
                <h4>Can I get help at any hour?</h4>
                <p>
                  <strong>Always dependable.</strong> Logistics never sleeps, and neither do we. 
                  Our dedicated global support team tracks your cargo across time zones, keeping your supply 
                  chain completely predictable and clear from origin to destination.
                </p>
              </div>
            </div>

            <div className="services-showcase-row row-reverse">
              <div className="services-showcase-image-wrapper">
                <img src={affordableimg} alt="Affordable Rates" />
              </div>
              <div className="services-card-wrapper">
                <span className="services-mini-badge">💰 COST EFFECTIVE</span>
                <h4>Are international shipping rates high?</h4>
                <p>
                  <strong>Highly cost-effective.</strong> We combine optimized container pooling with 
                  transparent customs clearances to deliver competitive freight rates that fit your 
                  business scale without hidden operational surcharges.
                </p>
              </div>
            </div>
          </section>

          <footer className="footer-section">
            <div className="footer-container">
              <div className="footer-column">
                <div className="footer-logo">
                  <img src="/logo.png" alt="Sewa Logistics" className="logo-image-footer" />
                  <span className="footer-logo-text">SEWA LOGISTICS</span>
                </div>
                <p className="footer-tagline">
                  Your trusted partner for global logistics and cargo services from Nepal to the world.
                </p>
              </div>

              <div className="footer-column">
                <h4>Physical Address</h4>
                <p className="address-text">
                  Kathmandu, Nepal<br />
                  (Main Office)
                </p>
                <div className="footer-map">
                  <iframe 
                    title="Sewa Logistics Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.0943471929686!2d85.34781241086367!3d27.70213112562245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1963398eb051%3A0x60b70a200d3f7e25!2sNamaste%20Sewaro%20Travels%20%26%20Tours%20Pvt.Ltd!5e1!3m2!1sen!2snp!4v1779859656600!5m2!1sen!2snp" 
                    width="100%" 
                    height="150" 
                    style={{ border: 0, borderRadius: "8px", marginTop: "15px" }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div className="footer-column">
                <h4>Contact Info</h4>
                <div className="contact-links">
                  <a href="tel:+9779851134936" className="contact-link">
                    📞 +977 9851134936
                  </a>
                  <a href="mailto:namastesewaro@gmail.com" className="contact-link">
                    ✉️ namastesewaro@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Sewa Logistics. All Rights Reserved.</p>
            </div>
          </footer>
        </>
      )}

      <BarcodeScannerModal 
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleBarcodeDetection}
      />

      {showSuccess && (
        <SuccessModal message="Your email has been verified. You can now sign in." onConfirm={() => { setShowSuccess(false); setAuthMode('login'); setTempEmail(''); }} />
      )}
    </div>
  );
}

export default App;