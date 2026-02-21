import { useState } from 'react';

const ERAS = [
  {
    id: 'creation',
    name: 'Creation & Patriarchs',
    period: 'Before 1800 BC',
    color: '#2E7D32',
    icon: '🌍',
    events: [
      { year: '~4000 BC', title: 'Creation', desc: 'God creates the heavens and the earth, Adam and Eve in the Garden of Eden.', ref: 'Genesis 1-2' },
      { year: '~3000 BC', title: 'The Fall & Cain and Abel', desc: 'Sin enters the world. Cain kills his brother Abel.', ref: 'Genesis 3-4' },
      { year: '~2400 BC', title: "Noah's Flood", desc: 'God floods the earth, saving Noah and his family on the ark.', ref: 'Genesis 6-9' },
      { year: '~2200 BC', title: 'Tower of Babel', desc: 'Humanity tries to build a tower to heaven. God confuses their languages.', ref: 'Genesis 11' },
      { year: '~2000 BC', title: 'Call of Abraham', desc: 'God calls Abram to leave his homeland and promises to make him a great nation.', ref: 'Genesis 12' },
      { year: '~1900 BC', title: 'Isaac & Jacob', desc: 'Abraham\'s son Isaac and grandson Jacob (Israel) carry on God\'s covenant promise.', ref: 'Genesis 21-35' },
      { year: '~1850 BC', title: 'Joseph in Egypt', desc: 'Jacob\'s son Joseph is sold into slavery but rises to become ruler of Egypt.', ref: 'Genesis 37-50' },
    ],
  },
  {
    id: 'exodus',
    name: 'Exodus & Conquest',
    period: '1500–1200 BC',
    color: '#C62828',
    icon: '🔥',
    events: [
      { year: '~1446 BC', title: 'The Exodus', desc: 'Moses leads the Israelites out of slavery in Egypt. God parts the Red Sea.', ref: 'Exodus 12-14' },
      { year: '~1446 BC', title: 'Ten Commandments', desc: 'God gives Moses the Law on Mount Sinai.', ref: 'Exodus 20' },
      { year: '~1406 BC', title: '40 Years in Wilderness', desc: 'Israel wanders in the desert due to disobedience. Moses dies on Mount Nebo.', ref: 'Numbers, Deuteronomy' },
      { year: '~1406 BC', title: 'Conquest of Canaan', desc: 'Joshua leads Israel across the Jordan River. The walls of Jericho fall.', ref: 'Joshua 1-6' },
      { year: '~1375 BC', title: 'Period of Judges', desc: 'Israel cycles through sin, oppression, and deliverance under leaders like Gideon, Samson, and Deborah.', ref: 'Judges' },
    ],
  },
  {
    id: 'kingdom',
    name: 'United & Divided Kingdom',
    period: '1050–586 BC',
    color: '#AD1457',
    icon: '👑',
    events: [
      { year: '~1050 BC', title: 'King Saul', desc: 'Israel demands a king. Saul is anointed as the first king of Israel.', ref: '1 Samuel 8-10' },
      { year: '~1010 BC', title: 'King David', desc: 'David defeats Goliath, becomes king, and establishes Jerusalem as the capital.', ref: '1 Samuel 17, 2 Samuel' },
      { year: '~970 BC', title: 'King Solomon', desc: "Solomon builds the Temple in Jerusalem. Known for extraordinary wisdom.", ref: '1 Kings 1-11' },
      { year: '930 BC', title: 'Kingdom Divides', desc: 'After Solomon\'s death, the kingdom splits into Israel (north) and Judah (south).', ref: '1 Kings 12' },
      { year: '~870 BC', title: 'Elijah vs. Baal', desc: 'Prophet Elijah challenges the prophets of Baal on Mount Carmel.', ref: '1 Kings 18' },
      { year: '722 BC', title: 'Fall of Israel', desc: 'Assyria conquers the northern kingdom. The 10 tribes are scattered.', ref: '2 Kings 17' },
      { year: '586 BC', title: 'Fall of Jerusalem', desc: 'Babylon destroys Jerusalem and Solomon\'s Temple. Judah goes into exile.', ref: '2 Kings 25' },
    ],
  },
  {
    id: 'exile',
    name: 'Exile & Return',
    period: '586–400 BC',
    color: '#4527A0',
    icon: '⛓️',
    events: [
      { year: '586 BC', title: 'Babylonian Exile', desc: 'Jews live in Babylon. Daniel serves in the royal court. Ezekiel prophesies hope.', ref: 'Daniel, Ezekiel' },
      { year: '539 BC', title: 'Cyrus Decree', desc: 'Persian King Cyrus conquers Babylon and allows Jews to return home.', ref: 'Ezra 1' },
      { year: '516 BC', title: 'Second Temple Built', desc: 'Under Zerubbabel, the Jews rebuild the Temple in Jerusalem.', ref: 'Ezra 6' },
      { year: '458 BC', title: 'Ezra\'s Reforms', desc: 'Ezra the scribe leads spiritual renewal and restores the Law.', ref: 'Ezra 7-10' },
      { year: '445 BC', title: 'Nehemiah Rebuilds Walls', desc: 'Nehemiah returns to rebuild Jerusalem\'s walls in just 52 days.', ref: 'Nehemiah 1-6' },
      { year: '~430 BC', title: 'Malachi — Last Prophet', desc: 'The final Old Testament prophet speaks. 400 years of silence follow.', ref: 'Malachi' },
    ],
  },
  {
    id: 'jesus',
    name: 'Life of Jesus',
    period: '6 BC – 30 AD',
    color: '#D4A843',
    icon: '✝️',
    events: [
      { year: '~6 BC', title: 'Birth of Jesus', desc: 'Jesus is born in Bethlehem to Mary and Joseph. Angels announce His birth to shepherds.', ref: 'Luke 2, Matthew 1-2' },
      { year: '~26 AD', title: 'Baptism & Ministry Begins', desc: 'John baptizes Jesus. Jesus begins teaching, healing, and calling disciples.', ref: 'Matthew 3-4' },
      { year: '~27 AD', title: 'Sermon on the Mount', desc: 'Jesus teaches the Beatitudes and the Lord\'s Prayer. "Blessed are the poor in spirit..."', ref: 'Matthew 5-7' },
      { year: '~28 AD', title: 'Miracles & Parables', desc: 'Jesus performs miracles — feeding 5,000, walking on water, raising Lazarus. Teaches through parables.', ref: 'Matthew, Mark, Luke, John' },
      { year: '~30 AD', title: 'The Last Supper', desc: 'Jesus shares a final meal with His disciples and institutes the Lord\'s Supper.', ref: 'Luke 22' },
      { year: '~30 AD', title: 'Crucifixion', desc: 'Jesus is betrayed, tried, and crucified at Golgotha. He dies for the sins of humanity.', ref: 'Matthew 27, John 19' },
      { year: '~30 AD', title: 'Resurrection & Ascension', desc: 'Jesus rises from the dead on the third day, appears to over 500 people, and ascends to heaven.', ref: 'Matthew 28, Acts 1' },
    ],
  },
  {
    id: 'church',
    name: 'Early Church',
    period: '30–100 AD',
    color: '#1565C0',
    icon: '🕊️',
    events: [
      { year: '~30 AD', title: 'Day of Pentecost', desc: 'The Holy Spirit descends on the apostles. Peter preaches and 3,000 are saved.', ref: 'Acts 2' },
      { year: '~35 AD', title: 'Conversion of Paul', desc: 'Saul, a persecutor of Christians, encounters Jesus on the road to Damascus.', ref: 'Acts 9' },
      { year: '~49 AD', title: 'Council of Jerusalem', desc: 'Early church leaders decide that Gentile believers don\'t need to follow Jewish law.', ref: 'Acts 15' },
      { year: '~50-67 AD', title: 'Paul\'s Missionary Journeys', desc: 'Paul travels throughout the Roman Empire planting churches and writing letters (epistles).', ref: 'Acts 13-28' },
      { year: '~64 AD', title: 'Persecution Under Nero', desc: 'Roman Emperor Nero persecutes Christians. Peter and Paul are martyred.', ref: 'Tradition' },
      { year: '70 AD', title: 'Destruction of the Temple', desc: 'Romans destroy Jerusalem and the Second Temple, fulfilling Jesus\' prophecy.', ref: 'Matthew 24, Historical' },
      { year: '~95 AD', title: 'Book of Revelation', desc: 'The apostle John writes Revelation on the island of Patmos — the final book of the Bible.', ref: 'Revelation' },
    ],
  },
];

export default function BibleTimeline() {
  const [activeEra, setActiveEra] = useState(ERAS[0].id);
  const [expandedEvent, setExpandedEvent] = useState(null);

  const currentEra = ERAS.find(e => e.id === activeEra);

  return (
    <div className="space-y-6">
      {/* Era Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {ERAS.map(era => (
          <button
            key={era.id}
            onClick={() => { setActiveEra(era.id); setExpandedEvent(null); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeEra === era.id
                ? 'text-white shadow-lg scale-105'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-amber-300'
            }`}
            style={activeEra === era.id ? { backgroundColor: era.color } : {}}
          >
            {era.icon} {era.name}
          </button>
        ))}
      </div>

      {/* Era Header */}
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold" style={{ color: currentEra.color, fontFamily: "'Playfair Display', Georgia, serif" }}>
          {currentEra.icon} {currentEra.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{currentEra.period}</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5" style={{ backgroundColor: currentEra.color + '30' }} />

        <div className="space-y-4">
          {currentEra.events.map((event, idx) => (
            <div key={idx} className="relative pl-16 md:pl-20">
              {/* Dot */}
              <div
                className="absolute left-4 md:left-6 w-5 h-5 rounded-full border-3 bg-white"
                style={{ borderColor: currentEra.color, borderWidth: '3px', top: '6px' }}
              />

              {/* Card */}
              <button
                onClick={() => setExpandedEvent(expandedEvent === idx ? null : idx)}
                className={`w-full text-left rounded-xl border-2 transition-all overflow-hidden ${
                  expandedEvent === idx ? 'shadow-lg' : 'hover:shadow-md'
                }`}
                style={{
                  borderColor: expandedEvent === idx ? currentEra.color : '#e5e7eb',
                  backgroundColor: expandedEvent === idx ? currentEra.color + '08' : 'white',
                }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: currentEra.color }}>
                      {event.year}
                    </span>
                    <h3 className="font-semibold text-sm" style={{ color: '#3B2412' }}>{event.title}</h3>
                  </div>

                  {expandedEvent === idx && (
                    <div className="mt-3 space-y-2 animate-fadeIn">
                      <p className="text-sm text-gray-600 leading-relaxed">{event.desc}</p>
                      <p className="text-xs font-medium" style={{ color: currentEra.color }}>
                        📖 {event.ref}
                      </p>
                    </div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#FAF0D7' }}>
          <div className="text-2xl font-bold" style={{ color: '#D4A843' }}>{ERAS.length}</div>
          <div className="text-xs text-gray-500">Eras</div>
        </div>
        <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#FAF0D7' }}>
          <div className="text-2xl font-bold" style={{ color: '#D4A843' }}>
            {ERAS.reduce((sum, era) => sum + era.events.length, 0)}
          </div>
          <div className="text-xs text-gray-500">Key Events</div>
        </div>
        <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#FAF0D7' }}>
          <div className="text-2xl font-bold" style={{ color: '#D4A843' }}>4,000+</div>
          <div className="text-xs text-gray-500">Years of History</div>
        </div>
      </div>
    </div>
  );
}
