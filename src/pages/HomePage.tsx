import React from 'react';
import {
  ArrowRight,
  Car,
  Compass,
  HeartHandshake,
  Hotel,
  MapPin,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Utensils,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../translations';

const CONTACT_PHONE_1 = '+91-9958503108';
const CONTACT_PHONE_2 = '+91-9315852737';
const CONTACT_EMAIL = 'teklal.saw@gmail.com';

function ContactDetails() {
  return (
    <div className="contact-details">
      <a href="tel:+919958503108">📞 {CONTACT_PHONE_1}</a>
      <a href="tel:+919315852737">📞 {CONTACT_PHONE_2}</a>
      <a href={`mailto:${CONTACT_EMAIL}`}>✉ {CONTACT_EMAIL}</a>
    </div>
  );
}

interface HomePageProps {
  openPlanner: () => void;
}

export function HomePage({ openPlanner }: HomePageProps) {
  const { lang, t } = useLanguage();

  const hubCards = [
    {
      href: '/narmada-parikrama/',
      icon: <Sparkles size={24} />,
      badge: lang === 'hi' ? 'आध्यात्मिक साधना' : lang === 'mr' ? 'आध्यात्मिक साधना' : lang === 'gu' ? 'આધ્યાત્મિક સાધના' : 'Spiritual Guide',
      title: lang === 'hi' ? 'नर्मदा परिक्रमा क्यों करें?' : lang === 'mr' ? 'नर्मदा परिक्रमा का करावी?' : lang === 'gu' ? 'નર્મદા પરિક્રમા કેમ કરવી?' : 'Why Undertake Parikrama?',
      desc: lang === 'hi' ? '10 प्रमुख आध्यात्मिक उद्देश्य, स्कंद पुराण में वर्णित माहात्म्य एवं माँ नर्मदा के प्रति अटूट निष्ठा।' : lang === 'mr' ? '१० प्रमुख आध्यात्मिक उद्दिष्टे, स्कंद पुराणातील माहात्म्य आणि समर्पण भाव जाणून घ्या.' : lang === 'gu' ? '૧૦ આધ્યાત્મિક ઉદ્દેશ્યો, સ્કંદ પુરાણનું મહાત્મ્ય અને માઁ નર્મદા પ્રત્યે ભક્તિ-તપસ્યા.' : '10 core spiritual objectives, Skanda Purana significance, and unwavering devotion to Maa Narmada.',
      cta: lang === 'hi' ? 'संपूर्ण मार्गदर्शिका' : lang === 'mr' ? 'संपूर्ण माहिती' : lang === 'gu' ? 'સંપૂર્ણ માર્ગદર્શિકા' : 'Explore Spiritual Guide',
    },
    {
      href: '/narmada-parikrama/route/',
      icon: <Compass size={24} />,
      badge: lang === 'hi' ? 'यात्रा मार्ग' : lang === 'mr' ? 'यात्रा मार्ग' : lang === 'gu' ? 'યાત્રા માર્ગ' : 'Pilgrimage Route',
      title: lang === 'hi' ? '17 प्रमुख पड़ाव एवं मार्ग' : lang === 'mr' ? '१७ प्रमुख टप्पे आणि मार्ग' : lang === 'gu' ? '૧૭ મુખ્ય મુકામ અને માર્ગ' : 'Route & 17 Key Stops',
      desc: lang === 'hi' ? 'अमरकंटक से प्रारंभ होकर मध्य प्रदेश, महाराष्ट्र और गुजरात के 17 प्रमुख पड़ावों का क्रमबद्ध विवरण।' : lang === 'mr' ? 'अमरकंटक ते मध्य प्रदेश, महाराष्ट्र आणि गुजरातमधील १७ प्रमुख टप्प्यांचा सविस्तर प्रवासक्रम.' : lang === 'gu' ? 'અમરકંટકથી શરૂ થઈ મધ્યપ્રદેશ, મહારાષ્ટ્ર અને ગુજરાતના ૧૭ મુખ્ય મુકામોનો ક્રમબદ્ધ પ્રવાસ.' : 'Explore the 17 key pilgrimage stops from Amarkantak through Madhya Pradesh, Maharashtra, and Gujarat.',
      cta: lang === 'hi' ? 'मार्ग देखें' : lang === 'mr' ? 'मार्ग पहा' : lang === 'gu' ? 'માર્ગ જુઓ' : 'Explore Route Timeline',
    },
    {
      href: '/narmada-parikrama/places/',
      icon: <MapPin size={24} />,
      badge: lang === 'hi' ? 'पावन तीर्थ' : lang === 'mr' ? 'पावन तीर्थक्षेत्रे' : lang === 'gu' ? 'પવિત્ર તીર્થ' : 'Sacred Tirthas',
      title: lang === 'hi' ? '20 प्रमुख तीर्थ एवं घाट' : lang === 'mr' ? '२० प्रमुख तीर्थक्षेत्रे आणि घाट' : lang === 'gu' ? '૨૦ પ્રમુખ તીર્થ અને ઘાટ' : '20 Sacred Pilgrimage Places',
      desc: lang === 'hi' ? 'ॐकारेश्वर, अमरकंटक, महेश्वर, ग्वारीघाट सहित म.प्र., महाराष्ट्र और गुजरात के पावन स्थल।' : lang === 'mr' ? 'ओंकारेश्वर, अमरकंटक, महेश्वर आणि तिन्ही राज्यांतील प्रमुख पवित्र घाटांची माहिती.' : lang === 'gu' ? 'ઓમકારેશ્વર, અમરકંટક, મહેશ્વર અને ત્રણેય રાજ્યોના પવિત્ર ઘાટ તથા મંદિરો.' : 'Discover Omkareshwar, Amarkantak, Maheshwar, and sacred riverside shrines across MP, MH & GJ.',
      cta: lang === 'hi' ? 'तीर्थ सूची देखें' : lang === 'mr' ? 'तीर्थक्षेत्रे पहा' : lang === 'gu' ? 'તીર્થ યાદી જુઓ' : 'View Places Directory',
    },
    {
      href: '/narmada-parikrama/travel-guide/',
      icon: <Hotel size={24} />,
      badge: lang === 'hi' ? 'यात्रा गाइड' : lang === 'mr' ? 'प्रवास मार्गदर्शिका' : lang === 'gu' ? 'યાત્રા માર્ગદર્શિકા' : 'Travel Guide',
      title: lang === 'hi' ? 'आवास, भोजन व तैयारी' : lang === 'mr' ? 'निवास, भोजन आणि साहित्य' : lang === 'gu' ? 'આવાસ, ભોજન અને પેકિંગ' : 'Stay, Food, Safety & Packing',
      desc: lang === 'hi' ? 'आश्रम, धर्मशाला, अन्नक्षेत्र, शूलपाणी की तैयारी, आवश्यक सामान एवं परिक्रमा सुरक्षा नियमों की संपूर्ण जानकारी।' : lang === 'mr' ? 'आश्रम, धर्मशाळा, अन्नक्षेत्र, शूलपाणी तयारी, साहित्याची यादी आणि परिक्रमा सुरक्षेच्या नियमांची माहिती.' : lang === 'gu' ? 'આશ્રમ, ધર્મશાળા, અન્નક્ષેત્ર, શૂલપાણી તૈયારી, સામાનની યાદી અને પરિક્રમા સુરક્ષા નિયમોનું માર્ગદર્શન.' : 'Complete practical guide on ashrams, dharamshalas, bhojanalayas, Shoolpani preparation, packing lists, and safety.',
      cta: lang === 'hi' ? 'गाइड देखें' : lang === 'mr' ? 'मार्गदर्शिका पहा' : lang === 'gu' ? 'માર્ગદર્શિકા જુઓ' : 'View Travel Guide',
    },
    {
      href: '/narmada-parikrama/by-car/',
      icon: <Car size={24} />,
      badge: lang === 'hi' ? 'वाहन यात्रा' : lang === 'mr' ? 'वाहन यात्रा' : lang === 'gu' ? 'વાહન યાત્રા' : 'Vehicle Yatra',
      title: lang === 'hi' ? '18-दिवसीय कार यात्रा' : lang === 'mr' ? '१८-दिवसीय कारने यात्रा' : lang === 'gu' ? '૧૮-દિવસીય કાર યાત્રા' : '18-Day Vehicle Yatra',
      desc: lang === 'hi' ? 'सीमित समय वाले श्रद्धालुओं के लिए रूट 1 व रूट 2 का प्रस्तावित 18-दिवसीय कार्यक्रम एवं तुलना।' : lang === 'mr' ? 'मर्यादित वेळेत परिक्रमा करू इच्छिणाऱ्यांसाठी रूट १ आणि रूट २ चा नियोजित कार्यक्रम.' : lang === 'gu' ? 'મર્યાદિત સમયવાળા યાત્રાળુઓ માટે રૂટ ૧ અને રૂટ ૨ નો ૧૮ દિવસનો પ્રસ્તાવિત કાર્યક્રમ.' : 'Proposed 18-day vehicle circuits (Route 1 & Route 2), walking vs car comparison, and road advice.',
      cta: lang === 'hi' ? 'वाहन योजना देखें' : lang === 'mr' ? 'वाहन योजना पहा' : lang === 'gu' ? 'વાહન યોજના જુઓ' : 'View By-Car Itinerary',
    },
  ];

  return (
    <div className="site">
      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">
                <MapPinned size={16} /> {t.home.heroEyebrow}
              </div>
              <h1>
                {t.home.heroTitlePrefix}
                <span>{t.home.heroTitleHighlight}</span>
              </h1>
              <div className="hero-subtitle">{t.home.heroSubtitle}</div>
              <p>{t.home.heroDesc}</p>
              <div className="actions">
                <a className="primary" href="/narmada-parikrama/route/">
                  {t.home.exploreBtn} <ArrowRight size={18} />
                </a>
                <button type="button" className="secondary" onClick={openPlanner}>
                  {t.home.planBtn}
                </button>
              </div>
              <div className="stats">
                <div>
                  <strong>{t.home.statDistance}</strong>
                  <small>{t.home.statDistanceLabel}</small>
                </div>
                <div>
                  <strong>{t.home.statDuration}</strong>
                  <small>{t.home.statDurationLabel}</small>
                </div>
                <div>
                  <strong>{t.home.statStates}</strong>
                  <small>{t.home.statStatesLabel}</small>
                </div>
                <div>
                  <strong>{t.home.statSource}</strong>
                  <small>{t.home.statSourceLabel}</small>
                </div>
              </div>
            </div>
            <div className="hero-art">
              <div className="glow" />
              <div className="river-card">
                <span>ॐ</span>
                <h3>{t.home.riverCardTitle}</h3>
                <p>{t.home.riverCardSubtitle}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Card Explore Hub */}
        <section className="explore-hub-section" aria-label="Explore pillars">
          <div className="container">
            <div className="explore-hubs-grid">
              {hubCards.map((card, idx) => (
                <a key={idx} href={card.href} className="hub-card">
                  <div className="hub-card-header">
                    <div className="hub-icon-box">{card.icon}</div>
                    <span className="hub-badge">{card.badge}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <div className="hub-cta">
                    <span>{card.cta}</span>
                    <ArrowRight size={15} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Guide Gateway Feature Banner */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
          <div className="container">
            <div className="shoolpani-box" style={{ background: 'linear-gradient(135deg, #FAF7F0 0%, #F5EFE0 100%)', borderColor: '#E5D6BD' }}>
              <div className="shoolpani-header">
                <div>
                  <span className="kicker" style={{ color: '#8F5E15', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {lang === 'hi' ? 'व्यावहारिक मार्गदर्शिका' : lang === 'mr' ? 'व्यावहारिक मार्गदर्शिका' : lang === 'gu' ? 'વ્યવહારિક માર્ગદર્શિકા' : 'Practical Travel Guide'}
                  </span>
                  <h2 style={{ color: '#1B2430', marginTop: 4, marginBottom: 8, fontSize: 'clamp(22px, 3vw, 28px)' }}>
                    {t.nav.travelGuide}: {lang === 'hi' ? 'आवास, भोजन, सुरक्षा व तैयारी' : lang === 'mr' ? 'निवास, भोजन, सुरक्षा आणि तयारी' : lang === 'gu' ? 'આવાસ, ભોજન, સુરક્ષા અને પેકિંગ' : 'Stay, Food, Safety & Packing'}
                  </h2>
                </div>
                <span className="shoolpani-badge" style={{ background: '#C9953D', color: '#FFFFFF' }}>
                  {lang === 'hi' ? 'संपूर्ण गाइड' : lang === 'mr' ? 'संपूर्ण माहिती' : lang === 'gu' ? 'સંપૂર્ણ માર્ગદર્શિકા' : 'Complete Guide'}
                </span>
              </div>
              <p style={{ color: '#4A5568', lineHeight: 1.6, fontSize: '15.5px', marginBottom: 16 }}>
                {lang === 'hi'
                  ? 'परिक्रमा के दौरान निःशुल्क आश्रम, धर्मशाला, सात्विक अन्नक्षेत्र, शूलपाणी की तैयारी, सामान की आवश्यक सूची और सुरक्षा नियमों की संपूर्ण जानकारी हमारे समर्पित यात्रा गाइड पृष्ठ पर उपलब्ध है।'
                  : lang === 'mr'
                  ? 'परिक्रमेदरम्यान मोफत आश्रम, धर्मशाळा, सात्त्विक अन्नक्षेत्रे, शूलपाणी तयारी, साहित्याची यादी आणि सुरक्षा नियमांचे सविस्तर मार्गदर्शन आमच्या स्वतंत्र प्रवास मार्गदर्शिका पृष्ठावर उपलब्ध आहे.'
                  : lang === 'gu'
                  ? 'પરિક્રમા દરમિયાન નિઃશુલ્ક આશ્રમ, ધર્મશાળા, સાત્વિક અન્નક્ષેત્ર, શૂલપાણી ઝાડીની તૈયારી, જરૂરી સામાનની યાદી અને સુરક્ષા નિયમોનું સંપૂર્ણ માર્ગદર્શન અમારા સમર્પિત યાત્રા માર્ગદર્શિકા પૃષ્ઠ પર ઉપલબ્ધ છે.'
                  : 'Detailed practical guidance on ashram stays, dharamshalas, satvik annakshetras, Shoolpani preparation, packing lists, and parikrama safety rules is available on our dedicated Travel Guide page.'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                <a className="primary" href="/narmada-parikrama/travel-guide/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {lang === 'hi' ? 'संपूर्ण यात्रा गाइड खोलें' : lang === 'mr' ? 'संपूर्ण मार्गदर्शिका उघडा' : lang === 'gu' ? 'સંપૂર્ણ યાત્રા માર્ગદર્શિકા જુઓ' : 'Explore Complete Travel Guide'} <ArrowRight size={17} />
                </a>
                <a href="/narmada-parikrama/by-car/" style={{ color: '#1B2430', fontWeight: 600, fontSize: '14.5px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {lang === 'hi' ? '18-दिवसीय कार यात्रा देखें →' : lang === 'mr' ? '१८-दिवसीय कार यात्रा पहा →' : lang === 'gu' ? '૧૮-દિવસીય કાર યાત્રા જુઓ →' : '18-Day Vehicle Circuits →'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="cta">
          <div className="container cta-inner">
            <div>
              <div className="eyebrow">{t.home.ctaEyebrow}</div>
              <h2>{t.home.ctaTitle}</h2>
              <p>{t.home.ctaDesc}</p>
              <ContactDetails />
            </div>
            <button type="button" className="primary" onClick={openPlanner}>
              {t.home.ctaBtn} <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
