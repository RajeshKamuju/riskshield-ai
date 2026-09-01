import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Shield, 
  AlertTriangle, 
  ShieldX, 
  ArrowRight,
  Sliders,
  Scale
} from 'lucide-react';

interface DecisionBand {
  range: string;
  minScore: number;
  maxScore: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  action: 'APPROVE' | 'MONITOR' | 'REVIEW' | 'BLOCK';
  actionTagline: string;
  description: string;
  gatewayBehavior: string;
  analystAction: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    accent: string;
  };
}

const BANDS: DecisionBand[] = [
  {
    range: '0 – 29',
    minScore: 0,
    maxScore: 29,
    level: 'LOW',
    action: 'APPROVE',
    actionTagline: 'Instant Frictionless Clearance',
    description: 'Transactions with verified biometric device credentials, consistent domestic IP ranges, and amounts aligned with customer baseline.',
    gatewayBehavior: 'Settlement proceeds instantaneously with 0 additional challenges.',
    analystAction: 'No manual intervention needed. Logged to passive audit history.',
    colorScheme: {
      bg: 'bg-emerald-50/60',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      accent: 'text-emerald-600',
    },
  },
  {
    range: '30 – 59',
    minScore: 30,
    maxScore: 59,
    level: 'MEDIUM',
    action: 'MONITOR',
    actionTagline: 'Passive Telemetry & Post-Auth Audit',
    description: 'Slight deviations such as a first-time purchase at a new merchant category or minor geo variance without high-risk proxy flags.',
    gatewayBehavior: 'Payment authorized with enhanced background session tracking.',
    analystAction: 'Aggregated into daily cohort monitoring; watchlist flag tagged.',
    colorScheme: {
      bg: 'bg-stone-50/80',
      border: 'border-stone-200',
      text: 'text-stone-900',
      badge: 'bg-stone-100 text-stone-700 border-stone-300',
      accent: 'text-stone-600',
    },
  },
  {
    range: '60 – 79',
    minScore: 60,
    maxScore: 79,
    level: 'HIGH',
    action: 'REVIEW',
    actionTagline: 'Dynamic Step-Up & Analyst Escalation',
    description: 'Elevated anomaly combinations such as newly recognized hardware, VPN proxy usage, or multiple attempts within short time frames.',
    gatewayBehavior: 'Triggers dynamic 3DS step-up challenge or queues for immediate operator review.',
    analystAction: 'Enters the high-priority triage queue with complete factor breakdown.',
    colorScheme: {
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      text: 'text-amber-950',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      accent: 'text-amber-600',
    },
  },
  {
    range: '80 – 100',
    minScore: 80,
    maxScore: 100,
    level: 'CRITICAL',
    action: 'BLOCK',
    actionTagline: 'Immediate Automated Hard Block',
    description: 'High-confidence attack signatures: Tor exit nodes, impossible geo velocities, card testing bursts, or severe amount anomalies.',
    gatewayBehavior: 'Immediate hard authorization rejection. Temporary token lock applied.',
    analystAction: 'Auto-generates urgent Investigation Case with linked network graph.',
    colorScheme: {
      bg: 'bg-rose-50/70',
      border: 'border-rose-200',
      text: 'text-rose-950',
      badge: 'bg-rose-100 text-rose-900 border-rose-300',
      accent: 'text-rose-600',
    },
  },
];

export function LandingRiskDecisionScale() {
  const [selectedBandIndex, setSelectedBandIndex] = useState(3);
  const activeBand = BANDS[selectedBandIndex];

  return (
    <section className="py-24 bg-[#FDFCFA] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-3 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Deterministic Risk Calibration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            From transaction data{' '}
            <span className="text-stone-700 block">to action.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            Every risk evaluation resolves into a deterministic score band with pre-configured gateway actions, eliminating guesswork while providing granular analyst controls.
          </p>
        </div>

        {/* 4 Decision Bands Large Scale Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {BANDS.map((band, idx) => {
            const isSelected = selectedBandIndex === idx;
            return (
              <div
                key={band.level}
                onClick={() => setSelectedBandIndex(idx)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${band.colorScheme.bg} ${band.colorScheme.border} shadow-md ring-2 ring-stone-900/10`
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div>
                  {/* Score Range Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold font-mono text-stone-900 tracking-tight">
                      {band.range}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${band.colorScheme.badge}`}
                    >
                      {band.level}
                    </span>
                  </div>

                  {/* Decision Action Pill */}
                  <div className="mb-4">
                    <div
                      className={`text-xl font-extrabold font-mono tracking-wider ${
                        band.action === 'BLOCK'
                          ? 'text-rose-700'
                          : band.action === 'REVIEW'
                          ? 'text-amber-700'
                          : band.action === 'MONITOR'
                          ? 'text-stone-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      {band.action}
                    </div>
                    <div className="text-xs text-stone-600 font-medium mt-1">
                      {band.actionTagline}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {band.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 text-[11px] font-mono text-stone-700 flex items-center justify-between">
                  <span>Inspection Specs</span>
                  <span>{isSelected ? '● Active View' : 'Click to inspect →'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Continuous Gradient Meter Bar */}
        <div className="bg-white p-6 rounded-2xl border border-stone-300 shadow-xs mb-8">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-700 mb-2">
            <span>LOW (0–29) APPROVE</span>
            <span>MEDIUM (30–59) MONITOR</span>
            <span>HIGH (60–79) REVIEW</span>
            <span>CRITICAL (80–100) BLOCK</span>
          </div>

          <div className="h-4 w-full rounded-full bg-linear-to-r from-emerald-500 via-stone-400 via-amber-500 to-rose-600 relative overflow-hidden shadow-inner">
            {/* Active Indicator Tick */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-md transition-all duration-300"
              style={{
                left: `${(activeBand.minScore + activeBand.maxScore) / 2}%`,
              }}
            />
          </div>
        </div>

        {/* Deep Dive Specification for Selected Band */}
        <div className="bg-stone-950 text-white rounded-2xl p-6 sm:p-8 border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                ACTIVE BAND SPECS
              </div>
              <div className="text-2xl font-extrabold font-mono mt-1 text-white">
                {activeBand.level} RISK ({activeBand.range}) → {activeBand.action}
              </div>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                {activeBand.description}
              </p>
            </div>

            <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-1.5">
              <div className="text-xs font-mono font-bold text-stone-400 uppercase">
                Payment Gateway Response
              </div>
              <p className="text-xs text-stone-200">
                {activeBand.gatewayBehavior}
              </p>
            </div>

            <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-1.5">
              <div className="text-xs font-mono font-bold text-stone-400 uppercase">
                Risk Analyst &amp; Ops Workflow
              </div>
              <p className="text-xs text-stone-200">
                {activeBand.analystAction}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
