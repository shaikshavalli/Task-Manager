import React, { useState } from 'react';
import Header from '../components/Header';
import { Search, Filter, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface ExploreTaskProps {
  onNavigateToDetail: () => void;
}

const ExploreTask: React.FC<ExploreTaskProps> = ({ onNavigateToDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const timeLimitTasks = [
    {
      id: 1,
      title: 'Creating Awesome Mobile Apps',
      category: 'UI/UX Design',
      progress: 90,
      timeLeft: '1 Hour',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      avatars: [1, 2, 3, 4]
    },
    {
      id: 2,
      title: 'Creating Fresh Website',
      category: 'Web Developer',
      progress: 85,
      timeLeft: '2 Hour',
      image: 'https://images.pexels.com/photos/326424/pexels-photo-326424.jpeg?auto=compress&cs=tinysrgb&w=400',
      avatars: [5, 6, 7, 8]
    },
    {
      id: 3,
      title: 'Creating Color Palettes',
      category: 'UI/UX Design',
      progress: 100,
      timeLeft: '1 Hour',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      avatars: [9, 10, 11, 12]
    }
  ];

  const newTasks = [
    {
      id: 4,
      title: 'Creating Mobile App Design',
      category: 'UI/UX Design',
      progress: 75,
      timeLeft: '3 Days Left',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      avatars: [13, 14, 15, 16]
    },
    {
      id: 5,
      title: 'Creating Perfect Website',
      category: 'Web Developer',
      progress: 85,
      timeLeft: '4 Days Left',
      image: 'https://images.pexels.com/photos/326424/pexels-photo-326424.jpeg?auto=compress&cs=tinysrgb&w=400',
      avatars: [17, 18, 19, 20]
    },
    {
      id: 6,
      title: 'Mobile App Design',
      category: 'UI/UX Design',
      progress: 65,
      timeLeft: '5 Days Left',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      avatars: [21, 22, 23, 24]
    }
  ];

  const TaskCard = ({ task }: { task: any }) => (
    <div 
      className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
      onClick={onNavigateToDetail}
    >
      <img
        src={task.image}
        alt={task.title}
        className="w-full h-48 object-cover group-hover:opacity-95 transition-opacity"
      />
      
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {task.title}
        </h4>
        <p className="text-sm text-gray-600 mb-3">{task.category}</p>
        
        <div className="mb-4">
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
                src={`https://images.pexels.com/photos/${1239290 + (i % 10)}/pexels-photo-${1239290 + (i % 10)}.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&dpr=2`}
                alt={`Avatar ${i}`}
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header title="Explore Task" />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Task"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>Category</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Sort By: Deadline</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Time Limit</h2>
            
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <ChevronLeft size={16} className="text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <ChevronRight size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeLimitTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">New Task</h2>
            
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <ChevronLeft size={16} className="text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <ChevronRight size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreTask;