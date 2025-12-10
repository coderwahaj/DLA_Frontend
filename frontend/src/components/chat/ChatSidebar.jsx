import { useState } from 'react';
import { MessageSquare, FileText, Scale } from 'lucide-react';

const ChatSidebar = ({ onHistoryClick }) => {
  const [activeTab, setActiveTab] = useState('chat');

  const historyData = {
    Today: [
      'How to become the Tax Filer in Pakistan.',
      'What are the regulations of State Bank'
    ],
    Yesterday: [
      'SBP and NBP ordinance 1997',
      'National Commission of Pakistan',
      '1997 State Bank Laws'
    ],
    '09/10/2025': [
      "Pakistan's Finance Minister in 2009",
      'Foreign Exchange Policy in Pakistan'
    ]
  };

  const navigationButtons = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'document', label: 'Document Summarizer', icon: FileText },
    { id: 'precedents', label: 'Legal Precedents', icon: Scale }
  ];

  return (
    <aside className="w-full h-full bg-gray-50 border-r-2 border-gray-300 flex flex-col overflow-hidden">
      {/* Navigation Buttons */}
      <nav className="p-4 lg:p-7 space-y-3 lg:space-y-5 flex-shrink-0">
        {navigationButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.id}
              onClick={() => setActiveTab(button.id)}
              className={`w-full py-3 lg:py-3.5 px-4 lg:px-6 rounded-lg font-bold text-lg lg:text-xl border-2 transition-all duration-200 ${
                activeTab === button.id
                  ?  'bg-[#29473E] text-white border-[#29473E] shadow-md'
                  : 'bg-white text-gray-900 border-[#29473E] hover:bg-gray-100'
              }`}
              style={{ fontFamily: 'Ropa Sans' }}
            >
              <span className="flex items-center justify-center gap-2">
                <Icon size={20} />
                <span className="hidden sm:inline">{button.label}</span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* History Section */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-7 pb-6 border-t-2 border-gray-300">
        <h3 
          className="font-bold text-gray-900 text-lg lg:text-xl mt-4 lg:mt-6 mb-3 lg:mb-5"
          style={{ fontFamily: 'Ropa Sans' }}
        >
          History
        </h3>

        <div className="space-y-4 lg:space-y-5">
          {Object.entries(historyData).map(([date, items]) => (
            <div key={date}>
              <h4 
                className="font-semibold text-gray-700 text-sm mb-2 lg:mb-3"
                style={{ fontFamily: 'Noto Sans' }}
              >
                {date}
              </h4>
              <div className="space-y-2 lg:space-y-2.5">
                {items. map((item, index) => (
                  <button
                    key={index}
                    onClick={() => onHistoryClick(item)}
                    className="w-full text-left p-2 lg:p-2.5 rounded-md bg-white border border-gray-200 hover:bg-gray-100 hover:border-gray-300 cursor-pointer transition-all duration-200"
                  >
                    <p 
                      className="text-gray-800 text-xs lg:text-sm font-medium line-clamp-2"
                      style={{ fontFamily: 'Noto Sans' }}
                    >
                      {item}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;