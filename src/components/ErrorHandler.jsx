// components/ErrorBanner.jsx

const ErrorBanner = ({ error, setError }) => {
  if (!error) {
    return null;
  }
  
  return (
    <div className="bg-red-900 text-white p-3 rounded-lg mb-4 flex justify-between items-center">
      <span>{error}</span>
      <button 
        onClick={() => setError(null)} 
        className="text-white hover:text-gray-300"
      >
        ✕
      </button>
    </div>
  );
};

export default ErrorBanner;