// import React from 'react';

// export default function PrintableInvoice({ 
//   previewTrackingId, 
//   packages = [], 
//   senderInfo = {}, 
//   receiverInfo = {}, 
//   billingInfo = {},
//   getChargeableWeight,
//   getPricePerKg
// }) {
//   // Execute calculations exactly like your layout requires
//   const aggregateWeight = packages.reduce((sum, p) => {
//     const pWeight = (p.items || []).reduce((subSum, item) => subSum + (parseFloat(item.weight) || 0), 0);
//     return sum + pWeight;
//   }, 0);

//   const totalPayable = packages.reduce((sum, pkg) => {
//     const rawWeight = (pkg.items || []).reduce((subSum, item) => subSum + (parseFloat(item.weight) || 0), 0);
//     const chgWt = typeof getChargeableWeight === 'function' ? getChargeableWeight(rawWeight) : rawWeight;
//     const rate = typeof getPricePerKg === 'function' ? getPricePerKg(chgWt) : 0;
//     const doorToDoorCharge = pkg.doorToDoor ? 500 : 0;
    
//     return sum + (chgWt * rate) + doorToDoorCharge;
//   }, 0);

//   return (
//     <div id="printable-invoice" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000', color: '#000', textAlign: 'left' }}>
      
//       {/* 🧾 Document Title & Meta Block */}
//       <h1 className="invoice-main-title" style={{ margin: '0 0 10px 0', fontSize: '28px', textTransform: 'uppercase' }}>Invoice</h1>
//       <div className="invoice-meta-text" style={{ marginBottom: '20px', lineHeight: '1.4' }}>
//         {/* 🌟 UPDATED: Invoice Number now explicitly matches the tracking number parameter */}
//         <p style={{ margin: '3px 0' }}><strong>Invoice #:</strong> {previewTrackingId}</p>
//         <p style={{ margin: '3px 0' }}><strong>Package Number:</strong> {packages.length}</p>
//         <p style={{ margin: '3px 0' }}><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
//         <p style={{ margin: '3px 0' }}><strong>Payment mode:</strong> {billingInfo.method || "Cash"}</p>
//       </div>

//       {/* 👥 Split Address Banner Header Grid */}
//       <div style={{ display: 'flex', width: '100%' }}>
//         <div className="invoice-section-banner" style={{ flex: 1, textAlign: 'left', background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>Shipper Information</div>
//         <div className="invoice-section-banner" style={{ flex: 1, textAlign: 'left', background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold', borderLeft: '2px solid #fff' }}>Receiver Information</div>
//       </div>
      
//       {/* Address Columns Row */}
//       <div className="info-split-grid" style={{ display: 'flex', width: '100%', marginTop: '10px', marginBottom: '25px' }}>
//         <div className="info-column" style={{ flex: 1, paddingRight: '15px', boxSizing: 'border-box' }}>
//           <p style={{ margin: '4px 0' }}><strong>Shipper Name:</strong> {senderInfo.fullName || "N/A"}</p>
//           <p style={{ margin: '4px 0' }}><strong>Address:</strong> {senderInfo.address || "N/A"}, {senderInfo.city}, {senderInfo.country}</p>
//           <p style={{ margin: '4px 0' }}><strong>Phone:</strong> {senderInfo.contactNum || "N/A"}</p>
//           <p style={{ margin: '4px 0' }}><strong>Email:</strong> {senderInfo.email || "N/A"}</p>
//         </div>
//         <div className="info-column" style={{ flex: 1, paddingLeft: '15px', borderLeft: '1px solid #ccc', boxSizing: 'border-box' }}>
//           <p style={{ margin: '4px 0' }}><strong>Receiver Name:</strong> {receiverInfo.fullName || "N/A"}</p>
//           <p style={{ margin: '4px 0' }}><strong>Address:</strong> {receiverInfo.fullAddress || "N/A"}, {receiverInfo.city}, {receiverInfo.country}</p>
//           <p style={{ margin: '4px 0' }}><strong>Phone:</strong> {receiverInfo.contactNumber || "N/A"}</p>
//           <p style={{ margin: '4px 0' }}><strong>Email:</strong> {receiverInfo.email || "N/A"}</p>
//         </div>
//       </div>

//       {/* 📦 Package Breakdown Section Banner */}
//       <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold', marginTop: '25px', marginBottom: '0' }}>Package Details</div>
      
//       <table className="corp-invoice-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//         <thead>
//           <tr style={{ background: '#f4f4f4' }}>
//             <th style={{ width: '8%', padding: '8px', border: '1px solid #ddd' }}>S.N</th>
//             <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
//             <th style={{ width: '25%', padding: '8px', border: '1px solid #ddd' }}>HS CODE</th>
//             <th style={{ width: '15%', padding: '8px', border: '1px solid #ddd' }}>Qty</th>
//           </tr>
//         </thead>
//         <tbody>
//           {packages.flatMap((pkg, pkgIdx) => 
//             (pkg.items || []).map((item, itemIdx) => (
//               <tr key={`${pkg.id || pkgIdx}-${itemIdx}`}>
//                 <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{itemIdx + 1}</td>
//                 <td style={{ padding: '8px', border: '1px solid #ddd' }}>
//                   {item.description || `${pkg.profile || "Cargo Item"} (${pkg.type || "Parcel"})`}
//                 </td>
//                 <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{item.hsCode || "—"}</td>
//                 <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{item.qty || 1}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* 📋 Bottom Section: Terms & Totals Row */}
//       <div className="invoice-footer-grid" style={{ display: 'flex', width: '100%', gap: '20px', marginTop: '20px' }}>
        
//         {/* Left Side Column: Legal Terms Notes */}
//         <div className="comments-block" style={{ flex: 1.2 }}>
//           <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '4px 8px', fontSize: '11px', fontWeight: 'bold' }}>Comments</div>
//           <ul style={{ paddingLeft: '20px', fontSize: '12px', color: '#555', marginTop: '8px' }}>
//             <li>Declared package parameters are subject to regular weight re-evaluation audits.</li>
//           </ul>
//         </div>

//         {/* Right Side Column: Financial Aggregations & Tracking QR */}
//         <div className="financials-block" style={{ flex: 0.8, background: '#f4f6f8', padding: '15px', borderRadius: '4px', boxSizing: 'border-box', fontSize: '13px' }}>
//           <p style={{ margin: '5px 0' }}><strong>Total Weight:</strong> {aggregateWeight.toFixed(2)} Kg</p>
//           <p style={{ margin: '5px 0' }}><strong>Weight charge:</strong> {billingInfo.currency || "NPR"} {totalPayable.toLocaleString()}</p>
          
//           <div className="grand-total-row" style={{ margin: '10px 0', padding: '5px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
//             <span style={{ fontWeight: 'bold' }}>Total: </span>
//             <span style={{ fontWeight: 'bold' }}>{billingInfo.currency || "NPR"} {totalPayable.toLocaleString()}</span>
//           </div>
          
//           {/* Tracking QR Code Container */}
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', padding: '10px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px' }}>
//             <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#555', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//               Scan to Track Shipment
//             </span>
//             <img 
//               src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(previewTrackingId || 'N/A')}`}
//               alt="Tracking Invoice QR Code Matrix"
//               style={{ width: '110px', height: '110px', display: 'block' }}
//             />
//             <span style={{ fontSize: '10px', fontFamily: 'monospace', marginTop: '4px', color: '#222', fontWeight: 'bold' }}>
//               {previewTrackingId}
//             </span>
//           </div>

//           <p className="thank-you-msg" style={{ textAlign: 'center', marginTop: '10px', fontStyle: 'italic', fontSize: '12px', margin: '10px 0 0 0' }}>
//             Thank you for your business!
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }






import React from 'react';

export default function PrintableInvoice({
  previewTrackingId,
  packages = [],
  senderInfo = {},
  receiverInfo = {},
  billingInfo = {},
  totalPayable = 0,
  invoiceNotes = ""
}) {
  const aggregateWeight = packages.reduce((sum, p) => sum + (parseFloat(p.total_weight || p.weight) || 0), 0);

  return (
    <div id="printable-invoice" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000', margin: '0 auto', maxWidth: '800px' }}>
      
      {/* 🧾 Document Title, Meta Block & Company branding Row Container */}
      <div className="invoice-header-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 className="invoice-main-title" style={{ margin: '0 0 10px 0', lineHeight: '1', fontSize: '28px' }}>Invoice</h1>
          <div className="invoice-meta-text" style={{ fontSize: '13px', lineHeight: '1.4' }}>
            <p style={{ margin: '2px 0' }}><strong>Invoice #:</strong> {previewTrackingId}</p>
            <p style={{ margin: '2px 0' }}><strong>Package Number:</strong> {packages.length}</p>
            <p style={{ margin: '2px 0' }}><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
            <p style={{ margin: '2px 0' }}><strong>Payment mode:</strong> {billingInfo.method || "Cash"}</p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#050506', letterSpacing: '0.5px', lineHeight: '1.2' }}>
            Namaste Sewaro Cargo
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', textTransform: 'uppercase', color: '#080808', letterSpacing: '1px', fontWeight: '600' }}>
            Service PVT. LTD.
          </p>
        </div>
      </div>

      {/* 👥 Split Address Banner Header Grid */}
      <div style={{ display: 'flex', width: '100%', background: '#000', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
        <div className="invoice-section-banner" style={{ flex: 1, textAlign: 'left', padding: '6px 12px' }}>Shipper Information</div>
        <div className="invoice-section-banner" style={{ flex: 1, textAlign: 'left', borderLeft: '2px solid #fff', padding: '6px 12px' }}>Receiver Information</div>
      </div>
      
      <div className="info-split-grid" style={{ display: 'flex', width: '100%', marginTop: '10px', marginBottom: '20px', fontSize: '13px', lineHeight: '1.5' }}>
        <div className="info-column" style={{ flex: 1, paddingRight: '15px', boxSizing: 'border-box' }}>
          <p style={{ margin: '4px 0' }}><strong>Shipper Name:</strong> {senderInfo.fullName || "N/A"}</p>
          <p style={{ margin: '4px 0' }}><strong>Address:</strong> {senderInfo.address || "N/A"}, {senderInfo.city || ""}, {senderInfo.country || ""}</p>
          <p style={{ margin: '4px 0' }}><strong>Phone:</strong> {senderInfo.contactNum || "N/A"}</p>
        </div>
        <div className="info-column" style={{ flex: 1, paddingLeft: '15px', borderLeft: '1px solid #ccc', boxSizing: 'border-box' }}>
          <p style={{ margin: '4px 0' }}><strong>Receiver Name:</strong> {receiverInfo.fullName || "N/A"}</p>
          <p style={{ margin: '4px 0' }}><strong>Address:</strong> {receiverInfo.fullAddress || "N/A"}, {receiverInfo.city || ""}, {receiverInfo.country || ""}</p>
          <p style={{ margin: '4px 0' }}><strong>Phone:</strong> {receiverInfo.contactNumber || "N/A"}</p>
          <p style={{ margin: '4px 0' }}><strong>Email:</strong> {receiverInfo.email || "N/A"}</p>
        </div>
      </div>

      {/* 📦 Package Breakdown Section Banner */}
      <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold', fontSize: '14px', marginBottom: '10px' }}>Package Details</div>
      
      <table className="corp-invoice-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '20px' }}>
        <thead>
          <tr style={{ background: '#f4f4f4', borderBottom: '2px solid #000' }}>
            <th style={{ width: '8%', padding: '8px', textAlign: 'left' }}>S.N</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
            <th style={{ width: '25%', padding: '8px', textAlign: 'left' }}>HS CODE</th>
            <th style={{ width: '15%', padding: '8px', textAlign: 'center' }}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {packages.flatMap((pkg, pkgIdx) => 
            (pkg.items || []).map((item, itemIdx) => (
              <tr key={`${pkg.id || pkgIdx}-${itemIdx}`} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{itemIdx + 1}</td>
                <td style={{ padding: '8px' }}>
                  {item.description || `${pkg.profile || "Cargo Item"} (${pkg.type || "Parcel"})`}
                </td>
                <td style={{ padding: '8px' }}>{item.hsCode || "—"}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{item.qty || 1}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 📋 Bottom Section Layout Grid */}
      <div className="invoice-footer-grid" style={{ display: 'flex', width: '100%', gap: '20px', marginTop: '20px' }}>
        
        {/* Left Side Column: Financial Aggregations & QR Tracking */}
        <div className="financials-block" style={{ flex: 1, background: '#f4f6f8', padding: '15px', borderRadius: '4px', boxSizing: 'border-box', fontSize: '13px' }}>
          <p style={{ margin: '4px 0' }}><strong>Total Weight:</strong> {aggregateWeight.toFixed(2)} Kg</p>
          <p style={{ margin: '4px 0' }}><strong>Weight charge:</strong> {billingInfo.currency || "NPR"} {Number(totalPayable).toLocaleString()}</p>
          
          <div className="grand-total-row" style={{ margin: '10px 0', padding: '8px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Total: </span>
            <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#0250a3' }}>
              {billingInfo.currency || "NPR"} {Number(totalPayable).toLocaleString()}
            </span>
          </div>

          {/* Live Tracking QR Component Block */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', padding: '10px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px' }}>
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#555', marginBottom: '6px', textTransform: 'uppercase' }}>
              Scan to Track Shipment
            </span>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(previewTrackingId || 'N/A')}`}
              alt="Tracking Invoice QR Code Matrix"
              style={{ width: '110px', height: '110px', display: 'block' }}
            />
            <span style={{ fontSize: '10px', fontFamily: 'monospace', marginTop: '4px', color: '#222', fontWeight: 'bold' }}>
              {previewTrackingId}
            </span>
          </div>
        </div>

        {/* Right Side Column: Important Shipment Notes */}
        <div className="comments-block" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', fontSize: '12px', padding: '6px 10px', marginBottom: '8px', fontWeight: 'bold' }}>
            Important Shipment Notes
          </div>
          
          <div style={{ flex: 1, background: '#fafafa', border: '1px solid #eee', padding: '12px', borderRadius: '4px', fontSize: '13px', color: '#333', whiteSpace: 'pre-wrap', lineHeight: '1.5', minHeight: '100px' }}>
            {invoiceNotes || "— No custom handling or delivery notes accompanied this shipment registry. —"}
          </div>

          <div style={{ marginTop: '15px', fontSize: '11px', color: '#666', lineHeight: '1.4' }}>
            <strong style={{ color: '#000' }}>Comments:</strong>
            <ul style={{ margin: '5px 0 0 15px', padding: 0 }}>
              <li>Declared package parameters are subject to regular weight re-evaluation audits.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}