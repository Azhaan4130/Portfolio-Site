document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.getElementById('cursor');
    const loader = document.getElementById('loader');
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // --- Animated Cursor ---
    document.addEventListener('mousemove', e => {
        cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
    });

    document.querySelectorAll('a, button, .tilt-effect').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover-effect'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover-effect'));
    });

    // --- Page Loader ---
    window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
        
        // --- Hero Text Animation ---
        const heroTitle = document.querySelector('.hero-title');
        const text = "Creative Developer & AI Enthusiast";
        heroTitle.innerHTML = text.split('').map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        
        const chars = heroTitle.querySelectorAll('.char');
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.style.transform = 'translateY(0)';
                char.style.opacity = '1';
            }, 1800 + index * 30);
        });
    });

    // --- Header Scroll Effect ---
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 70) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // --- Hamburger Menu ---
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // --- Advanced Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('section, .project-card, .skill-item, .feature-box').forEach(element => {
        observer.observe(element);
    });

    // --- Vanilla Tilt.js for 3D effect ---
    VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.15
    });
});
