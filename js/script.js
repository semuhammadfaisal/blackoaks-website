document.addEventListener('DOMContentLoaded', () => {
    // Swiper Initialization
    const swiper = new Swiper('.home-slider', {
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

    // AOS Initialization
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
    });

    // Navbar Toggle
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');
    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            menuBtn.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        });
    }

    // Search Form Toggle
    const searchBtn = document.querySelector('#search-btn');
    const searchForm = document.querySelector('.search-form');
    if (searchBtn && searchForm) {
        searchBtn.addEventListener('click', () => {
            searchForm.classList.toggle('active');
        });
    }

    // Notification Logic
    const notificationBtn = document.querySelector('#notification-btn');
    const notificationSection = document.querySelector('#recent-notification');
    const notificationBoxes = document.querySelectorAll('.recent-notification .box');
    const currentDate = new Date('2025-04-23'); // Current date as per context

    if (notificationBtn && notificationSection) {
        // Scroll to notification section on click
        notificationBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            notificationSection.scrollIntoView({ behavior: 'smooth' });
        });

        // Check notifications for red dot and near-expiring dates
        let hasNewNotifications = false;
        notificationBoxes.forEach(box => {
            const issueDateStr = box.querySelector('.issue-date').textContent.replace('Issue Date: ', '');
            const expireDateStr = box.querySelector('.expire-date').textContent.replace('Expire Date: ', '');
            const issueDate = new Date(issueDateStr);
            const expireDate = new Date(expireDateStr);

            // Check if issue date is within 30 days for red dot
            const daysSinceIssue = (currentDate - issueDate) / (1000 * 60 * 60 * 24);
            if (daysSinceIssue <= 30 && daysSinceIssue >= 0) {
                hasNewNotifications = true;
            }

            // Check if expire date is within 7 days for blinking effect
            const daysToExpire = (expireDate - currentDate) / (1000 * 60 * 60 * 24);
            if (daysToExpire <= 7 && daysToExpire >= 0) {
                box.querySelector('.expire-date').classList.add('near');
            }
        });

        // Toggle red dot on notification icon
        if (hasNewNotifications) {
            notificationBtn.classList.add('active');
        }
    }

    // Handle Contact Form Submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Contact Form Submitted:', new FormData(contactForm));
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Handle Newsletter Form Submission
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

    // Handle PDF Download Clicks
    const pdfLinks = document.querySelectorAll('.pdf-link');
    pdfLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const pdfTitle = link.parentElement.querySelector('h3').textContent;
            console.log(`PDF Downloaded: ${pdfTitle}`, link.href);
        });
    });

    // Close Navbar and Search Form on Scroll
    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('fa-times');
        if (searchForm) searchForm.classList.remove('active');
    });
});