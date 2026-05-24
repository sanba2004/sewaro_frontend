// import React, { useEffect, useRef } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
//   const scannerRef = useRef(null);

//   useEffect(() => {
//     if (!isOpen) return;

//     // Initialize the hardware reader engine
//     const scanner = new Html5QrcodeScanner(
//       "qr-reader-target",
//       { 
//         fps: 10, 
//         qrbox: { width: 250, height: 250 },
//         rememberLastUsedCamera: true,
//         supportedScanTypes: [0, 1] // Supports both QR codes and typical Barcodes
//       },
//       /* verbose= */ false
//     );

//     scanner.render(
//       (decodedText) => {
//         // Cleanly catch the tracking token and strip random whitespaces
//         const cleanToken = decodedText.trim();
//         scanner.clear().then(() => {
//           onScanSuccess(cleanToken);
//         }).catch(err => console.error("Failed to clear scanner state:", err));
//       },
//       (error) => {
//         // Soft logging to avoid console spamming during camera movement frames
//         Object.values(error); 
//       }
//     );

//     return () => {
//       scanner.clear().catch(err => console.error("Scanner cleanup failure:", err));
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div style={{
//       position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
//       backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center',
//       alignItems: 'center', zIndex: 9999, padding: '20px', boxSizing: 'border-box'
//     }}>
//       <div style={{
//         background: '#fff', padding: '25px', borderRadius: '8px',
//         maxWidth: '500px', width: '100%', position: 'relative', textAlign: 'center'
//       }}>
//         <button 
//           onClick={onClose}
//           style={{
//             position: 'absolute', top: '12px', right: '15px', background: 'none',
//             border: 'none', fontSize: '22px', cursor: 'pointer', fontWeight: 'bold'
//           }}
//         >
//           &times;
//         </button>
//         <h3 style={{ marginTop: 0, marginBottom: '8px', color: '#333' }}>📷 Scan Shipment Label</h3>
//         <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
//           Center the barcode or QR code inside the camera viewfinder panel below.
//         </p>
        
//         {/* Hardware Render Target Frame */}
//         <div id="qr-reader-target" style={{ width: '100%', borderRadius: '4px', overflow: 'hidden' }}></div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  useEffect(() => {
    if (!isOpen) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader-target",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [0, 1] 
      },
      false
    );

    scanner.render(
      (decodedText) => {
        const cleanToken = decodedText.trim();
        scanner.clear().then(() => {
          onScanSuccess(cleanToken);
        }).catch(err => console.error("Failed to clear scanner state:", err));
      },
      (error) => {
        Object.values(error); 
      }
    );

    return () => {
      scanner.clear().catch(err => console.error("Scanner cleanup failure:", err));
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 9999, padding: '20px', boxSizing: 'border-box'
    }}>
      {/* 📦 Main Container Card (Relative positioning lets us anchor the button inside it) */}
      <div style={{
        background: '#fff', 
        padding: '30px 25px 25px 25px', 
        borderRadius: '12px',
        maxWidth: '500px', 
        width: '100%', 
        position: 'relative', // 👈 Crucial context anchor
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        
        {/* ❌ Absolute Positioned Cross Close Button */}
        <button 
          onClick={onClose}
          title="Close Camera"
          style={{
            position: 'absolute', 
            top: '15px',          // 👈 15px from the top edge of the white box
            right: '20px',        // 👈 20px from the right edge of the white box
            background: '#f1f3f5',
            border: 'none', 
            fontSize: '20px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            color: '#333',
            width: '32px',
            height: '32px',
            borderRadius: '50%',  // Makes it a clean circular button
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10000        // Forces it above any dynamic html5-qrcode video text overlays
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#e9ecef'}
          onMouseOut={(e) => e.currentTarget.style.background = '#f1f3f5'}
        >
          &times;
        </button>

        <h3 style={{ marginTop: '5px', marginBottom: '8px', color: '#333', fontSize: '18px' }}>
          📷 Scan Shipment Label
        </h3>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
          Center the barcode or QR code inside the camera viewfinder panel below.
        </p>
        
        {/* Camera Render Window */}
        <div id="qr-reader-target" style={{ width: '100%', borderRadius: '6px', overflow: 'hidden' }}></div>
      </div>
    </div>
  );
}