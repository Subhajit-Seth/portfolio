// Download file
function downloadFile() {
    const link = document.createElement('a');
    link.href = 'assets/SUBHAJIT-SETH-CV.pdf';  // path to your file
    link.download = 'SUBHAJIT-SETH-CV.pdf';     // the name it will be saved as
    document.body.appendChild(link);  // required for Firefox
    link.click();
    document.body.removeChild(link);  // cleanup
}

// JavaScript to set the current year
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("year").textContent = new Date().getFullYear();

// Get hostname and remove ".site"
const hostname = window.location.hostname; // e.g., sethdev.site
const cleanName = hostname.replace('.site','www.' ''); // removes the .site part

// Capitalize the first letter
const capitalizedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();

document.getElementById("site-name").textContent = capitalizedName;

// Particles.js configuration

particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800,
            },
        },

        color: {
            value: "#0ea5e9",
        },

        shape: {
            type: "circle",
        },

        opacity: {
            value: 0.5,
            random: false,
        },

        size: {
            value: 3,
            random: true,
        },

        line_linked: {
            enable: true,
            distance: 150,
            color: "#0ea5e9",
            opacity: 0.4,
            width: 1,
        },

        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
        },
    },

    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse",
            },

            onclick: {
                enable: true,
                mode: "push",
            },

            resize: true,
        },
    },

    retina_detect: true,
});

// Three.js 3D Background
let scene, camera, renderer, geometry, material, mesh;

function init3D() {
    const container = document.getElementById("hero-3d");

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create geometric shapes
    const shapes = [];

    for (let i = 0; i < 15; i++) {
        const geometries = [new THREE.BoxGeometry(1, 1, 1), new THREE.SphereGeometry(0.5, 8, 6), new THREE.ConeGeometry(0.5, 1, 8), new THREE.TetrahedronGeometry(0.8)];

        geometry = geometries[Math.floor(Math.random() * geometries.length)];

        material = new THREE.MeshBasicMaterial({
            color: Math.random() * 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.6,
        });
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 20;

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        shapes.push(mesh);
        scene.add(mesh);
    }

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);

        shapes.forEach((shape) => {
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;
            shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.01;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener("resize", () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

// Initialize 3D scene
init3D();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Reveal animations
gsap.utils.toArray(".reveal").forEach((elem) => {
    gsap.fromTo(
        elem,
        {
            y: 50,
            opacity: 0,
        },

        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        }
    );
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Typing effect
const text = "WELCOME TO MY PORTFOLIO";
const typingElement = document.getElementById("typing-text");
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingElement.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
        i++;
        setTimeout(typeWriter, 100);
    } else {
        typingElement.innerHTML = text;
    }
}

setTimeout(typeWriter, 1000);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuBtn = document.getElementById("close-menu-btn");

mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");

    gsap.fromTo(
        mobileMenu,
        {
            opacity: 0,
        },

        {
            opacity: 1,
            duration: 0.3,
        }
    );
});

closeMenuBtn.addEventListener("click", () => {
    gsap.to(mobileMenu, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => mobileMenu.classList.add("hidden"),
    });
});

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        gsap.to(mobileMenu, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => mobileMenu.classList.add("hidden"),
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});


document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const statusMsg = document.getElementById("response-message");
    const submitBtn = form.querySelector('button[type="submit"]');

    // Update button to show loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;

    // Helper to show message with color and auto-hide
    function showMessage(message, color) {
        statusMsg.textContent = message;
        statusMsg.style.color = color;
        statusMsg.style.display = "block";
        statusMsg.style.letterSpacing = "1px";
        statusMsg.style.fontSize = "13px";
        statusMsg.style.fontWeight = "600";

        // Hide after 3 seconds
        setTimeout(() => {
            statusMsg.textContent = "";
            statusMsg.style.display = "none";
        }, 3000);
    }

    // Send form data to Formspree
    fetch("https://formspree.io/f/manokdrq", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                showMessage("Message sent successfully!", "white");
                form.reset();
            } else {
                response.json().then(data => {
                    const error = data.error || "Oops! Something went wrong.";
                    showMessage(error, "white");
                });
            }
        })
        .catch(error => {
            showMessage("Error sending message.", "white");
        })
        .finally(() => {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
            submitBtn.disabled = false;
        });
});


// Add floating animation to skill pills
document.querySelectorAll(".skill-pill").forEach((pill, index) => {
    gsap.to(pill, {
        y: Math.sin(index) * 10,
        duration: 2 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.1,
    });
});

// Parallax effect for glow elements
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".glow");

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, $ {yPos}px, 0)`;
    });

});
