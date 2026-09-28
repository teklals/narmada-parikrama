import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Globe,
  IndianRupee,
  MapPin,
  MapPinned,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import './trips.css';
import {
  LANGUAGES,
  LanguageProvider,
  useLanguage,
} from './translations';

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

function LanguageDropdown() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [open]);

  const currentOpt = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[1];

  return (
    <div className="lang-dropdown-container" ref={containerRef}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Globe size={15} className="lang-globe-icon" />
        <span className="lang-current-flag">{currentOpt.flag}</span>
        <span className="lang-current-label">{currentOpt.label}</span>
        <ChevronDown size={14} className={`lang-chevron ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="lang-menu" role="menu" aria-label="Language selection">
          {LANGUAGES.map((opt) => (
            <button
              key={opt.code}
              type="button"
              className={`lang-option ${lang === opt.code ? 'active' : ''}`}
              onClick={() => {
                setLang(opt.code);
                setOpen(false);
              }}
              role="menuitem"
            >
              <span className="lang-flag">{opt.flag}</span>
              <span className="lang-name">{opt.label}</span>
              {lang === opt.code && <Check size={14} className="lang-check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface HeaderProps {
  isTrips: boolean;
  openPlanner: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  menuOpen: boolean;
}

function Header({ isTrips, openPlanner, openMenu, closeMenu, menuOpen }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="container nav-wrap">
        <a className="brand" href={isTrips ? '/' : '#home'} aria-label="Narmada Parikrama Home">
          <span className="brand-mark">ॐ</span>
          <span>
            Narmada<br />
            <b>Parikrama</b>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a className={!isTrips ? 'active' : ''} href={isTrips ? '/' : '#home'}>
            {t.nav.home}
          </a>
          <a href={isTrips ? '/#about' : '#about'}>{t.nav.about}</a>
          <a href={isTrips ? '/#parikrama' : '#parikrama'}>{t.nav.parikrama}</a>
          <a href={isTrips ? '/#places' : '#places'}>{t.nav.places}</a>
          <a href={isTrips ? '/#gallery' : '#gallery'}>{t.nav.gallery}</a>
          <a href={isTrips ? '/#contact' : '#contact'}>{t.nav.contact}</a>
          <a className={isTrips ? 'active' : ''} href="/trips">
            {t.nav.trips}
          </a>
        </nav>

        <div className="header-actions">
          <LanguageDropdown />
          <button type="button" className="demo" onClick={openPlanner}>
            {t.nav.planYatra}
          </button>
          <button
            type="button"
            className="hamburger-btn"
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isTrips: boolean;
  openPlanner: () => void;
}

function MobileDrawer({ isOpen, onClose, isTrips, openPlanner }: MobileDrawerProps) {
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    const origTouch = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = origOverflow;
      document.body.style.touchAction = origTouch;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="mobile-menu-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        id="mobile-nav-panel"
        className="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer-header">
          <a
            className="brand"
            href={isTrips ? '/' : '#home'}
            onClick={onClose}
          >
            <span className="brand-mark">ॐ</span>
            <span>
              Narmada<br />
              <b>Parikrama</b>
            </span>
          </a>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          {/* Language Selection Grid */}
          <div className="mobile-lang-section">
            <span className="mobile-lang-title">{t.nav.selectLanguage}</span>
            <div className="mobile-lang-grid">
              {LANGUAGES.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  className={`mobile-lang-option ${lang === opt.code ? 'active' : ''}`}
                  onClick={() => setLang(opt.code)}
                >
                  <span className="lang-flag">{opt.flag}</span>
                  <span className="lang-label">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-nav-links" aria-label="Mobile links">
            <a
              className={`mobile-nav-item ${!isTrips ? 'active' : ''}`}
              href={isTrips ? '/' : '#home'}
              onClick={onClose}
            >
              {t.nav.home}
            </a>
            <a
              className="mobile-nav-item"
              href={isTrips ? '/#about' : '#about'}
              onClick={onClose}
            >
              {t.nav.about}
            </a>
            <a
              className="mobile-nav-item"
              href={isTrips ? '/#parikrama' : '#parikrama'}
              onClick={onClose}
            >
              {t.nav.parikrama}
            </a>
            <a
              className="mobile-nav-item"
              href={isTrips ? '/#places' : '#places'}
              onClick={onClose}
            >
              {t.nav.places}
            </a>
            <a
              className="mobile-nav-item"
              href={isTrips ? '/#gallery' : '#gallery'}
              onClick={onClose}
            >
              {t.nav.gallery}
            </a>
            <a
              className="mobile-nav-item"
              href={isTrips ? '/#contact' : '#contact'}
              onClick={onClose}
            >
              {t.nav.contact}
            </a>
            <a
              className={`mobile-nav-item ${isTrips ? 'active' : ''}`}
              href="/trips"
              onClick={onClose}
            >
              {t.nav.trips}
            </a>
          </nav>

          <button
            type="button"
            className="primary mobile-drawer-cta"
            onClick={() => {
              onClose();
              openPlanner();
            }}
          >
            {t.nav.planYatra} <ArrowRight size={18} />
          </button>
        </div>

        <div className="mobile-drawer-footer">
          <a href="tel:+919958503108">📞 {CONTACT_PHONE_1}</a>
          <a href="tel:+919315852737">📞 {CONTACT_PHONE_2}</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>✉ {CONTACT_EMAIL}</a>
        </div>
      </div>
    </>
  );
}

interface PlanModalProps {
  onClose: () => void;
}

function PlanModal({ onClose }: PlanModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      newErrors.name = t.modal.errNameReq;
    } else if (trimmedName.length < 2) {
      newErrors.name = t.modal.errNameMin;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = t.modal.errEmailReq;
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = t.modal.errEmailValid;
    }

    if (!trimmedPhone) {
      newErrors.phone = t.modal.errPhoneReq;
    } else if (trimmedPhone.length < 7) {
      newErrors.phone = t.modal.errPhoneValid;
    }

    if (!trimmedMessage) {
      newErrors.message = t.modal.errMessageReq;
    } else if (trimmedMessage.length < 5) {
      newErrors.message = t.modal.errMessageMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || status === 'submitting') return;

    setStatus('submitting');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage(data.message || t.modal.successDefault);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setErrors({});
      } else {
        setStatus('error');
        setStatusMessage(data.error || t.modal.errorDefault);
      }
    } catch {
      setStatus('error');
      setStatusMessage(t.modal.errorDefault);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.currentTarget === e.target && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <form className="modal" onSubmit={handleSubmit} noValidate>
        <div className="modal-header">
          <h2 id="modal-title">{t.modal.title}</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label={t.modal.closeAria}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-contact-box">
            <ContactDetails />
          </div>

          {status === 'success' && (
            <div className="form-alert success" role="alert">
              {statusMessage}
            </div>
          )}

          {status === 'error' && (
            <div className="form-alert error" role="alert">
              {statusMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="contact-name">
              {t.modal.nameLabel} <span className="req">*</span>
            </label>
            <input
              id="contact-name"
              className={`modal-input ${errors.name ? 'has-error' : ''}`}
              placeholder={t.modal.namePlaceholder}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              disabled={status === 'submitting'}
              autoComplete="name"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">
              {t.modal.emailLabel} <span className="req">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              className={`modal-input ${errors.email ? 'has-error' : ''}`}
              placeholder={t.modal.emailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              disabled={status === 'submitting'}
              autoComplete="email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact-phone">
              {t.modal.phoneLabel} <span className="req">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              className={`modal-input ${errors.phone ? 'has-error' : ''}`}
              placeholder={t.modal.phonePlaceholder}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              disabled={status === 'submitting'}
              autoComplete="tel"
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">
              {t.modal.messageLabel} <span className="req">*</span>
            </label>
            <textarea
              id="contact-message"
              className={`modal-textarea ${errors.message ? 'has-error' : ''}`}
              placeholder={t.modal.messagePlaceholder}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors({ ...errors, message: '' });
              }}
              disabled={status === 'submitting'}
            />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="submit"
            className="modal-submit-btn"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <Clock3 className="spin" size={18} style={{ marginRight: 8 }} />
                {t.modal.submittingBtn}
              </>
            ) : (
              t.modal.submitBtn
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function HomePage({ openPlanner }: { openPlanner: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="site">
      <main>
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
              <p>{t.home.heroDesc}</p>
              <div className="actions">
                <a className="primary" href="#parikrama">
                  {t.home.exploreBtn} <ArrowRight size={18} />
                </a>
                <a className="secondary" href="#places">
                  {t.home.placesBtn}
                </a>
              </div>
              <div className="stats">
                <div>
                  <strong>{t.home.stat1Number}</strong>
                  <small>{t.home.stat1Label}</small>
                </div>
                <div>
                  <strong>{t.home.stat2Number}</strong>
                  <small>{t.home.stat2Label}</small>
                </div>
                <div>
                  <strong>{t.home.stat3Number}</strong>
                  <small>{t.home.stat3Label}</small>
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

        <section id="about" className="section">
          <div className="container two">
            <div>
              <div className="eyebrow">
                <Sparkles size={16} /> {t.home.aboutEyebrow}
              </div>
              <h2>{t.home.aboutTitle}</h2>
            </div>
            <p className="lead">{t.home.aboutLead}</p>
          </div>
        </section>

        <section id="parikrama" className="section dark">
          <div className="container">
            <div className="center">
              <div className="eyebrow">{t.home.parikramaEyebrow}</div>
              <h2>{t.home.parikramaTitle}</h2>
              <p>{t.home.parikramaDesc}</p>
            </div>
            <div className="cards">
              <article>
                <span>01</span>
                <h3>{t.home.step1Title}</h3>
                <p>{t.home.step1Desc}</p>
              </article>
              <article>
                <span>02</span>
                <h3>{t.home.step2Title}</h3>
                <p>{t.home.step2Desc}</p>
              </article>
              <article>
                <span>03</span>
                <h3>{t.home.step3Title}</h3>
                <p>{t.home.step3Desc}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="places" className="section">
          <div className="container center">
            <div className="eyebrow">{t.home.placesEyebrow}</div>
            <h2>{t.home.placesTitle}</h2>
            <p>{t.home.placesDesc}</p>
          </div>
        </section>

        <section id="gallery" className="section gallery">
          <div className="container center">
            <div className="eyebrow">{t.home.galleryEyebrow}</div>
            <h2>{t.home.galleryTitle}</h2>
            <div className="gallery-grid">
              <div />
              <div />
              <div />
            </div>
          </div>
        </section>

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

      <footer>
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">ॐ</span>
              <span>
                Narmada<br />
                <b>Parikrama</b>
              </span>
            </div>
            <p>{t.home.footerTagline}</p>
            <ContactDetails />
          </div>
          <div>
            <h4>{t.home.footerExplore}</h4>
            <a href="#home">{t.nav.home}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#parikrama">{t.nav.parikrama}</a>
            <a href="#places">{t.nav.places}</a>
            <a href="#gallery">{t.nav.gallery}</a>
            <a href="/trips">{t.nav.trips}</a>
          </div>
          <div>
            <h4>{t.home.footerJourney}</h4>
            <a href="#parikrama">{t.home.footerRoutePlanning}</a>
            <a href="#places">{t.home.footerSacredPlaces}</a>
            <a href="/trips">{t.home.footerTrips}</a>
          </div>
        </div>
        <div className="container bottom">{t.home.footerRights}</div>
      </footer>
    </div>
  );
}

function TripsPage({ openPlanner }: { openPlanner?: () => void }) {
  const { t } = useLanguage();

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
                      if (openPlanner) {
                        e.preventDefault();
                        openPlanner();
                      }
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

          <section className="section itinerary-section">
            <div className="section-heading centered">
              <span className="kicker">{t.trips.itineraryEyebrow}</span>
              <h2>
                {t.trips.itineraryTitle}
                <em>{t.trips.itineraryTitleHighlight}</em>
              </h2>
              <p>{t.trips.itineraryDesc}</p>
            </div>
            <div className="timeline">
              {t.trips.itinerary.map((item) => (
                <div className="timeline-item" key={item.day}>
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
                if (openPlanner) {
                  e.preventDefault();
                  openPlanner();
                }
              }}
            >
              {t.trips.enquireBtn} <ArrowRight size={17} />
            </a>
          </section>

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
        <footer>
          <div className="footer-brand">
            {t.trips.footerBrandText}
          </div>
          <p>{t.trips.footerTagline}</p>
          <ContactDetails />
          <small>{t.trips.footerRights}</small>
        </footer>
      </div>
    </div>
  );
}

function MainApp() {
  const [path, setPath] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const isTrips = path === '/trips' || path === '/trips/' || path.startsWith('/trips');

  return (
    <>
      <Header
        isTrips={isTrips}
        openPlanner={() => setPlannerOpen(true)}
        openMenu={() => setMenuOpen(true)}
        closeMenu={() => setMenuOpen(false)}
        menuOpen={menuOpen}
      />
      {isTrips ? (
        <TripsPage openPlanner={() => setPlannerOpen(true)} />
      ) : (
        <HomePage openPlanner={() => setPlannerOpen(true)} />
      )}
      <MobileDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        isTrips={isTrips}
        openPlanner={() => {
          setMenuOpen(false);
          setPlannerOpen(true);
        }}
      />
      {plannerOpen && <PlanModal onClose={() => setPlannerOpen(false)} />}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
