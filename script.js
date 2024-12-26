// Interactive Navigation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#main-nav a');

  // Smooth scrolling for all navigation links including footer
  const allNavLinks = [...navLinks, ...document.querySelectorAll('#footer-nav a')];
    
  allNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').slice(1);
          
          if (targetId === 'main-header') {
              
              window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
              });
          } else if (targetId === 'contact') {
              // "Contact Us", simple modal 
              const modal = document.createElement('div');
              modal.style.position = 'fixed';
              modal.style.top = '50%';
              modal.style.left = '50%';
              modal.style.transform = 'translate(-50%, -50%)';
              modal.style.background = 'var(--section-bg)';
              modal.style.padding = '2rem';
              modal.style.borderRadius = '8px';
              modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              modal.style.zIndex = '1000';
              modal.innerHTML = `
                  <h3 style="margin-bottom: 1rem;">Contact Us</h3>
                  <p>Email: info@wintersolstice.com</p>
                  <p>Phone: (555) 123-4567</p>
                  <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
              `;
              
              // Overlay 
              const overlay = document.createElement('div');
              overlay.style.position = 'fixed';
              overlay.style.top = '0';
              overlay.style.left = '0';
              overlay.style.right = '0';
              overlay.style.bottom = '0';
              overlay.style.background = 'rgba(0, 0, 0, 0.5)';
              overlay.style.zIndex = '999';
              
              document.body.appendChild(overlay);
              document.body.appendChild(modal);
              
              const closeModal = () => {
                  document.body.removeChild(modal);
                  document.body.removeChild(overlay);
              };
              
              modal.querySelector('button').addEventListener('click', closeModal);
              overlay.addEventListener('click', closeModal);
          } else if (targetId) {
              //  other links
              const targetSection = document.getElementById(targetId);
              if (targetSection) {
                  targetSection.scrollIntoView({ behavior: 'smooth' });
              }
          }
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
            // Basculer la classe light-theme sur le body
            document.body.classList.toggle('light-theme');
            
            // Mettre à jour l'icône et le style du bouton
            toggle.innerHTML = isDark ? '☀️' : '🌙';
            toggle.style.background = isDark 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.1)';
        });
    };

    createThemeToggle();

    // Ajout de l'animation de neige
    class Snowflake {
        constructor(canvas) {
            this.canvas = canvas;
            this.reset();
        }

        reset() {
            this.x = Math.random() * this.canvas.width;
            this.y = -10;
            this.size = Math.random() * 3 + 2;
            this.speed = Math.random() * 1 + 0.5;
            this.wind = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.5;
        }

        update() {
            this.y += this.speed;
            this.x += this.wind;
            this.x += Math.sin(this.y / 30) * 0.5;

            if (this.y > this.canvas.height) {
                this.reset();
            }
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    const createSnowfall = () => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1000';
        document.body.appendChild(canvas);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const ctx = canvas.getContext('2d');
        const snowflakes = Array(50).fill(null).map(() => new Snowflake(canvas));
        
        let isSnowing = true;
        let animationFrame;

        const animate = () => {
            if (!isSnowing) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snowflakes.forEach(snowflake => {
                snowflake.update();
                snowflake.draw(ctx);
            });

            animationFrame = requestAnimationFrame(animate);
        };

        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '❄️';
        toggleButton.style.position = 'fixed';
        toggleButton.style.bottom = '20px';
        toggleButton.style.left = '20px';
        toggleButton.style.padding = '10px';
        toggleButton.style.borderRadius = '50%';
        toggleButton.style.border = 'none';
        toggleButton.style.background = 'rgba(255, 255, 255, 0.1)';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.zIndex = '1001';
        toggleButton.setAttribute('aria-label', 'Toggle snowfall');

        toggleButton.addEventListener('click', () => {
            isSnowing = !isSnowing;
            if (isSnowing) {
                animate();
                toggleButton.style.background = 'rgba(255, 255, 255, 0.3)';
            } else {
                cancelAnimationFrame(animationFrame);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                toggleButton.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });

        document.body.appendChild(toggleButton);
        animate();
    };

    // Démarrer l'animation de neige
    createSnowfall();
});