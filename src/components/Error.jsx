import React from 'react';
import "/src/styles/SuccessModal.css"; // Uses your existing modal styles base

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ borderColor: '#ef4444' }}>
        <div className="modal-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>❌</div>
        <h3 style={{ color: '#991b1b' }}>Validation Required</h3>
        <p style={{ color: '#4b5563', margin: '15px 0' }}>{message}</p>
        <button 
          onClick={onClose} 
          className="modal-btn" 
          style={{ background: '#ef4444' }}
        >
          Fix Fields
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;