// ======================================================
// WOOD CALCULATOR
// ======================================================


// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL =
    "https://jythcpntirluezgbltjv.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_06QcN-PZQAmr3pGrbLuUlA_za--3GdS";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ======================================================
// GLOBAL VARIABLES
// ======================================================

let currentUser = null;

let currentItems = [];

let editingBillId = null;

let selectedInput = null;

let downloadBillId = null;

let pendingAdAction = null;

let currentLanguage = "en";

let tutorialStep = 0;

let tutorialActive = false;


// ======================================================
// TRANSLATIONS
// ======================================================

const translations = {

    en: {

        wood: "WOOD",
        woodType: "Wood Type",
        price: "Price / CFT",

        measurement: "MEASUREMENT",
        enterDimensions: "Enter Dimensions",

        calculate: "Calculate",

        total: "TOTAL",
        totalCFT: "TOTAL CFT",
        totalPrice: "TOTAL PRICE",

        bill: "BILL",
        billSummary: "Bill Summary",

        saveBill: "Save Bill",
        updateBill: "Update Bill",
        savedBills: "Saved Bills",

        yourBills: "YOUR BILLS",
        billDetails: "BILL DETAILS",

        downloadBill: "DOWNLOAD BILL",

        businessName: "Business name",

        downloadPDF: "Download PDF",
        saveImage: "Save Image",

        advertisement: "Advertisement",

        width: "Width",
        length: "Length",
        cft: "CFT",
        priceColumn: "Price",
        action: "Action",

        welcomeTitle: "Welcome 👋",
        welcomeText: "Choose your language to get started.",

        tutorial: [
            {
                icon: "🌲",
                title: "Choose your wood",
                text: "Tap the WOOD section to select the type of wood you are calculating."
            },
            {
                icon: "💰",
                title: "Enter the price",
                text: "Enter the selling price for one CFT of your selected wood."
            },
            {
                icon: "📏",
                title: "Enter dimensions",
                text: "Enter the length in feet and width in inches."
            },
            {
                icon: "🧮",
                title: "Calculate",
                text: "Press Calculate. The calculator will calculate the CFT and price for this item."
            },
            {
                icon: "📊",
                title: "Check your total",
                text: "Your total CFT and total price will appear here. You can add multiple wood items to one bill."
            },
            {
                icon: "💾",
                title: "Save your bill",
                text: "Press Save Bill to keep the bill safely in your saved bills."
            },
            {
                icon: "📁",
                title: "Saved Bills",
                text: "Open Saved Bills anytime to view, edit, delete or download your bills."
            }
        ],

        next: "Next",
        finish: "Finish",
        skip: "Skip"

    },


    si: {

        wood: "දැව",
        woodType: "දැව වර්ගය",
        price: "CFT මිල",

        measurement: "මිනුම්",
        enterDimensions: "මාන ඇතුළත් කරන්න",

        calculate: "ගණනය කරන්න",

        total: "මුළු එකතුව",
        totalCFT: "මුළු CFT",
        totalPrice: "මුළු මිල",

        bill: "බිල්පත",
        billSummary: "බිල්පත් සාරාංශය",

        saveBill: "බිල්පත සුරකින්න",
        updateBill: "බිල්පත යාවත්කාලීන කරන්න",
        savedBills: "සුරකින ලද බිල්පත්",

        yourBills: "ඔබගේ බිල්පත්",
        billDetails: "බිල්පත් විස්තර",

        downloadBill: "බිල්පත බාගත කරන්න",

        businessName: "ව්‍යාපාරයේ නම",

        downloadPDF: "PDF බාගත කරන්න",
        saveImage: "පින්තූරය සුරකින්න",

        advertisement: "වෙළඳ දැන්වීම",

        width: "පළල",
        length: "දිග",
        cft: "CFT",
        priceColumn: "මිල",
        action: "ක්‍රියාව",

        welcomeTitle: "සාදරයෙන් පිළිගනිමු 👋",
        welcomeText: "ආරම්භ කිරීමට ඔබගේ භාෂාව තෝරන්න.",

        tutorial: [
            {
                icon: "🌲",
                title: "දැව වර්ගය තෝරන්න",
                text: "ඔබට ගණනය කිරීමට අවශ්‍ය දැව වර්ගය තේරීමට WOOD කොටස ඔබන්න."
            },
            {
                icon: "💰",
                title: "මිල ඇතුළත් කරන්න",
                text: "තෝරාගත් දැවයේ එක් CFT එකක මිල ඇතුළත් කරන්න."
            },
            {
                icon: "📏",
                title: "මාන ඇතුළත් කරන්න",
                text: "දිග අඩි වලින් සහ පළල අඟල් වලින් ඇතුළත් කරන්න."
            },
            {
                icon: "🧮",
                title: "ගණනය කරන්න",
                text: "Calculate ඔබන්න. එවිට එම දැව කැබැල්ලේ CFT සහ මිල ගණනය වේ."
            },
            {
                icon: "📊",
                title: "මුළු එකතුව බලන්න",
                text: "ඔබගේ මුළු CFT සහ මුළු මිල මෙහි පෙන්වනු ඇත. එකම බිල්පතකට දැව අයිතම කිහිපයක් එක් කළ හැක."
            },
            {
                icon: "💾",
                title: "බිල්පත සුරකින්න",
                text: "Save Bill ඔබා බිල්පත සුරකින්න."
            },
            {
                icon: "📁",
                title: "සුරකින ලද බිල්පත්",
                text: "Saved Bills හරහා බිල්පත් බලන්න, සංස්කරණය කරන්න, මකා දමන්න හෝ බාගත කරන්න."
            }
        ],

        next: "ඊළඟ",
        finish: "අවසන්",
        skip: "මඟහරින්න"

    },


    ta: {

        wood: "மரம்",
        woodType: "மர வகை",
        price: "CFT விலை",

        measurement: "அளவீடு",
        enterDimensions: "அளவுகளை உள்ளிடவும்",

        calculate: "கணக்கிடு",

        total: "மொத்தம்",
        totalCFT: "மொத்த CFT",
        totalPrice: "மொத்த விலை",

        bill: "பில்",
        billSummary: "பில் சுருக்கம்",

        saveBill: "பில் சேமி",
        updateBill: "பில் புதுப்பி",
        savedBills: "சேமித்த பில்கள்",

        yourBills: "உங்கள் பில்கள்",
        billDetails: "பில் விவரங்கள்",

        downloadBill: "பில் பதிவிறக்கம்",

        businessName: "வணிகத்தின் பெயர்",

        downloadPDF: "PDF பதிவிறக்கம்",
        saveImage: "படமாக சேமி",

        advertisement: "விளம்பரம்",

        width: "அகலம்",
        length: "நீளம்",
        cft: "CFT",
        priceColumn: "விலை",
        action: "செயல்",

        welcomeTitle: "வரவேற்கிறோம் 👋",
        welcomeText: "தொடங்க உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்.",

        tutorial: [
            {
                icon: "🌲",
                title: "மர வகையைத் தேர்ந்தெடுக்கவும்",
                text: "கணக்கிட வேண்டிய மர வகையைத் தேர்ந்தெடுக்க WOOD பகுதியைத் தட்டவும்."
            },
            {
                icon: "💰",
                title: "விலையை உள்ளிடவும்",
                text: "தேர்ந்தெடுத்த மரத்தின் ஒரு CFT விலையை உள்ளிடவும்."
            },
            {
                icon: "📏",
                title: "அளவுகளை உள்ளிடவும்",
                text: "நீளத்தை அடியிலும் அகலத்தை அங்குலத்திலும் உள்ளிடவும்."
            },
            {
                icon: "🧮",
                title: "கணக்கிடவும்",
                text: "Calculate பொத்தானை அழுத்தவும். CFT மற்றும் விலை கணக்கிடப்படும்."
            },
            {
                icon: "📊",
                title: "மொத்தத்தைப் பார்க்கவும்",
                text: "மொத்த CFT மற்றும் மொத்த விலை இங்கே காட்டப்படும்."
            },
            {
                icon: "💾",
                title: "பில்லை சேமிக்கவும்",
                text: "Save Bill பொத்தானை அழுத்தி பில்லை சேமிக்கவும்."
            },
            {
                icon: "📁",
                title: "சேமித்த பில்கள்",
                text: "Saved Bills மூலம் உங்கள் பில்களைப் பார்க்க, திருத்த, நீக்க அல்லது பதிவிறக்க முடியும்."
            }
        ],

        next: "அடுத்து",
        finish: "முடி",
        skip: "தவிர்க்க"

    }

};


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        setupCalculatorInputs();

        setupLanguage();

        setupWelcome();

        updateSelectedWood();

        await initializeUser();

        renderCurrentBill();

        initializeOnboarding();

    }
);


// ======================================================
// USER
// ======================================================

async function initializeUser() {

    try {

        const {
            data: sessionData,
            error: sessionError
        } = await supabaseClient.auth.getSession();


        if (sessionError) {
            console.error(sessionError);
        }


        if (
            sessionData &&
            sessionData.session &&
            sessionData.session.user
        ) {

            currentUser =
                sessionData.session.user;

            return;
        }


        const {
            data,
            error
        } = await supabaseClient.auth.signInAnonymously();


        if (error) {

            console.error(
                "Anonymous login error:",
                error
            );

            alert(
                "Could not connect to the database."
            );

            return;
        }


        currentUser =
            data.user;

    }
    catch (error) {

        console.error(
            "User initialization error:",
            error
        );

    }

}


// ======================================================
// LANGUAGE SETUP
// ======================================================

function setupLanguage() {

    const language =
        document.getElementById(
            "language-select"
        );


    if (!language) return;


    const savedLanguage =
        localStorage.getItem(
            "woodCalculatorLanguage"
        );


    if (
        savedLanguage &&
        translations[savedLanguage]
    ) {

        currentLanguage =
            savedLanguage;

        language.value =
            savedLanguage;

    }


    language.addEventListener(
        "change",
        function () {

            currentLanguage =
                this.value;

            localStorage.setItem(
                "woodCalculatorLanguage",
                currentLanguage
            );

            applyTranslations();

            if (tutorialActive) {
                renderTutorialStep();
            }

        }
    );

}


// ======================================================
// APPLY TRANSLATIONS
// ======================================================

function applyTranslations() {

    const t =
        translations[currentLanguage];


    const woodLabel =
        document.querySelector(
            ".wood-label"
        );

    if (woodLabel) {
        woodLabel.textContent =
            t.wood;
    }


    const settingLabels =
        document.querySelectorAll(
            ".setting label"
        );


    if (settingLabels.length >= 2) {

        settingLabels[0].textContent =
            t.woodType;

        settingLabels[1].textContent =
            t.price;

    }


    const sectionHeadings =
        document.querySelectorAll(
            ".section-heading"
        );


    if (sectionHeadings.length >= 2) {

        const firstSpan =
            sectionHeadings[0]
                .querySelector("span");

        const firstH2 =
            sectionHeadings[0]
                .querySelector("h2");

        const secondSpan =
            sectionHeadings[1]
                .querySelector("span");

        const secondH2 =
            sectionHeadings[1]
                .querySelector("h2");


        if (firstSpan)
            firstSpan.textContent =
                t.measurement;


        if (firstH2)
            firstH2.textContent =
                t.enterDimensions;


        if (secondSpan)
            secondSpan.textContent =
                t.bill;


        if (secondH2)
            secondH2.textContent =
                t.billSummary;

    }


    const calculateButton =
        document.getElementById(
            "calculate-btn"
        );

    if (calculateButton) {
        calculateButton.textContent =
            t.calculate;
    }


    const saveButton =
        document.getElementById(
            "save-bill-btn"
        );

    if (saveButton) {

        saveButton.textContent =
            editingBillId
                ? t.updateBill
                : t.saveBill;

    }


    const savedButton =
        document.getElementById(
            "saved-bills-btn"
        );

    if (savedButton) {
        savedButton.textContent =
            t.savedBills;
    }


    document
        .querySelectorAll(".ad-slot span")
        .forEach(function (element) {

            element.textContent =
                t.advertisement;

        });


    const totalCFTLabel =
        document.querySelector(
            ".total-box:first-child .total-label"
        );

    if (totalCFTLabel) {
        totalCFTLabel.textContent =
            t.totalCFT;
    }


    const totalPriceLabel =
        document.querySelector(
            ".total-price-box .total-label"
        );

    if (totalPriceLabel) {
        totalPriceLabel.textContent =
            t.totalPrice;
    }


    const welcomeTitle =
        document.getElementById(
            "welcome-title"
        );

    const welcomeText =
        document.getElementById(
            "welcome-text"
        );


    if (welcomeTitle) {
        welcomeTitle.textContent =
            t.welcomeTitle;
    }


    if (welcomeText) {
        welcomeText.textContent =
            t.welcomeText;
    }

}


// ======================================================
// WELCOME SCREEN
// ======================================================

function setupWelcome() {

    const buttons =
        document.querySelectorAll(
            ".language-choice-btn"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const language =
                        this.dataset.language;


                    if (
                        !translations[language]
                    ) {
                        return;
                    }


                    currentLanguage =
                        language;


                    localStorage.setItem(
                        "woodCalculatorLanguage",
                        language
                    );


                    localStorage.setItem(
                        "woodCalculatorWelcomeSeen",
                        "true"
                    );


                    const select =
                        document.getElementById(
                            "language-select"
                        );


                    if (select) {
                        select.value =
                            language;
                    }


                    applyTranslations();


                    hideWelcome();


                    setTimeout(
                        function () {
                            startTutorial();
                        },
                        350
                    );

                }
            );

        }
    );

}


// ======================================================
// HIDE WELCOME
// ======================================================

function hideWelcome() {

    const screen =
        document.getElementById(
            "welcome-screen"
        );

    if (!screen) return;

    screen.classList.add(
        "hidden"
    );

}


// ======================================================
// ONBOARDING INITIALIZATION
// ======================================================

function initializeOnboarding() {

    applyTranslations();


    const welcomeSeen =
        localStorage.getItem(
            "woodCalculatorWelcomeSeen"
        );


    const savedLanguage =
        localStorage.getItem(
            "woodCalculatorLanguage"
        );


    if (
        welcomeSeen !== "true" ||
        !savedLanguage
    ) {

        const screen =
            document.getElementById(
                "welcome-screen"
            );

        if (screen) {
            screen.classList.remove(
                "hidden"
            );
        }

        return;

    }


    hideWelcome();


    const tutorialSeen =
        localStorage.getItem(
            "woodCalculatorTutorialSeen"
        );


    if (tutorialSeen !== "true") {

        setTimeout(
            function () {
                startTutorial();
            },
            500
        );

    }

}


// ======================================================
// START TUTORIAL
// ======================================================

function startTutorial() {

    const overlay =
        document.getElementById(
            "tutorial-overlay"
        );


    if (!overlay) return;


    tutorialActive = true;

    tutorialStep = 0;


    overlay.classList.add(
        "active"
    );


    prepareTutorialVisibility();


    renderTutorialStep();

}


// ======================================================
// PREPARE TUTORIAL
// ======================================================

function prepareTutorialVisibility() {

    const saveButton =
        document.getElementById(
            "save-bill-btn"
        );

    const savedButton =
        document.getElementById(
            "saved-bills-btn"
        );


    if (saveButton) {

        saveButton.classList.add(
            "tour-force-visible"
        );

    }


    if (savedButton) {

        savedButton.classList.add(
            "tour-force-visible"
        );

    }

}


// ======================================================
// TUTORIAL STEPS
// ======================================================

const tutorialTargets = [

    "tour-wood",

    "tour-price",

    "tour-length",

    "calculate-btn",

    "total-see",

    "save-bill-btn",

    "saved-bills-btn"

];


// ======================================================
// RENDER TUTORIAL STEP
// ======================================================

function renderTutorialStep() {

    if (!tutorialActive) return;


    const t =
        translations[currentLanguage];


    const step =
        t.tutorial[tutorialStep];


    if (!step) return;


    const targetId =
        tutorialTargets[tutorialStep];


    const target =
        document.getElementById(
            targetId
        );


    if (!target) return;


    // Open wood settings when reaching price step

    if (tutorialStep === 1) {

        const area =
            document.getElementById(
                "see-area"
            );

        if (area) {
            area.classList.add(
                "active"
            );
        }

    }


    // Scroll target into view

    target.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    setTimeout(
        function () {

            positionTutorial(
                target
            );

        },
        350
    );


    const icon =
        document.getElementById(
            "tutorial-icon"
        );

    const title =
        document.getElementById(
            "tutorial-title"
        );

    const text =
        document.getElementById(
            "tutorial-text"
        );

    const stepNumber =
        document.getElementById(
            "tutorial-step-number"
        );

    const totalSteps =
        document.getElementById(
            "tutorial-total-steps"
        );

    const next =
        document.getElementById(
            "tutorial-next"
        );

    const skip =
        document.getElementById(
            "tutorial-skip"
        );


    if (icon) {
        icon.textContent =
            step.icon;
    }


    if (title) {
        title.textContent =
            step.title;
    }


    if (text) {
        text.textContent =
            step.text;
    }


    if (stepNumber) {
        stepNumber.textContent =
            tutorialStep + 1;
    }


    if (totalSteps) {
        totalSteps.textContent =
            t.tutorial.length;
    }


    if (next) {

        next.textContent =
            tutorialStep ===
            t.tutorial.length - 1
                ? t.finish
                : t.next;

    }


    if (skip) {
        skip.textContent =
            t.skip;
    }

}


// ======================================================
// POSITION TUTORIAL
// ======================================================

function positionTutorial(target) {

    const spotlight =
        document.getElementById(
            "tutorial-spotlight"
        );

    const pointer =
        document.getElementById(
            "tutorial-pointer"
        );

    const card =
        document.getElementById(
            "tutorial-card"
        );


    if (
        !spotlight ||
        !pointer ||
        !card
    ) {
        return;
    }


    const rect =
        target.getBoundingClientRect();


    const padding = 5;


    spotlight.style.top =
        `${rect.top - padding}px`;

    spotlight.style.left =
        `${rect.left - padding}px`;

    spotlight.style.width =
        `${rect.width + padding * 2}px`;

    spotlight.style.height =
        `${rect.height + padding * 2}px`;


    // Pointer

    let pointerTop =
        rect.bottom + 12;

    let pointerLeft =
        rect.left +
        rect.width / 2 -
        21;


    if (
        pointerTop + 42 >
        window.innerHeight
    ) {

        pointerTop =
            rect.top - 55;

    }


    pointer.style.top =
        `${Math.max(10, pointerTop)}px`;

    pointer.style.left =
        `${Math.max(10, pointerLeft)}px`;


    // Tutorial card

    const cardWidth =
        Math.min(
            390,
            window.innerWidth - 30
        );


    let cardLeft =
        rect.left +
        rect.width / 2 -
        cardWidth / 2;


    cardLeft =
        Math.max(
            15,
            Math.min(
                cardLeft,
                window.innerWidth -
                cardWidth -
                15
            )
        );


    let cardTop =
        rect.bottom + 70;


    if (
        cardTop + 260 >
        window.innerHeight
    ) {

        cardTop =
            rect.top - 280;

    }


    cardTop =
        Math.max(
            15,
            cardTop
        );


    card.style.width =
        `${cardWidth}px`;

    card.style.left =
        `${cardLeft}px`;

    card.style.top =
        `${cardTop}px`;

}


// ======================================================
// NEXT TUTORIAL
// ======================================================

function nextTutorialStep() {

    const t =
        translations[currentLanguage];


    if (
        tutorialStep >=
        t.tutorial.length - 1
    ) {

        finishTutorial();

        return;

    }


    tutorialStep++;

    renderTutorialStep();

}


// ======================================================
// FINISH TUTORIAL
// ======================================================

function finishTutorial() {

    localStorage.setItem(
        "woodCalculatorTutorialSeen",
        "true"
    );


    tutorialActive = false;


    const overlay =
        document.getElementById(
            "tutorial-overlay"
        );


    if (overlay) {
        overlay.classList.remove(
            "active"
        );
    }


    // Restore normal button visibility

    const saveButton =
        document.getElementById(
            "save-bill-btn"
        );

    const savedButton =
        document.getElementById(
            "saved-bills-btn"
        );


    if (saveButton) {
        saveButton.classList.remove(
            "tour-force-visible"
        );
    }


    if (savedButton) {
        savedButton.classList.remove(
            "tour-force-visible"
        );
    }


    renderCurrentBill();

}


// ======================================================
// TUTORIAL BUTTONS
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const next =
            document.getElementById(
                "tutorial-next"
            );

        const skip =
            document.getElementById(
                "tutorial-skip"
            );


        if (next) {

            next.addEventListener(
                "click",
                nextTutorialStep
            );

        }


        if (skip) {

            skip.addEventListener(
                "click",
                finishTutorial
            );

        }

    }
);


// ======================================================
// RECALCULATE TUTORIAL POSITION
// ======================================================

window.addEventListener(
    "resize",
    function () {

        if (!tutorialActive) return;


        const targetId =
            tutorialTargets[
                tutorialStep
            ];


        const target =
            document.getElementById(
                targetId
            );


        if (target) {
            positionTutorial(target);
        }

    }
);


// ======================================================
// CALCULATOR INPUTS
// ======================================================

function setupCalculatorInputs() {

    const price =
        document.getElementById(
            "price"
        );

    const length =
        document.getElementById(
            "length"
        );

    const width =
        document.getElementById(
            "width"
        );


    if (price) {

        price.addEventListener(
            "focus",
            function () {

                selectedInput =
                    price;

            }
        );

    }


    if (length) {

        length.addEventListener(
            "focus",
            function () {

                selectedInput =
                    length;

            }
        );

    }


    if (width) {

        width.addEventListener(
            "focus",
            function () {

                selectedInput =
                    width;

            }
        );

    }


    selectedInput =
        price;

}


// ======================================================
// WOOD SELECTOR
// ======================================================

function show() {

    const area =
        document.getElementById(
            "see-area"
        );


    if (!area) return;


    area.classList.add(
        "active"
    );

}


function off() {

    const area =
        document.getElementById(
            "see-area"
        );


    if (area) {

        area.classList.remove(
            "active"
        );

    }


    updateSelectedWood();

}


// ======================================================
// UPDATE SELECTED WOOD
// ======================================================

function updateSelectedWood() {

    const wood =
        document.getElementById(
            "wood-type"
        );

    const price =
        document.getElementById(
            "price"
        );

    const selectedWood =
        document.getElementById(
            "selected-wood"
        );

    const selectedPrice =
        document.getElementById(
            "selected-price"
        );


    if (!wood) return;


    if (selectedWood) {

        selectedWood.textContent =
            wood.options[
                wood.selectedIndex
            ].text;

    }


    if (
        selectedPrice &&
        price &&
        price.value !== ""
    ) {

        selectedPrice.textContent =
            "LKR " +
            Number(
                price.value
            ).toFixed(2);

    }
    else if (selectedPrice) {

        selectedPrice.textContent =
            "LKR 0.00";

    }

}


// ======================================================
// CALCULATION
// ======================================================

function calculation() {

    const woodSelect =
        document.getElementById(
            "wood-type"
        );

    const priceInput =
        document.getElementById(
            "price"
        );

    const lengthInput =
        document.getElementById(
            "length"
        );

    const widthInput =
        document.getElementById(
            "width"
        );


    if (
        !woodSelect ||
        !priceInput ||
        !lengthInput ||
        !widthInput
    ) {
        return;
    }


    const woodType =
        woodSelect.options[
            woodSelect.selectedIndex
        ].text;


    const price =
        parseFloat(
            priceInput.value
        );


    const length =
        parseFloat(
            lengthInput.value
        );


    const width =
        parseFloat(
            widthInput.value
        );


    if (
        isNaN(price) ||
        isNaN(length) ||
        isNaN(width)
    ) {

        alert(
            "Please enter all values."
        );

        return;

    }


    if (
        price < 0 ||
        length <= 0 ||
        width <= 0
    ) {

        alert(
            "Please enter valid values."
        );

        return;

    }


    // ==================================================
    // CFT
    // Formula:
    // Length(ft) × Width(in) × Thickness(in) / 144
    //
    // Your original app uses width twice,
    // so the same calculation is preserved:
    //
    // length × width × width / 2304
    // ==================================================

    const cft =
        (
            length *
            width *
            width
        ) / 2304;


    const itemPrice =
        price * cft;


    const item = {

        localId:
            Date.now() +
            Math.random(),

        wood_type:
            woodType,

        price_per_cft:
            price,

        length_ft:
            length,

        width_in:
            width,

        cft:
            cft,

        item_price:
            itemPrice

    };


    currentItems.push(
        item
    );


    renderCurrentBill();


    lengthInput.value = "";

    widthInput.value = "";


    updateSelectedWood();

}


// ======================================================
// CURRENT BILL
// ======================================================

function renderCurrentBill() {

    const body =
        document.getElementById(
            "bill-body"
        );

    const totalElement =
        document.getElementById(
            "total"
        );

    const totalCFTElement =
        document.getElementById(
            "total-cft"
        );


    if (!body) return;


    body.innerHTML = "";


    let totalPrice = 0;

    let totalCFT = 0;


    currentItems.forEach(
        function (item, index) {

            totalPrice +=
                Number(
                    item.item_price
                );


            totalCFT +=
                Number(
                    item.cft
                );


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        item.wood_type
                    )}
                </td>

                <td>
                    ${Number(
                        item.width_in
                    ).toFixed(2)}
                </td>

                <td>
                    ${Number(
                        item.length_ft
                    ).toFixed(2)}
                </td>

                <td>
                    ${Number(
                        item.cft
                    ).toFixed(3)}
                </td>

                <td>
                    LKR
                    ${Number(
                        item.item_price
                    ).toFixed(2)}
                </td>

                <td>

                    <button
                        type="button"
                        class="delete-item-btn"
                        onclick="removeCurrentItem(${index})"
                    >
                        ×
                    </button>

                </td>

            `;


            body.appendChild(
                row
            );

        }
    );


    if (totalElement) {

        totalElement.textContent =
            "LKR " +
            totalPrice.toFixed(2);

    }


    if (totalCFTElement) {

        totalCFTElement.textContent =
            totalCFT.toFixed(3) +
            " CFT";

    }


    const saveButton =
        document.getElementById(
            "save-bill-btn"
        );

    const savedButton =
        document.getElementById(
            "saved-bills-btn"
        );


    if (saveButton) {

        saveButton.style.display =
            currentItems.length > 0
                ? "block"
                : "none";

    }


    if (savedButton) {

        savedButton.style.display =
            "block";

    }

}


// ======================================================
// REMOVE CURRENT ITEM
// ======================================================

function removeCurrentItem(index) {

    currentItems.splice(
        index,
        1
    );

    renderCurrentBill();

}


// ======================================================
// SAVE BILL
// ======================================================

function saveBill() {

    if (!currentUser) {

        alert(
            "Connecting to database. Please try again."
        );

        return;

    }


    if (currentItems.length === 0) {

        alert(
            "Please calculate at least one item first."
        );

        return;

    }


    const modal =
        document.getElementById(
            "save-modal"
        );

    const title =
        document.getElementById(
            "save-modal-title"
        );

    const saveButton =
        modal
            ? modal.querySelector(
                ".modal-action"
            )
            : null;


    const t =
        translations[
            currentLanguage
        ];


    if (title) {

        title.textContent =
            editingBillId
                ? "Update your bill"
                : "Give your bill a name";

    }


    if (saveButton) {

        saveButton.textContent =
            editingBillId
                ? t.updateBill
                : t.saveBill;

    }


    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


// ======================================================
// CONFIRM SAVE
// ======================================================

async function confirmSaveBill() {

    if (!currentUser) {

        alert(
            "User is not connected."
        );

        return;

    }


    if (currentItems.length === 0) {

        alert(
            "There are no items to save."
        );

        return;

    }


    const nameInput =
        document.getElementById(
            "bill-name"
        );


    const billName =
        nameInput
            ? nameInput.value.trim()
            : "";


    if (!billName) {

        alert(
            "Please enter a bill name."
        );

        return;

    }


    const total =
        currentItems.reduce(
            function (sum, item) {

                return (
                    sum +
                    Number(
                        item.item_price
                    )
                );

            },
            0
        );


    closeSaveModal();


    requestAdThen(
        async function () {

            await saveBillToDatabase(
                billName,
                total
            );

        },
        "save"
    );

}


// ======================================================
// SAVE / UPDATE BILL
// ======================================================

async function saveBillToDatabase(
    billName,
    total
) {

    try {

        let billId =
            editingBillId;


        // ==================================================
        // UPDATE
        // ==================================================

        if (editingBillId) {

            const {
                error
            } =
                await supabaseClient
                    .from("bills")
                    .update({
                        bill_name:
                            billName,

                        total:
                            total
                    })
                    .eq(
                        "id",
                        editingBillId
                    )
                    .eq(
                        "user_id",
                        currentUser.id
                    );


            if (error) {
                throw error;
            }


            const {
                error: deleteError
            } =
                await supabaseClient
                    .from(
                        "wood_calculations"
                    )
                    .delete()
                    .eq(
                        "bill_id",
                        editingBillId
                    )
                    .eq(
                        "user_id",
                        currentUser.id
                    );


            if (deleteError) {
                throw deleteError;
            }

        }


        // ==================================================
        // CREATE
        // ==================================================

        else {

            const {
                data,
                error
            } =
                await supabaseClient
                    .from("bills")
                    .insert({

                        user_id:
                            currentUser.id,

                        bill_name:
                            billName,

                        total:
                            total

                    })
                    .select()
                    .single();


            if (error) {
                throw error;
            }


            billId =
                data.id;

        }


        // ==================================================
        // ITEMS
        // ==================================================

        const rows =
            currentItems.map(
                function (item) {

                    return {

                        bill_id:
                            billId,

                        user_id:
                            currentUser.id,

                        wood_type:
                            item.wood_type,

                        price_per_cft:
                            item.price_per_cft,

                        length_ft:
                            item.length_ft,

                        width_in:
                            item.width_in,

                        cft:
                            item.cft,

                        item_price:
                            item.item_price

                    };

                }
            );


        const {
            error: itemError
        } =
            await supabaseClient
                .from(
                    "wood_calculations"
                )
                .insert(rows);


        if (itemError) {
            throw itemError;
        }


        alert(
            editingBillId
                ? "Bill updated successfully!"
                : "Bill saved successfully!"
        );


        editingBillId =
            null;


        startNewBill();

    }
    catch (error) {

        console.error(
            "Save error:",
            error
        );


        alert(
            "Could not save the bill.\n\n" +
            error.message
        );

    }

}


// ======================================================
// CLOSE SAVE MODAL
// ======================================================

function closeSaveModal() {

    const modal =
        document.getElementById(
            "save-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


// ======================================================
// NEW BILL
// ======================================================

function startNewBill() {

    currentItems = [];

    editingBillId = null;


    const billName =
        document.getElementById(
            "bill-name"
        );

    const price =
        document.getElementById(
            "price"
        );

    const length =
        document.getElementById(
            "length"
        );

    const width =
        document.getElementById(
            "width"
        );


    if (billName)
        billName.value = "";


    if (price)
        price.value = "";


    if (length)
        length.value = "";


    if (width)
        width.value = "";


    renderCurrentBill();

    updateSelectedWood();

}


// ======================================================
// SHOW SAVED BILLS
// ======================================================

async function showSavedBills() {

    if (!currentUser) {

        alert(
            "User is not connected."
        );

        return;

    }


    const modal =
        document.getElementById(
            "saved-modal"
        );

    const list =
        document.getElementById(
            "saved-bills-list"
        );


    if (!list) return;


    list.innerHTML =
        "<p>Loading bills...</p>";


    if (modal) {

        modal.classList.add(
            "active"
        );

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("bills")
                .select("*")
                .eq(
                    "user_id",
                    currentUser.id
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


        if (error) {
            throw error;
        }


        list.innerHTML = "";


        if (
            !data ||
            data.length === 0
        ) {

            list.innerHTML =
                `
                <p class="empty-bills">
                    No saved bills yet.
                </p>
                `;

            return;

        }


        data.forEach(
            function (bill) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "saved-bill-card";


                card.innerHTML = `

                    <div
                        class="saved-bill-info"
                        onclick="openSavedBill('${bill.id}')"
                    >

                        <h3>
                            ${escapeHTML(
                                bill.bill_name
                            )}
                        </h3>

                        <p>
                            LKR
                            ${Number(
                                bill.total
                            ).toFixed(2)}
                        </p>

                        <small>
                            ${formatDate(
                                bill.created_at
                            )}
                        </small>

                    </div>


                    <div class="saved-bill-actions">

                        <button
                            type="button"
                            class="icon-action"
                            title="Download"
                            onclick="openDownloadModal('${bill.id}')"
                        >
                            ↓
                        </button>


                        <button
                            type="button"
                            class="icon-action"
                            title="Edit"
                            onclick="editSavedBill('${bill.id}')"
                        >
                            ✎
                        </button>


                        <button
                            type="button"
                            class="icon-action delete-action"
                            title="Delete"
                            onclick="deleteSavedBill('${bill.id}')"
                        >
                            ×
                        </button>

                    </div>

                `;


                list.appendChild(
                    card
                );

            }
        );

    }
    catch (error) {

        console.error(
            "Saved bills error:",
            error
        );


        list.innerHTML =
            `
            <p>
                ${escapeHTML(
                    error.message
                )}
            </p>
            `;

    }

}


// ======================================================
// CLOSE SAVED BILLS
// ======================================================

function closeSavedBills() {

    const modal =
        document.getElementById(
            "saved-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


// ======================================================
// OPEN SAVED BILL
// ======================================================

async function openSavedBill(
    billId
) {

    if (!currentUser) return;


    try {

        const {
            data: bill,
            error: billError
        } =
            await supabaseClient
                .from("bills")
                .select("*")
                .eq(
                    "id",
                    billId
                )
                .eq(
                    "user_id",
                    currentUser.id
                )
                .single();


        if (billError) {
            throw billError;
        }


        const {
            data: items,
            error: itemError
        } =
            await supabaseClient
                .from(
                    "wood_calculations"
                )
                .select("*")
                .eq(
                    "bill_id",
                    billId
                )
                .eq(
                    "user_id",
                    currentUser.id
                )
                .order(
                    "created_at",
                    {
                        ascending: true
                    }
                );


        if (itemError) {
            throw itemError;
        }


        renderViewBill(
            bill,
            items || []
        );

    }
    catch (error) {

        console.error(error);

        alert(
            "Could not open bill.\n\n" +
            error.message
        );

    }

}


// ======================================================
// VIEW BILL
// ======================================================

function renderViewBill(
    bill,
    items
) {

    const modal =
        document.getElementById(
            "view-modal"
        );

    const title =
        document.getElementById(
            "view-bill-name"
        );

    const content =
        document.getElementById(
            "view-bill-content"
        );


    if (
        !modal ||
        !content
    ) {
        return;
    }


    if (title) {

        title.textContent =
            bill.bill_name;

    }


    modal.dataset.billId =
        bill.id;


    let totalCFT = 0;


    let html = `

        <div class="view-bill-table">

            <table>

                <thead>

                    <tr>

                        <th>
                            Wood
                        </th>

                        <th>
                            Width
                        </th>

                        <th>
                            Length
                        </th>

                        <th>
                            CFT
                        </th>

                        <th>
                            Price
                        </th>

                    </tr>

                </thead>

                <tbody>

    `;


    items.forEach(
        function (item) {

            totalCFT +=
                Number(
                    item.cft
                );


            html += `

                <tr>

                    <td>
                        ${escapeHTML(
                            item.wood_type
                        )}
                    </td>

                    <td>
                        ${Number(
                            item.width_in
                        ).toFixed(2)}
                    </td>

                    <td>
                        ${Number(
                            item.length_ft
                        ).toFixed(2)}
                    </td>

                    <td>
                        ${Number(
                            item.cft
                        ).toFixed(3)}
                    </td>

                    <td>
                        LKR
                        ${Number(
                            item.item_price
                        ).toFixed(2)}
                    </td>

                </tr>

            `;

        }
    );


    html += `

                </tbody>

            </table>


            <div class="view-summary">

                <div class="view-summary-box">

                    <small>
                        Total CFT
                    </small>

                    <strong>
                        ${totalCFT.toFixed(3)} CFT
                    </strong>

                </div>


                <div class="view-summary-box">

                    <small>
                        Price / CFT
                    </small>

                    <strong>
                        Multiple
                    </strong>

                </div>

            </div>


            <div class="view-total">

                <strong>
                    Total
                </strong>

                <span>
                    LKR
                    ${Number(
                        bill.total
                    ).toFixed(2)}
                </span>

            </div>

        </div>

    `;


    content.innerHTML =
        html;


    modal.classList.add(
        "active"
    );


    closeSavedBills();

}


// ======================================================
// CLOSE VIEW BILL
// ======================================================

function closeViewBill() {

    const modal =
        document.getElementById(
            "view-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


// ======================================================
// EDIT SAVED BILL
// ======================================================

async function editSavedBill(
    billId
) {

    if (!currentUser) return;


    try {

        const {
            data: bill,
            error: billError
        } =
            await supabaseClient
                .from("bills")
                .select("*")
                .eq(
                    "id",
                    billId
                )
                .eq(
                    "user_id",
                    currentUser.id
                )
                .single();


        if (billError) {
            throw billError;
        }


        const {
            data: items,
            error: itemError
        } =
            await supabaseClient
                .from(
                    "wood_calculations"
                )
                .select("*")
                .eq(
                    "bill_id",
                    billId
                )
                .eq(
                    "user_id",
                    currentUser.id
                )
                .order(
                    "created_at",
                    {
                        ascending: true
                    }
                );


        if (itemError) {
            throw itemError;
        }


        editingBillId =
            billId;


        currentItems =
            (items || []).map(
                function (item) {

                    return {

                        localId:
                            Date.now() +
                            Math.random(),

                        wood_type:
                            item.wood_type,

                        price_per_cft:
                            Number(
                                item.price_per_cft
                            ),

                        length_ft:
                            Number(
                                item.length_ft
                            ),

                        width_in:
                            Number(
                                item.width_in
                            ),

                        cft:
                            Number(
                                item.cft
                            ),

                        item_price:
                            Number(
                                item.item_price
                            )

                    };

                }
            );


        const billName =
            document.getElementById(
                "bill-name"
            );


        if (billName) {

            billName.value =
                bill.bill_name;

        }


        renderCurrentBill();


        closeSavedBills();


        saveBill();

    }
    catch (error) {

        console.error(error);

        alert(
            "Could not edit bill.\n\n" +
            error.message
        );

    }

}


// ======================================================
// DELETE SAVED BILL
// ======================================================

async function deleteSavedBill(
    billId
) {

    if (!currentUser) return;


    const confirmed =
        confirm(
            "Are you sure you want to delete this bill?"
        );


    if (!confirmed) return;


    try {

        const {
            error: itemError
        } =
            await supabaseClient
                .from(
                    "wood_calculations"
                )
                .delete()
                .eq(
                    "bill_id",
                    billId
                )
                .eq(
                    "user_id",
                    currentUser.id
                );


        if (itemError) {
            throw itemError;
        }


        const {
            error: billError
        } =
            await supabaseClient
                .from("bills")
                .delete()
                .eq(
                    "id",
                    billId
                )
                .eq(
                    "user_id",
                    currentUser.id
                );


        if (billError) {
            throw billError;
        }


        alert(
            "Bill deleted successfully!"
        );


        await showSavedBills();

    }
    catch (error) {

        console.error(error);

        alert(
            "Could not delete bill.\n\n" +
            error.message
        );

    }

}


// ======================================================
// DOWNLOAD MODAL
// ======================================================

function openDownloadModal(
    billId
) {

    downloadBillId =
        billId;


    const modal =
        document.getElementById(
            "download-modal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


function openDownloadModalFromView() {

    const modal =
        document.getElementById(
            "view-modal"
        );


    if (!modal) return;


    const billId =
        modal.dataset.billId;


    if (!billId) {

        alert(
            "Bill ID not found."
        );

        return;

    }


    openDownloadModal(
        billId
    );

}


// ======================================================
// CLOSE DOWNLOAD MODAL
// ======================================================

function closeDownloadModal() {

    const modal =
        document.getElementById(
            "download-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    downloadBillId =
        null;

}


// ======================================================
// DOWNLOAD
// ======================================================

function downloadSavedBill(
    format
) {

    if (!downloadBillId) {

        alert(
            "Bill not selected."
        );

        return;

    }


    const businessInput =
        document.getElementById(
            "business-name"
        );


    const businessName =
        businessInput
            ? businessInput.value.trim()
            : "";


    if (!businessName) {

        alert(
            "Please enter your business name."
        );

        return;

    }


    const billId =
        downloadBillId;


    closeDownloadModal();


    requestAdThen(
        async function () {

            await generateBillDownload(
                billId,
                businessName,
                format
            );

        },
        "download"
    );

}


// ======================================================
// GENERATE DOWNLOAD
// ======================================================

async function generateBillDownload(
    billId,
    businessName,
    format
) {

    let documentElement = null;


    try {

        const {
            data: bill,
            error: billError
        } =
            await supabaseClient
                .from("bills")
                .select("*")
                .eq(
                    "id",
                    billId
                )
                .eq(
                    "user_id",
                    currentUser.id
                )
                .single();


        if (billError) {
            throw billError;
        }


        const {
            data: items,
            error: itemError
        } =
            await supabaseClient
                .from(
                    "wood_calculations"
                )
                .select("*")
                .eq(
                    "bill_id",
                    billId
                )
                .eq(
                    "user_id",
                    currentUser.id
                )
                .order(
                    "created_at",
                    {
                        ascending: true
                    }
                );


        if (itemError) {
            throw itemError;
        }


        let totalCFT = 0;


        (items || []).forEach(
            function (item) {

                totalCFT +=
                    Number(
                        item.cft
                    );

            }
        );


        documentElement =
            document.createElement(
                "div"
            );


        documentElement.style.position =
            "fixed";

        documentElement.style.left =
            "-10000px";

        documentElement.style.top =
            "0";

        documentElement.style.width =
            "794px";

        documentElement.style.background =
            "white";


        let rows = "";


        (items || []).forEach(
            function (item, index) {

                rows += `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.wood_type
                            )}
                        </td>

                        <td>
                            ${Number(
                                item.width_in
                            ).toFixed(2)}
                        </td>

                        <td>
                            ${Number(
                                item.length_ft
                            ).toFixed(2)}
                        </td>

                        <td>
                            ${Number(
                                item.cft
                            ).toFixed(3)}
                        </td>

                        <td>
                            LKR
                            ${Number(
                                item.price_per_cft
                            ).toFixed(2)}
                        </td>

                        <td>
                            LKR
                            ${Number(
                                item.item_price
                            ).toFixed(2)}
                        </td>

                    </tr>

                `;

            }
        );


        documentElement.innerHTML = `

            <div class="download-document">

                <div class="download-header">

                    <div class="download-brand">

                        <img
                            class="download-logo"
                            src="logo.png"
                            alt="Logo"
                        >

                        <div>

                            <h1>
                                Wood Calculator
                            </h1>

                            <p>
                                Professional Wood Measurement & Billing
                            </p>

                        </div>

                    </div>


                    <div class="download-meta">

                        <span class="bill-label">
                            BILL
                        </span>

                        <h2>
                            ${escapeHTML(
                                bill.bill_name
                            )}
                        </h2>

                        <p>
                            ${formatDate(
                                bill.created_at
                            )}
                        </p>

                    </div>

                </div>


                <div class="download-title">

                    <h3>
                        ${escapeHTML(
                            businessName
                        )}
                    </h3>

                    <p>
                        Wood calculation and billing statement
                    </p>

                </div>


                <table>

                    <thead>

                        <tr>

                            <th>
                                #
                            </th>

                            <th>
                                Wood
                            </th>

                            <th>
                                Width (in)
                            </th>

                            <th>
                                Length (ft)
                            </th>

                            <th>
                                CFT
                            </th>

                            <th>
                                Price / CFT
                            </th>

                            <th>
                                Item Total
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${rows}

                    </tbody>

                </table>


                <div class="download-summary">

                    <div class="download-summary-box">

                        <span>
                            Total CFT
                        </span>

                        <strong>
                            ${totalCFT.toFixed(3)} CFT
                        </strong>

                    </div>


                    <div class="download-summary-box">

                        <span>
                            Items
                        </span>

                        <strong>
                            ${(items || []).length}
                        </strong>

                    </div>

                </div>


                <div class="download-grand-total">

                    <span>
                        Grand Total
                    </span>

                    <strong>
                        LKR
                        ${Number(
                            bill.total
                        ).toFixed(2)}
                    </strong>

                </div>


                <div class="download-footer">

                    <span>
                        Thank you for your business.
                    </span>

                    <span>
                        Wood Calculator
                    </span>

                </div>

            </div>

        `;


        document.body.appendChild(
            documentElement
        );


        if (
            typeof html2canvas !==
            "function"
        ) {

            throw new Error(
                "html2canvas library is not loaded."
            );

        }


        const canvas =
            await html2canvas(
                documentElement,
                {
                    scale: 2,

                    useCORS: true,

                    backgroundColor:
                        "#ffffff"
                }
            );


        // ==================================================
        // IMAGE
        // ==================================================

        if (format === "image") {

            const link =
                document.createElement(
                    "a"
                );


            link.download =
                sanitizeFileName(
                    bill.bill_name
                ) +
                ".png";


            link.href =
                canvas.toDataURL(
                    "image/png"
                );


            document.body.appendChild(
                link
            );


            link.click();

            link.remove();

        }


        // ==================================================
        // PDF
        // ==================================================

        else {

            if (
                !window.jspdf ||
                !window.jspdf.jsPDF
            ) {

                throw new Error(
                    "jsPDF library is not loaded."
                );

            }


            const jsPDF =
                window.jspdf.jsPDF;


            const pdf =
                new jsPDF(
                    "p",
                    "mm",
                    "a4"
                );


            const imageData =
                canvas.toDataURL(
                    "image/png"
                );


            const pageWidth =
                pdf.internal.pageSize
                    .getWidth();


            const pageHeight =
                pdf.internal.pageSize
                    .getHeight();


            const margin = 8;


            const imageWidth =
                pageWidth -
                margin * 2;


            const imageHeight =
                canvas.height *
                imageWidth /
                canvas.width;


            let heightLeft =
                imageHeight;


            let position =
                margin;


            pdf.addImage(
                imageData,
                "PNG",
                margin,
                position,
                imageWidth,
                imageHeight
            );


            heightLeft -=
                pageHeight -
                margin * 2;


            while (
                heightLeft > 0
            ) {

                position =
                    heightLeft -
                    imageHeight +
                    margin;


                pdf.addPage();


                pdf.addImage(
                    imageData,
                    "PNG",
                    margin,
                    position,
                    imageWidth,
                    imageHeight
                );


                heightLeft -=
                    pageHeight -
                    margin * 2;

            }


            pdf.save(
                sanitizeFileName(
                    bill.bill_name
                ) +
                ".pdf"
            );

        }

    }
    catch (error) {

        console.error(
            "Download error:",
            error
        );


        alert(
            "Could not generate download.\n\n" +
            error.message
        );

    }
    finally {

        if (documentElement) {

            documentElement.remove();

        }

    }

}


// ======================================================
// AD GATE
// ======================================================

function requestAdThen(
    callback,
    actionType
) {

    pendingAdAction =
        callback;


    const modal =
        document.getElementById(
            "ad-gate-modal"
        );


    const message =
        document.getElementById(
            "ad-gate-message"
        );


    if (message) {

        if (
            actionType ===
            "save"
        ) {

            message.textContent =
                "Watch the advertisement before saving your bill.";

        }
        else {

            message.textContent =
                "Watch the advertisement before downloading your bill.";

        }

    }


    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


// ======================================================
// COMPLETE AD
// ======================================================

function completeAdGate() {

    const modal =
        document.getElementById(
            "ad-gate-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    if (
        typeof pendingAdAction ===
        "function"
    ) {

        const action =
            pendingAdAction;


        pendingAdAction =
            null;


        action();

    }

}


// ======================================================
// CANCEL AD
// ======================================================

function cancelAdGate() {

    pendingAdAction =
        null;


    const modal =
        document.getElementById(
            "ad-gate-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


// ======================================================
// NUMPAD
// ======================================================

function show_numpad() {

    const numpad =
        document.getElementById(
            "num-pad"
        );

    const button =
        document.getElementById(
            "show_num"
        );


    if (!selectedInput) {

        selectedInput =
            document.getElementById(
                "price"
            );

    }


    if (numpad) {

        numpad.classList.add(
            "active"
        );

    }


    if (button) {

        button.classList.add(
            "active"
        );

    }


    if (selectedInput) {

        selectedInput.focus();

    }

}


function hide_numpad() {

    const numpad =
        document.getElementById(
            "num-pad"
        );

    const button =
        document.getElementById(
            "show_num"
        );


    if (numpad) {

        numpad.classList.remove(
            "active"
        );

    }


    if (button) {

        button.classList.remove(
            "active"
        );

    }

}


function numPress(number) {

    if (!selectedInput) {

        selectedInput =
            document.getElementById(
                "price"
            );

    }


    if (!selectedInput) return;


    selectedInput.value +=
        number;


    selectedInput.dispatchEvent(
        new Event(
            "input",
            {
                bubbles: true
            }
        )
    );


    selectedInput.focus();

}


function clearInput() {

    if (!selectedInput) return;


    selectedInput.value = "";


    selectedInput.focus();


    selectedInput.dispatchEvent(
        new Event(
            "input",
            {
                bubbles: true
            }
        )
    );

}


function nextInput() {

    const inputs = [

        document.getElementById(
            "price"
        ),

        document.getElementById(
            "length"
        ),

        document.getElementById(
            "width"
        )

    ];


    const currentIndex =
        inputs.indexOf(
            selectedInput
        );


    if (
        currentIndex >= 0 &&
        currentIndex <
        inputs.length - 1
    ) {

        selectedInput =
            inputs[
                currentIndex + 1
            ];


        selectedInput.focus();

    }
    else {

        hide_numpad();

    }

}


// ======================================================
// DATE
// ======================================================

function formatDate(date) {

    if (!date) return "";


    let locale =
        "en-US";


    if (
        currentLanguage ===
        "si"
    ) {

        locale =
            "si-LK";

    }


    if (
        currentLanguage ===
        "ta"
    ) {

        locale =
            "ta-LK";

    }


    return new Date(
        date
    ).toLocaleString(
        locale
    );

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


// ======================================================
// SAFE FILE NAME
// ======================================================

function sanitizeFileName(name) {

    return String(name)

        .replace(
            /[<>:"/\\|?*]+/g,
            "_"
        )

        .trim()

        .substring(
            0,
            100
        );

}


// ======================================================
// CLOSE MODALS ON BACKGROUND
// ======================================================

document.addEventListener(
    "click",
    function (event) {

        const saveModal =
            document.getElementById(
                "save-modal"
            );

        const savedModal =
            document.getElementById(
                "saved-modal"
            );

        const viewModal =
            document.getElementById(
                "view-modal"
            );

        const downloadModal =
            document.getElementById(
                "download-modal"
            );

        const adModal =
            document.getElementById(
                "ad-gate-modal"
            );


        if (
            event.target ===
            saveModal
        ) {

            closeSaveModal();

        }


        if (
            event.target ===
            savedModal
        ) {

            closeSavedBills();

        }


        if (
            event.target ===
            viewModal
        ) {

            closeViewBill();

        }


        if (
            event.target ===
            downloadModal
        ) {

            closeDownloadModal();

        }


        if (
            event.target ===
            adModal
        ) {

            cancelAdGate();

        }

    }
);


// ======================================================
// PRICE INPUT
// ======================================================

document.addEventListener(
    "input",
    function (event) {

        if (
            event.target &&
            event.target.id ===
            "price"
        ) {

            updateSelectedWood();

        }

    }
);


// ======================================================
// WOOD SELECT
// ======================================================

document.addEventListener(
    "change",
    function (event) {

        if (
            event.target &&
            event.target.id ===
            "wood-type"
        ) {

            updateSelectedWood();

        }

    }
);