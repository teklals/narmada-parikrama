import React, { createContext, useContext, useEffect, useState } from 'react';

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

export interface ItineraryDay {
  day: string;
  title: string;
  description: string;
}

export interface Translations {
  nav: {
    home: string;
    about: string;
    parikrama: string;
    places: string;
    gallery: string;
    contact: string;
    trips: string;
    planYatra: string;
    selectLanguage: string;
  };
  home: {
    heroEyebrow: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroDesc: string;
    exploreBtn: string;
    placesBtn: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    riverCardTitle: string;
    riverCardSubtitle: string;
    aboutEyebrow: string;
    aboutTitle: string;
    aboutLead: string;
    parikramaEyebrow: string;
    parikramaTitle: string;
    parikramaDesc: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    placesEyebrow: string;
    placesTitle: string;
    placesDesc: string;
    galleryEyebrow: string;
    galleryTitle: string;
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

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      parikrama: 'Parikrama',
      places: 'Places',
      gallery: 'Gallery',
      contact: 'Contact',
      trips: 'Trips',
      planYatra: 'Plan Your Yatra',
      selectLanguage: 'Select Language',
    },
    home: {
      heroEyebrow: 'Sacred journey around Maa Narmada',
      heroTitlePrefix: 'Discover the sacred path of ',
      heroTitleHighlight: 'Narmada Parikrama',
      heroDesc:
        'Plan, explore and experience the timeless spiritual journey around the holy Narmada River with clear routes, sacred places and practical travel information.',
      exploreBtn: 'Explore the Parikrama',
      placesBtn: 'Sacred Places',
      stat1Number: '3,000+',
      stat1Label: 'km journey',
      stat2Number: '3',
      stat2Label: 'states & regions',
      stat3Number: '∞',
      stat3Label: 'spiritual moments',
      riverCardTitle: 'Maa Narmada',
      riverCardSubtitle: 'एक पवित्र परिक्रमा, एक जीवन यात्रा',
      aboutEyebrow: 'About the journey',
      aboutTitle: 'A journey of devotion, discipline and discovery.',
      aboutLead:
        'Narmada Parikrama is more than a route on a map. This website is designed as a clean digital guide for pilgrims—bringing together planning information, important places, route guidance and useful resources in one place.',
      parikramaEyebrow: 'The Sacred Route',
      parikramaTitle: 'Plan your Parikrama with clarity',
      parikramaDesc:
        'Explore the journey step by step and keep important information accessible throughout your yatra.',
      step1Title: 'Plan',
      step1Desc: 'Understand the route, timing, preparation and essential requirements.',
      step2Title: 'Explore',
      step2Desc: 'Discover ghats, temples, ashrams, towns and sacred landmarks.',
      step3Title: 'Experience',
      step3Desc: 'Keep your journey focused on devotion, simplicity and meaningful experiences.',
      placesEyebrow: 'Sacred Places',
      placesTitle: 'Places along Maa Narmada',
      placesDesc: 'Build the destination directory next with verified place details, maps and pilgrim facilities.',
      galleryEyebrow: 'Gallery',
      galleryTitle: 'Visual stories of the journey',
      ctaEyebrow: 'Start your journey',
      ctaTitle: 'Ready to plan your Narmada Parikrama?',
      ctaDesc: 'Contact us for trip availability, route information and booking assistance.',
      ctaBtn: 'Plan Your Yatra',
      footerTagline: 'A modern digital guide for the sacred Narmada journey.',
      footerExplore: 'Explore',
      footerJourney: 'Journey',
      footerRoutePlanning: 'Route Planning',
      footerSacredPlaces: 'Sacred Places',
      footerTrips: '18-Day Trips',
      footerRights: '© 2026 Narmada Parikrama. All rights reserved.',
    },
    trips: {
      heroEyebrow: 'SACRED JOURNEY · 2026',
      heroTitle: 'Narmada Parikrama ',
      heroTitleHighlight: 'Trips',
      heroDesc:
        'Upcoming tour batches for an 18-day spiritual journey around Maa Narmada — planned for darshan, rituals, travel, meals and rest.',
      heroCta: 'View Upcoming Trips',
      departuresEyebrow: 'UPCOMING DEPARTURES',
      departuresTitle: 'Choose your ',
      departuresTitleHighlight: 'Parikrama',
      departuresDesc: 'Two scheduled 2026 batches are listed in the tour plan.',
      batch1Name: '1st Batch',
      batch1Depart: '20 Oct 2026',
      batch1Month: 'October 2026',
      batch1Return: '6 Nov 2026',
      batch2Name: '2nd Batch',
      batch2Depart: '14 Nov 2026',
      batch2Month: 'November 2026',
      batch2Return: '1 Dec 2026',
      returnLabel: 'Return',
      durationLabel: 'Duration',
      durationValue: '18 Days',
      departureLabel: 'Departure',
      departureValue: 'Mumbai / Pune',
      costLabel: 'Tour Cost',
      costValue: '₹50,000 / person',
      availability: 'Limited seats — book early',
      bookBtn: 'Book this trip',
      includedKicker: 'INCLUDED',
      includedText:
        'Full meals · 1 litre mineral water daily · vehicle · tour escort · standard hotel / dharmashala accommodation',
      priceNote: 'Price is subject to change in the event of a sudden fuel-price hike.',
      itineraryEyebrow: 'DAY-BY-DAY JOURNEY',
      itineraryTitle: '18-Day Tour ',
      itineraryTitleHighlight: 'Itinerary',
      itineraryDesc: 'Every day is thoughtfully planned around darshan, holy rituals, travel, meals and rest.',
      itinerary: [
        { day: 'Day 1', title: 'Any Place → Ujjain', description: 'Depart from Mumbai or Pune and travel to Ujjain, home of Mahakaleshwar Jyotirlinga.' },
        { day: 'Day 2', title: 'Ujjain · Mahakal Darshan', description: 'Mahakaleshwar Temple, Ram Ghat, Harsiddhi Temple and Kal Bhairav darshan.' },
        { day: 'Day 3', title: 'Indore Sightseeing → Omkareshwar', description: 'Explore Indore before proceeding to Omkareshwar, one of the 12 Jyotirlingas.' },
        { day: 'Day 4', title: 'Omkareshwar · Sankalp · Barwani', description: 'Omkareshwar darshan, Pradakshina Sankalp and Kumarika Pujan before proceeding to Barwani.' },
        { day: 'Day 5', title: 'Rajghat · Ekmukhi Datta Temple · Rajpipla', description: 'Holy bath at Rajghat, Ekmukhi Datta Temple and onward journey to Rajpipla.' },
        { day: 'Day 6', title: 'Kumbheshwar · Vimleshwar · Mithitalai', description: 'Kumbheshwar darshan and Tat Parivartan via the historic Vimleshwar sea route.' },
        { day: 'Day 7', title: 'Mithitalai → Garudeshwar', description: 'Travel to Garudeshwar, associated with Garud, the divine eagle vehicle of Vishnu.' },
        { day: 'Day 8', title: 'Tembe Swami Samadhi · Maheshwar', description: 'Pay homage at Tembe Swami Samadhi and Datta Temple, then continue to Maheshwar.' },
        { day: 'Day 9', title: 'Rewa Kund · Mandu · Maheshwar Fort', description: 'Visit Rewa Kund and Mandu, followed by Rajrajeshwari Temple and Ahilyabai’s fort and palace.' },
        { day: 'Day 10', title: 'Holy Bath · Datta Darshan · Nemawar/Khategaon', description: 'Holy bath, Datta Temple darshan and journey toward sacred Nemawar or Khategaon.' },
        { day: 'Day 11', title: 'Holy Bath · Siddheshwar · Bhedaghat', description: 'Siddheshwar Temple darshan and onward travel to the marble gorge of Bhedaghat.' },
        { day: 'Day 12', title: 'Chausath Yogini · Dhuandhar Falls · Amarkantak', description: 'Visit Chausath Yogini Temple and Dhuandhar Falls before proceeding to Amarkantak.' },
        { day: 'Day 13', title: 'Amarkantak · Kapildhara · Oti Bharan', description: 'Visit sacred waterfalls and perform Oti Bharan at the Narmada’s source.' },
        { day: 'Day 14', title: 'Mai Ka Bagicha · Son-Nand · Shri Yantra · Narsinghpur', description: 'Visit Mai Ka Bagicha, Gulbakavali, Son-Nand confluence and Shri Yantra Temple.' },
        { day: 'Day 15', title: 'Narsinghpur → Narmadapuram', description: 'Travel to Narmadapuram, a significant pilgrimage town on the Narmada.' },
        { day: 'Day 16', title: 'Sethani Ghat · Narmada Mai Pujan · Shani Temple', description: 'Holy bath at Sethani Ghat, Narmada Mai Pujan and Shani Temple darshan.' },
        { day: 'Day 17', title: 'Omkareshwar · Sankalp Purti · Depart Mumbai', description: 'Complete the sacred Sankalp Purti, Mamleshwar Darshan and depart for Mumbai.' },
        { day: 'Day 18', title: 'Arrival · Mumbai / Pune', description: 'Arrive in Mumbai or Pune. The Narmada Parikrama is complete and the sacred vow fulfilled.' },
      ],
      bookingEyebrow: 'READY FOR THE JOURNEY?',
      bookingTitle: 'Begin your ',
      bookingTitleHighlight: 'Parikrama',
      bookingDesc: 'Choose your batch and contact us for availability and booking details.',
      enquireBtn: 'Enquire Now',
      contactEyebrow: 'CONTACT',
      contactTitle: 'Plan your ',
      contactTitleHighlight: 'journey',
      contactDesc: 'For booking, batch availability and trip information, contact us directly.',
      footerBrandText: 'Narmada Parikrama',
      footerTagline: 'A sacred journey around Maa Narmada.',
      footerRights: '© 2026 Narmada Parikrama. All rights reserved.',
    },
    modal: {
      title: 'Plan Your Yatra',
      nameLabel: 'Name',
      namePlaceholder: 'Your full name',
      emailLabel: 'Email',
      emailPlaceholder: 'your.email@example.com',
      phoneLabel: 'Phone',
      phonePlaceholder: '+91 9958503108',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us your preferred batch or any specific questions...',
      submitBtn: 'Send Request →',
      submittingBtn: 'Sending...',
      errNameReq: 'Please enter your name.',
      errNameMin: 'Name must be at least 2 characters.',
      errEmailReq: 'Please enter your email address.',
      errEmailValid: 'Please enter a valid email address.',
      errPhoneReq: 'Please enter your phone number.',
      errPhoneValid: 'Please enter a valid phone number (at least 7 digits).',
      errMessageReq: 'Please enter your message.',
      errMessageMin: 'Message must be at least 5 characters.',
      successDefault: 'Thank you! Your enquiry has been sent successfully.',
      errorDefault: 'Unable to send your enquiry. Please try again or contact us directly.',
      closeAria: 'Close modal',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'परिचय',
      parikrama: 'परिक्रमा',
      places: 'प्रमुख स्थल',
      gallery: 'गैलरी',
      contact: 'संपर्क',
      trips: 'यात्राएं',
      planYatra: 'यात्रा की योजना बनाएं',
      selectLanguage: 'भाषा चुनें',
    },
    home: {
      heroEyebrow: 'माँ नर्मदा की पावन परिक्रमा यात्रा',
      heroTitlePrefix: 'दर्शन करें पावन पथ ',
      heroTitleHighlight: 'नर्मदा परिक्रमा',
      heroDesc:
        'पवित्र नर्मदा नदी की शाश्वत आध्यात्मिक परिक्रमा यात्रा की योजना बनाएं—सुगम मार्ग, पवित्र तीर्थ और संपूर्ण यात्रा जानकारी के साथ।',
      exploreBtn: 'परिक्रमा मार्ग देखें',
      placesBtn: 'पवित्र तीर्थ स्थल',
      stat1Number: '3,000+',
      stat1Label: 'किमी पावन यात्रा',
      stat2Number: '3',
      stat2Label: 'राज्य एवं क्षेत्र',
      stat3Number: '∞',
      stat3Label: 'आध्यात्मिक अनुभूति',
      riverCardTitle: 'माँ नर्मदा',
      riverCardSubtitle: 'एक पवित्र परिक्रमा, एक जीवन यात्रा',
      aboutEyebrow: 'यात्रा के बारे में',
      aboutTitle: 'श्रद्धा, नियम और आत्म-साक्षात्कार की पावन यात्रा।',
      aboutLead:
        'नर्मदा परिक्रमा केवल एक मार्ग नहीं, बल्कि जीवन की साधना है। यह डिजिटल मार्गदर्शिका श्रद्धालुओं के लिए यात्रा योजना, प्रमुख स्थल, मार्ग निर्देश और जरूरी सुविधाएं एक ही स्थान पर उपलब्ध कराती है।',
      parikramaEyebrow: 'पावन परिक्रमा मार्ग',
      parikramaTitle: 'सरल एवं व्यवस्थित परिक्रमा योजना',
      parikramaDesc: 'चरण-दर-चरण यात्रा को समझें और अपनी पूरी यात्रा के दौरान आवश्यक जानकारी सुलभ रखें।',
      step1Title: 'योजना बनाएं',
      step1Desc: 'मार्ग, शुभ समय, आवश्यक तैयारी एवं नियमों को अच्छी तरह समझें।',
      step2Title: 'दर्शन करें',
      step2Desc: 'प्रमुख घाट, प्राचीन मंदिर, आश्रम, नगर और पावन तीर्थों के दर्शन करें।',
      step3Title: 'अनुभूति प्राप्त करें',
      step3Desc: 'अपनी यात्रा को भक्तिभाव, सादगी और आध्यात्मिक गहराई के साथ पूर्ण करें।',
      placesEyebrow: 'पवित्र तीर्थ',
      placesTitle: 'माँ नर्मदा तट के पवित्र स्थल',
      placesDesc: 'सत्यापित तीर्थ विवरण, नक्शे और यात्रियों की सुविधाओं से युक्त संपूर्ण तीर्थ मार्गदर्शिका।',
      galleryEyebrow: 'गैलरी',
      galleryTitle: 'परिक्रमा के दिव्य दृश्य',
      ctaEyebrow: 'यात्रा का शुभारंभ करें',
      ctaTitle: 'क्या आप नर्मदा परिक्रमा की योजना बना रहे हैं?',
      ctaDesc: 'यात्रा बैच उपलब्धता, मार्ग विवरण एवं बुकिंग सहायता के लिए हमसे संपर्क करें।',
      ctaBtn: 'यात्रा की योजना बनाएं',
      footerTagline: 'माँ नर्मदा की पवित्र परिक्रमा के लिए आधुनिक डिजिटल मार्गदर्शिका।',
      footerExplore: 'प्रमुख लिंक',
      footerJourney: 'परिक्रमा',
      footerRoutePlanning: 'मार्ग योजना',
      footerSacredPlaces: 'पवित्र तीर्थ स्थल',
      footerTrips: '18-दिवसीय यात्राएं',
      footerRights: '© 2026 नर्मदा परिक्रमा। सर्वाधिकार सुरक्षित।',
    },
    trips: {
      heroEyebrow: 'पावन आध्यात्मिक यात्रा · 2026',
      heroTitle: 'नर्मदा परिक्रमा ',
      heroTitleHighlight: 'यात्राएं',
      heroDesc:
        'माँ नर्मदा की 18-दिवसीय पावन आध्यात्मिक परिक्रमा के आगामी टूर बैच — दर्शन, पूजा-अर्चना, सुगम यात्रा, भोजन एवं विश्राम की पूर्ण व्यवस्था।',
      heroCta: 'आगामी यात्राएं देखें',
      departuresEyebrow: 'आगामी प्रस्थान तिथियां',
      departuresTitle: 'अपनी परिक्रमा का ',
      departuresTitleHighlight: 'चयन करें',
      departuresDesc: 'वर्ष 2026 के लिए दो निर्धारित यात्रा बैच उपलब्ध हैं।',
      batch1Name: 'प्रथम बैच',
      batch1Depart: '20 अक्टूबर 2026',
      batch1Month: 'अक्टूबर 2026',
      batch1Return: '6 नवंबर 2026',
      batch2Name: 'द्वितीय बैच',
      batch2Depart: '14 नवंबर 2026',
      batch2Month: 'नवंबर 2026',
      batch2Return: '1 दिसंबर 2026',
      returnLabel: 'वापसी',
      durationLabel: 'अवधि',
      durationValue: '18 दिन',
      departureLabel: 'प्रस्थान स्थल',
      departureValue: 'मुंबई / पुणे',
      costLabel: 'यात्रा शुल्क',
      costValue: '₹50,000 / व्यक्ति',
      availability: 'सीमित सीटें — शीघ्र बुकिंग करें',
      bookBtn: 'यह यात्रा बुक करें',
      includedKicker: 'सुविधाएं शामिल',
      includedText:
        'संपूर्ण सात्विक भोजन · प्रतिदिन 1 लीटर मिनरल वाटर · वाहन सुविधा · यात्रा मार्गदर्शक · मानक होटल / धर्मशाला आवास',
      priceNote: 'ईंधन की कीमतों में अचानक वृद्धि होने पर दरों में परिवर्तन संभव है।',
      itineraryEyebrow: 'दिन-प्रतिदिन का कार्यक्रम',
      itineraryTitle: '18-दिवसीय यात्रा ',
      itineraryTitleHighlight: 'विवरण',
      itineraryDesc: 'प्रत्येक दिन दर्शन, पावन अनुष्ठान, यात्रा, सात्विक भोजन और विश्राम के अनुसार सुनियोजित है।',
      itinerary: [
        { day: 'दिन 1', title: 'स्थान → उज्जैन', description: 'मुंबई या पुणे से प्रस्थान एवं महाकालेश्वर ज्योतिर्लिंग की पावन नगरी उज्जैन यात्रा।' },
        { day: 'दिन 2', title: 'उज्जैन · महाकाल दर्शन', description: 'श्री महाकालेश्वर मंदिर, रामघाट, हरसिद्धि शक्तिपीठ एवं काल भैरव दर्शन।' },
        { day: 'दिन 3', title: 'इंदौर दर्शन → ओंकारेश्वर', description: 'इंदौर शहर भ्रमण उपरांत 12 ज्योतिर्लिंगों में प्रमुख ओंकारेश्वर प्रस्थान।' },
        { day: 'दिन 4', title: 'ओंकारेश्वर · संकल्प · बड़वानी', description: 'ओंकारेश्वर ज्योतिर्लिंग दर्शन, परिक्रमा संकल्प एवं कुमारिका पूजन के उपरांत बड़वानी प्रस्थान।' },
        { day: 'दिन 5', title: 'राजघाट · एकमुखी दत्त मंदिर · राजपीपला', description: 'राजघाट पर पावन स्नान, एकमुखी दत्त मंदिर दर्शन एवं राजपीपला यात्रा।' },
        { day: 'दिन 6', title: 'कुंभेश्वर · विमलेश्वर · मीठीतलाई', description: 'कुंभेश्वर दर्शन एवं विमलेश्वर से ऐतिहासिक समुद्री मार्ग द्वारा पवित्र तट परिवर्तन।' },
        { day: 'दिन 7', title: 'मीठीतलाई → गरुड़ेश्वर', description: 'गरुड़ेश्वर यात्रा, भगवान विष्णु के वाहन गरुड़ जी से जुड़ा अत्यंत पावन तीर्थ।' },
        { day: 'दिन 8', title: 'टेंबे स्वामी समाधि · महेश्वर', description: 'टेंबे स्वामी समाधि एवं दत्त मंदिर दर्शन, तत्पश्चात ऐतिहासिक महेश्वर प्रस्थान।' },
        { day: 'दिन 9', title: 'रेवा कुंड · मांडू · महेश्वर किला', description: 'रेवा कुंड एवं मांडू दर्शन, राजराजेश्वरी मंदिर तथा देवी अहिल्याबाई का किला व राजमहल।' },
        { day: 'दिन 10', title: 'पवित्र स्नान · दत्त दर्शन · नेमावर/खातेगांव', description: 'पावन स्नान, दत्त मंदिर दर्शन और पवित्र नाभि स्थल नेमावर अथवा खातेगांव यात्रा।' },
        { day: 'दिन 11', title: 'पवित्र स्नान · सिद्धेश्वर · भेड़ाघाट', description: 'सिद्धेश्वर मंदिर दर्शन एवं संगमरमरी वादियों के विश्वप्रसिद्ध भेड़ाघाट प्रस्थान।' },
        { day: 'दिन 12', title: 'चौंसठ योगिनी · धुआंधार जलप्रपात · अमरकंटक', description: 'चौंसठ योगिनी मंदिर एवं धुआंधार जलप्रपात दर्शन के बाद अमरकंटक प्रस्थान।' },
        { day: 'दिन 13', title: 'अमरकंटक · कपिलधारा · ओटी भरण', description: 'पवित्र जलप्रपातों के दर्शन एवं माँ नर्मदा के उद्गम स्थल पर पावन ओटी भरण पूजन।' },
        { day: 'दिन 14', title: 'माई का बगीचा · सोन-नर्मदा · श्री यंत्र · नरसिंहपुर', description: 'माई का बगीचा, गुलबकावली, सोन-नर्मदा संगम एवं श्री यंत्र मंदिर दर्शन उपरांत नरसिंहपुर प्रस्थान।' },
        { day: 'दिन 15', title: 'नरसिंहपुर → नर्मदापुरम', description: 'नर्मदा तट के प्रमुख पावन तीर्थ स्थल नर्मदापुरम (होशंगाबाद) यात्रा।' },
        { day: 'दिन 16', title: 'सेठानी घाट · नर्मदा माई पूजन · शनि मंदिर', description: 'प्रसिद्ध सेठानी घाट पर पावन स्नान, नर्मदा माई विशेष पूजन एवं शनि मंदिर दर्शन।' },
        { day: 'दिन 17', title: 'ओंकारेश्वर · संकल्प पूर्ति · मुंबई वापसी', description: 'ओंकारेश्वर में पावन संकल्प पूर्ति, ममलेश्वर दर्शन एवं मुंबई/पुणे के लिए प्रस्थान।' },
        { day: 'दिन 18', title: 'आगमन · मुंबई / पुणे', description: 'मुंबई या पुणे सकुशल आगमन। नर्मदा परिक्रमा पूर्ण एवं पावन संकल्प सिद्ध।' },
      ],
      bookingEyebrow: 'यात्रा के लिए तैयार हैं?',
      bookingTitle: 'अपनी परिक्रमा ',
      bookingTitleHighlight: 'शुरू करें',
      bookingDesc: 'अपनी पसंद का बैच चुनें और सीट उपलब्धता व बुकिंग के लिए संपर्क करें।',
      enquireBtn: 'पूछताछ करें',
      contactEyebrow: 'संपर्क करें',
      contactTitle: 'अपनी यात्रा की ',
      contactTitleHighlight: 'योजना बनाएं',
      contactDesc: 'बुकिंग, बैच उपलब्धता और यात्रा संबंधी सभी जानकारी के लिए हमसे सीधा संपर्क करें।',
      footerBrandText: 'नर्मदा परिक्रमा',
      footerTagline: 'माँ नर्मदा की पावन परिक्रमा यात्रा।',
      footerRights: '© 2026 नर्मदा परिक्रमा। सर्वाधिकार सुरक्षित।',
    },
    modal: {
      title: 'यात्रा की योजना बनाएं',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'आपका नाम',
      emailLabel: 'ईमेल',
      emailPlaceholder: 'your.email@example.com',
      phoneLabel: 'फ़ोन नंबर',
      phonePlaceholder: '+91 9958503108',
      messageLabel: 'संदेश',
      messagePlaceholder: 'अपना पसंदीदा बैच या कोई विशिष्ट प्रश्न यहाँ लिखें...',
      submitBtn: 'अनुरोध भेजें →',
      submittingBtn: 'भेजा जा रहा है...',
      errNameReq: 'कृपया अपना नाम दर्ज करें।',
      errNameMin: 'नाम कम से कम 2 अक्षरों का होना चाहिए।',
      errEmailReq: 'कृपया अपना ईमेल पता दर्ज करें।',
      errEmailValid: 'कृपया एक वैध ईमेल पता दर्ज करें।',
      errPhoneReq: 'कृपया अपना फ़ोन नंबर दर्ज करें।',
      errPhoneValid: 'कृपया एक वैध फ़ोन नंबर दर्ज करें (कम से कम 7 अंक)।',
      errMessageReq: 'कृपया अपना संदेश दर्ज करें।',
      errMessageMin: 'संदेश कम से कम 5 अक्षरों का होना चाहिए।',
      successDefault: 'धन्यवाद! आपकी पूछताछ सफलतापूर्वक भेज दी गई है।',
      errorDefault: 'संदेश भेजने में असमर्थ। कृपया पुनः प्रयास करें या सीधे संपर्क करें।',
      closeAria: 'बंद करें',
    },
  },
  mr: {
    nav: {
      home: 'होम',
      about: 'माहिती',
      parikrama: 'परिक्रमा',
      places: 'तीर्थक्षेत्रे',
      gallery: 'गॅलरी',
      contact: 'संपर्क',
      trips: 'यात्रा',
      planYatra: 'यात्रेचे नियोजन करा',
      selectLanguage: 'भाषा निवडा',
    },
    home: {
      heroEyebrow: 'आई नर्मदेची पावन परिक्रमा यात्रा',
      heroTitlePrefix: 'अनुभवा पवित्र मार्ग ',
      heroTitleHighlight: 'नर्मदा परिक्रमा',
      heroDesc:
        'पवित्र नर्मदा नदीच्या शाश्वत आध्यात्मिक परिक्रमा यात्रेचे नियोजन करा—स्पष्ट मार्ग, पवित्र तीर्थक्षेत्रे आणि संपूर्ण प्रवास माहितीसह.',
      exploreBtn: 'परिक्रमा मार्ग पाहा',
      placesBtn: 'पवित्र तीर्थक्षेत्रे',
      stat1Number: '3,000+',
      stat1Label: 'किमी पावन प्रवास',
      stat2Number: '3',
      stat2Label: 'राज्ये व प्रदेश',
      stat3Number: '∞',
      stat3Label: 'आध्यात्मिक क्षण',
      riverCardTitle: 'आई नर्मदा',
      riverCardSubtitle: 'एक पवित्र परिक्रमा, एक जीवन यात्रा',
      aboutEyebrow: 'यात्रेविषयी',
      aboutTitle: 'भक्ती, शिस्त आणि आत्मशोधाची पावन यात्रा.',
      aboutLead:
        'नर्मदा परिक्रमा केवळ नकाशावरील मार्ग नसून जीवनाची एक तपश्चर्या आहे. ही वेबसाईट भाविकांसाठी नियोजन, महत्त्वाची ठिकाणे, मार्गदर्शिका आणि उपयुक्त सुविधा एकाच ठिकाणी उपलब्ध करून देते.',
      parikramaEyebrow: 'पवित्र परिक्रमा मार्ग',
      parikramaTitle: 'परिक्रमेचे सुलभ व स्पष्ट नियोजन',
      parikramaDesc: 'टप्प्याटप्प्याने यात्रा समजून घ्या आणि आपल्या संपूर्ण यात्रेदरम्यान महत्त्वाची माहिती सोबत ठेवा.',
      step1Title: 'नियोजन करा',
      step1Desc: 'मार्ग, वेळ, आवश्यक तयारी आणि नियमांची संपूर्ण माहिती मिळवा.',
      step2Title: 'दर्शन घ्या',
      step2Desc: 'घाट, मंदिरे, आश्रम, शहरे आणि पवित्र तीर्थस्थळांचे दर्शन घ्या.',
      step3Title: 'अनुभव घ्या',
      step3Desc: 'आपली यात्रा भक्ती, साधेपणा आणि आध्यात्मिक अनुभूतीने परिपूर्ण करा.',
      placesEyebrow: 'पवित्र तीर्थक्षेत्रे',
      placesTitle: 'नर्मदा काठावरील पावन स्थळे',
      placesDesc: 'सत्यापित तीर्थस्थळ माहिती, नकाशे आणि यात्रेकरूंच्या सुविधांसह संपूर्ण मार्गदर्शिका.',
      galleryEyebrow: 'गॅलरी',
      galleryTitle: 'परिक्रमेची विहंगम दृश्ये',
      ctaEyebrow: 'प्रवासाची सुरुवात करा',
      ctaTitle: 'नर्मदा परिक्रमेचे नियोजन करण्यास तयार आहात?',
      ctaDesc: 'टूर बॅच उपलब्धता, मार्ग माहिती आणि बुकिंग सहाय्यासाठी आमच्याशी संपर्क साधा.',
      ctaBtn: 'यात्रेचे नियोजन करा',
      footerTagline: 'पवित्र नर्मदा यात्रेसाठी आधुनिक डिजिटल मार्गदर्शिका.',
      footerExplore: 'महत्त्वाचे दुवे',
      footerJourney: 'परिक्रमा',
      footerRoutePlanning: 'मार्ग नियोजन',
      footerSacredPlaces: 'पवित्र तीर्थक्षेत्रे',
      footerTrips: '18-दिवसीय यात्रा',
      footerRights: '© 2026 नर्मदा परिक्रमा. सर्व हक्क राखीव.',
    },
    trips: {
      heroEyebrow: 'पवित्र आध्यात्मिक यात्रा · 2026',
      heroTitle: 'नर्मदा परिक्रमा ',
      heroTitleHighlight: 'यात्रा',
      heroDesc:
        'आई नर्मदेच्या १८-दिवसीय पवित्र आध्यात्मिक परिक्रमेच्या आगामी टूर बॅचेस — दर्शन, धार्मिक विधी, प्रवास, भोजन आणि विश्रांतीची उत्तम सोय.',
      heroCta: 'आगामी यात्रा पाहा',
      departuresEyebrow: 'आगामी प्रस्थान',
      departuresTitle: 'आपली परिक्रमा ',
      departuresTitleHighlight: 'निवडा',
      departuresDesc: '२०२६ सालासाठी दोन नियोजित यात्रा बॅचेस उपलब्ध आहेत.',
      batch1Name: 'पहिली बॅच',
      batch1Depart: '20 ऑक्टोबर 2026',
      batch1Month: 'ऑक्टोबर 2026',
      batch1Return: '6 नोव्हेंबर 2026',
      batch2Name: 'दुसरी बॅच',
      batch2Depart: '14 नोव्हेंबर 2026',
      batch2Month: 'नोव्हेंबर 2026',
      batch2Return: '1 डिसेंबर 2026',
      returnLabel: 'परत आगमन',
      durationLabel: 'कालावधी',
      durationValue: '18 दिवस',
      departureLabel: 'प्रस्थान ठिकाण',
      departureValue: 'मुंबई / पुणे',
      costLabel: 'यात्रा खर्च',
      costValue: '₹50,000 / व्यक्ती',
      availability: 'मर्यादित जागा — त्वरित नोंदणी करा',
      bookBtn: 'ही यात्रा बुक करा',
      includedKicker: 'समाविष्ट सुविधा',
      includedText:
        'संपूर्ण सात्विक भोजन · दररोज १ लिटर मिनरल वॉटर · वाहन सुविधा · टूर मार्गदर्शक · हॉटेल / धर्मशाळा निवास',
      priceNote: 'इंधनाच्या दरात अचानक वाढ झाल्यास शुल्कात बदल होऊ शकतो.',
      itineraryEyebrow: 'दिवसनिहाय कार्यक्रम',
      itineraryTitle: '18-दिवसीय यात्रा ',
      itineraryTitleHighlight: 'रूपरेषा',
      itineraryDesc: 'प्रत्येक दिवस दर्शन, पवित्र विधी, प्रवास, सात्विक भोजन आणि विश्रांतीसाठी सुव्यवस्थित नियोजित आहे.',
      itinerary: [
        { day: 'दिवस 1', title: 'प्रस्थान → उज्जैन', description: 'मुंबई किंवा पुणे येथून प्रस्थान आणि महाकालेश्वर ज्योतिर्लिंगाची नगरी उज्जैनकडे प्रवास.' },
        { day: 'दिवस 2', title: 'उज्जैन · महाकाल दर्शन', description: 'श्री महाकालेश्वर मंदिर, रामघाट, हरसिद्धी माता मंदिर आणि कालभैरव दर्शन.' },
        { day: 'दिवस 3', title: 'इंदूर दर्शन → ओंकारेश्वर', description: 'इंदूर दर्शन आणि त्यानंतर १२ ज्योतिर्लिंगांपैकी एक असलेल्या ओंकारेश्वरकडे प्रस्थान.' },
        { day: 'दिवस 4', title: 'ओंकारेश्वर · संकल्प · बडवानी', description: 'ओंकारेश्वर दर्शन, प्रदक्षिणा संकल्प आणि कुमारिका पूजनानंतर बडवानीकडे प्रस्थान.' },
        { day: 'दिवस 5', title: 'राजघाट · एकमुखी दत्त मंदिर · राजपिंपळा', description: 'राजघाट येथे पवित्र स्नान, एकमुखी दत्त मंदिर दर्शन आणि राजपिंपळाकडे प्रवास.' },
        { day: 'दिवस 6', title: 'कुंभेश्वर · विमलेश्वर · मीठीतलाई', description: 'कुंभेश्वर दर्शन आणि ऐतिहासिक विमलेश्वर सागरी मार्गाने तट परिवर्तन.' },
        { day: 'दिवस 7', title: 'मीठीतलाई → गरुडेश्वर', description: 'गरुडेश्वरकडे प्रवास, भगवान विष्णूंचे वाहन असलेल्या गरुडाशी संबंधित पवित्र स्थान.' },
        { day: 'दिवस 8', title: 'टेंबे स्वामी समाधी · महेश्वर', description: 'टेंबे स्वामी समाधी आणि दत्त मंदिरात नतमस्तक होऊन महेश्वरकडे प्रस्थान.' },
        { day: 'दिवस 9', title: 'रेवा कुंड · मांडू · महेश्वर किल्ला', description: 'रेवा कुंड आणि मांडू दर्शन, त्यानंतर राजराजेश्वरी मंदिर आणि अहिल्याबाईंचा किल्ला व वाडा.' },
        { day: 'दिवस 10', title: 'पवित्र स्नान · दत्त दर्शन · नेमावर/खातेगाव', description: 'पवित्र स्नान, दत्त मंदिर दर्शन आणि पावन नाभी क्षेत्र नेमावर किंवा खातेगावकडे प्रवास.' },
        { day: 'दिवस 11', title: 'पवित्र स्नान · सिद्धेश्वर · भेडाघाट', description: 'सिद्धेश्वर मंदिर दर्शन आणि त्यानंतर भेडाघाटच्या संगमरवरी घाटांकडे प्रवास.' },
        { day: 'दिवस 12', title: 'चौसष्ठ योगिनी · धुंवाधार धबधबा · अमरकंटक', description: 'चौसष्ठ योगिनी मंदिर आणि धुंवाधार धबधबा दर्शनानंतर अमरकंटककडे प्रस्थान.' },
        { day: 'दिवस 13', title: 'अमरकंटक · कपिलधारा · ओटी भरण', description: 'पवित्र धबधब्यांचे दर्शन आणि नर्मदा उद्गम स्थानी ओटी भरण विधी.' },
        { day: 'दिवस 14', title: 'माई का बगीचा · सोन-नर्मदा · श्री यंत्र · नरसिंगपूर', description: 'माई का बगीचा, गुलबकावली, सोन-नर्मदा संगम आणि श्री यंत्र मंदिर दर्शनानंतर नरसिंगपूरकडे प्रवास.' },
        { day: 'दिवस 15', title: 'नरसिंगपूर → नर्मदापुरम', description: 'नर्मदा नदीवरील पवित्र तीर्थक्षेत्र नर्मदापुरम (होशंगाबाद) येथे प्रवास.' },
        { day: 'दिवस 16', title: 'सेठानी घाट · नर्मदा माई पूजन · शनी मंदिर', description: 'सेठानी घाटावर पवित्र स्नान, नर्मदा माई पूजन आणि शनी मंदिर दर्शन.' },
        { day: 'दिवस 17', title: 'ओंकारेश्वर · संकल्प पूर्ती · मुंबई प्रस्थान', description: 'ओंकारेश्वर येथे पावन संकल्प पूर्ती, ममलेश्वर दर्शन आणि मुंबई/पुणे प्रस्थान.' },
        { day: 'दिवस 18', title: 'आगमन · मुंबई / पुणे', description: 'मुंबई किंवा पुणे येथे आगमन. नर्मदा परिक्रमा संपन्न आणि पवित्र संकल्प पूर्ण.' },
      ],
      bookingEyebrow: 'यात्रेसाठी सज्ज आहात?',
      bookingTitle: 'आपली परिक्रमा ',
      bookingTitleHighlight: 'सुरू करा',
      bookingDesc: 'आपली पसंतीची बॅच निवडा आणि जागा उपलब्धता व बुकिंग तपशिलांसाठी आमच्याशी संपर्क साधा.',
      enquireBtn: 'चौकशी करा',
      contactEyebrow: 'संपर्क',
      contactTitle: 'आपल्या यात्रेचे ',
      contactTitleHighlight: 'नियोजन करा',
      contactDesc: 'बुकिंग, बॅच उपलब्धता आणि प्रवासाच्या माहितीसाठी आमच्याशी थेट संपर्क साधा.',
      footerBrandText: 'नर्मदा परिक्रमा',
      footerTagline: 'आई नर्मदेची पावन परिक्रमा यात्रा.',
      footerRights: '© 2026 नर्मदा परिक्रमा. सर्व हक्क राखीव.',
    },
    modal: {
      title: 'यात्रेचे नियोजन करा',
      nameLabel: 'पूर्ण नाव',
      namePlaceholder: 'आपले नाव',
      emailLabel: 'ईमेल',
      emailPlaceholder: 'your.email@example.com',
      phoneLabel: 'फोन नंबर',
      phonePlaceholder: '+91 9958503108',
      messageLabel: 'संदेश',
      messagePlaceholder: 'आपली पसंतीची बॅच किंवा कोणताही प्रश्न येथे लिहा...',
      submitBtn: 'विनंती पाठवा →',
      submittingBtn: 'पाठवत आहे...',
      errNameReq: 'कृपया आपले नाव प्रविष्ट करा.',
      errNameMin: 'नाव किमान २ अक्षरांचे असावे.',
      errEmailReq: 'कृपया आपला ईमेल पत्ता प्रविष्ट करा.',
      errEmailValid: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा.',
      errPhoneReq: 'कृपया आपला फोन नंबर प्रविष्ट करा.',
      errPhoneValid: 'कृपया वैध फोन नंबर प्रविष्ट करा (किमान ७ अंक).',
      errMessageReq: 'कृपया आपला संदेश प्रविष्ट करा.',
      errMessageMin: 'संदेश किमान ५ अक्षरांचा असावा.',
      successDefault: 'धन्यवाद! आपली चौकशी यशस्वीरित्या पाठवली गेली आहे.',
      errorDefault: 'चौकशी पाठवता आली नाही. कृपया पुन्हा प्रयत्न करा किंवा थेट संपर्क साधा.',
      closeAria: 'बंद करा',
    },
  },
  gu: {
    nav: {
      home: 'હોમ',
      about: 'પરિચય',
      parikrama: 'પરિક્રમા',
      places: 'યાત્રાધામો',
      gallery: 'ગેલેરી',
      contact: 'સંપર્ક',
      trips: 'યાત્રાઓ',
      planYatra: 'યાત્રાનું આયોજન કરો',
      selectLanguage: 'ભાષા પસંદ કરો',
    },
    home: {
      heroEyebrow: 'માં નર્મદાની પવિત્ર પરિક્રમા યાત્રા',
      heroTitlePrefix: 'દર્શન કરો પવિત્ર પથ ',
      heroTitleHighlight: 'નર્મદા પરિક્રમા',
      heroDesc:
        'પવિત્ર નર્મદા નદીની શાશ્વત આધ્યાત્મિક પરિક્રમા યાત્રાનું આયોજન કરો—સરળ માર્ગ, પવિત્ર તીર્થસ્થાનો અને સંપૂર્ણ પ્રવાસ માહિતી સાથે.',
      exploreBtn: 'પરિક્રમા માર્ગ જુઓ',
      placesBtn: 'પવિત્ર તીર્થસ્થાનો',
      stat1Number: '3,000+',
      stat1Label: 'કિમી પવિત્ર યાત્રા',
      stat2Number: '3',
      stat2Label: 'રાજ્યો અને પ્રદેશો',
      stat3Number: '∞',
      stat3Label: 'આધ્યાત્મિક અનુભૂતિ',
      riverCardTitle: 'માં નર્મદા',
      riverCardSubtitle: 'એક પવિત્ર પરિક્રમા, એક જીવન યાત્રા',
      aboutEyebrow: 'યાત્રા વિશે',
      aboutTitle: 'ભક્તિ, શિસ્ત અને આત્મસાક્ષાત્કારની પવિત્ર યાત્રા.',
      aboutLead:
        'નર્મદા પરિક્રમા ફક્ત નકશા પરનો માર્ગ નથી પરંતુ જીવનની આધ્યાત્મિક સાધના છે. આ વેબસાઇટ યાત્રાળુઓ માટે આયોજન, મહત્વપૂર્ણ સ્થાનો, માર્ગદર્શન અને સુવિધાઓ એક જ સ્થળે પૂરી પાડે છે.',
      parikramaEyebrow: 'પવિત્ર પરિક્રમા માર્ગ',
      parikramaTitle: 'પરિક્રમાનું સરળ અને સ્પષ્ટ આયોજન',
      parikramaDesc: 'તબક્કાવાર યાત્રા સમજો અને તમારી સમગ્ર યાત્રા દરમિયાન જરૂરી માહિતી સુલભ રાખો.',
      step1Title: 'આયોજન કરો',
      step1Desc: 'માર્ગ, યોગ્ય સમય, જરૂરી તૈયારી અને નિયમોને સારી રીતે સમજો.',
      step2Title: 'દર્શન કરો',
      step2Desc: 'ઘાટ, મંદિરો, આશ્રમો, નગરો અને પવિત્ર તીર્થધામોના દર્શન કરો.',
      step3Title: 'અનુભવ મેળવો',
      step3Desc: 'તમારી યાત્રાને ભક્તિભાવ, સાદગી અને આધ્યાત્મિક ઊંડાણ સાથે પરિપૂર્ણ કરો.',
      placesEyebrow: 'પવિત્ર તીર્થધામો',
      placesTitle: 'માં નર્મદા કાંઠાના પવિત્ર સ્થળો',
      placesDesc: 'ચકાસાયેલ તીર્થ વિગતો, નકશાઓ અને યાત્રાળુઓની સુવિધાઓ સાથેની સંપૂર્ણ માર્ગદર્શિકા.',
      galleryEyebrow: 'ગેલેરી',
      galleryTitle: 'પરિક્રમાની દિવ્ય ક્ષણો',
      ctaEyebrow: 'યાત્રાની શરૂઆત કરો',
      ctaTitle: 'શું તમે નર્મદા પરિક્રમાનું આયોજન કરી રહ્યા છો?',
      ctaDesc: 'યાત્રા બેચ ઉપલબ્ધતા, માર્ગ વિગતો અને બુકિંગ સહાય માટે અમારો સંપર્ક કરો.',
      ctaBtn: 'યાત્રાનું આયોજન કરો',
      footerTagline: 'પવિત્ર નર્મદા યાત્રા માટે આધુનિક ડિજિટલ માર્ગદર્શિકા.',
      footerExplore: 'મહત્વપૂર્ણ લિંક્સ',
      footerJourney: 'પરિક્રમા',
      footerRoutePlanning: 'માર્ગ આયોજન',
      footerSacredPlaces: 'પવિત્ર તીર્થધામો',
      footerTrips: '18-દિવસીય યાત્રાઓ',
      footerRights: '© 2026 નર્મદા પરિક્રમા. સર્વાધિકાર સુરક્ષિત.',
    },
    trips: {
      heroEyebrow: 'પવિત્ર આધ્યાત્મિક યાત્રા · 2026',
      heroTitle: 'નર્મદા પરિક્રમા ',
      heroTitleHighlight: 'યાત્રાઓ',
      heroDesc:
        'માં નર્મદાની 18-દિવસીય પવિત્ર આધ્યાત્મિક પરિક્રમા માટે આગામી ટૂર બેચ — દર્શન, પૂજા-અર્ચના, મુસાફરી, સાત્વિક ભોજન અને આરામની ઉત્તમ વ્યવસ્થા.',
      heroCta: 'આગામી યાત્રાઓ જુઓ',
      departuresEyebrow: 'આગામી પ્રસ્થાન તારીખો',
      departuresTitle: 'તમારી પરિક્રમા ',
      departuresTitleHighlight: 'પસંદ કરો',
      departuresDesc: 'વર્ષ 2026 માટે બે નિર્ધારિત યાત્રા બેચ ઉપલબ્ધ છે.',
      batch1Name: 'પ્રથમ બેચ',
      batch1Depart: '20 ઓક્ટોબર 2026',
      batch1Month: 'ઓક્ટોબર 2026',
      batch1Return: '6 નવેમ્બર 2026',
      batch2Name: 'દ્વિતીય બેચ',
      batch2Depart: '14 નવેમ્બર 2026',
      batch2Month: 'નવેમ્બર 2026',
      batch2Return: '1 ડિસેમ્બર 2026',
      returnLabel: 'પરત આગમન',
      durationLabel: 'સમયગાળો',
      durationValue: '18 દિવસ',
      departureLabel: 'પ્રસ્થાન સ્થળ',
      departureValue: 'મુંબઈ / પુણે',
      costLabel: 'યાત્રા ખર્ચ',
      costValue: '₹50,000 / વ્યક્તિ',
      availability: 'મર્યાદિત બેઠકો — વહેલા તે પહેલાં બુક કરો',
      bookBtn: 'આ યાત્રા બુક કરો',
      includedKicker: 'સમાવિષ્ટ સુવિધાઓ',
      includedText:
        'સંપૂર્ણ સાત્વિક ભોજન · દરરોજ 1 લિટર મિનરલ વોટર · વાહન વ્યવસ્થા · ટૂર માર્ગદર્શક · હોટેલ / ધર્મશાળા આવાસ',
      priceNote: 'ઇંધણના ભાવમાં અચાનક વધારો થવાના સંજોગોમાં દરોમાં ફેરફાર થઈ શકે છે.',
      itineraryEyebrow: 'દૈનિક કાર્યક્રમ',
      itineraryTitle: '18-દિવસીય યાત્રા ',
      itineraryTitleHighlight: 'વિગત',
      itineraryDesc: 'દરેક દિવસ દર્શન, પવિત્ર વિધિ, મુસાફરી, સાત્વિક ભોજન અને આરામ માટે સુવ્યવસ્થિત આયોજિત છે.',
      itinerary: [
        { day: 'દિવસ 1', title: 'પ્રસ્થાન → ઉજ્જૈન', description: 'મુંબઈ અથવા પુણેથી પ્રસ્થાન અને મહાકાલેશ્વર જ્યોતિર્લિંગની નગરી ઉજ્જૈનનો પ્રવાસ.' },
        { day: 'દિવસ 2', title: 'ઉજ્જૈન · મહાકાલ દર્શન', description: 'મહાકાલેશ્વર મંદિર, રામઘાટ, હરસિદ્ધિ મંદિર અને કાલ ભૈરવ દર્શન.' },
        { day: 'દિવસ 3', title: 'ઇન્દોર દર્શન → ૐકારેશ્વર', description: 'ઇન્દોર દર્શન અને ત્યારબાદ 12 જ્યોતિર્લિંગો પૈકી એક ૐકારેશ્વર તરફ પ્રસ્થાન.' },
        { day: 'દિવસ 4', title: 'ૐકારેશ્વર · સંકલ્પ · બડવાની', description: 'ૐકારેશ્વર દર્શન, પરિક્રમા સંકલ્પ અને કુમારિકા પૂજન પછી બડવાની તરફ પ્રસ્થાન.' },
        { day: 'દિવસ 5', title: 'રાજઘાટ · એકમુખી દત્ત મંદિર · રાજપીપળા', description: 'રાજઘાટ પર પવિત્ર સ્નાન, એકમુખી દત્ત મંદિર દર્શન અને રાજપીપળાનો પ્રવાસ.' },
        { day: 'દિવસ 6', title: 'કુંભેશ્વર · વિમલેશ્વર · મીઠીતલાઈ', description: 'કુંભેશ્વર દર્શન અને ઐતિહાસિક વિમલેશ્વર સમુદ્રી માર્ગ દ્વારા તટ પરિવર્તન.' },
        { day: 'દિવસ 7', title: 'મીઠીતલાઈ → ગરુડેશ્વર', description: 'ગરુડેશ્વર પ્રવાસ, ભગવાન વિષ્ણુના વાહન ગરુડજી સાથે સંકળાયેલ પવિત્ર સ્થળ.' },
        { day: 'દિવસ 8', title: 'ટેમ્બે સ્વામી સમાધિ · મહેશ્વર', description: 'ટેમ્બે સ્વામી સમાધિ અને દત્ત મંદિર દર્શન, ત્યારબાદ મહેશ્વર તરફ પ્રયાણ.' },
        { day: 'દિવસ 9', title: 'રેવા કુંડ · માંડુ · મહેશ્વર કિલ્લો', description: 'રેવા કુંડ અને માંડુ દર્શન, ત્યારબાદ રાજરાજેશ્વરી મંદિર અને અહિલ્યાબાઈનો કિલ્લો તથા મહેલ.' },
        { day: 'દિવસ 10', title: 'પવિત્ર સ્નાન · દત્ત દર્શન · નેમાવર/ખાતેગાંવ', description: 'પવિત્ર સ્નાન, દત્ત મંદિર દર્શન અને પવિત્ર નાભિ ક્ષેત્ર નેમાવર અથવા ખાતેગાંવ તરફ પ્રવાસ.' },
        { day: 'દિવસ 11', title: 'પવિત્ર સ્નાન · સિદ્ધેશ્વર · ભેડાઘાટ', description: 'સિદ્ધેશ્વર મંદિર દર્શન અને ત્યારબાદ ભેડાઘાટના સંગેમરમર ઘાટો તરફ પ્રસ્થાન.' },
        { day: 'દિવસ 12', title: 'ચૌસઠ જોગણી · ધુઆંધાર ધોધ · અમરકંટક', description: 'ચૌસઠ જોગણી મંદિર અને ધુઆંધાર ધોધ દર્શન બાદ અમરકંટક તરફ પ્રસ્થાન.' },
        { day: 'દિવસ 13', title: 'અમરકંટક · કપિલધારા · ઓટી ભરણ', description: 'પવિત્ર ધોધના દર્શન અને માં નર્મદાના ઉદ્ગમ સ્થાને ઓટી ભરણ પૂજન.' },
        { day: 'દિવસ 14', title: 'માઈ કા બગીચા · સોન-નર્મદા · શ્રી યંત્ર · નરસિંહપુર', description: 'માઈ કા બગીચા, ગુલબકાવલી, સોન-નર્મદા સંગમ અને શ્રી યંત્ર મંદિર દર્શન બાદ નરસિંહપુર પ્રવાસ.' },
        { day: 'દિવસ 15', title: 'નરસિંહપુર → નર્મદાપુરમ', description: 'નર્મદા નદી પર સ્થિત પવિત્ર યાત્રાધામ નર્મદાપુરમ (હોશંગાબાદ) તરફ પ્રવાસ.' },
        { day: 'દિવસ 16', title: 'સેઠાણી ઘાટ · નર્મદા માઈ પૂજન · શનિ મંદિર', description: 'સેઠાણી ઘાટ પર પવિત્ર સ્નાન, નર્મદા માઈ પૂજન અને શનિ મંદિર દર્શન.' },
        { day: 'દિવસ 17', title: 'ૐકારેશ્વર · સંકલ્પ પૂર્તિ · મુંબઈ પ્રસ્થાન', description: 'ૐકારેશ્વરમાં પવિત્ર સંકલ્પ પૂર્તિ, મમલેશ્વર દર્શન અને મુંબઈ/પુણે પરત પ્રસ્થાન.' },
        { day: 'દિવસ 18', title: 'આગમન · મુંબઈ / પુણે', description: 'મુંબઈ અથવા પુણે આગમન. નર્મદા પરિક્રમા સંપન્ન અને પવિત્ર સંકલ્પ પૂર્ણ.' },
      ],
      bookingEyebrow: 'યાત્રા માટે તૈયાર છો?',
      bookingTitle: 'તમારી પરિક્રમા ',
      bookingTitleHighlight: 'શરૂ કરો',
      bookingDesc: 'તમારી પસંદગીની બેચ પસંદ કરો અને બેઠક ઉપલબ્ધતા તથા બુકિંગ માટે અમારો સંપર્ક કરો.',
      enquireBtn: 'પૂછપરછ કરો',
      contactEyebrow: 'સંપર્ક',
      contactTitle: 'તમારી યાત્રાનું ',
      contactTitleHighlight: 'આયોજન કરો',
      contactDesc: 'બુકિંગ, બેચ ઉપલબ્ધતા અને પ્રવાસની સંપૂર્ણ માહિતી માટે અમારો સીધો સંપર્ક કરો.',
      footerBrandText: 'નર્મદા પરિક્રમા',
      footerTagline: 'માં નર્મદાની પવित્ર પરિક્રમા યાત્રા.',
      footerRights: '© 2026 નર્મદા પરિક્રમા. સર્વાધિકાર સુરક્ષિત.',
    },
    modal: {
      title: 'યાત્રાનું આયોજન કરો',
      nameLabel: 'પૂરું નામ',
      namePlaceholder: 'તમારું નામ',
      emailLabel: 'ઈમેલ',
      emailPlaceholder: 'your.email@example.com',
      phoneLabel: 'ફોન નંબર',
      phonePlaceholder: '+91 9958503108',
      messageLabel: 'સંદેશ',
      messagePlaceholder: 'તમારી પસંદગીની બેચ અથવા પ્રશ્નો અહીં લખો...',
      submitBtn: 'વિનંતી મોકલો →',
      submittingBtn: 'મોકલી રહ્યું છે...',
      errNameReq: 'કૃપા કરીને તમારું નામ દાખલ કરો.',
      errNameMin: 'નામ ઓછામાં ઓછા ૨ અક્ષરોનું હોવું જોઈએ.',
      errEmailReq: 'કૃપા કરીને તમારું ઈમેલ સરનામું દાખલ કરો.',
      errEmailValid: 'કૃપા કરીને માન્ય ઈમેલ સરનામું દાખલ કરો.',
      errPhoneReq: 'કૃપા કરીને તમારો ફોન નંબર દાખલ કરો.',
      errPhoneValid: 'કૃપા કરીને માન્ય ફોન નંબર દાખલ કરો (ઓછામાં ઓછા ૭ અંક).',
      errMessageReq: 'કૃપા કરીને તમારો સંદેશ દાખલ કરો.',
      errMessageMin: 'સંદેશ ઓછામાં ઓછા ૫ અક્ષરોનો હોવો જોઈએ.',
      successDefault: 'આભાર! તમારી પૂછપરછ સફળતાપૂર્વક મોકલાઈ ગઈ છે.',
      errorDefault: 'પૂછપરછ મોકલી શકાઈ નથી. કૃપા કરીને ફરી પ્રયાસ કરો અથવા સીધો સંપર્ક કરો.',
      closeAria: 'બંધ કરો',
    },
  },
};

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('np_lang');
        if (saved && (saved === 'hi' || saved === 'en' || saved === 'mr' || saved === 'gu')) {
          return saved as Language;
        }
      } catch {
        // ignore
      }
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('np_lang', newLang);
      } catch {
        // ignore
      }
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang],
  };

  return React.createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
