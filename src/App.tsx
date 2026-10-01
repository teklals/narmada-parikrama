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
const FACEBOOK_URL = 'https://www.facebook.com/NarmadaParikramaIndia/';
const INSTAGRAM_URL = 'https://www.instagram.com/narmadaparikramaindia';
const LINKEDIN_URL = 'https://www.linkedin.com/company/narmadaparikrama/';
const YOUTUBE_URL = 'https://www.youtube.com/@narmadaparikramaindia';
const WHATSAPP_URL =
  'https://wa.me/919315852737?text=Namaste%20Narmada%20Parikrama%20team%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Narmada%20Parikrama%20Yatra.';

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.676.15-.201.3-.777.979-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.783-1.675-2.084-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.176.201-.301.302-.502.1-.201.05-.376-.025-.526-.075-.151-.677-1.631-.928-2.233-.244-.587-.492-.507-.676-.516-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.079 2.909 1.229 3.11.151.201 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.378.198 1.898.12.579-.088 1.78-.728 2.03-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.351z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.161 1.594 5.97L.055 23.477l5.666-1.486A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.84c-1.782 0-3.528-.474-5.06-1.372l-.363-.214-3.364.882.898-3.279-.236-.376A9.845 9.845 0 0 1 2.16 12c0-5.426 4.414-9.84 9.84-9.84 5.426 0 9.84 4.414 9.84 9.84 0 5.426-4.414 9.84-9.84 9.84z" />
    </svg>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      aria-label="Contact Narmada Parikrama on WhatsApp"
      title="Contact Narmada Parikrama on WhatsApp"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}

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
      'Informational and travel guide platform for the sacred Narmada Parikrama pilgrimage. Explore parikrama routes, temples, ghats, stay and food guidance, and vehicle yatra options.',
    canonical: 'https://narmadaparikrama.logicbase.co.in/',
  },
  parikrama: {
    title: 'Narmada Parikrama | Complete Pilgrimage Guide',
    description:
      'Comprehensive guide to the sacred Narmada Parikrama pilgrimage: spiritual significance, religious traditions, pilgrim rules, devotion, and reverence for holy Maa Narmada.',
    canonical: 'https://narmadaparikrama.logicbase.co.in/narmada-parikrama/',
  },
  route: {
    title: 'Narmada Parikrama Route | Amarkantak to Gujarat and Back',
    description:
      'Detailed Narmada Parikrama route guide covering 17 key pilgrimage stops from Amarkantak across Madhya Pradesh, Maharashtra, and Gujarat with day-by-day path details.',
    canonical: 'https://narmadaparikrama.logicbase.co.in/narmada-parikrama/route/',
  },
  places: {
    title: 'Sacred Places on Narmada Parikrama | Temples & Ghats',
    description:
      'Discover 20 sacred pilgrimage places, temples, and holy ghats along Narmada Parikrama across Madhya Pradesh, Maharashtra, and Gujarat with darshan timings and tips.',
    canonical: 'https://narmadaparikrama.logicbase.co.in/narmada-parikrama/places/',
  },
  byCar: {
    title: 'Narmada Parikrama by Car | 18-Day Vehicle Yatra Guide',
    description:
      'Complete guide for Narmada Parikrama by car: proposed 18-day vehicle yatra itinerary, road route comparison, driving tips, ghats, temples, and daily travel stops.',
    canonical: 'https://narmadaparikrama.logicbase.co.in/narmada-parikrama/by-car/',
  },
  travelGuide: {
    title: 'Narmada Parikrama Travel Guide | Stay, Food, Safety & Packing',
    description:
      'Practical travel guide for Narmada Parikrama: ashram stay options, bhojanalayas, food advice, packing checklist, Shoolpani preparation, and pilgrim safety tips.',
    canonical: 'https://narmadaparikrama.logicbase.co.in/narmada-parikrama/travel-guide/',
  },
  faq: {
    title: 'Narmada Parikrama FAQ | Routes, Stay, Food & Travel',
    description:
      'Frequently asked questions about Narmada Parikrama: pilgrimage routes, walking vs vehicle yatra, stay options, food facilities, safety, Shoolpani, and travel advice.',
    canonical: 'https://narmadaparikrama.logicbase.co.in/narmada-parikrama/faq/',
  },
  trips: {
    title: 'Narmada Parikrama Trips | Vehicle Yatra 2026',
    description:
      'Travel guide and itinerary details for 18-day Narmada Parikrama vehicle yatra in 2026: October and November departure batches, sacred temple darshan, and route plan.',
    canonical: 'https://narmadaparikrama.logicbase.co.in/trips/',
  },
};

const DEFAULT_SHARE_IMAGE = 'https://narmadaparikrama.logicbase.co.in/assets/narmada-parikrama-logo.png';

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

  const isBetaHost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'narmada-parikrama-beta.vercel.app' ||
      window.location.hostname.endsWith('.vercel.app') ||
      window.location.hostname.includes('beta'));

  if (isBetaHost) {
    setMeta('robots', 'name', 'noindex, nofollow');
    setMeta('googlebot', 'name', 'noindex, nofollow');
  } else {
    setMeta('robots', 'name', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('googlebot', 'name', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  }

  setMeta('description', 'name', meta.description);
  setMeta('og:title', 'property', meta.title);
  setMeta('og:description', 'property', meta.description);
  setMeta('og:url', 'property', meta.canonical);
  setMeta('og:site_name', 'property', 'Narmada Parikrama');
  setMeta('og:image', 'property', DEFAULT_SHARE_IMAGE);
  setMeta('twitter:card', 'name', 'summary');
  setMeta('twitter:title', 'name', meta.title);
  setMeta('twitter:description', 'name', meta.description);
  setMeta('twitter:image', 'name', DEFAULT_SHARE_IMAGE);

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
          <img
            src="/assets/narmada-parikrama-logo.png"
            alt="Narmada Parikrama"
            className="brand-logo"
            width={38}
            height={38}
            loading="eager"
          />
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
          <div className="header-social-links" aria-label="Social media">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="header-social-btn facebook"
              aria-label="Facebook"
              title="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="header-social-btn instagram"
              aria-label="Instagram"
              title="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="header-social-btn linkedin"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="header-social-btn youtube"
              aria-label="YouTube"
              title="YouTube"
            >
              <YouTubeIcon size={16} />
            </a>
          </div>
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
            <img
              src="/assets/narmada-parikrama-logo.png"
              alt="Narmada Parikrama"
              className="brand-logo"
              width={38}
              height={38}
              loading="eager"
            />
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
          <div className="mobile-drawer-social">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-link"
              aria-label="Facebook"
            >
              <FacebookIcon size={17} />
              <span>Facebook</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-link"
              aria-label="Instagram"
            >
              <InstagramIcon size={17} />
              <span>Instagram</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-link"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={17} />
              <span>LinkedIn</span>
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-link"
              aria-label="YouTube"
            >
              <YouTubeIcon size={17} />
              <span>YouTube</span>
            </a>
          </div>
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
            <img
              src="/assets/narmada-parikrama-logo.png"
              alt="Narmada Parikrama"
              className="brand-logo"
              width={42}
              height={42}
              loading="lazy"
            />
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

      <FloatingWhatsApp />

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
