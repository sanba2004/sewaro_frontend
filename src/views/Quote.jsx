import React, { useState } from 'react';

export default function Quote({ onBackHome }) {
  const [formData, setFormData] = useState({
    senderCountry: '',
    receiverCountry: '',
    weight: '',
    description: '',
    deliveryType: 'normal',
    contactInfo: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('https://sewaro-backend.onrender.com/api/quotes/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
            });

      if (!response.ok) {
        throw new Error('Failed to dispatch quote request. Please check your data fields.');
      }

      setStatus({ loading: false, success: true, error: '' });
      setFormData({ senderCountry: '', receiverCountry: '', weight: '', description: '', deliveryType: 'normal', contactInfo: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '35px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #eceff0' }}>
      <h2 style={{ margin: '0 0 10px 0', color: '#0f1c2a' }}>Request a Delivery Quote</h2>
      <p style={{ color: '#566573', margin: '0 0 25px 0', fontSize: '14px' }}>Provide shipment layout details below to calculate structural metrics.</p>

      {status.success && (
        <div style={{ padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '6px', marginBottom: '20px', fontWeight: 'bold' }}>
          🎉 Quote Request Dispatched Successfully! Our logistic desk will email you shortly.
        </div>
      )}

      {status.error && (
        <div style={{ padding: '15px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '6px', marginBottom: '20px', fontWeight: 'bold' }}>
          ⚠️ Error: {status.error}
        </div>
      )}

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f1c2a', fontSize: '14px' }}>Sender Country</label>
          <input type="text" name="senderCountry" required value={formData.senderCountry} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} placeholder="e.g., Nepal" />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f1c2a', fontSize: '14px' }}>Receiver Country</label>
          <input type="text" name="receiverCountry" required value={formData.receiverCountry} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} placeholder="e.g., United Kingdom" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f1c2a', fontSize: '14px' }}>Weight (kg)</label>
            <input type="number" step="0.1" name="weight" required value={formData.weight} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} placeholder="0.0" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f1c2a', fontSize: '14px' }}>Delivery Velocity Frame</label>
            <select name="deliveryType" value={formData.deliveryType} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', border: '1px solid #171616', borderRadius: '6px', boxSizing: 'border-box', background: '#070707' }}>
              <option value="normal">Normal Service</option>
              <option value="special">Special Service (Meat / Medicine Only)</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f1c2a', fontSize: '14px' }}>Description of Contents</label>
          <textarea name="description" required value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px 14px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box', resize: 'vertical' }} placeholder="List items details safely..."></textarea>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0f1c2a', fontSize: '14px' }}>Contact Details (Email or Mobile)</label>
          <input type="text" name="contactInfo" required value={formData.contactInfo} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} placeholder="gmail address or contact line..." />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <button type="submit" disabled={status.loading} style={{ flex: 1, background: '#0250a3', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            {status.loading ? 'Processing Transmissions...' : 'Get Quote'}
          </button>
          <button type="button" onClick={onBackHome} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}