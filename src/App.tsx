
/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   CUT AND FUN — Kids Barber · Premium Rebuild                   ║
 * ║   Designer notes:                                               ║
 * ║   • Hero uses the REAL shop photo (/gallery/25.jpg) as a       ║
 * ║     cinematic full-bleed backdrop with 4-layer overlay system  ║
 * ║   • Loading screen: animated scissors SVG + neon ring          ║
 * ║   • All images from /gallery/*.jpg  (no fallback needed)       ║
 * ║   • Logo: /gallery/barbershoplogo.png (with .webp/.ico tried)  ║
 * ║   • Boys/Girls tabbed price menu                               ║
 * ║   • i18n fully preserved, zero new deps                        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Scissors, Star, ChevronDown, ChevronUp,
  MessageSquare, X, Send, MapPin, Clock, Phone,
  Loader2, ChevronLeft, ChevronRight, Sun, Moon,
  Instagram, Facebook, Menu, Sparkles, ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewsSection from './components/ReviewsSection';

/* ── Brand palette — mirrors the actual neon shop sign ─────────── */
const BRAND = {
  green:  '#22c55e',
  red:    '#ef4444',
  blue:   '#3b82f6',
  yellow: '#eab308',
  pink:   '#ec4899',
  bg:     '#050508',
  surface:'#0a0a12',
};

/* ── Menu data ──────────────────────────────────────────────────── */
const fullMenu = [
  { en: 'Boys Haircut',              ar: 'قص شعر الأولاد',            price: '35',  category: 'boys'  },
  { en: 'Boys Lineup',               ar: 'تحديد أولاد',               price: '20',  category: 'boys'  },
  { en: 'Machine Haircut (Grade 1)', ar: 'حلاقة مكينة درجة واحدة',    price: '25',  category: 'boys'  },
  { en: 'Boys Blow Dry',             ar: 'استشوار / شعر الأولاد',     price: '15',  category: 'boys'  },
  { en: 'Hair Wash',                 ar: 'غسيل شعر',                  price: '15',  category: 'boys'  },
  { en: 'Girls Haircut (Any Style)', ar: 'قص شعر أي موديل',           price: '45',  category: 'girls' },
  { en: 'Trim + Blow Dry',           ar: 'قص شعر / أطراف مع استشوار', price: '65',  category: 'girls' },
  { en: 'Blow Dry',                  ar: 'استشوار / شعر',             price: '35',  category: 'girls' },
  { en: 'Bangs Trim',                ar: 'قص الغرة',                  price: '20',  category: 'girls' },
  { en: 'Hair Wash',                 ar: 'غسيل الشعر',                price: '15',  category: 'girls' },
];

/* ══════════════════════════════════════════════════════════════════
   LOADING SCREEN — Animated scissors + neon spin ring
   ══════════════════════════════════════════════════════════════════ */
function LoadingScreen({ isRTL }: { isRTL: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: BRAND.bg }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ── Animated background grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${BRAND.green} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.green} 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }} />

      {/* ── Floating scissors (positioned absolutely, CSS-animated) ── */}
      {[
        { top: '8%',  left: '6%',  size: '3.2rem', color: BRAND.green,  delay: '0s',    rot: '-15deg' },
        { top: '14%', right: '8%', size: '2rem',   color: BRAND.blue,   delay: '1.4s',  rot: '20deg'  },
        { top: '55%', left: '4%',  size: '2.8rem', color: BRAND.red,    delay: '2.8s',  rot: '-8deg'  },
        { top: '72%', right: '6%', size: '2rem',   color: BRAND.yellow, delay: '0.7s',  rot: '12deg'  },
        { top: '38%', left: '52%', size: '3.8rem', color: BRAND.green,  delay: '1.9s',  rot: '0deg'   },
        { top: '82%', left: '30%', size: '1.8rem', color: BRAND.blue,   delay: '3.2s',  rot: '-22deg' },
        { top: '22%', left: '38%', size: '1.5rem', color: BRAND.red,    delay: '2.1s',  rot: '30deg'  },
      ].map((s, i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{
            top: s.top, left: (s as any).left, right: (s as any).right,
            fontSize: s.size, color: s.color, opacity: 0.13,
            transform: `rotate(${s.rot})`,
            animation: `loadFloat 5s ease-in-out infinite`,
            animationDelay: s.delay,
          }}>
          ✂
        </div>
      ))}

      {/* ── Central neon ring + logo ── */}
      <div className="relative flex items-center justify-center">
        {/* Outer spinning conic ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${BRAND.green}, ${BRAND.blue}, ${BRAND.red}, ${BRAND.yellow}, ${BRAND.green})`,
            padding: 3,
            filter: 'blur(1px)',
          }}
        />
        {/* Inner static dark disc */}
        <div className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center"
          style={{ background: BRAND.bg, boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring', damping: 12 }}>
            {/* Logo — tries .png, falls back to scissors emoji */}
            <img
              src="/gallery/barbershoplogo.png"
              alt="CUT AND FUN"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              onError={e => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const fallback = img.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback if logo missing */}
            <div className="hidden w-24 h-24 items-center justify-center text-5xl">✂️</div>
          </motion.div>
        </div>
        {/* Glow bloom behind ring */}
        <div className="absolute w-56 h-56 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)`,
            filter: 'blur(24px)',
          }} />
      </div>

      {/* ── Brand name ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="mt-10 text-center">
        <div className="text-4xl md:text-5xl font-black tracking-widest mb-2 leading-none">
          <span style={{ color: BRAND.green,  textShadow: `0 0 28px ${BRAND.green}`  }}>CUT </span>
          <span style={{ color: BRAND.red,    textShadow: `0 0 28px ${BRAND.red}`    }}>AND </span>
          <span style={{ color: BRAND.blue,   textShadow: `0 0 28px ${BRAND.blue}`   }}>FUN</span>
        </div>
        <div className="text-xs tracking-[0.5em] uppercase font-bold"
          style={{ color: BRAND.yellow, textShadow: `0 0 12px ${BRAND.yellow}` }}>
          Kids Barber · Riyadh
        </div>
      </motion.div>

      {/* ── Loading bar ── */}
      <motion.div className="mt-10 h-[2px] rounded-full overflow-hidden"
        style={{ width: '220px', background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.7, ease: 'easeInOut', delay: 0.2 }}
          style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.blue}, ${BRAND.red}, ${BRAND.yellow})` }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-4 text-xs tracking-[0.3em] uppercase"
        style={{ color: 'rgba(255,255,255,0.25)' }}>
        {isRTL ? 'جاري التحميل...' : 'Loading...'}
      </motion.p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO — The shop as cinematic art
   ══════════════════════════════════════════════════════════════════ */
function HeroSection({ isRTL, onChatOpen }: { isRTL: boolean; onChatOpen: () => void }) {
  const { t } = useTranslation();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── SHOP PHOTO — 4-layer cinematic treatment ── */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder dark bg while image loads */}
        <div className="absolute inset-0" style={{ background: '#07070e' }} />

        {/* The actual shop photo (/gallery/25.jpg as uploaded) */}
        <img
          src="/gallery/25.jpg"
          alt="CUT AND FUN Kids Barber Shop - Sahara Mall Riyadh"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            objectPosition: 'center 20%',
            opacity: imgLoaded ? 1 : 0,
            /* Subtle zoom-in breathing animation */
            animation: imgLoaded ? 'heroZoom 20s ease-in-out infinite alternate' : 'none',
          }}
          onLoad={() => setImgLoaded(true)}
          onError={e => {
            /* Fallback chain: 25.jpg → 6.jpg → unsplash */
            const img = e.target as HTMLImageElement;
            if (img.src.includes('25.jpg')) {
              img.src = '/gallery/6.jpg';
            } else if (img.src.includes('6.jpg')) {
              img.src = '/gallery/25.jpg';
              setImgLoaded(true);
            }
          }}
        />

        {/* Layer 1: Deep dark vignette — frames the shop like a stage */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.7) 100%)',
          }} />

        {/* Layer 2: Top & bottom gradient — text readability + section bleed */}
        <div className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(5,5,8,0.85) 0%,
              rgba(5,5,8,0.30) 25%,
              rgba(5,5,8,0.20) 50%,
              rgba(5,5,8,0.65) 75%,
              ${BRAND.bg} 100%
            )`,
          }} />

        {/* Layer 3: Brand-color neon wash — ties the real photo to the identity */}
        <div className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 35%,
              rgba(34,197,94,0.06) 0%,
              rgba(59,130,246,0.05) 30%,
              rgba(239,68,68,0.04) 60%,
              transparent 80%
            )`,
          }} />

        {/* Layer 4: Side darkening — focuses eye to center */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.55) 100%)',
          }} />
      </div>

      {/* ── Atmospheric floating orbs (depth/parallax feel) ── */}
      <div className="absolute top-[20%] left-[7%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(34,197,94,0.14) 0%, transparent 70%)`, filter: 'blur(55px)', animation: 'floatOrb 8s ease-in-out infinite' }} />
      <div className="absolute top-[30%] right-[5%] w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)`, filter: 'blur(65px)', animation: 'floatOrb 11s ease-in-out infinite reverse' }} />
      <div className="absolute bottom-[20%] left-[20%] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(239,68,68,0.10) 0%, transparent 70%)`, filter: 'blur(50px)', animation: 'floatOrb 9s ease-in-out infinite 2s' }} />

      {/* ── Hero Content ── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-28 pb-20">

        {/* Star rating pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-7">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current"
                style={{ color: BRAND.yellow, filter: `drop-shadow(0 0 7px ${BRAND.yellow})` }} />
            ))}
          </div>
          <span className="text-sm font-bold text-zinc-300 tracking-wide">5.0 · Sahara Mall</span>
        </motion.div>

        {/* ── THE NEON SIGN — exact replica of the real shop signage ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 36 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', damping: 13, stiffness: 90 }}
          className="mb-7">
          <div className="inline-block relative">
            {/* Glass card mimicking the wooden sign board */}
            <div className="relative rounded-2xl md:rounded-3xl px-7 py-6 md:px-10 md:py-8"
              style={{
                background: 'rgba(6,6,12,0.78)',
                backdropFilter: 'blur(28px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.04),
                  0 0 80px rgba(34,197,94,0.20),
                  0 0 160px rgba(59,130,246,0.10),
                  0 60px 100px rgba(0,0,0,0.60)
                `,
                transform: 'perspective(700px) rotateX(1.5deg)',
              }}>

              {/* ── Arabic line (top row of real sign) ── */}
              <div className="text-xl md:text-2xl font-black mb-3 leading-none" style={{ direction: 'rtl' }}>
                <span style={{ color: BRAND.green,  textShadow: `0 0 18px ${BRAND.green},  0 0 40px ${BRAND.green}40`  }}>كات آند فن </span>
                <span style={{ color: BRAND.yellow, textShadow: `0 0 18px ${BRAND.yellow}, 0 0 40px ${BRAND.yellow}40` }}>حلاق أطفال</span>
              </div>

              {/* ── English neon letters (main sign row) ── */}
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-widest leading-none">
                <span style={{ color: BRAND.green,  textShadow: `0 0 40px ${BRAND.green},  0 0 80px ${BRAND.green}60`  }}>CUT </span>
                <span style={{ color: BRAND.red,    textShadow: `0 0 40px ${BRAND.red},    0 0 80px ${BRAND.red}60`    }}>AND </span>
                <span style={{ color: BRAND.blue,   textShadow: `0 0 40px ${BRAND.blue},   0 0 80px ${BRAND.blue}60`   }}>FUN</span>
              </div>

              {/* ── KIDS BARBER subtitle ── */}
              <div className="text-lg md:text-xl font-black tracking-[0.5em] uppercase mt-3"
                style={{ color: BRAND.yellow, textShadow: `0 0 20px ${BRAND.yellow}` }}>
                KIDS BARBER
              </div>

              {/* Glass shine line across top */}
              <div className="absolute inset-x-6 top-0 h-px rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }} />

              {/* Bottom glow line */}
              <div className="absolute inset-x-0 bottom-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${BRAND.green}66, ${BRAND.blue}66, transparent)` }} />
            </div>

            {/* Outer bloom halo */}
            <div className="absolute -inset-8 rounded-3xl pointer-events-none"
              style={{
                background: `radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)`,
                filter: 'blur(20px)',
              }} />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}
          className="text-base md:text-xl text-zinc-200 font-light mb-12 max-w-xl mx-auto leading-relaxed"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
          {isRTL
            ? 'حلاقة آمنة وممتعة واحترافية للأطفال في قلب الرياض'
            : 'Safe, Fun & Professional Kids Haircuts — Sahara Mall, Riyadh'}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center">

          {/* Primary — Smart Booking */}
          <button
            onClick={onChatOpen}
            className="group relative font-black py-4 px-9 rounded-full flex items-center justify-center gap-3 w-full sm:w-auto text-sm md:text-base overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${BRAND.green}, #16a34a)`,
              boxShadow: `0 0 40px rgba(34,197,94,0.5), 0 12px 40px rgba(0,0,0,0.5)`,
            }}>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }} />
            <MessageSquare className="w-5 h-5 relative z-10" />
            <span className="whitespace-nowrap relative z-10 tracking-wide">
              {isRTL ? '✨ الحجز الذكي' : '✨ Smart Booking'}
            </span>
          </button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/966509860820?text=${encodeURIComponent(isRTL ? 'السلام عليكم، أريد الحجز' : 'Hello, I would like to book an appointment')}`}
            target="_blank" rel="noopener noreferrer"
            className="group relative font-bold py-4 px-9 rounded-full flex items-center justify-center gap-3 w-full sm:w-auto text-sm md:text-base overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: `2px solid rgba(34,197,94,0.55)`,
              boxShadow: `0 0 24px rgba(34,197,94,0.18)`,
              color: '#fff',
            }}>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(34,197,94,0.14)' }} />
            <svg className="w-5 h-5 relative z-10 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: BRAND.green }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="whitespace-nowrap relative z-10">{isRTL ? 'واتساب' : 'WhatsApp'}</span>
          </a>

          {/* Directions */}
          <a
            href="https://www.google.com/maps/place/%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81+%D8%B4%D9%81%D8%B1%D8%A9+%D9%84%D9%84%D8%AD%D9%84%D8%A7%D9%82%D8%A9+%D8%A7%D9%84%D8%B1%D8%AC%D8%A7%D9%84%D9%8A%D9%87%E2%80%AD/@24.7558793,46.6976635,15z"
            target="_blank" rel="noopener noreferrer"
            className="group relative font-bold py-4 px-9 rounded-full flex items-center justify-center gap-3 w-full sm:w-auto text-sm md:text-base overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: `2px solid rgba(234,179,8,0.45)`,
              color: '#fff',
            }}>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(234,179,8,0.12)' }} />
            <MapPin className="w-5 h-5 relative z-10 flex-shrink-0" style={{ color: BRAND.yellow }} />
            <span className="whitespace-nowrap relative z-10">{isRTL ? 'الاتجاهات' : 'Get Directions'}</span>
          </a>
        </motion.div>

        {/* Location chip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          className="mt-10 inline-flex items-center gap-2.5 text-sm text-zinc-300 rounded-full px-5 py-2.5"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(12px)',
          }}>
          <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: BRAND.red }} />
          <span>Sahara Mall, King Fahd Rd, Riyadh</span>
        </motion.div>
      </div>

      {/* Section fade to next */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${BRAND.bg} 0%, transparent 100%)` }} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SERVICES — Boys / Girls tabbed price card
   ══════════════════════════════════════════════════════════════════ */
function ServicesSection({ isRTL }: { isRTL: boolean }) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'boys' | 'girls'>('boys');

  const tabs = [
    { key: 'boys'  as const, en: '✂ Boys',  ar: '✂ أولاد', accent: BRAND.blue,  glow: 'rgba(59,130,246,' },
    { key: 'girls' as const, en: '✂ Girls', ar: '✂ بنات',  accent: BRAND.pink,  glow: 'rgba(236,72,153,' },
  ];
  const current = tabs.find(t => t.key === activeTab)!;
  const filtered = fullMenu.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-24 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${BRAND.bg} 0%, ${BRAND.surface} 100%)` }}>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.4,
        }} />

      {/* Ambient color bloom */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(ellipse, ${current.glow}0.12) 0%, transparent 65%)`,
            filter: 'blur(90px)',
            transition: 'background 0.7s ease',
          }} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.4em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{ color: BRAND.yellow, background: 'rgba(234,179,8,0.08)', border: `1px solid rgba(234,179,8,0.25)` }}>
            <Sparkles className="w-3.5 h-3.5" />
            {isRTL ? 'أسعار حلاقة الأطفال' : "Children's Price Menu"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase">{t('Services')}</h2>
          <div className="w-24 h-1 mx-auto rounded-full mt-5"
            style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.blue}, ${BRAND.red})` }} />
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="flex rounded-2xl p-1.5 gap-1.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative px-10 py-3 rounded-xl font-black text-sm md:text-base tracking-widest uppercase overflow-hidden transition-colors duration-300"
                style={{ color: activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.35)' }}>
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="svc-tab-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${tab.accent}ee, ${tab.accent}aa)`,
                      boxShadow: `0 0 30px ${tab.glow}0.55)`,
                    }}
                    transition={{ type: 'spring', bounce: 0.22, duration: 0.45 }}
                  />
                )}
                <span className="relative z-10">{i18n.language === 'ar' ? tab.ar : tab.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price card */}
        <motion.div layout className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: `1px solid ${current.accent}33`,
            boxShadow: `0 0 70px ${current.glow}0.07), 0 50px 90px rgba(0,0,0,0.45)`,
          }}>

          {/* Tab-colored top bar */}
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${current.accent}, ${current.accent}55)` }} />

          {/* Category header */}
          <div className="px-8 pt-7 pb-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black"
              style={{ background: `${current.accent}18`, border: `1px solid ${current.accent}44` }}>
              {activeTab === 'boys' ? '👦' : '👧'}
            </div>
            <div>
              <p className="font-black text-white text-lg tracking-wide">
                {activeTab === 'boys'
                  ? (isRTL ? 'الأولاد' : 'Boys')
                  : (isRTL ? 'البنات' : 'Girls')}
              </p>
              <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {isRTL ? 'الأسعار بالريال السعودي' : 'Prices in Saudi Riyal'}
              </p>
            </div>
          </div>

          {/* Menu rows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="px-6 md:px-10 pb-8">
              {filtered.map((svc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.3 }}
                  className="flex items-center justify-between py-5 group relative"
                  style={{ borderBottom: idx < filtered.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  {/* Hover fill */}
                  <div className="absolute inset-x-0 inset-y-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: `${current.accent}08` }} />

                  <span className="font-semibold text-zinc-300 group-hover:text-white transition-colors text-base md:text-lg relative z-10">
                    {i18n.language === 'ar' ? svc.ar : svc.en}
                  </span>

                  {/* Dotted leader */}
                  <div className="flex-1 mx-5 min-w-0 border-0" style={{ borderBottom: '1px dotted rgba(255,255,255,0.10)', marginTop: '-3px' }} />

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 relative z-10">
                    <span className="font-black text-2xl md:text-3xl tabular-nums"
                      style={{ color: current.accent, textShadow: `0 0 16px ${current.glow}0.7)` }}>
                      {svc.price}
                    </span>
                    <span className="text-xs font-bold tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {isRTL ? 'ر.س' : 'SR'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* VAT note */}
          <div className="px-8 pb-6 -mt-2">
            <p className="text-xs text-center tracking-wide" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {isRTL ? '* الأسعار شاملة ضريبة القيمة المضافة' : '* All prices include VAT'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   GALLERY — Auto-scrolling strip + lightbox
   ══════════════════════════════════════════════════════════════════ */
function GallerySection() {
  const { i18n } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  /* Gallery images — all .jpg in /gallery/ */
  const images = [1, 2, 3, 4, 5, 6, 7].map(n => `/gallery/${n}.jpg`);
  const accents = [BRAND.green, BRAND.blue, BRAND.red, BRAND.yellow];

  useEffect(() => {
    let id: number; let dir = 1;
    const loop = () => {
      if (scrollRef.current && !isPaused) {
        const el = scrollRef.current;
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= max - 1) dir = -1;
        else if (el.scrollLeft <= 0) dir = 1;
        el.scrollLeft += dir * 1.3;
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [isPaused]);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #090910 0%, #0c0c18 100%)' }}>

      {/* Rainbow floor */}
      <div className="absolute inset-x-0 bottom-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.red}, ${BRAND.blue}, ${BRAND.yellow}, ${BRAND.green})` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.4em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{ color: BRAND.green, background: 'rgba(34,197,94,0.08)', border: `1px solid rgba(34,197,94,0.25)` }}>
            <Sparkles className="w-3.5 h-3.5" />
            {i18n.language === 'ar' ? 'أعمالنا' : 'Our Work'}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase">
            {i18n.language === 'ar' ? '✂ المعرض' : '✂ Gallery'}
          </h2>
          <div className="w-28 h-1 mx-auto rounded-full mt-5"
            style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.blue}, ${BRAND.red})` }} />
        </motion.div>
      </div>

      {/* Scroll strip */}
      <div className="relative w-full"
        onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)} dir="ltr">

        {/* Arrow buttons */}
        {(['left','right'] as const).map(side => (
          <div key={side}
            className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'} hidden md:block z-10`}>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: side === 'left' ? -360 : 360, behavior: 'smooth' })}
              className="p-3 rounded-full transition-all hover:scale-110"
              style={{
                background: 'rgba(8,8,18,0.92)',
                border: `1px solid ${side === 'left' ? `rgba(34,197,94,0.4)` : `rgba(59,130,246,0.4)`}`,
                color: side === 'left' ? BRAND.green : BRAND.blue,
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
            const accent = accents[idx % accents.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="shrink-0 w-[220px] md:w-[280px] aspect-[3/4] overflow-hidden rounded-2xl relative group cursor-pointer"
                style={{ border: `2px solid ${accent}30`, boxShadow: `0 0 24px ${accent}18, 0 20px 50px rgba(0,0,0,0.5)` }}
                onClick={() => setSelected(src)}
                whileHover={{ scale: 1.04, y: -10 }}>
                <img src={src} alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${accent}44 0%, transparent 60%)` }} />
                {/* View icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.7)', border: `1px solid ${accent}` }}>
                    <ArrowRight className="w-5 h-5" style={{ color: accent }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs mt-1 md:hidden tracking-widest font-bold"
          style={{ color: BRAND.green }}>← swipe →</p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(18px)' }}
            onClick={() => setSelected(null)}>
            <button
              className="absolute top-6 right-6 p-3 rounded-full z-10"
              style={{ background: 'rgba(8,8,18,0.95)', border: `1px solid rgba(239,68,68,0.5)`, color: BRAND.red }}
              onClick={() => setSelected(null)}>
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              src={selected} alt="Selected"
              className="max-w-full max-h-full object-contain rounded-2xl"
              style={{ boxShadow: `0 0 90px rgba(59,130,246,0.4)` }}
              onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CHAT
   ══════════════════════════════════════════════════════════════════ */
function ChatInterface({ isRTL, t }: { isRTL: boolean; t: any }) {
  const [messages, setMessages] = useState<{ role: 'user'|'bot'; text: string }[]>([
    { role: 'bot', text: t('ChatWelcome') },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(prev => {
      const arr = [...prev];
      if (arr[0]?.role === 'bot') arr[0].text = t('ChatWelcome');
      return arr;
    });
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMsg }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      let botText = data.response;
      const marker = '[BOOKING_CONFIRMED:';
      if (botText.includes(marker)) {
        try {
          const s = botText.indexOf(marker) + marker.length;
          const e = botText.indexOf(']', s);
          const booking = JSON.parse(botText.substring(s, e).trim());
          await fetch('/api/notify-boss', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(booking) });
          botText = botText.replace(/\[BOOKING_CONFIRMED:.*?\]/, '').trim() || 'Booked!';
        } catch {}
      }
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'عذراً، حدث خطأ. / Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#08080f' }}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}>
            <div className="max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
              style={msg.role === 'user'
                ? { background: `linear-gradient(135deg, ${BRAND.green}, #16a34a)`, color: '#fff', boxShadow: `0 0 14px rgba(34,197,94,0.3)` }
                : { background: 'rgba(255,255,255,0.06)', color: '#e4e4e7', border: '1px solid rgba(255,255,255,0.09)' }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <Loader2 className="w-4 h-4 animate-spin" style={{ color: BRAND.green }} />
            </div>
          </div>
        )}
      </div>
      <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0d0d1c' }}>
        <div className="flex gap-2">
          <input
            type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={isRTL ? 'اكتب رسالة...' : 'Type a message...'}
            className="flex-1 rounded-full px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(34,197,94,0.25)` }} />
          <button onClick={send} disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${BRAND.green}, #16a34a)`, boxShadow: `0 0 14px rgba(34,197,94,0.3)` }}>
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FAQ ITEM
   ══════════════════════════════════════════════════════════════════ */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left hover:bg-white/[0.035] transition-colors">
        <span className="font-bold text-white pr-4">{question}</span>
        {open
          ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: BRAND.green }} />
          : <ChevronDown className="w-5 h-5 flex-shrink-0 text-zinc-600" />}
      </button>
      <div className={`px-6 overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-zinc-400 leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════════ */
export default function App() {
  const { t, i18n } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const timer = setTimeout(() => setIsLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
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
    { id: 'gallery',  label: t('Photos')   },
    { id: 'reviews',  label: t('Reviews')  },
    { id: 'faq',      label: t('FAQ')      },
  ];

  return (
    <>
      {/* ── Loading screen ── */}
      <AnimatePresence>
        {isLoading && <LoadingScreen isRTL={isRTL} />}
      </AnimatePresence>

      <div className={`min-h-screen ${isRTL ? 'dir-rtl' : 'dir-ltr'}`}
        style={{ background: BRAND.bg, color: '#fff', fontFamily: 'system-ui, sans-serif' }}
        dir={isRTL ? 'rtl' : 'ltr'}>

        {/* ── Navbar ── */}
        <nav className="fixed top-0 w-full z-50"
          style={{ background: 'rgba(5,5,8,0.93)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Rainbow stripe */}
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.blue}, ${BRAND.red}, ${BRAND.yellow}, ${BRAND.green})` }} />

          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 md:h-16">

              {/* Logo */}
              <div className="flex items-center gap-3 flex-shrink-0 group cursor-pointer">
                <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: `2px solid rgba(34,197,94,0.55)`, boxShadow: `0 0 16px rgba(34,197,94,0.3)` }}>
                  <img
                    src="/gallery/barbershoplogo.png"
                    alt="CUT AND FUN"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={e => {
                      /* Try .webp then fall back to text logo */
                      const img = e.target as HTMLImageElement;
                      if (!img.src.includes('.webp')) {
                        img.src = '/gallery/barbershoplogo.webp';
                      } else {
                        img.style.display = 'none';
                      }
                    }}
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-black tracking-wide leading-tight">
                    <span style={{ color: BRAND.green }}>CUT </span>
                    <span style={{ color: BRAND.red   }}>AND </span>
                    <span style={{ color: BRAND.blue  }}>FUN</span>
                  </div>
                  <div className="text-[10px] tracking-[0.22em] uppercase font-bold" style={{ color: BRAND.yellow }}>Kids Barber</div>
                </div>
              </div>

              {/* Desktop nav */}
              <div className="hidden lg:flex gap-8 items-center text-[11px] font-black tracking-[0.18em] uppercase">
                {navLinks.map((item, i) => (
                  <button key={i} onClick={() => scrollTo(item.id)}
                    className="text-zinc-400 hover:text-white transition-colors relative group bg-transparent border-0 cursor-pointer">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-300 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.blue})` }} />
                  </button>
                ))}
                <div className={`flex items-center gap-2 ${isRTL ? 'border-r pr-6' : 'border-l pl-6'}`}
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <button onClick={() => setIsDarkMode(!isDarkMode)}
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                  </button>
                  <button onClick={toggleLang}
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img
                      src={i18n.language === 'ar' ? 'https://flagcdn.com/w40/gb.png' : 'https://flagcdn.com/w40/sa.png'}
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
                <button onClick={toggleLang}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={i18n.language === 'ar' ? 'https://flagcdn.com/w40/gb.png' : 'https://flagcdn.com/w40/sa.png'} width="18" alt="lang" className="rounded-sm" />
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
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5,5,8,0.98)' }}>
                {navLinks.map((item, i) => (
                  <button key={i} onClick={() => scrollTo(item.id)}
                    className="w-full flex justify-between items-center px-5 py-4 text-sm text-zinc-300 hover:text-white font-bold tracking-widest uppercase transition-colors"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span>{item.label}</span>
                    <span style={{ color: BRAND.green }}>›</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main>
          <HeroSection isRTL={isRTL} onChatOpen={() => setIsChatOpen(true)} />
          <ServicesSection isRTL={isRTL} />
          <GallerySection />
          <ReviewsSection />

          {/* FAQ */}
          <section id="faq" className="py-24"
            style={{ background: `linear-gradient(180deg, ${BRAND.surface} 0%, ${BRAND.bg} 100%)` }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.4em] uppercase mb-5 px-5 py-2 rounded-full"
                  style={{ color: BRAND.yellow, background: 'rgba(234,179,8,0.08)', border: `1px solid rgba(234,179,8,0.25)` }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {isRTL ? 'لديك سؤال؟' : 'Got Questions?'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest">{t('FAQ')}</h2>
                <div className="w-24 h-1 mx-auto rounded-full mt-5"
                  style={{ background: `linear-gradient(90deg, ${BRAND.yellow}, ${BRAND.red})` }} />
              </motion.div>
              <div className="space-y-4">
                {[1,2,3].map(n => (
                  <FAQItem key={n} question={t(`FaqQ${n}` as any)} answer={t(`FaqA${n}` as any)} />
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background: '#030305', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="h-[2px]"
              style={{ background: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.blue}, ${BRAND.red}, ${BRAND.yellow}, ${BRAND.green})` }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                  <div className="text-2xl font-black tracking-widest mb-2">
                    <span style={{ color: BRAND.green }}>CUT </span>
                    <span style={{ color: BRAND.red   }}>AND </span>
                    <span style={{ color: BRAND.blue  }}>FUN</span>
                  </div>
                  <div className="text-xs tracking-[0.3em] uppercase mb-4 font-bold" style={{ color: BRAND.yellow }}>Kids Barber</div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{t('Tagline')}</p>
                  <div className="flex gap-3 mt-6">
                    {[Instagram, Facebook].map((Icon, i) => (
                      <a key={i} href="#"
                        className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Icon className="w-4 h-4 text-zinc-400" />
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-black mb-5 text-xs uppercase tracking-[0.3em]">{t('Contact')}</h4>
                  <div className="space-y-4 text-zinc-400 text-sm">
                    <p className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: BRAND.red }} />
                      <span className="leading-snug">{t('Address')}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="w-4 h-4 flex-shrink-0" style={{ color: BRAND.green }} />
                      <span dir="ltr" className="font-bold text-white tracking-wide">+966 54 442 0003</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-black mb-5 text-xs uppercase tracking-[0.3em]">{t('Hours')}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: BRAND.blue }} />
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
                        <span key={day+'a'} className="text-zinc-500">{t(day)}</span>
                        <span key={day+'b'} dir="ltr" className="text-white font-semibold">{hours}</span>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 text-center text-xs text-zinc-700"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                © {new Date().getFullYear()} CUT AND FUN Kids Barber — Riyadh. All rights reserved.
              </div>
            </div>
          </footer>
        </main>

        {/* ── Chat FAB ── */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full flex items-center justify-center z-50"
          whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
          style={{
            background: `linear-gradient(135deg, ${BRAND.green}, #16a34a)`,
            boxShadow: `0 0 36px rgba(34,197,94,0.6), 0 10px 35px rgba(0,0,0,0.5)`,
          }}>
          <AnimatePresence mode="wait">
            <motion.div key={isChatOpen ? 'x' : 'msg'}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}>
              {isChatOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* ── Chat panel ── */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.94 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="fixed bottom-[90px] right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-[400px] rounded-2xl z-[60] overflow-hidden flex flex-col"
              style={{
                maxHeight: '600px', height: '70vh',
                border: `1px solid rgba(34,197,94,0.22)`,
                boxShadow: `0 0 50px rgba(34,197,94,0.14), 0 40px 80px rgba(0,0,0,0.6)`,
              }}>
              <div className="p-4 flex justify-between items-center flex-shrink-0"
                style={{ background: 'rgba(5,5,8,0.98)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${BRAND.green}, #16a34a)`, boxShadow: `0 0 18px rgba(34,197,94,0.45)` }}>
                    <Scissors className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-sm">{isRTL ? 'مساعد الحجز' : 'Booking Assistant'}</h3>
                    <p className="text-xs flex items-center gap-1.5" style={{ color: BRAND.green }}>
                      <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                        style={{ background: BRAND.green, boxShadow: `0 0 6px ${BRAND.green}` }} />
                      {isRTL ? 'متاح الآن' : 'Online'}
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

      {/* ════ Global CSS ════ */}
      <style>{`
        /* Loading screen scissors float */
        @keyframes loadFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40%       { transform: translateY(-18px) rotate(5deg); }
          70%       { transform: translateY(-9px) rotate(-3deg); }
        }
        /* Hero image subtle zoom breathing */
        @keyframes heroZoom {
          from { transform: scale(1.00); }
          to   { transform: scale(1.07); }
        }
        /* Ambient orb float */
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33%       { transform: translateY(-22px) translateX(8px); }
          66%       { transform: translateY(-10px) translateX(-6px); }
        }
        /* RTL/LTR direction helpers */
        .dir-rtl { direction: rtl; }
        .dir-ltr { direction: ltr; }
        /* Hide scrollbars on gallery strip */
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}