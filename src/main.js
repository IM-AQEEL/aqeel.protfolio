/* -------------------------------------------------------------------
   AQEEL PORTFOLIO - REFINED JS
   ------------------------------------------------------------------- */

// 0. Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrollProgress + '%';
});

// 1. Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// 1.2 Mouse Parallax for Hero
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        heroImg.parentElement.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
}

// 1.1 Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinksMenu = document.getElementById('nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinksMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// 2. Smooth Section Transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 3. Active Link Highlighter
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 4. Custom Cursor Logic
const dot = document.createElement('div');
dot.className = 'cursor-dot';
document.body.appendChild(dot);

const outline = document.createElement('div');
outline.className = 'cursor-outline';
document.body.appendChild(outline);

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
});

// Cursor Hover Effects
const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .bento-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// 5. Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// 6. Contact Form Logic (1000/1000 Reliable Submission)
const contactForm = document.getElementById('portfolio-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const formData = new FormData(contactForm);

        // Feedback: Sending
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        formStatus.textContent = '';

        try {
            // FormSubmit - Reliable for itsaqeelawan@gmail.com
            const response = await fetch('https://formsubmit.co/ajax/itsaqeelawan@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.style.color = '#4ade80';
                formStatus.innerHTML = 'Message sent successfully! <i class="fas fa-check-circle"></i>';
                contactForm.reset();
            } else {
                throw new Error('Need activation');
            }
        } catch (error) {
            // Very first time use: Redirect to FormSubmit's verification page
            formStatus.style.color = '#38bdf8';
            formStatus.textContent = 'Redirecting to secure message gate...';

            setTimeout(() => {
                contactForm.action = "https://formsubmit.co/itsaqeelawan@gmail.com";
                contactForm.method = "POST";
                contactForm.submit();
            }, 1000);
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// 7. Initial Load Animation Support
document.addEventListener('DOMContentLoaded', () => {
    console.log("Muhammad Aqeel Portfolio Ready.");
});
