import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BedDouble,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Droplets,
  Footprints,
  HeartHandshake,
  HelpCircle,
  Hotel,
  Info,
  MapPin,
  Mountain,
  ShieldCheck,
  SignalHigh,
  Sparkles,
  ThermometerSnowflake,
  Users,
  Utensils,
} from 'lucide-react';
import { useLanguage } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedLinks } from '../components/RelatedLinks';

const CONTACT_PHONE_1 = '+91-9958503108';
const CONTACT_PHONE_2 = '+91-9315852737';
const CONTACT_EMAIL = 'teklal.saw@gmail.com';
const FAQ_PREVIEW_INDICES = [8, 9, 10, 11, 13];

function ContactDetails() {
  return (
    <div className="contact-details">
      <a href="tel:+919958503108">📞 {CONTACT_PHONE_1}</a>
      <a href="tel:+919315852737">📞 {CONTACT_PHONE_2}</a>
      <a href={`mailto:${CONTACT_EMAIL}`}>✉ {CONTACT_EMAIL}</a>
    </div>
  );
}

function getChallengeIcon(name: string) {
  switch (name) {
    case 'Footprints':
      return <Footprints size={22} />;
    case 'ThermometerSnowflake':
      return <ThermometerSnowflake size={22} />;
    case 'Mountain':
      return <Mountain size={22} />;
    case 'CreditCard':
      return <CreditCard size={22} />;
    case 'BedDouble':
      return <BedDouble size={22} />;
    case 'SignalHigh':
      return <SignalHigh size={22} />;
    case 'Droplets':
      return <Droplets size={22} />;
    default:
      return <AlertTriangle size={22} />;
  }
}

interface TravelGuidePageProps {
  openPlanner: () => void;
}

export function TravelGuidePage({ openPlanner }: TravelGuidePageProps) {
  const { lang, t } = useLanguage();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const guideEyebrow =
    lang === 'hi'
      ? 'व्यावहारिक यात्रा मार्गदर्शिका'
      : lang === 'mr'
      ? 'व्यावहारिक प्रवास मार्गदर्शिका'
      : lang === 'gu'
      ? 'વ્યવહારિક યાત્રા માર્ગદર્શિકા'
      : 'PRACTICAL PILGRIMAGE GUIDE';

  const guideHeroTitle =
    lang === 'hi'
      ? 'नर्मदा परिक्रमा यात्रा गाइड'
      : lang === 'mr'
      ? 'नर्मदा परिक्रमा प्रवास मार्गदर्शिका'
      : lang === 'gu'
      ? 'નર્મદા પરિક્રમા યાત્રા માર્ગદર્શિકા'
      : 'Narmada Parikrama Travel Guide';

  const guideHeroHighlight =
    lang === 'hi'
      ? 'आवास, भोजन, सुरक्षा व तैयारी'
      : lang === 'mr'
      ? 'निवास, भोजन, सुरक्षा आणि तयारी'
      : lang === 'gu'
      ? 'આવાસ, ભોજન, સુરક્ષા અને પેકિંગ'
      : 'Stay, Food, Safety & Packing';

  const guideHeroDesc =
    lang === 'hi'
      ? 'माँ नर्मदा परिक्रमा के दौरान आश्रम, धर्मशाला, अन्नक्षेत्र, शूलपाणी की तैयारी, आवश्यक सामान, सुरक्षा नियमों और स्वास्थ्य संबंधी महत्वपूर्ण जानकारियों का संपूर्ण संग्रह।'
      : lang === 'mr'
      ? 'नर्मदा परिक्रमेदरम्यान आश्रम, धर्मशाळा, अन्नक्षेत्र, शूलपाणी तयारी, साहित्याची यादी, सुरक्षा नियम आणि आरोग्यविषयक आवश्यक मार्गदर्शनाचा संपूर्ण संग्रह.'
      : lang === 'gu'
      ? 'માઁ નર્મદા પરિક્રમા દરમિયાન આશ્રમ, ધર્મશાળા, અન્નક્ષેત્ર, શૂલપાણી ઝાડીની તૈયારી, જરૂરી સામાનની યાદી, સુરક્ષા નિયમો અને સ્વાસ્થ્ય સંબંધી સંપૂર્ણ માર્ગદર્શન.'
      : 'Complete practical guidance on accommodation, ashram stays, satvik food, bhojanalayas, physical challenges, Shoolpani preparation, packing lists, and essential safety rules for pilgrims.';

  const viewAllFaqsText =
    t.home.faqViewAll ||
    (lang === 'hi'
      ? 'सभी प्रश्नोत्तरी देखें'
      : lang === 'mr'
      ? 'सर्व प्रश्नोत्तरे पहा'
      : lang === 'gu'
      ? 'બધા પ્રશ્નોત્તરી જુઓ'
      : 'View All FAQs');

  return (
    <div className="travel-guide-page">
      <Breadcrumbs
        items={[
          { key: 'home', href: '/' },
          { key: 'parikrama', href: '/narmada-parikrama/' },
          { key: 'travelGuide' },
        ]}
      />

      <div className="site">
        <main>
          {/* Guide Hero */}
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <div className="eyebrow">
                  <Hotel size={16} /> {guideEyebrow}
                </div>
                <h1>
                  {guideHeroTitle} — <span>{guideHeroHighlight}</span>
                </h1>
                <div className="hero-subtitle">
                  {lang === 'hi'
                    ? 'परिक्रमार्थियों के लिए व्यावहारिक, प्रमाणिक एवं उपयोगी जानकारी'
                    : lang === 'mr'
                    ? 'परिक्रमार्थ्‍यांसाठी व्यावहारिक आणि उपयुक्त माहिती'
                    : lang === 'gu'
                    ? 'પરિક્રમાર્થીઓ માટે વ્યવહારિક અને ઉપયોગી માર્ગદર્શન'
                    : 'Authentic practical guidance for walking & vehicle parikramavasis'}
                </div>
                <p>{guideHeroDesc}</p>
                <div className="actions">
                  <a className="primary" href="#stay">
                    {lang === 'hi'
                      ? 'आवास व्यवस्था देखें'
                      : lang === 'mr'
                      ? 'निवास व्यवस्था पहा'
                      : lang === 'gu'
                      ? 'આવાસ વ્યવસ્થા જુઓ'
                      : 'View Accommodation'}{' '}
                    <ArrowRight size={18} />
                  </a>
                  <button type="button" className="secondary" onClick={openPlanner}>
                    {t.home.planBtn}
                  </button>
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

          {/* Quick Nav Anchors */}
          <div id="travel-guide" className="nav-anchor" />
          <div id="guide" className="nav-anchor" />

          {/* Section 1: Stay & Accommodation */}
          <section id="stay" className="section">
            <div className="container">
              <div className="section-intro">
                <div className="eyebrow">
                  <Hotel size={16} /> {t.home.stayEyebrow}
                </div>
                <h2>{t.home.stayTitle}</h2>
                <p>{t.home.staySubtitle}</p>
              </div>

              <div className="stay-grid">
                {t.home.stayCategories.map((cat, idx) => (
                  <article className="stay-card" key={idx}>
                    <span className="stay-card-tag">{cat.tag}</span>
                    <h3>{cat.title}</h3>
                    <p>{cat.desc}</p>
                    <div className="stay-card-tip">
                      <small>💡 {cat.tip}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Food & Annakshetras */}
          <section id="food" className="section dark">
            <div className="container">
              <div className="section-intro">
                <div className="eyebrow">
                  <Utensils size={16} /> {t.home.foodEyebrow}
                </div>
                <h2>{t.home.foodTitle}</h2>
                <p>{t.home.foodSubtitle}</p>
              </div>

              <div className="food-grid">
                {t.home.foodItems.map((item, idx) => (
                  <article className="food-card" key={idx}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Physical Challenges */}
          <section id="challenges" className="section">
            <div className="container">
              <div className="section-intro">
                <div className="eyebrow">
                  <AlertTriangle size={16} /> {t.home.challengesEyebrow}
                </div>
                <h2>{t.home.challengesTitle}</h2>
                <p>{t.home.challengesSubtitle}</p>
              </div>

              <div className="challenges-grid">
                {t.home.challenges.map((c, idx) => (
                  <article className="challenge-card" key={idx}>
                    <div className="challenge-icon">{getChallengeIcon(c.iconName)}</div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    {c.realNote && <div className="challenge-real-note">📌 {c.realNote}</div>}
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Shoolpani / Difficult Forest Section */}
          <section id="shoolpani" className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <div className="shoolpani-box">
                <div className="shoolpani-header">
                  <h2>{t.home.shoolpaniTitle}</h2>
                  <span className="shoolpani-badge">{t.home.shoolpaniBadge}</span>
                </div>
                <p>{t.home.shoolpaniP1}</p>
                <p>{t.home.shoolpaniP2}</p>

                <h4 style={{ margin: '20px 0 10px', fontSize: 16 }}>{t.home.shoolpaniAdviceTitle}:</h4>
                <ul className="shoolpani-rules-list">
                  {t.home.shoolpaniAdviceList.map((rule, idx) => (
                    <li className="shoolpani-rule-item" key={idx}>
                      <ShieldCheck size={18} />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>

                <div className="warning-box">
                  <AlertTriangle size={17} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} />
                  {t.home.shoolpaniWarning}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: People, Ashrams and Seva */}
          <section id="experience" className="section dark">
            <div className="container">
              <div className="section-intro">
                <div className="eyebrow">
                  <Users size={16} /> {t.home.peopleEyebrow}
                </div>
                <h2>{t.home.peopleTitle}</h2>
                <p>{t.home.peopleSubtitle}</p>
              </div>

              <div className="route-disclaimer">
                <Info size={17} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} />
                {t.home.peopleDisclaimer}
              </div>

              <div className="people-grid">
                {t.home.peopleList.map((p, idx) => (
                  <article className="people-card" key={idx}>
                    <h3>
                      <HeartHandshake size={20} color="#C9953D" /> {p.title}
                    </h3>
                    <p>{p.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 6: Packing Checklist */}
          <section id="checklist" className="section">
            <div className="container">
              <div className="section-intro">
                <div className="eyebrow">
                  <CheckCircle2 size={16} /> {t.home.packingEyebrow}
                </div>
                <h2>{t.home.packingTitle}</h2>
                <p>{t.home.packingSubtitle}</p>
              </div>

              <div className="packing-grid">
                {t.home.packingGroups.map((group, idx) => (
                  <article className="packing-card" key={idx}>
                    <h3>{group.category}</h3>
                    <ul className="packing-list">
                      {group.items.map((item, itemIdx) => (
                        <li className="packing-item" key={itemIdx}>
                          <CheckCircle size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="packing-walking-note">
                <strong>🎒 {t.home.packingWalkingNote}</strong>
              </div>
            </div>
          </section>

          {/* Section 7: Safety Guide */}
          <section id="safety" className="section dark">
            <div className="container">
              <div className="section-intro">
                <div className="eyebrow">
                  <ShieldCheck size={16} /> {t.home.safetyEyebrow}
                </div>
                <h2>{t.home.safetyTitle}</h2>
                <p>{t.home.safetySubtitle}</p>
              </div>

              <div className="safety-grid">
                {t.home.safetyRules.map((rule, idx) => (
                  <article className="safety-card" key={idx}>
                    <div className="safety-num">0{idx + 1}</div>
                    <div className="safety-content">
                      <h3>{rule.title}</h3>
                      <p>{rule.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 8: FAQ Preview */}
          <section id="faq" className="section">
            <div className="container">
              <div className="section-intro">
                <div className="eyebrow">
                  <HelpCircle size={16} /> {t.home.faqEyebrow}
                </div>
                <h2>{t.home.faqTitle}</h2>
                <p>{t.home.faqSubtitle}</p>
              </div>

              <div className="faq-list">
                {FAQ_PREVIEW_INDICES.map((faqIdx, previewIdx) => {
                  const faq = t.home.faqs[faqIdx];
                  if (!faq) return null;
                  const isOpen = openFaqIdx === previewIdx;
                  return (
                    <div className="faq-item" key={faqIdx}>
                      <button
                        type="button"
                        className="faq-question"
                        onClick={() => setOpenFaqIdx(isOpen ? null : previewIdx)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'open' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="faq-answer">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="faq-preview-cta">
                <a href="/narmada-parikrama/faq/" className="primary">
                  {viewAllFaqsText} <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </section>

          {/* Inter-linking between Canonical Pages */}
          <RelatedLinks targets={['parikrama', 'route', 'places', 'byCar', 'trips']} />

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
    </div>
  );
}
