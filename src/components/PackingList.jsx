import React from 'react';

export default function PackingList({ previewTrackingId, packages = [], senderInfo = {}, receiverInfo = {} }) {
  // Flatten every item across all packages into a single list for the packing table
  const allItems = packages.flatMap(pkg => (pkg.items || pkg.shipment_item || []).map(item => ({
    description: item.description,
    qty: item.qty
  })));

  // Split into two columns, alternating: 1st→left, 2nd→right, 3rd→left, 4th→right...
  const leftItems = allItems.filter((_, idx) => idx % 2 === 0);
  const rightItems = allItems.filter((_, idx) => idx % 2 === 1);

  const renderTable = (items, startNumber) => (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
      <thead>
        <tr style={{ background: '#1f7a3d' }}>
          <th style={{ padding: '8px 10px', color: '#fff', textAlign: 'left', width: '12%' }}>SN</th>
          <th style={{ padding: '8px 10px', color: '#fff', textAlign: 'left' }}>Description</th>
          <th style={{ padding: '8px 10px', color: '#fff', textAlign: 'center', width: '20%' }}>Qty</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr><td colSpan={3} style={{ padding: '12px', textAlign: 'center', color: '#999', border: '1px solid #eee' }}>—</td></tr>
        ) : (
          items.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 10px', border: '1px solid #eee' }}>{startNumber + idx * 2}</td>
              <td style={{ padding: '8px 10px', border: '1px solid #eee' }}>{item.description || '—'}</td>
              <td style={{ padding: '8px 10px', border: '1px solid #eee', textAlign: 'center' }}>{item.qty ?? 0}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div style={{
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '25px',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      boxSizing: 'border-box',
      color: '#1a1a1a'
    }}>

      {/* Header: Logo + Company Name + Address/Phone */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '10px' }}>
        <img src="/logo.png" alt="Namaste Sewaro Cargo Service" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
        <div>
          <h1 style={{ margin: '0', fontSize: '22px', color: '#1f7a3d', fontWeight: '800', lineHeight: '1.2', textTransform: 'uppercase' }}>
            Namaste Sewaro<br />Cargo Service
          </h1>
          <p style={{ margin: '6px 0 2px 0', fontSize: '13px', color: '#555' }}>Tilganga Road 5, Airport KTM</p>
          <p style={{ margin: '0', fontSize: '13px', color: '#555' }}>📞 9813434936 / 9825359333</p>
        </div>
      </div>

      <div style={{ margin: '12px 0 20px 0' }}>
        <span style={{ display: 'inline-block', background: '#1f7a3d', color: '#fff', fontWeight: 'bold', fontSize: '12px', padding: '8px 18px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Packing List
        </span>
      </div>

      <div style={{ borderTop: '3px solid #1f7a3d', marginBottom: '20px' }}></div>

      {/* Sender / Receiver two-column block */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '6px', padding: '14px 16px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#1f7a3d', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
            Sender Details
          </h4>
          <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Name:</strong> {senderInfo.fullName || '—'}</p>
          <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Contact:</strong> {senderInfo.contactNum || '—'}</p>
          <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Address:</strong> {senderInfo.address || '—'}</p>
        </div>
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '6px', padding: '14px 16px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#1f7a3d', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
            Receiver Details
          </h4>
          <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Name:</strong> {receiverInfo.fullName || '—'}</p>
          <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Contact:</strong> {receiverInfo.contactNumber || '—'}</p>
          <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Address:</strong> {receiverInfo.fullAddress || '—'}</p>
        </div>
      </div>

      {/* Items header */}
      <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#1f7a3d', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Items
      </h4>

      {/* Alternating two-column item tables */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
        <div style={{ flex: 1 }}>{renderTable(leftItems, 1)}</div>
        <div style={{ flex: 1 }}>{renderTable(rightItems, 2)}</div>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
          Thank you for choosing Namaste Sewaro Cargo Service 🙏
        </p>
      </div>

    </div>
  );
}