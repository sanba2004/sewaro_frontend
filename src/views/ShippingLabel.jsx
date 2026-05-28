
// import React from 'react';
// import "/src/styles/Invoice.css";
// export default function ShippingLabel({ previewTrackingId, packages, senderInfo, receiverInfo, billingInfo }) {
//   // Aggregate total payload weight
//   const aggregateWeight = packages.reduce((sum, p) => {
//     const pWeight = (p.items || []).reduce((subSum, item) => subSum + (parseFloat(item.weight) || 0), 0);
//     return sum + pWeight;
//   }, 0);

//   return (
//     <div className="shipping-label-standalone-print-wrapper">
//       <div style={{
//         width: '100%',
//         maxWidth: '450px',
//         margin: '0 auto',
//         padding: '15px',
//         background: '#ffffff',
//         border: '3px solid #000000',
//         fontFamily: '"Helvetica Neue", Arial, sans-serif',
//         boxSizing: 'border-box',
//         color: '#000000'
//       }}>
        
//         {/* Top Pagination Meta */}
//         <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>
//           <span>Page 1 of 1</span>
//         </div>

//         {/* Corporate Header & Shipper Context */}
//         <div style={{ display: 'flex', borderBottom: '2px solid #000000', paddingBottom: '10px' }}>
//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingRight: '10px', borderRight: '2px solid #000000' }}>
//             <h2 style={{ margin: '0 0 2px 0', fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
//               Sewa Logistics
//             </h2>
//             <span style={{ fontSize: '9px', color: '#333', fontWeight: 'bold' }}>Cargo & Courier Services Worldwide</span>
//           </div>

//           <div style={{ flex: 1, paddingLeft: '12px', fontSize: '11px', lineHeight: '1.4' }}>
//             <span style={{ display: 'block', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Sender:</span>
//             <p style={{ margin: '0' }}><strong>Name:</strong> {senderInfo.fullName || "N/A"}</p>
//             <p style={{ margin: '0' }}><strong>Phone:</strong> {senderInfo.contactNum || "N/A"}</p>
//             <p style={{ margin: '0' }}><strong>Address:</strong> {senderInfo.address || "N/A"}, {senderInfo.city}, {senderInfo.country}</p>
//           </div>
//         </div>

//         {/* Receiver Delivery Specifics */}
//         <div style={{ padding: '10px 0', borderBottom: '2px solid #000000', fontSize: '12px', lineHeight: '1.4' }}>
//           <span style={{ display: 'block', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', marginBottom: '3px' }}>Receiver:</span>
//           <p style={{ margin: '0' }}><strong>Name:</strong> {receiverInfo.fullName || "N/A"}</p>
//           <p style={{ margin: '0' }}><strong>Phone:</strong> {receiverInfo.contactNumber || "N/A"}</p>
//           <p style={{ margin: '0' }}><strong>Address:</strong> {receiverInfo.fullAddress || "N/A"}, {receiverInfo.city}, {receiverInfo.country}</p>
//           <p style={{ margin: '0' }}><strong>Email:</strong> {receiverInfo.email || "N/A"}</p>
          
//           <div style={{ display: 'flex', gap: '15px', marginTop: '6px', paddingTop: '4px', borderTop: '1px dashed #000' }}>
//             <span><strong>Package Weight:</strong> {aggregateWeight.toFixed(2)} Kg</span>
//             <span><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</span>
//           </div>
//           <p style={{ margin: '2px 0 0 0' }}><strong>Payment Mode:</strong> {billingInfo.method || "Cash"}</p>
//         </div>

//         {/* Barcode-Replacing Automated Tracking QR Code */}
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', borderBottom: '2px solid #000000' }}>
//           <img 
//             src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(previewTrackingId || 'N/A')}`}
//             alt="Tracking QR Code"
//             style={{ width: '130px', height: '130px', display: 'block' }}
//           />
//           <h3 style={{ margin: '6px 0 0 0', fontFamily: 'monospace', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px' }}>
//             {previewTrackingId || "N/A"}
//           </h3>
//         </div>

//         {/* Dynamic Destination Country Panel Footer */}
//         <div style={{ padding: '8px 0 2px 0', textAlign: 'center' }}>
//           <h1 style={{ margin: '0', fontSize: '26px', fontWeight: '900', textTransform: 'uppercase' }}>
//             {receiverInfo.country || "NEPAL"}
//           </h1>
//         </div>

//       </div>
//     </div>
//   );
// }
import React from 'react';
import "/src/styles/Invoice.css";

export default function ShippingLabel({ previewTrackingId, packages, senderInfo, receiverInfo, billingInfo }) {
  // 🌟 FIXED: Sum the user's custom-entered manual package weight fields instead of the item estimates
  const aggregateWeight = packages.reduce((sum, p) => {
    return sum + (parseFloat(p.total_weight) || 0);
  }, 0);

  return (
    <div className="shipping-label-standalone-print-wrapper">
      <div style={{
        width: '100%',
        maxWidth: '450px',
        margin: '0 auto',
        padding: '15px',
        background: '#ffffff',
        border: '3px solid #000000',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        boxSizing: 'border-box',
        color: '#000000'
      }}>
        
        {/* Top Pagination Meta */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>
          <span>Page 1 of 1</span>
        </div>

        {/* Corporate Header & Shipper Context */}
        <div style={{ display: 'flex', borderBottom: '2px solid #000000', paddingBottom: '10px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingRight: '10px', borderRight: '2px solid #000000' }}>
            <h2 style={{ margin: '0 0 2px 0', fontSize: '22px', color: '#040404',fontWeight: '900', letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
              Namaste Sewaro Cargo
            </h2>
            <span style={{ fontSize: '9px', color: '#000000', fontWeight: 'bold' }}>Cargo & Courier Services Worldwide</span>
          </div>

          <div style={{ flex: 1, paddingLeft: '12px', fontSize: '11px', lineHeight: '1.4' }}>
            <span style={{ display: 'block', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Sender:</span>
            <p style={{ margin: '0' }}><strong>Name:</strong> {senderInfo.fullName || "N/A"}</p>
            <p style={{ margin: '0' }}><strong>Phone:</strong> {senderInfo.contactNum || "N/A"}</p>
            <p style={{ margin: '0' }}><strong>Address:</strong> {senderInfo.address || "N/A"}, {senderInfo.city}, {senderInfo.country}</p>
          </div>
        </div>

        {/* Receiver Delivery Specifics */}
        <div style={{ padding: '10px 0', borderBottom: '2px solid #000000', fontSize: '12px', lineHeight: '1.4' }}>
          <span style={{ display: 'block', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', marginBottom: '3px' }}>Receiver:</span>
          <p style={{ margin: '0' }}><strong>Name:</strong> {receiverInfo.fullName || "N/A"}</p>
          <p style={{ margin: '0' }}><strong>Phone:</strong> {receiverInfo.contactNumber || "N/A"}</p>
          <p style={{ margin: '0' }}><strong>Address:</strong> {receiverInfo.fullAddress || "N/A"}, {receiverInfo.city}, {receiverInfo.country}</p>
          <p style={{ margin: '0' }}><strong>Email:</strong> {receiverInfo.email || "N/A"}</p>
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '6px', paddingTop: '4px', borderTop: '1px dashed #000' }}>
            <span><strong>Package Weight:</strong> {aggregateWeight.toFixed(2)} Kg</span>
            <span><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</span>
          </div>
          <p style={{ margin: '2px 0 0 0' }}><strong>Payment Mode:</strong> {billingInfo.method || "Cash"}</p>
        </div>

        {/* Barcode-Replacing Automated Tracking QR Code */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', borderBottom: '2px solid #000000' }}>
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(previewTrackingId || 'N/A')}`}
            alt="Tracking QR Code"
            style={{ width: '130px', height: '130px', display: 'block' }}
          />
          <h3 style={{ margin: '6px 0 0 0', fontFamily: 'monospace', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px' }}>
            {previewTrackingId || "N/A"}
          </h3>
        </div>

        {/* Dynamic Destination Country Panel Footer */}
        <div style={{ padding: '8px 0 2px 0', textAlign: 'center' }}>
          <h1 style={{ margin: '0', fontSize: '26px', fontWeight: '900', textTransform: 'uppercase' }}>
            {receiverInfo.country || "NEPAL"}
          </h1>
        </div>

      </div>
    </div>
  );
}