import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome to CUT AND FUN Kids Barber",
"Tagline": "Safe, Fun & Professional Kids Haircuts in Riyadh",
      "BookNow": "Book Appointment",
      "Services": "Our Services",
      "FAQ": "FAQ",
      "Reviews": "Google Reviews",
      "Photos": "Gallery",
      "Contact": "Contact Us",
      "Chat": "Chat with our Booking Assistant",
      "Haircut": "Classic Haircut",
      "Beard": "Beard Trim & Style",
      "Facial": "Facial Treatment",
      "Address": "Sahara Mall, King Fahd Rd, Riyadh 12271, Saudi Arabia",
      "Hours": "Hours",
      "Opening_Hours": "Opening Hours",
      "Saturday": "Saturday",
      "Sunday": "Sunday",
      "Monday": "Monday",
      "Tuesday": "Tuesday",
      "Wednesday": "Wednesday",
      "Thursday": "Thursday",
      "Friday": "Friday",
      "FaqQ1": "Do I need to book in advance?",
      "FaqA1": "While we accept walk-ins, we highly recommend booking in advance, especially on weekends.",
      "FaqQ2": "What are your working hours?",
      "FaqA2": "We are open daily from 11:00 AM.",
      "FaqQ3": "Do you offer facial treatments?",
      "FaqA3": "Yes, we offer a range of facial and grooming packages for men.",
      "ChatWelcome": "Hello! Welcome to CUT AND FUN Kids Barber. How can I help you book an appointment for your child today?"
    }
  },
  ar: {
    translation: {
      "Welcome": "مرحباً بكم في CUT AND FUN",
"Tagline": "حلاقة أطفال آمنة وممتعة واحترافية في الرياض",
      "BookNow": "احجز موعدك",
      "Services": "خدماتنا",
      "FAQ": "الأسئلة الشائعة",
      "Reviews": "تقييمات جوجل",
      "Photos": "المعرض",
      "Contact": "اتصل بنا",
      "Chat": "تحدث مع مساعد الحجز الخاص بنا",
      "Haircut": "حلاقة كلاسيكية",
      "Beard": "تحديد وتخفيف اللحية",
      "Facial": "تنظيف البشرة",
      "Address": "صحارى مول، طريق الملك فهد، الرياض 12271، المملكة العربية السعودية",
      "Hours": "ساعات العمل",
      "Opening_Hours": "أوقات العمل",
      "Saturday": "السبت",
      "Sunday": "الأحد",
      "Monday": "الإثنين",
      "Tuesday": "الثلاثاء",
      "Wednesday": "الأربعاء",
      "Thursday": "الخميس",
      "Friday": "الجمعة",
      "FaqQ1": "هل أحتاج إلى حجز مسبق؟",
      "FaqA1": "على الرغم من أننا نقبل الزيارات بدون موعد، إلا أننا نوصي بشدة بالحجز مسبقًا، خاصة في عطلات نهاية الأسبوع.",
      "FaqQ2": "ما هي ساعات العمل؟",
      "FaqA2": "نحن مفتوحون يومياً ابتداءً من الساعة 11 صباحاً.",
      "FaqQ3": "هل تقدمون خدمات العناية بالبشرة؟",
      "FaqA3": "نعم، نقدم مجموعة متنوعة من باقات العناية بالبشرة للرجال.",
      "ChatWelcome": "مرحباً بك! أنا المساعد الذكي لحلاق فور يو (توب ليفل). كيف يمكنني مساعدتك في حجز موعدك اليوم؟"
    }
  }
};

let defaultLng = 'ar';
if (typeof navigator !== 'undefined') {
  const sysLang = navigator.language.toLowerCase();
  defaultLng = sysLang.startsWith('en') ? 'en' : 'ar';
  defaultLng = 'ar';
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLng, 
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
