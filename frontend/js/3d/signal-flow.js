/**
 * RiskShield AI — 3D Fraud Intelligence Visual Background Engine
 * 100% Pure Visual Architecture — Zero readable text, zero fake labels, zero numbers in background.
 * Multi-layer depth: Far Grid & Ambient Atmosphere -> Flowing Bezier Streamlines ->
 * Abstract Node Hierarchies (○ → ○ → ○) -> 3D Concentric Computational Risk Core ->
 * High-Speed Data Packet Particles -> Responsive Mouse Parallax & Scroll Physics.
 */

window.SignalFlowEngine = (function() {
  'use strict';

  class SignalFlow {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      this.options = Object.assign({
        particleCount: ThreeDUtils.isMobile() ? 28 : 65,
        speed: 1.0,
        interactive: true
      }, options);

      this.canvas = this.container.querySelector('canvas') || document.createElement('canvas');
      if (!this.canvas.parentElement) {
        this.canvas.className = 'signal-flow-canvas';
        this.container.appendChild(this.canvas);
      }
      this.ctx = this.canvas.getContext('2d');

      // Left Ingestion Clusters (Blue / Mint / Purple / Cyan / Amber / Sky)
      this.leftClusters = [
        { id: 'l1', color: '#0080FF', branchColor: '#00C8FF', size: 16, pulseOffset: 0.0, branches: 2 },
        { id: 'l2', color: '#00E699', branchColor: '#38BDF8', size: 14, pulseOffset: 1.2, branches: 1 },
        { id: 'l3', color: '#6E3AFF', branchColor: '#A855F7', size: 17, pulseOffset: 2.4, branches: 2 },
        { id: 'l4', color: '#00C8FF', branchColor: '#0080FF', size: 13, pulseOffset: 3.6, branches: 1 },
        { id: 'l5', color: '#FFB800', branchColor: '#F59E0B', size: 15, pulseOffset: 4.8, branches: 2 },
        { id: 'l6', color: '#38BDF8', branchColor: '#00E699', size: 14, pulseOffset: 5.5, branches: 1 }
      ];

      // Right Anomaly & Decision Clusters (Crimson / Orange / Amber / Flame)
      this.rightClusters = [
        { id: 'r1', color: '#FF2E4D', branchColor: '#FF5E00', size: 17, pulseOffset: 0.5, branches: 2 },
        { id: 'r2', color: '#FF5E00', branchColor: '#FFB800', size: 15, pulseOffset: 1.7, branches: 1 },
        { id: 'r3', color: '#FF6B00', branchColor: '#FF2E4D', size: 14, pulseOffset: 2.9, branches: 2 },
        { id: 'r4', color: '#FF3B2F', branchColor: '#FF7729', size: 16, pulseOffset: 4.1, branches: 1 },
        { id: 'r5', color: '#FF2E4D', branchColor: '#FF5E00', size: 15, pulseOffset: 5.2, branches: 2 },
        { id: 'r6', color: '#FFAA00', branchColor: '#FF6B00', size: 13, pulseOffset: 6.1, branches: 1 }
      ];

      // 3D Geodesic Icosahedron geometry for central risk engine
      const phi = (1 + Math.sqrt(5)) / 2;
      const rawIcosahedron = [
        [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
        [0, -1,  phi], [0,  1,  phi], [0, -1, -phi], [0,  1, -phi],
        [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
      ];
      this.coreVertices = rawIcosahedron.map(v => {
        const len = Math.hypot(v[0], v[1], v[2]);
        return { x: v[0] / len, y: v[1] / len, z: v[2] / len };
      });
      this.coreEdges = [
        [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
        [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
        [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
        [4, 9], [2, 4], [6, 2], [8, 6], [9, 8],
        [4, 5], [5, 9], [8, 1], [1, 9], [7, 8],
        [6, 7], [10, 6], [2, 10], [11, 2], [4, 11]
      ];

      this.particles = [];
      this.ambientDust = [];
      this.width = 0;
      this.height = 0;
      this.animId = null;
      this.isRunning = false;

      this.rotationAngle = 0;
      this.scanAngle = 0;
      this.pulsePhase = 0;
      this.coreRotX = 0.2;
      this.coreRotY = 0.3;
      this.targetRotX = 0.2;
      this.targetRotY = 0.3;

      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
      this.scrollY = 0;
      this.targetScrollY = 0;

      this.init();
    }

    init() {
      this.resize();
      this.createParticles();
      this.createAmbientDust();

      window.addEventListener('resize', () => {
        this.resize();
        this.createAmbientDust();
      }, { passive: true });

      window.addEventListener('scroll', () => {
        this.targetScrollY = window.scrollY || window.pageYOffset;
      }, { passive: true });

      if (this.options.interactive) {
        window.addEventListener('mousemove', (e) => {
          const rect = this.container.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          this.mouse.targetX = (e.clientX - cx) / (rect.width / 2);
          this.mouse.targetY = (e.clientY - cy) / (rect.height / 2);
          this.targetRotY = this.mouse.targetX * 0.8 + 0.3;
          this.targetRotX = -this.mouse.targetY * 0.6 + 0.2;
          this.mouse.active = true;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
          this.mouse.active = false;
          this.mouse.targetX = 0;
          this.mouse.targetY = 0;
          this.targetRotX = 0.2;
          this.targetRotY = 0.3;
        });
      }

      ThreeDUtils.createVisibilityObserver(
        this.container,
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

    createAmbientDust() {
      this.ambientDust = [];
      const dustCount = ThreeDUtils.isMobile() ? 25 : 55;
      for (let i = 0; i < dustCount; i++) {
        this.ambientDust.push({
          x: (Math.random() - 0.5) * this.width * 1.3,
          y: (Math.random() - 0.5) * this.height * 1.3,
          z: Math.random() * 600 - 300,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.8 + 0.8,
          alpha: Math.random() * 0.4 + 0.1,
          color: Math.random() > 0.45 ? '#FF5E00' : (Math.random() > 0.5 ? '#0080FF' : '#6E3AFF')
        });
      }
    }

    createParticles() {
      this.particles = [];
      const count = this.options.particleCount;

      // Inbound data packets (Left -> Center)
      for (let i = 0; i < Math.floor(count * 0.55); i++) {
        const streamIdx = Math.floor(Math.random() * this.leftClusters.length);
        this.particles.push({
          type: 'inbound',
          streamIdx: streamIdx,
          branchIdx: Math.floor(Math.random() * (this.leftClusters[streamIdx].branches + 1)),
          progress: Math.random(),
          speed: (Math.random() * 0.004 + 0.002) * this.options.speed,
          size: Math.random() * 2.2 + 1.2,
          color: this.leftClusters[streamIdx].color,
          trail: []
        });
      }

      // Outbound threat / decision packets (Center -> Right)
      for (let i = 0; i < Math.floor(count * 0.45); i++) {
        const streamIdx = Math.floor(Math.random() * this.rightClusters.length);
        this.particles.push({
          type: 'outbound',
          streamIdx: streamIdx,
          branchIdx: Math.floor(Math.random() * (this.rightClusters[streamIdx].branches + 1)),
          progress: Math.random(),
          speed: (Math.random() * 0.005 + 0.003) * this.options.speed,
          size: Math.random() * 2.5 + 1.4,
          color: this.rightClusters[streamIdx].color,
          trail: []
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

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Smooth interpolation for mouse parallax and scroll physics
      this.mouse.x = ThreeDUtils.lerp(this.mouse.x, this.mouse.targetX, 0.045);
      this.mouse.y = ThreeDUtils.lerp(this.mouse.y, this.mouse.targetY, 0.045);
      this.scrollY = ThreeDUtils.lerp(this.scrollY, this.targetScrollY, 0.06);

      this.coreRotX = ThreeDUtils.lerp(this.coreRotX, this.targetRotX, 0.05);
      this.coreRotY = ThreeDUtils.lerp(this.coreRotY, this.targetRotY, 0.05) + 0.002;

      this.rotationAngle += 0.007;
      this.scanAngle += 0.028;
      this.pulsePhase += 0.035;

      const scrollShiftY = this.scrollY * -0.08;
      const centerX = this.width * 0.5 + this.mouse.x * 16;
      const centerY = this.height * 0.5 + this.mouse.y * 14 + scrollShiftY;

      // 1. Far-field spatial atmosphere and geometric grid
      this.drawFarBackground(centerX, centerY);

      // 2. Ambient luminous 3D dust particles
      this.drawAmbientDust(centerX, centerY);

      // 3. Compute Left & Right Node Network Positions (Hierarchical clusters: ○ → ○ → ○)
      const leftPositions = this.calculateClusterPositions('left', scrollShiftY);
      const rightPositions = this.calculateClusterPositions('right', scrollShiftY);

      // 4. Draw multi-branch curved stream paths
      this.drawStreamCurves(leftPositions, centerX, centerY, 'inbound');
      this.drawStreamCurves(rightPositions, centerX, centerY, 'outbound');

      // 5. Draw high-speed flowing data packets
      this.drawParticles(leftPositions, rightPositions, centerX, centerY);

      // 6. Draw Central 3D Computational Risk Engine (100% VISUAL - ZERO TEXT)
      this.drawCentralRiskEngine(centerX, centerY);

      // 7. Draw Abstract Visual Network Nodes & Satellite Orbiters (100% VISUAL)
      this.drawVisualNodes(leftPositions, this.leftClusters, 'left');
      this.drawVisualNodes(rightPositions, this.rightClusters, 'right');

      this.animId = requestAnimationFrame(() => this.render());
    }

    drawFarBackground(cx, cy) {
      const ctx = this.ctx;

      // Soft deep-blue atmospheric bloom on the left
      const leftGlow = ctx.createRadialGradient(
        this.width * 0.12 + this.mouse.x * 10,
        cy,
        20,
        this.width * 0.12,
        cy,
        this.width * 0.42
      );
      leftGlow.addColorStop(0, 'rgba(0, 128, 255, 0.09)');
      leftGlow.addColorStop(0.5, 'rgba(110, 58, 255, 0.04)');
      leftGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = leftGlow;
      ctx.beginPath();
      ctx.arc(this.width * 0.12, cy, this.width * 0.42, 0, Math.PI * 2);
      ctx.fill();

      // Soft warm solar-orange/crimson bloom on the right
      const rightGlow = ctx.createRadialGradient(
        this.width * 0.88 + this.mouse.x * 10,
        cy,
        20,
        this.width * 0.88,
        cy,
        this.width * 0.42
      );
      rightGlow.addColorStop(0, 'rgba(255, 94, 0, 0.10)');
      rightGlow.addColorStop(0.5, 'rgba(255, 46, 77, 0.04)');
      rightGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = rightGlow;
      ctx.beginPath();
      ctx.arc(this.width * 0.88, cy, this.width * 0.42, 0, Math.PI * 2);
      ctx.fill();

      // Central Horizon Light Kernel Beam
      const horizonGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 260);
      horizonGlow.addColorStop(0, 'rgba(255, 120, 0, 0.24)');
      horizonGlow.addColorStop(0.25, 'rgba(110, 58, 255, 0.12)');
      horizonGlow.addColorStop(0.6, 'rgba(0, 128, 255, 0.04)');
      horizonGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 260, 0, Math.PI * 2);
      ctx.fill();

      // Subtle Far-field Geometric Plus (+) Markers & Matrix Grid
      const gridSize = ThreeDUtils.isMobile() ? 90 : 130;
      const offsetX = (this.mouse.x * 8) % gridSize;
      const offsetY = (this.mouse.y * 8 + this.scrollY * -0.03) % gridSize;

      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      for (let x = -gridSize; x < this.width + gridSize; x += gridSize) {
        for (let y = -gridSize; y < this.height + gridSize; y += gridSize) {
          const px = x + offsetX;
          const py = y + offsetY;

          // Plus marker at grid intersections
          ctx.beginPath();
          ctx.moveTo(px - 3, py);
          ctx.lineTo(px + 3, py);
          ctx.moveTo(px, py - 3);
          ctx.lineTo(px, py + 3);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    drawAmbientDust(cx, cy) {
      const ctx = this.ctx;
      for (let i = 0; i < this.ambientDust.length; i++) {
        const d = this.ambientDust[i];
        d.x += d.vx;
        d.y += d.vy;

        // Wrap around boundaries
        if (d.x > this.width * 0.7) d.x = -this.width * 0.7;
        if (d.x < -this.width * 0.7) d.x = this.width * 0.7;
        if (d.y > this.height * 0.7) d.y = -this.height * 0.7;
        if (d.y < -this.height * 0.7) d.y = this.height * 0.7;

        const proj = ThreeDUtils.project3D(
          d.x + this.mouse.x * 20,
          d.y + this.mouse.y * 20,
          d.z,
          cx,
          cy,
          450
        );

        if (proj.visible) {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, d.size * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = d.color;
          ctx.globalAlpha = d.alpha * ThreeDUtils.clamp(proj.scale, 0.2, 1.2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;
    }

    calculateClusterPositions(side, scrollShiftY) {
      const isLeft = side === 'left';
      const clusters = isLeft ? this.leftClusters : this.rightClusters;
      const count = clusters.length;
      const positions = [];

      const marginX = ThreeDUtils.isMobile() ? 25 : Math.max(40, this.width * 0.07);
      const baseX = isLeft ? marginX : this.width - marginX;

      const topY = this.height * 0.15;
      const bottomY = this.height * 0.85;
      const stepY = (bottomY - topY) / (count - 1);

      for (let i = 0; i < count; i++) {
        // Natural curved arc profile
        const curveOffset = Math.sin((i / (count - 1)) * Math.PI) * (this.width * 0.045);
        const rootX = isLeft
          ? baseX + curveOffset + this.mouse.x * -10
          : baseX - curveOffset + this.mouse.x * -10;
        const rootY = topY + i * stepY + this.mouse.y * -10 + scrollShiftY;

        // Sub-branches (hierarchical child nodes ○ → ○)
        const subNodes = [];
        const numBranches = clusters[i].branches || 1;

        for (let b = 0; b < numBranches; b++) {
          const branchAngle = (b - (numBranches - 1) / 2) * 0.45;
          const branchDist = ThreeDUtils.isMobile() ? 22 : 36;
          const dirX = isLeft ? 1 : -1;
          const bx = rootX + Math.cos(branchAngle) * branchDist * dirX;
          const by = rootY + Math.sin(branchAngle) * branchDist;
          subNodes.push({ x: bx, y: by });
        }

        positions.push({
          root: { x: rootX, y: rootY },
          branches: subNodes
        });
      }

      return positions;
    }

    drawStreamCurves(clusterPositions, cx, cy, direction) {
      const ctx = this.ctx;
      const isOutbound = direction === 'outbound';
      const clusters = isOutbound ? this.rightClusters : this.leftClusters;

      for (let i = 0; i < clusterPositions.length; i++) {
        const cluster = clusterPositions[i];
        const data = clusters[i];

        // Draw primary streamline from root to center
        ctx.save();
        ctx.beginPath();
        const startPoint = cluster.root;
        ctx.moveTo(startPoint.x, startPoint.y);

        const cp1x = isOutbound
          ? cx + (startPoint.x - cx) * 0.28
          : startPoint.x + (cx - startPoint.x) * 0.52;
        const cp1y = startPoint.y;
        const cp2x = isOutbound
          ? cx + (startPoint.x - cx) * 0.72
          : cx - (cx - startPoint.x) * 0.28;
        const cp2y = cy + (startPoint.y - cy) * 0.25;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cx, cy);

        // Faint futuristic guide path
        ctx.strokeStyle = data.color;
        ctx.globalAlpha = 0.16;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([5, 8]);
        ctx.stroke();
        ctx.restore();

        // Draw sub-branch vectors (○ → ○ relationships)
        for (let b = 0; b < cluster.branches.length; b++) {
          const bNode = cluster.branches[b];
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(startPoint.x, startPoint.y);
          ctx.lineTo(bNode.x, bNode.y);
          ctx.strokeStyle = data.branchColor;
          ctx.globalAlpha = 0.22;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Streamline from child node to main carrier
          ctx.beginPath();
          ctx.moveTo(bNode.x, bNode.y);
          const bcp1x = isOutbound ? cx + (bNode.x - cx) * 0.35 : bNode.x + (cx - bNode.x) * 0.45;
          const bcp1y = bNode.y;
          const bcp2x = isOutbound ? cx + (bNode.x - cx) * 0.65 : cx - (cx - bNode.x) * 0.35;
          const bcp2y = cy + (bNode.y - cy) * 0.2;
          ctx.bezierCurveTo(bcp1x, bcp1y, bcp2x, bcp2y, cx, cy);
          ctx.strokeStyle = data.branchColor;
          ctx.globalAlpha = 0.1;
          ctx.lineWidth = 0.9;
          ctx.setLineDash([3, 6]);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    getBezierPoint(p0, p1, p2, p3, t) {
      const cX = 3 * (p1.x - p0.x);
      const bX = 3 * (p2.x - p1.x) - cX;
      const aX = p3.x - p0.x - cX - bX;

      const cY = 3 * (p1.y - p0.y);
      const bY = 3 * (p2.y - p1.y) - cY;
      const aY = p3.y - p0.y - cY - bY;

      const x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
      const y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

      return { x, y };
    }

    drawParticles(leftPositions, rightPositions, cx, cy) {
      const ctx = this.ctx;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.trail = [];
        }

        let p0, p1, p2, p3;
        if (p.type === 'inbound') {
          const cluster = leftPositions[p.streamIdx] || leftPositions[0];
          const node = p.branchIdx > 0 && cluster.branches[p.branchIdx - 1]
            ? cluster.branches[p.branchIdx - 1]
            : cluster.root;

          p0 = { x: node.x, y: node.y };
          p1 = { x: node.x + (cx - node.x) * 0.5, y: node.y };
          p2 = { x: cx - (cx - node.x) * 0.3, y: cy + (node.y - cy) * 0.25 };
          p3 = { x: cx, y: cy };
        } else {
          const cluster = rightPositions[p.streamIdx] || rightPositions[0];
          const node = p.branchIdx > 0 && cluster.branches[p.branchIdx - 1]
            ? cluster.branches[p.branchIdx - 1]
            : cluster.root;

          p0 = { x: cx, y: cy };
          p1 = { x: cx + (node.x - cx) * 0.3, y: cy + (node.y - cy) * 0.25 };
          p2 = { x: cx + (node.x - cx) * 0.7, y: node.y };
          p3 = { x: node.x, y: node.y };
        }

        const currentPos = this.getBezierPoint(p0, p1, p2, p3, p.progress);

        // Record trailing particle vectors
        p.trail.push({ x: currentPos.x, y: currentPos.y });
        if (p.trail.length > 9) p.trail.shift();

        // Draw flowing luminous streak trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.4;
          ctx.lineWidth = p.size * 0.8;
          ctx.stroke();
        }

        // Draw high-energy packet head
        ctx.beginPath();
        ctx.arc(currentPos.x, currentPos.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }
    }

    drawCentralRiskEngine(cx, cy) {
      const ctx = this.ctx;
      const baseR = ThreeDUtils.isMobile() ? 72 : 115;

      ctx.save();
      ctx.translate(cx, cy);

      // Layer 1: Outer Celestial Telemetry Orbit Ring
      ctx.save();
      ctx.rotate(this.rotationAngle * 0.4);
      ctx.strokeStyle = 'rgba(255, 94, 0, 0.28)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, baseR + 50, 0, Math.PI * 2);
      ctx.stroke();

      // Cardinal tick notches
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        const r1 = baseR + 45;
        const r2 = baseR + 55;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * r1, Math.sin(ang) * r1);
        ctx.lineTo(Math.cos(ang) * r2, Math.sin(ang) * r2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.restore();

      // Layer 2: 3D Rotating Geodesic Wireframe Lattice (Icosahedron Core Shell)
      ctx.save();
      const transformedCoreVertices = this.coreVertices.map(v => {
        const scaled = { x: v.x * (baseR * 0.9), y: v.y * (baseR * 0.9), z: v.z * (baseR * 0.9) };
        const rot = ThreeDUtils.rotatePoint3D(scaled, this.coreRotX, this.coreRotY, this.rotationAngle * 0.3);
        const proj = ThreeDUtils.project3D(rot.x, rot.y, rot.z, 0, 0, 480);
        return { proj, rot };
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < this.coreEdges.length; i++) {
        const [idxA, idxB] = this.coreEdges[i];
        const vA = transformedCoreVertices[idxA];
        const vB = transformedCoreVertices[idxB];

        const avgZ = (vA.rot.z + vB.rot.z) / 2;
        const depthAlpha = ThreeDUtils.mapRange(avgZ, -baseR, baseR, 0.08, 0.5);

        ctx.beginPath();
        ctx.moveTo(vA.proj.x, vA.proj.y);
        ctx.lineTo(vB.proj.x, vB.proj.y);
        ctx.strokeStyle = `rgba(255, 110, 0, ${depthAlpha})`;
        ctx.stroke();
      }

      // Geodesic vertex hubs (micro-beacons)
      for (let i = 0; i < transformedCoreVertices.length; i++) {
        const v = transformedCoreVertices[i];
        if (v.proj.visible) {
          ctx.beginPath();
          ctx.arc(v.proj.x, v.proj.y, 2.5 * v.proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#00E699';
          ctx.globalAlpha = ThreeDUtils.clamp(v.proj.scale, 0.3, 1);
          ctx.fill();
        }
      }
      ctx.restore();

      // Layer 3: Concentric Gyroscope Gimbal Rings with Orbiting Satellites
      ctx.save();
      ctx.rotate(-this.rotationAngle * 1.1);
      ctx.strokeStyle = 'rgba(110, 58, 255, 0.45)';
      ctx.lineWidth = 2;
      ctx.setLineDash([16, 8, 4, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, baseR + 22, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 4; i++) {
        const ang = (i * Math.PI) / 2;
        const ox = Math.cos(ang) * (baseR + 22);
        const oy = Math.sin(ang) * (baseR + 22);
        ctx.beginPath();
        ctx.arc(ox, oy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00E699';
        ctx.shadowColor = '#00E699';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // Layer 4: Scanning Radar Conic Sweep Arc
      ctx.save();
      const scanGrad = ctx.createConicGradient(this.scanAngle, 0, 0);
      scanGrad.addColorStop(0, 'rgba(255, 94, 0, 0.38)');
      scanGrad.addColorStop(0.18, 'rgba(255, 94, 0, 0)');
      scanGrad.addColorStop(1, 'rgba(255, 94, 0, 0)');
      ctx.fillStyle = scanGrad;
      ctx.beginPath();
      ctx.arc(0, 0, baseR - 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, baseR - 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Layer 5: Inner High-Energy Pulsing Luminous Kernel (Pure Abstract Energy Pulse)
      const corePulse = Math.sin(this.pulsePhase * 1.5) * 5;
      const kernelR = baseR * 0.58 + corePulse;
      const coreGrad = ctx.createRadialGradient(0, 0, 3, 0, 0, kernelR);
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.2, '#FF7729');
      coreGrad.addColorStop(0.55, '#FF2E4D');
      coreGrad.addColorStop(0.85, 'rgba(110, 58, 255, 0.35)');
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, kernelR, 0, Math.PI * 2);
      ctx.fill();

      // Core targeting reticle crosshair
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(12, 0);
      ctx.moveTo(0, -12);
      ctx.lineTo(0, 12);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    drawVisualNodes(clusterPositions, clusterData, side) {
      const ctx = this.ctx;
      const isLeft = side === 'left';

      for (let i = 0; i < clusterPositions.length; i++) {
        const cluster = clusterPositions[i];
        const data = clusterData[i];
        const rootPos = cluster.root;
        const r = ThreeDUtils.isMobile() ? 12 : data.size || 15;

        // 1. Draw Primary Ingestion/Threat Node (○)
        ctx.save();
        ctx.translate(rootPos.x, rootPos.y);

        // Pulsing halo wave
        const pulse = Math.sin(this.pulsePhase * 1.2 + data.pulseOffset) * 3;
        ctx.beginPath();
        ctx.arc(0, 0, r + 5 + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = data.color;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Outer tech ring with notches
        ctx.beginPath();
        ctx.arc(0, 0, r + 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dark glass node disc
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(13, 17, 26, 0.94)';
        ctx.strokeStyle = data.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1.0;
        ctx.fill();
        ctx.stroke();

        // Inner glowing core beacon
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = data.color;
        ctx.shadowColor = data.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Orbiting satellite micro-node
        const orbitAng = this.rotationAngle * 1.8 + i;
        const ox = Math.cos(orbitAng) * (r + 7);
        const oy = Math.sin(orbitAng) * (r + 7);
        ctx.beginPath();
        ctx.arc(ox, oy, 2, 0, Math.PI * 2);
        ctx.fillStyle = data.branchColor || '#FFFFFF';
        ctx.fill();

        ctx.restore();

        // 2. Draw Sub-Branch Child Nodes (○ → ○ Relationships)
        for (let b = 0; b < cluster.branches.length; b++) {
          const bNode = cluster.branches[b];
          const subR = r * 0.65;

          ctx.save();
          ctx.translate(bNode.x, bNode.y);

          // Sub-node circle
          ctx.beginPath();
          ctx.arc(0, 0, subR, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(13, 17, 26, 0.9)';
          ctx.strokeStyle = data.branchColor;
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();

          // Sub-node center dot
          ctx.beginPath();
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = data.branchColor;
          ctx.shadowColor = data.branchColor;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.restore();
        }
      }
    }
  }

  return {
    create: (containerId, options) => new SignalFlow(containerId, options)
  };
})();
