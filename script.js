const canvas = document.getElementById('smoke-canvas');
const ctx = canvas.getContext('2d');

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class SmokeParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 200;
        this.size = 80 + Math.random() * 120;
        this.speedY = 0.2 + Math.random() * 0.6;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = 0.03 + Math.random() * 0.05;
        this.life = 0;
        this.maxLife = 600 + Math.random() * 400;
        this.color = `rgba(56,189,248,${this.opacity})`; /* blue smoke */
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.life++;

        if (this.life > this.maxLife) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.filter = "blur(40px)";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 30; i++) {
    particles.push(new SmokeParticle());
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();

const modal = document.getElementById("videoModal");
const openBtn = document.getElementById("viewVideoBtn");
const closeBtn = document.querySelector(".close-btn");
const fullVideo = document.getElementById("fullVideo");

openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    fullVideo.muted = false;   // 🔥 SOUND ENABLE
    fullVideo.currentTime = 0;
    fullVideo.play();
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    fullVideo.pause();
    fullVideo.currentTime = 0;
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        fullVideo.pause();
        fullVideo.currentTime = 0;
    }
});