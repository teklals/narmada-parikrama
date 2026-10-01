import { Language } from './types';

export type AppRoute =
  | 'home'
  | 'parikrama'
  | 'route'
  | 'places'
  | 'byCar'
  | 'travelGuide'
  | 'faq'
  | 'trips';

export const PRODUCTION_DOMAIN = 'https://narmadaparikrama.logicbase.co.in';

export const ROUTE_PATHS: Record<AppRoute, string> = {
  home: '/',
  parikrama: '/narmada-parikrama/',
  route: '/narmada-parikrama/route/',
  places: '/narmada-parikrama/places/',
  byCar: '/narmada-parikrama/by-car/',
  travelGuide: '/narmada-parikrama/travel-guide/',
  faq: '/narmada-parikrama/faq/',
  trips: '/trips/',
};

export interface PageMetaItem {
  title: string;
  description: string;
}

export const SEO_DATA: Record<Language, Record<AppRoute, PageMetaItem>> = {
  en: {
    home: {
      title: 'Narmada Parikrama | Complete Holy Pilgrimage Guide & Route',
      description:
        'Informational and travel guide platform for the sacred Narmada Parikrama pilgrimage. Explore parikrama routes, temples, ghats, stay and food guidance, and vehicle yatra options.',
    },
    parikrama: {
      title: 'Narmada Parikrama | Complete Pilgrimage Guide',
      description:
        'Comprehensive guide to the sacred Narmada Parikrama pilgrimage: spiritual significance, religious traditions, pilgrim rules, devotion, and reverence for holy Maa Narmada.',
    },
    route: {
      title: 'Narmada Parikrama Route | Amarkantak to Gujarat and Back',
      description:
        'Detailed Narmada Parikrama route guide covering 17 key pilgrimage stops from Amarkantak across Madhya Pradesh, Maharashtra, and Gujarat with day-by-day path details.',
    },
    places: {
      title: 'Sacred Places on Narmada Parikrama | Temples & Ghats',
      description:
        'Discover 20 sacred pilgrimage places, temples, and holy ghats along Narmada Parikrama across Madhya Pradesh, Maharashtra, and Gujarat with darshan timings and tips.',
    },
    byCar: {
      title: 'Narmada Parikrama by Car | 18-Day Vehicle Yatra Guide',
      description:
        'Complete guide for Narmada Parikrama by car: proposed 18-day vehicle yatra itinerary, road route comparison, driving tips, ghats, temples, and daily travel stops.',
    },
    travelGuide: {
      title: 'Narmada Parikrama Travel Guide | Stay, Food, Safety & Packing',
      description:
        'Practical travel guide for Narmada Parikrama: ashram stay options, bhojanalayas, food advice, packing checklist, Shoolpani preparation, and pilgrim safety tips.',
    },
    faq: {
      title: 'Narmada Parikrama FAQ | Routes, Stay, Food & Travel',
      description:
        'Frequently asked questions about Narmada Parikrama: pilgrimage routes, walking vs vehicle yatra, stay options, food facilities, safety, Shoolpani, and travel advice.',
    },
    trips: {
      title: 'Narmada Parikrama Trips | Vehicle Yatra 2026',
      description:
        'Travel guide and itinerary details for 18-day Narmada Parikrama vehicle yatra in 2026: October and November departure batches, sacred temple darshan, and route plan.',
    },
  },
  hi: {
    home: {
      title: 'नर्मदा परिक्रमा | संपूर्ण यात्रा गाइड, मार्ग व पावन तीर्थ',
      description:
        'पवित्र नर्मदा परिक्रमा के लिए स्वतंत्र सूचना एवं यात्रा गाइड मंच। परिक्रमा मार्ग, 20 प्रमुख तीर्थ, 17 पड़ाव, आश्रम, भोजन, नियम एवं 18-दिवसीय वाहन यात्रा का संपूर्ण विवरण।',
    },
    parikrama: {
      title: 'नर्मदा परिक्रमा संपूर्ण गाइड | आध्यात्मिक महत्व व परिक्रमा नियम',
      description:
        'पवित्र नर्मदा परिक्रमा का संपूर्ण आध्यात्मिक मार्गदर्शन: स्कंद पुराण माहात्म्य, परिक्रमा के 10 मुख्य उद्देश्य, साधन-नियम, नर्मदाष्टक एवं माँ नर्मदा की पावन महिमा।',
    },
    route: {
      title: 'नर्मदा परिक्रमा मार्ग | अमरकंटक से गुजरात एवं वापसी के 17 प्रमुख पड़ाव',
      description:
        'नर्मदा परिक्रमा का विस्तृत यात्रा मार्ग: अमरकंटक, ओंकारेश्वर, महेश्वर, भरूच, विमलेश्वर सहित म.प्र., महाराष्ट्र व गुजरात के 17 प्रमुख पड़ावों का क्रमबद्ध विवरण।',
    },
    places: {
      title: 'नर्मदा परिक्रमा के पावन तीर्थ | 20 प्रमुख मंदिर एवं पावन घाट',
      description:
        'नर्मदा परिक्रमा के 20 प्रमुख तीर्थ स्थल, प्राचीन शिव मंदिर व पावन घाट: अमरकंटक, ओंकारेश्वर, महेश्वर, ग्वारीघाट, भरूच, शुकतीर्थ दर्शन एवं ठहरने की संपूर्ण जानकारी।',
    },
    byCar: {
      title: 'कार से नर्मदा परिक्रमा | 18-दिवसीय प्रस्तावित वाहन यात्रा गाइड',
      description:
        'कार व वाहन द्वारा नर्मदा परिक्रमा का संपूर्ण मार्गदर्शक: प्रस्तावित 18-दिवसीय यात्रा कार्यक्रम, रूट 1 व रूट 2 की तुलना, सड़क मार्ग, रात्रि विश्राम एवं आवश्यक सावधानियां।',
    },
    travelGuide: {
      title: 'नर्मदा परिक्रमा यात्रा गाइड | आश्रम आवास, भोजन, सुरक्षा एवं तैयारी',
      description:
        'नर्मदा परिक्रमा की व्यावहारिक मार्गदर्शिका: आश्रम व धर्मशाला में ठहरने की व्यवस्था, सात्विक भोजन, शूलपाणी की तैयारी, सामान की चेकलिस्ट एवं स्वास्थ्य-सुरक्षा नियम।',
    },
    faq: {
      title: 'नर्मदा परिक्रमा FAQ | अक्सर पूछे जाने वाले 15 महत्वपूर्ण प्रश्न व उत्तर',
      description:
        'नर्मदा परिक्रमा से जुड़े प्रमुख प्रश्न एवं प्रामाणिक उत्तर: परिक्रमा की दूरी, समय, पैदल बनाम कार यात्रा, ठहरने-भोजन की सुविधा, शूलपाणी जंगल और आवश्यक नियम।',
    },
    trips: {
      title: 'नर्मदा परिक्रमा यात्रा 2026 | 18-दिवसीय वाहन यात्रा बैच विवरण',
      description:
        'वर्ष 2026 में 18-दिवसीय नर्मदा परिक्रमा वाहन यात्रा के आगामी बैच: अक्टूबर व नवंबर प्रस्थान तिथियां, संपूर्ण दर्शन कार्यक्रम, सात्विक भोजन एवं यात्रा मार्गदर्शन।',
    },
  },
  mr: {
    home: {
      title: 'नर्मदा परिक्रमा | संपूर्ण यात्रा मार्गदर्शिका, मार्ग व पावन तीर्थक्षेत्रे',
      description:
        'पवित्र नर्मदा परिक्रमेसाठी स्वतंत्र माहिती व प्रवास मार्गदर्शिका व्यासपीठ. परिक्रमा मार्ग, १७ मुख्य टप्पे, २० प्रमुख तीर्थक्षेत्रे, निवास, भोजन आणि वाहन यात्रेची संपूर्ण माहिती.',
    },
    parikrama: {
      title: 'नर्मदा परिक्रमा संपूर्ण मार्गदर्शिका | आध्यात्मिक महत्त्व व नियम',
      description:
        'पवित्र नर्मदा परिक्रमेचे संपूर्ण आध्यात्मिक मार्गदर्शन: स्कंद पुराणातील माहात्म्य, १० प्रमुख आध्यात्मिक उद्दिष्टे, साधन-नियम, शूलपाणी साधना आणि नर्मदा माहात्म्य.',
    },
    route: {
      title: 'नर्मदा परिक्रमा मार्ग | अमरकंटक ते गुजरात व परतीचा १७ टप्प्यांचा प्रवास',
      description:
        'नर्मदा परिक्रमा सविस्तर प्रवास मार्ग: अमरकंटक, ओंकारेश्वर, महेश्वर, भरूच, विमलेश्वरसह तिन्ही राज्यांतील १७ प्रमुख टप्प्यांचा संपूर्ण क्रमबद्ध प्रवासक्रम.',
    },
    places: {
      title: 'नर्मदा परिक्रमेतील पावन तीर्थक्षेत्रे | २० प्रमुख मंदिरे व घाट',
      description:
        'नर्मदा परिक्रमेतील २० प्रमुख पावन तीर्थक्षेत्रे, मंदिरे आणि घाट: अमरकंटक, ओंकारेश्वर, महेश्वर, ग्वारीघाट, भरूच दर्शन, निवास व भोजनाची सविस्तर माहिती.',
    },
    byCar: {
      title: 'कारने नर्मदा परिक्रमा | १८-दिवसीय नियोजित वाहन यात्रा मार्गदर्शिका',
      description:
        'कार व वाहनाने नर्मदा परिक्रमा करण्याचे संपूर्ण नियोजन: १८-दिवसीय प्रवासाचा दैनिक कार्यक्रम, रूट १ व रूट २ ची तुलना, रस्ते, घाट व रात्रीच्या मुक्कामाची माहिती.',
    },
    travelGuide: {
      title: 'नर्मदा परिक्रमा प्रवास मार्गदर्शिका | निवास, भोजन, सुरक्षा व साहित्य',
      description:
        'नर्मदा परिक्रमेची व्यावहारिक प्रवास मार्गदर्शिका: आश्रम व धर्मशाळा निवास, अन्नक्षेत्र, शूलपाणी झाडीची पूर्वतयारी, आवश्यक साहित्याची यादी आणि आरोग्य-सुरक्षा नियम.',
    },
    faq: {
      title: 'नर्मदा परिक्रमा FAQ | वारंवार विचारले जाणारे १५ महत्त्वाचे प्रश्न',
      description:
        'नर्मदा परिक्रमेविषयी विचारले जाणारे प्रमुख प्रश्न व उत्तरे: एकूण अंतर, कालावधी, पायी वि. कारने यात्रा, निवास-भोजन व्यवस्था, शूलपाणी आणि परिक्रमेचे नियम.',
    },
    trips: {
      title: 'नर्मदा परिक्रमा यात्रा २०२६ | १८-दिवसीय वाहन यात्रा बॅच व प्रवासक्रम',
      description:
        'वर्ष २०२६ मधील १८-दिवसीय नर्मदा परिक्रमा वाहन यात्रेच्या आगामी बॅचेस: ऑक्टोबर व नोव्हेंबर प्रस्थान, मंदिर दर्शन, सात्विक भोजन आणि संपूर्ण प्रवास नियोजन.',
    },
  },
  gu: {
    home: {
      title: 'નર્મદા પરિક્રમા | સંપૂર્ણ યાત્રા માર્ગદર્શિકા, માર્ગ અને પવિત્ર તીર્થ',
      description:
        'પવિત્ર નર્મદા પરિક્રમા માટે સ્વતંત્ર માહિતી અને યાત્રા માર્ગદર્શિકા મંચ. પરિક્રમા માર્ગ, ૧૭ મુખ્ય મુકામ, ૨૦ પવિત્ર તીર્થ સ્થાનો, આવાસ, ભોજન અને વાહન યાત્રાનું સંપૂર્ણ માર્ગદર્શન.',
    },
    parikrama: {
      title: 'નર્મદા પરિક્રમા સંપૂર્ણ માર્ગદર્શિકા | આધ્યાત્મિક મહાત્મ્ય અને નિયમો',
      description:
        'પવિત્ર નર્મદા પરિક્રમાનું સંપૂર્ણ આધ્યાત્મિક માર્ગદર્શન: સ્કંદ પુરાણનું મહાત્મ્ય, ૧૦ મુખ્ય આધ્યાત્મિક ઉદ્દેશ્યો, સાધના નિયમો અને માઁ નર્મદાની પાવન ભક્તિ.',
    },
    route: {
      title: 'નર્મદા પરિક્રમા માર્ગ | અમરકંટકથી ગુજરાત અને પરતના ૧૭ મુખ્ય મુકામ',
      description:
        'નર્મદા પરિક્રમાનો વિગતવાર યાત્રા માર્ગ: અમરકંટક, ઓમકારેશ્વર, મહેશ્વર, ભરૂચ, વિમલેશ્વર સહિત ત્રણેય રાજ્યોના ૧૭ મુખ્ય મુકામોનો ક્રમબદ્ધ પ્રવાસ.',
    },
    places: {
      title: 'નર્મદા પરિક્રમાના પાવન તીર્થ સ્થાનો | ૨૦ મુખ્ય મંદિરો અને ઘાટ',
      description:
        'નર્મદા પરિક્રમાના ૨૦ મુખ્ય પાવન તીર્થ સ્થાનો, પ્રાચીન શિવ મંદિરો અને ઘાટ: અમરકંટક, ઓમકારેશ્વર, મહેશ્વર, ગ્વારીઘાટ, ભરૂચ દર્શન અને આવાસ-ભોજનનું માર્ગદર્શન.',
    },
    byCar: {
      title: 'કાર દ્વારા નર્મદા પરિક્રમા | ૧૮-દિવસીય પ્રસ્તાવિત વાહન યાત્રા ગાઇડ',
      description:
        'કાર અને વાહન દ્વારા નર્મદા પરિક્રમાનું સંપૂર્ણ આયોજન: ૧૮ દિવસનો પ્રસ્તાવિત પ્રવાસ કાર્યક્રમ, રૂટ ૧ અને રૂટ ૨ ની તુલના, રોડ મુસાફરી અને રાત્રિ રોકાણની વિગતો.',
    },
    travelGuide: {
      title: 'નર્મદા પરિક્રમા યાત્રા માર્ગદર્શિકા | આવાસ, ભોજન, સુરક્ષા અને પેકિંગ',
      description:
        'નર્મદા પરિક્રમાની વ્યવહારિક યાત્રા માર્ગદર્શિકા: આશ્રમ અને ધર્મશાળામાં આવાસ, અન્નક્ષેત્ર-ભોજન, શૂલપાણી ઝાડીની તૈયારી, જરૂરી સામાનની યાદી અને સુરક્ષા નિયમો.',
    },
    faq: {
      title: 'નર્મદા પરિક્રમા FAQ | વારંવાર પૂછાતા ૧૫ મહત્વપૂર્ણ પ્રશ્નો અને ઉત્તરો',
      description:
        'નર્મદા પરિક્રમા સંબંધિત સામાન્ય પ્રશ્નો અને અધિકૃત ઉત્તરો: પરિક્રમા અંતર, સમયગાળો, પગપાળા વિ. કાર યાત્રા, આવાસ-ભોજન સુવિધા અને પરિક્રમાના પવિત્ર નિયમો.',
    },
    trips: {
      title: 'નર્મદા પરિક્રમા યાત્રા ૨૦૨૬ | ૧૮-દિવસીય વાહન યાત્રા બેચ અને વિગત',
      description:
        'વર્ષ ૨૦૨૬ માં ૧૮-દિવસીય નર્મદા પરિક્રમા વાહન યાત્રાની આગામી બેચ: ઓક્ટોબર અને નવેમ્બર પ્રસ્થાન તારીખો, પવિત્ર દર્શન, સાત્વિક ભોજન અને યાત્રા માર્ગદર્શન.',
    },
  },
};

export function getCanonicalUrl(route: AppRoute, lang: Language): string {
  const base = ROUTE_PATHS[route];
  if (lang === 'en') {
    return `${PRODUCTION_DOMAIN}${base}`;
  }
  return `${PRODUCTION_DOMAIN}/${lang}${base === '/' ? '/' : base}`;
}

export function getHreflangCluster(route: AppRoute): { lang: string; href: string }[] {
  const base = ROUTE_PATHS[route];
  return [
    { lang: 'x-default', href: `${PRODUCTION_DOMAIN}${base}` },
    { lang: 'en-IN', href: `${PRODUCTION_DOMAIN}${base}` },
    { lang: 'hi-IN', href: `${PRODUCTION_DOMAIN}/hi${base === '/' ? '/' : base}` },
    { lang: 'mr-IN', href: `${PRODUCTION_DOMAIN}/mr${base === '/' ? '/' : base}` },
    { lang: 'gu-IN', href: `${PRODUCTION_DOMAIN}/gu${base === '/' ? '/' : base}` },
  ];
}
