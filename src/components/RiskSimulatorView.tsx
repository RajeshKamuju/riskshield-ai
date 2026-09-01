import React, { useState } from 'react';
import {
  Cpu,
  Play,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Layers,
  Activity,
  PlusCircle,
  RotateCcw,
  Zap
} from 'lucide-react';
import { Transaction, Decision, RiskLevel, RiskFactor } from '../types';

interface RiskSimulatorViewProps {
  onInjectSimulatedTransaction: (tx: Transaction) => void;
}

export const RiskSimulatorView: React.FC<RiskSimulatorViewProps> = ({
  onInjectSimulatedTransaction,
}) => {
  // Input parameters
  const [customerName, setCustomerName] = useState('Vikram S. Singhania');
  const [customerId, setCustomerId] = useState('CUST-8812');
  const [merchantName, setMerchantName] = useState('CryptoX Exchange');
  const [merchantCategory, setMerchantCategory] = useState('CRYPTOCURRENCY');
  const [amount, setAmount] = useState<number>(68000);
  const [currency, setCurrency] = useState('INR');
  const [paymentMethod, setPaymentMethod] = useState('UPI / RuPay');
  const [hist30dAvg, setHist30dAvg] = useState<number>(8500);
  const [txCount10m, setTxCount10m] = useState<number>(4);
  const [failedLogins24h, setFailedLogins24h] = useState<number>(2);
  const [isTorOrVpn, setIsTorOrVpn] = useState<boolean>(true);
  const [isNewDevice, setIsNewDevice] = useState<boolean>(true);
  const [locationCity, setLocationCity] = useState('Frankfurt / Mumbai Anomaly');

  // Evaluation Result State
  const [resultTx, setResultTx] = useState<Transaction | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const handleEvaluate = () => {
    setIsEvaluating(true);

    setTimeout(() => {
      // Calculate scores dynamically based on inputs
      const factors: RiskFactor[] = [];
      let ruleScore = 0;
      let behavioralScore = 15;
      let mlScore = 18;

      // 1. Amount Anomaly
      const ratio = amount / (hist30dAvg || 1);
      if (ratio >= 6.0) {
        ruleScore += 35;
        behavioralScore += 30;
        mlScore += 28;
        factors.push({
          factorCode: 'RULE_EXTREME_AMOUNT_ANOMALY',
          factorName: 'Extreme Amount Anomaly',
          weightScore: 35,
          category: 'AMOUNT_ANOMALY',
          details: `${ratio.toFixed(1)}x spike compared to historical 30-day baseline (₹${amount.toLocaleString()} vs ₹${hist30dAvg.toLocaleString()}).`,
          severity: 'CRITICAL',
        });
      } else if (ratio >= 3.0) {
        ruleScore += 20;
        behavioralScore += 15;
        mlScore += 18;
        factors.push({
          factorCode: 'RULE_MODERATE_AMOUNT_SPIKE',
          factorName: 'Moderate Amount Deviation',
          weightScore: 20,
          category: 'AMOUNT_ANOMALY',
          details: `${ratio.toFixed(1)}x spike above average spending baseline.`,
          severity: 'MEDIUM',
        });
      }

      // 2. Velocity
      if (txCount10m >= 5) {
        ruleScore += 30;
        behavioralScore += 25;
        mlScore += 22;
        factors.push({
          factorCode: 'RULE_HIGH_VELOCITY_BURST',
          factorName: 'Rapid Velocity Burst',
          weightScore: 30,
          category: 'VELOCITY',
          details: `${txCount10m} transactions initiated within a 10-minute sliding window.`,
          severity: 'HIGH',
        });
      } else if (txCount10m >= 3) {
        ruleScore += 15;
        behavioralScore += 10;
        mlScore += 12;
        factors.push({
          factorCode: 'RULE_ELEVATED_VELOCITY',
          factorName: 'Elevated Short-Term Velocity',
          weightScore: 15,
          category: 'VELOCITY',
          details: `${txCount10m} transactions in last 10 minutes.`,
          severity: 'MEDIUM',
        });
      }

      // 3. Network / IP
      if (isTorOrVpn) {
        ruleScore += 28;
        mlScore += 24;
        factors.push({
          factorCode: 'RULE_TOR_PROXY_ATTACK',
          factorName: 'Tor Exit Node / Anonymizing VPN',
          weightScore: 28,
          category: 'NETWORK_IP',
          details: 'Incoming traffic originates from verified anonymizer proxy network.',
          severity: 'HIGH',
        });
      }

      // 4. Device Integrity
      if (isNewDevice) {
        ruleScore += 18;
        behavioralScore += 18;
        factors.push({
          factorCode: 'RULE_DEVICE_FINGERPRINT_MISMATCH',
          factorName: 'Unrecognized Device Signature',
          weightScore: 18,
          category: 'DEVICE',
          details: 'Hardware UUID and canvas fingerprint not previously associated with cardholder.',
          severity: 'MEDIUM',
        });
      }

      // 5. Failed Logins
      if (failedLogins24h >= 2) {
        ruleScore += 22;
        behavioralScore += 20;
        factors.push({
          factorCode: 'RULE_FAILED_BURST_TAKEOVER',
          factorName: 'Pre-Transaction Auth Failures',
          weightScore: 22,
          category: 'BEHAVIOR',
          details: `${failedLogins24h} failed credential/OTP attempts prior to transaction.`,
          severity: 'HIGH',
        });
      }

      // Category risk
      if (merchantCategory === 'CRYPTOCURRENCY' || merchantCategory === 'LUXURY_RETAIL') {
        ruleScore += 15;
        mlScore += 16;
      }

      // Final composite score clamped to 0-99
      const compositeScore = Math.min(
        99,
        Math.round(ruleScore * 0.45 + behavioralScore * 0.25 + mlScore * 0.3)
      );

      let decision: Decision = 'APPROVE';
      let riskLevel: RiskLevel = 'LOW';
      let explanation = 'Legitimate authorization profile with high customer trust score.';
      let recommendedAction = 'Instant standard authorization.';

      if (compositeScore >= 80) {
        decision = 'BLOCK';
        riskLevel = 'CRITICAL';
        explanation = `Critical multi-signal threat. Detected ${factors.length} convergent fraud indicators (velocity, network proxy, and anomaly multiplier).`;
        recommendedAction = 'Hard block transaction, freeze UPI credentials, and alert SecOps.';
      } else if (compositeScore >= 60) {
        decision = 'REVIEW';
        riskLevel = 'HIGH';
        explanation = `Elevated risk threshold. Disproportionate amount combined with unusual network telemetry requires analyst inspection.`;
        recommendedAction = 'Hold for manual risk triage. Enforce biometric push challenge.';
      } else if (compositeScore >= 35) {
        decision = 'MONITOR';
        riskLevel = 'MEDIUM';
        explanation = `Moderate deviation detected. Minor velocity spike or merchant tier elevation.`;
        recommendedAction = 'Permit transaction with step-up 3DS OTP validation.';
      }

      const newTx: Transaction = {
        transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        customerId,
        customerName,
        customerEmail: `${customerId.toLowerCase()}@userlab.io`,
        merchantId: `MERCH-${Math.floor(1000 + Math.random() * 9000)}`,
        merchantName,
        merchantCategory,
        amount,
        currency,
        paymentMethod,
        cardBin: '432190',
        cardLast4: '9921',
        deviceId: isNewDevice ? 'DEV-NEW-8801' : 'DEV-TRUSTED-1022',
        deviceName: isNewDevice ? 'Unknown Linux Client (New)' : 'Trusted Mobile Device',
        ipAddress: isTorOrVpn ? '185.220.101.55' : '103.21.144.20',
        ipLocation: isTorOrVpn ? 'Frankfurt, DE (Tor Exit Node)' : 'Mumbai, IN',
        locationCity,
        locationCountry: 'IND',
        status: decision === 'BLOCK' ? 'BLOCKED' : decision === 'REVIEW' ? 'FLAGGED' : 'SETTLED',
        riskScore: compositeScore,
        riskLevel,
        decision,
        ruleScore: Math.min(99, ruleScore),
        behavioralScore: Math.min(99, behavioralScore),
        mlScore: Math.min(99, mlScore),
        explanation,
        recommendedAction,
        riskFactors: factors,
        createdAt: new Date().toISOString(),
        evaluationTimeMs: Math.floor(8 + Math.random() * 12),
      };

      setResultTx(newTx);
      setIsEvaluating(false);
    }, 300);
  };

  const handleInject = () => {
    if (resultTx) {
      onInjectSimulatedTransaction(resultTx);
    }
  };

  const handlePreset = (preset: 'ATTACK' | 'CLEAN' | 'CARD_TEST') => {
    if (preset === 'ATTACK') {
      setAmount(85000);
      setHist30dAvg(8000);
      setTxCount10m(6);
      setFailedLogins24h(3);
      setIsTorOrVpn(true);
      setIsNewDevice(true);
      setMerchantCategory('CRYPTOCURRENCY');
    } else if (preset === 'CLEAN') {
      setAmount(2400);
      setHist30dAvg(3500);
      setTxCount10m(1);
      setFailedLogins24h(0);
      setIsTorOrVpn(false);
      setIsNewDevice(false);
      setMerchantCategory('GROCERIES');
    } else if (preset === 'CARD_TEST') {
      setAmount(150);
      setHist30dAvg(1500);
      setTxCount10m(8);
      setFailedLogins24h(4);
      setIsTorOrVpn(true);
      setIsNewDevice(true);
      setMerchantCategory('DIGITAL_GOODS');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 gap-4 overflow-hidden bg-slate-50">
      {/* Top Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            Interactive Risk Simulator &amp; Decisioning Lab
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test any transaction payload in real-time against the Hybrid ML + Rule Decisioning engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Load Scenarios:</span>
          <button
            onClick={() => handlePreset('ATTACK')}
            className="text-[11px] font-bold px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded border border-rose-200 transition-colors"
          >
            ATO Attack Spike
          </button>
          <button
            onClick={() => handlePreset('CARD_TEST')}
            className="text-[11px] font-bold px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded border border-amber-200 transition-colors"
          >
            Card Testing Bot
          </button>
          <button
            onClick={() => handlePreset('CLEAN')}
            className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded border border-emerald-200 transition-colors"
          >
            Clean Auth
          </button>
        </div>
      </div>

      {/* Main Split Body: Left Form (1/2) + Right Output Evaluation (1/2) */}
      <div className="flex-1 flex gap-5 min-h-0 overflow-hidden">
        {/* Left Form */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-xs p-5 overflow-y-auto space-y-4 text-xs">
          <h3 className="font-bold text-xs text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
            <span>Transaction Parameters</span>
            <span className="text-[10px] text-slate-400 font-mono">Payload Builder</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                Customer Name &amp; ID
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                Customer ID
              </label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                Transaction Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-mono text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                30d Average Baseline (₹)
              </label>
              <input
                type="number"
                value={hist30dAvg}
                onChange={(e) => setHist30dAvg(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                Merchant Category
              </label>
              <select
                value={merchantCategory}
                onChange={(e) => setMerchantCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="CRYPTOCURRENCY">Cryptocurrency</option>
                <option value="CONSUMER_ELECTRONICS">Electronics</option>
                <option value="LUXURY_RETAIL">Luxury Retail</option>
                <option value="E_COMMERCE">E-Commerce</option>
                <option value="DIGITAL_GOODS">Digital Goods / Gaming</option>
                <option value="GROCERIES">Groceries</option>
              </select>
            </div>
          </div>

          {/* Velocity & Security Controls */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                Tx Count (Last 10 min)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={txCount10m}
                onChange={(e) => setTxCount10m(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                Failed Login Attempts (24h)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={failedLogins24h}
                onChange={(e) => setFailedLogins24h(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Anomaly Checkboxes */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase">
              Network &amp; Device Flags
            </p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTorOrVpn}
                  onChange={(e) => setIsTorOrVpn(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">
                  Tor Exit Node / Datacenter VPN IP Address
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewDevice}
                  onChange={(e) => setIsNewDevice(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">
                  Unrecognized / Novel Hardware Fingerprint
                </span>
              </label>
            </div>
          </div>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isEvaluating ? 'Running Decision Pipeline...' : 'Evaluate Hybrid Risk Engine'}</span>
          </button>
        </div>

        {/* Right Output Evaluation */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-xs p-5 overflow-y-auto flex flex-col justify-between">
          {resultTx ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Evaluation Result
                  </span>
                  <p className="font-mono text-sm font-bold text-indigo-600">
                    {resultTx.transactionId}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    Latency: {resultTx.evaluationTimeMs}ms
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-extrabold border uppercase ${
                      resultTx.decision === 'BLOCK'
                        ? 'bg-rose-100 text-rose-700 border-rose-200'
                        : resultTx.decision === 'MONITOR'
                        ? 'bg-amber-100 text-amber-700 border-amber-200'
                        : resultTx.decision === 'REVIEW'
                        ? 'bg-orange-100 text-orange-700 border-orange-200'
                        : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    Decision: {resultTx.decision}
                  </span>
                </div>
              </div>

              {/* Score Matrix */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Composite</p>
                  <p
                    className={`text-2xl font-black font-mono mt-0.5 ${
                      resultTx.riskScore >= 75
                        ? 'text-rose-600'
                        : resultTx.riskScore >= 50
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {resultTx.riskScore}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Rule Weight</p>
                  <p className="text-base font-bold font-mono text-slate-800 mt-1">
                    {resultTx.ruleScore}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Behavioral</p>
                  <p className="text-base font-bold font-mono text-slate-800 mt-1">
                    {resultTx.behavioralScore}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">ML Ensemble</p>
                  <p className="text-base font-bold font-mono text-slate-800 mt-1">
                    {resultTx.mlScore}
                  </p>
                </div>
              </div>

              {/* Rationale */}
              <div className="p-3.5 bg-slate-900 rounded-xl text-white space-y-1.5 border border-slate-800">
                <p className="text-[10px] font-bold text-indigo-400 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Explainable AI Rationale
                </p>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {resultTx.explanation}
                </p>
                <p className="text-[11px] text-indigo-300 font-semibold pt-1">
                  Action: {resultTx.recommendedAction}
                </p>
              </div>

              {/* Factor breakdown */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  Triggered Factors ({resultTx.riskFactors.length})
                </p>
                {resultTx.riskFactors.length === 0 ? (
                  <p className="text-xs text-emerald-600 bg-emerald-50 p-2 rounded border border-emerald-100">
                    No risk signals triggered. Clean profile.
                  </p>
                ) : (
                  resultTx.riskFactors.map((f, i) => (
                    <div
                      key={i}
                      className="p-2 bg-slate-50 rounded border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-800">{f.factorName}</p>
                        <p className="text-[10px] text-slate-500">{f.details}</p>
                      </div>
                      <span className="font-mono font-bold text-rose-600">+{f.weightScore}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleInject}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Push Transaction to Live Ledger Feed</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <Zap className="w-10 h-10 text-slate-300 mb-2" />
              <p className="font-bold text-slate-700 text-sm">Simulator Ready</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Configure parameters on the left or select a preset scenario, then click 'Evaluate
                Hybrid Risk Engine'.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
