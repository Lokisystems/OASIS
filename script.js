// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimations();
    initServiceTabs();
    initContactForm();
    initParallaxEffects();
    init3DEffects();
    initLazyLoading();
    initMobileMenu();
    initTypewriterAnimation();
    initHeroSlideshow();
    initScrollWave();
    initMap();
    initProjectsBackground();
    initSiteSearch();
    initDynamicYear();
    initComments();
    initDonations();
});

// Typewriter animation functionality
function initTypewriterAnimation() {
    const titleLines = document.querySelectorAll('.title-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    function resetAndPlayAnimation() {
        // Reset all animations
        titleLines.forEach(line => {
            line.style.animation = 'none';
            line.offsetHeight; // Trigger reflow
        });
        
        if (heroSubtitle) {
            heroSubtitle.style.animation = 'none';
            heroSubtitle.offsetHeight;
        }
        
        if (heroDescription) {
            heroDescription.style.animation = 'none';
            heroDescription.offsetHeight;
        }
        
        if (heroButtons) {
            heroButtons.style.animation = 'none';
            heroButtons.offsetHeight;
        }
        
        // Restart animations
        titleLines.forEach((line, index) => {
            line.style.animation = `typewriter 2s steps(40, end) ${0.5 + (index * 1)}s forwards`;
        });
        
        if (heroSubtitle) {
            heroSubtitle.style.animation = 'fadeIn 1s ease 2.5s forwards';
        }
        
        if (heroDescription) {
            heroDescription.style.animation = 'fadeIn 1s ease 2.7s forwards';
        }
        
        if (heroButtons) {
            heroButtons.style.animation = 'fadeIn 1s ease 2.9s forwards';
        }
    }
    
    // Store the function globally so it can be called from navigation
    window.resetTypewriterAnimation = resetAndPlayAnimation;
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLogo = document.querySelector('.nav-logo');
    const heroSection = document.querySelector('.hero');

    // Navbar scroll effect and home section detection
    let lastScrollTop = 0;
    let animationTriggered = false;
    
    function updateNavbarTransparency(scrollTop) {
        if (!heroSection) return;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        if (scrollTop < (heroBottom - navbarHeight)) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
    }

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateNavbarTransparency(scrollTop);

        // Check if we're back at the top of the page (home section)
        if (scrollTop < 200 && lastScrollTop > 200 && !animationTriggered) {
            // We've scrolled back to the top from below
            setTimeout(() => {
                if (window.resetTypewriterAnimation) {
                    window.resetTypewriterAnimation();
                }
            }, 500);
            animationTriggered = true;
        }
        
        // Reset trigger when scrolling away from top
        if (scrollTop > 200) {
            animationTriggered = false;
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu toggle (click + keyboard + ARIA)
    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        const expanded = isOpen ? 'true' : 'false';
        hamburger.setAttribute('aria-expanded', expanded);

        // Create/remove mobile backdrop and toggle body scroll
        let backdrop = document.getElementById('nav-backdrop');
        if (isOpen) {
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.id = 'nav-backdrop';
                backdrop.className = 'nav-backdrop';
                document.body.appendChild(backdrop);
                backdrop.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('no-scroll');
                    backdrop.remove();
                });
            }
            document.body.classList.add('no-scroll');
        } else {
            if (backdrop) backdrop.remove();
            document.body.classList.remove('no-scroll');
        }
    };
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            const backdrop = document.getElementById('nav-backdrop');
            if (backdrop) backdrop.remove();
            document.body.classList.remove('no-scroll');
        });
    });

    // Logo click handler
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Trigger typewriter animation after scroll
            setTimeout(() => {
                if (window.resetTypewriterAnimation) {
                    window.resetTypewriterAnimation();
                }
            }, 1000);
        });
    }

    // Set initial transparency state
    updateNavbarTransparency(window.pageYOffset || document.documentElement.scrollTop || 0);

    // Active navigation link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // If scrolling to home section, trigger typewriter animation
                if (targetId === '#home' || targetId === '#') {
                    setTimeout(() => {
                        if (window.resetTypewriterAnimation) {
                            window.resetTypewriterAnimation();
                        }
                    }, 1000);
                }
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .blog-card, .project-card, .facility-card, .value-card, .mission, .vision');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Counter animations for impact stats
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    // Start counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const impactStats = document.querySelector('.impact-stats');
    if (impactStats) {
        statsObserver.observe(impactStats);
    }
}

// Service tabs functionality
function initServiceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(`${targetTab}-services`).classList.add('active');
        });
    });
}

// Donations: wire PayPal form helpers
function initDonations() {
    const form = document.getElementById('paypalDonateForm');
    if (!form) return;

    const amountInput = document.getElementById('donation-amount');
    const presetSelect = document.getElementById('donation-preset');
    const currencySelect = document.getElementById('donation-currency');

    if (presetSelect && amountInput) {
        presetSelect.addEventListener('change', () => {
            if (presetSelect.value) {
                amountInput.value = presetSelect.value;
            }
            amountInput.focus();
        });
    }

    if (form && amountInput && currencySelect) {
        form.addEventListener('submit', (e) => {
            const amount = parseFloat(amountInput.value || '0');
            if (!amount || amount <= 0) {
                e.preventDefault();
                showNotification('Please enter a valid donation amount.', 'error');
                amountInput.focus();
                return;
            }
            // Ensure currency hidden field reflects UI selection
            const currencyHidden = form.querySelector('input[name="currency_code"]');
            if (currencyHidden) currencyHidden.value = currencySelect.value || 'USD';
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Send via default mail client
            const subjectLabel = document.querySelector('#subject option:checked') ? document.querySelector('#subject option:checked').textContent : (data.subject || 'General Inquiry');
            const mailSubject = encodeURIComponent(`[Oasis Website] ${subjectLabel} - ${data.name}`);
            const mailBody = encodeURIComponent(
                `You have a new message from the website contact form.\n\n` +
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone || '-'}\n` +
                `Subject: ${subjectLabel}\n\n` +
                `Message:\n${data.message}`
            );
            const mailto = `mailto:lokisystems2025@gmail.com?subject=${mailSubject}&body=${mailBody}`;
            try {
                window.location.href = mailto;
                showNotification('Opening your email app to send the message…', 'success');
            } catch {
                showNotification('Could not open your email app. Please email lokisystems2025@gmail.com directly.', 'error');
            }
            this.reset();
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-particles, .floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 3D effects for cards
function init3DEffects() {
    const cards = document.querySelectorAll('.service-card, .blog-card, .project-card, .facility-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            const backdrop = document.getElementById('nav-backdrop');
            if (backdrop) backdrop.remove();
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            const backdrop = document.getElementById('nav-backdrop');
            if (backdrop) backdrop.remove();
            document.body.classList.remove('no-scroll');
        }
    });
}

// Blog pagination functionality
function initBlogPagination() {
    const blogSection = document.querySelector('#blog');
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    const allCards = Array.from(blogGrid.querySelectorAll('.blog-card'));
    const numberedButtons = Array.from(document.querySelectorAll('.pagination-btn:not(.next)'));
    const nextButton = document.querySelector('.pagination-btn.next');

    // Derive a page size that spreads current cards across exactly 3 pages
    const totalPages = Math.max(1, numberedButtons.length);
    const pageSize = Math.ceil(allCards.length / totalPages);

    let currentPage = 0; // zero-based index

    function updateActiveButton() {
        numberedButtons.forEach((btn, idx) => {
            if (idx === currentPage) {
                btn.classList.add('active');
                btn.setAttribute('aria-current', 'page');
            } else {
                btn.classList.remove('active');
                btn.removeAttribute('aria-current');
            }
        });

        if (nextButton) {
            const isLast = currentPage >= totalPages - 1;
            nextButton.disabled = isLast;
            nextButton.setAttribute('aria-disabled', String(isLast));
        }
    }

    function showPage(pageIndex, shouldScroll = true) {
        currentPage = Math.min(Math.max(0, pageIndex), totalPages - 1);

        const start = currentPage * pageSize;
        const end = start + pageSize;

        allCards.forEach((card, idx) => {
            card.style.display = (idx >= start && idx < end) ? '' : 'none';
        });

        updateActiveButton();

        // Smooth scroll to the top of blog section for better UX (only on user interaction)
        if (shouldScroll && blogSection) {
            const offsetTop = blogSection.offsetTop - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }

    // Bind numbered buttons (1, 2, 3)
    numberedButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            showPage(idx, true);
        });
    });

    // Bind Next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                showPage(currentPage + 1, true);
            }
        });
    }

    // Initialize to first page without forcing a scroll on initial load
    showPage(0, false);
}

// Initialize blog pagination
document.addEventListener('DOMContentLoaded', initBlogPagination);
// Footer dynamic year
function initDynamicYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Site-wide search
function initSiteSearch() {
    const input = document.getElementById('site-search');
    const button = document.getElementById('site-search-btn');
    const results = document.getElementById('search-results');
    if (!input || !button || !results) return;

    // Minimal styles injection to avoid CSS file edits
    const css = `
        .nav-search { display: flex; align-items: center; gap: 8px; margin-left: 16px; position: relative; }
        .nav-search input { padding: 6px 10px; border-radius: 6px; border: 1px solid #ccc; width: 180px; }
        .nav-search button { background: var(--primary-color, #4CAF50); color: #fff; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; }
        .search-results { position: absolute; top: 110%; right: 0; left: 0; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); max-height: 320px; overflow: auto; z-index: 2000; }
        .search-result-item { padding: 10px 12px; cursor: pointer; display: flex; gap: 8px; align-items: flex-start; }
        .search-result-item:hover, .search-result-item[aria-selected="true"] { background: #f3f4f6; }
        .search-result-title { font-weight: 600; margin: 0; }
        .search-result-snippet { margin: 2px 0 0; color: #4b5563; font-size: 0.9rem; }
        @media (max-width: 768px) { .nav-search { display:none; } }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Build an index from visible text content
    function buildIndex() {
        const index = [];
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const id = section.id || '';
            const titleEl = section.querySelector('h2, h1, .section-title, h3');
            const title = titleEl ? titleEl.textContent.trim() : id || 'Section';
            const text = section.textContent.replace(/\s+/g, ' ').trim();
            index.push({ id, title, text, element: section });
        });
        // Also index nav labels and footer basics
        const extra = document.querySelector('footer');
        if (extra) {
            index.push({ id: 'footer', title: 'Contact & Info', text: extra.textContent.replace(/\s+/g, ' ').trim(), element: extra });
        }
        return index;
    }

    const index = buildIndex();

    function search(query) {
        if (!query) return [];
        const q = query.trim().toLowerCase();
        const tokens = q.split(/\s+/).filter(Boolean);
        const results = [];
        for (const item of index) {
            let score = 0;
            const hay = item.text.toLowerCase();
            const inTitle = (item.title || '').toLowerCase();
            for (const tok of tokens) {
                if (inTitle.includes(tok)) score += 5;
                const matches = hay.split(tok).length - 1;
                score += Math.min(matches, 5);
            }
            if (score > 0) {
                // build snippet around first token occurrence
                const firstTok = tokens[0];
                const idx = hay.indexOf(firstTok);
                let snippet = '';
                if (idx !== -1) {
                    const start = Math.max(0, idx - 60);
                    const end = Math.min(hay.length, idx + 120);
                    snippet = item.text.substring(start, end);
                } else {
                    snippet = item.text.substring(0, 160);
                }
                results.push({ id: item.id, title: item.title, snippet, score, element: item.element });
            }
        }
        return results.sort((a, b) => b.score - a.score).slice(0, 8);
    }

    function renderResults(items) {
        results.innerHTML = '';
        if (!items.length) {
            results.hidden = true;
            return;
        }
        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.setAttribute('role', 'option');
            div.setAttribute('data-target-id', item.id);
            div.setAttribute('tabindex', '-1');
            div.innerHTML = `
                <div>
                    <p class="search-result-title">${item.title}</p>
                    <p class="search-result-snippet">${item.snippet.replace(/</g, '&lt;')}</p>
                </div>
            `;
            div.addEventListener('click', () => goTo(item));
            results.appendChild(div);
        });
        results.hidden = false;
        activeIndex = -1;
    }

    function goTo(item) {
        results.hidden = true;
        input.blur();
        if (item.element && item.element.scrollIntoView) {
            const y = (item.element.getBoundingClientRect().top + window.pageYOffset) - 70;
            window.scrollTo({ top: y, behavior: 'smooth' });
        } else if (item.id) {
            location.hash = `#${item.id}`;
        }
    }

    let lastTerm = '';
    let activeIndex = -1;
    let currentItems = [];

    function runSearch() {
        const term = input.value.trim();
        if (term === lastTerm) return;
        lastTerm = term;
        currentItems = search(term);
        renderResults(currentItems);
    }

    input.addEventListener('input', debounce(runSearch, 150));
    button.addEventListener('click', () => { currentItems = search(input.value); renderResults(currentItems); });

    input.addEventListener('keydown', (e) => {
        const items = Array.from(results.querySelectorAll('.search-result-item'));
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!items.length) return;
            activeIndex = (activeIndex + 1) % items.length;
            updateActive(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!items.length) return;
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateActive(items);
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0 && currentItems[activeIndex]) {
                goTo(currentItems[activeIndex]);
            } else if (input.value.trim()) {
                currentItems = search(input.value);
                renderResults(currentItems);
            }
        } else if (e.key === 'Escape') {
            results.hidden = true;
        }
    });

    function updateActive(items) {
        items.forEach((el, i) => {
            if (i === activeIndex) {
                el.setAttribute('aria-selected', 'true');
                el.scrollIntoView({ block: 'nearest' });
            } else {
                el.removeAttribute('aria-selected');
            }
        });
    }

    // Close results on outside click
    document.addEventListener('click', (e) => {
        const container = document.getElementById('nav-search');
        if (container && !container.contains(e.target)) {
            results.hidden = true;
        }
    });

    // Read ?q= param and pre-run search
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');
    if (qParam) {
        input.value = qParam;
        currentItems = search(qParam);
        renderResults(currentItems);
    }

    // Update URL param on explicit search
    const updateUrlWithQuery = (q) => {
        const url = new URL(window.location.href);
        if (q) {
            url.searchParams.set('q', q);
        } else {
            url.searchParams.delete('q');
        }
        window.history.replaceState({}, '', url.toString());
    };

    button.addEventListener('click', () => updateUrlWithQuery(input.value.trim()));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            updateUrlWithQuery(input.value.trim());
        }
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const navbar = document.getElementById('navbar');
    
    if (scrolled > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading class to elements
    const loadingElements = document.querySelectorAll('.service-card, .blog-card, .project-card, .facility-card');
    loadingElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 100);
    });
});

// Simple interactive comments system (per-post, localStorage backed)
function initComments() {
    const commentsSection = document.getElementById('comments');
    if (!commentsSection) return;

    // Minimal styles to match existing UI without editing CSS file
    (function injectCommentStyles(){
        const css = `
            #comments { margin-top: 2rem; }
            #comments .comments-stats { display: flex; gap: 1rem; color: #6b7280; margin-bottom: 1rem; font-size: 0.95rem; }
            #comments .comment-form { display: grid; gap: 0.75rem; margin-bottom: 1rem; }
            #comments .comment-form .form-row { display: grid; gap: 0.5rem; }
            #comments .comment-form input, #comments .comment-form textarea { width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: inherit; }
            #comments .comments-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.75rem; }
            .comment-item { border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.9rem; background: #fff; }
            .comment-header { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.5rem; }
            .comment-author { font-weight: 600; }
            .comment-meta { color: #6b7280; font-size: 0.85rem; display: flex; gap: 0.5rem; align-items: center; }
            .comment-actions { display: flex; gap: 0.75rem; align-items: center; }
            .comment-like { background: none; border: none; cursor: pointer; color: #ef4444; display: inline-flex; align-items: center; gap: 0.35rem; }
            .comment-like[aria-pressed="true"] { color: #dc2626; font-weight: 600; }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    })();

    // Ensure spacebar works inside inputs/textareas even if other handlers listen for space
    document.addEventListener('keydown', (e) => {
        const el = e.target;
        const isFormField = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
        if (isFormField && e.key === ' ') {
            e.stopPropagation();
        }
    }, true);

    // Helpers
    const viewsEl = document.getElementById('post-views');
    const countEl = document.getElementById('comments-count');
    const listEl = document.getElementById('comments-list');
    const formEl = document.getElementById('comment-form');
    const nameEl = document.getElementById('comment-name');
    const textEl = document.getElementById('comment-text');

    // Derive a storage key from pathname so comments are per-post
    const storageKey = `oasis-comments:${location.pathname}`;
    const viewsKey = `oasis-views:${location.pathname}`;

    function loadState() {
        try {
            const raw = localStorage.getItem(storageKey);
            const state = raw ? JSON.parse(raw) : { comments: [] };
            if (!Array.isArray(state.comments)) state.comments = [];
            return state;
        } catch { return { comments: [] }; }
    }

    function saveState(state) {
        localStorage.setItem(storageKey, JSON.stringify(state));
    }

    function humanTime(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}d ago`;
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    }

    function render(state) {
        // counts
        countEl.textContent = `${state.comments.length} ${state.comments.length === 1 ? 'comment' : 'comments'}`;
        listEl.innerHTML = '';
        state.comments
            .sort((a, b) => b.createdAt - a.createdAt)
            .forEach((c, index) => {
                const li = document.createElement('li');
                li.className = 'comment-item';
                li.setAttribute('data-id', c.id);
                // Ensure defaults
                c.likes = c.likes || 0;
                c.liked = !!c.liked;
                c.loves = c.loves || 0;
                c.loved = !!c.loved;
                c.replies = Array.isArray(c.replies) ? c.replies : [];

                li.innerHTML = `
                    <div class="comment-header">
                        <div class="comment-author">${escapeHtml(c.name)}</div>
                        <div class="comment-meta">
                            <span class="comment-time" title="${new Date(c.createdAt).toLocaleString()}">${humanTime(c.createdAt)}</span>
                        </div>
                    </div>
                    <div class="comment-body">${escapeHtml(c.text)}</div>
                    <div class="comment-actions">
                        <button type="button" class="comment-react like" aria-pressed="${c.liked ? 'true' : 'false'}" aria-label="Like">
                            <i class="fas fa-thumbs-up"></i>
                            <span class="like-count">${c.likes}</span>
                        </button>
                        <button type="button" class="comment-react love" aria-pressed="${c.loved ? 'true' : 'false'}" aria-label="Love">
                            <i class="fas fa-heart"></i>
                            <span class="love-count">${c.loves}</span>
                        </button>
                        <button type="button" class="comment-reply-toggle" aria-expanded="false">Reply</button>
                    </div>
                    <form class="reply-form" hidden>
                        <div class="form-row">
                            <label for="reply-name-${c.id}">Name</label>
                            <input type="text" id="reply-name-${c.id}" name="name" placeholder="Your name">
                        </div>
                        <div class="form-row">
                            <label for="reply-text-${c.id}">Reply</label>
                            <textarea id="reply-text-${c.id}" name="comment" placeholder="Write a reply..." rows="2" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-secondary" style="padding:8px 14px;">Post Reply</button>
                    </form>
                    <ul class="replies-list"></ul>
                `;

                // Reaction toggles
                const likeBtn = li.querySelector('.comment-react.like');
                const loveBtn = li.querySelector('.comment-react.love');
                const likeCountEl = li.querySelector('.like-count');
                const loveCountEl = li.querySelector('.love-count');
                likeBtn.addEventListener('click', () => {
                    c.liked = !c.liked;
                    c.likes = Math.max(0, c.likes + (c.liked ? 1 : -1));
                    likeBtn.setAttribute('aria-pressed', c.liked ? 'true' : 'false');
                    likeCountEl.textContent = String(c.likes);
                    saveState(state);
                });
                loveBtn.addEventListener('click', () => {
                    c.loved = !c.loved;
                    c.loves = Math.max(0, c.loves + (c.loved ? 1 : -1));
                    loveBtn.setAttribute('aria-pressed', c.loved ? 'true' : 'false');
                    loveCountEl.textContent = String(c.loves);
                    saveState(state);
                });

                // Reply toggle and submit
                const toggleBtn = li.querySelector('.comment-reply-toggle');
                const replyForm = li.querySelector('.reply-form');
                toggleBtn.addEventListener('click', () => {
                    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                    toggleBtn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                    replyForm.hidden = expanded;
                });
                replyForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const nameInput = replyForm.querySelector('input[name="name"]');
                    const textInput = replyForm.querySelector('textarea[name="comment"]');
                    const rName = (nameInput.value || '').trim() || 'Anonymous';
                    const rText = (textInput.value || '').trim();
                    if (!rText) return;
                    c.replies.push({
                        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                        name: rName,
                        text: rText,
                        createdAt: Date.now(),
                        likes: 0,
                        liked: false,
                        loves: 0,
                        loved: false
                    });
                    saveState(state);
                    textInput.value = '';
                    replyForm.hidden = true;
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    // Re-render to show new reply
                    render(state);
                });

                // Render replies
                const repliesList = li.querySelector('.replies-list');
                c.replies
                    .sort((a, b) => a.createdAt - b.createdAt)
                    .forEach(r => {
                        const rLi = document.createElement('li');
                        rLi.className = 'reply-item';
                        rLi.setAttribute('data-id', r.id);
                        r.likes = r.likes || 0;
                        r.liked = !!r.liked;
                        r.loves = r.loves || 0;
                        r.loved = !!r.loved;
                        rLi.innerHTML = `
                            <div class="reply-header">
                                <span class="reply-author">${escapeHtml(r.name)}</span>
                                <span class="reply-time" title="${new Date(r.createdAt).toLocaleString()}">${humanTime(r.createdAt)}</span>
                            </div>
                            <div class="reply-body">${escapeHtml(r.text)}</div>
                            <div class="reply-actions">
                                <button type="button" class="comment-react like" aria-pressed="${r.liked ? 'true' : 'false'}" aria-label="Like reply">
                                    <i class="fas fa-thumbs-up"></i>
                                    <span class="like-count">${r.likes}</span>
                                </button>
                                <button type="button" class="comment-react love" aria-pressed="${r.loved ? 'true' : 'false'}" aria-label="Love reply">
                                    <i class="fas fa-heart"></i>
                                    <span class="love-count">${r.loves}</span>
                                </button>
                            </div>
                        `;
                        const rLikeBtn = rLi.querySelector('.comment-react.like');
                        const rLoveBtn = rLi.querySelector('.comment-react.love');
                        const rLikeCount = rLi.querySelector('.like-count');
                        const rLoveCount = rLi.querySelector('.love-count');
                        rLikeBtn.addEventListener('click', () => {
                            r.liked = !r.liked;
                            r.likes = Math.max(0, r.likes + (r.liked ? 1 : -1));
                            rLikeBtn.setAttribute('aria-pressed', r.liked ? 'true' : 'false');
                            rLikeCount.textContent = String(r.likes);
                            saveState(state);
                        });
                        rLoveBtn.addEventListener('click', () => {
                            r.loved = !r.loved;
                            r.loves = Math.max(0, r.loves + (r.loved ? 1 : -1));
                            rLoveBtn.setAttribute('aria-pressed', r.loved ? 'true' : 'false');
                            rLoveCount.textContent = String(r.loves);
                            saveState(state);
                        });
                        repliesList.appendChild(rLi);
                    });

                listEl.appendChild(li);
            });
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Views counter (increments once per session)
    (function trackViews(){
        try {
            const today = new Date().toDateString();
            const last = sessionStorage.getItem(viewsKey);
            const total = parseInt(localStorage.getItem(viewsKey) || '0', 10);
            const nextTotal = last === today ? total : total + 1;
            localStorage.setItem(viewsKey, String(nextTotal));
            sessionStorage.setItem(viewsKey, today);
            if (viewsEl) viewsEl.textContent = `${nextTotal} ${nextTotal === 1 ? 'view' : 'views'}`;
        } catch {
            if (viewsEl) viewsEl.textContent = '— views';
        }
    })();

    // Load and render initial state
    const state = loadState();
    render(state);

    // Handle submit
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameEl.value.trim() || 'Anonymous';
        const text = textEl.value.trim();
        if (!text) return;
        const newComment = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name,
            text,
            createdAt: Date.now(),
            likes: 0,
            liked: false,
            loves: 0,
            loved: false,
            replies: []
        };
        state.comments.push(newComment);
        saveState(state);
        textEl.value = '';
        render(state);
        showNotification('Comment posted!', 'success');
    });
}

// Map initialization (Leaflet)
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || typeof L === 'undefined') return;
    
    // Approximate coordinates for Bulapesa, Isiolo, Kenya
    const center = [0.3566, 37.5822];
    const map = L.map('map', { scrollWheelZoom: false }).setView(center, 14);

    // Base layers
    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    });

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);

    // Custom layer toggle control
    const LayerToggle = L.Control.extend({
        options: { position: 'topright' },
        onAdd: function() {
            const container = L.DomUtil.create('div', 'map-layer-toggle');
            container.setAttribute('role', 'group');
            container.setAttribute('aria-label', 'Map layer toggle');

            const streetBtn = L.DomUtil.create('button', 'toggle-btn', container);
            streetBtn.type = 'button';
            streetBtn.title = 'Switch to Street view';
            streetBtn.innerHTML = '<i class="fas fa-road"></i><span>Street</span>';

            const satBtn = L.DomUtil.create('button', 'toggle-btn active', container);
            satBtn.type = 'button';
            satBtn.title = 'Switch to Satellite view';
            satBtn.innerHTML = '<i class="fas fa-globe"></i><span>Satellite</span>';

            // Prevent map interactions when using the control
            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.disableScrollPropagation(container);

            function activateStreet() {
                if (!map.hasLayer(streets)) streets.addTo(map);
                if (map.hasLayer(satellite)) map.removeLayer(satellite);
                streetBtn.classList.add('active');
                satBtn.classList.remove('active');
            }

            function activateSatellite() {
                if (!map.hasLayer(satellite)) satellite.addTo(map);
                if (map.hasLayer(streets)) map.removeLayer(streets);
                satBtn.classList.add('active');
                streetBtn.classList.remove('active');
            }

            streetBtn.addEventListener('click', activateStreet);
            satBtn.addEventListener('click', activateSatellite);

            // Keyboard support
            streetBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateStreet(); } });
            satBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateSatellite(); } });

            return container;
        }
    });

    map.addControl(new LayerToggle());

    // Marker and popup with directions link
    const marker = L.marker(center).addTo(map);
    const plusCode = '8HXF+634, Isiolo';
    const gmapsUrl = 'https://www.google.com/maps/search/?api=1&query=8HXF%2B634%2C%20Isiolo';
    marker.bindPopup(
        `<b>Oasis of Hope Initiatives</b><br>${plusCode}<br>` +
        `<a href="${gmapsUrl}" target="_blank" rel="noopener">Open in Google Maps</a>`
    ).openPopup();
    
    // Improve responsiveness when the section becomes visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => map.invalidateSize(), 100);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(mapContainer);
}

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.service-card, .blog-card, .project-card');
    
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid var(--primary-color)';
            el.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', () => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Add CSS for loading animations
const loadingStyles = `
    .service-card,
    .blog-card,
    .project-card,
    .facility-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .service-card.loaded,
    .blog-card.loaded,
    .project-card.loaded,
    .facility-card.loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Add smooth reveal animation for sections
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialize section reveal
document.addEventListener('DOMContentLoaded', initSectionReveal);

// Hero background slideshow
function initHeroSlideshow() {
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-background');
    if (!heroSection || !heroBg) return;

    // Images to cycle through - update paths as needed
    const slides = [
        'images/slideshow/borehole.jpg',
        'images/slideshow/childrenmedicalcamp.jpg',
        'images/slideshow/DSC_0309.JPG',
        'images/slideshow/DSC_0315.JPG',
        'images/slideshow/DSC_0322.JPG',
        'images/slideshow/DSC_0329.JPG',
        'images/slideshow/DSC_0336.JPG',
        'images/slideshow/DSC_0339.JPG',
        'images/slideshow/DSC_0346.JPG',
        'images/slideshow/DSC_0351.JPG',
        'images/slideshow/DSC_0355.JPG',
        'images/slideshow/DSC_0371.JPG',
        'images/slideshow/DSC_0374.JPG',
        'images/slideshow/DSC_0382.JPG',
        'images/slideshow/DSC_0390.JPG',
        'images/slideshow/DSC_0399.JPG',
        'images/slideshow/DSC_0402.JPG',
        'images/slideshow/DSC_0410.JPG',
        'images/slideshow/DSC_0413.JPG',
        'images/slideshow/DSC_0415.JPG',
        'images/slideshow/DSC_0417.JPG',
        'images/slideshow/DSC_0423.JPG',
        'images/slideshow/DSC_0433.JPG',
        'images/slideshow/DSC_0454.JPG',
        'images/slideshow/DSC_0471.JPG',
        'images/slideshow/DSC_0478.JPG',
        'images/slideshow/DSC_0483.JPG',
        'images/slideshow/DSC_0489.JPG',
        'images/slideshow/DSC_0496.JPG',
        'images/slideshow/DSC_0510.JPG',
        'images/slideshow/DSC_0519.JPG',
        'images/slideshow/DSC_0524.JPG',
        'images/slideshow/DSC_0536.JPG',
        'images/slideshow/DSC_0544.JPG',
        'images/slideshow/DSC_0560.JPG',
        'images/slideshow/DSC_0570.JPG',
        'images/slideshow/DSC_0591.JPG',
        'images/slideshow/DSC_0596.JPG',
        'images/slideshow/DSC_0636.JPG',
        'images/slideshow/DSC_0640.JPG',
        'images/slideshow/DSC_0649.JPG',
        'images/slideshow/DSC_0659.JPG',
        'images/slideshow/DSC_0679.JPG',
        'images/slideshow/DSC_0682.JPG',
        'images/slideshow/DSC_0683.JPG',
        'images/slideshow/DSC_0690.JPG',
        'images/slideshow/DSC_0693.JPG',
        'images/slideshow/DSC_0696.JPG',
        'images/slideshow/DSC_0699.JPG',
        'images/slideshow/DSC_0701.JPG',
        'images/slideshow/DSC_0703.JPG',
        'images/slideshow/DSC_0711.JPG',
        'images/slideshow/empowerment.jpg',
        'images/slideshow/graduation.jpg',
        'images/slideshow/grouplaunch.jpg',
        'images/slideshow/heartscreening.jpg',
        'images/slideshow/homevist.jpg',
        'images/slideshow/maternity.jpg',
        'images/slideshow/medicalcamp.jpg',
        'images/slideshow/tank.jpg',
        'images/slideshow/water.jpg',
        'images/slideshow/waterproject.jpg',
        'images/slideshow/womengraduation.jpg',
        'images/slideshow/youths.jpg',
        'images/slideshow/youthtraining.jpg'
    ];
    if (!slides.length) return;

    // Inject CSS for layering and fade effect
    const slideshowStyles = `
        .hero { position: relative; overflow: hidden; }
        .hero-background { position: absolute; inset: 0; }
        .hero-slides { position: absolute; inset: 0; z-index: 0; }
        .hero-slide { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; transition: opacity 1.2s ease; }
        .hero-slide.active { opacity: 1; }
        .hero-overlay { position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)); }
        .hero-content { position: relative; z-index: 1; }
        .hero-3d-element { position: relative; z-index: 1; }
    `;
    const slideshowStyleEl = document.createElement('style');
    slideshowStyleEl.textContent = slideshowStyles;
    document.head.appendChild(slideshowStyleEl);

    // Build slides container
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'hero-slides';
    heroBg.appendChild(slidesContainer);

    // Add gradient overlay above slides
    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    heroBg.appendChild(overlay);

    // Create slide elements
    const slideEls = slides.map((src, index) => {
        const el = document.createElement('div');
        el.className = 'hero-slide' + (index === 0 ? ' active' : '');
        el.style.backgroundImage = `url("${src}")`;
        slidesContainer.appendChild(el);
        return el;
    });

    // Cycle slides
    let currentIndex = 0;
    const intervalMs = 5000;
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % slideEls.length;
        slideEls[currentIndex].classList.remove('active');
        slideEls[nextIndex].classList.add('active');
        currentIndex = nextIndex;
    }, intervalMs);
}

// Add floating action button for quick navigation
function createFloatingActionButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-button';
    fab.innerHTML = `
        <button class="fab-button" aria-label="Back to top">
            <i class="fas fa-arrow-up"></i>
        </button>
    `;
    
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;
    
    const fabButton = fab.querySelector('.fab-button');
    fabButton.style.cssText = `
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-primary);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    
    fabButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    fabButton.addEventListener('mouseenter', () => {
        fabButton.style.transform = 'scale(1.1)';
    });
    
    fabButton.addEventListener('mouseleave', () => {
        fabButton.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(fab);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            fab.style.opacity = '1';
            fab.style.transform = 'translateY(0)';
        } else {
            fab.style.opacity = '0';
            fab.style.transform = 'translateY(20px)';
        }
    });
}

// Create floating action button
document.addEventListener('DOMContentLoaded', createFloatingActionButton);

// Add preloader
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
            
            </div>
            <div class="preloader-text">Oasis of Hope Initiatives</div>
            <div class="preloader-spinner"></div>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const preloaderContent = preloader.querySelector('.preloader-content');
    preloaderContent.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    const preloaderLogo = preloader.querySelector('.preloader-logo');
    preloaderLogo.style.cssText = `
        margin-bottom: 1rem;
    `;
    
    const preloaderLogoImg = preloaderLogo.querySelector('img');
    preloaderLogoImg.style.cssText = `
        width: 60px;
        height: 60px;
        border-radius: 50%;
        animation: pulse 2s infinite;
    `;
    
    const preloaderText = preloader.querySelector('.preloader-text');
    preloaderText.style.cssText = `
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 2rem;
        opacity: 0;
        animation: fadeIn 1s ease 0.5s forwards;
    `;
    
    const preloaderSpinner = preloader.querySelector('.preloader-spinner');
    preloaderSpinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    `;
    
    // Add spinner and pulse animations
    const spinnerStyles = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    
    const spinnerStyleSheet = document.createElement('style');
    spinnerStyleSheet.textContent = spinnerStyles;
    document.head.appendChild(spinnerStyleSheet);
    
    document.body.appendChild(preloader);
    
    // Remove preloader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Create preloader
document.addEventListener('DOMContentLoaded', createPreloader);

// Export functions for potential external use
window.OasisWebsite = {
    showNotification,
    initNavigation,
    initSmoothScrolling,
    initScrollAnimations,
    initCounterAnimations,
    initServiceTabs,
    initContactForm
};

// Layered, fading, procedurally generated background for Projects section
function initProjectsBackground() {
    const projectsSection = document.getElementById('projects');
    const bgContainer = document.getElementById('background-container');
    const bg1 = document.getElementById('background-1');
    const bg2 = document.getElementById('background-2');
    if (!projectsSection || !bgContainer || !bg1 || !bg2 || typeof Trianglify === 'undefined' || typeof window.jQuery === 'undefined' || typeof window.Velocity === 'undefined') {
        return;
    }

    // Ensure container covers the section
    const ensureSizing = () => {
        const rect = projectsSection.getBoundingClientRect();
        const width = rect.width || projectsSection.offsetWidth;
        const height = Math.max(projectsSection.offsetHeight, window.innerHeight * 0.8);
        bgContainer.style.position = 'absolute';
        bgContainer.style.inset = '0';
        bgContainer.style.zIndex = '0';
        bg1.style.position = 'absolute';
        bg1.style.top = '0';
        bg1.style.left = '0';
        bg1.style.right = '0';
        bg1.style.bottom = '0';
        bg2.style.position = 'absolute';
        bg2.style.top = '0';
        bg2.style.left = '0';
        bg2.style.right = '0';
        bg2.style.bottom = '0';
        bg1.style.opacity = '0.5';
        bg2.style.opacity = '1';
        bg1.style.zIndex = '1';
        bg2.style.zIndex = '0';
        // also set min sizes to support jQuery-based code expectations
        $('#background-container, #background-1, #background-2').css({
            'min-width': width,
            'min-height': height
        });
    };

    // State per original snippet
    let draw = 1;
    const t = new Trianglify({ noiseIntensity: 0 });

    function generatePattern() {
        const width = projectsSection.offsetWidth;
        const height = Math.max(projectsSection.offsetHeight, window.innerHeight * 0.8);
        return t.generate(width, height);
    }

    function drawTo(bgEl, fadeInTarget, fadeOutTarget) {
        const pattern = generatePattern();
        bgEl.style.backgroundImage = `url(${pattern.toCanvas ? pattern.png() : pattern.dataUrl})`;
        // Velocity fades
        $(fadeInTarget).velocity('fadeIn', { duration: 3000 });
        $(fadeOutTarget).velocity('fadeOut', { duration: 4000 });
    }

    function cycle() {
        if (draw === 1) {
            draw = 2;
            drawTo(bg1, '.background-1', '.background-2');
        } else {
            draw = 1;
            drawTo(bg2, '.background-2', '.background-1');
        }
    }

    // Initial setup
    ensureSizing();
    // Produce first two layers so fades work immediately
    drawTo(bg1, '.background-1', '.background-2');
    setTimeout(() => drawTo(bg2, '.background-2', '.background-1'), 100);

    // Cycle every 5s
    const intervalId = window.setInterval(() => {
        // redraw for current size before applying
        ensureSizing();
        cycle();
    }, 5000);

    // Handle resize
    window.addEventListener('resize', () => {
        ensureSizing();
        // Redraw both layers to match new size
        const pattern = generatePattern();
        $('#background-1, #background-2').css({
            'background-image': `url(${pattern.toCanvas ? pattern.png() : pattern.dataUrl})`
        });
    });

    // Clean up if needed (SPA scenarios); no-op for static page
}

// Scroll-driven SVG wave under hero
function initScrollWave() {
    const curvePath = document.getElementById('curve');
    if (!curvePath) return;

    // Inject minimal styles equivalent to the provided CSS
    const css = `
        .svg-container { position: absolute; top: 0; right: 0; left: 0; z-index: -1; }
        .hero { position: relative; }
        .hero svg path { transition: .1s; }
    `;
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    let lastKnownY = 0;
    const defaultCurveValue = 350; // matches initial d (Q 400 350)
    const curveRate = 3;
    let ticking = false;

    function updateCurve(scrollY) {
        if (scrollY >= 0 && scrollY < defaultCurveValue) {
            const curveValue = defaultCurveValue - (scrollY / curveRate);
            curvePath.setAttribute(
                'd',
                `M 800 300 Q 400 ${curveValue} 0 300 L 0 0 L 800 0 L 800 300 Z`
            );
        }
    }

    window.addEventListener('scroll', () => {
        lastKnownY = window.scrollY || window.pageYOffset || 0;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateCurve(lastKnownY);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial paint
    updateCurve(window.scrollY || 0);
}
