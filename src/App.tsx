import {
  AlertTriangle,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  CreditCard,
  Droplets,
  Footprints,
  Globe,
  HeartHandshake,
  HelpCircle,
  Hotel,
  IndianRupee,
  Info,
  MapPin,
  MapPinned,
  Menu,
  Mountain,
  ShieldCheck,
  SignalHigh,
  Sparkles,
  ThermometerSnowflake,
  Users,
  Utensils,
  Wallet,
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
          <a href={isTrips ? '/#parikrama' : '#parikrama'}>{t.nav.parikrama}</a>
          <a href={isTrips ? '/#places' : '#places'}>{t.nav.places}</a>
          <a href={isTrips ? '/#route' : '#route'}>{t.nav.route}</a>
          <a href={isTrips ? '/#travel-guide' : '#travel-guide'}>{t.nav.travelGuide}</a>
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
      <div className="mobile-menu-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        id="mobile-nav-panel"
        className="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer-header">
          <a className="brand" href={isTrips ? '/' : '#home'} onClick={onClose}>
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
              className={`mobile-nav-item ${!isTrips ? 'active' : ''}`}
              href={isTrips ? '/' : '#home'}
              onClick={onClose}
            >
              {t.nav.home}
            </a>
            <a className="mobile-nav-item" href={isTrips ? '/#parikrama' : '#parikrama'} onClick={onClose}>
              {t.nav.parikrama}
            </a>
            <a className="mobile-nav-item" href={isTrips ? '/#places' : '#places'} onClick={onClose}>
              {t.nav.places}
            </a>
            <a className="mobile-nav-item" href={isTrips ? '/#route' : '#route'} onClick={onClose}>
              {t.nav.route}
            </a>
            <a className="mobile-nav-item" href={isTrips ? '/#travel-guide' : '#travel-guide'} onClick={onClose}>
              {t.nav.travelGuide}
            </a>
            <a className={`mobile-nav-item ${isTrips ? 'active' : ''}`} href="/trips" onClick={onClose}>
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
    case 'Wallet':
      return <Wallet size={22} />;
    default:
      return <AlertTriangle size={22} />;
  }
}

function HomePage({ openPlanner }: { openPlanner: () => void }) {
  const { t } = useLanguage();
  const [placesFilter, setPlacesFilter] = useState<'all' | 'mp' | 'mh' | 'gj'>('all');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

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
                <a className="primary" href="#route">
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

        {/* Parikrama Section: "Why Undertake Narmada Parikrama?" Spiritual & Informational Guide */}
        <div id="parikrama" className="nav-anchor" />
        <section id="about" className="section">
          <div className="container">
            <div className="section-intro">
              <div className="eyebrow">
                <Sparkles size={16} /> {t.home.parikramaWhy.eyebrow}
              </div>
              <h2>{t.home.parikramaWhy.title}</h2>
              <div className="parikrama-invocation-badge">
                <span className="om-icon">🕉️</span>
                <span>{t.home.parikramaWhy.invocation}</span>
              </div>
              <p className="lead">{t.home.parikramaWhy.introP1}</p>
              <p className="lead-sub">{t.home.parikramaWhy.introP2}</p>
            </div>

            {/* Foundations: Mother Narmada & Purana Mahatmya */}
            <div className="parikrama-foundations-grid">
              <article className="foundation-card foundation-mother">
                <h3>{t.home.parikramaWhy.maaTitle}</h3>
                <p>{t.home.parikramaWhy.maaP1}</p>
                <div className="sacred-callout-box">
                  <strong>{t.home.parikramaWhy.maaQuote}</strong>
                </div>
                <p>{t.home.parikramaWhy.maaP2}</p>
              </article>

              <article className="foundation-card foundation-purana">
                <h3>{t.home.parikramaWhy.puranaTitle}</h3>
                <p>{t.home.parikramaWhy.puranaP1}</p>
                <p>{t.home.parikramaWhy.puranaP2}</p>
                <div className="sacred-callout-box">
                  <strong>{t.home.parikramaWhy.puranaMessage}</strong>
                </div>
              </article>
            </div>

            {/* 10 Spiritual Objectives */}
            <div className="parikrama-objectives-wrap">
              <div className="section-subheading">
                <h3>{t.home.parikramaWhy.objectivesHeading}</h3>
              </div>

              <div className="parikrama-objectives-grid">
                {t.home.parikramaWhy.objectives.map((obj) => (
                  <article key={obj.num} className="objective-card">
                    <div className="objective-card-header">
                      <span className="objective-badge">{obj.num}</span>
                      <h4>{obj.num}. {obj.title}</h4>
                    </div>

                    <div className="objective-content">
                      {obj.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}

                      {obj.quote && (
                        <blockquote className="spiritual-quote-box">
                          {obj.quote}
                        </blockquote>
                      )}

                      {obj.flow && obj.flow.length > 0 && (
                        <div className="spiritual-flow-wrap">
                          {obj.flow.map((item, fIdx) => (
                            <React.Fragment key={fIdx}>
                              <span className="flow-step-pill">{item}</span>
                              {fIdx < obj.flow!.length - 1 && (
                                <span className="flow-arrow" aria-hidden="true">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      )}

                      {obj.postFlow && <p className="spiritual-post-flow">{obj.postFlow}</p>}

                      {obj.bullets && obj.bullets.length > 0 && (
                        <ul className="spiritual-bullets-list">
                          {obj.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>
                              <span className="spiritual-bullet-icon">🪷</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {obj.questions && obj.questions.length > 0 && (
                        <div className="spiritual-questions-box">
                          {obj.questionsIntro && (
                            <div className="questions-title">{obj.questionsIntro}</div>
                          )}
                          <ul className="spiritual-questions-list">
                            {obj.questions.map((q, qIdx) => (
                              <li key={qIdx}>
                                <span className="q-badge">?</span>
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {obj.takeaway && (
                        <div className="spiritual-takeaway-box">
                          <span>✨</span>
                          <p>{obj.takeaway}</p>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Essence Card */}
            <div className="parikrama-essence-card">
              <div className="essence-header">
                <h3>{t.home.parikramaWhy.essenceTitle}</h3>
                <p className="essence-lead">{t.home.parikramaWhy.essenceLead}</p>
              </div>

              <div className="essence-stream-box">
                <span className="essence-stream-text">{t.home.parikramaWhy.essenceStream}</span>
              </div>

              <div className="essence-closing-box">
                <p><strong>{t.home.parikramaWhy.essenceClosing}</strong></p>
              </div>
            </div>

            {/* 12-Row Spiritual Bhava Table */}
            <div className="bhava-table-card">
              <div className="bhava-table-header">
                <h3>{t.home.parikramaWhy.tableTitle}</h3>
              </div>

              <div className="bhava-table-container">
                <table className="bhava-table">
                  <thead>
                    <tr>
                      <th scope="col" className="bhava-col-sadhana">
                        {t.home.parikramaWhy.tableHeaderSadhana}
                      </th>
                      <th scope="col" className="bhava-col-bhava">
                        {t.home.parikramaWhy.tableHeaderBhava}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.home.parikramaWhy.tableRows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="bhava-cell-sadhana">
                          <span className="sadhana-bullet" aria-hidden="true">•</span>
                          <strong>{row.sadhana}</strong>
                        </td>
                        <td className="bhava-cell-bhava">{row.bhava}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Devotional Climax: Narmade Har */}
            <div className="narmade-har-climax-card">
              <div className="climax-header">
                <h3>{t.home.parikramaWhy.narmadeHarTitle}</h3>
                <p className="climax-p1">{t.home.parikramaWhy.narmadeHarP1}</p>
              </div>

              <div className="climax-chants-grid">
                {t.home.parikramaWhy.narmadeHarChants.map((chant, cIdx) => (
                  <div key={cIdx} className="chant-bubble">
                    <span className="chant-om">🕉️</span>
                    <span className="chant-text">{chant}</span>
                  </div>
                ))}
              </div>

              <div className="climax-p2-box">
                <p>{t.home.parikramaWhy.narmadeHarP2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 13: Traditional Walking vs 18-Day Vehicle Trip Comparison */}
        <section id="compare" className="section dark">
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

        {/* Places Page / Directory */}
        <section id="places" className="section">
          <div className="container">
            <div className="section-intro">
              <div className="eyebrow">
                <MapPin size={16} /> {t.home.placesEyebrow}
              </div>
              <h2>{t.home.placesTitle}</h2>
              <p>{t.home.placesSubtitle}</p>
            </div>

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

        {/* Complete Route Section */}
        <section id="route" className="section dark">
          <div className="container">
            <div className="section-intro">
              <div className="eyebrow">
                <Compass size={16} /> {t.home.routeEyebrow}
              </div>
              <h2>{t.home.routeTitle}</h2>
              <p>{t.home.routeSubtitle}</p>
            </div>

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

        {/* Travel Guide Consolidated Section: Stay, Food, Challenges, Shoolpani, Seva, Checklist, Safety, FAQ */}
        <div id="travel-guide" className="nav-anchor" />
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

        {/* Section 8: Food Section */}
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

        {/* Section 9: Challenges */}
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

        {/* Section 10: Shoolpani / Difficult Forest Section */}
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

        {/* Section 11: People, Ashrams and Seva */}
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

        {/* Section 14: What to Carry */}
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

        {/* Section 15: Safety Guide */}
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

        {/* Section 16: FAQ */}
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
              {t.home.faqs.map((faq, idx) => (
                <div className="faq-item" key={idx}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                    aria-expanded={openFaqIdx === idx}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`faq-chevron ${openFaqIdx === idx ? 'open' : ''}`} />
                  </button>
                  {openFaqIdx === idx && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
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

      {/* Footer */}
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
            <a href="#parikrama">{t.nav.parikrama}</a>
            <a href="#places">{t.nav.places}</a>
            <a href="#route">{t.nav.route}</a>
            <a href="#travel-guide">{t.nav.travelGuide}</a>
            <a href="/trips">{t.nav.trips}</a>
          </div>
          <div>
            <h4>{t.home.footerJourney}</h4>
            <a href="#route">{t.home.footerRoutePlanning}</a>
            <a href="#places">{t.home.footerSacredPlaces}</a>
            <a href="#safety">{t.home.safetyTitle}</a>
            <a href="#checklist">{t.home.packingTitle}</a>
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
  const [selectedRoute, setSelectedRoute] = useState<'route1' | 'route2'>('route1');

  const currentItinerary = selectedRoute === 'route1'
    ? (t.trips.itineraryRoute1 || t.trips.itinerary)
    : (t.trips.itineraryRoute2 || t.trips.itinerary);

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
          <div className="footer-brand">{t.trips.footerBrandText}</div>
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
