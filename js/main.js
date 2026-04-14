/* ============================================================
   B'ris Royale — Main JavaScript
   ============================================================ */

/* --- Custom Cursor --- */
const cur  = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animCursor() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a,button,.feat-item,.ci,.ac-item,.sz,.f-btn').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('h');    curR.classList.add('h');    });
  el.addEventListener('mouseleave', () => { cur.classList.remove('h'); curR.classList.remove('h'); });
});

/* --- Hero Smoke Canvas --- */
const canvas = document.getElementById('smokeC');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class SmokeParticle {
  constructor() { this.reset(); }

  reset() {
    this.x  = Math.random() * canvas.width;
    this.y  = canvas.height + 40;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = -(Math.random() * 1.2 + 0.4);
    this.s  = Math.random() * 160 + 70;
    this.a  = 0;
    this.ta = Math.random() * 0.07 + 0.02;
    this.l  = 0;
    this.ml = Math.random() * 450 + 250;
    this.h  = Math.random() * 18 + 28;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.l++;
    this.s += 0.25;
    const p = this.l / this.ml;
    if      (p < 0.2) this.a = this.ta * (p / 0.2);
    else if (p > 0.7) this.a = this.ta * ((1 - p) / 0.3);
    else               this.a = this.ta;
    if (this.l >= this.ml) this.reset();
  }

  draw() {
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.s);
    g.addColorStop(0, `hsla(${this.h},45%,55%,${this.a})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }
}

const particles = Array.from({ length: 20 }, () => {
  const p = new SmokeParticle();
  p.l = Math.random() * p.ml; // stagger start positions
  return p;
});

(function drawSmoke() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(drawSmoke);
})();

/* --- Page Routing with Veil Transition --- */
const veil = document.getElementById('veil');

function go(id, e) {
  if (e) e.preventDefault();
  const current = document.querySelector('.page.active');
  if (current && current.id === id) return;

  veil.className = 'in';
  setTimeout(() => {
    if (current) current.classList.remove('active');
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
    veil.className = 'out';
    setTimeout(() => { veil.className = ''; }, 500);
    initReveal();
    buildBars();
  }, 380);
}

/* --- Intersection Observer for Reveal Animations --- */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('vis');
    observer.observe(el);
  });
}
setTimeout(initReveal, 80);

/* --- Marquee Text Builder --- */
const mq    = document.getElementById('mq');
const words = ['Memory','Intimacy','Presence','Desire','Trace','Warmth','Identity','Sensation'];
let mhtml   = '';
for (let i = 0; i < 2; i++) {
  words.forEach(w => {
    mhtml += `<span class="marquee-item">${w}</span><span class="marquee-sep">&#9670;</span>`;
  });
}
mq.innerHTML = mhtml;

/* --- Fragrance Notes Bar Chart --- */
const noteData = [
  { n: 'Saffron',    h: 0.50 },
  { n: 'Pepper',     h: 0.72 },
  { n: 'Rose',       h: 0.88 },
  { n: 'Oud',        h: 1.00 },
  { n: 'Amber',      h: 0.92 },
  { n: 'Sandalwood', h: 0.78 },
  { n: 'Benzoin',    h: 0.60 },
  { n: 'Musk',       h: 0.67 },
];

function buildBars() {
  const cont = document.getElementById('bars');
  if (!cont) return;
  cont.innerHTML = '';
  noteData.forEach(d => {
    const w = document.createElement('div');
    w.className  = 'bar-wrap';
    w.innerHTML  = `<div class="bar" style="height:${Math.round(d.h * 230)}px"></div>`;
    w.innerHTML += `<div class="bar-lbl">${d.n}</div>`;
    cont.appendChild(w);
  });
}
buildBars();

/* --- Accordion Toggle --- */
function tog(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.ac-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.ac-arrow').textContent = '+';
  });
  if (!isOpen) {
    el.classList.add('open');
    el.querySelector('.ac-arrow').textContent = '−';
  }
}

/* --- Size Selector --- */
document.querySelectorAll('.sz').forEach(s => {
  s.addEventListener('click', function () {
    this.closest('.sizes').querySelectorAll('.sz').forEach(x => x.classList.remove('on'));
    this.classList.add('on');
  });
});

/* --- Collection Filter Tabs --- */
document.querySelectorAll('.f-btn').forEach(b => {
  b.addEventListener('click', function () {
    this.closest('.filters').querySelectorAll('.f-btn').forEach(x => x.classList.remove('on'));
    this.classList.add('on');
  });
});

/* --- Cart Quantity Adjuster --- */
function adjQ(btn, delta) {
  const n = btn.parentElement.querySelector('.q-n');
  let v   = parseInt(n.textContent) + delta;
  if (v < 1) v = 1;
  n.textContent = v;
}

/* --- Magnetic Button Effect --- */
document.querySelectorAll('.hero-cta,.atc,.checkout').forEach(b => {
  b.addEventListener('mousemove', function (e) {
    const r = this.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.12;
    const y = (e.clientY - r.top  - r.height / 2) * 0.12;
    this.style.transform = `translate(${x}px,${y}px) scale(1.02)`;
  });
  b.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});

/* --- Parallax Hero Canvas on Scroll --- */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const c = document.getElementById('smokeC');
  if (c) c.style.transform = `translateY(${y * 0.28}px)`;
});
