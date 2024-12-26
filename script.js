// Interactive Navigation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#main-nav a');

    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Intersection Observer for section animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Highlight corresponding nav link
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Interactive Solstice Animation
    const createSolsticeAnimation = () => {
        const science = document.getElementById('science');
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        canvas.style.display = 'block';
        canvas.style.margin = '2rem auto';
        science.insertBefore(canvas, science.firstChild);

        const ctx = canvas.getContext('2d');
        let angle = 0;

        function drawSun(x, y) {
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fillStyle = '#ffd700';
            ctx.fill();

            // Sun rays
            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                const rayAngle = (i * Math.PI / 4) + angle;
                ctx.moveTo(
                    x + Math.cos(rayAngle) * 25,
                    y + Math.sin(rayAngle) * 25
                );
                ctx.lineTo(
                    x + Math.cos(rayAngle) * 35,
                    y + Math.sin(rayAngle) * 35
                );
                ctx.strokeStyle = '#ffd700';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        function drawEarth() {
            ctx.beginPath();
            ctx.arc(150, 150, 50, 0, Math.PI * 2);
            ctx.fillStyle = '#2d5a9e';
            ctx.fill();

            // Earth's tilt
            ctx.save();
            ctx.translate(150, 150);
            ctx.rotate(23.5 * Math.PI / 180);
            ctx.beginPath();
            ctx.moveTo(-60, 0);
            ctx.lineTo(60, 0);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.stroke();
            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw orbit
            ctx.beginPath();
            ctx.arc(150, 150, 100, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.stroke();

            // Calculate sun position
            const sunX = 150 + Math.cos(angle) * 100;
            const sunY = 150 + Math.sin(angle) * 100;

            drawSun(sunX, sunY);
            drawEarth();

            angle += 0.01;
            requestAnimationFrame(animate);
        }

        animate();
    };

    createSolsticeAnimation();

    // Interactive Celebrations
    const celebrations = document.querySelectorAll('.celebration');
    celebrations.forEach(celebration => {
        celebration.addEventListener('click', () => {
            celebrations.forEach(c => c.classList.remove('active'));
            celebration.classList.add('active');
        });
    });

    // Dynamic Theme Toggle
    const createThemeToggle = () => {
        const toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.innerHTML = '☀️';
        toggle.setAttribute('aria-label', 'Toggle theme');
        toggle.style.position = 'fixed';
        toggle.style.bottom = '20px';
        toggle.style.right = '20px';
        toggle.style.padding = '10px';
        toggle.style.borderRadius = '50%';
        toggle.style.border = 'none';
        toggle.style.background = 'rgba(255, 255, 255, 0.1)';
        toggle.style.cursor = 'pointer';
        
        document.body.appendChild(toggle);

        let isDark = true;
        toggle.addEventListener('click', () => {
            isDark = !isDark;
            document.body.style.background = isDark 
                ? 'linear-gradient(135deg, #324c8a 0%, #0a192f 98%)'
                : 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 70%)';
            toggle.innerHTML = isDark ? '☀️' : '🌙';
        });
    };

    createThemeToggle();
});