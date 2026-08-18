/**
 * THE DAILY DEVELOPER / JEBIN CHRONICLE - JAVASCRIPT BROADSHEET ENGINE
 * Features:
 * - Dynamic Newspaper Date & Live Time Formatter
 * - Morning Edition (Newsprint) & Midnight Gazette (Dark Mode) Switcher with Persistence
 * - Full AI Voice Broadcast Bureau with Voice Personas & Real-Time Synchronized Dispatches
 * - Dynamic Multi-Role Broadsheet Headline Typing Effect
 * - Interactive Project Filtering & Full-Page Gazette Inspection Supplement Modal
 * - Instant WhatsApp Telegram Dispatcher with Automated Message Encoding
 * - Virtual Newsroom Editor Chatbot Assistant
 * - Smooth Scroll Progress & Mobile Navigation Drawer
 * - Animated Press Statistical Counter
 * - Career Chronicle vs Academic Archives Switcher
 * - Toast Notification System
 */

document.addEventListener('DOMContentLoaded', () => {
  initNewspaperDate();
  initThemeToggle();
  initTypingEffect();
  initScrollAndNav();
  initStatsCounter();
  initTimelineTabs();
  initProjectFiltersAndModal();
  initCopyButtons();
  initWhatsAppForm();
  initAiChatbot();
  initAiVoiceNarratorStudio();
});

/* ==========================================================================
   1. DYNAMIC NEWSPAPER DATE FORMATTER
   ========================================================================== */
function initNewspaperDate() {
  const dateEl = document.getElementById('current-newspaper-date');
  if (!dateEl) return;

  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formatted = now.toLocaleDateString('en-US', options);
  dateEl.textContent = `${formatted} Edition`;
}

/* ==========================================================================
   2. MORNING PAPER (LIGHT) / MIDNIGHT GAZETTE (DARK) THEME SWITCHER
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeLabel = document.getElementById('theme-btn-label');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to morning paper (light newsprint)
  const savedTheme = localStorage.getItem('newspaper_theme') || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlRoot.setAttribute('data-theme', 'dark');
      if (themeLabel) themeLabel.textContent = 'Morning Edition';
      if (themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-sun';
      }
    } else {
      htmlRoot.setAttribute('data-theme', 'light');
      if (themeLabel) themeLabel.textContent = 'Midnight Edition';
      if (themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-moon';
      }
    }
    localStorage.setItem('newspaper_theme', theme);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Switched to Midnight Gazette Edition 🌙' : 'Switched to Morning Newsprint Edition ☀️');
    });
  }
}

/* ==========================================================================
   3. FULL AI VOICE BROADCAST BUREAU & SPEECH ENGINE
   ========================================================================== */
const resumeVoiceSections = [
  {
    id: "bio",
    title: "Dispatch 1: Bio & Mission Overview",
    subtitle: "Identity & Mission",
    text: "Welcome to the official portfolio of Jebin Joseph. Jebin is an innovative Full Stack Web Developer and Coding Instructor based in Kanyakumari, Tamil Nadu, India. He builds scalable, secure, and modern web applications with cutting-edge AI integrations and high-performance backends."
  },
  {
    id: "skills",
    title: "Dispatch 2: Technical Toolkit & Stack",
    subtitle: "Core Capabilities",
    text: "Jebin's core technical toolkit includes Python, Django, Flask, and RESTful API architecture on the backend. On the frontend, he specializes in HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap, and React, coupled with MySQL, PostgreSQL, and SQLite databases."
  },
  {
    id: "experience",
    title: "Dispatch 3: Professional Journey & Instruction",
    subtitle: "Professional Journey",
    text: "Jebin is currently working as a Full Stack Coding Teacher at SR Indian Computers Karungal, mentoring students in Python and web development. Previously at Clovion Tech, he successfully built and deployed over five live production websites and integrated third-party REST APIs and payment gateways."
  },
  {
    id: "projects",
    title: "Dispatch 4: Production Deployments",
    subtitle: "Featured Deployments",
    text: "His key deployments include an Online Course E-Learning Platform in Django with PayPal integration, the official Siva Prakasha Saba Trust portal, UbaaldGym fitness hub, and academic Student Attendance and Task Management software."
  },
  {
    id: "contact",
    title: "Dispatch 5: Direct Wire & Inquiries",
    subtitle: "Get In Touch",
    text: "To collaborate on projects or hire Jebin, reach out directly on WhatsApp at +91 9487851243 or by email at kmt4543@gmail.com. Thank you for reading and listening to The Daily Developer."
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
    const savedVoiceURI = localStorage.getItem('broadsheet_voice_uri');
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
        localStorage.setItem('broadsheet_voice_uri', selectedVoice.voiceURI);
        personaPillBtns.forEach(p => p.classList.remove('active'));
        showToast(`Voice switched: ${selectedVoice.name}`);
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
        speechPitch = 0.95;
        speechRate = 1.0;
        showToast('Activated: Broadsheet Anchor (Deep Voice)');
      } else if (persona === 'cyber-female') {
        selectedVoice = availableVoices.find(v => (v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('jenny') || v.name.toLowerCase().includes('aria') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('susan')) && v.lang.startsWith('en'))
                     || availableVoices.find(v => v.lang.startsWith('en'))
                     || selectedVoice;
        speechPitch = 1.1;
        speechRate = 1.02;
        showToast('Activated: News Desk Host (Clear Voice)');
      } else if (persona === 'indian-en') {
        selectedVoice = availableVoices.find(v => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('ravi'))
                     || availableVoices.find(v => v.lang.startsWith('en'))
                     || selectedVoice;
        speechPitch = 1.0;
        speechRate = 1.0;
        showToast('Activated: Regional Bureau Accent 🇮🇳');
      } else if (persona === 'uk-studio') {
        selectedVoice = availableVoices.find(v => (v.lang.includes('en-GB') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('hazel') || v.name.toLowerCase().includes('uk')) && v.lang.startsWith('en'))
                     || availableVoices.find(v => v.lang.startsWith('en'))
                     || selectedVoice;
        speechPitch = 1.0;
        speechRate = 1.0;
        showToast('Activated: BBC UK Studio British 🇬🇧');
      }

      if (selectedVoice) {
        localStorage.setItem('broadsheet_voice_uri', selectedVoice.voiceURI);
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

    if (studioStatusLabel) {
      const voiceName = selectedVoice ? ` (${selectedVoice.name.split(' ')[0]})` : '';
      studioStatusLabel.textContent = isPlaying 
        ? (isPaused ? `⏸ Paused: ${section.title}` : `🔊 Broadcasting${voiceName}: ${section.title}`) 
        : `Ready: Click 'Play Voice Resume' to begin transmission`;
    }

    if (studioTimeLabel) {
      studioTimeLabel.textContent = `${currentSectionIdx + 1} / ${resumeVoiceSections.length}`;
    }

    if (studioSeekSlider) {
      studioSeekSlider.value = currentSectionIdx;
    }

    if (studioPlayBtn) {
      const icon = studioPlayBtn.querySelector('i');
      const textSpan = studioPlayBtn.querySelector('span');
      if (isPlaying && !isPaused) {
        if (icon) icon.className = 'fas fa-pause';
        if (textSpan) textSpan.textContent = 'Pause Transmission';
        updateVisualizers(true);
      } else {
        if (icon) icon.className = 'fas fa-play';
        if (textSpan) textSpan.textContent = isPaused ? 'Resume Broadcast' : 'Play Voice Resume';
        updateVisualizers(false);
      }
    }

    if (dockPlayBtn) {
      const icon = dockPlayBtn.querySelector('i');
      if (icon) icon.className = (isPlaying && !isPaused) ? 'fas fa-pause' : 'fas fa-play';
    }
    if (dockTitle) dockTitle.textContent = section.title;
    if (dockSub) dockSub.textContent = isPlaying ? (isPaused ? 'TRANSMISSION PAUSED' : 'NOW BROADCASTING') : 'BROADCAST READY';

    if (floatingDock) {
      if (isPlaying || isPaused) {
        floatingDock.classList.add('visible');
      }
    }

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
      showToast('Voice Synthesis not supported in this browser.', 'fa-triangle-exclamation');
      return;
    }

    synth.cancel();

    if (index >= resumeVoiceSections.length) {
      isPlaying = false;
      isPaused = false;
      currentSectionIdx = 0;
      updateUI();
      showToast('Broadsheet Audio Tour completed! 📰');
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

  if (studioPlayBtn) studioPlayBtn.addEventListener('click', togglePlayPause);
  if (dockPlayBtn) dockPlayBtn.addEventListener('click', togglePlayPause);

  if (studioStopBtn) {
    studioStopBtn.addEventListener('click', () => {
      if (!synth) return;
      synth.cancel();
      isPlaying = false;
      isPaused = false;
      currentSectionIdx = 0;
      updateUI();
      if (floatingDock) floatingDock.classList.remove('visible');
      showToast('Broadcast Stopped');
    });
  }

  if (studioPrevBtn) {
    studioPrevBtn.addEventListener('click', () => {
      const prevIdx = Math.max(0, currentSectionIdx - 1);
      speakSection(prevIdx);
    });
  }

  if (studioNextBtn) {
    studioNextBtn.addEventListener('click', () => {
      const nextIdx = Math.min(resumeVoiceSections.length - 1, currentSectionIdx + 1);
      speakSection(nextIdx);
    });
  }

  if (studioSeekSlider) {
    studioSeekSlider.addEventListener('input', (e) => {
      const targetIdx = parseInt(e.target.value, 10);
      speakSection(targetIdx);
    });
  }

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

  transcriptItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      speakSection(idx);
    });
  });

  const heroVoiceBtn = document.getElementById('hero-voice-tour-btn');
  if (heroVoiceBtn) {
    heroVoiceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const studioSection = document.getElementById('voice-studio');
      if (studioSection) studioSection.scrollIntoView({ behavior: 'smooth' });
      speakSection(0);
    });
  }

  updateUI();
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
    "Scalable API & Systems Architect",
    "Coding Educator & Mentor",
    "Database & UI Engineer"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 85;
  const deleteSpeed = 40;
  const pauseEnd = 1700;
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
  const header = document.querySelector('.site-navigation-bar');
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
      if (scrollTop > 80) {
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
      const sectionTop = section.offsetTop - 140;
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
        const duration = 1400;
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
   7. TIMELINE TABS (CAREER CHRONICLE VS ACADEMIC ARCHIVES)
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
    desc: "A full-featured e-learning marketplace developed in Django and Python. Allows instructors to publish video courses and students to browse, enroll, track lesson progress, and securely checkout via PayPal payment gateway.",
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
function showToast(message, icon = 'fa-circle-check') {
  const container = document.querySelector('.toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas ${icon}" style="color: var(--press-crimson);"></i> <span>${message}</span>`;
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
   10. WHATSAPP TELEGRAM DISPATCHER FORM
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
      showToast('Please fill out required fields', 'fa-triangle-exclamation');
      return;
    }

    const whatsappText = 
      `*TELEGRAM DISPATCH - THE DAILY DEVELOPER*%0A` +
      `---------------------------------------%0A` +
      `👤 *Sender:* ${encodeURIComponent(fname)} ${encodeURIComponent(lname)}%0A` +
      `📧 *Email:* ${encodeURIComponent(email)}%0A` +
      `📌 *Topic:* ${encodeURIComponent(subject || 'General Project Inquiry')}%0A` +
      `💬 *Message:* ${encodeURIComponent(message)}%0A` +
      `---------------------------------------`;

    const phone = "919487851243";
    const whatsappUrl = `https://wa.me/${phone}?text=${whatsappText}`;

    window.open(whatsappUrl, '_blank');

    showToast('Redirecting Telegram to WhatsApp...', 'fa-paper-plane');
    form.reset();
  });
}

/* ==========================================================================
   11. VIRTUAL NEWSROOM EDITOR CHATBOT WIDGET
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
    "skills": "Jebin's verified stack spans **Full Stack Python & Django**, REST APIs, HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap 5, React basics, MySQL, PostgreSQL, and modern AI automation tools.",
    "projects": "Key featured deployments in The Daily Developer include the **Online Course E-Learning Platform** (Django), **Siva Prakasha Saba Trust Portal**, **UbaaldGym Fitness Hub**, and **SR Indian Computers Portal**.",
    "contact": "You can connect directly with Jebin via WhatsApp (+91 9487851243), Email (kmt4543@gmail.com), or GitHub (@Jebindevp).",
    "resume": "You can download Jebin's full verified resume dossier PDF from the top navigation ribbon or the Front Page lead story.",
    "experience": "Jebin is currently a **Full Stack Coding Teacher** at SR Indian Computers Karungal and previously delivered 5+ production web platforms at Clovion Tech."
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
        const reply = aiKnowledge[topic] || "I am the Virtual Newsroom Editor! Feel free to explore Jebin's projects or dispatch a direct inquiry.";
        appendMessage(reply, 'bot');
      }, 300);
    });
  });
}
