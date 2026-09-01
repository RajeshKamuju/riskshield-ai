/**
 * RiskShield AI — 3D Particle & Flowing Data Streams Engine
 * Ambient depth particles and subtle data packet streams (Transaction -> Risk Engine -> Decision)
 */

window.RiskParticleSystem = (function() {
  'use strict';

  class ParticleField {
    constructor(canvasId, options = {}) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.options = Object.assign({
        count: ThreeDUtils.isMobile() ? 20 : 45,
        streamCount: ThreeDUtils.isMobile() ? 4 : 8,
        speed: 0.4,
        color: '#FF5E00',
        enableMouse: true
      }, options);

      this.particles = [];
      this.dataStreams = [];
      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
      this.width = 0;
      this.height = 0;
      this.animId = null;
      this.isRunning = false;

      this.init();
    }

    init() {
      this.resize();
      this.createParticles();
      this.createStreams();

      window.addEventListener('resize', () => this.resize(), { passive: true });

      if (this.options.enableMouse) {
        window.addEventListener('mousemove', (e) => {
          const rect = this.canvas.getBoundingClientRect();
          this.mouse.targetX = e.clientX - rect.left;
          this.mouse.targetY = e.clientY - rect.top;
          this.mouse.active = true;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
          this.mouse.active = false;
        });
      }

      ThreeDUtils.createVisibilityObserver(
        this.canvas,
        () => this.start(),
        () => this.stop()
      );
    }

    resize() {
      if (!this.canvas) return;
      const dims = ThreeDUtils.setupHiDPICanvas(this.canvas, this.ctx);
      this.width = dims.width;
      this.height = dims.height;
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.options.count; i++) {
        this.particles.push({
          x: (Math.random() - 0.5) * this.width * 1.5,
          y: (Math.random() - 0.5) * this.height * 1.5,
          z: Math.random() * 600 - 300,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          vz: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.15,
          hue: Math.random() > 0.3 ? '#FF5E00' : '#6E3AFF'
        });
      }
    }

    createStreams() {
      this.dataStreams = [];
      for (let i = 0; i < this.options.streamCount; i++) {
        this.dataStreams.push({
          progress: Math.random(),
          speed: Math.random() * 0.003 + 0.002,
          radius: Math.random() * 120 + 80,
          tiltAngle: Math.random() * Math.PI,
          size: Math.random() * 2.5 + 1.5
        });
      }
    }

    start() {
      if (this.isRunning || ThreeDUtils.isReducedMotion()) return;
      this.isRunning = true;
      this.render();
    }

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    }

    render() {
      if (!this.isRunning) return;

      this.mouse.x = ThreeDUtils.lerp(this.mouse.x, this.mouse.targetX, 0.05);
      this.mouse.y = ThreeDUtils.lerp(this.mouse.y, this.mouse.targetY, 0.05);

      const cx = this.width / 2;
      const cy = this.height / 2;

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Render Ambient 3D Depth Particles
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.z > 300) p.z = -300;
        if (p.z < -300) p.z = 300;

        const proj = ThreeDUtils.project3D(p.x, p.y, p.z, cx, cy, 450);
        if (!proj.visible) continue;

        const scale = proj.scale;
        const radius = Math.max(0.5, p.size * scale);
        const alpha = Math.min(1, Math.max(0.05, p.alpha * scale));

        this.ctx.beginPath();
        this.ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.hue === '#FF5E00' 
          ? `rgba(255, 94, 0, ${alpha})` 
          : `rgba(110, 58, 255, ${alpha * 0.8})`;
        this.ctx.fill();
      }

      // Render subtle flowing data streams (Transaction -> Decision convergence)
      for (let i = 0; i < this.dataStreams.length; i++) {
        const s = this.dataStreams[i];
        s.progress += s.speed;
        if (s.progress > 1) s.progress = 0;

        const angle = s.progress * Math.PI * 2;
        const x3d = Math.cos(angle) * s.radius;
        const y3d = Math.sin(angle) * (s.radius * 0.4);
        const z3d = Math.sin(angle + s.tiltAngle) * 90;

        const proj = ThreeDUtils.project3D(x3d, y3d, z3d, cx, cy, 400);
        if (proj.visible) {
          this.ctx.beginPath();
          this.ctx.arc(proj.x, proj.y, s.size * proj.scale, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(255, 94, 0, ${0.4 * proj.scale})`;
          this.ctx.shadowColor = '#FF5E00';
          this.ctx.shadowBlur = 8;
          this.ctx.fill();
          this.ctx.shadowBlur = 0;
        }
      }

      this.animId = requestAnimationFrame(() => this.render());
    }
  }

  return {
    create: (canvasId, options) => new ParticleField(canvasId, options)
  };
})();
