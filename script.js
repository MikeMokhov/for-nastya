// ============================================
// Замените эти данные перед отправкой ссылки!
// ============================================
const SURPRISE = {
  place: '[укажете позже]',
  datetime: '[укажете позже]',
  note: 'Розовое платье — необязательно, но будет мило 💕',
};

const LETTER_LINES = [
  'Каждый день с тобой — как маленькое чудо.',
  'Твоя улыбка делает мир мягче и светлее.',
  'Я давно хотел сказать тебе кое-что важное…',
  'С тобой хочется замедляться и просто быть рядом.',
];

const HERO_PHOTO = 'images/photo_2026-06-12_18-59-02.jpg';

const PHOTOS = [
  'images/photo_2025-03-08_20-58-44.jpg',
  'images/photo_2025-05-01_14-46-47.jpg',
  'images/photo_2025-05-04_13-06-22.jpg',
  'images/photo_2025-05-24_13-48-32.jpg',
  'images/photo_2025-05-30_22-07-47.jpg',
  'images/photo_2025-06-22_00-30-13.jpg',
  'images/photo_2025-06-29_09-48-17.jpg',
  'images/photo_2025-07-13_18-45-08.jpg',
  'images/photo_2025-07-19_18-02-53.jpg',
  'images/photo_2025-07-30_16-09-50.jpg',
  'images/photo_2025-08-11_18-20-33.jpg',
  'images/photo_2025-10-15_23-47-28.jpg',
  'images/photo_2025-11-02_14-55-03.jpg',
  'images/photo_2025-12-13_21-48-03.jpg',
  'images/photo_2025-12-31_22-24-13.jpg',
  'images/photo_2026-03-29_19-01-40.jpg',
  'images/photo_2026-05-28_12-03-50.jpg',
  'images/photo_2026-06-06_16-20-06.jpg',
  'images/photo_2026-06-12_18-59-02.jpg',
  'images/photo_2026-06-18_11-50-12.jpg',
  'images/photo_2026-06-28_13-43-50.jpg',
  'images/photo_2026-06-28_13-44-18.jpg',
];

const MONTHS_RU = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const HEART_EMOJIS = ['💗', '💕', '💖', '💝', '🩷', '❤️'];
const CONFETTI_COLORS = ['#ff69b4', '#ffb6c1', '#d63384', '#ffc0cb', '#fff0f5', '#ff1493'];
const NO_BUTTON_TEXTS = ['Нет', 'Точно нет?', 'Подумай ещё…'];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lightboxIndex = 0;
let letterStarted = false;
let scratchRevealed = false;

// --- Utils ---
function parsePhotoDate(src) {
  const match = src.match(/photo_(\d{4})-(\d{2})-\d{2}/);
  if (!match) return '';
  const year = match[1];
  const month = MONTHS_RU[parseInt(match[2], 10) - 1];
  return `${month} ${year}`;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Envelope gate ---
function createGateHearts() {
  if (prefersReducedMotion) return;
  const container = document.getElementById('gate-hearts-container');
  if (!container) return;

  for (let i = 0; i < 14; i++) {
    const heart = document.createElement('span');
    heart.className = 'gate-side-heart';
    heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    const fromLeft = Math.random() > 0.5;
    heart.style.left = fromLeft
      ? `${2 + Math.random() * 28}%`
      : `${70 + Math.random() * 26}%`;
    heart.style.bottom = `${Math.random() * 30}%`;
    heart.style.animationDuration = `${6 + Math.random() * 8}s`;
    heart.style.animationDelay = `${Math.random() * 6}s`;
    heart.style.fontSize = `${0.75 + Math.random() * 0.9}rem`;
    container.appendChild(heart);
  }
}

function burstEnvelopeSparkles() {
  if (prefersReducedMotion) return;
  const container = document.getElementById('envelope-sparkles');
  if (!container) return;

  const symbols = ['✨', '💕', '💖', '⭐', '🩷'];
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement('span');
    spark.className = 'envelope-sparkle';
    spark.textContent = symbols[i % symbols.length];
    const angle = (i / 12) * Math.PI * 2;
    const dist = 50 + Math.random() * 60;
    spark.style.setProperty('--sx', `${Math.cos(angle) * dist}px`);
    spark.style.setProperty('--sy', `${Math.sin(angle) * dist - 30}px`);
    spark.style.animationDelay = `${Math.random() * 0.15}s`;
    container.appendChild(spark);
    setTimeout(() => spark.remove(), 1000);
  }
}

function initEnvelopeGate() {
  const gate = document.getElementById('envelope-gate');
  const main = document.getElementById('main-content');
  const btn = document.getElementById('open-envelope');
  const envelope = document.getElementById('envelope');

  createGateHearts();

  if (sessionStorage.getItem('letterOpened') === 'true') {
    gate.classList.add('hidden');
    main.classList.remove('main-hidden');
    return;
  }

  btn.addEventListener('click', () => {
    btn.disabled = true;
    envelope.classList.add('opening');

    setTimeout(() => {
      envelope.classList.add('open');
      burstEnvelopeSparkles();
    }, 200);

    setTimeout(() => {
      gate.classList.add('fade-out');
      main.classList.remove('main-hidden');
      sessionStorage.setItem('letterOpened', 'true');

      setTimeout(() => {
        gate.classList.add('hidden');
        document.getElementById('hero').classList.add('visible');
      }, 800);
    }, 2000);
  });
}

// --- Hero background ---
function initHeroPhoto() {
  const img = document.getElementById('hero-photo');
  if (img) img.src = HERO_PHOTO;
}

// --- Floating hearts ---
function createHearts() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('hearts-container');
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 12}s`;
    heart.style.animationDelay = `${Math.random() * 10}s`;
    heart.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
    container.appendChild(heart);
  }
}

function createSparkles() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('sparkles-container');
  for (let i = 0; i < 40; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDuration = `${2 + Math.random() * 3}s`;
    sparkle.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(sparkle);
  }
}

// --- Scroll fade-in ---
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.id === 'letter-section' && !letterStarted) {
            letterStarted = true;
            startTypewriter();
          }
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

// --- Typewriter letter ---
async function startTypewriter() {
  const container = document.getElementById('letter-text');
  const highlight = document.getElementById('letter-highlight');
  const speed = prefersReducedMotion ? 0 : 45;

  container.innerHTML = '';

  for (let i = 0; i < LETTER_LINES.length; i++) {
    const line = document.createElement('p');
    line.className = 'letter-line';
    container.appendChild(line);

    if (speed === 0) {
      line.textContent = LETTER_LINES[i];
    } else {
      for (const char of LETTER_LINES[i]) {
        line.textContent += char;
        await delay(speed);
      }
    }

    if (i < LETTER_LINES.length - 1) await delay(300);
  }

  if (!prefersReducedMotion) {
    const cursor = document.createElement('span');
    cursor.className = 'letter-cursor';
    container.querySelector('.letter-line:last-child').appendChild(cursor);
    await delay(800);
    cursor.remove();
  }

  highlight.classList.remove('hidden');
  highlight.classList.add('highlight-reveal');
}

// --- Photo gallery grid ---
function initPhotoGallery() {
  const grid = document.getElementById('photo-grid');

  PHOTOS.forEach((src, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'photo-card';
    card.dataset.index = String(i);

    const img = document.createElement('img');
    img.src = src;
    img.alt = parsePhotoDate(src);
    img.loading = 'lazy';

    const caption = document.createElement('span');
    caption.className = 'photo-date';
    caption.textContent = parsePhotoDate(src);

    card.appendChild(img);
    card.appendChild(caption);
    card.addEventListener('click', () => openLightbox(i));
    grid.appendChild(card);
  });
}

// --- Lightbox ---
function openLightbox(index) {
  lightboxIndex = index;
  updateLightbox();
  document.getElementById('lightbox').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const src = PHOTOS[lightboxIndex];
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = parsePhotoDate(src);
}

function initLightbox() {
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + PHOTOS.length) % PHOTOS.length;
    updateLightbox();
  });
  document.getElementById('lightbox-next').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % PHOTOS.length;
    updateLightbox();
  });
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
    if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
  });
}

// --- Runaway "No" button ---
function initRunawayButton() {
  const btnNo = document.getElementById('btn-no');
  const wrap = document.getElementById('buttons-wrap');
  let attempts = 0;

  function moveButton() {
    if (attempts >= NO_BUTTON_TEXTS.length - 1) {
      btnNo.style.opacity = '0';
      btnNo.style.pointerEvents = 'none';
      btnNo.style.transform = 'scale(0)';
      return;
    }

    attempts++;
    btnNo.textContent = NO_BUTTON_TEXTS[attempts];

    const wrapRect = wrap.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const maxX = wrapRect.width - btnRect.width;
    const maxY = wrapRect.height - btnRect.height + 40;

    btnNo.style.position = 'absolute';
    btnNo.style.left = `${Math.random() * Math.max(maxX, 0)}px`;
    btnNo.style.top = `${Math.random() * Math.max(maxY, 0)}px`;

    if (attempts >= 2) {
      btnNo.style.transform = `scale(${1 - attempts * 0.15})`;
    }
  }

  btnNo.addEventListener('mouseenter', moveButton);
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
  }, { passive: false });
}

// --- Confetti ---
function launchConfetti() {
  if (prefersReducedMotion) return;

  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 120 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 200,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -18 - 5,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 4 + Math.random() * 6,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 12,
    gravity: 0.25 + Math.random() * 0.15,
  }));

  let frame = 0;
  const maxFrames = 180;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  animate();
}

function burstHearts() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('hearts-container');
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    heart.style.left = `${40 + Math.random() * 20}%`;
    heart.style.top = `${50 + Math.random() * 10}%`;
    heart.style.animationDuration = `${2 + Math.random() * 2}s`;
    heart.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}

// --- Surprise ---
function renderSurprise() {
  const details = document.getElementById('surprise-details');
  const items = [
    { label: 'Место', value: SURPRISE.place },
    { label: 'Когда', value: SURPRISE.datetime },
    { label: 'Заметка', value: SURPRISE.note },
  ];

  details.innerHTML = items
    .map(
      (item) => `
      <div class="surprise-detail">
        <span class="surprise-label">${item.label}:</span>
        <span class="surprise-value">${item.value}</span>
      </div>`
    )
    .join('');
}

function initScratchCard() {
  const canvas = document.getElementById('scratch-canvas');
  const wrap = document.getElementById('scratch-wrap');
  const ctx = canvas.getContext('2d');
  let drawing = false;

  function resizeCanvas() {
    const rect = wrap.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    fillOverlay();
  }

  function fillOverlay() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ffb6c1');
    gradient.addColorStop(0.5, '#ff69b4');
    gradient.addColorStop(1, '#d63384');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '500 14px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ сотри здесь ✨', canvas.width / 2, canvas.height / 2);
  }

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    checkReveal();
  }

  function checkReveal() {
    if (scratchRevealed) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }
    const ratio = cleared / (canvas.width * canvas.height);

    if (ratio > 0.45) revealScratch();
  }

  function revealScratch() {
    if (scratchRevealed) return;
    scratchRevealed = true;
    canvas.style.opacity = '0';
    canvas.style.pointerEvents = 'none';
    document.getElementById('scratch-hint').classList.add('hidden');
    document.getElementById('surprise-footer').classList.remove('hidden');
    launchConfetti();
    burstHearts();
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  canvas.addEventListener('mousedown', (e) => { drawing = true; scratch(getPos(e).x, getPos(e).y); });
  canvas.addEventListener('mousemove', (e) => { if (drawing) { const p = getPos(e); scratch(p.x, p.y); } });
  canvas.addEventListener('mouseup', () => { drawing = false; });
  canvas.addEventListener('mouseleave', () => { drawing = false; });
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); drawing = true; const p = getPos(e); scratch(p.x, p.y); }, { passive: false });
  canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (drawing) { const p = getPos(e); scratch(p.x, p.y); } }, { passive: false });
  canvas.addEventListener('touchend', () => { drawing = false; });

  if (prefersReducedMotion) {
    window.scratchAutoReveal = revealScratch;
  } else {
    window.addEventListener('resize', () => {
      if (!document.getElementById('surprise-section').classList.contains('hidden')) {
        resizeCanvas();
      }
    });
  }
}

function initYesButton() {
  const btnYes = document.getElementById('btn-yes');
  const surpriseSection = document.getElementById('surprise-section');
  const questionSection = document.getElementById('question-section');
  const buttonsWrap = document.getElementById('buttons-wrap');

  btnYes.addEventListener('click', () => {
    renderSurprise();
    scratchRevealed = false;

    buttonsWrap.style.display = 'none';
    questionSection.querySelector('.question-title').textContent = 'Ты сделала мой день! 🥰';

    surpriseSection.classList.remove('hidden');
    surpriseSection.classList.add('visible', 'fade-in');

    document.getElementById('scratch-hint').classList.remove('hidden');
    document.getElementById('surprise-footer').classList.add('hidden');

    const canvas = document.getElementById('scratch-canvas');
    canvas.style.opacity = '1';
    canvas.style.pointerEvents = 'auto';

    setTimeout(() => {
      const wrap = document.getElementById('scratch-wrap');
      const rect = wrap.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#ffb6c1');
      gradient.addColorStop(0.5, '#ff69b4');
      gradient.addColorStop(1, '#d63384');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.font = '500 14px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ сотри здесь ✨', canvas.width / 2, canvas.height / 2);

      if (prefersReducedMotion && window.scratchAutoReveal) {
        window.scratchAutoReveal();
      }
    }, 100);

    setTimeout(() => {
      surpriseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  if (window.mountGingerCat) window.mountGingerCat();
  initEnvelopeGate();
  initHeroPhoto();
  createHearts();
  createSparkles();
  initPhotoGallery();
  initLightbox();
  initScrollAnimations();
  initRunawayButton();
  initScratchCard();
  initYesButton();

  if (sessionStorage.getItem('letterOpened') === 'true') {
    document.getElementById('hero').classList.add('visible');
    letterStarted = true;
    const container = document.getElementById('letter-text');
    container.innerHTML = LETTER_LINES.map((l) => `<p class="letter-line">${l}</p>`).join('');
    document.getElementById('letter-highlight').classList.remove('hidden');
  }
});

window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
