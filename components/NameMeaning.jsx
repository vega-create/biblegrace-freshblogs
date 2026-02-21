import { useState, useMemo } from 'react';

const NAMES = [
  // ===== MALE - OLD TESTAMENT =====
  { name: 'Aaron', meaning: 'High mountain; exalted', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Moses' brother, the first high priest of Israel", ref: 'Exodus 4:14' },
  { name: 'Abel', meaning: 'Breath; vapor', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Second son of Adam and Eve, killed by his brother Cain', ref: 'Genesis 4:2' },
  { name: 'Abner', meaning: 'Father of light', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Commander of King Saul's army", ref: '1 Samuel 14:50' },
  { name: 'Abraham', meaning: 'Father of many nations', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'The patriarch God called to be the father of the Jewish nation', ref: 'Genesis 17:5' },
  { name: 'Absalom', meaning: 'Father of peace', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "David's third son who rebelled against his father", ref: '2 Samuel 3:3' },
  { name: 'Adam', meaning: 'Man; earth; red', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'The first man created by God', ref: 'Genesis 2:7' },
  { name: 'Amos', meaning: 'Burden-bearer; strong', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Shepherd-prophet who spoke against social injustice', ref: 'Amos 1:1' },
  { name: 'Asa', meaning: 'Healer; physician', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Righteous king of Judah who removed idols', ref: '1 Kings 15:11' },
  { name: 'Asher', meaning: 'Happy; blessed', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's eighth son, founder of one of the twelve tribes", ref: 'Genesis 30:13' },
  { name: 'Baruch', meaning: 'Blessed', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jeremiah's faithful scribe and secretary", ref: 'Jeremiah 36:4' },
  { name: 'Benjamin', meaning: 'Son of my right hand', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's youngest son, born to Rachel", ref: 'Genesis 35:18' },
  { name: 'Boaz', meaning: 'Strength; swiftness', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Kinsman-redeemer who married Ruth, ancestor of Jesus', ref: 'Ruth 2:1' },
  { name: 'Caleb', meaning: 'Faithful; whole-hearted', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'One of only two spies who trusted God to give Israel the Promised Land', ref: 'Numbers 13:30' },
  { name: 'Cyrus', meaning: 'Sun; throne', origin: 'Persian', gender: 'male', testament: 'OT', person: 'Persian king who freed the Jews from Babylonian exile', ref: 'Isaiah 44:28' },
  { name: 'Dan', meaning: 'He judged', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's fifth son, founder of the tribe of Dan", ref: 'Genesis 30:6' },
  { name: 'Daniel', meaning: 'God is my judge', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Prophet who survived the lion's den through faith in God", ref: 'Daniel 1:6' },
  { name: 'David', meaning: 'Beloved', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Shepherd boy who became king of Israel, writer of many Psalms', ref: '1 Samuel 16:13' },
  { name: 'Edom', meaning: 'Red', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Another name for Esau, Jacob's twin brother", ref: 'Genesis 25:30' },
  { name: 'Eli', meaning: 'Ascended; my God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'High priest and judge of Israel who mentored young Samuel', ref: '1 Samuel 1:9' },
  { name: 'Eliakim', meaning: 'God will establish', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Palace administrator under King Hezekiah', ref: '2 Kings 18:18' },
  { name: 'Eliezer', meaning: 'God is my help', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Abraham's trusted servant who found a wife for Isaac", ref: 'Genesis 15:2' },
  { name: 'Elijah', meaning: 'My God is Yahweh', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Powerful prophet who challenged the prophets of Baal', ref: '1 Kings 17:1' },
  { name: 'Elisha', meaning: 'God is salvation', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who succeeded Elijah, performed many miracles', ref: '1 Kings 19:16' },
  { name: 'Enoch', meaning: 'Dedicated; disciplined', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Walked faithfully with God and was taken up without dying', ref: 'Genesis 5:24' },
  { name: 'Ephraim', meaning: 'Fruitful; doubly fruitful', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Joseph's second son, blessed by Jacob to become a great tribe", ref: 'Genesis 41:52' },
  { name: 'Esau', meaning: 'Hairy; rough', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Isaac's firstborn who sold his birthright for a bowl of stew", ref: 'Genesis 25:25' },
  { name: 'Ethan', meaning: 'Strong; enduring; firm', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'A wise man noted for his wisdom, author of Psalm 89', ref: '1 Kings 4:31' },
  { name: 'Ezekiel', meaning: 'God strengthens', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who had extraordinary visions during the Babylonian exile', ref: 'Ezekiel 1:3' },
  { name: 'Ezra', meaning: 'Helper; help', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Priest and scribe who led spiritual reform after exile', ref: 'Ezra 7:1' },
  { name: 'Gad', meaning: 'Fortune; troop', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's seventh son, founder of the tribe of Gad", ref: 'Genesis 30:11' },
  { name: 'Gideon', meaning: 'Mighty warrior; feller of trees', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Judge who defeated the Midianites with just 300 men', ref: 'Judges 6:12' },
  { name: 'Goliath', meaning: 'Exile; passage', origin: 'Philistine', gender: 'male', testament: 'OT', person: 'Giant warrior of the Philistines defeated by young David', ref: '1 Samuel 17:4' },
  { name: 'Habakkuk', meaning: 'Embrace; wrestle', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who questioned God about evil and received an answer', ref: 'Habakkuk 1:1' },
  { name: 'Hezekiah', meaning: 'God is my strength', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Righteous king who restored true worship and was healed by God', ref: '2 Kings 18:1' },
  { name: 'Hiram', meaning: 'Exalted brother', origin: 'Phoenician', gender: 'male', testament: 'OT', person: 'King of Tyre who helped Solomon build the Temple', ref: '1 Kings 5:1' },
  { name: 'Hosea', meaning: 'Salvation', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Prophet whose marriage illustrated God's faithful love", ref: 'Hosea 1:2' },
  { name: 'Isaac', meaning: 'He laughs', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Son of Abraham and Sarah, born when they were very old', ref: 'Genesis 21:3' },
  { name: 'Isaiah', meaning: 'Salvation of the Lord', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Major prophet who foretold the coming of the Messiah', ref: 'Isaiah 1:1' },
  { name: 'Ishmael', meaning: 'God hears', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Abraham's son through Hagar, father of twelve princes", ref: 'Genesis 16:11' },
  { name: 'Israel', meaning: 'He who struggles with God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Name given to Jacob after wrestling with God', ref: 'Genesis 32:28' },
  { name: 'Issachar', meaning: 'Reward; recompense', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's ninth son, known for understanding the times", ref: 'Genesis 30:18' },
  { name: 'Jabez', meaning: 'He causes pain; sorrow', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Man whose prayer for blessing God granted', ref: '1 Chronicles 4:9-10' },
  { name: 'Jacob', meaning: 'Supplanter; holder of the heel', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Son of Isaac, father of the twelve tribes of Israel', ref: 'Genesis 25:26' },
  { name: 'Japheth', meaning: 'Enlargement; expansion', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Noah's son, ancestor of many European and Asian peoples", ref: 'Genesis 5:32' },
  { name: 'Jedidiah', meaning: 'Beloved of the Lord', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Name God gave to Solomon through the prophet Nathan', ref: '2 Samuel 12:25' },
  { name: 'Jeremiah', meaning: 'God will uplift; God will exalt', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'The "weeping prophet" who warned Judah about judgment', ref: 'Jeremiah 1:5' },
  { name: 'Jesse', meaning: 'Gift; wealthy', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Father of King David, from the line of Judah', ref: 'Ruth 4:22' },
  { name: 'Jethro', meaning: 'Abundance; excellence', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Moses' father-in-law who advised him on leadership", ref: 'Exodus 3:1' },
  { name: 'Job', meaning: 'Persecuted; hated', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Righteous man tested by suffering who remained faithful', ref: 'Job 1:1' },
  { name: 'Joel', meaning: 'Yahweh is God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who spoke of the Day of the Lord', ref: 'Joel 1:1' },
  { name: 'Jonah', meaning: 'Dove', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet swallowed by a great fish after fleeing from God', ref: 'Jonah 1:1' },
  { name: 'Jonathan', meaning: 'God has given', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Son of Saul, known for his loyal friendship with David", ref: '1 Samuel 18:1' },
  { name: 'Joseph', meaning: 'He will add; God shall add', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's favored son, rose to power in Egypt", ref: 'Genesis 30:24' },
  { name: 'Joshua', meaning: 'The Lord is salvation', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Moses' successor who led Israel into the Promised Land", ref: 'Joshua 1:1' },
  { name: 'Josiah', meaning: 'The Lord supports; healed by God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Righteous king of Judah who restored worship of God', ref: '2 Kings 22:1' },
  { name: 'Judah', meaning: 'Praised; praise', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's fourth son, ancestor of King David and Jesus", ref: 'Genesis 29:35' },
  { name: 'Laban', meaning: 'White', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Rebekah's brother, father of Leah and Rachel", ref: 'Genesis 24:29' },
  { name: 'Lemuel', meaning: 'Devoted to God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'King whose mother taught him wisdom in Proverbs 31', ref: 'Proverbs 31:1' },
  { name: 'Levi', meaning: 'Joined; attached', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Third son of Jacob, ancestor of the priestly tribe', ref: 'Genesis 29:34' },
  { name: 'Lot', meaning: 'Covering; veil', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Abraham's nephew rescued from Sodom's destruction", ref: 'Genesis 11:27' },
  { name: 'Malachi', meaning: 'My messenger', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Last Old Testament prophet before 400 years of silence', ref: 'Malachi 1:1' },
  { name: 'Manasseh', meaning: 'Causing to forget', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Joseph's firstborn son in Egypt, founder of a tribe", ref: 'Genesis 41:51' },
  { name: 'Methuselah', meaning: 'Man of the javelin; his death shall bring', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Oldest person in the Bible, lived 969 years', ref: 'Genesis 5:27' },
  { name: 'Micah', meaning: 'Who is like God?', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who foretold the Messiah would be born in Bethlehem', ref: 'Micah 5:2' },
  { name: 'Mordecai', meaning: 'Follower of Marduk; warrior', origin: 'Persian', gender: 'male', testament: 'OT', person: "Esther's cousin who helped save the Jewish people", ref: 'Esther 2:5' },
  { name: 'Moses', meaning: 'Drawn out of the water', origin: 'Egyptian/Hebrew', gender: 'male', testament: 'OT', person: 'Led Israel out of Egypt, received the Ten Commandments', ref: 'Exodus 2:10' },
  { name: 'Nahum', meaning: 'Comforter; consolation', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Prophet who declared God's judgment on Nineveh", ref: 'Nahum 1:1' },
  { name: 'Naphtali', meaning: 'My wrestling; my struggle', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's sixth son, described as a deer set free", ref: 'Genesis 30:8' },
  { name: 'Nathan', meaning: 'He gave; gift', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who confronted King David about his sin', ref: '2 Samuel 12:1' },
  { name: 'Nehemiah', meaning: 'Comforted by the Lord', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Rebuilt Jerusalem's walls in just 52 days", ref: 'Nehemiah 1:1' },
  { name: 'Noah', meaning: 'Rest; comfort', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Built the ark and saved his family from the Great Flood', ref: 'Genesis 5:29' },
  { name: 'Obadiah', meaning: 'Servant of the Lord', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who declared judgment on Edom', ref: 'Obadiah 1:1' },
  { name: 'Omar', meaning: 'Eloquent; flourishing', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Grandson of Esau, chief of an Edomite clan', ref: 'Genesis 36:11' },
  { name: 'Othniel', meaning: 'Lion of God; strength of God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'First judge of Israel after Joshua', ref: 'Judges 3:9' },
  { name: 'Reuben', meaning: 'Behold, a son', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's firstborn son who lost his birthright", ref: 'Genesis 29:32' },
  { name: 'Samson', meaning: 'Sun; bright sun', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Judge known for his extraordinary strength', ref: 'Judges 13:24' },
  { name: 'Samuel', meaning: 'God has heard', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who anointed both Saul and David as kings', ref: '1 Samuel 1:20' },
  { name: 'Saul', meaning: 'Asked for; prayed for', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'First king of Israel, chosen by God but later rejected', ref: '1 Samuel 9:2' },
  { name: 'Seth', meaning: 'Appointed; placed', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Third son of Adam and Eve, born after Abel's death", ref: 'Genesis 4:25' },
  { name: 'Shem', meaning: 'Name; fame; renown', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Noah's eldest son, ancestor of the Semitic peoples", ref: 'Genesis 5:32' },
  { name: 'Simeon', meaning: 'He has heard', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's second son; also a devout man who held baby Jesus", ref: 'Genesis 29:33' },
  { name: 'Solomon', meaning: 'Peaceful; peace', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Wisest king, builder of the First Temple', ref: '1 Kings 1:13' },
  { name: 'Zebulun', meaning: 'Dwelling; honor', origin: 'Hebrew', gender: 'male', testament: 'OT', person: "Jacob's tenth son, whose territory bordered the Sea of Galilee", ref: 'Genesis 30:20' },
  { name: 'Zechariah', meaning: 'The Lord remembers', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who encouraged the rebuilding of the Temple', ref: 'Zechariah 1:1' },
  { name: 'Zephaniah', meaning: 'The Lord has hidden; treasured by God', origin: 'Hebrew', gender: 'male', testament: 'OT', person: 'Prophet who warned of the coming Day of the Lord', ref: 'Zephaniah 1:1' },
  // ===== MALE - NEW TESTAMENT =====
  { name: 'Andrew', meaning: 'Manly; strong; courageous', origin: 'Greek', gender: 'male', testament: 'NT', person: "One of Jesus' first disciples, brother of Peter", ref: 'John 1:40' },
  { name: 'Apollos', meaning: 'Destroyer; one who destroys', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Eloquent preacher taught by Priscilla and Aquila', ref: 'Acts 18:24' },
  { name: 'Aquila', meaning: 'Eagle', origin: 'Latin', gender: 'male', testament: 'NT', person: 'Tentmaker and early church leader, husband of Priscilla', ref: 'Acts 18:2' },
  { name: 'Barnabas', meaning: 'Son of encouragement', origin: 'Aramaic', gender: 'male', testament: 'NT', person: "Paul's early companion who advocated for new believers", ref: 'Acts 4:36' },
  { name: 'Bartholomew', meaning: 'Son of Talmai', origin: 'Aramaic', gender: 'male', testament: 'NT', person: 'One of the twelve apostles, likely also known as Nathanael', ref: 'Matthew 10:3' },
  { name: 'Cornelius', meaning: 'Horn; sunbeam', origin: 'Latin', gender: 'male', testament: 'NT', person: 'Roman centurion, first Gentile convert baptized by Peter', ref: 'Acts 10:1' },
  { name: 'Felix', meaning: 'Happy; fortunate', origin: 'Latin', gender: 'male', testament: 'NT', person: "Roman governor who heard Paul's defense", ref: 'Acts 23:24' },
  { name: 'James', meaning: 'Supplanter (from Jacob)', origin: 'Hebrew/Greek', gender: 'male', testament: 'NT', person: "Apostle, brother of John, part of Jesus' inner circle", ref: 'Matthew 4:21' },
  { name: 'Jason', meaning: 'Healer', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Christian in Thessalonica who hosted Paul', ref: 'Acts 17:5' },
  { name: 'Jesus', meaning: 'The Lord is salvation', origin: 'Hebrew/Greek', gender: 'male', testament: 'NT', person: 'The Son of God, Messiah, Savior of the world', ref: 'Matthew 1:21' },
  { name: 'John', meaning: 'God is gracious', origin: 'Hebrew', gender: 'male', testament: 'NT', person: 'The "beloved disciple," author of John and Revelation', ref: 'John 13:23' },
  { name: 'Lazarus', meaning: 'God has helped', origin: 'Hebrew', gender: 'male', testament: 'NT', person: 'Brother of Mary and Martha, raised from the dead by Jesus', ref: 'John 11:1' },
  { name: 'Linus', meaning: 'Flaxen-haired; net', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Early Christian in Rome greeted by Paul', ref: '2 Timothy 4:21' },
  { name: 'Luke', meaning: 'Light; luminous', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Physician, author of Luke and Acts', ref: 'Colossians 4:14' },
  { name: 'Mark', meaning: 'Warlike; dedicated to Mars', origin: 'Latin', gender: 'male', testament: 'NT', person: 'Author of the Gospel of Mark', ref: 'Acts 12:12' },
  { name: 'Matthew', meaning: 'Gift of God', origin: 'Hebrew', gender: 'male', testament: 'NT', person: 'Tax collector who became an apostle', ref: 'Matthew 9:9' },
  { name: 'Matthias', meaning: 'Gift of God', origin: 'Hebrew', gender: 'male', testament: 'NT', person: 'Chosen to replace Judas as the twelfth apostle', ref: 'Acts 1:26' },
  { name: 'Nathanael', meaning: 'Gift of God; God has given', origin: 'Hebrew', gender: 'male', testament: 'NT', person: "Disciple Jesus called 'without deceit'", ref: 'John 1:47' },
  { name: 'Nicodemus', meaning: 'Victory of the people', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Pharisee who visited Jesus at night', ref: 'John 3:1' },
  { name: 'Onesimus', meaning: 'Useful; profitable', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Runaway slave who became a Christian through Paul', ref: 'Philemon 1:10' },
  { name: 'Paul', meaning: 'Small; humble', origin: 'Latin', gender: 'male', testament: 'NT', person: 'Greatest missionary, wrote 13 epistles', ref: 'Acts 13:9' },
  { name: 'Peter', meaning: 'Rock; stone', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Leader of the apostles, "on this rock I will build my church"', ref: 'Matthew 16:18' },
  { name: 'Philemon', meaning: 'Loving; affectionate', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Wealthy believer, owner of the slave Onesimus', ref: 'Philemon 1:1' },
  { name: 'Philip', meaning: 'Lover of horses', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Apostle who brought Nathanael to Jesus', ref: 'John 1:43' },
  { name: 'Rufus', meaning: 'Red-haired', origin: 'Latin', gender: 'male', testament: 'NT', person: "Son of Simon of Cyrene, 'chosen in the Lord'", ref: 'Romans 16:13' },
  { name: 'Silas', meaning: 'Man of the forest; wood', origin: 'Latin/Aramaic', gender: 'male', testament: 'NT', person: "Paul's companion on his second missionary journey", ref: 'Acts 15:40' },
  { name: 'Simon', meaning: 'He has heard; listening', origin: 'Hebrew', gender: 'male', testament: 'NT', person: "Peter's original name; also Simon of Cyrene", ref: 'Matthew 4:18' },
  { name: 'Stephen', meaning: 'Crown; wreath', origin: 'Greek', gender: 'male', testament: 'NT', person: 'First Christian martyr, full of grace and power', ref: 'Acts 6:5' },
  { name: 'Thaddaeus', meaning: 'Courageous heart; warm-hearted', origin: 'Aramaic', gender: 'male', testament: 'NT', person: 'One of the twelve apostles', ref: 'Matthew 10:3' },
  { name: 'Theophilus', meaning: 'Loved by God; friend of God', origin: 'Greek', gender: 'male', testament: 'NT', person: 'The person Luke addressed his Gospel and Acts to', ref: 'Luke 1:3' },
  { name: 'Thomas', meaning: 'Twin', origin: 'Aramaic', gender: 'male', testament: 'NT', person: 'Apostle who doubted until he saw the risen Jesus', ref: 'John 20:24-28' },
  { name: 'Timothy', meaning: 'Honoring God; one who fears God', origin: 'Greek', gender: 'male', testament: 'NT', person: 'Young pastor mentored by Paul', ref: '1 Timothy 1:2' },
  { name: 'Titus', meaning: 'Pleasing; title of honor', origin: 'Latin', gender: 'male', testament: 'NT', person: 'Church leader entrusted with Crete by Paul', ref: 'Titus 1:4' },
  { name: 'Zacchaeus', meaning: 'Pure; innocent; righteous', origin: 'Hebrew', gender: 'male', testament: 'NT', person: 'Short tax collector who climbed a tree to see Jesus', ref: 'Luke 19:2' },
  // ===== FEMALE - OLD TESTAMENT =====
  { name: 'Abigail', meaning: "Father's joy; source of joy", origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Wise woman who became David's wife", ref: '1 Samuel 25:3' },
  { name: 'Asenath', meaning: 'Belonging to the goddess Neith', origin: 'Egyptian', gender: 'female', testament: 'OT', person: "Joseph's Egyptian wife, mother of Manasseh and Ephraim", ref: 'Genesis 41:45' },
  { name: 'Bathsheba', meaning: 'Daughter of an oath', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "David's wife and Solomon's mother", ref: '2 Samuel 11:3' },
  { name: 'Deborah', meaning: 'Bee; to speak kind words', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Judge and prophetess who led Israel to victory', ref: 'Judges 4:4' },
  { name: 'Delilah', meaning: 'Delicate; languishing', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Discovered the secret of Samson's strength", ref: 'Judges 16:4' },
  { name: 'Dinah', meaning: 'Judged; vindicated', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Jacob's only named daughter", ref: 'Genesis 30:21' },
  { name: 'Esther', meaning: 'Star; hidden', origin: 'Persian/Hebrew', gender: 'female', testament: 'OT', person: 'Jewish queen who saved her people from destruction', ref: 'Esther 2:7' },
  { name: 'Eve', meaning: 'Life; living one', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'The first woman, created by God', ref: 'Genesis 3:20' },
  { name: 'Hadassah', meaning: 'Myrtle tree', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Esther's original Hebrew name", ref: 'Esther 2:7' },
  { name: 'Hagar', meaning: 'Flight; stranger', origin: 'Egyptian', gender: 'female', testament: 'OT', person: "Sarah's servant who bore Ishmael to Abraham", ref: 'Genesis 16:1' },
  { name: 'Hannah', meaning: 'Grace; favor; merciful', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Prayed for a child and dedicated Samuel to God', ref: '1 Samuel 1:20' },
  { name: 'Jael', meaning: 'Mountain goat; to ascend', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Woman who defeated the Canaanite general Sisera', ref: 'Judges 4:17' },
  { name: 'Jemima', meaning: 'Dove; beautiful', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Job's first daughter born after his restoration", ref: 'Job 42:14' },
  { name: 'Jochebed', meaning: "The Lord's glory", origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Mother of Moses, Aaron, and Miriam', ref: 'Exodus 6:20' },
  { name: 'Keturah', meaning: 'Incense; fragrance', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Abraham's wife after Sarah's death", ref: 'Genesis 25:1' },
  { name: 'Leah', meaning: 'Weary; wild cow; gazelle', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Jacob's first wife, mother of six tribes", ref: 'Genesis 29:16' },
  { name: 'Miriam', meaning: 'Rebellion; wished-for child', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Moses' sister who led worship after the Exodus", ref: 'Exodus 15:20' },
  { name: 'Naomi', meaning: 'Pleasantness; beautiful; gentle', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Ruth's mother-in-law, story of God's faithful provision", ref: 'Ruth 1:2' },
  { name: 'Orpah', meaning: 'Fawn; back of the neck', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Ruth's sister-in-law who returned to Moab", ref: 'Ruth 1:4' },
  { name: 'Rahab', meaning: 'Broad; wide', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Woman of Jericho who hid the spies and was saved', ref: 'Joshua 2:1' },
  { name: 'Rachel', meaning: 'Ewe; lamb; innocent', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "Jacob's beloved wife, mother of Joseph and Benjamin", ref: 'Genesis 29:6' },
  { name: 'Rebecca', meaning: 'To bind; to tie; captivating', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Wife of Isaac, mother of Jacob and Esau', ref: 'Genesis 24:15' },
  { name: 'Ruth', meaning: 'Friend; companion; vision of beauty', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Moabite whose loyalty led her to become an ancestor of Jesus', ref: 'Ruth 1:16' },
  { name: 'Sarah', meaning: 'Princess; noblewoman', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Wife of Abraham, mother of Isaac at age 90', ref: 'Genesis 17:15' },
  { name: 'Selah', meaning: 'Pause; reflect; rock', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Musical term in Psalms meaning to pause and reflect', ref: 'Psalms' },
  { name: 'Tamar', meaning: 'Palm tree; date palm', origin: 'Hebrew', gender: 'female', testament: 'OT', person: "In the genealogy of Jesus through Judah's line", ref: 'Genesis 38:6' },
  { name: 'Zipporah', meaning: 'Bird; sparrow', origin: 'Hebrew', gender: 'female', testament: 'OT', person: 'Wife of Moses, daughter of Jethro', ref: 'Exodus 2:21' },
  // ===== FEMALE - NEW TESTAMENT =====
  { name: 'Anna', meaning: 'Grace; favor', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'Elderly prophetess who recognized baby Jesus as Messiah', ref: 'Luke 2:36' },
  { name: 'Bernice', meaning: 'Bringing victory', origin: 'Greek', gender: 'female', testament: 'NT', person: "Sister of King Agrippa who heard Paul's testimony", ref: 'Acts 25:13' },
  { name: 'Chloe', meaning: 'Blooming; young green shoot', origin: 'Greek', gender: 'female', testament: 'NT', person: 'Early Christian who reported divisions in Corinth', ref: '1 Corinthians 1:11' },
  { name: 'Claudia', meaning: 'Lame; enclosure', origin: 'Latin', gender: 'female', testament: 'NT', person: 'Christian woman in Rome who greeted Timothy', ref: '2 Timothy 4:21' },
  { name: 'Damaris', meaning: 'Gentle; calf', origin: 'Greek', gender: 'female', testament: 'NT', person: 'Athenian woman who believed after hearing Paul', ref: 'Acts 17:34' },
  { name: 'Dorcas', meaning: 'Gazelle', origin: 'Greek', gender: 'female', testament: 'NT', person: 'Disciple known for charity, raised by Peter (also Tabitha)', ref: 'Acts 9:36' },
  { name: 'Elizabeth', meaning: 'God is my oath; pledged to God', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'Mother of John the Baptist, relative of Mary', ref: 'Luke 1:5' },
  { name: 'Eunice', meaning: 'Good victory', origin: 'Greek', gender: 'female', testament: 'NT', person: "Timothy's mother, praised for sincere faith", ref: '2 Timothy 1:5' },
  { name: 'Joanna', meaning: 'God is gracious', origin: 'Hebrew', gender: 'female', testament: 'NT', person: "Supported Jesus' ministry, witnessed the empty tomb", ref: 'Luke 8:3' },
  { name: 'Lois', meaning: 'Better; more desirable', origin: 'Greek', gender: 'female', testament: 'NT', person: "Timothy's grandmother, praised for sincere faith", ref: '2 Timothy 1:5' },
  { name: 'Lydia', meaning: 'From Lydia; noble one', origin: 'Greek', gender: 'female', testament: 'NT', person: 'First European convert, seller of purple cloth', ref: 'Acts 16:14' },
  { name: 'Martha', meaning: 'Lady; mistress of the house', origin: 'Aramaic', gender: 'female', testament: 'NT', person: 'Sister of Mary and Lazarus, known for hospitality', ref: 'Luke 10:38' },
  { name: 'Mary', meaning: 'Beloved; wished-for child; bitter', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'Mother of Jesus, chosen by God to bear the Messiah', ref: 'Luke 1:27' },
  { name: 'Mary Magdalene', meaning: 'From Magdala; tower', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'Devoted follower, first witness to the resurrection', ref: 'Luke 8:2' },
  { name: 'Phoebe', meaning: 'Bright; radiant; pure', origin: 'Greek', gender: 'female', testament: 'NT', person: 'Deaconess at Cenchreae, commended by Paul', ref: 'Romans 16:1' },
  { name: 'Priscilla', meaning: 'Ancient; venerable', origin: 'Latin', gender: 'female', testament: 'NT', person: 'Church leader who mentored Apollos with husband Aquila', ref: 'Acts 18:2' },
  { name: 'Rhoda', meaning: 'Rose', origin: 'Greek', gender: 'female', testament: 'NT', person: "Servant girl who recognized Peter's voice at the gate", ref: 'Acts 12:13' },
  { name: 'Salome', meaning: 'Peace; peaceful', origin: 'Hebrew', gender: 'female', testament: 'NT', person: 'Mother of James and John, followed Jesus to the cross', ref: 'Mark 15:40' },
  { name: 'Sapphira', meaning: 'Beautiful; sapphire', origin: 'Aramaic', gender: 'female', testament: 'NT', person: 'Wife of Ananias who lied about land price', ref: 'Acts 5:1' },
  { name: 'Susanna', meaning: 'Lily; graceful lily', origin: 'Hebrew', gender: 'female', testament: 'NT', person: "Supported Jesus' ministry from her own resources", ref: 'Luke 8:3' },
  { name: 'Tabitha', meaning: 'Gazelle', origin: 'Aramaic', gender: 'female', testament: 'NT', person: 'Disciple known for charity, raised from the dead by Peter', ref: 'Acts 9:36' },
  // ===== UNISEX / PLACE NAMES =====
  { name: 'Bethany', meaning: 'House of figs', origin: 'Hebrew', gender: 'unisex', testament: 'NT', person: 'Village where Mary, Martha, and Lazarus lived', ref: 'John 11:1' },
  { name: 'Eden', meaning: 'Delight; paradise', origin: 'Hebrew', gender: 'unisex', testament: 'OT', person: 'The garden God created for Adam and Eve', ref: 'Genesis 2:8' },
  { name: 'Jordan', meaning: 'To flow down; descend', origin: 'Hebrew', gender: 'unisex', testament: 'OT', person: 'River where Jesus was baptized', ref: 'Joshua 3:17' },
  { name: 'Moriah', meaning: 'Chosen by God; seen by God', origin: 'Hebrew', gender: 'unisex', testament: 'OT', person: 'Mountain where Abraham nearly sacrificed Isaac', ref: 'Genesis 22:2' },
  { name: 'Salem', meaning: 'Peace', origin: 'Hebrew', gender: 'unisex', testament: 'OT', person: 'Ancient name for Jerusalem, city of Melchizedek', ref: 'Genesis 14:18' },
  { name: 'Sharon', meaning: 'Fertile plain; a flat area', origin: 'Hebrew', gender: 'unisex', testament: 'OT', person: '"Rose of Sharon" in Song of Solomon', ref: 'Song of Solomon 2:1' },
  { name: 'Shiloh', meaning: 'Peace; the one to whom it belongs', origin: 'Hebrew', gender: 'unisex', testament: 'OT', person: 'Prophetic name referring to the Messiah', ref: 'Genesis 49:10' },
  { name: 'Zion', meaning: 'Highest point; monument', origin: 'Hebrew', gender: 'unisex', testament: 'OT', person: "Hill in Jerusalem symbolic of God's holy dwelling", ref: 'Psalm 2:6' },
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
            {[{ v: 'all', l: 'All' }, { v: 'male', l: '👦 Male' }, { v: 'female', l: '👧 Female' }, { v: 'unisex', l: '✨ Unisex' }].map(g => (
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
        <div className="p-5 rounded-xl border-2" style={{ borderColor: '#D4A843', backgroundColor: '#FAF0D7' }}>
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
            {letterGroups[letter].map((n, i) => (
              <button
                key={n.name + n.testament + i}
                onClick={() => setExpandedName(expandedName === n.name ? null : n.name)}
                className={`w-full text-left rounded-xl border transition-all overflow-hidden ${
                  expandedName === n.name ? 'border-amber-400 shadow-md bg-amber-50' : 'border-gray-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-semibold" style={{ color: '#3B2412' }}>{n.name}</span>
                      <span className="text-xs text-gray-400">
                        {n.gender === 'male' ? '👦' : n.gender === 'female' ? '👧' : '✨'}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: n.testament === 'OT' ? '#E8F5E9' : '#E3F2FD', color: n.testament === 'OT' ? '#2E7D32' : '#1565C0' }}>
                        {n.testament === 'OT' ? 'Old Testament' : 'New Testament'}
                      </span>
                    </div>
                    <span className="text-gray-300 flex-shrink-0 ml-2">{expandedName === n.name ? '▲' : '▼'}</span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#8B6F47' }}>"{n.meaning}"</p>

                  {expandedName === n.name && (
                    <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
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
