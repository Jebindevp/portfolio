/**
 * JEBIN JOSEPH - ULTRA 3D AI PORTFOLIO JAVASCRIPT ENGINE (2026 FULL EDITION)
 * Features:
 * - Full AI Voice Studio with Custom Voice Selector, Voice Personas (Manual On-Demand Play)
 * - Persona Switcher: Cyber Male (Deep), Cyber Female (Clear), Indian English, UK Studio
 * - Dynamic System Voices Detection with Country Flags & localStorage Persistence
 * - Live Synchronized Interactive Transcript with Auto-Scrolling
 * - Persistent Floating Cyber Audio Dock with Equalizer
 * - Ultra 3D Perspective Card Tilt Parallax & Holographic Glare
 * - Interactive Neural Particles Canvas (touch & mouse dynamic reactivity)
 * - Dynamic Multi-Role Typing with Cyber Cursor
 * - Web Audio API Synthetic Cyber SFX (with mute/unmute toggle)
 * - Responsive Mobile Drawer with Scroll-Lock & Backdrop Blur
 * - Scroll-Spy & Animated Progress Indicator
 * - Animated Stats Counter
 * - Experience vs Education Timeline Switcher
 * - Category Project Filter & Inspect Modal
 * - WhatsApp Instant Dispatcher & Toast Notifications
 * - Floating Interactive AI Chatbot Assistant Widget
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypingEffect();
  initScrollAndNav();
  initUltra3DTilt();
  initStatsCounter();
  initTimelineTabs();
  initProjectFiltersAndModal();
  initCopyButtons();
  initWhatsAppForm();
  initAiChatbot();
  initCyberAudio();
  initAiVoiceNarratorStudio();
});

/* ==========================================================================
   1. FULL AI VOICE RESUME STUDIO & CUSTOM VOICE ENGINE
   ========================================================================== */
const resumeVoiceSections = [
  {
    id: "bio",
    title: "1. Bio & Overview",
    subtitle: "Identity & Mission",
    text: "Welcome to the official portfolio of Jebin Joseph. Jebin is an innovative Full Stack Web Developer and Coding Instructor based in Kanyakumari, Tamil Nadu, India. He builds scalable, secure, and modern web applications with cutting-edge AI integrations and high-performance backends."
  },
  {
    id: "skills",
    title: "2. Technical Stack",
    subtitle: "Core Capabilities",
    text: "Jebin's core technical toolkit includes Python, Django, Flask, and RESTful API architecture on the backend. On the frontend, he specializes in HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap, and React, coupled with MySQL, PostgreSQL, and SQLite databases."
  },
  {
    id: "experience",
    title: "3. Work & Teaching",
    subtitle: "Professional Journey",
    text: "Jebin is currently working as a Full Stack Coding Teacher at SR Indian Computers Karungal, mentoring students in Python and web development. Previously at Clovion Tech, he successfully built and deployed over five live production websites and integrated third-party REST APIs and payment gateways."
  },
  {
    id: "projects",
    title: "4. Live Projects",
    subtitle: "Featured Deployments",
    text: "His key deployments include an Online Course E-Learning Platform in Django with PayPal integration, the official Siva Prakasha Saba Trust portal, UbaaldGym fitness hub, and academic Student Attendance and Task Management software."
  },
  {
    id: "contact",
    title: "5. Contact & Collaboration",
    subtitle: "Get In Touch",
    text: "To collaborate on projects or hire Jebin, reach out directly on WhatsApp at +91 9487851243 or by email at kmt4543@gmail.com. Thank you for exploring Jebin Joseph's AI portfolio."
  }
];

function initAiVoiceNarratorStudio() {
  const synth = window.speechSynthesis;
  let currentSectionIdx = 0;
  let isPlaying = false;
  let isPaused = false;
  let currentUtterance = null;
  let speechRate = 1.0;
  let speechPitch = 1.0;
  let selectedVoice = null;
  let availableVoices = [];

  // Studio UI Elements
  const studioPlayBtn = document.getElementById('studio-play-btn');
  const studioStopBtn = document.getElementById('studio-stop-btn');
  const studioPrevBtn = document.getElementById('studio-prev-btn');
  const studioNextBtn = document.getElementById('studio-next-btn');
  const studioSpeedBtn = document.getElementById('studio-speed-btn');
  const studioSeekSlider = document.getElementById('studio-seek-slider');
  const studioTimeLabel = document.getElementById('studio-time-label');
  const studioStatusLabel = document.getElementById('studio-status-label');
  const studioVisualizer = document.getElementById('studio-soundwave');
  const transcriptItems = document.querySelectorAll('.transcript-item');
  const voiceSelectDropdown = document.getElementById('studio-voice-select');
  const personaPillBtns = document.querySelectorAll('.persona-pill-btn');

  // Floating Dock Elements
  const floatingDock = document.getElementById('floating-audio-dock');
  const dockPlayBtn = document.getElementById('dock-play-btn');
  const dockTitle = document.getElementById('dock-title');
  const dockSub = document.getElementById('dock-sub');
  const dockVisualizer = document.getElementById('dock-soundwave');

  // Load and populate available browser voices
  function populateVoiceList() {
    if (!synth) return;
    availableVoices = synth.getVoices();
    if (availableVoices.length === 0) return;

    if (voiceSelectDropdown) {
      voiceSelectDropdown.innerHTML = '';
      availableVoices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        
        let flag = '🌐';
        if (voice.lang.includes('en-IN') || voice.name.toLowerCase().includes('india') || voice.name.toLowerCase().includes('heera') || voice.name.toLowerCase().includes('ravi')) flag = '🇮🇳';
        else if (voice.lang.includes('en-US') || voice.name.toLowerCase().includes('david') || voice.name.toLowerCase().includes('zira') || voice.name.toLowerCase().includes('guy') || voice.name.toLowerCase().includes('jenny')) flag = '🇺🇸';
        else if (voice.lang.includes('en-GB') || voice.name.toLowerCase().includes('george') || voice.name.toLowerCase().includes('hazel') || voice.name.toLowerCase().includes('susan') || voice.name.toLowerCase().includes('daniel')) flag = '🇬🇧';
        else if (voice.lang.includes('en-AU')) flag = '🇦🇺';
        
        option.textContent = `${flag} ${voice.name} (${voice.lang})`;
        voiceSelectDropdown.appendChild(option);
      });
    }

    // Check saved preference or pick optimal default voice
    const savedVoiceURI = localStorage.getItem('ai_preferred_voice_uri');
    if (savedVoiceURI) {
      const match = availableVoices.find(v => v.voiceURI === savedVoiceURI);
      if (match) selectedVoice = match;
    }

    if (!selectedVoice) {
      selectedVoice = availableVoices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Guy')) && v.lang.startsWith('en'))
                   || availableVoices.find(v => v.lang.startsWith('en'))
                   || availableVoices[0];
    }

    // Sync dropdown with selected voice
    if (voiceSelectDropdown && selectedVoice) {
      const selectedIndex = availableVoices.indexOf(selectedVoice);
      if (selectedIndex !== -1) voiceSelectDropdown.value = selectedIndex;
    }
  }

  populateVoiceList();
  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }

  // Handle Voice Dropdown Selection
  if (voiceSelectDropdown) {
    voiceSelectDropdown.addEventListener('change', (e) => {
      const idx = parseInt(e.target.value, 10);
      if (availableVoices[idx]) {
        selectedVoice = availableVoices[idx];
        localStorage.setItem('ai_preferred_voice_uri', selectedVoice.voiceURI);
        personaPillBtns.forEach(p => p.classList.remove('active'));
        showToast(`Voice switched to: ${selectedVoice.name}`);
        if (isPlaying && !isPaused) {
          speakSection(currentSectionIdx);
        }
      }
    });
  }

  // Handle Quick Voice Persona Presets
  personaPillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      personaPillBtns.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');

      const persona = btn.getAttribute('data-persona');
      if (availableVoices.length === 0) populateVoiceList();

      if (persona === 'cyber-male') {
        selectedVoice = availableVoices.find(v => (v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('guy') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('daniel')) && v.lang.startsWith('en'))
                     || availableVoices.find(v => v.lang.includes('en-US'))
                     || selectedVoice;
        speechPitch = 0.92;
        speechRate = 1.0;
        showToast('Activated: Cyber AI Male (Deep)');
      } else if (persona === 'cyber-female') {
        selectedVoice = availableVoices.find(v => (v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('jenny') || v.name.toLowerCase().includes('aria') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('susan')) && v.lang.startsWith('en'))
                     || availableVoices.find(v => v.lang.startsWith('en'))
                     || selectedVoice;
        speechPitch = 1.12;
        speechRate = 1.05;
        showToast('Activated: Cyber AI Female (Clear)');
      } else if (persona === 'indian-en') {
        selectedVoice = availableVoices.find(v => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('ravi'))
                     || availableVoices.find(v => v.lang.startsWith('en'))
                     || selectedVoice;
        speechPitch = 1.0;
        speechRate = 1.0;
        showToast('Activated: Indian English Accent 🇮🇳');
      } else if (persona === 'uk-studio') {
        selectedVoice = availableVoices.find(v => (v.lang.includes('en-GB') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('hazel') || v.name.toLowerCase().includes('uk')) && v.lang.startsWith('en'))
                     || availableVoices.find(v => v.lang.startsWith('en'))
                     || selectedVoice;
        speechPitch = 1.0;
        speechRate = 1.0;
        showToast('Activated: UK Studio British 🇬🇧');
      }

      if (selectedVoice) {
        localStorage.setItem('ai_preferred_voice_uri', selectedVoice.voiceURI);
        if (voiceSelectDropdown) {
          const index = availableVoices.indexOf(selectedVoice);
          if (index !== -1) voiceSelectDropdown.value = index;
        }
      }

      if (isPlaying && !isPaused) {
        speakSection(currentSectionIdx);
      }
    });
  });

  function updateVisualizers(active) {
    if (studioVisualizer) {
      if (active) studioVisualizer.classList.add('speaking');
      else studioVisualizer.classList.remove('speaking');
    }
    if (dockVisualizer) {
      if (active) dockVisualizer.classList.add('speaking');
      else dockVisualizer.classList.remove('speaking');
    }
  }

  function updateUI() {
    const section = resumeVoiceSections[currentSectionIdx];

    // Update Status Labels
    if (studioStatusLabel) {
      const voiceName = selectedVoice ? ` (${selectedVoice.name.split(' ')[0]})` : '';
      studioStatusLabel.textContent = isPlaying 
        ? (isPaused ? `⏸ Paused: ${section.title}` : `🔊 Speaking${voiceName}: ${section.title}`) 
        : `Ready: Click 'Play Voice Resume' to start`;
    }

    if (studioTimeLabel) {
      studioTimeLabel.textContent = `${currentSectionIdx + 1} / ${resumeVoiceSections.length}`;
    }

    if (studioSeekSlider) {
      studioSeekSlider.value = currentSectionIdx;
    }

    // Studio Play Button
    if (studioPlayBtn) {
      const icon = studioPlayBtn.querySelector('i');
      const textSpan = studioPlayBtn.querySelector('span');
      if (isPlaying && !isPaused) {
        if (icon) icon.className = 'fas fa-pause';
        if (textSpan) textSpan.textContent = 'Pause Narration';
        updateVisualizers(true);
      } else {
        if (icon) icon.className = 'fas fa-play';
        if (textSpan) textSpan.textContent = isPaused ? 'Resume Audio' : 'Play Voice Resume';
        updateVisualizers(false);
      }
    }

    // Floating Dock Sync
    if (dockPlayBtn) {
      const icon = dockPlayBtn.querySelector('i');
      if (icon) icon.className = (isPlaying && !isPaused) ? 'fas fa-pause' : 'fas fa-play';
    }
    if (dockTitle) dockTitle.textContent = section.title;
    if (dockSub) dockSub.textContent = isPlaying ? (isPaused ? 'Paused' : 'Now Playing') : 'Voice Tour Ready';

    if (floatingDock) {
      if (isPlaying || isPaused) {
        floatingDock.classList.add('visible');
      }
    }

    // Transcript active highlight
    transcriptItems.forEach((item, idx) => {
      if (idx === currentSectionIdx) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  function speakSection(index) {
    if (!synth) {
      showToast('Voice Synthesis not supported in this browser.', 'fa-exclamation-triangle');
      return;
    }

    synth.cancel();

    if (index >= resumeVoiceSections.length) {
      isPlaying = false;
      isPaused = false;
      currentSectionIdx = 0;
      updateUI();
      showToast('Voice Resume Tour completed! 🎉');
      return;
    }

    currentSectionIdx = index;
    const section = resumeVoiceSections[currentSectionIdx];

    currentUtterance = new SpeechSynthesisUtterance(section.text);
    if (selectedVoice) currentUtterance.voice = selectedVoice;
    currentUtterance.rate = speechRate;
    currentUtterance.pitch = speechPitch;

    currentUtterance.onstart = () => {
      isPlaying = true;
      isPaused = false;
      updateUI();
    };

    currentUtterance.onend = () => {
      if (isPlaying && !isPaused) {
        speakSection(currentSectionIdx + 1);
      }
    };

    currentUtterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      isPlaying = false;
      isPaused = false;
      updateUI();
    };

    synth.speak(currentUtterance);
  }

  function togglePlayPause() {
    if (!synth) return;

    if (!isPlaying) {
      speakSection(currentSectionIdx);
    } else if (isPaused) {
      synth.resume();
      isPaused = false;
      updateUI();
    } else {
      synth.pause();
      isPaused = true;
      updateUI();
    }
  }

  // Play / Pause Handlers
  if (studioPlayBtn) studioPlayBtn.addEventListener('click', togglePlayPause);
  if (dockPlayBtn) dockPlayBtn.addEventListener('click', togglePlayPause);

  // Stop Button
  if (studioStopBtn) {
    studioStopBtn.addEventListener('click', () => {
      if (!synth) return;
      synth.cancel();
      isPlaying = false;
      isPaused = false;
      currentSectionIdx = 0;
      updateUI();
      if (floatingDock) floatingDock.classList.remove('visible');
      showToast('Voice Tour Stopped');
    });
  }

  // Previous Section
  if (studioPrevBtn) {
    studioPrevBtn.addEventListener('click', () => {
      const prevIdx = Math.max(0, currentSectionIdx - 1);
      speakSection(prevIdx);
    });
  }

  // Next Section
  if (studioNextBtn) {
    studioNextBtn.addEventListener('click', () => {
      const nextIdx = Math.min(resumeVoiceSections.length - 1, currentSectionIdx + 1);
      speakSection(nextIdx);
    });
  }

  // Seek Slider
  if (studioSeekSlider) {
    studioSeekSlider.addEventListener('input', (e) => {
      const targetIdx = parseInt(e.target.value, 10);
      speakSection(targetIdx);
    });
  }

  // Speed Rate Switcher
  if (studioSpeedBtn) {
    studioSpeedBtn.addEventListener('click', () => {
      if (speechRate === 1.0) speechRate = 1.25;
      else if (speechRate === 1.25) speechRate = 1.5;
      else speechRate = 1.0;

      studioSpeedBtn.textContent = `${speechRate}x Speed`;
      if (isPlaying && !isPaused) {
        speakSection(currentSectionIdx);
      }
      showToast(`Playback speed set to ${speechRate}x`);
    });
  }

  // Transcript Card Clicks
  transcriptItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      speakSection(idx);
    });
  });

  // Hero Quick Voice Trigger
  const heroVoiceBtn = document.getElementById('hero-voice-tour-btn');
  if (heroVoiceBtn) {
    heroVoiceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const studioSection = document.getElementById('voice-studio');
      if (studioSection) studioSection.scrollIntoView({ behavior: 'smooth' });
      speakSection(0);
    });
  }

  // Initial UI state without auto-play
  updateUI();
}

/* ==========================================================================
   2. ULTRA 3D PERSPECTIVE PARALLAX TILT
   ========================================================================== */
function initUltra3DTilt() {
  const tiltElements = document.querySelectorAll('.glass-card, .project-card, .service-card, .terminal-window');

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    tiltElements.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = ((-mouseY / (cardHeight / 2)) * 7).toFixed(2);
        const rotateY = ((mouseX / (cardWidth / 2)) * 7).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

        const glareX = e.clientX - rect.left;
        const glareY = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${glareX}px`);
        card.style.setProperty('--mouse-y', `${glareY}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }
}

/* ==========================================================================
   3. INTERACTIVE NEURAL NETWORK CANVAS PARTICLES
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let particleCount = window.innerWidth < 768 ? 35 : 75;
  const maxDistance = window.innerWidth < 768 ? 110 : 150;
  let mouse = { x: null, y: null, radius: 160 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particleCount = window.innerWidth < 768 ? 35 : 75;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.45 ? '#00f0ff' : '#8b5cf6';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.2;
          this.y -= (dy / dist) * force * 2.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. DYNAMIC MULTI-ROLE TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-target');
  if (!typingElement) return;

  const titles = [
    "Full Stack Web Developer",
    "Django & Python Specialist",
    "AI & Smart Systems Builder",
    "Coding Educator & Mentor",
    "REST API & Database Engineer"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const pauseEnd = 1600;
  const pauseStart = 350;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(type, pauseEnd);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(type, pauseStart);
      return;
    }

    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
  }

  type();
}

/* ==========================================================================
   5. SCROLL PROGRESS, MOBILE DRAWER, SCROLL-SPY, BACK TO TOP
   ========================================================================== */
function initScrollAndNav() {
  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const backToTopBtn = document.querySelector('.btn-back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');
  const navOverlay = document.querySelector('.mobile-nav-overlay');

  function openMobileMenu() {
    if (navMenu) navMenu.classList.add('open');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (progressBar && scrollHeight > 0) {
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }

    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   6. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-count');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetCount = parseInt(target.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 1500;
        const stepTime = Math.max(Math.floor(duration / targetCount), 20);

        const timer = setInterval(() => {
          count += 1;
          target.textContent = count;
          if (count >= targetCount) {
            target.textContent = targetCount;
            clearInterval(timer);
          }
        }, stepTime);

        observerInstance.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(num => observer.observe(num));
}

/* ==========================================================================
   7. TIMELINE TABS (EXPERIENCE VS EDUCATION)
   ========================================================================== */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.timeline-tab-btn');
  const experienceContainer = document.getElementById('timeline-experience');
  const educationContainer = document.getElementById('timeline-education');

  if (!tabBtns.length || !experienceContainer || !educationContainer) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-target');
      if (target === 'experience') {
        experienceContainer.style.display = 'block';
        educationContainer.style.display = 'none';
      } else {
        experienceContainer.style.display = 'none';
        educationContainer.style.display = 'block';
      }
    });
  });
}

/* ==========================================================================
   8. PROJECT CATEGORY FILTER & PROJECT INSPECT MODAL
   ========================================================================== */
const projectData = [
  {
    id: "elearning",
    title: "Online Course E-Commerce Platform",
    category: "django",
    image: "images/aa10.jpg",
    desc: "A full-featured e-learning marketplace developed in Django and Python. Allows instructors to publish video courses and students to browse, enroll, track lesson progress, and securely checkout via payment gateway.",
    tech: ["Django", "Python", "PostgreSQL", "PayPal", "Bootstrap 5", "HTML5/CSS3"],
    live: "http://clovion.org/elearningweb/",
    github: "https://github.com/Jebindevp"
  },
  {
    id: "siva-sabha",
    title: "Siva Prakasha Saba Temple & Trust",
    category: "client",
    image: "images/aa11.jpg",
    desc: "Official dynamic trust portal featuring event management, photo galleries, donation announcements, and history records. Fully responsive with modern interactive navigation.",
    tech: ["Django", "HTML5", "CSS3", "JavaScript", "Bootstrap", "FontAwesome"],
    live: "https://saivaprakashasabha.in/",
    github: "https://github.com/Jebindevp"
  },
  {
    id: "wedding",
    title: "Wedding Ceremony & Events Portal",
    category: "client",
    image: "images/aa12.jpg",
    desc: "Elegant and interactive wedding event presentation website featuring smooth animations, interactive schedule timelines, RSVP dispatch, and gallery showcases.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    live: "https://jebindevp.github.io/wedding/",
    github: "https://github.com/Jebindevp"
  },
  {
    id: "sr-computers",
    title: "SR Indian Computers Karungal",
    category: "client",
    image: "images/aa19.jpg",
    desc: "Official institutional website for computer education and software coaching. Displays active course catalogs, fee schedules, student admission portal, and contact forms.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Google Maps API"],
    live: "https://jebindevp.github.io/computerclass/",
    github: "https://github.com/Jebindevp"
  },
  {
    id: "gym",
    title: "UbaaldGym Fitness & Training Hub",
    category: "client",
    image: "images/glow.png",
    desc: "High-impact fitness center portal with membership plan selectors, workout regime showcase, trainer bios, and direct WhatsApp / email inquiry dispatcher.",
    tech: ["HTML5", "CSS3", "JavaScript", "WhatsApp API"],
    live: "https://jebindevp.github.io/UbaaldGym/",
    github: "https://github.com/Jebindevp"
  },
  {
    id: "rja-electrical",
    title: "RJA Electrical & Power Solutions",
    category: "client",
    image: "images/aa17.jpg",
    desc: "Commercial services portal for electrical contractor solutions, industrial wiring quotes, project portfolio, and quick client booking.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    live: "https://jebindevp.github.io/RJA.in/",
    github: "https://github.com/Jebindevp"
  },
  {
    id: "bible-stories",
    title: "Bible Story Educational Hub",
    category: "frontend",
    image: "images/bb2.jpg",
    desc: "Interactive storytelling and media portal designed for youth and community reading, featuring categorised chapters and responsive media embeds.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    live: "https://jebindevp.github.io/Bible-Story.in/",
    github: "https://github.com/Jebindevp"
  },
  {
    id: "task-attendance",
    title: "Student Attendance & Task Manager",
    category: "django",
    image: "images/aa18.jpg",
    desc: "Educational management suite enabling teachers to record attendance, assign tasks, and track student completion metrics with custom role-based dashboards.",
    tech: ["Django", "Python", "SQLite", "Chart.js", "Bootstrap"],
    live: "https://github.com/Jebindevp",
    github: "https://github.com/Jebindevp"
  },
  {
    id: "todo-app",
    title: "Smart To-Do & Task Organiser",
    category: "django",
    image: "images/aa13.jpg",
    desc: "Interactive productivity app with priority tagging, deadline reminders, category sorting, and instant status updates powered by SQLite and Django backend.",
    tech: ["Django", "Python", "SQLite", "JavaScript"],
    live: "https://github.com/Jebindevp",
    github: "https://github.com/Jebindevp"
  }
];

function initProjectFiltersAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  document.querySelectorAll('.btn-inspect').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const project = projectData.find(p => p.id === projectId);
      if (!project || !modalBackdrop) return;

      document.getElementById('modal-img').src = project.image;
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-desc').textContent = project.desc;

      const techContainer = document.getElementById('modal-tech-list');
      techContainer.innerHTML = '';
      project.tech.forEach(t => {
        const badge = document.createElement('span');
        badge.className = 'modal-tech-badge';
        badge.textContent = t;
        techContainer.appendChild(badge);
      });

      const liveBtn = document.getElementById('modal-live-btn');
      const ghBtn = document.getElementById('modal-github-btn');
      if (liveBtn) liveBtn.href = project.live;
      if (ghBtn) ghBtn.href = project.github;

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   9. COPY TO CLIPBOARD WITH TOAST NOTIFICATION
   ========================================================================== */
function showToast(message, icon = 'fa-check-circle') {
  const container = document.querySelector('.toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas ${icon}" style="color: var(--cyan-primary);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2800);
}

function createToastContainer() {
  const cont = document.createElement('div');
  cont.className = 'toast-container';
  document.body.appendChild(cont);
  return cont;
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast('Copied successfully!');
      });
    });
  });
}

/* ==========================================================================
   10. WHATSAPP INSTANT MESSAGE GENERATOR FORM
   ========================================================================== */
function initWhatsAppForm() {
  const form = document.getElementById('whatsappForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!fname || !email || !message) {
      showToast('Please fill out required fields', 'fa-exclamation-triangle');
      return;
    }

    const whatsappText = 
      `*New Portfolio Inquiry - Jebin Joseph*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(fname)} ${encodeURIComponent(lname)}%0A` +
      `📧 *Email:* ${encodeURIComponent(email)}%0A` +
      `📌 *Subject:* ${encodeURIComponent(subject)}%0A` +
      `💬 *Message:* ${encodeURIComponent(message)}`;

    const phone = "919487851243";
    const whatsappUrl = `https://wa.me/${phone}?text=${whatsappText}`;

    window.open(whatsappUrl, '_blank');

    showToast('Redirecting to WhatsApp...', 'fa-paper-plane');
    form.reset();
  });
}

/* ==========================================================================
   11. INTERACTIVE AI ASSISTANT CHATBOT WIDGET
   ========================================================================== */
function initAiChatbot() {
  const trigger = document.querySelector('.ai-widget-trigger');
  const chatWindow = document.querySelector('.ai-chat-window');
  const closeBtn = document.querySelector('.ai-chat-close');
  const chatBody = document.querySelector('.ai-chat-body');
  const promptBtns = document.querySelectorAll('.prompt-btn');

  if (!trigger || !chatWindow || !chatBody) return;

  trigger.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('open');
    });
  }

  const aiKnowledge = {
    "skills": "Jebin specializes in **Full Stack Python & Django**, REST APIs, HTML5, CSS3, JavaScript, Bootstrap, Tailwind CSS, React, MySQL/PostgreSQL databases, and AI web automation tools.",
    "projects": "Jebin has built live systems like the **Online Course E-Learning Platform** (Django), **Siva Prakasha Saba Trust Website**, **UbaaldGym Portal**, and **SR Indian Computers Portal**.",
    "contact": "You can reach Jebin instantly via WhatsApp (+91 9487851243), Email (kmt4543@gmail.com), or GitHub (@Jebindevp).",
    "resume": "You can download Jebin's full verified resume PDF right from the top navigation bar or using the 'Download CV' button in the Hero section.",
    "experience": "Jebin is currently a **Full Stack Coding Teacher** at SR Indian Computers and previously worked as a **Web Developer & API Engineer** at Clovion Tech."
  };

  function appendMessage(text, sender = 'bot') {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  promptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const topic = btn.getAttribute('data-topic');
      const questionText = btn.textContent;

      appendMessage(questionText, 'user');

      setTimeout(() => {
        const reply = aiKnowledge[topic] || "I am Jebin's AI Assistant! Feel free to explore his projects or get in touch directly.";
        appendMessage(reply, 'bot');
      }, 350);
    });
  });
}

/* ==========================================================================
   12. SYNTHETIC CYBER AUDIO (Web Audio API)
   ========================================================================== */
function initCyberAudio() {
  let audioCtx = null;
  let isMuted = true;

  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  if (!audioToggleBtn) return;

  function playTone(freq = 440, duration = 0.08, type = 'sine') {
    if (isMuted) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio context failures
    }
  }

  audioToggleBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    const icon = audioToggleBtn.querySelector('i');
    if (icon) {
      if (isMuted) {
        icon.className = 'fas fa-volume-mute';
        audioToggleBtn.title = 'Enable Cyber Audio SFX';
        showToast('Cyber SFX Muted');
      } else {
        icon.className = 'fas fa-volume-up';
        audioToggleBtn.title = 'Mute Cyber Audio SFX';
        showToast('Cyber SFX Activated! 🔊');
        playTone(587.33, 0.12, 'triangle');
      }
    }
  });

  document.querySelectorAll('.btn-cyber, .filter-btn, .timeline-tab-btn, .btn-voice-ctrl, .persona-pill-btn').forEach(el => {
    el.addEventListener('mouseenter', () => playTone(659.25, 0.04, 'sine'));
    el.addEventListener('click', () => playTone(880, 0.08, 'triangle'));
  });
}
