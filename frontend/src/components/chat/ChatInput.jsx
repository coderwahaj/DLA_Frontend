import { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t-2 border-gray-300 p-4 lg:p-6 bg-gray-50 flex-shrink-0">
      <form onSubmit={handleSubmit} className="max-w-full">
        <div className="bg-[#29473E] rounded-[2rem] border-3 border-[#29473E] flex items-center gap-3 lg:gap-5 px-4 lg:px-8 py-3 lg:py-5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your Prompt here ........ ..."
            disabled={disabled}
            className="flex-1 bg-transparent text-white placeholder-white placeholder-opacity-50 outline-none text-base lg:text-lg font-light disabled:opacity-50"
            style={{ fontFamily: 'Noto Sans' }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || disabled}
            className="flex-shrink-0 text-white hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={32} strokeWidth={1.5} className="lg:w-9 lg:h-9" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;