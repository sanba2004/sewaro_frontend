// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/PricingManagement.css';

// export default function PricingManagement() {
//   const [tiers, setTiers] = useState([]);
//   const [editingId, setEditingId] = useState(null);
  
//   // 🎯 UPDATED: State tracks min_weight (From), max_weight (To), and rate_per_kg (Price)
//   const [editFormData, setEditFormData] = useState({ 
//     tier_name: '', 
//     min_weight: '', 
//     max_weight: '', 
//     rate_per_kg: '' 
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     loadTiers();
//   }, []);

//   const loadTiers = async () => {
//     const res = await axios.get('http://localhost:5000/api/pricing');
//     setTiers(res.data);
//   };

//   const handleEditClick = (tier) => {
//     setEditingId(tier.id);
//     // 🎯 UPDATED: Safely seed the inputs with existing values when clicking 'Edit'
//     setEditFormData({
//       tier_name: tier.tier_name,
//       min_weight: tier.min_weight,
//       max_weight: tier.max_weight,
//       rate_per_kg: tier.rate_per_kg
//     });
//   };

//   const handleSaveSubmit = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/pricing/${id}`, editFormData);
//       setMessage('Pricing matrix parameter adjusted successfully!');
//       setEditingId(null);
//       loadTiers(); // reload fresh numbers from database
//       setTimeout(() => setMessage(''), 3000);
//     } catch (err) {
//       console.error("Failed updating parameters:", err);
//     }
//   };

//   return (
//     <div className="pricing-admin-container" style={{ padding: '25px', maxWidth: '1000px', margin: '0 auto' }}>
//       <h2>Global Weight Shipping Matrix Management</h2>
      
//       {message && (
//         <div style={{ padding: '10px', background: '#d4edda', color: '#155724', marginBottom: '15px', borderRadius: '4px' }}>
//           {message}
//         </div>
//       )}
      
//       <table className="admin-rates-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//         <thead>
//           <tr style={{ background: '#0f172a', color: '#fff', textAlign: 'left' }}>
//             <th style={{ padding: '12px' }}>Tier Classification</th>
//             {/* 🎯 UPDATED: Clean, clear column definitions for the user */}
//             <th style={{ padding: '12px' }}>From (KG)</th>
//             <th style={{ padding: '12px' }}>To (KG)</th>
//             <th style={{ padding: '12px' }}>Price (Per KG)</th>
//             <th style={{ padding: '12px' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tiers.map((tier) => (
//             <tr key={tier.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
//               <td style={{ padding: '12px' }}>{tier.tier_name}</td>
              
//               {/* 1. FROM (MIN WEIGHT) COLUMN */}
//               <td style={{ padding: '12px' }}>
//                 {editingId === tier.id ? (
//                   <input 
//                     type="number" 
//                     step="0.01"
//                     style={{ width: '80px', padding: '4px' }}
//                     value={editFormData.min_weight} 
//                     onChange={(e) => setEditFormData({...editFormData, min_weight: e.target.value})} 
//                   />
//                 ) : (
//                   `${parseFloat(tier.min_weight || 0).toFixed(2)} kg`
//                 )}
//               </td>
              
//               {/* 2. TO (MAX WEIGHT) COLUMN */}
//               <td style={{ padding: '12px' }}>
//                 {editingId === tier.id ? (
//                   <input 
//                     type="number" 
//                     step="0.01"
//                     style={{ width: '80px', padding: '4px' }}
//                     value={editFormData.max_weight} 
//                     onChange={(e) => setEditFormData({...editFormData, max_weight: e.target.value})} 
//                   />
//                 ) : (
//                   `${parseFloat(tier.max_weight || 0).toFixed(2)} kg`
//                 )}
//               </td>
              
//               {/* 3. PRICE (RATE PER KG) COLUMN */}
//               <td style={{ padding: '12px' }}>
//                 {editingId === tier.id ? (
//                   <input 
//                     type="number" 
//                     style={{ width: '100px', padding: '4px' }}
//                     value={editFormData.rate_per_kg} 
//                     onChange={(e) => setEditFormData({...editFormData, rate_per_kg: e.target.value})} 
//                   />
//                 ) : (
//                   `Rs. ${parseFloat(tier.rate_per_kg || 0).toFixed(2)}`
//                 )}
//               </td>

//               {/* 4. ACTIONS COLUMN */}
//               <td style={{ padding: '12px' }}>
//                 {editingId === tier.id ? (
//                   <div style={{ display: 'flex', gap: '8px' }}>
//                     <button 
//                       onClick={() => handleSaveSubmit(tier.id)}
//                       style={{ padding: '5px 10px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//                     >
//                       Save
//                     </button>
//                     <button 
//                       onClick={() => setEditingId(null)}
//                       style={{ padding: '5px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 ) : (
//                   <button 
//                     onClick={() => handleEditClick(tier)}
//                     style={{ padding: '5px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//                   >
//                     Edit
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PricingManagement.css';

export default function PricingManagement() {
  const [tiers, setTiers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  // States for Editing existing tiers
  const [editFormData, setEditFormData] = useState({ 
    tier_name: '', min_weight: '', max_weight: '', rate_per_kg: '' 
  });

  // 🎯 NEW: State tracking creation of a completely new weight range row
  const [newRowData, setNewRowData] = useState({
    tier_name: '', min_weight: '', max_weight: '', rate_per_kg: ''
  });

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadTiers();
  }, []);

  const loadTiers = async () => {
    const res = await axios.get('https://sewaro-backend.onrender.com/api/pricing');
    setTiers(res.data);
  };

  const handleEditClick = (tier) => {
    setEditingId(tier.id);
    setEditFormData({
      tier_name: tier.tier_name,
      min_weight: tier.min_weight,
      max_weight: tier.max_weight,
      rate_per_kg: tier.rate_per_kg
    });
  };
const handleDeleteTier = async (id, tierName) => {
  const confirmDelete = window.confirm(`Are you sure you want to permanently delete the "${tierName}" pricing tier?`);
  if (!confirmDelete) return;

  try {
    await axios.delete(`https://sewaro-backend.onrender.com/api/pricing/${id}`);
    setMessage('Pricing tier deleted successfully.');
    loadTiers(); // Refresh the list numbers from the database
    setTimeout(() => setMessage(''), 3000);
  } catch (err) {
    console.error("Failed to delete pricing tier:", err);
    setErrorMessage("Error removing the selected pricing tier.");
  }
};
  const handleSaveSubmit = async (id) => {
    try {
      await axios.put(`https://sewaro-backend.onrender.com/api/pricing/${id}`, editFormData);
      setMessage('Pricing matrix parameter adjusted successfully!');
      setEditingId(null);
      loadTiers();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("Failed updating parameters:", err);
    }
  };

  // 🎯 NEW: Submit function to send the new range payload over the network
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setMessage('');

    // Quick client-side validation logic check
    if (parseFloat(newRowData.min_weight) >= parseFloat(newRowData.max_weight)) {
      setErrorMessage("Range Validation Failure: 'From (KG)' value must be strictly lower than the 'To (KG)' parameter value.");
      return;
    }

    try {
      await axios.post('https://sewaro-backend.onrender.com/api/pricing/create', newRowData);
      setMessage('New custom shipping scale range appended successfully!');
      
      // Clear out entry form input states
      setNewRowData({ tier_name: '', min_weight: '', max_weight: '', rate_per_kg: '' });
      loadTiers(); // Re-fetch the sequential rows list
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Error appending new matrix profile.");
    }
  };

  return (
    <div className="pricing-admin-container" style={{ padding: '25px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Global Weight Shipping Matrix Management</h2>
      
      {message && <div style={{ padding: '10px', background: '#d4edda', color: '#155724', marginBottom: '15px', borderRadius: '4px' }}>{message}</div>}
      {errorMessage && <div style={{ padding: '10px', background: '#f8d7da', color: '#721c24', marginBottom: '15px', borderRadius: '4px' }}>{errorMessage}</div>}
      
      {/* 📊 Current Data Matrix Grid View */}
      <table className="admin-rates-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#0f172a', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Tier Classification</th>
            <th style={{ padding: '12px' }}>From (KG)</th>
            <th style={{ padding: '12px' }}>To (KG)</th>
            <th style={{ padding: '12px' }}>Price (Per KG)</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>{tier.tier_name}</td>
              <td style={{ padding: '12px' }}>
                {editingId === tier.id ? (
                  <input type="number" step="0.01" style={{ width: '80px', padding: '4px' }} value={editFormData.min_weight} onChange={(e) => setEditFormData({...editFormData, min_weight: e.target.value})} />
                ) : `${parseFloat(tier.min_weight || 0).toFixed(2)} kg`}
              </td>
              <td style={{ padding: '12px' }}>
                {editingId === tier.id ? (
                  <input type="number" step="0.01" style={{ width: '80px', padding: '4px' }} value={editFormData.max_weight} onChange={(e) => setEditFormData({...editFormData, max_weight: e.target.value})} />
                ) : `${parseFloat(tier.max_weight || 0).toFixed(2)} kg`}
              </td>
              <td style={{ padding: '12px' }}>
                {editingId === tier.id ? (
                  <input type="number" style={{ width: '100px', padding: '4px' }} value={editFormData.rate_per_kg} onChange={(e) => setEditFormData({...editFormData, rate_per_kg: e.target.value})} />
                ) : `Rs. ${parseFloat(tier.rate_per_kg || 0).toFixed(2)}`}
              </td>
              {/* <td style={{ padding: '12px' }}>
                {editingId === tier.id ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleSaveSubmit(tier.id)} style={{ padding: '5px 10px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{ padding: '5px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleEditClick(tier)} style={{ padding: '5px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  
                  
                )}
              </td> */}
              <td style={{ padding: '12px' }}>
  {editingId === tier.id ? (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={() => handleSaveSubmit(tier.id)} style={{ padding: '5px 10px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
      <button onClick={() => setEditingId(null)} style={{ padding: '5px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
    </div>
  ) : (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button 
        onClick={() => handleEditClick(tier)} 
        style={{ padding: '5px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Edit
      </button>
      {/* 🎯 NEW DELETE BUTTON */}
      <button 
        onClick={() => handleDeleteTier(tier.id, tier.tier_name)} 
        style={{ padding: '5px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        🗑️ Delete
      </button>
    </div>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px dashed #cbd5e1' }} />

      {/* 🎯 NEW: Create a New Pricing Tier Form Card Panel */}
      <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#0f172a' }}>➕ Create New Weight Pricing Bracket</h3>
        <form onSubmit={handleCreateSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Tier Classification Name:</label>
            <input type="text" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} placeholder="e.g., Ultra Heavy Freight" value={newRowData.tier_name} onChange={(e) => setNewRowData({...newRowData, tier_name: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>From (Minimum KG):</label>
            <input type="number" step="0.01" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} placeholder="500.00" value={newRowData.min_weight} onChange={(e) => setNewRowData({...newRowData, min_weight: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>To (Maximum KG):</label>
            <input type="number" step="0.01" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} placeholder="2000.00" value={newRowData.max_weight} onChange={(e) => setNewRowData({...newRowData, max_weight: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Price (Per KG):</label>
            <input type="number" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} placeholder="350" value={newRowData.rate_per_kg} onChange={(e) => setNewRowData({...newRowData, rate_per_kg: e.target.value})} />
          </div>
          <button type="submit" style={{ padding: '10px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
            Add new price
          </button>
        </form>
      </div>
    </div>
  );
}



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/PricingManagement.css';

// export default function PricingManagement() {
//   const [tiers, setTiers] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('Malaysia'); // Default filter view
//   const [editingId, setEditingId] = useState(null);
  
//   const [editFormData, setEditFormData] = useState({ 
//     destination_country: '', tier_name: '', min_weight: '', max_weight: '', rate_per_kg: '' 
//   });

//   const [newRowData, setNewRowData] = useState({
//     destination_country: 'Malaysia', tier_name: '', min_weight: '', max_weight: '', rate_per_kg: ''
//   });

//   const [message, setMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   // Re-fetch tiers whenever the admin toggles between countries
//   useEffect(() => {
//     loadTiers(selectedCountry);
//   }, [selectedCountry]);

//   const loadTiers = async (countryName) => {
//     const res = await axios.get(`https://sewaro-backend.onrender.com/api/pricing?country=${countryName}`);
//     setTiers(res.data);
//   };

//   const handleEditClick = (tier) => {
//     setEditingId(tier.id);
//     setEditFormData({
//       destination_country: tier.destination_country,
//       tier_name: tier.tier_name,
//       min_weight: tier.min_weight,
//       max_weight: tier.max_weight,
//       rate_per_kg: tier.rate_per_kg
//     });
//   };

//   const handleSaveSubmit = async (id) => {
//     try {
//       await axios.put(`https://sewaro-backend.onrender.com/api/pricing/${id}`, editFormData);
//       setMessage('Pricing matrix parameter adjusted successfully!');
//       setEditingId(null);
//       loadTiers(selectedCountry);
//       setTimeout(() => setMessage(''), 3000);
//     } catch (err) {
//       console.error("Failed updating parameters:", err);
//     }
//   };

//   const handleCreateSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setMessage('');

//     if (parseFloat(newRowData.min_weight) >= parseFloat(newRowData.max_weight)) {
//       setErrorMessage("Range Validation Failure: 'From (KG)' value must be strictly lower than 'To (KG)'.");
//       return;
//     }

//     try {
//       await axios.post('https://sewaro-backend.onrender.com/api/pricing/create', newRowData);
//       setMessage('New country shipping scale range appended successfully!');
      
//       // Keep the country selection active but reset other text fields
//       setNewRowData({ destination_country: newRowData.destination_country, tier_name: '', min_weight: '', max_weight: '', rate_per_kg: '' });
//       loadTiers(selectedCountry);
//       setTimeout(() => setMessage(''), 3000);
//     } catch (err) {
//       setErrorMessage(err.response?.data?.error || "Error appending new matrix profile.");
//     }
//   };

//   const handleDeleteTier = async (id, tierName) => {
//     const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${tierName}"?`);
//     if (!confirmDelete) return;
//     try {
//       await axios.delete(`https://sewaro-backend.onrender.com/api/pricing/${id}`);
//       setMessage('Pricing tier deleted successfully.');
//       loadTiers(selectedCountry);
//       setTimeout(() => setMessage(''), 3000);
//     } catch (err) {
//       setErrorMessage("Error removing the selected pricing tier.");
//     }
//   };

//   return (
//     <div className="pricing-admin-container" style={{ padding: '25px', maxWidth: '1000px', margin: '0 auto' }}>
//       <h2>Global Weight Shipping Matrix Management</h2>
      
//       {/* 🌍 NEW COUNTRY FILTER TOGGLE CONTROL */}
//       <div style={{ marginBottom: '20px', background: '#f1f5f9', padding: '15px', borderRadius: '6px' }}>
//         <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Destination Target Country View:</label>
//         <select 
//           value={selectedCountry} 
//           onChange={(e) => setSelectedCountry(e.target.value)}
//           style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontWeight: '600' }}
//         >
//           <option value="Malaysia">Malaysia 🇲🇾</option>
//           <option value="Hong Kong">Hong Kong 🇭🇰</option>
//           <option value="India">India 🇮🇳</option>
//           <option value="Japan">Japan 🇯🇵</option>
//         </select>
//       </div>

//       {message && <div style={{ padding: '10px', background: '#d4edda', color: '#155724', marginBottom: '15px', borderRadius: '4px' }}>{message}</div>}
//       {errorMessage && <div style={{ padding: '10px', background: '#f8d7da', color: '#721c24', marginBottom: '15px', borderRadius: '4px' }}>{errorMessage}</div>}
      
//       <table className="admin-rates-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//         <thead>
//           <tr style={{ background: '#0f172a', color: '#fff', textAlign: 'left' }}>
//             <th style={{ padding: '12px' }}>Country</th>
//             <th style={{ padding: '12px' }}>Tier Classification</th>
//             <th style={{ padding: '12px' }}>From (KG)</th>
//             <th style={{ padding: '12px' }}>To (KG)</th>
//             <th style={{ padding: '12px' }}>Price (Per KG)</th>
//             <th style={{ padding: '12px' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tiers.length === 0 ? (
//             <tr>
//               <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
//                 No pricing tiers defined for {selectedCountry} yet. Create one below!
//               </td>
//             </tr>
//           ) : (
//             tiers.map((tier) => (
//               <tr key={tier.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
//                 <td style={{ padding: '12px', fontWeight: 'bold' }}>{tier.destination_country}</td>
//                 <td style={{ padding: '12px' }}>{tier.tier_name}</td>
//                 <td style={{ padding: '12px' }}>
//                   {editingId === tier.id ? (
//                     <input type="number" step="0.01" style={{ width: '80px', padding: '4px' }} value={editFormData.min_weight} onChange={(e) => setEditFormData({...editFormData, min_weight: e.target.value})} />
//                   ) : `${parseFloat(tier.min_weight || 0).toFixed(2)} kg`}
//                 </td>
//                 <td style={{ padding: '12px' }}>
//                   {editingId === tier.id ? (
//                     <input type="number" step="0.01" style={{ width: '80px', padding: '4px' }} value={editFormData.max_weight} onChange={(e) => setEditFormData({...editFormData, max_weight: e.target.value})} />
//                   ) : `${parseFloat(tier.max_weight || 0).toFixed(2)} kg`}
//                 </td>
//                 <td style={{ padding: '12px' }}>
//                   {editingId === tier.id ? (
//                     <input type="number" style={{ width: '100px', padding: '4px' }} value={editFormData.rate_per_kg} onChange={(e) => setEditFormData({...editFormData, rate_per_kg: e.target.value})} />
//                   ) : `Rs. ${parseFloat(tier.rate_per_kg || 0).toFixed(2)}`}
//                 </td>
//                 <td style={{ padding: '12px' }}>
//                   {editingId === tier.id ? (
//                     <div style={{ display: 'flex', gap: '8px' }}>
//                       <button onClick={() => handleSaveSubmit(tier.id)} style={{ padding: '5px 10px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
//                       <button onClick={() => setEditingId(null)} style={{ padding: '5px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
//                     </div>
//                   ) : (
//                     <div style={{ display: 'flex', gap: '8px' }}>
//                       <button onClick={() => handleEditClick(tier)} style={{ padding: '5px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
//                       <button onClick={() => handleDeleteTier(tier.id, tier.tier_name)} style={{ padding: '5px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🗑️ Delete</button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px dashed #cbd5e1' }} />

//       {/* CREATE NEW CARD PANEL */}
//       <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
//         <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#0f172a' }}>➕ Create New Weight Pricing Bracket</h3>
//         <form onSubmit={handleCreateSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', alignItems: 'end' }}>
          
//           {/* 🌍 NEW COUNTRY CREATION INPUT SELECTION */}
//           <div>
//             <label style={{ display: 'block', marginBottom: '5px', color:  '#0f172a',fontSize: '14px', fontWeight: '500' }}>Country Target:</label>
//             <select 
//               required
//               style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #020202', background: '#0c0c0c' }}
//               value={newRowData.destination_country} 
//               onChange={(e) => setNewRowData({...newRowData, destination_country: e.target.value})}
//             >
//               <option value="Malaysia">Malaysia</option>
//               <option value="Hong Kong">Hong Kong</option>
//               <option value="India">India</option>
//               <option value="Japan">Japan</option>
//             </select>
//           </div>

//           <div>
//             <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Classification Name:</label>
//             <input type="text" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} placeholder="e.g., Express Document" value={newRowData.tier_name} onChange={(e) => setNewRowData({...newRowData, tier_name: e.target.value})} />
//           </div>
//           <div>
//             <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>From (Min KG):</label>
//             <input type="number" step="0.01" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} placeholder="0.00" value={newRowData.min_weight} onChange={(e) => setNewRowData({...newRowData, min_weight: e.target.value})} />
//           </div>
//           <div>
//             <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>To (Max KG):</label>
//             <input type="number" step="0.01" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} placeholder="10.00" value={newRowData.max_weight} onChange={(e) => setNewRowData({...newRowData, max_weight: e.target.value})} />
//           </div>
//           <div>
//             <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Price (Per KG):</label>
//             <input type="number" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} placeholder="350" value={newRowData.rate_per_kg} onChange={(e) => setNewRowData({...newRowData, rate_per_kg: e.target.value})} />
//           </div>
          
//           <button type="submit" style={{ padding: '10px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
//             Add new price
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }