

// // export default Dashboard;
// import React, { useState } from 'react';
// import './Dashboard.css';
// import ShipmentStepper from './ShipmentStepper';
// import ViewShipments  from './ViewShipments';
// const Dashboard = ({ onLogout }) => {
//   const [activeTab, setActiveTab] = useState('add-shipment');
//   const menuItems = [
//     { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
//     { id: 'add-shipment', label: 'Create Shipment', icon: '📦' },
//     { id: 'all-shipments', label: 'View Shipments', icon: '📋' },
//     { id: 'agents', label: 'Manage Agents', icon: '👥' },
//     { id: 'settings', label: 'Settings', icon: '⚙️' },
//   ];

//   return (
//     <div className="dashboard-layout">
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <h3>SEWA LOGISTICS</h3>
//           <p>Admin Dashboard</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           {menuItems.map((item) => (
//             <button 
//               key={item.id}
//               className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <span className="icon">{item.icon}</span>
//               <span className="label">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">
//           <button className="logout-btn" onClick={onLogout}>Logout Exit</button>
//         </div>
//       </aside>

//       <main className="dashboard-content">
//         <div className="content-body">
//           {activeTab === 'add-shipment' ? (
//             <ShipmentStepper />
//           ) :  activeTab === 'all-shipments'?(<ViewShipments/>

//           ) : (

//             <div className="placeholder-view">
//               <h2>{activeTab.replace('-', ' ').toUpperCase()}</h2>
//               <p>This section is under construction.</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState } from 'react';
// import './Dashboard.css';
// import ShipmentStepper from './ShipmentStepper';
// import ViewShipments from './ViewShipments';

// // Accept userRole as a prop from App.jsx
// const Dashboard = ({ onLogout, userRole, user }) => {
//   const [activeTab, setActiveTab] = useState('add-shipment');

//   // 1. Define all possible menu items
//   const allMenuItems = [
//     { id: 'overview', label: 'Dashboard Overview', icon: '📊', adminOnly: true },
//     { id: 'add-shipment', label: 'Create Shipment', icon: '📦', adminOnly: false },
//     { id: 'all-shipments', label: 'View Shipments', icon: '📋', adminOnly: false },
//     { id: 'agents', label: 'Manage Agents', icon: '👥', adminOnly: true },
//     { id: 'settings', label: 'Settings', icon: '⚙️', adminOnly: false },
//   ];

//   // 2. Filter menu items based on the user's role
//   // If user is 'admin', they see everything. Otherwise, filter out adminOnly items.
//   // const filteredMenuItems = allMenuItems.filter(item => {
//   //   if (userRole === 'admin') return true;
//   //   return !item.adminOnly;
//   // });
//   const filteredMenuItems = allMenuItems.filter(item => {
//   // If the item is NOT admin-only, everyone sees it
//   if (!item.adminOnly) return true;
  
//   // If it IS admin-only, only show if role matches "admin"
//   return userRole?.toLowerCase() === 'admin'; 
// });

//   return (
//     <div className="dashboard-layout">
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <h3>SEWA LOGISTICS</h3>
//           {/* Dynamically show the role name */}
//           <p>{userRole === 'admin' ? 'Admin Dashboard' : 'Operator Panel'}</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           {/* Use the FILTERED list here */}
//           {filteredMenuItems.map((item) => (
//             <button 
//               key={item.id}
//               className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <span className="icon">{item.icon}</span>
//               <span className="label">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">
//           <button className="logout-btn" onClick={onLogout}>Logout Exit</button>
//         </div>
//       </aside>

//       <main className="dashboard-content">
//         <div className="content-body">
//           {activeTab === 'add-shipment' ? (
//             <ShipmentStepper userId={user?.id} />
//           ) : activeTab === 'all-shipments' ? (
//             <ViewShipments user = {user}/>
//           ) : (
//             <div className="placeholder-view">
//               {/* Security check: If a non-admin somehow tries to access an admin tab */}
//               {allMenuItems.find(i => i.id === activeTab)?.adminOnly && userRole !== 'admin' ? (
//                 <h2>Access Denied</h2>
//               ) : (
//                 <>
//                   <h2>{activeTab.replace('-', ' ').toUpperCase()}</h2>
//                   <p>This section is under construction.</p>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState } from 'react';
// import './Dashboard.css';
// import ShipmentStepper from './ShipmentStepper';
// import ViewShipments from './ViewShipments';

// // 1. Accept 'user' directly alongside onLogout and userRole
// const Dashboard = ({ onLogout, userRole, user }) => {
//   const [activeTab, setActiveTab] = useState('add-shipment');

//   // Removed the duplicate 'const userRole =' line since it's already a prop!

//   // 2. Define all possible menu items
//   const allMenuItems = [
//     { id: 'overview', label: 'Dashboard Overview', icon: '📊', adminOnly: true },
//     { id: 'add-shipment', label: 'Create Shipment', icon: '📦', adminOnly: false },
//     { id: 'all-shipments', label: 'View Shipments', icon: '📋', adminOnly: false },
//     { id: 'agents', label: 'Manage Agents', icon: '👥', adminOnly: true },
//     { id: 'settings', label: 'Settings', icon: '⚙️', adminOnly: false },
//   ];

//   // 3. Filter menu items based on the user's role
//   const filteredMenuItems = allMenuItems.filter(item => {
//     // If the item is NOT admin-only, everyone sees it
//     if (!item.adminOnly) return true;
    
//     // If it IS admin-only, only show if role matches "admin"
//     return userRole?.toLowerCase() === 'admin'; 
//   });

//   return (
//     <div className="dashboard-layout">
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <h3>SEWA LOGISTICS</h3>
//           {/* Dynamically show the role name */}
//           <p>{userRole?.toLowerCase() === 'admin' ? 'Admin Dashboard' : 'Operator Panel'}</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           {filteredMenuItems.map((item) => (
//             <button 
//               key={item.id}
//               className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <span className="icon">{item.icon}</span>
//               <span className="label">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">
//           <button className="logout-btn" onClick={onLogout}>Logout Exit</button>
//         </div>
//       </aside>

//       <main className="dashboard-content">
//         <div className="content-body">
//           {activeTab === 'add-shipment' ? (
//             <ShipmentStepper userId={user?.id} />
//           ) : activeTab === 'all-shipments' ? (
//             <ViewShipments user={user} />
//           ) : (
//             <div className="placeholder-view">
//               {/* Security check: If a non-admin somehow tries to access an admin tab */}
//               {allMenuItems.find(i => i.id === activeTab)?.adminOnly && userRole?.toLowerCase() !== 'admin' ? (
//                 <h2>Access Denied</h2>
//               ) : (
//                 <>
//                   <h2>{activeTab.replace('-', ' ').toUpperCase()}</h2>
//                   <p>This section is under construction.</p>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState } from 'react';
// import './Dashboard.css';
// import ShipmentStepper from './ShipmentStepper';
// import ViewShipments from './ViewShipments';

// const Dashboard = ({ onLogout, user }) => {
//   // Safe normalization of the role property
//   const normalizedRole = user?.role?.toLowerCase() || '';
  
//   // Set default starting tab safely
//   const [activeTab, setActiveTab] = useState('add-shipment');

//   // All menu configuration mappings
//   const allMenuItems = [
//     { id: 'overview', label: 'Dashboard Overview', icon: '📊', adminOnly: true },
//     { id: 'add-shipment', label: 'Create Shipment', icon: '📦', adminOnly: false },
//     { id: 'all-shipments', label: 'View Shipments', icon: '📋', adminOnly: false },
//     { id: 'agents', label: 'Manage Agents', icon: '👥', adminOnly: true },
//     { id: 'settings', label: 'Settings', icon: '⚙️', adminOnly: false },
//   ];

//   // Dynamic filter: Admin sees all tabs; Customers and Agents have Admin tabs removed
//   const filteredMenuItems = allMenuItems.filter(item => {
//     if (!item.adminOnly) return true;
//     return normalizedRole === 'admin'; 
//   });

//   // Helper to cleanly determine subtitle banner text
//   const getPanelSubtitle = () => {
//     if (normalizedRole === 'admin') return 'Admin Dashboard';
//     if (normalizedRole === 'agent') return 'Agent Control Panel';
//     return 'Customer Portal';
//   };

//   return (
//     <div className="dashboard-layout">
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <h3>SEWA LOGISTICS</h3>
//           <p>{getPanelSubtitle()}</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           {filteredMenuItems.map((item) => (
//             <button 
//               key={item.id}
//               className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <span className="icon">{item.icon}</span>
//               <span className="label">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">
//           <button className="logout-btn" onClick={onLogout}>Logout Exit</button>
//         </div>
//       </aside>

//       <main className="dashboard-content">
//         <div className="content-body">
//           {activeTab === 'add-shipment' ? (
//             <ShipmentStepper userId={user?.id} />
//           ) : activeTab === 'all-shipments' ? (
//             <ViewShipments user={user} />
//           ) : (
//             <div className="placeholder-view">
//               {/* Fallback route block wrapper protection */}
//               {allMenuItems.find(i => i.id === activeTab)?.adminOnly && normalizedRole !== 'admin' ? (
//                 <h2>Access Denied</h2>
//               ) : (
//                 <>
//                   <h2>{activeTab.replace('-', ' ').toUpperCase()}</h2>
//                   <p>This section is under construction.</p>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import "/src/styles/Dashboard.css";
// import ShipmentStepper from '../components/ShipmentStepper'; 
// import ManageAgents from './ManageAgents'; // Same folder (src/views/)

// // ⚠️ Double check this one: If you named the file "ShipmentDetailView.jsx", use this:
// import ViewShipments from './ViewShipments';

// const Dashboard = ({ onLogout, user }) => {
//   // Safe normalization of the role property
//   const normalizedRole = user?.role?.toLowerCase() || '';
  
//   // Set default starting tab safely
//   const [activeTab, setActiveTab] = useState('add-shipment');

//   // Track the actual user ID structure over the console lifecycle
//   useEffect(() => {
//     console.log("📊 Active Dashboard Identity Trace:", user);
//   }, [user]);

//   // All menu configuration mappings
//   const allMenuItems = [
//     { id: 'overview', label: 'Dashboard Overview', icon: '📊', adminOnly: true },
//     { id: 'add-shipment', label: 'Create Shipment', icon: '📦', adminOnly: false },
//     { id: 'all-shipments', label: 'View Shipments', icon: '📋', adminOnly: false },
//     { id: 'agents', label: 'Manage Agents', icon: '👥', adminOnly: true },
//     { id: 'settings', label: 'Settings', icon: '⚙️', adminOnly: false },
//   ];

//   // Dynamic filter: Admin sees all tabs; Customers and Agents have Admin tabs removed
//   const filteredMenuItems = allMenuItems.filter(item => {
//     if (!item.adminOnly) return true;
//     return normalizedRole === 'admin'; 
//   });

//   // Helper to cleanly determine subtitle banner text
//   const getPanelSubtitle = () => {
//     if (normalizedRole === 'admin') return 'Admin Dashboard';
//     if (normalizedRole === 'agent') return 'Agent Control Panel';
//     return 'Customer Portal';
//   };

//   return (
//     <div className="dashboard-layout">
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <h3>SEWA LOGISTICS</h3>
//           <p>{getPanelSubtitle()}</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           {filteredMenuItems.map((item) => (
//             <button 
//               key={item.id}
//               className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <span className="icon">{item.icon}</span>
//               <span className="label">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">
//           <button className="logout-btn" onClick={onLogout}>Logout Exit</button>
//         </div>
//       </aside>

//       <main className="dashboard-content">
//         <div className="content-body">
//           {activeTab === 'add-shipment' ? (
//             /* FIXED: Extracts 'id' but passes fallback string configuration parameters down cleanly */
//             <ShipmentStepper userId={user?.id || user?.userId || localStorage.getItem('sewa_user_id')} />
//           ) : activeTab === 'all-shipments' ? (
//             <ViewShipments user={user} />
//           ) : activeTab === 'agents' && normalizedRole === 'admin' ? ( 
//             <ManageAgents />                                          
//           ) :  (
//             <div className="placeholder-view">
//               {allMenuItems.find(i => i.id === activeTab)?.adminOnly && normalizedRole !== 'admin' ? (
//                 <h2>Access Denied</h2>
//               ) : (
//                 <>
//                   <h2>{activeTab.replace('-', ' ').toUpperCase()}</h2>
//                   <p>This section is under construction.</p>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;














// import React, { useState, useEffect } from 'react';
// import "/src/styles/Dashboard.css";
// import ShipmentStepper from '../components/ShipmentStepper'; 
// import ManageAgents from './ManageAgents'; 
// import ViewShipments from './ViewShipments';
// import DashboardOverview from './DashboardOverview'; // 📦 IMPORT NEW OVERVIEW COMPONENT
// import SettingsView from './SettingsView';

// const Dashboard = ({ onLogout, user }) => {
//   const normalizedRole = user?.role?.toLowerCase() || '';
  
//   // ⚙️ ADJUSTED STARTING DEFAULT TAB: Admin launches into overview, others default to create shipment
//   const [activeTab, setActiveTab] = useState(
//     normalizedRole === 'admin' ? 'overview' : 'add-shipment'
//   );

//   useEffect(() => {
//     console.log("📊 Active Dashboard Identity Trace:", user);
//   }, [user]);

//   const allMenuItems = [
//     { id: 'overview', label: 'Dashboard Overview', icon: '📊', adminOnly: true },
//     { id: 'add-shipment', label: 'Create Shipment', icon: '📦', adminOnly: false },
//     { id: 'all-shipments', label: 'View Shipments', icon: '📋', adminOnly: false },
//     { id: 'agents', label: 'Manage Agents', icon: '👥', adminOnly: true },
//     { id: 'settings', label: 'Settings', icon: '⚙️', adminOnly: false },
//   ];

//   const filteredMenuItems = allMenuItems.filter(item => {
//     if (!item.adminOnly) return true;
//     return normalizedRole === 'admin'; 
//   });

//   const getPanelSubtitle = () => {
//     if (normalizedRole === 'admin') return 'Admin Dashboard';
//     if (normalizedRole === 'agent') return 'Agent Control Panel';
//     return 'Customer Portal';
//   };

//   return (
//     <div className="dashboard-layout">
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <h3>SEWA LOGISTICS</h3>
//           <p>{getPanelSubtitle()}</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           {filteredMenuItems.map((item) => (
//             <button 
//               key={item.id}
//               className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <span className="icon">{item.icon}</span>
//               <span className="label">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">
//           <button className="logout-btn" onClick={onLogout}>Logout Exit</button>
//         </div>
//       </aside>

//       <main className="dashboard-content">
//         <div className="content-body">
//           {/* ⚡ ACTIVE TAB CONDITIONAL ROUTING RENDERING MATRIX */}
//           {activeTab === 'overview' && normalizedRole === 'admin' ? (
//             <DashboardOverview />
//           ) : activeTab === 'add-shipment' ? (
//             <ShipmentStepper userId={user?.id || user?.userId || localStorage.getItem('sewa_user_id')} />
//           ) : activeTab === 'all-shipments' ? (
//             <ViewShipments user={user} />
//           ) : activeTab === 'agents' && normalizedRole === 'admin' ? ( 
//             <ManageAgents />                                          
//           ) : activeTab === 'settings' ? (
//       <SettingsView user={user} /> // ⚙️ Renders the settings component cleanly
//     )
//           : (
//             <div className="placeholder-view">
//               {allMenuItems.find(i => i.id === activeTab)?.adminOnly && normalizedRole !== 'admin' ? (
//                 <h2>Access Denied</h2>
//               ) : (
//                 <>
//                   <h2>{activeTab.replace('-', ' ').toUpperCase()}</h2>
//                   <p>This section is under construction.</p>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;














// import React, { useState, useEffect } from 'react';
// import "/src/styles/Dashboard.css";
// import ShipmentStepper from '../components/ShipmentStepper'; 
// import ManageAgents from './ManageAgents'; 
// import ViewShipments from './ViewShipments';
// import DashboardOverview from './DashboardOverview'; // 📦 IMPORT NEW OVERVIEW COMPONENT
// import SettingsView from './SettingsView';
// // 🌟 IMPORT THE PRICING MANAGEMENT COMPONENT
// import PricingManagement from './PricingManagement'; 

// const Dashboard = ({ onLogout, user }) => {
//   const normalizedRole = user?.role?.toLowerCase() || '';
  
//   const [activeTab, setActiveTab] = useState(
//     normalizedRole === 'admin' ? 'overview' : 'add-shipment'
//   );

//   useEffect(() => {
//     console.log("📊 Active Dashboard Identity Trace:", user);
//   }, [user]);

//   const allMenuItems = [
//     { id: 'overview', label: 'Dashboard Overview', icon: '📊', adminOnly: true },
//     { id: 'add-shipment', label: 'Create Shipment', icon: '📦', adminOnly: false },
//     { id: 'all-shipments', label: 'View Shipments', icon: '📋', adminOnly: false },
//     { id: 'agents', label: 'Manage Agents', icon: '👥', adminOnly: true },
//     // 🌟 ADDED: Dynamic Pricing Configuration item mapped strictly to admins
//     { id: 'pricing', label: 'Shipping Pricing', icon: '💰', adminOnly: true },
//     { id: 'settings', label: 'Settings', icon: '⚙️', adminOnly: false },
//   ];

//   const filteredMenuItems = allMenuItems.filter(item => {
//     if (!item.adminOnly) return true;
//     return normalizedRole === 'admin'; 
//   });

//   const getPanelSubtitle = () => {
//     if (normalizedRole === 'admin') return 'Admin Dashboard';
//     if (normalizedRole === 'agent') return 'Agent Control Panel';
//     return 'Customer Portal';
//   };

//   return (
//     <div className="dashboard-layout">
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <h3>SEWA LOGISTICS</h3>
//           <p>{getPanelSubtitle()}</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           {filteredMenuItems.map((item) => (
//             <button 
//               key={item.id}
//               className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <span className="icon">{item.icon}</span>
//               <span className="label">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">
//           <button className="logout-btn" onClick={onLogout}>Logout Exit</button>
//         </div>
//       </aside>

//       <main className="dashboard-content">
//         <div className="content-body">
//           {/* ⚡ ACTIVE TAB CONDITIONAL ROUTING RENDERING MATRIX */}
//           {activeTab === 'overview' && normalizedRole === 'admin' ? (
//             <DashboardOverview />
//           ) : activeTab === 'add-shipment' ? (
//             <ShipmentStepper userId={user?.id || user?.userId || localStorage.getItem('sewa_user_id')} />
//           ) : activeTab === 'all-shipments' ? (
//             <ViewShipments user={user} />
//           ) : activeTab === 'agents' && normalizedRole === 'admin' ? ( 
//             <ManageAgents />                                          
//           ) : activeTab === 'pricing' && normalizedRole === 'admin' ? (
//             /* 🌟 RENDER THE PRICING TABLE COMPONENT SAFELY HERE */
//             <PricingManagement />
//           ) : activeTab === 'settings' ? (
//             <SettingsView user={user} /> 
//           ) : (
//             <div className="placeholder-view">
//               {allMenuItems.find(i => i.id === activeTab)?.adminOnly && normalizedRole !== 'admin' ? (
//                 <h2>Access Denied</h2>
//               ) : (
//                 <>
//                   <h2>{activeTab.replace('-', ' ').toUpperCase()}</h2>
//                   <p>This section is under construction.</p>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;












import React, { useState, useEffect } from 'react';
import "/src/styles/Dashboard.css";
import ShipmentStepper from '../components/ShipmentStepper'; 
import ManageAgents from './ManageAgents'; 
import ViewShipments from './ViewShipments';
import DashboardOverview from './DashboardOverview'; // 📦 IMPORT NEW OVERVIEW COMPONENT
import SettingsView from './SettingsView';
// 🌟 IMPORT THE PRICING MANAGEMENT COMPONENT
import PricingManagement from './PricingManagement'; 

const Dashboard = ({ onLogout, user }) => {
  const normalizedRole = user?.role?.toLowerCase() || '';
  
  // State to track if sidebar is collapsed
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [activeTab, setActiveTab] = useState(
    normalizedRole === 'admin' ? 'overview' : 'add-shipment'
  );

  useEffect(() => {
    console.log("📊 Active Dashboard Identity Trace:", user);
  }, [user]);

  const allMenuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊', adminOnly: true },
    { id: 'add-shipment', label: 'Create Shipment', icon: '📦', adminOnly: false },
    { id: 'all-shipments', label: 'View Shipments', icon: '📋', adminOnly: false },
    { id: 'agents', label: 'Manage Agents', icon: '👥', adminOnly: true },
    // 🌟 ADDED: Dynamic Pricing Configuration item mapped strictly to admins
    { id: 'pricing', label: 'Shipping Pricing', icon: '💰', adminOnly: true },
    { id: 'settings', label: 'Settings', icon: '⚙️', adminOnly: false },
  ];

  const filteredMenuItems = allMenuItems.filter(item => {
    if (!item.adminOnly) return true;
    return normalizedRole === 'admin'; 
  });

  const getPanelSubtitle = () => {
    if (normalizedRole === 'admin') return 'Admin Dashboard';
    if (normalizedRole === 'agent') return 'Agent Control Panel';
    return 'Customer Portal';
  };

  return (
    <div className={`dashboard-layout ${isSidebarCollapsed ? 'sidebar-hidden' : ''}`}>
      
      {/* 1. Toggle Button on top header line */}
      <button 
        type="button" 
        className="sidebar-toggle-btn" 
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        aria-label="Toggle Sidebar"
      >
        {isSidebarCollapsed ? '☰' : '✕'}
      </button>

      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h3>SEWA LOGISTICS</h3>
          <p>{getPanelSubtitle()}</p>
        </div>
        
        <nav className="sidebar-nav">
          {filteredMenuItems.map((item) => (
            <button 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </aside>

      <main className="dashboard-content">
        <div className="content-body">
          {/* ⚡ ACTIVE TAB CONDITIONAL ROUTING RENDERING MATRIX */}
          {activeTab === 'overview' && normalizedRole === 'admin' ? (
            <DashboardOverview />
          ) : activeTab === 'add-shipment' ? (
            <ShipmentStepper userId={user?.id || user?.userId || localStorage.getItem('sewa_user_id')} />
          ) : activeTab === 'all-shipments' ? (
            <ViewShipments user={user} />
          ) : activeTab === 'agents' && normalizedRole === 'admin' ? ( 
            <ManageAgents />                                          
          ) : activeTab === 'pricing' && normalizedRole === 'admin' ? (
            /* 🌟 RENDER THE PRICING TABLE COMPONENT SAFELY HERE */
            <PricingManagement />
          ) : activeTab === 'settings' ? (
            <SettingsView user={user} /> 
          ) : (
            <div className="placeholder-view">
              {allMenuItems.find(i => i.id === activeTab)?.adminOnly && normalizedRole !== 'admin' ? (
                <h2>Access Denied</h2>
              ) : (
                <>
                  <h2>{activeTab.replace('-', ' ').toUpperCase()}</h2>
                  <p>This section is under construction.</p>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;