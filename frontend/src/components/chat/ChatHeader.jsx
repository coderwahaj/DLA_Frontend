import { MessageSquare } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="bg-white border-b-2 border-gray-300 px-6 lg:px-10 py-6 lg:py-8">
      <div className="flex items-center gap-3">
        <h1 
          className="text-3xl lg:text-4xl font-bold text-gray-900"
          style={{ fontFamily: 'Ropa Sans' }}
        >
          Chat
        </h1>
        <MessageSquare 
          size={44} 
          className="text-gray-900" 
          strokeWidth={1.2} 
        />
      </div>
    </div>
  );
};

export default ChatHeader;