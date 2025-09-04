import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuestions } from "../api/triviaApi";
import QuestionCard from "../components/QuestionCard";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { difficulty = "easy" } = location.state || {};

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await fetchQuestions(difficulty);
        setQuestions(fetchedQuestions);
        setShowProgress(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [difficulty]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    // Store result for review
    setResults([
      ...results,
      {
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      // Quiz completed
      navigate("/results", {
        state: {
          score: isCorrect ? score + 1 : score,
          totalQuestions: questions.length,
          results: [
            ...results,
            {
              question: currentQuestion.question,
              userAnswer: selectedAnswer,
              correctAnswer: currentQuestion.correct_answer,
              isCorrect,
            },
          ],
        },
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (questions.length === 0) {
    return <ErrorDisplay message="No questions available. Please try again." />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full animate-fade-in">
      {/* Progress Header */}
      {showProgress && (
        <div className="glass-effect rounded-2xl p-6 mb-8 text-center card-hover">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-gray-600">
              Keep going! You're doing great! 🚀
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative pt-1">
            <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200 shadow-inner">
              <div
                style={{ width: `${progress}%` }}
                className="h-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 transition-all duration-500 ease-out rounded-full shadow-lg"
              ></div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-bold text-teal-600">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Score Display */}
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-400 to-green-500 rounded-full px-4 py-2 text-white font-bold shadow-lg">
              <span className="mr-2">🏆</span>
              Score: {score}
            </div>
          </div>
        </div>
      )}

      {/* Question Card */}
      <QuestionCard
        questionData={currentQuestion}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNext}
        selectedAnswer={selectedAnswer}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />

      {/* Bottom Navigation Hint */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          💡 Tip: Read each question carefully before selecting your answer
        </p>
      </div>
    </div>
  );
};

export default QuizApp;