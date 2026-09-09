// =====================================================
// NEWSROOM CMS — SEED DATA
// =====================================================

import {
  Story,
  MediaItem,
  AdminUser,
  Comment,
  HomepageLayout,
  Notification,
  NewsSection,
} from '../types/admin';

// ─── STORIES ────────────────────────────────────────

export const SEED_STORIES: Story[] = [
  {
    id: 'story-test-live',
    type: 'news',
    status: 'published',
    kicker: 'BREAKING · SPACE',
    headline: 'India Space Mission Launch Success: New Solar Satellite Deployed',
    summary:
      'ISRO has successfully launched the new solar observation satellite from Sriharikota spaceport. Scientists confirm solar arrays deployed cleanly in orbit.',
    body: `New Delhi — **ISRO Scientists** have achieved another major milestone with the successful launch of India's latest solar research satellite from *Sriharikota Spaceport*.

## Key Mission Highlights

- Satellite deployed cleanly into target orbit
- Solar power panels deployed automatically after separation
- Real-time telemetry tracking confirmed operational

> "This is a historic leap for Indian space research and solar physics." — Mission Director

For official telemetry updates and launch schedules, read the [Official ISRO Space Portal](https://www.isro.gov.in) announcement.

![Space Craft Rocket Launch](https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80)

### Video Coverage

[video:https://www.youtube.com/watch?v=21X5lGlDOfg "Rocket Launch Live Telecast"]`,
    mainImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80',
    mainImageCaption: 'Rocket launch at Sriharikota Spaceport',
    mainImageAlt: 'ISRO Rocket launch',
    section: 'national',
    topics: ['isro', 'space', 'satellite', 'science'],
    byline: 'Amit Sharma',
    authorId: 'user-1',
    location: 'Sriharikota',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    views: 45800,
    engagement: 98,
    shares: 4200,
    comments: 89,
    sources: [
      { id: 'src-isro', label: 'ISRO Press Release', url: 'https://www.isro.gov.in' }
    ],
    relatedStoryIds: ['story-1', 'story-2'],
    activity: [
      { id: 'act-test-1', action: 'created', userId: 'user-1', userName: 'Amit Sharma', timestamp: new Date().toISOString() },
      { id: 'act-test-2', action: 'published', userId: 'user-1', userName: 'Amit Sharma', timestamp: new Date().toISOString() },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: 'india-space-mission-launch-success-solar-satellite',
    pushNotification: true,
    newsletterInclude: true,
  },
  {
    id: 'story-biz-seed-1',
    type: 'news',
    status: 'published',
    kicker: 'BUSINESS · MARKETS',
    headline: 'Stock Market Bull Run: Sensex Touches Historic 85,000 Milestone on Foreign Inflows',
    summary:
      'Indian equities registered record gains led by banking, IT, and auto stocks amid strong Q1 corporate earnings and foreign institutional buying.',
    body: `Mumbai — **Dalal Street** celebrated a landmark day as the BSE Sensex surged past the 85,000-mark for the first time in history, driven by strong buying from foreign institutional investors (FIIs) and robust domestic mutual fund SIP inflows.

## Market Drivers & Financial Highlights

- **FII Inflows:** Net buying of over ₹4,200 crore in a single trading session.
- **SIP Record:** Domestic retail investors contributed a record ₹25,000 crore monthly SIP volume.
- **Top Performing Sectors:** Nifty Bank (+2.4%), Nifty IT (+3.1%), and Nifty Auto (+1.8%).

> "India's macroeconomic stability and robust earnings trajectory continue to attract global capital." — Managing Director, National Stock Exchange

![Stock Market Bull Run](https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80)

### Analyst Outlook

Brokerage houses maintain an optimistic stance on Indian large-cap banking and infrastructure stocks for the remaining quarters of FY27.`,
    mainImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    mainImageCaption: 'BSE Bull statue outside Stock Exchange in Mumbai',
    mainImageAlt: 'BSE Stock Exchange',
    section: 'business',
    topics: ['business', 'sensex', 'stock market', 'finance'],
    byline: 'Vikas Malhotra',
    authorId: 'user-1',
    location: 'Mumbai',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    views: 54100,
    engagement: 92,
    shares: 4300,
    comments: 98,
    sources: [
      { id: 'src-bse', label: 'BSE Press Release', url: 'https://bseindia.com' }
    ],
    relatedStoryIds: ['story-1'],
    activity: [
      { id: 'act-biz-1', action: 'published', userId: 'user-1', userName: 'Vikas Malhotra', timestamp: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: 'stock-market-bull-run-sensex-touches-historic-85000-milestone',
    pushNotification: true,
    newsletterInclude: true,
  },
  {
    id: 'story-biz-seed-2',
    type: 'news',
    status: 'published',
    kicker: 'BUSINESS · MACROECONOMY',
    headline: 'India GDP Growth Reaches 7.8%: Outpaces Major Economies on Manufacturing Surge',
    summary:
      'Official GDP figures confirm India’s standing as the fastest-growing major economy, buoyed by robust industrial output and services exports.',
    body: `New Delhi — **India's Economic Momentum** remains unmatched as quarterly Gross Domestic Product (GDP) growth touched 7.8%, exceeding consensus estimates by international financial institutions.

## Macroeconomic Overview

1. **Manufacturing Boom:** Industrial output expanded at 9.2% year-on-year.
2. **GST Revenues:** Monthly collections consistently crossing ₹1.85 lakh crore.
3. **Capex Deployment:** Government infrastructure capital expenditure up by 28%.

> "Structural reforms and digital public infrastructure are driving sustained productivity gains across the Indian economy." — Chief Economic Advisor

![Modern Financial Metro Skyline](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80)

### Global Impact

World Bank and IMF have reaffirmed India's growth trajectory as the key growth engine for the global economy in 2026-2027.`,
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    mainImageCaption: 'Financial district skyline in Mumbai',
    mainImageAlt: 'Financial District',
    section: 'business',
    topics: ['business', 'gdp', 'economy', 'india'],
    byline: 'Vikas Malhotra',
    authorId: 'user-1',
    location: 'New Delhi',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    views: 61200,
    engagement: 95,
    shares: 5100,
    comments: 140,
    sources: [
      { id: 'src-mospi', label: 'MoSPI National Accounts', url: 'https://mospi.gov.in' }
    ],
    relatedStoryIds: ['story-1'],
    activity: [
      { id: 'act-biz-2', action: 'published', userId: 'user-1', userName: 'Vikas Malhotra', timestamp: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: 'india-gdp-growth-reaches-78-outpaces-major-economies-manufacturing-surge',
    pushNotification: true,
    newsletterInclude: true,
  },
  {
    id: 'story-biz-seed-3',
    type: 'news',
    status: 'published',
    kicker: 'BUSINESS · STARTUPS',
    headline: 'Indian Startup Ecosystem Surge: Venture Capital Inflow Bounces Back 40% with New Unicorns',
    summary:
      'Venture investments in DeepTech, FinTech, and Renewable Energy startups surge as global investors re-engage Indian innovation hubs.',
    body: `Bengaluru — **The Indian Startup Resurgence** is gaining rapid speed as venture capital funding rebounded by 40% quarter-on-quarter, minting three new technology unicorns in the process.

## Funding Resurgence Dynamics

- **Focus Areas:** Artificial Intelligence infrastructure, Green hydrogen logistics, and cross-border B2B payments.
- **Top Hubs:** Bengaluru, Delhi-NCR, and Mumbai led the investment chart receiving 82% of total capital.
- **Path to Profitability:** Investors favor startups demonstrating positive EBITDA margins.

> "Indian entrepreneurs are creating scalable, unit-economic-positive businesses that compete on global standards." — Senior VC Managing Partner

![Startup Innovation Hub](https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80)

### Future Outlook

With over 115 unicorns and thousands of early-stage startups, India solidifies its position as the world's third-largest startup ecosystem.`,
    mainImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    mainImageCaption: 'Tech startup hub in Bengaluru',
    mainImageAlt: 'Tech Hub',
    section: 'business',
    topics: ['business', 'startup', 'unicorn', 'funding'],
    byline: 'Vikas Malhotra',
    authorId: 'user-1',
    location: 'Bengaluru',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    views: 48900,
    engagement: 91,
    shares: 3800,
    comments: 85,
    sources: [
      { id: 'src-startup', label: 'Startup India Portal', url: 'https://startupindia.gov.in' }
    ],
    relatedStoryIds: ['story-1'],
    activity: [
      { id: 'act-biz-3', action: 'published', userId: 'user-1', userName: 'Vikas Malhotra', timestamp: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: 'indian-startup-ecosystem-surge-venture-capital-inflow-bounces-back-40-unicorns',
    pushNotification: true,
    newsletterInclude: true,
  },
  {
    id: 'story-deep-tech-ai-1',
    type: 'news',
    status: 'published',
    kicker: 'TECH & AI · EXCLUSIVE',
    headline: 'Artificial Intelligence in India: How Generative AI and Quantum Computing Are Transforming National Infrastructure',
    headlineHi: 'भारत में आर्टिफिशियल इंटेलिजेंस: जनरेटिव एआई और क्वांटम कंप्यूटिंग कैसे राष्ट्रीय बुनियादी ढांचे को बदल रहे हैं',
    summary:
      'India is witnessing an unprecedented leap in artificial intelligence adoption across healthcare, agriculture, defense, and public governance.',
    summaryHi: 'स्वास्थ्य सेवा, कृषि, रक्षा और सार्वजनिक शासन में आर्टिफिशियल इंटेलिजेंस और क्वांटम तकनीक का अभূতपूर्व प्रयोग।',
    body: `New Delhi — **India's Technology Revolution** has achieved a new benchmark as the Ministry of Electronics and Information Technology (MeitY) officially rolled out the National AI Infrastructure Grid.

## The Pillars of India's AI Ambition

1. **Indigenous Large Language Models (LLMs):** Developed natively to support over 22 official Indian languages with context-aware dialect translation.
2. **AI-Powered Precision Agriculture:** Real-time satellite data combined with neural networks providing micro-weather forecasts to 40 million farmers.
3. **Smart Healthcare Diagnostics:** Automated radiological screening in rural primary healthcare centers across 15 states.

> "Artificial Intelligence is no longer just a software tool; it is becoming the foundational engine for economic equity and governance efficiency across India." — Union Tech Secretary

### Deep Dive into Quantum Integration

The integration of 100-qubit quantum processors with classical GPU supercomputers at C-DAC Pune has enabled real-time traffic signal optimization in major metros including Bengaluru, Mumbai, and Delhi, reducing peak-hour transit delays by 24%.

![AI Computing Infrastructure](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

### Economic & Job Growth Impact

Industry reports from NASSCOM suggest that the domestic AI ecosystem will generate over 1.8 million specialized technical jobs by 2028, positioning India as the primary skill capital for global enterprise AI deployments.`,
    mainImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    mainImageCaption: 'Advanced AI and Data Infrastructure Lab in Bengaluru',
    mainImageAlt: 'AI Data Center',
    section: 'tech',
    topics: ['ai', 'technology', 'innovation', 'india'],
    byline: 'Dr. Alok Verma',
    authorId: 'user-1',
    location: 'Bengaluru',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    views: 68900,
    engagement: 96,
    shares: 5400,
    comments: 112,
    sources: [
      { id: 'src-meity', label: 'MeitY Official Portal', url: 'https://meity.gov.in' }
    ],
    relatedStoryIds: ['story-1', 'story-test-live'],
    activity: [
      { id: 'act-ai-1', action: 'published', userId: 'user-1', userName: 'Dr. Alok Verma', timestamp: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: 'artificial-intelligence-india-generative-ai-quantum-computing-infrastructure',
    pushNotification: true,
    newsletterInclude: true,
  },
  {
    id: 'story-deep-cricket-1',
    type: 'news',
    status: 'published',
    kicker: 'CRICKET · MATCH SPECIAL',
    headline: 'Border-Gavaskar Trophy Masterclass: Inside India’s Tactical Blueprint for the Epic Series',
    headlineHi: 'बॉर्डर-गावस्कर ट्रॉफी मास्टरक्लास: ऐतिहासिक सीरीज के लिए भारत की सामरिक रणनीति',
    summary:
      'An in-depth tactical analysis of Team India’s bowling strategy, batting rotations, and spin variations ahead of the marquee test series.',
    summaryHi: 'टेस्ट सीरीज से पहले भारतीय टीम की गेंदबाजी रणनीति, बल्लेबाजी क्रम और स्पिन विविधताओं का गहन विश्लेषण।',
    body: `Melbourne — As **Team India** prepares for the high-intensity series, cricket analysts and former captains have highlighted the tactical shifts in India's preparation.

## Key Strategic Pillars

- **Pace-Spin Hybrid Attacks:** Utilizing seam movement in initial overs followed by tight reverse-swing in afternoon sessions.
- **Aggressive Middle-Order Tempo:** Counter-attacking strategies against short-pitch bowling to unsettle opposition pacers.
- **Field Placement Innovations:** Leg-side traps designed specifically for top-order opposition batters.

> "Test cricket in Australia tests your character more than your technique. India's current lineup possesses both in abundance." — Senior Cricket Analyst

![Cricket Stadium Lights](https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80)

### Fitness & Bench Strength

With a robust domestic structure and IPL exposure, India's bench strength ensures seamless replacements across all conditions. The fast-bowling workload management program overseen by NCA has kept key bowlers at peak fitness levels.`,
    mainImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    mainImageCaption: 'Melbourne Cricket Ground preparing for the clash',
    mainImageAlt: 'Cricket Stadium',
    section: 'cricket',
    topics: ['cricket', 'sports', 'team india', 'bcci'],
    byline: 'Rajat Sharma',
    authorId: 'user-5',
    location: 'Melbourne',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    views: 92400,
    engagement: 99,
    shares: 8100,
    comments: 240,
    sources: [
      { id: 'src-bcci', label: 'BCCI Media Release', url: 'https://bcci.tv' }
    ],
    relatedStoryIds: ['story-4'],
    activity: [
      { id: 'act-cric-1', action: 'published', userId: 'user-5', userName: 'Rajat Sharma', timestamp: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: 'border-gavaskar-trophy-masterclass-inside-india-tactical-blueprint',
    pushNotification: true,
    newsletterInclude: true,
  },
  {
    id: 'story-deep-national-1',
    type: 'news',
    status: 'published',
    kicker: 'NATIONAL · INFRASTRUCTURE',
    headline: 'India’s Expressways & High-Speed Rail Network Expansion: Connecting Metros to Rural Hubs',
    headlineHi: 'भारत के एक्सप्रेसवे और हाई-स्पीड रेल नेटवर्क का विस्तार: मेट्रो शहरों को ग्रामीण केंद्रों से जोड़ना',
    summary:
      'A comprehensive report on India’s multi-modal infrastructure megaprojects transforming freight speeds, regional commerce, and travel times.',
    summaryHi: 'माल ढुलाई की गति, क्षेत्रीय व्यापार और यात्रा के समय को बदलने वाले बहु-मॉडल बुनियादी ढांचा ढांचों पर विस्तृत रिपोर्ट।',
    body: `New Delhi — **The Transformation of Indian Infrastructure** has entered a decisive phase with the commissioning of over 1,200 km of new access-controlled expressways and bullet train trial corridors.

## Key Infrastructure Milestones

1. **Multi-Modal Logistics Parks:** Streamlining cargo transfer between rail, road, and maritime ports.
2. **Green Energy Corridors:** Solar-paneled expressways powering EV charging hubs every 30 kilometers.
3. **Smart Toll Systems:** Satellite-based barrierless toll collection ensuring zero congestion at interchange points.

> "Modern infrastructure is the single biggest catalyst for uplifting regional economies and bridging the urban-rural divide." — Union Infrastructure Secretary

![High Speed Train Corridor](https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80)

### Socio-Economic Upliftment

Regions along the new expressway corridors have registered a 35% growth in local manufacturing units, creating thousands of skilled jobs in tier-2 and tier-3 towns.`,
    mainImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    mainImageCaption: 'Newly constructed high-speed corridor connecting major industrial hubs',
    mainImageAlt: 'Expressway Infrastructure',
    section: 'national',
    topics: ['national', 'infrastructure', 'expressway', 'india'],
    byline: 'Amit Sharma',
    authorId: 'user-1',
    location: 'New Delhi',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    views: 74100,
    engagement: 94,
    shares: 6200,
    comments: 175,
    sources: [
      { id: 'src-nhai', label: 'NHAI Press Release', url: 'https://nhai.gov.in' }
    ],
    relatedStoryIds: ['story-1'],
    activity: [
      { id: 'act-nat-1', action: 'published', userId: 'user-1', userName: 'Amit Sharma', timestamp: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: 'india-expressways-high-speed-rail-network-expansion-connecting-metros',
    pushNotification: true,
    newsletterInclude: true,
  },
  {
    id: 'story-1',
    type: 'news',
    status: 'published',
    kicker: 'Politics',
    headline: 'Parliament Passes Landmark Digital Rights Bill',
    summary:
      'Both houses of Parliament unanimously approved the Digital Rights and Data Protection Bill, granting citizens greater control over their personal data.',
    body: '<p>New Delhi — In a historic session, the Indian Parliament passed the Digital Rights and Data Protection Bill with a sweeping majority...</p>',
    mainImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200',
    mainImageCaption: 'Parliament session in New Delhi',
    mainImageAlt: 'Parliament building during session',
    section: 'politics',
    topics: ['parliament', 'digital rights', 'data protection', 'legislation'],
    byline: 'Amit Sharma',
    authorId: 'user-1',
    location: 'New Delhi',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: '2026-09-03T09:00:00Z',
    updatedDate: '2026-09-03T11:30:00Z',
    views: 124500,
    engagement: 87,
    shares: 3420,
    comments: 214,
    seoTitle: 'Parliament Passes Digital Rights Bill | Bharat News',
    seoDescription:
      'India Parliament passes Digital Rights and Data Protection Bill granting citizens greater data control.',
    canonicalUrl: 'https://bharatnews.com/politics/parliament-digital-rights-bill',
    sources: [
      { id: 'src-1', label: 'Lok Sabha Press Release', url: 'https://loksabha.nic.in' },
      { id: 'src-2', label: 'Ministry of Electronics', url: 'https://meity.gov.in' },
    ],
    relatedStoryIds: ['story-2', 'story-5'],
    authorNotes: 'Follow-up interview with minister scheduled for tomorrow.',
    activity: [
      { id: 'act-1', action: 'created', userId: 'user-1', userName: 'Amit Sharma', timestamp: '2026-09-02T08:00:00Z' },
      { id: 'act-2', action: 'submitted_for_review', userId: 'user-1', userName: 'Amit Sharma', timestamp: '2026-09-02T16:00:00Z' },
      { id: 'act-3', action: 'approved', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-03T08:00:00Z', note: 'Excellent reporting. Approved for immediate publish.' },
      { id: 'act-4', action: 'published', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-03T09:00:00Z' },
    ],
    createdAt: '2026-09-02T08:00:00Z',
    updatedAt: '2026-09-03T11:30:00Z',
    slug: 'parliament-digital-rights-bill',
    pushNotification: true,
    newsletterInclude: true,
  },
  {
    id: 'story-2',
    type: 'news',
    status: 'published',
    kicker: 'Breaking',
    headline: 'Major Earthquake Strikes Uttarakhand, Rescue Operations Underway',
    summary:
      'A 6.4-magnitude earthquake has struck the Chamoli district of Uttarakhand. NDRF teams have been deployed.',
    body: '<p>Dehradun — A powerful earthquake measuring 6.4 on the Richter scale struck the Chamoli district of Uttarakhand early this morning...</p>',
    mainImage: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200',
    mainImageCaption: 'NDRF rescue operations in Chamoli',
    mainImageAlt: 'Rescue teams working at earthquake site',
    section: 'india',
    topics: ['earthquake', 'uttarakhand', 'ndrf', 'disaster'],
    byline: 'Rajeev Menon',
    authorId: 'user-3',
    location: 'Chamoli, Uttarakhand',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: '2026-09-04T06:15:00Z',
    views: 289000,
    engagement: 95,
    shares: 18700,
    comments: 542,
    seoTitle: 'Earthquake Strikes Uttarakhand 6.4 Magnitude | Bharat News',
    seoDescription: 'Major 6.4-magnitude earthquake hits Chamoli district of Uttarakhand. Rescue underway.',
    canonicalUrl: 'https://bharatnews.com/india/uttarakhand-earthquake-chamoli',
    sources: [
      { id: 'src-3', label: 'NDRF Official Statement', url: 'https://ndrf.gov.in' },
      { id: 'src-4', label: 'IMD Earthquake Report', url: 'https://seismo.gov.in' },
    ],
    relatedStoryIds: ['story-5'],
    activity: [
      { id: 'act-5', action: 'created', userId: 'user-3', userName: 'Rajeev Menon', timestamp: '2026-09-04T06:00:00Z' },
      { id: 'act-6', action: 'published', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-04T06:15:00Z', note: 'Breaking news — fast-tracked.' },
    ],
    createdAt: '2026-09-04T06:00:00Z',
    updatedAt: '2026-09-04T06:15:00Z',
    slug: 'uttarakhand-earthquake-chamoli',
    pushNotification: true,
    newsletterInclude: false,
  },
  {
    id: 'story-3',
    type: 'feature',
    status: 'in_review',
    kicker: 'Economy',
    headline: "How India's Semiconductor Push Is Reshaping the Tech Landscape",
    summary:
      "India is investing $10 billion in domestic semiconductor manufacturing. We look at what this means for the future.",
    body: "<p>India's ambition to become a global semiconductor hub is taking shape, with three major fab plants announced in the last year...</p>",
    mainImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    mainImageCaption: 'Inside a semiconductor fabrication facility',
    mainImageAlt: 'Semiconductor manufacturing clean room',
    section: 'economy',
    topics: ['semiconductors', 'technology', 'manufacturing', 'investment'],
    byline: 'Kavita Reddy',
    authorId: 'user-4',
    location: 'Bengaluru',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isPremium: true,
    views: 0,
    engagement: 0,
    shares: 0,
    comments: 0,
    sources: [{ id: 'src-5', label: 'MeitY Semiconductor Report', url: 'https://meity.gov.in/semiconductor' }],
    relatedStoryIds: ['story-1'],
    authorNotes: 'Needs expert quote from IIT professor before publishing.',
    activity: [
      { id: 'act-7', action: 'created', userId: 'user-4', userName: 'Kavita Reddy', timestamp: '2026-09-01T10:00:00Z' },
      { id: 'act-8', action: 'submitted_for_review', userId: 'user-4', userName: 'Kavita Reddy', timestamp: '2026-09-03T14:00:00Z' },
    ],
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-03T14:00:00Z',
    slug: 'india-semiconductor-push-tech-landscape',
  },
  {
    id: 'story-4',
    type: 'news',
    status: 'draft',
    kicker: 'Sports',
    headline: 'India Qualifies for Cricket World Cup Semi-Finals',
    summary:
      "Team India secured their semi-final spot with a dominant 8-wicket victory over Sri Lanka in yesterday's group stage match.",
    body: '<p>Ahmedabad — India\'s cricket team put on a commanding performance at the Narendra Modi Stadium...</p>',
    section: 'sports',
    topics: ['cricket', 'world cup', 'team india', 'semi-finals'],
    byline: 'Suresh Pillai',
    authorId: 'user-5',
    location: 'Ahmedabad',
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    isPremium: false,
    views: 0,
    engagement: 0,
    shares: 0,
    comments: 0,
    sources: [],
    relatedStoryIds: [],
    activity: [
      { id: 'act-9', action: 'created', userId: 'user-5', userName: 'Suresh Pillai', timestamp: '2026-09-04T08:00:00Z' },
    ],
    createdAt: '2026-09-04T08:00:00Z',
    updatedAt: '2026-09-04T08:30:00Z',
    slug: 'india-cricket-world-cup-semi-finals',
  },
  {
    id: 'story-5',
    type: 'explainer',
    status: 'approved',
    kicker: 'Science',
    headline: 'What Is the Digital Rupee and How Does It Work?',
    summary:
      "As India's Central Bank Digital Currency (CBDC) gains traction, we explain everything you need to know about the e-Rupee.",
    body: "<p>The Reserve Bank of India's digital rupee pilot has crossed 1 million users. But what exactly is it?...</p>",
    mainImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200',
    mainImageCaption: 'Digital currency concept illustration',
    mainImageAlt: 'Digital rupee concept artwork',
    section: 'economy',
    topics: ['digital rupee', 'cbdc', 'rbi', 'finance', 'cryptocurrency'],
    byline: 'Amit Sharma',
    authorId: 'user-1',
    isBreaking: false,
    isFeatured: true,
    isTrending: false,
    isPremium: false,
    views: 0,
    engagement: 0,
    shares: 0,
    comments: 0,
    sources: [{ id: 'src-6', label: 'RBI CBDC Report', url: 'https://rbi.org.in/cbdc' }],
    relatedStoryIds: ['story-1', 'story-3'],
    activity: [
      { id: 'act-10', action: 'created', userId: 'user-1', userName: 'Amit Sharma', timestamp: '2026-08-30T09:00:00Z' },
      { id: 'act-11', action: 'submitted_for_review', userId: 'user-1', userName: 'Amit Sharma', timestamp: '2026-09-01T12:00:00Z' },
      { id: 'act-12', action: 'approved', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-02T10:00:00Z', note: 'Very well researched. Approved.' },
    ],
    createdAt: '2026-08-30T09:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z',
    slug: 'what-is-digital-rupee-how-does-it-work',
    newsletterInclude: true,
  },
  {
    id: 'story-6',
    type: 'news',
    status: 'scheduled',
    kicker: 'Health',
    headline: 'AIIMS Study Reveals Rising Air Pollution Linked to 30% Increase in Lung Disease',
    summary:
      'A comprehensive five-year study by AIIMS Delhi links sustained exposure to PM2.5 pollution with a significant rise in chronic lung ailments.',
    body: '<p>New Delhi — Researchers at AIIMS have published a landmark five-year study showing...</p>',
    mainImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1200',
    mainImageCaption: 'Air quality monitoring station in Delhi',
    mainImageAlt: 'Smog over Delhi skyline',
    section: 'health',
    topics: ['aiims', 'air pollution', 'lung disease', 'pm2.5', 'health'],
    byline: 'Kavita Reddy',
    authorId: 'user-4',
    location: 'New Delhi',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isPremium: true,
    scheduledDate: '2026-09-05T07:00:00Z',
    views: 0,
    engagement: 0,
    shares: 0,
    comments: 0,
    sources: [{ id: 'src-7', label: 'AIIMS Research Paper', url: 'https://aiims.edu/research' }],
    relatedStoryIds: [],
    activity: [
      { id: 'act-13', action: 'created', userId: 'user-4', userName: 'Kavita Reddy', timestamp: '2026-09-01T11:00:00Z' },
      { id: 'act-14', action: 'approved', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-03T09:00:00Z' },
      { id: 'act-15', action: 'scheduled', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-03T09:05:00Z', note: 'Scheduled for 7 AM Friday.' },
    ],
    createdAt: '2026-09-01T11:00:00Z',
    updatedAt: '2026-09-03T09:05:00Z',
    slug: 'aiims-air-pollution-lung-disease-study',
    newsletterInclude: true,
  },
  {
    id: 'story-7',
    type: 'opinion',
    status: 'draft',
    kicker: 'Opinion',
    headline: 'India Needs a Bolder Approach to Renewable Energy Subsidies',
    summary:
      "Despite ambitious targets, India's renewable energy transition is stalling. A stronger subsidy framework is the way forward.",
    body: '<p>India has pledged 500 GW of renewable energy capacity by 2030. But the targets are slipping...</p>',
    section: 'opinion',
    topics: ['renewable energy', 'solar', 'policy', 'climate'],
    byline: 'Priya Nair',
    authorId: 'user-2',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isPremium: false,
    views: 0,
    engagement: 0,
    shares: 0,
    comments: 0,
    sources: [],
    relatedStoryIds: [],
    activity: [
      { id: 'act-16', action: 'created', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-04T10:00:00Z' },
    ],
    createdAt: '2026-09-04T10:00:00Z',
    updatedAt: '2026-09-04T10:00:00Z',
    slug: 'india-renewable-energy-subsidies-opinion',
  },
  {
    id: 'story-8',
    type: 'photo_story',
    status: 'published',
    kicker: 'Culture',
    headline: 'In Pictures: Ganesh Chaturthi Celebrations Across India',
    summary:
      "From Mumbai's iconic processions to small-town revelry, here is a visual journey through Ganesh Chaturthi 2026.",
    body: '<p>Every year, millions of Indians come together to celebrate Ganesh Chaturthi...</p>',
    mainImage: 'https://images.unsplash.com/photo-1567528377640-24f8de9cca8d?w=1200',
    mainImageCaption: 'Ganesh idol immersion procession in Mumbai',
    mainImageAlt: 'Ganesh Chaturthi procession',
    section: 'culture',
    topics: ['ganesh chaturthi', 'festival', 'culture', 'mumbai'],
    byline: 'Rajeev Menon',
    authorId: 'user-3',
    location: 'Mumbai',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    isPremium: false,
    publishDate: '2026-09-02T12:00:00Z',
    views: 87000,
    engagement: 73,
    shares: 6200,
    comments: 128,
    sources: [],
    relatedStoryIds: [],
    activity: [
      { id: 'act-17', action: 'created', userId: 'user-3', userName: 'Rajeev Menon', timestamp: '2026-09-02T08:00:00Z' },
      { id: 'act-18', action: 'published', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-02T12:00:00Z' },
    ],
    createdAt: '2026-09-02T08:00:00Z',
    updatedAt: '2026-09-02T12:00:00Z',
    slug: 'ganesh-chaturthi-celebrations-india-2026',
  },
  {
    id: 'story-9',
    type: 'news',
    status: 'changes_requested',
    kicker: 'Business',
    headline: 'Reliance Industries Q2 Results Beat Analyst Estimates',
    summary:
      'Reliance Industries posted a 14% year-on-year rise in net profit for Q2, driven by strong performance in Jio and Retail segments.',
    body: '<p>Mumbai — Reliance Industries Limited (RIL) reported second-quarter results that exceeded analyst expectations...</p>',
    section: 'business',
    topics: ['reliance', 'quarterly results', 'jio', 'retail', 'business'],
    byline: 'Suresh Pillai',
    authorId: 'user-5',
    location: 'Mumbai',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isPremium: true,
    views: 0,
    engagement: 0,
    shares: 0,
    comments: 0,
    sources: [{ id: 'src-8', label: 'BSE Filing', url: 'https://bseindia.com' }],
    relatedStoryIds: ['story-3'],
    authorNotes: 'Editor requested more context on debt levels.',
    activity: [
      { id: 'act-19', action: 'created', userId: 'user-5', userName: 'Suresh Pillai', timestamp: '2026-09-03T15:00:00Z' },
      { id: 'act-20', action: 'submitted_for_review', userId: 'user-5', userName: 'Suresh Pillai', timestamp: '2026-09-03T18:00:00Z' },
      { id: 'act-21', action: 'changes_requested', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-04T09:00:00Z', note: 'Please add more context on debt situation and JioMart metrics.' },
    ],
    createdAt: '2026-09-03T15:00:00Z',
    updatedAt: '2026-09-04T09:00:00Z',
    slug: 'reliance-industries-q2-results-2026',
  },
  {
    id: 'story-10',
    type: 'live_blog',
    status: 'published',
    kicker: 'Politics',
    headline: 'LIVE: Supreme Court Hearing on Electoral Bonds Scheme',
    summary:
      "Follow our live coverage of the Supreme Court's continued hearing on the Electoral Bonds Scheme transparency case.",
    body: '<p><strong>3:45 PM</strong> — The bench reconvenes after the lunch break...</p>',
    mainImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200',
    mainImageCaption: 'Supreme Court of India',
    mainImageAlt: 'Supreme Court of India building',
    section: 'politics',
    topics: ['supreme court', 'electoral bonds', 'politics', 'democracy'],
    byline: 'Amit Sharma',
    authorId: 'user-1',
    location: 'New Delhi',
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    isPremium: false,
    publishDate: '2026-09-04T10:00:00Z',
    views: 51000,
    engagement: 88,
    shares: 2100,
    comments: 374,
    sources: [{ id: 'src-9', label: 'Supreme Court Live', url: 'https://sci.gov.in' }],
    relatedStoryIds: ['story-1'],
    activity: [
      { id: 'act-22', action: 'created', userId: 'user-1', userName: 'Amit Sharma', timestamp: '2026-09-04T09:45:00Z' },
      { id: 'act-23', action: 'published', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-04T10:00:00Z' },
    ],
    createdAt: '2026-09-04T09:45:00Z',
    updatedAt: '2026-09-04T14:00:00Z',
    slug: 'supreme-court-electoral-bonds-live-blog',
  },
  {
    id: 'story-11',
    type: 'news',
    status: 'idea',
    kicker: 'Technology',
    headline: 'Meta Announces India-Specific AI Assistant in 12 Regional Languages',
    summary:
      'Meta is set to launch a localised AI assistant covering Hindi, Tamil, Telugu, Marathi, and eight other Indian languages.',
    body: '',
    section: 'technology',
    topics: ['meta', 'ai', 'regional languages', 'technology'],
    byline: 'Kavita Reddy',
    authorId: 'user-4',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isPremium: false,
    views: 0,
    engagement: 0,
    shares: 0,
    comments: 0,
    sources: [],
    relatedStoryIds: [],
    authorNotes: 'Tip from source. Needs confirmation before pursuing.',
    activity: [
      { id: 'act-24', action: 'created', userId: 'user-4', userName: 'Kavita Reddy', timestamp: '2026-09-04T11:00:00Z' },
    ],
    createdAt: '2026-09-04T11:00:00Z',
    updatedAt: '2026-09-04T11:00:00Z',
    slug: 'meta-india-ai-assistant-regional-languages',
  },
  {
    id: 'story-12',
    type: 'video_story',
    status: 'archived',
    kicker: 'Environment',
    headline: 'Watch: Inside the Last Forest in Delhi That Survived Urbanisation',
    summary:
      'A rare look inside the Asola Bhatti Wildlife Sanctuary — the only surviving forest patch in the National Capital Region.',
    body: '<p>The Asola Bhatti Wildlife Sanctuary stands as a green island in the concrete jungle of Delhi...</p>',
    mainImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
    mainImageCaption: 'Asola Bhatti Wildlife Sanctuary',
    mainImageAlt: 'Dense forest canopy at Asola Bhatti sanctuary',
    section: 'environment',
    topics: ['asola bhatti', 'wildlife', 'delhi', 'environment', 'forest'],
    byline: 'Rajeev Menon',
    authorId: 'user-3',
    location: 'New Delhi',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isPremium: false,
    publishDate: '2026-08-15T10:00:00Z',
    views: 34500,
    engagement: 61,
    shares: 1800,
    comments: 67,
    sources: [],
    relatedStoryIds: [],
    activity: [
      { id: 'act-25', action: 'created', userId: 'user-3', userName: 'Rajeev Menon', timestamp: '2026-08-14T09:00:00Z' },
      { id: 'act-26', action: 'published', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-08-15T10:00:00Z' },
      { id: 'act-27', action: 'archived', userId: 'user-2', userName: 'Priya Nair', timestamp: '2026-09-01T08:00:00Z' },
    ],
    createdAt: '2026-08-14T09:00:00Z',
    updatedAt: '2026-09-01T08:00:00Z',
    slug: 'inside-last-forest-delhi-asola-bhatti',
  },
];

// ─── MEDIA ITEMS ─────────────────────────────────────

export const SEED_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-1',
    filename: 'parliament-session.jpg',
    url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200',
    type: 'image',
    size: 842000,
    altText: 'Parliament session in New Delhi',
    uploadedBy: 'user-1',
    uploadedAt: '2026-09-02T07:45:00Z',
    usedInStories: ['story-1'],
  },
  {
    id: 'media-2',
    filename: 'earthquake-rescue.jpg',
    url: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200',
    type: 'image',
    size: 1240000,
    altText: 'Rescue operations at earthquake site',
    uploadedBy: 'user-3',
    uploadedAt: '2026-09-04T06:05:00Z',
    usedInStories: ['story-2'],
  },
  {
    id: 'media-3',
    filename: 'semiconductor-fab.jpg',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    type: 'image',
    size: 975000,
    altText: 'Semiconductor fabrication clean room',
    uploadedBy: 'user-4',
    uploadedAt: '2026-09-01T09:30:00Z',
    usedInStories: ['story-3'],
  },
  {
    id: 'media-4',
    filename: 'aiims-research-report.pdf',
    url: 'https://example.com/documents/aiims-air-pollution-report.pdf',
    type: 'document',
    size: 3200000,
    altText: 'AIIMS Air Pollution Research Report 2026',
    uploadedBy: 'user-4',
    uploadedAt: '2026-09-01T10:00:00Z',
    usedInStories: ['story-6'],
  },
  {
    id: 'media-5',
    filename: 'asola-bhatti-documentary.mp4',
    url: 'https://example.com/videos/asola-bhatti-forest.mp4',
    type: 'video',
    size: 287000000,
    altText: 'Documentary: Inside Asola Bhatti Wildlife Sanctuary',
    uploadedBy: 'user-3',
    uploadedAt: '2026-08-14T08:00:00Z',
    usedInStories: ['story-12'],
  },
];

// ─── ADMIN USERS ─────────────────────────────────────

export const SEED_USERS: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Amit Sharma',
    email: 'amit@bharatnews.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmitSharma',
    bio: 'Senior political correspondent and admin with 12 years of experience covering Indian politics.',
    isActive: true,
    storiesCount: 47,
    joinedAt: '2024-01-15',
  },
  {
    id: 'user-2',
    name: 'Priya Nair',
    email: 'priya@bharatnews.com',
    role: 'editor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaNair',
    bio: 'Chief editor overseeing all national and international coverage.',
    isActive: true,
    storiesCount: 28,
    joinedAt: '2024-03-01',
  },
  {
    id: 'user-3',
    name: 'Rajeev Menon',
    email: 'rajeev@bharatnews.com',
    role: 'journalist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RajeevMenon',
    bio: 'Photojournalist and reporter specialising in disaster coverage and environment stories.',
    isActive: true,
    storiesCount: 63,
    joinedAt: '2023-11-20',
  },
  {
    id: 'user-4',
    name: 'Kavita Reddy',
    email: 'kavita@bharatnews.com',
    role: 'journalist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KavitaReddy',
    bio: 'Technology and economy journalist covering the startup ecosystem and public policy.',
    isActive: true,
    storiesCount: 41,
    joinedAt: '2024-06-10',
  },
  {
    id: 'user-5',
    name: 'Suresh Pillai',
    email: 'suresh@bharatnews.com',
    role: 'contributor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SureshPillai',
    bio: 'Sports and business contributor based in Mumbai.',
    isActive: true,
    storiesCount: 19,
    joinedAt: '2025-01-08',
  },
];

// ─── COMMENTS ─────────────────────────────────────────

export const SEED_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    storyId: 'story-1',
    storyTitle: 'Parliament Passes Landmark Digital Rights Bill',
    authorName: 'Deepak Verma',
    authorEmail: 'deepak.verma@gmail.com',
    content: 'Finally some action on data privacy! This bill was long overdue.',
    status: 'approved',
    createdAt: '2026-09-03T10:15:00Z',
  },
  {
    id: 'comment-2',
    storyId: 'story-1',
    storyTitle: 'Parliament Passes Landmark Digital Rights Bill',
    authorName: 'Ananya Singh',
    authorEmail: 'ananya.s@hotmail.com',
    content: 'Will this affect foreign tech companies too? The article does not make that clear.',
    status: 'approved',
    createdAt: '2026-09-03T11:30:00Z',
  },
  {
    id: 'comment-3',
    storyId: 'story-2',
    storyTitle: 'Major Earthquake Strikes Uttarakhand',
    authorName: 'Rohit Khanna',
    authorEmail: 'rohit.k@yahoo.com',
    content: 'My family is in Chamoli. This is terrifying. Please keep us updated.',
    status: 'approved',
    createdAt: '2026-09-04T07:00:00Z',
  },
  {
    id: 'comment-4',
    storyId: 'story-2',
    storyTitle: 'Major Earthquake Strikes Uttarakhand',
    authorName: 'Spammer Bot',
    authorEmail: 'spam@fakemails.net',
    content: 'CLICK HERE FOR FREE INSURANCE QUOTES EARTHQUAKE DAMAGE!!',
    status: 'spam',
    createdAt: '2026-09-04T07:30:00Z',
    isToxic: false,
  },
  {
    id: 'comment-5',
    storyId: 'story-8',
    storyTitle: 'In Pictures: Ganesh Chaturthi Celebrations Across India',
    authorName: 'Meera Iyer',
    authorEmail: 'meera.iyer@gmail.com',
    content: 'Beautiful photographs! The one from Pune is stunning.',
    status: 'approved',
    createdAt: '2026-09-02T13:00:00Z',
  },
  {
    id: 'comment-6',
    storyId: 'story-10',
    storyTitle: 'LIVE: Supreme Court Hearing on Electoral Bonds',
    authorName: 'Vikram Tiwari',
    authorEmail: 'vikram.t@outlook.com',
    content: 'This hearing is crucial for Indian democracy. Great live coverage by Bharat News!',
    status: 'pending',
    createdAt: '2026-09-04T11:00:00Z',
  },
  {
    id: 'comment-7',
    storyId: 'story-10',
    storyTitle: 'LIVE: Supreme Court Hearing on Electoral Bonds',
    authorName: 'Hate Account 99',
    authorEmail: 'hate99@throwaway.com',
    content: 'All judges are corrupt! This whole system should be burned down!!!',
    status: 'spam',
    createdAt: '2026-09-04T11:15:00Z',
    isToxic: true,
  },
  {
    id: 'comment-8',
    storyId: 'story-1',
    storyTitle: 'Parliament Passes Landmark Digital Rights Bill',
    authorName: 'Geeta Joshi',
    authorEmail: 'geeta.j@gmail.com',
    content: 'I am curious if there is any independent oversight body being set up.',
    status: 'pending',
    createdAt: '2026-09-03T14:00:00Z',
  },
  {
    id: 'comment-9',
    storyId: 'story-8',
    storyTitle: 'In Pictures: Ganesh Chaturthi Celebrations Across India',
    authorName: 'Arjun Das',
    authorEmail: 'arjun.das@gmail.com',
    content: 'Jai Ganesh! Best festival of the year.',
    status: 'approved',
    createdAt: '2026-09-02T15:00:00Z',
  },
  {
    id: 'comment-10',
    storyId: 'story-2',
    storyTitle: 'Major Earthquake Strikes Uttarakhand',
    authorName: 'Nisha Kapoor',
    authorEmail: 'nisha.kapoor@gmail.com',
    content: 'Praying for everyone affected. Is there any relief fund we can donate to?',
    status: 'pending',
    createdAt: '2026-09-04T08:45:00Z',
  },
];

// ─── HOMEPAGE LAYOUT ────────────────────────────────

export const SEED_HOMEPAGE_LAYOUT: HomepageLayout = {
  hero: ['story-1', 'story-2', 'story-8'],
  frontContent: ['story-1', 'story-deep-tech-ai-1', 'story-deep-cricket-1', 'story-deep-national-1', 'story-biz-seed-1'],
  breaking: ['story-2'],
  secondary: ['story-5', 'story-10', 'story-6'],
  latest: ['story-4', 'story-9', 'story-11', 'story-7'],
  trending: ['story-deep-tech-ai-1', 'story-deep-cricket-1', 'story-deep-national-1', 'story-biz-seed-1', 'story-biz-seed-2'],
  hindiNews: ['story-1', 'story-2', 'story-5'],
  business: ['story-biz-seed-1', 'story-biz-seed-2', 'story-biz-seed-3'],
  video: ['story-12'],
  photo: ['story-8', 'story-12'],
};

// ─── NOTIFICATIONS ───────────────────────────────────

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'breaking',
    title: 'Breaking News Alert',
    message: 'Earthquake story has been marked as breaking and pushed to front page.',
    storyId: 'story-2',
    isRead: false,
    createdAt: '2026-09-04T06:15:00Z',
  },
  {
    id: 'notif-2',
    type: 'approval_request',
    title: 'Review Requested',
    message: "Kavita Reddy submitted India's Semiconductor Push for review.",
    storyId: 'story-3',
    isRead: false,
    createdAt: '2026-09-03T14:00:00Z',
  },
  {
    id: 'notif-3',
    type: 'changes_requested',
    title: 'Changes Requested',
    message: 'Priya Nair requested changes on Reliance Industries Q2 Results.',
    storyId: 'story-9',
    isRead: false,
    createdAt: '2026-09-04T09:00:00Z',
  },
  {
    id: 'notif-4',
    type: 'published',
    title: 'Story Published',
    message: 'Parliament Passes Digital Rights Bill has been published successfully.',
    storyId: 'story-1',
    isRead: true,
    createdAt: '2026-09-03T09:00:00Z',
  },
  {
    id: 'notif-5',
    type: 'traffic_spike',
    title: 'Traffic Spike Detected',
    message: 'The earthquake story is getting 5,000 visitors/minute. Consider refreshing.',
    storyId: 'story-2',
    isRead: false,
    createdAt: '2026-09-04T08:00:00Z',
  },
  {
    id: 'notif-6',
    type: 'comment',
    title: 'New Comments Pending',
    message: '3 comments are awaiting moderation across your stories.',
    isRead: true,
    createdAt: '2026-09-04T10:30:00Z',
  },
  {
    id: 'notif-7',
    type: 'deadline',
    title: 'Upcoming Deadline',
    message: 'AIIMS Air Pollution Study is scheduled to publish in 16 hours.',
    storyId: 'story-6',
    isRead: true,
    createdAt: '2026-09-04T15:00:00Z',
  },
  {
    id: 'notif-8',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Sunday 7 Sep from 2:00 AM to 4:00 AM IST.',
    isRead: false,
    createdAt: '2026-09-04T12:00:00Z',
  },
];

// ─── NEWS SECTIONS ───────────────────────────────────

export const SEED_NEWS_SECTIONS: NewsSection[] = [
  { id: 'section-1', name: 'India', slug: 'india', color: '#FF6B35', order: 1 },
  { id: 'section-2', name: 'Politics', slug: 'politics', color: '#3B82F6', order: 2 },
  { id: 'section-3', name: 'Economy', slug: 'economy', color: '#10B981', order: 3 },
  { id: 'section-4', name: 'Technology', slug: 'technology', color: '#8B5CF6', order: 4 },
  { id: 'section-5', name: 'Health', slug: 'health', color: '#EF4444', order: 5 },
];
