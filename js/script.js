(function ($) {
    "use strict";
    $('.sakura-falling').sakura();
})(jQuery);

// Translations Dictionary
var currentLang = 'en';

var translations = {
    en: {
        badge: "ENGAGEMENT INVITATION",
        bride: "Lokeshwari",
        groom: "Kundan",
        status: "Are getting engaged",
        invite: "Inviting you and your family to attend engagement ceremony event on",
        date: "Sunday, 22 November 2026",
        at: "at",
        time: "1:00 PM",
        venueLabel: "Venue :",
        venue: "Gandhi Chowk Milpara Maroad ( Kurud )",
        celebration: "ceremony & celebration to follow",
        seeVenue: "GET DIRECTION",
        mapTitle: "📍 Venue Location",
        footer: "Can't wait to celebrate this auspicious moment of our family with you!",
        happiness: "Join us in our happiness! 💍 ✨",
        langBtn: "हिन्दी",
        musicPlay: "Play Music",
        musicOn: "Music On",
        days: "Days",
        hours: "Hours",
        mins: "Mins",
        secs: "Secs",
        endMsg: "Bless the engaged couple for a happy life together! 💍 ✨"
    },
    hi: {
        badge: "सगाई निमंत्रण",
        bride: "लोकेश्वरी",
        groom: "कुंदन",
        status: "परिणय सूत्र में बंधने जा रहे हैं",
        invite: "आप सभी सपरिवार हमारी सगाई समारोह में सादर आमंत्रित हैं",
        date: "रविवार, 22 नवम्बर 2026",
        at: "दोपहर",
        time: "1:00 बजे",
        venueLabel: "स्थान :",
        venue: "गांधी चौक मिलपारा मरोद ( कुरूद )",
        celebration: "समारोह एवं स्नेह भोज",
        seeVenue: "रास्ता देखें (गूगल मैप)",
        mapTitle: "📍 समारोह स्थल",
        footer: "हमारे परिवार के इस मांगलिक अवसर पर आपकी गरिमामयी उपस्थिति प्रार्थनीय है।",
        happiness: "हमारी खुशियों में शामिल हों! 💍 ✨",
        langBtn: "English",
        musicPlay: "संगीत चलाएं",
        musicOn: "संगीत चालू",
        days: "दिन",
        hours: "घंटे",
        mins: "मिनट",
        secs: "सेकंड",
        endMsg: "वर-वधू को सुखद जीवन के लिए अपना स्नेह एवं आशीर्वाद प्रदान करें! 💍 ✨"
    }
};

function applyLanguage(lang) {
    currentLang = lang;
    var t = translations[lang] || translations.en;

    if (lang === 'hi') {
        document.body.classList.add('lang-hi');
    } else {
        document.body.classList.remove('lang-hi');
    }

    var elBadge = document.getElementById('textBadge');
    if (elBadge) elBadge.innerText = t.badge;

    var elBride = document.getElementById('brideName');
    if (elBride) elBride.innerText = t.bride;

    var elGroom = document.getElementById('groomName');
    if (elGroom) elGroom.innerText = t.groom;

    var elStatus = document.getElementById('textStatus');
    if (elStatus) elStatus.innerText = t.status;

    var elInvite = document.getElementById('textInvite');
    if (elInvite) elInvite.innerText = t.invite;

    var elDate = document.getElementById('textDate');
    if (elDate) elDate.innerText = t.date;

    var elAt = document.getElementById('textAt');
    if (elAt) elAt.innerText = t.at;

    var elTime = document.getElementById('textTime');
    if (elTime) elTime.innerText = t.time;

    var elVenueLabel = document.getElementById('textVenueLabel');
    if (elVenueLabel) elVenueLabel.innerText = t.venueLabel;

    var elVenue = document.getElementById('textVenue');
    if (elVenue) elVenue.innerText = t.venue;

    var elCelebration = document.getElementById('textCelebration');
    if (elCelebration) elCelebration.innerText = t.celebration;

    var elSeeVenue = document.getElementById('textSeeVenue');
    if (elSeeVenue) elSeeVenue.innerText = t.seeVenue;

    var elMapTitle = document.getElementById('textMapTitle');
    if (elMapTitle) elMapTitle.innerText = t.mapTitle;

    var elFooter = document.getElementById('textFooter');
    if (elFooter) elFooter.innerText = t.footer;

    var elHappiness = document.getElementById('textHappiness');
    if (elHappiness) elHappiness.innerText = t.happiness;

    var elLangBtn = document.getElementById('langBtnText');
    if (elLangBtn) elLangBtn.innerText = t.langBtn;

    if (musicText) {
        musicText.innerText = (audio && !audio.paused) ? t.musicOn : t.musicPlay;
    }

    renderCountdown();
}

// Language toggle click
var langBtn = document.getElementById("langToggle");
if (langBtn) {
    langBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var nextLang = (currentLang === 'en') ? 'hi' : 'en';
        applyLanguage(nextLang);
    });
}

// Audio handling
var audio = document.getElementById("my_audio");
var musicBtn = document.getElementById("musicToggle");
var musicIcon = document.getElementById("musicIcon");
var musicText = document.getElementById("musicBtnText");
var hasStartedPlaying = false;

// Welcome Modal Interaction
function dismissModal() {
    var modal = document.getElementById("welcomeModal");
    if (modal) {
        modal.classList.add("hidden");
        setTimeout(function () {
            modal.style.display = "none";
        }, 400);
    }
}

function playAudioWithLanguage(lang) {
    applyLanguage(lang);
    if (audio) {
        audio.play().then(function () {
            hasStartedPlaying = true;
            var t = translations[currentLang] || translations.en;
            if (musicIcon) musicIcon.className = "fa fa-volume-up";
            if (musicText) musicText.innerText = t.musicOn;
        }).catch(function (error) {
            console.log("Audio play error:", error);
        });
    }
    dismissModal();
}

var modalBtnHi = document.getElementById("modalBtnHi");
if (modalBtnHi) {
    modalBtnHi.addEventListener("click", function (e) {
        e.stopPropagation();
        playAudioWithLanguage('hi');
    });
}

var modalBtnEn = document.getElementById("modalBtnEn");
if (modalBtnEn) {
    modalBtnEn.addEventListener("click", function (e) {
        e.stopPropagation();
        playAudioWithLanguage('en');
    });
}

var modalBtnMute = document.getElementById("modalBtnMute");
if (modalBtnMute) {
    modalBtnMute.addEventListener("click", function (e) {
        e.stopPropagation();
        dismissModal();
    });
}

function toggleMusic() {
    if (!audio) return;
    var t = translations[currentLang] || translations.en;
    if (audio.paused) {
        audio.play().then(function () {
            hasStartedPlaying = true;
            if (musicIcon) musicIcon.className = "fa fa-volume-up";
            if (musicText) musicText.innerText = t.musicOn;
        }).catch(function (error) {
            console.log("Audio play error:", error);
        });
    } else {
        audio.pause();
        if (musicIcon) musicIcon.className = "fa fa-volume-off";
        if (musicText) musicText.innerText = t.musicPlay;
    }
}

if (musicBtn) {
    musicBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleMusic();
    });
}

// First click anywhere on the page starts music if not already started
$(document).on('click', function () {
    if (!hasStartedPlaying && audio && audio.paused) {
        var t = translations[currentLang] || translations.en;
        audio.play().then(function () {
            hasStartedPlaying = true;
            if (musicIcon) musicIcon.className = "fa fa-volume-up";
            if (musicText) musicText.innerText = t.musicOn;
        }).catch(function (e) {
            console.log("Autoplay click prevented:", e);
        });
    }
});

// Target Date: November 22, 2026 at 1:00 PM (13:00:00)
var countDownDate = new Date("Nov 22, 2026 13:00:00").getTime();

function renderCountdown() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var t = translations[currentLang] || translations.en;

    if (distance < 0) {
        document.getElementById("time").innerHTML = "<div class='end-msg'>" + t.endMsg + "</div>";
        return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var hoursStr = hours < 10 ? '0' + hours : hours;
    var minutesStr = minutes < 10 ? '0' + minutes : minutes;
    var secondsStr = seconds < 10 ? '0' + seconds : seconds;

    var html = 
        "<div class='countdown-box'>" +
            "<div class='countdown-card'>" +
                "<span class='number'>" + days + "</span>" +
                "<span class='label'>" + t.days + "</span>" +
            "</div>" +
            "<div class='countdown-separator'>:</div>" +
            "<div class='countdown-card'>" +
                "<span class='number'>" + hoursStr + "</span>" +
                "<span class='label'>" + t.hours + "</span>" +
            "</div>" +
            "<div class='countdown-separator'>:</div>" +
            "<div class='countdown-card'>" +
                "<span class='number'>" + minutesStr + "</span>" +
                "<span class='label'>" + t.mins + "</span>" +
            "</div>" +
            "<div class='countdown-separator'>:</div>" +
            "<div class='countdown-card'>" +
                "<span class='number'>" + secondsStr + "</span>" +
                "<span class='label'>" + t.secs + "</span>" +
            "</div>" +
        "</div>";

    var timeEl = document.getElementById("time");
    if (timeEl) {
        timeEl.innerHTML = html;
    }
}

// Initial render immediately so no delay
renderCountdown();

// Update every second
var x = setInterval(renderCountdown, 1000);

// Console greetings
var styles = [
    'background: linear-gradient(#9b313c, #571402)',
    'border: 3px solid #d4af37',
    'color: white',
    'display: block',
    'line-height: 40px',
    'text-align: center',
    'font-weight: bold',
    'font-size: 24px',
    'padding: 8px'
].join(';');

var styles1 = [
    'color: #9b313c',
    'display: block',
    'line-height: 36px',
    'font-weight: bold',
    'font-size: 24px'
].join(';');

console.log('\n\n%c SAVE THE DATE: 22nd Nov, 2026 at 1:00 PM!', styles);
console.log('%cYour presence is requested! - Lokeshwari & Kundan', styles1);
