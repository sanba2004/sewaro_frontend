
// import React, { useState, useEffect, useRef } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import PrintableInvoice from '/src/components/PrintableInvoice'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);
//   const textareaRef = useRef(null);

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

//   // Auto-resize effect for the notes textarea container block safely managed outside rendering loops
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [data?.invoice_notes]);

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

//       const currentStatus = data?.status;
//       const shouldTriggerSMS = currentStatus === 'Ready to Collect' || currentStatus === 'Collected';
//       const triggerSMSValue = shouldTriggerSMS ? currentStatus : null;

//       const payload = {
//         ...data,
//         receiver_contact: data?.receiver_phone,
//         triggerSMS: triggerSMSValue            
//       };

//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
      
//       if (shouldTriggerSMS) {
//         alert(`✨ Database records updated cleanly! "${currentStatus}" SMS notification request successfully pushed to queue.`);
//       } else {
//         alert("✨ Database records updated and synchronized cleanly!");
//       }
      
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
//     currency: data?.currency || 'NPR',
//     invoiceNotes: data?.invoice_notes || ''
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
//       qty: Number(item.qty || item.item_qty || 0),
//       hsCode: item.hsCode || item.hs_code || "—"
//     }))
//   }));

//   const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
//       {/* 🛠️ Dynamic Scoping Style Block: Guarantees elements hide ONLY during actual print actions */}
//       <style>{`
//         @media print {
//           .no-print { display: none !important; }
          
//           /* When printing invoice only: hide the forms and labels */
//           body.print-mode-invoice-only #dashboard-view-panel,
//           body.print-mode-invoice-only .label-printable-target { 
//             display: none !important; 
//           }
//           body.print-mode-invoice-only .invoice-printable-target { 
//             display: block !important; 
//           }
          
//           /* When printing labels only: hide the forms and invoices */
//           body.print-mode-label-only #dashboard-view-panel,
//           body.print-mode-label-only .invoice-printable-target { 
//             display: none !important; 
//           }
//           body.print-mode-label-only .label-printable-target { 
//             display: block !important; 
//           }
//         }

//         /* Default Screen View Rules: Keeps the print-only blocks clean and hidden while you work */
//         .invoice-printable-target, 
//         .label-printable-target { 
//           display: none; 
//         }
//       `}</style>

//       {/* Action Header Panel */}
//       <div className="no-print detail-action-header-row" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
        
//         <button type="button" onClick={() => { document.body.classList.add('print-mode-invoice-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-invoice-only'); }, 50); }} style={{ background: '#0250a3', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🖨️ Print Invoice</button>
        
//         <button type="button" onClick={() => { document.body.classList.add('print-mode-label-only'); setTimeout(() => { window.print(); document.body.classList.remove('print-mode-label-only'); }, 50); }} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Print Shipping Label</button>
//       </div>

//       <form onSubmit={handleSaveChanges} id="dashboard-view-panel">
//         <div className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
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

//               <label style={{ marginTop: '4px', display: 'block' }}>
//                 <strong>Preferred Delivery Method:</strong>
//                 {isAdmin ? (
//                   <select 
//                     value={data?.delivery_type || ''} 
//                     onChange={(e) => handleInputChange('delivery_type', e.target.value)} 
//                     style={{ ...inputStyle, cursor: 'pointer' }}
//                   >
//                     <option value="">— Unspecified / Select Method —</option>
//                     <option value="Branch Delivery">Branch Delivery</option>
//                     <option value="Home Delivery">Home Delivery</option>
//                   </select>
//                 ) : (
//                   <span style={{ 
//                     marginLeft: '8px',
//                     padding: '3px 10px', 
//                     fontSize: '12px', 
//                     fontWeight: 'bold', 
//                     borderRadius: '12px', 
//                     background: data?.delivery_type === 'Home Delivery' ? '#e3f2fd' : '#f5f5f5', 
//                     color: data?.delivery_type === 'Home Delivery' ? '#0d47a1' : '#424242',
//                     border: '1px solid #ddd',
//                     display: 'inline-block'
//                   }}>
//                     {data?.delivery_type || 'Branch Delivery'}
//                   </span>
//                 )}
//               </label>
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

//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>5. Important Shipment Notes</div>
//           <div className="invoice-custom-notes-section" style={{ marginTop: '15px', marginBottom: '10px', width: '100%' }}>
//             {isAdmin ? (
//               <textarea
//                 ref={textareaRef}
//                 className="dynamic-invoice-notes"
//                 value={data?.invoice_notes || ""} 
//                 placeholder=""
//                 onChange={(e) => handleInputChange('invoice_notes', e.target.value)}
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

//       {/* 📥 Deep Print Engine Targets (Pure CSS takes these over during print sessions) */}
//       <div className="invoice-printable-target">
//         <PrintableInvoice 
//           previewTrackingId={data?.tracking_id}
//           packages={mappedPackages}
//           senderInfo={mappedSenderInfo}
//           receiverInfo={mappedReceiverInfo}
//           billingInfo={mappedBillingInfo}
//           totalPayable={data?.total_amount || 0}
//           invoiceNotes={data?.invoice_notes || ""}
//         />
//       </div>

//       <div className="label-printable-target">
//         <ShippingLabel 
//           previewTrackingId={data?.tracking_id} 
//           packages={mappedPackages} 
//           senderInfo={mappedSenderInfo} 
//           receiverInfo={mappedReceiverInfo} 
//           billingInfo={mappedBillingInfo} 
//         />
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import ShippingLabel from './ShippingLabel'; 
// import PrintableInvoice from '/src/components/PrintableInvoice'; 
// import "/src/styles/Invoice.css";
// import "/src/styles/ShipmentDetail.css";

// export default function ShipmentDetailView({ trackingId, onClose, user }) {
//   // --- Component States ---
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [updating, setUpdating] = useState(false);
//   const textareaRef = useRef(null);

//   // --- Role & Permissions Management ---
//   const userRole = user?.role?.toLowerCase();
//   const isAdmin = userRole === 'admin';
//   const isAgent = userRole === 'agent';
//   const isCustomer = userRole === 'customer';
//   const hasAccess = isAdmin || isAgent || isCustomer;

//   // --- Fetch API: Sync Database Data Layer ---
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

//   // --- Auto-growing Textarea for Invoice Notes ---
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [data?.invoice_notes]);

//   // --- Mobile-Safe Native Printing Pipeline ---
//   const triggerNativePrint = (modeClass) => {
//     // 1. Wipe layout blocks clean
//     document.body.classList.remove('print-mode-invoice-only', 'print-mode-label-only');
    
//     // 2. Add target print layout token rules
//     document.body.classList.add(modeClass);

//     // 3. Keep standard layout completely clean using native lifecycle tracking
//     const cleanup = () => {
//       document.body.classList.remove(modeClass);
//       window.removeEventListener('afterprint', cleanup);
//     };
//     window.addEventListener('afterprint', cleanup);

//     // 4. Fire print layout engine snapshot after minor CSS paint delay
//     setTimeout(() => {
//       window.print();
//     }, 150);
//   };

//   // --- Two-Way Dynamic Input State Management ---
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

//   // --- Put API: Save Changes handler ---
//   const handleSaveChanges = async () => {
//     if (!isAdmin) return;

//     try {
//       setUpdating(true);
//       const currentStatus = data?.status;
//       const shouldTriggerSMS = currentStatus === 'Ready to Collect' || currentStatus === 'Collected';
//       const triggerSMSValue = shouldTriggerSMS ? currentStatus : null;

//       const payload = {
//         ...data,
//         receiver_contact: data?.receiver_phone,
//         triggerSMS: triggerSMSValue            
//       };

//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
      
//       if (shouldTriggerSMS) {
//         alert(`✨ Database records updated cleanly! "${currentStatus}" SMS notification request successfully pushed to queue.`);
//       } else {
//         alert("✨ Database records updated and synchronized cleanly!");
//       }
      
//     } catch (err) {
//       alert(`❌ Transaction Denied: ${err.message}`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // --- Fallback Exception Guards ---
//   if (!hasAccess) return <div style={{ padding: '40px', textAlign: 'center' }}>🚫 System Access Authorization Denied</div>;
//   if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Querying live dataset layers for tracking #{trackingId}...</div>;
//   if (error || !data) return <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>❌ Connection Error: {error}</div>;

//   // --- Print Component Interfaces Variable Transformations ---
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
//     currency: data?.currency || 'NPR',
//     invoiceNotes: data?.invoice_notes || ''
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
//       qty: Number(item.qty || item.item_qty || 0),
//       hsCode: item.hsCode || item.hs_code || "—"
//     }))
//   }));

//   // CSS UI Styling Layout Object Injection
//   const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

//   return (
//     <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
//       {/* Dynamic Printing CSS Override Sandboxes */}
//       <style>{`
//         @media print {
//           .no-print { display: none !important; }
          
//           body.print-mode-invoice-only #dashboard-view-panel,
//           body.print-mode-invoice-only .label-printable-target { 
//             display: none !important; 
//           }
//           body.print-mode-invoice-only .invoice-printable-target { 
//             display: block !important; 
//           }
          
//           body.print-mode-label-only #dashboard-view-panel,
//           body.print-mode-label-only .invoice-printable-target { 
//             display: none !important; 
//           }
//           body.print-mode-label-only .label-printable-target { 
//             display: block !important; 
//           }
//         }

//         .invoice-printable-target, 
//         .label-printable-target { 
//           display: none; 
//         }
//       `}</style>

//       {/* Screen Control Menu Header bar */}
//       <div className="no-print detail-action-header-row" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//         <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
        
//         <button 
//           type="button" 
//           onClick={() => triggerNativePrint('print-mode-invoice-only')} 
//           style={{ background: '#0250a3', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
//         >
//           🖨️ Print Invoice
//         </button>
        
//         <button 
//           type="button" 
//           onClick={() => triggerNativePrint('print-mode-label-only')} 
//           style={{ background: '#e0a800', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
//         >
//           🏷️ Print Shipping Label
//         </button>
//       </div>

//       {/* Primary Display Console */}
//       <div id="dashboard-view-panel">
//         <div className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000' }}>
          
//           <div className="detail-main-header-block" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', borderBottom: '2px solid #333', paddingBottom: '15px' }}>
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

//           {/* Section 1: Shipper / Sender details */}
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
//               <div style={{ border: '1px dashed #999', padding: '12px', background: '#fafafa', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Identity Documents Uploaded'}
//               </div>
//             </div>
//           </div>

//           {/* Section 2: Consignee / Receiver details */}
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

//               <label style={{ marginTop: '4px', display: 'block' }}>
//                 <strong>Preferred Delivery Method:</strong>
//                 {isAdmin ? (
//                   <select 
//                     value={data?.delivery_type || ''} 
//                     onChange={(e) => handleInputChange('delivery_type', e.target.value)} 
//                     style={{ ...inputStyle, cursor: 'pointer' }}
//                   >
//                     <option value="">— Unspecified / Select Method —</option>
//                     <option value="Branch Delivery">Branch Delivery</option>
//                     <option value="Home Delivery">Home Delivery</option>
//                   </select>
//                 ) : (
//                   <span style={{ 
//                     marginLeft: '8px',
//                     padding: '3px 10px', 
//                     fontSize: '12px', 
//                     fontWeight: 'bold', 
//                     borderRadius: '12px', 
//                     background: data?.delivery_type === 'Home Delivery' ? '#e3f2fd' : '#f5f5f5', 
//                     color: data?.delivery_type === 'Home Delivery' ? '#0d47a1' : '#424242',
//                     border: '1px solid #ddd',
//                     display: 'inline-block'
//                   }}>
//                     {data?.delivery_type || 'Branch Delivery'}
//                   </span>
//                 )}
//               </label>
//             </div>
            
//             <div style={{ border: '1px dashed #bbb', padding: '12px', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} /> : 'No Secondary Identification Provided'}
//             </div>
//           </div>

//           {/* Section 3: Package Dimensional and Nested Itemization Loops */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>3. Package Metrics</div>
//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             {currentPackagesArray.map((pkg, idx) => (
//               <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', background: '#fff' }}>
//                 <div className="package-item-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '10px' }}>
//                   <span>📦 Box Container Grid #{idx + 1} ({pkg.profile || 'General Item Set'})</span>
//                   {isAdmin ? (
//                     <div className="package-item-meta-controls" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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

//           {/* Section 4: Ledger Cost Sheets */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>4. Billing Matrix Ledger</div>
//           <div className="billing-ledger-wrapper" style={{ marginBottom: '30px', marginTop: '15px' }}>
//             <div className="billing-ledger-card" style={{ padding: '15px', background: '#f9f9f9', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <span>Grand Billing Value Total:</span>
//               {isAdmin ? (
//                 <div style={{ display: 'flex', gap: '5px', width: '50%' }}>
//                   <input style={{ ...inputStyle, width: '75px' }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
//                   <input style={{ ...inputStyle, flex: 1 }} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
//                 </div>
//               ) : (
//                 <strong style={{ color: '#222', fontSize: '16px' }}>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
//               )}
//             </div>
//           </div>

//           {/* Section 5: Handling comments / Dynamic Text Area */}
//           <div style={{ background: '#000', color: '#fff', padding: '6px 12px', fontWeight: 'bold' }}>5. Important Shipment Notes</div>
//           <div className="invoice-custom-notes-section" style={{ marginTop: '15px', marginBottom: '10px', width: '100%' }}>
//             {isAdmin ? (
//               <textarea
//                 ref={textareaRef}
//                 className="dynamic-invoice-notes"
//                 value={data?.invoice_notes || ""} 
//                 placeholder="Enter special operations routing terms or conditions..."
//                 onChange={(e) => handleInputChange('invoice_notes', e.target.value)}
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

//           {/* Admin Transaction Button */}
//           {isAdmin && (
//             <div style={{ marginTop: '30px', borderTop: '2px dashed #000', paddingTop: '20px', textAlign: 'right' }}>
//               <button 
//                 type="button" 
//                 onClick={handleSaveChanges} 
//                 disabled={updating} 
//                 style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px' }}
//               >
//                 {updating ? '⏳ Executing System Transaction Rewrite...' : '💾 Edit & Replace Values in Database'}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Hidden Print Rendering Hubs (Media Query Selective Layout Toggling) */}
//       <div className="invoice-printable-target">
//         <PrintableInvoice 
//           previewTrackingId={data?.tracking_id}
//           packages={mappedPackages}
//           senderInfo={mappedSenderInfo}
//           receiverInfo={mappedReceiverInfo}
//           billingInfo={mappedBillingInfo}
//           totalPayable={data?.total_amount || 0}
//           invoiceNotes={data?.invoice_notes || ""}
//         />
//       </div>

//       <div className="label-printable-target">
//         <ShippingLabel 
//           previewTrackingId={data?.tracking_id} 
//           packages={mappedPackages} 
//           senderInfo={mappedSenderInfo} 
//           receiverInfo={mappedReceiverInfo} 
//           billingInfo={mappedBillingInfo} 
//         />
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import ShippingLabel from './ShippingLabel'; 
import PrintableInvoice from '/src/components/PrintableInvoice'; 
import "/src/styles/Invoice.css";
import "/src/styles/ShipmentDetail.css";

export default function ShipmentDetailView({ trackingId, onClose, user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [updating, setUpdating] = useState(false);
  const textareaRef = useRef(null);

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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data?.invoice_notes]);

  const triggerNativePrint = (modeClass) => {
    document.body.classList.remove('print-mode-invoice-only', 'print-mode-label-only');
    document.body.classList.add(modeClass);

    const cleanup = () => {
      document.body.classList.remove(modeClass);
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);

    setTimeout(() => {
      window.print();
    }, 150);
  };

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

  const handleSaveChanges = async () => {
    if (!isAdmin) return;

    try {
      setUpdating(true);
      const currentStatus = data?.status;
      const shouldTriggerSMS = currentStatus === 'Ready to Collect' || currentStatus === 'Collected';
      const triggerSMSValue = shouldTriggerSMS ? currentStatus : null;

      const payload = {
        ...data,
        receiver_contact: data?.receiver_phone,
        triggerSMS: triggerSMSValue            
      };

      const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("The operational core rejected your modifications payload data.");
      
      if (shouldTriggerSMS) {
        alert(`✨ Database records updated cleanly! "${currentStatus}" SMS notification request successfully pushed to queue.`);
      } else {
        alert("✨ Database records updated and synchronized cleanly!");
      }
      
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
      qty: Number(item.qty || item.item_qty || 0),
      hsCode: item.hsCode || item.hs_code || "—"
    }))
  }));

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', color: '#000000', background: '#ffffff', marginTop: '4px', display: 'block' };

  return (
    <div className="invoice-display-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '10px' }}>
      
      {/* 📱 Advanced Mobile CSS System */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body.print-mode-invoice-only #dashboard-view-panel,
          body.print-mode-invoice-only .label-printable-target { display: none !important; }
          body.print-mode-invoice-only .invoice-printable-target { display: block !important; }
          body.print-mode-label-only #dashboard-view-panel,
          body.print-mode-label-only .invoice-printable-target { display: none !important; }
          body.print-mode-label-only .label-printable-target { display: block !important; }
        }

        .invoice-printable-target, .label-printable-target { display: none; }

        /* Mobile Adjustments (under 768px) */
        @media (max-width: 768px) {
          .invoice-card { padding: 15px !important; }
          .detail-action-header-row { flex-direction: column; gap: 8px !important; }
          .detail-action-header-row button { width: 100% !important; margin-right: 0 !important; text-align: center; }
          .detail-main-header-block { flex-direction: column; align-items: flex-start !important; gap: 15px; }
          .status-container { width: 100% !important; align-items: flex-start !important; }
          .status-container select { width: 100% !important; }
          .info-split-grid { grid-template-columns: 1fr !important; gap: 15px !important; }
          .city-country-row { flex-direction: column; gap: 10px; }
          .package-item-header-container { flex-direction: column; align-items: flex-start !important; gap: 12px; }
          .package-item-meta-controls { width: 100%; flex-wrap: wrap; gap: 8px; justify-content: space-between; }
          .package-item-meta-controls label { width: 48% !important; margin: 0 !important; }
          .package-item-meta-controls input { width: 100% !important; }
          .billing-ledger-card { flex-direction: column; align-items: flex-start !important; gap: 10px; }
          .billing-ledger-card div { width: 100% !important; }
          .save-btn-container { text-align: center !important; }
          .save-btn-container button { width: 100% !important; padding: 15px !important; }

          /* Mobile Responsive Tables (Stacked Layout) */
          .responsive-mobile-table table, 
          .responsive-mobile-table thead, 
          .responsive-mobile-table tbody, 
          .responsive-mobile-table th, 
          .responsive-mobile-table td, 
          .responsive-mobile-table tr { 
            display: block; 
          }
          .responsive-mobile-table thead { display: none; }
          .responsive-mobile-table tr { border: 1px solid #ccc; margin-bottom: 10px; padding: 8px; background: #fafafa; border-radius: 4px; }
          .responsive-mobile-table td { border: none !important; padding: 6px 0 !important; position: relative; padding-left: 45% !important; text-align: left !important; }
          .responsive-mobile-table td:before { position: absolute; left: 6px; width: 40%; padding-right: 10px; white-space: nowrap; font-weight: bold; color: #555; }
          .responsive-mobile-table td:nth-of-type(1):before { content: "Item:"; }
          .responsive-mobile-table td:nth-of-type(2):before { content: "Qty:"; }
          .responsive-mobile-table td:nth-of-type(3):before { content: "Weight:"; }
          .responsive-mobile-table td input { margin-top: 0 !important; }
        }
      `}</style>

      {/* Screen Action Bar */}
      <div className="no-print detail-action-header-row" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button type="button" onClick={onClose} style={{ marginRight: 'auto', background: '#333', color: '#fff', border: 'none', padding: '12px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>← Dashboard</button>
        <button type="button" onClick={() => triggerNativePrint('print-mode-invoice-only')} style={{ background: '#0250a3', color: '#fff', border: 'none', padding: '12px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🖨️ Invoice</button>
        <button type="button" onClick={() => triggerNativePrint('print-mode-label-only')} style={{ background: '#e0a800', color: '#000', border: 'none', padding: '12px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>🏷️ Label</button>
      </div>

      {/* Main Base Grid */}
      <div id="dashboard-view-panel">
        <div className="invoice-card" style={{ padding: '30px', background: '#fff', border: '1px solid #000', borderRadius: '6px' }}>
          
          <div className="detail-main-header-block" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', borderBottom: '2px solid #333', paddingBottom: '15px' }}>
            <div>
              <h1 style={{ margin: '0 0 5px 0', fontSize: '20px', textTransform: 'uppercase', lineHeight: '1.3' }}>
                {isAdmin ? '🔧 Admin Module' : isAgent ? '💼 Agent View' : 'Tracking Console'}
              </h1>
              <p style={{ margin: 0, fontSize: '14px' }}><strong>ID:</strong> {data?.tracking_id}</p>
            </div>
            
            <div className="status-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', minWidth: '160px' }}>
              <label style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#555' }}>Shipment Status</label>
              {isAdmin ? (
                <select value={data?.status || 'Confirmed'} onChange={(e) => handleInputChange('status', e.target.value)} style={{ padding: '10px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', border: '1px solid #ccc', background: '#000', color: '#fff', cursor: 'pointer', width: '100%' }}>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Landed">Landed</option>
                  <option value="Ready to Collect">Ready to Collect</option>
                  <option value="Collected">Collected</option>
                </select>
              ) : (
                <span style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', background: '#f4f4f4', border: '1px solid #ccc', color: '#333', display: 'block', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
                  {data?.status || 'Confirmed'}
                </span>
              )}
            </div>
          </div>

          {/* Section 1: Sender */}
          <div style={{ background: '#000', color: '#fff', padding: '8px 12px', fontWeight: 'bold', fontSize: '14px' }}>1. Sender Information</div>
          <div className="info-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '25px', background: '#fcfcfc', padding: '12px', border: '1px solid #eee', borderRadius: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label><strong>Full Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_name || ''} onChange={(e) => handleInputChange('shipper_name', e.target.value)} /> : <span style={{ color: '#555', display: 'block' }}> {data?.shipper_name || '—'}</span>}</label>
              <label><strong>Contact Number:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_phone || ''} onChange={(e) => handleInputChange('shipper_phone', e.target.value)} /> : <span style={{ color: '#555', display: 'block' }}> {data?.shipper_phone || '—'}</span>}</label>
              <label><strong>Full Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_address || ''} onChange={(e) => handleInputChange('shipper_address', e.target.value)} /> : <span style={{ color: '#555', display: 'block' }}> {data?.shipper_address || '—'}</span>}</label>
              <div className="city-country-row" style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}><label><strong>City:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_city || ''} onChange={(e) => handleInputChange('shipper_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_city || '—'}</span>}</label></div>
                <div style={{ flex: 1 }}><label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.shipper_country || ''} onChange={(e) => handleInputChange('shipper_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.shipper_country || '—'}</span>}</label></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ border: '1px dashed #999', padding: '10px', background: '#fafafa', width: '100%', borderRadius: '4px', textAlign: 'center' }}>
                {data?.sender_id_front_url ? <img src={data.sender_id_front_url} alt="ID Front Proof" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }} /> : <span style={{ fontSize: '13px', color: '#777' }}>No Identity Image</span>}
              </div>
            </div>
          </div>

          {/* Section 2: Receiver */}
          <div style={{ background: '#000', color: '#fff', padding: '8px 12px', fontWeight: 'bold', fontSize: '14px' }}>2. Receiver Information</div>
          <div className="info-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginTop: '15px', marginBottom: '25px', background: '#fcfcfc', padding: '12px', border: '1px solid #eee', borderRadius: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label><strong>Receiver Name:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_name || ''} onChange={(e) => handleInputChange('receiver_name', e.target.value)} /> : <span style={{ color: '#555', display: 'block' }}> {data?.receiver_name || '—'}</span>}</label>
              <label><strong>Primary Contact:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_phone || ''} onChange={(e) => handleInputChange('receiver_phone', e.target.value)} /> : <span style={{ color: '#555', display: 'block' }}> {data?.receiver_phone || '—'}</span>}</label>
              <label><strong>Street Address:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_address || ''} onChange={(e) => handleInputChange('receiver_address', e.target.value)} /> : <span style={{ color: '#555', display: 'block' }}> {data?.receiver_address || '—'}</span>}</label>
              <div className="city-country-row" style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}><label><strong>City / Town:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_city || ''} onChange={(e) => handleInputChange('receiver_city', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_city || '—'}</span>}</label></div>
                <div style={{ flex: 1 }}><label><strong>Country:</strong> {isAdmin ? <input style={inputStyle} type="text" value={data?.receiver_country || ''} onChange={(e) => handleInputChange('receiver_country', e.target.value)} /> : <span style={{ color: '#555', display: 'block', marginTop: '4px' }}> {data?.receiver_country || '—'}</span>}</label></div>
              </div>

              <label style={{ marginTop: '4px', display: 'block' }}>
                <strong>Delivery Option:</strong>
                {isAdmin ? (
                  <select value={data?.delivery_type || ''} onChange={(e) => handleInputChange('delivery_type', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">— Select Method —</option>
                    <option value="Branch Delivery">Branch Delivery</option>
                    <option value="Home Delivery">Home Delivery</option>
                  </select>
                ) : (
                  <span style={{ marginLeft: '8px', padding: '3px 10px', fontSize: '12px', fontWeight: 'bold', borderRadius: '12px', background: data?.delivery_type === 'Home Delivery' ? '#e3f2fd' : '#f5f5f5', color: data?.delivery_type === 'Home Delivery' ? '#0d47a1' : '#424242', border: '1px solid #ddd', display: 'inline-block' }}>
                    {data?.delivery_type || 'Branch Delivery'}
                  </span>
                )}
              </label>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ border: '1px dashed #bbb', padding: '10px', background: '#fafafa', width: '100%', borderRadius: '4px', textAlign: 'center' }}>
                {data?.receiver_id_url ? <img src={data.receiver_id_url} alt="Receiver Proof" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }} /> : <span style={{ fontSize: '13px', color: '#777' }}>No Secondary Image</span>}
              </div>
            </div>
          </div>

          {/* Section 3: Packages */}
          <div style={{ background: '#000', color: '#fff', padding: '8px 12px', fontWeight: 'bold', fontSize: '14px' }}>3. Package Metrics</div>
          <div style={{ marginTop: '15px', marginBottom: '25px' }}>
            {currentPackagesArray.map((pkg, idx) => (
              <div key={pkg.id || idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '15px', background: '#fff', borderRadius: '4px' }}>
                <div className="package-item-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '12px' }}>
                  <span>📦 Container #{idx + 1} ({pkg.profile || 'General Set'})</span>
                  {isAdmin ? (
                    <div className="package-item-meta-controls" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <label style={{ fontSize: '11px' }}>Type: <input style={{ ...inputStyle, padding: '6px', marginTop: '2px' }} type="text" value={pkg.type || ''} onChange={(e) => handleInputChange('type', e.target.value, 'shipment_package', idx)} /></label>
                      <label style={{ fontSize: '11px' }}>CBM: <input style={{ ...inputStyle, padding: '6px', marginTop: '2px' }} type="number" step="0.0001" value={pkg.cbm || 0} onChange={(e) => handleInputChange('cbm', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
                      <label style={{ fontSize: '11px' }}>Kg: <input style={{ ...inputStyle, padding: '6px', marginTop: '2px' }} type="number" step="0.01" value={pkg.total_weight || 0} onChange={(e) => handleInputChange('total_weight', parseFloat(e.target.value) || 0, 'shipment_package', idx)} /></label>
                    </div>
                  ) : (
                    <span style={{ fontWeight: 'normal', color: '#555', fontSize: '12px' }}>
                      {pkg.type || 'Box'} | {pkg.cbm || 0} CBM | <strong>{pkg.total_weight || 0} kg</strong>
                    </span>
                  )}
                </div>
                
                <div className="responsive-mobile-table">
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: '#f4f4f4' }}>
                        <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Item Description</th>
                        <th style={{ padding: '8px', width: '15%', border: '1px solid #ddd', textAlign: 'center' }}>Qty</th>
                        <th style={{ padding: '8px', width: '20%', border: '1px solid #ddd', textAlign: 'right' }}>Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pkg.shipment_item || pkg.items || []).map((item, iIdx) => (
                        <tr key={item.id || iIdx}>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            {isAdmin ? <input style={{ ...inputStyle, margin: 0 }} type="text" value={item.description || ''} onChange={(e) => handleInputChange('description', e.target.value, 'shipment_package', idx, iIdx)} /> : item.description}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                            {isAdmin ? <input style={{ ...inputStyle, textAlign: 'center', margin: 0 }} type="number" value={item.qty || 0} onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : item.qty}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>
                            {isAdmin ? <input style={{ ...inputStyle, textAlign: 'right', margin: 0 }} type="number" step="0.01" value={item.weight || 0} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0, 'shipment_package', idx, iIdx)} /> : `${item.weight || 0} Kg`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Section 4: Billing */}
          <div style={{ background: '#000', color: '#fff', padding: '8px 12px', fontWeight: 'bold', fontSize: '14px' }}>4. Billing Matrix Ledger</div>
          <div style={{ marginBottom: '25px', marginTop: '15px' }}>
            <div className="billing-ledger-card" style={{ padding: '15px', background: '#f9f9f9', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '4px' }}>
              <span style={{ fontSize: '14px' }}>Grand Billing Value Total:</span>
              {isAdmin ? (
                <div style={{ display: 'flex', gap: '6px', width: '60%', minWidth: '200px' }}>
                  <input style={{ ...inputStyle, width: '75px', margin: 0 }} type="text" value={data?.currency || 'NPR'} onChange={(e) => handleInputChange('currency', e.target.value.toUpperCase())} />
                  <input style={{ ...inputStyle, flex: 1, margin: 0 }} type="number" value={data?.total_amount || 0} onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value) || 0)} />
                </div>
              ) : (
                <strong style={{ color: '#222', fontSize: '16px' }}>{data?.currency || 'NPR'} {Number(data?.total_amount || 0).toLocaleString()}</strong>
              )}
            </div>
          </div>

          {/* Section 5: Notes */}
          <div style={{ background: '#000', color: '#fff', padding: '8px 12px', fontWeight: 'bold', fontSize: '14px' }}>5. Important Shipment Notes</div>
          <div style={{ marginTop: '15px', marginBottom: '10px', width: '100%' }}>
            {isAdmin ? (
              <textarea
                ref={textareaRef}
                value={data?.invoice_notes || ""} 
                placeholder="Enter custom handling instructions..."
                onChange={(e) => handleInputChange('invoice_notes', e.target.value)}
                style={{ width: '100%', minHeight: '80px', boxSizing: 'border-box', border: '1px dashed #0250a3', borderRadius: '4px', padding: '12px', fontSize: '14px', lineHeight: '1.5', resize: 'none', overflow: 'hidden', background: '#fff', outline: 'none', color: '#333', marginTop: '5px' }}
              />
            ) : (
              <div style={{ width: '100%', minHeight: '50px', background: '#fafafa', border: '1px solid #eee', padding: '12px', borderRadius: '4px', fontSize: '14px', color: '#444', whiteSpace: 'pre-wrap', marginTop: '5px', lineHeight: '1.5' }}>
                {data?.invoice_notes || "— No custom handling or delivery notes accompanied this shipment registry. —"}
              </div>
            )}
          </div>

          {/* Save Action Wrapper */}
          {isAdmin && (
            <div className="save-btn-container" style={{ marginTop: '25px', borderTop: '2px dashed #eee', paddingTop: '20px', textAlign: 'right' }}>
              <button type="button" onClick={handleSaveChanges} disabled={updating} style={{ background: updating ? '#666' : '#28a745', color: '#fff', border: 'none', padding: '14px 35px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px', borderRadius: '4px', transition: 'background 0.2s' }}>
                {updating ? '⏳ Syncing Records...' : '💾 Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Layout Print Enclaves */}
      <div className="invoice-printable-target">
        <PrintableInvoice previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} totalPayable={data?.total_amount || 0} invoiceNotes={data?.invoice_notes || ""} />
      </div>
      <div className="label-printable-target">
        <ShippingLabel previewTrackingId={data?.tracking_id} packages={mappedPackages} senderInfo={mappedSenderInfo} receiverInfo={mappedReceiverInfo} billingInfo={mappedBillingInfo} />
      </div>
    </div>
  );
}