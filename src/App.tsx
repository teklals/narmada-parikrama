import { ArrowRight, CalendarDays, Clock3, IndianRupee, MapPin, MapPinned, Menu, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import './trips.css';

const CONTACT_PHONE_1 = '+91-9958503108';
const CONTACT_PHONE_2 = '+91-9315852737';
const CONTACT_EMAIL = 'teklal.saw@gmail.com';

const homeNav = ['Home', 'About', 'Parikrama', 'Places', 'Gallery', 'Contact'];

const trips = [
  { id: 1, batch: '1st Batch', depart: '20 Oct 2026', month: 'October 2026', returnDate: '6 Nov 2026' },
  { id: 2, batch: '2nd Batch', depart: '14 Nov 2026', month: 'November 2026', returnDate: '1 Dec 2026' },
];

const itinerary = [
  ['Day 1', 'Any Place → Ujjain', 'Depart from Mumbai or Pune and travel to Ujjain, home of Mahakaleshwar Jyotirlinga.'],
  ['Day 2', 'Ujjain · Mahakal Darshan', 'Mahakaleshwar Temple, Ram Ghat, Harsiddhi Temple and Kal Bhairav darshan.'],
  ['Day 3', 'Indore Sightseeing → Omkareshwar', 'Explore Indore before proceeding to Omkareshwar, one of the 12 Jyotirlingas.'],
  ['Day 4', 'Omkareshwar · Sankalp · Barwani', 'Omkareshwar darshan, Pradakshina Sankalp and Kumarika Pujan before proceeding to Barwani.'],
  ['Day 5', 'Rajghat · Ekmukhi Datta Temple · Rajpipla', 'Holy bath at Rajghat, Ekmukhi Datta Temple and onward journey to Rajpipla.'],
  ['Day 6', 'Kumbheshwar · Vimleshwar · Mithitalai', 'Kumbheshwar darshan and Tat Parivartan via the historic Vimleshwar sea route.'],
  ['Day 7', 'Mithitalai → Garudeshwar', 'Travel to Garudeshwar, associated with Garud, the divine eagle vehicle of Vishnu.'],
  ['Day 8', 'Tembe Swami Samadhi · Maheshwar', 'Pay homage at Tembe Swami Samadhi and Datta Temple, then continue to Maheshwar.'],
  ['Day 9', 'Rewa Kund · Mandu · Maheshwar Fort', 'Visit Rewa Kund and Mandu, followed by Rajrajeshwari Temple and Ahilyabai’s fort and palace.'],
  ['Day 10', 'Holy Bath · Datta Darshan · Nemawar/Khategaon', 'Holy bath, Datta Temple darshan and journey toward sacred Nemawar or Khategaon.'],
  ['Day 11', 'Holy Bath · Siddheshwar · Bhedaghat', 'Siddheshwar Temple darshan and onward travel to the marble gorge of Bhedaghat.'],
  ['Day 12', 'Chausath Yogini · Dhuandhar Falls · Amarkantak', 'Visit Chausath Yogini Temple and Dhuandhar Falls before proceeding to Amarkantak.'],
  ['Day 13', 'Amarkantak · Kapildhara · Oti Bharan', 'Visit sacred waterfalls and perform Oti Bharan at the Narmada’s source.'],
  ['Day 14', 'Mai Ka Bagicha · Son-Nand · Shri Yantra · Narsinghpur', 'Visit Mai Ka Bagicha, Gulbakavali, Son-Nand confluence and Shri Yantra Temple.'],
  ['Day 15', 'Narsinghpur → Narmadapuram', 'Travel to Narmadapuram, a significant pilgrimage town on the Narmada.'],
  ['Day 16', 'Sethani Ghat · Narmada Mai Pujan · Shani Temple', 'Holy bath at Sethani Ghat, Narmada Mai Pujan and Shani Temple darshan.'],
  ['Day 17', 'Omkareshwar · Sankalp Purti · Depart Mumbai', 'Complete the sacred Sankalp Purti, Mamleshwar Darshan and depart for Mumbai.'],
  ['Day 18', 'Arrival · Mumbai / Pune', 'Arrive in Mumbai or Pune. The Narmada Parikrama is complete and the sacred vow fulfilled.'],
];

function ContactDetails() {
  return (
    <div className="contact-details">
      <a href={`tel:${CONTACT_PHONE_1}`}>📞 {CONTACT_PHONE_1}</a>
      <a href={`tel:${CONTACT_PHONE_2}`}>📞 {CONTACT_PHONE_2}</a>
      <a href={`mailto:${CONTACT_EMAIL}`}>✉ {CONTACT_EMAIL}</a>
    </div>
  );
}

function HomePage({ openPlanner }: { openPlanner: () => void }) {
  return (
    <div className="site">
      <header className="header">
        <div className="container nav-wrap">
          <a className="brand" href="#home"><span className="brand-mark">ॐ</span><span>Narmada<br /><b>Parikrama</b></span></a>
          <nav className="desktop-nav">
            {homeNav.map((n, i) => <a className={i === 0 ? 'active' : ''} href={`#${n.toLowerCase()}`} key={n}>{n}</a>)}
            <a href="/trips">Trips</a>
          </nav>
          <button className="demo" onClick={openPlanner}>Plan Your Yatra</button>
          <button className="menu" onClick={openPlanner} aria-label="menu"><Menu /></button>
        </div>
      </header>

      <main>
        <section id="home" className="hero"><div className="container hero-grid"><div><div className="eyebrow"><MapPinned size={16} /> Sacred journey around Maa Narmada</div><h1>Discover the sacred path of <span>Narmada Parikrama</span></h1><p>Plan, explore and experience the timeless spiritual journey around the holy Narmada River with clear routes, sacred places and practical travel information.</p><div className="actions"><a className="primary" href="#parikrama">Explore the Parikrama <ArrowRight size={18} /></a><a className="secondary" href="#places">Sacred Places</a></div><div className="stats"><div><strong>3,000+</strong><small>km journey</small></div><div><strong>3</strong><small>states & regions</small></div><div><strong>∞</strong><small>spiritual moments</small></div></div></div><div className="hero-art"><div className="glow"></div><div className="river-card"><span>ॐ</span><h3>Maa Narmada</h3><p>एक पवित्र परिक्रमा, एक जीवन यात्रा</p></div></div></div></section>
        <section id="about" className="section"><div className="container two"><div><div className="eyebrow"><Sparkles size={16} /> About the journey</div><h2>A journey of devotion, discipline and discovery.</h2></div><p className="lead">Narmada Parikrama is more than a route on a map. This website is designed as a clean digital guide for pilgrims—bringing together planning information, important places, route guidance and useful resources in one place.</p></div></section>
        <section id="parikrama" className="section dark"><div className="container"><div className="center"><div className="eyebrow">The Sacred Route</div><h2>Plan your Parikrama with clarity</h2><p>Explore the journey step by step and keep important information accessible throughout your yatra.</p></div><div className="cards"><article><span>01</span><h3>Plan</h3><p>Understand the route, timing, preparation and essential requirements.</p></article><article><span>02</span><h3>Explore</h3><p>Discover ghats, temples, ashrams, towns and sacred landmarks.</p></article><article><span>03</span><h3>Experience</h3><p>Keep your journey focused on devotion, simplicity and meaningful experiences.</p></article></div></div></section>
        <section id="places" className="section"><div className="container center"><div className="eyebrow">Sacred Places</div><h2>Places along Maa Narmada</h2><p>Build the destination directory next with verified place details, maps and pilgrim facilities.</p></div></section>
        <section id="gallery" className="section gallery"><div className="container center"><div className="eyebrow">Gallery</div><h2>Visual stories of the journey</h2><div className="gallery-grid"><div></div><div></div><div></div></div></div></section>
        <section id="contact" className="cta"><div className="container cta-inner"><div><div className="eyebrow">Start your journey</div><h2>Ready to plan your Narmada Parikrama?</h2><p>Contact us for trip availability, route information and booking assistance.</p><ContactDetails /></div><button className="primary" onClick={openPlanner}>Plan Your Yatra <ArrowRight size={18} /></button></div></section>
      </main>
      <footer><div className="container footer-grid"><div><div className="brand footer-brand"><span className="brand-mark">ॐ</span><span>Narmada<br /><b>Parikrama</b></span></div><p>A modern digital guide for the sacred Narmada journey.</p><ContactDetails /></div><div><h4>Explore</h4>{homeNav.slice(0, 5).map(n => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}<a href="/trips">Trips</a></div><div><h4>Journey</h4><a href="#parikrama">Route Planning</a><a href="#places">Sacred Places</a><a href="/trips">18-Day Trips</a></div></div><div className="container bottom">© 2026 Narmada Parikrama. All rights reserved.</div></footer>
    </div>
  );
}

function TripsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <div className="trips-page">
      <div className="site">
        <header className="nav">
          <a className="brand" href="/" onClick={closeMenu}><span className="brand-mark">ॐ</span><span><strong>Narmada</strong><small>PARIKRAMA</small></span></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <a href="/" onClick={closeMenu}>Home</a>
            <a href="/#parikrama" onClick={closeMenu}>Parikrama Route</a>
            <a href="/#places" onClick={closeMenu}>Places</a>
            <a href="/#places" onClick={closeMenu}>Temples</a>
            <a href="/#places" onClick={closeMenu}>Accommodation</a>
            <a className="active" href="/trips" onClick={closeMenu}>Trips</a>
            <a href="/#about" onClick={closeMenu}>About</a>
            <a href="/#contact" onClick={closeMenu}>Contact</a>
          </nav>
        </header>

        <main>
          <section className="hero"><div className="hero-glow" /><div className="eyebrow"><Sparkles size={15} /> SACRED JOURNEY · 2026</div><h1>Narmada Parikrama <em>Trips</em></h1><p>Upcoming tour batches for an 18-day spiritual journey around Maa Narmada — planned for darshan, rituals, travel, meals and rest.</p><a className="hero-cta" href="#departures">View Upcoming Trips <ArrowRight size={17} /></a></section>
          <section className="section" id="departures"><div className="section-heading"><div><span className="kicker">UPCOMING DEPARTURES</span><h2>Choose your <em>Parikrama</em></h2></div><p>Two scheduled 2026 batches are listed in the tour plan.</p></div><div className="trip-grid">{trips.map(trip => <article className="trip-card" key={trip.id}><div className="trip-top"><span className="batch">{trip.batch}</span><span className="year">2026</span></div><div className="date-row"><div className="date-block"><CalendarDays /><strong>{trip.depart}</strong><span>{trip.month}</span></div><ArrowRight className="date-arrow" /><div className="date-block return"><CalendarDays /><strong>{trip.returnDate}</strong><span>Return</span></div></div><div className="details"><div><Clock3 /><span>Duration<strong>18 Days</strong></span></div><div><MapPin /><span>Departure<strong>Mumbai / Pune</strong></span></div><div><IndianRupee /><span>Tour Cost<strong>₹50,000 / person</strong></span></div></div><div className="availability">Limited seats — book early</div><a className="card-cta" href="#booking">Book this trip <ArrowRight size={16} /></a></article>)}</div><div className="included"><span>INCLUDED</span><p>Full meals · 1 litre mineral water daily · vehicle · tour escort · standard hotel / dharmashala accommodation</p></div><p className="note">Price is subject to change in the event of a sudden fuel-price hike.</p></section>
          <section className="section itinerary-section"><div className="section-heading centered"><span className="kicker">DAY-BY-DAY JOURNEY</span><h2>18-Day Tour <em>Itinerary</em></h2><p>Every day is thoughtfully planned around darshan, holy rituals, travel, meals and rest.</p></div><div className="timeline">{itinerary.map(([day, title, description]) => <div className="timeline-item" key={day}><div className="timeline-dot" /><div className="timeline-day">{day}</div><div className="timeline-content"><h3>{title}</h3><p>{description}</p></div></div>)}</div></section>
          <section className="booking" id="booking"><div><span className="kicker">READY FOR THE JOURNEY?</span><h2>Begin your <em>Parikrama</em></h2><p>Choose your batch and contact us for availability and booking details.</p><ContactDetails /></div><a href="#contact" className="hero-cta">Enquire Now <ArrowRight size={17} /></a></section>
          <section id="contact" className="section contact-section"><div className="section-heading centered"><span className="kicker">CONTACT</span><h2>Plan your <em>journey</em></h2><p>For booking, batch availability and trip information, contact us directly.</p><ContactDetails /></div></section>
        </main>
        <footer><div className="footer-brand">Narmada <span>Parikrama</span></div><p>A sacred journey around Maa Narmada.</p><ContactDetails /><small>© 2026 Narmada Parikrama. All rights reserved.</small></footer>
      </div>
    </div>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [plannerOpen, setPlannerOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (path === '/trips' || path === '/trips/') return <TripsPage />;

  return (
    <>
      <HomePage openPlanner={() => setPlannerOpen(true)} />
      {plannerOpen && <div className="modal-backdrop" onMouseDown={e => e.currentTarget === e.target && setPlannerOpen(false)}><div className="modal"><button className="close" onClick={() => setPlannerOpen(false)}><X /></button><h2>Plan Your Yatra</h2><p>Contact us directly for batch availability and booking assistance.</p><ContactDetails /><input placeholder="Name *" /><input placeholder="Email *" type="email" /><input placeholder="Mobile" /><textarea placeholder="Your message *" /><button className="primary full" onClick={() => setPlannerOpen(false)}>Send Request <ArrowRight size={18} /></button></div></div>}
    </>
  );
}
