// 今年をフッターに表示
document.getElementById('year').textContent = new Date().getFullYear();

// モバイルナビ
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// スムーススクロール（同一ページ内のみ）
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    }
  });
});

// 現在セクションのナビ強調（IntersectionObserver）
const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.site-nav a[href^="#"]');
const map = new Map([...links].map(l => [l.getAttribute('href'), l]));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const href = '#' + entry.target.id;
    const link = map.get(href);
    if (!link) return;
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });

sections.forEach(s => io.observe(s));
