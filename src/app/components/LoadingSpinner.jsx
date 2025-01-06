const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  };
  
export default LoadingSpinner;
  