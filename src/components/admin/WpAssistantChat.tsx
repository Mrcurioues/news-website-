import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileText,
  Clock,
  Trash2,
  Sliders,
  ChevronRight,
  HelpCircle,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Article, AssistantMessage } from '../../types';
import { useRouter } from '../../context/RouterContext';
import {
  processAssistantQuery,
  AssistantLanguage
} from '../../services/wordpressAssistant';

interface WpAssistantChatProps {
  currentArticle?: Partial<Article>;
  allArticles: Article[];
  onApplyArticleData: (data: Partial<Article>) => void;
  onCreateNewArticle: (data: Partial<Article>) => void;
  onConfirmDeleteRequest: (articleId: string, articleTitle: string) => void;
  isFloating?: boolean;
}

const getWelcomeMessage = (currentLang: string): AssistantMessage => ({
  id: 'welcome-1',
  sender: 'assistant',
  timestamp: currentLang === 'en' ? 'Just now' : 'अभी (Just now)',
  text: currentLang === 'en'
    ? `### Hello! I am your WordPress Article Management Assistant 🚀\n\n` +
      `I can help you with:\n` +
      `1. **SEO-Optimized Article Creation:** H1, H2, H3 heading hierarchy, focus keywords & optimal format.\n` +
      `2. **Yoast & Rank Math Scoring:** 150-160 character meta description, permalink slug & alt text.\n` +
      `3. **Quality & Readability:** Flesch Reading Ease, keyword density, and duplicate content detection.\n` +
      `4. **WordPress Operations:** Drafts, publishing, scheduling, and secure post management.\n\n` +
      `> Select from the quick prompts below or ask me to draft an article on any topic!`
    : `### नमस्ते! मैं आपका WordPress आर्टिकल मैनेजमेंट असिस्टेंट हूँ 🚀\n\n` +
      `मैं आपकी मदद कर सकता हूँ:\n` +
      `1. **SEO-अनुकूलित आर्टिकल निर्माण:** H1, H2, H3 हेडिंग पदानुक्रम, फोकस कीवर्ड व सर्वोत्तम प्रारूप।\n` +
      `2. **Yoast व Rank Math स्कोरिंग:** 150-160 अक्षर मेटा डिस्क्रिप्शन, परमालिंक स्लग व ऑल्ट टेक्स्ट।\n` +
      `3. **क्वालिटी व पठनीयता (Readability):** Flesch Reading Ease, कीवर्ड डेंसिटी और डुप्लीकेट सामग्री जांच।\n` +
      `4. **WordPress कार्यप्रणाली:** ड्राफ्ट, पब्लिश, भविष्य हेतु शेड्यूलिंग और सुरक्षित पोस्ट प्रबंधन।\n\n` +
      `> आप नीचे दिए गए सुझावों में से चुन सकते हैं या किसी भी विषय पर नया आर्टिकल लिखने को कह सकते हैं!`
});

export const WpAssistantChat: React.FC<WpAssistantChatProps> = ({
  currentArticle,
  allArticles,
  onApplyArticleData,
  onCreateNewArticle,
  onConfirmDeleteRequest,
  isFloating = false
}) => {
  const { lang } = useRouter();
  const [language, setLanguage] = useState<AssistantLanguage>(lang === 'en' ? 'en' : 'hi');
  const [messages, setMessages] = useState<AssistantMessage[]>([getWelcomeMessage(lang)]);

  // Synchronize assistant language with global router language
  useEffect(() => {
    setLanguage(lang === 'en' ? 'en' : 'hi');
    setMessages(prev => {
      // If user hasn't started conversing yet, switch the welcome message to current language
      if (prev.length === 1 && prev[0].id === 'welcome-1') {
        return [getWelcomeMessage(lang)];
      }
      return prev;
    });
  }, [lang]);
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing, progressStatus]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isProcessing) return;

    const userMsg: AssistantMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsProcessing(true);
    setProgressStatus('WordPress AI इंजन सक्रिय हो रहा है...');

    try {
      const result = await processAssistantQuery(
        textToSend,
        {
          currentArticle,
          language,
          allArticles
        },
        (prog) => setProgressStatus(prog)
      );

      const botMsg: AssistantMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: result.message,
        timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
        actionPayload: result.actionPayload
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: 'bot-err-' + Date.now(),
          sender: 'assistant',
          text: lang === 'en'
            ? 'Sorry, encountered an issue processing your query. Please try again.'
            : 'क्षमा करें, क्वेरी प्रोसेस करने में समस्या आई। कृपया पुनः प्रयास करें।',
          timestamp: lang === 'en' ? 'Just now' : 'अभी'
        }
      ]);
    } finally {
      setIsProcessing(false);
      setProgressStatus(null);
    }
  };

  const handleExecuteAction = (actionPayload: AssistantMessage['actionPayload']) => {
    if (!actionPayload) return;

    if (actionPayload.actionType === 'create_article' && actionPayload.articleData) {
      onCreateNewArticle(actionPayload.articleData);
      setMessages(prev => [
        ...prev,
        {
          id: 'action-confirm-' + Date.now(),
          sender: 'assistant',
          text: lang === 'en'
            ? `✅ **Successfully Loaded!** New article draft is active in the editor. You can now inspect and edit.`
            : `✅ **सफलतापूर्वक लोड किया गया!** नया आर्टिकल ड्राफ्ट एडिटर में सक्रिय हो गया है। आप अब इसे देख और संपादित कर सकते हैं।`,
          timestamp: lang === 'en' ? 'Just now' : 'अभी'
        }
      ]);
    } else if (
      (actionPayload.actionType === 'update_article' || actionPayload.actionType === 'apply_seo' || actionPayload.actionType === 'schedule_article') &&
      actionPayload.articleData
    ) {
      onApplyArticleData(actionPayload.articleData);
      setMessages(prev => [
        ...prev,
        {
          id: 'action-confirm-' + Date.now(),
          sender: 'assistant',
          text: lang === 'en'
            ? `✅ **Changes Applied!** Article headings, meta tags, or schedule details updated for the current post.`
            : `✅ **परिवर्तन लागू हुए!** आर्टिकल हेडिंग्स, मेटा टैग्स अथवा शेड्यूलिंग विवरण वर्तमान पोस्ट में अपडेट कर दिए गए हैं।`,
          timestamp: lang === 'en' ? 'Just now' : 'अभी'
        }
      ]);
    } else if (actionPayload.actionType === 'delete_article') {
      const articleId = actionPayload.articleId || currentArticle?.id || 'current';
      const articleTitle = currentArticle?.title || (lang === 'en' ? 'Selected Article' : 'चयनित आर्टिकल');
      onConfirmDeleteRequest(articleId, articleTitle);
    }
  };

  const quickPrompts = [
    {
      label: (language === 'en' || lang === 'en') ? '📝 Draft New Article' : '📝 नया SEO आर्टिकल लिखें',
      query: (language === 'en' || lang === 'en')
        ? 'Write a 600-word SEO-optimized article on ISRO latest space exploration mission'
        : 'ISRO के नए अंतरिक्ष परीक्षण पर 600 शब्दों का SEO-अनुकूलित आर्टिकल लिखो'
    },
    {
      label: (language === 'en' || lang === 'en') ? '🔍 SEO Audit' : '🔍 Yoast/Rank Math ऑडिट',
      query: (language === 'en' || lang === 'en')
        ? 'Audit the Rank Math and Yoast SEO score of the current article'
        : 'वर्तमान आर्टिकल का Rank Math और Yoast SEO स्कोर ऑडिट करो'
    },
    {
      label: (language === 'en' || lang === 'en') ? '📑 Fix H1/H2/H3 Headings' : '📑 H1, H2, H3 हेडिंग स्ट्रक्चर',
      query: (language === 'en' || lang === 'en')
        ? 'Create a WordPress H1, H2, H3 heading hierarchy for the current article'
        : 'वर्तमान आर्टिकल के लिए WordPress H1, H2, H3 हेडिंग पदानुक्रम तैयार करो'
    },
    {
      label: (language === 'en' || lang === 'en') ? '🏷️ Meta Tags & Slug' : '🏷️ 150-अक्षर मेटा व स्लग',
      query: (language === 'en' || lang === 'en')
        ? 'Generate a 150-character meta description, focus keyword, and SEO slug for this article'
        : 'इस आर्टिकल के लिए 150 अक्षरों का मेटा विवरण, फोकस कीवर्ड और SEO स्लग बनाओ'
    },
    {
      label: (language === 'en' || lang === 'en') ? '⏰ Schedule Post' : '⏰ शेड्यूल / ड्राफ्ट स्टेटस',
      query: (language === 'en' || lang === 'en')
        ? 'Schedule this article for tomorrow morning at 9:00 AM'
        : 'इस आर्टिकल को कल सुबह 9 बजे के लिए शेड्यूल (Schedule) करो'
    },
    {
      label: (language === 'en' || lang === 'en') ? '🗑️ Delete Article' : '🗑️ आर्टिकल हटाएं (Delete)',
      query: (language === 'en' || lang === 'en')
        ? 'Delete this article'
        : 'इस आर्टिकल को डिलीट (Delete) करो'
    }
  ];

  // Helper to render markdown-like formatting simply and cleanly
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-2 text-xs sm:text-sm text-gray-800 leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-sm sm:text-base font-black text-gray-900 mt-2 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{line.replace('### ', '')}</span>
              </h3>
            );
          }
          if (line.startsWith('#### ')) {
            return (
              <h4 key={idx} className="text-xs sm:text-sm font-bold text-gray-900 mt-2 border-b border-gray-100 pb-0.5">
                {line.replace('#### ', '')}
              </h4>
            );
          }
          if (line.startsWith('> ')) {
            return (
              <div key={idx} className="p-2.5 bg-rose-50/70 border-l-3 border-rose-600 rounded-r-lg text-rose-900 font-medium text-xs my-2">
                {line.replace('> ', '')}
              </div>
            );
          }
          if (line.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2 ml-1">
                <span className="text-rose-500 font-bold">•</span>
                <span>{line.replace('- ', '')}</span>
              </div>
            );
          }
          if (/^\d+\.\s/.test(line)) {
            return (
              <div key={idx} className="flex items-start gap-2 ml-1">
                <span className="text-gray-500 font-bold">{line.match(/^\d+\./)?.[0]}</span>
                <span>{line.replace(/^\d+\.\s*/, '')}</span>
              </div>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }
          return <p key={idx}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div
      id="wp-assistant-chat-container"
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col ${
        isFloating ? 'h-[600px] max-h-[85vh]' : 'h-[680px]'
      }`}
    >
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-gray-100 bg-linear-to-r from-slate-900 via-zinc-900 to-gray-900 text-white rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black">
                {lang === 'en' ? 'WordPress Assistant' : 'WordPress Assistant'}
              </span>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded">
                SEO & Admin AI
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              {lang === 'en'
                ? 'Article Creation, Rank Math / Yoast SEO & Scheduling'
                : 'आर्टिकल क्रिएशन, Rank Math/Yoast SEO और शेड्यूलिंग'}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
              language === 'hi' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            हिन्दी
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hinglish')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
              language === 'hinglish' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Hinglish
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
              language === 'en' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Active Post Context Bar */}
      <div className="px-4 py-2 bg-slate-50 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-600">
        <div className="flex items-center gap-1.5 truncate mr-2">
          <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="font-semibold text-gray-700">
            {lang === 'en' ? 'Active Post:' : 'सक्रिय पोस्ट:'}
          </span>
          <span className="truncate max-w-[220px] font-medium text-gray-900">
            {currentArticle?.title || (lang === 'en' ? 'No article selected' : 'कोई आर्टिकल चयनित नहीं')}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
            {currentArticle?.status?.toUpperCase() || 'PUBLISHED'}
          </span>
          {currentArticle?.focusKeyword && (
            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-mono">
              KW: {currentArticle.focusKeyword}
            </span>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3.5 shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white rounded-tr-xs'
                  : 'bg-white border border-gray-200 text-gray-900 rounded-tl-xs'
              }`}
            >
              {msg.sender === 'user' ? (
                <div className="text-xs sm:text-sm font-medium whitespace-pre-wrap">{msg.text}</div>
              ) : (
                <div>
                  {renderMessageContent(msg.text)}

                  {/* Action Payload Buttons */}
                  {msg.actionPayload && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                      {msg.actionPayload.actionType === 'create_article' && (
                        <button
                          type="button"
                          onClick={() => handleExecuteAction(msg.actionPayload)}
                          className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {lang === 'en' ? 'Load into Editor' : 'ड्राफ्ट एडिटर में लोड करें (Load to Editor)'}
                          </span>
                        </button>
                      )}

                      {(msg.actionPayload.actionType === 'update_article' ||
                        msg.actionPayload.actionType === 'apply_seo' ||
                        msg.actionPayload.actionType === 'schedule_article') && (
                        <button
                          type="button"
                          onClick={() => handleExecuteAction(msg.actionPayload)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>
                            {lang === 'en' ? 'Apply to Current Article' : 'परिवर्तन आर्टिकल में लागू करें (Apply)'}
                          </span>
                        </button>
                      )}

                      {msg.actionPayload.actionType === 'delete_article' && (
                        <button
                          type="button"
                          onClick={() => handleExecuteAction(msg.actionPayload)}
                          className="px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1.5 border border-rose-300 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>
                            {lang === 'en' ? 'Proceed to Delete' : 'डिलीट करने के लिए आगे बढ़ें (Confirm Modal)'}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div
                className={`text-[10px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-rose-100' : 'text-gray-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {/* Live Multi-step Progress Indicator */}
        {isProcessing && (
          <div className="flex gap-3 items-start animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-xs p-3.5 shadow-xs max-w-[80%]">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-800 mb-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-600" />
                <span>{progressStatus || (lang === 'en' ? 'Assistant is processing...' : 'असिस्टेंट कार्य कर रहा है...')}</span>
              </div>
              <div className="w-48 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-2 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              disabled={isProcessing}
              onClick={() => handleSend(p.query)}
              className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-gray-700 text-[11px] font-medium whitespace-nowrap transition-colors border border-gray-200 shrink-0 cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-gray-200 bg-white rounded-b-2xl flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          disabled={isProcessing}
          placeholder={
            language === 'hi'
              ? 'आर्टिकल लिखें, Rank Math ऑडिट करें, या H1/H2/H3 सुधारें...'
              : language === 'hinglish'
              ? 'Article likho, Rank Math audit karo, ya headings theek karo...'
              : 'Draft article, run Rank Math SEO audit, or schedule post...'
          }
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-100 text-xs sm:text-sm bg-gray-50/50"
        />

        <button
          type="submit"
          disabled={isProcessing || !inputQuery.trim()}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">{lang === 'en' ? 'Send' : 'पूछें (Send)'}</span>
        </button>
      </form>
    </div>
  );
};
