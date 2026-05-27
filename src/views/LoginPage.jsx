

// import React from 'react';

// const LoginPage = ({ onSignIn }) => {
//   return (
//     <div className="login-screen">
//       <div className="login-card">
//         <h2>Operator Login</h2>
//         <p>Enter your credentials to access the dashboard</p>
        
//         {/* We use onSubmit on the form to handle the click */}
//         <form className="login-form" onSubmit={onSignIn}>
//           <div className="input-group">
//             <label>Agent ID</label>
//             <input type="text" placeholder="e.g. SEWA-101"  />{/*required*/}
//           </div>
          
//           <div className="input-group">
//             <label>Password</label>
//             <input type="password" placeholder="••••••••"  />{/*required*/}
//           </div>
          
//           <button type="submit" className="submit-btn">
//             Sign In
//           </button>
//           <div className="login-footer">
//             <p>Don't have an account?</p>
//             <button 
//               className="create-acc-btn" 
//               onClick={() => setAuthMode('register')} // Assuming you use a state to toggle views
//             >
//               Create Account
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';

const LoginPage = ({ onSignIn, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://sewaro-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('sewa_user', JSON.stringify(data.user));
        // If login is successful, pass the user data back to App.jsx
        onSignIn(data.user); 
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h2>Operator Login</h2>
        <p>Enter your credentials to access the dashboard</p>
        
        <form className="login-form" onSubmit={handleLogin}>
          {error && <p style={{ color: '#ff4d4d', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}
          
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="e.g. name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <div className="login-footer">
            <p>Don't have an account?</p>
            <button 
              type="button" 
              className="create-acc-btn" 
              onClick={onGoToRegister}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;