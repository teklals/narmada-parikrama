import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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

interface ParikramaWhyPageProps {
  openPlanner: () => void;
}

export function ParikramaWhyPage({ openPlanner }: ParikramaWhyPageProps) {
  const { t } = useLanguage();

  return (
    <div className="site">
      <Breadcrumbs items={[{ key: 'home', href: '/' }, { key: 'parikrama' }]} />

      <main>
        <header className="subpage-hero">
          <div className="container">
            <div className="eyebrow">
              <Sparkles size={16} /> {t.home.parikramaWhy.eyebrow}
            </div>
            <h1>{t.home.parikramaWhy.title}</h1>
            <div className="parikrama-invocation-badge" style={{ margin: '14px auto' }}>
              <span className="om-icon">🕉️</span>
              <span>{t.home.parikramaWhy.invocation}</span>
            </div>
            <p className="subpage-lead">{t.home.parikramaWhy.introP1}</p>
            <p className="lead-sub" style={{ margin: '10px auto 0', maxWidth: 740, color: 'var(--text-secondary)' }}>
              {t.home.parikramaWhy.introP2}
            </p>
          </div>
        </header>

        {/* Parikrama Section Content */}
        <section className="section" style={{ paddingTop: 36 }}>
          <div className="container">
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
                      <h4>
                        {obj.num}. {obj.title}
                      </h4>
                    </div>

                    <div className="objective-content">
                      {obj.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}

                      {obj.quote && <blockquote className="spiritual-quote-box">{obj.quote}</blockquote>}

                      {obj.flow && obj.flow.length > 0 && (
                        <div className="spiritual-flow-wrap">
                          {obj.flow.map((item, fIdx) => (
                            <React.Fragment key={fIdx}>
                              <span className="flow-step-pill">{item}</span>
                              {fIdx < obj.flow!.length - 1 && (
                                <span className="flow-arrow" aria-hidden="true">
                                  →
                                </span>
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
                          {obj.questionsIntro && <div className="questions-title">{obj.questionsIntro}</div>}
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
                <p>
                  <strong>{t.home.parikramaWhy.essenceClosing}</strong>
                </p>
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
                          <span className="sadhana-bullet" aria-hidden="true">
                            •
                          </span>
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

        {/* Related Links */}
        <RelatedLinks targets={['route', 'places', 'byCar', 'trips']} />

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
