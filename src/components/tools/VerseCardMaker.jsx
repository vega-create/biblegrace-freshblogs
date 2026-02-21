import { useState, useRef } from 'react';

const THEMES = [
  { id: 'sunset', name: 'Sunset', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#ffffff' },
  { id: 'ocean', name: 'Ocean', bg: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)', text: '#ffffff' },
  { id: 'forest', name: 'Forest', bg: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', text: '#ffffff' },
  { id: 'warmth', name: 'Warmth', bg: 'linear-gradient(135deg, #D4A843 0%, #3B2412 100%)', text: '#ffffff' },
  { id: 'rose', name: 'Rose', bg: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)', text: '#4a2030' },
  { id: 'midnight', name: 'Midnight', bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', text: '#e0d8f0' },
  { id: 'parchment', name: 'Parchment', bg: 'linear-gradient(135deg, #f5e6ca 0%, #e8d5b7 100%)', text: '#3B2412' },
  { id: 'sky', name: 'Sky', bg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', text: '#1a3a5c' },
];

const POPULAR_VERSES = [
  { ref: 'John 3:16', text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
  { ref: 'Jeremiah 29:11', text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.' },
  { ref: 'Philippians 4:13', text: 'I can do all this through him who gives me strength.' },
  { ref: 'Psalm 23:1', text: 'The Lord is my shepherd, I lack nothing.' },
  { ref: 'Isaiah 41:10', text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.' },
  { ref: 'Romans 8:28', text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.' },
  { ref: 'Psalm 46:10', text: 'Be still, and know that I am God.' },
  { ref: 'Proverbs 3:5-6', text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.' },
  { ref: 'Matthew 11:28', text: 'Come to me, all you who are weary and burdened, and I will give you rest.' },
  { ref: 'Romans 8:38-39', text: 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God.' },
];

const FONTS = [
  { id: 'serif', name: 'Classic Serif', family: 'Georgia, serif' },
  { id: 'sans', name: 'Modern Sans', family: 'Inter, system-ui, sans-serif' },
  { id: 'display', name: 'Elegant', family: "'Playfair Display', Georgia, serif" },
];

export default function VerseCardMaker() {
  const [verseText, setVerseText] = useState(POPULAR_VERSES[0].text);
  const [verseRef, setVerseRef] = useState(POPULAR_VERSES[0].ref);
  const [theme, setTheme] = useState(THEMES[3]);
  const [font, setFont] = useState(FONTS[2]);
  const [fontSize, setFontSize] = useState(20);
  const [showPopular, setShowPopular] = useState(false);
  const canvasRef = useRef(null);

  const selectPopular = (v) => {
    setVerseText(v.text);
    setVerseRef(v.ref);
    setShowPopular(false);
  };

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const W = 1080, H = 1080;
    canvas.width = W;
    canvas.height = H;

    // Background gradient
    const colors = theme.bg.match(/#[a-fA-F0-9]{6}/g) || ['#D4A843', '#3B2412'];
    const grad = ctx.createLinearGradient(0, 0, W, H);
    colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle pattern overlay
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 150 + 50, 0, Math.PI * 2);
      ctx.fill();
    }

    // Decorative quotes
    ctx.fillStyle = theme.text + '20';
    ctx.font = `bold 200px Georgia`;
    ctx.fillText('"', 60, 220);
    ctx.fillText('"', W - 180, H - 80);

    // Verse text
    ctx.fillStyle = theme.text;
    ctx.font = `${fontSize * 2.5}px ${font.family}`;
    ctx.textAlign = 'center';
    const maxWidth = W - 160;
    const words = verseText.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
      const test = line + word + ' ';
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line = test;
      }
    }
    lines.push(line.trim());

    const lineHeight = fontSize * 3.2;
    const totalHeight = lines.length * lineHeight;
    const startY = (H - totalHeight) / 2 + lineHeight * 0.5;

    lines.forEach((l, i) => {
      ctx.fillText(l, W / 2, startY + i * lineHeight);
    });

    // Reference
    ctx.font = `italic ${fontSize * 1.8}px ${font.family}`;
    ctx.fillStyle = theme.text + 'CC';
    ctx.fillText(`— ${verseRef} (NIV)`, W / 2, startY + lines.length * lineHeight + 40);

    // Watermark
    ctx.font = '20px Inter, sans-serif';
    ctx.fillStyle = theme.text + '40';
    ctx.fillText('BibleGrace.freshblogs.cc', W / 2, H - 30);

    return canvas;
  };

  const handleDownload = () => {
    const canvas = drawCard();
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `biblegrace-${verseRef.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    const canvas = drawCard();
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (navigator.share && blob) {
        try {
          await navigator.share({
            title: `${verseRef} — Bible Verse Card`,
            text: `"${verseText}" — ${verseRef}`,
            files: [new File([blob], 'verse-card.png', { type: 'image/png' })],
          });
        } catch (e) {
          // Fallback: copy text
          navigator.clipboard?.writeText(`"${verseText}" — ${verseRef}\n\nBibleGrace.freshblogs.cc`);
          alert('Verse copied to clipboard!');
        }
      } else {
        navigator.clipboard?.writeText(`"${verseText}" — ${verseRef}\n\nBibleGrace.freshblogs.cc`);
        alert('Verse copied to clipboard!');
      }
    });
  };

  // Draw preview
  const previewStyle = {
    background: theme.bg,
    color: theme.text,
    fontFamily: font.family,
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verse Text</label>
            <textarea
              value={verseText}
              onChange={(e) => setVerseText(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
              placeholder="Type or paste a Bible verse..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
            <input
              type="text"
              value={verseRef}
              onChange={(e) => setVerseRef(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
              placeholder="e.g. John 3:16"
            />
          </div>
          <div>
            <button
              onClick={() => setShowPopular(!showPopular)}
              className="text-sm font-medium flex items-center gap-1"
              style={{ color: '#D4A843' }}
            >
              📖 {showPopular ? 'Hide' : 'Choose from'} popular verses
            </button>
            {showPopular && (
              <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg divide-y">
                {POPULAR_VERSES.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => selectPopular(v)}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-amber-50 transition-colors"
                  >
                    <span className="font-semibold" style={{ color: '#D4A843' }}>{v.ref}</span>
                    <span className="text-gray-500 ml-2">{v.text.slice(0, 60)}...</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Style Options */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <div className="grid grid-cols-4 gap-2">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t)}
                  className={`h-12 rounded-lg border-2 transition-all ${theme.id === t.id ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent'}`}
                  style={{ background: t.bg }}
                  title={t.name}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font</label>
            <div className="flex gap-2">
              {FONTS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFont(f)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-all ${font.id === f.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}
                  style={{ fontFamily: f.family }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size: {fontSize}px</label>
            <input
              type="range"
              min="14"
              max="32"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-2xl overflow-hidden shadow-xl" style={{ ...previewStyle, aspectRatio: '1/1', maxWidth: '500px', margin: '0 auto' }}>
        <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center relative">
          <div className="absolute top-6 left-8 text-6xl opacity-10">"</div>
          <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ fontFamily: font.family, fontSize: `${fontSize}px` }}>
            {verseText}
          </p>
          <p className="text-sm opacity-70 italic" style={{ fontFamily: font.family }}>
            — {verseRef} (NIV)
          </p>
          <p className="absolute bottom-3 text-xs opacity-20">BibleGrace.freshblogs.cc</p>
          <div className="absolute bottom-6 right-8 text-6xl opacity-10">"</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleDownload}
          className="px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all"
          style={{ backgroundColor: '#D4A843' }}
        >
          ⬇️ Download Card
        </button>
        <button
          onClick={handleShare}
          className="px-6 py-3 rounded-lg font-medium border-2 hover:bg-amber-50 transition-all"
          style={{ borderColor: '#D4A843', color: '#D4A843' }}
        >
          📤 Share
        </button>
      </div>

      {/* Hidden canvas for rendering */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
