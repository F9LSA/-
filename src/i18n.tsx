import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'ar';

interface Translations {
  [key: string]: { en: string; ar: string };
}

const translations: Translations = {
  // Nav
  'nav.aghsan': { en: 'AGHSAN', ar: 'أغصان' },
  'nav.about': { en: 'About', ar: 'من نحن' },
  'nav.services': { en: 'Services', ar: 'خدماتنا' },
  'nav.projects': { en: 'Projects', ar: 'مشاريعنا' },
  'nav.language': { en: 'EN/AR', ar: 'ع/إ' },
  'nav.menu': { en: 'Menu', ar: 'القائمة' },
  'nav.close': { en: 'Close', ar: 'إغلاق' },

  // Hero
  'hero.welcome': { en: 'WELCOME TO AGHSAN', ar: 'مرحباً بكم في أغصان' },
  'hero.welcome.line1': { en: 'WELCOME TO', ar: 'مرحباً بكم في' },
  'hero.welcome.line2': { en: 'AGHSAN', ar: 'أغصان' },
  'hero.tagline': {
    en: 'Your partner in creating exceptional experiences..',
    ar: 'شريكك في صناعة تجارب استثنائية..',
  },

  // About
  'about.heading': { en: 'About AGHSAN', ar: 'عن أغصان' },
  'about.bio': {
    en: `We are a company specializing in organizing exhibitions, conferences, and major events, as well as designing and executing private and public celebrations that align with the aspirations of corporations, government entities, and individuals seeking excellence..
Your Experience
At AGHSAN, we are dedicated to transforming your thoughts into realty crafted experience. we are here to help you build your ideas.
DIVINIA is your trusted, all-in-one aesthetic clinic.`,
    ar: `نحن شركة متخصصة في المعارض والمؤتمرات والفعاليات الكبرى، بالإضافة إلى تصميم التخصصات الخاصة والعامة التي تحدد تطلعات الشركات والجهات الحكومية والأفراد الساعين إلى التميز..
تجربتك
في أغصان، نحن ملتزمون بتحويل أفكارك إلى تجارب مصممة بعناية. نحن هنا لمساعدتك في بناء أفكارك.
ديفينيا هي عيادتك التجميلية الموثوقة المتكاملة.`,
  },
  'about.whoWeAre.title': { en: 'Who we are', ar: 'من نحن' },
  'about.whoWeAre.desc': {
    en: 'AGHSAN is a dynamic company dedicated to creating unforgettable experiences. We specialize in organizing exhibitions, conferences, and major events, as well as designing and executing private and public celebrations for corporations, government entities, and individuals who strive for excellence.',
    ar: 'أغصان شركة ديناميكية مكرسة لصناعة تجارب لا تُنسى. نحن متخصصون في تنظيم المعارض والمؤتمرات والفعاليات الكبرى، بالإضافة إلى تصميم وتنفيذ الاحتفالات الخاصة والعامة للشركات والجهات الحكومية والأفراد الذين يسعون إلى التميز.',
  },
  'about.ourMessage.title': { en: 'Our message', ar: 'رسالتنا' },
  'about.ourMessage.desc': {
    en: 'We believe every idea deserves to become a reality. Our message is simple: to transform your thoughts into meticulously crafted experiences. We listen, we innovate, and we deliver events that exceed expectations and leave lasting impressions.',
    ar: 'نؤمن بأن كل فكرة تستحق أن تتحول إلى واقع. رسالتنا بسيطة: تحويل أفكارك إلى تجارب مصممة بدقة. نستمع، نبتكر، ونقدم فعاليات تتجاوز التوقعات وتترك انطباعات دائمة.',
  },
  'about.ourGoal.title': { en: 'Our Goal', ar: 'هدفنا' },
  'about.ourGoal.desc': {
    en: 'Our goal is to be the region’s most trusted partner in event organization and celebration design. We aim to elevate every occasion with precision, creativity, and passion — ensuring that each project we touch reflects the vision and aspirations of those we serve.',
    ar: 'هدفنا أن نكون الشريك الأكثر موثوقية في المنطقة في تنظيم الفعاليات وتصميم الاحتفالات. نطمح إلى الارتقاء بكل مناسبة بدقة وإبداع وشغف — لضمان أن يعكس كل مشروع نعمل عليه رؤية وتطلعات من نخدمهم.',
  },
  'about.whyChoose.heading': { en: 'Why Choose AGHSAN', ar: 'لماذا تختار أغصان' },
  'about.whyChoose.1.title': { en: 'Proven Expertise', ar: 'خبرة مثبتة' },
  'about.whyChoose.1.desc': {
    en: 'With years of hands-on experience across exhibitions, conferences, and celebrations, AGHSAN brings deep industry knowledge and flawless execution to every event we undertake.',
    ar: 'مع سنوات من الخبرة العملية في المعارض والمؤتمرات والاحتفالات، تقدم أغصان معرفة صناعية عميقة وتنفيذاً متقناً لكل فعالية نتولاها.',
  },
  'about.whyChoose.2.title': { en: 'Tailored Creativity', ar: 'إبداع مخصص' },
  'about.whyChoose.2.desc': {
    en: 'We design every experience around your unique vision. From concept to detail, each element is crafted to reflect your identity and leave a lasting impression on your guests.',
    ar: 'نصمم كل تجربة حول رؤيتك الفريدة. من المفهوم إلى التفاصيل، يُصمم كل عنصر ليعكس هويتك ويترك انطباعاً دائماً لدى ضيوفك.',
  },
  'about.whyChoose.3.title': { en: 'End-to-End Commitment', ar: 'التزام شامل' },
  'about.whyChoose.3.desc': {
    en: 'We manage everything from initial planning to final execution — coordination, production, and media coverage — so you can enjoy the moment while we handle the rest.',
    ar: 'ندير كل شيء من التخطيط الأولي إلى التنفيذ النهائي — التنسيق والإنتاج والتغطية الإعلامية — لتستمتع باللحظة بينما نتولى نحن الباقي.',
  },

  // Services
  'services.heading': { en: 'Services', ar: 'خدماتنا' },
  'services.1.name': { en: 'Organize', ar: 'تنظيم' },
  'services.1.desc': {
    en: 'Organizing events, exhibitions, and conferences with a high level of professionalism, from detailed planning and coordination to seamless execution and overall event management.',
    ar: 'تنظيم الفعاليات والمعارض والمؤتمرات بمستوى عالٍ من الاحترافية، من التخطيط التفصيلي والتنسيق إلى التنفيذ السلس والإدارة الشاملة للفعالية.',
  },
  'services.2.name': { en: 'Coordination', ar: 'تنسيق' },
  'services.2.desc': {
    en: 'Coordinating celebrations and public and private events, with comprehensive planning, organization, and execution to ensure smooth operations and memorable experiences..',
    ar: 'تنسيق الاحتفالات والفعاليات العامة والخاصة، مع تخطيط وتنظيم وتنفيذ شامل لضمان سير سلس وتجارب لا تُنسى..',
  },
  'services.3.name': { en: 'Design', ar: 'تصميم' },
  'services.3.desc': {
    en: 'Design and fit-out of décor, interactive experiences, and engaging event environments, tailored to create a distinctive and memorable atmosphere.',
    ar: 'تصميم وتجهيز الديكورات والتجارب التفاعلية وبيئات الفعاليات الجذابة، مصممة خصيصاً لخلق أجواء مميزة لا تُنسى.',
  },
  'services.4.name': { en: 'Production', ar: 'إنتاج' },
  'services.4.desc': {
    en: 'Field Production, comprehensive sound, lighting, and technical equipment for professional event production..',
    ar: 'الإنتاج الميداني، وصوت وإضاءة ومعدات تقنية شاملة لإنتاج فعاليات احترافية..',
  },
  'services.5.name': { en: 'Administration', ar: 'إدارة' },
  'services.5.desc': {
    en: 'Management of Events and Media Coverage, including planning, coordination, execution, and professional event documentation..',
    ar: 'إدارة الفعاليات والتغطية الإعلامية، بما في ذلك التخطيط والتنسيق والتنفيذ والتوثيق الاحترافي للفعاليات..',
  },

  // Projects
  'projects.heading': { en: 'PROJECTS', ar: 'مشاريعنا' },
  'projects.live': { en: 'View Project', ar: 'عرض المشروع' },
  'projects.close': { en: 'Close Project', ar: 'إغلاق المشروع' },
  'projects.viewAll': { en: 'View All Projects', ar: 'عرض جميع المشاريع' },
  'projects.desc.1': {
    en: 'A custom-designed souvenir kiosk for the Riyadh Boulevard, blending modern aesthetics with traditional Saudi spirit to create an inviting retail experience.',
    ar: 'كشك هدايا تذكارية مصمم خصيصاً لبوليفارد الرياض، يمزج بين الجماليات الحديثة والروح السعودية التقليدية لخلق تجربة بيع بالتجزئة جذابة.',
  },
  'projects.desc.2': {
    en: 'A comprehensive event setup for Wakan Real Estate Development, featuring elegant staging, branding, and interactive displays at a Riyadh City event.',
    ar: 'تجهيز شامل لفعالية شركة وكن للتطوير العقاري، يتضمن مسرحاً أنيقاً وهوية بصرية وعروضاً تفاعلية في فعالية بمدينة الرياض.',
  },
  'projects.desc.3': {
    en: 'A professional exhibition booth for XPL Company at the Supply Chain Conference, designed to showcase their solutions with modern, clean branding.',
    ar: 'جناح معرض احترافي لشركة XPL في مؤتمر سلسلة الإمداد، مصمم لعرض حلولهم بهوية عصرية ونظيفة.',
  },
  'projects.desc.4': {
    en: 'A factory booth for Wash Thru at the Made in Saudi Exhibition, highlighting their products with an industrial yet welcoming design.',
    ar: 'جناح مصنع لشركة Wash Thru في معرض صنع في السعودية، يبرز منتجاتهم بتصميم صناعي وترحيبي في آن واحد.',
  },
  'projects.desc.5': {
    en: 'A campaign booth for the "Wiqaa" initiative during Hajj season, designed to provide peace of mind with clear, reassuring messaging and a welcoming space.',
    ar: 'جناح حملة "وقاء" خلال موسم الحج، مصمم لتوفير راحة البال برسائل واضحة ومطمئنة ومساحة ترحيبية.',
  },
  'projects.desc.6': {
    en: 'A creative booth for "Dream BOOK" at the Riyadh International Book Fair, inviting visitors into a world of imagination and literature.',
    ar: 'جناح إبداعي لـ "Dream BOOK" في معرض الرياض الدولي للكتاب، يدعو الزوار إلى عالم من الخيال والأدب.',
  },
  'projects.desc.7': {
    en: 'Our participation in the Cityscape exhibition in Riyadh, featuring a modern booth design that reflects innovation in urban development.',
    ar: 'مشاركتنا في معرض سيتي سكيب بالرياض، بتصميم جناح عصري يعكس الابتكار في التطوير العمراني.',
  },
  'projects.desc.8': {
    en: 'A charming sweets corner kiosk, designed to delight customers with a warm, inviting atmosphere and beautiful product displays.',
    ar: 'كشك زاوية حلويات ساحر، مصمم لإسعاد العملاء بأجواء دافئة وترحيبية وعروض منتجات جميلة.',
  },
  'projects.desc.9': {
    en: 'Handcrafted wooden decorations for the historic district of Jeddah, blending traditional craftsmanship with modern design sensibilities.',
    ar: 'ديكورات خشبية مصنوعة يدوياً لمنطقة جدة التاريخية، تمزج بين الحرفية التقليدية وحساسية التصميم الحديث.',
  },
  'projects.desc.10': {
    en: 'Innovative 3D designs created for our clients, bringing their visions to life with detailed, realistic visualizations.',
    ar: 'تصاميم ثلاثية الأبعاد مبتكرة أُنشئت لعملائنا، تجعل رؤاهم تنبض بالحياة من خلال تصورات تفصيلية واقعية.',
  },

  // Project names
  'projects.name.1': { en: 'Saudi Spirit, Souvenir Kiosk', ar: 'كشك روح السعودية للذكرى' },
  'projects.name.2': { en: 'Wakan Real Estate Development Event', ar: 'فعالية وكن للتطوير العقاري' },
  'projects.name.3': { en: 'XPL Company', ar: 'بوث شركة XPL soloutions' },
  'projects.name.4': { en: 'Wash Thru Factory Booth', ar: 'جناح مصنع واش ثرو' },
  'projects.name.5': { en: '"Wiqaa" Campaign Booth: For Peace of Mind', ar: 'جناح حملة "وقاء": لراحة البال' },
  'projects.name.6': { en: '"Dream BOOK" Booth', ar: 'جناح "دريم بوك"' },
  'projects.name.7': { en: 'Participation in the Cityscape exhibition', ar: 'المشاركة في معرض سيتي سكيب' },
  'projects.name.8': { en: 'Sweets Corner Kiosk', ar: 'كشك زاوية الحلويات' },
  'projects.name.9': { en: 'Wooden decorations in Historic Jeddah', ar: 'ديكورات خشبية في جدة التاريخية' },
  'projects.name.10': { en: '3D designs for our clients', ar: 'تصاميم ثلاثية الأبعاد لعملائنا' },

  // Project categories
  'projects.category.Riyadh Bolyvard': { en: 'Riyadh Boulevard', ar: 'بوليفارد الرياض' },
  'projects.category.Riyadh City': { en: 'Riyadh City', ar: 'مدينة الرياض' },
  'projects.category.Supply Chain Conference': { en: 'Supply Chain Conference', ar: 'مؤتمر سلسلة الإمداد' },
  'projects.category.Made in Saudi Exhibition': { en: 'Made in Saudi Exhibition', ar: 'معرض صنع في السعودية' },
  'projects.category.Hajj Season': { en: 'Hajj Season', ar: 'موسم الحج' },
  'projects.category.Riyadh International Book Fair': { en: 'Riyadh International Book Fair', ar: 'معرض الرياض الدولي للكتاب' },
  'projects.category.Kiosk': { en: 'Kiosk', ar: 'كشك' },
  'projects.category.Decorations': { en: 'Decorations', ar: 'ديكورات' },
  'projects.category.3D Designs': { en: '3D Designs', ar: 'تصاميم ثلاثية الأبعاد' },
  'projects.category.1': { en: 'Consultant Cosmetic Dermatology', ar: 'استشارية أمراض جلدية تجميلية' },
  'projects.category.2': { en: 'Dermatology Consultant', ar: 'استشارية أمراض جلدية' },
  'projects.category.3': {
    en: 'Consultant Dermatologist and Laser & Aesthetic Medicine',
    ar: 'استشاري أمراض جلدية وطب الليزر والتجميل',
  },
  'projects.category.4': { en: 'Dermatology Consultant', ar: 'استشاري أمراض جلدية' },
  'projects.category.5': {
    en: 'Dermatology Consultant, Dermatologic and Cosmetic Surgeon, and Laser Specialist',
    ar: 'استشاري أمراض جلدية وجراح جلدية وتجميل وأخصائي ليزر',
  },

  // Contact
  'contact.heading': { en: 'CONTACT', ar: 'تواصل معنا' },
  'contact.whatsapp': { en: 'WhatsApp', ar: 'واتساب' },
  'contact.location': { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' },
  'contact.maps': { en: 'View on Google Maps', ar: 'عرض على خرائط جوجل' },
  'contact.workingHours': { en: 'Working Hours', ar: 'ساعات العمل' },
  'contact.satThu': { en: 'Saturday - Thursday', ar: 'السبت - الخميس' },
  'contact.service247': { en: '24/7 Service', ar: 'خدمة 24/7' },
  'contact.noFriday': { en: 'No Appointments on Friday', ar: 'لا مواعيد يوم الجمعة' },
  'contact.contact': { en: 'Contact', ar: 'اتصل بنا' },

  // Footer
  'footer.copyright': { en: '© 2026 ALL right reserved to AGHSAN', ar: '© 2026 جميع الحقوق محفوظة لأغصان' },
  'footer.whatsapp': { en: 'WhatsApp', ar: 'واتساب' },
  'footer.workingHours': { en: 'Working Hours', ar: 'ساعات العمل' },
  'footer.satThu': { en: 'Saturday - Thursday', ar: 'السبت - الخميس' },
  'footer.hours': { en: '06:00 AM - 9:00 PM', ar: '06:00 صباحاً - 9:00 مساءً' },
  'footer.noFriday': { en: 'No Appointments on Friday', ar: 'لا مواعيد يوم الجمعة' },
  'footer.contact': { en: 'Contact', ar: 'اتصل بنا' },

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
    return (window.localStorage.getItem('أغصان-language') as Language) || 'en';
  });

  const isArabic = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    window.localStorage.setItem('أغصان-language', language);
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