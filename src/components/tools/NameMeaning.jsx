import { useState, useMemo } from 'react';

const NAMES = [
  // Male Names - Old Testament
  { name: 'Aaron', meaning: 'High mountain; exalted', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Moses\' brother, the first high priest of Israel', ref: 'Exodus 4:14' },
  { name: 'Abel', meaning: 'Breath; vapor', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Second son of Adam and Eve, killed by his brother Cain', ref: 'Genesis 4:2' },
  { name: 'Abraham', meaning: 'Father of many nations', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'The patriarch God called to be the father of the Jewish nation', ref: 'Genesis 17:5' },
  { name: 'Adam', meaning: 'Man; earth; red', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'The first man created by God', ref: 'Genesis 2:7' },
  { name: 'Benjamin', meaning: 'Son of my right hand', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Jacob\'s youngest son, born to Rachel', ref: 'Genesis 35:18' },
  { name: 'Caleb', meaning: 'Faithful; whole-hearted', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'One of only two spies who trusted God to give Israel the Promised Land', ref: 'Numbers 13:30' },
  { name: 'Daniel', meaning: 'God is my judge', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who survived the lion\'s den through faith in God', ref: 'Daniel 1:6' },
  { name: 'David', meaning: 'Beloved', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Shepherd boy who became king of Israel, writer of many Psalms', ref: '1 Samuel 16:13' },
  { name: 'Eli', meaning: 'Ascended; my God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'High priest and judge of Israel who mentored young Samuel', ref: '1 Samuel 1:9' },
  { name: 'Elijah', meaning: 'My God is Yahweh', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Powerful prophet who challenged the prophets of Baal and was taken to heaven', ref: '1 Kings 17:1' },
  { name: 'Enoch', meaning: 'Dedicated; disciplined', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Walked faithfully with God and was taken up without dying', ref: 'Genesis 5:24' },
  { name: 'Ethan', meaning: 'Strong; enduring; firm', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'A wise man noted for his wisdom, author of Psalm 89', ref: '1 Kings 4:31' },
  { name: 'Ezekiel', meaning: 'God strengthens', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who had extraordinary visions during the Babylonian exile', ref: 'Ezekiel 1:3' },
  { name: 'Ezra', meaning: 'Helper; help', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Priest and scribe who led spiritual reform after the Babylonian exile', ref: 'Ezra 7:1' },
  { name: 'Gideon', meaning: 'Mighty warrior; feller of trees', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Judge who defeated the Midianites with just 300 men', ref: 'Judges 6:12' },
  { name: 'Isaac', meaning: 'He laughs', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Son of Abraham and Sarah, born when they were very old', ref: 'Genesis 21:3' },
  { name: 'Isaiah', meaning: 'Salvation of the Lord', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Major prophet who foretold the coming of the Messiah', ref: 'Isaiah 1:1' },
  { name: 'Israel', meaning: 'He who struggles with God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Name given to Jacob after wrestling with God', ref: 'Genesis 32:28' },
  { name: 'Jacob', meaning: 'Supplanter; holder of the heel', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Son of Isaac, father of the twelve tribes of Israel', ref: 'Genesis 25:26' },
  { name: 'Jeremiah', meaning: 'God will uplift; God will exalt', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'The "weeping prophet" who warned Judah about coming judgment', ref: 'Jeremiah 1:5' },
  { name: 'Jesse', meaning: 'Gift; wealthy', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Father of King David, from the line of Judah', ref: 'Ruth 4:22' },
  { name: 'Joel', meaning: 'Yahweh is God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who spoke of the Day of the Lord and the outpouring of the Spirit', ref: 'Joel 1:1' },
  { name: 'Jonah', meaning: 'Dove', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet swallowed by a great fish after fleeing from God', ref: 'Jonah 1:1' },
  { name: 'Jonathan', meaning: 'God has given', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Son of King Saul, known for his loyal friendship with David', ref: '1 Samuel 18:1' },
  { name: 'Joseph', meaning: 'He will add; God shall add', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Jacob\'s favored son, sold into slavery, rose to power in Egypt', ref: 'Genesis 30:24' },
  { name: 'Joshua', meaning: 'The Lord is salvation', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Moses\' successor who led Israel into the Promised Land', ref: 'Joshua 1:1' },
  { name: 'Josiah', meaning: 'The Lord supports; healed by God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Righteous king of Judah who restored worship of God', ref: '2 Kings 22:1' },
  { name: 'Levi', meaning: 'Joined; attached', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Third son of Jacob, ancestor of the priestly tribe', ref: 'Genesis 29:34' },
  { name: 'Micah', meaning: 'Who is like God?', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who foretold that the Messiah would be born in Bethlehem', ref: 'Micah 5:2' },
  { name: 'Moses', meaning: 'Drawn out of the water', origin: 'Egyptian/Hebrew', gender: 'male', testament: 'OT', person: 'Led the Israelites out of Egypt, received the Ten Commandments', ref: 'Exodus 2:10' },
  { name: 'Nathan', meaning: 'He gave; gift', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who confronted King David about his sin', ref: '2 Samuel 12:1' },
  { name: 'Noah', meaning: 'Rest; comfort', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Built the ark and saved his family from the Great Flood', ref: 'Genesis 5:29' },
  { name: 'Samson', meaning: 'Sun; bright sun', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Judge of Israel known for his extraordinary strength', ref: 'Judges 13:24' },
  { name: 'Samuel', meaning: 'God has heard', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet and judge who anointed both Saul and David as kings', ref: '1 Samuel 1:20' },
  { name: 'Seth', meaning: 'Appointed; placed', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Third son of Adam and Eve, born after Abel\'s death', ref: 'Genesis 4:25' },
  { name: 'Solomon', meaning: 'Peaceful; peace', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Son of David, wisest king, builder of the First Temple', ref: '1 Kings 1:13' },
  // Male Names - New Testament
  { name: 'Andrew', meaning: 'Manly; strong; courageous', origin: 'Greek', gender: 'male', testament: 'NT', person: 'One of Jesus\' first disciples, brother of Simon Peter', ref: 'John 1:40' },
  { name: 'James', meaning: 'Supplanter (from Jacob)', origin: 'Hebrew/Greek', gender: 'male', testament: 'NT', person: 'Apostle, brother of John, part of Jesus\' inner circle', ref: 'Matthew 4:21' },
  { name: 'John', meaning: 'God is gracious', origin: 'Hebrew', gender: 'male', testament: 'NT', person: 'The "beloved disciple," author of John, 1-3 John, and Revelation', ref: 'John 13:23' },
  { name: 'Luke', meaning: 'Light; luminous', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Physician and companion of Paul, author of Luke and Acts', ref: 'Colossians 4:14' },
  { name: 'Mark', meaning: 'Warlike; dedicated to Mars', origin: 'Latin', gender: 'male', testament: 'NT', person: 'Author of the Gospel of Mark, companion of Paul and Barnabas', ref: 'Acts 12:12' },
  { name: 'Matthew', meaning: 'Gift of God', origin: 'Hebrew', gender: 'male', testament: 'NT', person: 'Tax collector who became an apostle and wrote the first Gospel', ref: 'Matthew 9:9' },
  { name: 'Paul', meaning: 'Small; humble', origin: 'Latin', gender: 'male', testament: 'NT', person: 'Greatest missionary of the early church, wrote 13 epistles', ref: 'Acts 13:9' },
  { name: 'Peter', meaning: 'Rock; stone', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Leader of the apostles, Jesus said "on this rock I will build my church"', ref: 'Matthew 16:18' },
  { name: 'Philip', meaning: 'Lover of horses', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Apostle from Bethsaida who brought Nathanael to Jesus', ref: 'John 1:43' },
  { name: 'Silas', meaning: 'Man of the forest; wood', origin: 'Latin/Aramaic', gender: 'male', testament: 'NT', person: 'Paul\'s companion on his second missionary journey', ref: 'Acts 15:40' },
  { name: 'Stephen', meaning: 'Crown; wreath', origin: 'Greek', gender: 'male', testament: 'NT', person: 'First Christian martyr, full of grace and power', ref: 'Acts 6:5' },
  { name: 'Thomas', meaning: 'Twin', origin: 'Aramaic', gender: 'male', testament: 'NT', person: 'Apostle who doubted the resurrection until he saw Jesus', ref: 'John 20:24-28' },
  { name: 'Timothy', meaning: 'Honoring God; one who fears God', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Young pastor mentored by Paul, recipient of two epistles', ref: '1 Timothy 1:2' },
  { name: 'Titus', meaning: 'Pleasing; title of honor', origin: 'Latin', gender: 'male', testament: 'NT', person: 'Greek believer and church leader entrusted with Crete by Paul', ref: 'Titus 1:4' },
  // Female Names
  { name: 'Abigail', meaning: 'Father\'s joy; source of joy', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Wise and beautiful woman who became David\'s wife', ref: '1 Samuel 25:3' },
  { name: 'Anna', meaning: 'Grace; favor', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'Elderly prophetess who recognized baby Jesus as the Messiah', ref: 'Luke 2:36' },
  { name: 'Bethany', meaning: 'House of figs', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'Village near Jerusalem where Mary, Martha, and Lazarus lived', ref: 'John 11:1' },
  { name: 'Deborah', meaning: 'Bee; to speak kind words', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Judge and prophetess who led Israel to victory', ref: 'Judges 4:4' },
  { name: 'Delilah', meaning: 'Delicate; languishing', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Woman who discovered the secret of Samson\'s strength', ref: 'Judges 16:4' },
  { name: 'Eden', meaning: 'Delight; paradise', origin: 'Hebrew', gender: 'unisex', testament: 'OT', person: 'The garden God created for Adam and Eve', ref: 'Genesis 2:8' },
  { name: 'Elizabeth', meaning: 'God is my oath; pledged to God', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'Mother of John the Baptist, relative of Mary', ref: 'Luke 1:5' },
  { name: 'Esther', meaning: 'Star; hidden', origin: 'Persian/Hebrew', gender: 'female', testament: 'OT', person: 'Jewish queen who saved her people from destruction', ref: 'Esther 2:7' },
  { name: 'Eve', meaning: 'Life; living one', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'The first woman, created by God from Adam\'s rib', ref: 'Genesis 3:20' },
  { name: 'Hannah', meaning: 'Grace; favor; merciful', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Devoted mother who prayed for a child and dedicated Samuel to God', ref: '1 Samuel 1:20' },
  { name: 'Joanna', meaning: 'God is gracious', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'One of the women who supported Jesus\' ministry and witnessed the empty tomb', ref: 'Luke 8:3' },
  { name: 'Leah', meaning: 'Weary; wild cow; gazelle', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Jacob\'s first wife, mother of six of the twelve tribes', ref: 'Genesis 29:16' },
  { name: 'Lydia', meaning: 'From Lydia; noble one', origin: 'Greek', gender: 'female', testament: 'NT', person: 'First European convert to Christianity, seller of purple cloth', ref: 'Acts 16:14' },
  { name: 'Martha', meaning: 'Lady; mistress of the house', origin: 'Aramaic', gender: 'female', testament: 'NT', person: 'Sister of Mary and Lazarus, known for her hospitality and service', ref: 'Luke 10:38' },
  { name: 'Mary', meaning: 'Beloved; wished-for child; bitter', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'Mother of Jesus, chosen by God to bear the Messiah', ref: 'Luke 1:27' },
  { name: 'Miriam', meaning: 'Rebellion; wished-for child', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Moses\' sister who watched over him as a baby and led worship after the Exodus', ref: 'Exodus 15:20' },
  { name: 'Naomi', meaning: 'Pleasantness; beautiful; gentle', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Mother-in-law of Ruth, whose story shows God\'s faithful provision', ref: 'Ruth 1:2' },
  { name: 'Phoebe', meaning: 'Bright; radiant; pure', origin: 'Greek', gender: 'female', testament: 'NT', person: 'Deaconess of the church at Cenchreae, commended by Paul', ref: 'Romans 16:1' },
  { name: 'Priscilla', meaning: 'Ancient; venerable', origin: 'Latin', gender: 'female', testament: 'NT', person: 'Early church leader who, with her husband Aquila, mentored Apollos', ref: 'Acts 18:2' },
  { name: 'Rachel', meaning: 'Ewe; lamb; innocent', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Jacob\'s beloved wife, mother of Joseph and Benjamin', ref: 'Genesis 29:6' },
  { name: 'Rebecca', meaning: 'To bind; to tie; captivating', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Wife of Isaac, mother of Jacob and Esau', ref: 'Genesis 24:15' },
  { name: 'Ruth', meaning: 'Friend; companion; vision of beauty', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Moabite woman whose loyalty to Naomi led her to become an ancestor of Jesus', ref: 'Ruth 1:16' },
  { name: 'Sarah', meaning: 'Princess; noblewoman', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Wife of Abraham, mother of Isaac at age 90', ref: 'Genesis 17:15' },
  { name: 'Tabitha', meaning: 'Gazelle', origin: 'Aramaic', gender: 'female', testament: 'NT', person: 'Disciple known for her acts of charity, raised from the dead by Peter', ref: 'Acts 9:36' },
  { name: 'Zipporah', meaning: 'Bird; sparrow', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Wife of Moses, daughter of Jethro the priest of Midian', ref: 'Exodus 2:21' },
];

export default function NameMeaning() {
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [testamentFilter, setTestamentFilter] = useState('all');
  const [expandedName, setExpandedName] = useState(null);
  const [randomName, setRandomName] = useState(null);

  const filtered = useMemo(() => {
    return NAMES.filter(n => {
      const matchSearch = !search || n.name.toLowerCase().includes(search.toLowerCase()) || n.meaning.toLowerCase().includes(search.toLowerCase());
      const matchGender = genderFilter === 'all' || n.gender === genderFilter;
      const matchTestament = testamentFilter === 'all' || n.testament === testamentFilter;
      return matchSearch && matchGender && matchTestament;
    });
  }, [search, genderFilter, testamentFilter]);

  const getRandomName = () => {
    const pool = filtered.length > 0 ? filtered : NAMES;
    const rand = pool[Math.floor(Math.random() * pool.length)];
    setRandomName(rand);
    setExpandedName(rand.name);
  };

  const letterGroups = useMemo(() => {
    const groups = {};
    filtered.forEach(n => {
      const letter = n.name[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(n);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or meaning..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {[{ v: 'all', l: 'All' }, { v: 'male', l: '👦 Male' }, { v: 'female', l: '👧 Female' }].map(g => (
              <button
                key={g.v}
                onClick={() => setGenderFilter(g.v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${genderFilter === g.v ? 'bg-white shadow text-amber-700' : 'text-gray-500'}`}
              >
                {g.l}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {[{ v: 'all', l: 'All' }, { v: 'OT', l: 'Old Testament' }, { v: 'NT', l: 'New Testament' }].map(t => (
              <button
                key={t.v}
                onClick={() => setTestamentFilter(t.v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${testamentFilter === t.v ? 'bg-white shadow text-amber-700' : 'text-gray-500'}`}
              >
                {t.l}
              </button>
            ))}
          </div>
          <button
            onClick={getRandomName}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-white"
            style={{ backgroundColor: '#D4A843' }}
          >
            🎲 Random Name
          </button>
        </div>
      </div>

      {/* Random Name Highlight */}
      {randomName && (
        <div className="p-5 rounded-xl border-2 animate-fadeIn" style={{ borderColor: '#D4A843', backgroundColor: '#FAF0D7' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#D4A843' }}>✨ Random Pick</span>
          </div>
          <h3 className="text-xl font-bold" style={{ color: '#3B2412', fontFamily: "'Playfair Display', Georgia, serif" }}>{randomName.name}</h3>
          <p className="text-sm mt-1" style={{ color: '#D4A843' }}>"{randomName.meaning}"</p>
          <p className="text-sm text-gray-600 mt-2">{randomName.person}</p>
          <p className="text-xs text-gray-400 mt-1">📖 {randomName.ref} • {randomName.origin} • {randomName.testament === 'OT' ? 'Old Testament' : 'New Testament'}</p>
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        Showing {filtered.length} of {NAMES.length} names
      </p>

      {/* Name List by Letter */}
      {Object.keys(letterGroups).sort().map(letter => (
        <div key={letter}>
          <h3 className="text-lg font-bold mb-2 sticky top-16 bg-white py-1 z-10" style={{ color: '#D4A843', fontFamily: "'Playfair Display', Georgia, serif" }}>
            {letter}
          </h3>
          <div className="space-y-2">
            {letterGroups[letter].map(n => (
              <button
                key={n.name}
                onClick={() => setExpandedName(expandedName === n.name ? null : n.name)}
                className={`w-full text-left rounded-xl border transition-all overflow-hidden ${
                  expandedName === n.name ? 'border-amber-400 shadow-md bg-amber-50' : 'border-gray-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold" style={{ color: '#3B2412' }}>{n.name}</span>
                      <span className="text-xs text-gray-400">
                        {n.gender === 'male' ? '👦' : n.gender === 'female' ? '👧' : '✨'}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: n.testament === 'OT' ? '#E8F5E9' : '#E3F2FD', color: n.testament === 'OT' ? '#2E7D32' : '#1565C0' }}>
                        {n.testament === 'OT' ? 'Old Testament' : 'New Testament'}
                      </span>
                    </div>
                    <span className="text-gray-300">{expandedName === n.name ? '▲' : '▼'}</span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#8B6F47' }}>"{n.meaning}"</p>

                  {expandedName === n.name && (
                    <div className="mt-3 pt-3 border-t border-amber-200 space-y-2 animate-fadeIn">
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-400 mt-0.5 flex-shrink-0">📖</span>
                        <p className="text-sm text-gray-600">{n.person}</p>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>Origin: {n.origin}</span>
                        <span>Reference: {n.ref}</span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-500">No names found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
