export interface AdminTranslationDict {
  // Top Banner
  wpAdminBadge: string;
  rankMathBadge: string;
  adminPortalTitle: string;
  adminPortalSubtitle: string;
  aiSuiteBtn: string;
  newArticleBtn: string;
  openAssistantBtn: string;
  langSwitchTitle: string;

  // Metrics
  metricTotalArticles: string;
  metricAvgSeo: string;
  metricScheduled: string;
  metricDrafts: string;
  metricBreaking: string;
  statusGood: string;

  // Tabs
  tabSuite: string;
  tabSuiteBadge: string;
  tabAllPosts: string;
  tabEditorEdit: string;
  tabEditorNew: string;
  tabAssistant: string;
  inEditorActive: string;

  // All Posts Table & Filters
  searchPlaceholder: string;
  statusAll: string;
  statusPublished: string;
  statusDraft: string;
  statusScheduled: string;
  statusPending: string;
  categoriesAll: string;
  colTitleSlug: string;
  colCategory: string;
  colStatus: string;
  colSeoScore: string;
  colViews: string;
  colDate: string;
  colActions: string;
  noArticlesFound: string;
  keywordBadge: string;
  breakingBadge: string;
  actionEditTooltip: string;
  actionViewTooltip: string;
  actionDeleteTooltip: string;
  deleteConfirmedMsg: string;
  articleSavedMsg: string;
  articleUpdatedMsg: string;
  liveViewBtn: string;

  // Assistant Sidebar
  assistantCapabilitiesTitle: string;
  assistantCapSeo: string;
  assistantCapMeta: string;
  assistantCapAudit: string;
  assistantCapSafety: string;
  currentlySelectedPost: string;
  openInEditorBtn: string;

  // AI Suite Header
  suiteHeaderTitle: string;
  suiteHeaderSubtitle: string;
  activePostLabel: string;
  openEditorSmallBtn: string;
  openAssistantSmallBtn: string;

  // AI Suite Sidebar Modules
  moduleNavHeader: string;
  modDashboard: string;
  modCreation: string;
  modTemplates: string;
  modSeo: string;
  modEnhancer: string;
  modScheduling: string;
  modMedia: string;
  modRevisions: string;
  modTaxonomy: string;
  modRoles: string;
  modDelete: string;
  modSettings: string;

  // Streamlined Clean Suite Tabs
  modOverview: string;
  modWriter: string;
  modSeoSuite: string;
  modMediaSchedule: string;
  modSettingsWorkflow: string;

  // Module 1: Dashboard
  dashTitle: string;
  dashSubtitle: string;
  dashTotalArticles: string;
  dashPublished: string;
  dashDrafts: string;
  dashScheduled: string;
  dashTotalPublished: string;
  dashTotalWords: string;
  dashAvgWordCount: string;
  dashTopCategory: string;
  dashAvgSeoScore: string;
  dashTotalViews: string;
  dashAvgTime: string;
  dashAvgRank: string;
  dashTrafficAnalytics: string;
  trafficStatsHeader: string;
  totalPageViews: string;
  uniqueReaders: string;
  avgTimeOnPage: string;
  avgTimeVal: string;
  bounceRate: string;
  deviceShareHeader: string;
  dashDeviceShare: string;
  dashMobile: string;
  mobileDevices: string;
  dashDesktop: string;
  desktopLaptops: string;
  dashTablet: string;
  tablets: string;
  searchRankingHeader: string;
  avgPosition: string;
  impressions: string;
  ctr: string;
  topSearchKeyword: string;
  topKeywordVal: string;
  quickActionsLabel: string;
  btnNewArticle: string;
  btnTemplates: string;
  btnSeoAudit: string;
  btnSchedule: string;
  btnAiEnhancer: string;
  dashSeoHealthTitle: string;
  dashExcellent: string;
  dashNeedsWork: string;
  dashCritical: string;
  dashRecentArticles: string;

  // Module 2: Wizard
  wizTitle: string;
  wizSubtitle: string;
  wizStep1: string;
  wizStep2: string;
  wizStep3: string;
  wizStep4: string;
  wizStep5: string;
  wizArticleTitle: string;
  wizArticleTitlePlaceholder: string;
  wizFocusKeyword: string;
  wizFocusKeywordPlaceholder: string;
  wizCategory: string;
  wizWordCount: string;
  wizTone: string;
  wizAudience: string;
  wizNextStep: string;
  wizPrevStep: string;
  wizHeadingsOutline: string;
  wizOutlineTip: string;
  wizAddH2: string;
  wizMetaTitle: string;
  wizMetaTitlePlaceholder: string;
  wizMetaDesc: string;
  wizMetaDescPlaceholder: string;
  wizSlug: string;
  wizSlugPlaceholder: string;
  wizHtmlGeneratorTitle: string;
  wizGenerateHtmlBtn: string;
  wizCopyHtmlBtn: string;
  wizVerificationTitle: string;
  wizPublishDraftBtn: string;
  wizPublishLiveBtn: string;

  // Module 3: Templates
  tplTitle: string;
  tplSubtitle: string;
  tplFilterAll: string;
  tplFilterTutorial: string;
  tplFilterListicle: string;
  tplFilterNews: string;
  tplFilterReview: string;
  tplUseBtn: string;

  // Module 4: SEO & Rank Math
  seoTitle: string;
  seoSubtitle: string;
  seoOverallScore: string;
  seoAuditResults: string;
  seoAutoFixBtn: string;
  seoKwDensity: string;
  seoReadabilityTitle: string;
  seoReadingEase: string;
  seoChecklistTitle: string;

  // Module 5: AI Enhancer
  enhancerTitle: string;
  enhancerSubtitle: string;
  enhancerOriginalText: string;
  enhancerTool1: string;
  enhancerTool2: string;
  enhancerTool3: string;
  enhancerTool4: string;
  enhancerTool5: string;
  enhancerTool6: string;
  enhancerTool7: string;
  enhancerTool8: string;
  enhancerApplyBtn: string;
  enhancerCopyBtn: string;

  // Module 6: Scheduling
  schedTitle: string;
  schedSubtitle: string;
  schedPublishMode: string;
  schedImmediate: string;
  schedFuture: string;
  schedDatePicker: string;
  schedBestTimes: string;
  schedBestMorning: string;
  schedBestEvening: string;
  schedChecklistTitle: string;
  schedReadyToPublish: string;
  schedScheduleBtn: string;
  schedPublishNowBtn: string;

  // Module 7: Media
  mediaTitle: string;
  mediaSubtitle: string;
  mediaWebpTitle: string;
  mediaWatermarkTitle: string;
  mediaAltGeneratorTitle: string;
  mediaGenerateAltBtn: string;
  mediaLibraryTitle: string;
  mediaSelectFeatured: string;

  // Module 8: Revisions
  revTitle: string;
  revSubtitle: string;
  revAutoSaveInfo: string;
  revTimeline: string;
  revDiffTitle: string;
  revRestoreBtn: string;
  revExportJsonBtn: string;

  // Module 9: Taxonomy
  taxTitle: string;
  taxSubtitle: string;
  taxAddCategory: string;
  taxCategoryName: string;
  taxCategorySlug: string;
  taxAddBtn: string;
  taxPopularTags: string;
  taxTagSuggestions: string;

  // Module 10: Roles
  roleTitle: string;
  roleSubtitle: string;
  roleCurrentRole: string;
  roleAdmin: string;
  roleEditor: string;
  roleAuthor: string;
  roleContributor: string;
  rolePermissions: string;
  roleReviewQueue: string;

  // Module 11: Safe Delete
  delTitle: string;
  delSubtitle: string;
  delWarning: string;
  delTypeDelete: string;
  delSafeOptions: string;
  delOptionDraft: string;
  delOptionPrivate: string;
  delOptionArchive: string;
  delRedirectTitle: string;
  delRedirectPlaceholder: string;
  delPermanentBtn: string;

  // Module 12: Settings & Help
  setHelpTitle: string;
  setHelpSubtitle: string;
  setShortcutsTitle: string;
  setPluginsTitle: string;
  setEditorialGuideTitle: string;

  // Gutenberg Editor
  editorBackToList: string;
  editorEditingTitle: string;
  editorNewPostTitle: string;
  editorSaveDraft: string;
  editorPublish: string;
  editorSchedule: string;
  editorUpdate: string;
  editorTabContent: string;
  editorTabSeo: string;
  editorTabPublish: string;
  editorTabMedia: string;
  editorTabPreview: string;
  editorTitlePlaceholder: string;
  editorContentPlaceholder: string;
  editorCategoryLabel: string;
  editorFormatLabel: string;
  editorStatusLabel: string;
  editorSeoFocusKw: string;
  editorSeoMetaTitle: string;
  editorSeoMetaDesc: string;
  editorSeoSlug: string;
  editorFeaturedImage: string;
  editorTagsLabel: string;
  editorPreviewMobile: string;
  editorPreviewDesktop: string;
}

export const ADMIN_TRANSLATIONS: Record<'hi' | 'en', AdminTranslationDict> = {
  hi: {
    // Top Banner
    wpAdminBadge: 'न्यूज़रूम प्रबंधन',
    rankMathBadge: 'संपादकीय हब',
    adminPortalTitle: 'न्यूज़रूम डैशबोर्ड',
    adminPortalSubtitle: 'स्टोरीज़, ब्रेकिंग न्यूज़ और संपादकीय वर्कफ़्लो का प्रबंधन करें।',
    aiSuiteBtn: 'AI टूल्स',
    newArticleBtn: 'स्टोरी लिखें',
    openAssistantBtn: 'AI असिस्टेंट',
    langSwitchTitle: 'भाषा बदलें (Switch Language)',

    // Metrics
    metricTotalArticles: 'आज प्रकाशित स्टोरीज़',
    metricAvgSeo: 'समीक्षा के लिए लंबित स्टोरीज़',
    metricScheduled: 'आज शेड्यूल की गई',
    metricDrafts: 'ड्राफ्ट्स',
    metricBreaking: 'सक्रिय ब्रेकिंग न्यूज़',
    statusGood: 'उत्कृष्ट',

    // Tabs
    tabSuite: 'AI टूल्स',
    tabSuiteBadge: 'Beta',
    tabAllPosts: 'स्टोरीज़',
    tabEditorEdit: 'स्टोरी एडिटर',
    tabEditorNew: 'स्टोरी लिखें',
    tabAssistant: 'AI चैटबॉट',
    inEditorActive: 'एडिटर में:',

    // All Posts Table & Filters
    searchPlaceholder: 'शीर्षक, कीवर्ड या स्लग से खोजें...',
    statusAll: 'सभी स्थितियां (All Status)',
    statusPublished: 'प्रकाशित (Published)',
    statusDraft: 'ड्राफ्ट (Draft)',
    statusScheduled: 'शेड्यूल (Scheduled)',
    statusPending: 'समीक्षाधीन (Pending)',
    categoriesAll: 'सभी श्रेणियां (All Categories)',
    colTitleSlug: 'शीर्षक व परमालिंक (Title / Permalink)',
    colCategory: 'श्रेणी (Category)',
    colStatus: 'स्थिति (Status)',
    colSeoScore: 'SEO स्कोर (Rank Math)',
    colViews: 'व्यूज़ (Views)',
    colDate: 'दिनांक (Date)',
    colActions: 'कार्रवाई (Actions)',
    noArticlesFound: 'कोई आर्टिकल नहीं मिला। "नया आर्टिकल बनाएं" पर क्लिक करें।',
    keywordBadge: 'KW:',
    breakingBadge: 'ब्रेकिंग',
    actionEditTooltip: 'संपादित करें (Edit)',
    actionViewTooltip: 'पोर्टल पर देखें (View)',
    actionDeleteTooltip: 'डिलीट करें (Delete with confirmation)',
    deleteConfirmedMsg: 'आर्टिकल सफलतापूर्वक हटाया (Deleted) गया।',
    articleSavedMsg: 'सफलतापूर्वक प्रकाशित / सहेजा गया!',
    articleUpdatedMsg: 'सफलतापूर्वक अपडेट किया गया!',
    liveViewBtn: 'लाइव देखें',

    // Assistant Sidebar
    assistantCapabilitiesTitle: 'असिस्टेंट की प्रमुख क्षमताएं',
    assistantCapSeo: 'SEO स्ट्रक्चरिंग: Google व Rank Math दिशानिर्देशों के अनुरूप H1, H2, H3 हेडिंग पदानुक्रम।',
    assistantCapMeta: 'मेटा ऑप्टिमाइज़ेशन: 150-160 अक्षरों के सटीक मेटा डिस्क्रिप्शन और फ्रेंडली URL स्लग।',
    assistantCapAudit: 'क्वालिटी ऑडिट: Flesch Reading Ease फॉर्मूला व कीवर्ड डेंसिटी का सटीक मूल्यांकन।',
    assistantCapSafety: 'सुरक्षित कार्यप्रणाली: किसी भी पोस्ट को हटाने से पहले अनिवार्य दोहरी पुष्टि (Explicit confirmation)।',
    currentlySelectedPost: 'वर्तमान में चयनित पोस्ट',
    openInEditorBtn: 'एडिटर में खोलें (Open in Editor)',

    // AI Suite Header
    suiteHeaderTitle: 'Bharat Samachar WordPress AI मैनेजमेंट सूट',
    suiteHeaderSubtitle: 'लेख निर्माण, संपादन, एसईओ ऑडिट, शेड्यूलिंग, मीडिया मैनेजमेंट, टेम्पलेट्स व सुरक्षित प्रकाशन',
    activePostLabel: 'सक्रिय पोस्ट:',
    openEditorSmallBtn: 'एडिटर खोलें',
    openAssistantSmallBtn: 'चैटबॉट',

    // AI Suite Sidebar Modules
    moduleNavHeader: 'प्रबंधन एवं स्वचालन मॉड्यूल (Modules)',
    modDashboard: '1. डैशबोर्ड व एनालिटिक्स',
    modCreation: '2. आर्टिकल क्रिएशन विजार्ड',
    modTemplates: '3. कंटेंट टेम्पलेट्स लाइब्रेरी',
    modSeo: '4. On-Page SEO व रैंक मैथ',
    modEnhancer: '5. AI कंटेंट एन्हांसर (8 टूल्स)',
    modScheduling: '6. शेड्यूलिंग व 12-प्वाइंट चेकलिस्ट',
    modMedia: '7. मीडिया व इमेज SEO (Alt Text)',
    modRevisions: '8. ऑटो-सेव व रिविजन डिफ',
    modTaxonomy: '9. श्रेणियां एवं स्मार्ट टैग्स',
    modRoles: '10. यूजर रोल्स व वर्कफ्लो',
    modDelete: '11. सुरक्षित डिलीट व 301 रीडायरेक्ट',
    modSettings: '12. शॉर्टकट्स, सेटिंग्स व गाइड',

    // Streamlined Clean Suite Tabs
    modOverview: 'डैशबोर्ड व मेट्रिक्स',
    modWriter: 'आर्टिकल विजार्ड व टेम्पलेट्स',
    modSeoSuite: 'SEO ऑडिट व AI टूल्स',
    modMediaSchedule: 'मीडिया व शेड्यूलिंग',
    modSettingsWorkflow: 'रिविजन व सेटिंग्स',

    // Module 1: Dashboard
    dashTitle: 'संपादकीय डैशबोर्ड व लाइव एनालिटिक्स',
    dashSubtitle: 'आर्टिकल परफॉर्मेंस, ऑर्गेनिक ट्रैफिक, एसईओ स्वास्थ्य एवं पाठक सहभागिता मेट्रिक्स',
    dashTotalArticles: 'कुल आर्टिकल्स',
    dashPublished: 'लाइव प्रकाशित',
    dashDrafts: 'ड्राफ्ट्स',
    dashScheduled: 'शेड्यूल्ड',
    dashTotalPublished: 'कुल प्रकाशित आर्टिकल',
    dashTotalWords: 'कुल शब्द गणना (Words)',
    dashAvgWordCount: 'औसत शब्द प्रति आर्टिकल',
    dashTopCategory: 'शीर्ष श्रेणी (Top Category)',
    dashAvgSeoScore: 'औसत SEO स्कोर',
    dashTotalViews: 'कुल संचयी पेजव्यूज',
    dashAvgTime: 'औसत पठन समय',
    dashAvgRank: 'औसत गूगल सर्च रैंक',
    dashTrafficAnalytics: '30-दिवसीय ट्रैफिक व व्यूज़ ट्रेंड',
    trafficStatsHeader: 'पाठक ट्रैफिक एवं सहभागिता',
    totalPageViews: 'कुल पेजव्यूज',
    uniqueReaders: 'विशिष्ट पाठक',
    avgTimeOnPage: 'औसत पठन समय',
    avgTimeVal: '3 मि 42 से',
    bounceRate: 'बाउंस रेट',
    deviceShareHeader: 'डिवाइस ब्रेकडाउन',
    dashDeviceShare: 'डिवाइस ब्रेकडाउन',
    dashMobile: 'मोबाइल फोन',
    mobileDevices: 'मोबाइल फोन',
    dashDesktop: 'डेस्कटॉप पीसी',
    desktopLaptops: 'डेस्कटॉप व लैपटॉप',
    dashTablet: 'टैबलेट एवं अन्य',
    tablets: 'टैबलेट एवं अन्य',
    searchRankingHeader: 'सर्च इंजन दृश्यता (Google)',
    avgPosition: 'औसत गूगल रैंक',
    impressions: 'मासिक इंप्रेशन्स',
    ctr: 'क्लिक-थ्रू रेट (CTR)',
    topSearchKeyword: 'शीर्ष सर्च कीवर्ड',
    topKeywordVal: 'सेमीकंडक्टर मिशन',
    quickActionsLabel: 'त्वरित कार्य (Quick Actions)',
    btnNewArticle: 'नया आर्टिकल',
    btnTemplates: 'टेम्पलेट्स',
    btnSeoAudit: 'SEO ऑडिट',
    btnSchedule: 'शेड्यूल',
    btnAiEnhancer: 'AI एन्हांसर',
    dashSeoHealthTitle: 'पोर्टल का SEO स्वास्थ्य वितरण',
    dashExcellent: 'उत्कृष्ट (85-100)',
    dashNeedsWork: 'सुधार योग्य (60-84)',
    dashCritical: 'गंभीर ध्यान आवश्यक (<60)',
    dashRecentArticles: 'हाल के शीर्ष प्रदर्शन करने वाले लेख',

    // Module 2: Wizard
    wizTitle: '5-चरणीय आर्टिकल क्रिएशन विजार्ड',
    wizSubtitle: 'संरचित संपादकीय चेकलिस्ट के साथ शून्य से संपूर्ण आर्टिकल का निर्माण',
    wizStep1: 'चरण 1: बुनियादी विवरण',
    wizStep2: 'चरण 2: हेडिंग आउटलाइन',
    wizStep3: 'चरण 3: WP मेटाडेटा',
    wizStep4: 'चरण 4: HTML जनरेशन',
    wizStep5: 'चरण 5: सत्यापन व पब्लिश',
    wizArticleTitle: 'आर्टिकल का शीर्षक (Headline)',
    wizArticleTitlePlaceholder: 'उदा. चंद्रयान-4 मिशन: भारत की चंद्रमा से नमूने लाने की ऐतिहासिक योजना...',
    wizFocusKeyword: 'फोकस कीवर्ड (Primary Keyword)',
    wizFocusKeywordPlaceholder: 'उदा. चंद्रयान-4 मिशन',
    wizCategory: 'संबंधित समाचार श्रेणी',
    wizWordCount: 'लक्षित शब्द गणना (Target Words)',
    wizTone: 'लेखन शैली व टोन',
    wizAudience: 'लक्षित पाठक वर्ग',
    wizNextStep: 'अगला चरण →',
    wizPrevStep: '← पिछला चरण',
    wizHeadingsOutline: 'H1, H2, H3 हेडिंग्स आउटलाइन स्ट्रक्चर',
    wizOutlineTip: 'Rank Math नियम: मुख्य विषय H2 में और उप-बिंदु H3 में होने चाहिए।',
    wizAddH2: '+ नई H2 हेडिंग जोड़ें',
    wizMetaTitle: 'SEO मेटा टाइटल (55-60 वर्ण)',
    wizMetaTitlePlaceholder: 'सर्च इंजन रिजल्ट्स में दिखने वाला शीर्षक...',
    wizMetaDesc: 'मेटा डिस्क्रिप्शन (150-160 वर्ण)',
    wizMetaDescPlaceholder: 'सटीक 150-160 अक्षरों का संक्षिप्त सार जिसमें फोकस कीवर्ड शामिल हो...',
    wizSlug: 'SEO-फ्रेंडली URL स्लग (Permalink)',
    wizSlugPlaceholder: 'chandrayaan-4-mission-isro-lunar-sample',
    wizHtmlGeneratorTitle: 'वर्डप्रेस-रेडी क्लीन HTML जनरेटर',
    wizGenerateHtmlBtn: 'HTML जनरेट करें',
    wizCopyHtmlBtn: 'HTML कॉपी करें',
    wizVerificationTitle: 'प्रकाशन-पूर्व सत्यापन चेकलिस्ट',
    wizPublishDraftBtn: 'ड्राफ्ट के रूप में सहेजें',
    wizPublishLiveBtn: 'सीधे प्रकाशित करें (Publish Live)',

    // Module 3: Templates
    tplTitle: '10 पूर्व-निर्मित कंटेंट टेम्पलेट्स लाइब्रेरी',
    tplSubtitle: 'उच्च-परफॉर्मेंस पत्रकारिता प्रारूपों के साथ 1-क्लिक में संरचित ड्राफ्ट तैयार करें',
    tplFilterAll: 'सभी टेम्पलेट्स (10)',
    tplFilterTutorial: 'हाउ-टू व गाइड्स',
    tplFilterListicle: 'लिस्टिकल्स',
    tplFilterNews: 'समाचार रिपोर्ट',
    tplFilterReview: 'समीक्षा व तुलना',
    tplUseBtn: 'इस टेम्पलेट का उपयोग करें',

    // Module 4: SEO
    seoTitle: 'On-Page SEO व रैंक मैथ ऑडिटर',
    seoSubtitle: 'Google कोर वेब वाइटल्स और रैंक मैथ मानकों पर वास्तविक समय का मूल्यांकन',
    seoOverallScore: 'कुल SEO स्कोर',
    seoAuditResults: 'विस्तृत ऑडिट परिणाम व सुधार सुझाव',
    seoAutoFixBtn: '1-क्लिक AI ऑटो-फिक्स (Auto Fix All)',
    seoKwDensity: 'कीवर्ड डेंसिटी (अनुशंसित: 0.5% - 1.5%)',
    seoReadabilityTitle: 'Flesch Reading Ease पठनीयता स्कोर',
    seoReadingEase: 'पठनीयता स्तर',
    seoChecklistTitle: 'आवश्यक ऑन-पेज SEO चेकलिस्ट',

    // Module 5: AI Enhancer
    enhancerTitle: 'AI कंटेंट एन्हांसर (8 शक्तिशाली टूल्स)',
    enhancerSubtitle: 'हेडलाइंस, पैराग्राफ, पठनीयता और भाषा शैली को बेहतर बनाने हेतु उन्नत AI',
    enhancerOriginalText: 'मूल सामग्री (जिस पर AI टूल लागू करना है):',
    enhancerTool1: '1. 5 वायरल हेडलाइंस जनरेटर',
    enhancerTool2: '2. पैराग्राफ एक्सपैंडर',
    enhancerTool3: '3. पठनीयता सुधारक (Flesch Boost)',
    enhancerTool4: '4. व्याकरण व स्पेल चेक',
    enhancerTool5: '5. टोन कनवर्टर (पत्रकारिता)',
    enhancerTool6: '6. मुख्य बिंदु (Bullet Points)',
    enhancerTool7: '7. मौलिकता व प्लेजियरिज्म चेक',
    enhancerTool8: '8. FAQ जनरेटर (Schema Ready)',
    enhancerApplyBtn: 'आर्टिकल में लागू करें',
    enhancerCopyBtn: 'कॉपी करें',

    // Module 6: Scheduling
    schedTitle: 'शेड्यूलिंग व 12-प्वाइंट प्री-पब्लिश चेकलिस्ट',
    schedSubtitle: 'समयबद्ध प्रकाशन, उच्चतम ट्रैफिक स्लॉट्स एवं कठोर गुणवत्ता नियंत्रण',
    schedPublishMode: 'प्रकाशन का तरीका चुनें:',
    schedImmediate: 'तुरंत प्रकाशित करें (Instant Live)',
    schedFuture: 'भविष्य के लिए शेड्यूल करें (Schedule for Later)',
    schedDatePicker: 'प्रकाशन की तारीख और समय चुनें:',
    schedBestTimes: 'सर्वोत्तम प्रकाशन समय सुझाव:',
    schedBestMorning: 'सुबह 8:30 AM (प्रात:कालीन समाचार अलर्ट्स)',
    schedBestEvening: 'शाम 7:15 PM (पीक प्राइम-टाइम ट्रैफिक)',
    schedChecklistTitle: '12-प्वाइंट अनिवार्य प्री-पब्लिश चेकलिस्ट:',
    schedReadyToPublish: 'प्रकाशन हेतु तैयार',
    schedScheduleBtn: 'निर्धारित समय पर शेड्यूल करें',
    schedPublishNowBtn: 'अभी तुरंत प्रकाशित करें',

    // Module 7: Media
    mediaTitle: 'मीडिया व इमेज SEO (Alt Text & WebP)',
    mediaSubtitle: 'स्वचालित इमेज ऑप्टिमाइजेशन, ऑल्ट-टेक्स्ट जनरेटर और कॉपीराइट-फ्री मीडिया',
    mediaWebpTitle: 'WebP स्वचालित रूपांतरण व संपीड़न (Compression)',
    mediaWatermarkTitle: 'भारत समाचार लोगो वाटरमार्क सुरक्षा',
    mediaAltGeneratorTitle: 'AI इमेज ऑल्ट-टेक्स्ट व कैप्शन जनरेटर',
    mediaGenerateAltBtn: 'ऑल्ट टेक्स्ट जनरेट करें',
    mediaLibraryTitle: 'रॉयल्टी-फ्री मीडिया लाइब्रेरी (Unsplash)',
    mediaSelectFeatured: 'फीचर्ड इमेज के रूप में चुनें',

    // Module 8: Revisions
    revTitle: 'ऑटो-सेव एवं रिविजन डिफ (Side-by-Side Diff)',
    revSubtitle: 'प्रत्येक 60 सेकंड में स्वचालित बैकअप और पूर्व संस्करणों की सटीक तुलना',
    revAutoSaveInfo: 'ऑटो-सेव सक्रिय है: अंतिम बैकअप 30 सेकंड पूर्व',
    revTimeline: 'रिविजन इतिहास टाइमलाइन',
    revDiffTitle: 'परिवर्तन तुलना (Red = हटाया गया, Green = जोड़ा गया)',
    revRestoreBtn: 'यह संस्करण रीस्टोर करें',
    revExportJsonBtn: 'पूर्ण JSON बैकअप डाउनलोड करें',

    // Module 9: Taxonomy
    taxTitle: 'श्रेणियां एवं स्मार्ट टैग्स क्लाउड',
    taxSubtitle: 'सुसंगत वर्गीकरण, साइट आर्किटेक्चर और SEO टैग संरचना',
    taxAddCategory: '+ नई श्रेणी जोड़ें',
    taxCategoryName: 'श्रेणी का नाम (उदा. रक्षा एवं सुरक्षा)',
    taxCategorySlug: 'श्रेणी स्लग (उदा. defense)',
    taxAddBtn: 'श्रेणी बनाएं',
    taxPopularTags: 'वर्तमान में लोकप्रिय टैग्स क्लाउड',
    taxTagSuggestions: 'AI सुझाए गए ट्रेंडिंग टैग्स',

    // Module 10: Roles
    roleTitle: 'यूजर रोल्स व संपादकीय वर्कफ्लो (RBAC)',
    roleSubtitle: 'संपादक, लेखक, प्रूफरीडर व व्यवस्थापक हेतु अनुमति नियंत्रण',
    roleCurrentRole: 'वर्तमान सक्रिय भूमिका:',
    roleAdmin: 'व्यवस्थापक (Administrator)',
    roleEditor: 'वरिष्ठ संपादक (Editor)',
    roleAuthor: 'पत्रकार / लेखक (Author)',
    roleContributor: 'योगदानकर्ता (Contributor)',
    rolePermissions: 'सक्रिय अनुमतियां तालिका',
    roleReviewQueue: 'संपादकीय समीक्षा कतार (Pending Review)',

    // Module 11: Safe Delete
    delTitle: 'सुरक्षित डिलीट व 301 रीडायरेक्ट मॉड्यूल',
    delSubtitle: 'आकस्मिक डेटा हानि की रोकथाम, SEO लिंक जूस का संरक्षण और 301 पुनर्निर्देशन',
    delWarning: 'चेतावनी: किसी आर्टिकल को डिलीट करने से पहले सुरक्षा उपायों पर विचार करें।',
    delTypeDelete: 'पुष्टि हेतु "DELETE" टाइप करें:',
    delSafeOptions: 'सुरक्षित विकल्प (डिलीट करने के बजाय):',
    delOptionDraft: 'ड्राफ्ट में बदलें (अप्रकाशित करें)',
    delOptionPrivate: 'केवल निजी (Private) बनाएं',
    delOptionArchive: 'पुरालेख (Archive) में स्थानांतरित करें',
    delRedirectTitle: '301 स्थाई रीडायरेक्ट गंतव्य URL (अनुशंसित):',
    delRedirectPlaceholder: 'https://bharatsamachar.live/news/...',
    delPermanentBtn: 'स्थाई रूप से डिलीट करें (Permanent Delete)',

    // Module 12: Settings & Help
    setHelpTitle: 'शॉर्टकट्स, सेटिंग्स एवं संपादकीय दिशानिर्देश',
    setHelpSubtitle: 'तेज संपादकीय कार्यप्रवाह, प्लगइन इंटीग्रेशन और गुणवत्ता मानक',
    setShortcutsTitle: 'त्वरित कीबोर्ड शॉर्टकट्स (Hotkeys)',
    setPluginsTitle: 'WordPress प्लगइन कनेक्टिविटी स्थिति',
    setEditorialGuideTitle: 'भारत समाचार संपादकीय सत्यनिष्ठा दिशानिर्देश',

    // Gutenberg Editor
    editorBackToList: '← सभी पोस्ट्स पर वापस जाएं',
    editorEditingTitle: 'आर्टिकल संपादन (Gutenberg Mode)',
    editorNewPostTitle: 'नया आर्टिकल बनाएं (New Post)',
    editorSaveDraft: 'ड्राफ्ट सहेजें',
    editorPublish: 'प्रकाशित करें',
    editorSchedule: 'शेड्यूल करें',
    editorUpdate: 'अपडेट करें',
    editorTabContent: 'सामग्री एवं हेडिंग्स',
    editorTabSeo: 'Rank Math SEO',
    editorTabPublish: 'प्रकाशन एवं शेड्यूलिंग',
    editorTabMedia: 'मीडिया एवं थंबनेल',
    editorTabPreview: 'पूर्वावलोकन',
    editorTitlePlaceholder: 'यहाँ समाचार का मुख्य शीर्षक दर्ज करें (H1)...',
    editorContentPlaceholder: 'यहाँ आर्टिकल की सामग्री लिखें...',
    editorCategoryLabel: 'श्रेणी (Category)',
    editorFormatLabel: 'कंटेंट फॉर्मेट (Format)',
    editorStatusLabel: 'पोस्ट स्थिति (Status)',
    editorSeoFocusKw: 'फोकस कीवर्ड (Rank Math Focus KW)',
    editorSeoMetaTitle: 'मेटा टाइटल (55-60 वर्ण)',
    editorSeoMetaDesc: 'मेटा डिस्क्रिप्शन (150-160 वर्ण)',
    editorSeoSlug: 'परमालिंक स्लग (URL Slug)',
    editorFeaturedImage: 'कवर इमेज URL (Featured Image)',
    editorTagsLabel: 'टैग्स (अल्पविराम से अलग करें)',
    editorPreviewMobile: 'मोबाइल व्यू',
    editorPreviewDesktop: 'डेस्कटॉप व्यू'
  },
  en: {
    // Top Banner
    wpAdminBadge: 'Newsroom Management',
    rankMathBadge: 'Editorial Hub',
    adminPortalTitle: 'Newsroom Dashboard',
    adminPortalSubtitle: 'Manage stories, breaking news, and editorial workflow.',
    aiSuiteBtn: 'AI Tools',
    newArticleBtn: 'Write Story',
    openAssistantBtn: 'AI Assistant',
    langSwitchTitle: 'Switch Language (हिंदी / English)',

    // Metrics
    metricTotalArticles: 'Stories Published Today',
    metricAvgSeo: 'Stories Awaiting Review',
    metricScheduled: 'Scheduled Today',
    metricDrafts: 'Drafts',
    metricBreaking: 'Active Breaking News',
    statusGood: 'Good',

    // Tabs
    tabSuite: 'AI Tools',
    tabSuiteBadge: 'Beta',
    tabAllPosts: 'Stories',
    tabEditorEdit: 'Story Editor (Editing)',
    tabEditorNew: 'Write Story',
    tabAssistant: 'AI Chatbot',
    inEditorActive: 'In Editor:',

    // All Posts Table & Filters
    searchPlaceholder: 'Search by title, keyword, or slug...',
    statusAll: 'All Statuses',
    statusPublished: 'Published',
    statusDraft: 'Draft',
    statusScheduled: 'Scheduled',
    statusPending: 'Pending Review',
    categoriesAll: 'All Categories',
    colTitleSlug: 'Title & Permalink',
    colCategory: 'Category',
    colStatus: 'Status',
    colSeoScore: 'SEO Score (Rank Math)',
    colViews: 'Views',
    colDate: 'Date',
    colActions: 'Actions',
    noArticlesFound: 'No articles found. Click "Create New Article" to start.',
    keywordBadge: 'KW:',
    breakingBadge: 'Breaking',
    actionEditTooltip: 'Edit Post',
    actionViewTooltip: 'View on Live Portal',
    actionDeleteTooltip: 'Delete with Confirmation',
    deleteConfirmedMsg: 'Article deleted successfully.',
    articleSavedMsg: 'Published & saved successfully!',
    articleUpdatedMsg: 'Updated successfully!',
    liveViewBtn: 'View Live',

    // Assistant Sidebar
    assistantCapabilitiesTitle: 'Assistant Capabilities',
    assistantCapSeo: 'SEO Structuring: H1, H2, H3 heading hierarchies adhering to Google and Rank Math standards.',
    assistantCapMeta: 'Meta Optimization: 150-160 character meta descriptions and clean, SEO-friendly permalink slugs.',
    assistantCapAudit: 'Quality Audit: Flesch Reading Ease readability scoring and keyword density calculations.',
    assistantCapSafety: 'Safety Protocol: Explicit two-step confirmation required before any post deletion.',
    currentlySelectedPost: 'Currently Selected Post',
    openInEditorBtn: 'Open in Editor',

    // AI Suite Header
    suiteHeaderTitle: 'Bharat Samachar WordPress AI Management Suite',
    suiteHeaderSubtitle: 'Article drafting, editorial revisions, SEO audits, scheduling, media optimization, templates & safe publishing',
    activePostLabel: 'Active Post:',
    openEditorSmallBtn: 'Open Editor',
    openAssistantSmallBtn: 'AI Chatbot',

    // AI Suite Sidebar Modules
    moduleNavHeader: 'Management & Automation Modules',
    modDashboard: '1. Dashboard & Analytics',
    modCreation: '2. Article Creation Wizard',
    modTemplates: '3. Content Templates Library',
    modSeo: '4. On-Page SEO & Rank Math',
    modEnhancer: '5. AI Content Enhancer (8 Tools)',
    modScheduling: '6. Scheduling & 12-Point Checklist',
    modMedia: '7. Media & Image SEO (Alt Text)',
    modRevisions: '8. Auto-Save & Revision Diff',
    modTaxonomy: '9. Categories & Smart Tags',
    modRoles: '10. User Roles & Workflow',
    modDelete: '11. Safe Delete & 301 Redirect',
    modSettings: '12. Shortcuts, Settings & Guide',

    // Streamlined Clean Suite Tabs
    modOverview: 'Overview & Metrics',
    modWriter: 'Article Wizard & Templates',
    modSeoSuite: 'SEO Audit & AI Tools',
    modMediaSchedule: 'Media & Scheduling',
    modSettingsWorkflow: 'Revisions & Settings',

    // Module 1: Dashboard
    dashTitle: 'Editorial Dashboard & Live Analytics',
    dashSubtitle: 'Article performance, organic search traffic, SEO health scores, and audience engagement metrics',
    dashTotalArticles: 'Total Articles',
    dashPublished: 'Published Live',
    dashDrafts: 'Drafts In-Progress',
    dashScheduled: 'Scheduled',
    dashTotalPublished: 'Total Published Posts',
    dashTotalWords: 'Total Word Count',
    dashAvgWordCount: 'Avg. Words per Article',
    dashTopCategory: 'Top Category',
    dashAvgSeoScore: 'Average SEO Score',
    dashTotalViews: 'Cumulative Pageviews',
    dashAvgTime: 'Average Read Time',
    dashAvgRank: 'Avg. Google Search Rank',
    dashTrafficAnalytics: '30-Day Traffic & Views Trend',
    trafficStatsHeader: 'Reader Traffic & Engagement',
    totalPageViews: 'Total Pageviews',
    uniqueReaders: 'Unique Readers',
    avgTimeOnPage: 'Avg. Time on Page',
    avgTimeVal: '3m 42s',
    bounceRate: 'Engagement / Bounce',
    deviceShareHeader: 'Audience Device Breakdown',
    dashDeviceShare: 'Device Breakdown',
    dashMobile: 'Mobile Devices',
    mobileDevices: 'Mobile Devices',
    dashDesktop: 'Desktop PCs',
    desktopLaptops: 'Desktop & Laptops',
    dashTablet: 'Tablets & Others',
    tablets: 'Tablets & Others',
    searchRankingHeader: 'Search Engine Visibility',
    avgPosition: 'Avg. Google Rank',
    impressions: 'Monthly Impressions',
    ctr: 'Organic CTR',
    topSearchKeyword: 'Top Search Keyword',
    topKeywordVal: 'Semiconductor Mission',
    quickActionsLabel: 'Quick Actions',
    btnNewArticle: 'New Article',
    btnTemplates: 'Templates',
    btnSeoAudit: 'SEO Audit',
    btnSchedule: 'Schedule',
    btnAiEnhancer: 'AI Enhancer',
    dashSeoHealthTitle: 'Portal SEO Health Distribution',
    dashExcellent: 'Excellent (85-100)',
    dashNeedsWork: 'Needs Work (60-84)',
    dashCritical: 'Critical Attention (<60)',
    dashRecentArticles: 'Recent Top Performing Articles',

    // Module 2: Wizard
    wizTitle: '5-Step Article Creation Wizard',
    wizSubtitle: 'Build comprehensive, publication-ready articles from scratch with structured guidelines',
    wizStep1: 'Step 1: Basic Details',
    wizStep2: 'Step 2: Headings Outline',
    wizStep3: 'Step 3: WP Metadata',
    wizStep4: 'Step 4: HTML Generator',
    wizStep5: 'Step 5: Verification & Publish',
    wizArticleTitle: 'Article Headline (H1)',
    wizArticleTitlePlaceholder: 'e.g. Chandrayaan-4 Mission: India’s Historic Lunar Sample Return Plan...',
    wizFocusKeyword: 'Focus Keyword (Primary KW)',
    wizFocusKeywordPlaceholder: 'e.g. Chandrayaan-4 Mission',
    wizCategory: 'Related News Category',
    wizWordCount: 'Target Word Count',
    wizTone: 'Writing Tone & Style',
    wizAudience: 'Target Audience',
    wizNextStep: 'Next Step →',
    wizPrevStep: '← Previous Step',
    wizHeadingsOutline: 'H1, H2, H3 Headings Outline Structure',
    wizOutlineTip: 'Rank Math guideline: Main concepts must be in H2, and sub-points in H3 tags.',
    wizAddH2: '+ Add New H2 Heading',
    wizMetaTitle: 'SEO Meta Title (55-60 characters)',
    wizMetaTitlePlaceholder: 'Headline as displayed in search engine results...',
    wizMetaDesc: 'Meta Description (150-160 characters)',
    wizMetaDescPlaceholder: 'Concise 150-160 character snippet incorporating the focus keyword...',
    wizSlug: 'SEO-Friendly Permalink Slug',
    wizSlugPlaceholder: 'chandrayaan-4-mission-isro-lunar-sample',
    wizHtmlGeneratorTitle: 'WordPress-Ready Clean HTML Generator',
    wizGenerateHtmlBtn: 'Generate HTML',
    wizCopyHtmlBtn: 'Copy HTML',
    wizVerificationTitle: 'Pre-Publishing Verification Checklist',
    wizPublishDraftBtn: 'Save as Draft',
    wizPublishLiveBtn: 'Publish Live Instantly',

    // Module 3: Templates
    tplTitle: '10 Pre-Built Content Templates Library',
    tplSubtitle: 'Generate structured drafts in 1-click using high-performance journalism frameworks',
    tplFilterAll: 'All Templates (10)',
    tplFilterTutorial: 'How-Tos & Guides',
    tplFilterListicle: 'Listicles',
    tplFilterNews: 'News Reports',
    tplFilterReview: 'Reviews & Comparisons',
    tplUseBtn: 'Use This Template',

    // Module 4: SEO
    seoTitle: 'On-Page SEO & Rank Math Auditor',
    seoSubtitle: 'Real-time auditing against Google Core Web Vitals and Rank Math scoring standards',
    seoOverallScore: 'Overall SEO Score',
    seoAuditResults: 'Detailed Audit Results & Fixes',
    seoAutoFixBtn: '1-Click AI Auto Fix All',
    seoKwDensity: 'Keyword Density (Recommended: 0.5% - 1.5%)',
    seoReadabilityTitle: 'Flesch Reading Ease Readability Score',
    seoReadingEase: 'Readability Level',
    seoChecklistTitle: 'Essential On-Page SEO Checklist',

    // Module 5: AI Enhancer
    enhancerTitle: 'AI Content Enhancer (8 Powerful Tools)',
    enhancerSubtitle: 'Advanced AI assistance for headlines, paragraph expansion, readability, and journalistic tone',
    enhancerOriginalText: 'Source Content (to be enhanced):',
    enhancerTool1: '1. 5 Viral Headlines Generator',
    enhancerTool2: '2. Paragraph Expander',
    enhancerTool3: '3. Readability Simplifier (Flesch Boost)',
    enhancerTool4: '4. Grammar & Spell Check',
    enhancerTool5: '5. Journalistic Tone Converter',
    enhancerTool6: '6. Key Takeaways (Bullet Points)',
    enhancerTool7: '7. Originality & Plagiarism Check',
    enhancerTool8: '8. Schema-Ready FAQ Generator',
    enhancerApplyBtn: 'Apply to Article',
    enhancerCopyBtn: 'Copy to Clipboard',

    // Module 6: Scheduling
    schedTitle: 'Scheduling & 12-Point Pre-Publish Checklist',
    schedSubtitle: 'Automated time scheduling, optimal reader traffic slots, and rigorous editorial control',
    schedPublishMode: 'Choose Publishing Mode:',
    schedImmediate: 'Publish Immediately (Instant Live)',
    schedFuture: 'Schedule for Later Time',
    schedDatePicker: 'Select Publication Date & Time:',
    schedBestTimes: 'Recommended Publication Time Slots:',
    schedBestMorning: '8:30 AM (Morning News Briefings)',
    schedBestEvening: '7:15 PM (Peak Prime-Time Traffic)',
    schedChecklistTitle: '12-Point Mandatory Pre-Publish Checklist:',
    schedReadyToPublish: 'Ready for Publication',
    schedScheduleBtn: 'Schedule for Chosen Time',
    schedPublishNowBtn: 'Publish Now',

    // Module 7: Media
    mediaTitle: 'Media & Image SEO (Alt Text & WebP)',
    mediaSubtitle: 'Automated WebP compression, alt-text generation, and copyright-free news media',
    mediaWebpTitle: 'WebP Automatic Conversion & Compression',
    mediaWatermarkTitle: 'Bharat Samachar Logo Watermark Protection',
    mediaAltGeneratorTitle: 'AI Image Alt-Text & Caption Generator',
    mediaGenerateAltBtn: 'Generate Alt Text',
    mediaLibraryTitle: 'Royalty-Free Media Library (Unsplash)',
    mediaSelectFeatured: 'Set as Featured Image',

    // Module 8: Revisions
    revTitle: 'Auto-Save & Revision Diff (Side-by-Side)',
    revSubtitle: 'Automated backups every 60 seconds with side-by-side comparative diff tracking',
    revAutoSaveInfo: 'Auto-Save is active: Last backup 30s ago',
    revTimeline: 'Revision History Timeline',
    revDiffTitle: 'Changes Comparison (Red = Removed, Green = Added)',
    revRestoreBtn: 'Restore This Revision',
    revExportJsonBtn: 'Download Full JSON Backup',

    // Module 9: Taxonomy
    taxTitle: 'Categories & Smart Tags Cloud',
    taxSubtitle: 'Consistent news taxonomy, site architecture, and SEO tag structures',
    taxAddCategory: '+ Add New Category',
    taxCategoryName: 'Category Name (e.g. Defense & Security)',
    taxCategorySlug: 'Category Slug (e.g. defense)',
    taxAddBtn: 'Create Category',
    taxPopularTags: 'Currently Popular Tags Cloud',
    taxTagSuggestions: 'AI-Suggested Trending Tags',

    // Module 10: Roles
    roleTitle: 'User Roles & Editorial Workflow (RBAC)',
    roleSubtitle: 'Role-based permission control for editors, journalists, proofreaders, and administrators',
    roleCurrentRole: 'Current Active Role:',
    roleAdmin: 'Administrator',
    roleEditor: 'Senior Editor',
    roleAuthor: 'Journalist / Author',
    roleContributor: 'Guest Contributor',
    rolePermissions: 'Active Permissions Matrix',
    roleReviewQueue: 'Editorial Review Queue (Pending Review)',

    // Module 11: Safe Delete
    delTitle: 'Safe Deletion & 301 Redirect Module',
    delSubtitle: 'Accidental deletion prevention, SEO link equity preservation, and 301 redirection',
    delWarning: 'Warning: Consider safety alternatives before permanently deleting any article.',
    delTypeDelete: 'Type "DELETE" to confirm permanent deletion:',
    delSafeOptions: 'Safe Alternatives (Recommended over deletion):',
    delOptionDraft: 'Convert to Draft (Unpublish)',
    delOptionPrivate: 'Mark as Private Only',
    delOptionArchive: 'Move to Archive Storage',
    delRedirectTitle: '301 Permanent Redirect Destination URL (Recommended):',
    delRedirectPlaceholder: 'https://bharatsamachar.live/news/...',
    delPermanentBtn: 'Permanently Delete Post',

    // Module 12: Settings & Help
    setHelpTitle: 'Shortcuts, Settings & Editorial Guide',
    setHelpSubtitle: 'Rapid editorial shortcuts, WordPress plugin connectivity, and journalistic standards',
    setShortcutsTitle: 'Editorial Keyboard Shortcuts (Hotkeys)',
    setPluginsTitle: 'WordPress Plugin Connectivity Status',
    setEditorialGuideTitle: 'Bharat Samachar Journalistic Ethics Guidelines',

    // Gutenberg Editor
    editorBackToList: '← Back to All Posts',
    editorEditingTitle: 'Edit Article (Gutenberg Mode)',
    editorNewPostTitle: 'Create New Article (New Post)',
    editorSaveDraft: 'Save Draft',
    editorPublish: 'Publish Post',
    editorSchedule: 'Schedule Post',
    editorUpdate: 'Update Post',
    editorTabContent: 'Content & Headings',
    editorTabSeo: 'Rank Math SEO',
    editorTabPublish: 'Publishing & Scheduling',
    editorTabMedia: 'Media & Thumbnail',
    editorTabPreview: 'Live Preview',
    editorTitlePlaceholder: 'Enter main news headline here (H1)...',
    editorContentPlaceholder: 'Write article content here...',
    editorCategoryLabel: 'Category',
    editorFormatLabel: 'Content Format',
    editorStatusLabel: 'Post Status',
    editorSeoFocusKw: 'Focus Keyword (Rank Math Focus KW)',
    editorSeoMetaTitle: 'Meta Title (55-60 characters)',
    editorSeoMetaDesc: 'Meta Description (150-160 characters)',
    editorSeoSlug: 'Permalink Slug',
    editorFeaturedImage: 'Cover Image URL (Featured Image)',
    editorTagsLabel: 'Tags (comma separated)',
    editorPreviewMobile: 'Mobile View',
    editorPreviewDesktop: 'Desktop View'
  }
};
