document.addEventListener('DOMContentLoaded', () => {
    // Navbar toggle
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.header .navbar');
    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        });
    }

    // Search form toggle
    const searchBtn = document.querySelector('#search-btn');
    const searchForm = document.querySelector('.search-form');
    if (searchBtn && searchForm) {
        searchBtn.addEventListener('click', () => {
            searchForm.classList.toggle('active');
        });
    }

    // Login form toggle
    const loginBtn = document.querySelector('#login-btn');
    const loginForm = document.querySelector('.login-form');
    if (loginBtn && loginForm) {
        loginBtn.addEventListener('click', () => {
            loginForm.classList.toggle('active');
        });
    }

    // Contact info toggle
    const closeContactInfo = document.querySelector('#close-contact-info');
    const contactInfo = document.querySelector('.contact-info');
    if (closeContactInfo && contactInfo) {
        closeContactInfo.addEventListener('click', () => {
            contactInfo.classList.remove('active');
        });
    }

    // Handle contact form submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Contact Form Submitted:', new FormData(contactForm));
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Handle newsletter form submission
    const newsletterForm = document.querySelector('#newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[name="email"]').value;
            console.log('Newsletter Subscription:', { email });
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Handle PDF download clicks
    const pdfLinks = document.querySelectorAll('.pdf-link');
    pdfLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const pdfTitle = link.parentElement.querySelector('h3').textContent;
            console.log(`PDF Downloaded: ${pdfTitle}`, link.href);
        });
    });

    // Initialize Swiper
    if (typeof Swiper !== 'undefined') {
        new Swiper('.home-slider', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }

    // Close navbar on scroll
    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('fa-times');
        if (searchForm) searchForm.classList.remove('active');
        if (loginForm) loginForm.classList.remove('active');
        if (contactInfo) contactInfo.classList.remove('active');
    });
});