
// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 

// import "/src/styles/ViewShipments.css";

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   // 🎛️ Filter and Pagination State
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedAgent, setSelectedAgent] = useState('All');
//   const [agentsList, setAgentsList] = useState([]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const itemsPerPage = 50; // Matching Gmail's 50 threshold

//   const isUserAdmin = user?.role?.toLowerCase() === 'admin';

//   useEffect(() => {
//     const fetchAgentsList = async () => {
//       try {
//         const response = await fetch('https://sewaro-backend.onrender.com/api/admin/agents');
//         if (response.ok) {
//           const data = await response.json();
//           setAgentsList(data);
//         }
//       } catch (err) {
//         console.error("Failed downloading agent database list:", err);
//       }
//     };
//     if (isUserAdmin) fetchAgentsList();
//   }, [isUserAdmin]);

//   // Fetch shipments when user, filters, OR current page changes
//   useEffect(() => {
//     const fetchShipments = async () => {
//       setLoading(true);
//       try {
//         let url = `https://sewaro-backend.onrender.com/api/shipments/all?userId=${user?.id}&role=${user?.role}&page=${currentPage}&limit=${itemsPerPage}`;        
//         if (dateFrom) url += `&dateFrom=${dateFrom}`;
//         if (dateTo) url += `&dateTo=${dateTo}`;
//         if (status !== 'All') url += `&status=${status}`;
//         if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

//         const response = await fetch(url);
//         if (!response.ok) throw new Error('Failed to fetch');
        
//         const data = await response.json();
        
//         // Handle the new response object structure
//         setShipments(Array.isArray(data.shipments) ? data.shipments : []);
//         setTotalItems(data.totalItems || 0);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setShipments([]); 
//         setTotalItems(0);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     if (user) fetchShipments();
//   }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage]);

//   // Reset page to 1 whenever filters change
//   const handleFilterChange = (setter, value) => {
//     setter(value);
//     setCurrentPage(1);
//   };

//   const handleResetFilters = () => {
//     setDateFrom('');
//     setDateTo('');
//     setStatus('All');
//     setSelectedAgent('All');
//     setCurrentPage(1);
//   };

//   // Pagination Helper Values
//   const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => setActiveTrackingId(null)} 
//         user={user}
//       />
//     );
//   }

//   return (
//     <div className="view-shipments-container">
//       <h2>📦 Shipment History</h2>
      
//       {/* 🛠️ Dynamic Controls Dashboard Section */}
//       <div className="filters-control-panel">
//         <div className="filter-group">
//           <label>Date From:</label>
//           <input type="date" value={dateFrom} onChange={(e) => handleFilterChange(setDateFrom, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Date To:</label>
//           <input type="date" value={dateTo} onChange={(e) => handleFilterChange(setDateTo, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Status:</label>
//           <select value={status} onChange={(e) => handleFilterChange(setStatus, e.target.value)}>
//             <option value="All">All Statuses</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Transit">In Transit</option>
//             <option value="Landed">Landed</option>
//             <option value="Ready to Collect">Ready to Collect</option>
//             <option value="Collected">Collected</option>
//           </select>
//         </div>

//         {isUserAdmin && (
//           <div className="filter-group">
//             <label>By Agent:</label>
//             <select value={selectedAgent} onChange={(e) => handleFilterChange(setSelectedAgent, e.target.value)}>
//               <option value="All">All Agents</option>
//               {agentsList.map(agent => (
//                 <option key={agent.id} value={agent.id}>{agent.full_name}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>
//       </div>

//       {loading ? (
//         <div className="loader">Loading Shipments...</div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="shipment-table">
//               <thead>
//                 <tr>
//                   <th>Invoice #</th>
//                   <th>Created By</th>
//                   <th>Date</th>
//                   <th>Sender</th>
//                   <th>Sender Contact</th>            
//                   <th>Receiver</th>
//                   <th>Receiver Contact</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.length > 0 ? (
//                   shipments.map((s) => (
//                     <tr key={s.id}>
//                       <td>{s.tracking_id || 'N/A'}</td> 
//                       {/* <td style={{ fontWeight: '500', color: '#333' }}>
//                         {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
//                       </td> */}
//                       <td style={{ fontWeight: '500', color: '#333' }}>
//                         {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
//                       </td>
//                       <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                       <td>{s.sender_name || '—'}</td>
//                       <td>{s.sender_contact_num || '—'}</td>
//                       <td>{s.receiver_name || '—'}</td>
//                       <td>{s.receiver_contact || '—'}</td>
//                       <td><span className="badge-status">{s.status || 'Pending'}</span></td>
//                       <td>
//                         <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
//                       No shipments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* 🔘 Gmail Style Pagination Controls */}
//           <div className="pagination-container">
//             <span className="pagination-info">
//               {startItem}–{endItem} of {totalItems.toLocaleString()}
//             </span>
//             <div className="pagination-buttons">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 ‹
//               </button>
//               <button 
//                 onClick={() => setCurrentPage(prev => (endItem < totalItems ? prev + 1 : prev))}
//                 disabled={endItem >= totalItems}
//                 className="pagination-btn"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;

//above is the previous code
// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 

// import "/src/styles/ViewShipments.css";

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   // 🎛️ Filter and Pagination State
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedAgent, setSelectedAgent] = useState('All');
//   const [agentsList, setAgentsList] = useState([]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const itemsPerPage = 50; // Matching Gmail's 50 threshold

//   const isUserAdmin = user?.role?.toLowerCase() === 'admin';

//   useEffect(() => {
//     const fetchAgentsList = async () => {
//       try {
//         const response = await fetch('https://sewaro-backend.onrender.com/api/admin/agents');
//         if (response.ok) {
//           const data = await response.json();
//           setAgentsList(data);
//         }
//       } catch (err) {
//         console.error("Failed downloading agent database list:", err);
//       }
//     };
//     if (isUserAdmin) fetchAgentsList();
//   }, [isUserAdmin]);

//   // Fetch shipments when user, filters, OR current page changes
//   useEffect(() => {
//     const fetchShipments = async () => {
//       setLoading(true);
//       try {
//         let url = `https://sewaro-backend.onrender.com/api/shipments/all?userId=${user?.id}&role=${user?.role}&page=${currentPage}&limit=${itemsPerPage}`;        
//         if (dateFrom) url += `&dateFrom=${dateFrom}`;
//         if (dateTo) url += `&dateTo=${dateTo}`;
//         if (status !== 'All') url += `&status=${status}`;
//         if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

//         const response = await fetch(url);
//         if (!response.ok) throw new Error('Failed to fetch');
        
//         const data = await response.json();
        
//         // Handle the new response object structure
//         setShipments(Array.isArray(data.shipments) ? data.shipments : []);
//         setTotalItems(data.totalItems || 0);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setShipments([]); 
//         setTotalItems(0);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     if (user) fetchShipments();
//   }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage]);

//   // Reset page to 1 whenever filters change
//   const handleFilterChange = (setter, value) => {
//     setter(value);
//     setCurrentPage(1);
//   };

//   const handleResetFilters = () => {
//     setDateFrom('');
//     setDateTo('');
//     setStatus('All');
//     setSelectedAgent('All');
//     setCurrentPage(1);
//   };

//   // Pagination Helper Values
//   const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => setActiveTrackingId(null)} 
//         user={user}
//       />
//     );
//   }

//   return (
//     <div className="view-shipments-container">
//       <h2>📦 Shipment History</h2>
      
//       {/* 🛠️ Dynamic Controls Dashboard Section */}
//       <div className="filters-control-panel">
//         <div className="filter-group">
//           <label>Date From:</label>
//           <input type="date" value={dateFrom} onChange={(e) => handleFilterChange(setDateFrom, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Date To:</label>
//           <input type="date" value={dateTo} onChange={(e) => handleFilterChange(setDateTo, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Status:</label>
//           <select value={status} onChange={(e) => handleFilterChange(setStatus, e.target.value)}>
//             <option value="All">All Statuses</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Transit">In Transit</option>
//             <option value="Landed">Landed</option>
//             <option value="Ready to Collect">Ready to Collect</option>
//             <option value="Collected">Collected</option>
//           </select>
//         </div>

//         {isUserAdmin && (
//           <div className="filter-group">
//             <label>By Agent:</label>
//             <select value={selectedAgent} onChange={(e) => handleFilterChange(setSelectedAgent, e.target.value)}>
//               <option value="All">All Agents</option>
//               {agentsList.map(agent => (
//                 <option key={agent.id} value={agent.id}>{agent.full_name}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>
//       </div>

//       {loading ? (
//         <div className="loader">Loading Shipments...</div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="shipment-table">
//               <thead>
//                 <tr>
//                   <th>Invoice #</th>
//                   {/* 🌟 Hides Column Title from Non-Admins */}
//                   {isUserAdmin && <th>Created By</th>}
//                   <th>Date</th>
//                   <th>Sender</th>
//                   <th>Sender Contact</th>            
//                   <th>Receiver</th>
//                   <th>Receiver Contact</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.length > 0 ? (
//                   shipments.map((s) => (
//                     // 🌟 Optimized key using tracking_id to prevent key-prop console warnings
//                     <tr key={s.tracking_id || s.id}>
//                       <td>{s.tracking_id || 'N/A'}</td> 
                      
//                       {/* 🌟 Hides Cell Data from Non-Admins */}
//                       {isUserAdmin && (
//                         <td style={{ fontWeight: '500', color: '#333' }}>
//                           {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
//                         </td>
//                       )}

//                       <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                       <td>{s.sender_name || '—'}</td>
//                       <td>{s.sender_contact_num || '—'}</td>
//                       <td>{s.receiver_name || '—'}</td>
//                       <td>{s.receiver_contact || '—'}</td>
//                       <td><span className="badge-status">{s.status || 'Pending'}</span></td>
//                       <td>
//                         <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     {/* 🌟 Dynamically changes columns span depending on the role to maintain symmetry */}
//                     <td colSpan={isUserAdmin ? "9" : "8"} style={{ textAlign: 'center', padding: '20px' }}>
//                       No shipments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* 🔘 Gmail Style Pagination Controls */}
//           <div className="pagination-container">
//             <span className="pagination-info">
//               {startItem}–{endItem} of {totalItems.toLocaleString()}
//             </span>
//             <div className="pagination-buttons">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 ‹
//               </button>
//               <button 
//                 onClick={() => setCurrentPage(prev => (endItem < totalItems ? prev + 1 : prev))}
//                 disabled={endItem >= totalItems}
//                 className="pagination-btn"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;





// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 

// import "/src/styles/ViewShipments.css";

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   // 🎛️ Filter and Pagination State
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedAgent, setSelectedAgent] = useState('All');
//   const [agentsList, setAgentsList] = useState([]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const itemsPerPage = 50; // Matching Gmail's 50 threshold

//   // ⚡ Inline Status Updating State Map tracking individual row executions
//   const [statusUpdatingMap, setStatusUpdatingMap] = useState({});

//   // const isUserAdmin = user?.role?.toLowerCase() === 'admin';
//   const currentRole = (user?.role || '').toLowerCase();
//   const isUserAdmin = currentRole === 'admin';


//   const [activeSearch, setActiveSearch] = useState('');

  
//   useEffect(() => {
//     const fetchAgentsList = async () => {
//       try {
//         const response = await fetch('https://sewaro-backend.onrender.com/api/admin/agents');
//         if (response.ok) {
//           const data = await response.json();
//           setAgentsList(data);
//         }
//       } catch (err) {
//         console.error("Failed downloading agent database list:", err);
//       }
//     };
//     if (isUserAdmin) fetchAgentsList();
//   }, [isUserAdmin]);

//   // Fetch shipments when user, filters, OR current page changes
//   const fetchShipments = async () => {
//     setLoading(true);
//     const cleanUserId = user?.id || user?.userId;
//     const cleanRole = user?.role || '';
//     try {
//       let url = `https://sewaro-backend.onrender.com/api/shipments/all?userId=${cleanUserId}&role=${cleanRole}&page=${currentPage}&limit=${itemsPerPage}`;      if (dateFrom) url += `&dateFrom=${dateFrom}`;
//       if (dateTo) url += `&dateTo=${dateTo}`;
//       if (status !== 'All') url += `&status=${status}`;
//       if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

//       const response = await fetch(url);
//       if (!response.ok) throw new Error('Failed to fetch');
      
//       const data = await response.json();
      
//       // Handle the response object structure
//       setShipments(Array.isArray(data.shipments) ? data.shipments : []);
//       setTotalItems(data.totalItems || 0);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setShipments([]); 
//       setTotalItems(0);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (user) fetchShipments();
//   }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage]);

//   // 🚀 Inline Status Update Handler for Admins
//   const handleInlineStatusChange = async (shipment, newStatus) => {
//     const trackingId = shipment.tracking_id;
//     if (!trackingId) return;

//     try {
//       // Lock dropdown selector visually for this specific row
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: true }));

//       // Mirror complete structure expected by the PUT /api/shipments/update/:trackingId logic
//       const updatedPayload = {
//         ...shipment,
//         status: newStatus
//       };

//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedPayload)
//       });

//       if (!response.ok) throw new Error("The operational backend core rejected your fast status modification.");

//       // Refresh UI state seamlessly upon successful API synchronization
//       setShipments(prevShipments => 
//         prevShipments.map(s => s.tracking_id === trackingId ? { ...s, status: newStatus } : s)
//       );
//     } catch (err) {
//       console.error("Inline update failure:", err);
//       alert(`❌ Fast Status Transition Failed: ${err.message}`);
//     } finally {
//       // Release interaction lock
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: false }));
//     }
//   };

//   // Reset page to 1 whenever filters change
//   const handleFilterChange = (setter, value) => {
//     setter(value);
//     setCurrentPage(1);
//   };

//   const handleResetFilters = () => {
//     setDateFrom('');
//     setDateTo('');
//     setStatus('All');
//     setSelectedAgent('All');
//     setCurrentPage(1);
//   };

//   // Pagination Helper Values
//   const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   // Dynamic Column Count Strategy Calculation
//   // Base non-admin table columns = 8.
//   // Add 1 column for 'Created By', and add 1 column for 'Status Action' if admin.
//   const totalActiveColumns = 8 + (isUserAdmin ? 2 : 0);

//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => {
//           setActiveTrackingId(null);
//           fetchShipments(); // Re-fetch list context upon closing detail modal view
//         }} 
//         user={user}
//       />
//     );
//   }

//   return (
//     <div className="view-shipments-container">
//       <h2>📦 Shipment History</h2>
      
//       {/* 🛠️ Dynamic Controls Dashboard Section */}
//       <div className="filters-control-panel">
//         <div className="filter-group">
//           <label>Date From:</label>
//           <input type="date" value={dateFrom} onChange={(e) => handleFilterChange(setDateFrom, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Date To:</label>
//           <input type="date" value={dateTo} onChange={(e) => handleFilterChange(setDateTo, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Status:</label>
//           <select value={status} onChange={(e) => handleFilterChange(setStatus, e.target.value)}>
//             <option value="All">All Statuses</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Transit">In Transit</option>
//             <option value="Landed">Landed</option>
//             <option value="Ready to Collect">Ready to Collect</option>
//             <option value="Collected">Collected</option>
//           </select>
//         </div>

//         {isUserAdmin && (
//           <div className="filter-group">
//             <label>By Agent:</label>
//             <select value={selectedAgent} onChange={(e) => handleFilterChange(setSelectedAgent, e.target.value)}>
//               <option value="All">All Agents</option>
//               {agentsList.map(agent => (
//                 <option key={agent.id} value={agent.id}>{agent.full_name}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>
//       </div>

//       {loading ? (
//         <div className="loader">Loading Shipments...</div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="shipment-table">
//               <thead>
//                 <tr>
//                   <th>Invoice #</th>
//                   {isUserAdmin && <th>Created By</th>}
//                   <th>Date</th>
//                   <th>Sender</th>
//                   <th>Sender Contact</th>            
//                   <th>Receiver</th>
//                   <th>Receiver Contact</th>
//                   <th>Status</th>
//                   {/* 🌟 New Column Header for Admin Action Controls */}
//                   {isUserAdmin && <th>Status Action</th>}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.length > 0 ? (
//                   shipments.map((s) => (
//                     <tr key={s.tracking_id || s.id}>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.tracking_id || 'N/A'}</td> 
                      
//                       {isUserAdmin && (
//                         <td style={{ fontWeight: '400', color: '#f3f2f2' }}>
//                           {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_contact_num || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_contact || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}><span className="badge-status">{s.status || 'Pending'}</span></td>
                      
//                       {/* 🌟 New Dynamic Row Dropdown Field Cell for Admin Access Only */}
//                       {isUserAdmin && (
//                         <td>
//                           <select 
//                             value={s.status || 'Confirmed'} 
//                             disabled={statusUpdatingMap[s.tracking_id]}
//                             onChange={(e) => handleInlineStatusChange(s, e.target.value)}
//                             style={{ 
//                               padding: '5px 10px', 
//                               fontSize: '13px', 
//                               borderRadius: '4px', 
//                               border: '1px solid #ccc',
//                               background: statusUpdatingMap[s.tracking_id] ? '#e9e9e9' : '#fff',
//                               color: '#000',
//                               cursor: statusUpdatingMap[s.tracking_id] ? 'not-allowed' : 'pointer',
//                               outline: 'none'
//                             }}
//                           >
//                             <option value="Confirmed">Confirmed</option>
//                             <option value="In Transit">In Transit</option>
//                             <option value="Landed">Landed</option>
//                             <option value="Ready to Collect">Ready to Collect</option>
//                             <option value="Collected">Collected</option>
//                           </select>
//                         </td>
//                       )}

//                       <td>
//                         <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     {/* 🌟 Handled correct dynamically calculated width mapping matrix safely */}
//                     <td colSpan={totalActiveColumns} style={{ textAlign: 'center', padding: '20px' }}>
//                       No shipments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* 🔘 Gmail Style Pagination Controls */}
//           <div className="pagination-container">
//             <span className="pagination-info">
//               {startItem}–{endItem} of {totalItems.toLocaleString()}
//             </span>
//             <div className="pagination-buttons">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 ‹
//               </button>
//               <button 
//                 onClick={() => setCurrentPage(prev => (endItem < totalItems ? prev + 1 : prev))}
//                 disabled={endItem >= totalItems}
//                 className="pagination-btn"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;




// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 

// import "/src/styles/ViewShipments.css";

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   // 🎛️ Filter and Pagination State
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedAgent, setSelectedAgent] = useState('All');
//   const [agentsList, setAgentsList] = useState([]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const itemsPerPage = 50; // Matching Gmail's 50 threshold

//   // ⚡ Inline Status Updating State Map tracking individual row executions
//   const [statusUpdatingMap, setStatusUpdatingMap] = useState({});

//   const currentRole = (user?.role || '').toLowerCase();
//   const isUserAdmin = currentRole === 'admin';

//   // 🌟 Search State Variables
//   const [searchInput, setSearchInput] = useState('');
//   const [activeSearch, setActiveSearch] = useState('');

//   useEffect(() => {
//     const fetchAgentsList = async () => {
//       try {
//         const response = await fetch('https://sewaro-backend.onrender.com/api/admin/agents');
//         if (response.ok) {
//           const data = await response.json();
//           setAgentsList(data);
//         }
//       } catch (err) {
//         console.error("Failed downloading agent database list:", err);
//       }
//     };
//     if (isUserAdmin) fetchAgentsList();
//   }, [isUserAdmin]);

//   // Fetch shipments when user, filters, OR current page changes
//   const fetchShipments = async () => {
//     setLoading(true);
//     const cleanUserId = user?.id || user?.userId;
//     const cleanRole = user?.role || '';
//     try {
//       // 🌟 STEP B COMPLETE: Injected activeSearch parameter into URL ledger mapping string
//       let url = `https://sewaro-backend.onrender.com/api/shipments/all?userId=${cleanUserId}&role=${cleanRole}&page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(activeSearch)}`; 
      
//       if (dateFrom) url += `&dateFrom=${dateFrom}`;
//       if (dateTo) url += `&dateTo=${dateTo}`;
//       if (status !== 'All') url += `&status=${status}`;
//       if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

//       const response = await fetch(url);
//       if (!response.ok) throw new Error('Failed to fetch');
      
//       const data = await response.json();
      
//       setShipments(Array.isArray(data.shipments) ? data.shipments : []);
//       setTotalItems(data.totalItems || 0);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setShipments([]); 
//       setTotalItems(0);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   // 🌟 Added activeSearch tracking dependency token block to synchronize automatically on hit
//   useEffect(() => {
//     if (user) fetchShipments();
//   }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage, activeSearch]);

//   // 🚀 Inline Status Update Handler for Admins
//   const handleInlineStatusChange = async (shipment, newStatus) => {
//     const trackingId = shipment.tracking_id;
//     if (!trackingId) return;

//     try {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: true }));

//       const updatedPayload = {
//         ...shipment,
//         status: newStatus
//       };

//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedPayload)
//       });

//       if (!response.ok) throw new Error("The operational backend core rejected your fast status modification.");

//       setShipments(prevShipments => 
//         prevShipments.map(s => s.tracking_id === trackingId ? { ...s, status: newStatus } : s)
//       );
//     } catch (err) {
//       console.error("Inline update failure:", err);
//       alert(`❌ Fast Status Transition Failed: ${err.message}`);
//     } finally {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: false }));
//     }
//   };

//   const handleFilterChange = (setter, value) => {
//     setter(value);
//     setCurrentPage(1);
//   };

//   // 🌟 Search trigger abstraction action functions
//   const handleSearchTrigger = () => {
//     setActiveSearch(searchInput);
//     setCurrentPage(1);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     setActiveSearch('');
//     setCurrentPage(1);
//   };

//   const handleResetFilters = () => {
//     setDateFrom('');
//     setDateTo('');
//     setStatus('All');
//     setSelectedAgent('All');
//     setSearchInput('');
//     setActiveSearch('');
//     setCurrentPage(1);
//   };

//   // Pagination Helper Values
//   const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   const totalActiveColumns = 8 + (isUserAdmin ? 2 : 0);

//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => {
//           setActiveTrackingId(null);
//           fetchShipments(); 
//         }} 
//         user={user}
//       />
//     );
//   }

//   return (
//     <div className="view-shipments-container">
//       <h2>📦 Shipment History</h2>
      
//       {/* 🛠️ Dynamic Controls Dashboard Section */}
//       <div className="filters-control-panel" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '15px' }}>
//         <div className="filter-group">
//           <label>Date From:</label>
//           <input type="date" value={dateFrom} onChange={(e) => handleFilterChange(setDateFrom, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Date To:</label>
//           <input type="date" value={dateTo} onChange={(e) => handleFilterChange(setDateTo, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Status:</label>
//           <select value={status} onChange={(e) => handleFilterChange(setStatus, e.target.value)}>
//             <option value="All">All Statuses</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Transit">In Transit</option>
//             <option value="Landed">Landed</option>
//             <option value="Ready to Collect">Ready to Collect</option>
//             <option value="Collected">Collected</option>
//           </select>
//         </div>

//         {isUserAdmin && (
//           <div className="filter-group">
//             <label>By Agent:</label>
//             <select value={selectedAgent} onChange={(e) => handleFilterChange(setSelectedAgent, e.target.value)}>
//               <option value="All">All Agents</option>
//               {agentsList.map(agent => (
//                 <option key={agent.id} value={agent.id}>{agent.full_name}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* 🌟 STEP C COMPLETE: Added Search box element just after the agent block container */}
//         <div className="filter-group" style={{ display: 'flex', flexDirection: 'col', gap: '4px' }}>
//           <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#040404' }}>Search Ledger:</label>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <input 
//               type="text" 
//               placeholder="Invoice, Sender/Receiver info..." 
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') handleSearchTrigger();
//               }}
//               style={{
//                 padding: '6px 12px',
//                 fontSize: '14px',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc',
//                 height: '38px',
//                 width: '240px',
//                 outline: 'none',
//                 color: '#000',
//                 background: '#fff'
//               }}
//             />
//             <button
//               onClick={handleSearchTrigger}
//               style={{
//                 height: '38px',
//                 padding: '0 16px',
//                 backgroundColor: '#2563eb',
//                 color: '#white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontWeight: '500',
//                 fontSize: '14px',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.2s'
//               }}
//               onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
//               onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
//             >
//               Search
//             </button>
//             {activeSearch && (
//               <button
//                 onClick={handleClearSearch}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   color: '#ef4444',
//                   fontSize: '13px',
//                   cursor: 'pointer',
//                   textDecoration: 'underline',
//                   padding: '0 4px'
//                 }}
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>
//       </div>

//       {loading ? (
//         <div className="loader">Loading Shipments...</div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="shipment-table">
//               <thead>
//                 <tr>
//                   <th>Invoice #</th>
//                   {isUserAdmin && <th>Created By</th>}
//                   <th>Date</th>
//                   <th>Sender</th>
//                   <th>Sender Contact</th>            
//                   <th>Receiver</th>
//                   <th>Receiver Contact</th>
//                   <th>Status</th>
//                   {isUserAdmin && <th>Status Action</th>}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.length > 0 ? (
//                   shipments.map((s) => (
//                     <tr key={s.tracking_id || s.id}>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.tracking_id || 'N/A'}</td> 
                      
//                       {isUserAdmin && (
//                         <td style={{ fontWeight: '400', color: '#f3f2f2' }}>
//                           {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_contact_num || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_contact || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}><span className="badge-status">{s.status || 'Pending'}</span></td>
                      
//                       {isUserAdmin && (
//                         <td>
//                           <select 
//                             value={s.status || 'Confirmed'} 
//                             disabled={statusUpdatingMap[s.tracking_id]}
//                             onChange={(e) => handleInlineStatusChange(s, e.target.value)}
//                             style={{ 
//                               padding: '5px 10px', 
//                               fontSize: '13px', 
//                               borderRadius: '4px', 
//                               border: '1px solid #ccc',
//                               background: statusUpdatingMap[s.tracking_id] ? '#e9e9e9' : '#fff',
//                               color: '#000',
//                               cursor: statusUpdatingMap[s.tracking_id] ? 'not-allowed' : 'pointer',
//                               outline: 'none'
//                             }}
//                           >
//                             <option value="Confirmed">Confirmed</option>
//                             <option value="In Transit">In Transit</option>
//                             <option value="Landed">Landed</option>
//                             <option value="Ready to Collect">Ready to Collect</option>
//                             <option value="Collected">Collected</option>
//                           </select>
//                         </td>
//                       )}

//                       <td>
//                         <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={totalActiveColumns} style={{ textAlign: 'center', padding: '20px' }}>
//                       No shipments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* 🔘 Gmail Style Pagination Controls */}
//           <div className="pagination-container">
//             <span className="pagination-info">
//               {startItem}–{endItem} of {totalItems.toLocaleString()}
//             </span>
//             <div className="pagination-buttons">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 ‹
//               </button>
//               <button 
//                 onClick={() => setCurrentPage(prev => (endItem < totalItems ? prev + 1 : prev))}
//                 disabled={endItem >= totalItems}
//                 className="pagination-btn"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;






// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 

// import "/src/styles/ViewShipments.css";

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   // 🎛️ Filter and Pagination State
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedAgent, setSelectedAgent] = useState('All');
//   const [agentsList, setAgentsList] = useState([]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const itemsPerPage = 50; 

//   // ⚡ Inline Status Updating State Map tracking individual row executions
//   const [statusUpdatingMap, setStatusUpdatingMap] = useState({});

//   const currentRole = (user?.role || '').toLowerCase();
//   const isUserAdmin = currentRole === 'admin';

//   // Search State Variables
//   const [searchInput, setSearchInput] = useState('');
//   const [activeSearch, setActiveSearch] = useState('');

//   // 🌟 NEW: Multi-Select System States
//   const [isSelectionMode, setIsSelectionMode] = useState(false);
//   const [selectedTrackingIds, setSelectedTrackingIds] = useState([]);

//   useEffect(() => {
//     const fetchAgentsList = async () => {
//       try {
//         const response = await fetch('https://sewaro-backend.onrender.com/api/admin/agents');
//         if (response.ok) {
//           const data = await response.json();
//           setAgentsList(data);
//         }
//       } catch (err) {
//         console.error("Failed downloading agent database list:", err);
//       }
//     };
//     if (isUserAdmin) fetchAgentsList();
//   }, [isUserAdmin]);

//   // Fetch shipments when user, filters, OR current page changes
//   const fetchShipments = async () => {
//     setLoading(true);
//     const cleanUserId = user?.id || user?.userId;
//     const cleanRole = user?.role || '';
//     try {
//       let url = `https://sewaro-backend.onrender.com/api/shipments/all?userId=${cleanUserId}&role=${cleanRole}&page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(activeSearch)}`; 
      
//       if (dateFrom) url += `&dateFrom=${dateFrom}`;
//       if (dateTo) url += `&dateTo=${dateTo}`;
//       if (status !== 'All') url += `&status=${status}`;
//       if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

//       const response = await fetch(url);
//       if (!response.ok) throw new Error('Failed to fetch');
      
//       const data = await response.json();
      
//       setShipments(Array.isArray(data.shipments) ? data.shipments : []);
//       setTotalItems(data.totalItems || 0);
      
//       // Clear selections automatically when moving across pages or filtering
//       setSelectedTrackingIds([]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setShipments([]); 
//       setTotalItems(0);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (user) fetchShipments();
//   }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage, activeSearch]);

//   // 🚀 Inline Status Update Handler for Admins
//   const handleInlineStatusChange = async (shipment, newStatus) => {
//     const trackingId = shipment.tracking_id;
//     if (!trackingId) return;

//     try {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: true }));

//       const updatedPayload = {
//         ...shipment,
//         status: newStatus
//       };

//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedPayload)
//       });

//       if (!response.ok) throw new Error("The operational backend core rejected your fast status modification.");

//       setShipments(prevShipments => 
//         prevShipments.map(s => s.tracking_id === trackingId ? { ...s, status: newStatus } : s)
//       );
//     } catch (err) {
//       console.error("Inline update failure:", err);
//       alert(`❌ Fast Status Transition Failed: ${err.message}`);
//     } finally {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: false }));
//     }
//   };

//   // 🌟 NEW: Batch Status Updater for Selected Items
//   const handleBatchStatusChange = async (newStatus) => {
//     if (selectedTrackingIds.length === 0) return;
//     if (!window.confirm(`Are you sure you want to change the status of ${selectedTrackingIds.length} shipments to "${newStatus}"?`)) return;

//     setLoading(true);
//     try {
//       // Processes updates sequentially or parallelly using your existing endpoint rules safely
//       const updatePromises = selectedTrackingIds.map(async (id) => {
//         const fullShipmentObj = shipments.find(s => s.tracking_id === id);
//         if (!fullShipmentObj) return;

//         return fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ ...fullShipmentObj, status: newStatus })
//         });
//       });

//       await Promise.all(updatePromises);
//       alert(`🎉 Successfully synchronized ${selectedTrackingIds.length} records!`);
//       setSelectedTrackingIds([]);
//       fetchShipments();
//     } catch (err) {
//       console.error("Batch update transaction anomaly:", err);
//       alert("❌ Batch Update Failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (setter, value) => {
//     setter(value);
//     setCurrentPage(1);
//   };

//   const handleSearchTrigger = () => {
//     setActiveSearch(searchInput);
//     setCurrentPage(1);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     setActiveSearch('');
//     setCurrentPage(1);
//   };

//   const handleResetFilters = () => {
//     setDateFrom('');
//     setDateTo('');
//     setStatus('All');
//     setSelectedAgent('All');
//     setSearchInput('');
//     setActiveSearch('');
//     setIsSelectionMode(false);
//     setSelectedTrackingIds([]);
//     setCurrentPage(1);
//   };

//   // 🌟 NEW: Row Checking Event Matrix Computations
//   const handleSelectAllToggle = () => {
//     const allCurrentIds = shipments.map(s => s.tracking_id).filter(Boolean);
//     if (selectedTrackingIds.length === allCurrentIds.length) {
//       setSelectedTrackingIds([]); // Uncheck all
//     } else {
//       setSelectedTrackingIds(allCurrentIds); // Check all
//     }
//   };

//   const handleRowSelectToggle = (trackingId) => {
//     setSelectedTrackingIds(prev => 
//       prev.includes(trackingId) 
//         ? prev.filter(id => id !== trackingId) 
//         : [...prev, trackingId]
//     );
//   };

//   // Pagination Helper Values
//   const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   // Adjusted Column Width Mapping Context: Includes Select Checkbox row space if Selection mode triggers
//   const totalActiveColumns = 8 + (isUserAdmin ? 2 : 0) + (isSelectionMode ? 1 : 0);

//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => {
//           setActiveTrackingId(null);
//           fetchShipments(); 
//         }} 
//         user={user}
//       />
//     );
//   }

//   return (
//     <div className="view-shipments-container">
//       <h2>📦 Shipment History</h2>
      
//       {/* 🛠️ Dynamic Controls Dashboard Section */}
//       <div className="filters-control-panel" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '15px' }}>
//         <div className="filter-group">
//           <label>Date From:</label>
//           <input type="date" value={dateFrom} onChange={(e) => handleFilterChange(setDateFrom, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Date To:</label>
//           <input type="date" value={dateTo} onChange={(e) => handleFilterChange(setDateTo, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Status:</label>
//           <select value={status} onChange={(e) => handleFilterChange(setStatus, e.target.value)}>
//             <option value="All">All Statuses</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Transit">In Transit</option>
//             <option value="Landed">Landed</option>
//             <option value="Ready to Collect">Ready to Collect</option>
//             <option value="Collected">Collected</option>
//           </select>
//         </div>

//         {isUserAdmin && (
//           <div className="filter-group">
//             <label>By Agent:</label>
//             <select value={selectedAgent} onChange={(e) => handleFilterChange(setSelectedAgent, e.target.value)}>
//               <option value="All">All Agents</option>
//               {agentsList.map(agent => (
//                 <option key={agent.id} value={agent.id}>{agent.full_name}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div className="filter-group" style={{ display: 'flex', flexDirection: 'col', gap: '4px' }}>
//           <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#fff' }}>Search Ledger:</label>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <input 
//               type="text" 
//               placeholder="Invoice, Sender/Receiver info..." 
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') handleSearchTrigger();
//               }}
//               style={{
//                 padding: '6px 12px',
//                 fontSize: '14px',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc',
//                 height: '38px',
//                 width: '240px',
//                 outline: 'none',
//                 color: '#000',
//                 background: '#fff'
//               }}
//             />
//             <button
//               onClick={handleSearchTrigger}
//               style={{
//                 height: '38px',
//                 padding: '0 16px',
//                 backgroundColor: '#2563eb',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontWeight: '500',
//                 fontSize: '14px',
//                 cursor: 'pointer'
//               }}
//             >
//               Search
//             </button>
//             {activeSearch && (
//               <button onClick={handleClearSearch} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>

//         {/* 🌟 NEW: Select Mode Button Toggle - Placed immediately after Reset button */}
//         <button
//           onClick={() => {
//             setIsSelectionMode(!isSelectionMode);
//             setSelectedTrackingIds([]); // Wipe array buffers clean on state transition
//           }}
//           style={{
//             height: '38px',
//             padding: '0 16px',
//             backgroundColor: isSelectionMode ? '#059669' : '#4b5563',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             fontWeight: '500',
//             fontSize: '14px',
//             cursor: 'pointer',
//             transition: 'all 0.2s'
//           }}
//         >
//           {isSelectionMode ? '✅ Selection Mode Active' : '☑️ Select Multiple'}
//         </button>
//       </div>

//       {/* 🌟 NEW: Floating Batch Action Tray (Shows up when multiple checkmarks are triggered) */}
//       {isSelectionMode && selectedTrackingIds.length > 0 && (
//         <div style={{
//           margin: '15px 0',
//           padding: '12px 20px',
//           backgroundColor: '#1e293b',
//           borderLeft: '4px solid #3b82f6',
//           borderRadius: '6px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           animation: 'fadeIn 0.2s ease-in-out'
//         }}>
//           <span style={{ fontSize: '14px', fontWeight: '500', color: '#f1f5f9' }}>
//             Selected <strong>{selectedTrackingIds.length}</strong> items for batch operations:
//           </span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <label style={{ fontSize: '13px', color: '#cbd5e1' }}>Update Selected Status:</label>
//             <select
//               onChange={(e) => {
//                 if(e.target.value !== "") {
//                   handleBatchStatusChange(e.target.value);
//                   e.target.value = ""; // Clear selection reset
//                 }
//               }}
//               style={{
//                 padding: '6px 12px',
//                 fontSize: '13px',
//                 borderRadius: '4px',
//                 border: '1px solid #475569',
//                 backgroundColor: '#0f172a',
//                 color: '#fff',
//                 cursor: 'pointer'
//               }}
//             >
//               <option value="">-- Choose Status --</option>
//               <option value="Confirmed">Confirmed</option>
//               <option value="In Transit">In Transit</option>
//               <option value="Landed">Landed</option>
//               <option value="Ready to Collect">Ready to Collect</option>
//               <option value="Collected">Collected</option>
//             </select>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="loader">Loading Shipments...</div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="shipment-table">
//               <thead>
//                 <tr>
//                   {/* 🌟 NEW: Checkbox Selection Header Column mapping triggers safely */}
//                   {isSelectionMode && (
//                     <th style={{ width: '40px', textAlign: 'center' }}>
//                       <input 
//                         type="checkbox" 
//                         onChange={handleSelectAllToggle}
//                         checked={shipments.length > 0 && selectedTrackingIds.length === shipments.map(s => s.tracking_id).filter(Boolean).length}
//                         style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
//                       />
//                     </th>
//                   )}
//                   <th>Invoice #</th>
//                   {isUserAdmin && <th>Created By</th>}
//                   <th>Date</th>
//                   <th>Sender</th>
//                   <th>Sender Contact</th>            
//                   <th>Receiver</th>
//                   <th>Receiver Contact</th>
//                   <th>Status</th>
//                   {isUserAdmin && <th>Status Action</th>}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.length > 0 ? (
//                   shipments.map((s) => (
//                     <tr key={s.tracking_id || s.id} style={{ backgroundColor: selectedTrackingIds.includes(s.tracking_id) ? '#1e293b' : 'transparent' }}>
                      
//                       {/* 🌟 NEW: Checkbox Data Cell rendered conditionally */}
//                       {isSelectionMode && (
//                         <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                           <input 
//                             type="checkbox" 
//                             checked={selectedTrackingIds.includes(s.tracking_id)}
//                             onChange={() => handleRowSelectToggle(s.tracking_id)}
//                             disabled={!s.tracking_id}
//                             style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
//                           />
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.tracking_id || 'N/A'}</td> 
                      
//                       {isUserAdmin && (
//                         <td style={{ fontWeight: '400', color: '#f3f2f2' }}>
//                           {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_contact_num || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_contact || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}><span className="badge-status">{s.status || 'Pending'}</span></td>
                      
//                       {isUserAdmin && (
//                         <td>
//                           <select 
//                             value={s.status || 'Confirmed'} 
//                             disabled={statusUpdatingMap[s.tracking_id]}
//                             onChange={(e) => handleInlineStatusChange(s, e.target.value)}
//                             style={{ 
//                               padding: '5px 10px', 
//                               fontSize: '13px', 
//                               borderRadius: '4px', 
//                               border: '1px solid #ccc',
//                               background: statusUpdatingMap[s.tracking_id] ? '#e9e9e9' : '#fff',
//                               color: '#000',
//                               cursor: statusUpdatingMap[s.tracking_id] ? 'not-allowed' : 'pointer',
//                               outline: 'none'
//                             }}
//                           >
//                             <option value="Confirmed">Confirmed</option>
//                             <option value="In Transit">In Transit</option>
//                             <option value="Landed">Landed</option>
//                             <option value="Ready to Collect">Ready to Collect</option>
//                             <option value="Collected">Collected</option>
//                           </select>
//                         </td>
//                       )}

//                       <td>
//                         <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={totalActiveColumns} style={{ textAlign: 'center', padding: '20px' }}>
//                       No shipments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* 🔘 Gmail Style Pagination Controls */}
//           <div className="pagination-container">
//             <span className="pagination-info">
//               {startItem}–{endItem} of {totalItems.toLocaleString()}
//             </span>
//             <div className="pagination-buttons">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 ‹
//               </button>
//               <button 
//                 onClick={() => setCurrentPage(prev => (endItem < totalItems ? prev + 1 : prev))}
//                 disabled={endItem >= totalItems}
//                 className="pagination-btn"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;



// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 

// import "/src/styles/ViewShipments.css";

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   // 🎛️ Filter and Pagination State
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedAgent, setSelectedAgent] = useState('All');
//   const [agentsList, setAgentsList] = useState([]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const itemsPerPage = 50; 

//   // ⚡ Inline Status Updating State Map tracking individual row executions
//   const [statusUpdatingMap, setStatusUpdatingMap] = useState({});

//   const currentRole = (user?.role || '').toLowerCase();
//   const isUserAdmin = currentRole === 'admin';

//   // Search State Variables
//   const [searchInput, setSearchInput] = useState('');
//   const [activeSearch, setActiveSearch] = useState('');

//   // Multi-Select System States
//   const [isSelectionMode, setIsSelectionMode] = useState(false);
//   const [selectedTrackingIds, setSelectedTrackingIds] = useState([]);

//   useEffect(() => {
//     const fetchAgentsList = async () => {
//       try {
//         const response = await fetch('https://sewaro-backend.onrender.com/api/admin/agents');
//         if (response.ok) {
//           const data = await response.json();
//           setAgentsList(data);
//         }
//       } catch (err) {
//         console.error("Failed downloading agent database list:", err);
//       }
//     };
//     if (isUserAdmin) fetchAgentsList();
//   }, [isUserAdmin]);

//   // Fetch shipments when user, filters, OR current page changes
//   const fetchShipments = async () => {
//     setLoading(true);
//     const cleanUserId = user?.id || user?.userId;
//     const cleanRole = user?.role || '';
//     try {
//       let url = `https://sewaro-backend.onrender.com/api/shipments/all?userId=${cleanUserId}&role=${cleanRole}&page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(activeSearch)}`; 
      
//       if (dateFrom) url += `&dateFrom=${dateFrom}`;
//       if (dateTo) url += `&dateTo=${dateTo}`;
//       if (status !== 'All') url += `&status=${status}`;
//       if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

//       const response = await fetch(url);
//       if (!response.ok) throw new Error('Failed to fetch');
      
//       const data = await response.json();
      
//       setShipments(Array.isArray(data.shipments) ? data.shipments : []);
//       setTotalItems(data.totalItems || 0);
      
//       // Clear selections automatically when moving across pages or filtering
//       setSelectedTrackingIds([]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setShipments([]); 
//       setTotalItems(0);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (user) fetchShipments();
//   }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage, activeSearch]);

//   // 🚀 Inline Status Update Handler for Admins
//   const handleInlineStatusChange = async (shipment, newStatus) => {
//     const trackingId = shipment.tracking_id;
//     if (!trackingId) return;

//     try {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: true }));

//       const updatedPayload = {
//         ...shipment,
//         status: newStatus
//       };

//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedPayload)
//       });

//       if (!response.ok) throw new Error("The operational backend core rejected your fast status modification.");

//       setShipments(prevShipments => 
//         prevShipments.map(s => s.tracking_id === trackingId ? { ...s, status: newStatus } : s)
//       );
//     } catch (err) {
//       console.error("Inline update failure:", err);
//       alert(`❌ Fast Status Transition Failed: ${err.message}`);
//     } finally {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: false }));
//     }
//   };

//   // Batch Status Updater for Selected Items
//   const handleBatchStatusChange = async (newStatus) => {
//     if (selectedTrackingIds.length === 0) return;
//     if (!window.confirm(`Are you sure you want to change the status of ${selectedTrackingIds.length} shipments to "${newStatus}"?`)) return;

//     setLoading(true);
//     try {
//       const updatePromises = selectedTrackingIds.map(async (id) => {
//         const fullShipmentObj = shipments.find(s => s.tracking_id === id);
//         if (!fullShipmentObj) return;

//         return fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ ...fullShipmentObj, status: newStatus })
//         });
//       });

//       await Promise.all(updatePromises);
//       alert(`🎉 Successfully synchronized ${selectedTrackingIds.length} records!`);
//       setSelectedTrackingIds([]);
//       fetchShipments();
//     } catch (err) {
//       console.error("Batch update transaction anomaly:", err);
//       alert("❌ Batch Update Failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🌟 Batch Purge/Deletion Request Execution Core
//   const handleBatchDelete = async () => {
//     if (selectedTrackingIds.length === 0) return;
    
//     const confirmMessage = `⚠️ CRITICAL ACTION REQ!\nAre you sure you want to permanently DELETE ${selectedTrackingIds.length} selected shipments, including all nested packages and items inside them?\n\nThis action cannot be undone.`;
//     if (!window.confirm(confirmMessage)) return;

//     setLoading(true);
//     try {
//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/bulk-delete`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ trackingIds: selectedTrackingIds })
//       });

//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.error || "The server rejected the transaction matrix request.");
//       }

//       alert(`🗑️ Successfully deleted ${selectedTrackingIds.length} shipments.`);
//       setSelectedTrackingIds([]);
//       setIsSelectionMode(false);
      
//       // Fix: Reset to page 1 if removing shipments invalidates current page boundaries
//       setCurrentPage(1); 
//       fetchShipments(); 
//     } catch (err) {
//       console.error("Batch removal failure:", err);
//       alert(`❌ Purge Execution Failed: ${err.message}`);
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (setter, value) => {
//     setter(value);
//     setCurrentPage(1);
//   };

//   const handleSearchTrigger = () => {
//     setActiveSearch(searchInput);
//     setCurrentPage(1);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     setActiveSearch('');
//     setCurrentPage(1);
//   };

//   const handleResetFilters = () => {
//     setDateFrom('');
//     setDateTo('');
//     setStatus('All');
//     setSelectedAgent('All');
//     setSearchInput('');
//     setActiveSearch('');
//     setIsSelectionMode(false);
//     setSelectedTrackingIds([]);
//     setCurrentPage(1);
//   };

//   // Row Checking Event Matrix Computations
//   const handleSelectAllToggle = () => {
//     const allCurrentIds = shipments.map(s => s.tracking_id).filter(Boolean);
//     if (selectedTrackingIds.length === allCurrentIds.length) {
//       setSelectedTrackingIds([]); 
//     } else {
//       setSelectedTrackingIds(allCurrentIds); 
//     }
//   };

//   const handleRowSelectToggle = (trackingId) => {
//     setSelectedTrackingIds(prev => 
//       prev.includes(trackingId) 
//         ? prev.filter(id => id !== trackingId) 
//         : [...prev, trackingId]
//     );
//   };

//   // Pagination Helper Values
//   const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   // 🌟 FIX: Total column count formula to prevent layout breakage on "No shipments found" row
//   const totalActiveColumns = 9 + (isUserAdmin ? 2 : 0) + (isSelectionMode ? 1 : 0);

//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => {
//           setActiveTrackingId(null);
//           fetchShipments(); 
//         }} 
//         user={user}
//       />
//     );
//   }

//   return (
//     <div className="view-shipments-container">
//       <h2>📦 Shipment History</h2>
      
//       {/* 🛠️ Dynamic Controls Dashboard Section */}
//       <div className="filters-control-panel" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '15px' }}>
//         <div className="filter-group">
//           <label>Date From:</label>
//           <input type="date" value={dateFrom} onChange={(e) => handleFilterChange(setDateFrom, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Date To:</label>
//           <input type="date" value={dateTo} onChange={(e) => handleFilterChange(setDateTo, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Status:</label>
//           <select value={status} onChange={(e) => handleFilterChange(setStatus, e.target.value)}>
//             <option value="All">All Statuses</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Transit">In Transit</option>
//             <option value="Landed">Landed</option>
//             <option value="Ready to Collect">Ready to Collect</option>
//             <option value="Collected">Collected</option>
//           </select>
//         </div>

//         {isUserAdmin && (
//           <div className="filter-group">
//             <label>By Agent:</label>
//             <select value={selectedAgent} onChange={(e) => handleFilterChange(setSelectedAgent, e.target.value)}>
//               <option value="All">All Agents</option>
//               {agentsList.map(agent => (
//                 <option key={agent.id} value={agent.id}>{agent.full_name}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//           <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#fff' }}>Search Ledger:</label>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <input 
//               type="text" 
//               placeholder="Invoice, Sender/Receiver info..." 
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') handleSearchTrigger();
//               }}
//               style={{
//                 padding: '6px 12px',
//                 fontSize: '14px',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc',
//                 height: '38px',
//                 width: '240px',
//                 outline: 'none',
//                 color: '#000',
//                 background: '#fff'
//               }}
//             />
//             <button
//               onClick={handleSearchTrigger}
//               style={{
//                 height: '38px',
//                 padding: '0 16px',
//                 backgroundColor: '#2563eb',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontWeight: '500',
//                 fontSize: '14px',
//                 cursor: 'pointer'
//               }}
//             >
//               Search
//             </button>
//             {activeSearch && (
//               <button onClick={handleClearSearch} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>

//         <button
//           onClick={() => {
//             setIsSelectionMode(!isSelectionMode);
//             setSelectedTrackingIds([]); 
//           }}
//           style={{
//             height: '38px',
//             padding: '0 16px',
//             backgroundColor: isSelectionMode ? '#059669' : '#4b5563',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             fontWeight: '500',
//             fontSize: '14px',
//             cursor: 'pointer',
//             transition: 'all 0.2s'
//           }}
//         >
//           {isSelectionMode ? '✅ Selection Mode Active' : '☑️ Select Multiple'}
//         </button>
//       </div>

//       {/* Floating Batch Action Tray */}
//       {isSelectionMode && selectedTrackingIds.length > 0 && (
//         <div style={{
//           margin: '15px 0',
//           padding: '12px 20px',
//           backgroundColor: '#1e293b',
//           borderLeft: '4px solid #3b82f6',
//           borderRadius: '6px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           animation: 'fadeIn 0.2s ease-in-out'
//         }}>
//           <span style={{ fontSize: '14px', fontWeight: '500', color: '#f1f5f9' }}>
//             Selected <strong>{selectedTrackingIds.length}</strong> items for batch operations:
//           </span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
//             {/* Action Group 1: Change Status dropdown */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={{ fontSize: '13px', color: '#cbd5e1' }}>Change Status:</label>
//               <select
//                 onChange={(e) => {
//                   if(e.target.value !== "") {
//                     handleBatchStatusChange(e.target.value);
//                     e.target.value = ""; 
//                   }
//                 }}
//                 style={{
//                   padding: '6px 12px',
//                   fontSize: '13px',
//                   borderRadius: '4px',
//                   border: '1px solid #475569',
//                   backgroundColor: '#0f172a',
//                   color: '#fff',
//                   cursor: 'pointer'
//                 }}
//               >
//                 <option value="">-- Choose Status --</option>
//                 <option value="Confirmed">Confirmed</option>
//                 <option value="In Transit">In Transit</option>
//                 <option value="Landed">Landed</option>
//                 <option value="Ready to Collect">Ready to Collect</option>
//                 <option value="Collected">Collected</option>
//               </select>
//             </div>

//             {/* Delete Button */}
//             <button
//               onClick={handleBatchDelete}
//               style={{
//                 height: '32px',
//                 padding: '0 14px',
//                 backgroundColor: '#dc2626',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontWeight: '500',
//                 fontSize: '13px',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.2s'
//               }}
//               onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
//               onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
//             >
//               🗑️ Delete Selected
//             </button>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="loader">Loading Shipments...</div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="shipment-table">
//               <thead>
//                 <tr>
//                   {isSelectionMode && (
//                     <th style={{ width: '40px', textAlign: 'center' }}>
//                       <input 
//                         type="checkbox" 
//                         onChange={handleSelectAllToggle}
//                         checked={shipments.length > 0 && selectedTrackingIds.length === shipments.map(s => s.tracking_id).filter(Boolean).length}
//                         style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
//                       />
//                     </th>
//                   )}
//                   <th>Invoice #</th>
//                   {isUserAdmin && <th>Created By</th>}
//                   <th>Date</th>
//                   <th>Sender</th>
//                   <th>Sender Contact</th>            
//                   <th>Receiver</th>
//                   <th>Receiver Contact</th>
//                   <th>Status</th>
//                   {isUserAdmin && <th>Status Action</th>}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.length > 0 ? (
//                   shipments.map((s) => (
//                     <tr key={s.tracking_id || s.id} style={{ backgroundColor: selectedTrackingIds.includes(s.tracking_id) ? '#1e293b' : 'transparent' }}>
                      
//                       {isSelectionMode && (
//                         <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                           <input 
//                             type="checkbox" 
//                             checked={selectedTrackingIds.includes(s.tracking_id)}
//                             onChange={() => handleRowSelectToggle(s.tracking_id)}
//                             disabled={!s.tracking_id}
//                             style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
//                           />
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.tracking_id || 'N/A'}</td> 
                      
//                       {isUserAdmin && (
//                         <td style={{ fontWeight: '400', color: '#f3f2f2' }}>
//                           {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_contact_num || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_contact || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}><span className="badge-status">{s.status || 'Pending'}</span></td>
                      
//                       {isUserAdmin && (
//                         <td>
//                           <select 
//                             value={s.status || 'Confirmed'} 
//                             disabled={statusUpdatingMap[s.tracking_id]}
//                             onChange={(e) => handleInlineStatusChange(s, e.target.value)}
//                             style={{ 
//                               padding: '5px 10px', 
//                               fontSize: '13px', 
//                               borderRadius: '4px', 
//                               border: '1px solid #ccc',
//                               background: statusUpdatingMap[s.tracking_id] ? '#e9e9e9' : '#fff',
//                               color: '#000',
//                               cursor: statusUpdatingMap[s.tracking_id] ? 'not-allowed' : 'pointer',
//                               outline: 'none'
//                             }}
//                           >
//                             <option value="Confirmed">Confirmed</option>
//                             <option value="In Transit">In Transit</option>
//                             <option value="Landed">Landed</option>
//                             <option value="Ready to Collect">Ready to Collect</option>
//                             <option value="Collected">Collected</option>
//                           </select>
//                         </td>
//                       )}

//                       <td>
//                         <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={totalActiveColumns} style={{ textAlign: 'center', padding: '20px' }}>
//                       No shipments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* 🔘 Gmail Style Pagination Controls */}
//           <div className="pagination-container">
//             <span className="pagination-info">
//               {startItem}–{endItem} of {totalItems.toLocaleString()}
//             </span>
//             <div className="pagination-buttons">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 ‹
//               </button>
//               <button 
//                 onClick={() => setCurrentPage(prev => (endItem < totalItems ? prev + 1 : prev))}
//                 disabled={endItem >= totalItems}
//                 className="pagination-btn"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;



// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 

// import "/src/styles/ViewShipments.css";

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   // 🎛️ Filter and Pagination State
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedAgent, setSelectedAgent] = useState('All');
//   const [agentsList, setAgentsList] = useState([]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const itemsPerPage = 50; 

//   // ⚡ Inline Status Updating State Map tracking individual row executions
//   const [statusUpdatingMap, setStatusUpdatingMap] = useState({});

//   const currentRole = (user?.role || '').toLowerCase();
//   const isUserAdmin = currentRole === 'admin';

//   // Search State Variables
//   const [searchInput, setSearchInput] = useState('');
//   const [activeSearch, setActiveSearch] = useState('');

//   // Multi-Select System States
//   const [isSelectionMode, setIsSelectionMode] = useState(false);
//   const [selectedTrackingIds, setSelectedTrackingIds] = useState([]);

//   // 🌟 NEW: Reactive Feedback & Custom Dialog States
//   const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }
//   const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false });

//   // Helper utility to trigger auto-dismissing notifications
//   const showNotification = (type, message) => {
//     setFeedback({ type, message });
//     setTimeout(() => {
//       setFeedback(null);
//     }, 4500); // Auto-dismiss after 4.5 seconds
//   };

//   useEffect(() => {
//     const fetchAgentsList = async () => {
//       try {
//         const response = await fetch('https://sewaro-backend.onrender.com/api/admin/agents');
//         if (response.ok) {
//           const data = await response.json();
//           setAgentsList(data);
//         }
//       } catch (err) {
//         console.error("Failed downloading agent database list:", err);
//       }
//     };
//     if (isUserAdmin) fetchAgentsList();
//   }, [isUserAdmin]);

//   // Fetch shipments when user, filters, OR current page changes
//   const fetchShipments = async () => {
//     setLoading(true);
//     const cleanUserId = user?.id || user?.userId;
//     const cleanRole = user?.role || '';
//     try {
//       let url = `https://sewaro-backend.onrender.com/api/shipments/all?userId=${cleanUserId}&role=${cleanRole}&page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(activeSearch)}`; 
      
//       if (dateFrom) url += `&dateFrom=${dateFrom}`;
//       if (dateTo) url += `&dateTo=${dateTo}`;
//       if (status !== 'All') url += `&status=${status}`;
//       if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

//       const response = await fetch(url);
//       if (!response.ok) throw new Error('Failed to fetch');
      
//       const data = await response.json();
      
//       setShipments(Array.isArray(data.shipments) ? data.shipments : []);
//       setTotalItems(data.totalItems || 0);
      
//       // Clear selections automatically when moving across pages or filtering
//       setSelectedTrackingIds([]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setShipments([]); 
//       setTotalItems(0);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (user) fetchShipments();
//   }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage, activeSearch]);

//   // 🚀 Inline Status Update Handler for Admins
//   const handleInlineStatusChange = async (shipment, newStatus) => {
//     const trackingId = shipment.tracking_id;
//     if (!trackingId) return;

//     try {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: true }));

//       const updatedPayload = {
//         ...shipment,
//         status: newStatus
//       };

//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedPayload)
//       });

//       if (!response.ok) throw new Error("The operational backend core rejected your fast status modification.");

//       setShipments(prevShipments => 
//         prevShipments.map(s => s.tracking_id === trackingId ? { ...s, status: newStatus } : s)
//       );
      
//       showNotification('success', `📈 Shipment ${trackingId} successfully transitioned to "${newStatus}".`);
//     } catch (err) {
//       console.error("Inline update failure:", err);
//       showNotification('error', `❌ Status Transition Failed: ${err.message}`);
//     } finally {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: false }));
//     }
//   };

//   // Batch Status Updater for Selected Items
//   const handleBatchStatusChange = async (newStatus) => {
//     if (selectedTrackingIds.length === 0) return;

//     setLoading(true);
//     try {
//       const updatePromises = selectedTrackingIds.map(async (id) => {
//         const fullShipmentObj = shipments.find(s => s.tracking_id === id);
//         if (!fullShipmentObj) return;

//         return fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ ...fullShipmentObj, status: newStatus })
//         });
//       });

//       await Promise.all(updatePromises);
//       showNotification('success', `🎉 Successfully synchronized status to "${newStatus}" across ${selectedTrackingIds.length} records!`);
//       setSelectedTrackingIds([]);
//       fetchShipments();
//     } catch (err) {
//       console.error("Batch update transaction anomaly:", err);
//       showNotification('error', "❌ Batch Status Update Action Failed.");
//       setLoading(false);
//     }
//   };

//   // 🌟 Batch Purge/Deletion Request Execution Core
//   const handleBatchDeleteExecute = async () => {
//     // Hide the custom confirmation dialog matrix
//     setDeleteConfirmation({ show: false });
//     setLoading(true);
    
//     try {
//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/bulk-delete`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ trackingIds: selectedTrackingIds })
//       });

//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.error || "The server rejected the transaction matrix request.");
//       }

//       showNotification('success', `🗑️ Purge complete. Successfully deleted ${selectedTrackingIds.length} shipments.`);
//       setSelectedTrackingIds([]);
//       setIsSelectionMode(false);
//       setCurrentPage(1); 
//       fetchShipments(); 
//     } catch (err) {
//       console.error("Batch removal failure:", err);
//       showNotification('error', `❌ Purge Execution Failed: ${err.message}`);
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (setter, value) => {
//     setter(value);
//     setCurrentPage(1);
//   };

//   const handleSearchTrigger = () => {
//     setActiveSearch(searchInput);
//     setCurrentPage(1);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     setActiveSearch('');
//     setCurrentPage(1);
//   };

//   const handleResetFilters = () => {
//     setDateFrom('');
//     setDateTo('');
//     setStatus('All');
//     setSelectedAgent('All');
//     setSearchInput('');
//     setActiveSearch('');
//     setIsSelectionMode(false);
//     setSelectedTrackingIds([]);
//     setCurrentPage(1);
//   };

//   // Row Checking Event Matrix Computations
//   const handleSelectAllToggle = () => {
//     const allCurrentIds = shipments.map(s => s.tracking_id).filter(Boolean);
//     if (selectedTrackingIds.length === allCurrentIds.length) {
//       setSelectedTrackingIds([]); 
//     } else {
//       setSelectedTrackingIds(allCurrentIds); 
//     }
//   };

//   const handleRowSelectToggle = (trackingId) => {
//     setSelectedTrackingIds(prev => 
//       prev.includes(trackingId) 
//         ? prev.filter(id => id !== trackingId) 
//         : [...prev, trackingId]
//     );
//   };

//   // Pagination Helper Values
//   const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   const totalActiveColumns = 9 + (isUserAdmin ? 2 : 0) + (isSelectionMode ? 1 : 0);

//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => {
//           setActiveTrackingId(null);
//           fetchShipments(); 
//         }} 
//         user={user}
//       />
//     );
//   }

//   return (
//     <div className="view-shipments-container" style={{ position: 'relative' }}>
//       <h2>📦 Shipment History</h2>

//       {/* 🌟 REACT NOTIFICATION BANNER (Replaces alert) */}
//       {feedback && (
//         <div style={{
//           padding: '12px 20px',
//           marginBottom: '20px',
//           borderRadius: '6px',
//           fontSize: '14px',
//           fontWeight: '500',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           backgroundColor: feedback.type === 'success' ? '#065f46' : '#991b1b',
//           color: '#ffffff',
//           borderLeft: `5px solid ${feedback.type === 'success' ? '#34d399' : '#f87171'}`,
//           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
//           transition: 'all 0.3s ease'
//         }}>
//           <span>{feedback.message}</span>
//           <button 
//             onClick={() => setFeedback(null)} 
//             style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', marginLeft: '10px' }}
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       {/* 🌟 CUSTOM MODAL OVERLAY DIALOG (Replaces window.confirm) */}
//       {deleteConfirmation.show && (
//         <div style={{
//           position: 'fixed',
//           top: 0, left: 0, right: 0, bottom: 0,
//           backgroundColor: 'rgba(15, 23, 42, 0.85)',
//           backdropFilter: 'blur(4px)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           zIndex: 10000
//         }}>
//           <div style={{
//             backgroundColor: '#1e293b',
//             padding: '25px',
//             borderRadius: '8px',
//             maxWidth: '500px',
//             width: '90%',
//             border: '1px solid #334155',
//             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
//           }}>
//             <h3 style={{ color: '#ef4444', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
//               ⚠️ CRITICAL ACTION REQUIRED
//             </h3>
//             <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
//               Are you sure you want to permanently <strong>DELETE {selectedTrackingIds.length}</strong> selected shipments, including all nested packages and items inside them?
//             </p>
//             <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', margin: '10px 0 0 0' }}>
//               This structural database truncation action cannot be undone.
//             </p>
//             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
//               <button 
//                 onClick={() => setDeleteConfirmation({ show: false })}
//                 style={{ padding: '8px 16px', background: '#475569', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleBatchDeleteExecute}
//                 style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}
//               >
//                 Confirm Permanent Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* 🛠️ Dynamic Controls Dashboard Section */}
//       <div className="filters-control-panel" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '15px' }}>
//         <div className="filter-group">
//           <label>Date From:</label>
//           <input type="date" value={dateFrom} onChange={(e) => handleFilterChange(setDateFrom, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Date To:</label>
//           <input type="date" value={dateTo} onChange={(e) => handleFilterChange(setDateTo, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Status:</label>
//           <select value={status} onChange={(e) => handleFilterChange(setStatus, e.target.value)}>
//             <option value="All">All Statuses</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Transit">In Transit</option>
//             <option value="Landed">Landed</option>
//             <option value="Ready to Collect">Ready to Collect</option>
//             <option value="Collected">Collected</option>
//           </select>
//         </div>

//         {isUserAdmin && (
//           <div className="filter-group">
//             <label>By Agent:</label>
//             <select value={selectedAgent} onChange={(e) => handleFilterChange(setSelectedAgent, e.target.value)}>
//               <option value="All">All Agents</option>
//               {agentsList.map(agent => (
//                 <option key={agent.id} value={agent.id}>{agent.full_name}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//           <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#fff' }}>Search Ledger:</label>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <input 
//               type="text" 
//               placeholder="Invoice, Sender/Receiver info..." 
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') handleSearchTrigger();
//               }}
//               style={{
//                 padding: '6px 12px',
//                 fontSize: '14px',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc',
//                 height: '38px',
//                 width: '240px',
//                 outline: 'none',
//                 color: '#000',
//                 background: '#fff'
//               }}
//             />
//             <button
//               onClick={handleSearchTrigger}
//               style={{
//                 height: '38px',
//                 padding: '0 16px',
//                 backgroundColor: '#2563eb',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontWeight: '500',
//                 fontSize: '14px',
//                 cursor: 'pointer'
//               }}
//             >
//               Search
//             </button>
//             {activeSearch && (
//               <button onClick={handleClearSearch} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>

//         <button
//           onClick={() => {
//             setIsSelectionMode(!isSelectionMode);
//             setSelectedTrackingIds([]); 
//           }}
//           style={{
//             height: '38px',
//             padding: '0 16px',
//             backgroundColor: isSelectionMode ? '#059669' : '#4b5563',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             fontWeight: '500',
//             fontSize: '14px',
//             cursor: 'pointer',
//             transition: 'all 0.2s'
//           }}
//         >
//           {isSelectionMode ? '✅ Selection Mode Active' : '☑️ Select Multiple'}
//         </button>
//       </div>

//       {/* Floating Batch Action Tray */}
//       {isSelectionMode && selectedTrackingIds.length > 0 && (
//         <div style={{
//           margin: '15px 0',
//           padding: '12px 20px',
//           backgroundColor: '#1e293b',
//           borderLeft: '4px solid #3b82f6',
//           borderRadius: '6px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           animation: 'fadeIn 0.2s ease-in-out'
//         }}>
//           <span style={{ fontSize: '14px', fontWeight: '500', color: '#f1f5f9' }}>
//             Selected <strong>{selectedTrackingIds.length}</strong> items for batch operations:
//           </span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
//             {/* Action Group 1: Change Status dropdown */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={{ fontSize: '13px', color: '#cbd5e1' }}>Change Status:</label>
//               <select
//                 onChange={(e) => {
//                   if(e.target.value !== "") {
//                     handleBatchStatusChange(e.target.value);
//                     e.target.value = ""; 
//                   }
//                 }}
//                 style={{
//                   padding: '6px 12px',
//                   fontSize: '13px',
//                   borderRadius: '4px',
//                   border: '1px solid #475569',
//                   backgroundColor: '#0f172a',
//                   color: '#fff',
//                   cursor: 'pointer'
//                 }}
//               >
//                 <option value="">-- Choose Status --</option>
//                 <option value="Confirmed">Confirmed</option>
//                 <option value="In Transit">In Transit</option>
//                 <option value="Landed">Landed</option>
//                 <option value="Ready to Collect">Ready to Collect</option>
//                 <option value="Collected">Collected</option>
//               </select>
//             </div>

//             {/* Triggers custom built overlay dialog panel safely */}
//             <button
//               onClick={() => setDeleteConfirmation({ show: true })}
//               style={{
//                 height: '32px',
//                 padding: '0 14px',
//                 backgroundColor: '#dc2626',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontWeight: '500',
//                 fontSize: '13px',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.2s'
//               }}
//               onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
//               onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
//             >
//               🗑️ Delete Selected
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Table & Pagination Structure */}
//       {loading ? (
//         <div className="loader">Loading Shipments...</div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="shipment-table">
//               <thead>
//                 <tr>
//                   {isSelectionMode && (
//                     <th style={{ width: '40px', textAlign: 'center' }}>
//                       <input 
//                         type="checkbox" 
//                         onChange={handleSelectAllToggle}
//                         checked={shipments.length > 0 && selectedTrackingIds.length === shipments.map(s => s.tracking_id).filter(Boolean).length}
//                         style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
//                       />
//                     </th>
//                   )}
//                   <th>Invoice #</th>
//                   {isUserAdmin && <th>Created By</th>}
//                   <th>Date</th>
//                   <th>Sender</th>
//                   <th>Sender Contact</th>            
//                   <th>Receiver</th>
//                   <th>Receiver Contact</th>
//                   <th>Status</th>
//                   {isUserAdmin && <th>Status Action</th>}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.length > 0 ? (
//                   shipments.map((s) => (
//                     <tr key={s.tracking_id || s.id} style={{ backgroundColor: selectedTrackingIds.includes(s.tracking_id) ? '#1e293b' : 'transparent' }}>
                      
//                       {isSelectionMode && (
//                         <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                           <input 
//                             type="checkbox" 
//                             checked={selectedTrackingIds.includes(s.tracking_id)}
//                             onChange={() => handleRowSelectToggle(s.tracking_id)}
//                             disabled={!s.tracking_id}
//                             style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
//                           />
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.tracking_id || 'N/A'}</td> 
                      
//                       {isUserAdmin && (
//                         <td style={{ fontWeight: '400', color: '#f3f2f2' }}>
//                           {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_contact_num || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_contact || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}><span className="badge-status">{s.status || 'Pending'}</span></td>
                      
//                       {isUserAdmin && (
//                         <td>
//                           <select 
//                             value={s.status || 'Confirmed'} 
//                             disabled={statusUpdatingMap[s.tracking_id]}
//                             onChange={(e) => handleInlineStatusChange(s, e.target.value)}
//                             style={{ 
//                               padding: '5px 10px', 
//                               fontSize: '13px', 
//                               borderRadius: '4px', 
//                               border: '1px solid #ccc',
//                               background: statusUpdatingMap[s.tracking_id] ? '#e9e9e9' : '#fff',
//                               color: '#000',
//                               cursor: statusUpdatingMap[s.tracking_id] ? 'not-allowed' : 'pointer',
//                               outline: 'none'
//                             }}
//                           >
//                             <option value="Confirmed">Confirmed</option>
//                             <option value="In Transit">In Transit</option>
//                             <option value="Landed">Landed</option>
//                             <option value="Ready to Collect">Ready to Collect</option>
//                             <option value="Collected">Collected</option>
//                           </select>
//                         </td>
//                       )}

//                       <td>
//                         <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={totalActiveColumns} style={{ textAlign: 'center', padding: '20px' }}>
//                       No shipments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* 🔘 Gmail Style Pagination Controls */}
//           <div className="pagination-container">
//             <span className="pagination-info">
//               {startItem}–{endItem} of {totalItems.toLocaleString()}
//             </span>
//             <div className="pagination-buttons">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 ‹
//               </button>
//               <button 
//                 onClick={() => setCurrentPage(prev => (endItem < totalItems ? prev + 1 : prev))}
//                 disabled={endItem >= totalItems}
//                 className="pagination-btn"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;


// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 

// import "/src/styles/ViewShipments.css";

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   // 🎛️ Filter and Pagination State
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedAgent, setSelectedAgent] = useState('All');
//   const [agentsList, setAgentsList] = useState([]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const itemsPerPage = 50; 

//   // ⚡ Inline Status Updating State Map tracking individual row executions
//   const [statusUpdatingMap, setStatusUpdatingMap] = useState({});

//   const currentRole = (user?.role || '').toLowerCase();
//   const isUserAdmin = currentRole === 'admin';

//   // Search State Variables
//   const [searchInput, setSearchInput] = useState('');
//   const [activeSearch, setActiveSearch] = useState('');

//   // Multi-Select System States
//   const [isSelectionMode, setIsSelectionMode] = useState(false);
//   const [selectedTrackingIds, setSelectedTrackingIds] = useState([]);

//   // 🌟 NEW: Reactive Feedback & Custom Dialog States
//   const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }
//   const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false });

//   // Helper utility to trigger auto-dismissing notifications
//   const showNotification = (type, message) => {
//     setFeedback({ type, message });
//     setTimeout(() => {
//       setFeedback(null);
//     }, 4500); // Auto-dismiss after 4.5 seconds
//   };

//   useEffect(() => {
//     const fetchAgentsList = async () => {
//       try {
//         const response = await fetch('https://sewaro-backend.onrender.com/api/admin/agents');
//         if (response.ok) {
//           const data = await response.json();
//           setAgentsList(data);
//         }
//       } catch (err) {
//         console.error("Failed downloading agent database list:", err);
//       }
//     };
//     if (isUserAdmin) fetchAgentsList();
//   }, [isUserAdmin]);

//   // Fetch shipments when user, filters, OR current page changes
//   const fetchShipments = async () => {
//     setLoading(true);
//     const cleanUserId = user?.id || user?.userId;
//     const cleanRole = user?.role || '';
//     try {
//       let url = `https://sewaro-backend.onrender.com/api/shipments/all?userId=${cleanUserId}&role=${cleanRole}&page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(activeSearch)}`; 
      
//       if (dateFrom) url += `&dateFrom=${dateFrom}`;
//       if (dateTo) url += `&dateTo=${dateTo}`;
//       if (status !== 'All') url += `&status=${status}`;
//       if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

//       const response = await fetch(url);
//       if (!response.ok) throw new Error('Failed to fetch');
      
//       const data = await response.json();
      
//       setShipments(Array.isArray(data.shipments) ? data.shipments : []);
//       setTotalItems(data.totalItems || 0);
      
//       // Clear selections automatically when moving across pages or filtering
//       setSelectedTrackingIds([]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setShipments([]); 
//       setTotalItems(0);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (user) fetchShipments();
//   }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage, activeSearch]);

//   // 🚀 Inline Status Update Handler for Admins
//   const handleInlineStatusChange = async (shipment, newStatus) => {
//     const trackingId = shipment.tracking_id;
//     if (!trackingId) return;

//     try {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: true }));

//       const updatedPayload = {
//         ...shipment,
//         status: newStatus
//       };

//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedPayload)
//       });

//       if (!response.ok) throw new Error("The operational backend core rejected your fast status modification.");

//       setShipments(prevShipments => 
//         prevShipments.map(s => s.tracking_id === trackingId ? { ...s, status: newStatus } : s)
//       );
      
//       showNotification('success', `📈 Shipment ${trackingId} successfully transitioned to "${newStatus}".`);
//     } catch (err) {
//       console.error("Inline update failure:", err);
//       showNotification('error', `❌ Status Transition Failed: ${err.message}`);
//     } finally {
//       setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: false }));
//     }
//   };

//   // Batch Status Updater for Selected Items
//   const handleBatchStatusChange = async (newStatus) => {
//     if (selectedTrackingIds.length === 0) return;

//     setLoading(true);
//     try {
//       const updatePromises = selectedTrackingIds.map(async (id) => {
//         const fullShipmentObj = shipments.find(s => s.tracking_id === id);
//         if (!fullShipmentObj) return;

//         return fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ ...fullShipmentObj, status: newStatus })
//         });
//       });

//       await Promise.all(updatePromises);
//       showNotification('success', `🎉 Successfully synchronized status to "${newStatus}" across ${selectedTrackingIds.length} records!`);
//       setSelectedTrackingIds([]);
//       fetchShipments();
//     } catch (err) {
//       console.error("Batch update transaction anomaly:", err);
//       showNotification('error', "❌ Batch Status Update Action Failed.");
//       setLoading(false);
//     }
//   };

//   // 🌟 Batch Purge/Deletion Request Execution Core
//   const handleBatchDeleteExecute = async () => {
//     // Hide the custom confirmation dialog matrix
//     setDeleteConfirmation({ show: false });
//     setLoading(true);
    
//     try {
//       const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/bulk-delete`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ trackingIds: selectedTrackingIds })
//       });

//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.error || "The server rejected the transaction matrix request.");
//       }

//       showNotification('success', `🗑️ Purge complete. Successfully deleted ${selectedTrackingIds.length} shipments.`);
//       setSelectedTrackingIds([]);
//       setIsSelectionMode(false);
//       setCurrentPage(1); 
//       fetchShipments(); 
//     } catch (err) {
//       console.error("Batch removal failure:", err);
//       showNotification('error', `❌ Purge Execution Failed: ${err.message}`);
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (setter, value) => {
//     setter(value);
//     setCurrentPage(1);
//   };

//   const handleSearchTrigger = () => {
//     setActiveSearch(searchInput);
//     setCurrentPage(1);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     setActiveSearch('');
//     setCurrentPage(1);
//   };

//   const handleResetFilters = () => {
//     setDateFrom('');
//     setDateTo('');
//     setStatus('All');
//     setSelectedAgent('All');
//     setSearchInput('');
//     setActiveSearch('');
//     setIsSelectionMode(false);
//     setSelectedTrackingIds([]);
//     setCurrentPage(1);
//   };

//   // Row Checking Event Matrix Computations
//   const handleSelectAllToggle = () => {
//     const allCurrentIds = shipments.map(s => s.tracking_id).filter(Boolean);
//     if (selectedTrackingIds.length === allCurrentIds.length) {
//       setSelectedTrackingIds([]); 
//     } else {
//       setSelectedTrackingIds(allCurrentIds); 
//     }
//   };

//   const handleRowSelectToggle = (trackingId) => {
//     setSelectedTrackingIds(prev => 
//       prev.includes(trackingId) 
//         ? prev.filter(id => id !== trackingId) 
//         : [...prev, trackingId]
//     );
//   };

//   // Pagination Helper Values
//   const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   const totalActiveColumns = 9 + (isUserAdmin ? 2 : 0) + (isSelectionMode ? 1 : 0);

//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => {
//           setActiveTrackingId(null);
//           fetchShipments(); 
//         }} 
//         user={user}
//       />
//     );
//   }

//   return (
//     <div className="view-shipments-container" style={{ position: 'relative' }}>
//       <h2>📦 Shipment History</h2>

//       {/* 🌟 REACT NOTIFICATION BANNER (Replaces alert) */}
//       {feedback && (
//         <div style={{
//           padding: '12px 20px',
//           marginBottom: '20px',
//           borderRadius: '6px',
//           fontSize: '14px',
//           fontWeight: '500',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           backgroundColor: feedback.type === 'success' ? '#065f46' : '#991b1b',
//           color: '#ffffff',
//           borderLeft: `5px solid ${feedback.type === 'success' ? '#34d399' : '#f87171'}`,
//           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
//           transition: 'all 0.3s ease'
//         }}>
//           <span>{feedback.message}</span>
//           <button 
//             onClick={() => setFeedback(null)} 
//             style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', marginLeft: '10px' }}
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       {/* 🌟 CUSTOM MODAL OVERLAY DIALOG (Replaces window.confirm) */}
//       {deleteConfirmation.show && (
//         <div style={{
//           position: 'fixed',
//           top: 0, left: 0, right: 0, bottom: 0,
//           backgroundColor: 'rgba(15, 23, 42, 0.85)',
//           backdropFilter: 'blur(4px)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           zIndex: 10000
//         }}>
//           <div style={{
//             backgroundColor: '#1e293b',
//             padding: '25px',
//             borderRadius: '8px',
//             maxWidth: '500px',
//             width: '90%',
//             border: '1px solid #334155',
//             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
//           }}>
//             <h3 style={{ color: '#ef4444', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
//               ⚠️ CRITICAL ACTION REQUIRED
//             </h3>
//             <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
//               Are you sure you want to permanently <strong>DELETE {selectedTrackingIds.length}</strong> selected shipments, including all nested packages and items inside them?
//             </p>
//             <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', margin: '10px 0 0 0' }}>
//               This structural database truncation action cannot be undone.
//             </p>
//             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
//               <button 
//                 onClick={() => setDeleteConfirmation({ show: false })}
//                 style={{ padding: '8px 16px', background: '#475569', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleBatchDeleteExecute}
//                 style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}
//               >
//                 Confirm Permanent Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* 🛠️ Dynamic Controls Dashboard Section */}
//       <div className="filters-control-panel" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '15px' }}>
//         <div className="filter-group">
//           <label>Date From:</label>
//           <input type="date" value={dateFrom} onChange={(e) => handleFilterChange(setDateFrom, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Date To:</label>
//           <input type="date" value={dateTo} onChange={(e) => handleFilterChange(setDateTo, e.target.value)} />
//         </div>
//         <div className="filter-group">
//           <label>Status:</label>
//           <select value={status} onChange={(e) => handleFilterChange(setStatus, e.target.value)}>
//             <option value="All">All Statuses</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Transit">In Transit</option>
//             <option value="Landed">Landed</option>
//             <option value="Ready to Collect">Ready to Collect</option>
//             <option value="Collected">Collected</option>
//           </select>
//         </div>

//         {isUserAdmin && (
//           <div className="filter-group">
//             <label>By Agent:</label>
//             <select value={selectedAgent} onChange={(e) => handleFilterChange(setSelectedAgent, e.target.value)}>
//               <option value="All">All Agents</option>
//               {agentsList.map(agent => (
//                 <option key={agent.id} value={agent.id}>{agent.full_name}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//           <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#fff' }}>Search Ledger:</label>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <input 
//               type="text" 
//               placeholder="Invoice, Sender/Receiver info..." 
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') handleSearchTrigger();
//               }}
//               style={{
//                 padding: '6px 12px',
//                 fontSize: '14px',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc',
//                 height: '38px',
//                 width: '240px',
//                 outline: 'none',
//                 color: '#000',
//                 background: '#fff'
//               }}
//             />
//             <button
//               onClick={handleSearchTrigger}
//               style={{
//                 height: '38px',
//                 padding: '0 16px',
//                 backgroundColor: '#2563eb',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontWeight: '500',
//                 fontSize: '14px',
//                 cursor: 'pointer'
//               }}
//             >
//               Search
//             </button>
//             {activeSearch && (
//               <button onClick={handleClearSearch} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>

//         {/* 🌟 MODIFIED: Only visible to admins */}
//         {isUserAdmin && (
//           <button
//             onClick={() => {
//               setIsSelectionMode(!isSelectionMode);
//               setSelectedTrackingIds([]); 
//             }}
//             style={{
//               height: '38px',
//               padding: '0 16px',
//               backgroundColor: isSelectionMode ? '#059669' : '#4b5563',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '4px',
//               fontWeight: '500',
//               fontSize: '14px',
//               cursor: 'pointer',
//               transition: 'all 0.2s'
//             }}
//           >
//             {isSelectionMode ? '✅ Selection Mode Active' : '☑️ Select Multiple'}
//           </button>
//         )}
//       </div>

//       {/* 🌟 MODIFIED: Floating Batch Action Tray wrapped with isUserAdmin confirmation */}
//       {isUserAdmin && isSelectionMode && selectedTrackingIds.length > 0 && (
//         <div style={{
//           margin: '15px 0',
//           padding: '12px 20px',
//           backgroundColor: '#1e293b',
//           borderLeft: '4px solid #3b82f6',
//           borderRadius: '6px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           animation: 'fadeIn 0.2s ease-in-out'
//         }}>
//           <span style={{ fontSize: '14px', fontWeight: '500', color: '#f1f5f9' }}>
//             Selected <strong>{selectedTrackingIds.length}</strong> items for batch operations:
//           </span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
//             {/* Action Group 1: Change Status dropdown */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={{ fontSize: '13px', color: '#cbd5e1' }}>Change Status:</label>
//               <select
//                 onChange={(e) => {
//                   if(e.target.value !== "") {
//                     handleBatchStatusChange(e.target.value);
//                     e.target.value = ""; 
//                   }
//                 }}
//                 style={{
//                   padding: '6px 12px',
//                   fontSize: '13px',
//                   borderRadius: '4px',
//                   border: '1px solid #475569',
//                   backgroundColor: '#0f172a',
//                   color: '#fff',
//                   cursor: 'pointer'
//                 }}
//               >
//                 <option value="">-- Choose Status --</option>
//                 <option value="Confirmed">Confirmed</option>
//                 <option value="In Transit">In Transit</option>
//                 <option value="Landed">Landed</option>
//                 <option value="Ready to Collect">Ready to Collect</option>
//                 <option value="Collected">Collected</option>
//               </select>
//             </div>

//             {/* Triggers custom built overlay dialog panel safely */}
//             <button
//               onClick={() => setDeleteConfirmation({ show: true })}
//               style={{
//                 height: '32px',
//                 padding: '0 14px',
//                 backgroundColor: '#dc2626',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontWeight: '500',
//                 fontSize: '13px',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.2s'
//               }}
//               onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
//               onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
//             >
//               🗑️ Delete Selected
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Table & Pagination Structure */}
//       {loading ? (
//         <div className="loader">Loading Shipments...</div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="shipment-table">
//               <thead>
//                 <tr>
//                   {isSelectionMode && (
//                     <th style={{ width: '40px', textAlign: 'center' }}>
//                       <input 
//                         type="checkbox" 
//                         onChange={handleSelectAllToggle}
//                         checked={shipments.length > 0 && selectedTrackingIds.length === shipments.map(s => s.tracking_id).filter(Boolean).length}
//                         style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
//                       />
//                     </th>
//                   )}
//                   <th>Invoice #</th>
//                   {isUserAdmin && <th>Created By</th>}
//                   <th>Date</th>
//                   <th>Sender</th>
//                   <th>Sender Contact</th>            
//                   <th>Receiver</th>
//                   <th>Receiver Contact</th>
//                   <th>Status</th>
//                   {isUserAdmin && <th>Status Action</th>}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.length > 0 ? (
//                   shipments.map((s) => (
//                     <tr key={s.tracking_id || s.id} style={{ backgroundColor: selectedTrackingIds.includes(s.tracking_id) ? '#1e293b' : 'transparent' }}>
                      
//                       {isSelectionMode && (
//                         <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                           <input 
//                             type="checkbox" 
//                             checked={selectedTrackingIds.includes(s.tracking_id)}
//                             onChange={() => handleRowSelectToggle(s.tracking_id)}
//                             disabled={!s.tracking_id}
//                             style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
//                           />
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.tracking_id || 'N/A'}</td> 
                      
//                       {isUserAdmin && (
//                         <td style={{ fontWeight: '400', color: '#f3f2f2' }}>
//                           {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
//                         </td>
//                       )}

//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_contact_num || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_name || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_contact || '—'}</td>
//                       <td style={{ fontWeight: '400', color: '#f3f2f2' }}><span className="badge-status">{s.status || 'Pending'}</span></td>
                      
//                       {isUserAdmin && (
//                         <td>
//                           <select 
//                             value={s.status || 'Confirmed'} 
//                             disabled={statusUpdatingMap[s.tracking_id]}
//                             onChange={(e) => handleInlineStatusChange(s, e.target.value)}
//                             style={{ 
//                               padding: '5px 10px', 
//                               fontSize: '13px', 
//                               borderRadius: '4px', 
//                               border: '1px solid #ccc',
//                               background: statusUpdatingMap[s.tracking_id] ? '#e9e9e9' : '#fff',
//                               color: '#000',
//                               cursor: statusUpdatingMap[s.tracking_id] ? 'not-allowed' : 'pointer',
//                               outline: 'none'
//                             }}
//                           >
//                             <option value="Confirmed">Confirmed</option>
//                             <option value="In Transit">In Transit</option>
//                             <option value="Landed">Landed</option>
//                             <option value="Ready to Collect">Ready to Collect</option>
//                             <option value="Collected">Collected</option>
//                           </select>
//                         </td>
//                       )}

//                       <td>
//                         <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={totalActiveColumns} style={{ textAlign: 'center', padding: '20px' }}>
//                       No shipments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* 🔘 Gmail Style Pagination Controls */}
//           <div className="pagination-container">
//             <span className="pagination-info">
//               {startItem}–{endItem} of {totalItems.toLocaleString()}
//             </span>
//             <div className="pagination-buttons">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 ‹
//               </button>
//               <button 
//                 onClick={() => setCurrentPage(prev => (endItem < totalItems ? prev + 1 : prev))}
//                 disabled={endItem >= totalItems}
//                 className="pagination-btn"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;

import React, { useEffect, useState } from 'react';
import ShipmentDetailView from './ShipmentDetailView'; 

import "/src/styles/ViewShipments.css";

const ViewShipments = ({ user }) => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTrackingId, setActiveTrackingId] = useState(null);

  // 🎛️ Filter and Pagination State
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [status, setStatus] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState('All');
  const [agentsList, setAgentsList] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 50; 

  // ⚡ Inline Status Updating State Map tracking individual row executions
  const [statusUpdatingMap, setStatusUpdatingMap] = useState({});

  const currentRole = (user?.role || '').toLowerCase();
  const isUserAdmin = currentRole === 'admin';

  // Search State Variables
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  // Multi-Select System States
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedTrackingIds, setSelectedTrackingIds] = useState([]);

  // 🌟 Reactive Feedback & Custom Dialog States
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false });

  // Helper utility to trigger auto-dismissing notifications
  const showNotification = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4500); // Auto-dismiss after 4.5 seconds
  };

  useEffect(() => {
    const fetchAgentsList = async () => {
      try {
        const response = await fetch('https://sewaro-backend.onrender.com/api/admin/agents');
        if (response.ok) {
          const data = await response.json();
          setAgentsList(data);
        }
      } catch (err) {
        console.error("Failed downloading agent database list:", err);
      }
    };
    if (isUserAdmin) fetchAgentsList();
  }, [isUserAdmin]);

  // Fetch shipments when user, filters, OR current page changes
  const fetchShipments = async () => {
    setLoading(true);
    const cleanUserId = user?.id || user?.userId;
    const cleanRole = user?.role || '';
    try {
      let url = `https://sewaro-backend.onrender.com/api/shipments/all?userId=${cleanUserId}&role=${cleanRole}&page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(activeSearch)}`; 
      
      if (dateFrom) url += `&dateFrom=${dateFrom}`;
      if (dateTo) url += `&dateTo=${dateTo}`;
      if (status !== 'All') url += `&status=${status}`;
      if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      
      setShipments(Array.isArray(data.shipments) ? data.shipments : []);
      setTotalItems(data.totalItems || 0);
      
      // Clear selections automatically when moving across pages or filtering
      setSelectedTrackingIds([]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setShipments([]); 
      setTotalItems(0);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (user) fetchShipments();
  }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage, activeSearch]);

  // 🚀 Inline Status Update Handler for Admins
  const handleInlineStatusChange = async (shipment, newStatus) => {
    const trackingId = shipment.tracking_id;
    if (!trackingId) return;

    try {
      setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: true }));

      const updatedPayload = {
        ...shipment,
        status: newStatus
      };

      const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${trackingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });

      if (!response.ok) throw new Error("The operational backend core rejected your fast status modification.");

      setShipments(prevShipments => 
        prevShipments.map(s => s.tracking_id === trackingId ? { ...s, status: newStatus } : s)
      );
      
      showNotification('success', `📈 Shipment ${trackingId} successfully transitioned to "${newStatus}".`);
    } catch (err) {
      console.error("Inline update failure:", err);
      showNotification('error', `❌ Status Transition Failed: ${err.message}`);
    } finally {
      setStatusUpdatingMap(prev => ({ ...prev, [trackingId]: false }));
    }
  };

  // Batch Status Updater for Selected Items
  const handleBatchStatusChange = async (newStatus) => {
    if (selectedTrackingIds.length === 0) return;

    setLoading(true);
    try {
      const updatePromises = selectedTrackingIds.map(async (id) => {
        const fullShipmentObj = shipments.find(s => s.tracking_id === id);
        if (!fullShipmentObj) return;

        return fetch(`https://sewaro-backend.onrender.com/api/shipments/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...fullShipmentObj, status: newStatus })
        });
      });

      await Promise.all(updatePromises);
      showNotification('success', `🎉 Successfully synchronized status to "${newStatus}" across ${selectedTrackingIds.length} records!`);
      setSelectedTrackingIds([]);
      fetchShipments();
    } catch (err) {
      console.error("Batch update transaction anomaly:", err);
      showNotification('error', "❌ Batch Status Update Action Failed.");
      setLoading(false);
    }
  };

  // 🌟 Batch Purge/Deletion Request Execution Core
  const handleBatchDeleteExecute = async () => {
    setDeleteConfirmation({ show: false });
    setLoading(true);
    
    try {
      const response = await fetch(`https://sewaro-backend.onrender.com/api/shipments/bulk-delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingIds: selectedTrackingIds })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "The server rejected the transaction matrix request.");
      }

      showNotification('success', `🗑️ Purge complete. Successfully deleted ${selectedTrackingIds.length} shipments.`);
      setSelectedTrackingIds([]);
      setIsSelectionMode(false);
      setCurrentPage(1); 
      fetchShipments(); 
    } catch (err) {
      console.error("Batch removal failure:", err);
      showNotification('error', `❌ Purge Execution Failed: ${err.message}`);
      setLoading(false);
    }
  };

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearchTrigger = () => {
    setActiveSearch(searchInput);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearch('');
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setDateFrom('');
    setDateTo('');
    setStatus('All');
    setSelectedAgent('All');
    setSearchInput('');
    setActiveSearch('');
    setIsSelectionMode(false);
    setSelectedTrackingIds([]);
    setCurrentPage(1);
  };

  // Row Checking Event Matrix Computations
  const handleSelectAllToggle = () => {
    const allCurrentIds = shipments.map(s => s.tracking_id).filter(Boolean);
    if (selectedTrackingIds.length === allCurrentIds.length) {
      setSelectedTrackingIds([]); 
    } else {
      setSelectedTrackingIds(allCurrentIds); 
    }
  };

  const handleRowSelectToggle = (trackingId) => {
    if (!trackingId) return;
    setSelectedTrackingIds(prev => 
      prev.includes(trackingId) 
        ? prev.filter(id => id !== trackingId) 
        : [...prev, trackingId]
    );
  };

  // Click on the overall <tr> table row handler
  const handleRowClick = (e, trackingId) => {
    if (!isSelectionMode) return;

    // Check if the click originated from inside a cell marked to ignore row clicks
    if (e.target.closest('[data-no-row-click="true"]')) {
      return; 
    }

    handleRowSelectToggle(trackingId);
  };

  // Pagination Helper Values
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const totalActiveColumns = 9 + (isUserAdmin ? 2 : 0) + (isSelectionMode ? 1 : 0);

  if (activeTrackingId) {
    return (
      <ShipmentDetailView 
        trackingId={activeTrackingId} 
        onClose={() => {
          setActiveTrackingId(null);
          fetchShipments(); 
        }} 
        user={user}
      />
    );
  }

  return (
    <div className="view-shipments-container" style={{ position: 'relative' }}>
      <h2>📦 Shipment History</h2>

      {/* 🌟 REACT NOTIFICATION BANNER */}
      {feedback && (
        <div style={{
          padding: '12px 20px',
          marginBottom: '20px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: feedback.type === 'success' ? '#065f46' : '#991b1b',
          color: '#ffffff',
          borderLeft: `5px solid ${feedback.type === 'success' ? '#34d399' : '#f87171'}`,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease'
        }}>
          <span>{feedback.message}</span>
          <button 
            onClick={() => setFeedback(null)} 
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', marginLeft: '10px' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* 🌟 CUSTOM MODAL OVERLAY DIALOG */}
      {deleteConfirmation.show && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '25px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            border: '1px solid #334155',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <h3 style={{ color: '#ef4444', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚠️ CRITICAL ACTION REQUIRED
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
              Are you sure you want to permanently <strong>DELETE {selectedTrackingIds.length}</strong> selected shipments, including all nested packages and items inside them?
            </p>
            <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', margin: '10px 0 0 0' }}>
              This structural database truncation action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button 
                onClick={() => setDeleteConfirmation({ show: false })}
                style={{ padding: '8px 16px', background: '#475569', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleBatchDeleteExecute}
                style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}
              >
                Confirm Permanent Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 🛠️ Dynamic Controls Dashboard Section */}
      <div className="filters-control-panel" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '15px' }}>
        <div className="filter-group">
          <label>Date From:</label>
          <input type="date" value={dateFrom} onChange={(e) => handleFilterChange(setDateFrom, e.target.value)} />
        </div>
        <div className="filter-group">
          <label>Date To:</label>
          <input type="date" value={dateTo} onChange={(e) => handleFilterChange(setDateTo, e.target.value)} />
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => handleFilterChange(setStatus, e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Transit">In Transit</option>
            <option value="Landed">Landed</option>
            <option value="Ready to Collect">Ready to Collect</option>
            <option value="Collected">Collected</option>
          </select>
        </div>

        {isUserAdmin && (
          <div className="filter-group">
            <label>By Agent:</label>
            <select value={selectedAgent} onChange={(e) => handleFilterChange(setSelectedAgent, e.target.value)}>
              <option value="All">All Agents</option>
              {agentsList.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.full_name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#fff' }}>Search Ledger:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Invoice, Sender/Receiver info..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchTrigger();
              }}
              style={{
                padding: '6px 12px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                height: '38px',
                width: '240px',
                outline: 'none',
                color: '#000',
                background: '#fff'
              }}
            />
            <button
              onClick={handleSearchTrigger}
              style={{
                height: '38px',
                padding: '0 16px',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: '500',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
            {activeSearch && (
              <button onClick={handleClearSearch} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
                Clear
              </button>
            )}
          </div>
        </div>

        <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>

        {isUserAdmin && (
          <button
            onClick={() => {
              setIsSelectionMode(!isSelectionMode);
              setSelectedTrackingIds([]); 
            }}
            style={{
              height: '38px',
              padding: '0 16px',
              backgroundColor: isSelectionMode ? '#059669' : '#4b5563',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {isSelectionMode ? '✅ Selection Mode Active' : '☑️ Select Multiple'}
          </button>
        )}
      </div>

      {/* Floating Batch Action Tray */}
      {isUserAdmin && isSelectionMode && selectedTrackingIds.length > 0 && (
        <div style={{
          margin: '15px 0',
          padding: '12px 20px',
          backgroundColor: '#1e293b',
          borderLeft: '4px solid #3b82f6',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#f1f5f9' }}>
            Selected <strong>{selectedTrackingIds.length}</strong> items for batch operations:
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '13px', color: '#cbd5e1' }}>Change Status:</label>
              <select
                onChange={(e) => {
                  if(e.target.value !== "") {
                    handleBatchStatusChange(e.target.value);
                    e.target.value = ""; 
                  }
                }}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  borderRadius: '4px',
                  border: '1px solid #475569',
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value="">-- Choose Status --</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In Transit">In Transit</option>
                <option value="Landed">Landed</option>
                <option value="Ready to Collect">Ready to Collect</option>
                <option value="Collected">Collected</option>
              </select>
            </div>

            <button
              onClick={() => setDeleteConfirmation({ show: true })}
              style={{
                height: '32px',
                padding: '0 14px',
                backgroundColor: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: '500',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              🗑️ Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Table & Pagination Structure */}
      {loading ? (
        <div className="loader">Loading Shipments...</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="shipment-table">
              <thead>
                <tr>
                  {isSelectionMode && (
                    <th style={{ width: '40px', textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAllToggle}
                        checked={shipments.length > 0 && selectedTrackingIds.length === shipments.map(s => s.tracking_id).filter(Boolean).length}
                        style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
                      />
                    </th>
                  )}
                  <th>Invoice #</th>
                  {isUserAdmin && <th>Created By</th>}
                  <th>Date</th>
                  <th>Sender</th>
                  <th>Sender Contact</th>            
                  <th>Receiver</th>
                  <th>Receiver Contact</th>
                  <th>Status</th>
                  {isUserAdmin && <th>Status Action</th>}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shipments.length > 0 ? (
                  shipments.map((s) => (
                    <tr 
                      key={s.tracking_id || s.id} 
                      onClick={(e) => handleRowClick(e, s.tracking_id)}
                      style={{ 
                        backgroundColor: selectedTrackingIds.includes(s.tracking_id) ? '#1e293b' : 'transparent',
                        cursor: isSelectionMode && s.tracking_id ? 'pointer' : 'default' 
                      }}
                    >
                      
                      {/* Checkbox Column - Flagged to ignore row clicks */}
                      {isSelectionMode && (
                        <td data-no-row-click="true" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedTrackingIds.includes(s.tracking_id)}
                            onChange={() => handleRowSelectToggle(s.tracking_id)}
                            disabled={!s.tracking_id}
                            style={{ cursor: 'pointer', transform: 'scale(1.15)' }}
                          />
                        </td>
                      )}

                      <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.tracking_id || 'N/A'}</td> 
                      
                      {isUserAdmin && (
                        <td style={{ fontWeight: '400', color: '#f3f2f2' }}>
                          {s.User?.full_name ? s.User.full_name : (s.user_id ? `User ID: ${s.user_id}` : 'System')}
                        </td>
                      )}

                      <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
                      <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_name || '—'}</td>
                      <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.sender_contact_num || '—'}</td>
                      <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_name || '—'}</td>
                      <td style={{ fontWeight: '400', color: '#f3f2f2' }}>{s.receiver_contact || '—'}</td>
                      <td style={{ fontWeight: '400', color: '#f3f2f2' }}><span className="badge-status">{s.status || 'Pending'}</span></td>
                      
                      {/* Status Dropdown Column - Flagged to ignore row clicks */}
                      {isUserAdmin && (
                        <td data-no-row-click="true">
                          <select 
                            value={s.status || 'Confirmed'} 
                            disabled={statusUpdatingMap[s.tracking_id]}
                            onChange={(e) => handleInlineStatusChange(s, e.target.value)}
                            style={{ 
                              padding: '5px 10px', 
                              fontSize: '13px', 
                              borderRadius: '4px', 
                              border: '1px solid #ccc',
                              background: statusUpdatingMap[s.tracking_id] ? '#e9e9e9' : '#fff',
                              color: '#000',
                              cursor: statusUpdatingMap[s.tracking_id] ? 'not-allowed' : 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Landed">Landed</option>
                            <option value="Ready to Collect">Ready to Collect</option>
                            <option value="Collected">Collected</option>
                          </select>
                        </td>
                      )}

                      {/* Details Button Column - Flagged to ignore row clicks */}
                      <td data-no-row-click="true">
                        <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={totalActiveColumns} style={{ textAlign: 'center', padding: '20px' }}>
                      No shipments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 🔘 Gmail Style Pagination Controls */}
          <div className="pagination-container">
            <span className="pagination-info">
              {startItem}–{endItem} of {totalItems.toLocaleString()}
            </span>
            <div className="pagination-buttons">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ‹
              </button>
              <button 
                onClick={() => setCurrentPage(prev => (endItem < totalItems ? prev + 1 : prev))}
                disabled={endItem >= totalItems}
                className="pagination-btn"
              >
                ›
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewShipments;