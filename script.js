document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const body = document.body;

    // Guaranteed to work: Wait for the entire window to be loaded
    window.addEventListener('load', () => {
        // Hide preloader
        preloader.classList.add('loaded');
        body.classList.remove('loading');
        
        // Show main content with a fade-in effect
        mainContent.style.opacity = '1';
        
        // Initialize other scripts after content is visible
        initializeMainScripts();
    });

    function initializeMainScripts() {
        const header = document.querySelector('header');
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        let lastScrollTop = 0;

        // Sticky Header Logic
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            header.classList.toggle('hidden', scrollTop > lastScrollTop && scrollTop > 70);
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        // Hamburger Menu Logic
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

        // Scroll Animation Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a small delay for each item to stagger the animation
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animatable').forEach(element => {
            observer.observe(element);
        });
    }
});
