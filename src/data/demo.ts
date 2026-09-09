import { Article, Category, PhotoGallery, VideoItem } from '../types';

export const CATEGORIES: Category[] = [
  { id: '1', slug: 'national', nameHi: 'देश', nameEn: 'National', description: 'देशभर की प्रमुख और ताज़ा खबरें', color: 'bg-red-600' },
  { id: '2', slug: 'politics', nameHi: 'राजनीति', nameEn: 'Politics', description: 'संसद, चुनाव और राजनीतिक गतिविधियां', color: 'bg-orange-600' },
  { id: '3', slug: 'cricket', nameHi: 'क्रिकेट', nameEn: 'Cricket', description: 'क्रिकेट मैच स्कोर, एनालिसिस और इंटरव्यू', color: 'bg-blue-600' },
  { id: '4', slug: 'entertainment', nameHi: 'मनोरंजन', nameEn: 'Entertainment', description: 'बॉलीवुड, सिनेमा और ओटीटी की दुनिया', color: 'bg-purple-600' },
  { id: '5', slug: 'business', nameHi: 'व्यापार', nameEn: 'Business', description: 'शेयर बाजार, बजट, अर्थव्यवस्था और कॉर्पोरेट', color: 'bg-emerald-600' },
  { id: '6', slug: 'tech', nameHi: 'तकनीक', nameEn: 'Tech & AI', description: 'स्मार्टफोन, आर्टिफिशियल इंटेलिजेंस और गैजेट्स', color: 'bg-cyan-600' },
  { id: '7', slug: 'world', nameHi: 'विदेश', nameEn: 'World', description: 'वैश्विक कूटनीति और अंतरराष्ट्रीय मामले', color: 'bg-indigo-600' },
  { id: '8', slug: 'lifestyle', nameHi: 'लाइफस्टाइल', nameEn: 'Lifestyle', description: 'स्वास्थ्य, योग, खानपान और पर्यटन', color: 'bg-rose-600' }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '101',
    slug: 'isro-gaganyaan-spacecraft-orbital-test-success',
    idSlug: '101-isro-gaganyaan-spacecraft-orbital-test-success',
    title: 'ISRO गगनयान मिशन: मानवरहित अंतरिक्ष यान का सफल ऑर्बिटल परीक्षण, 2027 में अंतरिक्ष में जाएंगे भारतीय अंतरिक्ष यात्री',
    titleEn: 'ISRO Gaganyaan Mission: Successful unmanned orbital test brings India closer to 2027 human spaceflight',
    excerpt: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने गगनयान परियोजना के लिए उन्नत प्रोपल्शन प्रणाली और क्रू एस्केप सिस्टम का सफल परीक्षण किया।',
    excerptEn: 'Indian Space Research Organisation achieves landmark success in Gaganyaan spacecraft orbital flight systems demonstration.',
    category: 'देश',
    categorySlug: 'national',
    author: {
      name: 'Dr. Alok Verma',
      nameHi: 'डॉ. आलोक वर्मा',
      role: 'वरिष्ठ विज्ञान संवाददाता',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 03:45 PM IST',
    updatedAt: '03 सितंबर 2026, 04:15 PM IST',
    readTime: '4 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1517976487507-59a5e01bb502?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'श्रीहरिकोटा स्थित सतीश धवन अंतरिक्ष केंद्र से परीक्षण की प्रतीकात्मक तस्वीर | स्रोत: ISRO',
    tags: ['ISRO', 'गगनयान', 'अंतरिक्ष', 'विज्ञान', 'भारत'],
    keyPoints: [
      'क्रू मॉड्यूल ने पृथ्वी की 400 किमी निचली कक्षा में स्थापित होकर सफल वापसी की।',
      'पैराशूट डिप्लॉयमेंट प्रणाली ने बंगाल की खाड़ी में सुरक्षित लैंडिंग सुनिश्चित की।',
      'प्रधानमंत्री और विज्ञान मंत्री ने इसरो के वैज्ञानिकों को ऐतिहासिक उपलब्धि पर बधाई दी।'
    ],
    body: [
      'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने आज एक ऐतिहासिक कदम बढ़ाते हुए अपने महत्वाकांक्षी गगनयान कार्यक्रम के महत्वपूर्ण चरण का सफल परीक्षण पूरा कर लिया है। श्रीहरिकोटा के सतीश धवन अंतरिक्ष केंद्र से संचालित इस मिशन में अंतरिक्ष यान की लाइफ सपोर्ट सिस्टम, हीट शील्ड और ऑर्बिटल मॉड्यूल की कार्यक्षमता का गहन परीक्षण किया गया।',
      'इसरो प्रमुख ने प्रेस वार्ता में बताया कि अंतरिक्ष यान को सफलतापूर्वक 400 किलोमीटर की लो-अर्थ ऑर्बिट में पहुंचाया गया, जहां इसने पूर्व-निर्धारित सभी वैज्ञानिक सिमुलेशन पूरे किए। इसके उपरांत सुरक्षित डी-ऑर्बिटिंग प्रक्रिया के माध्यम से कैप्सूल को बंगाल की खाड़ी में तय बिंदु पर उतारा गया। भारतीय नौसेना और तटरक्षक बल की संयुक्त टीम ने कैप्सूल को सफलतापूर्वक रिकवर किया।',
      'विशेषज्ञों के अनुसार, यह सफलता भारत के 2027 में प्रस्तावित पहले मानवयुक्त अंतरिक्ष मिशन के लिए मील का पत्थर साबित होगी। इसमें चार नामित अंतरिक्ष यात्री (गगननॉट्स) भाग लेंगे, जिन्हें रूस और भारत में कठोर प्रशिक्षण दिया गया है।'
    ],
    isBreaking: true,
    isTrending: true,
    views: 45280
  },
  {
    id: '102',
    slug: 'india-vs-australia-champions-trophy-final-preview',
    idSlug: '102-india-vs-australia-champions-trophy-final-preview',
    title: 'IND vs AUS फाइनल मुकाबला: मेलबर्न में ट्रॉफी के लिए भिड़ेंगे भारत और ऑस्ट्रेलिया, पिच रिपोर्ट और प्लेइंग इलेवन',
    titleEn: 'India vs Australia Final: Melbourne set for high-voltage Champions showdown, pitch report and key match-ups',
    excerpt: 'क्रिकेट फैंस की निगाहें महामुकाबले पर टिकी हैं। भारतीय शीर्ष क्रम फॉर्म में है और तेज गेंदबाज बुमराह की कसी हुई गेंदबाजी ऑस्ट्रेलिया के लिए चुनौती बनेगी।',
    excerptEn: 'Cricket fans gear up for an epic clash as Team India takes on Australia in the summit clash with in-form pace battery.',
    category: 'क्रिकेट',
    categorySlug: 'cricket',
    author: {
      name: 'Rajat Sharma',
      nameHi: 'रजत शर्मा',
      role: 'स्पोर्ट्स डेस्क चीफ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 02:10 PM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'मैदान पर अभ्यास के दौरान भारतीय क्रिकेट टीम | फोटो: Getty',
    tags: ['क्रिकेट', 'IND vs AUS', 'फाइनल', 'टीम इंडिया', 'खेल'],
    keyPoints: [
      'कप्तान रोहित और गिल की सलामी जोड़ी से विस्फोटक शुरुआत की उम्मीद।',
      'मेलबर्न की हरी घास वाली पिच पर टॉस जीतकर पहले गेंदबाजी करना फायदेमंद हो सकता है।',
      'भारतीय स्पिनर कुलदीप यादव का मिडिल ओवर्स में रोल निर्णायक साबित होगा।'
    ],
    body: [
      'चैंपियंस ट्रॉफी के खिताबी मुकाबले के लिए भारत और ऑस्ट्रेलिया की टीमें पूरी तरह तैयार हैं। पिछले पांच मुकाबलों में दोनों टीमों का प्रदर्शन लगभग बराबरी का रहा है, जिससे मुकाबला रोमांचक होने की पूरी संभावना है।',
      'भारतीय टीम प्रबंधन ने साफ संकेत दिए हैं कि वे विनिंग कॉम्बिनेशन के साथ ही उतरेंगे। ओपनिंग जोड़ी के मजबूत रहने से मिडिल ऑर्डर को खुलकर खेलने का मौका मिलेगा। वहीं गेंदबाजी आक्रमण की अगुआई जसप्रीत बुमराह और मोहम्मद सिराज करेंगे।',
      'ऑस्ट्रेलियाई कप्तान ने मैच पूर्व प्रेस कॉन्फ्रेंस में स्वीकार किया कि भारतीय टीम बेहद संतुलित है, लेकिन घरेलू मैदान और दर्शकों के समर्थन से वे दबाव बनाने की पूरी कोशिश करेंगे।'
    ],
    isBreaking: true,
    isTrending: true,
    views: 89400
  },
  {
    id: '103',
    slug: 'parliament-green-hydrogen-clean-energy-bill-passed',
    idSlug: '103-parliament-green-hydrogen-clean-energy-bill-passed',
    title: 'संसद में ऐतिहासिक ग्रीन एनर्जी बिल पास: 2035 तक भारत बनेगा दुनिया का सबसे बड़ा ग्रीन हाइड्रोजन एक्सपोर्टर',
    titleEn: 'Parliament passes historic Green Clean Energy Bill: India aims to lead global hydrogen exports by 2035',
    excerpt: 'दोनों सदनों की सर्वसम्मति से पारित विधेयक में नवीकरणीय ऊर्जा परियोजनाओं पर 35,000 करोड़ रुपये का इंसेंटिव पैकेज घोषित किया गया।',
    excerptEn: 'Landmark clean energy legislation receives bipartisan approval with Rs 35,000 crore manufacturing incentive fund.',
    category: 'राजनीति',
    categorySlug: 'politics',
    author: {
      name: 'Sunita Mehra',
      nameHi: 'सुनीता मेहरा',
      role: 'संसदीय ब्यूरो प्रमुख',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 01:25 PM IST',
    readTime: '5 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'संसद भवन का दृश्य और सौर ऊर्जा संयंत्र | फोटो: PTI',
    tags: ['संसद', 'राजनीति', 'ग्रीन एनर्जी', 'हाइड्रोजन', 'भारत'],
    keyPoints: [
      'सौर, पवन और हाइड्रोजन ऊर्जा के उत्पादन को बढ़ावा देने के लिए सिंगल-विंडो क्लीयरेंस।',
      'अगले 5 वर्षों में 15 लाख नए हरित रोजगार सृजित होने का अनुमान।',
      'विपक्षी दलों ने भी देशहित में बिल का समर्थन किया, कुछ संशोधनों की सिफारिश की।'
    ],
    body: [
      'संसद के मानसून सत्र के दौरान आज दोनों सदनों ने राष्ट्रीय हरित ऊर्जा एवं हाइड्रोजन संवर्धन विधेयक को मंजूरी दे दी। केंद्रीय ऊर्जा मंत्री ने विधेयक प्रस्तुत करते हुए कहा कि यह कानून भारत को वैश्विक ऊर्जा परिवर्तन की अगली पंक्ति में खड़ा करेगा।',
      'विधेयक के प्रमुख प्रावधानों में इलेक्ट्रोलाइज़र विनिर्माण पर सब्सिडी, ट्रांसमिशन शुल्क में 25 वर्षों तक की छूट और ग्रीन अमोनिया के शिपिंग के लिए विशेष पोर्ट टर्मिनल्स की स्थापना शामिल है।',
      'औद्योगिक संघों और पर्यावरणविदों ने इस कानून का स्वागत करते हुए इसे पेरिस समझौते के लक्ष्यों को हासिल करने की दिशा में मील का पत्थर करार दिया है।'
    ],
    isBreaking: false,
    isTrending: true,
    views: 31200
  },
  {
    id: '104',
    slug: 'bollywood-mega-action-thriller-1000-crore-box-office',
    idSlug: '104-bollywood-mega-action-thriller-1000-crore-box-office',
    title: 'बॉक्स ऑफिस धमाका: मेगा एक्शन थ्रिलर ने पहले हफ्ते में कमाए 1000 करोड़, तोड़े कई रिकॉर्ड',
    titleEn: 'Box Office Milestone: Mega Action Thriller crosses 1000 Crore benchmark in opening week',
    excerpt: 'दर्शकों में फिल्म को लेकर जबरदस्त क्रेज देखने को मिल रहा है। विदेशी बाजारों में भी रिकॉर्डतोड़ कमाई का सिलसिला जारी है।',
    excerptEn: 'Audience frenzy drives unprecedented box office numbers globally with packed theatres worldwide.',
    category: 'मनोरंजन',
    categorySlug: 'entertainment',
    author: {
      name: 'Pooja Kashyap',
      nameHi: 'पूजा कश्यप',
      role: 'सिनेमा विशेषज्ञ',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 12:40 PM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'सिनेमा हॉल में दर्शकों की भीड़ और फिल्म का पोस्टर | फोटो: फाइल',
    tags: ['बॉलीवुड', 'बॉक्स ऑफिस', 'मनोरंजन', 'सिनेमा', 'फिल्म'],
    keyPoints: [
      'भारत में नेट कलेक्शन 620 करोड़ रुपये के पार पहुंचा।',
      'नॉर्थ अमेरिका और खाड़ी देशों में भारतीय फिल्मों के पुराने सभी रिकॉर्ड ध्वस्त।',
      'डायरेक्टर ने सीक्वल की आधिकारिक घोषणा कर दी है।'
    ],
    body: [
      'भारतीय सिनेमा के इतिहास में एक और स्वर्णिम अध्याय जुड़ गया है। रिलीज के मात्र 7 दिनों में फिल्म ने वैश्विक स्तर पर 1000 करोड़ रुपये का जादुई आंकड़ा पार कर लिया है। मल्टीप्लेक्स से लेकर सिंगल स्क्रीन थिएटर्स तक हाउसफुल के बोर्ड टंगे हैं।',
      'ट्रेड एनालिस्ट्स का कहना है कि बेहतरीन वीएफएक्स, भावनात्मक कहानी और कलाकारों के दमदार अभिनय ने दर्शकों को सिनेमाघरों तक खींचने में बड़ी भूमिका निभाई है।',
      'फिल्म के प्रमुख अभिनेता ने सोशल मीडिया पर फैंस का आभार जताते हुए कहा कि यह सफलता पूरे भारतीय सिनेमा जगत की जीत है।'
    ],
    isBreaking: false,
    isTrending: true,
    views: 67100
  },
  {
    id: '105',
    slug: 'rbi-monetary-policy-interest-rate-repo-rate-decision',
    idSlug: '105-rbi-monetary-policy-interest-rate-repo-rate-decision',
    title: 'RBI मौद्रिक नीति: रेपो रेट में 25 बेसिस प्वाइंट की कटौती, होम लोन और कार लोन की EMI होगी सस्ती',
    titleEn: 'RBI Monetary Policy: Repo rate cut by 25 bps, relief for home and auto loan borrowers',
    excerpt: 'महंगाई दर में नियंत्रण के बाद भारतीय रिज़र्व बैंक के गवर्नर ने ब्याज दरों में कटौती का ऐलान किया, जिससे आम मध्यम वर्ग को बड़ी राहत मिलेगी।',
    excerptEn: 'Reserve Bank of India reduces benchmark repo rate citing benign inflation, paving way for lower EMIs.',
    category: 'व्यापार',
    categorySlug: 'business',
    author: {
      name: 'Vikas Malhotra',
      nameHi: 'विकास मल्होत्रा',
      role: 'मार्केट व बैंकिंग विश्लेषक',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 11:30 AM IST',
    readTime: '4 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'भारतीय रिज़र्व बैंक (RBI) मुख्यालय मुंबई | फोटो: PTI',
    tags: ['RBI', 'रेपो रेट', 'लोन', 'EMI', 'व्यापार'],
    keyPoints: [
      'रेपो रेट घटकर 6.25% पर आई, बैंक जल्द घटाएंगे अपनी लेंडिंग दरें।',
      'चालू वित्त वर्ष के लिए जीडीपी वृद्धि अनुमान 7.4% बरकरार।',
      'शेयर बाजार के सेंसेक्स और निफ्टी में 800 अंकों की तेजी दर्ज।'
    ],
    body: [
      'भारतीय रिज़र्व बैंक (RBI) की मौद्रिक नीति समिति (MPC) ने आज अपनी तीन दिवसीय बैठक के बाद मुख्य नीतिगत दर यानी रेपो रेट को 0.25% घटाकर 6.25% करने का फैसला किया है। यह कदम खुदरा महंगाई दर के संतोषजनक दायरे में बने रहने के बाद उठाया गया है।',
      'आरबीआई गवर्नर ने कहा कि वैश्विक अनिश्चितताओं के बावजूद भारत की आर्थिक बुनियाद मजबूत है। ब्याज दरों में कटौती से रियल एस्टेट, ऑटोमोबाइल और कंज्यूमर ड्यूरेबल्स सेक्टर में मांग को गति मिलेगी।',
      'प्रमुख वाणिज्यिक बैंकों जैसे एसबीआई, एचडीएफसी और आईसीआईसीआई ने संकेत दिया है कि वे अपनी एमसीएलआर और एक्सटर्नल बेंचमार्क लेंडिंग दरों में तुरंत कटौती लागू करेंगे।'
    ],
    isBreaking: true,
    isTrending: false,
    views: 41900
  },
  {
    id: '105-b2',
    slug: 'sensex-nifty-all-time-high-bull-run-stock-market',
    idSlug: '105-b2-sensex-nifty-all-time-high-bull-run-stock-market',
    title: 'शेयर बाजार में ऐतिहासिक उछाल: सेंसेक्स 85,000 और निफ्टी 26,000 के पार, विदेशी निवेशकों की भारी खरीदारी',
    titleEn: 'Stock Market Surge: Sensex breaches 85,000, Nifty crosses 26,000 amidst massive FII inflows',
    excerpt: 'भारतीय शेयर बाजार ने नया इतिहास रच दिया है। आईटी, बैंकिंग और ऑटो शेयरों में आई बंपर लिवाली से रिकॉर्ड तेजी दर्ज की गई।',
    excerptEn: 'Indian benchmark indices reach new records driven by robust quarterly earnings and institutional investment.',
    category: 'व्यापार',
    categorySlug: 'business',
    author: {
      name: 'Vikas Malhotra',
      nameHi: 'विकास मल्होत्रा',
      role: 'मार्केट व बैंकिंग विश्लेषक',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 04:30 PM IST',
    readTime: '4 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'बॉम्बे स्टॉक एक्सचेंज (BSE) दलाल स्ट्रीट मुंबई | फोटो: Reuters',
    tags: ['शेयर बाजार', 'सेंसेक्स', 'निफ्टी', 'व्यापार', 'निवेश'],
    keyPoints: [
      'निफ्टी आईटी इंडेक्स में 3.5% की जोरदार बढ़त।',
      'विदेशी संस्थागत निवेशकों (FII) ने आज 4,200 करोड़ रुपये के शेयर खरीदे।',
      'खुदरा निवेशकों के SIP निवेश ने नया 25,000 करोड़/माह का रिकॉर्ड कायम किया।'
    ],
    body: [
      'भारतीय शेयर बाजार ने आज वैश्विक बाजारों की मजबूती और घरेलू बुनियादी आंकड़ों के दम पर एक और नया मुकाम हासिल कर लिया है। बॉम्बे स्टॉक एक्सचेंज का 30 शेयरों वाला संवेदी सूचकांक (Sensex) 1,100 अंकों से अधिक की छलांग लगाकर रिकॉर्ड ऊंचाई पर बंद हुआ।',
      'बाजार विश्लेषकों का कहना है कि भारत की मजबूत जीडीपी ग्रोथ, मुद्रास्फीति में कमी और कंपनियों के बेहतर पहली तिमाही के नतीजों ने निवेशकों के भरोसे को बहुत मजबूत किया है। विशेष रूप से बैंकिंग और आईटी सेक्टर्स में विदेशी संस्थागत निवेशकों ने आक्रामक खरीदारी की।',
      'रिटेल इन्वेस्टर्स के एसआईपी (SIP) इनफ्लो में भी लगातार 18वें महीने बढ़ोतरी दर्ज की गई है, जो यह दर्शाता है कि आम भारतीय निवेशक अब शेयर बाजार को दीर्घकालिक संपत्ति निर्माण के माध्यम के रूप में देख रहे हैं।'
    ],
    isBreaking: false,
    isTrending: true,
    views: 52100
  },
  {
    id: '105-b3',
    slug: 'india-gdp-growth-fastest-growing-major-economy',
    idSlug: '105-b3-india-gdp-growth-fastest-growing-major-economy',
    title: 'भारत की जीडीपी ग्रोथ दर 7.8% पर पहुंची: दुनिया की सबसे तेजी से बढ़ती प्रमुख अर्थव्यवस्था बनी रही',
    titleEn: 'India GDP growth hits 7.8%: Remains world fast-growing major economy backed by manufacturing boom',
    excerpt: 'विनिर्माण (Manufacturing) और सेवा क्षेत्र (Services Sector) के शानदार प्रदर्शन से चालू तिमाही में आर्थिक वृद्धि दर ने सभी अनुमानों को पीछे छोड़ दिया।',
    excerptEn: 'Robust growth performance across manufacturing and service sectors propels national economic expansion.',
    category: 'व्यापार',
    categorySlug: 'business',
    author: {
      name: 'Vikas Malhotra',
      nameHi: 'विकास मल्होत्रा',
      role: 'मार्केट व बैंकिंग विश्लेषक',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 05:15 PM IST',
    readTime: '5 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'वाणिज्यिक केंद्र और वित्तीय राजधानी मुंबई का दृश्य | फोटो: Unsplash',
    tags: ['जीडीपी', 'अर्थव्यवस्था', 'भारत', 'व्यापार', 'विकास'],
    keyPoints: [
      'मैन्युफैक्चरिंग सेक्टर में 9.2% की रिकॉर्ड सालाना वृद्धि दर दर्ज।',
      'जीएसटी कलेक्शन लगातार छठे महीने 1.85 लाख करोड़ के पार।',
      'विश्व बैंक और IMF ने भारत के सालाना विकास दर अनुमान को बढ़ाकर 7.5% किया।'
    ],
    body: [
      'राष्ट्रीय सांख्यिकी कार्यालय (NSO) द्वारा जारी नवीनतम आंकड़ों के अनुसार, चालू वित्त वर्ष की पहली तिमाही में भारत की सकल घरेलू उत्पाद (GDP) वृद्धि दर 7.8 प्रतिशत दर्ज की गई है। इसके साथ ही भारत ने दुनिया की सबसे तेजी से बढ़ती प्रमुख अर्थव्यवस्था का अपना दर्जा बरकरार रखा है।',
      'मुख्य अर्थशास्त्री के अनुसार, पीएलआई (PLI) योजनाओं के तहत घरेलू उत्पादन में तेजी और इंफ्रास्ट्रक्चर पर केंद्र सरकार द्वारा किए गए पूंजीगत व्यय (Capex) का असर अब जमीन पर दिख रहा है। निजी खपत में भी ग्रामीण क्षेत्रों में रिकवरी देखी गई है।',
      'अंतर्राष्ट्रीय वित्तीय संस्थानों जैसे आईएमएफ (IMF) और विश्व बैंक ने भारत के आर्थिक सुधारों और डिजिटल पब्लिक इंफ्रास्ट्रक्चर की सराहना करते हुए कहा है कि वैश्विक सुस्ती के बीच भारत दुनिया का प्रमुख ग्रोथ इंजन बना हुआ है।'
    ],
    isBreaking: true,
    isTrending: true,
    views: 63400
  },
  {
    id: '105-b4',
    slug: 'startup-funding-winter-ends-unicorn-boom-india',
    idSlug: '105-b4-startup-funding-winter-ends-unicorn-boom-india',
    title: 'भारतीय स्टार्टअप्स में फिर लौटी बहार: फंड रेजिंग में 40% उछाल, इस महीने बने 3 नए यूनिकॉर्न',
    titleEn: 'Indian Startup Funding Winter Ends: Investments rebound 40%, 3 new Unicorns minted this month',
    excerpt: 'फिनटेक, क्लाइमेट टेक और एआई स्टार्टअप्स में विदेशी वेंचर कैपिटल फंड्स ने भारी निवेश किया है, जिससे स्टार्टअप इकोसिस्टम में नई जान आई है।',
    excerptEn: 'Fintech, ClimateTech, and DeepTech startups lead funding resurgence across Indian innovation hubs.',
    category: 'व्यापार',
    categorySlug: 'business',
    author: {
      name: 'Vikas Malhotra',
      nameHi: 'विकास मल्होत्रा',
      role: 'मार्केट व बैंकिंग विश्लेषक',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 06:00 PM IST',
    readTime: '4 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'बेंगलुरु स्थित स्टार्टअप हब और इनोवेटर्स वर्कस्पेस | फोटो: StartupIndia',
    tags: ['स्टार्टअप', 'यूनिकॉर्न', 'फंडिंग', 'व्यापार', 'टेक्नोलॉजी'],
    keyPoints: [
      'चालू तिमाही में स्टार्टअप्स ने $3.2 बिलियन की कुल फंडिंग जुटाई।',
      'बेंगलुरु, दिल्ली-एनसीआर और मुंबई बने टॉप इन्वेस्टमेंट डेस्टिनेशन।',
      'डीप-टेक और एआई श्रेणी में पिछले साल की तुलना में 120% की बढ़त।'
    ],
    body: [
      'लंबे समय से जारी स्टार्टअप्स की फंडिंग सुस्ती (Funding Winter) अब आधिकारिक रूप से समाप्त होती दिख रही है। ताज़ा तिमाही आंकड़ों के मुताबिक भारतीय स्टार्टअप्स में होने वाले वेंचर कैपिटल (VC) निवेश में 40 प्रतिशत की मजबूत बढ़ोतरी दर्ज की गई है।',
      'इस महीने 3 नए टेक्नोलॉजी स्टार्टअप्स ने 1 अरब डॉलर (Unicorn) का मूल्यांकन पार कर लिया है। इनमें दो आर्टिफिशियल इंटेलिजेंस इंफ्रास्ट्रक्चर स्टार्टअप्स और एक रिन्यूएबल एनर्जी सप्लाई चेन प्लेटफॉर्म शामिल हैं।',
      'विशेषज्ञों का मानना है कि भारतीय स्टार्टअप अब लाभप्रदता (Profitability) और टिकाऊ बिजनेस मॉडल पर ध्यान केंद्रित कर रहे हैं, जिससे वैश्विक और घरेलू निवेशक लंबी अवधि के लिए भारत पर बड़ा दांव लगा रहे हैं।'
    ],
    isBreaking: false,
    isTrending: true,
    views: 48900
  },
  {
    id: '106',
    slug: 'india-launches-indigenous-quantum-supercomputer-ai',
    idSlug: '106-india-launches-indigenous-quantum-supercomputer-ai',
    title: 'भारत ने लॉन्च किया पहला स्वदेशी क्वांटम सुपरकंप्यूटर: मौसम पूर्वानुमान, दवा निर्माण और साइबर सुरक्षा में क्रांति',
    titleEn: 'India unveils first indigenous Quantum Supercomputer: Breakthrough for Weather Forecasting and AI Research',
    excerpt: 'सी-डैक और आईआईटी के वैज्ञानिकों द्वारा विकसित 100-क्यूबिट क्वांटम प्रोसेसर सामान्य कंप्यूटर से लाखों गुना तेज गणना करने में सक्षम है।',
    excerptEn: 'Scientists at C-DAC and premier IITs unveil 100-qubit processor accelerating national research capabilities.',
    category: 'तकनीक',
    categorySlug: 'tech',
    author: {
      name: 'Ananya Deshmukh',
      nameHi: 'अनन्या देशमुख',
      role: 'टेक एडिटर',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 10:15 AM IST',
    readTime: '4 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'क्वांटम कंप्यूटिंग लैब का प्रतीकात्मक दृश्य | फोटो: Unsplash',
    tags: ['क्वांटम', 'सुपरकंप्यूटर', 'तकनीक', 'AI', 'विज्ञान'],
    keyPoints: [
      '100-क्यूबिट सुपरकंडक्टिंग क्यूबिट आर्किटेक्चर पर आधारित।',
      'दवाओं के अणुओं के व्यवहार की गणना कुछ सेकंडों में संभव होगी।',
      'भारतीय स्टार्टअप्स और विश्वविद्यालयों को क्लाउड एक्सेस प्रदान किया जाएगा।'
    ],
    body: [
      'भारत ने विज्ञान और प्रौद्योगिकी के क्षेत्र में एक नई छलांग लगाते हुए अपने पहले पूर्णतः स्वदेशी क्वांटम सुपरकंप्यूटर का अनावरण किया है। नई दिल्ली में आयोजित राष्ट्रीय विज्ञान कॉन्क्लेव में इसका उद्घाटन किया गया।',
      'इस सुपरकंप्यूटर का निर्माण नेशनल क्वांटम मिशन के तहत किया गया है। यह जटिल क्रिप्टोग्राफी, जलवायु परिवर्तन सिमुलेशन और जीन सीक्वेंसिंग जैसी गणनाओं को पारंपरिक सुपरकंप्यूटरों की तुलना में कई गुना तेजी से पूरा कर सकता है।',
      'अधिकारियों ने बताया कि यह सुविधा देश के शोधकर्ताओं, शोध संस्थानों और टेक उद्यमियों के लिए एक राष्ट्रीय क्लाउड नेटवर्क के माध्यम से सुलभ होगी, जिससे आयातित तकनीकों पर निर्भरता घटेगी।'
    ],
    isBreaking: false,
    isTrending: true,
    views: 28750
  },
  {
    id: '107',
    slug: 'un-security-council-diplomatic-summit-climate-crisis',
    idSlug: '107-un-security-council-diplomatic-summit-climate-crisis',
    title: 'संयुक्त राष्ट्र शिखर सम्मेलन: भारत ने उठाया ग्लोबल साउथ का मुद्दा, जलवायु वित्त पर विकसित देशों को घेरा',
    titleEn: 'UN Summit: India champions Global South cause, urges developed nations on promised climate finance',
    excerpt: 'न्यूयॉर्क में आयोजित उच्चस्तरीय बैठक में भारतीय विदेश मंत्री ने कहा कि बिना वित्तीय और तकनीकी सहायता के नेट-जीरो लक्ष्य हासिल करना असंभव है।',
    excerptEn: 'External Affairs Minister emphasizes equity and accountability in multilateral climate negotiations in New York.',
    category: 'विदेश',
    categorySlug: 'world',
    author: {
      name: 'Sunita Mehra',
      nameHi: 'सुनीता मेहरा',
      role: 'संसदीय ब्यूरो प्रमुख',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 09:30 AM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'संयुक्त राष्ट्र महासभा भवन न्यूयॉर्क | फोटो: Reuters',
    tags: ['संयुक्त राष्ट्र', 'विदेश', 'कूटनीति', 'जलवायु', 'भारत'],
    body: [
      'संयुक्त राष्ट्र के वार्षिक उच्चस्तरीय सत्र में भारत ने विकासशील और अल्पविकसित देशों (ग्लोबल साउथ) की प्राथमिकताओं को पुरजोर तरीके से रखा। भारतीय प्रतिनिधिमंडल ने स्पष्ट किया कि विकसित देशों को अपने 100 अरब डॉलर वार्षिक जलवायु कोष के वादे को पूरी ईमानदारी से निभाना होगा।',
      'सम्मेलन में भारतीय नवाचारों जैसे अंतर्राष्ट्रीय सौर गठबंधन (ISA) और लाइफस्टाइल फॉर एनवायरनमेंट (LiFE) मिशन की व्यापक सराहना की गई।',
      'विभिन्न वैश्विक नेताओं के साथ द्विपक्षीय बैठकों में व्यापार गलियारों और डिजिटल सार्वजनिक अवसंरचना (DPI) के आदान-प्रदान पर भी सहमति बनी।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 19400
  },
  {
    id: '108',
    slug: 'yoga-ayurveda-daily-routine-modern-stress-relief',
    idSlug: '108-yoga-ayurveda-daily-routine-modern-stress-relief',
    title: 'लाइफस्टाइल टिप्स: भागदौड़ भरी जिंदगी में तनाव मुक्त रहने के लिए 5 आसान योगासन और आयुर्वेदिक नियम',
    titleEn: 'Lifestyle Tips: 5 easy Yoga asanas and Ayurvedic daily habits to reduce modern workplace stress',
    excerpt: 'दिनभर कंप्यूटर स्क्रीन पर काम करने और मानसिक तनाव से बचने के लिए अनुलोम-विलोम और भ्रामरी प्राणायाम बेहद असरदार हैं।',
    excerptEn: 'Expert wellness tips combining ancient Ayurvedic wisdom with practical micro-habits for urban professionals.',
    category: 'लाइफस्टाइल',
    categorySlug: 'lifestyle',
    author: {
      name: 'Pooja Kashyap',
      nameHi: 'पूजा कश्यप',
      role: 'सिनेमा व वेलनेस विशेषज्ञ',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 08:45 AM IST',
    readTime: '4 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'सूर्योदय के समय ध्यान और योग करती साधक | फोटो: Unsplash',
    tags: ['योग', 'स्वास्थ्य', 'आयुर्वेद', 'लाइफस्टाइल', 'तनाव'],
    body: [
      'आधुनिक कॉर्पोरेट जीवनशैली में लंबे समय तक बैठे रहने और लगातार डिजिटल उपकरणों के उपयोग से शारीरिक और मानसिक स्वास्थ्य पर नकारात्मक असर पड़ रहा है। स्वास्थ्य विशेषज्ञों का मानना है कि दैनिक दिनचर्या में 20 मिनट का योग शामिल करके कई बीमारियों से बचा जा सकता है।',
      'आयुर्वेद के अनुसार, प्रातःकाल गुनगुना पानी पीना, भोजन के समय एकाग्र रहना और रात्रि में सोने से एक घंटा पहले स्क्रीन से दूरी बनाना नींद की गुणवत्ता में 40% तक सुधार ला सकता है।',
      'ग्रीवा संचालन और ताड़ासन जैसे सरल अभ्यास गर्दन और रीढ़ की हड्डी के तनाव को दूर करने में तुरंत सहायता करते हैं।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 15300
  },
  {
    id: '109',
    slug: 'delhi-mumbai-bullet-train-project-trial-run-date',
    idSlug: '109-delhi-mumbai-bullet-train-project-trial-run-date',
    title: 'दिल्ली-मुंबई हाई-स्पीड रेल कॉरिडोर: पहले चरण का ट्रायल रन अगले वर्ष, 320 किमी/घंटा होगी रफ्तार',
    titleEn: 'High-speed bullet train corridor trial runs announced: 320 km/h speed to cut travel time',
    excerpt: 'रेल मंत्रालय ने बुलेट ट्रेन परियोजना के ट्रैक निर्माण कार्य की प्रगति रिपोर्ट जारी की, गुजरात और महाराष्ट्र के बीच सिग्नलिंग टेस्ट अंतिम चरण में।',
    excerptEn: 'Railway Ministry reviews high-speed bullet train corridor as viaduct completion hits 80 percent.',
    category: 'देश',
    categorySlug: 'national',
    author: {
      name: 'Dr. Alok Verma',
      nameHi: 'डॉ. आलोक वर्मा',
      role: 'वरिष्ठ विज्ञान संवाददाता',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 08:00 AM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'हाई स्पीड आधुनिक ट्रेन का प्रतीकात्मक दृश्य | फोटो: Pixabay',
    tags: ['रेलवे', 'बुलेट ट्रेन', 'देश', 'इन्फ्रास्ट्रक्चर'],
    body: [
      'भारतीय रेल नेटवर्क के आधुनिकीकरण में ऐतिहासिक प्रगति दर्ज करते हुए हाई-स्पीड रेल कॉर्पोरेशन ने घोषणा की है कि सूरत और बिलिमोरा के बीच पहला परीक्षण अगले वर्ष की पहली तिमाही में आयोजित किया जाएगा।',
      'इस परियोजना के तहत उपयोग की जाने वाली शिनकानसेन तकनीक भूकंप और तेज हवाओं के दौरान भी ट्रेनों के सुरक्षित परिचालन की गारंटी देती है।'
    ],
    isBreaking: false,
    isTrending: true,
    views: 39100
  },
  {
    id: '110',
    slug: 'election-commission-announces-digital-voting-pilot',
    idSlug: '110-election-commission-announces-digital-voting-pilot',
    title: 'चुनाव आयोग का बड़ा कदम: प्रवासी भारतीयों और वरिष्ठ नागरिकों के लिए पायलट डिजिटल वोटिंग फ्रेमवर्क तैयार',
    titleEn: 'Election Commission initiates secure digital voting pilot framework for migrant workers and senior citizens',
    excerpt: 'ब्लॉकचेन और बायोमेट्रिक ऑथेंटिकेशन आधारित सुरक्षित प्रणाली का पहले स्थानीय निकाय चुनावों में परीक्षण किया जाएगा।',
    excerptEn: 'Secure blockchain-assisted remote voting system designed to enhance democratic participation.',
    category: 'राजनीति',
    categorySlug: 'politics',
    author: {
      name: 'Sunita Mehra',
      nameHi: 'सुनीता मेहरा',
      role: 'संसदीय ब्यूरो प्रमुख',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 07:15 AM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'मतदान केंद्र और मतदाता सूची | फोटो: PTI',
    tags: ['चुनाव आयोग', 'वोटिंग', 'राजनीति', 'लोकतंत्र'],
    body: [
      'निर्वाचन आयोग ने आज एक नई दूरस्थ मतदान प्रणाली का मसौदा जारी किया है। इसके माध्यम से ऐसे नागरिक जो रोजगार या पढ़ाई के कारण अपने गृह राज्य से दूर रहते हैं, वे मतदान केंद्रों पर पहुंचे बिना मताधिकार का प्रयोग कर सकेंगे।',
      'आयोग ने स्पष्ट किया कि सुरक्षा मानकों से कोई समझौता नहीं किया जाएगा और सभी प्रमुख राजनीतिक दलों के साथ बहु-स्तरीय परामर्श के बाद ही इसे व्यापक स्तर पर लागू किया जाएगा।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 22100
  },
  {
    id: '111',
    slug: 'rohit-sharma-virat-kohli-partnership-record-partnership',
    idSlug: '111-rohit-sharma-virat-kohli-partnership-record-partnership',
    title: 'विराट-रोहित की जोड़ी ने रचा नया इतिहास: वनडे में 10,000 रन की साझेदारी पूरी करने वाली दुनिया की सबसे सफल जोड़ी',
    titleEn: 'Rohit-Kohli pair creates history: Surpasses 10,000 partnership runs in ODI cricket',
    excerpt: 'क्रिकेट के दोनों दिग्गजों ने मिलकर 50 से अधिक शतकीय और अर्धशतकीय साझेदारियां की हैं, जिससे भारत को दर्जनों ऐतिहासिक जीत मिलीं।',
    excerptEn: 'Legendary Indian batting duo sets another all-time record with stupendous mutual consistency.',
    category: 'क्रिकेट',
    categorySlug: 'cricket',
    author: {
      name: 'Rajat Sharma',
      nameHi: 'रजत शर्मा',
      role: 'स्पोर्ट्स डेस्क चीफ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 06:30 AM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'बल्लेबाजी के दौरान बातचीत करते दोनों भारतीय बल्लेबाज | फोटो: Getty Images',
    tags: ['क्रिकेट', 'विराट कोहली', 'रोहित शर्मा', 'रिकॉर्ड'],
    body: [
      'अंतरराष्ट्रीय क्रिकेट परिषद (ICC) के आंकड़ों के मुताबिक, भारतीय क्रिकेट के दो सबसे बड़े स्तंभों ने एक और ऐतिहासिक मील का पत्थर पार कर लिया है। क्रिकेट इतिहास में यह उपलब्धि हासिल करने वाली यह केवल दूसरी जोड़ी है।',
      'पूर्व दिग्गज क्रिकेटरों और प्रशंसकों ने दोनों खिलाड़ियों की खेल भावना, फिटनेस और निरंतरता की सराहना की है।'
    ],
    isBreaking: false,
    isTrending: true,
    views: 74200
  },
  {
    id: '112',
    slug: 'new-foldable-smartphone-generation-battery-breakthrough',
    idSlug: '112-new-foldable-smartphone-generation-battery-breakthrough',
    title: 'फोल्डेबल स्मार्टफोन्स की नई पीढ़ी: सिलिकॉन-एनोड बैटरी के साथ 3 दिन का बैकअप, सिर्फ 15 मिनट में फुल चार्ज',
    titleEn: 'Next-Gen Foldable Smartphones unveiled with Silicon-Anode batteries: 3-day backup and ultra-fast charging',
    excerpt: 'स्मार्टफोन निर्माताओं ने टिकाऊ टाइटेनियम हिंज और क्रीज-फ्री अल्ट्रा-थिन ग्लास के साथ नई फ्लैगशिप सीरीज पेश की।',
    excerptEn: 'Revolutionary silicon-carbon battery chemistry enables sleek foldables without battery compromise.',
    category: 'तकनीक',
    categorySlug: 'tech',
    author: {
      name: 'Ananya Deshmukh',
      nameHi: 'अनन्या देशमुख',
      role: 'टेक एडिटर',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '03 सितंबर 2026, 05:45 AM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'अत्याधुनिक स्मार्टफोन और वायरलेस गैजेट्स | फोटो: Unsplash',
    tags: ['गैजेट्स', 'स्मार्टफोन', 'तकनीक', 'बैटरी'],
    body: [
      'वैश्विक मोबाइल एक्सपो में आज पेश किए गए नए फोल्डेबल स्मार्टफोन्स ने तकनीकी जगत का ध्यान आकर्षित किया है। सिलिकॉन-कार्बन बैटरी तकनीक के कारण पतले डिजाइन में भी 6500mAh की बड़ी बैटरी दी गई है।',
      'साथ ही ऑन-डिवाइस जेनेरेटिव एआई फीचर्स बिना इंटरनेट के भी रियल-टाइम वॉयस ट्रांसलेशन और फोटो एडिटिंग में सक्षम हैं।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 31800
  },
  {
    id: '113',
    slug: 'indian-cinema-cannes-film-festival-standing-ovation',
    idSlug: '113-indian-cinema-cannes-film-festival-standing-ovation',
    title: 'कान फिल्म फेस्टिवल में भारतीय इंडी फिल्म को 10 मिनट का स्टैंडिंग ओवेशन, जूरी ने बांधे तारीफों के पुल',
    titleEn: 'Indian Indie Film receives 10-minute standing ovation at prestigious film festival',
    excerpt: 'ग्रामीण भारत की मानवीय संवेदनाओं पर आधारित फिल्म ने अंतरराष्ट्रीय समीक्षकों का दिल जीत लिया, प्रतिष्ठित अवॉर्ड के लिए नामांकित।',
    excerptEn: 'Deeply evocative drama touching grassroots social resilience wins universal acclaim in Europe.',
    category: 'मनोरंजन',
    categorySlug: 'entertainment',
    author: {
      name: 'Pooja Kashyap',
      nameHi: 'पूजा कश्यप',
      role: 'सिनेमा विशेषज्ञ',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '02 सितंबर 2026, 09:20 PM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'फिल्म फेस्टिवल का रेड कार्पेट दृश्य | फोटो: Unsplash',
    tags: ['सिनेमा', 'फिल्म फेस्टिवल', 'मनोरंजन', 'कलाकार'],
    body: [
      'विश्व प्रसिद्ध फिल्म समारोह में भारतीय स्वतंत्र सिनेमा ने एक बार फिर अपनी सशक्त छाप छोड़ी है। स्क्रीनिंग के बाद उपस्थित दर्शकों और जूरी सदस्यों ने खड़े होकर तालियों से टीम का स्वागत किया।',
      'फिल्म के निर्देशक ने कहा कि यह सम्मान उन सभी कलाकारों की मेहनत का परिणाम है जिन्होंने सीमित संसाधनों में इस कहानी को जीवंत किया।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 26400
  },
  {
    id: '114',
    slug: 'indian-economy-fdi-inflows-manufacturing-surge',
    idSlug: '114-indian-economy-fdi-inflows-manufacturing-surge',
    title: 'भारतीय मैन्युफैक्चरिंग सेक्टर में रिकॉर्ड एफडीआई: इलेक्ट्रॉनिक्स और सेमीकंडक्टर प्लांट्स में 50 अरब डॉलर का निवेश',
    titleEn: 'India manufacturing records landmark Foreign Direct Investment in semiconductor and EV ecosystem',
    excerpt: 'ग्लोबल सप्लाई चेन में भारत की हिस्सेदारी लगातार बढ़ रही है। नए संयंत्रों से घरेलू उत्पादन और रोजगार में भारी उछाल दर्ज।',
    excerptEn: 'Robust global investor confidence drives strategic capital influx into Indian industrial hubs.',
    category: 'व्यापार',
    categorySlug: 'business',
    author: {
      name: 'Vikas Malhotra',
      nameHi: 'विकास मल्होत्रा',
      role: 'मार्केट व बैंकिंग विश्लेषक',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '02 सितंबर 2026, 07:45 PM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'हाई-टेक रोबोटिक मैन्युफैक्चरिंग असेंबली लाइन | फोटो: Pixabay',
    tags: ['व्यापार', 'अर्थव्यवस्था', 'FDI', 'मेक इन इंडिया'],
    body: [
      'वाणिज्य मंत्रालय के ताजा आंकड़ों के अनुसार चालू वित्त वर्ष के पहले छह महीनों में प्रत्यक्ष विदेशी निवेश (FDI) में 28 प्रतिशत की वृद्धि दर्ज की गई है। विशेष रूप से सेमीकंडक्टर फैब्रिकेशन और ईवी बैटरी असेंबली में प्रमुख वैश्विक कंपनियों ने निवेश किया है।',
      'नीति निर्माताओं का अनुमान है कि इससे निर्यात को बढ़ावा मिलेगा और चालू खाता घाटे में कमी आएगी।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 18900
  },
  {
    id: '115',
    slug: 'global-oil-prices-fluctuate-middle-east-diplomacy',
    idSlug: '115-global-oil-prices-fluctuate-middle-east-diplomacy',
    title: 'कच्चे तेल की कीमतों में नरमी: ओपेक प्लस देशों की बैठक के बाद ब्रेंट क्रूड 72 डॉलर प्रति बैरल पर पहुंचा',
    titleEn: 'Global crude oil prices stabilize around 72 dollars per barrel following OPEC+ deliberations',
    excerpt: 'अंतरराष्ट्रीय ऊर्जा बाजार में स्थिरता से भारत जैसे आयातक देशों के आयात बिल में राहत मिलेगी, पेट्रोल-डीजल की कीमतें स्थिर रहने के आसार।',
    excerptEn: 'Energy markets react positively to steady production quotas easing pressure on emerging economies.',
    category: 'विदेश',
    categorySlug: 'world',
    author: {
      name: 'Sunita Mehra',
      nameHi: 'सुनीता मेहरा',
      role: 'संसदीय ब्यूरो प्रमुख',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '02 सितंबर 2026, 06:15 PM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'तेल रिफाइनरी और स्टोरेज टैंक | फोटो: Unsplash',
    tags: ['क्रूड ऑयल', 'विदेश', 'व्यापार', 'ऊर्जा'],
    body: [
      'वैश्विक बाजारों में कच्चे तेल की कीमतों में आई नरमी ने एशियाई अर्थव्यवस्थाओं को बड़ी राहत दी है। ओपेक प्लस देशों ने उत्पादन को नियंत्रित रखने के साथ मांग के अनुसार आपूर्ति बढ़ाने का लचीला रुख अपनाया है।',
      'विशेषज्ञों का कहना है कि डॉलर इंडेक्स में स्थिरता रहने पर ईंधन की कीमतों में और कमी देखने को मिल सकती है।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 14700
  },
  {
    id: '116',
    slug: 'smart-cities-delhi-ncr-urban-afforestation-forest',
    idSlug: '116-smart-cities-delhi-ncr-urban-afforestation-forest',
    title: 'मियावाकी पद्धति से दिल्ली-एनसीआर में बनाए गए 50 नए शहरी वन: प्रदूषण स्तर में 22% तक गिरावट',
    titleEn: 'Urban afforestation revolution: 50 Miyawaki micro-forests planted across NCR reduce local PM2.5 levels',
    excerpt: 'शहरी विकास मंत्रालय और पर्यावरण संगठनों की संयुक्त पहल से कॉलोनियों और पार्कों में घने हरियाली क्षेत्र विकसित किए गए।',
    excerptEn: 'Dense indigenous micro-forests show remarkable resilience in curbing metropolitan smog and urban heat islands.',
    category: 'देश',
    categorySlug: 'national',
    author: {
      name: 'Dr. Alok Verma',
      nameHi: 'डॉ. आलोक वर्मा',
      role: 'वरिष्ठ विज्ञान संवाददाता',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '02 सितंबर 2026, 04:30 PM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'घने वृक्ष और प्राकृतिक शहरी वन | फोटो: Unsplash',
    tags: ['पर्यावरण', 'प्रदूषण', 'दिल्ली', 'शहरी वन', 'देश'],
    body: [
      'दिल्ली-एनसीआर में वायु गुणवत्ता सुधारने के लिए शुरू किए गए मियावाकी अर्बन फॉरेस्ट प्रोजेक्ट के उत्साहजनक परिणाम सामने आए हैं। वैज्ञानिक अध्ययनों से पता चला है कि इन वनों के आसपास स्थानीय तापमान में 2 से 3 डिग्री सेल्सियस की कमी आई है।',
      'परियोजना को अब अन्य प्रमुख महानगरों जैसे लखनऊ, जयपुर और पटना में भी विस्तारित किया जा रहा है।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 20100
  },
  {
    id: '117',
    slug: 'women-cricket-premier-league-thriller-last-ball-six',
    idSlug: '117-women-cricket-premier-league-thriller-last-ball-six',
    title: 'महिला क्रिकेट लीग का रोमांचक मुकाबला: आखिरी गेंद पर छक्का मारकर जीती टीम, स्टेडियम में झूम उठे दर्शक',
    titleEn: 'Women Cricket League thriller: Unbelievable last-ball maximum seals dramatic victory',
    excerpt: 'अंतिम ओवर में जीत के लिए चाहिए थे 18 रन। युवा भारतीय बल्लेबाज ने लगातार दो चौके और अंतिम गेंद पर गगनचुंबी छक्का जड़कर दिलाई जीत।',
    excerptEn: 'Young batting sensation shows nerves of steel in high-stakes run chase before packed stands.',
    category: 'क्रिकेट',
    categorySlug: 'cricket',
    author: {
      name: 'Rajat Sharma',
      nameHi: 'रजत शर्मा',
      role: 'स्पोर्ट्स डेस्क चीफ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '02 सितंबर 2026, 03:00 PM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'क्रिकेट स्टेडियम में फ्लडलाइट्स और दर्शक | फोटो: Unsplash',
    tags: ['क्रिकेट', 'महिला क्रिकेट', 'खेल', 'टी20'],
    body: [
      'महिला टी20 क्रिकेट के सबसे रोमांचक मुकाबलों में से एक में आज दर्शकों को सांसे रोक देने वाला मैच देखने को मिला। दबाव भरी परिस्थितियों में युवा खिलाड़ी की आक्रामक पारी ने टीम को लगभग हारी हुई बाजी जिता दी।',
      'सोशल मीडिया पर मैच के वीडियो क्लिप्स तेजी से वायरल हो रहे हैं और खेल प्रेमियों द्वारा टीम के जुझारू जज्बे की सराहना की जा रही है।'
    ],
    isBreaking: false,
    isTrending: true,
    views: 48900
  },
  {
    id: '118',
    slug: 'superfood-millet-revolution-global-dietary-trends',
    idSlug: '118-superfood-millet-revolution-global-dietary-trends',
    title: 'सुपरफूड मिलेट्स (श्री अन्न): भारतीय बाजरा, रागी और ज्वार की दुनिया भर में बढ़ी मांग, स्वास्थ्य के लिए वरदान',
    titleEn: 'The Global Millet Revolution: How Indian coarse grains became the new international wellness staple',
    excerpt: 'मधुमेह और हृदय रोगियों के लिए मिलेट्स का सेवन अत्यधिक लाभकारी सिद्ध हो रहा है। फाइव स्टार होटलों के मेन्यू में भी शामिल हुआ मिलेट पास्ता।',
    excerptEn: 'Nutrient-rich ancient grains capture health food markets globally as climate-resilient superfoods.',
    category: 'लाइफस्टाइल',
    categorySlug: 'lifestyle',
    author: {
      name: 'Pooja Kashyap',
      nameHi: 'पूजा कश्यप',
      role: 'सिनेमा व वेलनेस विशेषज्ञ',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '02 सितंबर 2026, 01:10 PM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'विभिन्न प्रकार के पारंपरिक अनाज और मिलेट्स | फोटो: Unsplash',
    tags: ['मिलेट्स', 'श्री अन्न', 'खानपान', 'लाइफस्टाइल', 'स्वास्थ्य'],
    body: [
      'पोषक तत्वों से भरपूर मोटे अनाजों की लोकप्रियता विश्व स्तर पर नई ऊंचाइयों पर पहुंच गई है। डॉक्टरों और पोषण विशेषज्ञों के अनुसार, उच्च फाइबर और कम ग्लाइसेमिक इंडेक्स के कारण मिलेट्स ब्लड शुगर को नियंत्रित रखने में अचूक हैं।',
      'किसानों को भी इन फसलों की कम पानी वाली खेती से बेहतर मुनाफा प्राप्त हो रहा है।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 16700
  },
  {
    id: '119',
    slug: 'chandrayaan-sample-return-isro-lunar-rock-analysis',
    idSlug: '119-chandrayaan-sample-return-isro-lunar-rock-analysis',
    title: 'चंद्रयान सैंपल रिटर्न मिशन: चंद्रमा के दक्षिणी ध्रुव की मिट्टी और चट्टानों के नमूनों में मिले दुर्लभ खनिज और पानी के अंश',
    titleEn: 'Lunar Sample Return Mission: Rare minerals and hydroxyl traces confirmed in Moon rock analysis',
    excerpt: 'इसरो और राष्ट्रीय प्रयोगशालाओं के वैज्ञानिकों द्वारा जारी प्रारंभिक शोध पत्र में चंद्रमा की उत्पत्ति से जुड़े नए प्रमाण सामने आए हैं।',
    excerptEn: 'Indian space scientists publish groundbreaking peer-reviewed findings on lunar geology samples.',
    category: 'तकनीक',
    categorySlug: 'tech',
    author: {
      name: 'Dr. Alok Verma',
      nameHi: 'डॉ. आलोक वर्मा',
      role: 'वरिष्ठ विज्ञान संवाददाता',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '02 सितंबर 2026, 11:00 AM IST',
    readTime: '4 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'चंद्रमा की सतह और अंतरिक्ष यान | फोटो: NASA/ISRO',
    tags: ['इसरो', 'चंद्रयान', 'अंतरिक्ष', 'विज्ञान'],
    body: [
      'चंद्रमा के सुदूर दक्षिणी ध्रुव से सुरक्षित रूप से धरती पर लाए गए नमूनों की पहली आधिकारिक रिपोर्ट आज जारी की गई। स्पेक्ट्रोस्कोपिक विश्लेषण में टाइटेनियम, आयरन ऑक्साइड और हाइड्रॉक्सिल अणुओं की प्रचुर मौजूदगी पाई गई है।',
      'यह खोज भविष्य के स्थायी मून बेस और चंद्र कॉलोनी की संभावनाओं को नई मजबूती प्रदान करती है।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 29500
  },
  {
    id: '120',
    slug: 'ayodhya-varanasi-spiritual-tourism-cultural-corridor',
    idSlug: '120-ayodhya-varanasi-spiritual-tourism-cultural-corridor',
    title: 'आध्यात्मिक पर्यटन में अभूतपूर्व उछाल: अयोध्या, काशी और उज्जैन में इस वर्ष 25 करोड़ से अधिक श्रद्धालुओं का आगमन',
    titleEn: 'Spiritual Tourism Boom: Over 25 crore pilgrims visit Ayodhya, Kashi, and Ujjain corridors this year',
    excerpt: 'उन्नत रेल कनेक्टिविटी, अंतरराष्ट्रीय हवाई अड्डों और बेहतर आतिथ्य सेवाओं से स्थानीय अर्थव्यवस्था को 40,000 करोड़ का बूस्ट मिला।',
    excerptEn: 'Modernized civic infrastructure and cultural corridors trigger historic surge in domestic tourism economy.',
    category: 'देश',
    categorySlug: 'national',
    author: {
      name: 'Dr. Alok Verma',
      nameHi: 'डॉ. आलोक वर्मा',
      role: 'वरिष्ठ संवाददाता',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '02 सितंबर 2026, 09:15 AM IST',
    readTime: '3 मिनट',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'वाराणसी के घाट पर भव्य गंगा आरती का दृश्य | फोटो: Unsplash',
    tags: ['पर्यटन', 'अयोध्या', 'काशी', 'संस्कृति', 'देश'],
    body: [
      'पर्यटन मंत्रालय की नवीनतम रिपोर्ट में सांस्कृतिक एवं आध्यात्मिक पर्यटन को देश के सेवा क्षेत्र का सबसे तेजी से बढ़ता हुआ इंजन बताया गया है। बेहतर सड़कों और वंदे भारत ट्रेनों की सुविधा से परिवार सहित यात्राएं सुगम हुई हैं।',
      'स्थानीय हस्तशिल्प, खानपान और होमस्टे संचालकों की आय में रिकॉर्ड वृद्धि दर्ज की गई है।'
    ],
    isBreaking: false,
    isTrending: false,
    views: 33400
  }
];

export const DEMO_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    idSlug: 'v1-isro-gaganyaan-space-capsule-test-run',
    title: 'Gaganyaan Space Capsule Trial Launch | Full Flight Video and Ground Control Briefing',
    titleHi: 'गगनयान स्पेस कैप्सूल का लाइव ट्रायल: सतीश धवन अंतरिक्ष केंद्र से ग्राउंड कंट्रोल का विशेष वीडियो',
    youtubeId: '21X5lGlDOfg', // Educational NASA/Space science video placeholder
    category: 'देश & विज्ञान',
    categorySlug: 'national',
    duration: '08:42',
    views: '1.2M',
    publishedAt: '3 घंटे पहले',
    thumbnail: 'https://images.unsplash.com/photo-1517976487507-59a5e01bb502?auto=format&fit=crop&w=800&q=80',
    description: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) के वैज्ञानिकों द्वारा गगनयान मिशन के अनमैन्ड क्रू मॉड्यूल के ऑर्बिटल परीक्षण का संपूर्ण फुटेज और तकनीकी विश्लेषण।'
  },
  {
    id: 'v2',
    idSlug: 'v2-ind-vs-aus-final-melbourne-match-preview-analysis',
    title: 'India vs Australia Final Match Analysis & Pitch Masterclass with Experts',
    titleHi: 'IND vs AUS फाइनल: मेलबर्न में क्या होगी दोनों टीमों की रणनीति? देखिए पूर्व कप्तानों का खास विश्लेषण',
    youtubeId: 'fJ9rUzIMcZQ', // Queen/Bohemian placeholder or sports stream
    category: 'क्रिकेट',
    categorySlug: 'cricket',
    duration: '14:20',
    views: '890K',
    publishedAt: '5 घंटे पहले',
    thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    description: 'मेलबर्न क्रिकेट ग्राउंड (MCG) की हरी पिच पर जसप्रीत बुमराह और पैट कमिंस के बीच की जंग पर विशेष चर्चा। प्लेइंग इलेवन का पूर्वानुमान।'
  },
  {
    id: 'v3',
    idSlug: 'v3-parliament-monsoon-session-clean-energy-debate',
    title: 'Parliament Clean Energy Bill: Key Highlights and Speeches in Lok Sabha',
    titleEn: 'Parliament debate on green hydrogen bill',
    titleHi: 'संसद में गूंजा ग्रीन एनर्जी बिल: ऊर्जा मंत्री का दमदार भाषण और विपक्षी नेताओं के तर्क',
    youtubeId: 'L_LUpnjgPso', // Nature/clean energy doc placeholder
    category: 'राजनीति',
    categorySlug: 'politics',
    duration: '11:15',
    views: '450K',
    publishedAt: '7 घंटे पहले',
    thumbnail: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    description: 'संसद में भारत के ऊर्जा आत्मनिर्भरता विधेयक पर सत्तापक्ष और विपक्ष के बीच हुई तीखी बहस और सर्वसम्मति से पारित होने के प्रमुख क्षण।'
  },
  {
    id: 'v4',
    idSlug: 'v4-rbi-governor-press-conference-repo-rate-cut',
    title: 'RBI Governor Press Meet: Repo Rate Cut Announcement & Economic Outlook',
    titleHi: 'आरबीआई गवर्नर की प्रेस कॉन्फ्रेंस: ब्याज दरों में कटौती का फैसला, सुनिए पूरा भाषण',
    youtubeId: 'EngW7tLk6R8',
    category: 'व्यापार',
    categorySlug: 'business',
    duration: '18:50',
    views: '620K',
    publishedAt: '10 घंटे पहले',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    description: 'भारतीय रिज़र्व बैंक के गवर्नर ने होम लोन दरों, महंगाई अनुमान और चालू वित्त वर्ष की जीडीपी वृद्धि पर पत्रकारों के सवालों के जवाब दिए।'
  },
  {
    id: 'v5',
    idSlug: 'v5-mega-action-thriller-trailer-review-reactions',
    title: 'Public Reactions & Theater Frenzy: 1000 Crore Milestone Celebration',
    titleHi: 'सिनेमाघरों के बाहर फैंस का जश्न: ढोल-नगाड़ों के साथ मना रिकॉर्डतोड़ सफलता का उत्सव, देखिए लाइव रिएक्शन',
    youtubeId: 'kJQP7kiw5Fk',
    category: 'मनोरंजन',
    categorySlug: 'entertainment',
    duration: '06:30',
    views: '1.8M',
    publishedAt: '1 दिन पहले',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    description: 'मेगा एक्शन फिल्म के पहले सप्ताह के कलेक्शन ने तोड़े सारे रिकॉर्ड। मुंबई, दिल्ली और बेंगलुरु के सिनेमा हॉलों से दर्शकों के लाइव रिव्यू।'
  },
  {
    id: 'v6',
    idSlug: 'v6-ai-quantum-supercomputer-lab-tour-demo',
    title: 'Inside India’s First Indigenous Quantum Computing Facility | Exclusive Lab Walkthrough',
    titleHi: 'भारत के पहले स्वदेशी क्वांटम सुपरकंप्यूटर लैब का एक्सक्लूसिव टूर, देखिए कैसे काम करता है यह सिस्टम',
    youtubeId: 'JhHMJCUmq28',
    category: 'तकनीक',
    categorySlug: 'tech',
    duration: '12:05',
    views: '340K',
    publishedAt: '1 दिन पहले',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    description: 'सी-डैक के वैज्ञानिकों ने समझाया कि 100-क्यूबिट क्वांटम चिप को माइनस 273 डिग्री तापमान पर कैसे सुरक्षित रखकर अल्ट्रा-फास्ट गणनाएं की जाती हैं।'
  },
  {
    id: 'v7',
    idSlug: 'v7-high-speed-bullet-train-track-viaduct-drone-view',
    title: 'Bullet Train Project Aerial Drone Tour: High-Speed Viaduct Network Construction',
    titleHi: 'ड्रोन कैमरे से देखिए बुलेट ट्रेन प्रोजेक्ट की भव्यता: नदी पुलों और एलिवेटेड ट्रैक्स का शानदार दृश्य',
    youtubeId: 'ysz5S6PUM-U',
    category: 'देश',
    categorySlug: 'national',
    duration: '09:12',
    views: '910K',
    publishedAt: '2 दिन पहले',
    thumbnail: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
    description: 'गुजरात और महाराष्ट्र के बीच निर्माणाधीन 508 किलोमीटर लंबे हाई-स्पीड रेल कॉरिडोर का 4K अल्ट्रा-एचडी ड्रोन वीडियो।'
  },
  {
    id: 'v8',
    idSlug: 'v8-kashi-ayodhya-dev-deepawali-grand-celebration',
    title: 'Kashi Ghats illuminated with 21 Lakh Diyas: Dev Deepawali Grand Visual Spectacle',
    titleHi: 'काशी के 84 घाटों पर 21 लाख दीयों की अलौकिक जगमगाहट: देखिए मनमोहक महाआरती और लेजर शो',
    youtubeId: '9bZkp7q19f0',
    category: 'लाइफस्टाइल & संस्कृति',
    categorySlug: 'lifestyle',
    duration: '07:45',
    views: '2.4M',
    publishedAt: '3 दिन पहले',
    thumbnail: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    description: 'गंगा तट पर उमड़े लाखों श्रद्धालु, भव्य आतिशबाजी और संगीत की धुन पर अध्यात्म का अविस्मरणीय अनुभव।'
  }
];

export const DEMO_GALLERIES: PhotoGallery[] = [
  {
    id: 'g1',
    idSlug: 'g1-isro-gaganyaan-space-capsule-recovery-photos',
    title: 'Gaganyaan Space Capsule Recovery in Bay of Bengal: Exclusive High-Resolution Photos',
    titleHi: 'गगनयान क्रू मॉड्यूल की समुद्र में लैंडिंग और नौसेना का रेस्क्यू ऑपरेशन: देखें 8 दुर्लभ तस्वीरें',
    category: 'देश & विज्ञान',
    categorySlug: 'national',
    publishedAt: '03 सितंबर 2026',
    coverImage: 'https://images.unsplash.com/photo-1517976487507-59a5e01bb502?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517976487507-59a5e01bb502?auto=format&fit=crop&w=1200&q=80',
        caption: 'Spacecraft Launch from Sriharikota spaceport during twilight sky.',
        captionHi: 'श्रीहरिकोटा के सतीश धवन अंतरिक्ष केंद्र से गगनयान परीक्षण यान का सफल प्रक्षेपण।'
      },
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        caption: 'Earth view from low earth orbit captured by onboard cameras.',
        captionHi: '400 किलोमीटर की ऊंचाई से अंतरिक्ष यान के ऑनबोर्ड कैमरों द्वारा ली गई पृथ्वी की मनमोहक तस्वीर।'
      },
      {
        url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Rocket engine booster separation in stratosphere.',
        captionHi: 'वायुमंडल की ऊपरी परत में रॉकेट बूस्टर के अलग होने का दृश्य।'
      },
      {
        url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
        caption: 'Parachute deployment slowing descent above the Bay of Bengal.',
        captionHi: 'पैराशूट खुलते ही समुद्र की ओर धीमी गति से उतरता हुआ क्रू मॉड्यूल।'
      },
      {
        url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Naval diving team securing the floating spacecraft module.',
        captionHi: 'भारतीय नौसेना के गोताखोरों की टीम पानी में तैरते कैप्सूल को सुरक्षित बांधते हुए।'
      },
      {
        url: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Warship crane lifting the space capsule onto the flight deck.',
        captionHi: 'नौसैनिक युद्धपोत के क्रेन द्वारा मॉड्यूल को डेक पर सुरक्षित चढ़ाया गया।'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'ISRO scientists cheering in mission control room at Sriharikota.',
        captionHi: 'सफल लैंडिंग की पुष्टि होते ही इसरो के कंट्रोल रूम में खुशी से झूमते वैज्ञानिक।'
      },
      {
        url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
        caption: 'Celebrations across scientific institutions and universities nationwide.',
        captionHi: 'देशभर के शिक्षण संस्थानों और विज्ञान प्रेमियों ने तिरंगा लहराकर जश्न मनाया।'
      }
    ]
  },
  {
    id: 'g2',
    idSlug: 'g2-ind-vs-aus-cricket-net-practice-mcg-gallery',
    title: 'Team India Intense Nets Practice at Melbourne Cricket Ground: 8 Action Clicks',
    titleHi: 'मेलबर्न में टीम इंडिया का कड़ा अभ्यास सत्र: रोहित, कोहली और बुमराह के एक्शन की 8 तस्वीरें',
    category: 'क्रिकेट',
    categorySlug: 'cricket',
    publishedAt: '03 सितंबर 2026',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Panoramic view of Melbourne Cricket Ground ahead of the final.',
        captionHi: 'फाइनल मैच से पूर्व मेलबर्न क्रिकेट ग्राउंड का भव्य और हरा-भरा मैदान।'
      },
      {
        url: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=1200&q=80',
        caption: 'Indian openers strapping pads before heading to center nets.',
        captionHi: 'नेट्स पर बल्लेबाजी के लिए तैयार होते भारतीय सलामी बल्लेबाज।'
      },
      {
        url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80',
        caption: 'Jasprit Bumrah running in with trademark lethal pace.',
        captionHi: 'तेज गेंदबाज जसप्रीत बुमराह अपने सटीक यॉर्कर का अभ्यास करते हुए।'
      },
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Spin master Kuldeep Yadav discussing field placements with coach.',
        captionHi: 'स्पिनर कुलदीप यादव मुख्य कोच के साथ रणनीति पर चर्चा करते हुए।'
      },
      {
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Wicketkeeper practicing athletic diving catches in slip cordon.',
        captionHi: 'विकेटकीपर डाइव लगाकर कैच पकड़ने का गहन अभ्यास करते हुए।'
      },
      {
        url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
        caption: 'Fitness sprint drills on the outfield under morning sun.',
        captionHi: 'सुबह की धूप में टीम के खिलाड़ियों ने चुस्ती और फुर्ती के लिए स्प्रिंट ड्रिल्स कीं।'
      },
      {
        url: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Indian fans gathering outside MCG with tricolour flags and drums.',
        captionHi: 'स्टेडियम के बाहर भारतीय फैंस तिरंगे और ढोल के साथ उत्साह बढ़ाते हुए।'
      },
      {
        url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80',
        caption: 'Captains holding the prestigious trophy during the pre-match photo-op.',
        captionHi: 'मैच पूर्व फोटोशूट में दोनों कप्तानों ने चमचमाती ट्रॉफी के साथ पोज दिया।'
      }
    ]
  },
  {
    id: 'g3',
    idSlug: 'g3-kashi-ghats-ganga-aarti-dev-deepawali-pictures',
    title: 'Mystical Kashi: 21 Lakh Diyas at Ganga Ghats on Dev Deepawali',
    titleHi: 'काशी के घाटों पर देव दीपावली का अलौकिक उत्सव: देखें 8 सबसे खूबसूरत तस्वीरें',
    category: 'लाइफस्टाइल',
    categorySlug: 'lifestyle',
    publishedAt: '02 सितंबर 2026',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
        caption: 'Grand Maha Aarti ceremony at Dashashwamedh Ghat Varanasi.',
        captionHi: 'दशाश्वमेध घाट पर पुजारियों द्वारा संपन्न की जा रही भव्य महाआरती।'
      },
      {
        url: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Thousands of oil lamps glowing along the ancient stone steps.',
        captionHi: 'प्राचीन पत्थरों की सीढ़ियों पर एक साथ प्रज्वलित लाखों मिट्टी के दीये।'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144822-0a1b8e4e1363?auto=format&fit=crop&w=1200&q=80',
        caption: 'Boats decorated with fairy lights sailing on the holy river Ganga.',
        captionHi: 'मां गंगा की लहरों पर रंग-बिरंगी रोशनी से सजी सैकड़ों नावें।'
      },
      {
        url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic temples bathed in warm golden illumination.',
        captionHi: 'स्वर्णिम रोशनी से नहाए काशी के ऐतिहासिक मंदिर और शिखर।'
      },
      {
        url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sky filled with sparkling laser show and traditional firecrackers.',
        captionHi: 'आसमान में लेजर शो और रंग-बिरंगी आतिशबाजी का अद्भुत नजारा।'
      },
      {
        url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
        caption: 'Devotees floating floral lamps on the sacred water.',
        captionHi: 'श्रद्धालुओं द्वारा पवित्र गंगा जल में दीपदान करते हुए।'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Morning mist clearing over the river with rising sun reflection.',
        captionHi: 'अगली सुबह कोहरे के बीच सूर्योदय की किरणों से दमकता गंगा तट।'
      },
      {
        url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
        caption: 'International tourists mesmerized by the cultural heritage of Banaras.',
        captionHi: 'बनारस की सांस्कृतिक विरासत और अध्यात्म को निहारते विदेशी सैलानी।'
      }
    ]
  },
  {
    id: 'g4',
    idSlug: 'g4-himalayan-biodiversity-valley-of-flowers-monsoon',
    title: 'Valley of Flowers in Full Bloom: Spectacular Colors of the Himalayas',
    titleHi: 'उत्तराखंड की फूलों की घाटी में खिला प्रकृति का अनुपम सौंदर्य: 8 मंत्रमुग्ध करने वाली तस्वीरें',
    category: 'लाइफस्टाइल',
    categorySlug: 'lifestyle',
    publishedAt: '01 सितंबर 2026',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Endless meadows of alpine wildflowers nestled between snow peaks.',
        captionHi: 'बर्फ से ढकी चोटियों के बीच फैली दुर्लभ अल्पाइन फूलों की मखमली चादर।'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Morning clouds rolling over mountain passes.',
        captionHi: 'पहाड़ी दरों के ऊपर तैरते घने सफेद बादलों का झुंड।'
      },
      {
        url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        caption: 'Crystal clear glacial streams cutting through the national park.',
        captionHi: 'घाटी के बीच से गुजरती हुई बर्फ की पिघली क्रिस्टल जैसी साफ जलधारा।'
      },
      {
        url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
        caption: 'Himalayan blue poppy in morning dew.',
        captionHi: 'सुबह की ओस की बूंदों से चमकता दुर्लभ हिमालयन ब्लू पॉपी फूल।'
      },
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Panoramic peak view bathed in afternoon golden hour sunlight.',
        captionHi: 'शाम के समय सुनहरी धूप में चमकती नंदा देवी पर्वत श्रृंखला।'
      },
      {
        url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
        caption: 'Trekkers traversing the rugged mountain trail surrounded by greenery.',
        captionHi: 'हरी-भरी वादियों के बीच से गुजरते साहसी ट्रैकर्स का दल।'
      },
      {
        url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
        caption: 'Butterflies feeding on nectar across indigenous floral species.',
        captionHi: 'विभिन्न प्रजाति की रंग-बिरंगी तितलियां फूलों का पराग ग्रहण करते हुए।'
      },
      {
        url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
        caption: 'Local flora preserved in UNESCO Biosphere reserve buffer zones.',
        captionHi: 'यूनेस्को धरोहर क्षेत्र में संरक्षित समृद्ध वानस्पतिक संपदा।'
      }
    ]
  },
  {
    id: 'g5',
    idSlug: 'g5-india-bullet-train-engineering-marvel-photos',
    title: 'High-Speed Rail Corridor Construction: Modern Bridges & Viaducts in Photos',
    titleHi: 'देश की पहली बुलेट ट्रेन का निर्माण कार्य: विशालकाय पुलों और ट्रैक्स की 8 एक्सक्लूसिव तस्वीरें',
    category: 'देश',
    categorySlug: 'national',
    publishedAt: '01 सितंबर 2026',
    coverImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-speed locomotive design rendering on the elevated railway viaduct.',
        captionHi: 'एलिवेटेड रेलवे ट्रैक पर बुलेट ट्रेन का आधुनिक डिजाइन मॉडल।'
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Engineers inspecting precast concrete bridge girders.',
        captionHi: 'इंजीनियर विशालकाय कंक्रीट गर्डर्स की मजबूती की जांच करते हुए।'
      },
      {
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        caption: 'Precision welding on seamless high-tensile steel rail tracks.',
        captionHi: 'हाई-स्पीड ट्रैक्स के लिए सीमलेस वेल्डिंग तकनीक का प्रयोग।'
      },
      {
        url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
        caption: 'Undersea tunnel boring machine preparing section near Thane creek.',
        captionHi: 'ठाणे क्रीक के नीचे सुरंग बनाने वाली आधुनिक टनल बोरिंग मशीन (TBM)।'
      },
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        caption: 'Futuristic station hub architectural design in Sabarmati.',
        captionHi: 'साबरमती में आधुनिक मल्टी-मॉडल ट्रांसपोर्ट हब का निर्माण।'
      },
      {
        url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
        caption: 'State-of-the-art power substation ensuring uninterrupted electrical supply.',
        captionHi: 'ट्रेनों के तेज परिचालन हेतु 25kV हाई-वोल्टेज सबस्टेशन।'
      },
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Digital control and signaling simulation testing center.',
        captionHi: 'स्वचालित ट्रेन सुरक्षा (ATP) प्रणाली का सिमुलेशन लैब।'
      },
      {
        url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Solar panels installed on station rooftops to achieve green rating.',
        captionHi: 'सभी बुलेट ट्रेन स्टेशनों पर सौर ऊर्जा संयंत्र स्थापित किए जा रहे हैं।'
      }
    ]
  },
  {
    id: 'g6',
    idSlug: 'g6-ai-and-quantum-supercomputing-chips-photogallery',
    title: 'Inside the Quantum Cleanrooms: Silicon Wafers & Qubit Processors',
    titleHi: 'सुपरकंप्यूटर और क्वांटम चिप्स के क्लीनरूम की अनदेखी दुनिया: देखें 8 तकनीकी तस्वीरें',
    category: 'तकनीक',
    categorySlug: 'tech',
    publishedAt: '31 अगस्त 2026',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Golden chandelier dilution refrigerator housing the quantum core.',
        captionHi: 'स्वर्णिम क्रायोजेनिक डाइल्यूशन रेफ्रिजरेटर, जो चिप को परम शून्य तापमान पर रखता है।'
      },
      {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ultra-pure silicon wafer patterned with nanometer circuits.',
        captionHi: 'अल्ट्रा-प्योर सिलिकॉन वेफर जिस पर नैनोमीटर स्तर के सर्किट उकेरे गए हैं।'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Scientist wearing cleanroom bunny suit examining fiber optics.',
        captionHi: 'क्लीनरूम में ऑप्टिकल फाइबर केबल्स की जांच करता विशेषज्ञ वैज्ञानिक।'
      },
      {
        url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Laser spectrometer aligning photon entanglement experiments.',
        captionHi: 'फोटोनिक क्वांटम प्रयोगों के लिए लेजर स्पेक्ट्रोमीटर का संरेखण।'
      },
      {
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-density micro-coaxial cables transmitting microwave pulses.',
        captionHi: 'क्यूबिट्स को नियंत्रित करने वाली माइक्रोवेव पल्स केबल्स का जटिल जाल।'
      },
      {
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Machine learning neural network topology visualization on monitor.',
        captionHi: 'क्वांटम एल्गोरिदम के परिणामों का रीयल-टाइम डेटा विजुअलाइजेशन।'
      },
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Server rack rows powering hybrid quantum-classical computations.',
        captionHi: 'हाइब्रिड सुपरकंप्यूटिंग की शक्ति प्रदान करने वाले सर्वर रैक्स की कतार।'
      },
      {
        url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
        caption: 'Indian research scholars collaborating on post-quantum cryptography.',
        captionHi: 'आगामी साइबर सुरक्षा मानकों पर मंथन करते भारतीय युवा शोधकर्ता।'
      }
    ]
  }
];

function loadStoredArticles(): Article[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('bharat_samachar_articles');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore
    }
  }
  return [...INITIAL_ARTICLES];
}

function persistArticles(articles: Article[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('bharat_samachar_articles', JSON.stringify(articles));
    } catch {
      // Ignore
    }
  }
}

// Helper functions and store
let dynamicArticles: Article[] = loadStoredArticles();

export function getAllArticles(): Article[] {
  return dynamicArticles;
}

export function getArticleByIdSlug(idSlug: string): Article | undefined {
  return dynamicArticles.find(
    (a) => a.idSlug.toLowerCase() === idSlug.toLowerCase() || a.id === idSlug || a.slug === idSlug
  );
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return dynamicArticles.filter(
    (a) => a.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );
}

export function getBreakingArticles(): Article[] {
  return dynamicArticles.filter((a) => a.isBreaking);
}

export function getTrendingArticles(limit = 6): Article[] {
  return [...dynamicArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getRelatedArticles(currentArticle: Article, limit = 3): Article[] {
  return dynamicArticles
    .filter(
      (a) => a.id !== currentArticle.id && (a.categorySlug === currentArticle.categorySlug || a.tags.some(t => currentArticle.tags.includes(t)))
    )
    .slice(0, limit);
}

export function searchArticles(query: string, categorySlug?: string): Article[] {
  const cleanQ = query.trim().toLowerCase();
  return dynamicArticles.filter((a) => {
    const matchesCategory = !categorySlug || categorySlug === 'all' || a.categorySlug.toLowerCase() === categorySlug.toLowerCase();
    if (!matchesCategory) return false;
    if (!cleanQ) return true;

    return (
      a.title.toLowerCase().includes(cleanQ) ||
      (a.titleEn && a.titleEn.toLowerCase().includes(cleanQ)) ||
      a.excerpt.toLowerCase().includes(cleanQ) ||
      a.category.toLowerCase().includes(cleanQ) ||
      a.tags.some((t) => t.toLowerCase().includes(cleanQ))
    );
  });
}

export function addArticle(newArticle: Partial<Article>): Article {
  const id = (Date.now() % 100000).toString();
  const title = newArticle.title || 'शीर्षक उपलब्ध नहीं';
  const slug = (newArticle.slug || title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase() || 'demo-article').slice(0, 40);
  const idSlug = `${id}-${slug}`;

  const categoryObj = CATEGORIES.find(c => c.slug === newArticle.categorySlug) || CATEGORIES[0];

  const fullArticle: Article = {
    id,
    slug,
    idSlug,
    title,
    titleEn: newArticle.titleEn || title,
    excerpt: newArticle.excerpt || 'संक्षिप्त विवरण...',
    excerptEn: newArticle.excerptEn || '',
    category: categoryObj.nameHi,
    categorySlug: categoryObj.slug,
    author: newArticle.author || {
      name: 'Editorial Desk',
      nameHi: 'संपादकीय डेस्क',
      role: 'विशेष संवाददाता',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: 'अभी-अभी (Just now)',
    readTime: '3 मिनट',
    coverImage: newArticle.coverImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'भारत समाचार लाइव विशेष रिपोर्ट',
    tags: newArticle.tags && newArticle.tags.length ? newArticle.tags : [categoryObj.nameHi, 'भारत समाचार', 'ताज़ा खबर'],
    body: newArticle.body && newArticle.body.length ? newArticle.body : [newArticle.excerpt || 'विस्तृत समाचार जल्द उपलब्ध होगा।'],
    keyPoints: newArticle.keyPoints || ['भारत समाचार लाइव पर ताज़ा रिपोर्ट।'],
    isBreaking: !!newArticle.isBreaking,
    isTrending: !!newArticle.isTrending,
    views: Math.floor(Math.random() * 500) + 100,
    status: newArticle.status || 'published',
    scheduledDate: newArticle.scheduledDate,
    focusKeyword: newArticle.focusKeyword,
    metaTitle: newArticle.metaTitle,
    metaDescription: newArticle.metaDescription,
    imageAltText: newArticle.imageAltText,
    contentFormat: newArticle.contentFormat || 'standard',
    seoScore: newArticle.seoScore || 85,
    readabilityScore: newArticle.readabilityScore || 65
  };

  dynamicArticles = [fullArticle, ...dynamicArticles];
  persistArticles(dynamicArticles);
  return fullArticle;
}

export function updateArticle(id: string, updated: Partial<Article>): Article | null {
  const index = dynamicArticles.findIndex(a => a.id === id || a.idSlug === id || a.slug === id);
  if (index === -1) return null;

  const current = dynamicArticles[index];
  const merged: Article = {
    ...current,
    ...updated,
    id: current.id,
    idSlug: current.idSlug,
    updatedAt: new Date().toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + ', ' + new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
  };

  dynamicArticles[index] = merged;
  persistArticles(dynamicArticles);
  return merged;
}

export function deleteArticle(id: string): boolean {
  const prevCount = dynamicArticles.length;
  dynamicArticles = dynamicArticles.filter(a => a.id !== id && a.idSlug !== id && a.slug !== id);
  if (dynamicArticles.length !== prevCount) {
    persistArticles(dynamicArticles);
    return true;
  }
  return false;
}

export function getVideoByIdSlug(idSlug: string): VideoItem | undefined {
  return DEMO_VIDEOS.find(v => v.idSlug === idSlug || v.id === idSlug);
}

export function getGalleryByIdSlug(idSlug: string): PhotoGallery | undefined {
  return DEMO_GALLERIES.find(g => g.idSlug === idSlug || g.id === idSlug);
}
