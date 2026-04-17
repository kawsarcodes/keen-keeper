import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export default function Stats() {
  const { timeline } = useOutletContext();

  const data = useMemo(() => {
    let callCount = 0;
    let textCount = 0;
    let videoCount = 0;

    (timeline || []).forEach(entry => {
      if (entry.type === 'Call') callCount++;
      else if (entry.type === 'Text') textCount++;
      else if (entry.type === 'Video') videoCount++;
    });

    return [
      { name: 'Text', value: textCount || 1, color: '#8b5cf6' },  
      { name: 'Call', value: callCount || 1, color: '#1f4d36' },  
      { name: 'Video', value: videoCount || 1, color: '#34a853' }, 
    ];
  }, [timeline]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-[#1e293b] mb-8">
          Friendship Analytics
        </h1>
        
        <div className="bg-white p-10 rounded-sm shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-[#244D3F] mb-8">
            By Interaction Type
          </h2>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  innerRadius={82} 
                  outerRadius={100}
                  paddingAngle={5}
                  cornerRadius={6} 
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="circle"
                  iconSize={6}
                  formatter={(value) => (
                    <span className="text-xs font-medium text-gray-400 ml-1">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}