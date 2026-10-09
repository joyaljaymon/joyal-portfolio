const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Burger Animation
        burger.classList.toggle('toggle');
        
        // Optional: Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(nav.classList.contains('nav-active')){
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
}

// Add burger toggle animation css dynamically or in style.css. 
const style = document.createElement('style');
style.innerHTML = `
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .toggle .line2 {
        opacity: 0;
    }
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

navSlide();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal with Intersection Observer (Exactly as requested)
const reveals = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate only once per section
        }
    });
}, revealOptions);

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

// Active Nav Link on Scroll highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const navObserverOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
    threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, navObserverOptions);

sections.forEach(section => {
    navObserver.observe(section);
});
