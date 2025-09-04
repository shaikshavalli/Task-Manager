import React, { useState } from 'react';
import Header from '../components/Header';
import { ArrowLeft, Send, Paperclip, Smile, Phone, Video } from 'lucide-react';

interface ChatProps {
  contactId: number | null;
  onBack: () => void;
}

const Chat: React.FC<ChatProps> = ({ contactId, onBack }) => {
  const [newMessage, setNewMessage] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2',
      online: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2',
      online: false
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2',
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: contactId,
      content: 'Hey! How is your project going?',
      timestamp: '2:30 PM',
      isMe: false
    },
    {
      id: 2,
      senderId: 'me',
      content: 'It\'s going great! Almost finished with the mobile app design.',
      timestamp: '2:32 PM',
      isMe: true
    },
    {
      id: 3,
      senderId: contactId,
      content: 'That\'s awesome! Can\'t wait to see the final result.',
      timestamp: '2:33 PM',
      isMe: false
    },
    {
      id: 4,
      senderId: 'me',
      content: 'I\'ll share it with you once it\'s ready for review.',
      timestamp: '2:35 PM',
      isMe: true
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    return (
      <div className="min-h-screen">
        <Header title="Chat" />
        <div className="p-6 text-center">
          <p className="text-gray-600">Contact not found</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Messages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {contact.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">{contact.name}</h4>
              <p className="text-sm text-gray-600">
                {contact.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Video size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isMe
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isMe ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip size={20} />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                <Smile size={16} />
              </button>
            </div>
            
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;