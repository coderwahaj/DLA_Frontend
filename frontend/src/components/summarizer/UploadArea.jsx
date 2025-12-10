import { Upload } from 'lucide-react';
import { useRef } from 'react';

const UploadArea = ({ onFileUpload, disabled, uploadedFileName }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?. click();
  };

  const handleFileChange = (e) => {
    const file = e. target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="px-6 lg:px-10 mb-8 lg:mb-12">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,. docx,.txt"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      
      <button
        onClick={handleClick}
        disabled={disabled}
        className="w-full lg:w-auto flex items-center justify-center gap-3 lg:gap-4 bg-[#29473E] text-white px-6 lg: px-8 py-4 lg:py-5 rounded-full hover:bg-[#1f3630] transition-all duration-200 border-2 border-[#29473E] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        <span 
          className="font-bold text-lg lg:text-xl"
          style={{ fontFamily:  'Ropa Sans' }}
        >
          {uploadedFileName || 'Upload Document Here'}
        </span>
        <svg
          width="30"
          height="30"
          viewBox="0 0 35 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 lg:w-9 lg:h-9 flex-shrink-0"
        >
          <path
            d="M8.51507 14.3586C5.30459 15.1003 2.91675 17.9043 2.91675 21.25C2.91675 25.162 6.18134 28.3334 10.2084 28.3334C10.8992 28.3334 11.5676 28.2401 12.2009 28.0657"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.2898 14.3586C29.5003 15.1003 31.8881 17.9043 31.8881 21.25C31.8881 25.162 28.6236 28.3334 24.5965 28.3334C23.9056 28.3334 23.2373 28.2401 22.604 28.0657"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.25 14.1666C26.25 9.47222 22.3325 5.66663 17.5 5.66663C12.6675 5.66663 8.75 9.47222 8.75 14.1666"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.4436 19.7492L17.5 14.821L22.7004 19.8335"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 26.9167V17.3271"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {uploadedFileName && (
        <p 
          className="mt-3 text-sm text-gray-600"
          style={{ fontFamily: 'Noto Sans' }}
        >
          Selected:  <span className="font-semibold">{uploadedFileName}</span>
        </p>
      )}
    </div>
  );
};

export default UploadArea;