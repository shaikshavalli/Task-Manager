import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface TaskTodayProps {
  onNavigateToDetail: () => void;
}

const TaskToday: React.FC<TaskTodayProps> = ({ onNavigateToDetail }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Task Today</h3>
        <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
          <MoreHorizontal size={16} className="text-gray-400" />
        </button>
      </div>
      
      <div className="space-y-4">
        <img
          src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Task preview"
          className="w-full h-32 object-cover rounded-lg"
        />
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Creating Awesome Mobile Apps</h4>
          <p className="text-sm text-gray-600 mb-3">UI/UX Designer</p>
          
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>90%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">1 Hour</span>
            </div>
            
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://images.pexels.com/photos/${1239290 + i}/pexels-photo-${1239290 + i}.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2`}
                  alt={`Avatar ${i}`}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </div>
        </div>
        
        <button
          onClick={onNavigateToDetail}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Go To Detail
        </button>
      </div>
    </div>
  );
};

export default TaskToday;