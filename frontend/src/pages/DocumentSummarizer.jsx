import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDocumentSummarizer } from '@/hooks/useDocumentSummarizer';
import PlatformSidebar from '@/components/shared/PlatformSidebar';
import SummarizerHeader from '@/components/summarizer/SummarizerHeader';
import UploadArea from '@/components/summarizer/UploadArea';
import ProcessingStatus from '@/components/summarizer/ProcessingStatus';
import SummaryDisplay from '@/components/summarizer/SummaryDisplay';

const DocumentSummarizer = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isProcessing, summary, uploadedFile, uploadDocument, clearSummary } = useDocumentSummarizer();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleFileUpload = (file) => {
    clearSummary();
    uploadDocument(file);
  };

  const handleFeedback = (type) => {
    console.log(`Feedback:  ${type}`);
    // TODO: Send feedback to backend
  };

  const handleHistoryClick = (query) => {
    console.log('History clicked:', query);
    // TODO: Load previous summarization
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#29473E] h-20 lg:h-28 flex items-center justify-between px-4 lg:px-16 border-b-2 border-black flex-shrink-0">
        {/* Logo */}
        <div className="flex-1 flex items-center">
          <img
            src="/logo.png"
            alt="Digital Legal Advisor"
            className="h-16 lg:h-24 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              parent.innerHTML = '<div class="text-white text-2xl font-bold">⚖️ DLA</div>';
            }}
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4 lg:gap-10">
          {/* User Info */}
          <button className="hidden md:flex items-center gap-2 lg:gap-3 px-3 lg:px-6 py-2 lg:py-3 rounded-lg bg-transparent hover:bg-white hover:bg-opacity-10 transition-colors">
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
            className="hidden md:flex items-center gap-2 lg:gap-3 px-3 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-gray-100 bg-transparent hover:bg-white hover:bg-opacity-10 transition-colors"
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
            onClick={() => setSidebarOpen(!sidebarOpen)}
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
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative w-72 lg:w-96 h-full transition-transform duration-300 z-50 md:z-auto`}
        >
          <PlatformSidebar onHistoryClick={(query) => {
            handleHistoryClick(query);
            setSidebarOpen(false);
          }} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-white md:border-l-2 md:border-gray-300">
          <SummarizerHeader />
          
          <UploadArea 
            onFileUpload={handleFileUpload}
            disabled={isProcessing}
            uploadedFileName={uploadedFile?.name}
          />

          {isProcessing && <ProcessingStatus />}
          
          {summary && ! isProcessing && (
            <SummaryDisplay 
              summary={summary}
              onFeedback={handleFeedback}
            />
          )}

          {!isProcessing && ! summary && (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 50 50"
                    fill="none"
                    className="text-gray-400"
                  >
                    <path
                      d="M33. 3334 6.25H22.9167V43.75H33.3334V6.25Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M43.7502 6.25H33.3335V43.75H43.7502V6.25Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.4167 6.25L18.75 7.29167L15.1042 43.75L6.25 42.7083L10.4167 6.25Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 
                  className="text-xl lg:text-2xl font-bold text-gray-800 mb-2"
                  style={{ fontFamily: 'Ropa Sans' }}
                >
                  Upload a Document
                </h2>
                <p 
                  className="text-gray-600 text-sm lg: text-base"
                  style={{ fontFamily:  'Noto Sans' }}
                >
                  Supported formats: PDF, DOC, DOCX, TXT
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DocumentSummarizer;