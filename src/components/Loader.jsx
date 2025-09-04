const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] animate-fade-in">
      {/* Main Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-teal-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-r-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Loading Questions...
        </h3>
        <p className="text-gray-600">
          Preparing your quiz adventure
        </p>
      </div>

      {/* Animated Dots */}
      <div className="mt-6 flex space-x-2">
        <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-48 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-full animate-pulse-glow"></div>
      </div>
    </div>
  );
};

export default Loader;