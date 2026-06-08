/**
 * CUT AND FUN Kids Barber — Premium Redesign
 * ─────────────────────────────────────────────
 * Design direction: Vibrant neon-on-dark "kids luxury" aesthetic.
 * The signage colors (green / red / blue / yellow) are the brand palette —
 * everything radiates from them.
 *
 * Key architectural decisions:
 *  • Services section now has Boys / Girls category tabs matching the price-list image
 *  • Hero uses the uploaded shop exterior photo (/gallery/6.jpg) as an
 *    immersive cinematic backdrop with layered overlays + depth orbs
 *  • Framer Motion orchestrates section reveals, tab transitions, and card hovers
 *  • i18n fully preserved — no translation keys changed
 *  • Chat, Gallery, Reviews, FAQ all kept; only cosmetically polished
 *  • Zero new npm dependencies — framer-motion, lucide-react, react-i18next
 *    are already in the project
 */

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe, Scissors, Star, ChevronDown, ChevronUp,
  MessageSquare, X, Send, MapPin, Clock, Phone,
  Loader2, ChevronLeft, ChevronRight, Sun, Moon,
  Instagram, Facebook, Menu, Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewsSection from './components/ReviewsSection';

/* ─────────────────────────────────────────────────────────────
   MENU DATA — Boys & Girls categories from the price-list image
   ───────────────────────────────────────────────────────────── */
const fullMenu = [
  // Boys - الأولاد
  { en: "Boys Haircut",              ar: "قص شعر الأولاد",              price: "35",  category: "boys" },
  { en: "Boys Lineup",               ar: "تحديد أولاد",                  price: "20",  category: "boys" },
  { en: "Machine Haircut (Grade 1)", ar: "حلاقة مكينة درجة واحدة",       price: "25",  category: "boys" },
  { en: "Boys Blow Dry",             ar: "استشوار / شعر الأولاد",        price: "15",  category: "boys" },
  { en: "Hair Wash",                 ar: "غسيل شعر",                     price: "15",  category: "boys" },

  // Girls - البنات
  { en: "Girls Haircut (Any Style)", ar: "قص شعر أي موديل",             price: "45",  category: "girls" },
  { en: "Trim + Blow Dry",           ar: "قص شعر / أطراف مع استشوار",   price: "65",  category: "girls" },
  { en: "Blow Dry",                  ar: "استشوار / شعر",               price: "35",  category: "girls" },
  { en: "Bangs Trim",                ar: "قص الغرة",                     price: "20",  category: "girls" },
  { en: "Hair Wash",                 ar: "غسيل الشعر",                   price: "15",  category: "girls" },
];

/* ─────────────────────────────────────────────────────────────
   GALLERY
   ───────────────────────────────────────────────────────────── */
function GallerySection() {
  const { i18n } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    let id: number;
    let dir = 1;
    const loop = () => {
      if (scrollRef.current && !isPaused) {
        const el = scrollRef.current;
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= max - 1) dir = -1;
        else if (el.scrollLeft <= 0) dir = 1;
        el.scrollLeft += dir * 1.2;
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [isPaused]);

  const images = [1, 2, 3, 4, 5, 6, 7].map(n => `/gallery/${n}.jpg`);
  const accentColors = ['#22c55e', '#3b82f6', '#ef4444', '#eab308'];

  return (
    <section id="gallery" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #090910 0%, #0c0c18 100%)' }}>

      {/* Rainbow floor line */}
      <div className="absolute inset-x-0 bottom-0 h-px opacity-70"
        style={{ background: 'linear-gradient(90deg, #22c55e, #ef4444, #3b82f6, #eab308, #22c55e)' }} />

      {/* Section heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#22c55e', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <Sparkles className="w-3.5 h-3.5" />
            {i18n.language === 'ar' ? 'أعمالنا' : 'Our Work'}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase">
            {i18n.language === 'ar' ? 'المعرض ✂' : '✂ Gallery'}
          </h2>
          <div className="w-28 h-1 mx-auto rounded-full mt-5"
            style={{ background: 'linear-gradient(90deg, #22c55e, #3b82f6, #ef4444)' }} />
        </motion.div>
      </div>

      {/* Scroll strip */}
      <div className="relative w-full"
        onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)} dir="ltr">

        {/* Arrow buttons */}
        {(['left', 'right'] as const).map(side => (
          <div key={side}
            className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'} invisible md:visible z-10`}>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: side === 'left' ? -340 : 340, behavior: 'smooth' })}
              className="p-3 rounded-full transition-all hover:scale-110"
              style={{
                background: 'rgba(10,10,20,0.9)',
                border: `1px solid ${side === 'left' ? 'rgba(34,197,94,0.4)' : 'rgba(59,130,246,0.4)'}`,
                color: side === 'left' ? '#22c55e' : '#3b82f6',
                boxShadow: `0 0 20px ${side === 'left' ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.2)'}`,
              }}>
              {side === 'left' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        ))}

        <div ref={scrollRef}
          className="flex overflow-x-auto gap-5 pb-10 pt-4 px-8 lg:px-24"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {images.map((src, idx) => {
            const accent = accentColors[idx % accentColors.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.07, duration: 0.5 }}
                className="shrink-0 w-[220px] md:w-[290px] aspect-[3/4] overflow-hidden rounded-2xl relative group cursor-pointer"
                style={{
                  border: `2px solid ${accent}33`,
                  boxShadow: `0 0 25px ${accent}22, 0 20px 50px rgba(0,0,0,0.5)`,
                }}
                onClick={() => setSelectedImage(src)}
                whileHover={{ scale: 1.04, y: -10,
                  boxShadow: `0 0 40px ${accent}55, 0 30px 60px rgba(0,0,0,0.6)` }}>
                <img src={src} alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${accent}33 0%, transparent 60%)` }} />
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs mt-2 md:hidden tracking-widest" style={{ color: '#22c55e' }}>
          ← swipe →
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)' }}
            onClick={() => setSelectedImage(null)}>
            <button
              className="absolute top-6 right-6 p-3 rounded-full z-10 transition-colors"
              style={{ background: 'rgba(10,10,20,0.9)', border: '1px solid rgba(239,68,68,0.5)', color: '#ef4444' }}
              onClick={() => setSelectedImage(null)}>
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              src={selectedImage} alt="Selected"
              className="max-w-full max-h-full object-contain rounded-2xl"
              style={{ boxShadow: '0 0 80px rgba(59,130,246,0.35)' }}
              onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CHAT INTERFACE
   ───────────────────────────────────────────────────────────── */
function ChatInterface({ isRTL, t }: { isRTL: boolean; t: any }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: t('ChatWelcome') },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(prev => {
      const arr = [...prev];
      if (arr.length > 0 && arr[0].role === 'bot') arr[0].text = t('ChatWelcome');
      return arr;
    });
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      let botText = data.response;
      const marker = '[BOOKING_CONFIRMED:';
      if (botText.includes(marker)) {
        try {
          const s = botText.indexOf(marker) + marker.length;
          const e = botText.indexOf(']', s);
          const booking = JSON.parse(botText.substring(s, e).trim());
          await fetch('/api/notify-boss', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking),
          });
          botText = botText.replace(/\[BOOKING_CONFIRMED:.*?\]/, '').trim();
          if (!botText) botText = 'Your appointment has been booked!';
        } catch {}
      }
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'عذراً، حدث خطأ. / Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#090912' }}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i}
            className={`flex ${msg.role === 'user'
              ? isRTL ? 'justify-start' : 'justify-end'
              : isRTL ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
              style={msg.role === 'user'
                ? { background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', boxShadow: '0 0 14px rgba(34,197,94,0.3)' }
                : { background: 'rgba(255,255,255,0.06)', color: '#e4e4e7', border: '1px solid rgba(255,255,255,0.09)' }}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <div className="rounded-2xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <Loader2 className="w-4 h-4 animate-spin text-green-400" />
            </div>
          </div>
        )}
      </div>

      <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0d0d1a' }}>
        <div className="flex gap-2">
          <input
            type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={isRTL ? 'اكتب رسالة...' : 'Type a message...'}
            className="flex-1 rounded-full px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(34,197,94,0.25)' }} />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 0 14px rgba(34,197,94,0.3)' }}>
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ ITEM
   ───────────────────────────────────────────────────────────── */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left hover:bg-white/[0.04] transition-colors">
        <span className="font-bold text-white pr-4">{question}</span>
        {open
          ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: '#22c55e' }} />
          : <ChevronDown className="w-5 h-5 flex-shrink-0 text-zinc-500" />}
      </button>
      <div className={`px-6 overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-zinc-400 leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SERVICES — Boys / Girls tabbed price menu
   ───────────────────────────────────────────────────────────── */
function ServicesSection({ isRTL }: { isRTL: boolean }) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'boys' | 'girls'>('boys');

  const tabs = [
    {
      key: 'boys' as const,
      labelEn: '👦 Boys',
      labelAr: '👦 أولاد',
      accent: '#3b82f6',          // blue — matches the sign
      glow: 'rgba(59,130,246,',
      emoji: '✂️',
    },
    {
      key: 'girls' as const,
      labelEn: '👧 Girls',
      labelAr: '👧 بنات',
      accent: '#ec4899',          // pink — feels right for girls section
      glow: 'rgba(236,72,153,',
      emoji: '💇',
    },
  ];

  const filtered = fullMenu.filter(s => s.category === activeTab);
  const currentTab = tabs.find(t => t.key === activeTab)!;

  return (
    <section id="services" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050508 0%, #08080f 100%)' }}>

      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Ambient glow behind the card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(ellipse, ${currentTab.glow}0.4) 0%, transparent 70%)`,
            filter: 'blur(80px)',
            transition: 'background 0.6s ease',
          }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#eab308', background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)' }}>
            <Scissors className="w-3.5 h-3.5" />
            {i18n.language === 'ar' ? 'أسعار حلاقة الأطفال' : "Children's Haircut Prices"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase">
            {t('Services')}
          </h2>
          <div className="w-28 h-1 mx-auto rounded-full mt-5"
            style={{ background: 'linear-gradient(90deg, #22c55e, #3b82f6, #ef4444)' }} />
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="flex rounded-2xl p-1.5 gap-1"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative px-8 py-3 rounded-xl font-black text-sm md:text-base tracking-wider transition-colors duration-300 uppercase overflow-hidden"
                style={{
                  color: activeTab === tab.key ? '#fff' : '#71717a',
                }}>
                {/* Active background pill */}
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${tab.accent}ee, ${tab.accent}99)`,
                      boxShadow: `0 0 24px ${tab.glow}0.5)`,
                    }}
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }} />
                )}
                <span className="relative z-10">
                  {i18n.language === 'ar' ? tab.labelAr : tab.labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price card */}
        <motion.div
          layout
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${currentTab.accent}33`,
            boxShadow: `0 0 60px ${currentTab.glow}0.08), 0 40px 80px rgba(0,0,0,0.4)`,
          }}>

          {/* Top accent bar */}
          <div className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, ${currentTab.accent}, ${currentTab.accent}55)` }} />

          {/* Corner glow */}
          <div className="absolute top-0 right-0 w-60 h-60 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${currentTab.glow}0.1) 0%, transparent 70%)`,
              transform: 'translate(30%,-30%)',
            }} />

          {/* Category label inside card */}
          <div className="px-8 pt-8 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${currentTab.accent}22`, border: `1px solid ${currentTab.accent}44` }}>
              {currentTab.emoji}
            </div>
            <div>
              <p className="font-black text-white text-lg tracking-wide">
                {activeTab === 'boys'
                  ? (i18n.language === 'ar' ? 'الأولاد' : 'Boys')
                  : (i18n.language === 'ar' ? 'البنات' : 'Girls')}
              </p>
              <p className="text-xs text-zinc-500 tracking-widest uppercase">
                {i18n.language === 'ar' ? 'الأسعار بالريال السعودي' : 'Prices in Saudi Riyal'}
              </p>
            </div>
          </div>

          {/* Menu rows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="px-6 pb-8 md:px-10">
              {filtered.map((svc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex justify-between items-center py-4 group relative"
                  style={{ borderBottom: idx < filtered.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>

                  {/* Hover highlight */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: `${currentTab.accent}08` }} />

                  <span className="text-base md:text-lg font-semibold text-zinc-300 group-hover:text-white transition-colors relative z-10">
                    {i18n.language === 'ar' ? svc.ar : svc.en}
                  </span>

                  {/* Dotted leader */}
                  <div className="flex-1 mx-4 min-w-0 relative"
                    style={{ borderBottom: '1px dotted rgba(255,255,255,0.1)', marginTop: '-2px' }} />

                  {/* Price badge */}
                  <div className="relative z-10 flex items-baseline gap-1">
                    <span className="font-black text-xl md:text-2xl tabular-nums"
                      style={{ color: currentTab.accent, textShadow: `0 0 12px ${currentTab.glow}0.6)` }}>
                      {svc.price}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 tracking-wider">
                      {i18n.language === 'ar' ? 'ر.س' : 'SR'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Note */}
          <div className="px-8 pb-6">
            <p className="text-xs text-zinc-600 text-center tracking-wide">
              {i18n.language === 'ar'
                ? '* الأسعار شاملة ضريبة القيمة المضافة'
                : '* Prices include VAT'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN APP
   ───────────────────────────────────────────────────────────── */
export default function App() {
  const { t, i18n } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') document.documentElement.classList.add('dark');
    return true;
  });

  useEffect(() => {
    const t = setTimeout(() => setIsAppLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  const isRTL = i18n.language === 'ar';

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
    }, 150);
  };

  const navLinks = [
    { id: 'services', label: t('Services') },
    { id: 'gallery',  label: t('Photos') },
    { id: 'reviews',  label: t('Reviews') },
    { id: 'faq',      label: t('FAQ') },
  ];

  return (
    <>
      {/* ── Loading screen ── */}
      <AnimatePresence>
        {isAppLoading && (
          <motion.div
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            style={{ background: '#050508' }} dir={isRTL ? 'rtl' : 'ltr'}>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {['scissors-float-1','scissors-float-2','scissors-float-3','scissors-float-4','scissors-float-5'].map((cls,i) => (
                <span key={i} className={`scissors-float ${cls}`}>✂</span>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-spin"
                style={{ background: 'conic-gradient(from 0deg,#22c55e,#3b82f6,#ef4444,#eab308,#22c55e)', padding: 3, borderRadius: '50%', filter: 'blur(2px)' }} />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center"
                style={{ background: '#0a0a0f' }}>
                <img src="/gallery/barbershoplogo.png" alt="Cut and Fun"
                  className="w-20 h-20 md:w-28 md:h-28 object-contain"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="mt-8 text-center">
              <div className="text-3xl md:text-4xl font-black tracking-widest mb-1">
                <span style={{ color: '#22c55e', textShadow: '0 0 20px #22c55e' }}>CUT </span>
                <span style={{ color: '#ef4444', textShadow: '0 0 20px #ef4444' }}>AND </span>
                <span style={{ color: '#3b82f6', textShadow: '0 0 20px #3b82f6' }}>FUN</span>
              </div>
              <div className="text-xs tracking-[0.4em] uppercase" style={{ color: '#eab308' }}>Kids Barber · Riyadh</div>
            </motion.div>

            <motion.div
              initial={{ width: 0 }} animate={{ width: '200px' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="mt-8 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg,#22c55e,#3b82f6,#ef4444,#eab308)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen font-sans ${isRTL ? 'dir-rtl' : 'dir-ltr'}`}
        style={{ background: '#050508', color: '#fff' }} dir={isRTL ? 'rtl' : 'ltr'}>

        {/* ── Navbar ── */}
        <nav className="fixed top-0 w-full z-50 transition-all duration-300"
          style={{ background: 'rgba(5,5,8,0.92)', backdropFilter: 'blur(22px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Rainbow top stripe */}
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg,#22c55e,#3b82f6,#ef4444,#eab308,#22c55e)' }} />

          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 md:h-16">

              {/* Brand mark */}
              <div className="flex items-center gap-3 flex-shrink-0 group cursor-pointer">
                <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: '2px solid rgba(34,197,94,0.5)', boxShadow: '0 0 14px rgba(34,197,94,0.3)' }}>
                  <img src="/gallery/barbershoplogo.png" alt="Logo"
                    className="w-full h-full object-contain transition-transform group-hover:scale-110"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-black tracking-wide leading-tight">
                    <span style={{ color: '#22c55e' }}>CUT </span>
                    <span style={{ color: '#ef4444' }}>AND </span>
                    <span style={{ color: '#3b82f6' }}>FUN</span>
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#eab308' }}>Kids Barber</div>
                </div>
              </div>

              {/* Desktop links */}
              <div className="hidden lg:flex gap-8 items-center text-sm font-bold tracking-widest uppercase">
                {navLinks.map((item, i) => (
                  <button key={i} onClick={() => scrollTo(item.id)}
                    className="text-zinc-400 hover:text-white transition-colors relative group bg-transparent border-0 cursor-pointer">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 transition-all duration-300 rounded-full"
                      style={{ background: 'linear-gradient(90deg,#22c55e,#3b82f6)' }} />
                  </button>
                ))}

                <div className={`flex items-center gap-2 ${isRTL ? 'border-r pr-6' : 'border-l pl-6'}`}
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <button onClick={() => setIsDarkMode(!isDarkMode)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {isDarkMode
                      ? <Sun className="w-4 h-4 text-yellow-400" />
                      : <Moon className="w-4 h-4 text-blue-400" />}
                  </button>
                  <button onClick={toggleLanguage}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img src={i18n.language === 'ar' ? 'https://flagcdn.com/w40/gb.png' : 'https://flagcdn.com/w40/sa.png'}
                      width="18" alt="lang" className="rounded-sm" />
                  </button>
                </div>
              </div>

              {/* Mobile controls */}
              <div className="flex lg:hidden items-center gap-2">
                <button onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                </button>
                <button onClick={toggleLanguage}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={i18n.language === 'ar' ? 'https://flagcdn.com/w40/gb.png' : 'https://flagcdn.com/w40/sa.png'}
                    width="18" alt="lang" className="rounded-sm" />
                </button>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-zinc-300">
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5,5,8,0.98)' }}>
                <div className="flex flex-col text-sm font-bold tracking-widest uppercase">
                  {navLinks.map((item, i) => (
                    <button key={i} onClick={() => scrollTo(item.id)}
                      className="w-full flex justify-between items-center px-5 py-4 text-zinc-300 hover:text-white transition-colors"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span>{item.label}</span>
                      <span style={{ color: '#22c55e' }}>›</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main>
          {/* ── HERO ── */}
          <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

            {/* Shop photo — the emotional centerpiece */}
            <div className="absolute inset-0 z-0">
              <img
                src="/gallery/6.jpg"
                alt="CUT AND FUN Kids Barber Shop"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?q=80&w=2070&auto=format&fit=crop';
                }}
              />
              {/* Multi-layer dark overlay — deepens the photo while preserving depth */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(5,5,8,0.72) 0%, rgba(5,5,8,0.48) 38%, rgba(5,5,8,0.82) 78%, #050508 100%)' }} />
              {/* Brand-color wash over the photo — ties it to the identity */}
              <div className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 50% 28%, rgba(34,197,94,0.07) 0%, rgba(59,130,246,0.05) 35%, rgba(239,68,68,0.05) 65%, transparent 80%)' }} />
              {/* Cinematic vignette */}
              <div className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)' }} />
            </div>

            {/* Floating depth orbs */}
            <div className="absolute top-1/4 left-[8%] w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(34,197,94,0.13) 0%,transparent 70%)', filter: 'blur(50px)', animation: 'float 7s ease-in-out infinite' }} />
            <div className="absolute top-1/3 right-[6%] w-96 h-96 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.13) 0%,transparent 70%)', filter: 'blur(60px)', animation: 'float 9s ease-in-out infinite reverse' }} />
            <div className="absolute bottom-1/4 left-[18%] w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(239,68,68,0.1) 0%,transparent 70%)', filter: 'blur(50px)', animation: 'float 8s ease-in-out infinite 2s' }} />

            {/* Hero content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-24 pb-16">

              {/* Star rating */}
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current"
                    style={{ color: '#eab308', filter: 'drop-shadow(0 0 6px #eab308)' }} />
                ))}
              </motion.div>

              {/* 3-D neon brand sign — mirrors the actual shop signage */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 32 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, type: 'spring', damping: 14 }}
                className="mb-6">
                <div className="inline-block rounded-2xl px-6 py-5 relative"
                  style={{
                    background: 'rgba(8,8,18,0.72)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 0 70px rgba(34,197,94,0.18), 0 0 130px rgba(59,130,246,0.1), 0 50px 90px rgba(0,0,0,0.55)',
                    transform: 'perspective(600px) rotateX(2deg)',
                  }}>
                  {/* Arabic subtitle — matches real sign */}
                  <div className="text-xl md:text-2xl font-black mb-2 tracking-wider" style={{ fontFamily: 'serif', direction: 'rtl' }}>
                    <span style={{ color: '#22c55e', textShadow: '0 0 22px #22c55e, 0 0 44px #22c55e' }}>كات آند فن </span>
                    <span style={{ color: '#eab308', textShadow: '0 0 22px #eab308' }}>حلاق أطفال</span>
                  </div>
                  {/* English neon letters */}
                  <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-widest leading-none">
                    <span style={{ color: '#22c55e', textShadow: '0 0 35px #22c55e, 0 0 70px rgba(34,197,94,0.45)' }}>CUT </span>
                    <span style={{ color: '#ef4444', textShadow: '0 0 35px #ef4444, 0 0 70px rgba(239,68,68,0.45)' }}>AND </span>
                    <span style={{ color: '#3b82f6', textShadow: '0 0 35px #3b82f6, 0 0 70px rgba(59,130,246,0.45)' }}>FUN</span>
                  </div>
                  <div className="text-lg md:text-xl font-bold tracking-[0.4em] uppercase mt-2"
                    style={{ color: '#eab308', textShadow: '0 0 16px #eab308' }}>
                    KIDS BARBER
                  </div>
                  {/* Shine line */}
                  <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                    style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)' }} />
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-base md:text-xl text-zinc-300 font-light mb-10 max-w-xl mx-auto leading-relaxed">
                {t('Tagline')}
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center items-center max-w-lg mx-auto">

                {/* Smart booking */}
                <button onClick={() => setIsChatOpen(true)}
                  className="relative font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 w-full md:w-auto text-sm md:text-base overflow-hidden group transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 0 34px rgba(34,197,94,0.45), 0 8px 30px rgba(0,0,0,0.4)' }}>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }} />
                  <MessageSquare className="w-5 h-5 relative z-10" />
                  <span className="whitespace-nowrap relative z-10">{isRTL ? 'الحجز الذكي' : 'Smart Booking'}</span>
                </button>

                {/* WhatsApp */}
                <a href={`https://wa.me/966509860820?text=${encodeURIComponent(isRTL ? 'السلام عليكم، أريد الحجز' : 'Hello, I would like to book an appointment')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="relative font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 w-full md:w-auto text-sm md:text-base group overflow-hidden transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(34,197,94,0.5)', boxShadow: '0 0 22px rgba(34,197,94,0.15)', color: '#fff' }}>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(34,197,94,0.13)' }} />
                  <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#22c55e' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="whitespace-nowrap relative z-10">{isRTL ? 'واتساب' : 'WhatsApp'}</span>
                </a>

                {/* Directions */}
                <a href="https://www.google.com/maps/place/%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81+%D8%B4%D9%81%D8%B1%D8%A9+%D9%84%D9%84%D8%AD%D9%84%D8%A7%D9%82%D8%A9+%D8%A7%D9%84%D8%B1%D8%AC%D8%A7%D9%84%D9%8A%D9%87%E2%80%AD/@24.7558793,46.6976635,15z"
                  target="_blank" rel="noopener noreferrer"
                  className="relative font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 w-full md:w-auto text-sm md:text-base group overflow-hidden transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(234,179,8,0.4)', color: '#fff' }}>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(234,179,8,0.1)' }} />
                  <MapPin className="w-5 h-5 relative z-10" style={{ color: '#eab308' }} />
                  <span className="whitespace-nowrap relative z-10">{isRTL ? 'الاتجاهات' : 'Directions'}</span>
                </a>
              </motion.div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                className="mt-10 inline-flex items-center gap-2 text-sm text-zinc-400 rounded-full px-5 py-2.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#ef4444' }} />
                <span>Sahara Mall, King Fahd Rd, Riyadh</span>
              </motion.div>
            </div>

            {/* Section-to-section fade */}
            <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
              style={{ background: 'linear-gradient(to top,#050508 0%,transparent 100%)' }} />
          </section>

          {/* ── SERVICES (tabbed Boys / Girls menu) ── */}
          <ServicesSection isRTL={isRTL} />

          {/* ── GALLERY ── */}
          <GallerySection />

          {/* ── REVIEWS ── */}
          <ReviewsSection />

          {/* ── FAQ ── */}
          <section id="faq" className="py-24" style={{ background: 'linear-gradient(180deg,#0a0a0f 0%,#050508 100%)' }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase mb-4 px-4 py-1.5 rounded-full"
                  style={{ color: '#eab308', background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)' }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {isRTL ? 'لديك سؤال؟' : 'Have a question?'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest">{t('FAQ')}</h2>
                <div className="w-24 h-1 mx-auto rounded-full mt-5"
                  style={{ background: 'linear-gradient(90deg,#eab308,#ef4444)' }} />
              </motion.div>
              <div className="space-y-4">
                {[1, 2, 3].map(n => (
                  <FAQItem key={n} question={t(`FaqQ${n}` as any)} answer={t(`FaqA${n}` as any)} />
                ))}
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="pt-16 pb-8" style={{ background: '#030305', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="w-full h-0.5 mb-16 -mt-px"
              style={{ background: 'linear-gradient(90deg,#22c55e,#3b82f6,#ef4444,#eab308,#22c55e)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                {/* Brand */}
                <div>
                  <div className="text-2xl font-black tracking-widest mb-2">
                    <span style={{ color: '#22c55e' }}>CUT </span>
                    <span style={{ color: '#ef4444' }}>AND </span>
                    <span style={{ color: '#3b82f6' }}>FUN</span>
                  </div>
                  <div className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: '#eab308' }}>Kids Barber</div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{t('Tagline')}</p>
                  <div className="flex gap-3 mt-6">
                    {[Instagram, Facebook].map((Icon, i) => (
                      <a key={i} href="#"
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Icon className="w-4 h-4 text-zinc-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">{t('Contact')}</h4>
                  <div className="space-y-4 text-zinc-400 text-sm">
                    <p className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#ef4444' }} />
                      <span className="leading-tight">{t('Address')}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#22c55e' }} />
                      <span dir="ltr" className="font-medium text-white tracking-wide">+966 54 442 0003</span>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">{t('Hours')}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: '#3b82f6' }} />
                    <span className="text-zinc-300 text-sm font-semibold">{t('Opening_Hours')}</span>
                  </div>
                  <div className={`grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm ${isRTL ? 'pr-2' : 'pl-2'}`}>
                    {[
                      { day: 'Thursday',  hours: '9 AM – 12 AM' },
                      { day: 'Friday',    hours: '12 PM – 12 AM' },
                      { day: 'Saturday',  hours: '9 AM – 12 AM' },
                      { day: 'Sunday',    hours: '9 AM – 12 AM' },
                      { day: 'Monday',    hours: '9 AM – 12 AM' },
                      { day: 'Tuesday',   hours: '9 AM – 12 AM' },
                      { day: 'Wednesday', hours: '9 AM – 12 AM' },
                    ].map(({ day, hours }) => (
                      <>
                        <span key={day + 'a'} className="text-zinc-500">{t(day)}</span>
                        <span key={day + 'b'} dir="ltr" className="text-white font-medium">{hours}</span>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 text-center text-sm text-zinc-700"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                &copy; {new Date().getFullYear()} CUT AND FUN Kids Barber — Riyadh. All rights reserved.
              </div>
            </div>
          </footer>
        </main>

        {/* ── Chat FAB ── */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50"
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg,#22c55e,#16a34a)',
            boxShadow: '0 0 32px rgba(34,197,94,0.55), 0 8px 30px rgba(0,0,0,0.4)',
          }}>
          {isChatOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
        </motion.button>

        {/* ── Chat panel ── */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.95 }}
              className="fixed bottom-[90px] right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-[400px] rounded-2xl shadow-2xl z-[60] overflow-hidden flex flex-col"
              style={{
                maxHeight: '600px', height: '70vh',
                border: '1px solid rgba(34,197,94,0.22)',
                boxShadow: '0 0 44px rgba(34,197,94,0.14), 0 40px 80px rgba(0,0,0,0.55)',
              }}>
              {/* Chat header */}
              <div className="p-4 flex justify-between items-center"
                style={{ background: 'rgba(5,5,8,0.98)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 0 16px rgba(34,197,94,0.4)' }}>
                    <Scissors className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">
                      {isRTL ? 'مساعد الحجز' : 'Booking Assistant'}
                    </h3>
                    <p className="text-xs flex items-center gap-1.5" style={{ color: '#22c55e' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
                        style={{ boxShadow: '0 0 6px #22c55e' }} />
                      {isRTL ? 'متاح' : 'Online'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ChatInterface isRTL={isRTL} t={t} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Global animations ── */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-15px) rotate(3deg); }
          66%      { transform: translateY(-8px) rotate(-2deg); }
        }
        .scissors-float {
          position: absolute; font-size: 2rem; opacity: 0.07;
          animation: float 6s ease-in-out infinite; color: #22c55e;
        }
        .scissors-float-1 { top:10%; left:5%;   animation-delay:0s;   font-size:3rem;   color:#22c55e; }
        .scissors-float-2 { top:20%; right:10%; animation-delay:1.5s; font-size:2rem;   color:#3b82f6; }
        .scissors-float-3 { top:60%; left:15%; animation-delay:3s;   font-size:2.5rem; color:#ef4444; }
        .scissors-float-4 { top:80%; right:20%; animation-delay:0.5s; font-size:1.8rem; color:#eab308; }
        .scissors-float-5 { top:45%; left:50%; animation-delay:2s;   font-size:3.5rem; color:#22c55e; }
        .dir-rtl { direction: rtl; }
        .dir-ltr { direction: ltr; }
      `}</style>
    </>
  );
}