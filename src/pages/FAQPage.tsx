import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedLinks } from '../components/RelatedLinks';

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

interface FAQPageProps {
  openPlanner: () => void;
}

export function FAQPage({ openPlanner }: FAQPageProps) {
  const { lang, t } = useLanguage();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const heroEyebrow =
    lang === 'hi'
      ? 'जिज्ञासा एवं समाधान'
      : lang === 'mr'
      ? 'वारंवार विचारले जाणारे प्रश्न'
      : lang === 'gu'
      ? 'વારંવાર પૂછાતા પ્રશ્નો'
      : 'QUESTIONS & CLARIFICATIONS';

  const heroTitle =
    lang === 'hi'
      ? 'नर्मदा परिक्रमा प्रश्नोत्तरी (FAQ)'
      : lang === 'mr'
      ? 'नर्मदा परिक्रमा नेहमी विचारले जाणारे प्रश्न (FAQ)'
      : lang === 'gu'
      ? 'નર્મદા પરિક્રમા સામાન્ય પ્રશ્નોત્તરી (FAQ)'
      : 'Narmada Parikrama FAQ';

  const heroTitleHighlight =
    lang === 'hi'
      ? 'मार्ग, नियम, आवास व तैयारी'
      : lang === 'mr'
      ? 'मार्ग, नियम, मुक्काम आणि तयारी'
      : lang === 'gu'
      ? 'માર્ગ, નિયમ, આવાસ અને તૈયારી'
      : 'Routes, Stay, Food & Travel';

  const heroDesc =
    lang === 'hi'
      ? 'माँ नर्मदा परिक्रमा की कुल दूरी, समय, पैदल बनाम वाहन यात्रा, पवित्र आश्रमों में ठहरने, सात्विक भोजन, आवश्यक सामान और वरिष्ठ नागरिकों के लिए 15 प्रामाणिक प्रश्नों के विस्तृत उत्तर।'
      : lang === 'mr'
      ? 'नर्मदा परिक्रमेचे अंतर, कालावधी, पायी वि. वाहन यात्रा, मुक्काम, सात्त्विक भोजन आणि ज्येष्ठ नागरिकांच्या नियोजनाविषयी १५ महत्त्वाच्या प्रश्नांची उत्तरे.'
      : lang === 'gu'
      ? 'માઁ નર્મદા પરિક્રમાનું કુલ અંતર, સમયગાળો, પદયાત્રા વિ. વાહન યાત્રા, પવિત્ર આશ્રમોમાં આવાસ, ભોજન અને વરિષ્ઠ નાગરિકો માટે ૧૫ પ્રામાણિક પ્રશ્નોના ઉત્તર.'
      : 'Authentic answers to 15 essential questions about Narmada Parikrama: total distance, duration, walking vs vehicle yatra, ashram stays, food availability, difficult sections, and senior citizen travel.';

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="faq-page">
      <Breadcrumbs
        items={[
          { key: 'home', href: '/' },
          { key: 'parikrama', href: '/narmada-parikrama/' },
          { key: 'faq' },
        ]}
      />

      <div className="site">
        <main>
          {/* FAQ Hero */}
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <div className="eyebrow">
                  <HelpCircle size={16} /> {heroEyebrow}
                </div>
                <h1>
                  {heroTitle} — <span>{heroTitleHighlight}</span>
                </h1>
                <div className="hero-subtitle">
                  {lang === 'hi'
                    ? 'परिक्रमार्थियों के 15 सबसे महत्वपूर्ण प्रश्नों के प्रमाणिक उत्तर'
                    : lang === 'mr'
                    ? 'परिक्रमार्थ्‍यांच्या १५ अत्यंत महत्त्वाच्या प्रश्नांची उत्तरे'
                    : lang === 'gu'
                    ? 'પરિક્રમાર્થીઓના ૧૫ સૌથી મહત્વપૂર્ણ પ્રશ્નોના પ્રામાણિક ઉત્તર'
                    : '15 essential questions answered for prospective parikrama pilgrims'}
                </div>
                <p>{heroDesc}</p>
                <div className="actions">
                  <a className="primary" href="#faq-list">
                    {lang === 'hi'
                      ? 'सभी 15 प्रश्न देखें'
                      : lang === 'mr'
                      ? 'सर्व १५ प्रश्न पहा'
                      : lang === 'gu'
                      ? 'બધા ૧૫ પ્રશ્નો જુઓ'
                      : 'View All 15 Questions'}{' '}
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

          {/* Anchor */}
          <div id="faq" className="nav-anchor" />

          {/* 15 FAQ Accordion Section */}
          <section id="faq-list" className="section">
            <div className="container">
              <div className="section-intro">
                <div className="eyebrow">
                  <HelpCircle size={16} /> {t.home.faqEyebrow}
                </div>
                <h2>{t.home.faqTitle}</h2>
                <p>{t.home.faqSubtitle}</p>
              </div>

              <div className="faq-list" role="region" aria-label="Frequently Asked Questions Accordion">
                {t.home.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  const itemNumber = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
                  return (
                    <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                      <button
                        type="button"
                        className="faq-question"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${idx}`}
                        id={`faq-question-${idx}`}
                      >
                        <span style={{ display: 'flex', alignItems: 'flex-start', gap: 12, textAlign: 'left' }}>
                          <span
                            style={{
                              color: '#C9953D',
                              fontWeight: 700,
                              fontSize: 14,
                              minWidth: 24,
                              paddingTop: 2,
                            }}
                          >
                            {itemNumber}.
                          </span>
                          <span>{faq.q}</span>
                        </span>
                        <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'open' : ''}`} />
                      </button>
                      {isOpen && (
                        <div
                          className="faq-answer"
                          id={`faq-answer-${idx}`}
                          role="region"
                          aria-labelledby={`faq-question-${idx}`}
                        >
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Inter-linking between Canonical Pages */}
          <RelatedLinks targets={['parikrama', 'travelGuide', 'route', 'places', 'byCar', 'trips']} />

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
