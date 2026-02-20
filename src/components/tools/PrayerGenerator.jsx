import { useState } from 'react';
import prayerData from '../../data/prayers.json';

const PrayerGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    const prayers = prayerData.prayers.filter(p => p.category === catId);
    const random = prayers[Math.floor(Math.random() * prayers.length)];
    setCurrentPrayer(random);
    setCopied(false);
  };

  const getAnother = () => {
    if (!selectedCategory) return;
    const prayers = prayerData.prayers.filter(p => p.category === selectedCategory);
    const random = prayers[Math.floor(Math.random() * prayers.length)];
    setCurrentPrayer(random);
    setCopied(false);
  };

  const getRandom = () => {
    const random = prayerData.prayers[Math.floor(Math.random() * prayerData.prayers.length)];
    setSelectedCategory(random.category);
    setCurrentPrayer(random);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!currentPrayer) return;
    navigator.clipboard.writeText(`${currentPrayer.title}\n\n${currentPrayer.text}\n\n— ${currentPrayer.verse}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Category Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#3B2412' }}>
          What would you like to pray about?
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {prayerData.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`p-4 rounded-xl text-center transition-all hover:-translate-y-1 ${
                selectedCategory === cat.id ? 'shadow-lg' : 'shadow-md hover:shadow-lg'
              }`}
              style={{
                backgroundColor: selectedCategory === cat.id ? '#D4A843' : '#FAF0D7',
                color: selectedCategory === cat.id ? '#fff' : '#3B2412'
              }}
            >
              <p className="text-2xl mb-1">{cat.icon}</p>
              <p className="text-sm font-medium">{cat.name}</p>
            </button>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            onClick={getRandom}
            className="text-sm font-medium underline hover:opacity-80 transition"
            style={{ color: '#D4A843' }}
          >
            🔀 Random Prayer
          </button>
        </div>
      </div>

      {/* Prayer Display */}
      {currentPrayer && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6" style={{ backgroundColor: '#FAF0D7' }}>
            <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#3B2412' }}>
              🙏 {currentPrayer.title}
            </h3>
          </div>

          {/* Prayer Text */}
          <div className="p-6">
            <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif', color: '#333', lineHeight: '1.8' }}>
              {currentPrayer.text}
            </p>

            {/* Scripture Reference */}
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#FDF6E8', borderLeft: '3px solid #D4A843' }}>
              <p className="text-sm font-medium" style={{ color: '#8B6F47' }}>
                📖 Scripture: <span style={{ color: '#D4A843' }}>{currentPrayer.verse}</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition"
              style={{ borderColor: '#D4A843', color: copied ? '#16a34a' : '#D4A843' }}
            >
              {copied ? '✅ Copied!' : '📋 Copy Prayer'}
            </button>
            <button
              onClick={getAnother}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: '#D4A843' }}
            >
              🔄 Another Prayer
            </button>
            <button
              onClick={() => {
                const text = encodeURIComponent(`"${currentPrayer.title}" — a beautiful prayer from BibleGrace`);
                const url = encodeURIComponent('https://biblegrace.freshblogs.cc/tools/prayer-generator');
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: '#1877F2' }}
            >
              Share on Facebook
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentPrayer && (
        <div className="text-center py-12 rounded-xl" style={{ backgroundColor: '#FAF0D7' }}>
          <p className="text-5xl mb-4">🙏</p>
          <p className="text-lg font-medium" style={{ color: '#3B2412' }}>Choose a prayer topic above</p>
          <p className="mt-2" style={{ color: '#8B6F47' }}>
            Find the right words for your conversation with God.
          </p>
        </div>
      )}
    </div>
  );
};

export default PrayerGenerator;
