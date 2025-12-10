import { ThumbsUp, ThumbsDown } from 'lucide-react';

const SummaryDisplay = ({ summary, onFeedback }) => {
  if (!summary) return null;

  return (
    <div className="px-6 lg:px-10">
      {/* Summary Header with Icon */}
      <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0"
        >
          <path
            d="M12.1876 35.6251C13.9584 34.2709 15.9376 33.2032 18.1251 32.422C20.3126 31.6407 22.6042 31.2501 25.0001 31.2501C27.3959 31.2501 29.6876 31.6407 31.8751 32.422C34.0626 33.2032 36.0417 34.2709 37.8126 35.6251C39.0279 34.2015 39.974 32.5869 40.6511 30.7813C41.3282 28.9758 41.6667 27.0487 41.6667 25.0001C41.6667 20.382 40.0435 16.4497 36.797 13.2032C33.5504 9.95668 29.6181 8.33341 25.0001 8.33341C20.382 8.33341 16.4497 9.95668 13.2032 13.2032C9.95668 16.4497 8.33341 20.382 8.33341 25.0001C8.33341 27.0487 8.67196 28.9758 9.34904 30.7813C10.0261 32.5869 10.9723 34.2015 12.1876 35.6251ZM25.0001 27.0834C22.9515 27.0834 21.224 26.3803 19.8178 24.974C18.4115 23.5678 17.7084 21.8404 17.7084 19.7917C17.7084 17.7431 18.4115 16.0157 19.8178 14.6095C21.224 13.2032 22.9515 12.5001 25.0001 12.5001C27.0487 12.5001 28.7761 13.2032 30.1824 14.6095C31.5886 16.0157 32.2917 17.7431 32.2917 19.7917C32.2917 21.8404 31.5886 23.5678 30.1824 24.974C28.7761 26.3803 27.0487 27.0834 25.0001 27.0834ZM25.0001 45.8334C22.1181 45.8334 19.4098 45.2865 16.8751 44.1928C14.3404 43.099 12.1355 41.6147 10.2605 39.7397C8.3855 37.8647 6.90112 35.6598 5.80737 33.1251C4.71362 30.5904 4.16675 27.882 4.16675 25. 0001C4.16675 22.1181 4.71362 19.4098 5.80737 16.8751C6.90112 14.3404 8.3855 12.1355 10.2605 10.2605C12.1355 8.3855 14.3404 6.90112 16.8751 5.80737C19.4098 4.71362 22.1181 4.16675 25.0001 4.16675C27.882 4.16675 30.5904 4.71362 33.1251 5.80737C35.6598 6.90112 37.8647 8.3855 39.7397 10.2605C41.6147 12.1355 43.099 14.3404 44.1928 16.8751C45.2865 19.4098 45.8334 22.1181 45.8334 25.0001C45.8334 27.882 45.2865 30.5904 44.1928 33.1251C43.099 35.6598 41.6147 37.8647 39.7397 39.7397C37.8647 41.6147 35.6598 43.099 33.1251 44.1928C30.5904 45.2865 27.882 45.8334 25.0001 45.8334Z"
            fill="#1D1B20"
          />
        </svg>
        <h2 
          className="text-2xl lg:text-3xl font-bold text-gray-900"
          style={{ fontFamily: 'Ropa Sans' }}
        >
          📋 Document Summary
        </h2>
      </div>

      {/* Summary Content */}
      <div 
        className="max-w-4xl space-y-3 lg:space-y-4 text-gray-900 text-base lg:text-xl leading-relaxed"
        style={{ fontFamily: 'Noto Sans' }}
      >
        {summary.type && (
          <p>
            <span className="font-bold">Type:  </span>
            <span>{summary.type} </span>
            {summary.year && (
              <>
                <span className="font-bold">Year: </span>
                <span>{summary.year} </span>
              </>
            )}
            {summary.source && (
              <>
                <span className="font-bold">Document Source: </span>
                <span>{summary.source}</span>
              </>
            )}
          </p>
        )}

        {summary.content && (
          <div className="space-y-3 lg:space-y-4">
            {summary.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>
                {paragraph.startsWith('AI-Generated Summary:') ? (
                  <>
                    <span className="font-bold">AI-Generated Summary:  </span>
                    {paragraph.replace('AI-Generated Summary:', '')}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Section */}
      <div className="flex items-center justify-end gap-4 lg:gap-6 mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-gray-300">
        <button
          onClick={() => onFeedback?. ('like')}
          className="hover:opacity-70 transition-opacity p-2"
          aria-label="Like summary"
        >
          <ThumbsUp size={24} className="text-gray-900 lg:w-7 lg:h-7" />
        </button>
        <button
          onClick={() => onFeedback?.('dislike')}
          className="hover:opacity-70 transition-opacity p-2"
          aria-label="Dislike summary"
        >
          <ThumbsDown size={24} className="text-gray-900 lg:w-7 lg:h-7" />
        </button>
        <span 
          className="text-gray-900 text-base lg:text-lg font-medium"
          style={{ fontFamily: 'Noto Sans' }}
        >
          Provide Feedback? 
        </span>
      </div>
    </div>
  );
};

export default SummaryDisplay;