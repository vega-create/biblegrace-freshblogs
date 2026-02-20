import { useState, useEffect } from 'react';
import versesData from '../../data/verses.json';

const DailyVerse = () => {
  const [verse, setVerse] = useState(null);
  const [reflection, setReflection] = useState('');
  const [copied, setCopied] = useState(false);

  const getDateSeed = () => {
    const now = new Date();
    return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  };

  const getDailyVerse = () => {
    const seed = getDateSeed();
    const index = seed % versesData.verses.length;
    return versesData.verses[index];
  };

  const getDailyReflection = () => {
    const seed = getDateSeed();
    const index = seed % versesData.reflections.length;
    return versesData.reflections[index];
  };

  useEffect(() => {
    setVerse(getDailyVerse());
    setReflection(getDailyReflection());
  }, []);

  const handleShare = (platform) => {
    if (!verse) return;
    const text = `"${verse.text}" — ${verse.ref} (KJV)`;
    const url = 'https://biblegrace.freshblogs.cc/tools/daily-verse';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const getNewVerse = () => {
    const randomIndex = Math.floor(Math.random() * versesData.verses.length);
    setVerse(versesData.verses[randomIndex]);
    const reflIndex = Math.floor(Math.random() * versesData.reflections.length);
    setReflection(versesData.reflections[reflIndex]);
  };

  if (!verse) return <div className="text-center py-12 text-gray-500">Loading today's verse...</div>;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="max-w-2xl mx-auto">
      {/* Date */}
      <p className="text-center text-sm font-medium mb-6" style={{ color: '#8B6F47' }}>
        📅 {today}
      </p>

      {/* Verse Card */}
      <div className="rounded-2xl p-8 mb-6 shadow-lg" style={{ backgroundColor: '#FAF0D7', borderLeft: '4px solid #D4A843' }}>
        <p className="text-xl md:text-2xl leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif', color: '#3B2412' }}>
          "{verse.text}"
        </p>
        <p className="text-right font-semibold" style={{ color: '#D4A843' }}>
          — {verse.ref} (KJV)
        </p>
      </div>

      {/* Reflection */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
        <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#3B2412' }}>
          💭 Today's Reflection
        </h3>
        <p className="text-gray-700 leading-relaxed">{reflection}</p>
      </div>

      {/* Themes */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {verse.themes.map(theme => {
          const themeInfo = versesData.themes.find(t => t.id === theme);
          return (
            <span key={theme} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#FAF0D7', color: '#8B6F47' }}>
              {themeInfo?.icon} {themeInfo?.name || theme}
            </span>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={() => handleShare('facebook')}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#1877F2' }}
        >
          Share on Facebook
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#1DA1F2' }}
        >
          Share on X
        </button>
        <button
          onClick={() => handleShare('copy')}
          className="px-4 py-2 rounded-lg text-sm font-medium border-2 hover:opacity-80 transition-opacity"
          style={{ borderColor: '#D4A843', color: '#D4A843' }}
        >
          {copied ? '✅ Copied!' : '📋 Copy Verse'}
        </button>
      </div>

      {/* New Verse */}
      <div className="text-center">
        <button
          onClick={getNewVerse}
          className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#D4A843' }}
        >
          🔄 Get Another Verse
        </button>
      </div>
    </div>
  );
};

export default DailyVerse;
