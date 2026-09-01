/**
 * RiskShield AI — Dashboard Intelligence & Analytics Engine
 * Manages all dashboard charts, heatmap, risk network, live streams, and explainable modals.
 */

window.DashboardEngine = (function() {
  'use strict';

  let currentTrendTimeframe = '7d';
  let activeFilter = 'ALL';

  function init() {
    initHeroVisualizer();
    renderKpiCards();
    renderTrendLineChart(currentTrendTimeframe);
    renderTopRiskFactors();
    renderStackedDecisions();
    renderFraudHeatmap();
    renderLiveEngineWidget();
    renderTransactionsTable();
    initFraudNetwork();
    setupEventListeners();
  }

  // 1. Dashboard Hero Risk Intelligence Centerpiece Stream Canvas
  function initHeroVisualizer() {
    const canvas = document.getElementById('dashHeroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animId = null;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      width = rect.width;
      height = rect.height;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        progress: Math.random(),
        speed: Math.random() * 0.006 + 0.003,
        side: Math.random() > 0.5 ? 'inbound' : 'outbound',
        slot: Math.floor(Math.random() * 5),
        size: Math.random() * 2 + 1.2
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Draw subtle guide lines from left chips to center
      const leftYStep = height / 6;
      for (let i = 0; i < 5; i++) {
        const ny = (i + 1) * leftYStep;
        ctx.beginPath();
        ctx.moveTo(width * 0.22, ny);
        ctx.bezierCurveTo(width * 0.36, ny, width * 0.4, cy, cx, cy);
        ctx.strokeStyle = 'rgba(0, 128, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
      }

      // Draw subtle guide lines from center to right chips
      for (let i = 0; i < 5; i++) {
        const ny = (i + 1) * leftYStep;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(width * 0.6, cy, width * 0.64, ny, width * 0.78, ny);
        ctx.strokeStyle = 'rgba(255, 94, 0, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
      }

      // Draw flowing particles
      particles.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;

        const ny = (p.slot + 1) * leftYStep;
        let x, y, color;

        if (p.side === 'inbound') {
          // Left to Center
          const t = p.progress;
          const p0 = { x: width * 0.22, y: ny };
          const p1 = { x: width * 0.36, y: ny };
          const p2 = { x: width * 0.4, y: cy };
          const p3 = { x: cx, y: cy };
          x = (1-t)**3 * p0.x + 3*(1-t)**2*t * p1.x + 3*(1-t)*t**2 * p2.x + t**3 * p3.x;
          y = (1-t)**3 * p0.y + 3*(1-t)**2*t * p1.y + 3*(1-t)*t**2 * p2.y + t**3 * p3.y;
          color = '#0080FF';
        } else {
          // Center to Right
          const t = p.progress;
          const p0 = { x: cx, y: cy };
          const p1 = { x: width * 0.6, y: cy };
          const p2 = { x: width * 0.64, y: ny };
          const p3 = { x: width * 0.78, y: ny };
          x = (1-t)**3 * p0.x + 3*(1-t)**2*t * p1.x + 3*(1-t)*t**2 * p2.x + t**3 * p3.x;
          y = (1-t)**3 * p0.y + 3*(1-t)**2*t * p1.y + 3*(1-t)*t**2 * p2.y + t**3 * p3.y;
          color = '#FF5E00';
        }

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    }

    render();
  }

  // 2. Render KPI Summary Cards
  function renderKpiCards() {
    const kpiContainer = document.getElementById('kpiContainer');
    if (!kpiContainer) return;

    const kpis = [
      { label: 'Transactions Analyzed', value: '12,458,920', trend: '+18.2%', up: true, sub: 'vs last 7d', icon: 'activity' },
      { label: 'Payment Volume', value: '₹420.5 Cr', trend: '+24.1%', up: true, sub: 'protected', icon: 'credit-card' },
      { label: 'Fraud Prevented', value: '₹8.52 Cr', trend: '+32.4%', up: true, sub: 'blocked YTD', icon: 'shield-check' },
      { label: 'High-Risk Rate', value: '8.2%', trend: '-1.4%', up: false, sub: '2.1% Critical', icon: 'alert-triangle' },
      { label: 'Open Investigations', value: '124', trend: '18 Urgent', up: false, sub: 'SLA < 2h', icon: 'inbox' },
      { label: 'Avg Risk Score', value: '31.4', trend: 'Baseline', up: true, sub: 'Low-Moderate', icon: 'sliders' }
    ];

    kpiContainer.innerHTML = kpis.map(k => `
      <div class="kpi-card">
        <div class="kpi-title-row">
          <span class="kpi-label">${k.label}</span>
        </div>
        <div class="kpi-value">${k.value}</div>
        <div class="kpi-trend-row">
          <span class="${k.up ? 'trend-badge-up' : 'trend-badge-down'}">${k.trend}</span>
          <span class="trend-subtext">${k.sub}</span>
        </div>
      </div>
    `).join('');
  }

  // 3. Render Transaction Risk Trend (Interactive Line Chart)
  function renderTrendLineChart(timeframe) {
    const canvas = document.getElementById('trendLineCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = MOCK_DATA.trendData[timeframe] || MOCK_DATA.trendData['7d'];

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padX = 45;
    const padY = 30;

    ctx.clearRect(0, 0, w, h);

    // Draw horizontal grid lines
    const gridSteps = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748B';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridSteps; i++) {
      const y = padY + (i * (h - padY * 2)) / gridSteps;
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(w - 15, y);
      ctx.stroke();

      const labelVal = Math.round(220000 - (i * 220000) / gridSteps);
      ctx.fillText(labelVal >= 1000 ? (labelVal / 1000) + 'k' : labelVal, padX - 8, y + 3);
    }

    // Series configs
    const series = [
      { name: 'Approved', key: 'approved', color: '#00E699', max: 220000 },
      { name: 'Monitored', key: 'monitored', color: '#FFB800', max: 15000 },
      { name: 'Review', key: 'review', color: '#FF6B00', max: 8000 },
      { name: 'Blocked', key: 'blocked', color: '#FF2E4D', max: 4000 }
    ];

    const count = data.labels.length;
    const stepX = (w - padX - 25) / (count - 1);

    // Draw X labels
    ctx.textAlign = 'center';
    data.labels.forEach((label, i) => {
      const x = padX + i * stepX;
      ctx.fillText(label, x, h - 8);
    });

    // Draw Approved Line & Fill (Primary)
    const pts = data.approved.map((val, i) => ({
      x: padX + i * stepX,
      y: (h - padY) - (val / 220000) * (h - padY * 2)
    }));

    // Fill under Approved
    const grad = ctx.createLinearGradient(0, padY, 0, h - padY);
    grad.addColorStop(0, 'rgba(0, 230, 153, 0.22)');
    grad.addColorStop(1, 'rgba(0, 230, 153, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, h - padY);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, h - padY);
    ctx.closePath();
    ctx.fill();

    // Draw lines
    series.forEach(s => {
      const sPts = data[s.key].map((val, i) => ({
        x: padX + i * stepX,
        y: (h - padY) - (val / s.max) * (h - padY * 2)
      }));

      ctx.beginPath();
      ctx.moveTo(sPts[0].x, sPts[0].y);
      for (let i = 1; i < sPts.length; i++) {
        const xc = (sPts[i].x + sPts[i - 1].x) / 2;
        const yc = (sPts[i].y + sPts[i - 1].y) / 2;
        ctx.quadraticCurveTo(sPts[i - 1].x, sPts[i - 1].y, xc, yc);
      }
      ctx.lineTo(sPts[sPts.length - 1].x, sPts[sPts.length - 1].y);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.key === 'approved' ? 2.5 : 1.8;
      ctx.stroke();

      // Nodes
      sPts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
      });
    });
  }

  // 4. Render Top Risk Factors (Horizontal Bar Chart)
  function renderTopRiskFactors() {
    const list = document.getElementById('riskFactorsBarList');
    if (!list) return;

    const factors = MOCK_DATA.topRiskFactors;
    const colors = ['#FF2E4D', '#FF5E00', '#FF7729', '#FFB800', '#0080FF', '#6E3AFF'];

    list.innerHTML = factors.map((f, i) => `
      <div class="factor-bar-item">
        <div class="factor-bar-info">
          <span class="factor-bar-name">${f.factor}</span>
          <span class="factor-bar-count"><strong>${f.percentage}%</strong> (${f.count})</span>
        </div>
        <div class="factor-bar-track">
          <div class="factor-bar-fill" style="width: ${f.percentage * 2}%; background: ${colors[i % colors.length]};"></div>
        </div>
      </div>
    `).join('');
  }

  // 5. Render Stacked Decision Chart
  function renderStackedDecisions() {
    const container = document.getElementById('stackedBarContainer');
    if (!container) return;

    const data = MOCK_DATA.stackedDecisions;
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 160px; gap: 8px; padding-top: 15px;">
        ${data.map(d => `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1;">
            <div style="width: 100%; height: 120px; display: flex; flex-direction: column; border-radius: 4px; overflow: hidden; background: rgba(255,255,255,0.04);">
              <div style="height: ${d.blocked}%; background: #FF2E4D;" title="Blocked: ${d.blocked}%"></div>
              <div style="height: ${d.review}%; background: #FF6B00;" title="Review: ${d.review}%"></div>
              <div style="height: ${d.monitor}%; background: #FFB800;" title="Monitor: ${d.monitor}%"></div>
              <div style="height: ${d.approved}%; background: #00E699;" title="Approved: ${d.approved}%"></div>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted);">${d.day}</span>
          </div>
        `).join('')}
      </div>
      <div style="display: flex; justify-content: center; gap: 16px; margin-top: 12px; font-size: 0.75rem; font-family: var(--font-mono);">
        <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 8px; height: 8px; background: #00E699; border-radius: 2px;"></span> Approved</span>
        <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 8px; height: 8px; background: #FFB800; border-radius: 2px;"></span> Monitor</span>
        <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 8px; height: 8px; background: #FF6B00; border-radius: 2px;"></span> Review</span>
        <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 8px; height: 8px; background: #FF2E4D; border-radius: 2px;"></span> Blocked</span>
      </div>
    `;
  }

  // 6. Render Fraud Activity Heatmap (Days vs Hours)
  function renderFraudHeatmap() {
    const container = document.getElementById('fraudHeatmapGrid');
    if (!container) return;

    const matrix = MOCK_DATA.heatmapMatrix;
    const hours = MOCK_DATA.timeSlots;

    function getHeatColor(val) {
      if (val >= 90) return 'rgba(255, 46, 77, 0.95)'; // Severe Red
      if (val >= 75) return 'rgba(255, 94, 0, 0.85)';  // High Orange
      if (val >= 50) return 'rgba(255, 184, 0, 0.65)'; // Amber
      if (val >= 30) return 'rgba(110, 58, 255, 0.4)'; // Violet
      return 'rgba(0, 128, 255, 0.15)';                // Low Cyan
    }

    let html = `
      <div class="heatmap-hours-header">
        <div></div>
        ${hours.map(h => `<div>${h}</div>`).join('')}
      </div>
    `;

    matrix.forEach(row => {
      html += `
        <div class="heatmap-row">
          <div class="heatmap-day-label">${row.day.slice(0, 3)}</div>
          ${row.slots.map((val, idx) => `
            <div class="heatmap-cell" style="background: ${getHeatColor(val)};" data-day="${row.day}" data-hour="${hours[idx]}" data-val="${val}" title="${row.day} @ ${hours[idx]}: Risk Intensity ${val}%"></div>
          `).join('')}
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // 7. Render Live Engine Widget
  function renderLiveEngineWidget() {
    const liveScoreEl = document.getElementById('liveEngineScore');
    const liveTxnMinEl = document.getElementById('liveTxnMin');
    const liveHighMinEl = document.getElementById('liveHighMin');

    if (liveScoreEl) liveScoreEl.innerText = '31.4';
    if (liveTxnMinEl) liveTxnMinEl.innerText = '248';
    if (liveHighMinEl) liveHighMinEl.innerText = '8';
  }

  // 8. Render High-Risk Transactions Table
  function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;

    const txns = MOCK_DATA.liveTransactions.filter(t => {
      if (activeFilter === 'CRITICAL') return t.riskLevel === 'CRITICAL';
      if (activeFilter === 'HIGH') return t.riskLevel === 'HIGH';
      if (activeFilter === 'LOW') return t.riskLevel === 'LOW';
      return true;
    });

    tbody.innerHTML = txns.map(t => {
      const badgeClass = t.riskLevel === 'CRITICAL' ? 'badge-risk-critical' :
                         t.riskLevel === 'HIGH' ? 'badge-risk-high' :
                         t.riskLevel === 'MEDIUM' ? 'badge-risk-medium' : 'badge-risk-low';

      const decisionColor = t.decision === 'BLOCK' ? 'var(--risk-critical)' :
                            t.decision === 'REVIEW' ? 'var(--risk-high)' :
                            t.decision === 'MONITOR' ? 'var(--risk-medium)' : 'var(--risk-low)';

      return `
        <tr onclick="DashboardEngine.openTransactionModal('${t.id}')">
          <td style="font-family: var(--font-mono); font-weight: 700; color: #FFFFFF;">${t.id}</td>
          <td><strong>${t.customer}</strong><div class="text-small" style="color: var(--text-muted);">${t.customerId}</div></td>
          <td>${t.merchant}</td>
          <td style="font-family: var(--font-mono); font-weight: 700; color: #FFFFFF;">${t.formattedAmount} <span class="text-small" style="color: var(--text-muted); font-weight: normal;">(${t.paymentMethod})</span></td>
          <td><span class="badge-risk ${badgeClass}">${t.riskScore} / 100</span></td>
          <td style="font-family: var(--font-mono); font-weight: 700; color: ${decisionColor};">${t.decision}</td>
          <td style="color: var(--text-muted);">${t.timeAgo}</td>
          <td>
            <button class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 0.75rem;" onclick="event.stopPropagation(); DashboardEngine.openTransactionModal('${t.id}')">
              Investigate
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // 9. Interactive Fraud Relationship Network
  function initFraudNetwork() {
    const canvas = document.getElementById('dashFraudNetworkCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      width = rect.width;
      height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const nodes = [
      { id: 'CUST', label: 'Customer: Arjun Rao', x: 0.25, y: 0.35, color: '#0080FF', type: 'Customer' },
      { id: 'DEV', label: 'Device: Linux Canvas DEV-92', x: 0.4, y: 0.2, color: '#FF5E00', type: 'Device', risk: 'HIGH' },
      { id: 'IP', label: 'IP: 185.220.101.99 (Tor)', x: 0.65, y: 0.25, color: '#FF2E4D', type: 'IP Reputation', risk: 'CRITICAL' },
      { id: 'LOC', label: 'Location: Frankfurt/Mumbai', x: 0.75, y: 0.6, color: '#6E3AFF', type: 'Geo Transit' },
      { id: 'TXN', label: 'TXN-92841 (₹75,000)', x: 0.5, y: 0.55, color: '#FF2E4D', type: 'Transaction' },
      { id: 'MERCH', label: 'Merchant: Acme Store', x: 0.3, y: 0.75, color: '#00E699', type: 'Merchant' }
    ];

    const links = [
      { from: 0, to: 1 },
      { from: 1, to: 4 },
      { from: 2, to: 4 },
      { from: 3, to: 2 },
      { from: 4, to: 5 },
      { from: 0, to: 4 }
    ];

    let hoveredNode = null;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left);
      const my = (e.clientY - rect.top);

      hoveredNode = null;
      nodes.forEach((n, idx) => {
        const nx = n.x * width;
        const ny = n.y * height;
        const dist = Math.hypot(mx - nx, my - ny);
        if (dist < 22) {
          hoveredNode = idx;
        }
      });
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Links
      links.forEach(l => {
        const n1 = nodes[l.from];
        const n2 = nodes[l.to];
        const x1 = n1.x * width;
        const y1 = n1.y * height;
        const x2 = n2.x * width;
        const y2 = n2.y * height;

        const isHighlighted = hoveredNode === l.from || hoveredNode === l.to;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = isHighlighted ? 'rgba(255, 94, 0, 0.8)' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        ctx.stroke();
      });

      // Nodes
      nodes.forEach((n, idx) => {
        const nx = n.x * width;
        const ny = n.y * height;
        const isHov = hoveredNode === idx;

        ctx.beginPath();
        ctx.arc(nx, ny, isHov ? 16 : 11, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isHov ? 15 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = isHov ? 'bold 11px "JetBrains Mono", monospace' : '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, nx, ny + 24);
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  // 10. Open Transaction Explainable Risk Modal
  function openTransactionModal(txnId) {
    const modal = document.getElementById('txnDetailModal');
    const content = document.getElementById('modalTxnContent');
    if (!modal || !content) return;

    const txn = MOCK_DATA.liveTransactions.find(t => t.id === txnId) || MOCK_DATA.heroTransaction;

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-6); border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-4);">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span class="badge-risk ${txn.riskLevel === 'CRITICAL' ? 'badge-risk-critical' : 'badge-risk-high'}">${txn.riskLevel} (${txn.riskScore}/100)</span>
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #FFFFFF; font-family: var(--font-mono);">${txn.id}</h2>
          </div>
          <p style="font-size: 0.8125rem; color: var(--text-muted);">Evaluated in 11.2ms &bull; ${txn.timeAgo} &bull; Payment Method: ${txn.paymentMethod}</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="DashboardEngine.closeModal()">✕ Close</button>
      </div>

      <!-- Overview Grid -->
      <div class="grid" style="grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-6);">
        <div style="background: var(--bg-card); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 0.6875rem; color: var(--text-muted); text-transform: uppercase;">Customer Profile</div>
          <div style="font-size: 1rem; font-weight: 700; color: #FFFFFF; margin-top: 4px;">${txn.customer}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">${txn.customerId || 'CUST-84920'}</div>
        </div>
        <div style="background: var(--bg-card); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 0.6875rem; color: var(--text-muted); text-transform: uppercase;">Merchant & Amount</div>
          <div style="font-size: 1.1rem; font-weight: 800; color: var(--accent-orange); margin-top: 4px;">${txn.formattedAmount}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">${txn.merchant}</div>
        </div>
        <div style="background: var(--bg-card); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 0.6875rem; color: var(--text-muted); text-transform: uppercase;">Decision</div>
          <div style="font-size: 1.1rem; font-weight: 800; color: ${txn.decision === 'BLOCK' ? 'var(--risk-critical)' : 'var(--risk-high)'}; margin-top: 4px;">${txn.decision}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Recommended: BLOCK & INVESTIGATE</div>
        </div>
      </div>

      <!-- Why was this flagged? (Explainable AI Deterministic Breakdown) -->
      <div style="background: rgba(255, 46, 77, 0.08); border: 1px solid rgba(255, 46, 77, 0.3); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-6);">
        <h3 style="font-size: 0.9375rem; font-weight: 700; color: #FFFFFF; display: flex; align-items: center; gap: 8px; margin-bottom: var(--space-3);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--risk-critical);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          WHY WAS THIS FLAGGED? (DETERMINISTIC FACTOR ATTRIBUTION)
        </h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
            <span>1. Amount Anomaly (8.4x baseline average)</span>
            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--risk-critical);">+20 pts</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
            <span>2. Transaction Velocity Burst (6 txns in 3m)</span>
            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--risk-critical);">+25 pts</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
            <span>3. New Unrecognized Device Fingerprint</span>
            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--risk-high);">+15 pts</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
            <span>4. Tor Exit Node / Proxy Origin IP</span>
            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--risk-critical);">+20 pts</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
            <span>5. Geographic Impossible Transit Velocity (850 km/h)</span>
            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--risk-high);">+12 pts</span>
          </div>
        </div>
      </div>

      <!-- Entity Relationship Trail -->
      <div style="margin-bottom: var(--space-6);">
        <h4 style="font-size: 0.8125rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: var(--space-2);">Relationship Inspection Path</h4>
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-3); font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">
          <span>Customer (Arjun)</span> &rarr;
          <span style="color: var(--accent-orange);">Device (DEV-92)</span> &rarr;
          <span style="color: var(--risk-critical);">IP (185.220.101.99)</span> &rarr;
          <span>Geo (Frankfurt)</span> &rarr;
          <span style="color: #00E699;">Merchant (Acme)</span>
        </div>
      </div>

      <!-- Analyst Action Toolbar -->
      <div style="display: flex; gap: var(--space-3); justify-content: flex-end;">
        <button class="btn btn-secondary btn-sm" onclick="DashboardEngine.closeModal()">Dismiss</button>
        <button class="btn btn-secondary btn-sm" style="color: #00E699; border-color: rgba(0,230,153,0.3);" onclick="alert('Transaction override authorized.'); DashboardEngine.closeModal();">Override & Approve</button>
        <button class="btn btn-primary btn-sm" style="background: var(--risk-critical); border-color: var(--risk-critical);" onclick="alert('Fraud confirmed. Device & IP blacklisted.'); DashboardEngine.closeModal();">Confirm Block & Blacklist</button>
      </div>
    `;

    modal.classList.add('active');
  }

  function closeModal() {
    const modal = document.getElementById('txnDetailModal');
    if (modal) modal.classList.remove('active');
  }

  function setupEventListeners() {
    // Timeframe toggles for trend chart
    const timeframeBtns = document.querySelectorAll('.timeframe-btn');
    timeframeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        timeframeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tf = btn.getAttribute('data-timeframe');
        currentTrendTimeframe = tf;
        renderTrendLineChart(tf);
      });
    });

    // Table filters
    const filterTabs = document.querySelectorAll('.txn-filter-tab');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeFilter = tab.getAttribute('data-filter') || 'ALL';
        renderTransactionsTable();
      });
    });

    // Modal backdrop click
    const modal = document.getElementById('txnDetailModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  }

  return {
    init,
    openTransactionModal,
    closeModal
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('dashboardRoot')) {
    DashboardEngine.init();
  }
});
