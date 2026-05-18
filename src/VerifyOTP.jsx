// import React, { useState } from 'react';
// import './VerifyOTP.css';

// const VerifyOTP = ({ email, onVerifySuccess, onBackToRegister }) => {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         onVerifySuccess(); // Redirect to Dashboard or Login
//       } else {
//         setError(data.error || 'Invalid OTP');
//       }
//     } catch (err) {
//       setError('Server error. Please try again.');
//     }
//   };

//   return (
//     <div className="login-screen">
//       <div className="login-card">
//         <h2>Verify Email</h2>
//         <p>A 6-digit code was sent to <strong>{email}</strong></p>
        
//         <form onSubmit={handleVerify} className="login-form">
//           <div className="input-group">
//             <label>Verification Code</label>
//             <input 
//               type="text" 
//               maxLength="6"
//               placeholder="000000"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="otp-input-field"
//               required
//             />
//           </div>

//           {error && <p className="error-text">{error}</p>}

//           <button type="submit" className="submit-btn">Verify Account</button>
          
//           <div className="login-footer">
//             <button type="button" className="back-btn" onClick={onBackToRegister}>
//               ← Use different email
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOTP;
import React, { useState } from 'react';
import './VerifyOTP.css';

const VerifyOTP = ({ email, onVerifySuccess, onBackToRegister }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        onVerifySuccess(); // Success! App.jsx will now show the Dashboard
      } else {
        // Show the specific error from the backend (e.g., "Invalid or expired OTP")
        setError(data.error || 'Invalid OTP. Please check your email.');
      }
    } catch (err) {
      setError('Connection failed. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h2>Verify Email</h2>
        <p>A 6-digit code was sent to <strong>{email}</strong></p>
        
        <form onSubmit={handleVerify} className="login-form">
          <div className="input-group">
            <label>Verification Code</label>
            <input 
              type="text" 
              maxLength="6"
              pattern="\d*" 
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allows numbers
              className="otp-input-field"
              disabled={loading}
              required
            />
          </div>

          {error && <p className="error-text" style={{ color: '#ff4d4d', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Account'}
          </button>
          
          <div className="login-footer">
            <button 
              type="button" 
              className="back-btn" 
              onClick={onBackToRegister}
              disabled={loading}
              style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginTop: '10px' }}
            >
              ← Use different email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;