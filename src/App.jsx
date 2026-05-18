
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LoginPage from './LoginPage'; 
import Navbar from './Navbar';       
import ShipmentStepper from './ShipmentStepper';
import Dashboard from './Dashboard';
import Register from './Register';
import VerifyOTP from './VerifyOTP';
import SuccessModal from './SuccessModal';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [tempEmail, setTempEmail] = useState(''); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin', 'agent', or 'customer'
  const [currentUser, setCurrentUser] = useState(null); // Holds { id, name, role }
  const [isLoadingCache, setIsLoadingCache] = useState(true); 

  const menuItems = ["Home", "Track Shipment", "Customer Service", "Rates"];
  const scrollRef = useRef(null);

  // --- Navigation Handlers ---
  const handleGoToRegister = () => {
    setAuthMode('register');
  };

  const handleBackToLogin = () => {
    setAuthMode('login');
  };

  // const handleLoginSuccess = () => {
  //   setIsLoggedIn(true);
  //   setShowLogin(false);
  //   setUserRole(useRouteLoaderData.role);
  // };
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setUserRole(userData.role); // Correctly sets 'admin', 'agent', etc.
    setCurrentUser(userData); // Sets state for immediate use
    localStorage.setItem('sewa_user', JSON.stringify(userData));
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(false);
    setAuthMode('login');
    setTempEmail('');
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('sewa_user');
    localStorage.removeItem('sewa_user_id');

    localStorage.removeItem('shp_sender');
    localStorage.removeItem('shp_receiver');
    localStorage.removeItem('shp_packages');
    //window.location.reload();
  };

  // --- Auto-scroll effect for Services Slider ---
  useEffect(() => {
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
  }, []);

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

  if (isLoadingCache) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
        <h3>Loading Secure Session Data...</h3>
      </div>
    );
  }
  return (
    <div className="layout">
      
      {/* Navbar logic */}
      {!isLoggedIn && (
        <Navbar 
          menuItems={menuItems} 
          onLoginClick={() => { 
            setShowLogin(true); 
            setAuthMode('login'); 
            setIsLoggedIn(false); 
          }} 
          onHomeClick={() => { 
            setShowLogin(false); 
            setIsLoggedIn(false); 
            setAuthMode('login');
            setTempEmail('');
          }}
        />
      )}

      {/* Main Content Logic Tree */}
      {isLoggedIn ? (
      <Dashboard onLogout={handleLogout} userRole={userRole} user ={currentUser} />      ) : showLogin ? (
        <div className="auth-container-wrapper">
          {authMode === 'login' && (
            <LoginPage 
              onSignIn={handleLoginSuccess} 
              onGoToRegister={handleGoToRegister} 
            />
          )}
          
          {authMode === 'register' && (
            <Register 
              onBackToLogin={handleBackToLogin} 
              onRegisterSuccess={(email) => {
                setTempEmail(email);
                setAuthMode('verify');
              }} 
            />
          )}

          {authMode === 'verify' && (
            <VerifyOTP 
              email={tempEmail} 
              onVerifySuccess={() => {
                setShowSuccess(true);
                //setAuthMode('login');
                
              }}
              onBackToRegister={() => setAuthMode('register')}
            />
          )}
        </div>
      ) : (
        <>
          {/* Hero Banner Section */}
          <section className="hero-banner">
            <div className="hero-overlay">
              <div className="hero-content">
                <h1>Reliable Logistics for Nepal</h1>
                <p>Fast, secure, and real-time tracking for all your shipments.</p>
                <button className="cta-button">Track Package</button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="services-section">
            <div className="container">
              <div className="services-intro">
                <h2>Our Services</h2>
                <h3>Embark on a Global Journey with Namaste Sewaro Cargo Service</h3>
                <p>
                  Experience the world at your doorstep with our extensive network of shipping destinations. 
                  Our commitment to reliability, affordability, and convenience ensures that your cargo 
                  travels seamlessly across borders.
                </p>
              </div>

              <div className="services-grid">
                <div className="services-slider" ref={scrollRef}>
                  <div className="service-card">
                    <div className="service-img-wrapper">
                      <img src="/logo.png" alt="Global Shipping" />
                    </div>
                    <div className="service-info">
                      <h4>International Express</h4>
                      <p>Fast, efficient, and cost-effective shipping to USA, UK, Hong Kong, and more.</p>
                    </div>
                  </div>

                  <div className="service-card">
                    <div className="service-img-wrapper">
                      <img src="/middle-east.jpg" alt="Middle East Cargo" />
                    </div>
                    <div className="service-info">
                      <h4>Middle East Network</h4>
                      <p>Daily cargo departures to Dubai and Malaysia with end-to-end tracking.</p>
                    </div>
                  </div>

                  <div className="service-card">
                    <div className="service-img-wrapper">
                      <img src="/asia-pacific.jpg" alt="Asia Cargo" />
                    </div>
                    <div className="service-info">
                      <h4>Asia-Pacific Logistics</h4>
                      <p>Seamless door-to-door services across Japan, Portugal, and 50+ other countries.</p>
                    </div>
                  </div>

                  <div className="service-card">
                    <div className="service-img-wrapper">
                      <img src="/asia-pacific.jpg" alt="Asia Cargo" />
                    </div>
                    <div className="service-info">
                      <h4>Europe Express</h4>
                      <p>Fast logistics handling for major European hubs including Germany and France.</p>
                    </div>
                  </div>

                  <div className="service-card">
                    <div className="service-img-wrapper">
                      <img src="/asia-pacific.jpg" alt="Asia Cargo" />
                    </div>
                    <div className="service-info">
                      <h4>Australian Logistics</h4>
                      <p>Reliable freight and cargo services connecting Nepal to Oceania.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="destinations-badge">
                <span>Serving: USA • UK • Hong Kong • Portugal • Japan • Dubai • Malaysia • +Many more</span>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="why-us-section">
            <div className="container">
              <div className="section-title">
                <h2>Why Choose Sewa Logistics?</h2>
              </div>

              <div className="why-row">
                <div className="why-image-side">
                  <div className="question-mark">?</div>
                </div>
                <div className="why-text-side">
                  <div className="why-icon-small">🛡️</div>
                  <h4>Is my cargo safe during transit?</h4>
                  <p><strong>Absolutely.</strong> We provide Secure Handling with full insurance coverage. Every package is treated with professional care and stored in monitored facilities.</p>
                </div>
              </div>

              <div className="why-row reverse">
                <div className="why-image-side">
                  <div className="question-mark color-2">?</div>
                </div>
                <div className="why-text-side">
                  <div className="why-icon-small">⏱️</div>
                  <h4>How fast can I get my delivery?</h4>
                  <p><strong>Right on time.</strong> We value your schedule. Our express global network ensures that deadlines are met, providing the fastest routes from Nepal to the world.</p>
                </div>
              </div>

              <div className="why-row">
                <div className="why-image-side">
                  <div className="question-mark color-3">?</div>
                </div>
                <div className="why-text-side">
                  <div className="why-icon-small">📞</div>
                  <h4>Can I get help at any hour?</h4>
                  <p><strong>We are always here.</strong> Our 24/7 Support team provides real-time updates. Whether it's midnight in Kathmandu or morning in New York, we're ready to assist.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Footer Section */}
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3274532187654!2d85.31233!3d27.71724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjEiTiA4NcKwMTgnNDQuNCJF!5e0!3m2!1sen!2snp!4v1620000000000!5m2!1sen!2snp"
                    width="100%" 
                    height="150" 
                    style={{ border: 0, borderRadius: "8px", marginTop: "15px" }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
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
      {showSuccess && (
  <SuccessModal 
    message="Your email has been verified. You can now sign in to your dashboard." 
    onConfirm={() => {
      setShowSuccess(false);
      setAuthMode('login'); // Redirect after they click OK
      setTempEmail('');
    }}
  />
)}
    </div>
  );
}

export default App;