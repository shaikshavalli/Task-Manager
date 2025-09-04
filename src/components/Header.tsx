import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  userName?: string;
  userAvatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  userName = 'User Avatar',
  userAvatarUrl = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
}) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 lg:ml-64 min-h-[64px]">
      <div className="w-full pl-2 pr-4 flex items-center justify-between">
        
        <div className="flex flex-col justify-center text-left space-y-1">
          <h1 className="text-2xl font-bold leading-tight text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm leading-snug text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            aria-label="Notifications"
            className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 block w-2.5 h-2.5 bg-red-500 rounded-full" />
          </button>

          <img
            src={userAvatarUrl}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

