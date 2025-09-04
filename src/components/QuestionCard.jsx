const QuestionCard = ({ questionData, onAnswerSelect, onNext, selectedAnswer, isLastQuestion }) => {
  const { question, options } = questionData;

  return (
    <div className="glass-effect p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-4xl mx-auto animate-fade-in border border-white/20">
      {/* Question Header */}
      <div className="mb-8 text-center">
        <div className="inline-block p-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 mb-4">
          <span className="text-2xl">❓</span>
        </div>
        <h2 
          className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: question }} 
        />
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => onAnswerSelect(option)}
            className={`group relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 font-medium text-lg overflow-hidden ${
              selectedAnswer === option
                ? 'bg-gradient-to-r from-teal-500 to-cyan-600 border-teal-600 text-white shadow-xl transform scale-105'
                : 'bg-white/50 border-gray-200 text-gray-800 hover:bg-white/80 hover:border-teal-300 hover:shadow-lg'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Hover effect background */}
            <div className={`absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              selectedAnswer === option ? 'opacity-100' : ''
            }`}></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center">
              <span className="mr-3 text-xl opacity-75">
                {String.fromCharCode(65 + index)} {/* A, B, C, D */}
              </span>
              <span dangerouslySetInnerHTML={{ __html: option }} />
            </div>

            {/* Selection indicator */}
            {selectedAnswer === option && (
              <div className="absolute top-3 right-3 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span className="font-medium">Selected:</span> {selectedAnswer ? '✅' : '❌'}
        </div>
        
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            isLastQuestion 
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white' 
              : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white'
          }`}
        >
          <span className="flex items-center">
            {isLastQuestion ? (
              <>
                <span className="mr-2">🎯</span>
                Submit Quiz
              </>
            ) : (
              <>
                <span className="mr-2">⏭️</span>
                Next Question
              </>
            )}
          </span>
        </button>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 flex justify-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;