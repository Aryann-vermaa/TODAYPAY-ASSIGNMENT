const ErrorDisplay = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] animate-fade-in">
      {/* Error Icon */}
      <div className="mb-6">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-red-500 to-rose-600 mb-4 animate-bounce-in">
          <span className="text-4xl">⚠️</span>
        </div>
      </div>

      {/* Error Message */}
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message || "We encountered an error while loading your quiz. Please try again."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => window.location.reload()}
          className="button-primary px-8 py-3 rounded-xl"
        >
          🔄 Try Again
        </button>
        
        <button
          onClick={() => window.history.back()}
          className="button-secondary px-8 py-3 rounded-xl"
        >
          ⬅️ Go Back
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="mt-8 flex space-x-2">
        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default ErrorDisplay;