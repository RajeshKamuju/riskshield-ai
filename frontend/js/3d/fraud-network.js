/**
 * RiskShield AI — 3D Fraud Relationship Network Graph
 * Spatial intelligence graph connecting Customer, Device, IP, Location, Transaction, Merchant.
 * Features 3D rotation, node hover elevation, animated connection vectors, and floating intel panels.
 */

window.FraudNetwork3D = (function() {
  'use strict';

  class NetworkGraph {
    constructor(canvasId, panelId, options = {}) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.panel = document.getElementById(panelId);
      this.options = Object.assign({
        interactive: true
      }, options);

      this.rotX = 0.25;
      this.rotY = 0.5;
      this.targetRotX = 0.25;
      this.targetRotY = 0.5;
      this.isDragging = false;
      this.dragStart = { x: 0, y: 0 };
      this.hoveredNode = null;
      this.animTime = 0;

      // Define 3D entity nodes
      this.nodes = [
        {
          id: 'txn',
          type: 'TRANSACTION',
          label: 'TXN-92841 (₹75k)',
          x: 0, y: 0, z: 0,
          color: '#FF2E4D',
          size: 14,
          data: {
            title: 'Critical Transaction',
            id: 'TXN-92841',
            details: '₹75,000 via UPI (Immediate Hard Block)',
            risk: 'CRITICAL (92/100)',
            metric1: 'Status: BLOCKED',
            metric2: 'Channel: UPI Intent'
          }
        },
        {
          id: 'cust',
          type: 'CUSTOMER',
          label: 'CUST-84920 (Arjun Rao)',
          x: -110, y: -60, z: 40,
          color: '#FF5E00',
          size: 10,
          data: {
            title: 'Customer Profile',
            id: 'CUST-84920',
            details: 'Arjun Rao • Mumbai, India',
            risk: 'HIGH RISK (Compromised ATO)',
            metric1: 'Associated Accounts: 1',
            metric2: '30-Day Avg: ₹8,920'
          }
        },
        {
          id: 'dev',
          type: 'DEVICE',
          label: 'DEV-92831 (Canvas Fingerprint)',
          x: 100, y: -70, z: -50,
          color: '#FF6B00',
          size: 9,
          data: {
            title: 'Hardware Profile',
            id: 'DEV-92831',
            details: 'Novel WebGL & Canvas Hash',
            risk: 'HIGH (Unrecognized Profile)',
            metric1: 'Associated Accounts: 4',
            metric2: 'Total Transactions: 128'
          }
        },
        {
          id: 'ip',
          type: 'IP_ADDRESS',
          label: 'IP: 185.220.101.99 (Tor Exit)',
          x: 120, y: 50, z: 60,
          color: '#FF2E4D',
          size: 10,
          data: {
            title: 'Network Intelligence',
            id: '185.220.101.99',
            details: 'Active Tor Exit Node (AS208323)',
            risk: 'CRITICAL (Tor Anonymous)',
            metric1: 'Fraud Reports: 23',
            metric2: 'Proxy Match: 100%'
          }
        },
        {
          id: 'loc',
          type: 'LOCATION',
          label: 'Location: Frankfurt ➔ Mumbai',
          x: -100, y: 70, z: -40,
          color: '#6E3AFF',
          size: 8,
          data: {
            title: 'Geolocation Telemetry',
            id: 'GEO-HOP-992',
            details: 'Impossible Travel Jump (6,400 km in 12m)',
            risk: 'HIGH (Impossible Velocity)',
            metric1: 'Speed: 32,000 km/h',
            metric2: 'Confidence: 99.4%'
          }
        },
        {
          id: 'merch',
          type: 'MERCHANT',
          label: 'MERCH-1002 (Acme Electronics)',
          x: 0, y: 120, z: 20,
          color: '#00E699',
          size: 9,
          data: {
            title: 'Merchant Profile',
            id: 'MERCH-1002',
            details: 'Acme Electronics Superstore',
            risk: 'LOW / TRUSTED (85 Score)',
            metric1: 'Chargeback Rate: 0.42%',
            metric2: 'MCC: 5732 Electronics'
          }
        }
      ];

      // Dynamic graph edges connecting entities
      this.edges = [
        { from: 'txn', to: 'cust', color: '#FF5E00', pulse: 0 },
        { from: 'txn', to: 'dev', color: '#FF6B00', pulse: 0.3 },
        { from: 'txn', to: 'ip', color: '#FF2E4D', pulse: 0.6 },
        { from: 'txn', to: 'loc', color: '#6E3AFF', pulse: 0.8 },
        { from: 'txn', to: 'merch', color: '#00E699', pulse: 0.2 },
        { from: 'cust', to: 'dev', color: 'rgba(255, 255, 255, 0.1)', pulse: 0.5 },
        { from: 'dev', to: 'ip', color: 'rgba(255, 255, 255, 0.1)', pulse: 0.7 }
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

      // Interactive mouse / touch dragging for 3D rotation
      if (this.canvas) {
        this.canvas.addEventListener('mousedown', (e) => {
          this.isDragging = true;
          this.dragStart = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mousemove', (e) => {
          if (this.isDragging) {
            const dx = e.clientX - this.dragStart.x;
            const dy = e.clientY - this.dragStart.y;
            this.targetRotY += dx * 0.008;
            this.targetRotX -= dy * 0.008;
            this.dragStart = { x: e.clientX, y: e.clientY };
          } else {
            this.handleNodeHover(e);
          }
        });

        window.addEventListener('mouseup', () => {
          this.isDragging = false;
        });

        // Touch support
        this.canvas.addEventListener('touchstart', (e) => {
          if (e.touches.length === 1) {
            this.isDragging = true;
            this.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
          if (this.isDragging && e.touches.length === 1) {
            const dx = e.touches[0].clientX - this.dragStart.x;
            const dy = e.touches[0].clientY - this.dragStart.y;
            this.targetRotY += dx * 0.01;
            this.targetRotX -= dy * 0.01;
            this.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
        }, { passive: true });

        window.addEventListener('touchend', () => {
          this.isDragging = false;
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

    handleNodeHover(e) {
      if (!this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let foundNode = null;
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        if (node.proj && node.proj.visible) {
          const dist = Math.hypot(mouseX - node.proj.x, mouseY - node.proj.y);
          if (dist < (node.size * node.proj.scale + 12)) {
            foundNode = node;
            break;
          }
        }
      }

      if (this.hoveredNode !== foundNode) {
        this.hoveredNode = foundNode;
        this.updatePanel();
      }
    }

    updatePanel() {
      if (!this.panel) return;
      if (this.hoveredNode) {
        const data = this.hoveredNode.data;
        this.panel.innerHTML = `
          <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-orange); text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">
            ${this.hoveredNode.type} ENTITY
          </div>
          <div style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">
            ${data.title}
          </div>
          <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;">
            ${data.details}
          </p>
          <div style="display: flex; justify-content: space-between; font-size: 0.7rem; font-family: var(--font-mono); border-top: 1px solid var(--border-subtle); padding-top: 6px;">
            <span>${data.metric1}</span>
            <span style="color: var(--risk-critical); font-weight: 700;">${data.risk}</span>
          </div>
        `;
        this.panel.classList.add('active');
      } else {
        this.panel.classList.remove('active');
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

      this.animTime += 0.02;
      this.rotX = ThreeDUtils.lerp(this.rotX, this.targetRotX, 0.08);
      this.rotY = ThreeDUtils.lerp(this.rotY, this.targetRotY, 0.08) + (this.isDragging ? 0 : 0.002);

      const cx = this.width / 2;
      const cy = this.height / 2;

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Project Nodes to 3D Screen Space
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        let elevZ = node.z;
        if (this.hoveredNode && this.hoveredNode.id === node.id) {
          elevZ += 40; // Hover elevation forward in 3D
        }
        const rotP = ThreeDUtils.rotatePoint3D({ x: node.x, y: node.y, z: elevZ }, this.rotX, this.rotY);
        node.proj = ThreeDUtils.project3D(rotP.x, rotP.y, rotP.z, cx, cy, 450);
        node.rot = rotP;
      }

      // Draw Connection Vectors
      for (let i = 0; i < this.edges.length; i++) {
        const edge = this.edges[i];
        const nA = this.nodes.find(n => n.id === edge.from);
        const nB = this.nodes.find(n => n.id === edge.to);

        if (nA && nB && nA.proj.visible && nB.proj.visible) {
          const isRelated = !this.hoveredNode || this.hoveredNode.id === nA.id || this.hoveredNode.id === nB.id;
          const alpha = isRelated ? 0.45 : 0.08;

          this.ctx.beginPath();
          this.ctx.moveTo(nA.proj.x, nA.proj.y);
          this.ctx.lineTo(nB.proj.x, nB.proj.y);
          this.ctx.strokeStyle = isRelated ? edge.color : 'rgba(255, 255, 255, 0.08)';
          this.ctx.lineWidth = isRelated ? 1.5 : 0.8;
          this.ctx.stroke();

          // Animated data packets flowing across edges
          if (isRelated) {
            const progress = (this.animTime * 0.4 + edge.pulse) % 1;
            const px = ThreeDUtils.lerp(nA.proj.x, nB.proj.x, progress);
            const py = ThreeDUtils.lerp(nA.proj.y, nB.proj.y, progress);

            this.ctx.beginPath();
            this.ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            this.ctx.fillStyle = edge.color;
            this.ctx.shadowColor = edge.color;
            this.ctx.shadowBlur = 8;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
          }
        }
      }

      // Draw Nodes (Sorted by Depth Z for correct occlusion)
      const sortedNodes = [...this.nodes].sort((a, b) => a.rot.z - b.rot.z);

      for (let i = 0; i < sortedNodes.length; i++) {
        const node = sortedNodes[i];
        if (!node.proj.visible) continue;

        const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;
        const isDimmed = this.hoveredNode && this.hoveredNode.id !== node.id;
        const scale = node.proj.scale * (isHovered ? 1.35 : 1);
        const radius = node.size * scale;
        const alpha = isDimmed ? 0.35 : 1;

        // Outer glow halo
        this.ctx.beginPath();
        this.ctx.arc(node.proj.x, node.proj.y, radius * 1.8, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 94, 0, ${0.1 * alpha})`;
        this.ctx.fill();

        // Node Body
        this.ctx.beginPath();
        this.ctx.arc(node.proj.x, node.proj.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = node.color;
        this.ctx.globalAlpha = alpha;
        this.ctx.shadowColor = node.color;
        this.ctx.shadowBlur = isHovered ? 20 : 10;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;

        // Node Label
        this.ctx.font = `${Math.floor((isHovered ? 11 : 9.5) * node.proj.scale)}px 'JetBrains Mono', monospace`;
        this.ctx.fillStyle = isHovered ? '#FFFFFF' : `rgba(255, 255, 255, ${0.7 * alpha})`;
        this.ctx.fillText(node.label, node.proj.x + radius + 6, node.proj.y + 4);
      }

      this.animId = requestAnimationFrame(() => this.render());
    }
  }

  return {
    create: (canvasId, panelId, options) => new NetworkGraph(canvasId, panelId, options)
  };
})();
