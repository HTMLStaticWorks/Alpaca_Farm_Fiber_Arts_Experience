/* ========================================
   ALPACA FARM — MAIN JAVASCRIPT
   ======================================== */
'use strict';

/* --- Theme Manager --- */
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('alpaca-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.apply(saved || (prefersDark ? 'dark' : 'light'));
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => this.toggle()));
  },
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('alpaca-theme', theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
    });
  },
  toggle() { this.apply(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }
};

/* --- RTL Manager --- */
const RTLManager = {
  init() {
    // Using a new key to reset user state, as the old state got stuck in RTL
    const saved = localStorage.getItem('alpaca-dir-v2');
    // Default to 'ltr'
    this.apply(saved || 'ltr');
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },
  apply(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('alpaca-dir-v2', dir);
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
      // Keep the word 'RTL' as requested, maybe add a class for state
      btn.classList.toggle('active', dir === 'rtl');
      // If there was an icon, we can update it or just keep text
      const icon = btn.querySelector('i');
      if (icon) icon.className = dir === 'rtl' ? 'ri-layout-right-2-line' : 'ri-layout-left-2-line';
    });
  },
  toggle() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    this.apply(current === 'rtl' ? 'ltr' : 'rtl');
  }
};

/* --- Header --- */
const HeaderManager = {
  init() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (header) window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
      });
      mobileNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
    const path = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === path || link.getAttribute('href') === './' + path) link.classList.add('active');
    });
  }
};

/* --- Scroll Animations --- */
const ScrollAnimations = {
  init() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));
  }
};

/* --- Counter Animation --- */
const CounterAnimation = {
  init() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { this.run(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
  },
  run(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const start = performance.now();
    const duration = 2000;
    const update = (time) => {
      const p = Math.min((time - start) / duration, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix;
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
};

/* --- Tour / Workshop Calculator --- */
const TourCalculator = {
  init() {
    const calc = document.getElementById('tour-calculator');
    if (!calc) return;
    calc.querySelectorAll('select, input').forEach(el => el.addEventListener('change', () => this.calculate()));
    this.calculate();
  },
  calculate() {
    const tourType = document.getElementById('calc-tour');
    const guests = document.getElementById('calc-guests');
    const addon = document.getElementById('calc-addon');
    const resultEl = document.getElementById('calc-total');
    if (!resultEl) return;
    const prices = { standard: 25, premium: 45, private: 120, workshop: 85, kids: 15 };
    const addons = { none: 0, lunch: 18, yarn_kit: 35, photo: 25 };
    const base = prices[tourType?.value] || 25;
    const guestCount = parseInt(guests?.value) || 2;
    const addonPrice = addons[addon?.value] || 0;
    const total = (base + addonPrice) * guestCount;
    resultEl.textContent = '$' + total.toLocaleString();
  }
};

/* --- Form Validator --- */
const FormValidator = {
  rules: {
    required: v => v.trim() !== '' || 'This field is required',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email',
    password: v => v.length >= 8 || 'Password must be at least 8 characters',
  },
  init() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', e => { if (!this.validateForm(form)) e.preventDefault(); });
      form.querySelectorAll('input, textarea, select').forEach(f => {
        f.addEventListener('blur', () => this.validateField(f));
        f.addEventListener('input', () => this.clearError(f));
      });
    });
  },
  validateForm(form) {
    let valid = true;
    form.querySelectorAll('[data-rules]').forEach(f => { if (!this.validateField(f)) valid = false; });
    return valid;
  },
  validateField(field) {
    for (const rule of (field.getAttribute('data-rules') || '').split(',')) {
      const fn = this.rules[rule.trim()];
      if (!fn) continue;
      const result = fn(field.type === 'checkbox' ? (field.checked ? 'checked' : '') : field.value);
      if (result !== true) { this.showError(field, result); return false; }
    }
    this.clearError(field);
    return true;
  },
  showError(field, msg) {
    field.classList.add('error');
    const el = field.parentElement.querySelector('.form-error');
    if (el) { el.textContent = msg; el.classList.add('visible'); }
  },
  clearError(field) {
    field.classList.remove('error');
    const el = field.parentElement.querySelector('.form-error');
    if (el) el.classList.remove('visible');
  }
};

/* --- File Upload --- */
const FileUpload = {
  init() {
    document.querySelectorAll('.file-upload').forEach(zone => {
      const input = zone.querySelector('input[type="file"]');
      const label = zone.querySelector('.file-label');
      zone.addEventListener('click', () => input?.click());
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--color-primary)'; });
      zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
      zone.addEventListener('drop', e => {
        e.preventDefault(); zone.style.borderColor = '';
        if (e.dataTransfer.files.length && input) { input.files = e.dataTransfer.files; if (label) label.textContent = e.dataTransfer.files[0].name; }
      });
      input?.addEventListener('change', () => { if (label && input.files.length) label.textContent = input.files.length === 1 ? input.files[0].name : input.files.length + ' files selected'; });
    });
  }
};

/* --- Countdown Timer --- */
const CountdownTimer = {
  init() {
    const el = document.getElementById('countdown');
    if (!el) return;
    const target = new Date(el.getAttribute('data-target') || '2025-06-01T00:00:00');
    const update = () => {
      const diff = target - new Date();
      if (diff <= 0) { el.innerHTML = '<p style="color:var(--color-gold);font-size:1.2rem">We\'re Open!</p>'; return; }
      ['days','hours','mins','secs'].forEach((u, i) => {
        const n = el.querySelector(`[data-unit="${u}"]`);
        if (n) n.textContent = String(Math.floor([diff/86400000, (diff%86400000)/3600000, (diff%3600000)/60000, (diff%60000)/1000][i])).padStart(2,'0');
      });
    };
    update(); setInterval(update, 1000);
  }
};

/* --- Toast Notification --- */
const Toast = {
  show(msg, type = 'success', duration = 4000) {
    const t = document.createElement('div');
    t.innerHTML = `<i class="ri-${type==='success'?'checkbox-circle':'error-warning'}-line"></i><span>${msg}</span>`;
    Object.assign(t.style, {
      position:'fixed', bottom:'24px', right:'24px', zIndex:'9999',
      background: type==='success' ? 'var(--color-primary)' : '#c0392b',
      color:'white', padding:'14px 20px', borderRadius:'12px',
      display:'flex', alignItems:'center', gap:'10px',
      fontFamily:'var(--font-body)', fontSize:'0.9rem', boxShadow:'0 4px 20px rgba(0,0,0,0.2)',
      maxWidth:'400px', animation:'fadeInUp 0.3s ease'
    });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), duration);
  }
};

/* --- Form Handlers --- */
const FormHandlers = {
  init() {
    document.getElementById('contact-form')?.addEventListener('submit', e => {
      e.preventDefault(); Toast.show('Message sent! We\'ll be in touch within 24 hours.'); e.target.reset();
    });
    document.querySelectorAll('.newsletter-form').forEach(f => {
      f.addEventListener('submit', e => { e.preventDefault(); Toast.show('Welcome to the flock! 🦙 You\'re subscribed.'); f.reset(); });
    });
    document.getElementById('login-form')?.addEventListener('submit', e => {
      e.preventDefault(); Toast.show('Login requires backend integration.', 'info');
    });
    document.getElementById('register-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const p = document.getElementById('reg-password'), c = document.getElementById('reg-confirm');
      if (p && c && p.value !== c.value) { Toast.show('Passwords do not match.', 'error'); return; }
      if (!document.getElementById('terms')?.checked) { Toast.show('Please accept the terms to continue.', 'error'); return; }
      Toast.show('Account creation requires backend integration.', 'info');
    });
    document.getElementById('booking-form')?.addEventListener('submit', e => {
      e.preventDefault(); Toast.show('Tour booked! Check your email for confirmation. 🦙'); e.target.reset();
    });
  }
};

/* --- Product Wishlist Toggle --- */
const WishlistToggle = {
  init() {
    document.querySelectorAll('.product-wishlist').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        if (icon.classList.contains('ri-heart-line')) {
          icon.className = 'ri-heart-fill'; icon.style.color = '#e74c3c';
          Toast.show('Added to wishlist ♥');
        } else {
          icon.className = 'ri-heart-line'; icon.style.color = '';
          Toast.show('Removed from wishlist');
        }
      });
    });
  }
};

/* --- Back to Top --- */
const BackToTop = {
  init() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    Object.assign(btn.style, {
      position:'fixed', bottom:'80px', right:'24px', zIndex:'999',
      width:'44px', height:'44px', borderRadius:'50%',
      background:'var(--color-primary)', color:'white', border:'none',
      cursor:'pointer', fontSize:'1.1rem', boxShadow:'0 4px 16px rgba(58,90,64,0.35)',
      opacity:'0', pointerEvents:'none', transition:'all 0.3s ease',
      display:'flex', alignItems:'center', justifyContent:'center'
    });
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
      btn.style.opacity = window.scrollY > 400 ? '1' : '0';
      btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
};

/* --- Smooth Scroll --- */
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
      });
    });
  }
};

/* --- Password Strength --- */
const PasswordStrength = {
  init() {
    const input = document.getElementById('reg-password');
    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');
    if (!input) return;
    input.addEventListener('input', () => {
      const v = input.value;
      let score = [v.length>=8, /[A-Z]/.test(v), /[0-9]/.test(v), /[^A-Za-z0-9]/.test(v)].filter(Boolean).length;
      const levels = [
        {w:'0%',c:'transparent',t:'At least 8 characters'},
        {w:'25%',c:'#e74c3c',t:'Weak'},
        {w:'50%',c:'#f39c12',t:'Fair'},
        {w:'75%',c:'#3498db',t:'Good'},
        {w:'100%',c:'#2ecc71',t:'Strong'}
      ];
      const l = levels[Math.min(score,4)];
      if (bar) { bar.style.width=l.w; bar.style.background=l.c; }
      if (text) { text.textContent=l.t; text.style.color=l.c||'var(--text-light)'; }
    });
  }
};

/* --- Init All --- */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  RTLManager.init();
  HeaderManager.init();
  ScrollAnimations.init();
  CounterAnimation.init();
  TourCalculator.init();
  FormValidator.init();
  FileUpload.init();
  CountdownTimer.init();
  FormHandlers.init();
  WishlistToggle.init();
  BackToTop.init();
  SmoothScroll.init();
  PasswordStrength.init();
});
