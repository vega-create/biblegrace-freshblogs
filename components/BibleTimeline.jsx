import { useState } from 'react';

const ERAS = [
  {
    id: 'creation',
    name: 'Creation & Patriarchs',
    period: 'Before 1800 BC',
    color: '#2E7D32',
    icon: '🌍',
    events: [
      { year: '~4000 BC', title: 'Creation', desc: 'God creates the heavens and the earth in six days, and rests on the seventh. Adam and Eve are placed in the Garden of Eden.', ref: 'Genesis 1-2' },
      { year: '~4000 BC', title: 'The Fall of Man', desc: 'The serpent tempts Eve. Adam and Eve eat the forbidden fruit and sin enters the world. They are expelled from Eden.', ref: 'Genesis 3' },
      { year: '~3900 BC', title: 'Cain and Abel', desc: 'Adam and Eve\'s sons bring offerings to God. Cain murders Abel out of jealousy — the first death in the Bible.', ref: 'Genesis 4' },
      { year: '~3000 BC', title: 'Enoch Walks with God', desc: 'Enoch lives 365 years in such close fellowship with God that God takes him to heaven without dying.', ref: 'Genesis 5:21-24' },
      { year: '~2400 BC', title: "Noah's Ark & the Flood", desc: 'Wickedness fills the earth. God instructs Noah to build an ark. The Great Flood destroys all life except those on the ark.', ref: 'Genesis 6-9' },
      { year: '~2400 BC', title: 'Rainbow Covenant', desc: 'After the flood, God makes a covenant with Noah, setting the rainbow as a sign He will never flood the entire earth again.', ref: 'Genesis 9:8-17' },
      { year: '~2200 BC', title: 'Tower of Babel', desc: 'Humanity builds a tower to reach heaven and make a name for themselves. God confuses their languages and scatters them.', ref: 'Genesis 11:1-9' },
      { year: '~2091 BC', title: 'Call of Abraham', desc: 'God calls Abram to leave Ur and go to a land He will show him. God promises to make him a great nation and bless all peoples through him.', ref: 'Genesis 12:1-3' },
      { year: '~2080 BC', title: 'Covenant of Circumcision', desc: 'God changes Abram\'s name to Abraham and establishes circumcision as the sign of His covenant.', ref: 'Genesis 17' },
      { year: '~2067 BC', title: 'Destruction of Sodom & Gomorrah', desc: 'God destroys the wicked cities with fire and brimstone. Lot and his daughters escape, but his wife looks back and becomes a pillar of salt.', ref: 'Genesis 19' },
      { year: '~2066 BC', title: 'Birth of Isaac', desc: 'Sarah gives birth to Isaac at age 90, fulfilling God\'s promise. His name means "he laughs."', ref: 'Genesis 21:1-7' },
      { year: '~2050 BC', title: 'Binding of Isaac', desc: 'God tests Abraham by asking him to sacrifice Isaac on Mount Moriah. At the last moment, God provides a ram instead.', ref: 'Genesis 22:1-19' },
      { year: '~2006 BC', title: 'Jacob and Esau', desc: 'Isaac\'s twin sons are born. Esau sells his birthright for stew. Jacob later deceives Isaac to receive the blessing.', ref: 'Genesis 25-27' },
      { year: '~1991 BC', title: 'Jacob Wrestles with God', desc: 'Jacob wrestles with a mysterious figure all night and is renamed "Israel" — he who struggles with God.', ref: 'Genesis 32:22-32' },
      { year: '~1898 BC', title: 'Joseph Sold into Slavery', desc: 'Jacob\'s favorite son Joseph is sold by his jealous brothers to traders heading to Egypt.', ref: 'Genesis 37' },
      { year: '~1885 BC', title: 'Joseph Rules Egypt', desc: 'After interpreting Pharaoh\'s dreams, Joseph rises from prison to become second-in-command of Egypt and saves the region from famine.', ref: 'Genesis 41' },
      { year: '~1876 BC', title: 'Israel Moves to Egypt', desc: 'Jacob\'s entire family (70 people) relocates to Egypt during the famine, reuniting with Joseph. The foundation for Israel\'s 400 years in Egypt.', ref: 'Genesis 46' },
    ],
  },
  {
    id: 'exodus',
    name: 'Exodus & Wilderness',
    period: '1500–1400 BC',
    color: '#C62828',
    icon: '🔥',
    events: [
      { year: '~1526 BC', title: 'Birth of Moses', desc: 'Born during Pharaoh\'s decree to kill Hebrew boys. His mother hides him in a basket on the Nile. Pharaoh\'s daughter adopts him.', ref: 'Exodus 2:1-10' },
      { year: '~1486 BC', title: 'Moses Flees to Midian', desc: 'After killing an Egyptian, Moses flees and becomes a shepherd for 40 years. He marries Zipporah.', ref: 'Exodus 2:11-22' },
      { year: '~1446 BC', title: 'The Burning Bush', desc: 'God appears to Moses in a bush that burns but is not consumed. He calls Moses to free His people from Egypt.', ref: 'Exodus 3' },
      { year: '~1446 BC', title: 'Ten Plagues of Egypt', desc: 'God sends ten devastating plagues — water to blood, frogs, gnats, flies, livestock disease, boils, hail, locusts, darkness, and death of the firstborn.', ref: 'Exodus 7-12' },
      { year: '~1446 BC', title: 'The First Passover', desc: 'Israelites mark their doorposts with lamb\'s blood. The angel of death passes over their homes. This becomes Israel\'s most important annual feast.', ref: 'Exodus 12' },
      { year: '~1446 BC', title: 'Crossing the Red Sea', desc: 'Moses stretches his hand over the sea. God parts the waters and Israel walks through on dry ground. The Egyptian army is swallowed by the returning waters.', ref: 'Exodus 14' },
      { year: '~1446 BC', title: 'Manna from Heaven', desc: 'In the wilderness, God provides miraculous bread (manna) each morning and quail in the evening to feed the Israelites.', ref: 'Exodus 16' },
      { year: '~1446 BC', title: 'Ten Commandments at Sinai', desc: 'God descends on Mount Sinai in fire and smoke. He gives Moses the Ten Commandments — the foundation of biblical law.', ref: 'Exodus 19-20' },
      { year: '~1445 BC', title: 'Golden Calf', desc: 'While Moses is on the mountain, the people grow impatient and build a golden calf to worship. Moses shatters the stone tablets in anger.', ref: 'Exodus 32' },
      { year: '~1445 BC', title: 'Tabernacle Built', desc: 'Israel builds a portable tent of worship (Tabernacle) according to God\'s design. The glory of God fills it.', ref: 'Exodus 35-40' },
      { year: '~1444 BC', title: 'Twelve Spies Sent', desc: 'Twelve spies explore Canaan. Ten bring fearful reports. Only Joshua and Caleb trust God. Israel is condemned to 40 years in the wilderness.', ref: 'Numbers 13-14' },
      { year: '~1407 BC', title: 'Death of Moses', desc: 'Moses views the Promised Land from Mount Nebo but cannot enter it. He dies at 120 years old. God buries him in an unknown grave.', ref: 'Deuteronomy 34' },
    ],
  },
  {
    id: 'conquest',
    name: 'Conquest & Judges',
    period: '1400–1050 BC',
    color: '#E65100',
    icon: '⚔️',
    events: [
      { year: '~1406 BC', title: 'Crossing the Jordan', desc: 'Joshua leads Israel across the Jordan River on dry ground. They set up twelve memorial stones at Gilgal.', ref: 'Joshua 3-4' },
      { year: '~1406 BC', title: 'Fall of Jericho', desc: 'Israel marches around Jericho for seven days. On the seventh day they shout, and the walls collapse. Rahab and her family are spared.', ref: 'Joshua 6' },
      { year: '~1400 BC', title: 'Conquest of Canaan', desc: 'Joshua leads military campaigns to take the Promised Land. The land is divided among the twelve tribes.', ref: 'Joshua 7-21' },
      { year: '~1375 BC', title: 'Othniel — First Judge', desc: 'After Joshua\'s death, Israel falls into sin. Othniel delivers them from the king of Mesopotamia, bringing 40 years of peace.', ref: 'Judges 3:7-11' },
      { year: '~1209 BC', title: 'Deborah & Barak', desc: 'Prophetess Deborah leads Israel. She and commander Barak defeat the Canaanite general Sisera. Jael kills Sisera with a tent peg.', ref: 'Judges 4-5' },
      { year: '~1162 BC', title: "Gideon's 300 Warriors", desc: 'God reduces Gideon\'s army from 32,000 to just 300 men. With trumpets, torches, and jars they rout the Midianite army.', ref: 'Judges 7' },
      { year: '~1075 BC', title: 'Samson — Strongest Judge', desc: 'Samson, empowered by God\'s Spirit, fights the Philistines with supernatural strength. Betrayed by Delilah, he destroys the temple of Dagon.', ref: 'Judges 13-16' },
      { year: '~1100 BC', title: 'Ruth and Boaz', desc: 'Moabite widow Ruth follows Naomi to Bethlehem. She gleans in the fields of Boaz, who becomes her kinsman-redeemer. They become ancestors of David and Jesus.', ref: 'Ruth 1-4' },
      { year: '~1100 BC', title: 'Hannah\'s Prayer & Samuel\'s Birth', desc: 'Barren Hannah prays desperately at the Tabernacle. God gives her a son, Samuel, whom she dedicates to the Lord\'s service.', ref: '1 Samuel 1' },
      { year: '~1070 BC', title: 'God Calls Young Samuel', desc: 'Boy Samuel hears God\'s voice in the night at the Tabernacle. He becomes the last and greatest of Israel\'s judges.', ref: '1 Samuel 3' },
    ],
  },
  {
    id: 'kingdom',
    name: 'United & Divided Kingdom',
    period: '1050–586 BC',
    color: '#AD1457',
    icon: '👑',
    events: [
      { year: '~1050 BC', title: 'Saul Anointed as King', desc: 'Israel demands a king like other nations. Samuel reluctantly anoints Saul, a tall Benjamite, as the first king.', ref: '1 Samuel 8-10' },
      { year: '~1024 BC', title: 'David Defeats Goliath', desc: 'Young shepherd David faces the 9-foot Philistine champion Goliath with a sling and a stone, killing him in the name of the Lord.', ref: '1 Samuel 17' },
      { year: '~1010 BC', title: 'David Becomes King', desc: 'After Saul\'s death, David becomes king — first of Judah, then of all Israel. He captures Jerusalem and makes it the capital.', ref: '2 Samuel 2, 5' },
      { year: '~1000 BC', title: 'Ark Brought to Jerusalem', desc: 'David brings the Ark of the Covenant to Jerusalem with celebration. He dances before the Lord with all his might.', ref: '2 Samuel 6' },
      { year: '~1000 BC', title: 'Davidic Covenant', desc: 'God promises David that his throne will be established forever — a prophecy ultimately fulfilled in Jesus Christ.', ref: '2 Samuel 7' },
      { year: '~980 BC', title: 'David and Bathsheba', desc: 'David commits adultery with Bathsheba and arranges her husband Uriah\'s death. Prophet Nathan confronts him. David repents deeply.', ref: '2 Samuel 11-12' },
      { year: '~970 BC', title: "Solomon's Wisdom", desc: 'God offers Solomon anything. He asks for wisdom. God grants him unparalleled wisdom, plus wealth and honor.', ref: '1 Kings 3' },
      { year: '~960 BC', title: "Solomon's Temple Built", desc: 'Solomon builds the magnificent Temple in Jerusalem over 7 years. At the dedication, the glory of God fills the Temple.', ref: '1 Kings 6-8' },
      { year: '930 BC', title: 'Kingdom Divides', desc: 'After Solomon\'s death, his son Rehoboam\'s harshness splits the kingdom. The north becomes Israel (10 tribes), the south becomes Judah (2 tribes).', ref: '1 Kings 12' },
      { year: '~874 BC', title: 'Elijah vs. Prophets of Baal', desc: 'On Mount Carmel, Elijah challenges 450 prophets of Baal. God sends fire from heaven to consume the sacrifice. The people fall on their faces: "The Lord — He is God!"', ref: '1 Kings 18' },
      { year: '~852 BC', title: 'Elijah Taken to Heaven', desc: 'A chariot of fire and horses separate Elijah and Elisha. Elijah is taken up to heaven in a whirlwind. Elisha inherits a double portion of his spirit.', ref: '2 Kings 2' },
      { year: '~850 BC', title: 'Elisha\'s Miracles', desc: 'Elisha performs many miracles: healing Naaman\'s leprosy, raising the Shunammite\'s son, multiplying oil, and purifying poisoned stew.', ref: '2 Kings 4-5' },
      { year: '~760 BC', title: 'Prophets Amos & Hosea', desc: 'Amos thunders against social injustice. Hosea\'s marriage to unfaithful Gomer illustrates God\'s persistent love for wayward Israel.', ref: 'Amos, Hosea' },
      { year: '~740 BC', title: 'Isaiah\'s Call & Ministry', desc: 'Isaiah sees God in the Temple and is commissioned as prophet. He prophesies about the coming Messiah — the suffering servant and Prince of Peace.', ref: 'Isaiah 6, 7, 9, 53' },
      { year: '722 BC', title: 'Fall of Northern Israel', desc: 'Assyria conquers Samaria and deports the ten northern tribes. They are scattered among the nations and never fully return.', ref: '2 Kings 17' },
      { year: '~701 BC', title: 'Hezekiah\'s Deliverance', desc: 'Assyria besieges Jerusalem. Hezekiah prays. God sends an angel who destroys 185,000 Assyrian soldiers in one night.', ref: '2 Kings 19' },
      { year: '~622 BC', title: 'Josiah\'s Reforms', desc: 'Young King Josiah rediscovers the Book of the Law in the Temple. He tears down idols and renews the covenant. The last great revival.', ref: '2 Kings 22-23' },
      { year: '~627 BC', title: 'Jeremiah Called as Prophet', desc: 'God calls teenage Jeremiah: "Before I formed you in the womb I knew you." He weeps over Judah\'s coming destruction for 40 years.', ref: 'Jeremiah 1' },
      { year: '586 BC', title: 'Fall of Jerusalem', desc: 'Babylon destroys Jerusalem and Solomon\'s Temple. The city is burned, the walls torn down. Judah goes into exile for 70 years.', ref: '2 Kings 25' },
    ],
  },
  {
    id: 'exile',
    name: 'Exile & Return',
    period: '586–400 BC',
    color: '#4527A0',
    icon: '⛓️',
    events: [
      { year: '586 BC', title: 'Babylonian Exile Begins', desc: 'Jews are taken captive to Babylon. By the rivers of Babylon, they weep and remember Zion.', ref: 'Psalm 137' },
      { year: '~605 BC', title: 'Daniel in Babylon', desc: 'Young Daniel and friends are taken to Babylon\'s royal court. They refuse to defile themselves with the king\'s food and God blesses them.', ref: 'Daniel 1' },
      { year: '~600 BC', title: 'Fiery Furnace', desc: 'Shadrach, Meshach, and Abednego refuse to worship Nebuchadnezzar\'s golden statue. They are thrown into a furnace but God walks with them unharmed.', ref: 'Daniel 3' },
      { year: '~553 BC', title: 'Daniel\'s Visions', desc: 'Daniel receives prophetic visions about future empires, the end times, and the coming of the "Son of Man" — fulfilled in Christ.', ref: 'Daniel 7-12' },
      { year: '~539 BC', title: 'Daniel in the Lion\'s Den', desc: 'Daniel\'s enemies plot against him. He is thrown into a den of lions, but God shuts the lions\' mouths. He emerges unharmed.', ref: 'Daniel 6' },
      { year: '~593 BC', title: 'Ezekiel\'s Visions', desc: 'Ezekiel has dramatic visions: the wheel within a wheel, the valley of dry bones coming to life, and a future restored Temple.', ref: 'Ezekiel 1, 37, 40-48' },
      { year: '539 BC', title: 'Cyrus Conquers Babylon', desc: 'Persian King Cyrus defeats Babylon and issues a decree allowing Jews to return home and rebuild the Temple — fulfilling Isaiah\'s prophecy.', ref: 'Ezra 1, Isaiah 44:28' },
      { year: '536 BC', title: 'First Return Under Zerubbabel', desc: 'About 50,000 Jews return to Jerusalem. They rebuild the altar and lay the foundation of the Second Temple.', ref: 'Ezra 1-3' },
      { year: '516 BC', title: 'Second Temple Completed', desc: 'After delays and opposition, the Second Temple is completed and dedicated with great celebration — though elders weep remembering Solomon\'s Temple.', ref: 'Ezra 6' },
      { year: '~480 BC', title: 'Esther Saves Her People', desc: 'Jewish girl Esther becomes queen of Persia. When Haman plots genocide against the Jews, she risks her life: "If I perish, I perish." Her people are saved.', ref: 'Esther 1-10' },
      { year: '458 BC', title: 'Ezra\'s Return & Reforms', desc: 'Ezra the scribe leads a second group back. He teaches the Law and leads spiritual renewal among the people.', ref: 'Ezra 7-10' },
      { year: '445 BC', title: 'Nehemiah Rebuilds the Walls', desc: 'Nehemiah, the king\'s cupbearer, returns to rebuild Jerusalem\'s walls. Despite fierce opposition, they finish in just 52 days.', ref: 'Nehemiah 1-6' },
      { year: '~430 BC', title: 'Malachi — Last OT Prophet', desc: 'Malachi delivers God\'s final Old Testament message. He promises Elijah will come before the great day of the Lord. Then — 400 years of prophetic silence.', ref: 'Malachi' },
    ],
  },
  {
    id: 'jesus',
    name: 'Life of Jesus',
    period: '6 BC – 33 AD',
    color: '#D4A843',
    icon: '✝️',
    events: [
      { year: '~6 BC', title: 'Angel Appears to Mary', desc: 'The angel Gabriel tells young Mary she will conceive by the Holy Spirit and bear the Son of God. Mary responds: "I am the Lord\'s servant."', ref: 'Luke 1:26-38' },
      { year: '~6 BC', title: 'Birth of Jesus', desc: 'Jesus is born in a Bethlehem stable. Angels announce His birth to shepherds. Wise men from the East follow a star to worship Him.', ref: 'Luke 2, Matthew 2' },
      { year: '~5 BC', title: 'Flight to Egypt', desc: 'King Herod orders the killing of all boys under 2 in Bethlehem. Joseph is warned in a dream and flees with Mary and Jesus to Egypt.', ref: 'Matthew 2:13-18' },
      { year: '~8 AD', title: 'Boy Jesus at the Temple', desc: 'At age 12, Jesus stays behind in the Temple, amazing the teachers with His understanding. He tells His parents: "I must be about My Father\'s business."', ref: 'Luke 2:41-52' },
      { year: '~27 AD', title: 'Baptism of Jesus', desc: 'John baptizes Jesus in the Jordan River. The heavens open, the Spirit descends like a dove, and God says: "This is my beloved Son."', ref: 'Matthew 3:13-17' },
      { year: '~27 AD', title: 'Temptation in the Wilderness', desc: 'Jesus fasts 40 days. Satan tempts Him three times. Jesus responds each time with Scripture: "It is written..."', ref: 'Matthew 4:1-11' },
      { year: '~27 AD', title: 'First Miracle — Water to Wine', desc: 'At a wedding in Cana, Jesus turns water into wine — His first public miracle, revealing His glory to His disciples.', ref: 'John 2:1-11' },
      { year: '~27 AD', title: 'Calling of the Twelve', desc: 'Jesus calls twelve ordinary men — fishermen, a tax collector, a zealot — to be His apostles and carry His message to the world.', ref: 'Mark 3:13-19' },
      { year: '~28 AD', title: 'Sermon on the Mount', desc: 'Jesus delivers His greatest teaching: the Beatitudes, the Lord\'s Prayer, "love your enemies," and "do not worry." The blueprint for Kingdom living.', ref: 'Matthew 5-7' },
      { year: '~29 AD', title: 'Feeding of the 5,000', desc: 'With five loaves and two fish, Jesus feeds over 5,000 people. Twelve baskets of leftovers remain — the only miracle recorded in all four Gospels.', ref: 'John 6:1-14' },
      { year: '~29 AD', title: 'Walking on Water', desc: 'Jesus walks on the Sea of Galilee in a storm. Peter walks toward Him but sinks when he takes his eyes off Jesus. "Lord, save me!"', ref: 'Matthew 14:22-33' },
      { year: '~29 AD', title: 'Transfiguration', desc: 'On a mountain, Jesus is transfigured — His face shines like the sun. Moses and Elijah appear. God says: "Listen to Him."', ref: 'Matthew 17:1-8' },
      { year: '~29 AD', title: 'Raising of Lazarus', desc: 'Jesus arrives four days after Lazarus dies. He weeps at the tomb, then calls: "Lazarus, come out!" The dead man walks out alive.', ref: 'John 11:1-44' },
      { year: '~30 AD', title: 'Triumphal Entry', desc: 'Jesus rides into Jerusalem on a donkey. Crowds wave palm branches and shout "Hosanna!" — fulfilling Zechariah\'s prophecy.', ref: 'Matthew 21:1-11' },
      { year: '~30 AD', title: 'The Last Supper', desc: 'Jesus shares a final Passover meal with His disciples. He washes their feet, breaks bread, and shares the cup — "This is my body... This is my blood."', ref: 'Luke 22, John 13' },
      { year: '~30 AD', title: 'Garden of Gethsemane', desc: 'Jesus prays in agony: "Father, if possible, take this cup from me. Yet not my will, but yours." He is betrayed by Judas with a kiss.', ref: 'Matthew 26:36-56' },
      { year: '~30 AD', title: 'Trial & Crucifixion', desc: 'Jesus is tried before Pilate, beaten, mocked with a crown of thorns, and crucified at Golgotha. "Father, forgive them." He dies at 3 PM.', ref: 'Matthew 27, John 19' },
      { year: '~30 AD', title: 'The Resurrection', desc: 'On the third day, the tomb is empty. An angel declares: "He is not here; He has risen!" Jesus appears first to Mary Magdalene, then to the disciples.', ref: 'Matthew 28, John 20' },
      { year: '~30 AD', title: 'Great Commission & Ascension', desc: '"Go and make disciples of all nations." Forty days after the resurrection, Jesus ascends to heaven. Two angels promise He will return the same way.', ref: 'Matthew 28:18-20, Acts 1:9-11' },
    ],
  },
  {
    id: 'church',
    name: 'Early Church',
    period: '30–100 AD',
    color: '#1565C0',
    icon: '🕊️',
    events: [
      { year: '~30 AD', title: 'Day of Pentecost', desc: 'The Holy Spirit descends with wind and fire. The disciples speak in other languages. Peter preaches and 3,000 are baptized in one day.', ref: 'Acts 2' },
      { year: '~31 AD', title: 'Peter Heals & Preaches', desc: 'Peter heals a lame man at the Temple gate. The church grows to 5,000 men. The apostles are arrested but refuse to stop preaching.', ref: 'Acts 3-5' },
      { year: '~34 AD', title: 'Stephen — First Martyr', desc: 'Stephen, full of the Spirit, is stoned to death for his faith. As he dies, he sees Jesus standing at God\'s right hand and prays for his killers.', ref: 'Acts 6-7' },
      { year: '~34 AD', title: 'Philip & the Ethiopian', desc: 'Philip explains Isaiah 53 to an Ethiopian official on the road to Gaza. The man believes and is baptized — the gospel reaches Africa.', ref: 'Acts 8:26-40' },
      { year: '~35 AD', title: 'Conversion of Saul (Paul)', desc: 'Saul, a fierce persecutor of Christians, encounters the risen Jesus on the road to Damascus. Blinded and then healed, he becomes Christianity\'s greatest advocate.', ref: 'Acts 9' },
      { year: '~40 AD', title: 'Cornelius — Gentiles Included', desc: 'God gives Peter a vision. He goes to Roman centurion Cornelius\'s house. The Holy Spirit falls on Gentiles — proving the gospel is for all people.', ref: 'Acts 10' },
      { year: '~44 AD', title: 'James Martyred, Peter Imprisoned', desc: 'King Herod Agrippa kills the apostle James. He arrests Peter, but an angel frees Peter from prison the night before his execution.', ref: 'Acts 12' },
      { year: '~47 AD', title: 'Paul\'s First Missionary Journey', desc: 'Paul and Barnabas set out from Antioch to preach the gospel across Cyprus and Asia Minor. Churches are planted in Galatia.', ref: 'Acts 13-14' },
      { year: '~49 AD', title: 'Council of Jerusalem', desc: 'Church leaders meet to resolve whether Gentile believers must follow Jewish law. They decide: salvation is by grace, not works.', ref: 'Acts 15' },
      { year: '~50 AD', title: 'Paul\'s Second Journey & Europe', desc: 'Paul receives the Macedonian call in a vision. The gospel crosses into Europe. Churches are founded in Philippi, Thessalonica, and Corinth.', ref: 'Acts 16-18' },
      { year: '~53 AD', title: 'Paul\'s Third Journey & Ephesus', desc: 'Paul spends over two years in Ephesus. The word of the Lord spreads throughout Asia. A riot breaks out among the silversmiths.', ref: 'Acts 19-20' },
      { year: '~57 AD', title: 'Paul Writes Romans', desc: 'From Corinth, Paul writes his letter to Rome — the most systematic explanation of the gospel ever written. It shapes Christian theology for centuries.', ref: 'Romans' },
      { year: '~60 AD', title: 'Paul\'s Arrest & Journey to Rome', desc: 'Paul is arrested in Jerusalem, appeals to Caesar, and survives a shipwreck on Malta. He arrives in Rome and preaches under house arrest.', ref: 'Acts 21-28' },
      { year: '~64 AD', title: 'Persecution Under Nero', desc: 'Emperor Nero blames Christians for the Great Fire of Rome. Severe persecution follows. According to tradition, both Peter and Paul are martyred.', ref: 'Historical tradition' },
      { year: '70 AD', title: 'Destruction of the Temple', desc: 'Roman armies under Titus destroy Jerusalem and the Second Temple — fulfilling Jesus\' prophecy. Judaism is fundamentally transformed. The Western Wall remains.', ref: 'Matthew 24, Historical' },
      { year: '~85 AD', title: 'John Writes His Gospel', desc: 'The apostle John, the last surviving eyewitness, writes his Gospel emphasizing that Jesus is the Son of God, so that readers "may believe."', ref: 'John 20:31' },
      { year: '~95 AD', title: 'Book of Revelation', desc: 'Exiled on Patmos, John receives a vision of the risen Christ, the end times, and the new heaven and earth. "Behold, I am making all things new."', ref: 'Revelation' },
    ],
  },
];

export default function BibleTimeline() {
  const [activeEra, setActiveEra] = useState(ERAS[0].id);
  const [expandedEvent, setExpandedEvent] = useState(null);

  const currentEra = ERAS.find(e => e.id === activeEra);
  const totalEvents = ERAS.reduce((sum, era) => sum + era.events.length, 0);

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
        <p className="text-sm text-gray-500 mt-1">{currentEra.period} • {currentEra.events.length} events</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5" style={{ backgroundColor: currentEra.color + '30' }} />

        <div className="space-y-4">
          {currentEra.events.map((event, idx) => (
            <div key={idx} className="relative pl-16 md:pl-20">
              <div
                className="absolute left-4 md:left-6 w-5 h-5 rounded-full border-3 bg-white"
                style={{ borderColor: currentEra.color, borderWidth: '3px', top: '6px' }}
              />

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
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full text-white flex-shrink-0" style={{ backgroundColor: currentEra.color }}>
                      {event.year}
                    </span>
                    <h3 className="font-semibold text-sm" style={{ color: '#3B2412' }}>{event.title}</h3>
                  </div>

                  {expandedEvent === idx && (
                    <div className="mt-3 space-y-2">
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
          <div className="text-2xl font-bold" style={{ color: '#D4A843' }}>{totalEvents}</div>
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
