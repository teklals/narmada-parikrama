export type Language = 'hi' | 'en' | 'mr' | 'gu';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
];

export interface PlaceCard {
  id: string;
  name: string;
  state: string;
  badge: string;
  significance: string;
  experience: string;
  duration: string;
  stay: string;
  food: string;
  notes: string;
}

export interface RouteTimelineStop {
  step: string;
  title: string;
  state: string;
  desc: string;
  highlight: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ComparisonRow {
  aspect: string;
  walking: string;
  vehicle: string;
}

export interface ChallengeItem {
  iconName: string;
  title: string;
  desc: string;
  realNote?: string;
}

export interface ChecklistGroup {
  category: string;
  items: string[];
}

export interface SafetyRule {
  title: string;
  desc: string;
}

export interface StayCategory {
  title: string;
  tag: string;
  desc: string;
  tip: string;
}

export interface FoodItem {
  title: string;
  desc: string;
}

export interface PeopleItem {
  title: string;
  desc: string;
}

export interface ItineraryDay {
  day: string;
  title: string;
  description: string;
}

export interface ParikramaBhavaRow {
  sadhana: string;
  bhava: string;
}

export interface ParikramaObjective {
  num: number;
  title: string;
  paragraphs: string[];
  quote?: string;
  flow?: string[];
  postFlow?: string;
  bullets?: string[];
  questionsIntro?: string;
  questions?: string[];
  takeaway?: string;
}

export interface ParikramaWhySection {
  eyebrow: string;
  title: string;
  invocation: string;
  introP1: string;
  introP2: string;
  maaTitle: string;
  maaP1: string;
  maaQuote: string;
  maaP2: string;
  puranaTitle: string;
  puranaP1: string;
  puranaP2: string;
  puranaMessage: string;
  objectivesHeading: string;
  objectives: ParikramaObjective[];
  essenceTitle: string;
  essenceLead: string;
  essenceStream: string;
  essenceClosing: string;
  tableTitle: string;
  tableHeaderSadhana: string;
  tableHeaderBhava: string;
  tableRows: ParikramaBhavaRow[];
  narmadeHarTitle: string;
  narmadeHarP1: string;
  narmadeHarP2: string;
  narmadeHarChants: string[];
}

export interface Translations {
  nav: {
    home: string;
    parikrama: string;
    places: string;
    route: string;
    travelGuide: string;
    trips: string;
    planYatra: string;
    selectLanguage: string;
    about?: string;
    compare?: string;
    stayFood?: string;
    challenges?: string;
    experience?: string;
    faq?: string;
    contact?: string;
    gallery?: string;
  };
  home: {
    heroEyebrow: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    heroDesc: string;
    exploreBtn: string;
    placesBtn: string;
    planBtn: string;
    statDistance: string;
    statDistanceLabel: string;
    statDuration: string;
    statDurationLabel: string;
    statStates: string;
    statStatesLabel: string;
    statSource: string;
    statSourceLabel: string;
    riverCardTitle: string;
    riverCardSubtitle: string;
    aboutEyebrow: string;
    aboutTitle: string;
    aboutLead: string;
    aboutP1: string;
    aboutP2: string;
    aboutP3: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    parikramaWhy: ParikramaWhySection;
    compareEyebrow: string;
    compareTitle: string;
    compareSubtitle: string;
    compareNote: string;
    compareHeaders: {
      aspect: string;
      walking: string;
      vehicle: string;
    };
    comparisonRows: ComparisonRow[];
    routeEyebrow: string;
    routeTitle: string;
    routeSubtitle: string;
    routeDisclaimer: string;
    routeStops: RouteTimelineStop[];
    placesEyebrow: string;
    placesTitle: string;
    placesSubtitle: string;
    placesFilterAll: string;
    placesFilterMP: string;
    placesFilterMH: string;
    placesFilterGJ: string;
    placeLabels: {
      significance: string;
      experience: string;
      duration: string;
      stay: string;
      food: string;
      notes: string;
    };
    places: PlaceCard[];
    stayEyebrow: string;
    stayTitle: string;
    staySubtitle: string;
    stayCategories: StayCategory[];
    foodEyebrow: string;
    foodTitle: string;
    foodSubtitle: string;
    foodItems: FoodItem[];
    challengesEyebrow: string;
    challengesTitle: string;
    challengesSubtitle: string;
    challenges: ChallengeItem[];
    shoolpaniEyebrow: string;
    shoolpaniTitle: string;
    shoolpaniBadge: string;
    shoolpaniP1: string;
    shoolpaniP2: string;
    shoolpaniAdviceTitle: string;
    shoolpaniAdviceList: string[];
    shoolpaniWarning: string;
    peopleEyebrow: string;
    peopleTitle: string;
    peopleSubtitle: string;
    peopleDisclaimer: string;
    peopleList: PeopleItem[];
    packingEyebrow: string;
    packingTitle: string;
    packingSubtitle: string;
    packingWalkingNote: string;
    packingGroups: ChecklistGroup[];
    safetyEyebrow: string;
    safetyTitle: string;
    safetySubtitle: string;
    safetyRules: SafetyRule[];
    faqEyebrow: string;
    faqTitle: string;
    faqSubtitle: string;
    faqs: FaqItem[];
    ctaEyebrow: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    footerTagline: string;
    footerExplore: string;
    footerJourney: string;
    footerRoutePlanning: string;
    footerSacredPlaces: string;
    footerTrips: string;
    footerRights: string;
    stat1Number?: string;
    stat1Label?: string;
    stat2Number?: string;
    stat2Label?: string;
    stat3Number?: string;
    stat3Label?: string;
    parikramaEyebrow?: string;
    parikramaTitle?: string;
    parikramaDesc?: string;
    step1Title?: string;
    step1Desc?: string;
    step2Title?: string;
    step2Desc?: string;
    step3Title?: string;
    step3Desc?: string;
    placesDesc?: string;
    galleryEyebrow?: string;
    galleryTitle?: string;
  };
  trips: {
    heroEyebrow: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroDesc: string;
    heroCta: string;
    departuresEyebrow: string;
    departuresTitle: string;
    departuresTitleHighlight: string;
    departuresDesc: string;
    batch1Name: string;
    batch1Depart: string;
    batch1Month: string;
    batch1Return: string;
    batch2Name: string;
    batch2Depart: string;
    batch2Month: string;
    batch2Return: string;
    returnLabel: string;
    durationLabel: string;
    durationValue: string;
    departureLabel: string;
    departureValue: string;
    costLabel: string;
    costValue: string;
    availability: string;
    bookBtn: string;
    includedKicker: string;
    includedText: string;
    priceNote: string;
    itineraryEyebrow: string;
    itineraryTitle: string;
    itineraryTitleHighlight: string;
    itineraryDesc: string;
    itineraryDisclaimer: string;
    route1Label: string;
    route2Label: string;
    itineraryRoute1: ItineraryDay[];
    itineraryRoute2: ItineraryDay[];
    itinerary: ItineraryDay[];
    bookingEyebrow: string;
    bookingTitle: string;
    bookingTitleHighlight: string;
    bookingDesc: string;
    enquireBtn: string;
    contactEyebrow: string;
    contactTitle: string;
    contactTitleHighlight: string;
    contactDesc: string;
    footerBrandText: string;
    footerTagline: string;
    footerRights: string;
  };
  modal: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    errNameReq: string;
    errNameMin: string;
    errEmailReq: string;
    errEmailValid: string;
    errPhoneReq: string;
    errPhoneValid: string;
    errMessageReq: string;
    errMessageMin: string;
    successDefault: string;
    errorDefault: string;
    closeAria: string;
  };
}
