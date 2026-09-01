import React, { useState } from 'react';
import { 
  UserX, 
  Repeat, 
  Zap, 
  Globe2, 
  Smartphone, 
  XOctagon, 
  ShieldAlert, 
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Flame
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  sampleTx: {
    txId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    customer: string;
    score: number;
    decision: 'BLOCK' | 'REVIEW' | 'MONITOR' | 'APPROVE';
    level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    signals: string[];
    whyDetected: string;
    actionTaken: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'ato',
    title: 'Account Takeover (ATO)',
    category: 'Identity & Credential Theft',
    description: 'Fraudsters compromise a verified customer account and initiate an immediate high-value checkout using a brand-new, unrecognized hardware profile.',
    icon: UserX,
    sampleTx: {
      txId: 'TXN-88401',
      amount: 88000,
      currency: 'INR',
      paymentMethod: 'UPI / RuPay Platinum',
      customer: 'Amit K. Sharma (CUST-9942)',
      score: 89,
      decision: 'BLOCK',
      level: 'CRITICAL',
      signals: [
        'Amount is 8.8x customer historical 30d median',
        'New hardware fingerprint (Linux X11 Canvas)',
        'IP geolocation mismatch (Frankfurt Tor Node)',
        'Dormant account suddenly active after 45 days',
      ],
      whyDetected: 'RiskShield cross-checks the hardware canvas hash and network ASN against the customer profile, identifying zero device continuity and extreme amount divergence.',
      actionTaken: 'Payment blocked instantly. Customer notified via registered SMS channel. Session credentials revoked.',
    },
  },
  {
    id: 'card-testing',
    title: 'Card Testing Micro-Probes',
    category: 'Automated Botnets',
    description: 'Attackers use automated scripts to validate batches of stolen credit card numbers by attempting rapid micro-charges on digital goods or gaming sites.',
    icon: Repeat,
    sampleTx: {
      txId: 'TXN-10928',
      amount: 120,
      currency: 'INR',
      paymentMethod: 'Prepaid Visa / 400115',
      customer: 'Scripted Bot Client (CUST-3310)',
      score: 94,
      decision: 'BLOCK',
      level: 'CRITICAL',
      signals: [
        '14 sequential attempts under ₹200 within 180 seconds',
        'Rapid CVV permutations across single IP subnet',
        'High-velocity digital goods merchant category',
        'Headless browser automation flags detected',
      ],
      whyDetected: 'Sliding 60-second window detects extreme burst velocity with sub-normal order value distribution characteristic of carding tools.',
      actionTaken: 'IP subnet temporarily blacklisted. BIN alerts dispatched to gateway switch.',
    },
  },
  {
    id: 'velocity-attack',
    title: 'Velocity Burst Attack',
    category: 'Rapid Fund Drainage',
    description: 'Organized attackers rapidly execute high-frequency transactions across multiple payment gateways before bank balances or card limits can be frozen.',
    icon: Zap,
    sampleTx: {
      txId: 'TXN-77402',
      amount: 45000,
      currency: 'INR',
      paymentMethod: 'NetBanking / HDFC Corporate',
      customer: 'Sneha Kulkarni (CUST-5512)',
      score: 86,
      decision: 'BLOCK',
      level: 'CRITICAL',
      signals: [
        '4th high-value debit attempt in 6 minutes',
        'Aggregate volume exceeds 5x daily normal spend',
        'Rapid merchant category hopping in single session',
      ],
      whyDetected: 'Real-time stateful cache tracks global rolling volume per customer identity regardless of how many different checkout tabs are opened.',
      actionTaken: 'Hard block on 4th attempt. Step-up biometric challenge required for release.',
    },
  },
  {
    id: 'geo-anomaly',
    title: 'Impossible Geographic Anomaly',
    category: 'Geo-Velocity Analysis',
    description: 'A transaction is attempted from a geographic location physically impossible to reach given the time elapsed since the user’s previous legitimate payment.',
    icon: Globe2,
    sampleTx: {
      txId: 'TXN-55912',
      amount: 14500,
      currency: 'INR',
      paymentMethod: 'Credit Card / Mastercard World',
      customer: 'Rohan Sengupta (CUST-1121)',
      score: 74,
      decision: 'REVIEW',
      level: 'HIGH',
      signals: [
        'Haversine distance between transactions: 12,400 km',
        'Time elapsed since Mumbai in-person swipe: 18 minutes',
        'Implied required airspeed: 41,333 km/h',
        'Commercial VPN exit IP in Dallas, US',
      ],
      whyDetected: 'Haversine mathematical distance validation identifies impossible human transit speed between successive authorized payment events.',
      actionTaken: 'Escalated to High Priority Review queue. Step-up push verification dispatched to primary handset.',
    },
  },
  {
    id: 'suspicious-device',
    title: 'Suspicious Device & Emulator',
    category: 'Hardware & OS Spoofing',
    description: 'An attacker uses an Android emulator with spoofed device properties and a virtual GPS layer to simulate legitimate local mobile checkout behavior.',
    icon: Smartphone,
    sampleTx: {
      txId: 'TXN-33019',
      amount: 22000,
      currency: 'INR',
      paymentMethod: 'UPI / PhonePe VPA',
      customer: 'Vikram Bose (CUST-7741)',
      score: 78,
      decision: 'REVIEW',
      level: 'HIGH',
      signals: [
        'Rooted environment & Xposed framework hooks',
        'Canvas hash inconsistency vs reported user-agent',
        'Screen resolution / battery status constant 100%',
        'Mock location provider enabled in OS layer',
      ],
      whyDetected: 'Hardware integrity engine analyzes browser canvas rendering artifacts, detecting synthetic environment virtualization.',
      actionTaken: 'Payment flagged for manual analyst review with device telemetry breakdown.',
    },
  },
  {
    id: 'failure-burst',
    title: 'Failed Payment Burst',
    category: 'Credential Exhaustion',
    description: 'A series of rapid failed payment attempts with incorrect OTPs and expired card dates followed by sudden attempts on alternate cards.',
    icon: XOctagon,
    sampleTx: {
      txId: 'TXN-99120',
      amount: 38000,
      currency: 'INR',
      paymentMethod: 'Credit Card / ICICI Bank',
      customer: 'Deepak Malhotra (CUST-3901)',
      score: 82,
      decision: 'BLOCK',
      level: 'CRITICAL',
      signals: [
        '5 consecutive failed OTP / CVV attempts in 4 minutes',
        'Sudden card BIN switch from Visa to RuPay',
        'Amount decreased incrementally to test debit limit',
      ],
      whyDetected: 'Failure cascade state machine flags repetitive authentication failures as probable brute-force credential stuffing.',
      actionTaken: 'Session locked for 30 minutes. Risk alert dispatched to risk operations console.',
    },
  },
];

export function LandingFraudScenarios() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const activeScenario = SCENARIOS[selectedScenarioIndex];
  const sample = activeScenario.sampleTx;

  return (
    <section id="fraud-scenarios" className="py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-emerald-700" />
            <span>Attack Vectors &amp; Detection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            Real-world fraud scenarios.{' '}
            <span className="text-emerald-900 block">Instant mitigation.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            Select an attack pattern below to inspect how RiskShield AI catches anomalous signals and enforces automated gateway protection.
          </p>
        </div>

        {/* 6 Scenario Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {SCENARIOS.map((scen, idx) => {
            const Icon = scen.icon;
            const isSelected = selectedScenarioIndex === idx;
            return (
              <button
                key={scen.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-emerald-400' : 'text-stone-500'
                      }`}
                    />
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="font-bold text-xs leading-snug line-clamp-2">
                    {scen.title}
                  </div>
                </div>

                <div
                  className={`mt-3 pt-2 border-t text-[10px] font-mono ${
                    isSelected ? 'border-emerald-800 text-emerald-300' : 'border-stone-100 text-stone-500'
                  }`}
                >
                  {isSelected ? '● Inspected' : 'Select →'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Scenario Forensic Dossier Card */}
        <div className="bg-white rounded-2xl border border-stone-300 shadow-sm overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-stone-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                  SCENARIO FORENSICS #{selectedScenarioIndex + 1}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {activeScenario.title} — {activeScenario.category}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-stone-400">DECISION:</span>
              <span
                className={`font-mono text-xs font-extrabold px-3 py-1 rounded-md ${
                  sample.decision === 'BLOCK'
                    ? 'bg-rose-600 text-white'
                    : 'bg-amber-500 text-stone-950'
                }`}
              >
                {sample.decision} ({sample.score}/100)
              </span>
            </div>
          </div>

          {/* Body Content: Two Columns */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Sample Transaction Payload */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                Intercepted Transaction Payload
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 font-mono text-xs">
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Transaction ID:</span>
                  <span className="font-bold text-stone-900">{sample.txId}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Amount:</span>
                  <span className="font-bold text-stone-900">
                    ₹{sample.amount.toLocaleString('en-IN')} {sample.currency}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Payment Channel:</span>
                  <span className="text-stone-800">{sample.paymentMethod}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Target Identity:</span>
                  <span className="text-stone-800">{sample.customer}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-500">Composite Score:</span>
                  <span
                    className={`font-bold ${
                      sample.score >= 80 ? 'text-rose-600' : 'text-amber-600'
                    }`}
                  >
                    {sample.score} / 100 ({sample.level} RISK)
                  </span>
                </div>
              </div>

              {/* Action Taken Box */}
              <div className="bg-stone-900 text-white p-4 rounded-xl border border-stone-800">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase mb-1">
                  Automated Gateway Action
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {sample.actionTaken}
                </p>
              </div>
            </div>

            {/* Right Column: Triggered Risk Signals & Rationale */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Key Anomalies &amp; Signal Triggers
                </div>
                <div className="space-y-2">
                  {sample.signals.map((sig, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-rose-50/70 border border-rose-200/80 text-xs text-rose-950 font-medium flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200">
                <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Why RiskShield AI Detects It
                </div>
                <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
                  {sample.whyDetected}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
