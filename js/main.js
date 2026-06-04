// ==========================================
// 1. نظام الأكورديون لفتح وإغلاق الفروع تلقائياً
// ==========================================
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    
    // إغلاق أي عنصر أكورديون آخر مفتوح لإعطاء مظهر نظيف
    document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) {
            item.style.display = 'none';
            item.previousElementSibling.classList.remove('active');
        }
    });

    // فتح أو إغلاق العنصر الذي تم النقر عليه
    if (content.style.display === 'block') {
        content.style.display = 'none';
        header.classList.remove('active');
    } else {
        content.style.display = 'block';
        header.classList.add('active');
    }
}

// ==========================================
// 2. نظام التبديل بين الوضع الليلي والمضيء (Theme Toggle)
// ==========================================
function toggleTheme() {
    const htmlTag = document.documentElement;
    const currentTheme = htmlTag.getAttribute('data-theme');
    const icon = document.getElementById('theme-icon');
    
    if (currentTheme === 'dark') {
        htmlTag.removeAttribute('data-theme');
        icon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        htmlTag.setAttribute('data-theme', 'dark');
        icon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// استعادة مظهر المستخدم المفضل عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').className = 'fa-solid fa-sun';
    }
});

// ==========================================
// 3. نظام الترجمة الفورية الكاملة (Ar / En)
// ==========================================
const dictionary = {
    ar: {
        pageTitle: "شركة صالة الرفادة العربية التجارية | Al-Rafadh Company",
        navTitle: "شركة صالة الرفادة العربية",
        navSubtitle: "المواد الغذائية جملة وقطاعي",
        langText: "English",
        heroBadge: "منذ ١٩٧٠م",
        heroTitle: "صالة الرفادة العربية التجارية",
        heroDesc: "متخصصون في بيع وتلبية احتياجاتكم من المواد الغذائية بأسعار منافسة وجودة عالية لعملائنا في قطاعي الجملة والتجزئة منذ أكثر من خمسين عاماً.",
        titleFeatures: "تميزنا وخدماتنا",
        feat1Title: "أسعار منافسة",
        feat1Desc: "نلتزم بتقديم أفضل الأسعار المنافسة في السوق لتناسب ميزانيات المستهلكين والتجار.",
        feat2Title: "جملة وقطاعي",
        feat2Desc: "نوفر خيارات البيع بالتجزئة للمستهلك النهائي، بالإضافة إلى كميات الجملة الكبيرة للمؤسسات.",
        feat3Title: "أقسام متنوعة",
        feat3Desc: "من المواد الغذائية الأساسية، العصيرات، المجمدات والحلويات، وصولاً إلى أدوات البلاستيك والخردوات.",
        titleBranches: "فروعنا ومواعيد العمل",
        br1Title: "فرع صالة حي النخيل (جدة)",
        br2Title: "سوبرماركت فرع حي النزلة اليمانية",
        br3Title: "الفروع المتخصصة الأخرى",
        tSatThu: "من السبت للخميس",
        tFri: "يوم الجمعة",
        tWholesale: "قسم الجملة (النخيل)",
        tNzWholesale: "قسم الجملة (السبت - الخميس)",
        tNzRetail: "قسم القطاعي (السبت - الخميس)",
        brSub1: "فرع دوار النجوم للجملة",
        brSub2: "فرع الرفادة للخردوات والبلاستيك",
        btnMap1: "موقع الفرع على الخريطة",
        btnMap2: "موقع الفرع على الخريطة",
        titleContact: "اتصل بنا وقنوات العروض",
        contactSubtitle: "يسعدنا تواصلكم معنا مباشرة عبر الأرقام الرسمية أو متابعة آخر عروض الخصم المتجددة",
        cService: "خدمة العملاء الموحدة",
        cEmail: "البريد الإلكتروني الرسمي",
        cBranchCall: "أرقام الفروع المباشرة",
        cBranchDesc: "فرع النخيل: 0503071044 <br> فرع النزلة: 0501818742",
        footerText: "جميع الحقوق محفوظة © ٢٠٢٦ لشركة صالة الرفادة العربية التجارية."
    },
    en: {
        pageTitle: "Al-Rafadh Arabic Trading Company | Company Profile",
        navTitle: "Al-Rafadh Arabic Company",
        navSubtitle: "Foodstuffs Wholesale & Retail",
        langText: "العربية",
        heroBadge: "Since 1970",
        heroTitle: "Al-Rafadh Arabic Trading Hall",
        heroDesc: "Specialized in supplying and fulfilling all your foodstuff requirements at competitive prices and high quality for our clients in both wholesale and retail sectors for over fifty years.",
        titleFeatures: "Our Excellence & Services",
        feat1Title: "Competitive Prices",
        feat1Desc: "We commit to offering the most competitive prices in the market to suit consumers and merchants budgets.",
        feat2Title: "Wholesale & Retail",
        feat2Desc: "We provide retail options for the end consumers, alongside bulk wholesale quantities for commercial entities.",
        feat3Title: "Diverse Sections",
        feat3Desc: "From staple food items, juices, frozen foods, and sweets, up to plastic household items and hardware.",
        titleBranches: "Our Branches & Working Hours",
        br1Title: "Al-Nakhil District Branch (Jeddah)",
        br2Title: "Al-Nazlah Al-Yamaniyah District Branch",
        br3Title: "Other Specialized Branches",
        tSatThu: "Saturday to Thursday",
        tFri: "Friday",
        tWholesale: "Wholesale Section (Al-Nakhil)",
        tNzWholesale: "Wholesale Section (Sat - Thu)",
        tNzRetail: "Retail Section (Sat - Thu)",
        brSub1: "Dwar Al-Nojoom Wholesale Branch",
        brSub2: "Al-Rafadh Hardware & Plastics Branch",
        btnMap1: "View Branch Map",
        btnMap2: "View Branch Map",
        titleContact: "Contact Us & Promotional Channels",
        contactSubtitle: "We are glad to connect with you directly via official numbers or through our updated discount channels",
        cService: "Unified Customer Service",
        cEmail: "Official Email",
        cBranchCall: "Direct Branch Numbers",
        cBranchDesc: "Al-Nakhil: 0503071044 <br> Al-Nazlah: 0501818742",
        footerText: "All Rights Reserved © 2026 Al-Rafadh Arabic Trading Company."
    }
};

function toggleLanguage() {
    const htmlTag = document.documentElement;
    const currentLang = htmlTag.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    // تغيير الاتجاه واللغة في الكود الرئيسي
    htmlTag.setAttribute('lang', newLang);
    htmlTag.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');

    // تحديث النصوص في الواجهة بناءً على القاموس
    document.getElementById('page-title').textContent = dictionary[newLang].pageTitle;
    document.getElementById('nav-title').textContent = dictionary[newLang].navTitle;
    document.getElementById('nav-subtitle').textContent = dictionary[newLang].navSubtitle;
    document.getElementById('lang-text').textContent = dictionary[newLang].langText;
    document.getElementById('hero-badge').textContent = dictionary[newLang].heroBadge;
    document.getElementById('hero-title').textContent = dictionary[newLang].heroTitle;
    document.getElementById('hero-desc').textContent = dictionary[newLang].heroDesc;
    document.getElementById('title-features').textContent = dictionary[newLang].titleFeatures;
    document.getElementById('feat-1-title').textContent = dictionary[newLang].feat1Title;
    document.getElementById('feat-1-desc').textContent = dictionary[newLang].feat1Desc;
    document.getElementById('feat-2-title').textContent = dictionary[newLang].feat2Title;
    document.getElementById('feat-2-desc').textContent = dictionary[newLang].feat2Desc;
    document.getElementById('feat-3-title').textContent = dictionary[newLang].feat3Title;
    document.getElementById('feat-3-desc').textContent = dictionary[newLang].feat3Desc;
    document.getElementById('title-branches').textContent = dictionary[newLang].titleBranches;
    
    document.getElementById('br-1-title').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${dictionary[newLang].br1Title}`;
    document.getElementById('br-2-title').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${dictionary[newLang].br2Title}`;
    document.getElementById('br-3-title').innerHTML = `<i class="fa-solid fa-cubes"></i> ${dictionary[newLang].br3Title}`;
    
    document.getElementById('t-sat-thu').textContent = dictionary[newLang].tSatThu;
    document.getElementById('t-fri').textContent = dictionary[newLang].tFri;
    document.getElementById('t-wholesale').innerHTML = `<i class="fa-solid fa-circle-dot"></i> ${dictionary[newLang].tWholesale}`;
    document.getElementById('t-nz-wholesale').innerHTML = `<i class="fa-solid fa-circle-dot"></i> ${dictionary[newLang].tNzWholesale}`;
    document.getElementById('t-nz-retail').innerHTML = `<i class="fa-solid fa-circle-dot"></i> ${dictionary[newLang].tNzRetail}`;
    
    document.getElementById('br-sub-1').textContent = dictionary[newLang].brSub1;
    document.getElementById('br-sub-2').textContent = dictionary[newLang].brSub2;
    
    document.getElementById('btn-map-1').innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${dictionary[newLang].btnMap1}`;
    document.getElementById('btn-map-2').innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${dictionary[newLang].btnMap2}`;
    
    document.getElementById('title-contact').textContent = dictionary[newLang].titleContact;
    document.getElementById('contact-subtitle').textContent = dictionary[newLang].contactSubtitle;
    document.getElementById('c-service').textContent = dictionary[newLang].cService;
    document.getElementById('c-email').textContent = dictionary[newLang].cEmail;
    document.getElementById('c-branch-call').textContent = dictionary[newLang].cBranchCall;
    document.getElementById('c-branch-desc').innerHTML = dictionary[newLang].cBranchDesc;
    document.getElementById('footer-text').textContent = dictionary[newLang].footerText;
}

// ==========================================
// 4. تأثير ظهور العناصر الفاخر عند التمرير (Scroll Animation)
// ==========================================
const scrollElements = document.querySelectorAll(".animate-on-scroll");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};

const displayScrollElement = (element) => {
    element.classList.add("appear");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.15)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener("scroll", () => { 
    handleScrollAnimation();
});

// تفعيلها مباشرة عند أول تحميل للصفحة للعناصر الظاهرة فوراً
document.addEventListener("DOMContentLoaded", () => {
    handleScrollAnimation();
});