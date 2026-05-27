// import React, { useState } from 'react';
// import '../styles/SettingsView.css';

// const SettingsView = ({ user }) => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: '', isError: false });

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     setMessage({ text: '', isError: false });

//     // Client-side quick checks
//     if (newPassword !== confirmPassword) {
//       return setMessage({ text: 'New passwords do not match.', isError: true });
//     }
//     if (newPassword.length < 6) {
//       return setMessage({ text: 'New password must be at least 6 characters long.', isError: true });
//     }

//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/auth/change-password', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: user?.id || user?.userId,
//           currentPassword,
//           newPassword
//         }),
//       });

//       const result = await response.json();
      
//       if (response.ok && result.success) {
//         // Reset fields on success
//         setCurrentPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//         setMessage({ text: '✨ Success! Your security password has been updated.', isError: false });
//       } else {
//         throw new Error(result.error || 'Failed to update password.');
//       }
//     } catch (err) {
//       setMessage({ text: err.message, isError: true });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="settings-container">
//       <div className="settings-header">
//         <h2>Account Settings</h2>
//         <p>Manage your account settings and update your security details.</p>
//       </div>

//       {message.text && (
//         <div className={`status-banner ${message.isError ? 'error' : 'success'}`}>
//           {message.text}
//         </div>
//       )}

//       <div className="settings-card">
//         <form onSubmit={handlePasswordChange} className="settings-form">
          
//           {/* Identity Info Container (Read Only) */}
//           <div className="form-group readonly">
//             <label>Account Holder Name</label>
//             <input type="text" value={user?.full_name || 'User Profile'} readOnly />
//           </div>

//           <div className="form-group readonly">
//             <label>Registered Email Address</label>
//             <input type="text" value={user?.email || 'N/A'} readOnly />
//             <small>Email modifications require system administrator privileges.</small>
//           </div>

//           <div className="form-divider">Update Account Password</div>

//           {/* Current Password Field */}
//           <div className="form-group">
//             <label>Verify Current Password</label>
//             <input 
//               type="password" 
//               value={currentPassword} 
//               onChange={(e) => setCurrentPassword(e.target.value)} 
//               placeholder="Enter your current password"
//               required 
//             />
//           </div>

//           {/* New Password Field */}
//           <div className="form-group">
//             <label>New Password</label>
//             <input 
//               type="password" 
//               value={newPassword} 
//               onChange={(e) => setNewPassword(e.target.value)} 
//               placeholder="Minimum 6 characters"
//               required 
//             />
//           </div>

//           {/* Confirm Field */}
//           <div className="form-group">
//             <label>Confirm New Password</label>
//             <input 
//               type="password" 
//               value={confirmPassword} 
//               onChange={(e) => setConfirmPassword(e.target.value)} 
//               placeholder="Retype new password"
//               required 
//             />
//           </div>

//           <button type="submit" className="save-btn" disabled={loading}>
//             {loading ? 'Verifying Identity...' : 'Commit Password Update'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SettingsView;





import React, { useState, useEffect } from 'react';
import '../styles/SettingsView.css';

const SettingsView = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // New states for fetched profile info
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  // 🔄 Fetch full user profile details on load using user.id
  useEffect(() => {
    const fetchUserProfile = async () => {
      const targetId = user?.id || user?.userId;
      if (!targetId) {
        setIsFetchingProfile(false);
        return;
      }

      try {
        const response = await fetch(`https://sewaro-backend.onrender.com/api/auth/profile/${targetId}`);
        const result = await response.json();
        
        if (response.ok && result.success) {
          setProfileData({
            name: result.user.name || '',
            email: result.user.email || result.user.gmail || ''
          });
        } else {
          console.error("Profile payload error:", result.error);
        }
      } catch (err) {
        console.error("Failed to connect to profile API:", err);
      } finally {
        setIsFetchingProfile(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });

    if (newPassword !== confirmPassword) {
      return setMessage({ text: 'New passwords do not match.', isError: true });
    }
    if (newPassword.length < 6) {
      return setMessage({ text: 'New password must be at least 6 characters long.', isError: true });
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || user?.userId,
          currentPassword,
          newPassword
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage({ text: 'Success! Your security password has been updated.', isError: false });
      } else {
        throw new Error(result.error || 'Failed to update password.');
      }
    } catch (err) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setLoading(false);
    }
  };

  const dismissMessage = () => {
    setMessage({ text: '', isError: false });
  };

  return (
    <div className="settings-container" style={{ position: 'relative' }}>
      
      {/* Centered Fixed Overlay Message Pop-up */}
      {message.text && (
        <div className="settings-message-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 99999,
        }}>
          <div className={`status-modal-box ${message.isError ? 'error' : 'success'}`} style={{
            backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px',
            maxWidth: '420px', width: '90%', textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            borderTop: `6px solid ${message.isError ? '#dc3545' : '#28a745'}`
          }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>
              {message.isError ? '⚠️' : '✨'}
            </div>
            <h4 style={{ margin: '0 0 10px 0', color: '#212529', fontSize: '18px' }}>
              {message.isError ? 'System Alert' : 'Security Updated'}
            </h4>
            <p style={{ margin: '0 0 20px 0', color: '#6c757d', fontSize: '14px', lineHeight: '1.5' }}>
              {message.text}
            </p>
            <button onClick={dismissMessage} style={{
              background: message.isError ? '#dc3545' : '#28a745', color: '#ffffff',
              border: 'none', padding: '10px 30px', borderRadius: '6px',
              cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', width: '100%'
            }}>
              OK
            </button>
          </div>
        </div>
      )}

      <div className="settings-header">
        <h2>Account Settings</h2>
        <p>Manage your account settings and update your security details.</p>
      </div>

      <div className="settings-card">
        <form onSubmit={handlePasswordChange} className="settings-form">
          
          {/* Identity Info Container */}
          <div className="form-group readonly">
            <label>Account Holder Name</label>
            <input 
              type="text" 
              value={isFetchingProfile ? 'Loading...' : (profileData.name || user?.name || 'User Profile')} 
              readOnly 
              style={{ backgroundColor: '#f1f3f5', color: '#495057', cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group readonly">
            <label>Registered Email Address</label>
            <input 
              type="text" 
              value={isFetchingProfile ? 'Loading...' : (profileData.email || 'No email registered')} 
              readOnly 
              style={{ backgroundColor: '#f1f3f5', color: '#495057', cursor: 'not-allowed' }}
            />
            <small>Email modifications require system administrator privileges.</small>
          </div>

          <div className="form-divider">Update Account Password</div>

          <div className="form-group">
            <label>Verify Current Password</label>
            <input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              placeholder="Enter your current password"
              required 
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="Minimum 6 characters"
              required 
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Retype new password"
              required 
            />
          </div>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Verifying Identity...' : 'Commit Password Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsView;