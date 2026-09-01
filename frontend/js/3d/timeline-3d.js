/**
 * RiskShield AI — 3D Investigation Timeline with Spatial Perspective
 */

window.Timeline3D = (function() {
  'use strict';

  class SpatialTimeline {
    constructor(containerSelector = '.timeline-3d-track') {
      this.tracks = document.querySelectorAll(containerSelector);
      if (!this.tracks.length || ThreeDUtils.isReducedMotion()) return;
      this.init();
    }

    init() {
      this.tracks.forEach(track => {
        const nodes = track.querySelectorAll('.timeline-3d-node, .investigation-event');
        nodes.forEach((node, idx) => {
          node.classList.add('timeline-3d-node');
          const zDepth = (nodes.length - idx) * 8;
          node.style.transform = `translateZ(${zDepth}px)`;
          
          node.addEventListener('mouseenter', () => {
            node.style.transform = `translateZ(${zDepth + 35}px) translateX(8px) scale(1.02)`;
          });

          node.addEventListener('mouseleave', () => {
            node.style.transform = `translateZ(${zDepth}px) translateX(0px) scale(1)`;
          });
        });
      });
    }
  }

  return {
    init: (selector) => new SpatialTimeline(selector)
  };
})();
