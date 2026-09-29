import React from 'react';
import { ArrowRight, Compass, MapPin, Car, Footprints, Sparkles, CalendarDays, Hotel, HelpCircle } from 'lucide-react';
import { useLanguage } from '../translations';

export type RelatedTargetKey = 'parikrama' | 'route' | 'places' | 'byCar' | 'trips' | 'travelGuide' | 'faq';

interface RelatedCardData {
  href: string;
  icon: React.ReactNode;
  title: Record<string, string>;
  desc: Record<string, string>;
  badge: Record<string, string>;
}

const RELATED_DATA: Record<RelatedTargetKey, RelatedCardData> = {
  parikrama: {
    href: '/narmada-parikrama/',
    icon: <Sparkles size={24} className="related-icon" />,
    badge: {
      en: 'Spiritual Guide',
      hi: 'आध्यात्मिक साधना',
      mr: 'आध्यात्मिक साधना',
      gu: 'આધ્યાત્મિક સાધના',
    },
    title: {
      en: 'Why Undertake Narmada Parikrama?',
      hi: 'नर्मदा परिक्रमा क्यों करनी चाहिए?',
      mr: 'नर्मदा परिक्रमा का करावी?',
      gu: 'નર્મદા પરિક્રમા કેમ કરવી જોઈએ?',
    },
    desc: {
      en: 'Explore the 10 spiritual objectives, scriptural significance from Skanda Purana, and devotion to Maa Narmada.',
      hi: '10 आध्यात्मिक उद्देश्य, स्कंद पुराण में वर्णित माहात्म्य एवं माँ नर्मदा के प्रति अटूट भक्ति व तपस्या समझें।',
      mr: '१० आध्यात्मिक उद्दिष्टे, स्कंद पुराणातील माहात्म्य आणि नर्मदा मातेप्रती समर्पण भाव समजून घ्या.',
      gu: '૧૦ આધ્યાત્મિક ઉદ્દેશ્યો, સ્કંદ પુરાણનું મહાત્મ્ય અને માઁ નર્મદા પ્રત્યે ભક્તિ-તપસ્યા સમજો.',
    },
  },
  route: {
    href: '/narmada-parikrama/route/',
    icon: <Compass size={24} className="related-icon" />,
    badge: {
      en: 'Pilgrimage Route',
      hi: 'यात्रा मार्ग',
      mr: 'यात्रा मार्ग',
      gu: 'યાત્રા માર્ગ',
    },
    title: {
      en: 'Narmada Parikrama Route & 17 Key Stops',
      hi: 'नर्मदा परिक्रमा मार्ग एवं 17 मुख्य पड़ाव',
      mr: 'नर्मदा परिक्रमा मार्ग आणि १७ प्रमुख टप्पे',
      gu: 'નર્મદા પરિક્રમા માર્ગ અને ૧૭ મુખ્ય મુકામ',
    },
    desc: {
      en: 'Detailed timeline of the 17 key pilgrimage stops from Amarkantak across Madhya Pradesh, Maharashtra, and Gujarat.',
      hi: 'अमरकंटक से प्रारंभ होकर मध्य प्रदेश, महाराष्ट्र और गुजरात के 17 प्रमुख पड़ावों का संपूर्ण विवरण।',
      mr: 'अमरकंटक ते मध्य प्रदेश, महाराष्ट्र आणि गुजरातमधील १७ प्रमुख टप्प्यांची संपूर्ण माहिती.',
      gu: 'અમરકંટકથી શરૂ થઈ મધ્યપ્રદેશ, મહારાષ્ટ્ર અને ગુજરાતના ૧૭ મુખ્ય મુકામોની સંપૂર્ણ વિગત.',
    },
  },
  places: {
    href: '/narmada-parikrama/places/',
    icon: <MapPin size={24} className="related-icon" />,
    badge: {
      en: 'Sacred Tirthas',
      hi: 'पावन तीर्थ',
      mr: 'पावन तीर्थक्षेत्रे',
      gu: 'પવિત્ર તીર્થ',
    },
    title: {
      en: '20 Sacred Pilgrimage Places & Ghats',
      hi: '20 प्रमुख तीर्थ, पावन घाट एवं मंदिर',
      mr: '२० प्रमुख तीर्थक्षेत्रे, पावन घाट आणि मंदिरे',
      gu: '૨૦ પ્રમુખ તીર્થ, પવિત્ર ઘાટ અને મંદિરો',
    },
    desc: {
      en: 'Discover Omkareshwar Jyotirlinga, Amarkantak origin, Maheshwar Ahilya Ghat, and key shrines across MP, Maharashtra & Gujarat.',
      hi: 'ॐकारेश्वर ज्योतिर्लिंग, अमरकंटक उद्गम, महेश्वर अहिल्या घाट सहित तीनों राज्यों के 20 ऐतिहासिक तीर्थ स्थलों की जानकारी।',
      mr: 'ओंकारेश्वर ज्योतिर्लिंग, अमरकंटक, महेश्वर आणि तिन्ही राज्यांतील २० प्रमुख तीर्थक्षेत्रांची संपूर्ण माहिती.',
      gu: 'ઓમકારેશ્વર જ્યોતિર્લિંગ, અમરકંટક, મહેશ્વર અને ત્રણેય રાજ્યોના ૨૦ પ્રમુખ ઐતિહાસિક તીર્થ સ્થળોની યાદી.',
    },
  },
  byCar: {
    href: '/narmada-parikrama/by-car/',
    icon: <Car size={24} className="related-icon" />,
    badge: {
      en: 'Vehicle Yatra',
      hi: 'वाहन यात्रा',
      mr: 'वाहन यात्रा',
      gu: 'વાહન યાત્રા',
    },
    title: {
      en: '18-Day Vehicle Yatra By Car',
      hi: '18-दिवसीय वाहन यात्रा (कार से परिक्रमा)',
      mr: '१८-दिवसीय वाहन यात्रा (कारने परिक्रमा)',
      gu: '૧૮-દિવસીય વાહન યાત્રા (કાર દ્વારા પરિક્રમા)',
    },
    desc: {
      en: 'View Route 1 and Route 2 proposed 18-day driving circuits, walking vs car comparison, and practical road travel advice.',
      hi: 'सीमित समय वाले श्रद्धालुओं के लिए रूट 1 और रूट 2 का प्रस्तावित 18-दिवसीय कार्यक्रम एवं सड़क यात्रा परामर्श।',
      mr: 'मर्यादित वेळेत परिक्रमा करू इच्छिणाऱ्यांसाठी रूट १ आणि रूट २ चा नियोजित १८ दिवसांचा कार्यक्रम आणि मार्गदर्शक सूचना.',
      gu: 'મર્યાદિત સમયવાળા યાત્રાળુઓ માટે રૂટ ૧ અને રૂટ ૨ નો પ્રસ્તાવિત ૧૮ દિવસનો કાર્યક્રમ અને માર્ગદર્શન.',
    },
  },
  trips: {
    href: '/trips/',
    icon: <CalendarDays size={24} className="related-icon" />,
    badge: {
      en: 'Packages & Batches',
      hi: 'पैकेज एवं बुकिंग',
      mr: 'पॅकेज आणि बुकिंग',
      gu: 'પેકેજ અને બુકિંગ',
    },
    title: {
      en: '2026 Vehicle Yatra Batches (₹51,000)',
      hi: '2026 वाहन यात्रा पैकेज एवं बैच (₹51,000)',
      mr: '२०२६ वाहन यात्रा बॅचेस आणि पॅकेज (₹५१,०००)',
      gu: '૨૦૨૬ વાહન યાત્રા બેચ અને પેકેજ (₹૫૧,૦૦૦)',
    },
    desc: {
      en: 'Explore upcoming October and November 2026 departure batches, transparent pricing (₹51,000/person), and booking contact.',
      hi: 'अक्टूबर व नवंबर 2026 के निश्चित बैच, ₹51,000 प्रति व्यक्ति पैकेज, सुविधाएं और यात्रा योजना परामर्श।',
      mr: 'ऑक्टोबर आणि नोव्हेंबर २०२६ च्या निश्चित बॅचेस, ₹५१,००० प्रति व्यक्ती पॅकेज आणि नोंदणी माहिती.',
      gu: 'ઓક્ટોબર અને નવેમ્બર ૨૦૨૬ ની નિશ્ચિત બેચ, ₹૫૧,૦૦૦ પ્રતિ વ્યક્તિ પેકેજ અને બુકિંગ વિગતો.',
    },
  },
  travelGuide: {
    href: '/narmada-parikrama/travel-guide/',
    icon: <Hotel size={24} className="related-icon" />,
    badge: {
      en: 'Practical Guide',
      hi: 'व्यावहारिक गाइड',
      mr: 'व्यावहारिक मार्गदर्शिका',
      gu: 'વ્યવહારિક માર્ગદર્શિકા',
    },
    title: {
      en: 'Travel Guide: Stay, Food, Safety & Packing',
      hi: 'यात्रा गाइड: आवास, भोजन, सुरक्षा व तैयारी',
      mr: 'प्रवास मार्गदर्शिका: निवास, भोजन, सुरक्षा व साहित्य',
      gu: 'યાત્રા માર્ગદર્શિકા: આવાસ, ભોજન, સુરક્ષા અને પેકિંગ',
    },
    desc: {
      en: 'Comprehensive advice on ashrams, dharamshalas, annakshetras, Shoolpani preparation, packing lists, and safety rules.',
      hi: 'आश्रम, धर्मशाला, अन्नक्षेत्र, शूलपाणी की तैयारी, आवश्यक सामान की सूची और परिक्रमा सुरक्षा नियमों का संपूर्ण विवरण।',
      mr: 'आश्रम, धर्मशाळा, अन्नक्षेत्र, शूलपाणी तयारी, साहित्याची यादी आणि परिक्रमा सुरक्षेच्या नियमांचे सविस्तर मार्गदर्शन.',
      gu: 'આશ્રમ, ધર્મશાળા, અન્નક્ષેત્ર, શૂલપાણી તૈયારી, સામાનની યાદી અને પરિક્રમા સુરક્ષા નિયમોનું સંપૂર્ણ માર્ગદર્શન.',
    },
  },
  faq: {
    href: '/narmada-parikrama/faq/',
    icon: <HelpCircle size={24} className="related-icon" />,
    badge: {
      en: 'FAQ & Guidance',
      hi: 'प्रश्नोत्तरी',
      mr: 'प्रश्नोत्तरे',
      gu: 'પ્રશ્નોત્તરી',
    },
    title: {
      en: 'Frequently Asked Questions (FAQ)',
      hi: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
      mr: 'नेहमी विचारले जाणारे प्रश्न (FAQ)',
      gu: 'વારંવાર પૂછાતા પ્રશ્નો (FAQ)',
    },
    desc: {
      en: '15 essential answers on parikrama distance, duration, walking vs vehicle yatra, stays, food, season, and senior citizen advice.',
      hi: 'दूरी, समय, पैदल बनाम वाहन यात्रा, आश्रम, भोजन, उपयुक्त मौसम और वरिष्ठ नागरिकों के लिए 15 आवश्यक प्रश्नों के प्रामाणिक उत्तर।',
      mr: 'अंतर, कालावधी, पायी वि. वाहन यात्रा, मुक्काम, भोजन, योग्य ऋतू आणि ज्येष्ठ नागरिकांसाठी १५ महत्त्वाच्या प्रश्नांची उत्तरे.',
      gu: 'અંતર, સમય, પદયાત્રા વિ. વાહન યાત્રા, આવાસ, ભોજન, યોગ્ય ઋતુ અને વરિષ્ઠ નાગરિકો માટે ૧૫ આવશ્યક પ્રશ્નોના ઉત્તર.',
    },
  },
};

const SECTION_HEADERS = {
  heading: {
    en: 'Continue Exploring Narmada Parikrama',
    hi: 'नर्मदा परिक्रमा की अन्य प्रमुख कड़ियाँ',
    mr: 'नर्मदा परिक्रमेचे इतर महत्त्वाचे भाग',
    gu: 'નર્મદા પરિક્રમાના અન્ય મહત્વપૂર્ણ વિભાગો',
  },
  subtitle: {
    en: 'Discover detailed guides on pilgrimage routes, sacred tirthas, vehicle itineraries, and travel planning.',
    hi: 'यात्रा मार्ग, प्रमुख तीर्थ स्थल, वाहन यात्रा और व्यावहारिक सुझावों के संपूर्ण विवरण देखें।',
    mr: 'यात्रा मार्ग, प्रमुख तीर्थक्षेत्रे, वाहन यात्रा आणि नियोजनाची सविस्तर माहिती पहा.',
    gu: 'યાત્રા માર્ગ, પ્રમુખ તીર્થ સ્થળો, વાહન યાત્રા અને આયોજનની વિગતવાર માહિતી જુઓ.',
  },
};

export function RelatedLinks({ targets }: { targets: RelatedTargetKey[] }) {
  const { lang } = useLanguage();

  return (
    <section className="section related-links-section" aria-label="Related pages">
      <div className="container">
        <div className="section-intro">
          <div className="eyebrow">
            <Footprints size={16} /> {lang === 'hi' ? 'महत्वपूर्ण कड़ियाँ' : lang === 'mr' ? 'महत्त्वाच्या लिंक्स' : lang === 'gu' ? 'મહત્વપૂર્ણ લિંક્સ' : 'Explore Further'}
          </div>
          <h2>{SECTION_HEADERS.heading[lang] || SECTION_HEADERS.heading['en']}</h2>
          <p className="lead">{SECTION_HEADERS.subtitle[lang] || SECTION_HEADERS.subtitle['en']}</p>
        </div>

        <div className="related-links-grid">
          {targets.map((key) => {
            const data = RELATED_DATA[key];
            if (!data) return null;
            return (
              <a key={key} href={data.href} className="related-link-card">
                <div className="related-card-top">
                  <div className="related-icon-wrap">{data.icon}</div>
                  <span className="related-badge">{data.badge[lang] || data.badge['en']}</span>
                </div>
                <h3>{data.title[lang] || data.title['en']}</h3>
                <p>{data.desc[lang] || data.desc['en']}</p>
                <div className="related-cta">
                  <span>{lang === 'hi' ? 'विस्तार से देखें' : lang === 'mr' ? 'सविस्तर पहा' : lang === 'gu' ? 'વિગતે જુઓ' : 'Explore Guide'}</span>
                  <ArrowRight size={16} className="related-arrow" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
