// Header Interactions
const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector('.navbar');
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('.search-form');
const loginBtn = document.querySelector('#login-btn');
const loginForm = document.querySelector('.login-form');
const closeContactInfo = document.querySelector('#close-contact-info');
const contactInfo = document.querySelector('.contact-info');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    menuBtn.classList.toggle('fa-times');
});

searchBtn.addEventListener('click', () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
    menuBtn.classList.remove('fa-times');
});

loginBtn.addEventListener('click', () => {
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    menuBtn.classList.remove('fa-times');
});

closeContactInfo.addEventListener('click', () => {
    contactInfo.classList.remove('active');
});

// Auto-close menu on link click
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuBtn.classList.remove('fa-times');
    });
});

// Close menu/form on click outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        navbar.classList.remove('active');
        menuBtn.classList.remove('fa-times');
    }
    if (!searchForm.contains(e.target) && !searchBtn.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (!loginForm.contains(e.target) && !loginBtn.contains(e.target)) {
        loginForm.classList.remove('active');
    }
});

// Enable keyboard navigation
[menuBtn, searchBtn, loginBtn, closeContactInfo].forEach(btn => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Home Slider
let swiper = new Swiper(".home-slider", {
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    a11y: {
        enabled: true,
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        paginationBulletMessage: "Go to slide {{index}}",
    },
});

// Contact Form Validation
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (name && email && message) {
        alert('Message sent successfully! We will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});