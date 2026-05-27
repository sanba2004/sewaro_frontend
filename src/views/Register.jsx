
// import React, { useState } from 'react';
// import './Register.css';

// const Register = ({ onBackToLogin, onRegisterSuccess }) => {
//   const [formData, setFormData] = useState({
//     fullName: '', // Added fullName to match your DB schema
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register-customer', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           fullName: formData.fullName,
//           email: formData.email,
//           password: formData.password
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         onRegisterSuccess(formData.email);
//         // alert("Registration Successful! Please sign in.");
//         // onBackToLogin(); // Go back to Login screen instead of OTP screen
//       } else {
//         setError(data.error || 'Registration failed.');
//       }
//     } catch (err) {
//       setError('Connection error.');
//     } finally {
//       setLoading(false);
//     }
// };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <h2>Create Account</h2>
//           <p>Join the SEWA Logistics dashboard</p>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          
//           <div className="input-group">
//             <label>Full Name</label>
//             <input 
//               type="text" 
//               placeholder="Enter your full name" 
//               required
//               value={formData.fullName}
//               onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//             />
//           </div>

//           <div className="input-group">
//             <label>Work Email</label>
//             <input 
//               type="email" 
//               placeholder="e.g. name@company.com" 
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//             />
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input 
//               type="password" 
//               placeholder="Min. 8 characters" 
//               required
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//             />
//           </div>

//           <div className="input-group">
//             <label>Confirm Password</label>
//             <input 
//               type="password" 
//               placeholder="Re-type password" 
//               required
//               value={formData.confirmPassword}
//               onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
//             />
//           </div>

//           <button type="submit" className="register-btn" disabled={loading}>
//             {loading ? 'Sending Verification Code...' : 'Create Account'}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <p>Already have an account?</p>
//           <button className="back-to-login" onClick={onBackToLogin}>
//             Sign In instead
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import "/src/styles/Register.css";

// 🌟 CHANGE: Destructure formData and setFormData from props
const Register = ({ onBackToLogin, onRegisterSuccess, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://sewaro-backend.onrender.com/api/auth/register-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 🌟 CHANGE: We pass the email up so VerifyOTP knows where to track the matching token map keys
        onRegisterSuccess(formData.email);
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join the SEWA Logistics dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              required
              value={formData.fullName}
              // 🌟 CHANGE: Directly update parent state mapping
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Work Email</label>
            <input 
              type="email" 
              placeholder="e.g. name@company.com" 
              required
              value={formData.email}
              // 🌟 CHANGE: Directly update parent state mapping
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Min. 8 characters" 
              required
              value={formData.password}
              // 🌟 CHANGE: Directly update parent state mapping
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Re-type password" 
              required
              value={formData.confirmPassword}
              // 🌟 CHANGE: Directly update parent state mapping
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Sending Verification Code...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button className="back-to-login" onClick={onBackToLogin}>
            Sign In instead
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;