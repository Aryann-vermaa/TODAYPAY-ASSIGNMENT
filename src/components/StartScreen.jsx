import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUseLocalData } from "../api/triviaApi";

const StartScreen = () => {
  const [useLocal, setUseLocal] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [highScore, setHighScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore") || 0;
    setHighScore(Number(savedHighScore));
    setIsVisible(true);
  }, []);

  const handleToggle = () => {
    setUseLocal((prev) => {
      const newValue = !prev;
      setUseLocalData(newValue);
      return newValue;
    });
  };

  const handleStart = () => {
    navigate("/quiz", { state: { difficulty } });
  };

  const difficulties = ["easy", "medium", "hard"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in">
      <div className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-3xl text-center card-hover">
        {/* Header with animated icon */}
        <div className="mb-8">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 mb-6 animate-bounce-in">
            <span className="text-4xl md:text-5xl">🧠</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Quiz Master
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            Test your knowledge with challenging questions!
          </p>
          <p className="text-sm text-gray-500">
            Choose your difficulty and start the adventure
          </p>
        </div>

        {/* High Score Display */}
        <div className="mb-8">
          <div className="inline-flex items-center bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl px-6 py-3 shadow-lg animate-pulse-glow">
            <span className="text-2xl mr-3">🏆</span>
            <span className="text-xl font-bold text-white">High Score: {highScore}</span>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Challenge</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {difficulties.map((level, index) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-8 py-4 rounded-2xl font-bold capitalize transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300 transform hover:scale-105 ${
                  difficulty === level
                    ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-xl scale-105"
                    : "bg-white/50 text-gray-700 hover:bg-white/80 border border-gray-200"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg">{level}</span>
                  <span className="text-xs opacity-75 mt-1">
                    {level === 'easy' && '🎯 Beginner'}
                    {level === 'medium' && '⚡ Intermediate'}
                    {level === 'hard' && '🔥 Expert'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Data Source Toggle */}
        <div className="mb-8 flex justify-center">
          <label className="relative inline-flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={useLocal}
              onChange={handleToggle}
              className="sr-only peer"
            />
            <div className="w-16 h-9 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-600 group-hover:shadow-lg transition-all duration-300"></div>
            <span className="ml-4 text-lg font-medium text-gray-700 group-hover:text-teal-600 transition-colors duration-300">
              {useLocal ? "📁 Local Data" : "🌐 Live API"}
            </span>
          </label>
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={handleStart}
          className="button-primary w-full py-5 px-12 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        >
          🚀 Start Quiz Adventure
        </button>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;