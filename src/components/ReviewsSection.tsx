import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  { name:"Servonne Travels",    time:"5 months ago",  stars:5, text:"The best barber shop in Riyadh! I had one of the best haircuts ever here. The barbers are skilled, professional, and truly care about their craft." },
  { name:"Rashid Al-Maimany",   time:"5 years ago",   stars:5, text:"Great barber quality. They're quite slow, so you'll have to wait about 30 min. But worth it." },
  { name:"D A",                 time:"5 years ago",   stars:5, text:"Found this hidden gem through Google. My hair/beard cut by Mahmoud Fozi was meticulous. I was thrilled with the results." },
  { name:"Ziyad Hamdah",        time:"3 years ago",   stars:5, text:"Since I came to Riyadh, I still cut my hair with them. All great, especially barber Bader. Perfect experience." },
  { name:"KA VALDOZ Banang",    time:"3 years ago",   stars:5, text:"Mohammed is so kind. I gave 5 stars to this barber shop and after 2 weeks I went back again for my haircut." },
  { name:"Raza Mohammed",       time:"3 years ago",   stars:5, text:"Best barber artists in town. Badr is a magician. 5 stars right away!!!" },
  { name:"Malik Hamdan",        time:"2 years ago",   stars:5, text:"Mohammad Alsharif — gentle hand in taking care of my beard and a great barber!" },
  { name:"Ahmed Arafa",         time:"3 years ago",   stars:5, text:"One of the best and cleanest in the Kingdom. If you go, ask for Mohammed — he is an artist." },
  { name:"Alif Mohammed Zubayed",time:"4 years ago",  stars:5, text:"Absolutely wonderful place for haircut & other grooming options. Highly recommended 👌" },
  { name:"Z A",                 time:"4 years ago",   stars:5, text:"Quiet and comfortable salon with a barber who listens and understands what haircut his customer needs." },
  { name:"Muhammad Eyad Alraie",time:"5 years ago",   stars:5, text:"Best barbershop in the area, especially Bader — he is professional. Highly recommended." },
  { name:"Anas Razzaz",         time:"5 years ago",   stars:5, text:"Perfect experience, clean, neat, tidy. Nice, welcoming and friendly staff." },
  { name:"Omar al-ajroush",     time:"5 years ago",   stars:5, text:"Good place, good haircuts, good service and reasonable price!" },
  { name:"Ahmed Musaad",        time:"3 years ago",   stars:5, text:"Perfect experience with barber Bader 👌" },
  { name:"eliebechara",         time:"a year ago",    stars:5, text:"Good value for the money." },
  { name:"Robert Adante",       time:"5 years ago",   stars:5, text:"Good ambiance, clean and friendly staff." },
  { name:"Kandeevo S",          time:"6 years ago",   stars:5, text:"Mahmoud is the best barber 💙" },
  { name:"Ismail Ismail",       time:"a year ago",    stars:5, text:"Good 👍 Super 100% service." },
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
