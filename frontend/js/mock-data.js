/**
 * RiskShield AI - High-Fidelity Fintech Mock Data Layer
 * Provides realistic payment records, factor attributions, alerts & metrics.
 */

const MOCK_DATA = {
  // Trust & Metric Aggregates
  metrics: {
    transactionsAnalyzed: '12.4M+',
    potentialFraudPrevented: '₹8.5Cr+',
    approvalRate: '96.8%',
    highRiskTransactions: '28.6K+',
    openInvestigations: 124,
    averageRiskScore: 31.4,
    liveLatencyP99: '11.8ms',
    totalLossPreventedYTD: '₹14.2Cr'
  },

  // Highlight Hero Case Transaction (TXN-92841)
  heroTransaction: {
    id: 'TXN-92841',
    amount: 75000,
    formattedAmount: '₹75,000',
    currency: 'INR',
    customer: {
      id: 'CUST-84920',
      name: 'Arjun Rao',
      email: 'arjun.rao@example.com',
      phone: '+91 98765 43210',
      accountAgeDays: 42,
      historicalAvgAmount: 8920
    },
    merchant: {
      id: 'MERCH-1002',
      name: 'Acme Electronics Store',
      category: 'Electronics & Gadgets',
      riskTier: 'STANDARD'
    },
    paymentMethod: 'UPI',
    vpa: 'arjun.rao@okhdfcbank',
    riskScore: 92,
    riskLevel: 'CRITICAL',
    decision: 'BLOCK',
    timestamp: '2026-09-01T08:50:00Z',
    evaluationLatencyMs: 11,
    factors: [
      { name: 'Amount Anomaly (8.4x baseline)', points: 20, description: '₹75,000 exceeds 30-day baseline average of ₹8,920' },
      { name: 'Transaction Velocity Burst', points: 25, description: '6 transactions attempted within 3 minutes' },
      { name: 'New Hardware Device Fingerprint', points: 15, description: 'Unknown Linux desktop canvas fingerprint' },
      { name: 'IP Reputation & Proxy Detection', points: 20, description: 'Origin IP 185.220.101.99 matches known Tor exit node' },
      { name: 'Geographic Transit Anomaly', points: 12, description: 'Simultaneous session active in Frankfurt & Mumbai' }
    ]
  },

  // Real-world Fraud Scenarios for interactive exploration
  fraudScenarios: [
    {
      id: 'scenario-ato',
      title: 'Account Takeover (ATO)',
      tag: 'IDENTITY HIJACK',
      amount: '₹95,000',
      riskScore: 94,
      decision: 'BLOCK',
      summary: 'Attacker gained access to customer session via credential stuffing, immediately changing delivery address and draining credit line.',
      keySignals: ['New Device Fingerprint (+25)', 'Immediate Password Change (+20)', 'High Value Cart (+25)', 'Suspicious Datacenter IP (+24)']
    },
    {
      id: 'scenario-card-testing',
      title: 'Automated Card Testing',
      tag: 'SCRIPTED ATTACK',
      amount: '₹80 (x14 txns)',
      riskScore: 96,
      decision: 'BLOCK',
      summary: 'Bot script attempting micro-transactions to validate stolen BINs before attempting larger high-value fraud.',
      keySignals: ['14 Requests / 45 Seconds (+35)', 'Headless Chromium User-Agent (+25)', 'Mismatched Billing Postal Code (+20)', 'Rotating CVV Guesses (+16)']
    },
    {
      id: 'scenario-velocity',
      title: 'Transaction Velocity Attack',
      tag: 'BURST FRAUD',
      amount: '₹32,000 (x4 txns)',
      riskScore: 88,
      decision: 'BLOCK',
      summary: 'Rapid burst of UPI collect requests across multiple merchant checkout endpoints within 90 seconds.',
      keySignals: ['Velocity Burst (+30)', 'Multiple Merchant VPA Endpoints (+25)', 'Unusual Midnight Hour (+18)', 'Sub-second API submission (+15)']
    },
    {
      id: 'scenario-synthetic',
      title: 'Synthetic Identity Fraud',
      tag: 'NEW PROFILE ABUSE',
      amount: '₹48,000',
      riskScore: 78,
      decision: 'REVIEW',
      summary: 'Fabricated Aadhaar/PAN identity profile created 48 hours ago attempting maximum credit drawdown.',
      keySignals: ['Account Age < 3 Days (+25)', 'Zero Historical Velocity (+20)', 'Disposable Email Domain (+18)', 'Virtual VOIP Phone (+15)']
    }
  ],

  // Live High-Risk Transactions Table
  liveTransactions: [
    {
      id: 'TXN-92841',
      customer: 'Arjun Rao',
      customerId: 'CUST-84920',
      merchant: 'Acme Electronics Store',
      merchantId: 'MERCH-1002',
      amount: 75000,
      formattedAmount: '₹75,000',
      paymentMethod: 'UPI',
      riskScore: 92,
      riskLevel: 'CRITICAL',
      decision: 'BLOCK',
      timeAgo: 'Just now',
      ip: '185.220.101.99',
      location: 'Frankfurt / Mumbai',
      device: 'Linux Desktop (Unrecognized Canvas)',
      reasons: ['Amount Anomaly (8.4x)', 'Velocity Spike (6/3m)', 'Tor Exit Node IP', 'Impossible Travel Hop']
    },
    {
      id: 'TXN-92842',
      customer: 'Suresh Menon',
      customerId: 'CUST-91022',
      merchant: 'Global Luxury Watches',
      merchantId: 'MERCH-4009',
      amount: 145000,
      formattedAmount: '₹1,45,000',
      paymentMethod: 'CARD',
      riskScore: 88,
      riskLevel: 'CRITICAL',
      decision: 'BLOCK',
      timeAgo: '1 min ago',
      ip: '45.154.255.8',
      location: 'Bucharest, Romania',
      device: 'Headless Chrome / Emulated iOS',
      reasons: ['Card Testing Pattern', 'Datacenter Proxy', 'CVV Retry Spike (4x)']
    },
    {
      id: 'TXN-92843',
      customer: 'Priya Sharma',
      customerId: 'CUST-33104',
      merchant: 'FreshBasket Hypermarket',
      merchantId: 'MERCH-1088',
      amount: 1850,
      formattedAmount: '₹1,850',
      paymentMethod: 'UPI',
      riskScore: 12,
      riskLevel: 'LOW',
      decision: 'APPROVE',
      timeAgo: '2 mins ago',
      ip: '103.21.124.5',
      location: 'Bengaluru, India',
      device: 'OnePlus 11 / Chrome Mobile',
      reasons: ['Consistent Profile & Known Device', 'Normal Grocery Baseline']
    },
    {
      id: 'TXN-92844',
      customer: 'Vikram Mehta',
      customerId: 'CUST-77291',
      merchant: 'SkyWings Airline Booking',
      merchantId: 'MERCH-3011',
      amount: 42000,
      formattedAmount: '₹42,000',
      paymentMethod: 'NETBANKING',
      riskScore: 74,
      riskLevel: 'HIGH',
      decision: 'REVIEW',
      timeAgo: '4 mins ago',
      ip: '117.201.44.18',
      location: 'New Delhi, India',
      device: 'Windows 11 / Edge 122',
      reasons: ['Velocity Hop (3 bookings / 10m)', 'New NetBanking Account Link']
    },
    {
      id: 'TXN-92845',
      customer: 'Ananya Verma',
      customerId: 'CUST-61208',
      merchant: 'Digital Gaming Credits',
      merchantId: 'MERCH-5512',
      amount: 15000,
      formattedAmount: '₹15,000',
      paymentMethod: 'CARD',
      riskScore: 82,
      riskLevel: 'CRITICAL',
      decision: 'BLOCK',
      timeAgo: '6 mins ago',
      ip: '194.26.29.112',
      location: 'Amsterdam, Netherlands',
      device: 'Automated Playwright Bot',
      reasons: ['High-Risk Merchant MCC', 'Rapid Micro-Authorizations', 'Mismatched Billing Address']
    },
    {
      id: 'TXN-92846',
      customer: 'Rahul Kapoor',
      customerId: 'CUST-10492',
      merchant: 'UrbanCafe Roasters',
      merchantId: 'MERCH-1005',
      amount: 420,
      formattedAmount: '₹420',
      paymentMethod: 'UPI',
      riskScore: 8,
      riskLevel: 'LOW',
      decision: 'APPROVE',
      timeAgo: '8 mins ago',
      ip: '49.207.199.12',
      location: 'Mumbai, India',
      device: 'iPhone 15 Pro / Safari',
      reasons: ['Trusted Biometric Token', 'Frequent Merchant History']
    },
    {
      id: 'TXN-92847',
      customer: 'Neha Singhal',
      customerId: 'CUST-49102',
      merchant: 'CryptoPay Exchange',
      merchantId: 'MERCH-9901',
      amount: 98000,
      formattedAmount: '₹98,000',
      paymentMethod: 'NETBANKING',
      riskScore: 79,
      riskLevel: 'HIGH',
      decision: 'REVIEW',
      timeAgo: '11 mins ago',
      ip: '103.88.232.1',
      location: 'Hyderabad, India',
      device: 'MacBook Pro / Chrome 124',
      reasons: ['First-time Crypto Onramp', 'Sudden High Volume Outlier (+45)']
    },
    {
      id: 'TXN-92848',
      customer: 'Devendra Patel',
      customerId: 'CUST-88123',
      merchant: 'QuickKart Express',
      merchantId: 'MERCH-1020',
      amount: 3200,
      formattedAmount: '₹3,200',
      paymentMethod: 'UPI',
      riskScore: 34,
      riskLevel: 'MEDIUM',
      decision: 'MONITOR',
      timeAgo: '14 mins ago',
      ip: '106.51.72.44',
      location: 'Ahmedabad, India',
      device: 'Samsung Galaxy S23',
      reasons: ['Slight Velocity Increase (2 txns / 15m)', 'Minor Amount Elevation']
    }
  ],

  // Risk Trend Time Series Data (7 Days, 30 Days, 90 Days)
  trendData: {
    '7d': {
      labels: ['Mon 25', 'Tue 26', 'Wed 27', 'Thu 28', 'Fri 29', 'Sat 30', 'Sun 31'],
      approved: [142000, 158000, 169000, 161000, 185000, 198000, 210000],
      monitored: [4800, 5200, 6100, 5800, 6900, 7400, 8100],
      review: [1800, 2100, 2400, 1950, 2600, 2900, 3100],
      blocked: [820, 940, 1120, 890, 1340, 1450, 1680]
    },
    '30d': {
      labels: ['W1', 'W2', 'W3', 'W4', 'Current'],
      approved: [620000, 680000, 740000, 810000, 890000],
      monitored: [22000, 25000, 28000, 31000, 34000],
      review: [8200, 9100, 10400, 11200, 12800],
      blocked: [3800, 4200, 4900, 5400, 6200]
    },
    '90d': {
      labels: ['Jun 2026', 'Jul 2026', 'Aug 2026'],
      approved: [2650000, 2980000, 3420000],
      monitored: [98000, 112000, 128000],
      review: [36000, 41000, 48000],
      blocked: [16500, 19200, 22400]
    }
  },

  // Top Risk Factors (Horizontal Bar Chart)
  topRiskFactors: [
    { factor: 'Transaction Velocity Spike', percentage: 38, count: '14,820 triggers', delta: '+4.2%' },
    { factor: 'Amount Anomaly (>4x Baseline)', percentage: 28, count: '10,910 triggers', delta: '+2.1%' },
    { factor: 'New / Spoofed Device Fingerprint', percentage: 18, count: '7,020 triggers', delta: '+1.5%' },
    { factor: 'Tor / Proxy / Datacenter IP', percentage: 12, count: '4,680 triggers', delta: '-0.8%' },
    { factor: 'Impossible Geolocation Transit', percentage: 8, count: '3,120 triggers', delta: '+0.4%' },
    { factor: 'Repeated OTP / CVV Failures', percentage: 5, count: '1,950 triggers', delta: '-1.2%' }
  ],

  // Stacked Decision Activity Data
  stackedDecisions: [
    { day: 'Mon', approved: 78, monitor: 12, review: 6, blocked: 4 },
    { day: 'Tue', approved: 82, monitor: 10, review: 5, blocked: 3 },
    { day: 'Wed', approved: 75, monitor: 14, review: 7, blocked: 4 },
    { day: 'Thu', approved: 80, monitor: 11, review: 5, blocked: 4 },
    { day: 'Fri', approved: 72, monitor: 15, review: 8, blocked: 5 },
    { day: 'Sat', approved: 68, monitor: 17, review: 9, blocked: 6 },
    { day: 'Sun', approved: 70, monitor: 16, review: 8, blocked: 6 }
  ],

  // Fraud Activity Heatmap (7 Days x 8 Hours)
  heatmapMatrix: [
    // 12AM, 3AM, 6AM, 9AM, 12PM, 3PM, 6PM, 9PM
    { day: 'Monday', slots: [85, 92, 40, 20, 25, 30, 45, 78] },
    { day: 'Tuesday', slots: [78, 88, 35, 18, 22, 28, 50, 82] },
    { day: 'Wednesday', slots: [82, 95, 42, 22, 26, 32, 55, 86] },
    { day: 'Thursday', slots: [75, 84, 38, 19, 24, 30, 48, 80] },
    { day: 'Friday', slots: [90, 98, 55, 28, 34, 45, 72, 94] },
    { day: 'Saturday', slots: [96, 100, 68, 35, 42, 58, 85, 98] },
    { day: 'Sunday', slots: [94, 99, 62, 30, 38, 52, 80, 92] }
  ],

  timeSlots: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],

  // Recent Fraud Alerts
  recentAlerts: [
    {
      id: 'ALT-1092',
      type: 'Account Takeover (ATO)',
      severity: 'CRITICAL',
      target: 'CUST-84920 (Arjun Rao)',
      summary: 'New device session changed delivery address + attempted ₹75,000 checkout in under 90s',
      timestamp: '2 mins ago',
      status: 'OPEN'
    },
    {
      id: 'ALT-1091',
      type: 'Automated Card Testing Botnet',
      severity: 'CRITICAL',
      target: 'BIN-411123 (Visa Platinum)',
      summary: '14 micro-auth attempts in 45s across distributed residential proxies',
      timestamp: '6 mins ago',
      status: 'INVESTIGATING'
    },
    {
      id: 'ALT-1090',
      type: 'Velocity Surge',
      severity: 'HIGH',
      target: 'VPA: fastpay@okaxis',
      summary: '6 collect requests initiated in 3 minutes exceeding merchant policy',
      timestamp: '12 mins ago',
      status: 'OPEN'
    },
    {
      id: 'ALT-1089',
      type: 'Geographic Impossible Travel',
      severity: 'HIGH',
      target: 'CUST-77291 (Vikram Mehta)',
      summary: 'Transit speed computed at 850 km/h between Frankfurt and Mumbai endpoints',
      timestamp: '18 mins ago',
      status: 'RESOLVED'
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.MOCK_DATA = MOCK_DATA;
}
