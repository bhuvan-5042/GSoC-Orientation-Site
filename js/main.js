// main.js - Main JavaScript functionality for the GSoC Orientation Event website
document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const html = document.documentElement;
    const progressBar = document.getElementById('progress-bar');
    const backToTopBtn = document.getElementById('back-to-top');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const addToCalendarBtn = document.getElementById('add-to-calendar');
    const countdownEl = document.getElementById('countdown');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');

    // === Configuration ===
    const EVENT_DATE = new Date('2026-10-09T13:30:00+05:30'); // IST is UTC+5:30
    const reducesMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // === Dark Mode ===
    const initDarkMode = () => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'enabled') {
            enableDarkMode();
        } else if (savedDarkMode === 'disabled') {
            disableDarkMode();
        } else {
            // Default to light theme
            disableDarkMode();
        }
    };

    const enableDarkMode = () => {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
        if (darkModeToggle) darkModeToggle.checked = true;
    };

    const disableDarkMode = () => {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
        if (darkModeToggle) darkModeToggle.checked = false;
    };

    const toggleDarkMode = () => {
        if (html.classList.contains('dark')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    };

    // === Countdown Timer ===
    const initCountdown = () => {
        if (!countdownEl) return;

        const updateCountdown = () => {
            const now = new Date();
            const diff = EVENT_DATE - now;

            if (diff <= 0) {
                countdownEl.innerHTML = '<div class="countdown__live">The event is live!</div>';
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            countdownEl.innerHTML = `
                <div class="countdown__item">
                    <div class="countdown__value">${days}</div>
                    <div class="countdown__label">Days</div>
                </div>
                <div class="countdown__item">
                    <div class="countdown__value">${hours}</div>
                    <div class="countdown__label">Hours</div>
                </div>
                <div class="countdown__item">
                    <div class="countdown__value">${minutes}</div>
                    <div class="countdown__label">Minutes</div>
                </div>
                <div class="countdown__item">
                    <div class="countdown__value">${seconds}</div>
                    <div class="countdown__label">Seconds</div>
                </div>
            `;
        };

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    };

    // === Scroll Progress Bar ===
    const initScrollProgress = () => {
        if (!progressBar) return;

        const updateProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.scrollHeight - windowHeight;
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const width = (scrollY / documentHeight) * 100;
            progressBar.style.width = `${width}%`;
        };

        window.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);
        updateProgress();
    };

    // === Back to Top Button ===
    const initBackToTop = () => {
        if (!backToTopBtn) return;

        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();
    };

    // === Dark Mode Toggle ===
    const initDarkModeToggle = () => {
        if (!darkModeToggle) return;
        darkModeToggle.addEventListener('change', toggleDarkMode);
    };

    // === Add to Calendar Button with Confetti ===
    const initAddToCalendar = () => {
        if (!addToCalendarBtn) return;

        // Create a simple confetti effect
        const createConfetti = () => {
            const confettiContainer = document.createElement('div');
            confettiContainer.className = 'confetti-container';
            document.body.appendChild(confettiContainer);

            const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];
            const count = 50;

            for (let i = 0; i < count; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
                confettiContainer.appendChild(confetti);
            }

            // Remove after animation ends
            setTimeout(() => {
                confettiContainer.remove();
            }, 5000);
        };

        // Helper to format date for IST (UTC+5:30) in basic format YYYYMMDDTHHMMSS
        const formatISTDate = (date) => {
            const offsetMinutes = 5 * 60 + 30; // IST offset in minutes
            const istDate = new Date(date.getTime() + offsetMinutes * 60000);
            return istDate.toISOString().replace(/[-:]/g, '').split('.')[0];
        };

        addToCalendarBtn.addEventListener('click', (e) => {
            // Generate and download .ics file
            const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL;VALUE=URI:${window.location.href}
DTSTART:${formatISTDate(EVENT_DATE)}
DTEND:${formatISTDate(new Date(EVENT_DATE.getTime() + 110*60000))}
SUMMARY:${CONFIG.event.title}
DESCRIPTION:${CONFIG.event.whatToExpect}
LOCATION:${CONFIG.event.venue}
END:VEVENT
END:VCALENDAR`.trim();

            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'gsoc-orientation.ics';
            a.click();
            URL.revokeObjectURL(url);

            // Trigger confetti
            if (!reducesMotion) {
                createConfetti();
            }
        });
    };

    // === Scroll Reveal Animations ===
    const initScrollReveal = () => {
        if (reducesMotion) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with data-scroll-reveal or specific classes
        const elementsToReveal = document.querySelectorAll('[data-scroll-reveal], .reveal-on-scroll');
        elementsToReveal.forEach(el => observer.observe(el));
    };

    // === Cursor Tilt on Cards ===
    const initCardTilt = () => {
        if (reducesMotion) return;

        const cards = document.querySelectorAll('.tilt-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const angleX = ((y - centerY) / centerY) * 10; // Max tilt 10deg
                const angleY = ((centerX - x) / centerX) * 10; // Invert X for natural movement

                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    };

    // === Button Ripple Effect ===
    const initButtonRipple = () => {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const x = e.clientX;
                const y = e.clientY;

                const buttonTop = button.offsetTop;
                const buttonLeft = button.offsetLeft;

                const xInside = x - buttonLeft;
                const yInside = y - buttonTop;

                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = `${xInside}px`;
                ripple.style.top = `${yInside}px`;
                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    };

    // === Navbar Scroll Effect ===
    const initNavbarScroll = () => {
        if (!navbar) return;

        const updateNavbar = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', updateNavbar);
        updateNavbar();
    };

    // === Navbar Hover Effect (show on mouse near top) ===
    const initNavbarHover = () => {
        const navbarContainer = document.querySelector('.navbar-container');
        if (!navbarContainer) return;

        const threshold = 60; // pixels from top to trigger
        let hideTimeout = null;

        const showNavbar = () => {
            navbarContainer.classList.add('show');
            if (hideTimeout !== null) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
        };

        const hideNavbar = () => {
            hideTimeout = setTimeout(() => {
                navbarContainer.classList.remove('show');
                hideTimeout = null;
            }, 1500); // hide after 1.5s
        };

        const handleMouseMove = (e) => {
            if (e.clientY < threshold) {
                // Mouse is near the top, show navbar
                showNavbar();
            } else {
                // Mouse is away from top trigger zone, but might still be over navbar
                // We'll rely on mouseleave events to start hiding
            }
        };

        const handleNavbarMouseEnter = () => {
            // Mouse entered the navbar, show it and clear any hide timeout
            showNavbar();
        };

        const handleNavbarMouseLeave = () => {
            // Mouse left the navbar, start hide timeout
            hideTimeout = setTimeout(() => {
                navbarContainer.classList.remove('show');
                hideTimeout = null;
            }, 1500); // hide after 1.5s
        };

        document.addEventListener('mousemove', handleMouseMove);
        navbarContainer.addEventListener('mouseenter', handleNavbarMouseEnter);
        navbarContainer.addEventListener('mouseleave', handleNavbarMouseLeave);
    };

    // === Helper Functions for Hero Animations ===
    const getRayColor = (index) => {
        const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];
        return colors[index % colors.length];
    };

    const initHeroAnimations = () => {
        const raysContainer = document.querySelector('.hero__rays');
        const shapesContainer = document.querySelector('.hero__shapes');

        if (raysContainer) {
            // Create 12 rays
            for (let i = 0; i < 12; i++) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', '100');
                line.setAttribute('y1', '100');
                line.setAttribute('x2', '100');
                line.setAttribute('y2', '20'); // length of ray
                line.style.stroke = getRayColor(i);
                line.style.strokeWidth = '2';
                line.style.opacity = '0.7';
                raysContainer.appendChild(line);
            }
            // Apply rotation to the container
            raysContainer.style.animation = 'rotate 20s linear infinite';
        }

        if (shapesContainer) {
            // Floating shapes removed per request
            // Keep container for future use if needed
        }
    };

    // === Populate Why GSoC Section ===
    const populateWhyGsoc = () => {
        const cardsContainer = document.getElementById('why-cards');
        if (!cardsContainer) return;

        // Helper to get icon SVG for a given id
        const getWhyGsocIcon = (id) => {
            switch (id) {
                case 'orgs': return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v18H3z" stroke="currentColor" stroke-width="2"/><path d="M7 7h10v10H7z" stroke="currentColor" stroke-width="2"/><path d="M11 11h6v6H11z" stroke="currentColor" stroke-width="2"/></svg>';
                case 'mentors': return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.12 2.12M17.66 17.66l2.12 2.12M2 12h4M20 12h4M6.34 17.66l-2.12 2.12M17.66 4.93l-2.12-2.12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
                case 'stipend': return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 2v20M2 12h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
                case 'resume': return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 8h8v8H8z" stroke="currentColor" stroke-width="2"/><path d="M12 8v8" stroke="currentColor" stroke-width="2"/></svg>';
                case 'community': return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 2v20M2 12h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>';
                case 'proposal': return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 8h8v8H8z" stroke="currentColor" stroke-width="2"/><path d="M12 8v8" stroke="currentColor" stroke-width="2"/><path d="M8 12h8" stroke="currentColor" stroke-width="2"/></svg>';
                default: return '';
            }
        };

        cardsContainer.innerHTML = CONFIG.whyGsoc.cards.map(card => `
            <div class="card">
                <div class="card__icon">
                    ${getWhyGsocIcon(card.id)}
                </div>
                <h3 class="card__title">${card.title}</h3>
                <p class="card__description">${card.description}</p>
            </div>
        `).join('');
    };

    // === Populate GSoC Journey Section ===
    const populateJourney = () => {
        const timelineContainer = document.getElementById('journey-timeline');
        if (!timelineContainer) return;

        timelineContainer.innerHTML = CONFIG.journey.steps.map((step, index) => `
            <div class="timeline-item ${index % 2 === 0 ? 'timeline-item--odd' : 'timeline-item--even'}">
                <div class="timeline-item__content">
                    <h4 class="timeline-item__title">${step.label}</h4>
                    <p class="timeline-item__description">${step.description}</p>
                </div>
            </div>
        `).join('');
    };

    // === Populate Event Agenda Section ===
    const populateAgenda = () => {
        const timelineContainer = document.getElementById('agenda-timeline');
        if (!timelineContainer) return;

        timelineContainer.innerHTML = CONFIG.agenda.items.map((item, index) => `
            <div class="timeline-item ${index % 2 === 0 ? 'timeline-item--odd' : 'timeline-item--even'}">
                <div class="timeline-item__content">
                    <span class="timeline-item__date">${item.time}</span>
                    <h4 class="timeline-item__title">${item.label}</h4>
                    <p class="timeline-item__description">${item.description}</p>
                </div>
            </div>
        `).join('');
    };

    // === Populate Speakers Section ===
    const populateSpeakers = () => {
        const speakersContainer = document.getElementById('speakers-grid');
        if (!speakersContainer) return;

        speakersContainer.innerHTML = CONFIG.speakers.list.map(speaker => `
            <div class="speaker-card">
                <div class="speaker-avatar">
                    ${speaker.initials}
                </div>
                <h3 class="speaker-name">${speaker.name}</h3>
                <p class="speaker-role">${speaker.role}</p>
                <div class="speaker-social">
                    <a href="${speaker.social.twitter}" aria-label="Twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a11.64 11.64 0 0 1-.62-2.32 4.48 4.48 0 0 0-.3-1.72 6.55 6.55 0 0 0-.78-3.28c1.88-.62 3.6-.94 5.12-1.14zm-10.8 17.4c-1.24.3-2.5.47-3.78.47-2.87 0-5.51-.98-7.65-2.64a12.9 12.9 0 0 1-1.78-.6 6.18 6.18 0 0 1 .84-3.23 3.32 3.32 0 0 0 .62-1.62h-.02a6.36 6.36 0 0 0 3.92 2.25c-2.13.95-4.6 1.55-7.16 1.55-.46 0-.9-.02-1.33-.06a12.9 12.9 0 0 0 7.77-2.16c1.02-.28 2.02-.56 2.93-.84z" stroke="currentColor" stroke-width="2"/></svg></a>
                    <a href="${speaker.social.linkedin}" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-1V1h-2v2H8V1H6v2H5v18h2v-7h3v2h3v3h2v-7c0-2.04 1.11-3.65 2.76-4.34 1.04-.41 2.13-.66 3.19-.66 1.43 0 2.4.22 2.4 1.48v3.56h2.4v-3.38c0-.67.16-1.23.45-1.8 1.23-.48 2.26-.88 3.1-.88 1.08 0 1.96.6 1.96 1.68v3.24h2V9h-.03c-.44-1.1-.86-1.8-1.55-1.8-1.42 0-2.3.96-2.3 2.19v3.32h2.4v-2.7c0-.12.05-.25.11-.37z" stroke="currentColor" stroke-width="2"/></svg></a>
                    <a href="${speaker.social.github}" aria-label="GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 12.23a11.9 11.9 0 0 0-6 2.5c-1.04.57-2.36 1.07-3.4 1.68-.29.15-.58.28-.87.43zM9 9c1.66 0 3.04-1.11 3.33-2.5A2.7 2.7 0 0 0 12 6.3a2.7 2.7 0 0 0-2.73-1c-.16.03-.33.09-.49.17-1.44.72-2.02 1.96-2.02 4.08 0 2.56.87 4.52 2.72 5l-2 .85c-.34.14-.7.21-1.08.35-.94.36-1.58.47-1.78.3z" stroke="currentColor" stroke-width="2"/></svg></a>
                </div>
            </div>
        `).join('');
    };

    // === Populate Tools Marquee ===
    const populateToolsMarquee = () => {
        const marqueeTrack = document.getElementById('marquee-track');
        if (!marqueeTrack) return;

        marqueeTrack.innerHTML = CONFIG.toolsMarquee.map(tool => `
            <div class="marquee__item">
                ${tool === 'Git' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2"/>' : ''}
                ${tool === 'GitHub' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 12.23a11.9 11.9 0 0 0-6 2.5c-1.04.57-2.36 1.07-3.4 1.68-.29.15-.58.28-.87.43zM9 9c1.66 0 3.04-1.11 3.33-2.5A2.7 2.7 0 0 0 12 6.3a2.7 2.7 0 0 0-2.73-1c-.16.03-.33.09-.49.17-1.44.72-2.02 1.96-2.02 4.08 0 2.56.87 4.52 2.72 5l-2 .85c-.34.14-.7.21-1.08.35-.94.36-1.58.47-1.78.3z" stroke="currentColor" stroke-width="2"/>' : ''}
                ${tool === 'Linux' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4H5c-1.1 0-2 .9-2 2v1h10V6c0-1.1-.9-2-2-2zm0 4H5c-1.1 0-2 .9-2 2v1h10v-2c0-1.1-.9-2-2-2z" stroke="currentColor" stroke-width="2"/>' : ''}
                ${tool === 'Python' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2"/>' : ''}
                ${tool === 'JavaScript' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16l2 8H4zM4 18h16" stroke="currentColor" stroke-width="2"/>' : ''}
                ${tool === 'Rust' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3h14l2 8H7zM7 19h10" stroke="currentColor" stroke-width="2"/>' : ''}
                ${tool === 'C++' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" stroke="currentColor" stroke-width="2" font-size="16">C++</text></svg>' : ''}
                ${tool === 'Docker' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M2 6h20V4H2z" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="12" r="2" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="12" r="2" stroke="currentColor" stroke-width="2"/></svg>' : ''}
                ${tool === 'Open Source' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2"/>' : ''}
                <span>${tool}</span>
            </div>
        `).join('');
    };

    // === Initialize All ===
    initDarkMode();
    initCountdown();
    initScrollProgress();
    initBackToTop();
    initDarkModeToggle();
    initAddToCalendar();
    initScrollReveal();
    initCardTilt();
    initButtonRipple();
    initNavbarScroll();
    initNavbarHover();
    initHeroAnimations();
    populateWhyGsoc();
    populateJourney();
    populateAgenda();
    populateSpeakers();
    populateToolsMarquee();
    injectNavbarLinks();
    
    // === Helper: Generate HTML from CONFIG (if needed) ===
    // We'll leave the HTML generation to the HTML file, but we can use CONFIG to fill in dynamic content.
    // For simplicity, we assume the HTML is static and we just update certain parts via JS.
    // Example: updating the venue if it's set
    const updateVenueDisplay = () => {
        const venueBadge = document.getElementById('hero-venue');
        if (venueBadge) {
            if (CONFIG.event.venue && CONFIG.event.venue !== 'To be announced') {
                venueBadge.textContent = CONFIG.event.venue;
                venueBadge.classList.remove('venue-tba');
            } else {
                venueBadge.textContent = 'TBA';
                venueBadge.classList.add('venue-tba');
            }
        }
        
        // Also update venue in details section if it exists
        const detailsVenueBadge = document.getElementById('details-venue');
        if (detailsVenueBadge) {
            if (CONFIG.event.venue && CONFIG.event.venue !== 'To be announced') {
                detailsVenueBadge.textContent = CONFIG.event.venue;
                detailsVenueBadge.classList.remove('venue-tba');
            } else {
                detailsVenueBadge.textContent = 'TBA';
                detailsVenueBadge.classList.add('venue-tba');
            }
        }
    };
    
    // Inject navbar links from CONFIG
    function injectNavbarLinks() {
        const navbarLinks = document.querySelector('.navbar__links');
        if (!navbarLinks) return;
        
        navbarLinks.innerHTML = CONFIG.navLinks.map(link => `
            <li>
                <a href="${link.href}">
                    ${link.text}
                    ${link.id === 'details' ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0.5L11.5 6L6 11.5L0.5 6Z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>' : ''}
                </a>
            </li>
        `).join('');
    }
    
    updateVenueDisplay();
});

// Utility: Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}