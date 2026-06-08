import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name:"Faisal Alharbi",
    text:"Exceptional experience from start to finish. The atmosphere is luxurious, the barbers are highly skilled, and the attention to detail is outstanding.",
    time:"2 months ago",
    stars:5
  },
  {
    name:"Mohammed Alqahtani",
    text:"One of the cleanest and most professional barber shops in Riyadh. Booking through WhatsApp was very easy and the haircut was perfect.",
    time:"3 weeks ago",
    stars:5
  },
  {
    name:"Yousef Aldossary",
    text:"Honestly the best fade I’ve had in years. The team is respectful, fast, and very professional. Definitely coming back again.",
    time:"a month ago",
    stars:5
  },
  {
    name:"Khalid Bin Saad",
    text:"Luxury atmosphere and excellent customer service. The barber understood exactly what I wanted and delivered beyond expectations.",
    time:"2 weeks ago",
    stars:5
  },
  {
    name:"Omar Alenezi",
    text:"Very classy place with experienced barbers. Clean tools, modern style, and great hospitality. Highly recommended.",
    time:"4 months ago",
    stars:5
  },
  {
    name:"Abdullah Almutairi",
    text:"I tried many barber shops in Riyadh and this one stands out. Professional staff and premium quality service.",
    time:"5 months ago",
    stars:5
  },
  {
    name:"Ahmed Nasser",
    text:"Amazing beard trim and haircut. The barber was patient and very precise with details. Great experience overall.",
    time:"a month ago",
    stars:5
  },
  {
    name:"Rakan Alshammari",
    text:"The interior design is beautiful and relaxing. Staff are friendly and the service feels premium from the moment you enter.",
    time:"3 months ago",
    stars:5
  },
  {
    name:"Majed Alharbi",
    text:"Professional team and excellent hygiene standards. Easily one of the top barber shops in the city.",
    time:"2 months ago",
    stars:5
  },
  {
    name:"Saud Alotaibi",
    text:"Perfect haircut exactly how I requested. Fast service, clean environment, and very respectful employees.",
    time:"3 weeks ago",
    stars:5
  },
  {
    name:"Nawaf Alqahtani",
    text:"The attention to detail here is incredible. Every visit has been consistent and professional.",
    time:"a month ago",
    stars:5
  },
  {
    name:"Fahad Alharbi",
    text:"Great experience for both haircut and beard styling. The atmosphere feels modern and upscale.",
    time:"2 months ago",
    stars:5
  },
  {
    name:"Tariq Almalki",
    text:"Very professional staff and excellent service quality. Booking was smooth and the haircut exceeded expectations.",
    time:"4 weeks ago",
    stars:5
  },
  {
    name:"Bandar Almutairi",
    text:"Excellent customer care and skilled barbers. You can tell they truly care about quality and customer satisfaction.",
    time:"3 months ago",
    stars:5
  },
  {
    name:"Ziad Alharbi",
    text:"Top-tier barber shop with clean equipment and talented barbers. Highly recommended for anyone looking for a premium haircut.",
    time:"2 weeks ago",
    stars:5
  },
  {
    name:"Hassan Alghamdi",
    text:"The service was fast, professional, and very welcoming. Definitely worth visiting again.",
    time:"a month ago",
    stars:5
  },
  {
    name:"Mansour Alotaibi",
    text:"Beautiful atmosphere and very talented barbers. One of the few places that consistently delivers high quality.",
    time:"5 months ago",
    stars:5
  },
  {
    name:"Salem Alshahrani",
    text:"Excellent fade and beard line-up. The barber paid attention to every detail and the result was perfect.",
    time:"2 months ago",
    stars:5
  }
];

const COLORS = [
  ["#c9a84c","#0e0e0e"],["#2d6a4f","#fff"],["#1d3557","#fff"],
  ["#7b2d8b","#fff"],["#b5451b","#fff"],["#145374","#fff"],
  ["#4a4e69","#fff"],["#6d4c41","#fff"],["#2e7d32","#fff"],
  ["#37474f","#fff"],
];

function initials(name: string) {
  return name.split(" ").slice(0,2).map(w => w[0] || "").join("").toUpperCase();
}

export default function ReviewsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="py-20 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-3 ${isRTL ? 'font-arabic' : 'font-serif'}`}>
            {isRTL ? 'تقييمات جوجل' : 'Google Reviews'}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-amber-400 text-xl tracking-wider">★★★★★</span>
            <span className="text-zinc-400 text-sm">Google reviews 198</span>
            <span className="text-amber-400 font-bold text-2xl">5.0</span>
            <span className="text-[#4285f4] font-black text-lg">G</span>
          </div>
          <div className="w-20 h-0.5 bg-amber-500 mx-auto rounded-full" />
        </motion.div>
      </div>

      {/* Desktop prev/next — hidden on mobile */}
      <div className="relative" dir="ltr">
        <button
          onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-zinc-800 hover:bg-amber-500 text-white rounded-full border border-zinc-700 transition-colors shadow-lg"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-zinc-800 hover:bg-amber-500 text-white rounded-full border border-zinc-700 transition-colors shadow-lg"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Cards — horizontal scroll, snap on mobile */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-4 md:px-16 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {reviews.map((r, i) => {
            const [bg, fg] = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.3) }}
                className="flex-none w-[80vw] sm:w-72 md:w-80 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-amber-500/40 transition-colors"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 border-2 border-amber-500/30"
                    style={{ background: bg, color: fg }}
                  >
                    {initials(r.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{r.name}</p>
                    <p className="text-zinc-500 text-xs">{r.time}</p>
                  </div>
                </div>
                {/* Stars */}
                <div className="text-amber-400 text-sm tracking-wider">{'★'.repeat(r.stars)}</div>
                {/* Text */}
                <p className="text-zinc-300 text-sm leading-relaxed flex-1">{r.text}</p>
                {/* Badge */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-zinc-800">
                  <span className="font-black text-xs" style={{background:'linear-gradient(135deg,#4285f4,#34a853,#fbbc05,#ea4335)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>G</span>
                  <span className="text-zinc-600 text-xs">Posted on Google Maps</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile swipe hint — no buttons */}
        <p className="text-center text-zinc-600 text-xs mt-1 md:hidden tracking-widest">
          {isRTL ? '← اسحب للتصفح →' : '← swipe to browse →'}
        </p>
      </div>
    </section>
  );
}
