import fs from 'node:fs';
import path from 'node:path';

const PRODUCTION_SITE_URL = 'https://narmadaparikrama.logicbase.co.in';
const DEFAULT_SHARE_IMAGE = 'https://narmadaparikrama.logicbase.co.in/assets/narmada-parikrama-logo.png';

// Detect whether build is explicitly configured for beta/development
const isBetaBuild =
  process.env.SITE_ENV === 'beta' ||
  process.env.IS_BETA === 'true' ||
  process.env.VITE_IS_BETA === 'true' ||
  (Boolean(process.env.VERCEL_URL) && process.env.VERCEL_URL.includes('narmada-parikrama-beta'));

const publicDir = path.resolve('public');

const LANGUAGES = [
  { code: 'en', hreflang: 'en-IN', htmlLang: 'en-IN', prefix: '', label: 'English' },
  { code: 'hi', hreflang: 'hi-IN', htmlLang: 'hi', prefix: '/hi', label: 'हिंदी' },
  { code: 'mr', hreflang: 'mr-IN', htmlLang: 'mr', prefix: '/mr', label: 'मराठी' },
  { code: 'gu', hreflang: 'gu-IN', htmlLang: 'gu', prefix: '/gu', label: 'ગુજરાતી' },
];

const NAV_DATA = {
  en: {
    home: 'Home',
    parikrama: 'Narmada Parikrama',
    places: 'Places',
    route: 'Route',
    travelGuide: 'Travel Guide',
    trips: 'Trips',
    faq: 'FAQ',
    byCar: '18-Day Vehicle Yatra',
    planYatra: 'Plan Your Yatra',
    footerTagline: 'An informational and travel guide platform for the sacred Narmada Parikrama pilgrimage.',
    footerExplore: 'Explore',
    footerJourney: 'Journey Planning',
    footerRights: '© 2026 Narmada Parikrama. All rights reserved.',
  },
  hi: {
    home: 'होम',
    parikrama: 'नर्मदा परिक्रमा',
    places: 'तीर्थ स्थल',
    route: 'यात्रा मार्ग',
    travelGuide: 'यात्रा गाइड',
    trips: 'वाहन यात्रा',
    faq: 'FAQ',
    byCar: '18-दिवसीय कार यात्रा',
    planYatra: 'यात्रा योजना बनाएं',
    footerTagline: 'पवित्र नर्मदा परिक्रमा के लिए स्वतंत्र सूचना एवं यात्रा गाइड मंच।',
    footerExplore: 'अन्वेषण करें',
    footerJourney: 'यात्रा योजना',
    footerRights: '© 2026 नर्मदा परिक्रमा। सर्वाधिकार सुरक्षित।',
  },
  mr: {
    home: 'होम',
    parikrama: 'नर्मदा परिक्रमा',
    places: 'तीर्थक्षेत्रे',
    route: 'यात्रा मार्ग',
    travelGuide: 'प्रवास मार्गदर्शिका',
    trips: 'वाहन यात्रा',
    faq: 'FAQ',
    byCar: '१८-दिवसीय कार यात्रा',
    planYatra: 'यात्रा नियोजन करा',
    footerTagline: 'पवित्र नर्मदा परिक्रमेसाठी स्वतंत्र माहिती व प्रवास मार्गदर्शिका व्यासपीठ.',
    footerExplore: 'अन्वेषण करा',
    footerJourney: 'प्रवास नियोजन',
    footerRights: '© 2026 नर्मदा परिक्रमा. सर्व हक्क राखीव.',
  },
  gu: {
    home: 'હોમ',
    parikrama: 'નર્મદા પરિક્રમા',
    places: 'તીર્થ સ્થળો',
    route: 'યાત્રા માર્ગ',
    travelGuide: 'યાત્રા માર્ગદર્શિકા',
    trips: 'વાહન યાત્રા',
    faq: 'FAQ',
    byCar: '૧૮-દિવસીય કાર યાત્રા',
    planYatra: 'યાત્રાનું આયોજન કરો',
    footerTagline: 'પવિત્ર નર્મદા પરિક્રમા માટે સ્વતંત્ર માહિતી અને યાત્રા માર્ગદર્શિકા મંચ.',
    footerExplore: 'અન્વેષણ કરો',
    footerJourney: 'યાત્રા આયોજન',
    footerRights: '© 2026 નર્મદા પરિક્રમા. સર્વાધિકાર સુરક્ષિત.',
  },
};

const BREADCRUMB_LABELS = {
  home: { en: 'Home', hi: 'होम', mr: 'होम', gu: 'હોમ' },
  parikrama: { en: 'Narmada Parikrama', hi: 'नर्मदा परिक्रमा', mr: 'नर्मदा परिक्रमा', gu: 'નર્મદા પરિક્રમા' },
  route: { en: 'Route', hi: 'मार्ग', mr: 'मार्ग', gu: 'માર્ગ' },
  places: { en: 'Places', hi: 'तीर्थ स्थल', mr: 'तीर्थक्षेत्रे', gu: 'તીર્થ સ્થળો' },
  byCar: { en: 'By Car', hi: 'कार से यात्रा', mr: 'कारने यात्रा', gu: 'કાર દ્વારા યાત્રા' },
  travelGuide: { en: 'Travel Guide', hi: 'यात्रा गाइड', mr: 'प्रवास मार्गदर्शिका', gu: 'યાત્રા માર્ગદર્શિકા' },
  faq: { en: 'FAQ', hi: 'अक्सर पूछे जाने वाले प्रश्न', mr: 'नेहमी विचारले जाणारे प्रश्न', gu: 'વારંવાર પૂછાતા પ્રશ્નો' },
  trips: { en: 'Trips', hi: 'ट्रिप्स', mr: 'ट्रिप्स', gu: 'ટ્રિપ્સ' },
};

function getLocalizedPath(basePath, langCode) {
  if (langCode === 'en') return basePath;
  return `/${langCode}${basePath === '/' ? '/' : basePath}`;
}

const PAGE_CONFIGS = [
  {
    key: 'home',
    basePath: '/',
    relPath: 'index.html',
    priority: '1.0',
    changefreq: 'weekly',
    breadcrumbKeys: ['home'],
    content: {
      en: {
        title: 'Narmada Parikrama | Complete Holy Pilgrimage Guide & Route',
        desc: 'Informational and travel guide platform for the sacred Narmada Parikrama pilgrimage. Explore parikrama routes, temples, ghats, stay and food guidance, and vehicle yatra options.',
        keywords: 'Narmada Parikrama, Narmada Parikrama 2026, Narmada Parikrama route, Narmada Parikrama yatra, Narmada Parikrama trip, 18 day Narmada Parikrama, Narmada pilgrimage, Omkareshwar, Amarkantak',
        eyebrow: 'Sacred Pilgrimage · Amarkantak to Gujarat & Return',
        h1: 'Narmada Parikrama',
        subtitle: 'Informational & Travel Guide Platform for Maa Narmada Pilgrimage',
        lead: 'The sacred Narmada Parikrama is a revered spiritual circumambulation along the holy Narmada River across Madhya Pradesh, Maharashtra, and Gujarat. As an independent informational and travel guide platform, this website offers practical route guidance, sacred shrines, stay and food insights, and travel planning for both traditional walking pilgrims and vehicle-assisted yatra.',
        highlights: [
          'Approx. 3,300–3,500 km traditional circumambulation sequence',
          'Amarkantak origin to Bharuch Gulf of Khambhat and return circuit',
          'Complete directory of 20 sacred ghats, Jyotirlinga, and shrines',
          'Practical accommodation, bhojanalaya, and safety rules for yatris',
        ],
      },
      hi: {
        title: 'नर्मदा परिक्रमा | संपूर्ण यात्रा गाइड, मार्ग व पावन तीर्थ',
        desc: 'पवित्र नर्मदा परिक्रमा के लिए स्वतंत्र सूचना एवं यात्रा गाइड मंच। परिक्रमा मार्ग, 20 प्रमुख तीर्थ, 17 पड़ाव, आश्रम, भोजन, नियम एवं 18-दिवसीय वाहन यात्रा का संपूर्ण विवरण।',
        keywords: 'नर्मदा परिक्रमा, नर्मदा परिक्रमा 2026, नर्मदा परिक्रमा मार्ग, नर्मदा यात्रा, ओंकारेश्वर, अमरकंटक, नर्मदा परिक्रमा नियम, नर्मदा परिक्रमा गाइड',
        eyebrow: 'पावन परिक्रमा · अमरकंटक से गुजरात एवं वापसी',
        h1: 'नर्मदा परिक्रमा',
        subtitle: 'मां नर्मदा के पावन तटों की आध्यात्मिक यात्रा',
        lead: 'पवित्र नर्मदा परिक्रमा मध्य प्रदेश, महाराष्ट्र और गुजरात में माँ नर्मदा के पावन तटों की एक अत्यंत श्रद्धापूर्ण एवं प्राचीन आध्यात्मिक परिक्रमा है। एक स्वतंत्र सूचना एवं यात्रा गाइड मंच के रूप में, यह वेबसाइट परिक्रमा मार्ग, पावन तीर्थ, आश्रम-आवास, अन्नक्षेत्र और 18-दिवसीय वाहन यात्रा का संपूर्ण मार्गदर्शन प्रस्तुत करती है।',
        highlights: [
          'लगभग 3,300 से 3,500 किमी की पावन आध्यात्मिक यात्रा',
          'अमरकंटक उद्गम से भरूच संगम एवं ओंकारेश्वर सहित 17 प्रमुख पड़ाव',
          '20 प्रमुख तीर्थ स्थल, प्राचीन शिव मंदिर एवं नर्मदा के पावन घाट',
          'आश्रम, निःशुल्क अन्नक्षेत्र, शूलपाणी की तैयारी एवं परिक्रमा के 10 मुख्य नियम',
        ],
      },
      mr: {
        title: 'नर्मदा परिक्रमा | संपूर्ण यात्रा मार्गदर्शिका, मार्ग व पावन तीर्थक्षेत्रे',
        desc: 'पवित्र नर्मदा परिक्रमेसाठी स्वतंत्र माहिती व प्रवास मार्गदर्शिका व्यासपीठ. परिक्रमा मार्ग, १७ मुख्य टप्पे, २० प्रमुख तीर्थक्षेत्रे, निवास, भोजन आणि वाहन यात्रेची संपूर्ण माहिती.',
        keywords: 'नर्मदा परिक्रमा, नर्मदा परिक्रमा मार्ग, नर्मदा यात्रा, ओंकारेश्वर, अमरकंटक, नर्मदा परिक्रमा नियम, नर्मदा परिक्रमा मराठी',
        eyebrow: 'पावन परिक्रमा · अमरकंटक ते गुजरात व परतीचा प्रवास',
        h1: 'नर्मदा परिक्रमा',
        subtitle: 'मां नर्मदेच्या पावन तीरांवरील आध्यात्मिक यात्रा',
        lead: 'पवित्र नर्मदा परिक्रमा ही मध्य प्रदेश, महाराष्ट्र आणि गुजरातमधील नर्मदा मातेच्या पावन तीरांवरील अत्यंत पूजनीय आध्यात्मिक साधना आहे. एक स्वतंत्र माहिती व प्रवास मार्गदर्शिका व्यासपीठ म्हणून, ही वेबसाईट परिक्रमा मार्ग, पावन तीर्थक्षेत्रे, आश्रम, भोजन आणि वाहन यात्रेचे संपूर्ण मार्गदर्शन प्रदान करते.',
        highlights: [
          'सुमारे ३,३०० ते ३,५०० किमी चा अखंड आध्यात्मिक प्रवास',
          'अमरकंटक उद्गमापासून भरूच संगम व परतीचा १७ टप्प्यांचा मार्ग',
          '२० पावन तीर्थक्षेत्रे, प्राचीन मंदिरे आणि प्रसिद्ध घाटांची माहिती',
          'आश्रम, अन्नछत्रे, शूलपाणी झाडीची तयारी आणि परिक्रमेचे आवश्यक नियम',
        ],
      },
      gu: {
        title: 'નર્મદા પરિક્રમા | સંપૂર્ણ યાત્રા માર્ગદર્શિકા, માર્ગ અને પવિત્ર તીર્થ',
        desc: 'પવિત્ર નર્મદા પરિક્રમા માટે સ્વતંત્ર માહિતી અને યાત્રા માર્ગદર્શિકા મંચ. પરિક્રમા માર્ગ, ૧૭ મુખ્ય મુકામ, ૨૦ પવિત્ર તીર્થ સ્થાનો, આવાસ, ભોજન અને વાહન યાત્રાનું સંપૂર્ણ માર્ગદર્શન.',
        keywords: 'નર્મદા પરિક્રમા, નર્મદા પરિક્રમા માર્ગ, નર્મદા યાત્રા, ઓમકારેશ્વર, અમરકંટક, નર્મદા પરિક્રમા નિયમો, નર્મદા પરિક્રમા ગુજરાતી',
        eyebrow: 'પવિત્ર પરિક્રમા · અમરકંટકથી ગુજરાત અને પરત',
        h1: 'નર્મદા પરિક્રમા',
        subtitle: 'મા નર્મદાના પાવન તટોની આધ્યાત્મિક યાત્રા',
        lead: 'પવિત્ર નર્મદા પરિક્રમા એ મધ્યપ્રદેશ, મહારાષ્ટ્ર અને ગુજરાતમાં માઁ નર્મદાના પાવન તટોની અત્યંત શ્રદ્ધાપૂર્વકની યાત્રા છે. એક સ્વતંત્ર માહિતી અને યાત્રા માર્ગદર્શિકા મંચ તરીકે, આ વેબસાઇટ પરિક્રમા માર્ગ, પવિત્ર તીર્થો, આશ્રમ-આવાસ, ભોજન અને વાહન યાત્રાનું સંપૂર્ણ માર્ગદર્શન પૂરું પાડે છે.',
        highlights: [
          'આશરે ૩,૩૦૦ થી ૩,૫૦૦ કિમી ની અખંડ આધ્યાત્મિક પરિક્રમા',
          'અમરકંટકથી ભરૂચ વિમલેશ્વર અને પરતના ૧૭ મુખ્ય મુકામો',
          '૨૦ પવિત્ર તીર્થ સ્થાનો, પ્રાચીન શિવ મંદિરો અને પાવન ઘાટ',
          'આશ્રમ, અન્નક્ષેત્ર, શૂલપાણી ઝાડીની તૈયારી અને પરિક્રમાના મુખ્ય નિયમો',
        ],
      },
    },
  },
  {
    key: 'parikrama',
    basePath: '/narmada-parikrama/',
    relPath: 'narmada-parikrama/index.html',
    priority: '0.9',
    changefreq: 'weekly',
    breadcrumbKeys: ['home', 'parikrama'],
    content: {
      en: {
        title: 'Narmada Parikrama | Complete Pilgrimage Guide',
        desc: 'Comprehensive guide to the sacred Narmada Parikrama pilgrimage: spiritual significance, religious traditions, pilgrim rules, devotion, and reverence for holy Maa Narmada.',
        keywords: 'Narmada Parikrama, why do Narmada Parikrama, Narmada Parikrama significance, Narmada Parikrama spiritual guide, Narmade Har, Maa Narmada, Narmada parikrama mahatmya',
        eyebrow: 'Spiritual Guide & Significance',
        h1: 'What is Narmada Parikrama?',
        subtitle: 'A Sacred Spiritual Circumambulation Along Holy Maa Narmada',
        lead: 'Narmada Parikrama is a revered walking and spiritual discipline around the sacred Narmada River. Beginning traditionally at Amarkantak or Omkareshwar, pilgrims traverse along the southern bank to the sea confluence in Gujarat and return via the northern bank.',
        highlights: [
          '10 Core Spiritual Objectives derived from the Skanda Purana Revakhanda',
          'Complete riverbank discipline: walking with the river on your right',
          'Spiritual significance of Narmada Kankad Te Shankar (every pebble is Shiva)',
          'Inner sadhana of surrender, gratitude, and simple living along the riverbanks',
        ],
      },
      hi: {
        title: 'नर्मदा परिक्रमा संपूर्ण गाइड | आध्यात्मिक महत्व व परिक्रमा नियम',
        desc: 'पवित्र नर्मदा परिक्रमा का संपूर्ण आध्यात्मिक मार्गदर्शन: स्कंद पुराण माहात्म्य, परिक्रमा के 10 मुख्य उद्देश्य, साधन-नियम, नर्मदाष्टक एवं माँ नर्मदा की पावन महिमा।',
        keywords: 'नर्मदा परिक्रमा क्या है, नर्मदा परिक्रमा महत्व, नर्मदा परिक्रमा नियम, स्कंद पुराण रेवाखंड, नर्मदे हर',
        eyebrow: 'आध्यात्मिक साधना एवं परंपरा',
        h1: 'नर्मदा परिक्रमा क्या है?',
        subtitle: 'मां नर्मदा के पावन तटों की अखंड प्रदक्षिणा',
        lead: 'नर्मदा परिक्रमा पवित्र नर्मदा नदी की पूर्ण प्रदक्षिणा करने की एक अत्यंत प्राचीन एवं कल्याणकारी तपस्या है। भक्त नदी को सदैव अपने दाहिने ओर रखते हुए तटों के सहारे अमरकंटक अथवा ओंकारेश्वर से प्रस्थान कर दोनों तटों की संपूर्ण यात्रा संपन्न करते हैं।',
        highlights: [
          'स्कंद पुराण रेवाखंड में वर्णित परिक्रमा के 10 प्रमुख आध्यात्मिक उद्देश्य',
          'तट-नियम: माँ नर्मदा का पावन स्पर्श एवं नदी को पार न करने की मर्यादा',
          'नर्मदा के कंकड़-कंकड़ में शंकर का भाव एवं नित्य नर्मदाष्टक पाठ',
          'सादगी, संयम और अटूट श्रद्धा के साथ संपन्न होने वाली आत्म-साधना',
        ],
      },
      mr: {
        title: 'नर्मदा परिक्रमा संपूर्ण मार्गदर्शिका | आध्यात्मिक महत्त्व व नियम',
        desc: 'पवित्र नर्मदा परिक्रमेचे संपूर्ण आध्यात्मिक मार्गदर्शन: स्कंद पुराणातील माहात्म्य, १० प्रमुख आध्यात्मिक उद्दिष्टे, साधन-नियम, शूलपाणी साधना आणि नर्मदा माहात्म्य.',
        keywords: 'नर्मदा परिक्रमा म्हणजे काय, नर्मदा परिक्रमा महत्त्व, नर्मदा परिक्रमा नियम, नर्मदे हर मराठी',
        eyebrow: 'आध्यात्मिक साधना आणि परंपरा',
        h1: 'नर्मदा परिक्रमा म्हणजे काय?',
        subtitle: 'मां नर्मदेच्या पावन तीरांवरील अखंड प्रदक्षिणा',
        lead: 'नर्मदा परिक्रमा ही पवित्र नर्मदा नदीची संपूर्ण प्रदक्षिणा करण्याची एक अत्यंत प्राचीन व मंगलमय तपश्चर्या आहे. परिक्रमावासी नदीला सदैव उजव्या बाजूला ठेवून किनार्‍याने प्रवास करत दोन्ही तीरांचा प्रवास पूर्ण करतात.',
        highlights: [
          'स्कंद पुराणात उल्लेख केलेली परिक्रमेची १० प्रमुख आध्यात्मिक उद्दिष्टे',
          'तीर-शिस्त: पायी चालताना नदी न ओलांडण्याचा व शुद्ध आचरणाचा नियम',
          'नर्मदेच्या प्रत्येक पाषाणात शंकराचे रूप मानून केलेली सेवा व साधना',
          'समर्पण भाव, निसर्गाशी संवाद आणि आंतरिक शांततेची अनुभूती',
        ],
      },
      gu: {
        title: 'નર્મદા પરિક્રમા સંપૂર્ણ માર્ગદર્શિકા | આધ્યાત્મિક મહાત્મ્ય અને નિયમો',
        desc: 'પવિત્ર નર્મદા પરિક્રમાનું સંપૂર્ણ આધ્યાત્મિક માર્ગદર્શન: સ્કંદ પુરાણનું મહાત્મ્ય, ૧૦ મુખ્ય આધ્યાત્મિક ઉદ્દેશ્યો, સાધના નિયમો અને માઁ નર્મદાની પાવન ભક્તિ.',
        keywords: 'નર્મદા પરિક્રમા શું છે, નર્મદા પરિક્રમા મહત્વ, નર્મદા પરિક્રમા નિયમો, નર્મદે હર ગુજરાતી',
        eyebrow: 'આધ્યાત્મિક સાધના અને પરંપરા',
        h1: 'નર્મદા પરિક્રમા શું છે?',
        subtitle: 'માઁ નર્મદાની પાવન પરિક્રમા અને મહિમા',
        lead: 'નર્મદા પરિક્રમા એ પવિત્ર નર્મદા નદીની સંપૂર્ણ પ્રદક્ષિણા કરવાની અતિ પ્રાચીન આધ્યાત્મિક સાધના છે. શ્રદ્ધાળુઓ નદીને સદાય પોતાની જમણી બાજુ રાખીને કિનારે કિનારે સંપૂર્ણ યાત્રા પૂર્ણ કરે છે.',
        highlights: [
          'સ્કંદ પુરાણ રેવાખંડમાં વર્ણવેલા પરિક્રમાના ૧૦ મુખ્ય આધ્યાત્મિક ઉદ્દેશ્યો',
          'નદીની મર્યાદા: પવિત્ર જળનું સન્માન અને નદી ક્રોસ ન કરવાનો નિયમ',
          'નર્મદાના કાંકરે કાંકરે શંકરનો પાવન ભાવ અને નર્મદાષ્ટક પાઠ',
          'તપસ્યા, ભક્તિ અને સાદગીપૂર્ણ જીવન દ્વારા આત્મશુદ્ધિ',
        ],
      },
    },
  },
  {
    key: 'route',
    basePath: '/narmada-parikrama/route/',
    relPath: 'narmada-parikrama/route/index.html',
    priority: '0.9',
    changefreq: 'weekly',
    breadcrumbKeys: ['home', 'parikrama', 'route'],
    content: {
      en: {
        title: 'Narmada Parikrama Route | Amarkantak to Gujarat and Back',
        desc: 'Detailed Narmada Parikrama route guide covering 17 key pilgrimage stops from Amarkantak across Madhya Pradesh, Maharashtra, and Gujarat with day-by-day path details.',
        keywords: 'Narmada Parikrama route, Narmada Parikrama marg, Narmada Parikrama yatra route, Amarkantak, Omkareshwar, Bharuch, Shoolpani, Narmada pilgrimage stops',
        eyebrow: 'Visual Route Sequence',
        h1: 'Narmada Parikrama Route: Amarkantak to Gujarat and Back',
        subtitle: 'Complete 17-Stop Pilgrimage Circuit Sequence Across 3 States',
        lead: 'Explore the complete Narmada Parikrama route sequence and 17 key pilgrimage stops from Amarkantak across Madhya Pradesh, Maharashtra, and Gujarat, detailing the south bank journey to the sea and the north bank return.',
        highlights: [
          'Stop 1 to 5: Amarkantak, Dindori, Mandla, Jabalpur (Bhedaghat), Narsinghpur',
          'Stop 6 to 9: Hoshangabad (Narmadapuram), Handia/Nemawar, Omkareshwar, Maheshwar',
          'Stop 10 to 12: Barwani, Prakasha (MH), Shoolpani sanctuary stretch to Bharuch (GJ)',
          'Stop 13 to 17: Vimleshwar sea confluence, Mititalao sea crossing, north bank return',
        ],
      },
      hi: {
        title: 'नर्मदा परिक्रमा मार्ग | अमरकंटक से गुजरात एवं वापसी के 17 प्रमुख पड़ाव',
        desc: 'नर्मदा परिक्रमा का विस्तृत यात्रा मार्ग: अमरकंटक, ओंकारेश्वर, महेश्वर, भरूच, विमलेश्वर सहित म.प्र., महाराष्ट्र व गुजरात के 17 प्रमुख पड़ावों का क्रमबद्ध विवरण।',
        keywords: 'नर्मदा परिक्रमा मार्ग, नर्मदा परिक्रमा रूट, अमरकंटक से ओंकारेश्वर, शूलपाणी, विमलेश्वर, मीठीतलाई',
        eyebrow: 'क्रमबद्ध यात्रा मार्ग',
        h1: 'नर्मदा परिक्रमा मार्ग: अमरकंटक से गुजरात एवं वापसी',
        subtitle: 'तीन राज्यों में विस्तृत 17 प्रमुख पड़ावों का क्रमबद्ध विवरण',
        lead: 'नर्मदा परिक्रमा का संपूर्ण यात्रा मार्ग अमरकंटक उद्गम से प्रारंभ होकर दक्षिण तट के सहारे ओंकारेश्वर, बड़वानी, शूलपाणी होते हुए गुजरात में समुद्र संगम विमलेश्वर तक पहुंचता है और उत्तर तट से पुनः अमरकंटक लौटता है।',
        highlights: [
          'पड़ाव 1 से 5: अमरकंटक, डिंडोरी, मंडला, जबलपुर (भेड़ाघाट), नरसिंहपुर',
          'पड़ाव 6 से 9: नर्मदापुरम (होशंगाबाद), हंडिया/नेमावर, ओंकारेश्वर ज्योतिर्लिंग, महेश्वर',
          'पड़ाव 10 से 12: बड़वानी, प्रकाशा (महाराष्ट्र), शूलपाणी झाड़ी एवं भरूच (गुजरात)',
          'पड़ाव 13 से 17: विमलेश्वर समुद्र संगम, मीठीतलाई, उत्तर तट वापसी एवं अमरकंटक समापन',
        ],
      },
      mr: {
        title: 'नर्मदा परिक्रमा मार्ग | अमरकंटक ते गुजरात व परतीचा १७ टप्प्यांचा प्रवास',
        desc: 'नर्मदा परिक्रमा सविस्तर प्रवास मार्ग: अमरकंटक, ओंकारेश्वर, महेश्वर, भरूच, विमलेश्वरसह तिन्ही राज्यांतील १७ प्रमुख टप्प्यांचा संपूर्ण क्रमबद्ध प्रवासक्रम.',
        keywords: 'नर्मदा परिक्रमा मार्ग, नर्मदा परिक्रमा टप्पे, अमरकंटक ते ओंकारेश्वर, विमलेश्वर, शूलपाणी मराठी',
        eyebrow: 'सविस्तर प्रवासक्रम',
        h1: 'नर्मदा परिक्रमा मार्ग: अमरकंटक ते गुजरात व परतीचा प्रवास',
        subtitle: 'तीन राज्यांतील १७ प्रमुख टप्प्यांचा सविस्तर प्रवासक्रम',
        lead: 'नर्मदा परिक्रमा मार्ग अमरकंटक येथून सुरू होऊन दक्षिण तीराने ओंकारेश्वर, महेश्वर, शूलपाणी मार्गे गुजरातमध्ये विमलेश्वर संगमापर्यंत जातो आणि उत्तर तीराने परत अमरकंटक येथे पूर्ण होतो.',
        highlights: [
          'टप्पा १ ते ५: अमरकंटक, दिंडोरी, मंडला, जबलपूर (भेdatacঘাট), नरसिंगपूर',
          'टप्पा ६ ते ९: नर्मदापुरम, हंडिया/नेमावर, ओंकारेश्वर ज्योतिर्लिंग, महेश्वर',
          'टप्पा १० ते १२: बडवानी, प्रकाशा (महाराष्ट्र), शूलपाणी झाडी व भरूच',
          'टप्पा १३ ते १७: विमलेश्वर समुद्र संगम, मीठीतलाई व उत्तर तीराने परतीचा प्रवास',
        ],
      },
      gu: {
        title: 'નર્મદા પરિક્રમા માર્ગ | અમરકંટકથી ગુજરાત અને પરતના ૧૭ મુખ્ય મુકામ',
        desc: 'નર્મદા પરિક્રમાનો વિગતવાર યાત્રા માર્ગ: અમરકંટક, ઓમકારેશ્વર, મહેશ્વર, ભરૂચ, વિમલેશ્વર સહિત ત્રણેય રાજ્યોના ૧૭ મુખ્ય મુકામોનો ક્રમબદ્ધ પ્રવાસ.',
        keywords: 'નર્મદા પરિક્રમા માર્ગ, નર્મદા પરિક્રમા રૂટ, અમરકંટકથી ઓમકારેશ્વર, વિમલેશ્વર, શૂલપાણી ગુજરાતી',
        eyebrow: 'વિગતવાર યાત્રા માર્ગ',
        h1: 'નર્મદા પરિક્રમા માર્ગ: અમરકંટકથી ગુજરાત અને પરત',
        subtitle: 'ત્રણ રાજ્યોમાં ફેલાયેલા ૧૭ મુખ્ય મુકામોનો ક્રમબદ્ધ પ્રવાસ',
        lead: 'નર્મદા પરિક્રમા માર્ગ અમરકંટક ઉદ્ગમથી શરૂ થઈ દક્ષિણ તટ દ્વારા ઓમકારેશ્વર, બડવાની, શૂલપાણી ઝાડી થઈને ગુજરાતમાં વિમલેશ્વર સાગર સંગમ સુધી પહોંચે છે અને ઉત્તર તટેથી પરત ફરે છે.',
        highlights: [
          'મુકામ ૧ થી ૫: અમરકંટક, ડિંડોરી, મંડલા, જબલપુર (ભેડાઘાટ), નરસિંહપુર',
          'મુકામ ૬ થી ૯: નર્મદાપુરમ (હોશંગાબાદ), હંડિયા/નેમાવર, ઓમકારેશ્વર, મહેશ્વર',
          'મુકામ ૧૦ થી ૧૨: બડવાની, પ્રકાશા (મહારાષ્ટ્ર), શૂલપાણી ઝાડી અને ભરૂચ',
          'મુકામ ૧૩ થી ૧૭: વિમલેશ્વર સમુદ્ર સંગમ, મીઠીતલાઈ અને ઉત્તર તટ પરત પ્રવાસ',
        ],
      },
    },
  },
  {
    key: 'places',
    basePath: '/narmada-parikrama/places/',
    relPath: 'narmada-parikrama/places/index.html',
    priority: '0.9',
    changefreq: 'weekly',
    breadcrumbKeys: ['home', 'parikrama', 'places'],
    content: {
      en: {
        title: 'Sacred Places on Narmada Parikrama | Temples & Ghats',
        desc: 'Discover 20 sacred pilgrimage places, temples, and holy ghats along Narmada Parikrama across Madhya Pradesh, Maharashtra, and Gujarat with darshan timings and tips.',
        keywords: 'Narmada Parikrama places, Narmada temples, Omkareshwar Jyotirlinga, Amarkantak Narmada Udgam, Maheshwar Ahilya Ghat, Jabalpur Bhedaghat, Bharuch, Shukla Tirth',
        eyebrow: 'Key Destinations',
        h1: 'Sacred Places on Narmada Parikrama',
        subtitle: '20 Major Holy Tirthas, Temples and Riverside Shrines',
        lead: 'Discover 20 major sacred tirthas, temples, and holy ghats along the Narmada Parikrama pilgrimage with spiritual significance, darshan tips, stay, and food insights.',
        highlights: [
          'Amarkantak: Narmada Udgam Kund, Mai ki Bagiya, Kapildhara Waterfall',
          'Omkareshwar & Mamleshwar: Holy Jyotirlinga island and parikrama sangam',
          'Maheshwar: Historic Ahilya Ghat, Narmada Aarti, and Ek Mukhi Datta Temple',
          'Jabalpur Bhedaghat (Dhuandhar) & Bharuch Shukla Tirth shrines',
        ],
      },
      hi: {
        title: 'नर्मदा परिक्रमा के पावन तीर्थ | 20 प्रमुख मंदिर एवं पावन घाट',
        desc: 'नर्मदा परिक्रमा के 20 प्रमुख तीर्थ स्थल, प्राचीन शिव मंदिर व पावन घाट: अमरकंटक, ओंकारेश्वर, महेश्वर, ग्वारीघाट, भरूच, शुकतीर्थ दर्शन एवं ठहरने की संपूर्ण जानकारी।',
        keywords: 'नर्मदा परिक्रमा तीर्थ, नर्मदा मंदिर, ओंकारेश्वर ज्योतिर्लिंग, अमरकंटक उद्गम, महेश्वर अहिल्या घाट, भेड़ाघाट जबलपुर, भरूच शुक्लतीर्थ',
        eyebrow: 'प्रमुख तीर्थ स्थल',
        h1: 'मां नर्मदा के पावन तीर्थ स्थल',
        subtitle: '20 प्रमुख पावन तीर्थ, प्राचीन मंदिर एवं पवित्र घाट',
        lead: 'नर्मदा परिक्रमा के 20 प्रमुख पावन तीर्थ स्थलों, प्राचीन शिव मंदिरों और पवित्र घाटों का संपूर्ण विवरण: दर्शन का समय, आध्यात्मिक महत्व, आश्रम में ठहरने और भोजन की प्रामाणिक जानकारी।',
        highlights: [
          'अमरकंटक: नर्मदा उद्गम मंदिर, माई की बगिया, कपिलधारा एवं कबीर चबूतरा',
          'ओंकारेश्वर एवं ममलेश्वर: ओंकार पर्वत पर स्थित द्वादश ज्योतिर्लिंग तीर्थ',
          'महेश्वर: रानी अहिल्याबाई होल्कर घाट, नर्मदा महाआरती एवं राजराजेश्वर मंदिर',
          'जबलपुर ग्वारीघाट, भेड़ाघाट संगमरमर चट्टानें एवं भरूच शुक्लतीर्थ',
        ],
      },
      mr: {
        title: 'नर्मदा परिक्रमेतील पावन तीर्थक्षेत्रे | २० प्रमुख मंदिरे व घाट',
        desc: 'नर्मदा परिक्रमेतील २० प्रमुख पावन तीर्थक्षेत्रे, मंदिरे आणि घाट: अमरकंटक, ओंकारेश्वर, महेश्वर, ग्वारीघाट, भरूच दर्शन, निवास व भोजनाची सविस्तर माहिती.',
        keywords: 'नर्मदा परिक्रमा तीर्थक्षेत्रे, ओंकारेश्वर, अमरकंटक, महेश्वर घाट, भेdatacघाट जबलपूर, नर्मदा मंदिरे मराठी',
        eyebrow: 'प्रमुख पावन स्थळे',
        h1: 'मां नर्मदेची पावन तीर्थक्षेत्रे',
        subtitle: '२० प्रमुख पावन तीर्थक्षेत्रे, मंदिरे आणि पवित्र घाट',
        lead: 'नर्मदा परिक्रमेतील २० प्रमुख पवित्र तीर्थक्षेत्रे, ऐतिहासिक मंदिरे आणि घाटांची सविस्तर माहिती: दर्शन वेळ, माहात्म्य, आश्रम निवास आणि अन्नछत्रांची माहिती.',
        highlights: [
          'अमरकंटक: नर्मदा उगम मंदिर, कपिलधारा आणि पवित्र कुंड',
          'ओंकारेश्वर आणि ममलेश्वर: पावन ज्योतिर्लिंग आणि नर्मदा संगम',
          'महेश्वर: अहिल्या घाट, भव्य नर्मदा आरती आणि राजेश्वर मंदिर',
          'जबलपूर ग्वारीघाट, भेdatacघाट आणि गुजरातमधील पवित्र शुक्लतीर्थ',
        ],
      },
      gu: {
        title: 'નર્મદા પરિક્રમાના પાવન તીર્થ સ્થાનો | ૨૦ મુખ્ય મંદિરો અને ઘાટ',
        desc: 'નર્મદા પરિક્રમાના ૨૦ મુખ્ય પાવન તીર્થ સ્થાનો, પ્રાચીન શિવ મંદિરો અને ઘાટ: અમરકંટક, ઓમકારેશ્વર, મહેશ્વર, ગ્વારીઘાટ, ભરૂચ દર્શન અને આવાસ-ભોજનનું માર્ગદર્શન.',
        keywords: 'નર્મદા પરિક્રમા તીર્થો, ઓમકારેશ્વર જ્યોતિર્લિંગ, અમરકંટક ઉદ્ગમ, મહેશ્વર અહલ્યા ઘાટ, ભરૂચ શુકલતીર્થ ગુજરાતી',
        eyebrow: 'પવિત્ર તીર્થ સ્થાનો',
        h1: 'મા નર્મદાના પાવન તીર્થ સ્થાનો',
        subtitle: '૨૦ મુખ્ય પાવન તીર્થો, મંદિરો અને નર્મદા ઘાટ',
        lead: 'નર્મદા પરિક્રમાના ૨૦ મુખ્ય પવિત્ર તીર્થ સ્થાનો, પ્રાચીન શિવ મંદિરો અને ઘાટનું સંપૂર્ણ માર્ગદર્શન: દર્શન સમય, આધ્યાત્મિક મહત્વ અને આવાસ-ભોજન વ્યવસ્થા.',
        highlights: [
          'અમરકંટક: નર્મદા ઉદ્ગમ મંદિર, માઈ કી બગિયા અને કપિલધારા',
          'ઓમકારેશ્વર અને મમલેશ્વર: પવિત્ર દ્વાદશ જ્યોતિર્લિંગ દર્શન',
          'મહેશ્વર: અહલ્યા ઘાટ, નર્મદા મહાઆરતી અને પવિત્ર શિવાલય',
          'જબલપુર ભેડાઘાટ, કબીરવડ અને ભરૂચના પ્રાચીન નર્મદા ઘાટ',
        ],
      },
    },
  },
  {
    key: 'byCar',
    basePath: '/narmada-parikrama/by-car/',
    relPath: 'narmada-parikrama/by-car/index.html',
    priority: '0.8',
    changefreq: 'weekly',
    breadcrumbKeys: ['home', 'parikrama', 'byCar'],
    content: {
      en: {
        title: 'Narmada Parikrama by Car | 18-Day Vehicle Yatra Guide',
        desc: 'Complete guide for Narmada Parikrama by car: proposed 18-day vehicle yatra itinerary, road route comparison, driving tips, ghats, temples, and daily travel stops.',
        keywords: 'Narmada Parikrama by car, Narmada Parikrama vehicle yatra, 18 day Narmada yatra, Narmada Parikrama road trip, Route 1 Route 2 vehicle yatra',
        eyebrow: 'Proposed 18-Day Vehicle Circuit',
        h1: '18-Day Narmada Parikrama by Car',
        subtitle: 'Practical Vehicle Itinerary, Road Advice & Stop Details',
        lead: 'For devotees with limited time or senior family members, a well-planned 18-day vehicle pilgrimage allows sacred darshan at key riverside shrines across Madhya Pradesh, Maharashtra, and Gujarat.',
        highlights: [
          'Route 1 (Traditional clockwise circuit via Amarkantak & Omkareshwar)',
          'Route 2 (Alternate accessible circuit with road convenience)',
          'Walking Parikrama vs Vehicle Yatra: spiritual disciplines & time comparison',
          'Essential vehicle guidelines: mountain driving, ghat parking, and road conditions',
        ],
      },
      hi: {
        title: 'कार से नर्मदा परिक्रमा | 18-दिवसीय प्रस्तावित वाहन यात्रा गाइड',
        desc: 'कार व वाहन द्वारा नर्मदा परिक्रमा का संपूर्ण मार्गदर्शक: प्रस्तावित 18-दिवसीय यात्रा कार्यक्रम, रूट 1 व रूट 2 की तुलना, सड़क मार्ग, रात्रि विश्राम एवं आवश्यक सावधानियां।',
        keywords: 'कार से नर्मदा परिक्रमा, 18 दिन नर्मदा परिक्रमा, नर्मदा वाहन यात्रा, रूट 1 रूट 2 कार परिक्रमा, नर्मदा परिक्रमा सड़क मार्ग',
        eyebrow: 'प्रस्तावित 18-दिवसीय वाहन यात्रा',
        h1: '18-दिवसीय कार से नर्मदा परिक्रमा',
        subtitle: 'दैनिक यात्रा कार्यक्रम, रूट तुलना एवं सड़क मार्गदर्शिका',
        lead: 'सीमित समय अथवा वरिष्ठ परिजनों के साथ परिक्रमा करने के इच्छुक श्रद्धालुओं के लिए 18-दिवसीय वाहन यात्रा एक सुगम विकल्प है, जिसमें प्रमुख मंदिरों, घाटों एवं संगम स्थलों के दर्शन संभव होते हैं।',
        highlights: [
          'रूट 1: अमरकंटक से प्रारंभ होकर ओंकारेश्वर एवं विमलेश्वर का पारंपरिक क्रम',
          'रूट 2: सुगम राजमार्गों एवं प्रमुख नगरों के माध्यम से 18-दिवसीय कार्यक्रम',
          'पैदल बनाम कार यात्रा: समय, साधना एवं नियमों की विस्तृत तुलना',
          'वाहन चालकों के लिए परामर्श: घाट पार्किंग, रात्रि यात्रा निषेध एवं सड़क सावधानियां',
        ],
      },
      mr: {
        title: 'कारने नर्मदा परिक्रमा | १८-दिवसीय नियोजित वाहन यात्रा मार्गदर्शिका',
        desc: 'कार व वाहनाने नर्मदा परिक्रमा करण्याचे संपूर्ण नियोजन: १८-दिवसीय प्रवासाचा दैनिक कार्यक्रम, रूट १ व रूट २ ची तुलना, रस्ते, घाट व रात्रीच्या मुक्कामाची माहिती.',
        keywords: 'कारने नर्मदा परिक्रमा, १८ दिवस नर्मदा परिक्रमा, वाहन यात्रा, रूट १ रूट २ मराठी',
        eyebrow: 'नियोजित १८-दिवसीय वाहन यात्रा',
        h1: '१८-दिवसीय कारने नर्मदा परिक्रमा',
        subtitle: 'दैनिक प्रवासक्रम, रस्ते आणि मुक्कामाचे संपूर्ण नियोजन',
        lead: 'मर्यादित वेळ असलेल्या किंवा ज्येष्ठ भाविकांसाठी १८-दिवसीय कार यात्रा हा एक सोयीस्कर पर्याय आहे, ज्याद्वारे नर्मदा तीरावरील प्रमुख तीर्थक्षेत्रांचे दर्शन घेता येते.',
        highlights: [
          'रूट १: पारंपारिक प्रदक्षिणा क्रमाने १८ दिवसांचे सविस्तर नियोजन',
          'रूट २: सुलभ महामार्गांनी प्रमुख तीर्थांना जोडणारा पर्याय',
          'पायी परिक्रमा वि. कारने परिक्रमा: नियम व अनुभवाची तुलना',
          'वाहन चालकांसाठी महत्त्वाच्या सूचना व मुक्कामाचे नियोजन',
        ],
      },
      gu: {
        title: 'કાર દ્વારા નર્મદા પરિક્રમા | ૧૮-દિવસીય પ્રસ્તાવિત વાહન યાત્રા ગાઇડ',
        desc: 'કાર અને વાહન દ્વારા નર્મદા પરિક્રમાનું સંપૂર્ણ આયોજન: ૧૮ દિવસનો પ્રસ્તાવિત પ્રવાસ કાર્યક્રમ, રૂટ ૧ અને રૂટ ૨ ની તુલના, રોડ મુસાફરી અને રાત્રિ રોકાણની વિગતો.',
        keywords: 'કાર દ્વારા નર્મદા પરિક્રમા, ૧૮ દિવસ નર્મદા પરિક્રમા, વાહન યાત્રા ગુજરાતી, રૂટ ૧ રૂટ ૨',
        eyebrow: 'પ્રસ્તાવિત ૧૮-દિવસીય વાહન યાત્રા',
        h1: '૧૮-દિવસીય કાર દ્વારા નર્મદા પરિક્રમા',
        subtitle: 'દૈનિક પ્રવાસ કાર્યક્રમ, રૂટ સરખામણી અને માર્ગદર્શન',
        lead: 'ઓછા સમયવાળા કે વરિષ્ઠ શ્રદ્ધાળુઓ માટે ૧૮ દિવસની વાહન યાત્રા ઉત્તમ વિકલ્પ છે, જેના દ્વારા માઁ નર્મદાના મુખ્ય મંદિરો, પવિત્ર ઘાટ અને તીર્થોના દર્શન સુલભ બને છે.',
        highlights: [
          'રૂટ ૧: અમરકંટકથી શરૂ થતી પારંપરિક ઘડિયાળના કાંટા મુજબની યાત્રા',
          'રૂટ ૨: સરળ હાઇવે અને મુખ્ય તીર્થોને સાંકળતો પ્રવાસ કાર્યક્રમ',
          'પગપાળા વિ. કાર યાત્રા: સમય અને સાધનાના નિયમોની સરખામણી',
          'વાહન પ્રવાસની સાવચેતીઓ અને રાત્રિ રોકાણનું વ્યવહારિક આયોજન',
        ],
      },
    },
  },
  {
    key: 'travelGuide',
    basePath: '/narmada-parikrama/travel-guide/',
    relPath: 'narmada-parikrama/travel-guide/index.html',
    priority: '0.9',
    changefreq: 'weekly',
    breadcrumbKeys: ['home', 'parikrama', 'travelGuide'],
    content: {
      en: {
        title: 'Narmada Parikrama Travel Guide | Stay, Food, Safety & Packing',
        desc: 'Practical travel guide for Narmada Parikrama: ashram stay options, bhojanalayas, food advice, packing checklist, Shoolpani preparation, and pilgrim safety tips.',
        keywords: 'Narmada Parikrama travel guide, Narmada Parikrama stay, Narmada Parikrama food, Narmada Parikrama packing list, Shoolpani forest, Narmada parikrama rules',
        eyebrow: 'Practical Pilgrimage Guide',
        h1: 'Narmada Parikrama Travel Guide',
        subtitle: 'Stay, Food, Packing Checklist & Pilgrim Safety Advice',
        lead: 'Comprehensive practical guidance for the sacred Narmada Parikrama: accommodation, ashram stays, satvik food, bhojanalayas, physical challenges, Shoolpani preparation, packing lists, and essential safety rules for pilgrims.',
        highlights: [
          'Accommodation: Ashrams, dharamshalas, temple halls, and riverbank etiquette',
          'Food & Water: Annakshetra timings, satvik diet, and water purification tips',
          'Shoolpani Sanctuary preparation: forest rules, guides, and group safety',
          'Complete packing checklist: season clothing, footwear, medical kit, and puja items',
        ],
      },
      hi: {
        title: 'नर्मदा परिक्रमा यात्रा गाइड | आश्रम आवास, भोजन, सुरक्षा एवं तैयारी',
        desc: 'नर्मदा परिक्रमा की व्यावहारिक मार्गदर्शिका: आश्रम व धर्मशाला में ठहरने की व्यवस्था, सात्विक भोजन, शूलपाणी की तैयारी, सामान की चेकलिस्ट एवं स्वास्थ्य-सुरक्षा नियम।',
        keywords: 'नर्मदा परिक्रमा यात्रा गाइड, नर्मदा आश्रम ठहरने की व्यवस्था, नर्मदा अन्नक्षेत्र भोजन, शूलपाणी की तैयारी, परिक्रमा सामान चेकलिस्ट, परिक्रमा सुरक्षा',
        eyebrow: 'व्यावहारिक यात्रा मार्गदर्शिका',
        h1: 'नर्मदा परिक्रमा यात्रा गाइड',
        subtitle: 'आश्रम आवास, भोजन, आवश्यक सामान एवं सुरक्षा नियम',
        lead: 'नर्मदा परिक्रमा की व्यावहारिक मार्गदर्शिका: आश्रमों एवं धर्मशालाओं में निःशुल्क विश्राम, अन्नक्षेत्रों में सात्विक भोजन, शूलपाणी झाड़ी की विशेष तैयारी, पैकिंग सूची और परिक्रमा यात्रियों के स्वास्थ्य-सुरक्षा नियम।',
        highlights: [
          'आवास व्यवस्था: आश्रम, धर्मशालाएं, अन्नक्षेत्र एवं रात्रि विश्राम के नियम',
          'भोजन एवं पेय जल: सात्विक आहार, अन्नक्षेत्र समय एवं स्वच्छ जल के उपाय',
          'शूलपाणी झाड़ी की तैयारी: वन नियम, स्थानीय गाइड एवं समूह सुरक्षा',
          'पैकिंग चेकलिस्ट: ऋतु अनुसार वस्त्र, जूते, प्राथमिक चिकित्सा एवं आवश्यक दस्तावेज',
        ],
      },
      mr: {
        title: 'नर्मदा परिक्रमा प्रवास मार्गदर्शिका | निवास, भोजन, सुरक्षा व साहित्य',
        desc: 'नर्मदा परिक्रमेची व्यावहारिक प्रवास मार्गदर्शिका: आश्रम व धर्मशाळा निवास, अन्नक्षेत्र, शूलपाणी झाडीची पूर्वतयारी, आवश्यक साहित्याची यादी आणि आरोग्य-सुरक्षा नियम.',
        keywords: 'नर्मदा परिक्रमा मार्गदर्शिका, नर्मदा आश्रम निवास, अन्नछत्र भोजन, शूलपाणी झाडी, साहित्य यादी मराठी',
        eyebrow: 'व्यावहारिक प्रवास मार्गदर्शिका',
        h1: 'नर्मदा परिक्रमा प्रवास मार्गदर्शिका',
        subtitle: 'निवास, भोजन, आवश्यक साहित्य आणि सुरक्षा नियम',
        lead: 'नर्मदा परिक्रमेदरम्यान आश्रम, धर्मशाळा, अन्नक्षेत्र, शूलपाणी तयारी, साहित्याची यादी, सुरक्षा नियम आणि आरोग्यविषयक आवश्यक मार्गदर्शनाचा संपूर्ण संग्रह.',
        highlights: [
          'निवास व्यवस्था: आश्रम, धर्मशाळा आणि भाविकांसाठी विश्राम व्यवस्था',
          'भोजन व पाणी: सात्विक अन्नछत्रे, वेळा आणि स्वच्छ पिण्याच्या पाण्याचे नियोजन',
          'शूलपाणी झाडीची पूर्वतयारी: जंगलातील नियम व स्थानिक वाटाड्याची मदत',
          'साहित्याची यादी: हवामानानुसार कपडे, पादत्राणे, प्रथमोपचार व कागदपत्रे',
        ],
      },
      gu: {
        title: 'નર્મદા પરિક્રમા યાત્રા માર્ગદર્શિકા | આવાસ, ભોજન, સુરક્ષા અને પેકિંગ',
        desc: 'નર્મદા પરિક્રમાની વ્યવહારિક યાત્રા માર્ગદર્શિકા: આશ્રમ અને ધર્મશાળામાં આવાસ, અન્નક્ષેત્ર-ભોજન, શૂલપાણી ઝાડીની તૈયારી, જરૂરી સામાનની યાદી અને સુરક્ષા નિયમો.',
        keywords: 'નર્મદા પરિક્રમા યાત્રા માર્ગદર્શિકા, નર્મદા આશ્રમ રોકાણ, અન્નક્ષેત્ર ભોજન, શૂલપાણી ઝાડી, પેકિંગ લિસ્ટ ગુજરાતી',
        eyebrow: 'વ્યવહારિક યાત્રા માર્ગદર્શિકા',
        h1: 'નર્મદા પરિક્રમા યાત્રા માર્ગદર્શિકા',
        subtitle: 'આવાસ, સાત્વિક ભોજન, જરૂરી સામાન અને સુરક્ષા નિયમો',
        lead: 'માઁ નર્મદા પરિક્રમા દરમિયાન આશ્રમ, ધર્મશાળા, અન્નક્ષેત્ર, શૂલપાણી ઝાડીની તૈયારી, જરૂરી સામાનની યાદી, સુરક્ષા નિયમો અને સ્વાસ્થ્ય સંબંધી સંપૂર્ણ માર્ગદર્શન.',
        highlights: [
          'આવાસ વ્યવસ્થા: આશ્રમ, ધર્મશાળા અને નર્મદા તટ પર રોકાણના નિયમો',
          'ભોજન-પાણી: અન્નક્ષેત્ર સમય, સાત્વિક આહાર અને શુદ્ધ પીવાનું પાણી',
          'શૂલપાણી ઝાડીની તૈયારી: જંગલના નિયમો અને જૂથમાં મુસાફરી',
          'પેકિંગ ચેકલિસ્ટ: ઋતુ અનુસાર કપડાં, પગરખાં, દવાઓ અને જરૂરી દસ્તાવેજ',
        ],
      },
    },
  },
  {
    key: 'faq',
    basePath: '/narmada-parikrama/faq/',
    relPath: 'narmada-parikrama/faq/index.html',
    priority: '0.8',
    changefreq: 'weekly',
    breadcrumbKeys: ['home', 'parikrama', 'faq'],
    content: {
      en: {
        title: 'Narmada Parikrama FAQ | Routes, Stay, Food & Travel',
        desc: 'Frequently asked questions about Narmada Parikrama: pilgrimage routes, walking vs vehicle yatra, stay options, food facilities, safety, Shoolpani, and travel advice.',
        keywords: 'Narmada Parikrama FAQ, Narmada Parikrama questions, Narmada parikrama distance, Narmada parikrama duration, Narmada parikrama walking vs car, Narmada yatra senior citizens',
        eyebrow: 'Questions & Clear Answers',
        h1: 'Narmada Parikrama FAQ',
        subtitle: '15 Authentic Answers for Common Pilgrim Questions',
        lead: 'Authentic answers to 15 essential questions about Narmada Parikrama: sacred rules, total distance, duration, walking vs car yatra, ashram stays, food facilities, and Shoolpani advice.',
        highlights: [
          'What is the total distance and typical duration on foot vs vehicle?',
          'Where do parikramavasis stay and eat along the riverbanks?',
          'What are the mandatory traditional rules for Narmada Parikrama?',
          'How can senior citizens or working devotees undertake the pilgrimage?',
        ],
      },
      hi: {
        title: 'नर्मदा परिक्रमा FAQ | अक्सर पूछे जाने वाले 15 महत्वपूर्ण प्रश्न व उत्तर',
        desc: 'नर्मदा परिक्रमा से जुड़े प्रमुख प्रश्न एवं प्रामाणिक उत्तर: परिक्रमा की दूरी, समय, पैदल बनाम कार यात्रा, ठहरने-भोजन की सुविधा, शूलपाणी जंगल और आवश्यक नियम।',
        keywords: 'नर्मदा परिक्रमा प्रश्न उत्तर, नर्मदा परिक्रमा FAQ, परिक्रमा की दूरी, परिक्रमा का समय, परिक्रमा के नियम, वरिष्ठ नागरिक नर्मदा यात्रा',
        eyebrow: 'प्रश्नोत्तरी एवं मार्गदर्शन',
        h1: 'नर्मदा परिक्रमा FAQ',
        subtitle: 'श्रद्धालुओं के 15 प्रमुख प्रश्नों के प्रामाणिक उत्तर',
        lead: 'नर्मदा परिक्रमा के संबंध में अक्सर पूछे जाने वाले 15 महत्वपूर्ण प्रश्नों के प्रामाणिक उत्तर: परिक्रमा की दूरी, समय, पैदल बनाम कार यात्रा, आश्रमों में ठहरने की व्यवस्था, सात्विक भोजन और शूलपाणी झाड़ी के नियम।',
        highlights: [
          'नर्मदा परिक्रमा की कुल दूरी और पैदल बनाम कार में लगने वाला समय क्या है?',
          'परिक्रमा में ठहरने और भोजन की क्या व्यवस्था होती है?',
          'नर्मदा परिक्रमा के मुख्य धार्मिक एवं पारंपरिक नियम क्या हैं?',
          'क्या वरिष्ठ नागरिक अथवा कम समय वाले श्रद्धालु भी परिक्रमा कर सकते हैं?',
        ],
      },
      mr: {
        title: 'नर्मदा परिक्रमा FAQ | वारंवार विचारले जाणारे १५ महत्त्वाचे प्रश्न',
        desc: 'नर्मदा परिक्रमेविषयी विचारले जाणारे प्रमुख प्रश्न व उत्तरे: एकूण अंतर, कालावधी, पायी वि. कारने यात्रा, निवास-भोजन व्यवस्था, शूलपाणी आणि परिक्रमेचे नियम.',
        keywords: 'नर्मदा परिक्रमा प्रश्नोत्तरे, नर्मदा परिक्रमा FAQ मराठी, परिक्रमा अंतर, परिक्रमा नियम',
        eyebrow: 'वारंवार विचारले जाणारे प्रश्न',
        h1: 'नर्मदा परिक्रमा FAQ',
        subtitle: 'भाविकांच्या १५ महत्त्वाच्या प्रश्नांची सविस्तर उत्तरे',
        lead: 'नर्मदा परिक्रमेविषयी भाविकांच्या मनात येणारे प्रमुख प्रश्न आणि त्यांची अधिकृत उत्तरे: एकूण अंतर, कालावधी, पायी आणि कारने यात्रा, निवास व भोजनाची व्यवस्था आणि परिक्रमेचे नियम.',
        highlights: [
          'नर्मदा परिक्रमेचे एकूण अंतर किती आहे आणि पायी किती वेळ लागतो?',
          'परिक्रमेदरम्यान मुक्काम आणि जेवणाची व्यवस्था कशी असते?',
          'परिक्रमेचे कोणते महत्त्वाचे नियम पाळणे आवश्यक आहे?',
          'ज्येष्ठ नागरिक किंवा कमी वेळेत परिक्रमा कशी करू शकतात?',
        ],
      },
      gu: {
        title: 'નર્મદા પરિક્રમા FAQ | વારંવાર પૂછાતા ૧૫ મહત્વપૂર્ણ પ્રશ્નો અને ઉત્તરો',
        desc: 'નર્મદા પરિક્રમા સંબંધિત સામાન્ય પ્રશ્નો અને અધિકૃત ઉત્તરો: પરિક્રમા અંતર, સમયગાળો, પગપાળા વિ. કાર યાત્રા, આવાસ-ભોજન સુવિધા અને પરિક્રમાના પવિત્ર નિયમો.',
        keywords: 'નર્મદા પરિક્રમા પ્રશ્નોત્તરી, નર્મદા પરિક્રમા FAQ ગુજરાતી, પરિક્રમા અંતર, પરિક્રમાના નિયમો',
        eyebrow: 'સામાન્ય પ્રશ્નોત્તરી',
        h1: 'નર્મદા પરિક્રમા FAQ',
        subtitle: 'યાત્રાળુઓના ૧૫ મહત્વપૂર્ણ પ્રશ્નોના અધિકૃત ઉત્તરો',
        lead: 'નર્મદા પરિક્રમા સંબંધિત સામાન્ય પ્રશ્નો અને તેના અધિકૃત ઉત્તરો: પરિક્રમા અંતર, સમયગાળો, પગપાળા વિ. કાર યાત્રા, આવાસ-ભોજન સુવિધા અને પરિક્રમાના પવિત્ર નિયમો.',
        highlights: [
          'નર્મદા પરિક્રમાનું કુલ અંતર કેટલું છે અને કેટલો સમય લાગે છે?',
          'પરિક્રમા દરમિયાન આવાસ અને ભોજનની શું વ્યવસ્થા હોય છે?',
          'નર્મદા પરિક્રમાના મુખ્ય આધ્યાત્મિક અને પરંપરાગત નિયમો કયા છે?',
          'વરિષ્ઠ નાગરિકો કે નોકરી કરતા શ્રદ્ધાળુઓ વાહન દ્વારા પરિક્રમા કેવી રીતે કરી શકે?',
        ],
      },
    },
  },
  {
    key: 'trips',
    basePath: '/trips/',
    relPath: 'trips/index.html',
    priority: '0.9',
    changefreq: 'weekly',
    breadcrumbKeys: ['home', 'parikrama', 'trips'],
    content: {
      en: {
        title: 'Narmada Parikrama Trips | Vehicle Yatra 2026',
        desc: 'Travel guide and itinerary details for 18-day Narmada Parikrama vehicle yatra in 2026: October and November departure batches, sacred temple darshan, and route plan.',
        keywords: 'Narmada Parikrama trips 2026, Narmada Parikrama 18 days, Narmada Parikrama October 2026, Narmada Parikrama November 2026, Narmada Parikrama itinerary, Narmada Parikrama vehicle yatra',
        eyebrow: 'UPCOMING DEPARTURES · 2026',
        h1: '18-Day Narmada Parikrama Vehicle Yatra',
        subtitle: 'Curated 18-Day Road Pilgrimage Around Maa Narmada',
        lead: 'Explore upcoming 2026 departure batches for our proposed 18-day Narmada Parikrama vehicle pilgrimage, featuring sacred temple darshan, comfortable road travel, satvik meals, and seasoned yatra guidance.',
        highlights: [
          '1st Batch: 20 October 2026 to 6 November 2026 (Post-Monsoon autumn yatra)',
          '2nd Batch: 14 November 2026 to 1 December 2026 (Pleasant winter yatra)',
          'Complete holy darshan: Omkareshwar, Amarkantak, Maheshwar, Jabalpur, Bharuch',
          'AC vehicle transport, satvik pure-veg meals, verified ashram/hotel accommodation',
        ],
      },
      hi: {
        title: 'नर्मदा परिक्रमा यात्रा 2026 | 18-दिवसीय वाहन यात्रा बैच विवरण',
        desc: 'वर्ष 2026 में 18-दिवसीय नर्मदा परिक्रमा वाहन यात्रा के आगामी बैच: अक्टूबर व नवंबर प्रस्थान तिथियां, संपूर्ण दर्शन कार्यक्रम, सात्विक भोजन एवं यात्रा मार्गदर्शन।',
        keywords: 'नर्मदा परिक्रमा यात्रा 2026, नर्मदा परिक्रमा 18 दिन, अक्टूबर 2026 नर्मदा यात्रा, नवंबर 2026 नर्मदा यात्रा, नर्मदा वाहन यात्रा बैच',
        eyebrow: 'आगामी प्रस्थान तिथियां · 2026',
        h1: '18-दिवसीय नर्मदा परिक्रमा वाहन यात्रा',
        subtitle: 'मां नर्मदा के पावन तीर्थों की सुनियोजित 18-दिवसीय यात्रा',
        lead: 'वर्ष 2026 में हमारी प्रस्तावित 18-दिवसीय नर्मदा परिक्रमा वाहन यात्रा के आगामी बैचों का संपूर्ण विवरण: प्रमुख मंदिरों के दर्शन, आरामदायक सड़क यात्रा, सात्विक भोजन और अनुभवी यात्रा समन्वय।',
        highlights: [
          'प्रथम बैच: 20 अक्टूबर 2026 से 6 नवंबर 2026 (शरद ऋतु का पावन समय)',
          'द्वितीय बैच: 14 नवंबर 2026 से 1 दिसंबर 2026 (सुहावनी शीतकालीन यात्रा)',
          'संपूर्ण दर्शन: ओंकारेश्वर, अमरकंटक, महेश्वर, भेड़ाघाट, विमलेश्वर एवं भरूच',
          'आरामदायक वाहन, सात्विक शुद्ध शाकाहारी भोजन एवं प्रामाणिक आवास व्यवस्था',
        ],
      },
      mr: {
        title: 'नर्मदा परिक्रमा यात्रा २०२६ | १८-दिवसीय वाहन यात्रा बॅच व प्रवासक्रम',
        desc: 'वर्ष २०२६ मधील १८-दिवसीय नर्मदा परिक्रमा वाहन यात्रेच्या आगामी बॅचेस: ऑक्टोबर व नोव्हेंबर प्रस्थान, मंदिर दर्शन, सात्विक भोजन आणि संपूर्ण प्रवास नियोजन.',
        keywords: 'नर्मदा परिक्रमा यात्रा २०२६, १८ दिवस नर्मदा परिक्रमा बॅच, ऑक्टोबर २०२६, नोव्हेंबर २०२६ मराठी',
        eyebrow: 'आगामी प्रवास तारखा · २०२६',
        h1: '१८-दिवसीय नर्मदा परिक्रमा वाहन यात्रा',
        subtitle: 'मां नर्मदेच्या पावन तीर्थांची सुनियोजित १८-दिवसीय यात्रा',
        lead: 'वर्ष २०२६ मधील आमच्या प्रस्तावित १८-दिवसीय नर्मदा परिक्रमा वाहन यात्रेच्या आगामी बॅचेसचे तपशील: प्रमुख मंदिरांचे दर्शन, आरामदायी प्रवास, सात्विक भोजन आणि अनुभवी मार्गदर्शन.',
        highlights: [
          'पहिली बॅच: २० ऑक्टोबर २०२६ ते ६ नोव्हेंबर २०२६ (शरद ऋतूचा उत्तम काळ)',
          'दुसरी बॅच: १४ नोव्हेंबर २०२६ ते १ डिसेंबर २०२६ (आल्हाદदायक हिवाळी प्रवास)',
          'संपूर्ण दर्शन: ओंकारेश्वर, अमरकंटक, महेश्वर, भेdatacघाट, विमलेश्वर',
          'आरामदायी वाहन, सात्विक शुद्ध शाकाहारी भोजन व मुक्कामाचे योग्य नियोजन',
        ],
      },
      gu: {
        title: 'નર્મદા પરિક્રમા યાત્રા ૨૦૨૬ | ૧૮-દિવસીય વાહન યાત્રા બેચ અને વિગત',
        desc: 'વર્ષ ૨૦૨૬ માં ૧૮-દિવસીય નર્મદા પરિક્રમા વાહન યાત્રાની આગામી બેચ: ઓક્ટોબર અને નવેમ્બર પ્રસ્થાન તારીખો, પવિત્ર દર્શન, સાત્વિક ભોજન અને યાત્રા માર્ગદર્શન.',
        keywords: 'નર્મદા પરિક્રમા યાત્રા ૨૦૨૬, ૧૮ દિવસ વાહન યાત્રા, ઓક્ટોબર ૨૦૨૬, નવેમ્બર ૨૦૨૬ ગુજરાતી',
        eyebrow: 'આગામી પ્રસ્થાન તારીખો · ૨૦૨૬',
        h1: '૧૮-દિવસીય નર્મદા પરિક્રમા વાહન યાત્રા',
        subtitle: 'મા નર્મદાના પાવન તીર્થોની સુનિયોજિત ૧૮-દિવસીય યાત્રા',
        lead: 'વર્ષ ૨૦૨૬ માં અમારી પ્રસ્તાવિત ૧૮-દિવસીય નર્મદા પરિક્રમા વાહન યાત્રાની આગામી બેચની વિગતો: પવિત્ર મંદિરોના દર્શન, આરામદાયક રોડ પ્રવાસ, સાત્વિક ભોજન અને અનુભવી યાત્રા સંકલન.',
        highlights: [
          'પ્રથમ બેચ: ૨૦ ઓક્ટોબર ૨૦૨૬ થી ૬ નવેમ્બર ૨૦૨૬ (શરદ ઋતુનો પવિત્ર સમય)',
          'દ્વિતીય બેચ: ૧૪ નવેમ્બર ૨૦૨૬ થી ૧ ડિસેમ્બર ૨૦૨૬ (સુખદ શિયાળુ યાત્રા)',
          'સંપૂર્ણ દર્શન: ઓમકારેશ્વર, અમરકંટક, મહેશ્વર, ભેડાઘાટ, વિમલેશ્વર, ભરૂચ',
          'આરામદાયક વાહન, સાત્વિક શુદ્ધ શાકાહારી ભોજન અને પ્રમાણિત આવાસ',
        ],
      },
    },
  },
];

function buildHtmlPage(pageCfg, lang) {
  const c = pageCfg.content[lang.code];
  const nav = NAV_DATA[lang.code];
  const selfCanonical = `${PRODUCTION_SITE_URL}${getLocalizedPath(pageCfg.basePath, lang.code)}`;

  const hreflangTags = [
    `    <link rel="alternate" hreflang="x-default" href="${PRODUCTION_SITE_URL}${pageCfg.basePath}" />`,
    ...LANGUAGES.map(
      (l) =>
        `    <link rel="alternate" hreflang="${l.hreflang}" href="${PRODUCTION_SITE_URL}${getLocalizedPath(pageCfg.basePath, l.code)}" />`
    ),
  ].join('\n');

  // Breadcrumbs data
  const breadcrumbItems = pageCfg.breadcrumbKeys.map((key, idx) => {
    const label = BREADCRUMB_LABELS[key][lang.code];
    let path = '/';
    if (key === 'parikrama') path = '/narmada-parikrama/';
    else if (key === 'route') path = '/narmada-parikrama/route/';
    else if (key === 'places') path = '/narmada-parikrama/places/';
    else if (key === 'byCar') path = '/narmada-parikrama/by-car/';
    else if (key === 'travelGuide') path = '/narmada-parikrama/travel-guide/';
    else if (key === 'faq') path = '/narmada-parikrama/faq/';
    else if (key === 'trips') path = '/trips/';

    return {
      name: label,
      url: `${PRODUCTION_SITE_URL}${getLocalizedPath(path, lang.code)}`,
      path: getLocalizedPath(path, lang.code),
    };
  });

  const breadcrumbListJsonLd = {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: b.url,
    })),
  };

  const webPageJsonLd = {
    '@type': 'WebPage',
    '@id': `${selfCanonical}#webpage`,
    url: selfCanonical,
    name: c.title,
    description: c.desc,
    isPartOf: { '@id': `${PRODUCTION_SITE_URL}/#website` },
    about: { '@type': 'Place', name: 'Narmada River' },
    inLanguage: lang.hreflang,
  };

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${PRODUCTION_SITE_URL}/#organization`,
        name: 'Narmada Parikrama',
        url: `${PRODUCTION_SITE_URL}/`,
        logo: DEFAULT_SHARE_IMAGE,
        email: 'teklal.saw@gmail.com',
        telephone: ['+91-9958503108', '+91-9315852737'],
      },
      {
        '@type': 'WebSite',
        '@id': `${PRODUCTION_SITE_URL}/#website`,
        url: `${PRODUCTION_SITE_URL}/`,
        name: 'Narmada Parikrama',
        description: nav.footerTagline,
        publisher: { '@id': `${PRODUCTION_SITE_URL}/#organization` },
        inLanguage: lang.hreflang,
      },
      ...(pageCfg.breadcrumbKeys.length > 1 ? [breadcrumbListJsonLd] : []),
      webPageJsonLd,
    ],
  };

  // Pre-rendered nav links
  const navHtml = [
    `            <a href="${getLocalizedPath('/', lang.code)}">${nav.home}</a>`,
    `            <a href="${getLocalizedPath('/narmada-parikrama/', lang.code)}">${nav.parikrama}</a>`,
    `            <a href="${getLocalizedPath('/narmada-parikrama/places/', lang.code)}">${nav.places}</a>`,
    `            <a href="${getLocalizedPath('/narmada-parikrama/route/', lang.code)}">${nav.route}</a>`,
    `            <a href="${getLocalizedPath('/narmada-parikrama/travel-guide/', lang.code)}">${nav.travelGuide}</a>`,
    `            <a href="${getLocalizedPath('/trips/', lang.code)}">${nav.trips}</a>`,
  ].join('\n');

  // Pre-rendered breadcrumbs HTML
  const breadcrumbHtml =
    breadcrumbItems.length > 1
      ? `        <nav class="breadcrumbs-nav" aria-label="Breadcrumb">
          <div class="container">
            <ol class="breadcrumbs-list" itemscope itemtype="https://schema.org/BreadcrumbList">
${breadcrumbItems
  .map(
    (b, idx) => `              <li class="breadcrumb-item ${idx === breadcrumbItems.length - 1 ? 'active' : ''}" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                ${
                  idx === breadcrumbItems.length - 1
                    ? `<span itemprop="name" aria-current="page">${b.name}</span>`
                    : `<a href="${b.path}" itemprop="item"><span itemprop="name">${b.name}</span></a>`
                }
                <meta itemprop="position" content="${idx + 1}" />
                ${idx < breadcrumbItems.length - 1 ? '<span class="breadcrumb-separator" aria-hidden="true">›</span>' : ''}
              </li>`
  )
  .join('\n')}
            </ol>
          </div>
        </nav>`
      : '';

  // Highlights HTML
  const highlightsHtml = c.highlights
    .map((h) => `            <li style="margin-bottom: 8px;">${h}</li>`)
    .join('\n');

  return `<!doctype html>
<html lang="${lang.htmlLang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#F8F7F3" />
    <meta name="color-scheme" content="light" />
    <title>${c.title.replace(/&/g, '&amp;')}</title>
    <meta name="description" content="${c.desc.replace(/"/g, '&quot;')}" />
    <meta name="keywords" content="${c.keywords.replace(/"/g, '&quot;')}" />
    <meta name="author" content="Narmada Parikrama" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <script>
      (function() {
        var h = window.location.hostname;
        if (h === 'narmada-parikrama-beta.vercel.app' || h.endsWith('.vercel.app') || h.includes('beta')) {
          var r = document.querySelector('meta[name="robots"]') || document.createElement('meta');
          r.setAttribute('name', 'robots');
          r.setAttribute('content', 'noindex, nofollow');
          if (!r.parentNode) document.head.appendChild(r);
          var g = document.querySelector('meta[name="googlebot"]') || document.createElement('meta');
          g.setAttribute('name', 'googlebot');
          g.setAttribute('content', 'noindex, nofollow');
          if (!g.parentNode) document.head.appendChild(g);
        }
      })();
    </script>
    <link rel="canonical" href="${selfCanonical}" />
${hreflangTags}
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Narmada Parikrama" />
    <meta property="og:title" content="${c.title.replace(/&/g, '&amp;')}" />
    <meta property="og:description" content="${c.desc.replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${selfCanonical}" />
    <meta property="og:image" content="${DEFAULT_SHARE_IMAGE}" />
    <meta property="og:image:width" content="512" />
    <meta property="og:image:height" content="512" />
    <meta property="og:image:alt" content="Narmada Parikrama Pilgrimage Guide" />
    <meta property="og:locale" content="${lang.hreflang.replace('-', '_')}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${c.title.replace(/&/g, '&amp;')}" />
    <meta name="twitter:description" content="${c.desc.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${DEFAULT_SHARE_IMAGE}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <script type="application/ld+json">
${JSON.stringify(jsonLdGraph, null, 2)
  .split('\n')
  .map((l) => `      ${l}`)
  .join('\n')}
    </script>
  </head>
  <body>
    <div id="root">
      <!-- Semantic Localized Pre-rendered Content -->
      <header class="header">
        <div class="container nav-wrap">
          <a class="brand" href="${getLocalizedPath('/', lang.code)}" aria-label="Narmada Parikrama">
            <img src="/assets/narmada-parikrama-logo.png" alt="Narmada Parikrama" class="brand-logo" width="38" height="38" loading="eager" />
            <span>Narmada<br /><b>Parikrama</b></span>
          </a>
          <nav class="desktop-nav" aria-label="Main navigation">
${navHtml}
          </nav>
        </div>
      </header>

${breadcrumbHtml}

      <main>
        <section class="hero" style="padding: 40px 0 20px;">
          <div class="container">
            <div class="eyebrow" style="font-size: 13px; font-weight: 700; color: #8C4A14; margin-bottom: 12px; text-transform: uppercase;">
              ${c.eyebrow}
            </div>
            <h1 style="font-size: 2.2rem; font-weight: 800; line-height: 1.25; margin-bottom: 16px; color: #1B2430;">
              ${c.h1}
            </h1>
            <div class="hero-subtitle" style="font-size: 1.15rem; font-weight: 600; color: #8C4A14; margin-bottom: 18px;">
              ${c.subtitle}
            </div>
            <p class="lead" style="font-size: 1.05rem; line-height: 1.7; color: #374151; max-width: 860px; margin-bottom: 24px;">
              ${c.lead}
            </p>
            <div style="background: #FFFDF9; border: 1px solid #E5D5C5; border-radius: 8px; padding: 20px; max-width: 860px; margin-top: 20px;">
              <h2 style="font-size: 1.15rem; font-weight: 700; color: #1B2430; margin-bottom: 12px;">
                ${lang.code === 'hi' ? 'मुख्य विशेषताएं' : lang.code === 'mr' ? 'प्रमुख वैशिष्ट्ये' : lang.code === 'gu' ? 'મુખ્ય વિશેષતાઓ' : 'Key Highlights'}
              </h2>
              <ul style="padding-left: 20px; color: #4B5563; line-height: 1.6;">
${highlightsHtml}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer style="margin-top: 40px;">
        <div class="container" style="padding: 24px 0; border-top: 1px solid #E5D5C5;">
          <p style="color: #6B7280; font-size: 0.95rem;">${nav.footerTagline}</p>
          <p style="color: #9CA3AF; font-size: 0.85rem; margin-top: 8px;">${nav.footerRights}</p>
        </div>
      </footer>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

// 1. Generate all 32 HTML files
console.log('Generating 32 localized static HTML entry files...');
let generatedCount = 0;

for (const pageCfg of PAGE_CONFIGS) {
  for (const lang of LANGUAGES) {
    const html = buildHtmlPage(pageCfg, lang);

    let targetFilePath;
    if (lang.code === 'en') {
      targetFilePath = path.resolve(pageCfg.relPath);
    } else {
      targetFilePath = path.resolve(lang.code, pageCfg.relPath);
    }

    const dir = path.dirname(targetFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(targetFilePath, html, 'utf8');
    generatedCount++;
  }
}
console.log(`Successfully generated ${generatedCount} static HTML entry files.`);

// 2. Generate XML sitemap with all 32 URLs and full xhtml hreflang alternates
console.log('Generating multilingual sitemap.xml...');

const sitemapEntries = [];
for (const pageCfg of PAGE_CONFIGS) {
  for (const lang of LANGUAGES) {
    const loc = `${PRODUCTION_SITE_URL}${getLocalizedPath(pageCfg.basePath, lang.code)}`;

    const alternates = [
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${PRODUCTION_SITE_URL}${pageCfg.basePath}" />`,
      ...LANGUAGES.map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${PRODUCTION_SITE_URL}${getLocalizedPath(pageCfg.basePath, l.code)}" />`
      ),
    ].join('\n');

    sitemapEntries.push(`  <url>
    <loc>${loc}</loc>
${alternates}
    <changefreq>${pageCfg.changefreq}</changefreq>
    <priority>${pageCfg.priority}</priority>
  </url>`);
  }
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('\n')}
</urlset>
`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`Generated public/sitemap.xml with ${sitemapEntries.length} URLs.`);

// 3. Generate robots.txt and robots-beta.txt
const robotsProduction = `User-agent: *
Allow: /

Sitemap: ${PRODUCTION_SITE_URL}/sitemap.xml
`;

const robotsBeta = `User-agent: *
Disallow: /
`;

fs.writeFileSync(path.join(publicDir, 'robots-beta.txt'), robotsBeta, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), isBetaBuild ? robotsBeta : robotsProduction, 'utf8');

console.log(`SEO files generated. Canonical URL: ${PRODUCTION_SITE_URL}. Beta build: ${isBetaBuild}`);
