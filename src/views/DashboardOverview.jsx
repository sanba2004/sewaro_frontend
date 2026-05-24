// import React, { useState, useEffect } from 'react';
// import '../styles/DashboardOverview.css';

// const DashboardOverview = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOverviewData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/admin/overview');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch dashboard metrics');
//         }

//         const result = await response.json();
//         if (result.success) {
//           setStats(result.data);
//         } else {
//           throw new Error(result.error || 'Unknown error occurred');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOverviewData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="overview-loading">
//         <div className="spinner"></div>
//         <p>Loading administration matrix indicators...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="overview-error">
//         <h3>❌ Analytics Loading Failure</h3>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   const { metrics, statusDistribution, recentShipments } = stats;

//   return (
//     <div className="overview-container">
//       <div className="overview-header">
//         <h2>System Performance Dashboard</h2>
//         <p>Live logistical counts and performance metrics.</p>
//       </div>

//       {/* 📊 Row 1: Core Stat Cards */}
//       <div className="metrics-grid">
//         <div className="metric-card shipments">
//           <div className="card-icon">📦</div>
//           <div className="card-info">
//             <h4>Total Shipments</h4>
//             <p className="card-value">{metrics.totalShipments.toLocaleString()}</p>
//           </div>
//         </div>

//         <div className="metric-card revenue">
//           <div className="card-icon">💰</div>
//           <div className="card-info">
//             <h4>Total Revenue</h4>
//             <p className="card-value">${metrics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
//           </div>
//         </div>

//         <div className="metric-card packages">
//           <div className="card-icon">🏷️</div>
//           <div className="card-info">
//             <h4>Packages Handled</h4>
//             <p className="card-value">{metrics.totalPackages.toLocaleString()}</p>
//           </div>
//         </div>
//       </div>

//       {/* 📈 Row 2: Status Breakdown Distributions */}
//       <div className="section-title">
//         <h3>Shipment Tracking Distribution States</h3>
//       </div>
//       <div className="status-grid">
//         {Object.entries(statusDistribution).map(([status, count]) => (
//           <div key={status} className={`status-pill ${status.toLowerCase().replace(/\s+/g, '-')}`}>
//             <span className="status-name">{status}</span>
//             <span className="status-count">{count}</span>
//           </div>
//         ))}
//       </div>

//       {/* 📋 Row 3: Recent Shipments Live Ledger */}
//       <div className="recent-section">
//         <div className="section-title">
//           <h3>Recent System Shipments</h3>
//         </div>
//         <div className="table-responsive">
//           <table className="overview-table">
//             <thead>
//               <tr>
//                 <th>Tracking ID</th>
//                 <th>Sender Name</th>
//                 <th>Receiver Name</th>
//                 <th>Billing Total</th>
//                 <th>Status</th>
//                 <th>Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentShipments.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="empty-row">No active system shipments recorded yet.</td>
//                 </tr>
//               ) : (
//                 recentShipments.map((shipment) => (
//                   <tr key={shipment.tracking_id}>
//                     <td className="tracking-bold">{shipment.tracking_id}</td>
//                     <td>{shipment.sender_name}</td>
//                     <td>{shipment.receiver_name}</td>
//                     <td>${parseFloat(shipment.billing_total).toFixed(2)}</td>
//                     <td>
//                       <span className={`status-badge ${shipment.status.toLowerCase().replace(/\s+/g, '-')}`}>
//                         {shipment.status}
//                       </span>
//                     </td>
//                     <td>{new Date(shipment.created_at).toLocaleDateString()}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardOverview;










// src/views/DashboardOverview.jsx (Revised Version)
import React, { useState, useEffect } from 'react';
import '../styles/DashboardOverview.css';
import YearlyMonthChart from '../components/YearlyMonthlyChart'; // 📊 IMPORT NEW BAR GRAPH MODULE

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/admin/overview');
        if (!response.ok) throw new Error('Failed to fetch dashboard metrics');
        const result = await response.json();
        if (result.success) {
          // Optimized payload schema removes recent shipments entirely
          const statsWithoutShipments = { ...result.data };
          delete statsWithoutShipments.recentShipments; // Safety deletion
          setStats(statsWithoutShipments);
        } else {
          throw new Error(result.error || 'Unknown error occurred');
        }
      } catch (err) { setError(err.message); } 
      finally { setLoading(false); }
    };
    fetchOverviewData();
  }, []);

  if (loading) return (
    <div className="overview-loading"><div className="spinner"></div><p>Loading administration matrix indicators...</p></div>
  );
  if (error) return (
    <div className="overview-error"><h3>❌ Analytics Loading Failure</h3><p>{error}</p></div>
  );

  const { metrics, statusDistribution } = stats;

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h2>System Performance Dashboard</h2>
        <p>Live logistical counts and performance metrics.</p>
      </div>

      {/* 📊 Row 1: Core Stat Cards (Unchanged) */}
      <div className="metrics-grid">
        <div className="metric-card shipments"><div className="card-icon">📦</div><div className="card-info"><h4>Total Shipments</h4><p className="card-value">{metrics.totalShipments.toLocaleString()}</p></div></div>
        <div className="metric-card revenue"><div className="card-icon">💰</div><div className="card-info"><h4>Total Revenue</h4><p className="card-value">${metrics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p></div></div>
        <div className="metric-card packages"><div className="card-icon">🏷️</div><div className="card-info"><h4>Packages Handled</h4><p className="card-value">{metrics.totalPackages.toLocaleString()}</p></div></div>
      </div>

      {/* 📈 Row 2: Status Breakdown Distributions (Unchanged) */}
      <div className="section-title"><h3>Shipment Tracking Distribution States</h3></div>
      <div className="status-grid">
        {Object.entries(statusDistribution).map(([status, count]) => (
          <div key={status} className={`status-pill ${status.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className="status-name">{status}</span><span className="status-count">{count}</span>
          </div>
        ))}
      </div>

      {/* 📊 REPLACED Row 3: Yearly month shipment volume matrix chart ledger */}
      <div className="chart-feed-ticker-view section-title">
        <h3>Logistics Lifecycle Control Ledger: Yearly Volume Matrix</h3>
      </div>
      
      <div className="analytics-section">
        {/* Call the new date controlled chart module */}
        <YearlyMonthChart />
      </div>

    </div>
  );
};

export default DashboardOverview;