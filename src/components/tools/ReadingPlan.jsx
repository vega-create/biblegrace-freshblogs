import { useState } from 'react';

const BIBLE_BOOKS = {
  'Old Testament': [
    { name: 'Genesis', chapters: 50, category: 'law' },
    { name: 'Exodus', chapters: 40, category: 'law' },
    { name: 'Leviticus', chapters: 27, category: 'law' },
    { name: 'Numbers', chapters: 36, category: 'law' },
    { name: 'Deuteronomy', chapters: 34, category: 'law' },
    { name: 'Joshua', chapters: 24, category: 'history' },
    { name: 'Judges', chapters: 21, category: 'history' },
    { name: 'Ruth', chapters: 4, category: 'history' },
    { name: '1 Samuel', chapters: 31, category: 'history' },
    { name: '2 Samuel', chapters: 24, category: 'history' },
    { name: '1 Kings', chapters: 22, category: 'history' },
    { name: '2 Kings', chapters: 25, category: 'history' },
    { name: '1 Chronicles', chapters: 29, category: 'history' },
    { name: '2 Chronicles', chapters: 36, category: 'history' },
    { name: 'Ezra', chapters: 10, category: 'history' },
    { name: 'Nehemiah', chapters: 13, category: 'history' },
    { name: 'Esther', chapters: 10, category: 'history' },
    { name: 'Job', chapters: 42, category: 'wisdom' },
    { name: 'Psalms', chapters: 150, category: 'wisdom' },
    { name: 'Proverbs', chapters: 31, category: 'wisdom' },
    { name: 'Ecclesiastes', chapters: 12, category: 'wisdom' },
    { name: 'Song of Solomon', chapters: 8, category: 'wisdom' },
    { name: 'Isaiah', chapters: 66, category: 'prophets' },
    { name: 'Jeremiah', chapters: 52, category: 'prophets' },
    { name: 'Lamentations', chapters: 5, category: 'prophets' },
    { name: 'Ezekiel', chapters: 48, category: 'prophets' },
    { name: 'Daniel', chapters: 12, category: 'prophets' },
    { name: 'Hosea', chapters: 14, category: 'prophets' },
    { name: 'Joel', chapters: 3, category: 'prophets' },
    { name: 'Amos', chapters: 9, category: 'prophets' },
    { name: 'Obadiah', chapters: 1, category: 'prophets' },
    { name: 'Jonah', chapters: 4, category: 'prophets' },
    { name: 'Micah', chapters: 7, category: 'prophets' },
    { name: 'Nahum', chapters: 3, category: 'prophets' },
    { name: 'Habakkuk', chapters: 3, category: 'prophets' },
    { name: 'Zephaniah', chapters: 3, category: 'prophets' },
    { name: 'Haggai', chapters: 2, category: 'prophets' },
    { name: 'Zechariah', chapters: 14, category: 'prophets' },
    { name: 'Malachi', chapters: 4, category: 'prophets' },
  ],
  'New Testament': [
    { name: 'Matthew', chapters: 28, category: 'gospels' },
    { name: 'Mark', chapters: 16, category: 'gospels' },
    { name: 'Luke', chapters: 24, category: 'gospels' },
    { name: 'John', chapters: 21, category: 'gospels' },
    { name: 'Acts', chapters: 28, category: 'history' },
    { name: 'Romans', chapters: 16, category: 'epistles' },
    { name: '1 Corinthians', chapters: 16, category: 'epistles' },
    { name: '2 Corinthians', chapters: 13, category: 'epistles' },
    { name: 'Galatians', chapters: 6, category: 'epistles' },
    { name: 'Ephesians', chapters: 6, category: 'epistles' },
    { name: 'Philippians', chapters: 4, category: 'epistles' },
    { name: 'Colossians', chapters: 4, category: 'epistles' },
    { name: '1 Thessalonians', chapters: 5, category: 'epistles' },
    { name: '2 Thessalonians', chapters: 3, category: 'epistles' },
    { name: '1 Timothy', chapters: 6, category: 'epistles' },
    { name: '2 Timothy', chapters: 4, category: 'epistles' },
    { name: 'Titus', chapters: 3, category: 'epistles' },
    { name: 'Philemon', chapters: 1, category: 'epistles' },
    { name: 'Hebrews', chapters: 13, category: 'epistles' },
    { name: 'James', chapters: 5, category: 'epistles' },
    { name: '1 Peter', chapters: 5, category: 'epistles' },
    { name: '2 Peter', chapters: 3, category: 'epistles' },
    { name: '1 John', chapters: 5, category: 'epistles' },
    { name: '2 John', chapters: 1, category: 'epistles' },
    { name: '3 John', chapters: 1, category: 'epistles' },
    { name: 'Jude', chapters: 1, category: 'epistles' },
    { name: 'Revelation', chapters: 22, category: 'prophecy' },
  ],
};

const PRESETS = [
  { id: 'whole-bible', name: '📖 Whole Bible', desc: 'Read the entire Bible', filter: null },
  { id: 'new-testament', name: '✝️ New Testament', desc: 'Great for beginners', filter: 'New Testament' },
  { id: 'gospels', name: '📜 Gospels + Acts', desc: "Life of Jesus & early church", filter: 'gospels' },
  { id: 'psalms-proverbs', name: '🙏 Psalms & Proverbs', desc: 'Wisdom & worship', filter: 'psalms-proverbs' },
  { id: 'paul-letters', name: '✉️ Paul\'s Letters', desc: 'Romans through Philemon', filter: 'epistles' },
];

const PACE_OPTIONS = [
  { id: 1, label: '1 chapter/day', desc: '~3 years for whole Bible' },
  { id: 2, label: '2 chapters/day', desc: '~1.5 years for whole Bible' },
  { id: 3, label: '3 chapters/day', desc: '~1 year for whole Bible' },
  { id: 4, label: '4 chapters/day', desc: '~9 months for whole Bible' },
];

export default function ReadingPlan() {
  const [preset, setPreset] = useState(null);
  const [pace, setPace] = useState(3);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [plan, setPlan] = useState(null);
  const [checkedDays, setCheckedDays] = useState({});
  const [currentWeek, setCurrentWeek] = useState(0);

  const generatePlan = () => {
    let books = [];
    const allBooks = [...BIBLE_BOOKS['Old Testament'], ...BIBLE_BOOKS['New Testament']];

    if (!preset || preset === 'whole-bible') {
      books = allBooks;
    } else if (preset === 'new-testament') {
      books = BIBLE_BOOKS['New Testament'];
    } else if (preset === 'gospels') {
      books = allBooks.filter(b => b.category === 'gospels' || b.name === 'Acts');
    } else if (preset === 'psalms-proverbs') {
      books = allBooks.filter(b => b.name === 'Psalms' || b.name === 'Proverbs');
    } else if (preset === 'epistles') {
      books = BIBLE_BOOKS['New Testament'].filter(b => b.category === 'epistles');
    }

    // Build chapter list
    const chapters = [];
    books.forEach(book => {
      for (let c = 1; c <= book.chapters; c++) {
        chapters.push(`${book.name} ${c}`);
      }
    });

    // Group by day
    const days = [];
    for (let i = 0; i < chapters.length; i += pace) {
      days.push(chapters.slice(i, i + pace));
    }

    // Assign dates
    const start = new Date(startDate);
    const schedule = days.map((readings, idx) => {
      const date = new Date(start);
      date.setDate(date.getDate() + idx);
      return {
        day: idx + 1,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        dateKey: date.toISOString().split('T')[0],
        readings,
      };
    });

    setPlan(schedule);
    setCurrentWeek(0);
    setCheckedDays({});
  };

  const toggleDay = (dayKey) => {
    setCheckedDays(prev => ({ ...prev, [dayKey]: !prev[dayKey] }));
  };

  const completedCount = Object.values(checkedDays).filter(Boolean).length;
  const DAYS_PER_PAGE = 14;
  const visiblePlan = plan?.slice(currentWeek * DAYS_PER_PAGE, (currentWeek + 1) * DAYS_PER_PAGE);
  const totalPages = plan ? Math.ceil(plan.length / DAYS_PER_PAGE) : 0;

  return (
    <div className="space-y-6">
      {!plan ? (
        <>
          {/* Step 1: Choose preset */}
          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#3B2412' }}>Step 1: Choose What to Read</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${preset === p.id ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-gray-200 hover:border-amber-300'}`}
                >
                  <div className="font-semibold text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose pace */}
          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#3B2412' }}>Step 2: Choose Your Pace</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {PACE_OPTIONS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPace(p.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${pace === p.id ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-gray-200 hover:border-amber-300'}`}
                >
                  <div className="font-semibold text-sm">{p.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Start date */}
          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#3B2412' }}>Step 3: Start Date</h2>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-300"
            />
          </div>

          {/* Generate */}
          <button
            onClick={generatePlan}
            disabled={!preset}
            className="w-full py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#D4A843' }}
          >
            ✨ Generate My Reading Plan
          </button>
        </>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="rounded-xl p-5" style={{ backgroundColor: '#FAF0D7' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold" style={{ color: '#3B2412' }}>Progress</span>
              <span className="text-sm font-medium" style={{ color: '#D4A843' }}>
                {completedCount} / {plan.length} days ({Math.round((completedCount / plan.length) * 100)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-white rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / plan.length) * 100}%`, backgroundColor: '#D4A843' }}
              />
            </div>
          </div>

          {/* Plan Table */}
          <div className="space-y-2">
            {visiblePlan.map(day => (
              <button
                key={day.day}
                onClick={() => toggleDay(day.dateKey)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  checkedDays[day.dateKey]
                    ? 'bg-green-50 border-green-300'
                    : 'bg-white border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  checkedDays[day.dateKey] ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'
                }`}>
                  {checkedDays[day.dateKey] && <span className="text-sm">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FAF0D7', color: '#8B6F47' }}>
                      Day {day.day}
                    </span>
                    <span className="text-xs text-gray-400">{day.date}</span>
                  </div>
                  <div className={`text-sm mt-1 ${checkedDays[day.dateKey] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {day.readings.join(', ')}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentWeek(w => Math.max(0, w - 1))}
              disabled={currentWeek === 0}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 disabled:opacity-30"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {currentWeek + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentWeek(w => Math.min(totalPages - 1, w + 1))}
              disabled={currentWeek >= totalPages - 1}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 disabled:opacity-30"
            >
              Next →
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={() => setPlan(null)}
            className="w-full py-2 text-sm rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"
          >
            ← Create New Plan
          </button>
        </>
      )}
    </div>
  );
}
