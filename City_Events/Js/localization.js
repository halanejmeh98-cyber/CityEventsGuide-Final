const translations = {
    "en": {
        "nav_home": "Home",
        "nav_events": "Events",
        "nav_about": "About",
        "nav_contact": "Contact",
        "footer_rights": "© 2025 City Events Guide. All rights reserved.",
        "footer_contact_text": "Contact us:",
        "footer_follow_text": "Follow us:",
        "event1_title": "City Summer Fest 🎵",
        "event1_desc": "A three-day music festival featuring local bands.",
        "card_date": "🗓️ Date:",
        "card_location": "📍 Location:",
        "card_category": "🏷️ Category:",
        "contributor_title": "**Project Contributors**", 
        "contributor_hala_name": "Hala Nejmeh", 
        "contributor_thaer_name": "Thaer Shaarieh", 
        "contributor_hani_name": "Hani Abbas", 
        "contributor_course": "**Course**", 
        "contributor_instructor": "**Instructor**", 
        "watch_promo_button": "Watch Promo on YouTube"
    },
    "ar": {
        "nav_home": "الرئيسية",
        "nav_events": "الفعاليات",
        "nav_about": "حول المشروع",
        "nav_contact": "تواصل معنا",
        "footer_rights": "© 2025 دليل فعاليات المدينة. جميع الحقوق محفوظة.",
        "footer_contact_text": "للتواصل:",
        "footer_follow_text": "تابعنا:",
        "event1_title": "مهرجان الصيف الموسيقي 🎵",
        "event1_desc": "مهرجان موسيقي لمدة ثلاثة أيام يضم فرقًا محلية.",
        "card_date": "🗓️ التاريخ:",
        "card_location": "📍 الموقع:",
        "card_category": "🏷️ الفئة:",
        "contributor_title": "**مساهمو المشروع**", 
        "contributor_hala_name": "هالة نجمة", 
        "contributor_thaer_name": "ثائر شعيرية", 
        "contributor_hani_name": "هاني عباس", 
        "contributor_course": "**المساق**", 
        "contributor_instructor": "**المحاضر**", 
         "watch_promo_button":"شاهد العرض الترويجي على يوتيوب"
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function applyTranslations(lang) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            let translatedText = translations[lang][key];
            translatedText = translatedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            element.innerHTML = translatedText;
        }
    });
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
}

function switchLanguage() {
    currentLanguage = (currentLanguage === 'en') ? 'ar' : 'en';
    localStorage.setItem('language', currentLanguage);
    applyTranslations(currentLanguage);
    document.getElementById('lang-switcher').textContent = (currentLanguage === 'en') ? 'EN/AR' : 'ع/ا';
}

function initializeLanguage() {
    applyTranslations(currentLanguage);
    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', switchLanguage);
        langSwitcher.textContent = (currentLanguage === 'en') ? 'EN/AR' : 'ع/ا';
    }
}