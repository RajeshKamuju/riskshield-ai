/**
 * RiskShield AI — 3D Scenario Visualizer & Scroll-Driven Story Engine
 * Visualizes ATO, Card Testing, Velocity Surges, and Scroll-Based Convergence Storytelling.
 */

window.RiskScenario3D = (function() {
  'use strict';

  class ScenarioCanvas {
    constructor(canvasId, options = {}) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.options = Object.assign({
        mode: 'ATO', // 'ATO' | 'CARD_TESTING' | 'VELOCITY' | 'SCROLL_STORY'
      }, options);

      this.currentMode = this.options.mode;
      this.animTime = 0;
      this.width = 0;
      this.height = 0;
      this.particles = [];
      this.animId = null;
      this.isRunning = false;
      this.scrollProgress = 0;

      this.init();
    }

    init() {
      this.resize();
      this.setupScenarioData();

      window.addEventListener('resize', () => {
        this.resize();
        this.setupScenarioData();
      }, { passive: true });

      // Scroll listener for scroll-based storytelling
      if (this.currentMode === 'SCROLL_STORY') {
        window.addEventListener('scroll', () => {
          if (!this.canvas) return;
          const rect = this.canvas.getBoundingClientRect();
          const viewHeight = window.innerHeight;
          if (rect.top < viewHeight && rect.bottom > 0) {
            const rawProgress = (viewHeight - rect.top) / (viewHeight + rect.height);
            this.scrollProgress = ThreeDUtils.clamp(rawProgress, 0, 1);
          }
        }, { passive: true });
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

    setMode(newMode) {
      this.currentMode = newMode;
      this.animTime = 0;
      this.setupScenarioData();
    }

    setupScenarioData() {
      this.particles = [];
      const cx = this.width / 2;
      const cy = this.height / 2;

      if (this.currentMode === 'ATO') {
        // ATO: Regular baseline user node + Attacker node converging with red anomaly packets
        this.particles = [
          { type: 'NORMAL_USER', label: 'Baseline Customer (₹8.9k avg)', x: -140, y: -40, z: 0, color: '#00E699' },
          { type: 'ATTACKER', label: 'Tor Node (185.220.101.99)', x: 140, y: -40, z: 20, color: '#FF2E4D' },
          { type: 'ENGINE', label: 'Risk Intelligence Core', x: 0, y: 50, z: 0, color: '#FF5E00' }
        ];
      } else if (this.currentMode === 'CARD_TESTING') {
        // Card Testing: Stream of micro-transactions accelerating into the engine
        const amounts = [10, 20, 50, 100, 250, 500, 75000];
        this.particles = amounts.map((amt, idx) => ({
          amount: amt,
          progress: idx * -0.15,
          speed: amt === 75000 ? 0.015 : 0.008,
          lane: (idx % 3) - 1,
          isPayload: amt === 75000
        }));
      } else if (this.currentMode === 'VELOCITY') {
        // Velocity Surge: 12 transactions rapidly converging on single customer
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          this.particles.push({
            id: i + 1,
            baseAngle: angle,
            dist: 160,
            speed: 0.01 + (i * 0.002),
            color: i > 5 ? '#FF2E4D' : '#FFB800'
          });
        }
      } else if (this.currentMode === 'SCROLL_STORY') {
        // Scroll Story: 18 scattered signals that converge into a unified decision
        const signals = [
          'Amount Deviation', 'Velocity Burst', 'Tor Proxy', 'Canvas Hash',
          'Geo Speed', 'Declined OTP', 'High-Risk MCC', 'New Device',
          'Sub-second API', 'Synthetic PAN', 'BIN Attack', 'Bot Telemetry'
        ];
        this.particles = signals.map((name, i) => {
          const angle = (i / signals.length) * Math.PI * 2;
          const radius = Math.random() * 120 + 100;
          return {
            name,
            startX: Math.cos(angle) * radius,
            startY: Math.sin(angle) * radius,
            startZ: (Math.random() - 0.5) * 150,
            angle,
            color: i % 2 === 0 ? '#FF5E00' : '#FF2E4D'
          };
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

      this.animTime += 0.025;
      const cx = this.width / 2;
      const cy = this.height / 2;

      this.ctx.clearRect(0, 0, this.width, this.height);

      if (this.currentMode === 'ATO') {
        this.renderATO(cx, cy);
      } else if (this.currentMode === 'CARD_TESTING') {
        this.renderCardTesting(cx, cy);
      } else if (this.currentMode === 'VELOCITY') {
        this.renderVelocity(cx, cy);
      } else if (this.currentMode === 'SCROLL_STORY') {
        this.renderScrollStory(cx, cy);
      }

      this.animId = requestAnimationFrame(() => this.render());
    }

    renderATO(cx, cy) {
      const normal = this.particles[0];
      const attacker = this.particles[1];
      const engine = this.particles[2];

      // Draw Engine Target
      const engineP = ThreeDUtils.project3D(engine.x, engine.y, engine.z, cx, cy, 400);
      this.ctx.beginPath();
      this.ctx.arc(engineP.x, engineP.y, 22, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 94, 0, 0.2)';
      this.ctx.fill();
      this.ctx.strokeStyle = '#FF5E00';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.font = "bold 11px 'JetBrains Mono', monospace";
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('ENGINE (SCORE: 92)', engineP.x, engineP.y + 36);

      // Draw Normal User Node
      const normalP = ThreeDUtils.project3D(normal.x, normal.y, normal.z, cx, cy, 400);
      this.ctx.beginPath();
      this.ctx.arc(normalP.x, normalP.y, 14, 0, Math.PI * 2);
      this.ctx.fillStyle = normal.color;
      this.ctx.fill();
      this.ctx.fillText(normal.label, normalP.x, normalP.y - 18);

      // Draw Attacker / Tor Node
      const attackerP = ThreeDUtils.project3D(attacker.x, attacker.y, attacker.z, cx, cy, 400);
      this.ctx.beginPath();
      this.ctx.arc(attackerP.x, attackerP.y, 14, 0, Math.PI * 2);
      this.ctx.fillStyle = attacker.color;
      this.ctx.shadowColor = attacker.color;
      this.ctx.shadowBlur = 12;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
      this.ctx.fillText(attacker.label, attackerP.x, attackerP.y - 18);

      // Connecting lines & anomaly vectors
      this.ctx.beginPath();
      this.ctx.moveTo(normalP.x, normalP.y);
      this.ctx.lineTo(engineP.x, engineP.y);
      this.ctx.strokeStyle = 'rgba(0, 230, 153, 0.3)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(attackerP.x, attackerP.y);
      this.ctx.lineTo(engineP.x, engineP.y);
      this.ctx.strokeStyle = 'rgba(255, 46, 77, 0.6)';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Flowing red anomaly packet
      const packetProg = (this.animTime * 0.8) % 1;
      const pktX = ThreeDUtils.lerp(attackerP.x, engineP.x, packetProg);
      const pktY = ThreeDUtils.lerp(attackerP.y, engineP.y, packetProg);
      this.ctx.beginPath();
      this.ctx.arc(pktX, pktY, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FF2E4D';
      this.ctx.shadowColor = '#FF2E4D';
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    renderCardTesting(cx, cy) {
      // Draw Central Engine Gateway
      this.ctx.beginPath();
      this.ctx.arc(cx + 120, cy, 32, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 94, 0, 0.2)';
      this.ctx.fill();
      this.ctx.strokeStyle = '#FF5E00';
      this.ctx.stroke();

      this.ctx.font = "bold 11px 'JetBrains Mono', monospace";
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('RISK ENGINE', cx + 120, cy + 48);

      // Render incoming micro-transactions
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        if (p.progress < 0) continue;

        const startX = cx - 180;
        const startY = cy + p.lane * 35;
        const currentX = ThreeDUtils.lerp(startX, cx + 120, p.progress);
        const currentY = ThreeDUtils.lerp(startY, cy, p.progress);

        const radius = p.isPayload ? 14 : 7;
        const color = p.isPayload ? '#FF2E4D' : '#FFB800';

        this.ctx.beginPath();
        this.ctx.arc(currentX, currentY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = p.isPayload ? 16 : 6;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.font = "10px 'JetBrains Mono', monospace";
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(`₹${p.amount}`, currentX, currentY - radius - 4);
      }
    }

    renderVelocity(cx, cy) {
      // Draw central target entity
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 46, 77, 0.25)';
      this.ctx.fill();
      this.ctx.strokeStyle = '#FF2E4D';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.font = "bold 11px 'JetBrains Mono', monospace";
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('TARGET VPA / DEVICE', cx, cy + 42);

      // Render 12 converging burst authorizations
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const currentAngle = p.baseAngle + this.animTime * 0.3;
        const dist = 140 * (1 - ((this.animTime * 0.4 + i * 0.08) % 1));
        const px = cx + Math.cos(currentAngle) * dist;
        const py = cy + Math.sin(currentAngle) * dist;

        this.ctx.beginPath();
        this.ctx.moveTo(px, py);
        this.ctx.lineTo(cx, cy);
        this.ctx.strokeStyle = `rgba(255, 46, 77, ${0.15 + (1 - dist / 140) * 0.5})`;
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(px, py, 6, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.shadowColor = p.color;
        this.ctx.shadowBlur = 8;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.font = "9px 'JetBrains Mono', monospace";
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(`TXN #${p.id}`, px, py - 9);
      }
    }

    renderScrollStory(cx, cy) {
      const progress = this.scrollProgress; // 0 (scattered) to 1 (converged)

      // Central Engine Target
      const engineRadius = ThreeDUtils.lerp(18, 36, progress);
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, engineRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 94, 0, ${0.2 + progress * 0.4})`;
      this.ctx.fill();
      this.ctx.strokeStyle = progress > 0.8 ? '#FF2E4D' : '#FF5E00';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      const stateLabel = progress < 0.3 
        ? 'SCATTERED SIGNALS' 
        : progress < 0.6 
          ? 'CONVERGENCE & ANALYSIS' 
          : progress < 0.85 
            ? 'SCORE: 92/100' 
            : 'DECISION: BLOCK';

      this.ctx.font = "bold 12px 'JetBrains Mono', monospace";
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(stateLabel, cx, cy + engineRadius + 24);

      // Render converging signals
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const curX = ThreeDUtils.lerp(p.startX, 0, progress);
        const curY = ThreeDUtils.lerp(p.startY, 0, progress);
        const curZ = ThreeDUtils.lerp(p.startZ, 0, progress);

        const rotP = ThreeDUtils.rotatePoint3D({ x: curX, y: curY, z: curZ }, 0.2, this.animTime * 0.2);
        const proj = ThreeDUtils.project3D(rotP.x, rotP.y, rotP.z, cx, cy, 400);

        if (proj.visible) {
          this.ctx.beginPath();
          this.ctx.moveTo(proj.x, proj.y);
          this.ctx.lineTo(cx, cy);
          this.ctx.strokeStyle = `rgba(255, 94, 0, ${0.15 + progress * 0.4})`;
          this.ctx.stroke();

          this.ctx.beginPath();
          this.ctx.arc(proj.x, proj.y, 4.5 * proj.scale, 0, Math.PI * 2);
          this.ctx.fillStyle = p.color;
          this.ctx.fill();

          if (progress < 0.75) {
            this.ctx.font = `${Math.floor(9 * proj.scale)}px 'JetBrains Mono', monospace`;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            this.ctx.fillText(p.name, proj.x + 8, proj.y + 3);
          }
        }
      }
    }
  }

  return {
    create: (canvasId, options) => new ScenarioCanvas(canvasId, options)
  };
})();
