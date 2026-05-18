import React, { useEffect, useState } from 'react';

const ViewShipments = ({user}) => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/shipments/all?userId=${user?.id}&role=${user?.role}`);
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        // Ensure we always set an array to avoid .map crashes
        setShipments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setShipments([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchShipments();
  }, [user]);

  if (loading) return <div className="loader">Loading Shipments...</div>;

  return (
    <div className="view-shipments-container">
      <h2>📦 Shipment History</h2>
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
                {/* 1. Changed trackingId to tracking_id */}
                <td>{s.tracking_id}</td> 
                
                {/* 2. Changed date to created_at */}
                <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'N/A'}</td>
                
                {/* 3. Changed senderName to sender_name */}
                <td>{s.sender_name}</td>
                <td>{s.sender_contact_num}</td>

                
                {/* 4. Changed receiverName to receiver_name */}
                <td>{s.receiver_name}</td>
                <td>{s.receiver_contact}</td>
 
                <td><span className="badge-status">{s.status || 'Pending'}</span></td>
                <td>
                  <button className="view-btn">👁️ Details</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                No shipments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewShipments;