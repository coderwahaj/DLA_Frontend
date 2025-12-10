import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Message = ({ message, isLatest, onFeedback }) => {
  const { user } = useAuth();

  const UserAvatar = () => (
    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center border-2 border-gray-400">
      <svg
        width="24"
        height="24"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 0.625C8.95161 0.625 0 9.29688 0 20C0 30.7031 8.95161 39.375 20 39.375C31.0484 39.375 40 30.7031 40 20C40 9.29688 31.0484 0.625 20 0.625ZM20 8.125C23.9194 8.125 27.0968 11.2031 27.0968 15C27.0968 18.7969 23.9194 21.875 20 21.875C16.0806 21.875 12.9032 18.7969 12.9032 15C12.9032 11.2031 16.0806 8.125 20 8.125ZM20 35C15.2661 35 11.0242 32.9219 8.18548 29.6719C9.70161 26.9062 12.6694 25 16.129 25C16.3226 25 16.5161 25.0312 16.7016 25.0859C17.75 25.4141 18.8468 25.625 20 25.625C21.1532 25.625 22.2581 25.4141 23.2984 25.0859C23.4839 25.0312 23.6774 25 23.871 25C27.3306 25 30.2984 26.9062 31.8145 29.6719C28.9758 32.9219 24.7339 35 20 35Z"
          fill="#666"
        />
      </svg>
    </div>
  );

  if (message.type === 'user') {
    return (
      <div className="flex gap-3 lg:gap-4 justify-end items-start">
        <div 
          className="max-w-xl lg:max-w-2xl bg-[#29473E] text-white rounded-[2rem] px-5 lg:px-7 py-3 lg:py-4"
          style={{ fontFamily: 'Noto Sans' }}
        >
          <p className="text-base lg:text-lg font-medium">
            {message.content}
          </p>
        </div>
        <UserAvatar/>
      </div>
    );
  }

  // Bot message
  return (
    <div className="flex gap-3 lg:gap-4 items-start">
      <UserAvatar/>
      <div className="flex-1 max-w-2xl lg:max-w-3xl">
        {message.title && (
          <h3 
            className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 lg:mb-5"
            style={{ fontFamily:  'Ropa Sans' }}
          >
            {message. title}
          </h3>
        )}
        <p 
          className="text-gray-900 text-lg lg:text-xl font-normal leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: 'Noto Sans' }}
        >
          {message.content}
        </p>

        {/* Feedback buttons - only show on latest bot message */}
        {isLatest && message.type === 'bot' && (
          <div className="flex items-center gap-3 lg:gap-5 mt-6 lg:mt-8">
            <button
              onClick={() => onFeedback?. ('like', message.id)}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              aria-label="Like response"
            >
              <ThumbsUp size={24} className="text-gray-900 lg:w-7 lg:h-7" />
            </button>
            <button
              onClick={() => onFeedback?.('dislike', message.id)}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              aria-label="Dislike response"
            >
              <ThumbsDown size={24} className="text-gray-900 lg:w-7 lg: h-7" />
            </button>
            <span 
              className="text-gray-900 text-lg lg:text-xl font-medium"
              style={{ fontFamily:  'Noto Sans' }}
            >
              Provide Feedback? 
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;