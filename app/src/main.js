// Interactivity for AdaptedMind rebuild

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Burger Menu Toggle
  const burgerBtn = document.getElementById('react-aria-burger') || document.querySelector('.burger-btn');
  const mobileMenu = document.getElementById('mobile-dropdown-menu');

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      burgerBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.style.display = isExpanded ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
        burgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.style.display = 'none';
      }
    });
  }

  // Cookie Settings Modal Toggle
  const cookieBtn = document.querySelector('.LandingFooter_footerListButton__tGIJ_') || document.querySelector('[data-action="cookie-settings"]');
  const cookieModal = document.getElementById('onetrust-consent-sdk');
  const closeModalBtn = document.getElementById('close-pc-btn-handler');
  const allowAllBtn = document.getElementById('accept-recommended-btn-handler');
  const rejectAllBtn = document.querySelector('.ot-pc-refuse-all-handler') || document.querySelector('.ot-btn-reject');
  const confirmBtn = document.querySelector('.save-preference-btn-handler') || document.querySelector('.ot-btn-confirm');

  function openCookieModal() {
    if (cookieModal) cookieModal.style.display = 'flex';
  }

  function closeCookieModal() {
    if (cookieModal) cookieModal.style.display = 'none';
  }

  if (cookieBtn) cookieBtn.addEventListener('click', openCookieModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeCookieModal);
  if (allowAllBtn) allowAllBtn.addEventListener('click', closeCookieModal);
  if (rejectAllBtn) rejectAllBtn.addEventListener('click', closeCookieModal);
  if (confirmBtn) confirmBtn.addEventListener('click', closeCookieModal);

  if (cookieModal) {
    cookieModal.addEventListener('click', (e) => {
      if (e.target === cookieModal) closeCookieModal();
    });
  }

  // Enrollment Video Player Animation
  const video = document.getElementById('video-player-local-base');
  if (video) {
    const playAnim = () => {
      video.play().catch(() => {});
    };
    ['pointermove', 'mousemove', 'mousedown', 'touchstart', 'click', 'keydown', 'scroll'].forEach(evt => {
      window.addEventListener(evt, playAnim, { once: true, passive: true });
    });
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  // Next Button handler on Begin Enrollment
  const nextBtn = document.querySelector('.enrollment-next-btn') || document.querySelector('.NextButton_button__ipbt3');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      window.location.href = '/login';
    });
  }

  // Login form handler
  const loginForm = document.querySelector('form');
  if (loginForm && window.location.pathname.includes('login')) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('loginUsername');
      if (usernameInput && !usernameInput.value.trim()) {
        usernameInput.focus();
        return;
      }
      window.location.href = '/Begin-Enrollment.html';
    });
  }
});
