import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import PlatformSidebar from '@/components/shared/PlatformSidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';

const Platform = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSendMessage = async (content) => {
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp:  new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (Replace with actual API call later)
    setTimeout(() => {
      const botMessage = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        title: '📋 Step-by-Step Guide',
        content:  generateMockResponse(content),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const generateMockResponse = (query) => {
    // Mock response - Replace with actual API integration
    return `To ${query. toLowerCase()}, you need to follow these comprehensive steps:\n\n1. Register with the relevant Pakistani authorities\n2. Complete all required documentation\n3. Submit your application through the official portal\n4. Wait for processing and approval\n5. Receive your confirmation and credentials\n\nThis process typically takes 2-4 weeks. Make sure all your documents are properly verified and authenticated before submission.  For more specific guidance, please consult with a legal professional.`;
  };

  const handleHistoryClick = (query) => {
    handleSendMessage(query);
  };

  const handleFeedback = (type, messageId) => {
    console.log(`Feedback:  ${type} for message ${messageId}`);
    // TODO: Send feedback to backend
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - SAME AS DOCUMENT SUMMARIZER */}
      <header className="bg-[#29473E] h-20 lg:h-28 flex items-center justify-between px-4 lg: px-16 border-b-2 border-black flex-shrink-0">
        {/* Logo */}
        <div className="flex-1 flex items-center">
          <img
            src="/logo.png"
            alt="Digital Legal Advisor"
            className="h-16 lg:h-24 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4 lg:gap-10">
          {/* User Info */}
          <button className="hidden md:flex items-center gap-2 lg:gap-3 px-3 lg:px-6 py-2 lg: py-3 rounded-lg bg-transparent hover:bg-white hover:bg-opacity-10 transition-colors">
            <User size={24} className="text-gray-100 lg:w-7 lg:h-7" strokeWidth={1.5} />
            <span 
              className="text-gray-100 font-semibold text-sm lg:text-base"
              style={{ fontFamily: 'Noto Sans' }}
            >
              {user?.firstName || 'User'}
            </span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 lg:gap-3 px-3 lg:px-6 py-2 lg: py-3 rounded-lg border-2 border-gray-100 bg-transparent hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            <LogOut size={24} className="text-gray-100 lg:w-7 lg:h-7" strokeWidth={1.5} />
            <span 
              className="text-gray-100 font-normal text-sm lg:text-base"
              style={{ fontFamily:  'Noto Sans' }}
            >
              Log Out
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(! sidebarOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0' :  '-translate-x-full'
          } md:translate-x-0 fixed md:relative w-72 lg:w-96 h-full transition-transform duration-300 z-50 md: z-auto`}
        >
          <PlatformSidebar onHistoryClick={(query) => {
            handleHistoryClick(query);
            setSidebarOpen(false);
          }} />
        </div>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden md:border-l-2 md:border-gray-300">
          <ChatHeader />
          <ChatMessages 
            messages={messages} 
            onFeedback={handleFeedback}
          />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="px-4 lg:px-10 py-4">
              <div className="flex gap-3 lg:gap-4 items-start">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center border-2 border-gray-400">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 lg:px-6 py-3 lg:py-4">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <span 
                    className="ml-2 text-gray-600"
                    style={{ fontFamily: 'Noto Sans' }}
                  >
                    Thinking. ...... 
                  </span>
                </div>
              </div>
            </div>
          )}

          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </main>
      </div>
    </div>
  );
};

export default Platform;