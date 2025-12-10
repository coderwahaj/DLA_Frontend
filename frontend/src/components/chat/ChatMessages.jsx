import { useEffect, useRef } from 'react';
import Message from './Message';

const ChatMessages = ({ messages, onFeedback }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?. scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Empty state
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
            >
              <path
                d="M20 0.625C8.95161 0.625 0 9.29688 0 20C0 30.7031 8.95161 39.375 20 39.375C31.0484 39.375 40 30.7031 40 20C40 9.29688 31.0484 0.625 20 0.625ZM20 8.125C23.9194 8.125 27.0968 11.2031 27.0968 15C27.0968 18.7969 23.9194 21.875 20 21.875C16.0806 21.875 12.9032 18.7969 12.9032 15C12.9032 11.2031 16.0806 8.125 20 8.125ZM20 35C15.2661 35 11.0242 32.9219 8.18548 29.6719C9.70161 26.9062 12.6694 25 16.129 25C16.3226 25 16.5161 25.0312 16.7016 25.0859C17.75 25.4141 18.8468 25.625 20 25.625C21.1532 25.625 22.2581 25.4141 23.2984 25.0859C23.4839 25.0312 23.6774 25 23.871 25C27.3306 25 30.2984 26.9062 31.8145 29.6719C28.9758 32.9219 24.7339 35 20 35Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 
            className="text-xl lg:text-2xl font-bold text-gray-800 mb-2"
            style={{ fontFamily: 'Ropa Sans' }}
          >
            Start a Conversation
          </h2>
          <p 
            className="text-gray-600 text-sm lg:text-base"
            style={{ fontFamily: 'Noto Sans' }}
          >
            Ask me anything about Pakistani legal matters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 lg:px-10 py-6 lg:py-8">
      <div className="space-y-6 lg:space-y-8">
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            isLatest={index === messages. length - 1}
            onFeedback={onFeedback}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;