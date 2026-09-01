import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { TransactionsView } from './components/TransactionsView';
import { RiskRulesView } from './components/RiskRulesView';
import { FraudAlertsView } from './components/FraudAlertsView';
import { InvestigationCasesView } from './components/InvestigationCasesView';
import { RiskSimulatorView } from './components/RiskSimulatorView';
import { TransactionDetailModal } from './components/TransactionDetailModal';
import { LandingPage } from './components/landing/LandingPage';
import {
  INITIAL_TRANSACTIONS,
  INITIAL_RULES,
  INITIAL_ALERTS,
  INITIAL_CASES
} from './mockData';
import {
  Transaction,
  RiskRule,
  FraudAlert,
  InvestigationCase,
  Decision,
  AlertStatus,
  CaseStatus
} from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

  // State collections
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [rules, setRules] = useState<RiskRule[]>(INITIAL_RULES);
  const [alerts, setAlerts] = useState<FraudAlert[]>(INITIAL_ALERTS);
  const [cases, setCases] = useState<InvestigationCase[]>(INITIAL_CASES);

  // Selection state
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Live transaction simulation tick
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      // 80% normal transactions, 20% suspicious/attack bursts
      const isSuspicious = Math.random() < 0.22;
      const txNum = Math.floor(100000 + Math.random() * 900000);
      const custId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;

      const customerNames = [
        'Aarav Patel',
        'Sneha Kulkarni',
        'Rohan Sengupta',
        'Deepak Malhotra',
        'Ananya Iyer',
        'Vikramaditya Bose',
        'Ritu Chawla',
        'Kunal Deshmukh'
      ];
      const merchantList = [
        { name: 'Swiggy Instamart', cat: 'GROCERIES' },
        { name: 'Amazon Pay India', cat: 'E_COMMERCE' },
        { name: 'Razorpay Direct Gateway', cat: 'CONSUMER_ELECTRONICS' },
        { name: 'Uber India Mobility', cat: 'RIDE_SHARING' },
        { name: 'CryptoX Exchange', cat: 'CRYPTOCURRENCY' },
        { name: 'Flipkart Electronics', cat: 'CONSUMER_ELECTRONICS' },
        { name: 'Steam Gaming Store', cat: 'DIGITAL_GOODS' }
      ];

      const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
      const merchant = merchantList[Math.floor(Math.random() * merchantList.length)];

      let amount = Math.floor(200 + Math.random() * 4500);
      let riskScore = Math.floor(3 + Math.random() * 22);
      let decision: Decision = 'APPROVE';
      let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
      let factors = [];
      let explanation = 'Standard frictionless authorization on authenticated hardware profile.';
      let recAction = 'Approve standard settlement.';

      if (isSuspicious) {
        amount = Math.floor(25000 + Math.random() * 85000);
        riskScore = Math.floor(68 + Math.random() * 30);
        if (riskScore >= 82) {
          decision = 'BLOCK';
          riskLevel = 'CRITICAL';
          explanation = 'Immediate critical anomaly: High amount velocity burst combined with Tor exit node origin.';
          recAction = 'Hard block and notify risk team.';
          factors.push({
            factorCode: 'RULE_EXTREME_AMOUNT_ANOMALY',
            factorName: 'Extreme Amount Anomaly',
            weightScore: 35,
            category: 'AMOUNT_ANOMALY' as const,
            details: `₹${amount.toLocaleString()} is 7.2x standard cardholder baseline.`,
            severity: 'CRITICAL' as const,
          });
          factors.push({
            factorCode: 'RULE_TOR_PROXY_ATTACK',
            factorName: 'Tor Exit Node Relay',
            weightScore: 28,
            category: 'NETWORK_IP' as const,
            details: 'Anonymized routing detected.',
            severity: 'HIGH' as const,
          });
        } else {
          decision = 'REVIEW';
          riskLevel = 'HIGH';
          explanation = 'Elevated ticket purchase on newly observed browser signature.';
          recAction = 'Queue for manual review.';
          factors.push({
            factorCode: 'RULE_DEVICE_FINGERPRINT_MISMATCH',
            factorName: 'Novel Device Fingerprint',
            weightScore: 20,
            category: 'DEVICE' as const,
            details: 'Unrecognized canvas fingerprint.',
            severity: 'MEDIUM' as const,
          });
        }
      }

      const newTx: Transaction = {
        transactionId: `TX-${txNum}`,
        customerId: custId,
        customerName,
        customerEmail: `${customerName.toLowerCase().replace(' ', '.')}@example.in`,
        merchantId: `MERCH-${Math.floor(1000 + Math.random() * 9000)}`,
        merchantName: merchant.name,
        merchantCategory: merchant.cat,
        amount,
        currency: 'INR',
        paymentMethod: 'UPI / PhonePe',
        cardBin: '508129',
        cardLast4: `${Math.floor(1000 + Math.random() * 9000)}`,
        deviceId: `DEV-${Math.floor(1000 + Math.random() * 9000)}-M`,
        deviceName: isSuspicious ? 'Unknown Linux Client' : 'Samsung Galaxy S24',
        ipAddress: isSuspicious ? '185.220.101.99' : '103.21.144.15',
        ipLocation: isSuspicious ? 'Frankfurt, DE (Tor Exit Node)' : 'Mumbai, IN',
        locationCity: isSuspicious ? 'Frankfurt / Mumbai Anomaly' : 'Mumbai',
        locationCountry: 'IND',
        status: decision === 'BLOCK' ? 'BLOCKED' : decision === 'REVIEW' ? 'FLAGGED' : 'SETTLED',
        riskScore,
        riskLevel,
        decision,
        ruleScore: Math.min(99, riskScore - 5),
        behavioralScore: Math.min(99, riskScore + 2),
        mlScore: Math.min(99, riskScore + 4),
        explanation,
        recommendedAction: recAction,
        riskFactors: factors,
        createdAt: new Date().toISOString(),
        evaluationTimeMs: Math.floor(9 + Math.random() * 11),
      };

      setTransactions((prev) => [newTx, ...prev.slice(0, 39)]);

      // If critical, also auto-create fraud alert
      if (decision === 'BLOCK' || riskScore >= 75) {
        const newAlert: FraudAlert = {
          alertId: `ALT-${Math.floor(9000 + Math.random() * 999)}`,
          transactionId: newTx.transactionId,
          customerId: newTx.customerId,
          customerName: newTx.customerName,
          merchantId: newTx.merchantId,
          merchantName: newTx.merchantName,
          amount: newTx.amount,
          currency: newTx.currency,
          riskScore: newTx.riskScore,
          riskLevel: newTx.riskLevel,
          alertType: factors[0]?.factorName || 'High-Risk Surge',
          status: 'OPEN',
          assignedTo: 'John Doe',
          createdAt: newTx.createdAt,
          riskFactorsSummary: factors.map((f) => f.factorName),
        };
        setAlerts((prev) => [newAlert, ...prev]);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Handler: Manual Override Decision
  const handleOverrideDecision = (txId: string, newDecision: Decision) => {
    setTransactions((prev) =>
      prev.map((t) => (t.transactionId === txId ? { ...t, decision: newDecision } : t))
    );
    if (selectedTx && selectedTx.transactionId === txId) {
      setSelectedTx((prev) => (prev ? { ...prev, decision: newDecision } : null));
    }
  };

  // Handler: Open / Create Case from Tx or Alert
  const handleCreateCaseFromTx = (tx: Transaction) => {
    const newCaseId = `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase: InvestigationCase = {
      caseId: newCaseId,
      title: `Escalated Investigation: ${tx.customerName} (${tx.transactionId})`,
      priority: tx.riskScore >= 80 ? 'CRITICAL' : 'HIGH',
      status: 'OPEN',
      leadAnalyst: 'John Doe',
      targetType: 'TRANSACTION',
      targetId: tx.transactionId,
      totalSuspiciousAmount: tx.amount,
      currency: tx.currency,
      summary: tx.explanation,
      linkedTransactions: [tx.transactionId],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [
        {
          id: `NOTE-${Date.now()}`,
          caseId: newCaseId,
          author: 'John Doe',
          noteType: 'GENERAL',
          noteText: `Initiated investigation from live feed inspector for suspicious volume ₹${tx.amount.toLocaleString()}. Risk Score: ${tx.riskScore}.`,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    setCases((prev) => [newCase, ...prev]);
    setSelectedCaseId(newCaseId);
    setIsDetailModalOpen(false);
    setActiveTab('cases');
  };

  const handleCreateCaseFromAlert = (alert: FraudAlert) => {
    const newCaseId = `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase: InvestigationCase = {
      caseId: newCaseId,
      title: `Alert Escalation: ${alert.alertType} - ${alert.customerName}`,
      priority: alert.riskLevel === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
      status: 'OPEN',
      leadAnalyst: alert.assignedTo || 'John Doe',
      targetType: 'CUSTOMER',
      targetId: alert.customerId,
      totalSuspiciousAmount: alert.amount,
      currency: alert.currency,
      summary: `Automated alert ${alert.alertId} escalated for deep forensic inspection.`,
      linkedTransactions: [alert.transactionId],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [
        {
          id: `NOTE-${Date.now()}`,
          caseId: newCaseId,
          author: 'System Queue',
          noteType: 'EVIDENCE',
          noteText: `Escalated from alert ${alert.alertId} with risk factors: ${alert.riskFactorsSummary.join(
            ', '
          )}`,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    setCases((prev) => [newCase, ...prev]);
    setSelectedCaseId(newCaseId);
    setActiveTab('cases');
  };

  // Handler: Toggle Rule
  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleAddRule = (newRuleData: Omit<RiskRule, 'id' | 'totalTriggeredCount'>) => {
    const newRule: RiskRule = {
      ...newRuleData,
      id: `R-${Math.floor(100 + Math.random() * 900)}`,
      totalTriggeredCount: 0,
    };
    setRules((prev) => [newRule, ...prev]);
  };

  // Handler: Update Alert
  const handleUpdateAlertStatus = (alertId: string, newStatus: AlertStatus, notes?: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.alertId === alertId
          ? {
              ...a,
              status: newStatus,
              resolutionNotes: notes || a.resolutionNotes,
              resolvedAt: newStatus === 'RESOLVED' ? new Date().toISOString() : undefined,
            }
          : a
      )
    );
  };

  // Handler: Add Case Note
  const handleAddCaseNote = (caseId: string, noteText: string, noteType: any) => {
    const note = {
      id: `NOTE-${Date.now()}`,
      caseId,
      author: 'John Doe',
      noteText,
      noteType,
      createdAt: new Date().toISOString(),
    };
    setCases((prev) =>
      prev.map((c) =>
        c.caseId === caseId
          ? { ...c, notes: [...c.notes, note], updatedAt: new Date().toISOString() }
          : c
      )
    );
  };

  // Handler: Update Case Status
  const handleUpdateCaseStatus = (
    caseId: string,
    status: CaseStatus,
    disposition?: any
  ) => {
    setCases((prev) =>
      prev.map((c) =>
        c.caseId === caseId
          ? {
              ...c,
              status,
              disposition: disposition || c.disposition,
              updatedAt: new Date().toISOString(),
              closedAt: status === 'RESOLVED' ? new Date().toISOString() : undefined,
            }
          : c
      )
    );
  };

  // Handler: Inject scenario from Transactions view
  const handleInjectScenario = (
    scenario: 'CARD_TESTING' | 'ATO_SPIKE' | 'GEO_JUMP' | 'CLEAN_TX'
  ) => {
    let tx: Transaction;
    if (scenario === 'CARD_TESTING') {
      tx = {
        transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        customerId: 'CUST-3310',
        customerName: 'Karan Mehra',
        merchantId: 'MERCH-7744',
        merchantName: 'Steam Gaming Store',
        merchantCategory: 'DIGITAL_GOODS',
        amount: 120,
        currency: 'INR',
        paymentMethod: 'Prepaid Card / Visa',
        cardBin: '400115',
        cardLast4: '0098',
        deviceId: 'DEV-3390-W',
        deviceName: 'Generic Linux Client (Scripted)',
        ipAddress: '185.191.171.12',
        ipLocation: 'Bucharest, RO (Proxy)',
        locationCity: 'Unknown',
        locationCountry: 'ROU',
        status: 'BLOCKED',
        riskScore: 94,
        riskLevel: 'CRITICAL',
        decision: 'BLOCK',
        ruleScore: 92,
        behavioralScore: 89,
        mlScore: 96,
        explanation: 'Card testing burst detected: 14 sequential micro-charges with rapid CVV variations in past 180s.',
        recommendedAction: 'Blacklist IP range and block card fingerprint across gateways.',
        evaluationTimeMs: 8,
        createdAt: new Date().toISOString(),
        riskFactors: [
          {
            factorCode: 'RULE_CARD_TESTING_BURST',
            factorName: 'Card Testing Micro-Probe Burst',
            weightScore: 40,
            category: 'VELOCITY',
            details: '14 sequential attempts under ₹200.',
            severity: 'CRITICAL',
          },
        ],
      };
    } else if (scenario === 'ATO_SPIKE') {
      tx = {
        transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        customerId: 'CUST-9942',
        customerName: 'Amit K. Sharma',
        merchantId: 'MERCH-4402',
        merchantName: 'CryptoX Exchange India',
        merchantCategory: 'CRYPTOCURRENCY',
        amount: 88000,
        currency: 'INR',
        paymentMethod: 'UPI / RuPay Platinum',
        cardBin: '607189',
        cardLast4: '4190',
        deviceId: 'DEV-9921-X',
        deviceName: 'MacBookPro M3 (New Device)',
        ipAddress: '185.220.101.45',
        ipLocation: 'Frankfurt, DE (Tor Exit Node)',
        locationCity: 'New Delhi / Frankfurt Anomaly',
        locationCountry: 'IND',
        status: 'BLOCKED',
        riskScore: 89,
        riskLevel: 'CRITICAL',
        decision: 'BLOCK',
        ruleScore: 85,
        behavioralScore: 84,
        mlScore: 92,
        explanation: 'Extreme amount anomaly + Tor node routing + new hardware fingerprint.',
        recommendedAction: 'Hard block & freeze UPI handle.',
        evaluationTimeMs: 14,
        createdAt: new Date().toISOString(),
        riskFactors: [
          {
            factorCode: 'RULE_EXTREME_AMOUNT_ANOMALY',
            factorName: 'Extreme Amount Anomaly',
            weightScore: 35,
            category: 'AMOUNT_ANOMALY',
            details: '8.8x above 30d baseline volume.',
            severity: 'CRITICAL',
          },
          {
            factorCode: 'RULE_TOR_PROXY_ATTACK',
            factorName: 'Tor Exit Node Relay',
            weightScore: 28,
            category: 'NETWORK_IP',
            details: 'Traffic routed through confirmed Tor relay.',
            severity: 'HIGH',
          },
        ],
      };
    } else if (scenario === 'GEO_JUMP') {
      tx = {
        transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        customerId: 'CUST-1121',
        customerName: 'Gourmet Foods & Luxury Spirits',
        merchantId: 'MERCH-1121',
        merchantName: 'Highland Park Retailers',
        merchantCategory: 'LUXURY_RETAIL',
        amount: 14500,
        currency: 'INR',
        paymentMethod: 'Credit Card / Mastercard World',
        cardBin: '542418',
        cardLast4: '7721',
        deviceId: 'DEV-0091-B',
        deviceName: 'Windows 11 Chrome',
        ipAddress: '198.51.100.22',
        ipLocation: 'Dallas, US (VPN Detected)',
        locationCity: 'Dallas / Delhi Anomaly',
        locationCountry: 'IND',
        status: 'FLAGGED',
        riskScore: 74,
        riskLevel: 'HIGH',
        decision: 'REVIEW',
        ruleScore: 70,
        behavioralScore: 72,
        mlScore: 78,
        explanation: 'Impossible geo-velocity jump: 12,400km in under 15 minutes.',
        recommendedAction: 'Route to manual fraud queue & require biometric push challenge.',
        evaluationTimeMs: 21,
        createdAt: new Date().toISOString(),
        riskFactors: [
          {
            factorCode: 'RULE_GEO_VELOCITY_IMPOSSIBLE',
            factorName: 'Impossible Geo Velocity',
            weightScore: 35,
            category: 'VELOCITY',
            details: 'Airspeed > 900km/h equivalent.',
            severity: 'HIGH',
          },
        ],
      };
    } else {
      tx = {
        transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        customerId: 'CUST-1022',
        customerName: 'Priya Verma',
        merchantId: 'MERCH-3321',
        merchantName: 'Swiggy Instamart',
        merchantCategory: 'GROCERIES',
        amount: 1850,
        currency: 'INR',
        paymentMethod: 'UPI / PhonePe',
        cardBin: '508129',
        cardLast4: '1092',
        deviceId: 'DEV-7788-I',
        deviceName: 'iPhone 15 Pro',
        ipAddress: '103.21.144.12',
        ipLocation: 'Mumbai, IN',
        locationCity: 'Mumbai',
        locationCountry: 'IND',
        status: 'SETTLED',
        riskScore: 8,
        riskLevel: 'LOW',
        decision: 'APPROVE',
        ruleScore: 0,
        behavioralScore: 8,
        mlScore: 10,
        explanation: 'Fully authenticated customer profile on trusted device.',
        recommendedAction: 'Instant Approval.',
        evaluationTimeMs: 11,
        createdAt: new Date().toISOString(),
        riskFactors: [],
      };
    }

    setTransactions((prev) => [tx, ...prev]);
    setSelectedTx(tx);
  };

  const handleInjectSimulatedTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
    setSelectedTx(tx);
    setActiveTab('transactions');
  };

  // Open case from Dashboard
  const handleViewCaseFromDashboard = (txId: string) => {
    const matchingCase = cases.find((c) => c.linkedTransactions.includes(txId));
    if (matchingCase) {
      setSelectedCaseId(matchingCase.caseId);
      setActiveTab('cases');
    } else {
      const targetTx = transactions.find((t) => t.transactionId === txId);
      if (targetTx) {
        handleCreateCaseFromTx(targetTx);
      } else {
        setActiveTab('cases');
      }
    }
  };

  const openAlertsCount = alerts.filter((a) => a.status === 'OPEN' || a.status === 'INVESTIGATING').length;
  const openCasesCount = cases.filter((c) => c.status !== 'RESOLVED' && c.status !== 'CLOSED').length;
  const activeRulesCount = rules.filter((r) => r.isActive).length;

  if (viewMode === 'landing') {
    return (
      <LandingPage
        onOpenDashboard={(tab) => {
          if (tab) setActiveTab(tab);
          setViewMode('app');
        }}
      />
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50 text-slate-900">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLiveStreaming={isLiveStreaming}
        setIsLiveStreaming={setIsLiveStreaming}
        onSimulateClick={() => setActiveTab('simulator')}
        onBackToLanding={() => setViewMode('landing')}
        transactions={transactions}
      />

      {/* Main App Layout: Dark Sidebar + Dynamic View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openAlertsCount={openAlertsCount}
          openCasesCount={openCasesCount}
          activeRulesCount={activeRulesCount}
        />

        {/* View Router */}
        {activeTab === 'dashboard' && (
          <DashboardView
            transactions={transactions}
            selectedTx={selectedTx}
            onSelectTx={(tx) => {
              setSelectedTx(tx);
              setIsDetailModalOpen(true);
            }}
            onViewCase={handleViewCaseFromDashboard}
            onOpenSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionsView
            transactions={transactions}
            onSelectTx={(tx) => {
              setSelectedTx(tx);
              setIsDetailModalOpen(true);
            }}
            onInjectScenario={handleInjectScenario}
            onOpenSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'rules' && (
          <RiskRulesView
            rules={rules}
            onToggleRule={handleToggleRule}
            onAddRule={handleAddRule}
          />
        )}

        {activeTab === 'alerts' && (
          <FraudAlertsView
            alerts={alerts}
            onUpdateAlertStatus={handleUpdateAlertStatus}
            onCreateCaseFromAlert={handleCreateCaseFromAlert}
          />
        )}

        {activeTab === 'cases' && (
          <InvestigationCasesView
            cases={cases}
            selectedCaseId={selectedCaseId}
            onSelectCase={(id) => setSelectedCaseId(id)}
            onAddNote={handleAddCaseNote}
            onUpdateStatus={handleUpdateCaseStatus}
          />
        )}

        {activeTab === 'simulator' && (
          <RiskSimulatorView
            onInjectSimulatedTransaction={handleInjectSimulatedTransaction}
          />
        )}
      </div>

      {/* Transaction Slide-over Inspection Drawer */}
      {isDetailModalOpen && (
        <TransactionDetailModal
          tx={selectedTx}
          onClose={() => setIsDetailModalOpen(false)}
          onOverrideDecision={handleOverrideDecision}
          onCreateCase={handleCreateCaseFromTx}
        />
      )}
    </div>
  );
}
