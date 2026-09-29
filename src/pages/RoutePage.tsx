import React from 'react';
import { ArrowRight, Compass, Info, Sparkles } from 'lucide-react';
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

interface RoutePageProps {
  openPlanner: () => void;
}

export function RoutePage({ openPlanner }: RoutePageProps) {
  const { lang, t } = useLanguage();

  return (
    <div className="site">
      <Breadcrumbs
        items={[
          { key: 'home', href: '/' },
          { key: 'parikrama', href: '/narmada-parikrama/' },
          { key: 'route' },
        ]}
      />

      <main>
        <header className="subpage-hero">
          <div className="container">
            <div className="eyebrow">
              <Compass size={16} /> {t.home.routeEyebrow}
            </div>
            <h1>{t.home.routeTitle}</h1>
            <p className="subpage-lead">{t.home.routeSubtitle}</p>
          </div>
        </header>

        {/* Route Section */}
        <section id="route" className="section dark" style={{ paddingTop: 36 }}>
          <div className="container">
            <div className="route-disclaimer">
              <Info size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} />
              {t.home.routeDisclaimer}
            </div>

            <div className="route-timeline-grid">
              {t.home.routeStops.map((stop) => (
                <article className="route-card" key={stop.step}>
                  <div className="route-card-top">
                    <span className="route-step-num">{stop.step}</span>
                    <span className="route-state-badge">{stop.state}</span>
                  </div>
                  <h3>{stop.title}</h3>
                  <p>{stop.desc}</p>
                  <div className="route-highlight-tag">
                    <Sparkles size={13} /> {stop.highlight}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <RelatedLinks targets={['places', 'byCar', 'trips', 'parikrama']} />

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
