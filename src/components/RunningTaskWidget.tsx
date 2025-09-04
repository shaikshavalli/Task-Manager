import React from 'react';

const RunningTaskWidget: React.FC = () => {
  const progress = 45;
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-gray-900 rounded-xl p-6 text-white relative overflow-hidden">
      <h3 className="text-lg font-medium mb-4">Running Task</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold mb-2">65</div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-400 text-lg font-semibold">{progress}%</span>
            <div className="text-gray-400">
              <span className="text-2xl font-bold">100</span>
              <div className="text-sm">Task</div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3B82F6"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunningTaskWidget;