/**
 * RiskShield AI — 3D Mathematical & Utility Framework
 * Provides high-performance spatial math, visibility tracking, and pointer dampening.
 */

window.ThreeDUtils = (function() {
  'use strict';

  const isReducedMotion = () => {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const isMobile = () => {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  // Visibility tracker to suspend rendering loops when element is outside viewport
  const createVisibilityObserver = (element, onVisible, onHidden) => {
    if (!element || !('IntersectionObserver' in window)) {
      if (onVisible) onVisible();
      return null;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (onVisible) onVisible();
        } else {
          if (onHidden) onHidden();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(element);
    return observer;
  };

  // High-DPI canvas resolution scaler
  const setupHiDPICanvas = (canvas, ctx) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.scale(dpr, dpr);
    return { width: rect.width, height: rect.height, dpr };
  };

  // 3D Point projection onto 2D canvas with perspective depth
  const project3D = (x, y, z, cx, cy, fov = 400) => {
    const distance = fov + z;
    if (distance <= 0.001) return { x: cx, y: cy, scale: 0, visible: false };
    const scale = fov / distance;
    return {
      x: cx + x * scale,
      y: cy + y * scale,
      scale: scale,
      visible: true
    };
  };

  // Rotate a point in 3D around X, Y, Z axes
  const rotatePoint3D = (point, rx, ry, rz = 0) => {
    let { x, y, z } = point;

    // Rotate around Y axis
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    // Rotate around X axis
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    // Rotate around Z axis
    const cosZ = Math.cos(rz);
    const sinZ = Math.sin(rz);
    const x3 = x1 * cosZ - y2 * sinZ;
    const y3 = x1 * sinZ + y2 * cosZ;

    return { x: x3, y: y2, z: z2 };
  };

  return {
    isReducedMotion,
    isMobile,
    lerp,
    clamp,
    mapRange,
    createVisibilityObserver,
    setupHiDPICanvas,
    project3D,
    rotatePoint3D
  };
})();
