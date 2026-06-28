import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'May 31', lessons: 1 },
  { name: 'Jun 22', lessons: 1 },
  { name: 'Jun 25', lessons: 1 },
  { name: 'Jun 26', lessons: 4 },
];


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#1e3d2f', color: '#fff', padding: '10px', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{payload[0].payload.name}</p>
        <p style={{ margin: 0 }}>lessons : {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function ContributionChart() {
  return (
    <div style={{ width: '100%', height: 300, background: '#fff', padding: '20px', borderRadius: '16px' }}>
      <h3 style={{ color: '#1e3d2f', fontFamily: 'serif' }}>Contribution Insight</h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
           
            <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e3d2f" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#1e3d2f" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" reversed /> 
          <YAxis domain={[0, 3]} ticks={[0, 0.75, 1.5, 2.25, 3]} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="lessons" stroke="#1e3d2f" strokeWidth={3} fillOpacity={1} fill="url(#colorLessons)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}