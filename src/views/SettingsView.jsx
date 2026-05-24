import React, { useState } from 'react';
import '../styles/SettingsView.css';

const SettingsView = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });

    // Client-side quick checks
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
        // Reset fields on success
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage({ text: '✨ Success! Your security password has been updated.', isError: false });
      } else {
        throw new Error(result.error || 'Failed to update password.');
      }
    } catch (err) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Account Settings</h2>
        <p>Manage your account settings and update your security details.</p>
      </div>

      {message.text && (
        <div className={`status-banner ${message.isError ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}

      <div className="settings-card">
        <form onSubmit={handlePasswordChange} className="settings-form">
          
          {/* Identity Info Container (Read Only) */}
          <div className="form-group readonly">
            <label>Account Holder Name</label>
            <input type="text" value={user?.full_name || 'User Profile'} readOnly />
          </div>

          <div className="form-group readonly">
            <label>Registered Email Address</label>
            <input type="text" value={user?.email || 'N/A'} readOnly />
            <small>Email modifications require system administrator privileges.</small>
          </div>

          <div className="form-divider">Update Account Password</div>

          {/* Current Password Field */}
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

          {/* New Password Field */}
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

          {/* Confirm Field */}
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