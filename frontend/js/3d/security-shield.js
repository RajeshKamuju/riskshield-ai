/**
 * RiskShield AI — 3D Security Shield Architecture Visualization
 * Layered enterprise security architecture with 3D rotation and exploded spatial layers on hover.
 */

window.SecurityShield3D = (function() {
  'use strict';

  class ShieldVisualization {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container || ThreeDUtils.isReducedMotion()) return;

      this.rotX = 18;
      this.rotY = -22;
      this.targetRotX = 18;
      this.targetRotY = -22;
      this.stack = this.container.querySelector('.shield-layer-stack');

      this.init();
    }

    init() {
      if (!this.stack) return;

      this.container.addEventListener('mousemove', (e) => {
        if (ThreeDUtils.isMobile()) return;
        const rect = this.container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        this.targetRotY = -22 + x * 25;
        this.targetRotX = 18 - y * 20;
      }, { passive: true });

      this.container.addEventListener('mouseleave', () => {
        this.targetRotX = 18;
        this.targetRotY = -22;
      });

      this.render();
    }

    render() {
      this.rotX = ThreeDUtils.lerp(this.rotX, this.targetRotX, 0.08);
      this.rotY = ThreeDUtils.lerp(this.rotY, this.targetRotY, 0.08);

      if (this.stack) {
        this.stack.style.transform = `rotateX(${this.rotX.toFixed(2)}deg) rotateY(${this.rotY.toFixed(2)}deg) rotateZ(3deg)`;
      }

      requestAnimationFrame(() => this.render());
    }
  }

  return {
    init: (containerId) => new ShieldVisualization(containerId)
  };
})();
