import React from 'react';

const CustomerService = ({ onBackClick }) => {
  return (
    <div className="customer-service-page" style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: '#f8f9fa'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '650px',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        padding: '40px',
        textAlign: 'center'
      }}>
        {/* Decorative Support Icon Icon Header */}
        <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎧</div>
        
        <h1 style={{ color: '#222', fontSize: '28px', marginBottom: '10px', fontWeight: '700' }}>
          Customer Support Center
        </h1>
        <p style={{ color: '#666', fontSize: '15px', marginBottom: '35px', lineHeight: '1.6' }}>
          Have questions regarding your logistics accounts, cargo routing, or invoice payments? 
          Reach out directly to our dedicated helpdesk agent.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', padding: '15px 20px', background: '#fdfdfd', border: '1px solid #f0f0f0', borderRadius: '10px' }}>
            <span style={{ fontSize: '24px', marginRight: '15px' }}>👤</span>
            <div>
              <small style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Representative</small>
              <strong style={{ color: '#333', fontSize: '16px' }}>Namaste Sewaro Support Team</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', padding: '15px 20px', background: '#fdfdfd', border: '1px solid #f0f0f0', borderRadius: '10px' }}>
            <span style={{ fontSize: '24px', marginRight: '15px' }}>📞</span>
            <div>
              <small style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Phone Line</small>
              <a href="tel:+9771234567" style={{ color: '#0056b3', textDecoration: 'none', fontWeight: '700', fontSize: '18px' }}>
                +977-1234567
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', padding: '15px 20px', background: '#fdfdfd', border: '1px solid #f0f0f0', borderRadius: '10px' }}>
            <span style={{ fontSize: '24px', marginRight: '15px' }}>✉️</span>
            <div>
              <small style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Email Address</small>
              <a href="mailto:sewaro151@gmail.com" style={{ color: '#0056b3', textDecoration: 'none', fontWeight: '600', fontSize: '16px' }}>
                sewaro151@gmail.com
              </a>
            </div>
          </div>

        </div>

        <button 
          onClick={onBackClick}
          style={{
            marginTop: '35px',
            background: '#222',
            color: '#fff',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#444'}
          onMouseOut={(e) => e.currentTarget.style.background = '#222'}
        >
          ← Return to Home Screen
        </button>
      </div>
    </div>
  );
};

export default CustomerService;