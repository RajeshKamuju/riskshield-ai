/**
 * RiskShield AI - Landing Page Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Circular Gauge with Hero Highlight Case (Score: 92)
  if (window.UI && document.getElementById('heroGaugeCircle')) {
    window.UI.updateGauge(92, 'heroGaugeCircle', 'heroGaugeScore', 'heroGaugeLevel');
  }

  // Interactive Scenario Switcher
  const scenarioButtons = document.querySelectorAll('.scenario-tab-btn');
  scenarioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const scenarioId = btn.getAttribute('data-scenario-id');
      scenarioButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const scenario = MOCK_DATA.fraudScenarios.find(s => s.id === scenarioId);
      if (scenario) {
        const titleEl = document.getElementById('scenarioDetailTitle');
        const descEl = document.getElementById('scenarioDetailDesc');
        const scoreEl = document.getElementById('scenarioDetailScore');
        const decisionEl = document.getElementById('scenarioDetailDecision');
        const signalsEl = document.getElementById('scenarioDetailSignals');

        if (titleEl) titleEl.innerText = scenario.title;
        if (descEl) descEl.innerText = scenario.summary;
        if (scoreEl) scoreEl.innerText = `${scenario.riskScore}/100`;
        if (decisionEl) decisionEl.innerText = scenario.decision;
        
        if (signalsEl) {
          signalsEl.innerHTML = scenario.keySignals.map(sig => 
            `<li class="factor-item"><span class="factor-name">${sig}</span></li>`
          ).join('');
        }
      }
    });
  });

  // Interactive Mini Risk Simulator
  const simAmountInput = document.getElementById('simAmount');
  const simAmountDisplay = document.getElementById('simAmountDisplay');
  const simTorCheckbox = document.getElementById('simTorCheckbox');
  const simDeviceCheckbox = document.getElementById('simDeviceCheckbox');
  const simVelocityInput = document.getElementById('simVelocity');
  const simVelocityDisplay = document.getElementById('simVelocityDisplay');
  const simEvalBtn = document.getElementById('simEvalBtn');

  function calculateInteractiveScore() {
    const amount = Number(simAmountInput ? simAmountInput.value : 50000);
    const velocity = Number(simVelocityInput ? simVelocityInput.value : 1);
    const isTor = simTorCheckbox ? simTorCheckbox.checked : false;
    const isNewDev = simDeviceCheckbox ? simDeviceCheckbox.checked : false;

    let score = 12;
    if (amount > 80000) score += 35;
    else if (amount > 40000) score += 20;

    if (velocity > 4) score += 30;
    else if (velocity > 2) score += 15;

    if (isTor) score += 25;
    if (isNewDev) score += 18;

    score = Math.min(99, score);
    const decision = score >= 80 ? 'BLOCK' : score >= 60 ? 'REVIEW' : score >= 30 ? 'MONITOR' : 'APPROVE';
    
    // Update UI elements
    const simScoreVal = document.getElementById('simResultScore');
    const simDecisionVal = document.getElementById('simResultDecision');
    const simMeterFill = document.getElementById('simMeterFill');

    if (simScoreVal) simScoreVal.innerText = score;
    if (simDecisionVal) {
      simDecisionVal.innerText = decision;
      simDecisionVal.className = `badge-risk badge-risk-${score >= 80 ? 'critical' : score >= 60 ? 'high' : score >= 30 ? 'medium' : 'low'}`;
    }
    if (simMeterFill) {
      simMeterFill.style.width = `${score}%`;
      simMeterFill.style.backgroundColor = score >= 80 ? '#FF2E4D' : score >= 60 ? '#FF6B00' : score >= 30 ? '#FFB800' : '#00E699';
    }
  }

  if (simAmountInput && simAmountDisplay) {
    simAmountInput.addEventListener('input', (e) => {
      simAmountDisplay.innerText = window.UI ? window.UI.formatCurrency(e.target.value) : `₹${e.target.value}`;
      calculateInteractiveScore();
    });
  }

  if (simVelocityInput && simVelocityDisplay) {
    simVelocityInput.addEventListener('input', (e) => {
      simVelocityDisplay.innerText = `${e.target.value} txns / 5 min`;
      calculateInteractiveScore();
    });
  }

  if (simTorCheckbox) simTorCheckbox.addEventListener('change', calculateInteractiveScore);
  if (simDeviceCheckbox) simDeviceCheckbox.addEventListener('change', calculateInteractiveScore);
  if (simEvalBtn) simEvalBtn.addEventListener('click', calculateInteractiveScore);
});
