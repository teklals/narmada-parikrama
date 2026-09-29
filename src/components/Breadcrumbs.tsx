import React from 'react';
import { useLanguage } from '../translations';

const BREADCRUMB_LABELS: Record<string, Record<string, string>> = {
  home: { en: 'Home', hi: 'होम', mr: 'होम', gu: 'હોમ' },
  parikrama: { en: 'Narmada Parikrama', hi: 'नर्मदा परिक्रमा', mr: 'नर्मदा परिक्रमा', gu: 'નર્મદા પરિક્રમા' },
  route: { en: 'Route', hi: 'मार्ग', mr: 'मार्ग', gu: 'માર્ગ' },
  places: { en: 'Places', hi: 'तीर्थ स्थल', mr: 'तीर्थक्षेत्रे', gu: 'તીર્થ સ્થળો' },
  byCar: { en: 'By Car', hi: 'कार से यात्रा', mr: 'कारने यात्रा', gu: 'કાર દ્વારા યાત્રા' },
  travelGuide: { en: 'Travel Guide', hi: 'यात्रा गाइड', mr: 'प्रवास मार्गदर्शिका', gu: 'યાત્રા માર્ગદર્શિકા' },
  faq: { en: 'FAQ', hi: 'अक्सर पूछे जाने वाले प्रश्न', mr: 'नेहमी विचारले जाणारे प्रश्न', gu: 'વારંવાર પૂછાતા પ્રશ્નો' },
  trips: { en: 'Trips', hi: 'ट्रिप्स', mr: 'ट्रिप्स', gu: 'ટ્રિપ્સ' },
};

export function getBreadcrumbLabel(key: string, lang: string): string {
  const map = BREADCRUMB_LABELS[key];
  if (!map) return key;
  return map[lang] || map['en'] || key;
}

export interface BreadcrumbEntry {
  key: string;
  href?: string;
  customLabel?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbEntry[] }) {
  const { lang } = useLanguage();

  return (
    <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumbs-list" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const label = item.customLabel || getBreadcrumbLabel(item.key, lang);
            return (
              <li
                key={idx}
                className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {item.href && !isLast ? (
                  <a href={item.href} itemProp="item">
                    <span itemProp="name">{label}</span>
                  </a>
                ) : (
                  <span itemProp="name" aria-current={isLast ? 'page' : undefined}>
                    {label}
                  </span>
                )}
                <meta itemProp="position" content={String(idx + 1)} />
                {!isLast && <span className="breadcrumb-separator" aria-hidden="true">›</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
