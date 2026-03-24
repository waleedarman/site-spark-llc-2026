/**
 * SiteSpark — Common behavior for all pages
 */
(function () {
  'use strict';

  function initTooltips() {
    if (typeof bootstrap === 'undefined') return;
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
      new bootstrap.Tooltip(el);
    });
  }

  function initAOS() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 1000,
      once: true,
      offset: 32,
    });
  }

  /** Close mobile menu after selecting a link */
  function initNavCollapseOnNavigate() {
    var navCollapse = document.getElementById('mainNav');
    if (!navCollapse || typeof bootstrap === 'undefined') return;

    function hideMenu() {
      if (!window.matchMedia('(max-width: 991.98px)').matches) return;
      var inst = bootstrap.Collapse.getInstance(navCollapse);
      if (inst) inst.hide();
    }

    navCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(function (a) {
      a.addEventListener('click', hideMenu);
    });
    navCollapse.querySelectorAll('.dropdown-item').forEach(function (a) {
      a.addEventListener('click', hideMenu);
    });
  }

  /** Stronger shadow for the bar when scrolling */
  function initNavbarScrollState() {
    var nav = document.querySelector('.site-nav-pro');
    if (!nav) return;
    function tick() {
      nav.classList.toggle('site-nav-scrolled', window.scrollY > 16);
    }
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /** Contact Us model (Demo display without server) */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var box = document.getElementById('contactFormFeedback');
    var btn = form.querySelector('button[type="submit"]');
    var originalBtnText = btn ? btn.innerHTML : 'Send Message';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        
        // Pulse the button to show failure
        if (btn) {
          btn.classList.add('btn-danger');
          setTimeout(() => btn.classList.remove('btn-danger'), 500);
        }
        return;
      }

      form.classList.remove('was-validated');
      
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      }

      // Simulate network request
      setTimeout(function() {
        if (box) {
          box.hidden = false;
          box.className = 'alert alert-success mt-3 mb-0 shadow-sm border-0 bg-success text-white py-3';
          box.innerHTML = '<strong>Success!</strong> Your message has been sent to the SiteSpark team. We will reach out to you within 24 hours.';
          box.setAttribute('role', 'status');
        }
        
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalBtnText;
        }
        
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => { if (box) box.hidden = true; }, 5000);
      }, 1500);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTooltips();
    initAOS();
    initNavCollapseOnNavigate();
    initNavbarScrollState();
    initContactForm();
  });
})();
