import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Globe,
  Menu,
  X,
} from 'lucide-react';
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import './trips.css';
import {
  LANGUAGES,
  LanguageProvider,
  useLanguage,
} from './translations';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ParikramaWhyPage = lazy(() => import('./pages/ParikramaWhyPage').then((m) => ({ default: m.ParikramaWhyPage })));
const RoutePage = lazy(() => import('./pages/RoutePage').then((m) => ({ default: m.RoutePage })));
const PlacesPage = lazy(() => import('./pages/PlacesPage').then((m) => ({ default: m.PlacesPage })));
const ByCarPage = lazy(() => import('./pages/ByCarPage').then((m) => ({ default: m.ByCarPage })));
const TravelGuidePage = lazy(() => import('./pages/TravelGuidePage').then((m) => ({ default: m.TravelGuidePage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then((m) => ({ default: m.FAQPage })));
const TripsPage = lazy(() => import('./pages/TripsPage').then((m) => ({ default: m.TripsPage })));

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

export type AppRoute = 'home' | 'parikrama' | 'route' | 'places' | 'byCar' | 'travelGuide' | 'faq' | 'trips';

export function getRouteFromPath(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/trips') return 'trips';
  if (clean === '/narmada-parikrama/faq') return 'faq';
  if (clean === '/narmada-parikrama/travel-guide') return 'travelGuide';
  if (clean === '/narmada-parikrama/route') return 'route';
  if (clean === '/narmada-parikrama/places') return 'places';
  if (clean === '/narmada-parikrama/by-car') return 'byCar';
  if (clean === '/narmada-parikrama') return 'parikrama';
  return 'home';
}

const PAGE_META: Record<
  AppRoute,
  {
    title: string;
    description: string;
    canonical: string;
  }
> = {
  home: {
    title: 'Narmada Parikrama | Complete Holy Pilgrimage Guide & Route',
    description:
      'Comprehensive guide to the holy Narmada Parikrama: route, sacred places, stay, food, travel advice, walking tips and vehicle yatra options across MP, MH & GJ.',
    canonical: 'https://narmadaparikrama.co.in/',
  },
  parikrama: {
    title: 'Narmada Parikrama | Why Do Narmada Parikrama? Spiritual Guide',
    description:
      'Understand why Narmada Parikrama is undertaken, its spiritual significance, religious traditions, devotion, discipline, pilgrimage and connection with Maa Narmada.',
    canonical: 'https://narmadaparikrama.co.in/narmada-parikrama/',
  },
  route: {
    title: 'Narmada Parikrama Route | 17 Key Stops & Complete Pilgrimage Path',
    description:
      'Explore the 17 key stops along the sacred Narmada Parikrama route from Amarkantak across Madhya Pradesh, Maharashtra, and Gujarat.',
    canonical: 'https://narmadaparikrama.co.in/narmada-parikrama/route/',
  },
  places: {
    title: 'Sacred Places on Narmada Parikrama | 20 Major Ghats & Temples',
    description:
      'Explore 20 sacred pilgrimage places, ghats, and temples along Narmada Parikrama across Madhya Pradesh, Maharashtra, and Gujarat with darshan information.',
    canonical: 'https://narmadaparikrama.co.in/narmada-parikrama/places/',
  },
  byCar: {
    title: 'Narmada Parikrama by Car | 18-Day Vehicle Route & Yatra Itinerary',
    description:
      'Plan your Narmada Parikrama by car or vehicle with our proposed 18-day itinerary, day-by-day stops, route comparison, driving tips and sacred darshan points.',
    canonical: 'https://narmadaparikrama.co.in/narmada-parikrama/by-car/',
  },
  travelGuide: {
    title: 'Narmada Parikrama Travel Guide | Stay, Food, Safety & Packing',
    description:
      'Essential practical guide for Narmada Parikrama: accommodation, ashrams, food, bhojanalayas, physical challenges, Shoolpani preparation, packing list and safety rules.',
    canonical: 'https://narmadaparikrama.co.in/narmada-parikrama/travel-guide/',
  },
  faq: {
    title: 'Narmada Parikrama FAQ | Routes, Stay, Food & Travel Questions',
    description:
      'Frequently asked questions about Narmada Parikrama: distance, duration, walking vs vehicle yatra, ashram stays, food, Shoolpani, senior citizens and 2026 batches.',
    canonical: 'https://narmadaparikrama.co.in/narmada-parikrama/faq/',
  },
  trips: {
    title: '18-Day Narmada Parikrama Vehicle Yatra 2026 | Packages & Batches',
    description:
      'Join our 18-day organized Narmada Parikrama vehicle pilgrimage for October & November 2026. Fixed batches, transparent pricing (₹51,000), sacred darshan and guidance.',
    canonical: 'https://narmadaparikrama.co.in/trips/',
  },
};

function updateHeadMeta(route: AppRoute) {
  if (typeof document === 'undefined') return;
  const meta = PAGE_META[route] || PAGE_META.home;
  document.title = meta.title;

  const setMeta = (nameOrProperty: string, attrName: 'name' | 'property', content: string) => {
    let el = document.querySelector(`meta[${attrName}="${nameOrProperty}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('description', 'name', meta.description);
  setMeta('og:title', 'property', meta.title);
  setMeta('og:description', 'property', meta.description);
  setMeta('og:url', 'property', meta.canonical);
  setMeta('twitter:title', 'name', meta.title);
  setMeta('twitter:description', 'name', meta.description);

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonical);
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
  currentRoute: AppRoute;
  openPlanner: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  menuOpen: boolean;
}

function Header({ currentRoute, openPlanner, openMenu, closeMenu, menuOpen }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="container nav-wrap">
        <a className="brand" href="/" aria-label="Narmada Parikrama Home">
          <span className="brand-mark">ॐ</span>
          <span>
            Narmada<br />
            <b>Parikrama</b>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a className={currentRoute === 'home' ? 'active' : ''} href="/">
            {t.nav.home}
          </a>
          <a className={currentRoute === 'parikrama' ? 'active' : ''} href="/narmada-parikrama/">
            {t.nav.parikrama}
          </a>
          <a className={currentRoute === 'places' ? 'active' : ''} href="/narmada-parikrama/places/">
            {t.nav.places}
          </a>
          <a className={currentRoute === 'route' ? 'active' : ''} href="/narmada-parikrama/route/">
            {t.nav.route}
          </a>
          <a className={currentRoute === 'travelGuide' ? 'active' : ''} href="/narmada-parikrama/travel-guide/">
            {t.nav.travelGuide}
          </a>
          <a className={currentRoute === 'trips' ? 'active' : ''} href="/trips/">
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
  currentRoute: AppRoute;
  openPlanner: () => void;
}

function MobileDrawer({ isOpen, onClose, currentRoute, openPlanner }: MobileDrawerProps) {
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
      <div className="mobile-menu-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        id="mobile-nav-panel"
        className="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer-header">
          <a className="brand" href="/" onClick={onClose}>
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
          <nav className="mobile-nav-links" aria-label="Mobile links">
            <a
              className={`mobile-nav-item ${currentRoute === 'home' ? 'active' : ''}`}
              href="/"
              onClick={onClose}
            >
              {t.nav.home}
            </a>
            <a
              className={`mobile-nav-item ${currentRoute === 'parikrama' ? 'active' : ''}`}
              href="/narmada-parikrama/"
              onClick={onClose}
            >
              {t.nav.parikrama}
            </a>
            <a
              className={`mobile-nav-item ${currentRoute === 'places' ? 'active' : ''}`}
              href="/narmada-parikrama/places/"
              onClick={onClose}
            >
              {t.nav.places}
            </a>
            <a
              className={`mobile-nav-item ${currentRoute === 'route' ? 'active' : ''}`}
              href="/narmada-parikrama/route/"
              onClick={onClose}
            >
              {t.nav.route}
            </a>
            <a
              className={`mobile-nav-item ${currentRoute === 'travelGuide' ? 'active' : ''}`}
              href="/narmada-parikrama/travel-guide/"
              onClick={onClose}
            >
              {t.nav.travelGuide}
            </a>
            <a
              className={`mobile-nav-item ${currentRoute === 'trips' ? 'active' : ''}`}
              href="/trips/"
              onClick={onClose}
            >
              {t.nav.trips}
            </a>
          </nav>

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
          <button type="submit" className="modal-submit-btn" disabled={status === 'submitting'}>
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

function SiteFooter() {
  const { t } = useLanguage();

  return (
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
          <a href="/">{t.nav.home}</a>
          <a href="/narmada-parikrama/">{t.nav.parikrama}</a>
          <a href="/narmada-parikrama/places/">{t.nav.places}</a>
          <a href="/narmada-parikrama/route/">{t.nav.route}</a>
          <a href="/narmada-parikrama/travel-guide/">{t.nav.travelGuide}</a>
          <a href="/narmada-parikrama/faq/">FAQ</a>
          <a href="/trips/">{t.nav.trips}</a>
        </div>
        <div>
          <h4>{t.home.footerJourney}</h4>
          <a href="/narmada-parikrama/route/">{t.home.footerRoutePlanning}</a>
          <a href="/narmada-parikrama/places/">{t.home.footerSacredPlaces}</a>
          <a href="/narmada-parikrama/by-car/">{t.nav.byCar || '18-Day Vehicle Yatra'}</a>
          <a href="/narmada-parikrama/travel-guide/#safety">{t.home.safetyTitle}</a>
          <a href="/narmada-parikrama/travel-guide/#checklist">{t.home.packingTitle}</a>
          <a href="/narmada-parikrama/faq/">{t.home.faqTitle || 'FAQ'}</a>
          <a href="/trips/">{t.home.footerTrips}</a>
        </div>
      </div>
      <div className="container bottom">
        <p className="footer-copyright">{t.home.footerRights}</p>
        <div className="footer-powered-by">
          <span className="powered-by-label">Powered by</span>
          <img
            src="/assets/logicbase-logo.png"
            alt="LogicBase Software Private Limited"
            className="powered-by-logo"
            width="155"
            height="52"
            loading="lazy"
            decoding="async"
          />
          <span className="powered-by-subtext">Software Private Limited</span>
        </div>
      </div>
    </footer>
  );
}

function MainApp() {
  const [path, setPath] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentRoute = getRouteFromPath(path);

  // Update document title, description, canonical link on route changes
  useEffect(() => {
    updateHeadMeta(currentRoute);
  }, [currentRoute]);

  // Handle popstate for browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Handle old bookmark / hash redirection on homepage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    const clean = window.location.pathname.replace(/\/+$/, '') || '/';
    if (clean === '/') {
      if (hash === '#parikrama' || hash === '#about') {
        window.history.replaceState({}, '', '/narmada-parikrama/');
        setPath('/narmada-parikrama/');
      } else if (hash === '#route') {
        window.history.replaceState({}, '', '/narmada-parikrama/route/');
        setPath('/narmada-parikrama/route/');
      } else if (hash === '#places') {
        window.history.replaceState({}, '', '/narmada-parikrama/places/');
        setPath('/narmada-parikrama/places/');
      } else if (hash === '#compare') {
        window.history.replaceState({}, '', '/narmada-parikrama/by-car/');
        setPath('/narmada-parikrama/by-car/');
      } else if (hash === '#trips') {
        window.history.replaceState({}, '', '/trips/');
        setPath('/trips/');
      } else if (hash === '#faq') {
        window.history.replaceState({}, '', '/narmada-parikrama/faq/');
        setPath('/narmada-parikrama/faq/');
      } else if (
        hash === '#travel-guide' ||
        hash === '#guide' ||
        hash === '#stay' ||
        hash === '#food' ||
        hash === '#challenges' ||
        hash === '#shoolpani' ||
        hash === '#experience' ||
        hash === '#safety' ||
        hash === '#checklist'
      ) {
        const targetAnchor = (hash === '#travel-guide' || hash === '#guide') ? '' : hash;
        window.history.replaceState({}, '', `/narmada-parikrama/travel-guide/${targetAnchor}`);
        setPath('/narmada-parikrama/travel-guide/');
      }
    }
  }, []);

  // Intercept internal link clicks for seamless SPA client routing while preserving SEO standard anchors
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore modified clicks or external schemes
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }

      // If it's a hash on the current page
      if (href.startsWith('#')) {
        return; // standard anchor scroll
      }

      // If it's a cross-page hash link, e.g. /#travel-guide
      if (href.startsWith('/#')) {
        const [_, hash] = href.split('#');
        const currentClean = window.location.pathname.replace(/\/+$/, '') || '/';
        if (currentClean === '/') {
          // Already on home, scroll to element
          const el = document.getElementById(hash);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState({}, '', href);
          }
        } else {
          // On other page, go to home with hash
          e.preventDefault();
          window.history.pushState({}, '', href);
          setPath('/');
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 60);
        }
        return;
      }

      // Internal route link
      if (href.startsWith('/')) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setPath(href);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const openPlanner = () => setPlannerOpen(true);
  const closePlanner = () => setPlannerOpen(false);

  return (
    <>
      <Header
        currentRoute={currentRoute}
        openPlanner={openPlanner}
        openMenu={() => setMenuOpen(true)}
        closeMenu={() => setMenuOpen(false)}
        menuOpen={menuOpen}
      />

      <Suspense fallback={null}>
        {currentRoute === 'parikrama' && <ParikramaWhyPage openPlanner={openPlanner} />}
        {currentRoute === 'route' && <RoutePage openPlanner={openPlanner} />}
        {currentRoute === 'places' && <PlacesPage openPlanner={openPlanner} />}
        {currentRoute === 'byCar' && <ByCarPage openPlanner={openPlanner} />}
        {currentRoute === 'travelGuide' && <TravelGuidePage openPlanner={openPlanner} />}
        {currentRoute === 'faq' && <FAQPage openPlanner={openPlanner} />}
        {currentRoute === 'trips' && <TripsPage openPlanner={openPlanner} />}
        {currentRoute === 'home' && <HomePage openPlanner={openPlanner} />}
      </Suspense>

      <SiteFooter />

      <MobileDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentRoute={currentRoute}
        openPlanner={() => {
          setMenuOpen(false);
          openPlanner();
        }}
      />

      {plannerOpen && <PlanModal onClose={closePlanner} />}
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
