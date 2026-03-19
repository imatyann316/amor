// Scroll Navbar Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for Fade-in Elements
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    observer.observe(el);
});

// Hamburger Menu (Basic Mobile Toggle)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '20px';
        navLinks.style.background = 'rgba(20, 5, 5, 0.9)';
        navLinks.style.border = '1px solid var(--border-red)';
        navLinks.style.padding = '20px';
        navLinks.style.borderRadius = '5px';
    });
}

// Embers/Dungeon Particle Effect
const canvas = document.getElementById('emberCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100; // Start slightly below screen
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * -1 - 0.5;
        this.color = `rgba(${Math.floor(Math.random() * 155 + 100)}, ${Math.floor(Math.random() * 40)}, 0, ${Math.random() * 0.8 + 0.2})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Add slight wobble
        this.x += Math.sin(this.y * 0.01) * 0.5;

        // Reset particle if it goes off screen
        if (this.y < 0 - this.size) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(214, 40, 40, 0.8)';
    }
}

function initEmber() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 10000;
    
    // Cap maximum particles for performance
    if (numberOfParticles > 150) numberOfParticles = 150;
    
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateEmber() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateEmber);
}

initEmber();
animateEmber();
