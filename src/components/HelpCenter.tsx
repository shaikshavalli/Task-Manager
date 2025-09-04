import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
        >
          <HelpCircle size={24} />
        </button>
      ) : (
        <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 w-64">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Help Center</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-300 text-sm">
              Having trouble in Learning?
              Please contact us for more questions
            </p>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Go To Help Center
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;