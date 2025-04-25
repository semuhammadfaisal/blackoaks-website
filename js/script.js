document.addEventListener('DOMContentLoaded', () => {
    // === Swiper Initialization ===
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

    // === AOS Initialization ===
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
    });

    // === Navbar Toggle ===
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

    // === Search Form Toggle ===
    const searchBtn = document.querySelector('#search-btn');
    const searchForm = document.querySelector('.search-form');
    if (searchBtn && searchForm) {
        searchBtn.addEventListener('click', () => {
            searchForm.classList.toggle('active');
        });
    }

    // === Achievement Box Counting Logic ===
    const achievementsSection = document.querySelector('.about .achievements');
    let hasCounted = false;

    // Define achievement data
    const achievementsData = [
        { target: 15, label: 'Years of Experience' },
        { target: 500, label: 'Properties Sold' },
        { target: 10000, label: 'Community Members' },
        { target: 25, label: 'Awards Won' }
    ];

    // Function to animate counting
    function animateCount(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + (current >= 1000 ? '+' : '');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.classList.remove('counting');
            }
        };
        element.classList.add('counting');
        requestAnimationFrame(step);
    }

    // Intersection Observer for achievements
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasCounted) {
                    const boxes = document.querySelectorAll('.about .achievement-box');
                    boxes.forEach((box, index) => {
                        const numberElement = box.querySelector('.numbers h3');
                        const labelElement = box.querySelector('.numbers p');
                        const data = achievementsData[index] || { target: 10, label: 'Default' };

                        // Update label
                        labelElement.textContent = data.label;

                        // Start counting animation
                        animateCount(numberElement, 1, data.target, 2000);
                    });
                    hasCounted = true;
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.5 }
    );

    if (achievementsSection) {
        observer.observe(achievementsSection);
    }

    // === Notification Logic ===
    const notificationBtn = document.querySelector('#notification-btn');
    const notificationSection = document.querySelector('#recent-notification');
    const notificationBoxes = document.querySelectorAll('.recent-notification .box');
    const currentDate = new Date('2025-04-25'); // Replace with `new Date()` in production

    if (notificationBtn && notificationSection) {
        // Scroll to notification section on click
        notificationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            notificationSection.scrollIntoView({ behavior: 'smooth' });
        });

        // Check notifications for red dot, near-expiring, and outdated status
        let hasNewNotifications = false;
        notificationBoxes.forEach((box) => {
            const issueDateStr = box.querySelector('.issue-date').textContent.replace('Issue Date: ', '');
            const expireDateStr = box.querySelector('.expire-date').textContent.replace('Expire Date: ', '');
            const issueDate = new Date(issueDateStr);
            const expireDate = new Date(expireDateStr);
            const statusElement = box.querySelector('.status');

            if (isNaN(issueDate.getTime()) || isNaN(expireDate.getTime())) {
                console.warn('Invalid date:', { issueDateStr, expireDateStr });
                return;
            }

            // Check if issue date is within 30 days for red dot
            const daysSinceIssue = (currentDate - issueDate) / (1000 * 60 * 60 * 24);
            if (daysSinceIssue <= 30 && daysSinceIssue >= 0) {
                hasNewNotifications = true;
            }

            // Check for outdated (expired) notifications
            if (expireDate < currentDate) {
                box.classList.add('outdated');
                if (statusElement) {
                    statusElement.textContent = 'Outdated';
                    statusElement.classList.add('outdated-label');
                }
            }
            // Check if expire date is within 7 days for blinking effect
            else if ((expireDate - currentDate) / (1000 * 60 * 60 * 24) <= 7) {
                box.querySelector('.expire-date').classList.add('near');
            }
        });

        // Toggle red dot on notification icon
        if (hasNewNotifications) {
            notificationBtn.classList.add('active');
        }
    }

    // === Handle Contact Form Submission ===
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Contact Form Submitted:', new FormData(contactForm));
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // === Handle Newsletter Form Submission ===
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

    // === Handle PDF Download Clicks ===
    const pdfLinks = document.querySelectorAll('.pdf-link');
    pdfLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const pdfTitle = link.parentElement.querySelector('h3').textContent;
            console.log(`PDF Downloaded: ${pdfTitle}`, link.href);
        });
    });

    // === Close Navbar and Search Form on Scroll ===
    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('fa-times');
        if (searchForm) searchForm.classList.remove('active');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // === Achievement Box Counting Logic ===
    const achievementsSection = document.querySelector('.about .achievements');
    let hasCounted = false;

    // Define achievement data
    const achievementsData = [
        { target: 15, label: 'Years of Experience' },
        { target: 500, label: 'Properties Sold' },
        { target: 10000, label: 'Community Members' },
        { target: 25, label: 'Awards Won' }
    ];

    // Function to animate counting
    function animateCount(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + (current >= 1000 ? '+' : '');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.classList.remove('counting');
            }
        };
        element.classList.add('counting');
        requestAnimationFrame(step);
    }

    // Intersection Observer for achievements
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasCounted) {
                    const boxes = document.querySelectorAll('.about .achievement-box');
                    boxes.forEach((box, index) => {
                        const numberElement = box.querySelector('.numbers h3');
                        const labelElement = box.querySelector('.numbers p');
                        const data = achievementsData[index] || { target: 10, label: 'Default' };

                        // Update label
                        labelElement.textContent = data.label;

                        // Start counting animation
                        animateCount(numberElement, 1, data.target, 2000);
                    });
                    hasCounted = true;
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.5 }
    );

    if (achievementsSection) {
        observer.observe(achievementsSection);
    }

    // === Notification Logic ===
    const notificationBoxes = document.querySelectorAll('.recent-notification .box-container .box');
    const currentDate = new Date('2025-04-25'); // Hardcoded for consistency; replace with `new Date()` in production

    notificationBoxes.forEach((box) => {
        const expireDateElement = box.querySelector('.expire-date');
        const statusElement = box.querySelector('.status');
        const expireDateText = expireDateElement.textContent.replace('Expire Date: ', '');
        const expireDate = new Date(expireDateText);

        if (isNaN(expireDate.getTime())) {
            console.warn('Invalid expiration date:', expireDateText);
            return;
        }

        // Check if notification is expired
        if (expireDate < currentDate) {
            box.classList.add('outdated');
            statusElement.classList.add('outdated-label');
            statusElement.textContent = 'Outdated';
        } else {
            // Check if notification is near expiration (within 7 days)
            const daysUntilExpiration = (expireDate - currentDate) / (1000 * 60 * 60 * 24);
            if (daysUntilExpiration <= 7) {
                expireDateElement.classList.add('near');
            }
        }
    });

    // === Navbar Notification Icon Logic (if applicable) ===
    const notificationIcon = document.querySelector('.header .icons .fa-bell');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', () => {
            const notificationSection = document.querySelector('#recent-notification');
            if (notificationSection) {
                notificationSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Add red dot if there are recent notifications (not expired)
        const hasRecent = Array.from(notificationBoxes).some(
            (box) => !box.classList.contains('outdated')
        );
        if (hasRecent) {
            notificationIcon.classList.add('has-notifications');
        }
    }
});