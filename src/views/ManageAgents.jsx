import React, { useState, useEffect } from 'react';
import "/src/styles/ManageAgents.css"
const ManageAgents = () => {
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch the active agent directory list on component mount
  const fetchAgents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/agents');
      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      }
    } catch (error) {
      console.error('Error connecting to backend agent directory:', error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/agents/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || 'Failed to create agent profile.');
      } else {
        setSuccessMessage(result.message);
        setFormData({ full_name: '', email: '', password: '' }); // Clear input fields
        fetchAgents(); // Refresh the table list data
      }
    } catch (error) {
      setErrorMessage('Network error connecting to administration server.');
    }
  };

    return (
    <div className="agents-container">
        <h2>📋 Manage Logistics Agents</h2>
        
        {/* 📊 Agent Registry Directory Table */}
        <div className="table-card">
        <table className="agents-table">
            <thead>
            <tr>
                <th>Agent ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Status</th>
                <th>Date Created</th>
            </tr>
            </thead>
            <tbody>
            {agents.length === 0 ? (
                <tr>
                <td colSpan="5" className="empty-state">No agents registered yet.</td>
                </tr>
            ) : (
                agents.map((agent) => (
                <tr key={agent.id}>
                    <td className="agent-id-badge">{agent.agent_id}</td>
                    <td>{agent.full_name}</td>
                    <td>{agent.email}</td>
                    <td>
                    <span className="status-badge-verified">Verified Active</span>
                    </td>
                    <td>{new Date(agent.created_at).toLocaleDateString()}</td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>

        <hr className="section-divider" />

        {/* ➕ Agent Entry Registration Form */}
        <div className="form-card">
        <h3>➕ Create a New Agent</h3>
        {/* <p className="form-subtitle">Creates an instant verified account bypassing client-side email OTP verification blocks.</p> */}

        {errorMessage && <div className="alert-error">{errorMessage}</div>}
        {successMessage && <div className="alert-success">{successMessage}</div>}

        <form onSubmit={handleCreateAgent}>
            <div className="form-group">
            <label>Full Name:</label>
            <input 
                type="text" name="full_name" className="form-input" 
                value={formData.full_name} onChange={handleInputChange} required 
            />
            </div>

            <div className="form-group">
            <label>Email Address:</label>
            <input 
                type="email" name="email" className="form-input" 
                value={formData.email} onChange={handleInputChange} required 
            />
            </div>

            <div className="form-group">
            <label>Temporary Access Password:</label>
            <input 
                type="password" name="password" className="form-input" 
                value={formData.password} onChange={handleInputChange} required 
            />
            </div>

            <button type="submit" className="submit-btn">
            Register & Activate Agent Account
            </button>
        </form>
        </div>
    </div>
    );
    };
export default ManageAgents;