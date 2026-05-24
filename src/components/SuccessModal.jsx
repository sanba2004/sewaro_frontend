import React from 'react';
import "/src/styles/SuccessModal.css";

const SuccessModal = ({ message, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-icon">✅</div>
        <h3>Success!</h3>
        <p>{message}</p>
        <button onClick={onConfirm} className="modal-btn">OK</button>
      </div>
    </div>
  );
};

export default SuccessModal;