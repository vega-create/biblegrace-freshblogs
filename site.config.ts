// ====================================
// BibleGrace - Site Configuration
// ====================================

export const siteConfig = {
  // Basic Info
  name: 'BibleGrace',
  tagline: 'Daily Bible Verses, Devotionals & Faith Tools',
  description: 'Discover daily Bible verses, devotionals, and free faith tools. Explore scripture, strengthen your faith, and find answers to life\'s biggest questions.',
  url: 'https://biblegrace.freshblogs.cc',
  language: 'en',
  author: 'BibleGrace Team',

  // SEO
  seo: {
    titleTemplate: '%s | BibleGrace',
    defaultTitle: 'BibleGrace — Daily Bible Verses, Devotionals & Faith Tools',
    defaultDescription: 'Discover daily Bible verses, devotionals, and free faith tools. Explore scripture, strengthen your faith, and find answers to life\'s biggest questions.',
    defaultImage: '/images/og-default.jpg',
  },

  // Brand Colors (Gold Theme)
  colors: {
    primary: '#D4A843',       // Gold
    primaryDark: '#B8922F',   // Dark Gold
    primaryLight: '#E8C96E',  // Light Gold
    dark: '#3B2412',          // Dark Brown
    background: '#FDF6E8',    // Warm Cream
    cardBg: '#FAF0D7',        // Light Gold Card
    text: '#333333',          // Dark Gray
    textSecondary: '#8B6F47', // Soft Brown
    white: '#FFFFFF',
  },

  // Google Analytics
  analytics: {
    ga4: 'G-QHSR06FN9X',
  },

  // Google AdSense
  adsense: {
    enabled: true,
    client: 'ca-pub-3493526929407874',
  },

  // Bible Data
  bible: {
    defaultVersion: 'KJV',
    jsonPath: '/data/en_kjv.json',
  },

  // Categories
  categories: [
    { name: 'Daily Devotion', slug: 'daily-devotion', emoji: '🌅', description: 'Daily devotionals to start your morning with God' },
    { name: 'Bible Study', slug: 'bible-study', emoji: '📖', description: 'In-depth scripture study and book guides' },
    { name: 'Faith Questions', slug: 'faith-questions', emoji: '❓', description: 'Answers to common questions about faith and the Bible' },
    { name: 'Bible Verses', slug: 'bible-verses', emoji: '✝️', description: 'Curated Bible verses organized by topic and theme' },
    { name: 'Prayer', slug: 'prayer', emoji: '🙏', description: 'Prayer guides, templates, and inspiration' },
    { name: 'Christian Living', slug: 'christian-living', emoji: '💛', description: 'Applying biblical principles to everyday life' },
    { name: 'Holidays', slug: 'holidays', emoji: '🎄', description: 'Christmas, Easter, Thanksgiving and more' },
  ],

  // Navigation
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'Daily Verse', href: '/tools/daily-verse' },
    { name: 'Bible Tools', href: '/tools' },
    { name: 'Devotionals', href: '/category/daily-devotion' },
    { name: 'Faith Q&A', href: '/category/faith-questions' },
    { name: 'About', href: '/about' },
  ],

  // Tools
  tools: [
    { name: 'Daily Verse', slug: 'daily-verse', emoji: '📖', description: 'Get your daily Bible verse with reflection', tier: 1 },
    { name: 'Verse Finder', slug: 'verse-finder', emoji: '🔍', description: 'Search Bible verses by topic or keyword', tier: 1 },
    { name: 'Prayer Generator', slug: 'prayer-generator', emoji: '🙏', description: 'Generate prayers for any occasion', tier: 1 },
    { name: 'Bible Quiz', slug: 'bible-quiz', emoji: '🧠', description: 'Test your Bible knowledge', tier: 2 },
    { name: 'Verse Card Maker', slug: 'verse-card', emoji: '🎨', description: 'Create beautiful verse cards to share', tier: 2 },
    { name: 'Reading Plan', slug: 'reading-plan', emoji: '📅', description: 'Generate your Bible reading plan', tier: 2 },
    { name: 'Bible Timeline', slug: 'bible-timeline', emoji: '⏳', description: 'Explore Biblical history visually', tier: 3 },
    { name: 'Name Meaning', slug: 'name-meaning', emoji: '📛', description: 'Discover the meaning of Biblical names', tier: 3 },
  ],

  // Virtual Authors (E-E-A-T)
  authors: [
    { id: 'sarah-mitchell', name: 'Sarah Mitchell', role: 'Lead Devotional Writer', bio: 'Sarah has been studying the Bible for over 15 years and loves making scripture accessible and encouraging for everyday life.' },
    { id: 'david-park', name: 'David Park', role: 'Biblical Studies Editor', bio: 'David holds a degree in Theology and specializes in breaking down complex Bible passages into clear, understandable insights.' },
    { id: 'rachel-adams', name: 'Rachel Adams', role: 'Faith & Life Contributor', bio: 'Rachel writes about applying biblical principles to modern life, family, and personal growth.' },
  ],

  // Footer Links
  footerLinks: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Contact', href: '/contact' },
  ],

  // External Authority Sources (for AI Writer)
  externalSources: [
    'https://www.biblegateway.com',
    'https://biblehub.com',
    'https://www.gotquestions.org',
    'https://www.christianitytoday.com',
    'https://www.desiringgod.org',
    'https://www.thegospelcoalition.org',
    'https://www.focusonthefamily.com',
  ],
};

export default siteConfig;
