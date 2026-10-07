import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'ar';

interface Translations {
  [key: string]: { en: string; ar: string };
}

const translations: Translations = {
  // Nav
  'nav.NOVA': { en: 'Sephr', ar: 'صفر' },
  'nav.about': { en: 'About', ar: 'من أنا' },
  'nav.services': { en: 'Services', ar: 'خدماتي' },
  'nav.projects': { en: 'Projects', ar: 'مشاريعي' },
  'nav.language': { en: 'EN/AR', ar: 'ع/إ' },
  'nav.menu': { en: 'Menu', ar: 'القائمة' },
  'nav.close': { en: 'Close', ar: 'إغلاق' },

  // Hero
  'hero.welcome': { en: " WELCOME TO Sephr.CX ", ar: 'أنا صفر' },
  'hero.welcome.line1': { en: "WELCOME", ar: 'أنا' },
  'hero.welcome.line2': { en: 'TO Sephr.CX ', ar: 'صفر' },
  'hero.tagline': {
    en: 'Your partner in creating unique videos ..',
    ar: 'شريكك في صناعة فيديوهات استثنائية..',
  },

  // About
  'about.heading': { en: 'About Me', ar: 'نبذة عني' },
  'about.bio': {
    en: `I’m a freelance editor for long and short videos.
I help ambitious Content Creators turn their videos into experience that viewers enjoy , transform drafts into polished,  ready content.`,
    ar: ` ايديتور مستقل (سواء الطويلة أو القصيرة)، وأساعد صنّاع المحتوى الطموحين على تحويل مقاطعهم إلى تجارب ممتعة للمشاهدين، وتحويل المحتوى الخام إلى محتوى وجاهز للعرض.
`,},
  'about.whoWeAre.title': { en: 'Who am i', ar: 'من أنا' },
  'about.whoWeAre.desc': {
    en: 'I’m Faisal, a professional editor focused on making your Videos sharp, clear, and enjoyful.',
    ar: 'أنا فيصل، إديتور محترف أحرص اخلي فيديوهاتك واضحة وممتعة للمشاهدة..',
  },
  'about.ourMessage.title': { en: 'My message', ar: 'رسالتي' },
  'about.ourMessage.desc': {
    en: 'I am your second set of eyes, your sounding board, and your final polish. I work closely with you to make sure your message is crystal clear before it hits the world.',
    ar: 'أنا بمثابة عينٍ ثانيةٍ لك، ومستشارٍ ومحاورٍ لأفكارك، واللمسة الأخيرة التي تضفي على عملك كماله؛ إذ أعمل معك عن كثب لضمان أن تكون رسالتك في غاية الوضوح قبل أن تصل إلى العالم.',
  },
  'about.ourGoal.title': { en: 'My Goal', ar: 'هدفي' },
  'about.ourGoal.desc': {
    en: " You are a content creator and your time is valuable, and i'm willing to save you time and effort and energy to keep making videos.",
    ar: ' أنت صانع محتوى ووقتك ثمين، وأنا مستعد أحفظ وقتك وجهدك وطاقتك لتواصل  صناعة المحتوى بجودة عالية.',
  },
  'about.whyChoose.heading': { en: 'Why Choose Me', ar: 'ليه تختارني' },
  'about.whyChoose.1.title': { en: 'Passionate', ar: 'الشغف' },
  'about.whyChoose.1.desc': {
    en: 'I am passionate about creating Videos that can be watched with enjoyment.',
    ar: 'أنا متحمس أسوي مقاطع فيديو تقدر تتابعها وإنت مستمتع.',
  },
  'about.whyChoose.2.title': { en: 'convenience', ar: 'إبداع ' },
  'about.whyChoose.2.desc': {
    en: 'I design the vision you look for.each detail is made to reflect your identity and leave a lasting impression on your Viewers.',
    ar: 'أصمملك الرؤية التي تبحث عنها. كل تفصيل مُصمم ليعكس هويتك ويترك انطباعاً دائماً لدى مشاهديك.',
  },
  'about.whyChoose.3.title': { en: 'Commitment', ar: 'التزام ' },
  'about.whyChoose.3.desc': {
    en: 'I manage the video from initial planning to final execution, so you can enjoy the moment while I handle the rest.',
    ar: 'أدير الفيديو من التخطيط الأولي إلى التنفيذ النهائي، بحيث يمكنك الاستمتاع باللحظة بينما أتعامل مع الباقي.',
  },

  // Services
  'services.heading': { en: 'Services', ar: 'خدماتي' },
  'services.1.name': { en: 'Short form videos', ar: 'المقاطع القصيرة' },
  'services.1.desc': {
    en: 'Creating Short form videos between 1m to 3m with daily deliver rate.',
    ar: 'تصميم مقاطع فيديو بسيطة تجذب جمهورك مع تسليم يومي.',
  },
  'services.2.name': { en: 'Medium form Videos', ar: 'المقاطع المتوسطة' },
  'services.2.desc': {
    en: " Creating medium form videos between 8m to 15m videos and engage your audience with high production value, .",
    ar: 'تصميم مقاطع فيديو متوسطة الطول ما بين 8 - 15 دقيقة تجذب جمهورك بقيمة إنتاج عالية..',
  },
  'services.3.name': { en: 'Long form videos', ar: 'المقاطع الطويلة' },
  'services.3.desc': {
    en: 'Creating Long form videos between 20m to 1h videos with engaging simple edit to match your style, .',
    ar: 'تصميم مقاطع فيديو طويلة ما بين 20 دقيقة إلى ساعة مع تعديل بسيط وجذاب ليتناسب مع أسلوبك..',
  },
  'services.4.name': { en: 'Complex Editing', ar: 'المقاطع المعقدة' },
  'services.4.desc': {
    en: 'its designed to match certain requirements and a lot of highly produced content.',
    ar: 'نصمم لك ليتوافق مع متطلبات معينة والكثير من المحتوى عالي الإنتاجية.',
  },
  'services.5.name': { en: 'Levels', ar: 'درجات' },
  'services.5.desc': {
    en: 'You can request a form of service based on how much editing in the video to match your needs.',
    ar: 'يمكنك طلب شكل من الخدمات بناء على كمية الإديت المطلوبة في الفيديو ليطابق احتياجاتك.',
  },

  // Projects
  'projects.heading': { en: 'PROJECTS', ar: 'مشاريعي' },
  'projects.live': { en: 'View Project', ar: 'عرض المشروع' },
  'projects.close': { en: 'Close Project', ar: 'إغلاق المشروع' },
  'projects.viewAll': { en: 'View All Projects', ar: 'عرض جميع المشاريع' },

  'projects.desc.1': {
    en: 'Short form video',
    ar: ' تصميم المقاطع القصيرة.',
  },
  'projects.desc.2': {
    en: 'Edit form video',
    ar: 'مقاطع الإيديت.',
  },
  'projects.desc.3': {
    en: 'Medium form video',
    ar: 'المقاطع متوسطة المدة.',
  },

  // Project names
  'projects.name.1': { en: 'Short form video', ar: 'تصميم المقاطع القصيرة' },
  'projects.name.2': { en: 'Edit form video', ar: 'مقاطع الإيديت' },
  'projects.name.3': { en: 'Medium form video', ar: 'المقاطع متوسطة المدة' },

  // Project categories
  'projects.category.Short form video': { en: 'Riyadh Boulevard', ar: 'بوليفارد الرياض' },
  'projects.category.Edit form video': { en: 'Riyadh City', ar: 'مدينة الرياض' },
  'projects.category.Medium form video': { en: 'Supply Chain Conference', ar: 'مؤتمر سلسلة الإمداد'
  },

  // Contact
  'contact.heading': { en: 'CONTACT ME', ar: 'تواصل معي' },
  'contact.whatsapp': { en: 'WhatsApp', ar: 'واتساب' },
  'contact.workingHours': { en: 'Working Hours', ar: 'ساعات العمل' },
  'contact.satThu': { en: 'Saturday - Thursday', ar: 'السبت - الخميس' },
  'contact.service247': { en: '24/7 Service', ar: 'خدمة 24/7' },
  'contact.noFriday': { en: 'No Appointments on Friday', ar: 'لا مواعيد يوم الجمعة' },
  'contact.contact': { en: 'Contact', ar: 'اتصل بي' },

  // Footer
  'footer.copyright': { en: '© 2026 ALL right reserved to Sephr', ar: '© 2026 جميع الحقوق محفوظة لـصفر' },
  'footer.whatsapp': { en: 'WhatsApp', ar: 'واتساب' },
  'footer.workingHours': { en: 'Working Hours', ar: 'ساعات العمل' },
  'footer.satThu': { en: 'Saturday - Thursday', ar: 'السبت - الخميس' },
  'footer.hours': { en: '05:00 AM - 12:00 PM', ar: '05:00 صباحاً - 12:00 مساءً' },
  'footer.noFriday': { en: 'No Appointments on Friday', ar: 'لا مواعيد يوم الجمعة' },
  'footer.contact': { en: 'Contact', ar: 'اتصل بي' },

  // Booking Modal
  'booking.phone.title': { en: 'Enter your phone number', ar: 'أدخل رقم هاتفك' },
  'booking.phone.subtitle': {
    en: "We'll send a verification code to confirm your booking.",
    ar: 'سوف نرسل رمز التحقق لتأكيد حجزك.',
  },
  'booking.phone.mobile': { en: 'Mobile Number', ar: 'رقم الجوال' },
  'booking.phone.mustStart': {
    en: 'Must start with',
    ar: 'يجب أن يبدأ بـ',
  },
  'booking.phone.andBe': { en: 'and be 9 digits total.', ar: 'ويكون 9 أرقام إجمالاً.' },
  'booking.phone.start5': { en: 'Number must start with 5.', ar: 'يجب أن يبدأ الرقم بـ 5.' },
  'booking.phone.sendOtp': { en: 'Send OTP', ar: 'إرسال الرمز' },
  'booking.phone.sending': { en: 'Sending...', ar: 'جارٍ الإرسال...' },
  'booking.otp.title': { en: 'Verify your number', ar: 'تحقق من رقمك' },
  'booking.otp.subtitle': { en: 'OTP message sent to', ar: 'تم إرسال رسالة الرمز إلى' },
  'booking.otp.code': { en: 'Enter OTP Code', ar: 'أدخل رمز التحقق' },
  'booking.otp.incorrect': { en: 'Incorrect code. Please try again.', ar: 'رمز غير صحيح. حاول مرة أخرى.' },
  'booking.otp.demo': { en: 'Demo: your code is', ar: 'تجريبي: رمزك هو' },
  'booking.otp.change': { en: 'Change', ar: 'تغيير' },
  'booking.otp.verify': { en: 'Verify', ar: 'تحقق' },
  'booking.otp.verifying': { en: 'Verifying...', ar: 'جارٍ التحقق...' },
  'booking.schedule.title': { en: 'Choose your appointment', ar: 'اختر موعدك' },
  'booking.schedule.subtitle': {
    en: 'Select a day and time that works for you.',
    ar: 'اختر يوماً ووقتاً يناسبك.',
  },
  'booking.schedule.day': { en: 'Day', ar: 'اليوم' },
  'booking.schedule.time': { en: 'Time', ar: 'الوقت' },
  'booking.schedule.today': { en: 'Today', ar: 'اليوم' },
  'booking.schedule.tomorrow': { en: 'Tomorrow', ar: 'غداً' },
  'booking.schedule.back': { en: 'Back', ar: 'رجوع' },
  'booking.schedule.confirm': { en: 'Confirm Booking', ar: 'تأكيد الحجز' },
  'booking.schedule.confirming': { en: 'Confirming...', ar: 'جارٍ التأكيد...' },
  'booking.confirmed.title': { en: 'Booking Confirmed!', ar: 'تم تأكيد الحجز!' },
  'booking.confirmed.subtitle': {
    en: 'Your appointment has been booked successfully.',
    ar: 'تم حجز موعدك بنجاح.',
  },
  'booking.confirmed.done': { en: 'Done', ar: 'تم' },
  'booking.close': { en: 'Close', ar: 'إغلاق' },
  'booking.stage.phone': { en: 'Phone', ar: 'الهاتف' },
  'booking.stage.otp': { en: 'OTP', ar: 'الرمز' },
  'booking.stage.schedule': { en: 'Schedule', ar: 'الجدولة' },
};

interface LanguageContextValue {
  language: Language;
  isArabic: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  isArabic: false,
  toggleLanguage: () => {},
  t: (key) => translations[key]?.en || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    return (window.localStorage.getItem('sephr-language') as Language) || 'en';
  });

  const isArabic = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    window.localStorage.setItem('sephr-language', language);
  }, [language, isArabic]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string) => translations[key]?.[language] || translations[key]?.en || key;

  return (
    <LanguageContext.Provider value={{ language, isArabic, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}