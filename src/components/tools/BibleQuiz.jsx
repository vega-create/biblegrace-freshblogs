import { useState, useEffect } from 'react';
import quizData from '../../data/quiz.json';

const BibleQuiz = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const QUIZ_LENGTH = 10;

  const startQuiz = (diff) => {
    setDifficulty(diff);
    const pool = diff === 'all'
      ? [...quizData.questions]
      : quizData.questions.filter(q => q.difficulty === diff);

    // Shuffle and pick 10
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, QUIZ_LENGTH);
    setQuestions(shuffled);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setShowResult(false);
    setQuizComplete(false);
  };

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === questions[currentQ].answer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setQuizComplete(true);
    } else {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const getScoreMessage = () => {
    const pct = (score / questions.length) * 100;
    if (pct === 100) return { emoji: '👑', text: 'Perfect Score! You truly know your Bible!', color: '#D4A843' };
    if (pct >= 80) return { emoji: '🌟', text: 'Excellent! You have deep knowledge of Scripture.', color: '#16a34a' };
    if (pct >= 60) return { emoji: '📖', text: 'Good job! Keep studying — you\'re growing in knowledge.', color: '#2563eb' };
    if (pct >= 40) return { emoji: '🌱', text: 'Not bad! There\'s so much more to discover in God\'s Word.', color: '#ea580c' };
    return { emoji: '📚', text: 'Keep reading the Bible — every page is a new adventure!', color: '#8B6F47' };
  };

  // Difficulty Selection Screen
  if (!difficulty) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-5xl mb-6">🧠</p>
        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#3B2412' }}>
          Bible Knowledge Quiz
        </h3>
        <p className="mb-8" style={{ color: '#8B6F47' }}>
          Test your knowledge of the Bible with {QUIZ_LENGTH} questions. Choose your difficulty:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { id: 'easy', label: 'Easy', emoji: '🌱', desc: 'Perfect for beginners' },
            { id: 'medium', label: 'Medium', emoji: '📖', desc: 'For regular readers' },
            { id: 'hard', label: 'Hard', emoji: '🎓', desc: 'Bible scholars only' },
          ].map(d => (
            <button
              key={d.id}
              onClick={() => startQuiz(d.id)}
              className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              style={{ backgroundColor: '#FAF0D7', border: '2px solid transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#D4A843'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <p className="text-3xl mb-2">{d.emoji}</p>
              <p className="font-bold" style={{ color: '#3B2412' }}>{d.label}</p>
              <p className="text-sm mt-1" style={{ color: '#8B6F47' }}>{d.desc}</p>
            </button>
          ))}
        </div>
        <button
          onClick={() => startQuiz('all')}
          className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: '#D4A843' }}
        >
          🔀 Mix All Difficulties
        </button>
      </div>
    );
  }

  // Quiz Complete Screen
  if (quizComplete) {
    const msg = getScoreMessage();
    return (
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-6xl mb-4">{msg.emoji}</p>
        <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#3B2412' }}>
          Quiz Complete!
        </h3>
        <div className="my-8 p-8 rounded-2xl shadow-lg" style={{ backgroundColor: '#FAF0D7' }}>
          <p className="text-5xl font-bold" style={{ color: msg.color }}>
            {score} / {questions.length}
          </p>
          <p className="mt-3 text-lg" style={{ color: '#3B2412' }}>{msg.text}</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button
            onClick={() => startQuiz(difficulty)}
            className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: '#D4A843' }}
          >
            🔄 Play Again
          </button>
          <button
            onClick={() => setDifficulty(null)}
            className="px-6 py-3 rounded-lg font-semibold border-2 hover:opacity-80 transition"
            style={{ borderColor: '#D4A843', color: '#D4A843' }}
          >
            Change Difficulty
          </button>
          <button
            onClick={() => {
              const text = `I scored ${score}/${questions.length} on the BibleGrace Bible Quiz! 🧠✝️ Try it yourself:`;
              const url = 'https://biblegrace.freshblogs.cc/tools/bible-quiz';
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
            }}
            className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: '#1DA1F2' }}
          >
            Share Score on X
          </button>
        </div>
      </div>
    );
  }

  // Quiz Question Screen
  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2" style={{ color: '#8B6F47' }}>
          <span>Question {currentQ + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="w-full h-3 rounded-full" style={{ backgroundColor: '#FAF0D7' }}>
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: '#D4A843' }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: '#FAF0D7', color: '#8B6F47' }}>
          {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
        </span>
        <h3 className="text-xl font-bold mt-3 mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#3B2412' }}>
          {q.q}
        </h3>

        <div className="space-y-3">
          {q.options.map((option, i) => {
            let bg = '#fff';
            let border = '#e5e7eb';
            let textColor = '#333';

            if (answered) {
              if (i === q.answer) {
                bg = '#dcfce7';
                border = '#16a34a';
                textColor = '#16a34a';
              } else if (i === selected && i !== q.answer) {
                bg = '#fee2e2';
                border = '#dc2626';
                textColor = '#dc2626';
              }
            } else if (i === selected) {
              bg = '#FAF0D7';
              border = '#D4A843';
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full text-left p-4 rounded-lg border-2 transition-all font-medium"
                style={{ backgroundColor: bg, borderColor: border, color: textColor }}
                disabled={answered}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + i)}.</span>
                {option}
                {answered && i === q.answer && <span className="float-right">✅</span>}
                {answered && i === selected && i !== q.answer && <span className="float-right">❌</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      {answered && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition text-lg"
            style={{ backgroundColor: '#D4A843' }}
          >
            {currentQ + 1 >= questions.length ? '🏆 See Results' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BibleQuiz;
