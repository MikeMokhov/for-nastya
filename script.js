// ============================================
// Замените эти данные перед отправкой ссылки!
// ============================================
const SURPRISE = {
  place: '[укажете позже]',
  datetime: '[укажете позже]',
  note: 'Розовое платье — необязательно, но будет мило 💕',
};

const HEART_EMOJIS = ['💗', '💕', '💖', '💝', '🩷', '❤️'];
const CONFETTI_COLORS = ['#ff69b4', '#ffb6c1', '#d63384', '#ffc0cb', '#fff0f5', '#ff1493'];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Floating hearts ---
function createHearts() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('hearts-container');
  const count = 18;

  for (let i = 0; i < count; i++) {
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

// --- Sparkles ---
function createSparkles() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('sparkles-container');
  const count = 40;

  for (let i = 0; i < count; i++) {
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
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

// --- Runaway "No" button ---
function initRunawayButton() {
  const btnNo = document.getElementById('btn-no');
  const wrap = document.getElementById('buttons-wrap');

  function moveButton() {
    const wrapRect = wrap.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxX = wrapRect.width - btnRect.width;
    const maxY = wrapRect.height - btnRect.height + 40;

    const newX = Math.random() * Math.max(maxX, 0);
    const newY = Math.random() * Math.max(maxY, 0);

    btnNo.style.position = 'absolute';
    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;
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

  const particles = [];
  const count = 120;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -18 - 5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.25 + Math.random() * 0.15,
      opacity: 1,
    });
  }

  let frame = 0;
  const maxFrames = 180;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - frame / maxFrames);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// --- Burst hearts on Yes ---
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
    heart.style.animationDelay = '0s';
    heart.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }
}

// --- Render surprise ---
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
      </div>
    `
    )
    .join('');
}

// --- Yes button handler ---
function initYesButton() {
  const btnYes = document.getElementById('btn-yes');
  const surpriseSection = document.getElementById('surprise-section');
  const questionSection = document.getElementById('question-section');
  const buttonsWrap = document.getElementById('buttons-wrap');

  btnYes.addEventListener('click', () => {
    renderSurprise();
    launchConfetti();
    burstHearts();

    buttonsWrap.style.display = 'none';
    questionSection.querySelector('.question-title').textContent = 'Ты сделала мой день! 🥰';

    surpriseSection.classList.remove('hidden');
    surpriseSection.classList.add('visible', 'fade-in');

    setTimeout(() => {
      surpriseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  createHearts();
  createSparkles();
  initScrollAnimations();
  initRunawayButton();
  initYesButton();

  document.querySelector('.hero').classList.add('visible');
});

window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
