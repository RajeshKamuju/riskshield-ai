import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldAlert, Zap, Server, Activity, CheckCircle2, AlertTriangle, ShieldX, RefreshCw, Smartphone, Globe, Clock, Layers } from 'lucide-react';

interface LandingHeroProps {
  onExplore: () => void;
  onSimulate: () => void;
}

interface DemoPayload {
  id: string;
  txId: string;
  amount: number;
  customer: string;
  paymentMethod: string;
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  decision: 'APPROVE' | 'MONITOR' | 'REVIEW' | 'BLOCK';
  factors: { name: string; points: number; tag: string }[];
  latency: number;
  origin: string;
  device: string;
}

const DEMO_TXS: DemoPayload[] = [
  {
    id: 'crit-1',
    txId: 'TXN-92841',
    amount: 75000,
    customer: 'Rahul Verma (CUST-8812)',
    paymentMethod: 'UPI / PhonePe Fast-Track',
    score: 92,
    level: 'CRITICAL',
    decision: 'BLOCK',
    factors: [
      { name: 'Amount anomaly', points: 20, tag: '8.4x baseline volume' },
      { name: 'Transaction velocity', points: 25, tag: '6 attempts / 180s' },
      { name: 'New device', points: 15, tag: 'Unrecognized canvas' },
      { name: 'IP reputation', points: 20, tag: 'Tor exit relay' },
      { name: 'Location anomaly', points: 12, tag: 'Frankfurt / Mumbai jump' },
    ],
    latency: 11,
    origin: 'Frankfurt, DE (Tor Relay)',
    device: 'Generic Linux Client',
  },
  {
    id: 'high-1',
    txId: 'TXN-41902',
    amount: 32000,
    customer: 'Neha Iyer (CUST-4402)',
    paymentMethod: 'Credit Card / Visa Platinum',
    score: 68,
    level: 'HIGH',
    decision: 'REVIEW',
    factors: [
      { name: 'Transaction velocity', points: 22, tag: '3 attempts in 5m' },
      { name: 'New device profile', points: 18, tag: 'MacBook OS mismatch' },
      { name: 'Geographic jump', points: 16, tag: 'Delhi / Dallas proxy' },
      { name: 'Amount deviation', points: 12, tag: '3.2x baseline' },
    ],
    latency: 14,
    origin: 'Dallas, US (VPN Detected)',
    device: 'MacBook Pro M3',
  },
  {
    id: 'clean-1',
    txId: 'TXN-10822',
    amount: 1850,
    customer: 'Priya Sharma (CUST-1092)',
    paymentMethod: 'UPI / Google Pay',
    score: 8,
    level: 'LOW',
    decision: 'APPROVE',
    factors: [
      { name: 'Known hardware signature', points: -5, tag: 'iPhone 15 Pro Verified' },
      { name: 'Historical merchant affinity', points: -5, tag: 'Swiggy Instamart (18x prior)' },
      { name: 'Domestic carrier ASN', points: 0, tag: 'Airtel Broadband Mumbai' },
    ],
    latency: 9,
    origin: 'Mumbai, IN (Clean Residential)',
    device: 'iPhone 15 Pro (Trusted)',
  }
];

export function LandingHero({ onExplore, onSimulate }: LandingHeroProps) {
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(false);
  const [displayScore, setDisplayScore] = useState(92);

  const activeTx = DEMO_TXS[activeDemoIndex];

  // Subtle animated score counter on payload switch
  useEffect(() => {
    let start = 0;
    const target = activeTx.score;
    const duration = 400;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (target - start) / steps;
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
        setDisplayScore(target);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [activeDemoIndex]);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-stone-200/60 bg-[#FAF8F5]">
      {/* Editorial Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e415_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e415_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col space-y-7">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-300/80 text-stone-800 text-xs font-semibold w-fit shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
              <span>Real-Time Payment Risk &amp; Fraud Intelligence Layer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
              Every payment has a risk.{' '}
              <span className="text-emerald-900 block sm:inline">
                Know it before it becomes a loss.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-stone-700 leading-relaxed max-w-2xl font-normal">
              RiskShield AI analyzes transaction behaviour, payment patterns, device signals, network activity and geographic anomalies to identify suspicious activity and provide explainable risk decisions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer border border-emerald-800 group"
              >
                <span>Explore Risk Intelligence</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onSimulate}
                className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200/80 text-stone-900 font-semibold text-sm px-6 py-3.5 rounded-xl border border-stone-300 shadow-2xs transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4 text-emerald-700" />
                <span>Try Risk Simulator</span>
              </button>
            </div>

            {/* Ecosystem Micro Metrics */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-stone-700">
              <div>
                <div className="text-2xl font-extrabold text-stone-900 tracking-tight font-mono">
                  &lt;15ms
                </div>
                <div className="text-xs text-stone-700 font-medium">Evaluation Latency</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-stone-900 tracking-tight font-mono">
                  100%
                </div>
                <div className="text-xs text-stone-700 font-medium">Explainable Factors</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-stone-900 tracking-tight font-mono">
                  Multi-Signal
                </div>
                <div className="text-xs text-stone-700 font-medium">Device, IP &amp; Velocity</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Risk Engine Live Visualization */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-2xl border border-stone-300 shadow-xl overflow-hidden">
              
              {/* Card Header Bar */}
              <div className="bg-stone-950 text-white px-5 py-4 flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider text-stone-200 uppercase">
                    PAYMENT RISK ENGINE
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                  <Clock className="w-3 h-3" />
                  <span>{activeTx.latency}ms</span>
                </div>
              </div>

              {/* Sample Selector Tabs */}
              <div className="bg-stone-100/90 px-4 py-2 border-b border-stone-200 flex items-center justify-between text-xs">
                <span className="text-stone-700 font-medium">Interactive Demo Payload:</span>
                <div className="flex items-center gap-1">
                  {DEMO_TXS.map((demo, idx) => (
                    <button
                      key={demo.id}
                      onClick={() => setActiveDemoIndex(idx)}
                      className={`px-2 py-1 rounded text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                        activeDemoIndex === idx
                          ? 'bg-stone-900 text-white'
                          : 'text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {demo.level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transaction Main Header */}
              <div className="p-5 border-b border-stone-100 bg-stone-50/50 flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-stone-700 font-medium tracking-wide">
                    {activeTx.txId}
                  </div>
                  <div className="text-3xl font-extrabold text-stone-900 font-mono tracking-tight mt-0.5">
                    ₹{activeTx.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-stone-700 mt-1 flex items-center gap-1.5">
                    <span className="font-medium text-stone-700">{activeTx.customer}</span>
                    <span>•</span>
                    <span className="font-mono text-stone-700">{activeTx.paymentMethod}</span>
                  </div>
                </div>

                {/* Score Dial / Badge */}
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-extrabold font-mono tracking-tight transition-all ${
                        activeTx.score >= 80
                          ? 'text-rose-600'
                          : activeTx.score >= 60
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {displayScore}
                    </span>
                    <span className="text-xs font-mono text-stone-700 font-semibold">/ 100</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded tracking-wide mt-1 ${
                      activeTx.score >= 80
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : activeTx.score >= 60
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {activeTx.level} RISK
                  </span>
                </div>
              </div>

              {/* Risk Factors Breakdown */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
                  <span>Risk factors</span>
                  <span>Weight Attribution</span>
                </div>

                <div className="space-y-2.5">
                  {activeTx.factors.map((factor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-stone-50 border border-stone-200/70 hover:border-stone-300 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-stone-800">
                          {factor.name}
                        </span>
                        <span className="text-[10px] text-stone-700 font-mono">
                          {factor.tag}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                          factor.points > 0
                            ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        }`}
                      >
                        {factor.points > 0 ? `+${factor.points}` : `${factor.points}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engine Decision Outcome */}
              <div className="px-5 py-4 bg-stone-900 text-white flex items-center justify-between border-t border-stone-800">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                    Engine Decision
                  </span>
                  <span className="text-xs text-stone-300 font-normal">
                    {activeTx.decision === 'BLOCK'
                      ? 'Immediate hard block & token freeze'
                      : activeTx.decision === 'REVIEW'
                      ? 'Queued for high-priority analyst triage'
                      : 'Frictionless settlement authorized'}
                  </span>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono font-extrabold text-xs tracking-wider shadow-xs ${
                    activeTx.decision === 'BLOCK'
                      ? 'bg-rose-600 text-white'
                      : activeTx.decision === 'REVIEW'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-emerald-500 text-stone-950'
                  }`}
                >
                  {activeTx.decision === 'BLOCK' && <ShieldX className="w-4 h-4" />}
                  {activeTx.decision === 'REVIEW' && <AlertTriangle className="w-4 h-4" />}
                  {activeTx.decision === 'APPROVE' && <CheckCircle2 className="w-4 h-4" />}
                  <span>{activeTx.decision}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
