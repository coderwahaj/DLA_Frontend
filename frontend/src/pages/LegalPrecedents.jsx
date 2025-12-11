import { useState } from 'react';
import { Search, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useLegalPrecedents } from '@/hooks/useLegalPrecedents';
import PlatformHeader from '@/components/shared/PlatformHeader';
import PlatformSidebar from '@/components/shared/PlatformSidebar';
import PrecedentRow from '@/components/precedents/PrecedentRow';
import FeedbackModal from '@/components/shared/FeedbackModal';

const LegalPrecedents = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const { precedents, isLoading, hasSearched, searchPrecedents, downloadJudgment } = useLegalPrecedents();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchPrecedents(searchQuery);
    }
  };

  const handleHistoryClick = (query) => {
    setSearchQuery(query);
    searchPrecedents(query);
  };

  const handleFeedback = (type) => {
    console.log(`Feedback: ${type}`);
    setIsFeedbackModalOpen(true);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(! disliked);
    if (liked) setLiked(false);
  };

  const handleOpenFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log('Feedback submitted:', feedbackData);
    // TODO: Send feedback to backend
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <PlatformHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
            sidebarOpen ?  'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative w-72 lg:w-96 h-full transition-transform duration-300 z-50 md:z-auto`}
        >
          <PlatformSidebar onHistoryClick={(query) => {
            handleHistoryClick(query);
            setSidebarOpen(false);
          }} />
        </div>

        {/* Main Content Area - SINGLE SCROLL */}
        <main className="flex-1 overflow-y-auto bg-white md:border-l-2 md:border-gray-300">
          <div className="px-6 lg:px-10 py-6 lg:py-10">
            {/* Header Section */}
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
                <h1 
                  className="text-3xl lg:text-4xl font-bold text-gray-900"
                  style={{ fontFamily:  'Ropa Sans' }}
                >
                  Legal Precedents
                </h1>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0"
                >
                  <path
                    d="M33.3332 16.6666C33.3332 10.3384 29.6022 4.16663 24.9998 4.16663C20.3974 4.16663 16.6665 10.3384 16.6665 16.6666"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.37516 16.6666H40.6252L41.6668 29.1666H28.1252V26.0416H21.8752V29.1666H8.3335L9.37516 16.6666Z"
                    fill="#333333"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33333 29.1666L6.25 43.75H43.75L41.6667 29.1666"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.875 26.0416H28.125V32.2916H21.875V26.0416Z"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-300 w-full mb-6 lg:mb-8"></div>

              {/* Search Section */}
              <form onSubmit={handleSearch} className="mb-6 lg:mb-8">
                <div className="flex items-center gap-3 bg-[#2D2D2D] rounded-[2rem] px-4 lg:px-6 py-3 lg:py-4">
                  <input
                    type="text"
                    placeholder="Query for legal precedents here ........ ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target. value)}
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-white font-light text-base lg:text-lg placeholder-white placeholder-opacity-70 outline-none disabled:opacity-50"
                    style={{ fontFamily: 'Noto Sans' }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !searchQuery.trim()}
                    className="text-white hover:opacity-80 transition-opacity disabled:opacity-50"
                    aria-label="Search"
                  >
                    <Search size={24} />
                  </button>
                </div>
              </form>

              {/* AI Response Indicator */}
              <div className="flex items-start gap-3 lg:gap-4 mb-6 lg:mb-8">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0"
                >
                  <path
                    d="M12.1873 35.625C13.9582 34.2708 15.9373 33.2031 18.1248 32.4218C20.3123 31.6406 22.604 31.25 24.9998 31.25C27.3957 31.25 29.6873 31.6406 31.8748 32.4218C34.0623 33.2031 36.0415 34.2708 37.8123 35.625C39.0276 34.2013 39.9738 32.5868 40.6509 30.7812C41.328 28.9757 41.6665 27.0486 41.6665 25C41.6665 20.3819 40.0432 16.4496 36.7967 13.2031C33.5502 9.95656 29.6179 8.33329 24.9998 8.33329C20.3818 8.33329 16.4495 9.95656 13.203 13.2031C9.95643 16.4496 8.33317 20.3819 8.33317 25C8.33317 27.0486 8.67171 28.9757 9.3488 30.7812C10.0259 32.5868 10.9721 34.2013 12.1873 35.625ZM24.9998 27.0833C22.9512 27.0833 21.2238 26.3802 19.8175 24.9739C18.4113 23.5677 17.7082 21.8402 17.7082 19.7916C17.7082 17.743 18.4113 16.0156 19.8175 14.6093C21.2238 13.2031 22.9512 12.5 24.9998 12.5C27.0484 12.5 28.7759 13.2031 30.1821 14.6093C31.5884 16.0156 32.2915 17.743 32.2915 19.7916C32.2915 21.8402 31.5884 23.5677 30.1821 24.9739C28.7759 26.3802 27.0484 27.0833 24.9998 27.0833ZM24.9998 45. 8333C22.1179 45.8333 19.4096 45.2864 16.8748 44.1927C14.3401 43.0989 12.1353 41.6145 10.2603 39.7395C8.38525 37.8645 6.90088 35.6597 5.80713 33.125C4.71338 30.5902 4.1665 27.8819 4.1665 25C4.1665 22.118 4.71338 19.4097 5.80713 16.875C6.90088 14.3402 8.38525 12.1354 10.2603 10.2604C12.1353 8.38538 14.3401 6.901 16.8748 5.80725C19.4096 4.7135 22.1179 4.16663 24.9998 4.16663C27.8818 4.16663 30.5901 4.7135 33.1248 5.80725C35.6596 6.901 37.8644 8.38538 39.7394 10.2604C41.6144 12.1354 43.0988 14.3402 44.1925 16.875C45.2863 19.4097 45.8332 22.118 45.8332 25C45.8332 27.8819 45.2863 30.5902 44.1925 33.125C43.0988 35.6597 41.6144 37.8645 39.7394 39.7395C37.8644 41.6145 35.6596 43.0989 33.1248 44.1927C30.5901 45.2864 27.8818 45.8333 24.9998 45.8333Z"
                    fill="#1D1B20"
                  />
                </svg>
                <p 
                  className="font-medium text-lg lg:text-xl text-gray-900 pt-1"
                  style={{ fontFamily: 'Noto Sans' }}
                >
                  {isLoading 
                    ? 'Searching for relevant legal precedents...... ' 
                    : 'Here are the relevant legal precedents for your query ...... '}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-[#29473E] rounded-full animate-spin mx-auto mb-4"></div>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily:  'Noto Sans' }}
                  >
                    Loading precedents...
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !hasSearched && (
              <div className="flex items-center justify-center py-12">
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
                        d="M33.3332 16.6666C33.3332 10.3384 29.6022 4.16663 24.9998 4.16663C20.3974 4.16663 16.6665 10.3384 16.6665 16.6666"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.37516 16.6666H40.6252L41.6668 29.1666H28.1252V26.0416H21.8752V29.1666H8.3335L9.37516 16.6666Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2 
                    className="text-xl lg:text-2xl font-bold text-gray-800 mb-2"
                    style={{ fontFamily: 'Ropa Sans' }}
                  >
                    Search Legal Precedents
                  </h2>
                  <p 
                    className="text-gray-600 text-sm lg:text-base"
                    style={{ fontFamily: 'Noto Sans' }}
                  >
                    Enter your query above to find relevant case law
                  </p>
                </div>
              </div>
            )}

            {/* No Results State */}
            {! isLoading && hasSearched && precedents.length === 0 && (
              <div className="flex items-center justify-center py-12">
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
                        d="M33.3332 16.6666C33.3332 10.3384 29.6022 4.16663 24.9998 4.16663C20.3974 4.16663 16.6665 10.3384 16.6665 16.6666"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.37516 16.6666H40.6252L41.6668 29.1666H28.1252V26.0416H21.8752V29.1666H8.3335L9.37516 16.6666Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2 
                    className="text-xl lg:text-2xl font-bold text-gray-800 mb-2"
                    style={{ fontFamily: 'Ropa Sans' }}
                  >
                    No Precedents Found
                  </h2>
                  <p 
                    className="text-gray-600 text-sm lg:text-base"
                    style={{ fontFamily: 'Noto Sans' }}
                  >
                    Try searching with different keywords
                  </p>
                </div>
              </div>
            )}

            {/* Table Section */}
            {! isLoading && precedents.length > 0 && (
              <>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-2 border-gray-300 min-w-[800px]">
                    <thead>
                      <tr className="border-b-2 border-gray-300 bg-gray-50">
                        <th 
                          className="text-left py-3 lg:py-4 px-3 lg:px-4 font-bold text-lg lg:text-xl text-gray-900 w-16 lg:w-20"
                          style={{ fontFamily: 'Ropa Sans' }}
                        >
                          Sr no.
                        </th>
                        <th 
                          className="text-left py-3 lg:py-4 px-3 lg:px-4 font-bold text-lg lg:text-xl text-gray-900"
                          style={{ fontFamily:  'Ropa Sans' }}
                        >
                          Case no.
                        </th>
                        <th 
                          className="text-left py-3 lg:py-4 px-3 lg:px-4 font-bold text-lg lg:text-xl text-gray-900"
                          style={{ fontFamily: 'Ropa Sans' }}
                        >
                          Title
                        </th>
                        <th 
                          className="text-left py-3 lg:py-4 px-3 lg:px-4 font-bold text-lg lg:text-xl text-gray-900"
                          style={{ fontFamily: 'Ropa Sans' }}
                        >
                          Judge
                        </th>
                        <th 
                          className="text-center py-3 lg:py-4 px-3 lg:px-4 font-bold text-lg lg:text-xl text-gray-900 w-24 lg:w-32"
                          style={{ fontFamily: 'Ropa Sans' }}
                        >
                          Judgment
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {precedents.map((precedent) => (
                        <PrecedentRow
                          key={precedent.id}
                          precedent={precedent}
                          onDownload={downloadJudgment}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Feedback Section */}
                <div className="flex items-center justify-end gap-4 lg:gap-6 pt-6 border-t-2 border-gray-300">
                    <button
                        onClick={handleLike}
                        className={`hover:opacity-70 transition-all p-2 rounded-lg ${
                        liked ? 'bg-green-100' : ''
                        }`}
                        aria-label="Like results"
                    >
                        <ThumbsUp 
                        size={24} 
                        className={`transition-colors ${
                            liked ? 'text-green-600 fill-green-600' : 'text-gray-900'
                        }`}
                        />
                    </button>
                    <button
                        onClick={handleDislike}
                        className={`hover:opacity-70 transition-all p-2 rounded-lg ${
                        disliked ? 'bg-red-100' : ''
                        }`}
                        aria-label="Dislike results"
                    >
                        <ThumbsDown 
                        size={24} 
                        className={`transition-colors ${
                            disliked ? 'text-red-600 fill-red-600' : 'text-gray-900'
                        }`}
                        />
                    </button>
                    <button
                        onClick={handleOpenFeedbackModal}
                        className="text-gray-900 text-base lg:text-lg font-medium hover:text-[#29473E] transition-colors cursor-pointer"
                        style={{ fontFamily: 'Noto Sans' }}
                    >
                        Provide Feedback?
                    </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedbackType="precedents"
      />
    </div>
  );
};

export default LegalPrecedents;