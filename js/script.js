(function ($) {
    "use strict";
    $('.sakura-falling').sakura();
})(jQuery);

// Audio handling
var audio = document.getElementById("my_audio");
var musicBtn = document.getElementById("musicToggle");
var musicIcon = document.getElementById("musicIcon");
var musicText = document.getElementById("musicBtnText");
var hasStartedPlaying = false;

function toggleMusic() {
    if (!audio) return;
    if (audio.paused) {
        audio.play().then(function () {
            hasStartedPlaying = true;
            if (musicIcon) musicIcon.className = "fa fa-volume-up";
            if (musicText) musicText.innerText = "Music On";
        }).catch(function (error) {
            console.log("Audio play error:", error);
        });
    } else {
        audio.pause();
        if (musicIcon) musicIcon.className = "fa fa-volume-off";
        if (musicText) musicText.innerText = "Play Music";
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
        audio.play().then(function () {
            hasStartedPlaying = true;
            if (musicIcon) musicIcon.className = "fa fa-volume-up";
            if (musicText) musicText.innerText = "Music On";
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

    if (distance < 0) {
        document.getElementById("time").innerHTML = "<div class='end-msg'>Bless the engaged couple for a happy life together! 💍 ✨</div>";
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
                "<span class='label'>Days</span>" +
            "</div>" +
            "<div class='countdown-separator'>:</div>" +
            "<div class='countdown-card'>" +
                "<span class='number'>" + hoursStr + "</span>" +
                "<span class='label'>Hours</span>" +
            "</div>" +
            "<div class='countdown-separator'>:</div>" +
            "<div class='countdown-card'>" +
                "<span class='number'>" + minutesStr + "</span>" +
                "<span class='label'>Mins</span>" +
            "</div>" +
            "<div class='countdown-separator'>:</div>" +
            "<div class='countdown-card'>" +
                "<span class='number'>" + secondsStr + "</span>" +
                "<span class='label'>Secs</span>" +
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
