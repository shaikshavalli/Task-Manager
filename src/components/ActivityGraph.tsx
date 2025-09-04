import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityGraph: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [data, setData] = useState<number[]>([0,0,0,0,0,0,0]);

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get('http://localhost:5000/api/tasks');
      const tasks = res.data;

      const counts = [0,0,0,0,0,0,0];
      tasks.forEach((task: any) => {
        const day = new Date(task.createdAt).getDay(); // 0=Sun...6=Sat
        counts[day]++;
      });

      setData(counts);
    };
    fetchTasks();
  }, [selectedPeriod]);

  // ✅ Generate SVG path from points
  const getPath = () => {
    let path = '';
    data.forEach((value, index) => {
      const x = 20 + index * 40;
      const y = 80 - value * 15;

      if (index === 0) {
        path = `M ${x},${y}`;
      } else {
        path += ` L ${x},${y}`; // straight line, can switch to Q for curves
      }
    });
    return path;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-2 py-1"
        >
          <option value="This Week">This Week</option>
          <option value="Last Week">Last Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* hover info */}
      <div className="bg-black rounded-lg px-3 py-2 mb-4 inline-block">
        <span className="text-white text-sm font-medium">
          {hoveredDay !== null
            ? `${data[hoveredDay]} Task${data[hoveredDay] !== 1 ? 's' : ''}`
            : 'Hover a day'}
        </span>
      </div>

      {/* graph */}
      <div className="relative h-24" onMouseLeave={() => setHoveredDay(null)}>
        <svg className="w-full h-full" viewBox="0 0 300 100">
          <path
            d={getPath()}
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
          />
          {data.map((value, index) => {
            const x = 20 + index * 40;
            const y = 80 - value * 15;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={hoveredDay === index ? "6" : "4"}
                fill="#3B82F6"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredDay(index)}
              />
            );
          })}
        </svg>
      </div>

      {/* days */}
      <div className="flex justify-between mt-4 text-sm">
        {weekDays.map((day, i) => (
          <span
            key={i}
            className={`cursor-pointer ${hoveredDay === i ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
            onMouseEnter={() => setHoveredDay(i)}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ActivityGraph;
