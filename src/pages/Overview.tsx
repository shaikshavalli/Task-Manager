import React from 'react';
import Header from '../components/Header';
import RunningTaskWidget from '../components/RunningTaskWidget';
import ActivityGraph from '../components/ActivityGraph';
import Calendar from '../components/Calendar';
import TaskToday from '../components/TaskToday';
import MonthlyMentors from '../components/MonthlyMentors';
import UpcomingTasks from '../components/UpcomingTasks';

interface OverviewProps {
  onNavigateToDetail: () => void;
}

const Overview: React.FC<OverviewProps> = ({ onNavigateToDetail }) => {
  return (
    <div className="min-h-screen">
      <Header 
        title="Hi, Dennis Nzioki"
        subtitle="Let's finish your task today!"
      />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RunningTaskWidget />
              <ActivityGraph />
            </div>
            
            <MonthlyMentors />
            <UpcomingTasks onNavigateToDetail={onNavigateToDetail} />
          </div>
          
          <div className="space-y-6">
            <Calendar />
            <TaskToday onNavigateToDetail={onNavigateToDetail} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;