import React, { useState } from 'react';
import Header from '../components/Header';
import { Search, MessageCircle } from 'lucide-react';

interface MessagesProps {
  onOpenChat: (contactId: number) => void;
}

const Messages: React.FC<MessagesProps> = ({ onOpenChat }) => {
  const [selectedContact, setSelectedContact] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastMessage: 'Hey! How is your project going?',
      timestamp: '2 min ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2',
      online: true,
      unread: 2
    },
    {
      id: 2,
      name: 'Mike Chen',
      lastMessage: 'The design looks amazing!',
      timestamp: '15 min ago',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2',
      online: false,
      unread: 0
    },
    {
      id: 3,
      name: 'Emma Wilson',
      lastMessage: 'Can you review my mockups?',
      timestamp: '1 hour ago',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2',
      online: true,
      unread: 1
    },
    {
      id: 4,
      name: 'David Rodriguez',
      lastMessage: 'Thanks for the feedback!',
      timestamp: '3 hours ago',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2',
      online: false,
      unread: 0
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header title="Messages" />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto"
                  />
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 mt-3">{contact.name}</h4>
                <p className="text-sm text-gray-600">{contact.online ? 'Online' : 'Offline'}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 text-center italic">"{contact.lastMessage}"</p>
                <p className="text-xs text-gray-500 text-center mt-1">{contact.timestamp}</p>
              </div>
              
              {contact.unread > 0 && (
                <div className="mb-4 text-center">
                  <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {contact.unread} new message{contact.unread > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              
              <button
                onClick={() => onOpenChat(contact.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle size={16} />
                <span>Open Chat</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;