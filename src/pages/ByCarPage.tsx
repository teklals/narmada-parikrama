import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, Car, Info } from 'lucide-react';
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

interface ByCarPageProps {
  openPlanner: () => void;
}

export function ByCarPage({ openPlanner }: ByCarPageProps) {
  const { lang, t } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState<'route1' | 'route2'>('route1');

  const currentItinerary =
    selectedRoute === 'route1'
      ? t.trips.itineraryRoute1 || t.trips.itinerary
      : t.trips.itineraryRoute2 || t.trips.itinerary;

  return (
    <div className="site">
      <Breadcrumbs
        items={[
          { key: 'home', href: '/' },
          { key: 'parikrama', href: '/narmada-parikrama/' },
          { key: 'byCar' },
        ]}
      />

      <main>
        <header className="subpage-hero">
          <div className="container">
            <div className="eyebrow">
              <Car size={16} />{' '}
              {lang === 'hi'
                ? 'प्रस्तावित 18-दिवसीय वाहन यात्रा'
                : lang === 'mr'
                ? 'नियोजित १८-दिवसीय वाहन यात्रा'
                : lang === 'gu'
                ? 'પ્રસ્તાવિત ૧૮-દિવસીય વાહન યાત્રા'
                : 'Proposed 18-Day Vehicle Circuit'}
            </div>
            <h1>
              {lang === 'hi'
                ? '18-दिवसीय कार से नर्मदा परिक्रमा'
                : lang === 'mr'
                ? '१८-दिवसीय कारने नर्मदा परिक्रमा'
                : lang === 'gu'
                ? '૧૮-દિવસીય કાર દ્વારા નર્મદા પરિક્રમા'
                : '18-Day Narmada Parikrama by Car'}
            </h1>
            <p className="subpage-lead">
              {lang === 'hi'
                ? 'सीमित समय वाले श्रद्धालुओं एवं वरिष्ठ परिजनों के लिए प्रस्तावित 18-दिवसीय सड़क मार्ग परिक्रमा, तुलना, रूट विकल्प और व्यावहारिक दिशा-निर्देश।'
                : lang === 'mr'
                ? 'मर्यादित वेळेत परिक्रमा करू इच्छिणाऱ्या भाविकांसाठी आणि ज्येष्ठ नागरिकांसाठी नियोजित १८ दिवसांचा रस्ते प्रवास कार्यक्रम व मार्गदर्शक सूचना.'
                : lang === 'gu'
                ? 'મર્યાદિત સમયવાળા યાત્રાળુઓ અને વરિષ્ઠ સ્વજનો માટે પ્રસ્તાવિત ૧૮-દિવસીય સડક માર્ગ પરિક્રમા, તુલના, રૂટ વિકલ્પ અને માર્ગદર્શન.'
                : 'A thoughtfully proposed 18-day driving circuit covering the entire holy Narmada Parikrama for devotees with limited time or senior family members.'}
            </p>
          </div>
        </header>

        {/* Proposed Circuit Notice Callout */}
        <div className="container" style={{ marginTop: 32, marginBottom: 10 }}>
          <div className="route-disclaimer">
            <Info size={20} style={{ display: 'inline', marginRight: 10, verticalAlign: 'text-bottom' }} />
            <span>
              <strong>
                {lang === 'hi'
                  ? 'प्रस्तावित यात्रा सूचना: '
                  : lang === 'mr'
                  ? 'प्रस्तावित यात्रा सूचना: '
                  : lang === 'gu'
                  ? 'પ્રસ્તાવિત યાત્રા સૂચના: '
                  : 'Proposed Pilgrimage Notice: '}
              </strong>
              {lang === 'hi'
                ? 'यह 18-दिवसीय वाहन कार्यक्रम एक स्वतंत्र प्रस्तावित यात्रा योजना है। पारंपरिक नर्मदा परिक्रमा लगभग 3,300–3,500 किमी पैदल चलकर लगभग 5 माह में पूर्ण की जाती है। सीमित समय और पारिवारिक आवश्यकताओं के अनुसार श्रद्धालु वाहन द्वारा प्रमुख तीर्थों का दर्शन करते हैं। सड़क की स्थिति और स्थानीय परिस्थितियों के अनुसार इस कार्यक्रम में संशोधन संभव है।'
                : lang === 'mr'
                ? 'हा १८-दिवसांचा वाहन कार्यक्रम एक स्वतंत्र नियोजित प्रवास आराखडा आहे. पारंपरिक नर्मदा परिक्रमा सुमारे ३,३००–३,५०० किमी पायी चालून सुमारे ५ महिन्यांत पूर्ण होते. वेळेच्या मर्यादेमुळे अनेक भाविक वाहनाने दर्शन घेतात. स्थानिक परिस्थितीनुसार या कार्यक्रमात बदल होऊ शकतो.'
                : lang === 'gu'
                ? 'આ ૧૮-દિવસીય વાહન કાર્યક્રમ એક સ્વતંત્ર પ્રસ્તાવિત યાત્રા યોજના છે. પરંપરાગત નર્મદા પરિક્રમા આશરે ૩,૩૦૦–૩,૫૦૦ કિમી પગપાળા ચાલી ૫ મહિનામાં પૂર્ણ થાય છે. સમયની મર્યાદાને લીધે શ્રદ્ધાળુઓ વાહન દ્વારા મુખ્ય તીર્થોના દર્શન કરે છે.'
                : 'This 18-day vehicle itinerary is an independent proposed travel plan designed for pilgrims seeking a comfortable driving journey. Traditional Narmada Parikrama is walked on foot over ~3,500 km over ~5 months. Devotees may adapt this itinerary based on road conditions, daylight, and physical pace.'}
            </span>
          </div>
        </div>

        {/* Walking vs Car Comparison Table */}
        <section id="compare" className="section dark" style={{ paddingTop: 30 }}>
          <div className="container">
            <div className="section-intro">
              <div className="eyebrow">
                <Info size={16} /> {t.home.compareEyebrow}
              </div>
              <h2>{t.home.compareTitle}</h2>
              <p>{t.home.compareSubtitle}</p>
            </div>

            <div className="compare-table-container">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>{t.home.compareHeaders.aspect}</th>
                    <th>{t.home.compareHeaders.walking}</th>
                    <th>{t.home.compareHeaders.vehicle}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.home.comparisonRows.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{row.aspect}</strong>
                      </td>
                      <td className="compare-col-walk">{row.walking}</td>
                      <td className="compare-col-veh">{row.vehicle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="compare-note-box">
              <strong>{t.home.compareNote}</strong>
            </div>
          </div>
        </section>

        {/* 18-Day Vehicle Itineraries (Route 1 and Route 2) */}
        <section className="section itinerary-section" style={{ paddingTop: 36 }}>
          <div className="container">
            <div className="section-heading centered">
              <span className="kicker">{t.trips.itineraryEyebrow}</span>
              <h2>
                {t.trips.itineraryTitle}
                <em>{t.trips.itineraryTitleHighlight}</em>
              </h2>
              <p>{t.trips.itineraryDesc}</p>
            </div>

            <div className="route-selector-bar">
              <button
                type="button"
                className={`route-selector-btn ${selectedRoute === 'route1' ? 'active' : ''}`}
                onClick={() => setSelectedRoute('route1')}
                aria-pressed={selectedRoute === 'route1'}
              >
                {t.trips.route1Label || 'Route 1'}
              </button>
              <button
                type="button"
                className={`route-selector-btn ${selectedRoute === 'route2' ? 'active' : ''}`}
                onClick={() => setSelectedRoute('route2')}
                aria-pressed={selectedRoute === 'route2'}
              >
                {t.trips.route2Label || 'Route 2'}
              </button>
            </div>

            <div className="route-disclaimer" style={{ marginBottom: 30 }}>
              <AlertTriangle size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} />
              {t.trips.itineraryDisclaimer}
            </div>

            <div className="timeline">
              {currentItinerary.map((item) => (
                <div className="timeline-item" key={`${selectedRoute}-${item.day}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-day">{item.day}</div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <RelatedLinks targets={['trips', 'route', 'places', 'parikrama']} />

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
