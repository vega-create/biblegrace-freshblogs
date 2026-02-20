import { useState } from 'react';
import versesData from '../../data/verses.json';

const VerseFinder = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);

  const handleThemeClick = (themeId) => {
    setSelectedTheme(themeId);
    setSearchQuery('');
    const filtered = versesData.verses.filter(v => v.themes.includes(themeId));
    setResults(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedTheme(null);
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = versesData.verses.filter(v =>
      v.text.toLowerCase().includes(lower) ||
      v.ref.toLowerCase().includes(lower) ||
      v.themes.some(t => t.includes(lower)) ||
      v.book.toLowerCase().includes(lower)
    );
    setResults(filtered);
  };

  const handleCopy = (verse, index) => {
    navigator.clipboard.writeText(`"${verse.text}" — ${verse.ref} (KJV)`);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(-1), 2000);
  };

  const activeThemeInfo = selectedTheme ? versesData.themes.find(t => t.id === selectedTheme) : null;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by keyword (love, strength, peace, anxiety...)"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 text-lg focus:outline-none transition-colors"
            style={{ borderColor: searchQuery ? '#D4A843' : '#e5e7eb', backgroundColor: '#fff' }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
        </div>
      </div>

      {/* Theme Buttons */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#3B2412' }}>
          Browse by Topic
        </h3>
        <div className="flex flex-wrap gap-2">
          {versesData.themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => handleThemeClick(theme.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTheme === theme.id
                  ? 'text-white shadow-md'
                  : 'hover:shadow-md'
              }`}
              style={{
                backgroundColor: selectedTheme === theme.id ? '#D4A843' : '#FAF0D7',
                color: selectedTheme === theme.id ? '#fff' : '#8B6F47'
              }}
            >
              {theme.icon} {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {(selectedTheme || searchQuery.length >= 2) && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#3B2412' }}>
              {activeThemeInfo
                ? `${activeThemeInfo.icon} ${activeThemeInfo.name} — ${results.length} verses`
                : `Found ${results.length} verse${results.length !== 1 ? 's' : ''}`
              }
            </h3>
            {selectedTheme && (
              <button onClick={() => { setSelectedTheme(null); setResults([]); }} className="text-sm underline" style={{ color: '#D4A843' }}>
                Clear
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-8 rounded-xl" style={{ backgroundColor: '#FAF0D7' }}>
              <p className="text-gray-600">No verses found. Try a different keyword or topic.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((verse, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow" style={{ borderLeft: '3px solid #D4A843' }}>
                  <p className="text-lg leading-relaxed mb-3" style={{ fontFamily: 'Georgia, serif', color: '#3B2412' }}>
                    "{verse.text}"
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="font-semibold" style={{ color: '#D4A843' }}>— {verse.ref} (KJV)</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(verse, index)}
                        className="text-xs px-3 py-1 rounded-full border transition-colors"
                        style={{ borderColor: '#D4A843', color: copiedIndex === index ? '#16a34a' : '#D4A843' }}
                      >
                        {copiedIndex === index ? '✅ Copied' : '📋 Copy'}
                      </button>
                      <button
                        onClick={() => {
                          const text = encodeURIComponent(`"${verse.text}" — ${verse.ref}`);
                          window.open(`https://www.facebook.com/sharer/sharer.php?quote=${text}`, '_blank');
                        }}
                        className="text-xs px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: '#1877F2' }}
                      >
                        Share
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {verse.themes.map(t => {
                      const info = versesData.themes.find(th => th.id === t);
                      return (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FDF6E8', color: '#8B6F47' }}>
                          {info?.icon} {info?.name || t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!selectedTheme && searchQuery.length < 2 && (
        <div className="text-center py-12 rounded-xl" style={{ backgroundColor: '#FAF0D7' }}>
          <p className="text-4xl mb-4">📖</p>
          <p className="text-lg font-medium" style={{ color: '#3B2412' }}>Search for Bible verses by topic</p>
          <p className="mt-2" style={{ color: '#8B6F47' }}>
            Type a keyword above or click a topic to find verses that speak to your heart.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerseFinder;
