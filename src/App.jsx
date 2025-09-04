import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizApp from "./pages/QuizApp";
import ResultsScreen from "./components/ResultsScreen";
import StartScreen from "./components/StartScreen";

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 font-sans transition-all duration-500">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl mx-auto">
          <Router>
            <Routes>
              <Route path="/" element={<StartScreen />} />
              <Route path="/quiz" element={<QuizApp />} />
              <Route path="/results" element={<ResultsScreen />} />
            </Routes>
          </Router>
        </div>
      </div>
    </main>
  );
}

export default App;