import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ResultsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const { score, totalQuestions, results } = location.state || {
    score: 0,
    totalQuestions: 0,
    results: [],
  };

  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore") || 0;
    if (score > savedHighScore) {
      localStorage.setItem("quizHighScore", score.toString());
    }
    setIsVisible(true);
  }, [score]);

  const handleRestart = () => {
    navigate("/");
  };

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Calculate performance level
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: "Genius", emoji: "🧠", color: "from-emerald-400 to-green-500" };
    if (percentage >= 80) return { level: "Excellent", emoji: "🌟", color: "from-blue-400 to-indigo-500" };
    if (percentage >= 70) return { level: "Good", emoji: "👍", color: "from-yellow-400 to-orange-500" };
    if (percentage >= 60) return { level: "Fair", emoji: "😊", color: "from-orange-400 to-red-500" };
    return { level: "Keep Learning", emoji: "📚", color: "from-red-400 to-pink-500" };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in p-6">
      {/* 🎯 Score Summary */}
      <div className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 mb-8 text-center card-hover">
        <div className="mb-6">
          <div className={`inline-block p-4 rounded-full bg-gradient-to-r ${performance.color} mb-4 animate-bounce-in`}>
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Quiz Complete! 🎉
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-2">
            You scored <span className="font-bold text-emerald-600">{score}</span> out of{" "}
            <span className="font-bold text-gray-800">{totalQuestions}</span>
          </p>
          <p className="text-2xl font-bold text-gray-800 mb-6">
            Performance: <span className={`bg-gradient-to-r ${performance.color} bg-clip-text text-transparent`}>{performance.level}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative pt-1 mb-6">
          <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-gray-200 shadow-inner">
            <div
              style={{ width: `${percentage}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${performance.color} transition-all duration-1000 ease-out rounded-full`}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">0%</span>
            <span className="text-2xl font-bold text-teal-700">{percentage}%</span>
            <span className="text-gray-600">100%</span>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/50 rounded-2xl p-4 border border-gray-200">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-lg font-bold text-emerald-600">{score}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="bg-white/50 rounded-2xl p-4 border border-gray-200">
            <div className="text-2xl mb-2">❌</div>
            <div className="text-lg font-bold text-red-600">{totalQuestions - score}</div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>
          <div className="bg-white/50 rounded-2xl p-4 border border-gray-200">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-lg font-bold text-teal-600">{percentage}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>
      </div>

      {/* 📑 Answer Review */}
      <div className="glass-effect shadow-2xl rounded-3xl p-8 text-left mb-8 card-hover">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-4 flex items-center">
          <span className="mr-3">📖</span>
          Review Your Answers
        </h2>
        <ul className="space-y-6 max-h-[500px] overflow-y-auto pr-3 custom-scrollbar">
          {results.map((res, idx) => (
            <li
              key={idx}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                res.isCorrect 
                  ? "border-emerald-500 bg-emerald-50/50 shadow-md" 
                  : "border-red-500 bg-red-50/50 shadow-md"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Question {idx + 1}</span>
                <span className={`text-2xl ${res.isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                  {res.isCorrect ? '✅' : '❌'}
                </span>
              </div>
              
              <p className="font-bold text-lg text-gray-800 mb-3" 
                  dangerouslySetInnerHTML={{ __html: res.question }} />
              
              <div className="space-y-2">
                <p className="text-sm md:text-base text-gray-600">
                  <span className="font-semibold">Your Answer:</span>{" "}
                  <span
                    className={`font-semibold ${res.isCorrect ? "text-emerald-600" : "text-red-600"}`}
                    dangerouslySetInnerHTML={{ __html: res.userAnswer }}
                  />
                </p>
                {!res.isCorrect && (
                  <p className="text-sm md:text-base text-gray-600">
                    <span className="font-semibold">Correct Answer:</span>{" "}
                    <span className="font-semibold text-emerald-600" 
                          dangerouslySetInnerHTML={{ __html: res.correctAnswer }} />
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔄 Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={handleRestart}
          className="button-primary px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        >
          🎮 Play Again
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="button-secondary px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        >
          🔄 New Quiz
        </button>
      </div>

      {/* Celebration Animation */}
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;