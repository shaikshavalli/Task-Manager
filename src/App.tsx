import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import ExploreTask from './pages/ExploreTask';
import DetailTask from './pages/DetailTask';
import Mentors from './pages/Mentors';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import HelpCenter from './components/HelpCenter';

type Page = 'overview' | 'task' | 'mentors' | 'messages' | 'settings' | 'detail-task' | 'chat';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedChatContact, setSelectedChatContact] = useState<number | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview onNavigateToDetail={() => setCurrentPage('detail-task')} />;
      case 'task':
        return <ExploreTask onNavigateToDetail={() => setCurrentPage('detail-task')} />;
      case 'detail-task':
        return <DetailTask />;
      case 'mentors':
        return <Mentors />;   
      case 'messages':
        return (
          <Messages
            onOpenChat={(contactId) => {
              setSelectedChatContact(contactId);
              setCurrentPage('chat');
            }}
          />
        );
      case 'chat':
        return (
          <Chat
            contactId={selectedChatContact}
            onBack={() => setCurrentPage('messages')}
          />
        );
      case 'settings':
        return <Settings />;
      default:
        return <Overview onNavigateToDetail={() => setCurrentPage('detail-task')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">

        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 lg:ml-64 p-4 transition-all duration-300 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>

      <HelpCenter />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
