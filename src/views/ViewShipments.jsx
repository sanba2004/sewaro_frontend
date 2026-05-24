// import React, { useEffect, useState } from 'react';

// const ViewShipments = ({user}) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchShipments = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/shipments/all?userId=${user?.id}&role=${user?.role}`);
        
//         if (!response.ok) throw new Error('Failed to fetch');
        
//         const data = await response.json();
//         // Ensure we always set an array to avoid .map crashes
//         setShipments(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setShipments([]); // Fallback to empty array on error
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (user) fetchShipments();
//   }, [user]);

//   if (loading) return <div className="loader">Loading Shipments...</div>;

//   return (
//     <div className="view-shipments-container">
//       <h2>📦 Shipment History</h2>
//       <table className="shipment-table">
//         <thead>
//           <tr>
//             <th>Invoice #</th>
//             <th>Date</th>
//             <th>Sender</th>
//             <th>Sender Contact</th>            
//             <th>Receiver</th>
//             <th>Receiver Contact</th>

//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {shipments.length > 0 ? (
//             shipments.map((s) => (
//               <tr key={s.id}>
//                 {/* 1. Changed trackingId to tracking_id */}
//                 <td>{s.tracking_id}</td> 
                
//                 {/* 2. Changed date to created_at */}
//                 <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
                
//                 {/* 3. Changed senderName to sender_name */}
//                 <td>{s.sender_name}</td>
//                 <td>{s.sender_contact_num}</td>

                
//                 {/* 4. Changed receiverName to receiver_name */}
//                 <td>{s.receiver_name}</td>
//                 <td>{s.receiver_contact}</td>
 
//                 <td><span className="badge-status">{s.status || 'Pending'}</span></td>
//                 <td>
//                   <button className="view-btn">👁️ Details</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
//                 No shipments found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewShipments;
// import React, { useEffect, useState } from 'react';
// // 🌟 Step 1: Import your newly created detailed view component
// import ShipmentDetailView from './ShipmentDetailView'; 

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // 🌟 Step 2: Add state to track the active tracking ID for the details page view
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   useEffect(() => {
//     const fetchShipments = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/shipments/all?userId=${user?.id}&role=${user?.role}`);
        
//         if (!response.ok) throw new Error('Failed to fetch');
        
//         const data = await response.json();
//         setShipments(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setShipments([]); 
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (user) fetchShipments();
//   }, [user]);

//   // 🌟 Step 3: Short-circuit conditional screen swap
//   // If an active ID is selected, break out of the table view and mount the details page layout instead
//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => setActiveTrackingId(null)} 
//       />
//     );
//   }

//   if (loading) return <div className="loader">Loading Shipments...</div>;

//   return (
//     <div className="view-shipments-container">
//       <h2>📦 Shipment History</h2>
//       <table className="shipment-table">
//         <thead>
//           <tr>
//             <th>Invoice #</th>
//             <th>Date</th>
//             <th>Sender</th>
//             <th>Sender Contact</th>            
//             <th>Receiver</th>
//             <th>Receiver Contact</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {shipments.length > 0 ? (
//             shipments.map((s) => (
//               <tr key={s.id}>
//                 <td>{s.tracking_id}</td> 
//                 <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                 <td>{s.sender_name}</td>
//                 <td>{s.sender_contact_num}</td>
//                 <td>{s.receiver_name}</td>
//                 <td>{s.receiver_contact}</td>
//                 <td><span className="badge-status">{s.status || 'Pending'}</span></td>
//                 <td>
//                   {/* 🌟 Step 4: Update click handler to update tracking state hook */}
//                   <button 
//                     className="view-btn" 
//                     onClick={() => setActiveTrackingId(s.tracking_id || s.id)}
//                   >
//                     👁️ Details
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               {/* 🌟 Quick Fix: Bumped colSpan up to 8 matching the total thead th length */}
//               <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
//                 No shipments found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewShipments;









//original code
// import React, { useEffect, useState } from 'react';
// // 🌟 Step 1: Import your newly created detailed view component
// import ShipmentDetailView from './ShipmentDetailView'; 
// import './ViewShipments.css';

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // 🌟 Step 2: Add state to track the active tracking ID for the details page view
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   useEffect(() => {
//     const fetchShipments = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/shipments/all?userId=${user?.id}&role=${user?.role}`);
        
//         if (!response.ok) throw new Error('Failed to fetch');
        
//         const data = await response.json();
//         setShipments(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setShipments([]); 
//       } finally {
//         setLoading(false); 
//       }
//     };
//     if (user) fetchShipments();
//   }, [user]);

//   // 🌟 Step 3: Short-circuit conditional screen swap
//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => setActiveTrackingId(null)} 
//         user={user}
//       />
//     );
//   }

//   if (loading) return <div className="loader">Loading Shipments...</div>;

//   return (
//     <div className="view-shipments-container">
//       <h2>📦 Shipment History</h2>
      
//       {/* 🌟 THE INNER WRAPPER TO HANDLE HORIZONTAL SCROLLING SAFELY */}
//       <div className="table-responsive">
//         <table className="shipment-table">
//           <thead>
//             <tr>
//               <th>Invoice #</th>
//               <th>Date</th>
//               <th>Sender</th>
//               <th>Sender Contact</th>            
//               <th>Receiver</th>
//               <th>Receiver Contact</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shipments.length > 0 ? (
//               shipments.map((s) => (
//                 <tr key={s.id}>
//                   <td>{s.tracking_id || 'N/A'}</td> 
//                   <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                   <td>{s.sender_name || '—'}</td>
//                   <td>{s.sender_contact_num || '—'}</td>
//                   <td>{s.receiver_name || '—'}</td>
//                   <td>{s.receiver_contact || '—'}</td>
//                   <td>
//                     <span className="badge-status">
//                       {s.status || 'Pending'}
//                     </span>
//                   </td>
//                   <td>
//                     <button 
//                       className="view-btn" 
//                       disabled={!s.tracking_id}
//                       onClick={() => setActiveTrackingId(s.tracking_id)}
//                       style={{ opacity: s.tracking_id ? 1 : 0.4, cursor: s.tracking_id ? 'pointer' : 'not-allowed' }}
//                     >
//                       👁️ Details
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
//                   No shipments found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewShipments;






// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 
// import './ViewShipments.css';

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   // 🎛️ Filter Parameters State Management
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedAgent, setSelectedAgent] = useState('All');
//   const [agentsList, setAgentsList] = useState([]);

//   const isUserAdmin = user?.role?.toLowerCase() === 'admin';

//   // Fetch agents data list ONLY for Admin accounts to feed selectors
//   useEffect(() => {
//     const fetchAgentsList = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/admin/agents');
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

//   // Handle data ledger re-fetches whenever filter values alter
//   useEffect(() => {
//     const fetchShipments = async () => {
//       setLoading(true);
//       try {
//         // Appending dynamic URL parameters safely
//         let url = `http://localhost:5000/api/shipments/all?userId=${user?.id}&role=${user?.role}`;
//         if (dateFrom) url += `&dateFrom=${dateFrom}`;
//         if (dateTo) url += `&dateTo=${dateTo}`;
//         if (status !== 'All') url += `&status=${status}`;
//         if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

//         const response = await fetch(url);
//         if (!response.ok) throw new Error('Failed to fetch');
        
//         const data = await response.json();
//         setShipments(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setShipments([]); 
//       } finally {
//         setLoading(false); 
//       }
//     };

//     if (user) fetchShipments();
//   }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin]);

//   const handleResetFilters = () => {
//     setDateFrom('');
//     setDateTo('');
//     setStatus('All');
//     setSelectedAgent('All');
//   };

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
//           <input 
//             type="date" 
//             value={dateFrom} 
//             onChange={(e) => setDateFrom(e.target.value)} 
//           />
//         </div>

//         <div className="filter-group">
//           <label>Date To:</label>
//           <input 
//             type="date" 
//             value={dateTo} 
//             onChange={(e) => setDateTo(e.target.value)} 
//           />
//         </div>

//         <div className="filter-group">
//           <label>Status:</label>
//           <select value={status} onChange={(e) => setStatus(e.target.value)}>
//             <option value="All">All Statuses</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Transit">In Transit</option>
//             <option value="Landed">Landed</option>
//             <option value="Ready to Collect">Ready to Collect</option>
//             <option value="Collected">Collected</option>
//           </select>
//         </div>

//         {/* Render agent selector dropdown ONLY if logged-in profile matches admin roles */}
//         {isUserAdmin && (
//           <div className="filter-group">
//             <label>By Agent:</label>
//             <select 
//               value={selectedAgent} 
//               onChange={(e) => setSelectedAgent(e.target.value)}
//             >
//               <option value="All">All Agents</option>
//               {agentsList.map(agent => (
//                 <option key={agent.id} value={agent.id}>
//                   {agent.full_name} ({agent.agent_id || 'No ID'})
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <button className="reset-filters-btn" onClick={handleResetFilters}>
//           🔄 Reset Filters
//         </button>
//       </div>

//       {loading ? (
//         <div className="loader">Filtering Shipments...</div>
//       ) : (
//         <div className="table-responsive">
//           <table className="shipment-table">
//             <thead>
//               <tr>
//                 <th>Invoice #</th>
//                 <th>Date</th>
//                 <th>Sender</th>
//                 <th>Sender Contact</th>            
//                 <th>Receiver</th>
//                 <th>Receiver Contact</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {shipments.length > 0 ? (
//                 shipments.map((s) => (
//                   <tr key={s.id}>
//                     <td>{s.tracking_id || 'N/A'}</td> 
//                     <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
//                     <td>{s.sender_name || '—'}</td>
//                     <td>{s.sender_contact_num || '—'}</td>
//                     <td>{s.receiver_name || '—'}</td>
//                     <td>{s.receiver_contact || '—'}</td>
//                     <td>
//                       <span className="badge-status">
//                         {s.status || 'Pending'}
//                       </span>
//                     </td>
//                     <td>
//                       <button 
//                         className="view-btn" 
//                         disabled={!s.tracking_id}
//                         onClick={() => setActiveTrackingId(s.tracking_id)}
//                         style={{ opacity: s.tracking_id ? 1 : 0.4, cursor: s.tracking_id ? 'pointer' : 'not-allowed' }}
//                       >
//                         👁️ Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
//                     No shipments found matching these filter criteria.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;



import React, { useEffect, useState } from 'react';
import ShipmentDetailView from './ShipmentDetailView'; 

import"/src/styles/ViewShipments.css";

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
  const itemsPerPage = 50; // Matching Gmail's 50 threshold

  const isUserAdmin = user?.role?.toLowerCase() === 'admin';

  useEffect(() => {
    const fetchAgentsList = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/agents');
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
  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/shipments/all?userId=${user?.id}&role=${user?.role}&page=${currentPage}&limit=${itemsPerPage}`;        if (dateFrom) url += `&dateFrom=${dateFrom}`;
        if (dateTo) url += `&dateTo=${dateTo}`;
        if (status !== 'All') url += `&status=${status}`;
        if (isUserAdmin && selectedAgent !== 'All') url += `&agentId=${selectedAgent}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        
        // Handle the new response object structure
        setShipments(Array.isArray(data.shipments) ? data.shipments : []);
        setTotalItems(data.totalItems || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setShipments([]); 
        setTotalItems(0);
      } finally {
        setLoading(false); 
      }
    };

    if (user) fetchShipments();
  }, [user, dateFrom, dateTo, status, selectedAgent, isUserAdmin, currentPage]);

  // Reset page to 1 whenever filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setDateFrom('');
    setDateTo('');
    setStatus('All');
    setSelectedAgent('All');
    setCurrentPage(1);
  };

  // Pagination Helper Values
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (activeTrackingId) {
    return (
      <ShipmentDetailView 
        trackingId={activeTrackingId} 
        onClose={() => setActiveTrackingId(null)} 
        user={user}
      />
    );
  }

  return (
    <div className="view-shipments-container">
      <h2>📦 Shipment History</h2>
      
      {/* 🛠️ Dynamic Controls Dashboard Section */}
      <div className="filters-control-panel">
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

        <button className="reset-filters-btn" onClick={handleResetFilters}>🔄 Reset Filters</button>
      </div>

      {loading ? (
        <div className="loader">Loading Shipments...</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="shipment-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Sender</th>
                  <th>Sender Contact</th>            
                  <th>Receiver</th>
                  <th>Receiver Contact</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shipments.length > 0 ? (
                  shipments.map((s) => (
                    <tr key={s.id}>
                      <td>{s.tracking_id || 'N/A'}</td> 
                      <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
                      <td>{s.sender_name || '—'}</td>
                      <td>{s.sender_contact_num || '—'}</td>
                      <td>{s.receiver_name || '—'}</td>
                      <td>{s.receiver_contact || '—'}</td>
                      <td><span className="badge-status">{s.status || 'Pending'}</span></td>
                      <td>
                        <button className="view-btn" onClick={() => setActiveTrackingId(s.tracking_id)}>👁️ Details</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No shipments found.</td></tr>
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









// import React, { useEffect, useState } from 'react';
// import ShipmentDetailView from './ShipmentDetailView'; 
// import './ViewShipments.css';

// const ViewShipments = ({ user }) => {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTrackingId, setActiveTrackingId] = useState(null);

//   useEffect(() => {
//     const fetchShipments = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/shipments/all?userId=${user?.id}&role=${user?.role}`);
//         if (!response.ok) throw new Error('Failed to fetch');
        
//         const data = await response.json();
//         setShipments(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setShipments([]); 
//       } finally {
//         setLoading(false); 
//       }
//     };
//     if (user) fetchShipments();
//   }, [user]);

//   if (activeTrackingId) {
//     return (
//       <ShipmentDetailView 
//         trackingId={activeTrackingId} 
//         onClose={() => setActiveTrackingId(null)} 
//       />
//     );
//   }

//   if (loading) {
//     return <div className="vibrant-loader-canvas">⚡ INITIALIZING GRID LEDGER...</div>;
//   }

//   return (
//     <div className="view-shipments-container">
//       <h2>✨ Active Logistics Node Registry</h2>
      
//       {shipments.length > 0 ? (
//         <div className="shipments-vibrant-grid">
//           {shipments.map((s) => {
//             // Determine active custom class hook based on ledger string data
//             const statusClass = (s.status || 'Pending').toLowerCase() === 'delivered' ? 'delivered' : 'pending';

//             return (
//               <div className="shipment-vibrant-card" key={s.id}>
                
//                 {/* TOP CONTROL LINE */}
//                 <div className="card-top-row">
//                   <span className="card-invoice-tag">{s.tracking_id || 'N/A'}</span>
//                   <span className="card-date-stamp">
//                     📅 {s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}
//                   </span>
//                 </div>

//                 {/* VISUAL FLOW MAP SECTION */}
//                 <div className="logistics-flow-container">
//                   {/* SENDER NODE CARD BLOCK */}
//                   <div className="flow-node">
//                     <span className="node-icon">📤</span>
//                     <div className="node-details">
//                       <span className="node-label">Sender</span>
//                       <span className="node-name">{s.sender_name || '—'}</span>
//                       <span className="node-contact">📞 {s.sender_contact_num || '—'}</span>
//                     </div>
//                   </div>

//                   {/* RECEIVER NODE CARD BLOCK */}
//                   <div className="flow-node">
//                     <span className="node-icon">📥</span>
//                     <div className="node-details">
//                       <span className="node-label"> Receiver</span>
//                       <span className="node-name">{s.receiver_name || '—'}</span>
//                       <span className="node-contact">📞 {s.receiver_contact || '—'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* BOTTOM ACTION & STATUS SEPARATOR */}
//                 <div className="card-footer-row">
//                   <span className={`vibrant-status-badge ${statusClass}`}>
//                     ● {s.status || 'Pending'}
//                   </span>
                  
//                   <button 
//                     className="vibrant-action-btn"
//                     disabled={!s.tracking_id}
//                     onClick={() => setActiveTrackingId(s.tracking_id)}
//                   >
//                     Manage 🚀
//                   </button>
//                 </div>

//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div style={{ textAlign: 'center', padding: '60px', color: '#64748b', fontSize: '1.1rem' }}>
//           🚫 No active cargo shipments registered within this profile instance.
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewShipments;