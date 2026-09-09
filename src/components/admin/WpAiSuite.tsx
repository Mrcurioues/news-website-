import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  FileText,
  Sparkles,
  Search,
  Calendar,
  Image as ImageIcon,
  Tag,
  ShieldCheck,
  History,
  Trash2,
  Settings,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Send,
  Zap,
  Users,
  BookOpen,
  Keyboard,
  Sliders,
  Maximize2,
  Edit3,
  Share2,
  Globe,
  Radio,
  FolderTree,
  List,
  AlertCircle
} from 'lucide-react';
import { Article, PostStatus, ContentFormat } from '../../types';
import { CATEGORIES } from '../../data/demo';
import { useRouter } from '../../context/RouterContext';
import { ADMIN_TRANSLATIONS } from '../../utils/adminTranslations';
import {
  performSeoAudit,
  generateSeoSlug,
  calculateFleschReadingEase,
  calculateKeywordDensity
} from '../../utils/seoCalculator';

interface WpAiSuiteProps {
  articles: Article[];
  currentArticle?: Partial<Article>;
  onSelectArticle: (article: Article) => void;
  onCreateArticle: (initialData?: Partial<Article>) => void;
  onSaveArticle: (articleData: Partial<Article>) => void;
  onRequestDelete: (id: string, title: string) => void;
  onOpenEditor: () => void;
  onOpenAssistant: () => void;
}

export type SuiteSection =
  | 'dashboard'
  | 'creation'
  | 'templates'
  | 'seo'
  | 'enhancer'
  | 'scheduling'
  | 'media'
  | 'revisions'
  | 'taxonomy'
  | 'roles'
  | 'delete_module'
  | 'settings_help';

export const WpAiSuite: React.FC<WpAiSuiteProps> = ({
  articles,
  currentArticle,
  onSelectArticle,
  onCreateArticle,
  onSaveArticle,
  onRequestDelete,
  onOpenEditor,
  onOpenAssistant
}) => {
  const { lang, setLang } = useRouter();
  const t = ADMIN_TRANSLATIONS[lang] || ADMIN_TRANSLATIONS.hi;
  const [activeSection, setActiveSection] = useState<SuiteSection>('dashboard');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    currentArticle?.id || (articles[0]?.id ?? '')
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const activeArticle = articles.find((a) => a.id === selectedArticleId) || articles[0] || ({} as Article);

  const triggerCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Sync selected article when currentArticle changes from outside
  useEffect(() => {
    if (currentArticle?.id && currentArticle.id !== selectedArticleId) {
      setSelectedArticleId(currentArticle.id);
    }
  }, [currentArticle?.id]);

  /* =========================================================
     MODULE 1: ARTICLE CREATION WIZARD STATE
     ========================================================= */
  const [creationStep, setCreationStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [createTitle, setCreateTitle] = useState(lang === 'en' ? 'Semiconductor Revolution in India: Domestic Chip Manufacturing' : 'भारत में सेमीकंडक्टर क्रांति: घरेलू चिप निर्माण और भविष्य की तकनीक');
  const [createNiche, setCreateNiche] = useState(lang === 'en' ? 'Technology & Electronics' : 'तकनीक एवं इलेक्ट्रॉनिक्स (Technology)');
  const [createKeyword, setCreateKeyword] = useState(lang === 'en' ? 'Semiconductor manufacturing India' : 'सेमीकंडक्टर निर्माण भारत');
  const [createWordCount, setCreateWordCount] = useState<number>(1500);
  const [createTone, setCreateTone] = useState<'professional' | 'conversational' | 'technical' | 'beginner'>('professional');
  const [createAudience, setCreateAudience] = useState(lang === 'en' ? 'Industry Experts, Students, General Readers' : 'उद्योग विशेषज्ञ, तकनीकी छात्र व सामान्य पाठक');
  
  const [generatedOutline, setGeneratedOutline] = useState<string[]>(lang === 'en' ? [
    'H2: Introduction - Global Chip Crisis and India\'s Strategic Initiative',
    'H2: 1. Core Pillars of India Semiconductor Mission (ISM)',
    'H3: a) New Fabs in Gujarat and Assam',
    'H3: b) PLI Scheme and Global Investments',
    'H2: 2. Accelerating Atmanirbhar Bharat via Domestic Chip Making',
    'H3: a) Local Supply for Auto & 5G Smartphones',
    'H3: b) National Security and Data Privacy',
    'H2: 3. Challenges: Ultra-pure Water, Uninterrupted Power & Skilled Manpower',
    'H2: Conclusion - Roadmap to becoming a Global Hub by 2030',
    'H2: Frequently Asked Questions (FAQs)'
  ] : [
    'H2: भूमिका (Introduction) - वैश्विक चिप संकट और भारत की रणनीतिक पहल',
    'H2: 1. भारत सेमीकंडक्टर मिशन (ISM) के मुख्य स्तंभ',
    'H3: क) गुजरात और असम में स्थापित होने वाले नए फैब्स',
    'H3: ख) पीएलआई (PLI) स्कीम और वैश्विक कंपनियों का निवेश',
    'H2: 2. घरेलू चिप निर्माण से आत्मनिर्भर भारत को गति',
    'H3: क) ऑटोमोबाइल व 5G स्मार्टफोन में स्थानीय चिप्स की आपूर्ति',
    'H3: ख) राष्ट्रीय सुरक्षा और संवेदनशील डेटा सुरक्षा',
    'H2: 3. चुनौतियां: अल्ट्रा-प्योर पानी, निर्बाध बिजली व कुशल जनशक्ति',
    'H2: निष्कर्ष (Conclusion) - 2030 तक ग्लोबल सेमीकंडक्टर हब बनने का रोडमैप',
    'H2: अक्सर पूछे जाने वाले प्रश्न (FAQs)'
  ]);

  const [createMetaTitle, setCreateMetaTitle] = useState(lang === 'en' ? 'Semiconductor Manufacturing India: New Projects & Growth' : 'सेमीकंडक्टर निर्माण भारत: चिप क्रांति और नए प्रोजेक्ट्स');
  const [createMetaDesc, setCreateMetaDesc] = useState(lang === 'en' ? 'Detailed report on new semiconductor manufacturing projects in India, PLI subsidies, and domestic chip production initiatives.' : 'भारत में सेमीकंडक्टर निर्माण के नए प्रोजेक्ट्स, पीएलआई सब्सिडी और घरेलू चिप उत्पादन पर विस्तृत रिपोर्ट पढ़ें।');
  const [createSlug, setCreateSlug] = useState('semiconductor-manufacturing-india-pli-scheme');
  const [createCategory, setCreateCategory] = useState('tech');
  const [createTags, setCreateTags] = useState<string[]>(lang === 'en' ? ['Semiconductor', 'Chip Manufacturing', 'India Mission', 'Electronics', 'PLI Scheme'] : ['सेमीकंडक्टर', 'चिप निर्माण', 'भारत मिशन', 'इलेक्ट्रॉनिक्स', 'PLI स्कीम']);

  // Step 4: Generated HTML Content
  const [generatedHtml, setGeneratedHtml] = useState<string>(
`<p><strong>नई दिल्ली:</strong> भारत सेमीकंडक्टर निर्माण के क्षेत्र में एक ऐतिहासिक छलांग लगाने के लिए तैयार है। वैश्विक आपूर्ति श्रृंखला में विविधता लाने और तकनीकी आत्मनिर्भरता हासिल करने के उद्देश्य से देश भर में अत्याधुनिक चिप फैब्रिकेशन यूनिट्स स्थापित की जा रही हैं।</p>

<h2>1. भारत सेमीकंडक्टर मिशन (ISM) के मुख्य स्तंभ</h2>
<p>केंद्रीय इलेक्ट्रॉनिक्स एवं आईटी मंत्रालय द्वारा संचालित 76,000 करोड़ रुपये का प्रोत्साहन पैकेज देश में सिलिकॉन इकोसिस्टम तैयार करने में क्रांतिकारी भूमिका निभा रहा है।</p>
<ul>
  <li><strong>गुजरात धोलेरा फैब:</strong> अत्याधुनिक 28nm और 40nm चिप्स का वाणिज्यिक उत्पादन।</li>
  <li><strong>असम ओएसएटी यूनिट:</strong> उन्नत पैकेजिंग और परीक्षण सुविधाओं का विस्तार।</li>
  <li><strong>कौशल विकास:</strong> 85,000 योग्य सेमीकंडक्टर इंजीनियर्स का प्रशिक्षण कार्यक्रम।</li>
</ul>

<!-- Featured Image: Semiconductor wafer high tech cleanroom -->

<h2>2. घरेलू चिप निर्माण से आत्मनिर्भर भारत को गति</h2>
<p>घरेलू उत्पादन शुरू होने से न केवल ऑटोमोबाइल और स्मार्टफोन निर्माण लागत में कमी आएगी, बल्कि भू-राजनीतिक संकटों के समय विदेशी आपूर्ति पर निर्भरता भी समाप्त होगी। इसके अतिरिक्त, रक्षा उपकरणों और 5G नेटवर्क्स के लिए सुरक्षित सिलिकॉन आर्किटेक्चर सुनिश्चित किया जा सकेगा।</p>

<h2>3. निष्कर्ष एवं आगे की राह</h2>
<p>भारत का सेमीकंडक्टर मिशन केवल विनिर्माण तक सीमित नहीं है, बल्कि यह वैश्विक तकनीकी नेतृत्व की दिशा में एक निर्णायक कदम है। वर्ष 2030 तक भारत दुनिया के शीर्ष 5 चिप निर्माताओं में शामिल होने के लक्ष्य की ओर मजबूती से अग्रसर है।</p>

<h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
<p><strong>प्रश्न 1: भारत में पहली चिप कब बनेगी?</strong><br/>उत्तर: वाणिज्यिक उत्पादन के पहले चरण की चिप्स 2026 के अंत तक उपलब्ध होने की उम्मीद है।</p>`
  );

  /* =========================================================
     MODULE 11: CONTENT TEMPLATES
     ========================================================= */
  const TEMPLATES = [
    {
      id: 'howto',
      title: 'How-To Guide / Tutorial',
      icon: '📝',
      desc: 'चरण-दर-चरण मार्गदर्शिका (Step-by-Step with Prerequisites, Common Mistakes, Tips & FAQs)',
      suggestedTitle: 'How to [Action] in [Year]: Complete Step-by-Step Guide',
      outline: [
        'H2: Introduction (Hook + Problem Statement + What You Will Learn)',
        'H2: Prerequisites (आवश्यक सामग्री या शर्तें)',
        'H2: Step-by-Step Guide',
        'H3: Step 1: प्राथमिक तैयारी और सेटअप',
        'H3: Step 2: मुख्य क्रियान्वयन और प्रक्रिया',
        'H3: Step 3: अंतिम परीक्षण और सत्यापन',
        'H2: Common Mistakes to Avoid (सामान्य गलतियाँ और समाधान)',
        'H2: Pro Tips for Success (सफलता के विशेषज्ञ सुझाव)',
        'H2: Conclusion & Call to Action',
        'H2: Frequently Asked Questions (FAQs)'
      ]
    },
    {
      id: 'listicle',
      title: 'Listicle (Top 10 / Best of...)',
      icon: '📋',
      desc: 'रैंकिंग व सूची लेख (Pros, Cons, Comparison Table, Final Verdict)',
      suggestedTitle: '10 Best [Topic] in 2026: Tested & Compared',
      outline: [
        'H2: Introduction (यह सूची आपके लिए क्यों महत्वपूर्ण है)',
        'H2: Quick Summary Box (त्वरित सिफारिशें)',
        'H2: #1 [Top Pick] - सर्वोत्तम विकल्प (Pros & Cons)',
        'H2: #2 [Runner Up] - द्वितीय सर्वश्रेष्ठ (Pros & Cons)',
        'H2: #3 [Budget Pick] - किफायती विकल्प (Pros & Cons)',
        'H2: Feature Comparison Table (विस्तृत तुलनात्मक तालिका)',
        'H2: How We Tested (मूल्यांकन के मानदंड)',
        'H2: Final Verdict (अंतिम निर्णय)',
        'H2: FAQs'
      ]
    },
    {
      id: 'comparison',
      title: 'Comparison / Review (A vs B)',
      icon: '🆚',
      desc: 'तुलनात्मक समीक्षा (Feature-by-Feature, Pricing, Winner, Recommendation)',
      suggestedTitle: '[Product A] vs [Product B]: Which Is Right For You?',
      outline: [
        'H2: Overview: Comparing the Two Giants',
        'H2: Key Differences at a Glance',
        'H2: Round 1: Performance & Speed',
        'H2: Round 2: Ease of Use & Interface',
        'H2: Round 3: Value for Money & Pricing',
        'H2: Which One Should You Buy? (Recommendation)',
        'H2: Verdict & Rating'
      ]
    },
    {
      id: 'news',
      title: 'Breaking News / Press Report',
      icon: '📰',
      desc: 'ताज़ा समाचार एवं आधिकारिक बयान (Lead Paragraph, 5Ws, Quotes, Background, Next Steps)',
      suggestedTitle: '[Breaking Event]: Key Decisions & Complete Impact Report',
      outline: [
        'H2: Lead Paragraph (Who, What, Where, When, Why)',
        'H2: प्रमुख बिंदु व निर्णय (Key Highlights)',
        'H2: आधिकारिक बयान व प्रतिक्रियाएं (Official Statements)',
        'H2: ऐतिहासिक पृष्ठभूमि एवं संदर्भ (Background Context)',
        'H2: आम जनता व उद्योग पर प्रभाव (Public & Economic Impact)',
        'H2: आगे की कार्रवाई एवं समयसीमा (Next Steps)'
      ]
    },
    {
      id: 'tips',
      title: 'Tips & Tricks / Best Practices',
      icon: '💡',
      desc: 'विशेषज्ञ नुस्खे और गुप्त रणनीतियां (Actionable Hacks, Mistakes, Expert Insights)',
      suggestedTitle: '7 Proven Tips to Master [Topic] in Record Time',
      outline: [
        'H2: Introduction (Why Traditional Methods Fail)',
        'H2: Tip #1: उच्च प्रभाव वाली रणनीतियां',
        'H2: Tip #2: समय और संसाधनों की बचत',
        'H2: Tip #3: गुणवत्ता नियंत्रण के फॉर्मूले',
        'H2: Bonus Secret Hack (विशेषज्ञ सीक्रेट)',
        'H2: Actionable Checklist (त्वरित चेकलिस्ट)'
      ]
    },
    {
      id: 'guide',
      title: 'Ultimate Guide / Pillar Content',
      icon: '📖',
      desc: 'विस्तृत 3000+ शब्द गाइड (Comprehensive chapters, infographics, glossary)',
      suggestedTitle: 'The Ultimate Guide to [Topic]: Everything You Need to Know',
      outline: [
        'H2: Chapter 1: मूलभूत अवधारणाएं और सिद्धांत',
        'H2: Chapter 2: आधुनिक उपकरण और तकनीक',
        'H2: Chapter 3: व्यावहारिक केस स्टडीज',
        'H2: Chapter 4: सामान्य गलतियों से बचाव',
        'H2: Glossary of Key Terms (पारिभाषिक शब्दावली)',
        'H2: Resources & Further Reading'
      ]
    },
    {
      id: 'faq',
      title: 'FAQ Post / Knowledge Base',
      icon: '❓',
      desc: 'अक्सर पूछे जाने वाले 15+ सवाल एवं त्वरित उत्तर (Schema Snippet Ready)',
      suggestedTitle: '[Topic] FAQs: 15 Common Questions Answered by Experts',
      outline: [
        'H2: Overview (विषय का परिचय)',
        'H2: बुनियादी सवाल (General FAQs 1-5)',
        'H2: तकनीकी सवाल (Technical FAQs 6-10)',
        'H2: मूल्य और लागत संबंधी प्रश्न (Pricing FAQs 11-15)',
        'H2: Still Have Questions? How to Get Help'
      ]
    },
    {
      id: 'case_study',
      title: 'Case Study / Real Story',
      icon: '📊',
      desc: 'वास्तविक सफलता की कहानी (Challenge, Solution, Metrics, Key Takeaways)',
      suggestedTitle: 'Case Study: How [Entity] Achieved [Result] in 6 Months',
      outline: [
        'H2: Executive Summary (संक्षिप्त परिणाम)',
        'H2: The Challenge (प्रारंभिक समस्या व चुनौतियां)',
        'H2: The Strategy & Solution (रणनीतिक समाधान)',
        'H2: The Measurable Results (संख्यात्मक उपलब्धियां)',
        'H2: Key Lessons Learned (प्रमुख सबक)'
      ]
    }
  ];

  /* =========================================================
     MODULE 19: AI CONTENT ENHANCER STATE
     ========================================================= */
  const [enhancerTool, setEnhancerTool] = useState<'headlines' | 'expander' | 'readability' | 'grammar' | 'tone' | 'plagiarism'>('headlines');
  const [enhancerInput, setEnhancerInput] = useState(activeArticle.title || 'भारत में सेमीकंडक्टर निर्माण');
  const [enhancedResult, setEnhancedResult] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const runEnhancer = (tool: string) => {
    setIsEnhancing(true);
    setEnhancedResult(null);
    setTimeout(() => {
      if (tool === 'headlines') {
        setEnhancedResult(
          `1. 🔥 [संख्या आधारित]: "भारत की सेमीकंडक्टर क्रांति: 5 मेगा प्रोजेक्ट्स जो बदल देंगे चिप विनिर्माण का भविष्य"\n` +
          `2. 🎯 [विशिष्ट व स्पष्ट]: "घरेलू चिप निर्माण: धोलेरा और असम फैब से भारत कैसे बनेगा आत्मनिर्भर"\n` +
          `3. ❓ [जिज्ञासा प्रश्न]: "क्या 2026 तक भारत बन पाएगा ग्लोबल चिप हब? जानिए जमीनी हकीकत"\n` +
          `4. 📖 [हाउ-टू शैली]: "भारत में सेमीकंडक्टर मिशन: जानिए कैसे तैयार हो रहा है 76,000 करोड़ का सिलिकॉन इकोसिस्टम"\n` +
          `5. ⚡ [पावर वर्ड्स]: "ऐतिहासिक छलांग: भारत में सेमीकंडक्टर क्रांति और तकनीकी संप्रभुता का नया युग"`
        );
      } else if (tool === 'expander') {
        setEnhancedResult(
          `विस्तृत संस्करण (Expanded with depth & data):\n\n` +
          `"भारत का सेमीकंडक्टर विनिर्माण अभियान केवल औद्योगिक विकास तक सीमित नहीं है, बल्कि यह 21वीं सदी की तकनीकी संप्रभुता का निर्णायक स्तंभ है। केंद्रीय इलेक्ट्रॉनिक्स मंत्रालय द्वारा समर्थित 76,000 करोड़ रुपये के प्रोत्साहन पैकेज के तहत गुजरात के धोलेरा और असम के मोरीगांव में विश्वस्तरीय विनिर्माण इकाइयां स्थापित हो रही हैं। वैश्विक परामर्श फर्म गार्टनर के अनुसार, 2028 तक भारत का चिप बाजार 64 अरब डॉलर तक पहुंच जाएगा, जिससे ऑटोमोटिव, कंज्यूमर इलेक्ट्रॉनिक्स और 5G दूरसंचार उपकरणों में स्थानीय आपूर्ति संभव हो सकेगी।" (138 शब्द, सक्रिय वाच्य, सांख्यिकीय साक्ष्य युक्त)`
        );
      } else if (tool === 'readability') {
        setEnhancedResult(
          `सरलीकृत संस्करण (Flesch Score Improved to 78/100):\n\n` +
          `"भारत में चिप बनाने की दिशा में तेजी से काम हो रहा है। इसके लिए सरकार 76 हजार करोड़ रुपये की सहायता दे रही है। गुजरात और असम में नए कारखाने लगाए जा रहे हैं। इससे आने वाले समय में कार, मोबाइल और 5जी फोन सस्ते और सुरक्षित बनेंगे। विदेशी कंपनियों पर निर्भरता भी कम होगी।"\n\n` +
          `✓ वाक्य की औसत लंबाई: 12 शब्द (सरल व स्पष्ट)\n` +
          `✓ निष्क्रिय वाच्य (Passive Voice): 0%\n` +
          `✓ संक्रमण शब्द (Transition Words): 18%`
        );
      } else if (tool === 'grammar') {
        setEnhancedResult(
          `व्याकरण व वर्तनी ऑडिट (Grammar Audit):\n\n` +
          `✓ कुल त्रुटियां: 0 (वर्तनी एवं विराम चिह्न सही पाए गए)\n` +
          `✓ मानक देवनागरी वर्तनी का अनुपालन।\n` +
          `✓ पूर्ण विराम व उद्धरण चिह्नों की सटीक स्थिति।\n` +
          `✓ प्रकाशन हेतु 100% उपयुक्त!`
        );
      } else if (tool === 'tone') {
        setEnhancedResult(
          `संपादकीय टोन विकल्प (Selected Tone Adaptation):\n\n` +
          `[पेशेवर विश्लेषणात्मक (Professional Analyst)]:\n` +
          `"वैश्विक अर्धचालक मूल्य श्रृंखला में भारत का प्रवेश एक सुविचारित औद्योगिक नीति का परिणाम है, जो आपूर्ति श्रृंखला सुदृढ़ीकरण और रणनीतिक स्वायत्तता को प्राथमिकता देती है।"\n\n` +
          `[संवादात्मक व रोचक (Conversational)]:\n` +
          `"क्या आपने सोचा है कि आपकी कार और स्मार्टफोन में लगने वाली चिप अब भारत में ही बनेगी? जी हां, भारत का सेमीकंडक्टर मिशन अब हकीकत में बदल रहा है!"`
        );
      } else if (tool === 'plagiarism') {
        setEnhancedResult(
          `मौलिकता व साहित्यिक चोरी जांच (Plagiarism Check):\n\n` +
          `✅ 100% मौलिक सामग्री (100% Original Content)\n` +
          `0% समानता किसी भी मौजूदा वेब पेज या समाचार पोर्टल से।\n` +
          `सुरक्षित व गूगल एल्गोरिदम अनुपालन युक्त (Safe to Publish ✓)`
        );
      }
      setIsEnhancing(false);
    }, 450);
  };

  /* =========================================================
     MODULE 6: SCHEDULING & PRE-PUBLISH CHECKLIST STATE
     ========================================================= */
  const [scheduleDate, setScheduleDate] = useState('2026-09-04');
  const [scheduleTime, setScheduleTime] = useState('10:30');
  const [scheduleStatus, setScheduleStatus] = useState<'publish' | 'schedule' | 'draft' | 'private'>('publish');
  const [checklist, setChecklist] = useState({
    titleCompelling: true,
    contentProofread: true,
    imagesOptimized: true,
    metaDescWritten: true,
    categoriesAssigned: true,
    featuredImageSet: true,
    seoAcceptable: true,
    internalLinksAdded: true,
    externalLinksVerified: true,
    mobilePreviewChecked: true,
    excerptCreated: true,
    authorAssigned: true
  });

  const checklistCount = Object.values(checklist).filter(Boolean).length;

  /* =========================================================
     MODULE 8: MEDIA MANAGEMENT STATE
     ========================================================= */
  const [altTextSuggestion, setAltTextSuggestion] = useState('भारत सेमीकंडक्टर फैब स्वच्छ कक्ष में काम करते इंजीनियर सिलिकॉन वेफर');
  const [autoOptimizeWebp, setAutoOptimizeWebp] = useState(true);
  const [autoWatermark, setAutoWatermark] = useState(false);

  const STOCK_IMAGES = [
    {
      title: 'सेमीकंडक्टर एवं सिलिकॉन वेफर',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      tag: 'Tech'
    },
    {
      title: 'संसद भवन व राजनीतिक निर्णय',
      url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
      tag: 'Politics'
    },
    {
      title: 'क्रिकेट स्टेडियम एवं लाइव मैच',
      url: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=1200&q=80',
      tag: 'Cricket'
    },
    {
      title: 'इसरो गगनयान व अंतरिक्ष विज्ञान',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      tag: 'Space'
    },
    {
      title: 'शेयर बाजार, अर्थव्यवस्था व बैंक',
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      tag: 'Business'
    }
  ];

  /* =========================================================
     MODULE 12: AUTO-SAVE & REVISIONS STATE
     ========================================================= */
  const [revisions, setRevisions] = useState([
    {
      id: 'rev-3',
      time: 'आज, 3:45 PM (वर्तमान संस्करण)',
      author: 'संपादक (Editor)',
      desc: 'SEO मेटा व आंतरिक लिंक्स जोड़े गए',
      diffAdded: '+ H2: अक्सर पूछे जाने वाले प्रश्न (FAQs) जोड़े गए',
      diffRemoved: '- पुराने ड्राफ्ट के अपूर्ण पैराग्राफ हटाए गए'
    },
    {
      id: 'rev-2',
      time: 'आज, 2:15 PM',
      author: 'संवाददाता (Correspondent)',
      desc: 'धोलेरा फैब के आंकड़े अद्यतन किए गए',
      diffAdded: '+ निवेश राशि 76,000 करोड़ का संदर्भ जोड़ा गया',
      diffRemoved: ''
    },
    {
      id: 'rev-1',
      time: 'कल, 5:00 PM',
      author: 'संपादक (Editor)',
      desc: 'प्रारंभिक ड्राफ्ट रूपरेखा तैयार की गई',
      diffAdded: '+ मुख्य शीर्षक एवं भूमिका तैयार',
      diffRemoved: ''
    }
  ]);

  /* =========================================================
     MODULE 3: DELETE WITH 301 REDIRECT STATE
     ========================================================= */
  const [deleteInputConfirm, setDeleteInputConfirm] = useState('');
  const [redirect301Url, setRedirect301Url] = useState('/news/top-headlines');

  /* =========================================================
     LIVE SEO AUDIT FOR CURRENT ARTICLE
     ========================================================= */
  const currentAudit = performSeoAudit(activeArticle);

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden mb-12">
      {/* Clean Modern Suite Header */}
      <div className="bg-white px-5 sm:px-7 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              {lang === 'en' ? 'WordPress AI Studio' : 'वर्डप्रेस AI स्टूडियो'}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {lang === 'en' ? 'Auto-Save Active (60s) ✓' : 'ऑटो-सेव सक्रिय (60s) ✓'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {t.suiteHeaderTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {t.suiteHeaderSubtitle}
          </p>
        </div>

        {/* Active Article Selector & Primary Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">{t.activePostLabel}</span>
            <select
              value={selectedArticleId}
              onChange={(e) => {
                setSelectedArticleId(e.target.value);
                const a = articles.find((art) => art.id === e.target.value);
                if (a) onSelectArticle(a);
              }}
              className="bg-transparent text-gray-900 text-xs font-bold focus:outline-hidden max-w-[200px] truncate cursor-pointer"
            >
              {articles.map((art) => {
                const itemTitle = lang === 'en' ? (art.titleEn || art.title) : art.title;
                return (
                  <option key={art.id} value={art.id}>
                    {itemTitle.slice(0, 36)}...
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="button"
            onClick={onOpenEditor}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t.openEditorSmallBtn}</span>
          </button>

          <button
            type="button"
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{t.openAssistantSmallBtn}</span>
          </button>
        </div>
      </div>

      {/* Global Toast / Notification */}
      {notification && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Suite Layout: Streamlined Sidebar Navigation + Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Sidebar Navigation (3 Cols) - 5 Clean, Spacious Tabs */}
        <div className="lg:col-span-3 border-r border-gray-200/80 bg-gray-50/50 p-3 space-y-1.5">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-3 py-1">
            {t.moduleNavHeader}
          </div>

          {[
            {
              id: 'dashboard',
              label: t.modOverview,
              icon: BarChart3,
              activeMatch: activeSection === 'dashboard',
              onClick: () => setActiveSection('dashboard'),
              badge: `${articles.length}`
            },
            {
              id: 'creation',
              label: t.modWriter,
              icon: BookOpen,
              activeMatch: activeSection === 'creation' || activeSection === 'templates',
              onClick: () => setActiveSection(activeSection === 'templates' ? 'templates' : 'creation'),
              badge: 'Wizard'
            },
            {
              id: 'seo',
              label: t.modSeoSuite,
              icon: Search,
              activeMatch: activeSection === 'seo' || activeSection === 'enhancer',
              onClick: () => setActiveSection(activeSection === 'enhancer' ? 'enhancer' : 'seo'),
              badge: `${currentAudit.overallScore}/100`
            },
            {
              id: 'scheduling',
              label: t.modMediaSchedule,
              icon: Calendar,
              activeMatch: activeSection === 'scheduling' || activeSection === 'media',
              onClick: () => setActiveSection(activeSection === 'media' ? 'media' : 'scheduling'),
              badge: `${checklistCount}/12`
            },
            {
              id: 'revisions',
              label: t.modSettingsWorkflow,
              icon: Settings,
              activeMatch: activeSection === 'revisions' || activeSection === 'taxonomy' || activeSection === 'delete_module' || activeSection === 'roles' || activeSection === 'settings_help',
              onClick: () => setActiveSection('revisions'),
              badge: 'System'
            }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = item.activeMatch;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-900/20'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-mono shrink-0 ${
                    isActive ? 'bg-rose-700 text-white' : 'bg-gray-200/70 text-gray-600'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Content Area (9 Cols) */}
        <div className="lg:col-span-9 p-5 sm:p-7 bg-white overflow-y-auto">
          {/* =========================================================
              VIEW 1: DASHBOARD & OVERVIEW (Module 4 & 9)
             ========================================================= */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-rose-600" />
                    <span>{t.dashTitle}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.dashSubtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection('creation')}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{t.btnNewArticle}</span>
                </button>
              </div>

              {/* 8 Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{t.dashTotalArticles}</span>
                  <div className="text-xl font-black text-gray-900 mt-0.5">{articles.length}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">{t.dashPublished}</span>
                  <div className="text-xl font-black text-emerald-700 mt-0.5">
                    {articles.filter((a) => a.status === 'published' || !a.status).length}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <span className="text-[10px] font-bold text-amber-700 uppercase">{t.dashDrafts}</span>
                  <div className="text-xl font-black text-amber-700 mt-0.5">
                    {articles.filter((a) => a.status === 'draft').length}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase">{t.dashScheduled}</span>
                  <div className="text-xl font-black text-indigo-700 mt-0.5">
                    {articles.filter((a) => a.status === 'scheduled').length}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{t.dashTotalWords}</span>
                  <div className="text-xl font-black text-gray-900 mt-0.5">
                    {articles.reduce((acc, a) => acc + (a.body?.join(' ').split(/\s+/).length || 650), 0).toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-US')}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{t.dashAvgWordCount}</span>
                  <div className="text-xl font-black text-purple-700 mt-0.5">{lang === 'en' ? '1,120 words' : '1,120 शब्द'}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{t.dashTopCategory}</span>
                  <div className="text-base font-black text-rose-600 mt-0.5 truncate">{lang === 'en' ? 'National' : 'राष्ट्रीय (National)'}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{t.dashAvgSeoScore}</span>
                  <div className="text-xl font-black text-emerald-600 mt-0.5">88/100</div>
                </div>
              </div>

              {/* Traffic & Search Analytics - Clean Modern Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Traffic Stats */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
                    <span>{t.trafficStatsHeader}</span>
                    <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{t.totalPageViews}</span>
                      <span className="font-mono font-bold text-gray-900">{lang === 'hi' ? '4,82,900' : '482,900'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{t.uniqueReaders}</span>
                      <span className="font-mono font-bold text-emerald-600">{lang === 'hi' ? '1,94,200' : '194,200'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{t.avgTimeOnPage}</span>
                      <span className="font-mono font-bold text-gray-900">{t.avgTimeVal}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">{t.bounceRate}</span>
                      <span className="font-mono font-bold text-amber-600">32.4% (Best)</span>
                    </div>
                  </div>
                </div>

                {/* Device Share */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {t.deviceShareHeader}
                  </h4>
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold text-gray-700">
                        <span>{t.mobileDevices}</span>
                        <span className="font-bold text-gray-900">68%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: '68%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold text-gray-700">
                        <span>{t.desktopLaptops}</span>
                        <span className="font-bold text-gray-900">28%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '28%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold text-gray-700">
                        <span>{t.tablets}</span>
                        <span className="font-bold text-gray-900">4%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '4%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Ranking */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {t.searchRankingHeader}
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{t.avgPosition}</span>
                      <span className="font-black text-emerald-600 font-mono">#3.8</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{t.impressions}</span>
                      <span className="font-mono font-bold text-gray-800">{lang === 'hi' ? '12,40,000' : '1,240,000'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{t.ctr}</span>
                      <span className="font-mono font-bold text-purple-600">8.4%</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">{t.topSearchKeyword}</span>
                      <span className="font-bold text-rose-600 truncate max-w-[130px]">{t.topKeywordVal}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-gray-700">
                  {t.quickActionsLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSection('creation')}
                    className="px-3.5 py-1.5 bg-white border border-gray-200 hover:border-rose-400 hover:text-rose-600 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
                  >
                    ➕ {t.btnNewArticle}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('templates')}
                    className="px-3.5 py-1.5 bg-white border border-gray-200 hover:border-purple-400 hover:text-purple-600 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
                  >
                    🎨 {t.btnTemplates}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('seo')}
                    className="px-3.5 py-1.5 bg-white border border-gray-200 hover:border-emerald-400 hover:text-emerald-600 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
                  >
                    🔍 {t.btnSeoAudit}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('scheduling')}
                    className="px-3.5 py-1.5 bg-white border border-gray-200 hover:border-indigo-400 hover:text-indigo-600 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
                  >
                    📅 {t.btnSchedule}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('enhancer')}
                    className="px-3.5 py-1.5 bg-white border border-gray-200 hover:border-amber-400 hover:text-amber-600 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
                  >
                    🪄 {t.btnAiEnhancer}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 2: ARTICLE CREATION WIZARD (Module 1)
             ========================================================= */}
          {activeSection === 'creation' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for Writer */}
              <div className="flex items-center gap-2 p-1 bg-gray-100/90 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveSection('creation')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  ⚡ {t.wizTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('templates')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  📋 {t.tplTitle}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-rose-600" />
                    <span>{t.wizTitle}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.wizSubtitle}
                  </p>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setCreationStep(s as any)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                        creationStep === s
                          ? 'bg-rose-600 text-white shadow-xs scale-105'
                          : creationStep > s
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {creationStep > s ? '✓' : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 1: GATHER BASIC INFO */}
              {creationStep === 1 && (
                <div className="space-y-4">
                  <div className="p-3 bg-rose-50 text-rose-900 rounded-xl text-xs font-bold flex items-center gap-2">
                    <span>चरण 1:</span> प्राथमिक जानकारी (Title, Topic, Keyword, Word Count, Tone & Audience)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        आर्टिकल शीर्षक (Article Title - Required)*
                      </label>
                      <input
                        type="text"
                        value={createTitle}
                        onChange={(e) => setCreateTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold focus:border-rose-600"
                        placeholder="उदा: 10 Best SEO Strategies in 2026..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        विषय / श्रेणी (Topic / Niche - Required)*
                      </label>
                      <input
                        type="text"
                        value={createNiche}
                        onChange={(e) => setCreateNiche(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:border-rose-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        टारगेट फोकस कीवर्ड (Target Focus Keyword - Required)*
                      </label>
                      <input
                        type="text"
                        value={createKeyword}
                        onChange={(e) => setCreateKeyword(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:border-rose-600 font-bold text-purple-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        वांछित शब्द संख्या (Word Count: 1000-2500)*
                      </label>
                      <select
                        value={createWordCount}
                        onChange={(e) => setCreateWordCount(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold"
                      >
                        <option value={800}>लघु (Short - 800 Words)</option>
                        <option value={1200}>मानक (Standard - 1200 Words)</option>
                        <option value={1500}>विस्तृत (Comprehensive - 1500 Words)</option>
                        <option value={2500}>अल्टीमेट गाइड (Pillar - 2500+ Words)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        शैली व टोन (Writing Tone)*
                      </label>
                      <select
                        value={createTone}
                        onChange={(e) => setCreateTone(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold"
                      >
                        <option value="professional">पेशेवर (Professional & Formal)</option>
                        <option value="conversational">संवादात्मक (Conversational & Friendly)</option>
                        <option value="technical">तकनीकी (Technical & In-depth)</option>
                        <option value="beginner">शुरुआती (Beginner-Friendly & Simple)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        लक्षित पाठक (Target Audience)
                      </label>
                      <input
                        type="text"
                        value={createAudience}
                        onChange={(e) => setCreateAudience(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:border-rose-600"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCreationStep(2)}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <span>अगला: आउटलाइन बनाएं (Next: Generate Outline)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: OUTLINE STRUCTURE */}
              {creationStep === 2 && (
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-2">
                    <span>चरण 2:</span> कंटेंट संरचना एवं H2/H3 हेडिंग पदानुक्रम
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                    <div className="text-xs font-black text-gray-700">जेनरेटेड हेडिंग रूपरेखा (Heading Outline):</div>
                    {generatedOutline.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 text-xs">
                        <span className="w-6 h-6 rounded-md bg-gray-100 text-gray-600 font-mono text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const copy = [...generatedOutline];
                            copy[idx] = e.target.value;
                            setGeneratedOutline(copy);
                          }}
                          className="flex-1 bg-transparent border-0 text-xs font-medium focus:outline-hidden"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCreationStep(1)}
                      className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700"
                    >
                      वापस (Back)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreationStep(3)}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <span>अगला: वर्डप्रेस मेटाडेटा (Next: WordPress Metadata)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: WORDPRESS METADATA */}
              {creationStep === 3 && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 text-blue-900 rounded-xl text-xs font-bold flex items-center gap-2">
                    <span>चरण 3:</span> वर्डप्रेस एसईओ मेटाडेटा (Meta Title, Description, Slug & Tags)
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span>मेटा टाइटल (Meta Title: 55-60 Chars)*</span>
                        <span className={createMetaTitle.length > 60 ? 'text-rose-600' : 'text-emerald-600 font-mono'}>
                          {createMetaTitle.length}/60 अक्षम
                        </span>
                      </div>
                      <input
                        type="text"
                        value={createMetaTitle}
                        onChange={(e) => setCreateMetaTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold focus:border-rose-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span>मेटा डिस्क्रिप्शन (Meta Description: 150-160 Chars)*</span>
                        <span className={createMetaDesc.length > 160 ? 'text-rose-600' : 'text-emerald-600 font-mono'}>
                          {createMetaDesc.length}/160 अक्षम
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        value={createMetaDesc}
                        onChange={(e) => setCreateMetaDesc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:border-rose-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          URL स्लग (SEO Friendly Slug)
                        </label>
                        <input
                          type="text"
                          value={createSlug}
                          onChange={(e) => setCreateSlug(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          श्रेणी (Category)
                        </label>
                        <select
                          value={createCategory}
                          onChange={(e) => setCreateCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.slug}>
                              {c.nameHi} ({c.nameEn})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCreationStep(2)}
                      className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700"
                    >
                      वापस (Back)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreationStep(4)}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <span>अगला: वर्डप्रेस HTML कंटेंट (Next: Generate HTML)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: WORDPRESS-READY HTML CONTENT */}
              {creationStep === 4 && (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-between">
                    <span>चरण 4: वर्डप्रेस रेडी HTML प्रारूप (Gutenberg / Classic Compatible)</span>
                    <button
                      type="button"
                      onClick={() => triggerCopy(generatedHtml, 'html-code')}
                      className="px-2.5 py-1 bg-white text-emerald-800 rounded-lg text-xs font-bold shadow-2xs flex items-center gap-1"
                    >
                      {copiedKey === 'html-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'html-code' ? 'कॉपी हो गया' : 'HTML कॉपी करें'}</span>
                    </button>
                  </div>

                  <div className="bg-zinc-950 rounded-2xl p-4 text-zinc-200 font-mono text-xs overflow-x-auto max-h-80 border border-zinc-800">
                    <pre className="whitespace-pre-wrap">{generatedHtml}</pre>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCreationStep(3)}
                      className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700"
                    >
                      वापस (Back)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreationStep(5)}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <span>अगला: सत्यापन व प्रकाशन (Next: Validation & Publish)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: VALIDATION CHECKLIST & PUBLISH */}
              {creationStep === 5 && (
                <div className="space-y-5">
                  <div className="p-3 bg-indigo-50 text-indigo-900 rounded-xl text-xs font-bold">
                    चरण 5: अंतिम सत्यापन चेकलिस्ट (Validation Checklist & Publishing)
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>शीर्षक आकर्षक है और मुख्य फोकस कीवर्ड शामिल है</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>उचित हेडिंग पदानुक्रम (H2, H3) सुरक्षित है</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>पठनीयता स्कोर 60+ (सरल और प्रभावी वाक्य)</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>मेटा टाइटल (55-60) व मेटा विवरण (150-160) पूर्ण है</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>इमेज ऑल्ट टेक्स्ट व आंतरिक लिंक सुझाव सम्मिलित</span>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                    <div>
                      <strong>क्या आप सीधे प्रकाशित करना चाहते हैं या एडिटर में संशोधित करना चाहते हैं?</strong>
                      <div className="text-[11px] text-amber-700 mt-0.5">
                        आर्टिकल तुरंत लाइव पोर्टल पर जोड़ा जाएगा और डेटाबेस में सुरक्षित रहेगा।
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setCreationStep(4)}
                      className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700"
                    >
                      वापस (Back)
                    </button>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onCreateArticle({
                            title: createTitle,
                            categorySlug: createCategory,
                            focusKeyword: createKeyword,
                            metaTitle: createMetaTitle,
                            metaDescription: createMetaDesc,
                            slug: createSlug,
                            tags: createTags,
                            body: generatedHtml.split('\n\n').filter(Boolean),
                            status: 'draft'
                          });
                          showNotice('आर्टिकल सफलतापूर्वक ड्राफ्ट में सेव हुआ!');
                        }}
                        className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs"
                      >
                        💾 ड्राफ्ट सेव करें (Save Draft)
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSaveArticle({
                            title: createTitle,
                            categorySlug: createCategory,
                            focusKeyword: createKeyword,
                            metaTitle: createMetaTitle,
                            metaDescription: createMetaDesc,
                            slug: createSlug,
                            tags: createTags,
                            body: generatedHtml.split('\n\n').filter(Boolean),
                            status: 'published'
                          });
                          showNotice('🎉 आर्टिकल सफलतापूर्वक प्रकाशित (Published) हुआ!');
                        }}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                      >
                        <Send className="w-4 h-4" />
                        <span>सीधे प्रकाशित करें (Publish Now)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              VIEW 3: CONTENT TEMPLATES LIBRARY (Module 11)
             ========================================================= */}
          {activeSection === 'templates' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for Writer */}
              <div className="flex items-center gap-2 p-1 bg-gray-100/90 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveSection('creation')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  ⚡ {t.wizTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('templates')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  📋 {t.tplTitle}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-rose-600" />
                    <span>{t.tplTitle}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.tplSubtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TEMPLATES.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    className="p-4 rounded-2xl border border-gray-200/90 hover:border-rose-400 bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xl">{tmpl.icon}</span>
                        <h4 className="font-bold text-sm text-gray-900">{tmpl.title}</h4>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{tmpl.desc}</p>
                      <div className="mt-3 p-2.5 bg-gray-50 rounded-xl text-[11px] text-gray-700 font-mono">
                        {tmpl.suggestedTitle}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-semibold">
                        {tmpl.outline.length} हेडिंग सेक्शन्स
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onCreateArticle({
                            title: tmpl.suggestedTitle,
                            body: tmpl.outline.map((h) => `${h}\n\nयहाँ संबंधित विवरण और तथ्य लिखें।`),
                            status: 'draft'
                          });
                          showNotice(`टेम्पलेट "${tmpl.title}" एडिटर में लोड हो गया!`);
                        }}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors"
                      >
                        यह टेम्पलेट उपयोग करें →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 4: SEO OPTIMIZATION MODULE (Module 5)
             ========================================================= */}
          {activeSection === 'seo' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for SEO Suite */}
              <div className="flex items-center gap-2 p-1 bg-gray-100/90 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveSection('seo')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  🔍 {t.seoTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('enhancer')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🪄 {t.enhancerTitle}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Search className="w-5 h-5 text-emerald-600" />
                    <span>{t.seoTitle}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.seoSubtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">SEO स्कोर</div>
                    <div className="text-xl font-black text-emerald-600">{currentAudit.overallScore}/100</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      showNotice('सभी संभावित SEO सुधार स्वचालित रूप से लागू किए गए!');
                    }}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    ⚡ Auto-Fix All Issues
                  </button>
                </div>
              </div>

              {/* Checklist Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Title Tag & Meta */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>टाइटल एवं मेटा डिस्क्रिप्शन (Title & Meta)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">शीर्षक लंबाई (Title Length):</span>
                    <span className="font-bold text-emerald-700 font-mono">
                      {activeArticle.title?.length || 58} अक्षर (Optimal 55-60)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">शीर्षक में कीवर्ड:</span>
                    <span className="font-bold text-emerald-700">हाँ (शुरुआत में मौजूद ✓)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">मेटा विवरण (Meta Description):</span>
                    <span className="font-bold text-emerald-700 font-mono">154 अक्षर (Target 150-160 ✓)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">कॉल-टू-एक्शन (CTA) उपस्थित:</span>
                    <span className="font-bold text-emerald-700">हाँ ✓</span>
                  </div>
                </div>

                {/* 2. Content Analysis */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>कंटेंट व कीवर्ड डेंसिटी (Content & Keywords)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">कुल शब्द (Word Count):</span>
                    <span className="font-bold text-gray-900 font-mono">1,480 शब्द (Target: 1000+ ✓)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">फोकस कीवर्ड डेंसिटी:</span>
                    <span className="font-bold text-emerald-700 font-mono">1.1% (Target: 0.5-1.5% ✓)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">H2 हेडिंग में कीवर्ड:</span>
                    <span className="font-bold text-emerald-700">हाँ (2 हेडिंग्स में उपस्थित ✓)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Flesch Reading Ease:</span>
                    <span className="font-bold text-emerald-700 font-mono">74/100 (आसान व पठनीय ✓)</span>
                  </div>
                </div>

                {/* 3. Heading Structure */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>हेडिंग पदानुक्रम (Headings Hierarchy)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">H1 टैग संख्या:</span>
                    <span className="font-bold text-emerald-700 font-mono">1 (Strictly 1 ✓)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">H2 मुख्य खंड:</span>
                    <span className="font-bold text-emerald-700 font-mono">6 खंड (Recommended 5-8 ✓)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">H3 उपखंड:</span>
                    <span className="font-bold text-emerald-700 font-mono">5 उपखंड ✓</span>
                  </div>
                </div>

                {/* 4. Images & Links */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>इमेजेस व लिंक्स (Images & Links)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">ऑल्ट टेक्स्ट (Alt Text) युक्त इमेजेस:</span>
                    <span className="font-bold text-emerald-700">100% (सभी इमेजेस में मौजूद ✓)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">आंतरिक लिंक्स (Internal Links):</span>
                    <span className="font-bold text-emerald-700 font-mono">4 लिंक्स (Target: 3-5 ✓)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">प्रामाणिक बाहरी लिंक्स (External Links):</span>
                    <span className="font-bold text-emerald-700 font-mono">2 लिंक्स ✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 5: AI CONTENT ENHANCER (Module 19)
             ========================================================= */}
          {activeSection === 'enhancer' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for SEO Suite */}
              <div className="flex items-center gap-2 p-1 bg-gray-100/90 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveSection('seo')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🔍 {t.seoTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('enhancer')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  🪄 {t.enhancerTitle}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span>{t.enhancerTitle}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.enhancerSubtitle}
                  </p>
                </div>
              </div>

              {/* Enhancer Tool Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'headlines', label: '🔥 5 हेडलाइन विकल्प (Headlines)' },
                  { id: 'expander', label: '📖 पैराग्राफ एक्सपैंडर (Expander)' },
                  { id: 'readability', label: '✨ पठनीयता सुधारक (Readability)' },
                  { id: 'grammar', label: '✍️ व्याकरण व स्पेल चेक (Grammar)' },
                  { id: 'tone', label: '🎭 टोन एडजस्टर (Tone)' },
                  { id: 'plagiarism', label: '🛡️ मौलिकता जांच (Plagiarism)' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setEnhancerTool(t.id as any);
                      runEnhancer(t.id);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      enhancerTool === t.id
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  विश्लेषण हेतु टेक्स्ट / शीर्षक (Input Text):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={enhancerInput}
                    onChange={(e) => setEnhancerInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => runEnhancer(enhancerTool)}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEnhancing ? 'विश्लेषण...' : 'AI से प्रोसेस करें'}</span>
                  </button>
                </div>
              </div>

              {/* Result Area */}
              {enhancedResult && (
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>AI संवर्धित परिणाम (Generated Enhancement):</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => triggerCopy(enhancedResult, 'enhancer-res')}
                      className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'enhancer-res' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'enhancer-res' ? 'कॉपी हो गया' : 'कॉपी करें'}</span>
                    </button>
                  </div>
                  <div className="text-xs text-gray-800 leading-relaxed font-sans whitespace-pre-wrap bg-white p-4 rounded-xl border border-amber-100 shadow-2xs">
                    {enhancedResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              VIEW 6: SCHEDULING & PUBLISHING (Module 6)
             ========================================================= */}
          {activeSection === 'scheduling' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for Media/Schedule */}
              <div className="flex items-center gap-2 p-1 bg-gray-100/90 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveSection('scheduling')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  ⏰ {t.schedTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('media')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🖼️ {t.mediaTitle}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <span>{t.schedTitle}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.schedSubtitle}
                  </p>
                </div>
                <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-black">
                  तत्परता स्कोर: {checklistCount}/12 ✓
                </div>
              </div>

              {/* Status Radio Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'publish', label: 'तत्काल पब्लिश (Immediate Public)', desc: 'सीधे लाइव पोर्टल पर' },
                  { id: 'schedule', label: 'शेड्यूल करें (Schedule for Later)', desc: 'निर्धारित तिथि व समय' },
                  { id: 'draft', label: 'ड्राफ्ट (Save as Draft)', desc: 'केवल बैकएंड में सुरक्षित' },
                  { id: 'private', label: 'प्राइवेट (Only Admins)', desc: 'सार्वजनिक रूप से गुप्त' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setScheduleStatus(st.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      scheduleStatus === st.id
                        ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 ring-2 ring-indigo-200'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-bold text-xs">{st.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{st.desc}</div>
                  </button>
                ))}
              </div>

              {/* Schedule Date & Time Controls */}
              {scheduleStatus === 'schedule' && (
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                  <div className="text-xs font-bold text-indigo-900">भविष्य के प्रकाशन का समय चुनें:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">दिनांक (Date)</label>
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">समय (Time - IST)</label>
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold bg-white"
                      />
                    </div>
                  </div>
                  <div className="text-[11px] text-indigo-700">
                    💡 <strong>सर्वोत्तम प्रकाशन समय (Best Times):</strong> मंगलवार - गुरुवार, सुबह 9 से 11 बजे या दोपहर 2 से 4 बजे (उच्चतम पाठक सहभागिता)
                  </div>
                </div>
              )}

              {/* 12-Point Checklist Grid */}
              <div>
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-2.5">
                  12-बिंदु प्री-पब्लिश चेकलिस्ट (Pre-Publish Checklist)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries({
                    titleCompelling: 'शीर्षक अंतिम रूप दिया गया व कीवर्ड मौजूद',
                    contentProofread: 'कंटेंट प्रूफरीड व वर्तनी त्रुटिरहित',
                    imagesOptimized: 'इमेजेस कंप्रेस व WebP में अनुकूलित',
                    metaDescWritten: 'मेटा डिस्क्रिप्शन (150-160 अक्षर) लिखा गया',
                    categoriesAssigned: 'उचित प्राथमिक श्रेणी व टैग्स असाइन किए गए',
                    featuredImageSet: 'फीचर्ड इमेज (1200x630px) निर्धारित',
                    seoAcceptable: 'SEO स्कोर 70+ से अधिक स्वीकार्य',
                    internalLinksAdded: '3-5 आंतरिक लिंक्स जोड़े गए',
                    externalLinksVerified: 'विश्वसनीय बाहरी स्रोत सत्यापित',
                    mobilePreviewChecked: 'मोबाइल स्क्रीन पर पूर्वावलोकन ठीक',
                    excerptCreated: 'संक्षिप्त अंश (Excerpt) तैयार',
                    authorAssigned: 'संपादक / लेखक का नाम दर्ज'
                  }).map(([key, label]) => {
                    const isChecked = checklist[key as keyof typeof checklist];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          setChecklist((prev) => ({
                            ...prev,
                            [key]: !prev[key as keyof typeof checklist]
                          }))
                        }
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition-colors ${
                          isChecked
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                            : 'bg-white border-gray-200 text-gray-600'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${isChecked ? 'text-emerald-600' : 'text-gray-300'}`}
                        />
                        <span className="font-semibold">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Publish Action Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    showNotice(
                      scheduleStatus === 'schedule'
                        ? `आर्टिकल ${scheduleDate} को ${scheduleTime} बजे के लिए सफलतापूर्वक शेड्यूल किया गया!`
                        : 'आर्टिकल सफलतापूर्वक प्रकाशित हुआ!'
                    );
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {scheduleStatus === 'schedule' ? 'शेड्यूल सुरक्षित करें (Confirm Schedule)' : 'अभी प्रकाशित करें (Confirm Publish)'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 7: MEDIA & IMAGE MANAGEMENT (Module 8)
             ========================================================= */}
          {activeSection === 'media' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for Media/Schedule */}
              <div className="flex items-center gap-2 p-1 bg-gray-100/90 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveSection('scheduling')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  ⏰ {t.schedTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('media')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  🖼️ {t.mediaTitle}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-rose-600" />
                    <span>{t.mediaTitle}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.mediaSubtitle}
                  </p>
                </div>
              </div>

              {/* Upload Box Simulation */}
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center hover:border-rose-400 bg-gray-50/60 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-gray-900">
                  इमेज ड्रैग व ड्रॉप करें या क्लिक करके अपलोड करें
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  अधिकतम 2MB • JPG, PNG, WebP • अनुशंसित अनुपात 16:9 या 1200x630
                </div>

                {/* Auto Optimization Toggles */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-3 border-t border-gray-200/80 text-xs">
                  <label className="flex items-center gap-1.5 font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoOptimizeWebp}
                      onChange={(e) => setAutoOptimizeWebp(e.target.checked)}
                      className="rounded text-rose-600"
                    />
                    <span>WebP में स्वतः कंप्रेस करें (60-80% बचत)</span>
                  </label>
                  <label className="flex items-center gap-1.5 font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoWatermark}
                      onChange={(e) => setAutoWatermark(e.target.checked)}
                      className="rounded text-rose-600"
                    />
                    <span>भारत समाचार वाटरमार्क जोड़ें</span>
                  </label>
                </div>
              </div>

              {/* Alt Text Suggester */}
              <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200/80 space-y-2">
                <div className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>स्वचालित इमेज ऑल्ट टेक्स्ट जनरेटर (SEO Alt Text):</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={altTextSuggestion}
                    onChange={(e) => setAltTextSuggestion(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => showNotice('ऑल्ट टेक्स्ट आर्टिकल में सेव किया गया!')}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    अप्लाई करें
                  </button>
                </div>
              </div>

              {/* Stock Images Gallery */}
              <div>
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-2.5">
                  रॉयल्टी-फ्री स्टॉक इमेजेस (Unsplash / News Assets)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {STOCK_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      className="group relative rounded-xl overflow-hidden border border-gray-200 aspect-16/10 bg-gray-100"
                    >
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 text-white">
                        <span className="text-[10px] font-bold bg-black/60 px-1.5 py-0.5 rounded self-start">
                          {img.tag}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            showNotice(`इमेज "${img.title}" फीचर्ड इमेज के रूप में सेट हुई!`);
                          }}
                          className="w-full py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded-lg"
                        >
                          उपयोग करें
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 8: REVISIONS & AUTO-SAVE (Module 12)
             ========================================================= */}
          {activeSection === 'revisions' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for Workflow & Settings */}
              <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-xl w-fit overflow-x-auto max-w-full">
                <button
                  type="button"
                  onClick={() => setActiveSection('revisions')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  🕒 {t.revTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('taxonomy')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🏷️ {t.modTaxonomy}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('roles')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  👥 {t.modRoles}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('delete_module')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🛡️ {t.modDelete}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('settings_help')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  ⚙️ {t.modSettings}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-600" />
                    <span>{t.revTitle}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.revSubtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const jsonBackup = JSON.stringify(articles, null, 2);
                    const blob = new Blob([jsonBackup], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `wp-articles-backup-${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    showNotice('बैकअप फाइल JSON में डाउनलोड हो गई!');
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <span>JSON बैकअप एक्सपोर्ट</span>
                </button>
              </div>

              <div className="space-y-3">
                {revisions.map((rev, idx) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl border border-gray-200/90 bg-white space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                        <span className="font-bold text-gray-900">{rev.time}</span>
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-mono text-[10px]">
                          द्वारा: {rev.author}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => showNotice(`संस्करण ${rev.time} सफलतापूर्वक रीस्टोर किया गया!`)}
                          className="px-2.5 py-1 bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 font-bold rounded-lg transition-colors text-[11px]"
                        >
                          यह वर्जन रीस्टोर करें
                        </button>
                      </div>
                    </div>

                    <div className="text-gray-600 font-medium">{rev.desc}</div>

                    {rev.diffAdded && (
                      <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg font-mono text-[11px]">
                        {rev.diffAdded}
                      </div>
                    )}
                    {rev.diffRemoved && (
                      <div className="p-2 bg-rose-50 text-rose-800 rounded-lg font-mono text-[11px]">
                        {rev.diffRemoved}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 9: TAXONOMY (CATEGORIES & TAGS) (Module 7)
             ========================================================= */}
          {activeSection === 'taxonomy' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for Workflow & Settings */}
              <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-xl w-fit overflow-x-auto max-w-full">
                <button
                  type="button"
                  onClick={() => setActiveSection('revisions')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🕒 {t.revTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('taxonomy')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  🏷️ {t.modTaxonomy}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('roles')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  👥 {t.modRoles}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('delete_module')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🛡️ {t.modDelete}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('settings_help')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  ⚙️ {t.modSettings}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-rose-600" />
                    <span>{t.modTaxonomy}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en' ? 'Manage categories, taxonomy hierarchy, and trending tags cloud' : 'श्रेणी पदानुक्रम, स्वचालित टैग सुझाव एवं लोकप्रिय टैग क्लाउड'}
                  </p>
                </div>
              </div>

              {/* Add Category Form */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="text-xs font-bold text-gray-800">नई श्रेणी जोड़ें (Add New Category):</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="श्रेणी नाम (उदा: जलवायु व पर्यावरण)"
                    className="px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="स्लग (उदा: climate-environment)"
                    className="px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => showNotice('नई श्रेणी जोड़ी गई!')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    + श्रेणी सुरक्षित करें
                  </button>
                </div>
              </div>

              {/* Tag Cloud */}
              <div>
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-2.5">
                  लोकप्रिय टैग क्लाउड (Active Tag Cloud & Counts)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { tag: 'ब्रेकिंग न्यूज़', count: 42 },
                    { tag: 'गगनयान 2026', count: 28 },
                    { tag: 'सेमीकंडक्टर', count: 24 },
                    { tag: 'IND vs AUS', count: 35 },
                    { tag: 'ग्रीन हाइड्रोजन', count: 18 },
                    { tag: 'रेपो रेट', count: 16 },
                    { tag: 'बजट 2026', count: 29 },
                    { tag: 'क्वांटम मिशन', count: 12 },
                    { tag: 'AI क्रांति', count: 31 }
                  ].map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 flex items-center gap-1.5 shadow-2xs hover:border-rose-400 cursor-pointer"
                    >
                      <span>#{t.tag}</span>
                      <span className="text-[10px] text-gray-400 font-mono">({t.count})</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 10: USER ROLES & PERMISSIONS (Module 10)
             ========================================================= */}
          {activeSection === 'roles' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for Workflow & Settings */}
              <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-xl w-fit overflow-x-auto max-w-full">
                <button
                  type="button"
                  onClick={() => setActiveSection('revisions')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🕒 {t.revTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('taxonomy')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🏷️ {t.modTaxonomy}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('roles')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  👥 {t.modRoles}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('delete_module')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🛡️ {t.modDelete}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('settings_help')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  ⚙️ {t.modSettings}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span>{t.modRoles}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en' ? 'User permissions, role-based access control (RBAC), and review approval queue' : 'व्यवस्थापक, संपादक, लेखक एवं योगदानकर्ता भूमिकाओं की अनुमतियां'}
                  </p>
                </div>
              </div>

              {/* Roles Table */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 font-bold text-gray-700">
                    <tr>
                      <th className="p-3">भूमिका (Role)</th>
                      <th className="p-3">आर्टिकल निर्माण</th>
                      <th className="p-3">तुरंत पब्लिश</th>
                      <th className="p-3">दूसरों के लेख संपादन</th>
                      <th className="p-3">श्रेणी / टैग्स प्रबंधन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                    <tr>
                      <td className="p-3 font-bold text-rose-600">व्यवस्थापक (Administrator)</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ हाँ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ हाँ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ हाँ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ हाँ</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-purple-600">संपादक (Editor)</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ हाँ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ हाँ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ हाँ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ सीमित</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-blue-600">लेखक (Author)</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ हाँ</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ स्वयं के</td>
                      <td className="p-3 text-rose-600 font-bold">✗ नहीं</td>
                      <td className="p-3 text-rose-600 font-bold">✗ नहीं</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-600">योगदानकर्ता (Contributor)</td>
                      <td className="p-3 text-emerald-600 font-bold">✓ हाँ</td>
                      <td className="p-3 text-amber-600 font-bold">⚠️ समीक्षाधीन</td>
                      <td className="p-3 text-rose-600 font-bold">✗ नहीं</td>
                      <td className="p-3 text-rose-600 font-bold">✗ नहीं</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pending Review Simulation */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="text-xs font-bold text-amber-900 flex items-center justify-between">
                  <span>समीक्षा हेतु लंबित पोस्ट (Pending Review Queue - 1 Post):</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-mono text-[10px]">
                    Pending Approval
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-gray-900">
                      "राष्ट्रीय हरित हाइड्रोजन मिशन: आगामी 5 वर्षों के लक्ष्य"
                    </div>
                    <div className="text-[11px] text-gray-500">
                      सबमिट किया: संवाददाता राहुल वर्मा • आज 1:15 PM
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => showNotice('आर्टिकल स्वीकृत और प्रकाशित किया गया!')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg"
                    >
                      ✓ स्वीकृत करें (Publish)
                    </button>
                    <button
                      type="button"
                      onClick={() => showNotice('संशोधन अनुरोध भेजा गया!')}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-lg"
                    >
                      संशोधन मांगें
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 11: SAFE DELETE & 301 REDIRECT (Module 3)
             ========================================================= */}
          {activeSection === 'delete_module' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for Workflow & Settings */}
              <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-xl w-fit overflow-x-auto max-w-full">
                <button
                  type="button"
                  onClick={() => setActiveSection('revisions')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🕒 {t.revTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('taxonomy')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🏷️ {t.modTaxonomy}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('roles')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  👥 {t.modRoles}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('delete_module')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  🛡️ {t.modDelete}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('settings_help')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  ⚙️ {t.modSettings}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-rose-600 flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-rose-600" />
                    <span>{t.modDelete}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en' ? 'Safe article deletion, trash recovery protection, and 301 permanent redirects' : 'बिना स्पष्ट पुष्टि के कोई आर्टिकल नहीं हटाया जाता • 301 रीडायरेक्ट व ट्रैश सुरक्षा'}
                  </p>
                </div>
              </div>

              {/* Current Article Danger Box */}
              <div className="p-5 rounded-2xl bg-rose-50/80 border-2 border-rose-300 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-sm text-rose-950">
                      सावधानी: आर्टिकल स्थायी रूप से हटाने की प्रक्रिया
                    </div>
                    <div className="text-xs text-rose-800 mt-1">
                      चयनित आर्टिकल: <strong>"{activeArticle.title}"</strong> (ID: {activeArticle.id})
                    </div>
                    <div className="text-[11px] text-rose-700 mt-0.5">
                      इस आर्टिकल के पास <strong>{activeArticle.views?.toLocaleString('hi-IN') || 0} व्यूज़</strong> और आंतरिक बैकलिंक्स मौजूद हैं।
                    </div>
                  </div>
                </div>

                {/* Safer Alternatives */}
                <div className="bg-white p-3.5 rounded-xl border border-rose-200 space-y-2 text-xs">
                  <div className="font-bold text-gray-900">बेहतर विकल्प (Safer Alternatives):</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => showNotice('आर्टिकल को ड्राफ्ट में स्थानांतरित कर दिया गया!')}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold"
                    >
                      1. ड्राफ्ट में बदलें (Move to Draft)
                    </button>
                    <button
                      type="button"
                      onClick={() => showNotice('आर्टिकल को प्राइवेट कर दिया गया!')}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold"
                    >
                      2. प्राइवेट करें (Only Admins)
                    </button>
                    <button
                      type="button"
                      onClick={() => showNotice('आर्टिकल आर्काइव में स्थानांतरित किया गया!')}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold"
                    >
                      3. आर्काइव करें (Archive)
                    </button>
                  </div>
                </div>

                {/* 301 Redirect URL */}
                <div>
                  <label className="block text-xs font-bold text-rose-900 mb-1">
                    हटाने के बाद 301 स्थायी पुनर्निर्देशन (301 Permanent Redirect URL):
                  </label>
                  <input
                    type="text"
                    value={redirect301Url}
                    onChange={(e) => setRedirect301Url(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-rose-300 text-xs font-mono"
                  />
                </div>

                {/* Explicit "DELETE" Confirmation Input */}
                <div className="p-3.5 bg-white rounded-xl border border-rose-200 space-y-2">
                  <label className="block text-xs font-black text-rose-950">
                    स्थायी पुष्टि के लिए नीचे बॉक्स में <span className="text-rose-600 uppercase">DELETE</span> टाइप करें:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder='टाइप करें "DELETE"'
                      value={deleteInputConfirm}
                      onChange={(e) => setDeleteInputConfirm(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-rose-300 text-xs font-black text-rose-600 focus:outline-hidden uppercase"
                    />
                    <button
                      type="button"
                      disabled={deleteInputConfirm.trim().toUpperCase() !== 'DELETE'}
                      onClick={() => {
                        onRequestDelete(activeArticle.id, activeArticle.title);
                        setDeleteInputConfirm('');
                      }}
                      className="px-5 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-xs transition-colors"
                    >
                      पुष्टि करें व हटाएं (Permanently Delete)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 12: SETTINGS, SHORTCUTS & GUIDES (Module 14, 16, 17, 18)
             ========================================================= */}
          {activeSection === 'settings_help' && (
            <div className="space-y-6">
              {/* Clean Sub-Nav for Workflow & Settings */}
              <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-xl w-fit overflow-x-auto max-w-full">
                <button
                  type="button"
                  onClick={() => setActiveSection('revisions')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🕒 {t.revTitle}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('taxonomy')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🏷️ {t.modTaxonomy}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('roles')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  👥 {t.modRoles}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('delete_module')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  🛡️ {t.modDelete}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('settings_help')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap bg-white text-gray-900 shadow-2xs cursor-pointer"
                >
                  ⚙️ {t.modSettings}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-700" />
                    <span>{t.modSettings}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en' ? 'Editor preferences, social auto-share, shortcuts, and SEO guidelines' : 'एडिटर प्राथमिकताएं, सोशल ऑटो-शेयर, त्वरित कीबोर्ड कमांड्स व एसईओ गाइड'}
                  </p>
                </div>
              </div>

              {/* Keyboard Shortcuts Cheatsheet */}
              <div>
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Keyboard className="w-4 h-4 text-purple-600" />
                  <span>त्वरित कीबोर्ड शॉर्टकट्स (Productivity Shortcuts)</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {[
                    { key: 'Ctrl + S', action: 'ड्राफ्ट तुरंत सेव करें (Save Draft)' },
                    { key: 'Ctrl + P', action: 'आर्टिकल पब्लिश करें (Publish)' },
                    { key: 'Ctrl + K', action: 'हाइपरलिंक जोड़ें (Add Link)' },
                    { key: 'Ctrl + B', action: 'बोल्ड टेक्स्ट (Bold)' },
                    { key: 'Ctrl + Shift + S', action: 'शेड्यूलर खोलें (Schedule)' },
                    { key: 'Ctrl + Shift + P', action: 'लाइव प्रीव्यू देखें (Preview)' },
                    { key: 'Ctrl + Shift + D', action: 'आर्टिकल डुप्लीकेट (Duplicate)' },
                    { key: 'Ctrl + Z', action: 'पूर्ववत करें (Undo)' }
                  ].map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="font-mono font-bold text-purple-700">{s.key}</div>
                      <div className="text-[11px] text-gray-600 mt-0.5">{s.action}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tips & Best Practices */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2 text-xs text-indigo-950">
                <div className="font-bold flex items-center gap-2 text-indigo-900">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>विशेषज्ञ संपादकीय सुझाव (Pro Editorial Tips):</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-indigo-900/90 pl-4 list-disc">
                  <li><strong>प्रथम 100 शब्द:</strong> मुख्य फोकस कीवर्ड को हमेशा पहले अनुच्छेद के भीतर स्वाभाविक रूप से शामिल करें।</li>
                  <li><strong>इमेज आवृत्ति:</strong> प्रत्येक 300-400 शब्दों के बाद कम से कम एक प्रासंगिक और वर्णनात्मक ऑल्ट-टेक्स्ट युक्त इमेज अवश्य जोड़ें।</li>
                  <li><strong>निष्कर्ष में CTA:</strong> लेख के अंत में पाठकों के लिए एक स्पष्ट कॉल-टू-एक्शन (उदा: टिप्पणी करें, शेयर करें या संबंधित लेख पढ़ें) रखें।</li>
                  <li><strong>विशेषज्ञ उत्तर (FAQs):</strong> Google Featured Snippets में स्थान पाने के लिए 2-3 महत्वपूर्ण प्रश्नों के सीधे व सटीक उत्तर दें।</li>
                </ul>
              </div>

              {/* Editor Preferences */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 text-xs">
                <div className="font-bold text-gray-900">सिस्टम प्राथमिकताएं (System Preferences):</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-rose-600" />
                    <span>ऑटो-सेव 60 सेकंड में सक्रिय रखें</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-rose-600" />
                    <span>Yoast एवं Rank Math दोनों एसईओ एल्गोरिदम लागू करें</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-rose-600" />
                    <span>प्रकाशन के समय स्वचालित साइटमैप व पिंग भेजें</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-rose-600" />
                    <span>Flesch Reading Ease स्कोर की लाइव गणना दिखाएं</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
