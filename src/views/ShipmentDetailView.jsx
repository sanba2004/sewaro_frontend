
// // import React, { useState, useEffect } from 'react';
// // import './Invoice.css'; 
// // import './ShipmentDetail.css';
// // export default function ShipmentDetailView({ trackingId, onClose }) {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [data, setData] = useState(null);
// //   const [updatingStatus, setUpdatingStatus] = useState(false);

// //   useEffect(() => {
// //     if (!trackingId) return;
// //     fetchFullShipmentGraph();
// //   }, [trackingId]);

// //   const fetchFullShipmentGraph = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const response = await fetch(`http://localhost:5000/api/shipments/track/${trackingId}`);
// //       if (!response.ok) throw new Error(`Shipment ${trackingId} could not be resolved.`);
// //       const jsonResult = await response.json();
// //       setData(jsonResult);
// //     } catch (err) {
// //       setError(err.message || "Failed to establish a safe database link.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle live database status modification changes
// //   const handleStatusChange = async (newStatus) => {
// //     try {
// //       setUpdatingStatus(true);
// //       const response = await fetch(`http://localhost:5000/api/shipments/status`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ trackingId, status: newStatus })
// //       });

// //       if (!response.ok) throw new Error("Failed to update tracking status.");
      
// //       // Instantly update local data state layout
// //       setData(prev => ({ ...prev, status: newStatus }));
// //       alert(`Status updated successfully to: ${newStatus}`);
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setUpdatingStatus(false);
// //     }
// //   };

// //   if (loading) return <div style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>🔄 Querying transactional databases for #{trackingId}...</div>;
// //   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Error: {error}</div>;

// //   return (
// //     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
// //       {/* Upper Navigation Panel Control Strip */}
// //       <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
// //         <button onClick={onClose} style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
// //           ← Back to Dashboard List
// //         </button>
// //         <button onClick={() => window.print()} style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
// //           🖨️ Print Dossier Document
// //         </button>
// //       </div>

// //       {/* 🛡️ MAIN CONSOLE CARD SURFACE */}
// //       <div className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
        
// //         {/* TOP PANEL: Global Meta & Live Dropdown Action Switch */}
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px' }}>
// //           <div>
// //             <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', uppercase: 'true' }}>Shipment Console</h1>
// //             <p style={{ margin: 0 }}><strong>Tracking Identifier:</strong> {data.tracking_id}</p>
// //             <p style={{ margin: 0 }}><strong>System Entry Date:</strong> {new Date(data.created_at).toLocaleString('en-GB')}</p>
// //           </div>
          
// //           <div className="no-print" style={{ textAlign: 'right', background: '#f4f6f8', padding: '15px', border: '1px solid #ccc' }}>
// //             <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>LOGISTICS LIFE-CYCLE STATUS</label>
// //             <select 
// //               value={data.status || "Confirmed"} 
// //               onChange={(e) => handleStatusChange(e.target.value)}
// //               disabled={updatingStatus}
// //               style={{ padding: '8px 12px', fontWeight: 'bold', fontSize: '14px', border: '2px solid #000', cursor: 'pointer' }}
// //             >
// //               <option value="Confirmed">Confirmed</option>
// //               <option value="In Transit">In Transit</option>
// //               <option value="Arrived">Arrived</option>
// //               <option value="Customs Hold">Customs Hold</option>
// //               <option value="Delivered">Delivered</option>
// //             </select>
// //           </div>
// //         </div>

// //         {/* SECTION 1: SENDER DATA & GOVT IDENTITY DOCUMENT CARDS */}
// //         {/* SECTION 1: SENDER DATA */}
// //         {/* SECTION 1: SENDER DATA */}
// //         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
// //           1. Sender Information
// //         </div>
// //         {/* Forced text-align: left on the grid row container */}
// //         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', textAlign: 'left' }}>
          
// //           {/* 📋 LEFT SIDE: Explicitly left-aligned text wrapper */}
// //           <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', alignItems: 'flex-start' }}>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Full Name:</strong> {data.shipper_name}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Contact phone:</strong> {data.shipper_phone}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Email Address:</strong> {data.shipper_email || 'N/A'}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Full Address:</strong> {data.shipper_address}, {data.shipper_city}, {data.shipper_country}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Sender Category:</strong> {data.sender_type || 'Personal'}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>ID Document Provided:</strong> {data.sender_id_type || 'N/A'}</p>
// //           </div>
          
// //           {/* 🖼️ RIGHT SIDE: ID CONTAINER */}
// //           <div style={{ textAlign: 'center' }}>
// //             <label style={{ display: 'block', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px', color: '#333', textAlign: 'center' }}>
// //               Verified Government Identification (Click to inspect asset in high resolution):
// //             </label>
// //             <div style={{ border: '1px dashed #999', padding: '12px', textAlign: 'center', background: '#fafafa', borderRadius: '4px' }}>
// //               <span style={{ fontSize: '11px', display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '8px', textTransform: 'uppercase' }}>
// //                 Sender Identification Document Image
// //               </span>
// //               {data.sender_id_front_url ? (
// //                 <a href={data.sender_id_front_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
// //                   <img 
// //                     src={data.sender_id_front_url} 
// //                     alt="Government ID Front View Asset" 
// //                     style={{ 
// //                       width: '100%', 
// //                       maxHeight: '220px', 
// //                       objectFit: 'contain', 
// //                       cursor: 'pointer', 
// //                       border: '1px solid #ddd', 
// //                       background: '#fff',
// //                       boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
// //                     }} 
// //                     onError={(e) => { 
// //                       e.target.style.display = 'none'; 
// //                       e.target.insertAdjacentHTML('afterend', '<p style="font-size:12px;color:#d9534f;padding:20px 0;font-weight:bold;">⚠️ Access Configuration Alert</p>'); 
// //                     }}
// //                   />
// //                 </a>
// //               ) : (
// //                 <div style={{ padding: '40px 0', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
// //                   🚫 No Front Identification View Upload Profile Associated With This Ledger Record.
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* SECTION 2: RECEIVER ROUTING DETAILS */}
// //         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
// //           2. Receiver Information
// //         </div>
// //         {/* Forced text-align: left on the grid row container */}
// //         <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', textAlign: 'left' }}>
          
// //           {/* 📋 LEFT SIDE: Explicitly left-aligned text wrapper */}
// //           <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', alignItems: 'flex-start' }}>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Receiver Name:</strong> {data.receiver_name}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Primary Contact:</strong> {data.receiver_phone}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Delivery Destination Country:</strong> {data.receiver_country}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>State / Province:</strong> {data.receiver_state || 'N/A'}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>City / Town:</strong> {data.receiver_city}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Zip Code / Postal Code:</strong> {data.receiver_zip || 'N/A'}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Specific Street Address:</strong> {data.receiver_address}</p>
// //             <p style={{ margin: '4px 0', textAlign: 'left' }}><strong>Local Landmark Notes:</strong> {data.receiver_landmark || 'None Provided'}</p>
// //           </div>

// //           {/* 🖼️ RIGHT SIDE: RECEIVER ID IMAGE WINDOW */}
// //           <div style={{ 
// //             border: '1px dashed #bbb', 
// //             padding: '12px', 
// //             textAlign: 'center', 
// //             background: '#fafafa', 
// //             borderRadius: '4px',
// //             display: 'flex',
// //             flexDirection: 'column',
// //             justifyContent: 'center',
// //             alignItems: 'center'
// //           }}>
// //             <span style={{ fontSize: '11px', display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '8px', textTransform: 'uppercase' }}>
// //               Receiver ID Document Image
// //             </span>
// //             {data.receiver_id_url ? (
// //               <a href={data.receiver_id_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
// //                 <img 
// //                   src={data.receiver_id_url} 
// //                   alt="Receiver Identity Document" 
// //                   style={{ 
// //                     width: '100%', 
// //                     maxHeight: '220px', 
// //                     objectFit: 'contain', 
// //                     cursor: 'pointer', 
// //                     border: '1px solid #ddd', 
// //                     background: '#fff',
// //                     boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
// //                   }} 
// //                   onError={(e) => { 
// //                     e.target.style.display = 'none'; 
// //                     e.target.insertAdjacentHTML('afterend', '<p style="font-size:11px;color:#d9534f;padding:20px 0;font-weight:bold;">⚠️ Access Configuration Alert</p>'); 
// //                   }}
// //                 />
// //               </a>
// //             ) : (
// //               <div style={{ padding: '40px 0', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
// //                 🚫 No Receiver Verification Document attached to this shipment record.
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* SECTION 3: PACKAGE INFO OVERVIEW */}
// //         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
// //           3. Package Information
// //         </div>
// //         <div style={{ marginTop: '15px', marginBottom: '30px' }}>
// //           {(data.shipment_package || []).map((pkg, idx) => (
// //             <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
// //               <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
// //                 <span>📦 Box/Container #{idx + 1} Profile: {pkg.profile || 'General'}</span>
// //                 <span>Type: {pkg.type} | Dimensions: {pkg.dimensions_str || 'N/A'} | Volume Cubage: {pkg.cbm?.toFixed(4)} CBM</span>
// //               </div>
              
// //               {/* Itemized contents list nested within this block context */}
// //               <table className="corp-invoice-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
// //                 <thead>
// //                   <tr style={{ background: '#f4f4f4' }}>
// //                     <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}> Item Description</th>
// //                     <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>HS Code</th>
// //                     <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Quantity</th>
// //                     <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Item Unit Weight</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {(pkg.shipment_item || []).map((item, iIdx) => (
// //                     <tr key={item.id || iIdx}>
// //                       <td style={{ padding: '6px', border: '1px solid #ddd' }}>{item.description}</td>
// //                       <td style={{ padding: '6px', textAlign: 'center', border: '1px solid #ddd' }}>{item.hs_code || '—'}</td>
// //                       <td style={{ padding: '6px', textAlign: 'center', border: '1px solid #ddd' }}>{item.qty}</td>
// //                       <td style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>{item.weight?.toFixed(2)} Kg</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           ))}
// //         </div>

// //         {/* SECTION 4 & 5: PRICE LEDGER & SYSTEM INVOICE COMPLIANCE BLOCK */}
// //         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
// //           4. Cost
// //         </div>
        
// //         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px' }}>
// //           {/* Terms text blocks */}
// //           <div style={{ fontSize: '11px', color: '#555', border: '1px solid #eee', padding: '10px', background: '#fbfbfb' }}>
// //             <strong style={{ display: 'block', color: '#000', marginBottom: '5px' }}>Contractual Freight Advisory:</strong>
// //             <ul style={{ margin: 0, paddingLeft: '15px' }}>
// //               {/* <li>Value limits for un-insured parcels max out at 100 USD.</li>
// //               <li>Destizone destination processing import duties remain the responsibility of the cargo consignee.</li>
// //               <li>Status updates logged inside this dashboard trigger background messaging tasks.</li> */}
// //             </ul>
// //           </div>

// //           {/* Core financial ledger numbers rows */}
// //           <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000' }}>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
// //               <span>Estimated Net Weight:</span>
// //               <strong>{data.shipment_package?.reduce((acc, p) => acc + (p.shipment_item?.reduce((s, i) => s + (i.weight * i.qty), 0) || 0), 0).toFixed(2)} Kg</strong>
// //             </div>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
// //               <span>Settlement Framework:</span>
// //               <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{data.payment_method}</span>
// //             </div>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #ccc' }}>
// //               <span>Estimated Transit Charges:</span>
// //               <span>{data.currency} {Number(data.total_amount || 0).toLocaleString()}</span>
// //             </div>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#000' }}>
// //               <span>Estimated Grand Total:</span>
// //               <span>{data.currency} {Number(data.total_amount || 0).toLocaleString()}</span>
// //             </div>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }




// // import React, { useState, useEffect } from 'react';
// // import './Invoice.css'; 
// // import './ShipmentDetail.css';

// // // 🌟 Added 'user' to the destructured component props
// // export default function ShipmentDetailView({ trackingId, onClose, user }) {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [data, setData] = useState(null);
// //   const [updatingStatus, setUpdatingStatus] = useState(false);

// //   useEffect(() => {
// //     // 🌟 Role guard check inside useEffect to prevent unauthorized fetch calls
// //     if (!trackingId || user?.role !== 'customer') return;
// //     fetchFullShipmentGraph();
// //   }, [trackingId, user]);

// //   const fetchFullShipmentGraph = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const response = await fetch(`http://localhost:5000/api/shipments/track/${trackingId}`);
// //       if (!response.ok) throw new Error(`Shipment ${trackingId} could not be resolved.`);
// //       const jsonResult = await response.json();
// //       setData(jsonResult);
// //     } catch (err) {
// //       setError(err.message || "Failed to establish a safe database link.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle live database status modification changes
// //   const handleStatusChange = async (newStatus) => {
// //     try {
// //       setUpdatingStatus(true);
// //       const response = await fetch(`http://localhost:5000/api/shipments/status`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ trackingId, status: newStatus })
// //       });

// //       if (!response.ok) throw new Error("Failed to update tracking status.");
      
// //       setData(prev => ({ ...prev, status: newStatus }));
// //       alert(`Status updated successfully to: ${newStatus}`);
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setUpdatingStatus(false);
// //     }
// //   };

// //   // 🌟 FIRST CORE CHANGE: Direct UI Role Guard Short-Circuit
// //   // If the logged-in user is NOT a customer, block rendering immediately
// //   if (user?.role !== 'customer') {
// //     return (
// //       <div style={{ padding: '40px', textAlign: 'center', color: '#d9534f' }}>
// //         <h2>🚫 Access Restricted</h2>
// //         <p>This comprehensive dossier print layout is exclusively reserved for Customer accounts.</p>
// //         <button onClick={onClose} style={{ marginTop: '15px', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
// //           Go Back
// //         </button>
// //       </div>
// //     );
// //   }

// //   if (loading) return <div style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>🔄 Querying transactional databases for #{trackingId}...</div>;
// //   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Error: {error}</div>;

// //   return (
// //     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
// //       {/* Upper Navigation Panel Control Strip */}
// //       <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
// //         <button onClick={onClose} style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
// //           ← Back to Dashboard List
// //         </button>
// //         <button onClick={() => window.print()} style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
// //           🖨️ Print Dossier Document
// //         </button>
// //       </div>

// //       {/* 🛡️ MAIN CONSOLE CARD SURFACE */}
// //       <div className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
        
// //         {/* TOP PANEL: Global Meta & Live Dropdown Action Switch */}
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px' }}>
// //           <div>
// //             <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>Shipment Console</h1>
// //             <p style={{ margin: 0 }}><strong>Tracking number:</strong> {data.tracking_id}</p>
// //             <p style={{ margin: 0 }}><strong>Shipment Created:</strong> {new Date(data.created_at).toLocaleString('en-GB')}</p>
// //           </div>
          
// //           {/* <div className="no-print" style={{ textAlign: 'right', background: '#f4f6f8', padding: '15px', border: '1px solid #ccc' }}>
// //             <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>LOGISTICS LIFE-CYCLE STATUS</label>
// //             <select 
// //               value={data.status || "Confirmed"} 
// //               onChange={(e) => handleStatusChange(e.target.value)}
// //               disabled={updatingStatus}
// //               style={{ padding: '8px 12px', fontWeight: 'bold', fontSize: '14px', border: '2px solid #000', cursor: 'pointer' }}
// //             >
// //               <option value="Confirmed">Confirmed</option>
// //               <option value="In Transit">In Transit</option>
// //               <option value="Arrived">Arrived</option>
// //               <option value="Customs Hold">Customs Hold</option>
// //               <option value="Delivered">Delivered</option>
// //             </select>
// //           </div> */}
// //         </div>

// //         {/* SECTION 1: SENDER DATA */}
// //         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
// //           1. Sender Information
// //         </div>
// //         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', textAlign: 'left' }}>
// //           <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', alignItems: 'flex-start' }}>
// //             <p style={{ margin: '4px 0' }}><strong>Full Name:</strong> {data.shipper_name}</p>
// //             <p style={{ margin: '4px 0' }}><strong>Contact phone:</strong> {data.shipper_phone}</p>
// //             <p style={{ margin: '4px 0' }}><strong>Email Address:</strong> {data.shipper_email || 'N/A'}</p>
// //             <p style={{ margin: '4px 0' }}><strong>Full Address:</strong> {data.shipper_address}, {data.shipper_city}, {data.shipper_country}</p>
// //             <p style={{ margin: '4px 0' }}><strong>Sender Category:</strong> {data.sender_type || 'Personal'}</p>
// //             <p style={{ margin: '4px 0' }}><strong>ID Document Provided:</strong> {data.sender_id_type || 'N/A'}</p>
// //           </div>
          
// //           <div style={{ textAlign: 'center' }}>
// //             <label style={{ display: 'block', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px', color: '#333' }}>
// //               Verified Government Identification:
// //             </label>
// //             <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', borderRadius: '4px' }}>
// //               <span style={{ fontSize: '11px', display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '8px', textTransform: 'uppercase' }}>
// //                 Sender Identification Document Image
// //               </span>
// //               {data.sender_id_front_url ? (
// //                 <a href={data.sender_id_front_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
// //                   <img 
// //                     src={data.sender_id_front_url} 
// //                     alt="Government ID Front View" 
// //                     style={{ width: '100%', maxHeight: '220px', objectFit: 'contain', border: '1px solid #ddd', background: '#fff' }}
// //                   />
// //                 </a>
// //               ) : (
// //                 <div style={{ padding: '40px 0', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
// //                   🚫 No Front Identification View Upload Profile.
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* SECTION 2: RECEIVER ROUTING DETAILS */}
// //         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
// //           2. Receiver Information
// //         </div>
// //         <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', textAlign: 'left' }}>
// //           <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
// //             <p style={{ margin: '4px 0' }}><strong>Receiver Name:</strong> {data.receiver_name}</p>
// //             <p style={{ margin: '4px 0' }}><strong>Primary Contact:</strong> {data.receiver_phone}</p>
// //             <p style={{ margin: '4px 0' }}><strong>Delivery Destination Country:</strong> {data.receiver_country}</p>
// //             <p style={{ margin: '4px 0' }}><strong>State / Province:</strong> {data.receiver_state || 'N/A'}</p>
// //             <p style={{ margin: '4px 0' }}><strong>City / Town:</strong> {data.receiver_city}</p>
// //             <p style={{ margin: '4px 0' }}><strong>Zip Code / Postal Code:</strong> {data.receiver_zip || 'N/A'}</p>
// //             <p style={{ margin: '4px 0' }}><strong>Specific Street Address:</strong> {data.receiver_address}</p>
// //             <p style={{ margin: '4px 0' }}><strong>Local Landmark Notes:</strong> {data.receiver_landmark || 'None Provided'}</p>
// //           </div>

// //           <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
// //             <span style={{ fontSize: '11px', display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '8px', textTransform: 'uppercase' }}>
// //               Receiver ID Document Image
// //             </span>
// //             {data.receiver_id_url ? (
// //               <a href={data.receiver_id_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
// //                 <img 
// //                   src={data.receiver_id_url} 
// //                   alt="Receiver Identity Document" 
// //                   style={{ width: '100%', maxHeight: '220px', objectFit: 'contain', border: '1px solid #ddd', background: '#fff' }}
// //                 />
// //               </a>
// //             ) : (
// //               <div style={{ padding: '40px 0', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
// //                 🚫 No Receiver Verification Document attached.
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* SECTION 3: PACKAGE INFO OVERVIEW */}
// //         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
// //           3. Package Information
// //         </div>
// //         <div style={{ marginTop: '15px', marginBottom: '30px' }}>
// //           {(data.shipment_package || []).map((pkg, idx) => (
// //             <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
// //               <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
// //                 <span>📦 Box/Container #{idx + 1} Profile: {pkg.profile || 'General'}</span>
// //                 <span>Type: {pkg.type} | Dimensions: {pkg.dimensions_str || 'N/A'} | Volume Cubage: {pkg.cbm?.toFixed(4)} CBM</span>
// //               </div>
              
// //               <table className="corp-invoice-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
// //                 <thead>
// //                   <tr style={{ background: '#f4f4f4' }}>
// //                     <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}> Item Description</th>
// //                     <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>HS Code</th>
// //                     <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Quantity</th>
// //                     <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Item Unit Weight</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {(pkg.shipment_item || []).map((item, iIdx) => (
// //                     <tr key={item.id || iIdx}>
// //                       <td style={{ padding: '6px', border: '1px solid #ddd' }}>{item.description}</td>
// //                       <td style={{ padding: '6px', textAlign: 'center', border: '1px solid #ddd' }}>{item.hs_code || '—'}</td>
// //                       <td style={{ padding: '6px', textAlign: 'center', border: '1px solid #ddd' }}>{item.qty}</td>
// //                       <td style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>{item.weight?.toFixed(2)} Kg</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           ))}
// //         </div>

// //         {/* SECTION 4: PRICE LEDGER */}
// //         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
// //           4. Cost
// //         </div>
// //         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px' }}>
// //           <div style={{ fontSize: '11px', color: '#555', border: '1px solid #eee', padding: '10px', background: '#fbfbfb' }}>
// //             <strong style={{ display: 'block', color: '#000', marginBottom: '5px' }}>Contractual Freight Advisory:</strong>
// //             <ul style={{ margin: 0, paddingLeft: '15px' }}></ul>
// //           </div>

// //           <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000' }}>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
// //               <span>Estimated Net Weight:</span>
// //               <strong>{data.shipment_package?.reduce((acc, p) => acc + (p.shipment_item?.reduce((s, i) => s + (i.weight * i.qty), 0) || 0), 0).toFixed(2)} Kg</strong>
// //             </div>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
// //               <span>Settlement Framework:</span>
// //               <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{data.payment_method}</span>
// //             </div>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #ccc' }}>
// //               <span>Estimated Transit Charges:</span>
// //               <span>{data.currency} {Number(data.total_amount || 0).toLocaleString()}</span>
// //             </div>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#000' }}>
// //               <span>Estimated Grand Total:</span>
// //               <span>{data.currency} {Number(data.total_amount || 0).toLocaleString()}</span>
// //             </div>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }



// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; // 🏷️ Make sure your path correctly links to the label file
// import './Invoice.css'; 
// import './ShipmentDetail.css';
// import PrintableInvoice from './PrintableInvoice';

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updatingStatus, setUpdatingStatus] = useState(false);

//   useEffect(() => {
//     if (!trackingId || user?.role !== 'customer') return;
//     fetchFullShipmentGraph();
//   }, [trackingId, user]);

//   const fetchFullShipmentGraph = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${trackingId}`);
//       if (!response.ok) throw new Error(`Shipment ${trackingId} could not be resolved.`);
//       const jsonResult = await response.json();
//       setData(jsonResult);
//     } catch (err) {
//       setError(err.message || "Failed to establish a safe database link.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       setUpdatingStatus(true);
//       const response = await fetch(`http://localhost:5000/api/shipments/status`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ trackingId, status: newStatus })
//       });

//       if (!response.ok) throw new Error("Failed to update tracking status.");
      
//       setData(prev => ({ ...prev, status: newStatus }));
//       alert(`Status updated successfully to: ${newStatus}`);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setUpdatingStatus(false);
//     }
//   };

//   if (user?.role !== 'customer') {
//     return (
//       <div style={{ padding: '40px', textAlign: 'center', color: '#d9534f' }}>
//         <h2>🚫 Access Restricted</h2>
//         <p>This comprehensive dossier print layout is exclusively reserved for Customer accounts.</p>
//         <button onClick={onClose} style={{ marginTop: '15px', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (loading) return <div style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>🔄 Querying transactional databases for #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Error: {error}</div>;

//   // 🔄 RE-MAPPING LAYER: Translate flat database fields into clean props your ShippingLabel understands
//   const mappedSenderInfo = {
//     fullName: data.shipper_name,
//     contactNum: data.shipper_phone,
//     address: data.shipper_address,
//     city: data.shipper_city,
//     country: data.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data.receiver_name,
//     contactNumber: data.receiver_phone,
//     fullAddress: data.receiver_address,
//     city: data.receiver_city,
//     country: data.receiver_country,
//     email: data.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data.payment_method,
//     currency: data.currency || 'NPR'
//   };

//   const mappedPackages = (data.shipment_package || []).map(pkg => ({
//     id: pkg.id,
//     profile: pkg.profile,
//     type: pkg.type,
//     doorToDoor: pkg.door_to_door || false,
//     items: (pkg.shipment_item || []).map(item => ({
//       description: item.description,
//       weight: item.weight,
//       qty: item.qty
//     }))
//   }));

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
//       {/* Upper Navigation Panel Control Strip */}
//       <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
//           ← Back to Dashboard List
//         </button>

//         {/* 🖨️ Print Dossier Document Button */}
//         <button 
//           onClick={() => {
//             document.body.classList.add('print-mode-invoice-only');
//             setTimeout(() => {
//               window.print();
//               document.body.classList.remove('print-mode-invoice-only');
//             }, 50);
//           }} 
//           style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
//         >
//           🖨️ Print Dossier Document
//         </button>

//         {/* 🏷️ Print Label Button */}
//         <button 
//           onClick={() => {
//             document.body.classList.add('print-mode-label-only');
//             setTimeout(() => {
//               window.print();
//               // 🌟 FIXED: Make sure the mode class gets removed right after print dialog opens 
//               // so it doesn't break your live dashboard view state!
//               document.body.classList.remove('print-mode-label-only');
//             }, 50);
//           }} 
//           style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
//         >
//           🏷️ Print Shipping Label
//         </button>
//       </div>

//       {/* 🛡️ MAIN CONSOLE CARD SURFACE */}
//       {/* 🌟 FIXED: Changed id to 'dashboard-view-panel' so CSS media rules don't accidentally print this block when printing the label */}
//       <div id="dashboard-view-panel" className="invoice-card screen-only-container" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
        
//         {/* TOP PANEL: Global Meta */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px' }}>
//           <div>
//             <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>Shipment Console</h1>
//             <p style={{ margin: 0 }}><strong>Tracking number:</strong> {data.tracking_id}</p>
//             <p style={{ margin: 0 }}><strong>Shipment Created:</strong> {new Date(data.created_at).toLocaleString('en-GB')}</p>
//           </div>
//         </div>

//         {/* SECTION 1: SENDER DATA */}
//         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
//           1. Sender Information
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', textAlign: 'left' }}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', alignItems: 'flex-start' }}>
//             <p style={{ margin: '4px 0' }}><strong>Full Name:</strong> {data.shipper_name}</p>
//             <p style={{ margin: '4px 0' }}><strong>Contact phone:</strong> {data.shipper_phone}</p>
//             <p style={{ margin: '4px 0' }}><strong>Email Address:</strong> {data.shipper_email || 'N/A'}</p>
//             <p style={{ margin: '4px 0' }}><strong>Full Address:</strong> {data.shipper_address}, {data.shipper_city}, {data.shipper_country}</p>
//             <p style={{ margin: '4px 0' }}><strong>Sender Category:</strong> {data.sender_type || 'Personal'}</p>
//             <p style={{ margin: '4px 0' }}><strong>ID Document Provided:</strong> {data.sender_id_type || 'N/A'}</p>
//           </div>
          
//           <div style={{ textAlign: 'center' }}>
//             <label style={{ display: 'block', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px', color: '#333' }}>
//               Verified Government Identification:
//             </label>
//             <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', borderRadius: '4px' }}>
//               <span style={{ fontSize: '11px', display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '8px', textTransform: 'uppercase' }}>
//                 Sender Identification Document Image
//               </span>
//               {data.sender_id_front_url ? (
//                 <a href={data.sender_id_front_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
//                   <img 
//                     src={data.sender_id_front_url} 
//                     alt="Government ID Front View" 
//                     style={{ width: '100%', maxHeight: '220px', objectFit: 'contain', border: '1px solid #ddd', background: '#fff' }}
//                   />
//                 </a>
//               ) : (
//                 <div style={{ padding: '40px 0', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
//                   🚫 No Front Identification View Upload Profile.
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* SECTION 2: RECEIVER ROUTING DETAILS */}
//         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
//           2. Receiver Information
//         </div>
//         <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', textAlign: 'left' }}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
//             <p style={{ margin: '4px 0' }}><strong>Receiver Name:</strong> {data.receiver_name}</p>
//             <p style={{ margin: '4px 0' }}><strong>Primary Contact:</strong> {data.receiver_phone}</p>
//             <p style={{ margin: '4px 0' }}><strong>Delivery Destination Country:</strong> {data.receiver_country}</p>
//             <p style={{ margin: '4px 0' }}><strong>State / Province:</strong> {data.receiver_state || 'N/A'}</p>
//             <p style={{ margin: '4px 0' }}><strong>City / Town:</strong> {data.receiver_city}</p>
//             <p style={{ margin: '4px 0' }}><strong>Zip Code / Postal Code:</strong> {data.receiver_zip || 'N/A'}</p>
//             <p style={{ margin: '4px 0' }}><strong>Specific Street Address:</strong> {data.receiver_address}</p>
//             <p style={{ margin: '4px 0' }}><strong>Local Landmark Notes:</strong> {data.receiver_landmark || 'None Provided'}</p>
//           </div>

//           <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//             <span style={{ fontSize: '11px', display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '8px', textTransform: 'uppercase' }}>
//               Receiver ID Document Image
//             </span>
//             {data.receiver_id_url ? (
//               <a href={data.receiver_id_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
//                 <img 
//                   src={data.receiver_id_url} 
//                   alt="Receiver Identity Document" 
//                   style={{ width: '100%', maxHeight: '220px', objectFit: 'contain', border: '1px solid #ddd', background: '#fff' }}
//                 />
//               </a>
//             ) : (
//               <div style={{ padding: '40px 0', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
//                 🚫 No Receiver Verification Document attached.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* SECTION 3: PACKAGE INFO OVERVIEW */}
//         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
//           3. Package Information
//         </div>
//         <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//           {(data.shipment_package || []).map((pkg, idx) => (
//             <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                 <span>📦 Box/Container #{idx + 1} Profile: {pkg.profile || 'General'}</span>
//                 <span>Type: {pkg.type} | Dimensions: {pkg.dimensions_str || 'N/A'} | Volume Cubage: {pkg.cbm?.toFixed(4)} CBM</span>
//               </div>
              
//               <table className="corp-invoice-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
//                 <thead>
//                   <tr style={{ background: '#f4f4f4' }}>
//                     <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}> Item Description</th>
//                     <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>HS Code</th>
//                     <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Quantity</th>
//                     <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Item Unit Weight</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(pkg.shipment_item || []).map((item, iIdx) => (
//                     <tr key={item.id || iIdx}>
//                       <td style={{ padding: '6px', border: '1px solid #ddd' }}>{item.description}</td>
//                       <td style={{ padding: '6px', textAlign: 'center', border: '1px solid #ddd' }}>{item.hs_code || '—'}</td>
//                       <td style={{ padding: '6px', textAlign: 'center', border: '1px solid #ddd' }}>{item.qty}</td>
//                       <td style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>{item.weight?.toFixed(2)} Kg</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </div>

//         {/* SECTION 4: PRICE LEDGER */}
//         <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
//           4. Cost
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px' }}>
//           <div style={{ fontSize: '11px', color: '#555', border: '1px solid #eee', padding: '10px', background: '#fbfbfb' }}>
//             <strong style={{ display: 'block', color: '#000', marginBottom: '5px' }}>Contractual Freight Advisory:</strong>
//             <ul style={{ margin: 0, paddingLeft: '15px' }}>
//               <li>Declared weights subject to physical warehouse audit reviews.</li>
//             </ul>
//           </div>

//           <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//               <span>Estimated Net Weight:</span>
//               <strong>{data.shipment_package?.reduce((acc, p) => acc + (p.shipment_item?.reduce((s, i) => s + (i.weight * i.qty), 0) || 0), 0).toFixed(2)} Kg</strong>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//               <span>Settlement Framework:</span>
//               <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{data.payment_method}</span>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #ccc' }}>
//               <span>Estimated Transit Charges:</span>
//               <span>{data.currency} {Number(data.total_amount || 0).toLocaleString()}</span>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#000' }}>
//               <span>Estimated Grand Total:</span>
//               <span>{data.currency} {Number(data.total_amount || 0).toLocaleString()}</span>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* ==========================================================================
//          🏷️ HARDWARE PRINTING TARGET CONTAINER
//          ========================================================================== */}
//       <div className="label-printable-target">
//         <ShippingLabel 
//           previewTrackingId={data.tracking_id}
//           packages={mappedPackages}
//           senderInfo={mappedSenderInfo}
//           receiverInfo={mappedReceiverInfo}
//           billingInfo={mappedBillingInfo}
//         />
//       </div>

//     </div>
//   );
// }









// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; // 🏷️ Make sure your path correctly links to the label file
// import './Invoice.css'; 
// import './ShipmentDetail.css';

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // Derive roles explicitly
//   const isAdmin = user?.role === 'admin';
//   const isCustomer = user?.role === 'customer';
//   const hasAccess = isAdmin || isCustomer;

//   useEffect(() => {
//     if (!trackingId || !hasAccess) return;
//     fetchFullShipmentGraph();
//   }, [trackingId, user]);

//   const fetchFullShipmentGraph = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${trackingId}`);
//       if (!response.ok) throw new Error(`Shipment ${trackingId} could not be resolved.`);
//       const jsonResult = await response.json();
//       setData(jsonResult);
//     } catch (err) {
//       setError(err.message || "Failed to establish a safe database link.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 📝 Track deep form state updates safely for nested objects & top-level fields
//   const handleInputChange = (field, value, section = null, index = null, nestedField = null) => {
//     setData(prev => {
//       const updated = { ...prev };
      
//       if (section && index !== null && nestedField) {
//         // Handling deep array item edits (like shipment_item inside shipment_package)
//         updated[section] = [...updated[section]];
//         updated[section][index] = { 
//           ...updated[section][index], 
//           [nestedField]: value 
//         };
//       } else if (section && index !== null) {
//         // Handling flat array updates (like changing package properties directly)
//         updated[section] = [...updated[section]];
//         updated[section][index] = { ...updated[section][index], [field]: value };
//       } else {
//         // Standard top-level property fields
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   // 💾 Core API Save Event Handler
//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdating(true);
//       const response = await fetch(`http://localhost:5000/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("Database refused transaction modifications.");
      
//       alert("✨ Shipment details securely rewritten in database successfully!");
//     } catch (err) {
//       alert(`❌ Update Refused: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (!hasAccess) {
//     return (
//       <div style={{ padding: '40px', textAlign: 'center', color: '#d9534f' }}>
//         <h2>🚫 Access Restricted</h2>
//         <p>This panel is exclusively reserved for authorized Customer or Administrator accounts.</p>
//         <button onClick={onClose} style={{ marginTop: '15px', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (loading) return <div style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>🔄 Querying transactional databases for #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Error: {error}</div>;

//   // 🔄 RE-MAPPING LAYER: Translate current runtime data straight into label configurations safely
//   const mappedSenderInfo = {
//     fullName: data.shipper_name,
//     contactNum: data.shipper_phone,
//     address: data.shipper_address,
//     city: data.shipper_city,
//     country: data.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data.receiver_name,
//     contactNumber: data.receiver_phone,
//     fullAddress: data.receiver_address,
//     city: data.receiver_city,
//     country: data.receiver_country,
//     email: data.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data.payment_method,
//     currency: data.currency || 'NPR'
//   };

//   const mappedPackages = (data.shipment_package || []).map(pkg => ({
//     id: pkg.id,
//     profile: pkg.profile,
//     type: pkg.type,
//     doorToDoor: pkg.door_to_door || false,
//     items: (pkg.shipment_item || []).map(item => ({
//       description: item.description,
//       weight: Number(item.weight || 0),
//       qty: Number(item.qty || 0)
//     }))
//   }));

//   // Reusable component style configurations for admin input toggling
//   const inputStyle = {
//     width: '100%',
//     padding: '6px 10px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     boxSizing: 'border-box',
//     fontSize: '14px',
//     background: '#fff'
//   };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
//       {/* Upper Navigation Panel Control Strip */}
//       <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
//           ← Back to Dashboard List
//         </button>

//         {/* 🏷️ Print Label Button */}
//         <button 
//           onClick={() => {
//             document.body.classList.add('print-mode-label-only');
//             setTimeout(() => {
//               window.print();
//               document.body.classList.remove('print-mode-label-only');
//             }, 50);
//           }} 
//           style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
//         >
//           🏷️ Print Shipping Label
//         </button>
//       </div>

//       {/* 🛡️ MAIN FORM CONTAINER */}
//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card screen-only-container" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
          
//           {/* TOP PANEL: Global Meta */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px' }}>
//             <div>
//               <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>
//                 {isAdmin ? '🔧 Admin Control Console' : 'Shipment Console'}
//               </h1>
//               <p style={{ margin: 0 }}><strong>Tracking number:</strong> {data.tracking_id}</p>
//               <p style={{ margin: 0 }}><strong>Shipment Created:</strong> {new Date(data.created_at).toLocaleString('en-GB')}</p>
//             </div>
//           </div>

//           {/* SECTION 1: SENDER DATA */}
//           <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
//             1. Sender Information
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', textAlign: 'left' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', alignItems: 'flex-start' }}>
              
//               <label style={{ width: '100%' }}><strong>Full Name:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span> {data.shipper_name}</span>}
//               </label>

//               <label style={{ width: '100%' }}><strong>Contact phone:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span> {data.shipper_phone}</span>}
//               </label>

//               <label style={{ width: '100%' }}><strong>Email Address:</strong>
//                 {isAdmin ? <input style={inputStyle} type="email" value={data.shipper_email || ''} onChange={(e) => handleInputChange('shipper_email', e.target.value)} /> : <span> {data.shipper_email || 'N/A'}</span>}
//               </label>

//               <label style={{ width: '100%' }}><strong>Full Address:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span> {data.shipper_address}</span>}
//               </label>

//               <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span> {data.shipper_city}</span>}
//                 </label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span> {data.shipper_country}</span>}
//                 </label>
//               </div>
//             </div>
            
//             <div style={{ textAlign: 'center' }}>
//               <label style={{ display: 'block', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px', color: '#333' }}>
//                 Verified Government Identification:
//               </label>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', borderRadius: '4px' }}>
//                 {data.sender_id_front_url ? (
//                   <a href={data.sender_id_front_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
//                     <img src={data.sender_id_front_url} alt="ID Front" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} />
//                   </a>
//                 ) : <div style={{ padding: '20px 0', fontSize: '12px', color: '#999' }}>No Identification Image Uploaded.</div>}
//               </div>
//             </div>
//           </div>

//           {/* SECTION 2: RECEIVER ROUTING DETAILS */}
//           <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
//             2. Receiver Information
//           </div>
//           <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', textAlign: 'left' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
              
//               <label style={{ width: '100%' }}><strong>Receiver Name:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span> {data.receiver_name}</span>}
//               </label>

//               <label style={{ width: '100%' }}><strong>Primary Contact:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span> {data.receiver_phone}</span>}
//               </label>

//               <label style={{ width: '100%' }}><strong>Specific Street Address:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span> {data.receiver_address}</span>}
//               </label>

//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
//                 <label><strong>City / Town:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span> {data.receiver_city}</span>}
//                 </label>
//                 <label><strong>Destination Country:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span> {data.receiver_country}</span>}
//                 </label>
//               </div>
//             </div>

//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//               {data.receiver_id_url ? (
//                 <a href={data.receiver_id_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
//                   <img src={data.receiver_id_url} alt="Receiver ID" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} />
//                 </a>
//               ) : <div style={{ padding: '20px 0', fontSize: '12px', color: '#999' }}>No Verification Document attached.</div>}
//             </div>
//           </div>

//           {/* SECTION 3: PACKAGE INFO OVERVIEW */}
//           <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
//             3. Package Information
//           </div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {(data.shipment_package || []).map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box/Container #{idx + 1} Profile: {pkg.profile || 'General'}</span>
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', gap: '10px', fontWeight: 'normal' }}>
//                       <label>Type: <input style={{ ...inputStyle, width: '90px' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '80px' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value), 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span>Type: {pkg.type} | Volume Cubage: {pkg.cbm?.toFixed(4)} CBM</span>
//                   )}
//                 </div>
                
//                 <table className="corp-invoice-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
//                   <thead>
//                     <tr style={{ background: '#f4f4f4' }}>
//                       <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}> Item Description</th>
//                       <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Quantity</th>
//                       <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Item Unit Weight</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(pkg.shipment_item || []).map((item, iIdx) => (
//                       <tr key={item.id || iIdx}>
//                         <td style={{ padding: '6px', border: '1px solid #ddd' }}>
//                           {isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange(null, null, 'shipment_package', idx, 'shipment_item', iIdx, handleInputChange('description', e.target.value, 'shipment_package', idx, 'shipment_item'))} /* fallback legacy direct tracking mapping pattern below */
//                             onChange={(e) => {
//                               const itemsCopy = [...pkg.shipment_item];
//                               itemsCopy[iIdx].description = e.target.value;
//                               handleInputChange('shipment_item', itemsCopy, 'shipment_package', idx);
//                             }}
//                           /> : item.description}
//                         </td>
//                         <td style={{ padding: '6px', textAlign: 'center', border: '1px solid #ddd' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} 
//                             onChange={(e) => {
//                               const itemsCopy = [...pkg.shipment_item];
//                               itemsCopy[iIdx].qty = parseInt(e.target.value) || 0;
//                               handleInputChange('shipment_item', itemsCopy, 'shipment_package', idx);
//                             }}
//                           /> : item.qty}
//                         </td>
//                         <td style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} 
//                             onChange={(e) => {
//                               const itemsCopy = [...pkg.shipment_item];
//                               itemsCopy[iIdx].weight = parseFloat(e.target.value) || 0;
//                               handleInputChange('shipment_item', itemsCopy, 'shipment_package', idx);
//                             }}
//                           /> : `${item.weight?.toFixed(2)} Kg`}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>

//           {/* SECTION 4: PRICE LEDGER & SAVE SUBMIT PANEL */}
//           <div className="invoice-section-banner" style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>
//             4. Cost Matrix & Controls
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px' }}>
//             <div style={{ fontSize: '11px', color: '#555', border: '1px solid #eee', padding: '10px', background: '#fbfbfb' }}>
//               <strong style={{ display: 'block', color: '#000', marginBottom: '5px' }}>Contractual Freight Advisory:</strong>
//               <p style={{ margin: 0 }}>All modified data changes alter barcode output fields instantly upon submission database integration points.</p>
//             </div>

//             <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000' }}>
//               <div style={{ display: 'flex', justifycontent: 'space-between', marginBottom: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <span>Estimated Grand Total:</span>
//                 {isAdmin ? (
//                   <div style={{ display: 'flex', gap: '5px', width: '60%' }}>
//                     <input style={{ ...inputStyle, width: '60px' }} type="text" value={data.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                     <input style={inputStyle} type="number" value={data.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                   </div>
//                 ) : (
//                   <strong>{data.currency} {Number(data.total_amount || 0).toLocaleString()}</strong>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* 🔘 ADMIN INTERACTIVE EDIT REPLACEMENT TRIGGER BUTTON */}
//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button 
//                 type="submit" 
//                 disabled={updating}
//                 style={{ 
//                   background: updating ? '#666' : '#28a745', 
//                   color: '#fff', 
//                   border: 'none', 
//                   padding: '14px 35px', 
//                   cursor: updating ? 'not-allowed' : 'pointer', 
//                   fontWeight: 'bold', 
//                   fontSize: '16px', 
//                   borderRadius: '4px',
//                   boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                 }}
//               >
//                 {updating ? '⏳ Syncing Matrix Database...' : '💾 Replace Values & Edit Database'}
//               </button>
//             </div>
//           )}

//         </div>
//       </form>

//       {/* ==========================================================================
//          🏷️ HARDWARE PRINTING TARGET CONTAINER (Matches Form Inputs Automatically)
//          ========================================================================== */}
//       <div className="label-printable-target">
//         <ShippingLabel 
//           previewTrackingId={data.tracking_id}
//           packages={mappedPackages}
//           senderInfo={mappedSenderInfo}
//           receiverInfo={mappedReceiverInfo}
//           billingInfo={mappedBillingInfo}
//         />
//       </div>

//     </div>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import './Invoice.css'; 
// import './ShipmentDetail.css';

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   const isAdmin = user?.role === 'admin';
//   const isCustomer = user?.role === 'customer';
//   const hasAccess = isAdmin || isCustomer;

//   useEffect(() => {
//     if (!trackingId || !hasAccess) return;
//     fetchFullShipmentGraph();
//   }, [trackingId, user]);

//   const fetchFullShipmentGraph = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${trackingId}`);
//       if (!response.ok) throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
//       const jsonResult = await response.json();
//       setData(jsonResult);
//     } catch (err) {
//       setError(err.message || "Failed to establish database synchronization link.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 📝 Dynamic Matrix Input Writer - Synchronized directly to your API JSON response shape
//   const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
//     setData(prev => {
//       const updated = { ...prev };
      
//       if (targetArray === 'shipment_package' && nestedItemIndex !== null) {
//         // Nested updates: item array nested deep inside package rows
//         const updatedPackages = [...(updated.shipment_package || [])];
//         const updatedItems = [...(updatedPackages[index]?.shipment_item || [])];
//         if (updatedItems[nestedItemIndex]) {
//           updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
//           updatedPackages[index].shipment_item = updatedItems;
//           updated.shipment_package = updatedPackages;
//         }
//       } else if (targetArray === 'shipment_package') {
//         // Flat array updates: updates data inside custom package layer index positions
//         const updatedPackages = [...(updated.shipment_package || [])];
//         if (updatedPackages[index]) {
//           updatedPackages[index] = { ...updatedPackages[index], [field]: value };
//           updated.shipment_package = updatedPackages;
//         }
//       } else {
//         // Top level properties (shipper_name, receiver_name, etc.)
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdating(true);
//       const response = await fetch(`http://localhost:5000/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
//       alert("✨ Database records updated and synchronized cleanly!");
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   // 🔄 Mapping adapters to cleanly downstream variables to structural ShippingLabel layers
//   const mappedSenderInfo = {
//     fullName: data.shipper_name,
//     contactNum: data.shipper_phone,
//     address: data.shipper_address,
//     city: data.shipper_city,
//     country: data.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data.receiver_name,
//     contactNumber: data.receiver_phone,
//     fullAddress: data.receiver_address,
//     city: data.receiver_city,
//     country: data.receiver_country,
//     email: data.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data.payment_method || 'N/A',
//     currency: data.currency || 'NPR'
//   };

//   const mappedPackages = (data.shipment_package || []).map(pkg => ({
//     id: pkg.id,
//     package_id: pkg.id,
//     profile: pkg.profile,
//     type: pkg.type,
//     cbm: Number(pkg.cbm || 0),
//     items: (pkg.shipment_item || []).map(item => ({
//       id: item.id,
//       description: item.description,
//       weight: Number(item.weight || 0),
//       qty: Number(item.qty || 0)
//     }))
//   }));

//   const inputStyle = {
//     width: '100%', 
//     padding: '8px 12px', 
//     border: '1px solid #ccc', 
//     borderRadius: '4px', 
//     boxSizing: 'border-box', 
//     fontSize: '14px', 
//     color: '#000000', // Forces text visibility to contrast white background layers
//     background: '#ffffff', 
//     marginTop: '4px',
//     display: 'block'
//   };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
//       {/* Upper Navigation Layout Row */}
//       <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
//           ← Back to Dashboard
//         </button>
//         <button 
//           type="button"
//           onClick={() => {
//             document.body.classList.add('print-mode-label-only');
//             setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50);
//           }} 
//           style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
//         >
//           🏷️ Print Shipping Label
//         </button>
//       </div>

//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
          
//           <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px' }}>
//             <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>
//               {isAdmin ? '🔧 Admin Operations Module' : 'Customer Tracking Console'}
//             </h1>
//             <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data.tracking_id}</p>
//           </div>

//           {/* SECTION 1: SENDER DATA */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              
//               <label style={{ display: 'block' }}><strong>Full Name:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span> {data.shipper_name}</span>}
//               </label>

//               <label style={{ display: 'block' }}><strong>Contact number:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span> {data.shipper_phone}</span>}
//               </label>

//               <label style={{ display: 'block' }}><strong>Full Address:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span> {data.shipper_address}</span>}
//               </label>

//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span> {data.shipper_city}</span>}
//                 </label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span> {data.shipper_country}</span>}
//                 </label>
//               </div>
//             </div>
            
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%' }}>
//                 {data.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           {/* SECTION 2: RECEIVER ROUTING DETAILS */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              
//               <label style={{ display: 'block' }}><strong>Receiver Name:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span> {data.receiver_name}</span>}
//               </label>

//               <label style={{ display: 'block' }}><strong>Primary Contact:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span> {data.receiver_phone}</span>}
//               </label>

//               <label style={{ display: 'block' }}><strong>Street Address:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span> {data.receiver_address}</span>}
//               </label>

//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <label><strong>City / Town:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span> {data.receiver_city}</span>}
//                 </label>
//                 <label><strong>Country:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span> {data.receiver_country}</span>}
//                 </label>
//               </div>
//             </div>

//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           {/* SECTION 3: PACKAGE INFO OVERVIEW */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {(data.shipment_package || []).map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', gap: '10px', fontWeight: 'normal' }}>
//                       <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span>Container Class: {pkg.type} | Volume Metrics: {pkg.cbm} CBM</span>
//                   )}
//                 </div>
                
//                 <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
//                   <thead>
//                     <tr style={{ background: '#f4f4f4' }}>
//                       <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th>
//                       <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th>
//                       <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(pkg.shipment_item || []).map((item, iIdx) => (
//                       <tr key={item.id || iIdx}>
//                         <td style={{ padding: '6px', border: '1px solid #ddd' }}>
//                           {isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight} Kg`}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>

//           {/* SECTION 4: PRICE LEDGER & SAVE CONTROLS */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px' }}>
//             <div style={{ fontSize: '11px', color: '#555', border: '1px solid #eee', padding: '10px', background: '#fbfbfb' }}>
//               <strong>Operational Note:</strong> Modifications submitted directly update downstream layout configurations across database targets.
//             </div>

//             <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '70%' }}>
//                   <input style={{ ...inputStyle, width: '60px' }} type="text" value={data.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={inputStyle} type="number" value={data.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong>{data.currency || 'NPR'} {Number(data.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {/* EDIT SUBMISSION BUTTON */}
//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button 
//                 type="submit" 
//                 disabled={updating}
//                 style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}
//               >
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}

//         </div>
//       </form>

//       {/* SHIPPING LABEL PREVIEW HARDWARE TARGET */}
//       <div className="label-printable-target">
//         <ShippingLabel 
//           previewTrackingId={data.tracking_id}
//           packages={mappedPackages}
//           senderInfo={mappedSenderInfo}
//           receiverInfo={mappedReceiverInfo}
//           billingInfo={mappedBillingInfo}
//         />
//       </div>

//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   const isAdmin = user?.role === 'admin';
//   const isCustomer = user?.role === 'customer';
//   const hasAccess = isAdmin || isCustomer;

//   useEffect(() => {
//     if (!trackingId || !hasAccess) return;
//     fetchFullShipmentGraph();
//   }, [trackingId, user]);

//   const fetchFullShipmentGraph = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`http://localhost:5000/api/shipments/track/${trackingId}`);
//       if (!response.ok) throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
//       const jsonResult = await response.json();
//       setData(jsonResult);
//     } catch (err) {
//       setError(err.message || "Failed to establish database synchronization link.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 📝 Dynamic Matrix Input Writer - Synchronized directly to your API JSON response shape
//   const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
//     setData(prev => {
//       const updated = { ...prev };
      
//       if (targetArray === 'shipment_package' && nestedItemIndex !== null) {
//         // Nested updates: item array nested deep inside package rows
//         const updatedPackages = [...(updated.shipment_package || [])];
//         const updatedItems = [...(updatedPackages[index]?.shipment_item || [])];
//         if (updatedItems[nestedItemIndex]) {
//           updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
//           updatedPackages[index].shipment_item = updatedItems;
//           updated.shipment_package = updatedPackages;
//         }
//       } else if (targetArray === 'shipment_package') {
//         // Flat array updates: updates data inside custom package layer index positions
//         const updatedPackages = [...(updated.shipment_package || [])];
//         if (updatedPackages[index]) {
//           updatedPackages[index] = { ...updatedPackages[index], [field]: value };
//           updated.shipment_package = updatedPackages;
//         }
//       } else {
//         // Top level properties (shipper_name, receiver_name, status, etc.)
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdating(true);
//       const response = await fetch(`http://localhost:5000/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
//       alert("✨ Database records updated and synchronized cleanly!");
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   // 🔄 Mapping adapters to cleanly downstream variables to structural ShippingLabel layers
//   const mappedSenderInfo = {
//     fullName: data.shipper_name,
//     contactNum: data.shipper_phone,
//     address: data.shipper_address,
//     city: data.shipper_city,
//     country: data.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data.receiver_name,
//     contactNumber: data.receiver_phone,
//     fullAddress: data.receiver_address,
//     city: data.receiver_city,
//     country: data.receiver_country,
//     email: data.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data.payment_method || 'N/A',
//     currency: data.currency || 'NPR'
//   };

//   const mappedPackages = (data.shipment_package || []).map(pkg => ({
//     id: pkg.id,
//     package_id: pkg.id,
//     profile: pkg.profile,
//     type: pkg.type,
//     cbm: Number(pkg.cbm || 0),
//     items: (pkg.shipment_item || []).map(item => ({
//       id: item.id,
//       description: item.description,
//       weight: Number(item.weight || 0),
//       qty: Number(item.qty || 0)
//     }))
//   }));

//   const inputStyle = {
//     width: '100%', 
//     padding: '8px 12px', 
//     border: '1px solid #ccc', 
//     borderRadius: '4px', 
//     boxSizing: 'border-box', 
//     fontSize: '14px', 
//     color: '#000000', 
//     background: '#ffffff', 
//     marginTop: '4px',
//     display: 'block'
//   };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
//       {/* Upper Navigation Layout Row */}
//       <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
//           ← Back to Dashboard
//         </button>
//         <button 
//           type="button"
//           onClick={() => {
//             document.body.classList.add('print-mode-label-only');
//             setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50);
//           }} 
//           style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
//         >
//           🏷️ Print Shipping Label
//         </button>
//       </div>

//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
          
//           {/* Header Module Container with Flex layout to push Status to the far right */}
//           <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <div>
//               <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>
//                 {isAdmin ? '🔧 Admin Operations Module' : 'Customer Tracking Console'}
//               </h1>
//               <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data.tracking_id}</p>
//             </div>

//             {/* 🛑 Admin Status Dropdown Select Matrix */}
//             {isAdmin && (
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
//                 <label style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#333' }}>Shipment Status</label>
//                 <select 
//                   value={data.status || 'Confirmed'} 
//                   onChange={(e) => handleInputChange('status', e.target.value)}
//                   style={{
//                     padding: '8px 16px',
//                     fontSize: '14px',
//                     fontWeight: 'bold',
//                     borderRadius: '4px',
//                     border: '2px solid #000',
//                     background: '#fff',
//                     color: '#000',
//                     cursor: 'pointer',
//                     outline: 'none'
//                   }}
//                 >
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Landed">Landed</option>
//                   <option value="Ready to Collect">Ready to Collect</option>
//                   <option value="Collected">Collected</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* SECTION 1: SENDER DATA */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              
//               <label style={{ display: 'block' }}><strong>Full Name:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span> {data.shipper_name}</span>}
//               </label>

//               <label style={{ display: 'block' }}><strong>Contact number:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span> {data.shipper_phone}</span>}
//               </label>

//               <label style={{ display: 'block' }}><strong>Full Address:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span> {data.shipper_address}</span>}
//               </label>

//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span> {data.shipper_city}</span>}
//                 </label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span> {data.shipper_country}</span>}
//                 </label>
//               </div>
//             </div>
            
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%' }}>
//                 {data.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           {/* SECTION 2: RECEIVER ROUTING DETAILS */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              
//               <label style={{ display: 'block' }}><strong>Receiver Name:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span> {data.receiver_name}</span>}
//               </label>

//               <label style={{ display: 'block' }}><strong>Primary Contact:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span> {data.receiver_phone}</span>}
//               </label>

//               <label style={{ display: 'block' }}><strong>Street Address:</strong>
//                 {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span> {data.receiver_address}</span>}
//               </label>

//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <label><strong>City / Town:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span> {data.receiver_city}</span>}
//                 </label>
//                 <label><strong>Country:</strong>
//                   {isAdmin ? <input style={inputStyle} type="text" value={data.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span> {data.receiver_country}</span>}
//                 </label>
//               </div>
//             </div>

//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           {/* SECTION 3: PACKAGE INFO OVERVIEW */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {(data.shipment_package || []).map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', gap: '10px', fontWeight: 'normal' }}>
//                       <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span>Container Class: {pkg.type} | Volume Metrics: {pkg.cbm} CBM</span>
//                   )}
//                 </div>
                
//                 <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
//                   <thead>
//                     <tr style={{ background: '#f4f4f4' }}>
//                       <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th>
//                       <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th>
//                       <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(pkg.shipment_item || []).map((item, iIdx) => (
//                       <tr key={item.id || iIdx}>
//                         <td style={{ padding: '6px', border: '1px solid #ddd' }}>
//                           {isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight} Kg`}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>

//           {/* SECTION 4: PRICE LEDGER & SAVE CONTROLS */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px' }}>
//             <div style={{ fontSize: '11px', color: '#555', border: '1px solid #eee', padding: '10px', background: '#fbfbfb' }}>
//               <strong>Operational Note:</strong> Modifications submitted directly update downstream layout configurations across database targets.
//             </div>

//             <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '70%' }}>
//                   <input style={{ ...inputStyle, width: '60px' }} type="text" value={data.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={inputStyle} type="number" value={data.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong>{data.currency || 'NPR'} {Number(data.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {/* EDIT SUBMISSION BUTTON */}
//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button 
//                 type="submit" 
//                 disabled={updating}
//                 style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}
//               >
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}

//         </div>
//       </form>

//       {/* SHIPPING LABEL PREVIEW HARDWARE TARGET */}
//       <div className="label-printable-target">
//         <ShippingLabel 
//           previewTrackingId={data.tracking_id}
//           packages={mappedPackages}
//           senderInfo={mappedSenderInfo}
//           receiverInfo={mappedReceiverInfo}
//           billingInfo={mappedBillingInfo}
//         />
//       </div>

//     </div>
//   );
// }


















// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   const isAdmin = user?.role === 'admin';
//   const isCustomer = user?.role === 'customer';
//   const hasAccess = isAdmin || isCustomer;

//   useEffect(() => {
//     // 1. Guard against missing ID or unauthorized access
//     if (!trackingId || !hasAccess) return;

//     // 2. Define the controller
//     let isMounted = true;

//     const fetchFullShipmentGraph = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${trackingId}`);
        
//         if (!response.ok) {
//           throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
//         }
        
//         const jsonResult = await response.json();
        
//         // 3. Only update state if component is still mounted
//         if (isMounted) {
//           setData(jsonResult);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message || "Failed to establish database synchronization link.");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchFullShipmentGraph();

//     // 4. Cleanup function to prevent memory leaks/state updates on unmounted components
//     return () => {
//       isMounted = false;
//     };
    
//     // DEPENDENCY FIXED: Only trackingId is required here. 
//     // Access is validated at the top of the effect.
//   }, [trackingId]);

//   const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
//     setData(prev => {
//       if (!prev) return prev;
//       const updated = { ...prev };
      
//       if (targetArray === 'shipment_package' && nestedItemIndex !== null) {
//         const updatedPackages = [...(updated.shipment_package || [])];
//         const updatedItems = [...(updatedPackages[index]?.shipment_item || [])];
//         if (updatedItems[nestedItemIndex]) {
//           updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
//           updatedPackages[index].shipment_item = updatedItems;
//           updated.shipment_package = updatedPackages;
//         }
//       } else if (targetArray === 'shipment_package') {
//         const updatedPackages = [...(updated.shipment_package || [])];
//         if (updatedPackages[index]) {
//           updatedPackages[index] = { ...updatedPackages[index], [field]: value };
//           updated.shipment_package = updatedPackages;
//         }
//       } else {
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdating(true);
//       const response = await fetch(`http://localhost:5000/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
//       alert("✨ Database records updated and synchronized cleanly!");
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Guard Clauses: Prevent rendering until state is ready
//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   // Now safe to access data
//   const mappedSenderInfo = {
//     fullName: data?.shipper_name,
//     contactNum: data?.shipper_phone,
//     address: data?.shipper_address,
//     city: data?.shipper_city,
//     country: data?.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data?.receiver_name,
//     contactNumber: data?.receiver_phone,
//     fullAddress: data?.receiver_address,
//     city: data?.receiver_city,
//     country: data?.receiver_country,
//     email: data?.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data?.payment_method || 'N/A',
//     currency: data?.currency || 'NPR'
//   };

//   const mappedPackages = (data?.shipment_package || []).map(pkg => ({
//     id: pkg.id,
//     package_id: pkg.id,
//     profile: pkg.profile,
//     type: pkg.type,
//     cbm: Number(pkg.cbm || 0),
//     items: (pkg.shipment_item || []).map(item => ({
//       id: item.id,
//       description: item.description,
//       weight: Number(item.weight || 0),
//       qty: Number(item.qty || 0)
//     }))
//   }));

//   const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//       <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
//         <button type="button" onClick={() => { document.body.classList.add('print-mode-label-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50); }} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Print Shipping Label</button>
//       </div>

//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
//           <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <div>
//               <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>{isAdmin ? '🔧 Admin Operations Module' : 'Customer Tracking Console'}</h1>
//               <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data?.tracking_id}</p>
//             </div>
//             {isAdmin && (
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
//                 <label style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#040404' }}>Shipment Status</label>
//                 <select value={data?.status || 'Confirmed'} onChange={(e) => handleInputChange('status', e.target.value)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', border: '2px solid #e9e0e0', background: '#0c0b0b', cursor: 'pointer', outline: 'none' }}>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Landed">Landed</option>
//                   <option value="Ready to Collect">Ready to Collect</option>
//                   <option value="Collected">Collected</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Full Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span> {data?.shipper_name}</span>}</label>
//               <label><strong>Contact number:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span> {data?.shipper_phone}</span>}</label>
//               <label><strong>Full Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span> {data?.shipper_address}</span>}</label>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span> {data?.shipper_city}</span>}</label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span> {data?.shipper_country}</span>}</label>
//               </div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%' }}>
//                 {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Receiver Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span> {data?.receiver_name}</span>}</label>
//               <label><strong>Primary Contact:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span> {data?.receiver_phone}</span>}</label>
//               <label><strong>Street Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span> {data?.receiver_address}</span>}</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <label><strong>City / Town:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span> {data?.receiver_city}</span>}</label>
//                 <label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span> {data?.receiver_country}</span>}</label>
//               </div>
//             </div>
//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {(data?.shipment_package || []).map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', gap: '10px', fontWeight: 'normal' }}>
//                       <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span>Container Class: {pkg.type} | Volume Metrics: {pkg.cbm} CBM</span>
//                   )}
//                 </div>
//                 <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
//                   <thead><tr style={{ background: '#f4f4f4' }}><th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th><th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th><th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th></tr></thead>
//                   <tbody>
//                     {(pkg.shipment_item || []).map((item, iIdx) => (
//                       <tr key={item.id || iIdx}>
//                         <td style={{ padding: '6px', border: '1px solid #ddd' }}>{isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}</td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>{isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}</td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>{isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight} Kg`}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px' }}>
//             <div style={{ fontSize: '11px', color: '#555', border: '1px solid #eee', padding: '10px', background: '#fbfbfb' }}><strong>Operational Note:</strong> Modifications submitted directly update downstream layout configurations across database targets.</div>
//             <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '70%' }}>
//                   <input style={{ ...inputStyle, width: '60px' }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={inputStyle} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button type="submit" disabled={updating} style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}>
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}
//         </div>
//       </form>

//       <div className="label-printable-target">
//         <ShippingLabel previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} />
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   const isAdmin = user?.role === 'admin';
//   const isCustomer = user?.role === 'customer';
//   const hasAccess = isAdmin || isCustomer;

//   useEffect(() => {
//     // 1. Guard against missing ID or unauthorized access
//     if (!trackingId || !hasAccess) return;

//     // 2. Define the controller
//     let isMounted = true;

//     const fetchFullShipmentGraph = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${trackingId}`);
        
//         if (!response.ok) {
//           throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
//         }
        
//         const jsonResult = await response.json();
        
//         // 3. Only update state if component is still mounted
//         if (isMounted) {
//           setData(jsonResult);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message || "Failed to establish database synchronization link.");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchFullShipmentGraph();

//     // 4. Cleanup function to prevent memory leaks/state updates on unmounted components
//     return () => {
//       isMounted = false;
//     };
    
//     // DEPENDENCY FIXED: Only trackingId is required here. 
//     // Access is validated at the top of the effect.
//   }, [trackingId]);

//   const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
//     setData(prev => {
//       if (!prev) return prev;
//       const updated = { ...prev };
      
//       if (targetArray === 'shipment_package' && nestedItemIndex !== null) {
//         const updatedPackages = [...(updated.shipment_package || [])];
//         const updatedItems = [...(updatedPackages[index]?.shipment_item || [])];
//         if (updatedItems[nestedItemIndex]) {
//           updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
//           updatedPackages[index].shipment_item = updatedItems;
//           updated.shipment_package = updatedPackages;
//         }
//       } else if (targetArray === 'shipment_package') {
//         const updatedPackages = [...(updated.shipment_package || [])];
//         if (updatedPackages[index]) {
//           updatedPackages[index] = { ...updatedPackages[index], [field]: value };
//           updated.shipment_package = updatedPackages;
//         }
//       } else {
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdating(true);
//       const response = await fetch(`http://localhost:5000/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
//       alert("✨ Database records updated and synchronized cleanly!");
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Guard Clauses: Prevent rendering until state is ready
//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   // Now safe to access data
//   const mappedSenderInfo = {
//     fullName: data?.shipper_name,
//     contactNum: data?.shipper_phone,
//     address: data?.shipper_address,
//     city: data?.shipper_city,
//     country: data?.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data?.receiver_name,
//     contactNumber: data?.receiver_phone,
//     fullAddress: data?.receiver_address,
//     city: data?.receiver_city,
//     country: data?.receiver_country,
//     email: data?.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data?.payment_method || 'N/A',
//     currency: data?.currency || 'NPR'
//   };

//   const mappedPackages = (data?.shipment_package || []).map(pkg => ({
//     id: pkg.id,
//     package_id: pkg.id,
//     profile: pkg.profile,
//     type: pkg.type,
//     cbm: Number(pkg.cbm || 0),
//     items: (pkg.shipment_item || []).map(item => ({
//       id: item.id,
//       description: item.description,
//       weight: Number(item.weight || 0),
//       qty: Number(item.qty || 0)
//     }))
//   }));

//   const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//       <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
//         <button type="button" onClick={() => { document.body.classList.add('print-mode-label-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50); }} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Print Shipping Label</button>
//       </div>

//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
//           <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <div>
//               <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>{isAdmin ? '🔧 Admin Operations Module' : 'Customer Tracking Console'}</h1>
//               <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data?.tracking_id}</p>
//             </div>
//             {isAdmin && (
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
//                 <label style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#040404' }}>Shipment Status</label>
//                 <select value={data?.status || 'Confirmed'} onChange={(e) => handleInputChange('status', e.target.value)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', border: '2px solid #e9e0e0', background: '#0c0b0b', cursor: 'pointer', outline: 'none' }}>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Landed">Landed</option>
//                   <option value="Ready to Collect">Ready to Collect</option>
//                   <option value="Collected">Collected</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Full Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span> {data?.shipper_name}</span>}</label>
//               <label><strong>Contact number:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span> {data?.shipper_phone}</span>}</label>
//               <label><strong>Full Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span> {data?.shipper_address}</span>}</label>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span> {data?.shipper_city}</span>}</label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span> {data?.shipper_country}</span>}</label>
//               </div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%' }}>
//                 {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Receiver Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span> {data?.receiver_name}</span>}</label>
//               <label><strong>Primary Contact:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span> {data?.receiver_phone}</span>}</label>
//               <label><strong>Street Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span> {data?.receiver_address}</span>}</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <label><strong>City / Town:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span> {data?.receiver_city}</span>}</label>
//                 <label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span> {data?.receiver_country}</span>}</label>
//               </div>
//             </div>
//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {(data?.shipment_package || []).map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', gap: '10px', fontWeight: 'normal' }}>
//                       <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span>Container Class: {pkg.type} | Volume Metrics: {pkg.cbm} CBM</span>
//                   )}
//                 </div>
//                 <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
//                   <thead><tr style={{ background: '#f4f4f4' }}><th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th><th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th><th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th></tr></thead>
//                   <tbody>
//                     {(pkg.shipment_item || []).map((item, iIdx) => (
//                       <tr key={item.id || iIdx}>
//                         <td style={{ padding: '6px', border: '1px solid #ddd' }}>{isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}</td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>{isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}</td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>{isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight} Kg`}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
//             <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '450px', boxSizing: 'border-box' }}>
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '75%' }}>
//                   <input style={{ ...inputStyle, width: '65px' }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={{ ...inputStyle, flex: 1 }} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button type="submit" disabled={updating} style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}>
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}
//         </div>
//       </form>

//       <div className="label-printable-target">
//         <ShippingLabel previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} />
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // Normalize roles to lowercase to prevent case-sensitivity bugs
//   const userRole = user?.role?.toLowerCase();
//   const isAdmin = userRole === 'admin';
//   const isAgent = userRole === 'agent';
//   const isCustomer = userRole === 'customer';
  
//   // Admins, Agents, and Customers are all authorized to view shipment details
//   const hasAccess = isAdmin || isAgent || isCustomer;

//   useEffect(() => {
//     // 1. Guard against missing ID or unauthorized access
//     if (!trackingId || !hasAccess) return;

//     // 2. Define the controller
//     let isMounted = true;

//     const fetchFullShipmentGraph = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${trackingId}`);
        
//         if (!response.ok) {
//           throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
//         }
        
//         const jsonResult = await response.json();
        
//         // 3. Only update state if component is still mounted
//         if (isMounted) {
//           setData(jsonResult);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message || "Failed to establish database synchronization link.");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchFullShipmentGraph();

//     // 4. Cleanup function to prevent memory leaks/state updates on unmounted components
//     return () => {
//       isMounted = false;
//     };
    
//   }, [trackingId, hasAccess]);

//   const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
//     // Structural guard: Block input updates if a non-admin attempts to trigger changes
//     if (!isAdmin) return;

//     setData(prev => {
//       if (!prev) return prev;
//       const updated = { ...prev };
      
//       if (targetArray === 'shipment_package' && nestedItemIndex !== null) {
//         const updatedPackages = [...(updated.shipment_package || [])];
//         const updatedItems = [...(updatedPackages[index]?.shipment_item || [])];
//         if (updatedItems[nestedItemIndex]) {
//           updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
//           updatedPackages[index].shipment_item = updatedItems;
//           updated.shipment_package = updatedPackages;
//         }
//       } else if (targetArray === 'shipment_package') {
//         const updatedPackages = [...(updated.shipment_package || [])];
//         if (updatedPackages[index]) {
//           updatedPackages[index] = { ...updatedPackages[index], [field]: value };
//           updated.shipment_package = updatedPackages;
//         }
//       } else {
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (!isAdmin) return;

//     try {
//       setUpdating(true);
//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
//       alert("✨ Database records updated and synchronized cleanly!");
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Guard Clauses: Prevent rendering until state is ready
//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   // Safe parameters configuration mapping
//   const mappedSenderInfo = {
//     fullName: data?.shipper_name,
//     contactNum: data?.shipper_phone,
//     address: data?.shipper_address,
//     city: data?.shipper_city,
//     country: data?.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data?.receiver_name,
//     contactNumber: data?.receiver_phone,
//     fullAddress: data?.receiver_address,
//     city: data?.receiver_city,
//     country: data?.receiver_country,
//     email: data?.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data?.payment_method || 'N/A',
//     currency: data?.currency || 'NPR'
//   };

//   const mappedPackages = (data?.shipment_package || []).map(pkg => ({
//     id: pkg.id,
//     package_id: pkg.id,
//     profile: pkg.profile,
//     type: pkg.type,
//     cbm: Number(pkg.cbm || 0),
//     items: (pkg.shipment_item || []).map(item => ({
//       id: item.id,
//       description: item.description,
//       weight: Number(item.weight || 0),
//       qty: Number(item.qty || 0)
//     }))
//   }));

//   const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//       <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
//         <button type="button" onClick={() => { document.body.classList.add('print-mode-label-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50); }} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Print Shipping Label</button>
//       </div>

//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
//           <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <div>
//               <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>
//                 {isAdmin ? '🔧 Admin Operations Module' : isAgent ? '💼 Agent Operational View' : 'Customer Tracking Console'}
//               </h1>
//               <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data?.tracking_id}</p>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
//               <label style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#040404' }}>Shipment Status</label>
//               {isAdmin ? (
//                 <select value={data?.status || 'Confirmed'} onChange={(e) => handleInputChange('status', e.target.value)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', border: '2px solid #e9e0e0', background: '#0c0b0b', color: '#fff', cursor: 'pointer', outline: 'none' }}>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Landed">Landed</option>
//                   <option value="Ready to Collect">Ready to Collect</option>
//                   <option value="Collected">Collected</option>
//                 </select>
//               ) : (
//                 <span style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', background: '#f4f4f4', border: '1px solid #ccc', color: '#333' }}>
//                   {data?.status || 'Confirmed'}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Full Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_name || '—'}</span>}</label>
//               <label><strong>Contact number:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_phone || '—'}</span>}</label>
//               <label><strong>Full Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_address || '—'}</span>}</label>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_city || '—'}</span>}</label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%', boxSizing: 'border-box' }}>
//                 {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Receiver Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_name || '—'}</span>}</label>
//               <label><strong>Primary Contact:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_phone || '—'}</span>}</label>
//               <label><strong>Street Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_address || '—'}</span>}</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <label><strong>City / Town:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_city || '—'}</span>}</label>
//                 <label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {(data?.shipment_package || []).map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', gap: '10px', fontWeight: 'normal' }}>
//                       <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span style={{ fontWeight: 'normal', color: '#555' }}>Container Class: {pkg.type || '—'} | Volume Metrics: {pkg.cbm || 0} CBM</span>
//                   )}
//                 </div>
//                 <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
//                   <thead>
//                     <tr style={{ background: '#f4f4f4' }}>
//                       <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th>
//                       <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th>
//                       <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(pkg.shipment_item || []).map((item, iIdx) => (
//                       <tr key={item.id || iIdx}>
//                         <td style={{ padding: '6px', border: '1px solid #ddd' }}>
//                           {isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight || 0} Kg`}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
//             <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '450px', boxSizing: 'border-box' }}>
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '75%' }}>
//                   <input style={{ ...inputStyle, width: '65px' }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={{ ...inputStyle, flex: 1 }} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong style={{ color: '#222' }}>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button type="submit" disabled={updating} style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}>
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}
//         </div>
//       </form>

//       <div className="label-printable-target">
//         <ShippingLabel previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} />
//       </div>
//     </div>
//   );
// }









// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // Normalize roles to lowercase to prevent case-sensitivity bugs
//   const userRole = user?.role?.toLowerCase();
//   const isAdmin = userRole === 'admin';
//   const isAgent = userRole === 'agent';
//   const isCustomer = userRole === 'customer';
  
//   // Admins, Agents, and Customers are all authorized to view shipment details
//   const hasAccess = isAdmin || isAgent || isCustomer;

//   useEffect(() => {
//     // 1. Guard against missing ID or unauthorized access
//     if (!trackingId || !hasAccess) return;

//     // 2. Define the controller
//     let isMounted = true;

//     const fetchFullShipmentGraph = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${trackingId}`);
        
//         if (!response.ok) {
//           throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
//         }
        
//         const jsonResult = await response.json();
        
//         // 3. Only update state if component is still mounted
//         if (isMounted) {
//           setData(jsonResult);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message || "Failed to establish database synchronization link.");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchFullShipmentGraph();

//     // 4. Cleanup function to prevent memory leaks/state updates on unmounted components
//     return () => {
//       isMounted = false;
//     };
    
//   }, [trackingId, hasAccess]);

//   const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
//     // Structural guard: Block input updates if a non-admin attempts to trigger changes
//     if (!isAdmin) return;

//     setData(prev => {
//       if (!prev) return prev;
//       const updated = { ...prev };
      
//       if (targetArray === 'shipment_package' && nestedItemIndex !== null) {
//         const updatedPackages = [...(updated.shipment_package || [])];
//         const updatedItems = [...(updatedPackages[index]?.shipment_item || [])];
//         if (updatedItems[nestedItemIndex]) {
//           updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
//           updatedPackages[index].shipment_item = updatedItems;
//           updated.shipment_package = updatedPackages;
//         }
//       } else if (targetArray === 'shipment_package') {
//         const updatedPackages = [...(updated.shipment_package || [])];
//         if (updatedPackages[index]) {
//           updatedPackages[index] = { ...updatedPackages[index], [field]: value };
//           updated.shipment_package = updatedPackages;
//         }
//       } else {
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (!isAdmin) return;

//     try {
//       setUpdating(true);
//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
//       alert("✨ Database records updated and synchronized cleanly!");
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Guard Clauses: Prevent rendering until state is ready
//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   // Safe parameters configuration mapping
//   const mappedSenderInfo = {
//     fullName: data?.shipper_name,
//     contactNum: data?.shipper_phone,
//     address: data?.shipper_address,
//     city: data?.shipper_city,
//     country: data?.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data?.receiver_name,
//     contactNumber: data?.receiver_phone,
//     fullAddress: data?.receiver_address,
//     city: data?.receiver_city,
//     country: data?.receiver_country,
//     email: data?.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data?.payment_method || 'N/A',
//     currency: data?.currency || 'NPR'
//   };

//   const mappedPackages = (data?.shipment_package || []).map(pkg => ({
//     id: pkg.id,
//     package_id: pkg.id,
//     profile: pkg.profile,
//     type: pkg.type,
//     cbm: Number(pkg.cbm || 0),
//     total_weight: Number(pkg.total_weight || 0), // Maps column cleanly to the printable shipping tag engine
//     items: (pkg.shipment_item || []).map(item => ({
//       id: item.id,
//       description: item.description,
//       weight: Number(item.weight || 0),
//       qty: Number(item.qty || 0)
//     }))
//   }));

//   const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//       <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
//         <button type="button" onClick={() => { document.body.classList.add('print-mode-label-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50); }} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Print Shipping Label</button>
//       </div>

//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
//           <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <div>
//               <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>
//                 {isAdmin ? '🔧 Admin Operations Module' : isAgent ? '💼 Agent Operational View' : 'Customer Tracking Console'}
//               </h1>
//               <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data?.tracking_id}</p>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
//               <label style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#040404' }}>Shipment Status</label>
//               {isAdmin ? (
//                 <select value={data?.status || 'Confirmed'} onChange={(e) => handleInputChange('status', e.target.value)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', border: '2px solid #e9e0e0', background: '#0c0b0b', color: '#fff', cursor: 'pointer', outline: 'none' }}>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Landed">Landed</option>
//                   <option value="Ready to Collect">Ready to Collect</option>
//                   <option value="Collected">Collected</option>
//                 </select>
//               ) : (
//                 <span style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', background: '#f4f4f4', border: '1px solid #ccc', color: '#333' }}>
//                   {data?.status || 'Confirmed'}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Full Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_name || '—'}</span>}</label>
//               <label><strong>Contact number:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_phone || '—'}</span>}</label>
//               <label><strong>Full Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_address || '—'}</span>}</label>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_city || '—'}</span>}</label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%', boxSizing: 'border-box' }}>
//                 {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Receiver Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_name || '—'}</span>}</label>
//               <label><strong>Primary Contact:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_phone || '—'}</span>}</label>
//               <label><strong>Street Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_address || '—'}</span>}</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <label><strong>City / Town:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_city || '—'}</span>}</label>
//                 <label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {(data?.shipment_package || []).map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', gap: '10px', fontWeight: 'normal' }}>
//                       <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                       <label>Weight (kg): <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.01" value={pkg.total_weight !== undefined && pkg.total_weight !== null ? pkg.total_weight : 0} onChange={(e) => handleInputChange('total_weight', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span style={{ fontWeight: 'normal', color: '#555' }}>
//                       Container Class: {pkg.type || '—'} | Volume Metrics: {pkg.cbm || 0} CBM | <strong>Weight: {pkg.total_weight || 0} kg</strong>
//                     </span>
//                   )}
//                 </div>
//                 <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
//                   <thead>
//                     <tr style={{ background: '#f4f4f4' }}>
//                       <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th>
//                       <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th>
//                       <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(pkg.shipment_item || []).map((item, iIdx) => (
//                       <tr key={item.id || iIdx}>
//                         <td style={{ padding: '6px', border: '1px solid #ddd' }}>
//                           {isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight || 0} Kg`}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
//             <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '450px', boxSizing: 'border-box' }}>
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '75%' }}>
//                   <input style={{ ...inputStyle, width: '65px' }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={{ ...inputStyle, flex: 1 }} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong style={{ color: '#222' }}>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button type="submit" disabled={updating} style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}>
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}
//         </div>
//       </form>

//       <div className="label-printable-target">
//         <ShippingLabel previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} />
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // Normalize roles to lowercase to prevent case-sensitivity bugs
//   const userRole = user?.role?.toLowerCase();
//   const isAdmin = userRole === 'admin';
//   const isAgent = userRole === 'agent';
//   const isCustomer = userRole === 'customer';
  
//   const hasAccess = isAdmin || isAgent || isCustomer;

//   useEffect(() => {
//     if (!trackingId || !hasAccess) return;
//     let isMounted = true;

//     const fetchFullShipmentGraph = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${trackingId}`);
        
//         if (!response.ok) {
//           throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
//         }
        
//         const jsonResult = await response.json();
//         if (isMounted) {
//           setData(jsonResult);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message || "Failed to establish database synchronization link.");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchFullShipmentGraph();

//     return () => {
//       isMounted = false;
//     };
//   }, [trackingId, hasAccess]);

//   const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
//     if (!isAdmin) return;

//     setData(prev => {
//       if (!prev) return prev;
//       const updated = { ...prev };
      
//       if ((targetArray === 'packages' || targetArray === 'shipment_package') && nestedItemIndex !== null) {
//         const updatedPackages = [...(updated.shipment_package || updated.packages || [])];
//         const updatedItems = [...(updatedPackages[index]?.shipment_item || updatedPackages[index]?.items || [])];
//         if (updatedItems[nestedItemIndex]) {
//           updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
//           if (updated.shipment_package) updated.shipment_package = updatedPackages;
//           if (updated.packages) updated.packages = updatedPackages;
//         }
//       } else if (targetArray === 'packages' || targetArray === 'shipment_package') {
//         const updatedPackages = [...(updated.shipment_package || updated.packages || [])];
//         if (updatedPackages[index]) {
//           updatedPackages[index] = { ...updatedPackages[index], [field]: value };
//           if (updated.shipment_package) updated.shipment_package = updatedPackages;
//           if (updated.packages) updated.packages = updatedPackages;
//         }
//       } else {
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (!isAdmin) return;

//     try {
//       setUpdating(true);
//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
//       alert("✨ Database records updated and synchronized cleanly!");
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   const mappedSenderInfo = {
//     fullName: data?.shipper_name,
//     contactNum: data?.shipper_phone,
//     address: data?.shipper_address,
//     city: data?.shipper_city,
//     country: data?.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data?.receiver_name,
//     contactNumber: data?.receiver_phone,
//     fullAddress: data?.receiver_address,
//     city: data?.receiver_city,
//     country: data?.receiver_country,
//     email: data?.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data?.payment_method || 'N/A',
//     currency: data?.currency || 'NPR'
//   };

//   // 🌟 Clean fallback assignment matching your backend controller fields
//   const currentPackagesArray = data?.shipment_package || data?.packages || [];

//   const mappedPackages = currentPackagesArray.map(pkg => ({
//     id: pkg.id,
//     package_id: pkg.id,
//     profile: pkg.profile || pkg.package_profile || "General Item Set",
//     type: pkg.type || pkg.package_type || "Box",
//     cbm: Number(pkg.cbm || pkg.cbm_value || 0),
//     total_weight: Number(pkg.total_weight || 0), 
//     items: (pkg.shipment_item || pkg.items || []).map(item => ({
//       id: item.id,
//       description: item.description || item.item_description,
//       weight: Number(item.weight || item.item_weight || 0),
//       qty: Number(item.qty || item.item_qty || 0)
//     }))
//   }));

//   const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//       <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
//         <button type="button" onClick={() => { document.body.classList.add('print-mode-label-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50); }} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Print Shipping Label</button>
//       </div>

//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
//           <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <div>
//               <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>
//                 {isAdmin ? '🔧 Admin Operations Module' : isAgent ? '💼 Agent Operational View' : 'Customer Tracking Console'}
//               </h1>
//               <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data?.tracking_id}</p>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
//               <label style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#040404' }}>Shipment Status</label>
//               {isAdmin ? (
//                 <select value={data?.status || 'Confirmed'} onChange={(e) => handleInputChange('status', e.target.value)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', border: '2px solid #e9e0e0', background: '#0c0b0b', color: '#fff', cursor: 'pointer', outline: 'none' }}>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Landed">Landed</option>
//                   <option value="Ready to Collect">Ready to Collect</option>
//                   <option value="Collected">Collected</option>
//                 </select>
//               ) : (
//                 <span style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', background: '#f4f4f4', border: '1px solid #ccc', color: '#333' }}>
//                   {data?.status || 'Confirmed'}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Full Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_name || '—'}</span>}</label>
//               <label><strong>Contact number:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_phone || '—'}</span>}</label>
//               <label><strong>Full Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_address || '—'}</span>}</label>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_city || '—'}</span>}</label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%', boxSizing: 'border-box' }}>
//                 {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Receiver Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_name || '—'}</span>}</label>
//               <label><strong>Primary Contact:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_phone || '—'}</span>}</label>
//               <label><strong>Street Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_address || '—'}</span>}</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <label><strong>City / Town:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_city || '—'}</span>}</label>
//                 <label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {currentPackagesArray.map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', gap: '10px', fontWeight: 'normal' }}>
//                       <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                       <label>Weight (kg): <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.01" value={pkg.total_weight !== undefined && pkg.total_weight !== null ? pkg.total_weight : 0} onChange={(e) => handleInputChange('total_weight', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span style={{ fontWeight: 'normal', color: '#555' }}>
//                       Container Class: {pkg.type || '—'} | Volume Metrics: {pkg.cbm || 0} CBM | <strong>Weight: {pkg.total_weight || 0} kg</strong>
//                     </span>
//                   )}
//                 </div>
//                 <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
//                   <thead>
//                     <tr style={{ background: '#f4f4f4' }}>
//                       <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th>
//                       <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th>
//                       <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(pkg.shipment_item || pkg.items || []).map((item, iIdx) => (
//                       <tr key={item.id || iIdx}>
//                         <td style={{ padding: '6px', border: '1px solid #ddd' }}>
//                           {isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}
//                         </td>
//                         <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>
//                           {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight || 0} Kg`}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
//             <div style={{ background: '#f4f6f8', padding: '15px', border: '1px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '450px', boxSizing: 'border-box' }}>
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '75%' }}>
//                   <input style={{ ...inputStyle, width: '65px' }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={{ ...inputStyle, flex: 1 }} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong style={{ color: '#222' }}>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button type="submit" disabled={updating} style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}>
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}
//         </div>
//       </form>

//       <div className="label-printable-target">
//         <ShippingLabel previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} />
//       </div>
//     </div>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // Normalize roles to lowercase to prevent case-sensitivity bugs
//   const userRole = user?.role?.toLowerCase();
//   const isAdmin = userRole === 'admin';
//   const isAgent = userRole === 'agent';
//   const isCustomer = userRole === 'customer';
  
//   const hasAccess = isAdmin || isAgent || isCustomer;

//   useEffect(() => {
//     if (!trackingId || !hasAccess) return;
//     let isMounted = true;

//     const fetchFullShipmentGraph = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${trackingId}`);
        
//         if (!response.ok) {
//           throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
//         }
        
//         const jsonResult = await response.json();
//         if (isMounted) {
//           setData(jsonResult);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message || "Failed to establish database synchronization link.");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchFullShipmentGraph();

//     return () => {
//       isMounted = false;
//     };
//   }, [trackingId, hasAccess]);

//   const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
//     if (!isAdmin) return;

//     setData(prev => {
//       if (!prev) return prev;
//       const updated = { ...prev };
      
//       if ((targetArray === 'packages' || targetArray === 'shipment_package') && nestedItemIndex !== null) {
//         const updatedPackages = [...(updated.shipment_package || updated.packages || [])];
//         const updatedItems = [...(updatedPackages[index]?.shipment_item || updatedPackages[index]?.items || [])];
//         if (updatedItems[nestedItemIndex]) {
//           updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
//           if (updated.shipment_package) updated.shipment_package = updatedPackages;
//           if (updated.packages) updated.packages = updatedPackages;
//         }
//       } else if (targetArray === 'packages' || targetArray === 'shipment_package') {
//         const updatedPackages = [...(updated.shipment_package || updated.packages || [])];
//         if (updatedPackages[index]) {
//           updatedPackages[index] = { ...updatedPackages[index], [field]: value };
//           if (updated.shipment_package) updated.shipment_package = updatedPackages;
//           if (updated.packages) updated.packages = updatedPackages;
//         }
//       } else {
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (!isAdmin) return;

//     try {
//       setUpdating(true);
//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
//       alert("✨ Database records updated and synchronized cleanly!");
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   const mappedSenderInfo = {
//     fullName: data?.shipper_name,
//     contactNum: data?.shipper_phone,
//     address: data?.shipper_address,
//     city: data?.shipper_city,
//     country: data?.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data?.receiver_name,
//     contactNumber: data?.receiver_phone,
//     fullAddress: data?.receiver_address,
//     city: data?.receiver_city,
//     country: data?.receiver_country,
//     email: data?.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data?.payment_method || 'N/A',
//     currency: data?.currency || 'NPR'
//   };

//   const currentPackagesArray = data?.shipment_package || data?.packages || [];

//   const mappedPackages = currentPackagesArray.map(pkg => ({
//     id: pkg.id,
//     package_id: pkg.id,
//     profile: pkg.profile || pkg.package_profile || "General Item Set",
//     type: pkg.type || pkg.package_type || "Box",
//     cbm: Number(pkg.cbm || pkg.cbm_value || 0),
//     total_weight: Number(pkg.total_weight || 0), 
//     items: (pkg.shipment_item || pkg.items || []).map(item => ({
//       id: item.id,
//       description: item.description || item.item_description,
//       weight: Number(item.weight || item.item_weight || 0),
//       qty: Number(item.qty || item.item_qty || 0)
//     }))
//   }));

//   const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//       <div className="no-print detail-action-header-row">
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
//         <button type="button" onClick={() => { document.body.classList.add('print-mode-label-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50); }} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Print Shipping Label</button>
//       </div>

//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
//           <div className="detail-main-header-block">
//             <div>
//               <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>
//                 {isAdmin ? '🔧 Admin Operations Module' : isAgent ? '💼 Agent Operational View' : 'Customer Tracking Console'}
//               </h1>
//               <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data?.tracking_id}</p>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
//               <label style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#040404' }}>Shipment Status</label>
//               {isAdmin ? (
//                 <select value={data?.status || 'Confirmed'} onChange={(e) => handleInputChange('status', e.target.value)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', border: '2px solid #e9e0e0', background: '#0c0b0b', color: '#fff', cursor: 'pointer', outline: 'none' }}>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Landed">Landed</option>
//                   <option value="Ready to Collect">Ready to Collect</option>
//                   <option value="Collected">Collected</option>
//                 </select>
//               ) : (
//                 <span style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', background: '#f4f4f4', border: '1px solid #ccc', color: '#333' }}>
//                   {data?.status || 'Confirmed'}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
//           <div className="info-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
//             <div className="text-details-column" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Full Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_name || '—'}</span>}</label>
//               <label><strong>Contact number:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_phone || '—'}</span>}</label>
//               <label><strong>Full Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_address || '—'}</span>}</label>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_city || '—'}</span>}</label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%', boxSizing: 'border-box' }}>
//                 {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
//           <div className="info-split-grid" style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
//             <div className="text-details-column" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Receiver Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_name || '—'}</span>}</label>
//               <label><strong>Primary Contact:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_phone || '—'}</span>}</label>
//               <label><strong>Street Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_address || '—'}</span>}</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <label><strong>City / Town:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_city || '—'}</span>}</label>
//                 <label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {currentPackagesArray.map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div className="package-item-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div className="package-item-meta-controls">
//                       <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                       <label>Weight (kg): <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.01" value={pkg.total_weight !== undefined && pkg.total_weight !== null ? pkg.total_weight : 0} onChange={(e) => handleInputChange('total_weight', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span style={{ fontWeight: 'normal', color: '#555' }}>
//                       Container Class: {pkg.type || '—'} | Volume Metrics: {pkg.cbm || 0} CBM | <strong>Weight: {pkg.total_weight || 0} kg</strong>
//                     </span>
//                   )}
//                 </div>
                
//                 {/* Scroll container prevents wide content tables from overflowing screen boundaries */}
//                 <div className="package-table-scroll-container">
//                   <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', fontSize: '12px' }}>
//                     <thead>
//                       <tr style={{ background: '#f4f4f4' }}>
//                         <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th>
//                         <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th>
//                         <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {(pkg.shipment_item || pkg.items || []).map((item, iIdx) => (
//                         <tr key={item.id || iIdx}>
//                           <td style={{ padding: '6px', border: '1px solid #ddd' }}>
//                             {isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}
//                           </td>
//                           <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>
//                             {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}
//                           </td>
//                           <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>
//                             {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight || 0} Kg`}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div className="billing-ledger-wrapper">
//             <div className="billing-ledger-card">
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '75%' }}>
//                   <input style={{ ...inputStyle, width: '65px' }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={{ ...inputStyle, flex: 1 }} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong style={{ color: '#222' }}>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button type="submit" disabled={updating} style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}>
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}
//         </div>
//       </form>

//       <div className="label-printable-target">
//         <ShippingLabel previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} />
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // Normalize roles to lowercase to prevent case-sensitivity bugs
//   const userRole = user?.role?.toLowerCase();
//   const isAdmin = userRole === 'admin';
//   const isAgent = userRole === 'agent';
//   const isCustomer = userRole === 'customer';
  
//   const hasAccess = isAdmin || isAgent || isCustomer;

//   useEffect(() => {
//     if (!trackingId || !hasAccess) return;
//     let isMounted = true;

//     const fetchFullShipmentGraph = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${trackingId}`);
        
//         if (!response.ok) {
//           throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
//         }
        
//         const jsonResult = await response.json();
//         if (isMounted) {
//           setData(jsonResult);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message || "Failed to establish database synchronization link.");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchFullShipmentGraph();

//     return () => {
//       isMounted = false;
//     };
//   }, [trackingId, hasAccess]);

//   const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
//     if (!isAdmin) return;

//     setData(prev => {
//       if (!prev) return prev;
//       const updated = { ...prev };
      
//       if ((targetArray === 'packages' || targetArray === 'shipment_package') && nestedItemIndex !== null) {
//         const updatedPackages = [...(updated.shipment_package || updated.packages || [])];
//         const updatedItems = [...(updatedPackages[index]?.shipment_item || updatedPackages[index]?.items || [])];
//         if (updatedItems[nestedItemIndex]) {
//           updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
//           if (updated.shipment_package) updated.shipment_package = updatedPackages;
//           if (updated.packages) updated.packages = updatedPackages;
//         }
//       } else if (targetArray === 'packages' || targetArray === 'shipment_package') {
//         const updatedPackages = [...(updated.shipment_package || updated.packages || [])];
//         if (updatedPackages[index]) {
//           updatedPackages[index] = { ...updatedPackages[index], [field]: value };
//           if (updated.shipment_package) updated.shipment_package = updatedPackages;
//           if (updated.packages) updated.packages = updatedPackages;
//         }
//       } else {
//         updated[field] = value;
//       }
//       return updated;
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (!isAdmin) return;

//     try {
//       setUpdating(true);
//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
//       alert("✨ Database records updated and synchronized cleanly!");
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   const mappedSenderInfo = {
//     fullName: data?.shipper_name,
//     contactNum: data?.shipper_phone,
//     address: data?.shipper_address,
//     city: data?.shipper_city,
//     country: data?.shipper_country
//   };

//   const mappedReceiverInfo = {
//     fullName: data?.receiver_name,
//     contactNumber: data?.receiver_phone,
//     fullAddress: data?.receiver_address,
//     city: data?.receiver_city,
//     country: data?.receiver_country,
//     email: data?.receiver_email || 'N/A'
//   };

//   const mappedBillingInfo = {
//     method: data?.payment_method || 'N/A',
//     currency: data?.currency || 'NPR'
//   };

//   const currentPackagesArray = data?.shipment_package || data?.packages || [];

//   const mappedPackages = currentPackagesArray.map(pkg => ({
//     id: pkg.id,
//     package_id: pkg.id,
//     profile: pkg.profile || pkg.package_profile || "General Item Set",
//     type: pkg.type || pkg.package_type || "Box",
//     cbm: Number(pkg.cbm || pkg.cbm_value || 0),
//     total_weight: Number(pkg.total_weight || 0), 
//     items: (pkg.shipment_item || pkg.items || []).map(item => ({
//       id: item.id,
//       description: item.description || item.item_description,
//       weight: Number(item.weight || item.item_weight || 0),
//       qty: Number(item.qty || item.item_qty || 0)
//     }))
//   }));

//   const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//       <div className="no-print detail-action-header-row">
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
//         <button type="button" onClick={() => { document.body.classList.add('print-mode-label-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50); }} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Print Shipping Label</button>
//       </div>

//       <form onSubmit={handleSaveChanges}>
//         <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
//           <div className="detail-main-header-block">
//             <div>
//               <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>
//                 {isAdmin ? '🔧 Admin Operations Module' : isAgent ? '💼 Agent Operational View' : 'Customer Tracking Console'}
//               </h1>
//               <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data?.tracking_id}</p>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
//               <label style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#040404' }}>Shipment Status</label>
//               {isAdmin ? (
//                 <select value={data?.status || 'Confirmed'} onChange={(e) => handleInputChange('status', e.target.value)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', border: '2px solid #e9e0e0', background: '#0c0b0b', color: '#fff', cursor: 'pointer', outline: 'none' }}>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Landed">Landed</option>
//                   <option value="Ready to Collect">Ready to Collect</option>
//                   <option value="Collected">Collected</option>
//                 </select>
//               ) : (
//                 <span style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', background: '#f4f4f4', border: '1px solid #ccc', color: '#333' }}>
//                   {data?.status || 'Confirmed'}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
//           <div className="info-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
//             <div className="text-details-column" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Full Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_name || '—'}</span>}</label>
//               <label><strong>Contact number:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_phone || '—'}</span>}</label>
//               <label><strong>Full Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_address || '—'}</span>}</label>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <label style={{ flex: 1 }}><strong>City:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_city || '—'}</span>}</label>
//                 <label style={{ flex: 1 }}><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%', boxSizing: 'border-box' }}>
//                 {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
//           <div className="info-split-grid" style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
//             <div className="text-details-column" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
//               <label><strong>Receiver Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_name || '—'}</span>}</label>
//               <label><strong>Primary Contact:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_phone || '—'}</span>}</label>
//               <label><strong>Street Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_address || '—'}</span>}</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <label><strong>City / Town:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_city || '—'}</span>}</label>
//                 <label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_country || '—'}</span>}</label>
//               </div>
//             </div>
//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {currentPackagesArray.map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div className="package-item-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div className="package-item-meta-controls">
//                       <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
//                       <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                       <label>Weight (kg): <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.01" value={pkg.total_weight !== undefined && pkg.total_weight !== null ? pkg.total_weight : 0} onChange={(e) => handleInputChange('total_weight', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
//                     </div>
//                   ) : (
//                     <span style={{ fontWeight: 'normal', color: '#555' }}>
//                       Container Class: {pkg.type || '—'} | Volume Metrics: {pkg.cbm || 0} CBM | <strong>Weight: {pkg.total_weight || 0} kg</strong>
//                     </span>
//                   )}
//                 </div>
                
//                 <div className="package-table-scroll-container">
//                   <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', fontSize: '12px' }}>
//                     <thead>
//                       <tr style={{ background: '#f4f4f4' }}>
//                         <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th>
//                         <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th>
//                         <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {(pkg.shipment_item || pkg.items || []).map((item, iIdx) => (
//                         <tr key={item.id || iIdx}>
//                           <td style={{ padding: '6px', border: '1px solid #ddd' }}>
//                             {isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}
//                           </td>
//                           <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>
//                             {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}
//                           </td>
//                           <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>
//                             {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight || 0} Kg`}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div className="billing-ledger-wrapper" style={{ marginBottom: '30px' }}>
//             <div className="billing-ledger-card">
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '75%' }}>
//                   <input style={{ ...inputStyle, width: '65px' }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={{ ...inputStyle, flex: 1 }} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong style={{ color: '#222' }}>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {/* 📋 SECTION ADDED: 5. Important Shipment Notes */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>5. Important Shipment Notes</div>
//           <div className="invoice-custom-notes-section" style={{ marginTop: '15px', marginBottom: '10px', width: '100%' }}>
//             {isAdmin ? (
//               <textarea
//                 className="dynamic-invoice-notes"
//                 value={data?.invoice_notes || ""} 
//                 placeholder="No custom tracking or delivery instructions provided for this shipment..."
//                 onChange={(e) => {
//                   handleInputChange('invoice_notes', e.target.value);
//                   e.target.style.height = 'auto'; 
//                   e.target.style.height = `${e.target.scrollHeight}px`;
//                 }}
//                 style={{
//                   width: '100%',
//                   minHeight: '80px',
//                   boxSizing: 'border-box',
//                   border: '1px dashed #0250a3',
//                   borderRadius: '4px',
//                   padding: '12px',
//                   fontSize: '14px',
//                   lineHeight: '1.5',
//                   resize: 'none',
//                   overflow: 'hidden',
//                   background: '#fff',
//                   outline: 'none',
//                   color: '#333',
//                   fontFamily: 'sans-serif',
//                   marginTop: '5px'
//                 }}
//               />
//             ) : (
//               <div style={{ 
//                 width: '100%', 
//                 minHeight: '50px', 
//                 background: '#fafafa', 
//                 border: '1px solid #eee', 
//                 padding: '12px', 
//                 borderRadius: '4px', 
//                 fontSize: '14px', 
//                 color: '#444',
//                 whiteSpace: 'pre-wrap',
//                 marginTop: '5px',
//                 lineHeight: '1.5'
//               }}>
//                 {data?.invoice_notes || "— No custom handling or delivery notes accompanied this shipment registry. —"}
//               </div>
//             )}
//           </div>

//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button type="submit" disabled={updating} style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}>
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}
//         </div>
//       </form>

//       <div className="label-printable-target">
//         <ShippingLabel previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} />
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import ShippingLabel from './ShippingLabel'; 
import "/src/styles/Invoice.css";
import "/src/styles/ShipmentDetail.css";

export default function ShipmentDetailView({ trackingId, onClose, user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [updating, setUpdating] = useState(false);
  const textareaRef = useRef(null);

  // Normalize roles to lowercase to prevent case-sensitivity bugs
  const userRole = user?.role?.toLowerCase();
  const isAdmin = userRole === 'admin';
  const isAgent = userRole === 'agent';
  const isCustomer = userRole === 'customer';
  
  const hasAccess = isAdmin || isAgent || isCustomer;

  useEffect(() => {
    if (!trackingId || !hasAccess) return;
    let isMounted = true;

    const fetchFullShipmentGraph = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/track/${trackingId}`);
        
        if (!response.ok) {
          throw new Error(`Shipment data for token #${trackingId} could not be resolved.`);
        }
        
        const jsonResult = await response.json();
        if (isMounted) {
          setData(jsonResult);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to establish database synchronization link.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFullShipmentGraph();

    return () => {
      isMounted = false;
    };
  }, [trackingId, hasAccess]);

  // ✨ Auto-resize effect for the notes textarea container block safely managed outside rendering loops
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data?.invoice_notes]);

  const handleInputChange = (field, value, targetArray = null, index = null, nestedItemIndex = null) => {
    if (!isAdmin) return;

    setData(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      
      if ((targetArray === 'packages' || targetArray === 'shipment_package') && nestedItemIndex !== null) {
        const updatedPackages = [...(updated.shipment_package || updated.packages || [])];
        const updatedItems = [...(updatedPackages[index]?.shipment_item || updatedPackages[index]?.items || [])];
        if (updatedItems[nestedItemIndex]) {
          updatedItems[nestedItemIndex] = { ...updatedItems[nestedItemIndex], [field]: value };
          if (updated.shipment_package) updated.shipment_package = updatedPackages;
          if (updated.packages) updated.packages = updatedPackages;
        }
      } else if (targetArray === 'packages' || targetArray === 'shipment_package') {
        const updatedPackages = [...(updated.shipment_package || updated.packages || [])];
        if (updatedPackages[index]) {
          updatedPackages[index] = { ...updatedPackages[index], [field]: value };
          if (updated.shipment_package) updated.shipment_package = updatedPackages;
          if (updated.packages) updated.packages = updatedPackages;
        }
      } else {
        updated[field] = value;
      }
      return updated;
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      setUpdating(true);
      const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
      alert("✨ Database records updated and synchronized cleanly!");
    } catch (err) {
      alert(`❌ Transaction Denied: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
  if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

  const mappedSenderInfo = {
    fullName: data?.shipper_name,
    contactNum: data?.shipper_phone,
    address: data?.shipper_address,
    city: data?.shipper_city,
    country: data?.shipper_country
  };

  const mappedReceiverInfo = {
    fullName: data?.receiver_name,
    contactNumber: data?.receiver_phone,
    fullAddress: data?.receiver_address,
    city: data?.receiver_city,
    country: data?.receiver_country,
    email: data?.receiver_email || 'N/A'
  };

  const mappedBillingInfo = {
    method: data?.payment_method || 'N/A',
    currency: data?.currency || 'NPR',
    // 🌟 REPAIRED MAPPING: Hand notes parameter value down into printable references explicitly
    invoiceNotes: data?.invoice_notes || ''
  };

  const currentPackagesArray = data?.shipment_package || data?.packages || [];

  const mappedPackages = currentPackagesArray.map(pkg => ({
    id: pkg.id,
    package_id: pkg.id,
    profile: pkg.profile || pkg.package_profile || "General Item Set",
    type: pkg.type || pkg.package_type || "Box",
    cbm: Number(pkg.cbm || pkg.cbm_value || 0),
    total_weight: Number(pkg.total_weight || 0), 
    items: (pkg.shipment_item || pkg.items || []).map(item => ({
      id: item.id,
      description: item.description || item.item_description,
      weight: Number(item.weight || item.item_weight || 0),
      qty: Number(item.qty || item.item_qty || 0)
    }))
  }));

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

  return (
    <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div className="no-print detail-action-header-row">
        <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
        <button type="button" onClick={() => { document.body.classList.add('print-mode-label-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50); }} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Print Shipping Label</button>
      </div>

      <form onSubmit={handleSaveChanges}>
        <div id="dashboard-view-panel" className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
          <div className="detail-main-header-block">
            <div>
              <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>
                {isAdmin ? '🔧 Admin Operations Module' : isAgent ? '💼 Agent Operational View' : 'Customer Tracking Console'}
              </h1>
              <p style={{ margin: 0 }}><strong>Tracking key reference:</strong> {data?.tracking_id}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#040404' }}>Shipment Status</label>
              {isAdmin ? (
                <select value={data?.status || 'Confirmed'} onChange={(e) => handleInputChange('status', e.target.value)} style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', border: '2px solid #e9e0e0', background: '#0c0b0b', color: '#fff', cursor: 'pointer', outline: 'none' }}>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Landed">Landed</option>
                  <option value="Ready to Collect">Ready to Collect</option>
                  <option value="Collected">Collected</option>
                </select>
              ) : (
                <span style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', background: '#f4f4f4', border: '1px solid #ccc', color: '#333' }}>
                  {data?.status || 'Confirmed'}
                </span>
              )}
            </div>
          </div>

          <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>1. Sender Information</div>
          <div className="info-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee' }}>
            <div className="text-details-column" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <label><strong>Full Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_name || '—'}</span>}</label>
              <label><strong>Contact number:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_phone || '—'}</span>}</label>
              <label><strong>Full Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.shipper_address || '—'}</span>}</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <label style={{ flex: 1 }}><strong>City:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_city || '—'}</span>}</label>
                <label style={{ flex: 1 }}><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_country || '—'}</span>}</label>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%', boxSizing: 'border-box' }}>
                {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
              </div>
            </div>
          </div>

          <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>2. Receiver Information</div>
          <div className="info-split-grid" style={{ marginTop: '15px', marginBottom: '30px', background: '#fcfcfc', padding: '15px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
            <div className="text-details-column" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <label><strong>Receiver Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_name || '—'}</span>}</label>
              <label><strong>Primary Contact:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_phone || '—'}</span>}</label>
              <label><strong>Street Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span style={{ color: '#555' }}> {data?.receiver_address || '—'}</span>}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <label><strong>City / Town:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_city || '—'}</span>}</label>
                <label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_country || '—'}</span>}</label>
              </div>
            </div>
            <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
            </div>
          </div>

          <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
          <div style={{ marginTop: '15px', marginBottom: '30px' }}>
            {currentPackagesArray.map((pkg, idx) => (
              <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
                <div className="package-item-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
                  <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
                  {isAdmin ? (
                    <div className="package-item-meta-controls">
                      <label>Type: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
                      <label>CBM: <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
                      <label>Weight (kg): <input style={{ ...inputStyle, width: '95px', display: 'inline-block' }} type="number" step="0.01" value={pkg.total_weight !== undefined && pkg.total_weight !== null ? pkg.total_weight : 0} onChange={(e) => handleInputChange('total_weight', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
                    </div>
                  ) : (
                    <span style={{ fontWeight: 'normal', color: '#555' }}>
                      Container Class: {pkg.type || '—'} | Volume Metrics: {pkg.cbm || 0} CBM | <strong>Weight: {pkg.total_weight || 0} kg</strong>
                    </span>
                  )}
                </div>
                
                <div className="package-table-scroll-container">
                  <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ background: '#f4f4f4' }}>
                        <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Item Name Description</th>
                        <th style={{ padding: '6px', width: '15%', border: '1px solid #ddd' }}>Count Qty</th>
                        <th style={{ padding: '6px', width: '20%', border: '1px solid #ddd' }}>Net Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pkg.shipment_item || pkg.items || []).map((item, iIdx) => (
                        <tr key={item.id || iIdx}>
                          <td style={{ padding: '6px', border: '1px solid #ddd' }}>
                            {isAdmin ? <input style={inputStyle} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}
                          </td>
                          <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'center' }}>
                            {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center' }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}
                          </td>
                          <td style={{ padding: '6px', border: '1px solid #ddd', textAlign: 'right' }}>
                            {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right' }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight || 0} Kg`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
          <div className="billing-ledger-wrapper" style={{ marginBottom: '30px' }}>
            <div className="billing-ledger-card">
              <span>Grand Billing Value Total:</span>
              {isAdmin ? (
                <div style={{ display: 'flex', gap: '5px', width: '75%' }}>
                  <input style={{ ...inputStyle, width: '65px' }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
                  <input style={{ ...inputStyle, flex: 1 }} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
                </div>
              ) : (
                <strong style={{ color: '#222' }}>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
              )}
            </div>
          </div>

          {/* 📋 SECTION 5: Important Shipment Notes */}
          <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>5. Important Shipment Notes</div>
          <div className="invoice-custom-notes-section" style={{ marginTop: '15px', marginBottom: '10px', width: '100%' }}>
            {isAdmin ? (
              <textarea
                ref={textareaRef}
                className="dynamic-invoice-notes"
                value={data?.invoice_notes || ""} 
                placeholder=""
                onChange={(e) => handleInputChange('invoice_notes', e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '80px',
                  boxSizing: 'border-box',
                  border: '1px dashed #0250a3',
                  borderRadius: '4px',
                  padding: '12px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  resize: 'vertical',
                  background: '#fff',
                  outline: 'none',
                  color: '#333',
                  fontFamily: 'sans-serif',
                  marginTop: '5px'
                }}
              />
            ) : (
              <div style={{ 
                width: '100%', 
                minHeight: '50px', 
                background: '#fafafa', 
                border: '1px solid #eee', 
                padding: '12px', 
                borderRadius: '4px', 
                fontSize: '14px', 
                color: '#444',
                whiteSpace: 'pre-wrap',
                marginTop: '5px',
                lineHeight: '1.5'
              }}>
                {data?.invoice_notes || "— No custom handling or delivery notes accompanied this shipment registry. —"}
              </div>
            )}
          </div>

          {isAdmin && (
            <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
              <button type="submit" disabled={updating} style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}>
                {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
              </button>
            </div>
          )}
        </div>
      </form>

      <div className="label-printable-target">
        <ShippingLabel previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} />
      </div>
    </div>
  );
}