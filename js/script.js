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
        langBtn: "EN",
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

// Synthesized firework sounds (Web Audio, no files): launch whistle, boom, crackle. Mixed under the music.
var Sfx = (function () {
    var ac, master, noise, on = false, duckTimer;
    function enable() {
        on = true;
        try {
            if (!ac) {
                var AC = window.AudioContext || window.webkitAudioContext;
                if (!AC) { on = false; return; }
                ac = new AC();
                var comp = ac.createDynamicsCompressor();
                master = ac.createGain(); master.gain.value = 0.95;
                master.connect(comp); comp.connect(ac.destination);
                noise = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
                var d = noise.getChannelData(0);
                for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
            }
            if (ac.state === 'suspended') ac.resume();
        } catch (e) { on = false; }
    }
    function out(pan, vol, t) {
        var g = ac.createGain(); g.gain.value = vol;
        var node = g;
        if (ac.createStereoPanner) { var sp = ac.createStereoPanner(); sp.pan.value = Math.max(-1, Math.min(1, pan)); g.connect(sp); node = sp; }
        node.connect(master);
        return g;
    }
    function nz(g, t, dur, type, f0, f1) {
        var src = ac.createBufferSource(); src.buffer = noise; src.loop = true;
        var fl = ac.createBiquadFilter(); fl.type = type;
        fl.frequency.setValueAtTime(f0, t); fl.frequency.exponentialRampToValueAtTime(f1, t + dur);
        src.connect(fl); fl.connect(g); src.start(t, Math.random()); src.stop(t + dur + 0.05);
    }
    function whistle(pan) {
        if (!on || !ac) return;
        var t = ac.currentTime, g = out(pan * 2 - 1, 0, t), o = ac.createOscillator();
        o.type = 'sine'; o.frequency.setValueAtTime(500, t); o.frequency.exponentialRampToValueAtTime(1700, t + 0.9);
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.05, t + 0.15); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.95);
        o.connect(g); o.start(t); o.stop(t + 1);
    }
    function boom(pan, depth, type) {
        if (!on || !ac) return;
        var t = ac.currentTime, v = 0.35 + 0.65 * depth, p = pan * 2 - 1;
        var g = out(p, 0, t);
        g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
        nz(g, t, 0.9, 'lowpass', 1400, 120);
        var o = ac.createOscillator(), og = out(p, 0, t);
        o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(38, t + 0.4);
        og.gain.setValueAtTime(v * 0.9, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        o.connect(og); o.start(t); o.stop(t + 0.55);
        var n = type === 'willow' ? 14 : 7;
        for (var i = 0; i < n; i++) {                       // crackle tail
            var tt = t + 0.12 + Math.random() * (type === 'willow' ? 1.6 : 0.8), cg = out(p, 0, tt);
            cg.gain.setValueAtTime(v * 0.22 * Math.random(), tt); cg.gain.exponentialRampToValueAtTime(0.001, tt + 0.04);
            nz(cg, tt, 0.05, 'highpass', 3500, 6000);
        }
    }
    function duck(down) {                                   // lower the music while the show plays
        if (!on || typeof audio === 'undefined' || !audio) return;
        clearInterval(duckTimer);
        var target = down ? 0.45 : 1;
        duckTimer = setInterval(function () {
            var v = audio.volume + (target - audio.volume) * 0.2;
            audio.volume = Math.abs(v - target) < 0.02 ? target : v;
            if (audio.volume === target) clearInterval(duckTimer);
        }, 60);
    }
    return { enable: enable, whistle: whistle, boom: boom, duck: duck };
})();

// 3D Skyshot engine: perspective-projected bursts (sphere, tilted ring, willow, spinning heart),
// additive glow sprites, depth-based size/brightness, time-based scheduling, auto-stop when idle.
var SkyshotSystem = (function () {
    var canvas, ctx, veil, W, H, dpr, running = false, last = 0, clock = 0;
    var rockets = [], parts = [], flashes = [], queue = [], sprites = {};
    var FOC = 500, MAX = window.innerWidth < 600 ? 600 : 1300;
    var PAL = [['#ffd36b', '#ff8a3d'], ['#ff5d8f', '#ff2fa0'], ['#35e0ff', '#7a6bff'],
               ['#3dffb0', '#35e0ff'], ['#fff4d6', '#ffd36b'], ['#c77dff', '#ff5d8f']];
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    function rnd(a, b) { return a + Math.random() * (b - a); }

    // ---- Synthesized fireworks sound (Web Audio, no files needed) ----
    var AC = null, master = null, noiseBuf = null, sfxOn = true;
    function actx() {
        if (!sfxOn) return null;
        if (!AC) {
            var C = window.AudioContext || window.webkitAudioContext;
            if (!C) return null;
            AC = new C(); master = AC.createGain(); master.gain.value = 0.95;
            var comp = AC.createDynamicsCompressor(); master.connect(comp); comp.connect(AC.destination);
            noiseBuf = AC.createBuffer(1, AC.sampleRate, AC.sampleRate);
            var d = noiseBuf.getChannelData(0);
            for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        }
        if (AC.state === 'suspended') AC.resume();
        return AC;
    }
    function noise(t, dur, type, f0, f1, vol, q) {
        var src = AC.createBufferSource(); src.buffer = noiseBuf;
        var f = AC.createBiquadFilter(); f.type = type; f.Q.value = q || 0.7;
        f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
        var g = AC.createGain();
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(0.04, dur / 3));
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(f); f.connect(g); g.connect(master); src.start(t); src.stop(t + dur + 0.05);
    }
    function whoosh() { if (actx()) noise(AC.currentTime, 0.9, 'bandpass', 300, 2400, 0.16, 1.5); }
    function boom(depth, type) {
        if (!actx()) return;
        var t = AC.currentTime + 0.04 + (1 - depth) * 0.25, v = 0.3 + 0.4 * depth;  // far shells sound later and softer
        var o = AC.createOscillator(), g = AC.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(35, t + 0.5);
        g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
        o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.75);
        noise(t, 0.25, 'highpass', 3000, 800, v * 0.6);
        noise(t, 0.55, 'lowpass', 1200, 200, v * 0.8);
        if (type === 'willow') for (var i = 0; i < 14; i++) noise(t + 0.2 + rnd(0, 1.2), 0.04, 'highpass', 4000, 3000, rnd(0.04, 0.12));
    }
    var duckTimer = null;
    function duck(on) {   // fireworks take priority: music drops to ~10% during the show, then fades back
        if (typeof audio === 'undefined' || !audio) return;
        var target = on ? 0.1 : 1;
        clearInterval(duckTimer);
        duckTimer = setInterval(function () {
            var v = audio.volume, d = target - v;
            if (Math.abs(d) < 0.03) { audio.volume = target; clearInterval(duckTimer); }
            else audio.volume = Math.max(0, Math.min(1, v + d * 0.25));
        }, 40);
    }

    function sprite(c) {
        if (sprites[c]) return sprites[c];
        var s = document.createElement('canvas'); s.width = s.height = 48;
        var g = s.getContext('2d'), gr = g.createRadialGradient(24, 24, 0, 24, 24, 24);
        gr.addColorStop(0, '#fff'); gr.addColorStop(0.18, c);
        gr.addColorStop(0.5, c + '66'); gr.addColorStop(1, c + '00');
        g.fillStyle = gr; g.fillRect(0, 0, 48, 48);
        return (sprites[c] = s);
    }

    function resize() {
        if (!canvas) return;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        W = window.innerWidth; H = window.innerHeight;
        canvas.width = W * dpr; canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
        if (canvas) return true;
        canvas = document.getElementById('fireworksCanvas');
        veil = document.getElementById('skyVeil');
        if (!canvas) return false;
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        return true;
    }

    // keep bursts from covering the couple photo
    function avoid(x, y) {
        var el = document.querySelector('.couple-frame');
        if (!el) return [x, y];
        var r = el.getBoundingClientRect();
        if (x > r.left - 30 && x < r.right + 30 && y > r.top - 30 && y < r.bottom + 30) {
            y = Math.max(60, r.top - 110);
            if (y < 80) x = x < (r.left + r.right) / 2 ? Math.max(40, r.left - 70) : Math.min(W - 40, r.right + 70);
        }
        return [x, y];
    }

    function burst(cx, cy, depth, type, pal) {
        var s0 = 0.6 + 0.5 * depth;                       // far = small, near = big
        var R = Math.min(W, H) * (type === 'heart' ? 0.3 : 0.26) * s0;
        var fr = type === 'willow' ? 0.965 : 0.955;
        var v0 = R * (1 - fr);
        var n = Math.round((type === 'heart' ? 110 : type === 'ring' ? 90 : type === 'willow' ? 80 : 150) * (W < 600 ? 0.7 : 1));
        var b = { sp: rnd(0.012, 0.03) * (Math.random() < 0.5 ? -1 : 1) };
        var tx = rnd(0.5, 1.1), ty = rnd(0, Math.PI), i, d, a, u;
        if (parts.length > MAX) return;
        for (i = 0; i < n; i++) {
            var vx, vy, vz;
            if (type === 'heart') {
                a = (i / n) * Math.PI * 2;
                var hx = 16 * Math.pow(Math.sin(a), 3);
                var hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a));
                vx = hx / 17 * v0 * 1.05; vy = hy / 17 * v0 * 1.05; vz = rnd(-0.12, 0.12) * v0;
            } else if (type === 'ring') {
                a = (i / n) * Math.PI * 2;
                vx = Math.cos(a); vy = Math.sin(a); vz = 0;
                var y1 = vy * Math.cos(tx) - vz * Math.sin(tx), z1 = vy * Math.sin(tx) + vz * Math.cos(tx);
                vx = vx * Math.cos(ty) + z1 * Math.sin(ty); vz = -vx * Math.sin(ty) + z1 * Math.cos(ty); vy = y1;
                vx *= v0; vy *= v0; vz *= v0;
            } else {
                u = rnd(-1, 1); a = rnd(0, Math.PI * 2); d = Math.sqrt(1 - u * u);
                var sp = (type === 'willow' ? 0.8 : 1) * rnd(0.88, 1.0) * v0;
                vx = d * Math.cos(a) * sp; vy = u * sp; vz = d * Math.sin(a) * sp;
            }
            parts.push({ x: 0, y: 0, z: 0, vx: vx, vy: vy, vz: vz, b: b, cx: cx, cy: cy, s0: s0, fr: fr,
                g: type === 'willow' ? 0.085 : 0.035, life: 0, max: (type === 'willow' ? rnd(95, 130) : rnd(60, 85)),
                c1: type === 'willow' ? '#ffd36b' : pal[0], c2: type === 'willow' ? '#ff8a3d' : pal[1],
                tw: type === 'willow' || Math.random() < 0.2 });
        }
        flashes.push({ x: cx, y: cy, r: R * 2.2, a: 0.55, c: pal[0] });
        boom(depth, type);
        Sfx.boom(cx / W, depth, type);
    }

    function launch(x, y, depth, type, pal) {
        var p = avoid(x, y);
        Sfx.whistle(p[0] / W);
        whoosh();
        rockets.push({ sx: p[0] + rnd(-40, 40), sy: H + 10, tx: p[0], ty: p[1], t: 0, dur: rnd(0.85, 1.15),
                       depth: depth, type: type, pal: pal });
    }

    function step(now) {
        if (!running) return;
        var dt = Math.min((now - last) / 1000, 0.033); last = now; clock += dt;
        var f = dt * 60, i, p, k, a;

        while (queue.length && queue[0].t <= clock) {
            var q = queue.shift();
            launch(q.x * W, q.y * H, q.d, q.type, PAL[q.pi % PAL.length]);
        }

        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,0.26)';
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';

        for (i = flashes.length - 1; i >= 0; i--) {
            var fl = flashes[i];
            fl.a -= 0.045 * f;
            if (fl.a <= 0) { flashes.splice(i, 1); continue; }
            ctx.globalAlpha = fl.a;
            ctx.drawImage(sprite(fl.c), fl.x - fl.r, fl.y - fl.r, fl.r * 2, fl.r * 2);
        }

        for (i = rockets.length - 1; i >= 0; i--) {
            var r = rockets[i];
            r.t += dt / r.dur;
            var e = 1 - Math.pow(1 - Math.min(r.t, 1), 2);   // decelerates like a real shell
            var rx = r.sx + (r.tx - r.sx) * e, ry = r.sy + (r.ty - r.sy) * e;
            ctx.globalAlpha = 1;
            ctx.drawImage(sprite('#fff4d6'), rx - 9, ry - 9, 18, 18);
            if (parts.length < MAX) parts.push({ x: 0, y: 0, z: 0, vx: rnd(-0.4, 0.4), vy: rnd(0.4, 1.4), vz: 0,
                b: { sp: 0 }, cx: rx, cy: ry, s0: 0.4, fr: 0.95, g: 0.06, life: 0, max: rnd(14, 24),
                c1: '#ffd36b', c2: '#ff8a3d', tw: false });
            if (r.t >= 1) { burst(r.tx, r.ty, r.depth, r.type, r.pal); rockets.splice(i, 1); }
        }

        for (i = parts.length - 1; i >= 0; i--) {
            p = parts[i];
            p.life += f;
            a = 1 - p.life / p.max;
            if (a <= 0) { parts.splice(i, 1); continue; }
            var fric = Math.pow(p.fr, f), c = Math.cos(p.b.sp * f), s = Math.sin(p.b.sp * f);
            p.vx *= fric; p.vy = p.vy * fric + p.g * f; p.vz *= fric;
            p.x += p.vx * f; p.y += p.vy * f; p.z += p.vz * f;
            if (p.b.sp) {                                        // spin the whole burst around its vertical axis
                var nx = p.x * c + p.z * s, nz = -p.x * s + p.z * c; p.x = nx; p.z = nz;
                var nvx = p.vx * c + p.vz * s, nvz = -p.vx * s + p.vz * c; p.vx = nvx; p.vz = nvz;
            }
            k = (2 * FOC) / (2 * FOC + p.z);                      // perspective
            var al = (a < 0.3 ? a / 0.3 : 1) * Math.min(1, 0.55 + 0.45 * k);
            if (p.tw && Math.random() < 0.3) al *= 0.25;         // glitter
            var sz = 15 * p.s0 * k * (0.5 + 0.7 * a);
            ctx.globalAlpha = al;
            ctx.drawImage(sprite(a > 0.45 ? p.c1 : p.c2), p.cx + p.x * k - sz / 2, p.cy + p.y * k - sz / 2, sz, sz);
        }
        ctx.globalAlpha = 1;

        if (!queue.length && !rockets.length && !parts.length && !flashes.length) return stop();
        requestAnimationFrame(step);
    }

    function stop() {
        running = false;
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, W, H);
        if (veil) veil.classList.remove('on');
        duck(false);
        document.body.classList.remove('show-on');
        Sfx.duck(false);
    }

    function launchShow(force) {
        if (running || (reduce && !force) || !init()) return;
        var T = function (t, x, y, d, type, pi) { queue.push({ t: t, x: x, y: y, d: d, type: type, pi: pi }); };
        T(0.2, 0.18, 0.30, 0.8, 'sphere', 1);   T(0.55, 0.82, 0.27, 0.8, 'sphere', 2);
        T(1.2, 0.50, 0.20, 0.6, 'ring', 0);     T(1.9, 0.12, 0.42, 0.9, 'willow', 0);
        T(2.2, 0.88, 0.40, 0.9, 'willow', 0);   T(2.9, 0.30, 0.22, 0.4, 'ring', 3);
        T(3.2, 0.70, 0.22, 0.4, 'ring', 5);     T(3.9, 0.50, 0.30, 0.2, 'sphere', 4);
        T(4.5, 0.20, 0.20, 0.7, 'sphere', 2);   T(4.8, 0.80, 0.20, 0.7, 'sphere', 1);
        T(5.6, 0.50, 0.32, 1.0, 'heart', 1);    T(5.9, 0.14, 0.30, 1.0, 'willow', 0);
        T(6.1, 0.86, 0.30, 1.0, 'willow', 0);   T(6.6, 0.50, 0.16, 0.8, 'sphere', 4);
        queue.sort(function (a, b) { return a.t - b.t; });
        running = true; clock = 0; last = performance.now();
        if (veil) veil.classList.add('on');
        duck(true);
        document.body.classList.add('show-on');
        Sfx.duck(true);
        requestAnimationFrame(step);
    }

    return { launch: launchShow, setSound: function (v) { sfxOn = v; } };
})();

// Firecrackers Celebration on Invitation Opening
function launchFirecrackers() {
    SkyshotSystem.launch();
}

// Welcome Modal Interaction
function dismissModal() {
    var modal = document.getElementById("welcomeModal");
    if (modal) {
        modal.classList.add("hidden");
        setTimeout(function () {
            modal.style.display = "none";
        }, 400);
    }
    // Firecrackers burst when opening invitation!
    launchFirecrackers();
}

function playAudioWithLanguage(lang) {
    applyLanguage(lang);
    Sfx.enable();
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
        SkyshotSystem.setSound(false);   // "without music" also means a silent show
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
var countDownDate = new Date("2026-11-22T13:00:00+05:30").getTime();

var cdKeys = ['days', 'hours', 'mins', 'secs'], cdBuilt = false, cdPrev = {};
function buildCountdown() {
    var h = "<div class='countdown-box' role='timer' aria-live='off'>";
    cdKeys.forEach(function (k, i) {
        if (i) h += "<div class='countdown-separator' aria-hidden='true'>:</div>";
        h += "<div class='countdown-card'><span class='number' id='cd-" + k + "'></span><span class='label' id='cd-l-" + k + "'></span></div>";
    });
    document.getElementById("time").innerHTML = h + "</div>";
    cdBuilt = true; cdPrev = {};
}
function renderCountdown() {
    var t = translations[currentLang] || translations.en;
    var timeEl = document.getElementById("time");
    if (!timeEl) return;
    var d = countDownDate - Date.now();
    if (d < 0) { timeEl.innerHTML = "<div class='end-msg'>" + t.endMsg + "</div>"; cdBuilt = false; return; }
    if (!cdBuilt) buildCountdown();
    var v = { days: Math.floor(d / 864e5), hours: Math.floor(d % 864e5 / 36e5), mins: Math.floor(d % 36e5 / 6e4), secs: Math.floor(d % 6e4 / 1e3) };
    cdKeys.forEach(function (k) {
        var n = (k !== 'days' && v[k] < 10 ? '0' : '') + v[k], el = document.getElementById('cd-' + k);
        if (cdPrev[k] !== n) {
            el.textContent = n; cdPrev[k] = n;
            el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip');
        }
        document.getElementById('cd-l-' + k).textContent = t[k];
    });
}

// Initial render immediately so no delay
renderCountdown();

// Update every second
var x = setInterval(function () { if (!document.hidden) renderCountdown(); }, 1000);

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

var celebrateBtn = document.getElementById('celebrateBtn');
if (celebrateBtn) celebrateBtn.addEventListener('click', function (e) { e.stopPropagation(); Sfx.enable(); SkyshotSystem.setSound(true); SkyshotSystem.launch(true); });
var resumeAfterHide = false;
document.addEventListener('visibilitychange', function () {
    if (!audio) return;
    if (document.hidden) { resumeAfterHide = !audio.paused; if (resumeAfterHide) audio.pause(); }
    else if (resumeAfterHide) { audio.play().catch(function () {}); resumeAfterHide = false; }
});

// Theme toggle: dark by default, choice remembered
function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('invite-theme', t); } catch (e) {}
    var icon = document.getElementById('themeIcon');
    if (icon) icon.textContent = (t === 'dark') ? '☀️' : '🌙';   // shows the mode you can switch to
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#14060f' : '#fff5f2');
}
applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
var themeBtn = document.getElementById('themeToggle');
if (themeBtn) themeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
