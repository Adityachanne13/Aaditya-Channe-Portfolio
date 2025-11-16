//typing effect
const professions = ["Full-Stack Developer", "Frontend Developer", "Problem Solver", "Tech Innovator"];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
    const currentProfession = professions[professionIndex];
    const typingElement = document.getElementById('typing-text');

    if (isDeleting) {
        typingElement.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeedVar = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentProfession.length) {
        typeSpeedVar = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typeSpeedVar = 500;
    }

    setTimeout(type, typeSpeedVar);
}
// single DOMContentLoaded handler

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, 1000);
});

//active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// single DOMContentLoaded handler
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// IntersectionObserver for section animations (keeps portfolio observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// observe non-hero sections
document.querySelectorAll('.section:not(.hero)').forEach(section => {
    observer.observe(section);
});


// portfolio grid animation (keeps if you use --delay in CSS)
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.portfolio-item').forEach((item, index) => {
                    item.style.setProperty('--delay', index);
                    item.classList.add('animate');
                });
            }
        });
    }, observerOptions);
    portfolioObserver.observe(portfolioGrid);
}

const blogGrid = document.querySelector('.blog-grid');
if (blogGrid) {
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.blog-post').forEach((post, index) => {
                    post.style.setProperty('--delay', index);
                    post.classList.add('animate');
                });
            }
        });
    }, observerOptions);
    blogObserver.observe(blogGrid);
}

const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.setProperty('--delay', index);
});


document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible'); // fade in
        } else {
            backToTop.classList.remove('visible'); // fade out
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // smooth scrolling like jQuery animate
        });
    });
});


/* 
This script implements a "Back to Top" button using vanilla JavaScript without jQuery. 
It listens for the window scroll event and shows the button with a fade-in effect when the page is scrolled more than 300px, and hides it with a fade-out when scrolled back up. 
Clicking the button scrolls the page smoothly to the top using the native scrollTo method with 'smooth' behavior. 
CSS handles the fade effect through opacity and transitions, while JavaScript only toggles a class to show or hide the button and triggers the smooth scroll.
*/
