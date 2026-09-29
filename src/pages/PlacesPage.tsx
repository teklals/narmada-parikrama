import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
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

interface PlacesPageProps {
  openPlanner: () => void;
}

export function PlacesPage({ openPlanner }: PlacesPageProps) {
  const { t } = useLanguage();
  const [placesFilter, setPlacesFilter] = useState<'all' | 'mp' | 'mh' | 'gj'>('all');

  const filteredPlaces = t.home.places.filter((p) => {
    if (placesFilter === 'all') return true;
    if (placesFilter === 'mp') {
      return [
        'amarkantak',
        'narmada-kund',
        'sonmuda',
        'kapildhara',
        'doodh-dhara',
        'mandla',
        'jabalpur',
        'gwarighat',
        'bhedaghat',
        'narmadapuram',
        'omkareshwar',
        'maheshwar',
        'barwani',
      ].includes(p.id);
    }
    if (placesFilter === 'mh') {
      return ['shoolpani', 'maharashtra-section'].includes(p.id);
    }
    if (placesFilter === 'gj') {
      return ['poicha', 'kevadia', 'rajpipla', 'ankleshwar', 'bharuch'].includes(p.id);
    }
    return true;
  });

  return (
    <div className="site">
      <Breadcrumbs
        items={[
          { key: 'home', href: '/' },
          { key: 'parikrama', href: '/narmada-parikrama/' },
          { key: 'places' },
        ]}
      />

      <main>
        <header className="subpage-hero">
          <div className="container">
            <div className="eyebrow">
              <MapPin size={16} /> {t.home.placesEyebrow}
            </div>
            <h1>{t.home.placesTitle}</h1>
            <p className="subpage-lead">{t.home.placesSubtitle}</p>
          </div>
        </header>

        {/* Places Page / Directory */}
        <section id="places" className="section" style={{ paddingTop: 36 }}>
          <div className="container">
            <div className="places-filter-bar">
              <button
                type="button"
                className={`places-filter-btn ${placesFilter === 'all' ? 'active' : ''}`}
                onClick={() => setPlacesFilter('all')}
              >
                {t.home.placesFilterAll}
              </button>
              <button
                type="button"
                className={`places-filter-btn ${placesFilter === 'mp' ? 'active' : ''}`}
                onClick={() => setPlacesFilter('mp')}
              >
                {t.home.placesFilterMP}
              </button>
              <button
                type="button"
                className={`places-filter-btn ${placesFilter === 'mh' ? 'active' : ''}`}
                onClick={() => setPlacesFilter('mh')}
              >
                {t.home.placesFilterMH}
              </button>
              <button
                type="button"
                className={`places-filter-btn ${placesFilter === 'gj' ? 'active' : ''}`}
                onClick={() => setPlacesFilter('gj')}
              >
                {t.home.placesFilterGJ}
              </button>
            </div>

            <div className="places-grid">
              {filteredPlaces.map((place) => (
                <article className="place-card" key={place.id}>
                  <div className="place-card-header">
                    <div>
                      <h3>{place.name}</h3>
                      <span className="place-badge">{place.badge}</span>
                    </div>
                    <span className="place-state">{place.state}</span>
                  </div>

                  <div className="place-info-block">
                    <span className="place-info-label">{t.home.placeLabels.significance}</span>
                    <p className="place-info-text">{place.significance}</p>
                  </div>

                  <div className="place-info-block">
                    <span className="place-info-label">{t.home.placeLabels.experience}</span>
                    <p className="place-info-text">{place.experience}</p>
                  </div>

                  <div className="place-info-block">
                    <span className="place-info-label">{t.home.placeLabels.duration}</span>
                    <p className="place-info-text">{place.duration}</p>
                  </div>

                  <div className="place-info-block">
                    <span className="place-info-label">{t.home.placeLabels.stay}</span>
                    <p className="place-info-text">{place.stay}</p>
                  </div>

                  <div className="place-info-block">
                    <span className="place-info-label">{t.home.placeLabels.food}</span>
                    <p className="place-info-text">{place.food}</p>
                  </div>

                  <div className="place-notes-box">
                    <strong>{t.home.placeLabels.notes}:</strong> {place.notes}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <RelatedLinks targets={['route', 'byCar', 'trips', 'parikrama']} />

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
