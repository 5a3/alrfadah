// ==========================================
// 1. التحكم بالقائمة الجانبية (Drawer Menu)
// ==========================================
function toggleDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        overlay.style.display = 'none';
    } else {
        drawer.classList.add('open');
        overlay.style.display = 'block';
    }
}

// ==========================================
// 2. نظام الأكورديون للفروع والمواقع
// ==========================================
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) {
            item.style.display = 'none';
            item.previousElementSibling.classList.remove('active');
        }
    });
    if (content.style.display === 'block') {
        content.style.display = 'none';
        header.classList.remove('active');
    } else {
        content.style.display = 'block';
        header.classList.add('active');
    }
}

// ==========================================
// 3. التحكم بمظهر الصفحة الداكن والفاتح
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

// ==========================================
// 4. 📊 معالجة ورسم مخططات ذروة الازدحام الفعلي 📊
// ==========================================
const trafficDatabase = {
    6: [0,0,0,0,0,0,15,30,45,55,50,45,40,50,65,75,85,95,90,80,60,40,20,0], // السبت
    0: [0,0,0,0,0,0,10,25,40,50,45,40,35,45,60,70,80,90,85,75,55,35,15,0], // الأحد
    1: [0,0,0,0,0,0,12,28,42,52,48,42,38,48,62,72,82,92,88,78,58,38,18,0], // الإثنين
    2: [0,0,0,0,0,0,12,28,42,52,48,42,38,48,62,72,82,92,88,78,58,38,18,0], // الثلاثاء
    3: [0,0,0,0,0,0,15,30,45,55,50,45,40,50,65,75,85,95,90,80,60,40,20,0], // الأربعاء
    4: [0,0,0,0,0,0,20,35,50,65,60,55,50,60,75,85,95,100,95,85,70,50,30,0], // الخميس
    5: [0,0,0,0,0,0,0,0,0,0,0,0,0,30,55,70,85,95,90,85,75,60,40,0]          // الجمعة
};

const dayNamesAr = { 0: "يوم الأحد", 1: "يوم الإثنين", 2: "يوم الثلاثاء", 3: "يوم الأربعاء", 4: "يوم الخميس", 5: "يوم الجمعة", 6: "يوم السبت" };
const dayNamesEn = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" };

let selectedDayGlobal = new Date().getDay(); 

function initTrafficChart() {
    document.querySelectorAll('.day-tab').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-day-${selectedDayGlobal}`);
    if(activeBtn) activeBtn.classList.add('active');

    const currentDayReal = new Date().getDay();
    const currentHourReal = new Date().getHours();
    const isEn = document.documentElement.getAttribute('lang') === 'en';

    document.getElementById('current-day-viewing').textContent = isEn ? dayNamesEn[selectedDayGlobal] : dayNamesAr[selectedDayGlobal];

    const liveBadge = document.getElementById('live-badge-wrapper');
    if (selectedDayGlobal === currentDayReal) {
        liveBadge.style.display = 'inline-flex';
    } else {
        liveBadge.style.display = 'none';
    }

    const container = document.getElementById('chart-bars-container');
    container.innerHTML = ''; 

    const dayData = trafficDatabase[selectedDayGlobal];

    for (let hour = 6; hour <= 23; hour++) {
        const percentage = dayData[hour] || 0;
        const barColumn = document.createElement('div');
        barColumn.className = 'chart-bar-column';

        if (selectedDayGlobal === currentDayReal && hour === currentHourReal) {
            barColumn.classList.add('is-current-hour');
        }

        let hourLabelText = '';
        if (hour === 12) hourLabelText = isEn ? '12 PM' : '12 م';
        else if (hour > 12) hourLabelText = `${hour - 12}${isEn ? ' PM' : ' م'}`;
        else hourLabelText = `${hour}${isEn ? ' AM' : ' ص'}`;

        const showLabel = (hour % 3 === 0) ? `<span class="hour-label">${hourLabelText}</span>` : '<span class="hour-label"></span>';

        barColumn.innerHTML = `
            <div class="bar-fill-wrapper" title="${hourLabelText}: ${percentage}%">
                <div class="bar-actual-fill" style="height: ${percentage}%"></div>
            </div>
            ${showLabel}
        `;
        container.appendChild(barColumn);
    }
}

function switchTrafficDay(dayIndex) {
    selectedDayGlobal = dayIndex;
    initTrafficChart();
}

// ==========================================
// 5. قاموس اللغات والترجمة الفورية الكاملة للموقع
// ==========================================
const dictionary = {
    ar: {
        pageTitle: "شركة صالة الرفادة العربية التجارية | Al-Rafadh Company",
        navTitle: "شركة صالة الرفادة العربية", navSubtitle: "المواد الغذائية جملة وقطاعي", langText: "English",
        linkHome: "الرئيسية", linkFeatures: "تميزنا وخدماتنا", linkTraffic: "أوقات الذروة", linkBranches: "فروعنا ومواعيد العمل", linkContact: "اتصل بنا وقنوات العروض",
        heroBadge: "منذ ١٩٧٠م", heroTitle: "صالة الرفادة العربية التجارية",
        heroDesc: "متخصصون في بيع وتلبية احتياجاتكم من المواد الغذائية بأسعار منافسة وجودة عالية لعملائنا في قطاعي الجملة والتجزئة منذ أكثر من خمسين عاماً.",
        titleFeatures: "تميزنا وخدماتنا",
        feat1Title: "أسعار منافسة", feat1Desc: "نلتزم بتقديم أفضل الأسعار المنافسة في السوق لتناسب ميزانيات المستهلكين والتجار.",
        feat2Title: "جملة وقطاعي", feat2Desc: "نوفر خيارات البيع بالتجزئة للمستهلك النهائي، بالإضافة إلى كميات الجملة الكبيرة للمؤسسات.",
        feat3Title: "أقسام متنوعة", feat3Desc: "من المواد الغذائية الأساسية، العصيرات، المجمدات والحلويات، وصولاً إلى أدوات البلاستيك والخردوات.",
        titleTraffic: "أوقات الذروة وحالة الازدحام", labelLive: "مباشر",
        btnDay6: "السبت", btnDay0: "الأحد", btnDay1: "الإثنين", btnDay2: "الثلاثاء", btnDay3: "الأربعاء", btnDay4: "الخميس", btnDay5: "الجمعة",
        trafficSummaryText: "يتم التحديث تلقائياً بناءً على النمط العام لحركة المتسوقين.",
        titleBranches: "فروعنا ومواعيد العمل",
        br1Title: "فرع صالة حي النخيل (جدة)", br2Title: "سوبرماركت فرع حي النزلة اليمانية", br3Title: "الفروع المتخصصة الأخرى ومواقعها",
        tSatThu: "من السبت للخميس", tFri: "يوم الجمعة", tWholesale: "قسم الجملة (النخيل)", tNzWholesale: "قسم الجملة (السبت - الخميس)", tNzRetail: "قسم القطاعي (السبت - الخميس)",
        brSub1: "فرع دوار النجوم للجملة", brSub2: "فرع الرفادة للخردوات والبلاستيك",
        btnMap1: "موقع فرع النخيل على الخريطة", btnMap2: "موقع فرع النزلة على الخريطة",
        titleContact: "اتصل بنا وقنوات العروض", contactSubtitle: "يسعدنا تواصلكم معنا مباشرة عبر الأرقام الرسمية للأقسام أو متابعة آخر العروض المتجددة",
        lblCService: "خدمة عملاء صالة الرفادة", lblNzFood: "فرع النزلة (قسم الغذائية)", lblNzFridge: "فرع النزلة (قسم الثلاجة)",
        lblNzJuice: "فرع النزلة (قسم العصيرات)", lblNzSweet: "فرع النزلة (قسم الحلويات)", lblNzHardware: "فرع النزلة (قسم الخردوات)",
        lblBrNakhil: "فرع حي النخيل", lblBrStars: "فرع دوار النجوم",
        footerText: "جميع الحقوق محفوظة © ٢٠٢٦ لدى شركة وصالة الرفادة العربية التجارية.",
        devCredits: "<i class='fa-solid fa-code'></i> تصميم وتطوير هندسي ذكي بواسطة: <span class='dev-name'>م. أحمد العطاس</span>"
    },
    en: {
        pageTitle: "Al-Rafadh Arabic Trading Company | Corporate",
        navTitle: "Al-Rafadh Arabic Company", navSubtitle: "Wholesale & Retail Foodstuffs", langText: "العربية",
        linkHome: "Home", linkFeatures: "Excellence & Services", linkTraffic: "Popular Times", linkBranches: "Branches & Hours", linkContact: "Contact & Promos",
        heroBadge: "Since 1970", heroTitle: "Al-Rafadh Arabic Trading Hall",
        heroDesc: "Specialized in supplying and fulfilling all your foodstuff requirements at competitive prices and high quality for our clients in both wholesale and retail sectors for over fifty years.",
        titleFeatures: "Our Excellence & Services",
        feat1Title: "Competitive Prices", feat1Desc: "We commit to offering the most competitive prices in the market to suit consumers and merchants budgets.",
        feat2Title: "Wholesale & Retail", feat2Desc: "We provide retail options for the end consumers, alongside bulk wholesale quantities for commercial entities.",
        feat3Title: "Diverse Sections", feat3Desc: "From staple food items, juices, frozen foods, and sweets, up to plastic household items and hardware.",
        titleTraffic: "Popular Times & Traffic Status", labelLive: "Live",
        btnDay6: "Sat", btnDay0: "Sun", btnDay1: "Mon", btnDay2: "Tue", btnDay3: "Wed", btnDay4: "Thu", btnDay5: "Fri",
        trafficSummaryText: "Updated automatically based on the general pattern of shoppers traffic.",
        titleBranches: "Our Branches & Working Hours",
        br1Title: "Al-Nakhil District Branch (Jeddah)", br2Title: "Al-Nazlah Al-Yamaniyah District Branch", br3Title: "Other Specialized Branches & Maps",
        tSatThu: "Saturday to Thursday", tFri: "Friday", tWholesale: "Wholesale Section (Al-Nakhil)", tNzWholesale: "Wholesale Section (Sat - Thu)", tNzRetail: "Retail Section (Sat - Thu)",
        brSub1: "Dwar Al-Nojoom Wholesale Branch", brSub2: "Al-Rafadh Hardware & Plastics Branch",
        btnMap1: "View Nakhil Branch Map", btnMap2: "View Nazlah Branch Map",
        titleContact: "Contact Us & Promotional Channels", contactSubtitle: "We are glad to connect with you directly via official departments numbers or through our updated discount channels",
        lblCService: "Al-Rafadh Customer Service", lblNzFood: "Al-Nazlah (Foodstuffs Section)", lblNzFridge: "Al-Nazlah (Refrigerator Section)",
        lblNzJuice: "Al-Nazlah (Juices Section)", lblNzSweet: "Al-Nazlah (Sweets Section)", lblNzHardware: "Al-Nazlah (Hardware Section)",
        lblBrNakhil: "Al-Nakhil District Branch", lblBrStars: "Dwar Al-Nojoom Branch",
        footerText: "All Rights Reserved © 2026 Al-Rafadh Arabic Trading Company.",
        devCredits: "<i class='fa-solid fa-code'></i> Engineered & Developed By: <span class='dev-name'>Eng. Ahmed Al-Attas</span>"
    }
};

function toggleLanguage() {
    const htmlTag = document.documentElement;
    const currentLang = htmlTag.getAttribute('lang') || 'ar';
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    htmlTag.setAttribute('lang', newLang);
    htmlTag.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');

    document.getElementById('page-title').textContent = dictionary[newLang].pageTitle;
    document.getElementById('nav-title').textContent = dictionary[newLang].navTitle;
    document.getElementById('nav-subtitle').textContent = dictionary[newLang].navSubtitle;
    document.getElementById('lang-text').textContent = dictionary[newLang].langText;
    
    // مصفوفة الروابط المصححة والمطابقة تماماً لـ الـ HTML لشاشات الكمبيوتر والجوال
    const desktopLinks = ['link-home', 'link-features', 'link-traffic', 'link-branches', 'link-contact'];
    desktopLinks.forEach(id => {
        const key = id.replace('link-', 'link');
        const element = document.getElementById(id);
        if(element) element.textContent = dictionary[newLang][key];
    });

    const mobileLinks = ['d-link-home', 'd-link-features', 'd-link-traffic', 'd-link-branches', 'd-link-contact'];
    mobileLinks.forEach(id => {
        const key = id.replace('d-link-', 'link');
        const element = document.getElementById(id);
        if(element) element.textContent = dictionary[newLang][key];
    });

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
    
    document.getElementById('title-traffic').textContent = dictionary[newLang].titleTraffic;
    document.getElementById('label-live').textContent = dictionary[newLang].labelLive;
    document.getElementById('traffic-summary-text').textContent = dictionary[newLang].trafficSummaryText;
    for(let i=0; i<=6; i++) { document.getElementById(`btn-day-${i}`).textContent = dictionary[newLang][`btnDay${i}`]; }

    document.getElementById('title-branches').textContent = dictionary[newLang].titleBranches;
    document.getElementById('br-1-title').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${dictionary[newLang].br1Title}`;
    document.getElementById('br-2-title').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${dictionary[newLang].br2Title}`;
    document.getElementById('br-3-title').innerHTML = `<i class="fa-solid fa-cubes"></i> ${dictionary[newLang].br3Title}`;
    document.getElementById('t-sat-thu').textContent = dictionary[newLang].tSatThu;
    document.getElementById('t-fri').textContent = dictionary[newLang].tFri;
    document.getElementById('t-wholesale').innerHTML = `<i class="fa-solid fa-circle-dot"></i> ${dictionary[newLang].tWholesale}`;
    document.getElementById('t-nz-wholesale').innerHTML = `<i class="fa-solid fa-circle-dot"></i> ${dictionary[newLang].tNzWholesale}`;
    document.getElementById('t-nz-retail').innerHTML = `<i class="fa-solid fa-circle-dot"></i> ${dictionary[newLang].tNzRetail}`;
    document.getElementById('br-sub-1').innerHTML = `<i class="fa-solid fa-circle-arrow-left"></i> ${dictionary[newLang].brSub1}`;
    document.getElementById('br-sub-2').innerHTML = `<i class="fa-solid fa-circle-arrow-left"></i> ${dictionary[newLang].brSub2}`;
    document.getElementById('btn-map-1').innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${dictionary[newLang].btnMap1}`;
    document.getElementById('btn-map-2').innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${dictionary[newLang].btnMap2}`;
    
    document.getElementById('title-contact').textContent = dictionary[newLang].titleContact;
    document.getElementById('contact-subtitle').textContent = dictionary[newLang].contactSubtitle;
    document.getElementById('lbl-c-service').textContent = dictionary[newLang].lblCService;
    document.getElementById('lbl-nz-food').textContent = dictionary[newLang].lblNzFood;
    document.getElementById('lbl-nz-fridge').textContent = dictionary[newLang].lblNzFridge;
    document.getElementById('lbl-nz-juice').textContent = dictionary[newLang].lblNzJuice;
    document.getElementById('lbl-nz-sweet').textContent = dictionary[newLang].lblNzSweet;
    document.getElementById('lbl-nz-hardware').textContent = dictionary[newLang].lblNzHardware;
    document.getElementById('lbl-br-nakhil').textContent = dictionary[newLang].lblBrNakhil;
    document.getElementById('lbl-br-stars').textContent = dictionary[newLang].lblBrStars;
    
    document.getElementById('footer-text').textContent = dictionary[newLang].footerText;
    document.getElementById('dev-credits').innerHTML = dictionary[newLang].devCredits;

    initTrafficChart(); 
}

// ==========================================
// 6. مراقب التمرير لتفعيل كلاسات الأنيميشن (Scroll Reveal)
// ==========================================
const scrollElements = document.querySelectorAll(".animate-on-scroll");
const elementInView = (el, dividend = 1) => {
    return (el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.15)) { el.classList.add("appear"); }
    });
};

// تشغيل التهيئة والأنيميشن فور تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').className = 'fa-solid fa-sun';
    }
    initTrafficChart();
    handleScrollAnimation();
});

window.addEventListener("scroll", handleScrollAnimation);