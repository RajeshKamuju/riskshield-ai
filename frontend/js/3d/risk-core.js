/**
 * RiskShield AI — 3D Risk Intelligence Core Engine
 * Futuristic computational fraud engine with concentric wireframe layers,
 * gyroscope rings, orbiting telemetry nodes, and mouse parallax response.
 */

window.RiskIntelligenceCore = (function() {
  'use strict';

  class CoreVisualization {
    constructor(canvasId, options = {}) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.options = Object.assign({
        radius: ThreeDUtils.isMobile() ? 100 : 140,
        score: 92,
        interactive: true
      }, options);

      this.rotX = 0.2;
      this.rotY = 0.4;
      this.targetRotX = 0.2;
      this.targetRotY = 0.4;
      this.pulse = 0;
      this.currentScore = this.options.score;
      this.targetScore = this.options.score;

      // Geodesic icosahedron vertices for the outer transparent geometric shell
      const phi = (1 + Math.sqrt(5)) / 2;
      const rawVertices = [
        [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
        [0, -1,  phi], [0,  1,  phi], [0, -1, -phi], [0,  1, -phi],
        [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
      ];

      // Normalize vertices to unit sphere
      this.vertices = rawVertices.map(v => {
        const len = Math.hypot(v[0], v[1], v[2]);
        return { x: (v[0] / len), y: (v[1] / len), z: (v[2] / len) };
      });

      // Define triangular wireframe edges
      this.edges = [
        [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
        [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
        [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
        [4, 9], [2, 4], [6, 2], [8, 6], [9, 8],
        [4, 5], [5, 9], [8, 1], [1, 9], [7, 8],
        [6, 7], [10, 6], [2, 10], [11, 2], [4, 11]
      ];

      // Orbiting telemetry data nodes (concentric geometric satellite beacons)
      this.orbitNodes = [
        { angle: 0, speed: 0.012, radius: 1.6, tilt: 0.3, color: '#FF5E00' },
        { angle: 1.2, speed: 0.015, radius: 1.8, tilt: -0.4, color: '#FF2E4D' },
        { angle: 2.5, speed: 0.018, radius: 1.5, tilt: 0.8, color: '#FFB800' },
        { angle: 3.8, speed: 0.011, radius: 1.7, tilt: -0.6, color: '#6E3AFF' },
        { angle: 5.0, speed: 0.014, radius: 1.9, tilt: 0.2, color: '#00E699' }
      ];

      this.width = 0;
      this.height = 0;
      this.animId = null;
      this.isRunning = false;

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize(), { passive: true });

      if (this.options.interactive) {
        window.addEventListener('mousemove', (e) => {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = (e.clientY / window.innerHeight) * 2 - 1;
          this.targetRotY = x * 0.8 + 0.3;
          this.targetRotX = -y * 0.6 + 0.2;
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

    setRiskScore(newScore) {
      this.targetScore = ThreeDUtils.clamp(newScore, 0, 100);
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

      this.pulse += 0.025;
      this.rotX = ThreeDUtils.lerp(this.rotX, this.targetRotX, 0.06);
      this.rotY = ThreeDUtils.lerp(this.rotY, this.targetRotY, 0.06) + 0.003;
      this.currentScore = ThreeDUtils.lerp(this.currentScore, this.targetScore, 0.08);

      const cx = this.width / 2;
      const cy = this.height / 2;
      const baseRadius = this.options.radius * (1 + Math.sin(this.pulse) * 0.03);

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Score-based dynamic color
      let primaryColor = '#00E699';
      if (this.currentScore >= 80) primaryColor = '#FF2E4D';
      else if (this.currentScore >= 60) primaryColor = '#FF6B00';
      else if (this.currentScore >= 30) primaryColor = '#FFB800';

      // 1. Render Concentric Gyroscope Rings in 3D
      const numRings = 3;
      for (let r = 0; r < numRings; r++) {
        const ringRadius = baseRadius * (1.15 + r * 0.22);
        const ringTiltX = this.rotX + (r * 0.4);
        const ringTiltY = this.rotY + this.pulse * (0.4 + r * 0.2) * (r % 2 === 0 ? 1 : -1);

        this.ctx.beginPath();
        const segments = 48;
        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          const p = {
            x: Math.cos(theta) * ringRadius,
            y: Math.sin(theta) * ringRadius,
            z: 0
          };
          const rotP = ThreeDUtils.rotatePoint3D(p, ringTiltX, ringTiltY, 0);
          const proj = ThreeDUtils.project3D(rotP.x, rotP.y, rotP.z, cx, cy, 500);

          if (s === 0) this.ctx.moveTo(proj.x, proj.y);
          else this.ctx.lineTo(proj.x, proj.y);
        }
        this.ctx.strokeStyle = r === 0 
          ? `rgba(255, 94, 0, ${0.35 + Math.sin(this.pulse + r) * 0.1})` 
          : `rgba(255, 255, 255, ${0.08 + r * 0.03})`;
        this.ctx.lineWidth = r === 0 ? 1.5 : 1;
        this.ctx.stroke();
      }

      // 2. Render Outer Geodesic Geometric Wireframe Shell
      const transformedVertices = this.vertices.map(v => {
        const scaled = { x: v.x * baseRadius, y: v.y * baseRadius, z: v.z * baseRadius };
        const rot = ThreeDUtils.rotatePoint3D(scaled, this.rotX, this.rotY, this.pulse * 0.1);
        const proj = ThreeDUtils.project3D(rot.x, rot.y, rot.z, cx, cy, 500);
        return { proj, rot };
      });

      // Draw wireframe edges with depth attenuation
      this.ctx.lineWidth = 1;
      for (let i = 0; i < this.edges.length; i++) {
        const [idxA, idxB] = this.edges[i];
        const vA = transformedVertices[idxA];
        const vB = transformedVertices[idxB];

        const avgZ = (vA.rot.z + vB.rot.z) / 2;
        const depthAlpha = ThreeDUtils.mapRange(avgZ, -baseRadius, baseRadius, 0.08, 0.45);

        this.ctx.beginPath();
        this.ctx.moveTo(vA.proj.x, vA.proj.y);
        this.ctx.lineTo(vB.proj.x, vB.proj.y);
        this.ctx.strokeStyle = `rgba(255, 94, 0, ${depthAlpha})`;
        this.ctx.stroke();
      }

      // 3. Render Inner High-Energy Pulsing Core
      const innerCoreRadius = baseRadius * 0.35 * (1 + Math.sin(this.pulse * 2) * 0.08);
      const innerRot = ThreeDUtils.rotatePoint3D({ x: 0, y: 0, z: 0 }, this.rotX, this.rotY);
      const innerProj = ThreeDUtils.project3D(innerRot.x, innerRot.y, innerRot.z, cx, cy, 500);

      const grad = this.ctx.createRadialGradient(
        innerProj.x, innerProj.y, 0,
        innerProj.x, innerProj.y, innerCoreRadius * 2
      );
      grad.addColorStop(0, primaryColor);
      grad.addColorStop(0.4, 'rgba(255, 94, 0, 0.4)');
      grad.addColorStop(1, 'transparent');

      this.ctx.beginPath();
      this.ctx.arc(innerProj.x, innerProj.y, innerCoreRadius * 2, 0, Math.PI * 2);
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // 4. Render Orbiting Telemetry Data Nodes with connecting laser lines
      for (let i = 0; i < this.orbitNodes.length; i++) {
        const node = this.orbitNodes[i];
        node.angle += node.speed;

        const orbRadius = baseRadius * node.radius;
        const rawNode = {
          x: Math.cos(node.angle) * orbRadius,
          y: Math.sin(node.angle) * orbRadius * Math.cos(node.tilt),
          z: Math.sin(node.angle) * orbRadius * Math.sin(node.tilt)
        };

        const rotNode = ThreeDUtils.rotatePoint3D(rawNode, this.rotX, this.rotY);
        const proj = ThreeDUtils.project3D(rotNode.x, rotNode.y, rotNode.z, cx, cy, 500);

        if (proj.visible) {
          // Connecting laser vector to core
          this.ctx.beginPath();
          this.ctx.moveTo(innerProj.x, innerProj.y);
          this.ctx.lineTo(proj.x, proj.y);
          this.ctx.strokeStyle = `rgba(255, 94, 0, ${0.15 * proj.scale})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();

          // Node body
          this.ctx.beginPath();
          this.ctx.arc(proj.x, proj.y, 4 * proj.scale, 0, Math.PI * 2);
          this.ctx.fillStyle = node.color;
          this.ctx.shadowColor = node.color;
          this.ctx.shadowBlur = 10;
          this.ctx.fill();
          this.ctx.shadowBlur = 0;

          // Outer concentric orbit halo ring (pure visual)
          this.ctx.beginPath();
          this.ctx.arc(proj.x, proj.y, 7 * proj.scale, 0, Math.PI * 2);
          this.ctx.strokeStyle = node.color;
          this.ctx.lineWidth = 0.8;
          this.ctx.globalAlpha = 0.4;
          this.ctx.stroke();
          this.ctx.globalAlpha = 1.0;
        }
      }

      this.animId = requestAnimationFrame(() => this.render());
    }
  }

  return {
    create: (canvasId, options) => new CoreVisualization(canvasId, options)
  };
})();
