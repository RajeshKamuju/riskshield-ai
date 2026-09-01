/**
 * RiskShield AI — 3D Parallax & Card Tilt Physics Engine
 * Smooth mouse parallax interpolation, perspective card tilts (5-8 deg max),
 * and dynamic specular glare reflections.
 */

window.ThreeDParallax = (function() {
  'use strict';

  class ParallaxEngine {
    constructor() {
      if (ThreeDUtils.isReducedMotion()) return;

      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.depthLayers = [];
      this.tiltCards = [];
      this.animId = null;

      this.init();
    }

    init() {
      this.scanElements();

      window.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        this.mouse.targetX = (e.clientX - cx) / cx;
        this.mouse.targetY = (e.clientY - cy) / cy;
      }, { passive: true });

      // Initialize card tilt listeners
      this.initCardTilt();

      // Start continuous parallax loop
      this.render();
    }

    scanElements() {
      this.depthLayers = Array.from(document.querySelectorAll('[data-3d-depth]')).map(el => {
        return {
          element: el,
          depth: parseFloat(el.getAttribute('data-3d-depth') || '0.05'),
          currentX: 0,
          currentY: 0
        };
      });
    }

    initCardTilt() {
      const cards = document.querySelectorAll('.card-3d-tilt, .problem-card, .workflow-card, .signal-card, .metric-box');
      
      cards.forEach(card => {
        card.classList.add('card-3d-tilt');

        card.addEventListener('mousemove', (e) => {
          if (ThreeDUtils.isMobile()) return;

          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          // Max 5-8 degrees rotation
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;

          // Set dynamic specular glare position
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          card.style.setProperty('--glare-x', `${glareX}%`);
          card.style.setProperty('--glare-y', `${glareY}%`);

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
      });
    }

    render() {
      this.mouse.x = ThreeDUtils.lerp(this.mouse.x, this.mouse.targetX, 0.05);
      this.mouse.y = ThreeDUtils.lerp(this.mouse.y, this.mouse.targetY, 0.05);

      for (let i = 0; i < this.depthLayers.length; i++) {
        const layer = this.depthLayers[i];
        const moveX = this.mouse.x * layer.depth * 40;
        const moveY = this.mouse.y * layer.depth * 40;

        layer.currentX = ThreeDUtils.lerp(layer.currentX, moveX, 0.08);
        layer.currentY = ThreeDUtils.lerp(layer.currentY, moveY, 0.08);

        layer.element.style.transform = `translate3d(${layer.currentX.toFixed(2)}px, ${layer.currentY.toFixed(2)}px, 0)`;
      }

      this.animId = requestAnimationFrame(() => this.render());
    }
  }

  return {
    init: () => new ParallaxEngine()
  };
})();
