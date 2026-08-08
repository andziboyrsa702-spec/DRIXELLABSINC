/**
 * DRIXEL LABS INC. — MAIN INTERACTION CONTROLLER
 */

import { Master3DScene } from './three-scene.js';
import { AudioAmbientEngine } from './audio-synth.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Scene
  const scene3D = new Master3DScene('webgl-container');

  // 2. Initialize Ambient Audio Engine
  const audioSynth = new AudioAmbientEngine('audio-toggle-btn');

  // 3. Custom Cursor Tracker
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(updateCursor);
    };
    updateCursor();

    const hoverables = document.querySelectorAll('a, button, .company-card, .project-row, .journal-card, .stat-card');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  // 4. Header Scroll State & Navigation Active Tracking
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 5. Modals Interactivity
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const openModal = (title, htmlContent) => {
    if (!modalOverlay) return;
    modalTitle.textContent = title;
    modalContent.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Company Details Drawer Trigger
  const companyCards = document.querySelectorAll('.company-card');
  companyCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name || 'Company Detail';
      const desc = card.dataset.desc || '';
      const status = card.dataset.status || '';
      const scope = card.dataset.scope || '';
      
      openModal(name, `
        <div style="margin-bottom: 1.5rem;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--metal-titanium); border: 1px solid var(--border-light); padding: 0.3rem 0.8rem; border-radius: 100px;">
            Status: ${status}
          </span>
        </div>
        <p style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 1.5rem; line-height: 1.7;">${desc}</p>
        <div style="border-top: 1px solid var(--border-light); padding-top: 1.5rem; margin-top: 1.5rem;">
          <h4 style="font-family: var(--font-heading); font-size: 1rem; color: var(--text-muted); margin-bottom: 0.5rem; font-weight: 500;">Focus & Capabilities</h4>
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">${scope}</p>
        </div>
      `);
    });
  });

  // Project Details Modal Trigger
  const projectRows = document.querySelectorAll('.project-row');
  projectRows.forEach(row => {
    row.addEventListener('click', () => {
      const title = row.dataset.title || 'Project Overview';
      const detail = row.dataset.detail || '';
      const status = row.dataset.status || '';
      const category = row.dataset.category || '';

      openModal(title, `
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em;">
            Category: ${category}
          </span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; border: 1px solid var(--border-light); padding: 0.2rem 0.6rem; border-radius: 100px; color: var(--text-primary);">
            ${status}
          </span>
        </div>
        <p style="font-size: 1.1rem; color: var(--text-primary); line-height: 1.7; margin-bottom: 2rem;">${detail}</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.5rem;">
          <h4 style="font-family: var(--font-heading); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--metal-titanium); margin-bottom: 0.5rem;">Engineering Standard</h4>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Developed under strict quality protocols prioritizing durability, user experience, and authentic design language.</p>
        </div>
      `);
    });
  });

  // Journal Reader Modal Trigger
  const journalCards = document.querySelectorAll('.journal-card');
  journalCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title || '';
      const date = card.dataset.date || '';
      const category = card.dataset.category || '';
      const article = card.dataset.article || '';

      openModal(title, `
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--metal-titanium); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem;">
          ${category} — ${date}
        </div>
        <div style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.8; display: flex; flex-direction: column; gap: 1.25rem;">
          ${article}
        </div>
      `);
    });
  });

  // Careers Subscription Modal Trigger
  const careersSubscribeBtn = document.getElementById('careers-subscribe-btn');
  if (careersSubscribeBtn) {
    careersSubscribeBtn.addEventListener('click', () => {
      openModal('Future Opportunities Alert', `
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Register your email to receive direct notifications when engineering, design, or leadership positions become available at Drixel Labs Inc.</p>
        <form id="careers-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <input type="email" placeholder="Enter your professional email" required style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 0.9rem 1.2rem; border-radius: 8px; color: var(--text-primary); outline: none;">
          <button type="submit" class="btn btn-primary" style="align-self: flex-start;">Register Interest</button>
        </form>
      `);

      setTimeout(() => {
        const cForm = document.getElementById('careers-form');
        if (cForm) {
          cForm.addEventListener('submit', (e) => {
            e.preventDefault();
            modalContent.innerHTML = `
              <div style="text-align: center; padding: 2rem 0;">
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Notification Registered</h3>
                <p style="color: var(--text-muted);">Thank you. We will contact you directly when relevant opportunities open.</p>
              </div>
            `;
          });
        }
      }, 100);
    });
  }

  // 6. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending Message...';
        submitBtn.disabled = true;
      }
      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="padding: 2.5rem 1rem; text-align: center;">
            <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--text-primary); margin-bottom: 1rem;">Message Received</h3>
            <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">Thank you for contacting Drixel Labs Inc. Our executive team will review your message and respond promptly.</p>
          </div>
        `;
      }, 1200);
    });
  }

  // 7. Scroll Reveal Observer
  const observerOptions = { threshold: 0.15 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.stat-card, .company-card, .philosophy-card, .project-row, .journal-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo)';
    revealObserver.observe(el);
  });
});
