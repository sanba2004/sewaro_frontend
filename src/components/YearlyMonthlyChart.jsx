// src/components/YearlyMonthChart.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const YearlyMonthChart = () => {
  const currentYear = new Date().getFullYear();
  
  // 🗓️ Dynamic Date Controlled Matrix State
  const [startYear, setStartYear] = useState(currentYear - 1); // Default is previous year
  const [endYear, setEndYear] = useState(currentYear);         // Default is current year
  const [chartMatrix, setChartMatrix] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate a dynamic list of years for selection boundaries (e.g., from 2020 to Now+2)
  const availableYears = useMemo(() => {
    const years = [];
    for (let y = 2020; y <= currentYear + 2; y++) years.push(y);
    return years;
  }, [currentYear]);

  // Fetch chart-specific analytics data whenever dynamic dates change boundary targets
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);
        setChartMatrix(null); // Clean previous matrix

        const response = await fetch(`http://localhost:5000/api/admin/analytics/volume-matrix?startYear=${startYear}&endYear=${endYear}`);
        
        if (!response.ok) {
          throw new Error('Database analytics engine failure computing yearly matrix trace.');
        }

        const result = await response.json();
        if (result.success) {
          setChartMatrix(result.data.chartMatrix);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [startYear, endYear]);

  // Matrix adapter: Combines the year-grouped data structure into the flat array required by recharts
  const rechartsAdaptedData = useMemo(() => {
    if (!chartMatrix) return [];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Safety check ensuring years are integers in correct order before iterating boundaries
    const sYear = parseInt(startYear, 10);
    const eYear = parseInt(endYear, 10);
    const configuredStart = Math.min(sYear, eYear);
    const configuredEnd = Math.max(sYear, eYear);

    // Creates an entry for each month, and populates the data key for every active year target
    return monthNames.map(month => {
      const adaptedEntry = { name: month };
      for (let year = configuredStart; year <= configuredEnd; year++) {
        adaptedEntry[year] = chartMatrix[year]?.[month] || 0; // Merges the volume metric count trace
      }
      return adaptedEntry;
    });
  }, [chartMatrix, startYear, endYear]);

  // UI rendering conditions based on the dynamic analytics state matrix engine
  if (loading) return <div className="chart-loading"><div className="spin-inline"></div>Calculating matrix indicators...</div>;
  if (error) return <div className="chart-error"><h3>❌ Operational Trace Failure</h3><p>{error}</p></div>;
  if (!chartMatrix || rechartsAdaptedData.length === 0) return <div className="chart-empty">Initialize date configuration to query metrics.</div>;

  // Dynamically configure chart visual parameters based on how many years are actively selected
  const yearsActive = availableYears.filter(y => y >= startYear && y <= endYear);
  const isMultiYear = yearsActive.length > 1;
  const colors = ["#2563eb", "#f59e0b", "#10b981", "#ef4444", "#64748b"]; // Blues, Ambers, Greens, Reds, Slates

  return (
    <div className="yearly-chart-module">
      
      {/* 🗓️ Dynamic Date Configured Selector Matrix control row */}
      <div className="chart-controls no-print">
        <label>Analytics Range From Year:
          <select value={startYear} onChange={(e) => setStartYear(parseInt(e.target.value, 10))}>
            {availableYears.map(year => <option key={`start-${year}`} value={year}>{year}</option>)}
          </select>
        </label>
        <label>To Year:
          <select value={endYear} onChange={(e) => setEndYear(parseInt(e.target.value, 10))}>
            {availableYears.map(year => <option key={`end-${year}`} value={year}>{year}</option>)}
          </select>
        </label>
      </div>

      {/* 📊 High Performance Chart Render Area optimized for varying datasets mapping */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={rechartsAdaptedData}
            margin={{ top: 20, right: 30, left: -10, bottom: 5 }}
            barGap={4} // Grouped bars have small spacing
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 13, fill: '#64748b' }} axisLine={false} tickLine={false} label={{ value: 'Tracking Volume', angle: -90, position: 'insideLeft', offset: 18, fill: '#1e293b', fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }} cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
            {isMultiYear && <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '15px' }} iconType="rect" />}
            
            {/* Creates a Bar module element for each unique year boundary detected in the dataset mapping */}
            {yearsActive.map((year, index) => (
              <Bar 
                key={year} 
                dataKey={year} 
                fill={colors[index % colors.length]} 
                radius={[4, 4, 0, 0]} 
                name={isMultiYear ? `Shipments: ${year}` : 'Active Total Tracking Matrix'}
              >
                {/* Adds numbers directly on top of bars if looking at a single year boundary */}
                {!isMultiYear && <LabelList dataKey={year} position="top" fill="#1e293b" fontSize={11} />}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearlyMonthChart;