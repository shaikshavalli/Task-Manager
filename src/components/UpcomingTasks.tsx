import React, { useState } from 'react';

import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface UpcomingTasksProps {
  onNavigateToDetail: () => void;
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ onNavigateToDetail }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const tasks = [
    {
      id: 1,
      title: 'Creating Mobile App Design',
      category: 'UI/UX Design',
      progress: 75,
      timeLeft: '3 Days Left',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      avatars: [1, 2, 3, 4]
    },
    {
      id: 2,
      title: 'Creating Perfect Website',
      category: 'Web Developer',
      progress: 85,
      timeLeft: '4 Days Left',
      image: 'https://images.pexels.com/photos/326424/pexels-photo-326424.jpeg?auto=compress&cs=tinysrgb&w=400',
      avatars: [5, 6, 7, 8]
    }
  ];
  
  const visibleTasks = tasks.slice(currentIndex, currentIndex + 2);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Task</h3>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
          <button 
            onClick={() => setCurrentIndex(Math.min(tasks.length - 2, currentIndex + 1))}
            disabled={currentIndex >= tasks.length - 2}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleTasks.map((task) => (
          <div 
            key={task.id} 
            className="cursor-pointer group hover:shadow-md transition-shadow"
            onClick={onNavigateToDetail}
          >
            <img
              src={task.image}
              alt={task.title}
              className="w-full h-40 object-cover rounded-lg mb-4 group-hover:opacity-95 transition-opacity"
            />
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {task.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{task.category}</p>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>{task.timeLeft}</span>
                </div>
                
                <div className="flex -space-x-2">
                  {task.avatars.map((i) => (
                    <img
                      key={i}
                      src={`https://images.pexels.com/photos/${1239290 + i}/pexels-photo-${1239290 + i}.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&dpr=2`}
                      alt={`Avatar ${i}`}
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;