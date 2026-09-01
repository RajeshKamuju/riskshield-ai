/**
 * RiskShield AI — 3D Effects Master Orchestrator
 * Integrates all 3D subsystems: Core Engine, Parallax, Tilt, Network, Particles, Security Shield.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Initialize Universal Mouse Parallax & 3D Card Tilt Engine
  if (window.ThreeDParallax) {
    window.ThreeDParallax.init();
  }

  // 1.5. Initialize Background Signal Flow Engine (Left signals -> Central Engine -> Right Threat alerts)
  if (window.SignalFlowEngine && document.getElementById('heroSignalFlowWrap')) {
    window.SignalFlowEngine.create('heroSignalFlowWrap');
  }

  // 2. Initialize Hero Risk Intelligence Core (3D Canvas)
  let heroCore = null;
  if (window.RiskIntelligenceCore && document.getElementById('hero3dCoreCanvas')) {
    heroCore = window.RiskIntelligenceCore.create('hero3dCoreCanvas', { score: 92 });
    window.heroRiskCore = heroCore;
  }

  // 3. Initialize Ambient 3D Particle & Flowing Data Streams
  if (window.RiskParticleSystem && document.getElementById('heroParticleCanvas')) {
    window.RiskParticleSystem.create('heroParticleCanvas');
  }

  // 4. Initialize 3D Fraud Relationship Graph
  if (window.FraudNetwork3D && document.getElementById('fraudNetworkCanvas')) {
    window.FraudNetwork3D.create('fraudNetworkCanvas', 'fraudIntelPanel');
  }

  // 5. Initialize 3D Scenario Visualizer
  let scenarioEngine = null;
  if (window.RiskScenario3D && document.getElementById('scenario3dCanvas')) {
    scenarioEngine = window.RiskScenario3D.create('scenario3dCanvas', { mode: 'ATO' });

    // Connect Scenario Switcher Buttons to 3D Canvas Mode
    const scenarioTabs = document.querySelectorAll('.scenario-tab-btn');
    scenarioTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const scenarioId = tab.getAttribute('data-scenario-id');
        if (scenarioEngine) {
          if (scenarioId === 'scen-ato') scenarioEngine.setMode('ATO');
          else if (scenarioId === 'scen-card-testing') scenarioEngine.setMode('CARD_TESTING');
          else if (scenarioId === 'scen-velocity-burst') scenarioEngine.setMode('VELOCITY');
        }
      });
    });
  }

  // 6. Initialize Scroll-Based 3D Convergence Story
  if (window.RiskScenario3D && document.getElementById('story3dCanvas')) {
    window.RiskScenario3D.create('story3dCanvas', { mode: 'SCROLL_STORY' });
  }

  // 7. Initialize 3D Security Shield
  if (window.SecurityShield3D && document.getElementById('securityShieldWrap')) {
    window.SecurityShield3D.init('securityShieldWrap');
  }

  // 8. Initialize 3D Spatial Timelines
  if (window.Timeline3D) {
    window.Timeline3D.init('.timeline-3d-track');
  }

  // 9. Synchronize Interactive Mini Simulator with 3D Core
  const simAmount = document.getElementById('simAmount');
  const simVelocity = document.getElementById('simVelocity');
  const simTor = document.getElementById('simTorCheckbox');
  const simDev = document.getElementById('simDeviceCheckbox');

  function syncCoreScore() {
    if (!heroCore) return;
    const amount = Number(simAmount ? simAmount.value : 50000);
    const velocity = Number(simVelocity ? simVelocity.value : 1);
    const isTor = simTor ? simTor.checked : false;
    const isNewDev = simDev ? simDev.checked : false;

    let score = 12;
    if (amount > 80000) score += 35;
    else if (amount > 40000) score += 20;

    if (velocity > 4) score += 30;
    else if (velocity > 2) score += 15;

    if (isTor) score += 25;
    if (isNewDev) score += 18;

    score = Math.min(99, score);
    heroCore.setRiskScore(score);
  }

  if (simAmount) simAmount.addEventListener('input', syncCoreScore);
  if (simVelocity) simVelocity.addEventListener('input', syncCoreScore);
  if (simTor) simTor.addEventListener('change', syncCoreScore);
  if (simDev) simDev.addEventListener('change', syncCoreScore);
});
