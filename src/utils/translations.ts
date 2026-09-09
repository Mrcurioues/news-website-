import { Article, Category, VideoItem, PhotoGallery, GalleryImage } from '../types';

export interface TranslationDict {
  appName: string;
  appNameSuffix: string;
  tagline: string;
  live: string;
  liveTv: string;
  admin: string;
  home: string;
  videos: string;
  photos: string;
  search: string;
  searchPlaceholder: string;
  cancel: string;
  breaking: string;
  trending: string;
  topStories: string;
  viewMore: string;
  allVideos: string;
  allGalleries: string;
  videoBulletins: string;
  photoGalleries: string;
  views: string;
  minRead: string;
  listenAudio: string;
  stopAudio: string;
  fontSize: string;
  keyHighlights: string;
  relatedTags: string;
  relatedStories: string;
  share: string;
  readMore: string;
  totalStories: string;
  loadMore: string;
  noArticles: string;
  backToHome: string;
  backToVideos: string;
  backToPhotos: string;
  searchPortal: string;
  searchSub: string;
  selectCategory: string;
  allCategories: string;
  sortBy: string;
  sortLatest: string;
  sortViews: string;
  resultsFound: string;
  noResults: string;
  adNotice: string;
  adSponsor: string;
  learnMore: string;
  footerDesc: string;
  footerCoverage: string;
  topCategories: string;
  multimedia: string;
  editorialPolicies: string;
  codeOfEthics: string;
  editorialGuidelines: string;
  privacyPolicy: string;
  termsOfService: string;
  grievanceRedressal: string;
  backToTop: string;
  copyright: string;
  photoSlide: string;
  of: string;
  prevPhoto: string;
  nextPhoto: string;
  weatherCity: string;
  weatherTemp: string;
  breakingBadge: string;
  featuredStory: string;
  latestUpdates: string;
}

export const TRANSLATIONS: Record<'hi' | 'en' | 'bn', TranslationDict> = {
  hi: {
    appName: 'भारत समाचार',
    appNameSuffix: 'LIVE',
    tagline: 'सच, निष्पक्ष और सबसे आगे • भारत समाचार',
    live: 'LIVE',
    liveTv: 'लाइव टीवी',
    admin: 'एडमिन (Demo)',
    home: 'होम',
    videos: 'वीडियो',
    photos: 'फोटो',
    search: 'खोजें',
    searchPlaceholder: 'समाचार खोजें... (उदा. इसरो, चुनाव, बजट, क्रिकेट)',
    cancel: 'रद्द करें',
    breaking: 'बड़ी खबर',
    trending: 'ट्रेंडिंग / सबसे ज्यादा पढ़ी गईं',
    topStories: 'प्रमुख खबरें',
    viewMore: 'और देखें →',
    allVideos: 'सभी वीडियो →',
    allGalleries: 'सभी गैलरी →',
    videoBulletins: 'वीडियो बुलेटिन',
    photoGalleries: 'फोटो गैलरी',
    views: 'व्यूज़',
    minRead: 'मिनट',
    listenAudio: 'खबर सुनें (Audio)',
    stopAudio: 'ऑडियो रोकें',
    fontSize: 'फॉन्ट साइज:',
    keyHighlights: 'मुख्य बिंदु (Key Highlights):',
    relatedTags: 'संबंधित टैग्स:',
    relatedStories: 'यह भी पढ़ें (Related Stories)',
    share: 'शेयर करें',
    readMore: 'पूरा पढ़ें →',
    totalStories: 'कुल उपलब्ध खबरें:',
    loadMore: 'और लोड करें (Load More)',
    noArticles: 'इस श्रेणी में अभी कोई खबर उपलब्ध नहीं है।',
    backToHome: 'होमपेज पर वापस जाएं',
    backToVideos: 'सभी वीडियो देखें',
    backToPhotos: 'सभी फोटो गैलरी देखें',
    searchPortal: 'समाचार खोजें (Search Portal)',
    searchSub: 'शीर्षक, श्रेणी या कीवर्ड दर्ज करके भारत और दुनिया की खबरें खोजें।',
    selectCategory: 'श्रेणी चुनें:',
    allCategories: 'सभी श्रेणियां (All Categories)',
    sortBy: 'सॉर्ट करें:',
    sortLatest: 'नवीनतम (Latest)',
    sortViews: 'सर्वाधिक पढ़े गए (Most Viewed)',
    resultsFound: 'परिणाम मिले',
    noResults: 'कोई परिणाम नहीं मिला। कृपया अन्य कीवर्ड से पुनः प्रयास करें।',
    adNotice: 'विज्ञापन | AD (DEMO)',
    adSponsor: 'प्रमुख प्रायोजक | Main Sponsor',
    learnMore: 'जानें अधिक →',
    footerDesc: 'भारत समाचार लाइव भारत का अग्रणी डिजिटल समाचार मंच है, जो राष्ट्रीय, राजनीतिक, खेल, मनोरंजन और तकनीकी जगत की निष्पक्ष खबरें सबसे पहले आपके समक्ष प्रस्तुत करता है।',
    footerCoverage: '24x7 समाचार कवरेज',
    topCategories: 'प्रमुख श्रेणियां',
    multimedia: 'मल्टीमीडिया',
    editorialPolicies: 'संपादकीय नीतियां',
    codeOfEthics: 'आचार संहिता व तथ्य-जांच',
    editorialGuidelines: 'संपादकीय दिशानिर्देश',
    privacyPolicy: 'गोपनीयता नीति (Privacy Policy)',
    termsOfService: 'नियम एवं शर्तें (Terms of Service)',
    grievanceRedressal: 'शिकायत निवारण (Grievance Redressal)',
    backToTop: 'शीर्ष पर जाएं',
    copyright: '© 2026 भारत समाचार लाइव (Bharat Samachar Live Demo). सर्वाधिकार सुरक्षित। ABP-Style Inspired News Portal.',
    photoSlide: 'तस्वीर',
    of: 'का',
    prevPhoto: 'पिछली तस्वीर',
    nextPhoto: 'अगली तस्वीर',
    weatherCity: 'नई दिल्ली',
    weatherTemp: '32°C',
    breakingBadge: '⚡ ब्रेकिंग अपडेट',
    featuredStory: 'प्रमुख खबर',
    latestUpdates: 'ताज़ा अपडेट'
  },
  en: {
    appName: 'BHARAT NEWS',
    appNameSuffix: 'LIVE',
    tagline: 'Truth, Impartial & Ahead • BHARAT NEWS LIVE',
    live: 'LIVE',
    liveTv: 'Live TV',
    admin: 'Admin Portal',
    home: 'Home',
    videos: 'Videos',
    photos: 'Photos',
    search: 'Search',
    searchPlaceholder: 'Search news... (e.g. ISRO, Election, Budget, Cricket)',
    cancel: 'Cancel',
    breaking: 'BREAKING NEWS',
    trending: 'Trending / Most Read',
    topStories: 'Top Stories',
    viewMore: 'View All →',
    allVideos: 'All Videos →',
    allGalleries: 'All Galleries →',
    videoBulletins: 'Video Bulletins',
    photoGalleries: 'Photo Galleries',
    views: 'views',
    minRead: 'min read',
    listenAudio: 'Listen to Story',
    stopAudio: 'Pause Audio',
    fontSize: 'Font Size:',
    keyHighlights: 'Key Highlights:',
    relatedTags: 'Related Tags:',
    relatedStories: 'Related Stories',
    share: 'Share Story',
    readMore: 'Read Full Story →',
    totalStories: 'Total Available Stories:',
    loadMore: 'Load More Stories',
    noArticles: 'No articles currently found in this category.',
    backToHome: 'Back to Homepage',
    backToVideos: 'View All Videos',
    backToPhotos: 'View All Galleries',
    searchPortal: 'Search News Portal',
    searchSub: 'Search breaking headlines, in-depth reports, and multimedia across India and the globe.',
    selectCategory: 'Category:',
    allCategories: 'All Categories',
    sortBy: 'Sort by:',
    sortLatest: 'Latest',
    sortViews: 'Most Viewed',
    resultsFound: 'results found',
    noResults: 'No matching news stories found. Try a different keyword or category.',
    adNotice: 'ADVERTISEMENT (DEMO)',
    adSponsor: 'Featured Sponsor Banner',
    learnMore: 'Learn More →',
    footerDesc: 'Bharat News Live is India’s premier digital journalism platform delivering impartial, fast, and authentic news across national, politics, cricket, tech, business, and world affairs 24x7.',
    footerCoverage: '24x7 Live News Coverage',
    topCategories: 'Top Categories',
    multimedia: 'Multimedia',
    editorialPolicies: 'Editorial Policies',
    codeOfEthics: 'Code of Ethics & Fact-Checking',
    editorialGuidelines: 'Editorial Guidelines',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    grievanceRedressal: 'Grievance Redressal',
    backToTop: 'Back to Top',
    copyright: '© 2026 Bharat News Live. All rights reserved. ABP-Style Inspired News Portal Concept.',
    photoSlide: 'Slide',
    of: 'of',
    prevPhoto: 'Previous Photo',
    nextPhoto: 'Next Photo',
    weatherCity: 'New Delhi',
    weatherTemp: '32°C',
    breakingBadge: '⚡ Breaking Update',
    featuredStory: 'Lead Story',
    latestUpdates: 'Latest Updates'
  },
  bn: {
    appName: 'ভারত সমাচার',
    appNameSuffix: 'লাইভ',
    tagline: 'সত্য, নিরপেক্ষ ও সবার আগে • ভারত সমাচার লাইভ',
    live: 'লাইভ',
    liveTv: 'লাইভ টিভি',
    admin: 'অ্যাডমিন পোর্টাল',
    home: 'হোম',
    videos: 'ভিডিও',
    photos: 'ফটো',
    search: 'সন্ধান',
    searchPlaceholder: 'খবর খুঁজুন... (যেমন: মহাকাশ, নির্বাচন, বাজেট, ক্রিকেট)',
    cancel: 'বাতিল',
    breaking: 'ব্রেকিং নিউজ',
    trending: 'ট্রেন্ডিং / সর্বাধিক পঠিত',
    topStories: 'প্রধান খবর',
    viewMore: 'আরও দেখুন →',
    allVideos: 'সব ভিডিও →',
    allGalleries: 'সব গ্যালারি →',
    videoBulletins: 'ভিডিও বুলেটিন',
    photoGalleries: 'ফটো গ্যালারি',
    views: 'ভিউ',
    minRead: 'মিনিট পঠিত',
    listenAudio: 'খবর শুনুন (Audio)',
    stopAudio: 'অডিও থামান',
    fontSize: 'ফন্ট সাইজ:',
    keyHighlights: 'প্রধান তথ্য (Key Highlights):',
    relatedTags: 'সম্পর্কিত ট্যাগ:',
    relatedStories: 'আরও পড়ুন (Related Stories)',
    share: 'শেয়ার করুন',
    readMore: 'সম্পূর্ণ পড়ুন →',
    totalStories: 'মোট উপলব্ধ খবর:',
    loadMore: 'আরও লোড করুন (Load More)',
    noArticles: 'এই বিভাগে বর্তমানে কোনো খবর পাওয়া যায়নি।',
    backToHome: 'হোমপেজে ফিরে যান',
    backToVideos: 'সব ভিডিও দেখুন',
    backToPhotos: 'সব ফটো গ্যালারি দেখুন',
    searchPortal: 'সংবাদ পোর্টাল অনুসন্ধান',
    searchSub: 'ভারত ও বিশ্বের সব খবর, রাজনীতি, খেলাধুলা এবং ভিডিও খুঁজুন।',
    selectCategory: 'বিভাগ বেছে নিন:',
    allCategories: 'সকল বিভাগ',
    sortBy: 'সাজান:',
    sortLatest: 'সর্বশেষ',
    sortViews: 'সবচেয়ে জনপ্রিয়',
    resultsFound: 'টি ফলাফল পাওয়া গেছে',
    noResults: 'কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।',
    adNotice: 'বিজ্ঞাপন | AD (DEMO)',
    adSponsor: 'প্রধান স্পন্সর ব্যানার',
    learnMore: 'আরও জানুন →',
    footerDesc: 'ভারত সমাচার লাইভ হলো ভারতের অন্যতম বিশ্বস্ত ডিজিটাল সংবাদ মাধ্যম, যা রাজনীতি, খেলাধুলা, অর্থনীতি ও বিনোদনের সেরা খবর ২৪x৭ পরিবেশন করে।',
    footerCoverage: '২৪x৭ লাইভ সংবাদ পরিবেশনা',
    topCategories: 'প্রধান বিভাগসমূহ',
    multimedia: 'মাল্টিমিডিয়া',
    editorialPolicies: 'সম্পাদকীয় নীতি',
    codeOfEthics: 'আচারসংহিতা ও তথ্য-যাচাই',
    editorialGuidelines: 'সম্পাদকীয় নির্দেশিকা',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfService: 'ব্যবহারের শর্তাবলী',
    grievanceRedressal: 'অভিযোগ প্রতিকার',
    backToTop: 'উপরে যান',
    copyright: '© ২০২৬ ভারত সমাচার লাইভ। সর্বস্বত্ব সংরক্ষিত।',
    photoSlide: 'ছবি',
    of: 'এর',
    prevPhoto: 'আগের ছবি',
    nextPhoto: 'পরের ছবি',
    weatherCity: 'নয়াদিল্লি',
    weatherTemp: '৩২°সে',
    breakingBadge: '⚡ ব্রেকিং আপডেট',
    featuredStory: 'প্রধান খবর',
    latestUpdates: 'সর্বশেষ আপডেট'
  }
};

// English body and key points content library for initial demo articles
export const ARTICLE_EN_DETAILS: Record<string, {
  title?: string;
  excerpt?: string;
  body: string[];
  keyPoints: string[];
  tags: string[];
  authorRole: string;
  readTime: string;
  publishedAt: string;
}> = {
  '101': {
    title: 'ISRO Gaganyaan Mission: Successful unmanned orbital test brings India closer to 2027 human spaceflight',
    excerpt: 'Indian Space Research Organisation achieves landmark success in Gaganyaan spacecraft orbital flight systems demonstration.',
    readTime: '4 min read',
    publishedAt: '03 Sep 2026, 03:45 PM IST',
    authorRole: 'Senior Science Correspondent',
    tags: ['ISRO', 'Gaganyaan', 'Spaceflight', 'Science', 'India'],
    keyPoints: [
      'The unmanned crew module achieved a precise 400 km low-Earth orbit before executing a smooth descent.',
      'Advanced drogue and main parachute systems ensured a secure touchdown in the Bay of Bengal.',
      'The Prime Minister and Space Minister congratulated ISRO scientists on achieving this pivotal mission milestone.'
    ],
    body: [
      'The Indian Space Research Organisation (ISRO) has accomplished a watershed breakthrough in its flagship human spaceflight programme, Gaganyaan. In an intensive demonstration staged from the Satish Dhawan Space Centre in Sriharikota, the spacecraft successfully validated its propulsion, thermal shield, and life support architectures under orbital flight conditions.',
      'Addressing a press conference, the ISRO Chairman confirmed that the spacecraft achieved an exact 400-kilometer low-Earth orbit, fulfilling all pre-programmed scientific simulations. Following this, automated retrograde thruster burns initiated a controlled re-entry, safely splashing down at the designated coordinates in the Bay of Bengal. A combined recovery task force from the Indian Navy and Coast Guard recovered the capsule intact.',
      'Aerospace analysts highlighted that this flawless trial cements India’s roadmap for its inaugural crewed spaceflight slated for 2027. Four designated astronauts (Gaganauts), trained comprehensively in India and Russia, are scheduled to embark on the human spaceflight mission.'
    ]
  },
  '102': {
    title: 'India vs Australia Final: Melbourne set for high-voltage Champions showdown, pitch report and key match-ups',
    excerpt: 'Cricket fans gear up for an epic clash as Team India takes on Australia in the summit clash with in-form pace battery.',
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 02:10 PM IST',
    authorRole: 'Sports Desk Chief',
    tags: ['Cricket', 'IND vs AUS', 'Final', 'Team India', 'Sports'],
    keyPoints: [
      'Explosive opening pair Rohit and Gill look to capitalize on the new ball in the early powerplay.',
      'Melbourne’s greenish surface makes bowling first upon winning the toss a favorable tactical decision.',
      'Indian wrist-spinner Kuldeep Yadav’s spells during the middle overs are anticipated to be match-defining.'
    ],
    body: [
      'Team India and Australia are geared for an electrifying summit showdown at the Melbourne Cricket Ground for the Champions Trophy. With both sides locking horns evenly over their previous five encounters, cricket pundits expect a high-octane battle for silverware.',
      'The Indian team management has signaled that they will field an unchanged winning combination. A sturdy start from the opening pair will liberate the explosive middle order, while pace spearhead Jasprit Bumrah and Mohammed Siraj will spearhead the bowling attack with the new Kookaburra ball.',
      'In the pre-match press conference, the Australian captain acknowledged India’s formidable depth, while highlighting their home turf familiarity and crowd backing as critical factors in turning up the heat.'
    ]
  },
  'story-deep-tech-ai-1': {
    title: 'Artificial Intelligence in India: How Generative AI and Quantum Computing Are Transforming National Infrastructure',
    excerpt: 'India is witnessing an unprecedented leap in artificial intelligence adoption across healthcare, agriculture, defense, and public governance.',
    readTime: '5 min read',
    publishedAt: '03 Sep 2026, 09:45 AM IST',
    authorRole: 'Chief Tech Editor',
    tags: ['Artificial Intelligence', 'Quantum Computing', 'Technology', 'Infrastructure'],
    keyPoints: [
      'Real-time AI traffic solutions deployed across smart cities and transit networks.',
      'Vernacular AI models connecting millions of Indian citizens to digital services.',
      'Joint success by IITs and C-DAC in quantum computing research.'
    ],
    body: [
      'New Delhi — India’s Technology Revolution has achieved a new benchmark as the Ministry of Electronics and Information Technology officially rolled out the National AI Infrastructure Grid.'
    ]
  },
  'story-cric-bgt-1': {
    title: 'Border-Gavaskar Trophy Masterclass: Inside India’s Tactical Blueprint for the Epic Series',
    excerpt: 'An in-depth tactical analysis of Team India’s bowling strategy, batting rotations, and spin variations ahead of the marquee test series.',
    readTime: '4 min read',
    publishedAt: '03 Sep 2026, 10:06 AM IST',
    authorRole: 'Sports Desk Chief',
    tags: ['Cricket', 'Border-Gavaskar', 'Team India', 'Australia'],
    keyPoints: [
      'Pace-Spin hybrid attacks tailored for Australian pitches.',
      'Counter-attacking middle order tempo strategy.',
      'Specialized leg-side traps for top-order opposition batters.'
    ],
    body: [
      'Melbourne — As Team India prepares for the high-intensity series, cricket analysts and former captains have highlighted tactical shifts in India’s preparation.'
    ]
  },
  'story-deep-national-1': {
    title: 'India’s Expressways & High-Speed Rail Network Expansion: Connecting Metros to Rural Hubs',
    excerpt: 'A comprehensive report on India’s multi-modal infrastructure megaprojects transforming freight speeds, regional commerce, and travel times.',
    readTime: '5 min read',
    publishedAt: '03 Sep 2026, 08:20 AM IST',
    authorRole: 'National Infrastructure Correspondent',
    tags: ['Expressway', 'High-Speed Rail', 'Infrastructure', 'India'],
    keyPoints: [
      'Over 1,200 km of access-controlled expressways operational.',
      'Satellite-based barrierless toll collection deployed.',
      'Rapid expansion of regional manufacturing hubs.'
    ],
    body: [
      'New Delhi — The transformation of Indian infrastructure has entered a decisive phase with the commissioning of new access-controlled corridors.'
    ]
  },
  'story-biz-seed-1': {
    title: 'Stock Market Bull Run: Sensex Touches Historic 85,000 Milestone on Foreign Inflows',
    excerpt: 'Indian equities registered record gains led by banking, IT, and auto stocks amid strong Q1 corporate earnings and foreign institutional buying.',
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 04:00 PM IST',
    authorRole: 'Markets & Banking Analyst',
    tags: ['Stock Market', 'Sensex', 'Business', 'Economy'],
    keyPoints: [
      'FII net buying exceeds Rs 4,200 crore in a single trading session.',
      'Domestic retail monthly SIP inflows hit a record Rs 25,000 crore.',
      'Nifty Bank and Nifty IT indices lead the rally.'
    ],
    body: [
      'Mumbai — Dalal Street celebrated a landmark day as the BSE Sensex surged past 85,000 for the first time in history.'
    ]
  },
  'story-biz-seed-2': {
    title: 'India GDP Growth Reaches 7.8%: Outpaces Major Economies on Manufacturing Surge',
    excerpt: 'Official GDP figures confirm India’s standing as the fastest-growing major economy, buoyed by robust industrial output and services exports.',
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 02:30 PM IST',
    authorRole: 'Economy Editor',
    tags: ['GDP', 'Economy', 'Business', 'Manufacturing'],
    keyPoints: [
      'Industrial manufacturing output expands at 9.2% year-on-year.',
      'Monthly GST collections cross Rs 1.85 lakh crore consistently.',
      'Government infrastructure capital expenditure up 28%.'
    ],
    body: [
      'New Delhi — India’s economic momentum remains unmatched as quarterly GDP growth touched 7.8%.'
    ]
  },
  'story-1': {
    title: 'Parliament Passes Landmark Digital Rights Bill',
    excerpt: 'Both houses of Parliament unanimously approved the Digital Rights and Data Protection Bill, granting citizens greater control over their personal data.',
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 09:00 AM IST',
    authorRole: 'Parliamentary Bureau Chief',
    tags: ['Parliament', 'Digital Rights', 'Data Protection', 'Legislation'],
    keyPoints: [
      'Strict penalties for unauthorized personal data usage.',
      'Right to erasure and data portability guaranteed for citizens.',
      'Sovereign data protection under Digital India framework.'
    ],
    body: [
      'New Delhi — In a historic session, the Indian Parliament passed the Digital Rights Bill with a sweeping majority.'
    ]
  },
  '103': {
    readTime: '5 min read',
    publishedAt: '03 Sep 2026, 01:25 PM IST',
    authorRole: 'Parliamentary Affairs Bureau Chief',
    tags: ['Parliament', 'Politics', 'Clean Energy', 'Hydrogen', 'India'],
    keyPoints: [
      'Single-window clearance launched to accelerate domestic solar, wind, and green hydrogen manufacturing.',
      'Over 1.5 million direct and indirect green jobs expected to be generated across the next five years.',
      'Opposition parties rallied behind the national bill while tabling constructive recommendations.'
    ],
    body: [
      'In a historic moment during the parliamentary Monsoon Session, both houses cleared the National Clean Energy & Green Hydrogen Promotion Bill with unanimous support. Introducing the legislation, the Union Minister for Energy declared that this statute positions India firmly in the vanguard of the global clean energy transition.',
      'Key provisions of the enactment include production-linked capital subsidies for electrolyzer fabrication, 25-year transmission fee waivers for renewable plants, and dedicated deep-water port facilities to ship green ammonia worldwide.',
      'Industry federations and environmentalists hailed the milestone, describing it as a catalytic leap toward fulfilling India’s Net-Zero sustainability commitments under the Paris Climate Accords.'
    ]
  },
  '104': {
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 12:40 PM IST',
    authorRole: 'Cinema & Arts Critic',
    tags: ['Bollywood', 'Box Office', 'Cinema', 'Entertainment', 'Action'],
    keyPoints: [
      'Domestic net theatrical collections cross Rs 620 crore in record-breaking opening week.',
      'Shatters previous overseas records across North America, the UK, and Gulf markets.',
      'Director officially confirms pre-production for the high-budget sequel franchise.'
    ],
    body: [
      'A glittering chapter has been etched in the annals of Indian cinema as the newly released mega-action spectacle breached the coveted Rs 1,000 crore benchmark worldwide in just seven days of release. Theaters from urban multiplexes to single screens continue to run packed housefull shows.',
      'Trade analysts attribute this unprecedented momentum to top-tier visual effects, gripping emotional pacing, and electrifying performances that have drawn audiences repeatedly to big screens.',
      'Expressing gratitude to fans on social media, the lead actor emphasized that this phenomenal triumph reflects the global resonance and cinematic craftsmanship of Indian storytelling.'
    ]
  },
  '105': {
    readTime: '4 min read',
    publishedAt: '03 Sep 2026, 11:30 AM IST',
    authorRole: 'Markets & Banking Analyst',
    tags: ['RBI', 'Repo Rate', 'Loans', 'Banking', 'Economy'],
    keyPoints: [
      'Benchmark repo rate reduced to 6.25%, with commercial lenders set to lower lending rates.',
      'GDP expansion forecast for the ongoing fiscal year retained firmly at a robust 7.4%.',
      'Benchmark equity indices Sensex and Nifty rallied over 800 points following the policy declaration.'
    ],
    body: [
      'The Reserve Bank of India’s Monetary Policy Committee (MPC) concluded its three-day deliberations today by voting to reduce the benchmark repo rate by 25 basis points to 6.25%. The rate easing comes after retail inflation softened comfortably into the central bank’s target band.',
      'The RBI Governor affirmed that India’s economic fundamentals remain resilient despite global geopolitical headwinds. The interest rate reduction is anticipated to invigorate consumer demand across housing, automotive, and capital investment sectors.',
      'Leading commercial banks including SBI, HDFC, and ICICI indicated that they would promptly pass on the rate benefits through revised marginal cost and repo-linked lending rates to borrowers.'
    ]
  },
  '106': {
    readTime: '4 min read',
    publishedAt: '03 Sep 2026, 10:15 AM IST',
    authorRole: 'Technology Editor',
    tags: ['Quantum', 'Supercomputer', 'Tech & AI', 'Science', 'Innovation'],
    keyPoints: [
      'Powered by a 100-qubit superconducting quantum processor architecture.',
      'Complex molecular interactions for life-saving pharmaceuticals calculated in seconds.',
      'Indian university researchers and tech startups to gain dedicated cloud access.'
    ],
    body: [
      'Marking a quantum leap in frontier technology, India unveiled its first indigenously developed quantum supercomputing cluster during the National Science Conclave in New Delhi.',
      'Engineered under the National Quantum Mission by researchers at C-DAC and top IITs, the system tackles cryptographic simulations, climate models, and genomic sequencing at speeds millions of times faster than classical supercomputers.',
      'Officials announced that the infrastructure will be opened to academic institutions and deep-tech entrepreneurs via a secure cloud network, drastically reducing dependence on imported high-performance computing.'
    ]
  },
  '107': {
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 09:30 AM IST',
    authorRole: 'Parliamentary & Global Affairs Bureau Chief',
    tags: ['United Nations', 'Diplomacy', 'World', 'Climate Action', 'India'],
    keyPoints: [
      'India urges industrialized nations to fulfill annual $100 billion climate finance commitments.',
      'International Solar Alliance and LiFE mission hailed as scalable models for developing economies.',
      'Bilateral talks secure fresh agreements on digital public infrastructure and trade corridors.'
    ],
    body: [
      'At the United Nations high-level assembly in New York, India made an impassioned pitch championing the developmental priorities of the Global South. The Indian External Affairs delegation stressed that achieving equitable global Net-Zero transitions is impossible without predictable finance and technology transfers.',
      'India’s home-grown climate initiatives, such as the International Solar Alliance and the Lifestyle for Environment (LiFE) movement, received widespread praise across multilateral working groups.',
      'On the sidelines, high-level bilateral summits produced agreements on cross-border digital payment corridors and resilient trade pathways with key partner nations.'
    ]
  },
  '108': {
    readTime: '4 min read',
    publishedAt: '03 Sep 2026, 08:45 AM IST',
    authorRole: 'Cinema & Wellness Specialist',
    tags: ['Yoga', 'Wellness', 'Ayurveda', 'Lifestyle', 'Health'],
    keyPoints: [
      'Simple breathing techniques Anulom-Vilom and Bhramari reduce workplace stress markers by 35%.',
      'Adopting screen-free bedtime hours and warm morning hydration improves deep sleep quality.',
      'Gentle spinal stretches combat posture fatigue caused by long desk and screen hours.'
    ],
    body: [
      'Modern corporate lifestyles and prolonged screen exposure have precipitated a sharp rise in posture fatigue and mental burnout. Health practitioners recommend integrating 20 minutes of daily mindfulness and yogic movement to restore physiological equilibrium.',
      'Ayurvedic principles highlight that morning warm water intake, mindful nutrition, and keeping devices away an hour before sleep can dramatically optimize cognitive focus and metabolic health.',
      'Easy desk-side stretches like neck rotations and Tadasana offer immediate relief from cervical strain and lower-back tension.'
    ]
  },
  '109': {
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 08:00 AM IST',
    authorRole: 'Senior Infrastructure Correspondent',
    tags: ['Railways', 'Bullet Train', 'National', 'Infrastructure'],
    keyPoints: [
      'Initial trial run between Surat and Bilimora slated for the first quarter of next year.',
      'Trains equipped with world-class Shinkansen safety systems operating at 320 km/h.',
      'Viaduct bridge constructions over major rivers reach advanced completion stages.'
    ],
    body: [
      'In a giant stride forward for high-speed connectivity, the National High Speed Rail Corporation announced that dynamic test runs on the flagship corridor will commence early next year.',
      'Utilizing Japanese Shinkansen earthquake detection and automated braking systems, the project guarantees uncompromised passenger safety even during seismic events or severe weather.',
      'Once fully commissioned, travel times between Mumbai and Ahmedabad will plummet from over six hours to just around two hours, catalyzing economic growth along the industrial corridor.'
    ]
  },
  '110': {
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 07:15 AM IST',
    authorRole: 'Parliamentary Affairs Bureau Chief',
    tags: ['Election Commission', 'Voting', 'Politics', 'Democracy'],
    keyPoints: [
      'Blockchain-assisted remote voting system designed to facilitate migrant and senior citizens.',
      'Biometric cryptographic authentication ensures one-person, one-vote integrity.',
      'Pilot framework to be initially deployed during select local body elections.'
    ],
    body: [
      'The Election Commission unveiled a landmark draft blueprint for remote electronic voting, enabling citizens residing away from their registered home constituencies to securely cast their ballots without traveling long distances.',
      'The commission underscored that security and voter anonymity protocols remain inviolable, with widespread all-party consultations preceding any phased nationwide rollout.'
    ]
  },
  '111': {
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 06:30 AM IST',
    authorRole: 'Sports Desk Chief',
    tags: ['Cricket', 'Virat Kohli', 'Rohit Sharma', 'Records'],
    keyPoints: [
      'Becomes only the second batting pair in world cricket to cross the 10,000 ODI partnership runs mark.',
      'Boasts over 50 fifty-plus and century-plus partnerships steering India to memorable victories.',
      'Former cricket legends laud their longevity, running between wickets, and match temperament.'
    ],
    body: [
      'Indian cricket icons Rohit Sharma and Virat Kohli registered another monumental milestone in ODI cricket history, becoming only the second duo ever to aggregate over 10,000 partnership runs in the format.',
      'Their exceptional consistency and tactical mutual understanding have underpinned India’s dominant batting exploits in white-ball cricket over the past decade.'
    ]
  },
  '112': {
    readTime: '3 min read',
    publishedAt: '03 Sep 2026, 05:45 AM IST',
    authorRole: 'Technology Editor',
    tags: ['Gadgets', 'Smartphones', 'Tech & AI', 'Battery'],
    keyPoints: [
      'Silicon-carbon battery chemistry packs a massive 6500mAh capacity in a feather-light foldable chassis.',
      'Super-fast charging achieves 0 to 100 percent in just 15 minutes.',
      'On-device neural engines execute live real-time voice translation without network connectivity.'
    ],
    body: [
      'Next-generation foldable smartphones took center stage at the global tech expo today, debuting breakthrough silicon-anode battery technology that eradicates battery endurance compromises.',
      'Alongside reinforced titanium hinges and creaseless ultra-thin glass displays, native AI models allow effortless offline photo manipulation and instantaneous language translation.'
    ]
  },
  '113': {
    readTime: '3 min read',
    publishedAt: '02 Sep 2026, 09:20 PM IST',
    authorRole: 'Cinema & Arts Critic',
    tags: ['Cinema', 'Film Festival', 'Entertainment', 'Indie Film'],
    keyPoints: [
      'Indian independent feature receives a roaring 10-minute standing ovation at prestigious European festival.',
      'International film critics praise the poignant portrayal of grassroots human resilience.',
      'Film nominated for top honors across cinematography and directorial debut categories.'
    ],
    body: [
      'Indian independent cinema struck a resonant chord at the international festival circuit, drawing a thunderous 10-minute ovation following the premiere of an evocative indie drama.',
      'The film’s director stated that the recognition belongs to the entire cast and crew who brought the grassroots narrative to life with authenticity and passion.'
    ]
  },
  '114': {
    readTime: '3 min read',
    publishedAt: '02 Sep 2026, 07:45 PM IST',
    authorRole: 'Markets & Banking Analyst',
    tags: ['Business', 'Economy', 'FDI', 'Manufacturing'],
    keyPoints: [
      'Foreign Direct Investment into manufacturing surges 28 percent in the first half of the fiscal year.',
      'Major global tech leaders expand semiconductor fabrication and electric vehicle supply chains.',
      'Domestic electronics manufacturing output expected to create hundreds of thousands of engineering jobs.'
    ],
    body: [
      'Fresh data from the Ministry of Commerce revealed that FDI inflows into Indian industrial hubs surged 28% year-on-year, propelled by substantial investments in semiconductor foundries and clean-tech manufacturing.',
      'Economic policymakers project that this manufacturing influx will bolster exports and narrow the national trade deficit over coming quarters.'
    ]
  },
  '115': {
    readTime: '3 min read',
    publishedAt: '02 Sep 2026, 06:15 PM IST',
    authorRole: 'Parliamentary & Global Affairs Bureau Chief',
    tags: ['Crude Oil', 'World', 'Business', 'Energy'],
    keyPoints: [
      'Brent crude settles near $72 a barrel after balanced output decisions by OPEC+ producers.',
      'Stabilized fuel import costs provide relief to emerging economies including India.',
      'Retail fuel prices expected to remain stable across domestic fuel stations.'
    ],
    body: [
      'Crude oil prices moderated across international energy exchanges following constructive OPEC+ deliberations, bringing substantial respite to energy-importing economies across Asia.',
      'Market analysts anticipate that steady global supply quotas will maintain benign domestic inflation pressures.'
    ]
  },
  '116': {
    readTime: '3 min read',
    publishedAt: '02 Sep 2026, 04:30 PM IST',
    authorRole: 'Senior Environment Correspondent',
    tags: ['Environment', 'Delhi NCR', 'Afforestation', 'National'],
    keyPoints: [
      '50 indigenous Miyawaki urban micro-forests developed across residential and civic parks.',
      'Recorded local air quality improvements with a 22 percent drop in neighborhood PM2.5 levels.',
      'Micro-climate cooling reduces ambient urban temperatures by 2 to 3 degrees Celsius.'
    ],
    body: [
      'An ambitious urban afforestation drive utilizing the renowned Miyawaki methodology has yielded encouraging environmental dividends across the national capital region.',
      'Ecological surveys demonstrated that dense native micro-forests effectively sequester particulates while lowering localized heat-island effects in metropolitan neighborhoods.'
    ]
  },
  '117': {
    readTime: '3 min read',
    publishedAt: '02 Sep 2026, 03:00 PM IST',
    authorRole: 'Sports Desk Chief',
    tags: ['Cricket', 'Women Cricket', 'Sports', 'T20'],
    keyPoints: [
      'Team needed 18 runs to win in the final nerve-wracking over of the T20 league thriller.',
      'Young Indian batter struck two boundaries before blasting a massive final-ball six over long-on.',
      'Video clips of the sensational victory celebration go viral across social media platforms.'
    ],
    body: [
      'Cricket enthusiasts were treated to an edge-of-the-seat thriller in the Women’s T20 League as a spectacular last-ball maximum snatched victory from the jaws of defeat.',
      'Showing remarkable poise under immense pressure, the young batter sealed the chase, sending the packed stadium into ecstatic celebration.'
    ]
  },
  '118': {
    readTime: '3 min read',
    publishedAt: '02 Sep 2026, 01:10 PM IST',
    authorRole: 'Cinema & Wellness Specialist',
    tags: ['Millets', 'Superfoods', 'Lifestyle', 'Health'],
    keyPoints: [
      'Global demand for traditional coarse grains like ragi, jowar, and bajra escalates rapidly.',
      'High dietary fiber and low glycemic index provide vital nutritional support for diabetes management.',
      'Culinary chefs incorporate millet risottos and baked treats in premier culinary menus.'
    ],
    body: [
      'The global millet movement has propelled ancient Indian coarse grains onto international wellness tables as premier nutrient-dense, climate-resilient superfoods.',
      'Nutritionists recommend replacing refined flours with whole millets to support cardiovascular wellness and sustained metabolic energy.'
    ]
  },
  '119': {
    readTime: '4 min read',
    publishedAt: '02 Sep 2026, 11:00 AM IST',
    authorRole: 'Senior Science Correspondent',
    tags: ['ISRO', 'Chandrayaan', 'Space', 'Science'],
    keyPoints: [
      'Groundbreaking peer-reviewed paper reveals presence of hydroxyl traces and titanium in returned lunar rock samples.',
      'Samples collected from the Moon’s permanently shadowed South Pole provide fresh insights into planetary evolution.',
      'Discoveries bolster prospects for sustainable human habitats and lunar water-ice extraction.'
    ],
    body: [
      'Scientists at ISRO and premier national laboratories unveiled their first comprehensive analytical report on lunar soil and rock samples safely brought back from the Moon’s South Pole.',
      'The presence of rare minerals and locked hydroxyl molecules provides critical empirical evidence supporting long-term lunar habitat viability.'
    ]
  },
  '120': {
    readTime: '3 min read',
    publishedAt: '02 Sep 2026, 09:15 AM IST',
    authorRole: 'Senior Correspondent',
    tags: ['Tourism', 'Ayodhya', 'Kashi', 'Culture', 'National'],
    keyPoints: [
      'Over 25 crore pilgrims and travelers visited cultural and spiritual corridors this year.',
      'Modernized rail connectivity and Vande Bharat express routes catalyzed hospitality revenues.',
      'Local artisanal handicrafts and homestay operators report historic income growth.'
    ],
    body: [
      'Spiritual and cultural tourism has emerged as one of the fastest expanding drivers of India’s services economy, according to the latest report released by the Ministry of Tourism.',
      'Expanded airport connectivity, revitalized heritage corridors, and enhanced hospitality infrastructure have rendered family pilgrimages seamless, directly enriching local grassroots economies.'
    ]
  }
};

// Category translations
export const CATEGORY_NAMES: Record<string, { hi: string; en: string; bn: string }> = {
  national: { hi: 'देश', en: 'National', bn: 'জাতীয়' },
  politics: { hi: 'राजनीति', en: 'Politics', bn: 'রাজনীতি' },
  cricket: { hi: 'क्रिकेट', en: 'Cricket', bn: 'ক্রিকেট' },
  entertainment: { hi: 'मनोरंजन', en: 'Entertainment', bn: 'বিনোদন' },
  business: { hi: 'व्यापार', en: 'Business', bn: 'ব্যবসা' },
  tech: { hi: 'तकनीक', en: 'Tech & AI', bn: 'প্রযুক্তি' },
  world: { hi: 'विदेश', en: 'World', bn: 'আন্তর্জাতিক' },
  lifestyle: { hi: 'लाइफस्टाइल', en: 'Lifestyle', bn: 'জীবনযাত্রা' }
};

export const CATEGORY_DESCRIPTIONS: Record<string, { hi: string; en: string; bn: string }> = {
  national: {
    hi: 'देशभर की प्रमुख, ताज़ा और प्रामाणिक खबरें',
    en: 'Top breaking stories and major headlines from across India',
    bn: 'সমগ্র ভারতের সেরা ব্রেকিং খবর এবং প্রধান শিরোনাম'
  },
  politics: {
    hi: 'संसद, चुनाव, नीतियां और राजनीतिक गतिविधियां',
    en: 'Parliament, elections, policy reforms, and political developments',
    bn: 'সংসদ, নির্বাচন, নীতি সংস্কার এবং রাজনৈতিক আপডেট'
  },
  cricket: {
    hi: 'क्रिकेट मैच स्कोर, मैच विश्लेषण, आंकड़े और एक्सक्लूसिव इंटरव्यू',
    en: 'Cricket match scores, in-depth analysis, player interviews and stats',
    bn: 'ক্রিকেট ম্যাচের স্কোর, বিশ্লেষণ এবং সাক্ষাৎকার'
  },
  entertainment: {
    hi: 'बॉलीवुड, सिनेमा, ओटीटी, सेलिब्रिटी और बॉक्स ऑफिस समाचार',
    en: 'Bollywood, cinema releases, OTT reviews, and celebrity buzz',
    bn: 'সিনেমা, ওটিটি রিভিউ এবং বিনোদন জগতের খবর'
  },
  business: {
    hi: 'शेयर बाजार, बजट, बैंकिंग, अर्थव्यवस्था और कॉर्पोरेट जगत',
    en: 'Stock markets, corporate earnings, banking, and economic policies',
    bn: 'শেয়ার বাজার, কর্পোরেট আয় এবং অর্থনৈতিক নীতি'
  },
  tech: {
    hi: 'स्मार्टफोन, आर्टिफिशियल इंटेलिजेंस, गैजेट्स और विज्ञान नवाचार',
    en: 'Smartphones, Artificial Intelligence, space science, and gadgets',
    bn: 'স্মার্টফোন, আর্টিফিশিয়াল ইন্টেলিজেন্স ও বিজ্ঞান'
  },
  world: {
    hi: 'वैश्विक कूटनीति, अंतरराष्ट्रीय मामले और भू-राजनीति',
    en: 'Global diplomacy, geopolitics, and international relations',
    bn: 'আন্তর্জাতিক ঘটনাপ্রবাহ ও ভূ-রাজনীতি'
  },
  lifestyle: {
    hi: 'स्वास्थ्य, योग, खानपान, पर्यटन और दैनिक जीवनशैली टिप्स',
    en: 'Health, yoga, wellness, culinary trends, and travel guides',
    bn: 'স্বাস্থ্য, যোগব্যায়াম, রান্নাবান্না ও জীবনযাত্রা'
  }
};

export type SupportedLanguage = 'hi' | 'en' | 'bn';

export const ARTICLE_BN_DETAILS: Record<string, {
  title?: string;
  excerpt?: string;
  body: string[];
  keyPoints: string[];
  tags: string[];
  authorRole: string;
  readTime: string;
  publishedAt: string;
}> = {
  '101': {
    title: 'গগনযান মিশনের বড় সাফল্য: কক্ষপথে সফল ক্রু মডিউল পরীক্ষা চালাল ইসরো',
    excerpt: 'শ্রীহরিকোটা মহাকাশ কেন্দ্র থেকে গগনযান মহাকাশযানের সফল ট্রায়াল ফ্লাইট সম্পন্ন করল ভারতীয় মহাকাশ গবেষণা সংস্থা।',
    readTime: '৪ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, বিকেল ০৩:৪৫',
    authorRole: 'সিনিয়র বিজ্ঞান সংবাদদাতা',
    tags: ['ইসরো', 'গগনযান', 'মহাকাশ', 'বিজ্ঞান', 'ভারত'],
    keyPoints: [
      'আনম্যান্ড ক্রু মডিউল ৪০০ কিমি নিম্ন ভূ-কক্ষপথে পৌঁছে নিখুঁত অবতরণ সম্পাদন করেছে।',
      'উন্নত প্যারাশুট সিস্টেম বঙ্গোপসাগরে নিরাপদ ল্যান্ডিং সুনিশ্চিত করেছে।',
      'প্রধানমন্ত্রী ও মহাকাশ মন্ত্রী ইসরো বিজ্ঞানীদের এই ঐতিহাসিক মাইলফলকে অভিনন্দন জানিয়েছেন।'
    ],
    body: [
      'ভারতীয় মহাকাশ গবেষণা সংস্থা (ইসরো) তাদের মর্যাদাপূর্ণ গগনযান মানব মহাকাশযাতায় এক নতুন অধ্যায় রচনা করেছে। শ্রীহরিকোটার সতীশ ধাওয়ান মহাকাশ কেন্দ্র থেকে উৎক্ষেপণ করে মহাকাশযানটি মহাকাশের কঠিন পরিস্থিতিতে লাইফ সাপোর্ট ও থার্মাল শিল্ডের কার্যকারিতা সাফল্যের সঙ্গে পরীক্ষা করেছে।',
      'সাংবাদিক সম্মেলনে ইসরো চেয়ারম্যান জানান যে মহাকাশযানটি ঠিক ৪০০ কিলোমিটার উচ্চতার কক্ষপথে পৌঁছায়। এর পর স্বয়ংক্রিয় সিস্টেমে বঙ্গোপসাগরের নির্দিষ্ট স্থানে এটি নিরাপদে অবতীর্ণ হয়। ভারতীয় নৌবাহিনী ও কোস্ট গার্ডের যৌথ দল অক্ষত অবস্থায় মডিউলটি উদ্ধার করেছে।',
      'মহাকাশ বিশেষজ্ঞরা জানিয়েছেন যে এই সফল পরীক্ষা ২০২৭ সালের ভারতের প্রথম মহাকাশচারী প্রেরণের পথকে সুগম করল।'
    ]
  },
  '102': {
    title: 'চ্যাম্পিয়ন্স ট্রফি ফাইনাল: ভারত ও অস্ট্রেলিয়ার মেগা সমীকরণ মেলবোর্নে',
    excerpt: 'মেলবোর্ন ক্রিকেট গ্রাউন্ডে মুখোমুখি হচ্ছে ডিফেন্ডিং চ্যাম্পিয়ন ভারত ও ক্রিকেট জায়ান্ট অস্ট্রেলিয়া।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, দুপুর ০২:১০',
    authorRole: 'ক্রীড়া সম্পাদক',
    tags: ['ক্রিকেট', 'ভারত বনাম অস্ট্রেলিয়া', 'ফাইনাল', 'টিম ইন্ডিয়া'],
    keyPoints: [
      'রোহিত ও গিলের বিস্ফোরক ওপেনিং জুটির ওপর ভরসা রাখছে ভারতীয় শিবির।',
      'মেলবোর্নের সবুজ পিচে টস জিতে বোলিং করাই অধিনায়কদের অগ্রাধিকার হতে পারে।',
      'কুলদীপ যাদবের রিস্ট স্পিন মাঝের ওভারে ম্যাচের ভাগ্য নির্ধারণ করতে পারে।'
    ],
    body: [
      'চ্যাম্পিয়ন্স ট্রফির জমজমাট ফাইনালে মেলবোর্নে মুখোমুখি হতে চলেছে টিম ইন্ডিয়া ও অস্ট্রেলিয়া। গত কয়েকটি ম্যাচের লড়াই বিবেচনা করে ক্রিকেট বিশেষজ্ঞরা এক রোমাঞ্চকর উইনার-টেকস-অল ম্যাচ প্রত্যাশা করছেন।',
      'ভারতীয় দল জয়ের সমন্বয় ধরে রাখতে প্রস্তুত। জসপ্রীত বুমরা ও মোহাম্মদ সিরাজ নতুন কুকাবুরা বলে অজি টপ অর্ডারকে চাপে ফেলার কৌশল ছকেছেন।'
    ]
  },
  '103': {
    title: 'সংসদে ঐতিহাসিক গ্রিন এনার্জি বিল পাস: ২০৩৫ সালের মধ্যে ভারত হবে বিশ্বের সর্ববৃহৎ গ্রিন হাইড্রোজেন রফতানিকারক',
    excerpt: 'উভয় কক্ষের সর্বসম্মতিক্রমে পাস হওয়া বিলে পুনর্ব্যবহারযোগ্য শক্তি প্রকল্পের জন্য ৩৫,০০০ কোটি টাকার ইনসেনটিভ প্যাকেজ ঘোষণা করা হয়েছে।',
    readTime: '৫ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, দুপুর ০১:২৫',
    authorRole: 'সংসদীয় ব্যুরো প্রধান',
    tags: ['সংসদ', 'রাজনীতি', 'গ্রিন এনার্জি', 'হাইড্রোজেন', 'ভারত'],
    keyPoints: [
      'দেশীয় সৌর, বায়ুমুখী ও গ্রিন হাইড্রোজেন উৎপাদন দ্রুত করতে সিঙ্গল-উইন্ডো ক্লিয়ারেন্স শুরু।',
      'আগামী ৫ বছরে ১৫ লাখেরও বেশি সরাসরি ও পরোক্ষ কর্মসংস্থান সৃষ্টির লক্ষ্যমাত্রা।',
      'বিরোধী দলগুলি জাতীয় বিলে পূর্ণ সমর্থন জানিয়ে গঠনমূলক পরামর্শ উপস্থাপন করেছে।'
    ],
    body: [
      'সংসদের বর্ষাকালীন অধিবেশনে এক ঐতিহাসিক মুহূর্তে জাতীয় ক্লিন এনার্জি ও গ্রিন হাইড্রোজেন উৎসাহ বিল সর্বসম্মত সমর্থনের মাধ্যমে পাস হয়েছে। বিলটি পেশ করে কেন্দ্রীয় শক্তি মন্ত্রী জানান যে এই আইন ভারতকে বৈশ্বিক ক্লিন এনার্জি রূপান্তরের অগ্রভাগে স্থাপন করবে।',
      'আইনের মূল বিধানগুলির মধ্যে রয়েছে ইলেকট্রোলাইজার উৎপাদনের জন্য ইনসেনটিভ ক্যাপিটাল সাবসিডি, রিনিউয়েবল প্ল্যান্টের জন্য ২৫ বছরের ট্রান্সমিশন ফি মকুব এবং গ্রিন অ্যামোনিয়া বিদেশে রফতানির জন্য গভীর সমুদ্র বন্দর সুবিধা।',
      'শিল্প সংগঠন ও পরিবেশবিদরা এই মাইলফলককে স্বাগত জানিয়েছেন এবং এটিকে প্যারিস জলবায়ু চুক্তির অধীনে ভারতের নেট-জিরো প্রতিশ্রুতি পূরণে একটি অনুঘটক পদক্ষেপ হিসাবে বর্ণনা করেছেন।'
    ]
  },
  '104': {
    title: 'বক্স অফিসে সর্বকালের রেকর্ড ভাঙল মেগা অ্যাকশন সিনেমা: প্রথম সপ্তাহেই বিশ্বব্যাপী ১০০০ কোটি পার',
    excerpt: 'দেশীয় এবং আন্তর্জাতিক থিয়েটারে অভূতপূর্ব সাড়া। টিকিট কাউন্টারে উপচে পড়া ভিড়।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, দুপুর ১২:৪০',
    authorRole: 'চলচ্চিত্র ও শিল্প সমালোচক',
    tags: ['বলিউড', 'বক্স অফিস', 'সিনেমা', 'বিনোদন', 'অ্যাকশন'],
    keyPoints: [
      'প্রথম সপ্তাহেই অভ্যন্তরীণ নেট কালেকশন ৬২০ কোটি টাকা অতিক্রম করেছে।',
      'উত্তর আমেরিকা, যুক্তরাজ্য এবং গাল্ফ বাজারে আগের সমস্ত রেকর্ড ভেঙে গুঁড়িয়ে দিয়েছে।',
      'পরিচালক আনুষ্ঠানিকভাবে হাই-বাজেট সিক্যুয়েল ফ্র্যাঞ্চাইজির প্রি-প্রোডাকশনের কথা নিশ্চিত করেছেন।'
    ],
    body: [
      'ভারতীয় সিনেমার ইতিহাসে একটি উজ্জ্বল অধ্যায় রচিত হয়েছে, যখন নতুন মুক্তিপ্রাপ্ত মেগা-অ্যাকশন সিনেমা মাত্র সাত দিনের মধ্যে বিশ্বব্যাপী বহুল কাঙ্ক্ষিত ১,০০০ কোটি টাকার গণ্ডি পার করেছে। শহরের মাল্টিপ্লেক্স থেকে শুরু করে সিঙ্গেল স্ক্রিন থিয়েটার সর্বত্র হাউসফুল বোর্ড ঝুলছে।',
      'বাণিজ্য বিশ্লেষকরা এই অভূতপূর্ব সাফল্যের পেছনে উচ্চমানের ভিজ্যুয়াল ইফেক্ট, আকর্ষণীয় গল্প বলা এবং তারকাদের দুর্দান্ত অভিনয়কে দায়ী করেছেন, যা দর্শকদের বারবার প্রেক্ষাগৃহে টেনে আনছে।'
    ]
  },
  '105': {
    title: 'আরবিআই মুদ্রানীতি: রেপো রেট ২৫ বেসিস পয়েন্ট কমিয়ে ৬.২৫ শতাংশ করল রিজার্ভ ব্যাঙ্ক',
    excerpt: 'ঋণের ইএমআই কমবে বলে আশা করা হচ্ছে। শেয়ার বাজারে আনন্দের হাওয়া, সেনসেক্স এবং নিফটি সূচক ঊর্ধ্বমুখী।',
    readTime: '৪ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ১১:৩০',
    authorRole: 'মার্কেটস ও ব্যাঙ্ক বিশ্লেষক',
    tags: ['আরবিআই', 'রেপো রেট', 'ঋণ', 'ব্যাঙ্কিং', 'অর্থনীতি'],
    keyPoints: [
      'রেপো রেট কমে ৬.২৫% হয়েছে, বাণিজ্যিক ব্যাঙ্কগুলি সুদের হার কমাতে চলেছে।',
      'চলতি অর্থবর্ষের জন্য জিডিপি বৃদ্ধির পূর্বাভাস ৭.৪% এ শক্তভাবে ধরে রাখা হয়েছে।',
      'নীতি ঘোষণার পর সেনসেক্স এবং নিফটি সূচক ৮০০ পয়েন্টেরও বেশি লাফিয়েছে।'
    ],
    body: [
      'রিজার্ভ ব্যাঙ্ক অফ ইন্ডিয়ার মুদ্রানীতি কমিটি (এমপিসি) আজ তাদের তিন দিনের বৈঠক শেষে রেপো রেট ২৫ বেসিস পয়েন্ট কমিয়ে ৬.২৫% করার সিদ্ধান্ত নিয়েছে। খুচরো মূল্যবৃদ্ধি কেন্দ্রীয় ব্যাঙ্কের লক্ষ্যমাত্রার মধ্যে নেমে আসার পর এই হার কমানো হলো।',
      'আরবিআই গভর্নর নিশ্চিত করেছেন যে বিশ্বব্যাপী ভূ-রাজনৈতিক অনিশ্চয়তা সত্ত্বেও ভারতের অর্থনৈতিক ভিত্তি শক্তিশালী রয়েছে। সুদের হার কমানোর ফলে আবাসন, অটোমোবাইল এবং ক্যাপিটাল ইনভেস্টমেন্ট সেক্টরে গ্রাহক চাহিদা বাড়বে বলে আশা করা হচ্ছে।'
    ]
  },
  '106': {
    title: 'ভারতের প্রথম স্বদেশী কোয়ান্টাম সুপারকম্পিউটার উন্মোচিত: প্রযুক্তি ও বিজ্ঞানে নতুন বিপ্লব',
    excerpt: '১০০-কিউবিট বিশিষ্ট এই কোয়ান্টাম কম্পিউটার জটিল বৈজ্ঞানিক গবেষণা সেকেন্ডের মধ্যে সমাধান করবে।',
    readTime: '৪ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ১০:১৫',
    authorRole: 'প্রযুক্তি সম্পাদক',
    tags: ['কোয়ান্টাম', 'সুপারকম্পিউটার', 'প্রযুক্তি', 'বিজ্ঞান', 'উদ্ভাবন'],
    keyPoints: [
      '১০০-কিউবিট সুপারকন্ডাক্টিং কোয়ান্টাম প্রসেসর আর্কিটেকচার দ্বারা চালিত।',
      'জীবনরক্ষাকারী ওষুধের জটিল আণবিক মিথস্ক্রিয়া সেকেন্ডের মধ্যে গণনা করা সম্ভব।',
      'ভারতীয় বিশ্ববিদ্যালয়ের গবেষক এবং টেক স্টার্টআপগুলি ক্লাউড অ্যাক্সেস পাবে।'
    ],
    body: [
      'প্রযুক্তি ক্ষেত্রে এক বিশাল লাফ দিয়ে নয়াদিল্লিতে জাতীয় বিজ্ঞান সম্মেলনে ভারত তার প্রথম স্বদেশী উপায়ে তৈরি কোয়ান্টাম সুপারকম্পিউটিং ক্লাস্টার উন্মোচন করেছে।',
      'সি-ড্যাক এবং শীর্ষস্থানীয় আইআইটিগুলির গবেষকদের দ্বারা জাতীয় কোয়ান্টাম মিশনের অধীনে নির্মিত এই সিস্টেমটি ক্রিপ্টোগ্রাফিক সিমুলেশন, জলবায়ু মডেল এবং জিনোমিক সিকোয়েন্সিংকে সাধারণ সুপারকম্পিউটারের চেয়ে লাখ লাখ গুণ দ্রুত প্রক্রিয়া করবে।'
    ]
  },
  '107': {
    title: 'জাতিসংঘে ভারতের শক্তিশালী কণ্ঠ: বিশ্ব জলবায়ু তহবিলের দ্রুত বিতরণের দাবি',
    excerpt: 'নিউ ইয়র্কে জাতিসংঘের অধিবেশনে ভারতের পররাষ্ট্রমন্ত্রী পরিবেশ সুরক্ষা এবং টেকসই উন্নয়নের গুরুত্ব তুলে ধরেন।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ০৯:৩০',
    authorRole: 'সংসদীয় ও আন্তর্জাতিক বিষয়ক ব্যুরো প্রধান',
    tags: ['জাতিসংঘ', 'কূটনীতি', 'আন্তর্জাতিক', 'জলবায়ু', 'ভারত'],
    keyPoints: [
      'ভারত শিল্পোন্নত দেশগুলিকে তাদের বার্ষিক ১০০ বিলিয়ন ডলারের জলবায়ু অর্থায়ন প্রতিশ্রুতি পূরণের আহ্বান জানিয়েছে।',
      'আন্তর্জাতিক সৌর জোট এবং লাইফ (LiFE) মিশনকে উন্নয়নশীল অর্থনীতির অনুকরণীয় মডেল হিসাবে প্রশংসা করা হয়েছে।',
      'দ্বিপাক্ষিক বৈঠকে ডিজিটাল পাবলিক ইনফ্রাস্ট্রাকচার ও বাণিজ্য করিডোর নিয়ে নতুন চুক্তি হয়েছে।'
    ],
    body: [
      'নিউ ইয়র্কে জাতিসংঘের উচ্চপর্যায়ের সমাবেশে ভারতীয় প্রতিনিধি দল গ্লোবাল সাউথের উন্নয়ন অগ্রাধিকারগুলির পক্ষে জোরালো সওয়াল করেছে। ভারতীয় প্রতিনিধিরা জোর দিয়ে বলেন যে অর্থায়ন এবং প্রযুক্তি হস্তান্তর ছাড়া ন্যায়সঙ্গত বৈশ্বিক জলবায়ু রূপান্তর সম্ভব নয়।'
    ]
  },
  '108': {
    title: 'জীবনযাত্রার মান উন্নত করতে যোগব্যায়াম ও আয়ুর্বেদের ব্যবহার বাড়ছে: স্বাস্থ্য বিশেষজ্ঞরা পরামর্শ দিচ্ছেন',
    excerpt: 'দৈনন্দিন কাজের মানসিক চাপ কমাতে প্রতিদিন অন্তত ২০ মিনিট মেডিটেশন এবং প্রাণায়াম করার পরামর্শ।',
    readTime: '৪ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ০৮:৪৫',
    authorRole: 'জীবনযাত্রা ও স্বাস্থ্য বিশেষজ্ঞ',
    tags: ['যোগব্যায়াম', 'ওয়েলনেস', 'আয়ুর্বেদ', 'জীবনযাত্রা', 'স্বাস্থ্য'],
    keyPoints: [
      'অনুলোম-বিলোম এবং ভ্রামরী প্রাণায়াম কর্মক্ষেত্রের মানসিক চাপ ৩৫% পর্যন্ত কমায়।',
      'ঘুমানোর আগে স্ক্রিন-ফ্রি সময় এবং সকালে ইষদুষ্ণ জল পান ঘুমের গুণমান বাড়ায়।',
      'সহজ স্পাইনাল স্ট্রেচ দীর্ঘক্ষণ ডেস্কে বসে কাজ করার ক্লান্তি দূর করে।'
    ],
    body: [
      'আধুনিক কর্পোরেট জীবনযাত্রা এবং দীর্ঘক্ষণ স্ক্রিনের সামনে থাকার ফলে শারীরিক ক্লান্তি এবং বার্নআউট বৃদ্ধি পাচ্ছে। স্বাস্থ্য বিশেষজ্ঞরা শারীরিক ও মানসিক ভারসাম্য ফিরিয়ে আনতে প্রতিদিন ২০ মিনিট সচেষ্ট চলাফেরা ও যোগব্যায়াম করার পরামর্শ দিচ্ছেন।'
    ]
  },
  '109': {
    title: 'বুলেট ট্রেন প্রকল্পের কাজ দ্রুত গতিতে এগোচ্ছে: সুরাট থেকে বিলিমোরা ট্রায়াল রান শীঘ্রই',
    excerpt: 'মুম্বই-আমেদাবাদ হাই-স্পিড রেল করিডোরের ভাইয়াডাক্ট এবং স্টেশন নির্মাণের বড় সাফল্য।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ০৮:০০',
    authorRole: 'সিনিয়র পরিকাঠামো সংবাদদাতা',
    tags: ['রেলওয়ে', 'বুলেট ট্রেন', 'জাতীয়', 'পরিকাঠামো'],
    keyPoints: [
      'সুরাট ও বিলিমোরার মধ্যে প্রথম ট্রায়াল রান আগামী বছরের প্রথম ত্রৈমাসিকে অনুষ্ঠিত হবে।',
      'বিশ্বমানের শিনকানসেন সুরক্ষা ব্যবস্থা সহ ঘণ্টায় ৩২০ কিমি গতিতে ট্রেন চলবে।',
      'প্রধান নদীগুলির ওপর ভাইয়াডাক্ট ব্রিজ নির্মাণ কাজ শেষ পর্যায়ে।'
    ],
    body: [
      'দ্রুতগতির ট্রেন যোগাযোগের ক্ষেত্রে এক বিশাল অগ্রগতি অর্জন করে ন্যাশনাল হাই স্পিড রেল কর্পোরেশন ঘোষণা করেছে যে আগামী বছরের শুরুতেই ফ্ল্যাগশিপ করিডোরে ডায়নামিক টেস্ট রান শুরু হবে।'
    ]
  },
  '110': {
    title: 'নির্বাচন কমিশনের বড় উদ্যোগ: পরিযায়ী শ্রমিকদের জন্য রিমোট ভোটিং ব্যবস্থার ব্লুপ্রিন্ট প্রস্তুত',
    excerpt: 'অন্য রাজ্যে কর্মরত নাগরিকরা নিজ এলাকা থেকে ভোট দিতে পারবেন, শীঘ্রই সর্বদলীয় বৈঠক।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ০৭:১৫',
    authorRole: 'সংসদীয় ব্যুরো প্রধান',
    tags: ['নির্বাচন কমিশন', 'ভোটিং', 'রাজনীতি', 'গণতন্ত্র'],
    keyPoints: [
      'ব্লকচেন-সহায়ক রিমোট ভোটিং সিস্টেম পরিযায়ী ও প্রবীণ নাগরিকদের সুবিধার্থে ডিজাইন করা হয়েছে।',
      'বায়োমেট্রিক ক্রিপ্টোগ্রাফিক প্রমাণীকরণ এক-ব্যক্তি, এক-ভোটের অখণ্ডতা সুনিশ্চিত করে।',
      'পাইলট ফ্রেমওয়ার্ক প্রাথমিকভাবে নির্বাচিত স্থানীয় সংস্থা নির্বাচনে প্রয়োগ করা হবে।'
    ],
    body: [
      'নির্বাচন কমিশন রিমোট ইলেকট্রনিক ভোটিংয়ের একটি ঐতিহাসিক খসড়া রূপরেখা উন্মোচন করেছে, যা নিজ নির্বাচনী এলাকার বাইরে থাকা নাগরিকদের দীর্ঘ পথ ভ্রমণ না করেই নিরাপদে ভোট দেওয়ার সুযোগ দেবে।'
    ]
  },
  '111': {
    title: 'রোহিত-কোহলি জুটির নতুন ইতিহাস: ওয়ানডেতে ১০,০০০ রানের পার্টনারশিপ মাইলফলক স্পর্শ',
    excerpt: 'বিশ্ব ক্রিকেটের দ্বিতীয় সেরা জুটি হিসাবে অনন্য নজির গড়লেন ভারতের দুই ক্রিকেট মহাতারকা।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ০৬:৩০',
    authorRole: 'ক্রীড়া সম্পাদক',
    tags: ['ক্রিকেট', 'বিরাট কোহলি', 'রোহিত শর্মা', 'রেকর্ড'],
    keyPoints: [
      'বিশ্ব ক্রিকেটে কেবল দ্বিতীয় ব্যাটিং জুটি হিসাবে ওয়ানডেতে ১০,০০০ পার্টনারশিপ রান অতিক্রম করলেন।',
      '৫০টিরও বেশি ফিফটি ও সেঞ্চুরি জুটিতে ভারতকে স্মরণীয় জয় এনে দিয়েছেন।',
      'প্রাক্তন ক্রিকেট কিংবদন্তিরা তাদের উইকেটের মধ্যে রানিং এবং ম্যাচের মেজাজের প্রশংসা করেছেন।'
    ],
    body: [
      'ভারতীয় ক্রিকেটের দুই রত্ন রোহিত শর্মা এবং বিরাট কোহলি ওয়ানডে ক্রিকেটের ইতিহাসে এক ঐতিহাসিক মাইলফলক স্পর্শ করেছেন। ফরম্যাটটিতে ১০,০০০ রানের পার্টনারশিপ গড়া বিশ্বের মাত্র দ্বিতীয় জুটি তারা।'
    ]
  },
  '112': {
    title: 'প্রযুক্তি মেলায় আলোড়ন ফেলল নতুন ফোল্ডেবল স্মার্টফোন: সিলিকন-কার্বন ব্যাটারিতে মিলবে দীর্ঘ ব্যাকআপ',
    excerpt: '১৫ মিনিটে ১০০% চার্জের সুবিধা সহ সুপার ফাস্ট প্রসেসর ও এআই ক্যামেরার জাদু।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ০৫:৪৫',
    authorRole: 'প্রযুক্তি সম্পাদক',
    tags: ['গ্যাজেট', 'স্মার্টফোন', 'প্রযুক্তি', 'ব্যাটারি'],
    keyPoints: [
      'সিলিকন-কার্বন ব্যাটারি কেমিস্ট্রি হালকা বডিতে বিশাল ৬৫০০ এমএএইচ ধারণক্ষমতা প্রদান করে।',
      'সুপার-ফাস্ট চার্জিং প্রযুক্তিতে মাত্র ১৫ মিনিটে ০ থেকে ১০০ শতাংশ চার্জ সম্পন্ন হয়।',
      'ডিভাইসের নিজস্ব নিউরাল ইঞ্জিন নেটওয়ার্ক ছাড়াই সরাসরি ভয়েস অনুবাদ করতে সক্ষম।'
    ],
    body: [
      'আজ বিশ্ব প্রযুক্তি প্রদর্শনীতে নতুন প্রজন্মের ফোল্ডেবল স্মার্টফোন উন্মোচিত হয়েছে, যেখানে দীর্ঘস্থায়ী ব্যাটারি প্রযুক্তির মেলবন্ধন ঘটানো হয়েছে।'
    ]
  },
  '113': {
    title: 'ইউরোপীয় ফিল্ম ফেস্টিভ্যালে পুরস্কৃত ভারতীয় ইন্ডিপেন্ডেন্ট সিনেমা: ১০ মিনিট ধরে হাততালি ও প্রশংসা',
    excerpt: 'আন্তর্জাতিক মঞ্চে সমাদৃত হলো সাধারণ মানুষের জীবনের গল্প নিয়ে তৈরি ভারতীয় ছবি।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০২ সেপ্টেম্বর ২০২৬, রাত ০৯:২০',
    authorRole: 'চলচ্চিত্র সমালোচক',
    tags: ['সিনেমা', 'ফিল্ম ফেস্টিভ্যাল', 'বিনোদন', 'ইন্ডি ফিল্ম'],
    keyPoints: [
      'ইউরোপীয় চলচ্চিত্র উৎসবে ছবিটির প্রদর্শনী শেষে দর্শক ১০ মিনিট দাঁড়িয়ে হাততালি দেন।',
      'আন্তর্জাতিক চলচ্চিত্র সমালোচকরা ছবির বাস্তবসম্মত আবেগের প্রশংসা করেছেন।',
      'সেরা চিত্রগ্রহণ এবং সেরা নবাগত পরিচালক বিভাগে মনোনীত হয়েছে।'
    ],
    body: [
      'আন্তর্জাতিক চলচ্চিত্র উৎসবে ভারতীয় স্বাধীন সিনেমা এক বিশেষ আলোড়ন সৃষ্টি করেছে। প্রদর্শনীর পর দর্শকরা উঠে দাঁড়িয়ে প্রশংসায় ভরিয়ে দেন।'
    ]
  },
  '114': {
    title: 'উৎপাদন খাতে সরাসরি বিদেশী বিনিয়োগ (FDI) ২৮% বৃদ্ধি পেয়েছে: রিপোর্টপ্রকাশ বাণিজ্য মন্ত্রকের',
    excerpt: 'সেমিকন্ডাক্টর ও ইলেকট্রনিক্স ম্যানুফ্যাকচারিং হাব হিসাবে ভারতের আত্মপ্রকাশ।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০২ সেপ্টেম্বর ২০২৬, সন্ধ্যা ০৭:৪৫',
    authorRole: 'অর্থনীতি বিশ্লেষক',
    tags: ['ব্যবসা', 'অর্থনীতি', 'এফডিআই', 'উৎপাদন'],
    keyPoints: [
      'অর্থবর্ষের প্রথমার্ধে ম্যানুফ্যাকচারিং খাতে এফডিআই প্রবাহ ২৮ শতাংশ বৃদ্ধি পেয়েছে।',
      'বিশ্বের প্রধান টেক সংস্থাসমূহ ভারতে সেমিকন্ডাক্টর ও ইভি সাপ্লাই চেইন প্রসারিত করছে।',
      'দেশীয় ইলেকট্রনিক্স উৎপাদন লাখ লাখ নতুন প্রকৌশল কর্মসংস্থান সৃষ্টি করবে।'
    ],
    body: [
      'বাণিজ্য মন্ত্রকের সাম্প্রতিক তথ্যে জানা গেছে যে ভারতের শিল্প কেন্দ্রগুলিতে এফডিআই প্রবাহ গত বছরের তুলনায় ২৮% বৃদ্ধি পেয়েছে, যার প্রধান চালিকাশক্তি সেমিকন্ডাক্টর ও গ্রিন প্রযুক্তি।'
    ]
  },
  '115': {
    title: 'আন্তর্জাতিক বাজারে অপরিশোধিত খনিজ তেলের দাম স্থিতিশীল: ব্যারেল প্রতি ৭২ ডলারে নামল ব্রেন্ট ক্রুড',
    excerpt: 'পেট্রোল ও ডিজেলের দাম স্থিতিশীল থাকার সম্ভাবনা, স্বস্তিতে সাধারণ মানুষ।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০২ সেপ্টেম্বর ২০২৬, বিকেল ০৬:১৫',
    authorRole: 'আন্তর্জাতিক বিষয়ের বিশ্লেষক',
    tags: ['ক্রুড অয়েল', 'আন্তর্জাতিক', 'ব্যবসা', 'শক্তি'],
    keyPoints: [
      'ওপেক প্লাস উৎপাদকদের সুষম উৎপাদনের পর ব্রেন্ট ক্রুড ব্যারেল প্রতি ৭২ ডলারে নেমেছে।',
      'আমদানি খরচ কমায় ভারতের মতো উদীয়মান অর্থনীতির জন্য বড় স্বস্তি এসেছে।',
      'পেট্রোল পাম্পগুলিতে জ্বালানির খুচরো মূল্য স্থিতিশীল থাকবে বলে আশা করা হচ্ছে।'
    ],
    body: [
      'আন্তর্জাতিক শক্তি বাজারে বিশ্বজুড়ে অপরিশোধিত খনিজ তেলের দাম স্থিতিশীল হয়েছে, যা এশিয়ার জ্বালানি আমদানিকারক দেশগুলির জন্য বড় স্বস্তি এনে দিয়েছে।'
    ]
  },
  '116': {
    title: 'দিল্লি-এনসিআরে মিযাওয়াকি পদ্ধতিতে তৈরি হলো ৫০টি শহুরে বনাঞ্চল: বাতাসের গুণমানে চোখে পড়ার মতো উন্নতি',
    excerpt: 'দূষণ নিয়ন্ত্রণের পাশাপাশি স্থানীয় বায়ুমণ্ডলের তাপমাত্রা ২ থেকে ৩ ডিগ্রি হ্রাস পেয়েছে।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০২ সেপ্টেম্বর ২০২৬, বিকেল ০৩:০০',
    authorRole: 'পরিবেশ সংবাদদাতা',
    tags: ['পরিবেশ', 'দিল্লি এনসিআর', 'বনায়ন', 'জাতীয়'],
    keyPoints: [
      'আবাসিক এলাকা ও পার্কে ৫০টি স্বদেশী মিযাওয়াকি মাইক্রো-ফরেস্ট তৈরি করা হয়েছে।',
      'বাতাসের পিএম২.৫ মাত্রা ২২ শতাংশ হ্রাস পাওয়ার খবর পাওয়া গেছে।',
      'মাইক্রো-ক্লাইমেট কুলিং শহরের পরিবেশের তাপমাত্রা ২ থেকে ৩ ডিগ্রি সেলসিয়াস কমিয়েছে।'
    ],
    body: [
      'রাজধানী অঞ্চলে পরিবেশ রক্ষার্থে জাপানি মিযাওয়াকি পদ্ধতিতে দ্রুত বর্ধনশীল ক্ষুদ্র বন তৈরির উদ্যোগ ব্যাপক সাফল্য পেয়েছে।'
    ]
  },
  '117': {
    title: 'উইমেন্স টি-টোয়েন্টি লিগে রোমাঞ্চকর শেষ বলের জয়: শেষ বলে ওভার বাউন্ডারি মেরে ম্যাচ জেতালেন তরুণী ব্যাটার',
    excerpt: 'শেষ ওভারে জয়ের জন্য প্রয়োজন ছিল ১৮ রান, ম্যাচ দেখে রোমাঞ্চিত ক্রিকেট বিশ্ব।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০২ সেপ্টেম্বর ২০২৬, দুপুর ০১:১০',
    authorRole: 'ক্রীড়া সম্পাদক',
    tags: ['ক্রিকেট', 'মহিলা ক্রিকেট', 'খেলাধুলো', 'টি২০'],
    keyPoints: [
      'জয়ের জন্য শেষ ওভারে প্রয়ােজন ছিল ১৮ রান, শ্বাসরুদ্ধকর মুহূর্ত টি-টোয়েন্টি লিগে।',
      'তরুণ ভারতীয় ব্যাটার জোড়া চার মারার পর শেষ বলে লং-অনের ওপর দিয়ে বিশাল ছক্কা হাঁকান।',
      'আবেগঘন জয়ের উদযাপনের ভিডিও ক্লিপ সোশ্যাল মিডিয়ায় ভাইরাল হয়েছে।'
    ],
    body: [
      'মহিলা টি-টোয়েন্টি লিগে দর্শকরা এক শ্বাসরুদ্ধকর ম্যাচের সাক্ষী হলেন, যেখানে শেষ বলে ছয় মেরে জয় নিশ্চিত করেন তরুণ ব্যাটার।'
    ]
  },
  '118': {
    title: 'সুপারফুড মিলেটস (জোয়ার, বাজরা, রাগি) নিয়ে আন্তর্জাতিক উন্মাদনা: বিশ্ব স্বাস্থ্য তালিকায় ভারতের দানা শস্য',
    excerpt: 'স্বাস্থ্যকর ডায়েট এবং সুগার নিয়ন্ত্রণের জন্য চিকিৎসকদের প্রথম পছন্দ মিলেটস।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০২ সেপ্টেম্বর ২০২৬, সকাল ১১:০০',
    authorRole: 'জীবনযাত্রা বিশেষজ্ঞ',
    tags: ['মিলেটস', 'সুপারফুড', 'জীবনযাত্রা', 'স্বাস্থ্য'],
    keyPoints: [
      'রাগি, জোয়ার ও বাজরার মতো প্রথাগত দানা শস্যের বৈশ্বিক চাহিদা দ্রুত বৃদ্ধি পাচ্ছে।',
      'উচ্চ ফাইবার এবং কম গ্লাইসেমিক ইনডেক্স ডায়াবেটিস নিয়ন্ত্রণে বিশেষ সহায়ক।',
      'আন্তর্জাতিক শেফরা মিলেটস দিয়ে তৈরি নানা সুস্বাদু খাবার পরিবেশন করছেন।'
    ],
    body: [
      'ভারতের প্রাচীন দানা শস্য মিলেটস বিশ্বজুড়ে পুষ্টিবিদ ও স্বাস্থ্য সচেতন মানুষের কাছে প্রধান সুপারফুড হিসাবে খ্যাতি লাভ করেছে।'
    ]
  },
  '119': {
    title: 'চন্দ্রযান মিশন ল্যাব রিপোর্ট: চাঁদের দক্ষিণ মেরুর শিলায় হাইড্রক্সিল ও টাইটানিয়ামের উপস্থিতি সুনিশ্চিত',
    excerpt: 'ইসরো ও ভারতীয় বিজ্ঞানীদের আন্তর্জাতিক গবেষণাপত্র প্রকাশ, মহাকাশ বিজ্ঞানে বড় অগ্রগতি।',
    readTime: '৪ মিনিট পঠিত',
    publishedAt: '০২ সেপ্টেম্বর ২০২৬, সকাল ০৯:১৫',
    authorRole: 'বিজ্ঞান সংবাদদাতা',
    tags: ['ইসরো', 'চন্দ্রযান', 'মহাকাশ', 'বিজ্ঞান'],
    keyPoints: [
      'চাঁদের শিলা নমুনায় হাইড্রক্সিল অণু ও টাইটানিয়াম খনিজের উপস্থিতি প্রমাণিত।',
      'চাঁদের চির অন্ধকার দক্ষিণ মেরু অঞ্চল থেকে সংগৃহীত নমুনা বৈজ্ঞানিক তথ্য প্রদান করেছে।',
      'ভবিষ্যতে চাঁদে মানবসবে ও জল আহরণের সম্ভাবনাকে আরও উজ্জ্বল করেছে।'
    ],
    body: [
      'ইসরো ও দেশের শীর্ষস্থানীয় বিজ্ঞান প্রতিষ্ঠানের গবেষকরা চন্দ্রযান মিশনের মাধ্যমে চাঁদের দক্ষিণ মেরু থেকে সংগৃহীত নমুনার প্রথম বিশ্লেষণী রিপোর্ট প্রকাশ করেছেন।'
    ]
  },
  '120': {
    title: 'সংস্কৃতি ও আধ্যাত্মিক পর্যটনে রেকর্ড বৃদ্ধি: চলতি বছরে ২৫ কোটি তীর্থযাত্রী ও পর্যটকের আগমন',
    excerpt: 'অযোধ্যা, কাশী ও বারাণসীতে অভূতপূর্ব অর্থনৈতিক অগ্রগতি। স্থানীয় কারিগর ও ব্যবসায়ীরা লাভবান।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০২ সেপ্টেম্বর ২০২৬, সকাল ০৯:১৫',
    authorRole: 'বিশেষ প্রতিনিধি',
    tags: ['পর্যটন', 'অযোধ্যা', 'কাশী', 'সংস্কৃতি', 'জাতীয়'],
    keyPoints: [
      'চলতি বছরে ২৫ কোটিরও বেশি তীর্থযাত্রী ও পর্যটক সাংস্কৃতিক করিডোরগুলি দর্শন করেছেন।',
      'আধুনিক রেল যোগাযোগ এবং বন্দে ভারত এক্সপ্রেস রুটগুলি রাজস্ব বৃদ্ধিতে সাহায্য করেছে।',
      'স্থানীয় হস্তশিল্প এবং হোমস্টে পরিচালকরা ঐতিহাসিক আয় বৃদ্ধির কথা জানিয়েছেন।'
    ],
    body: [
      'ভারতের সাংস্কৃতিক ও আধ্যাত্মিক পর্যটন পরিষেবা অর্থনীতির অন্যতম দ্রুত বর্ধনশীল ক্ষেত্র হিসাবে আত্মপ্রকাশ করেছে, যা স্থানীয় অর্থনীতিকে সচল রাখছে।'
    ]
  },
  'story-test-live': {
    title: 'ভারতের মহাকাশ মিশনের মহাসাফল্য: নতুন সৌর উপগ্রহ কক্ষপথে স্থাপন করল ইসরো',
    excerpt: 'শ্রীহরিকোটা স্পেসপোর্ট থেকে সৌর পর্যবেক্ষণ উপগ্রহ সফলভাবে উৎক্ষেপণ করল ভারতীয় মহাকাশ গবেষণা সংস্থা।',
    readTime: '৪ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ১০:০০',
    authorRole: 'মহাকাশ বার্তা প্রতিনিধি',
    tags: ['ইসরো', 'মহাকাশ', 'স্যাটেলাইট', 'বিজ্ঞান'],
    keyPoints: [
      'উপগ্রহটি লক্ষ্যযুক্ত কক্ষপথে সুনির্দিষ্টভাবে স্থাপিত হয়েছে।',
      'সৌর শক্তি প্যানেলগুলি বিচ্ছিন্ন হওয়ার পর স্বয়ংক্রিয়ভাবে চালু হয়েছে।',
      'রিয়েল-টাইম টেলিমেট্রি ট্র্যাকিং কার্যক্রম নিশ্চিত করা হয়েছে।'
    ],
    body: [
      'নয়াদিল্লি — ইসরো বিজ্ঞানীরা শ্রীহরিকোটা স্পেসপোর্ট থেকে ভারতের সর্বশেষ সৌর গবেষণা উপগ্রহের সফল উৎক্ষেপণের মাধ্যমে আরও একটি বড় মাইলফলক অর্জন করেছেন।'
    ]
  },
  'story-biz-seed-1': {
    title: 'শেয়ার বাজারে দুর্দান্ত গতি: বিদেশী বিনিয়োগের জোয়ারে ইতিহাস গড়ে ৮৫,০০০ ছুয়ে ফেলল সেনসেক্স',
    excerpt: 'ব্যাঙ্কিং, আইটি ও অটো শেয়ারের দুর্দান্ত পারফরম্যান্সে রেকর্ড উচ্চতায় ভারতীয় শেয়ার বাজার।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, বিকেল ০৪:০০',
    authorRole: 'অর্থনীতি ও মার্কেট বিশেষজ্ঞ',
    tags: ['শেয়ার বাজার', 'সেনসেক্স', 'ব্যবসা', 'অর্থনীতি'],
    keyPoints: [
      'এফআইআই ৪,২০০ কোটি টাকার এককালীন নেট ক্রয় সম্পাদন করেছে।',
      'খুচরো বিনিয়োগকারীদের মাসিক এসআইপি প্রবাহ রেকর্ড ২৫,০০০ কোটি টাকা স্পর্শ করেছে।',
      'ব্যাঙ্ক নিফটি এবং আইটি সূচক দুর্দান্ত প্রবৃদ্ধি অর্জন করেছে।'
    ],
    body: [
      'মুম্বই — দালাল স্ট্রিটে ঐতিহাসিক উন্মাদনার সৃষ্টি হয়েছে, কারণ বিদেশি প্রাতিষ্ঠানিক বিনিয়োগকারীদের (এফআইআই) জোরালো কেনাকাটায় বিএসই সেনসেক্স প্রথমবারের মতো ৮৫,০০০ এর রেকর্ড চিহ্ন অতিক্রম করেছে।'
    ]
  },
  'story-biz-seed-2': {
    title: 'ভারতের জিডিপি প্রবৃদ্ধি ৭.৮ শতাংশে পৌঁছাল: ম্যানুফ্যাকচারিং খাতের জোয়ারে বিশ্বের দ্রুততম ক্রমবর্ধমান অর্থনীতি',
    excerpt: 'শিল্প উৎপাদন ও পরিষেবা রফতানির ওপর ভর করে ভারতের অর্থনৈতিক অগ্রগতি অব্যাহত।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, দুপুর ০২:৩০',
    authorRole: 'অর্থনীতি সম্পাদক',
    tags: ['জিডিপি', 'অর্থনীতি', 'ব্যবসা', 'উৎপাদন'],
    keyPoints: [
      'শিল্প উৎপাদন বার্ষিক ৯.২% হারে বৃদ্ধি পেয়েছে।',
      'মাসিক জিএসটি সংগ্রহ ধারাবাহিকভাবে ১.৮৫ লাখ কোটি টাকা অতিক্রম করেছে।',
      'সরকারি পরিকাঠামো মূলধনী ব্যয় ২৮% বৃদ্ধি পেয়েছে।'
    ],
    body: [
      'নয়াদিল্লি — ভারতের অর্থনৈতিক গতি অপরিবর্তিত রয়েছে, কারণ ত্রৈমাসিক মোট অভ্যন্তরীণ উৎপাদন (জিডিপি) বৃদ্ধি ৭.৮% ছুঁয়েছে, যা আন্তর্জাতিক আর্থিক প্রতিষ্ঠানগুলির পূর্বাভাসকে অতিক্রম করেছে।'
    ]
  },
  'story-startup-1': {
    title: 'ভারতীয় স্টার্টআপ ইকোসিস্টেমের দ্রুত উত্থান: নতুন ইউনিকর্নের আগমনে ভেনচার ক্যাপিটাল ফান্ডিং ৪০% বৃদ্ধি পেয়েছে',
    excerpt: 'কৃত্রিম বুদ্ধিমত্তা, ফিনটেক ও ডিপ-টেক স্টার্টআপে বিদেশী বিনিয়োগের নতুন তরঙ্গ।',
    readTime: '৪ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ১১:১৫',
    authorRole: 'টেক স্টার্টআপ বিশ্লেষক',
    tags: ['স্টার্টআপ', 'ইউনিকর্ন', 'প্রযুক্তি', 'অর্থনীতি'],
    keyPoints: [
      'চলতি অর্থবর্ষে ভারতীয় স্টার্টআপগুলি ১২ বিলিয়ন ডলারেরও বেশি ভেনচার মূলধন সংগ্রহ করেছে।',
      'এআই ও ডিপ-টেক খাতে রেকর্ড বিনিয়োগের প্রভাব দেখা যাচ্ছে।',
      'টায়ার-২ ও টায়ার-৩ শহরগুলিতে নতুন উদ্ভাবনী হাব গড়ে উঠছে।'
    ],
    body: [
      'বেঙ্গালুরু — ভারতীয় স্টার্টআপ ইকোসিস্টেম ফান্ডিং খরা কাটিয়ে নতুন শক্তিতে ফিরে এসেছে। সাম্প্রতিক প্রান্তিকে ভেনচার ক্যাপিটাল বিনিয়োগ ৪০% বৃদ্ধি পেয়েছে।'
    ]
  },
  'story-ai-infrastructure-1': {
    title: 'ভারতে কৃত্রিম বুদ্ধিমত্তার বিপ্লব: জেনারেটিভ এআই এবং কোয়ান্টাম কম্পিউটিং কীভাবে জাতীয় পরিকাঠামো বদলে দিচ্ছে',
    excerpt: 'ডিজিটাল পাবলিক ইনফ্রাস্ট্রাকচার, স্মার্ট গ্রিড এবং স্বাস্থ্যসেবায় এআই-এর রূপান্তরকারী ভূমিকা।',
    readTime: '৫ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ০৯:৪৫',
    authorRole: 'প্রধান প্রযুক্তি সম্পাদক',
    tags: ['কৃত্রিম বুদ্ধিমত্তা', 'কোয়ান্টাম কম্পিউটিং', 'প্রযুক্তি', 'পরিকাঠামো'],
    keyPoints: [
      'স্মার্ট সিটি এবং পরিবহন ব্যবস্থায় রিয়েল-টাইম এআই ট্র্যাফিক সলিউশন প্রয়োগ করা হচ্ছে।',
      'দেশীয় ভাষার এআই মডেল ভারতের কোটি কোটি নাগরিককে ডিজিটাল পরিষেবায় সংযুক্ত করছে।',
      'কোয়ান্টাম কম্পিউটিং গবেষণায় আইআইটি এবং সি-ড্যাকের যৌথ সাফল্য।'
    ],
    body: [
      'নয়াদিল্লি — ভারতে কৃত্রিম বুদ্ধিমত্তা এবং কোয়ান্টাম প্রযুক্তি কেবল গবেষণাগারে সীমাবদ্ধ নেই, এটি এখন জাতীয় পরিকাঠামোর ভিত্তিপ্রস্তর হয়ে উঠেছে।'
    ]
  },
  'story-cric-bgt-1': {
    title: 'বর্ডার-গাভাস্কার ট্রফি মাস্টারক্লাস: ঐতিহাসিক সিরিজের জন্য টিম ইন্ডিয়ার স্ট্র্যাটেজিক ব্লুপ্রিন্ট',
    excerpt: 'অস্ট্রেলিয়ার সবুজ পিচে স্পিন ও পেসের মিশ্রিত আক্রমণ সাজাতে প্রস্তুত ভারতীয় দল।',
    readTime: '৪ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ১০:০৬',
    authorRole: 'ক্রীড়া সম্পাদক',
    tags: ['ক্রিকেট', 'বর্ডার-গাভাস্কার', 'টিম ইন্ডিয়া', 'অস্ট্রেলিয়া'],
    keyPoints: [
      'পেস এবং স্পিনের সংকর আক্রমণ দিয়ে অজি ব্যাটারদের চাপে ফেলার পরিকল্পনা।',
      'মিডল অর্ডারের আক্রমণাত্মক ব্যাটিং মেজাজ বজায় রাখার সিদ্ধান্ত।',
      'নতুন রান কৌশল এবং স্লিপ ফিল্ডিংয়ে বিশেষ নজর।'
    ],
    body: [
      'মেলবোর্ন — হাই-ভোল্টেজ বর্ডার-গাভাস্কার ট্রফির জন্য অস্ট্রেলিয়ায় পৌঁছে ভারতীয় ক্রিকেট দল কঠোর প্রস্তুতি শুরু করেছে।'
    ]
  },
  'story-deep-national-1': {
    title: 'ভারতের এক্সপ্রেসওয়ে ও হাই-স্পিড রেল নেটওয়ার্ক সম্প্রসারণ: মেট্রো শহরের সঙ্গে গ্রামীণ হাবের সংযোগ',
    excerpt: 'দ্রুতগতির যোগাযোগ ব্যবস্থা ও বহুমুখী লজিস্টিক পার্কের মাধ্যমে আঞ্চলিক বাণিজ্যে বিপ্লব।',
    readTime: '৫ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ০৮:২০',
    authorRole: 'জাতীয় পরিকাঠামো প্রতিনিধি',
    tags: ['এক্সপ্রেসওয়ে', 'হাই-স্পিড রেল', 'পরিকাঠামো', 'ভারত'],
    keyPoints: [
      '১,২০০ কিমি দীর্ঘ নতুন এক্সপ্রেসওয়ে দূরত্বের বাধা দূর করেছে।',
      'স্যাটেলাইট ভিত্তিক ব্যারিয়ারলেস টোল কালেকশন সিস্টেম চালু।',
      'ছোট শহরগুলিতে শিল্প উৎপাদন কেন্দ্রের দ্রুত প্রসার।'
    ],
    body: [
      'নয়াদিল্লি — ভারতের জাতীয় পরিকাঠামো নতুন গতি লাভ করেছে। এক সাথে বহু-মাত্রিক হাই-স্পিড রেল ও বিশ্বমানের এক্সপ্রেসওয়ে চালু হচ্ছে।'
    ]
  },
  'story-1': {
    title: 'সংসদে ঐতিহাসিক ডিজিটাল অধিকার বিল পাস: নাগরিকদের ব্যক্তিগত তথ্যের নিরাপত্তা বৃদ্ধি',
    excerpt: 'উভয় কক্ষে সর্বসম্মত সমর্থনের পর ডিজিটাল অধিকার ও ডাটা সুরক্ষা আইন কার্যকর।',
    readTime: '৩ মিনিট পঠিত',
    publishedAt: '০৩ সেপ্টেম্বর ২০২৬, সকাল ০৯:০০',
    authorRole: 'সংসদীয় সংবাদদাতা',
    tags: ['সংসদ', 'ডিজিটাল অধিকার', 'ডাটা সুরক্ষা', 'আইন'],
    keyPoints: [
      'ব্যক্তিগত তথ্যের অপব্যবহার রোধে কঠোর জরিমানার বিধান রাখা হয়েছে।',
      'নাগরিকদের তাদের ডিজিটাল ডেটা মুছে ফেলার অধিকার সুনিশ্চিত করা হয়েছে।',
      'ডিজিটাল ইন্ডিয়া ফ্রেমওয়ার্কের অধীনে সার্বভৌম ডাটা সুরক্ষা।'
    ],
    body: [
      'নয়াদিল্লি — ভারতীয় সংসদে বহুল আলোচিত ডিজিটাল অধিকার ও ডাটা সুরক্ষা বিল বিপুল সংখ্যাগরিষ্ঠতায় পাস হয়েছে।'
    ]
  }
};

// Automatic Devanagari to Bengali script transliterator
export function autoHindiToBengaliScript(text: string): string {
  if (!text) return '';
  return text.replace(/[\u0900-\u097F]/g, (ch) => {
    if (ch === 'व') return 'ব';
    if (ch === 'ळ') return 'ল';
    const code = ch.charCodeAt(0);
    return String.fromCharCode(code + 0x0080);
  });
}

// Helper accessors with safe English fallback
export function getArticleTitle(article: Article, lang: SupportedLanguage): string {
  if (!article) return '';
  if (lang === 'en') {
    if (article.titleEn) return article.titleEn;
    const details = ARTICLE_EN_DETAILS[article.id];
    if (details && details.title) return details.title;
    return article.title || '';
  }
  if (lang === 'bn') {
    if (article.titleBn) return article.titleBn;
    const details = ARTICLE_BN_DETAILS[article.id];
    if (details && details.title) return details.title;
    const raw = article.titleHi || article.title || article.titleEn || '';
    return autoHindiToBengaliScript(raw);
  }
  // Hindi ('hi')
  return article.titleHi || article.title || article.titleEn || '';
}

export function getArticleExcerpt(article: Article, lang: SupportedLanguage): string {
  if (!article) return '';
  if (lang === 'en') {
    if (article.excerptEn) return article.excerptEn;
    const details = ARTICLE_EN_DETAILS[article.id];
    if (details && details.excerpt) return details.excerpt;
    return article.excerpt || '';
  }
  if (lang === 'bn') {
    if (article.excerptBn) return article.excerptBn;
    const details = ARTICLE_BN_DETAILS[article.id];
    if (details && details.excerpt) return details.excerpt;
    const raw = article.excerptHi || article.excerpt || article.excerptEn || '';
    return autoHindiToBengaliScript(raw);
  }
  // Hindi ('hi')
  return article.excerptHi || article.excerpt || article.excerptEn || '';
}

export function getArticleBody(article: Article, lang: SupportedLanguage): string[] {
  if (!article) return [];
  if (lang === 'en') {
    if (article.bodyEn && article.bodyEn.length > 0) return article.bodyEn;
    const details = ARTICLE_EN_DETAILS[article.id];
    if (details && details.body) return details.body;
    return article.body || [];
  }
  if (lang === 'bn') {
    if (article.bodyBn && article.bodyBn.length > 0) return article.bodyBn;
    const details = ARTICLE_BN_DETAILS[article.id];
    if (details && details.body) return details.body;
    const rawList = (article.bodyHi && article.bodyHi.length > 0) ? article.bodyHi : (article.body || article.bodyEn || []);
    return rawList.map(p => autoHindiToBengaliScript(p));
  }
  // Hindi ('hi')
  return (article.bodyHi && article.bodyHi.length > 0) ? article.bodyHi : (article.body || article.bodyEn || []);
}

export function getStoryTitle(story: { headline: string; headlineEn?: string; headlineHi?: string; headlineBn?: string }, lang: SupportedLanguage): string {
  if (!story) return '';
  if (lang === 'en') return story.headlineEn || story.headline || '';
  if (lang === 'bn') {
    if (story.headlineBn) return story.headlineBn;
    const raw = story.headlineHi || story.headline || story.headlineEn || '';
    return autoHindiToBengaliScript(raw);
  }
  return story.headlineHi || story.headline || story.headlineEn || '';
}

export function getStorySummary(story: { summary: string; summaryEn?: string; summaryHi?: string; summaryBn?: string }, lang: SupportedLanguage): string {
  if (!story) return '';
  if (lang === 'en') return story.summaryEn || story.summary || '';
  if (lang === 'bn') {
    if (story.summaryBn) return story.summaryBn;
    const raw = story.summaryHi || story.summary || story.summaryEn || '';
    return autoHindiToBengaliScript(raw);
  }
  return story.summaryHi || story.summary || story.summaryEn || '';
}

export function getStoryBody(story: { body: string; bodyEn?: string; bodyHi?: string; bodyBn?: string }, lang: SupportedLanguage): string {
  if (!story) return '';
  if (lang === 'en') return story.bodyEn || story.body || '';
  if (lang === 'bn') {
    if (story.bodyBn) return story.bodyBn;
    const raw = story.bodyHi || story.body || story.bodyEn || '';
    return autoHindiToBengaliScript(raw);
  }
  return story.bodyHi || story.body || story.bodyEn || '';
}

export function getArticleKeyPoints(article: Article, lang: SupportedLanguage): string[] {
  if (lang === 'en') {
    if (article.keyPointsEn && article.keyPointsEn.length > 0) return article.keyPointsEn;
    const details = ARTICLE_EN_DETAILS[article.id];
    if (details && details.keyPoints) return details.keyPoints;
    return article.keyPoints || [];
  }
  if (lang === 'bn') {
    if (article.keyPointsBn && article.keyPointsBn.length > 0) return article.keyPointsBn;
    const details = ARTICLE_BN_DETAILS[article.id];
    if (details && details.keyPoints) return details.keyPoints;
    return article.keyPointsEn || article.keyPoints || [];
  }
  if (article.keyPointsHi && article.keyPointsHi.length > 0) return article.keyPointsHi;
  return article.keyPoints || [];
}

export function getArticleTags(article: Article, lang: SupportedLanguage): string[] {
  if (lang === 'en') {
    if (article.tagsEn && article.tagsEn.length > 0) return article.tagsEn;
    const details = ARTICLE_EN_DETAILS[article.id];
    if (details && details.tags) return details.tags;
    return article.tags;
  }
  if (lang === 'bn') {
    if (article.tagsBn && article.tagsBn.length > 0) return article.tagsBn;
    const details = ARTICLE_BN_DETAILS[article.id];
    if (details && details.tags) return details.tags;
    return article.tagsEn || article.tags;
  }
  if (article.tagsHi && article.tagsHi.length > 0) return article.tagsHi;
  return article.tags;
}

export function getArticleAuthorName(article: Article, lang: SupportedLanguage): string {
  if (lang === 'en') {
    return article.author.name || article.author.nameHi;
  }
  if (lang === 'bn') {
    return (article.author as any).nameBn || article.author.nameHi || article.author.name;
  }
  return article.author.nameHi || article.author.name;
}

export function getArticleAuthorRole(article: Article, lang: SupportedLanguage): string {
  if (lang === 'en') {
    if (article.author.roleEn) return article.author.roleEn;
    const details = ARTICLE_EN_DETAILS[article.id];
    if (details && details.authorRole) return details.authorRole;
    return 'Journalist & Correspondent';
  }
  if (lang === 'bn') {
    const details = ARTICLE_BN_DETAILS[article.id];
    if (details && details.authorRole) return details.authorRole;
    return 'সাংবাদিক ও বিশেষ প্রতিনিধি';
  }
  return article.author.role;
}

export function getArticleReadTime(article: Article, lang: SupportedLanguage): string {
  if (!article) return lang === 'en' ? '3 min read' : lang === 'bn' ? '৩ মিনিট' : '3 मिनट';
  if (lang === 'en') {
    if (article.readTimeEn) return article.readTimeEn;
    const details = ARTICLE_EN_DETAILS[article.id];
    if (details && details.readTime) return details.readTime;
    const num = (article.readTime || '').replace(/[^0-9]/g, '') || '3';
    return `${num} min read`;
  }
  if (lang === 'bn') {
    const details = ARTICLE_BN_DETAILS[article.id];
    if (details && details.readTime) return details.readTime;
    return '৩ মিনিট পঠিত';
  }
  return article.readTime || '3 मिनट';
}

export function getArticlePublishedAt(article: Article, lang: SupportedLanguage): string {
  if (!article) return '';
  if (lang === 'en') {
    if (article.publishedAtEn) return article.publishedAtEn;
    const details = ARTICLE_EN_DETAILS[article.id];
    if (details && details.publishedAt) return details.publishedAt;
    return article.publishedAt || '';
  }
  if (lang === 'bn') {
    const details = ARTICLE_BN_DETAILS[article.id];
    if (details && details.publishedAt) return details.publishedAt;
    return article.publishedAt || '';
  }
  return article.publishedAt || '';
}

export function getCategoryName(category: { slug?: string; nameHi?: string; nameEn?: string }, lang: SupportedLanguage): string {
  if (category.slug && CATEGORY_NAMES[category.slug]) {
    return CATEGORY_NAMES[category.slug][lang] || CATEGORY_NAMES[category.slug].hi;
  }
  if (lang === 'en') {
    return category.nameEn || category.nameHi || '';
  }
  return category.nameHi || category.nameEn || '';
}

export function getCategoryDescription(slug: string, fallbackHi: string, lang: SupportedLanguage): string {
  if (CATEGORY_DESCRIPTIONS[slug]) {
    return CATEGORY_DESCRIPTIONS[slug][lang] || CATEGORY_DESCRIPTIONS[slug].hi;
  }
  return fallbackHi;
}

export function getVideoTitle(video: VideoItem, lang: SupportedLanguage): string {
  if (lang === 'en') {
    return video.title || video.titleEn || video.titleHi;
  }
  return video.titleHi || video.title;
}

export function getVideoDescription(video: VideoItem, lang: SupportedLanguage): string {
  if (lang === 'en') {
    return video.descriptionEn || video.title;
  }
  return video.description;
}

export function getGalleryTitle(gallery: PhotoGallery, lang: SupportedLanguage): string {
  if (lang === 'en') {
    return gallery.title || gallery.titleEn || gallery.titleHi;
  }
  return gallery.titleHi || gallery.title;
}

export function getGalleryCaption(image: GalleryImage, lang: SupportedLanguage): string {
  if (lang === 'en') {
    return image.caption || image.captionHi;
  }
  return image.captionHi || image.caption;
}

export function formatViews(views: number | string, lang: SupportedLanguage): string {
  if (typeof views === 'string') {
    if (lang === 'en') return `${views} views`;
    if (lang === 'bn') return `${views} ভিউ`;
    return `${views} व्यूज़`;
  }
  if (lang === 'en') {
    return `${views.toLocaleString('en-US')} views`;
  }
  if (lang === 'bn') {
    return `${views.toLocaleString('bn-BD')} ভিউ`;
  }
  return `${views.toLocaleString('hi-IN')} व्यूज़`;
}

export function getFormattedDate(lang: SupportedLanguage): string {
  const today = new Date();
  if (lang === 'en') {
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  if (lang === 'bn') {
    return today.toLocaleDateString('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  return today.toLocaleDateString('hi-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
