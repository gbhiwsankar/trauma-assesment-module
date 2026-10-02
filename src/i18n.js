import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      header: {
        ministry: "Ministry of Social Justice & Empowerment, Govt. of India",
        language: "English",
        title: "Support Portal.",
        home: "Home",
        fileComplaint: "File a Complaint",
        assessment: "Clinical Screener",
        awareness: "Grounding Tools",
        rights: "Statutory Rights",
        helpline: "24x7 Helpline"
      },
      dashboard: {
        guideLabel: "Trauma & Recovery Guide",
        heroTitle: "Moving Forward After Abuse & Trauma.",
        heroDesc: "Healing from trauma is a deeply personal journey, but you never have to walk it alone. We offer clinically backed tools, compassionate AI-guided support, and secure legal avenues tailored to your needs.",
        btnComplaint: "File a Secure Complaint",
        btnScreener: "Start Clinical Screener",
        editorsPicks: "Editor's Picks",
        viewAll: "View all articles",
        tool1Label: "Interactive Tool",
        tool1Title: "Live Neuro-Stress & Trauma Screener",
        tool1Desc: "Assess your emotional distress levels securely and receive immediate AI-guided validation.",
        tool2Label: "Somatic Healing",
        tool2Title: "Somatic Breathing & Sensory Grounding",
        tool2Desc: "Regulate your nervous system with our 4-7-8 pacer and 5-4-3-2-1 sanctuary exercises.",
        tool3Label: "Statutory Rights",
        tool3Title: "Protective Justice Sanctuary (SC/ST PoA)",
        tool3Desc: "Understand Section 15A Witness Protection and mandatory relief compensation.",
        tool4Label: "Official Reporting",
        tool4Title: "File a Secure Complaint",
        tool4Desc: "Encrypted portal to securely report mental torture or harassment under the SC/ST Act."
      }
    }
  },
  hi: {
    translation: {
      header: {
        ministry: "सामाजिक न्याय और अधिकारिता मंत्रालय, भारत सरकार",
        language: "हिंदी",
        title: "सहायता पोर्टल.",
        home: "होम",
        fileComplaint: "शिकायत दर्ज करें",
        assessment: "क्लिनिकल स्क्रीनर",
        awareness: "ग्राउंडिंग टूल्स",
        rights: "वैधानिक अधिकार",
        helpline: "24x7 हेल्पलाइन"
      },
      dashboard: {
        guideLabel: "ट्रॉमा और रिकवरी गाइड",
        heroTitle: "दुर्व्यवहार और आघात के बाद आगे बढ़ना।",
        heroDesc: "आघात से उबरना एक गहरा व्यक्तिगत सफर है, लेकिन आपको कभी अकेले नहीं चलना पड़ेगा। हम आपकी आवश्यकताओं के अनुरूप नैदानिक रूप से समर्थित उपकरण, एआई-निर्देशित सहायता और सुरक्षित कानूनी रास्ते प्रदान करते हैं।",
        btnComplaint: "सुरक्षित शिकायत दर्ज करें",
        btnScreener: "क्लिनिकल स्क्रीनर शुरू करें",
        editorsPicks: "संपादक की पसंद",
        viewAll: "सभी लेख देखें",
        tool1Label: "इंटरएक्टिव टूल",
        tool1Title: "लाइव न्यूरो-स्ट्रेस और ट्रॉमा स्क्रीनर",
        tool1Desc: "सुरक्षित रूप से अपने भावनात्मक संकट के स्तर का आकलन करें और तत्काल एआई-निर्देशित मान्यता प्राप्त करें।",
        tool2Label: "दैहिक चिकित्सा",
        tool2Title: "सोमैटिक ब्रीदिंग और सेंसरी ग्राउंडिंग",
        tool2Desc: "हमारे 4-7-8 पेसर और 5-4-3-2-1 अभयारण्य अभ्यास के साथ अपने तंत्रिका तंत्र को नियंत्रित करें।",
        tool3Label: "वैधानिक अधिकार",
        tool3Title: "सुरक्षात्मक न्याय अभयारण्य (SC/ST PoA)",
        tool3Desc: "धारा 15A गवाह संरक्षण और अनिवार्य राहत मुआवजे को समझें।",
        tool4Label: "आधिकारिक रिपोर्टिंग",
        tool4Title: "सुरक्षित शिकायत दर्ज करें",
        tool4Desc: "एससी/एसटी अधिनियम के तहत मानसिक प्रताड़ना या उत्पीड़न की सुरक्षित रिपोर्ट करने के लिए एन्क्रिप्टेड पोर्टल।"
      }
    }
  },
  mr: {
    translation: {
      header: {
        ministry: "सामाजिक न्याय आणि सक्षमीकरण मंत्रालय, भारत सरकार",
        language: "मराठी",
        title: "मदत पोर्टल.",
        home: "मुख्यपृष्ठ",
        fileComplaint: "तक्रार नोंदवा",
        assessment: "क्लिनिकल स्क्रीनर",
        awareness: "ग्राउंडिंग टूल्स",
        rights: "वैधानिक अधिकार",
        helpline: "24x7 हेल्पलाइन"
      },
      dashboard: {
        guideLabel: "आघात आणि पुनर्प्राप्ती मार्गदर्शक",
        heroTitle: "गैरवर्तन आणि आघातानंतर पुढे जाणे.",
        heroDesc: "आघातापासून बरे होणे हा एक अत्यंत वैयक्तिक प्रवास आहे, परंतु तुम्हाला कधीही एकटे चालण्याची गरज नाही. आम्ही तुमच्या गरजेनुसार वैद्यकीयदृष्ट्या समर्थित साधने, AI-मार्गदर्शित समर्थन आणि सुरक्षित कायदेशीर मार्ग ऑफर करतो.",
        btnComplaint: "सुरक्षित तक्रार नोंदवा",
        btnScreener: "क्लिनिकल स्क्रीनर सुरू करा",
        editorsPicks: "संपादकांची निवड",
        viewAll: "सर्व लेख पहा",
        tool1Label: "परस्परसंवादी साधन",
        tool1Title: "लाइव्ह न्यूरो-स्ट्रेस आणि ट्रॅामा स्क्रीनर",
        tool1Desc: "सुरक्षितपणे आपल्या भावनिक त्रासाची पातळी तपासा आणि तत्काळ AI-मार्गदर्शित मान्यता प्राप्त करा.",
        tool2Label: "शारीरिक उपचार",
        tool2Title: "सोमॅटिक ब्रीदिंग आणि सेन्सरी ग्राउंडिंग",
        tool2Desc: "आमच्या 4-7-8 पेसर आणि 5-4-3-2-1 सॅंक्चुअरी व्यायामाने आपल्या मज्जासंस्थेचे नियमन करा.",
        tool3Label: "वैधानिक अधिकार",
        tool3Title: "संरक्षणात्मक न्याय अभयारण्य (SC/ST PoA)",
        tool3Desc: "कलम 15A साक्षीदार संरक्षण आणि अनिवार्य मदत भरपाई समजून घ्या.",
        tool4Label: "अधिकृत अहवाल",
        tool4Title: "सुरक्षित तक्रार नोंदवा",
        tool4Desc: "SC/ST कायद्यांतर्गत मानसिक छळ किंवा छळाची सुरक्षितपणे तक्रार करण्यासाठी एन्क्रिप्टेड पोर्टल."
      }
    }
  },
  bn: {
    translation: {
      header: {
        ministry: "সামাজিক ন্যায় ও ক্ষমতায়ন মন্ত্রণালয়, ভারত সরকার",
        language: "বাংলা",
        title: "সহায়তা পোর্টাল.",
        home: "হোম",
        fileComplaint: "অভিযোগ দায়ের করুন",
        assessment: "ক্লিনিক্যাল স্ক্রিনার",
        awareness: "গ্রাউন্ডিং টুলস",
        rights: "বিধিবদ্ধ অধিকার",
        helpline: "24x7 হেল্পলাইন"
      },
      dashboard: {
        guideLabel: "ট্রমা ও রিকভারি গাইড",
        heroTitle: "নির্যাতন ও ট্রমার পরে এগিয়ে যাওয়া।",
        heroDesc: "ট্রমা থেকে নিরাময় একটি গভীরভাবে ব্যক্তিগত যাত্রা, তবে আপনাকে কখনও একা হাঁটতে হবে চিন্তার কোন কারণ নেই। আমরা আপনার প্রয়োজন অনুসারে ক্লিনিক্যালি সমর্থিত টুলস, এআই-নির্দেশিত সমর্থন এবং নিরাপদ আইনি উপায় সরবরাহ করি।",
        btnComplaint: "একটি নিরাপদ অভিযোগ দায়ের করুন",
        btnScreener: "ক্লিনিক্যাল স্ক্রিনার শুরু করুন",
        editorsPicks: "সম্পাদকের পছন্দ",
        viewAll: "সব প্রবন্ধ দেখুন",
        tool1Label: "ইন্টারেক্টিভ টুল",
        tool1Title: "লাইভ নিউরো-স্ট্রেস ও ট্রমা স্ক্রিনার",
        tool1Desc: "নিরাপদে আপনার মানসিক চাপের মাত্রা মূল্যায়ন করুন এবং অবিলম্বে এআই-নির্দেশিত বৈধতা পান।",
        tool2Label: "সোম্যাটিক হিলিং",
        tool2Title: "সোম্যাটিক শ্বাস ও সংবেদনশীল গ্রাউন্ডিং",
        tool2Desc: "আমাদের 4-7-8 পেসার এবং 5-4-3-2-1 অভয়ারণ্য ব্যায়াম দিয়ে আপনার স্নায়ুতন্ত্র নিয়ন্ত্রণ করুন।",
        tool3Label: "বিধিবদ্ধ অধিকার",
        tool3Title: "প্রতিরক্ষামূলক ন্যায়বিচার অভয়ারণ্য (SC/ST PoA)",
        tool3Desc: "ধারা 15A সাক্ষী সুরক্ষা এবং বাধ্যতামূলক ত্রাণ ক্ষতিপূরণ বুঝুন।",
        tool4Label: "অফিসিয়াল রিপোর্টিং",
        tool4Title: "একটি নিরাপদ অভিযোগ দায়ের করুন",
        tool4Desc: "SC/ST আইনের অধীনে মানসিক নির্যাতন বা হয়রানির নিরাপদে রিপোর্ট করার জন্য এনক্রিপ্ট করা পোর্টাল।"
      }
    }
  },
  ta: {
    translation: {
      header: {
        ministry: "சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம், இந்திய அரசு",
        language: "தமிழ்",
        title: "ஆதரவு போர்டல்.",
        home: "முகப்பு",
        fileComplaint: "புகார் அளிக்கவும்",
        assessment: "மருத்துவ மதிப்பீட்டாளர்",
        awareness: "கிரவுண்டிங் கருவிகள்",
        rights: "சட்டப்பூர்வ உரிமைகள்",
        helpline: "24x7 ஹெல்ப்லைன்"
      },
      dashboard: {
        guideLabel: "அதிர்ச்சி மற்றும் மீட்பு வழிகாட்டி",
        heroTitle: "துஷ்பிரயோகம் மற்றும் அதிர்ச்சிக்குப் பிறகு முன்னேறுதல்.",
        heroDesc: "அதிர்ச்சியிலிருந்து விடுபடுவது ஒரு ஆழமான தனிப்பட்ட பயணமாகும், ஆனால் நீங்கள் ஒருபோதும் தனியாக நடக்க வேண்டியதில்லை. நாங்கள் மருத்துவ ரீதியாக ஆதரிக்கப்படும் கருவிகள், AI வழிகாட்டுதலுடன் கூடிய ஆதரவு மற்றும் உங்கள் தேவைகளுக்கு ஏற்ப பாதுகாப்பான சட்ட வழிகளை வழங்குகிறோம்.",
        btnComplaint: "பாதுகாப்பான புகாரை தாக்கல் செய்",
        btnScreener: "மருத்துவ மதிப்பீட்டாளரைத் தொடங்கு",
        editorsPicks: "ஆசிரியரின் தேர்வுகள்",
        viewAll: "அனைத்து கட்டுரைகளையும் காண்க",
        tool1Label: "ஊடாடும் கருவி",
        tool1Title: "லைவ் நியூரோ-ஸ்ட்ரெஸ் & ட்ராமா ஸ்கிரீனர்",
        tool1Desc: "உங்கள் உணர்ச்சிகரமான மன உளைச்சல் அளவை பாதுகாப்பாக மதிப்பிட்டு, உடனடி AI-வழிகாட்டப்பட்ட சரிபார்த்தலைப் பெறுங்கள்.",
        tool2Label: "உடலியல் சிகிச்சை",
        tool2Title: "சோமாடிக் சுவாசம் மற்றும் உணர்ச்சி நிலைகொள்ளுதல்",
        tool2Desc: "எங்கள் 4-7-8 பேஸர் மற்றும் 5-4-3-2-1 சரணாலயப் பயிற்சிகள் மூலம் உங்கள் நரம்பு மண்டலத்தை சீராக்குங்கள்.",
        tool3Label: "சட்டப்பூர்வ உரிமைகள்",
        tool3Title: "பாதுகாப்பு நீதி சரணாலயம் (SC/ST PoA)",
        tool3Desc: "பிரிவு 15A சாட்சி பாதுகாப்பு மற்றும் கட்டாய நிவாரண இழப்பீடு ஆகியவற்றைப் புரிந்து கொள்ளுங்கள்.",
        tool4Label: "அதிகாரப்பூர்வ அறிக்கை",
        tool4Title: "பாதுகாப்பான புகாரை தாக்கல் செய்",
        tool4Desc: "எஸ்சி/எஸ்டி சட்டத்தின் கீழ் மன சித்திரவதை அல்லது துன்புறுத்தலை பாதுகாப்பாக புகாரளிக்க என்க்ரிப்ட் செய்யப்பட்ட போர்டல்."
      }
    }
  },
  te: {
    translation: {
      header: {
        ministry: "సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
        language: "తెలుగు",
        title: "సపోర్ట్ పోర్టల్.",
        home: "హోమ్",
        fileComplaint: "ఫిర్యాదు చేయండి",
        assessment: "క్లినికల్ స్క్రీనర్",
        awareness: "గ్రౌండింగ్ టూల్స్",
        rights: "చట్టబద్ధమైన హక్కులు",
        helpline: "24x7 హెల్ప్‌లైన్"
      },
      dashboard: {
        guideLabel: "ట్రామా & రికవరీ గైడ్",
        heroTitle: "వేధింపులు మరియు ట్రామా తర్వాత ముందుకు సాగడం.",
        heroDesc: "గాయం నుండి కోలుకోవడం అనేది ఒక లోతైన వ్యక్తిగత ప్రయాణం, కానీ మీరు ఎప్పుడూ ఒంటరిగా నడవాల్సిన అవసరం లేదు. మేము వైద్యపరంగా మద్దతు ఉన్న సాధనాలు, AI- మార్గదర్శక మద్దతు మరియు మీ అవసరాలకు అనుగుణంగా సురక్షితమైన చట్టపరమైన మార్గాలను అందిస్తున్నాము.",
        btnComplaint: "సురక్షిత ఫిర్యాదు చేయండి",
        btnScreener: "క్లినికల్ స్క్రీనర్‌ను ప్రారంభించండి",
        editorsPicks: "ఎడిటర్ ఎంపికలు",
        viewAll: "అన్ని కథనాలను వీక్షించండి",
        tool1Label: "ఇంటరాక్టివ్ టూల్",
        tool1Title: "లైవ్ న్యూరో-స్ట్రెస్ & ట్రామా స్క్రీనర్",
        tool1Desc: "మీ భావోద్వేగ కష్టాల స్థాయిలను సురక్షితంగా అంచనా వేయండి మరియు తక్షణ AI- మార్గదర్శక ధ్రువీకరణను పొందండి.",
        tool2Label: "సోమాటిక్ హీలింగ్",
        tool2Title: "సోమాటిక్ బ్రీతింగ్ & సెన్సరీ గ్రౌండింగ్",
        tool2Desc: "మా 4-7-8 పేసర్ మరియు 5-4-3-2-1 అభయారణ్యం వ్యాయామాలతో మీ నాడీ వ్యవస్థను నియంత్రించండి.",
        tool3Label: "చట్టబద్ధమైన హక్కులు",
        tool3Title: "ప్రొటెక్టివ్ జస్టిస్ శాంక్చువరీ (SC/ST PoA)",
        tool3Desc: "సెక్షన్ 15A సాక్షి రక్షణ మరియు తప్పనిసరి ఉపశమన పరిహారాన్ని అర్థం చేసుకోండి.",
        tool4Label: "అధికారిక రిపోర్టింగ్",
        tool4Title: "సురక్షిత ఫిర్యాదు చేయండి",
        tool4Desc: "SC/ST చట్టం కింద మానసిక హింస లేదా వేధింపులను సురక్షితంగా నివేదించడానికి ఎన్‌క్రిప్ట్ చేయబడిన పోర్టల్."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
