import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  Clock3,
  IndianRupee,
  MapPin,
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

interface TripsPageProps {
  openPlanner: () => void;
}

export function TripsPage({ openPlanner }: TripsPageProps) {
  const { t } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState<'route1' | 'route2'>('route1');

  const currentItinerary =
    selectedRoute === 'route1'
      ? t.trips.itineraryRoute1 || t.trips.itinerary
      : t.trips.itineraryRoute2 || t.trips.itinerary;

  const tripList = [
    {
      id: 1,
      batch: t.trips.batch1Name,
      depart: t.trips.batch1Depart,
      month: t.trips.batch1Month,
      returnDate: t.trips.batch1Return,
    },
    {
      id: 2,
      batch: t.trips.batch2Name,
      depart: t.trips.batch2Depart,
      month: t.trips.batch2Month,
      returnDate: t.trips.batch2Return,
    },
  ];

  return (
    <div className="trips-page">
      <Breadcrumbs
        items={[
          { key: 'home', href: '/' },
          { key: 'parikrama', href: '/narmada-parikrama/' },
          { key: 'trips' },
        ]}
      />

      <div className="site">
        <main>
          <section className="hero">
            <div className="hero-glow" />
            <div className="eyebrow">
              <Sparkles size={15} /> {t.trips.heroEyebrow}
            </div>
            <h1>
              {t.trips.heroTitle}
              <em>{t.trips.heroTitleHighlight}</em>
            </h1>
            <p>{t.trips.heroDesc}</p>
            <a className="hero-cta" href="#departures">
              {t.trips.heroCta} <ArrowRight size={17} />
            </a>
          </section>

          <section className="section" id="departures">
            <div className="section-heading">
              <div>
                <span className="kicker">{t.trips.departuresEyebrow}</span>
                <h2>
                  {t.trips.departuresTitle}
                  <em>{t.trips.departuresTitleHighlight}</em>
                </h2>
              </div>
              <p>{t.trips.departuresDesc}</p>
            </div>
            <div className="trip-grid">
              {tripList.map((trip) => (
                <article className="trip-card" key={trip.id}>
                  <div className="trip-top">
                    <span className="batch">{trip.batch}</span>
                    <span className="year">2026</span>
                  </div>
                  <div className="date-row">
                    <div className="date-block">
                      <CalendarDays />
                      <strong>{trip.depart}</strong>
                      <span>{trip.month}</span>
                    </div>
                    <ArrowRight className="date-arrow" />
                    <div className="date-block return">
                      <CalendarDays />
                      <strong>{trip.returnDate}</strong>
                      <span>{t.trips.returnLabel}</span>
                    </div>
                  </div>
                  <div className="details">
                    <div>
                      <Clock3 />
                      <span>
                        {t.trips.durationLabel}
                        <strong>{t.trips.durationValue}</strong>
                      </span>
                    </div>
                    <div>
                      <MapPin />
                      <span>
                        {t.trips.departureLabel}
                        <strong>{t.trips.departureValue}</strong>
                      </span>
                    </div>
                    <div>
                      <IndianRupee />
                      <span>
                        {t.trips.costLabel}
                        <strong>{t.trips.costValue}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="availability">{t.trips.availability}</div>
                  <a
                    className="card-cta"
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      openPlanner();
                    }}
                  >
                    {t.trips.bookBtn} <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
            <div className="included">
              <span>{t.trips.includedKicker}</span>
              <p>{t.trips.includedText}</p>
            </div>
            <p className="note">{t.trips.priceNote}</p>
          </section>

          {/* Section 12: 18-Day Vehicle Yatra Itinerary */}
          <section className="section itinerary-section">
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

            <div className="container" style={{ marginBottom: 30 }}>
              <div className="route-disclaimer">
                <AlertTriangle size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} />
                {t.trips.itineraryDisclaimer}
              </div>
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
          </section>

          <section className="booking" id="booking">
            <div>
              <span className="kicker">{t.trips.bookingEyebrow}</span>
              <h2>
                {t.trips.bookingTitle}
                <em>{t.trips.bookingTitleHighlight}</em>
              </h2>
              <p>{t.trips.bookingDesc}</p>
              <ContactDetails />
            </div>
            <a
              href="#contact"
              className="hero-cta"
              onClick={(e) => {
                e.preventDefault();
                openPlanner();
              }}
            >
              {t.trips.enquireBtn} <ArrowRight size={17} />
            </a>
          </section>

          {/* Related Links */}
          <RelatedLinks targets={['byCar', 'route', 'places', 'parikrama']} />

          <section id="contact" className="section contact-section">
            <div className="section-heading centered">
              <span className="kicker">{t.trips.contactEyebrow}</span>
              <h2>
                {t.trips.contactTitle}
                <em>{t.trips.contactTitleHighlight}</em>
              </h2>
              <p>{t.trips.contactDesc}</p>
              <ContactDetails />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
