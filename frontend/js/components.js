/**
 * RiskShield AI - Shared UI Component Helpers
 */

const UI = {
  /**
   * Generates a color-coded Risk Level Badge HTML
   */
  renderRiskBadge(level, score) {
    const lvl = (level || 'LOW').toUpperCase();
    let badgeClass = 'badge-risk-low';
    if (lvl === 'CRITICAL') badgeClass = 'badge-risk-critical';
    else if (lvl === 'HIGH') badgeClass = 'badge-risk-high';
    else if (lvl === 'MEDIUM') badgeClass = 'badge-risk-medium';

    return `<span class="badge-risk ${badgeClass}">${lvl} ${score !== undefined ? `(${score})` : ''}</span>`;
  },

  /**
   * Formats Indian Rupee values
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  },

  /**
   * Updates SVG circular gauge progress
   */
  updateGauge(score, circleElementId, scoreTextId, levelTextId) {
    const circle = document.getElementById(circleElementId);
    const scoreText = document.getElementById(scoreTextId);
    const levelText = document.getElementById(levelTextId);

    const circumference = 2 * Math.PI * 90; // 565.48
    const offset = circumference - (score / 100) * circumference;

    if (circle) {
      circle.style.strokeDashoffset = offset;
    }
    if (scoreText) {
      scoreText.innerText = score;
    }
    if (levelText) {
      let level = 'LOW RISK';
      let color = '#00E699';
      if (score >= 80) { level = 'CRITICAL RISK'; color = '#FF2E4D'; }
      else if (score >= 60) { level = 'HIGH RISK'; color = '#FF6B00'; }
      else if (score >= 30) { level = 'MEDIUM RISK'; color = '#FFB800'; }

      levelText.innerText = level;
      levelText.style.color = color;
      if (scoreText) scoreText.style.color = color;
    }
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.UI = UI;
}
