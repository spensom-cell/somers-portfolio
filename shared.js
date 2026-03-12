// Shared nav, footer, cursor, and scroll animation for all pages

const NAV_LINKS = [
  { href: 'index.html', label: 'Work' },
  { href: 'about.html', label: 'About' },
  { href: 'index.html#contact', label: 'Contact' },
];

function buildNav(activePage) {
  return `
  <nav>
    <a href="index.html" class="nav-name">Spencer Somers</a>
    <ul class="nav-links">
      ${NAV_LINKS.map(l => `<li><a href="${l.href}" ${activePage === l.label ? 'class="active"' : ''}>${l.label}</a></li>`).join('')}
    </ul>
    <button class="nav-burger" aria-label="Menu" onclick="toggleMobileMenu()">
      <span></span><span></span>
    </button>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    ${NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
  </div>`;
}

function buildFooter() {
  return `
  <footer>
    <span>© 2025 Spencer Somers</span>
    <span>Born & raised in Los Angeles</span>
  </footer>`;
}

function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, .project-card, .card-hover').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '14px'; cursor.style.height = '14px';
      ring.style.width = '48px'; ring.style.height = '48px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '8px'; cursor.style.height = '8px';
      ring.style.width = '32px'; ring.style.height = '32px';
    });
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 80;
    observer.observe(el);
  });
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
