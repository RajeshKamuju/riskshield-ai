import React, { useState } from 'react';
import { 
  Radar, 
  Binary, 
  HelpCircle, 
  Scale, 
  Search, 
  CheckCircle,
  ArrowRight,
  ArrowDown,
  Layers,
  Cpu,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface Stage {
  step: string;
  name: string;
  shortTitle: string;
  tagline: string;
  description: string;
  inputs: string[];
  output: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const STAGES: Stage[] = [
  {
    step: '01',
    name: 'DETECT',
    shortTitle: 'Multi-Signal Detection',
    tagline: 'Intercept checkout payloads in real-time',
    description: 'Captures raw payment telemetry across device fingerprint, IP proxy flags, card BIN metadata, customer transaction history, and geo coordinates within 2ms.',
    inputs: ['Device Canvas Hash', 'IP / Tor / VPN ASN', 'UPI / Card BIN Token', 'Cart Category & Amount'],
    output: 'Enriched Multi-Dimensional Signal Vector',
    icon: Radar,
    accentColor: 'text-emerald-700 bg-emerald-100 border-emerald-300',
  },
  {
    step: '02',
    name: 'SCORE',
    shortTitle: 'Composite Risk Scoring',
    tagline: 'Evaluate through dual rule & behavioral models',
    description: 'Processes signals against active merchant rules, customer 30-day velocity baselines, and gradient-boosted anomaly models to compute an objective 0–100 composite risk index.',
    inputs: ['Active Rule Weights', 'Customer Velocity Window', 'Anomaly Loss Functions', 'Merchant Risk Profile'],
    output: 'Precise 0–100 Score with Sub-Score Breakdown',
    icon: Binary,
    accentColor: 'text-teal-700 bg-teal-100 border-teal-300',
  },
  {
    step: '03',
    name: 'EXPLAIN',
    shortTitle: 'Explainable AI Rationale',
    tagline: 'Deconstruct exact mathematical reasons',
    description: 'Breaks the composite score down into transparent point attributions. Every point added or deducted is tied to a human-readable factor and concrete forensic evidence.',
    inputs: ['Factor Attribution Matrix', 'Deviation Multipliers', 'Historical Baseline Delta'],
    output: 'Explainable Factor List & Audit Trail',
    icon: HelpCircle,
    accentColor: 'text-amber-700 bg-amber-100 border-amber-300',
  },
  {
    step: '04',
    name: 'DECIDE',
    shortTitle: 'Sub-15ms Automated Decision',
    tagline: 'Deliver actionable gateway disposition',
    description: 'Translates risk scores into instantaneous gateway actions: frictionless APPROVE, passive MONITOR, step-up REVIEW, or hard BLOCK with zero checkout lag.',
    inputs: ['Configured Score Bands', 'Merchant Custom Overrides', 'Compliance Triggers'],
    output: 'APPROVE / MONITOR / REVIEW / BLOCK Response',
    icon: Scale,
    accentColor: 'text-stone-900 bg-stone-100 border-stone-300',
  },
  {
    step: '05',
    name: 'INVESTIGATE',
    shortTitle: 'Operations Case Workbench',
    tagline: 'Deep dive into flagged events & alerts',
    description: 'Critical and high-risk anomalies automatically populate prioritized alert queues and investigation cases with linked transactions, network graphs, and evidence timelines.',
    inputs: ['Auto-Generated Alerts', 'Linked Device / IP Clusters', 'Prior Chargeback Records'],
    output: 'Structured Investigation Case Dossier',
    icon: Search,
    accentColor: 'text-indigo-700 bg-indigo-100 border-indigo-300',
  },
  {
    step: '06',
    name: 'RESOLVE',
    shortTitle: 'Feedback & Rule Tuning',
    tagline: 'Close the loop with adaptive intelligence',
    description: 'Analyst determinations, customer confirmations, and chargeback outcomes feed directly back into rule tuning, threshold calibration, and machine learning retraining.',
    inputs: ['Analyst Disposition Verdict', 'Bank Chargeback Webhooks', 'Customer Confirmation SMS'],
    output: 'Calibrated Rules & Zero Drift Model Updates',
    icon: CheckCircle,
    accentColor: 'text-emerald-700 bg-emerald-100 border-emerald-300',
  },
];

export function LandingSolutionWorkflow() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = STAGES[activeStageIndex];

  return (
    <section id="risk-intelligence" className="py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>End-to-End Decisioning Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            One intelligence layer{' '}
            <span className="text-emerald-900 block">for payment risk.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            From the millisecond a buyer taps "Pay Now" to final case resolution, RiskShield AI unifies real-time scoring, transparent factor explanations, and forensic case operations into a single continuous intelligence workflow.
          </p>
        </div>

        {/* Visual Workflow Steps Bar (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStageIndex === idx;
            return (
              <button
                key={stage.name}
                onClick={() => setActiveStageIndex(idx)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30'
                    : 'bg-white text-stone-800 border-stone-200/90 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-emerald-400' : 'text-stone-500'
                      }`}
                    />
                  </div>
                  <div
                    className={`font-mono font-extrabold text-sm tracking-wider uppercase ${
                      isSelected ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {stage.name}
                  </div>
                  <div
                    className={`text-xs mt-1 font-medium line-clamp-1 ${
                      isSelected ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    {stage.shortTitle}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-current/10 flex items-center justify-between text-[10px] font-mono font-semibold">
                  <span>Phase {idx + 1}/6</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Card */}
        <div className="bg-white rounded-2xl border border-stone-300 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded bg-stone-900 text-white">
                  STEP {activeStage.step}
                </span>
                <span className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-800">
                  {activeStage.name} — {activeStage.shortTitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {activeStage.tagline}
              </h3>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {activeStage.description}
              </p>

              {/* Inputs & Output */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80">
                  <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-2">
                    Key Inputs Processed
                  </div>
                  <ul className="space-y-1.5">
                    {activeStage.inputs.map((input, i) => (
                      <li key={i} className="text-xs text-stone-700 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>{input}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-950 text-white p-4 rounded-xl border border-emerald-900 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      Stage Deliverable
                    </div>
                    <div className="text-sm font-semibold text-stone-100">
                      {activeStage.output}
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Deterministic &amp; Auditable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stage Visual Representation */}
            <div className="lg:col-span-5 bg-stone-900 text-white p-6 rounded-xl border border-stone-800 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="text-xs font-mono text-stone-400">ENGINE EXECUTION STACK</div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Visual Pipeline Stack */}
              <div className="space-y-2 font-mono text-xs">
                {STAGES.map((s, idx) => (
                  <div
                    key={s.step}
                    className={`flex items-center justify-between p-2 rounded transition-all ${
                      activeStageIndex === idx
                        ? 'bg-emerald-900/60 border border-emerald-500/50 text-white font-bold'
                        : activeStageIndex > idx
                        ? 'bg-stone-800/40 text-stone-400'
                        : 'bg-stone-950/40 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-stone-500">{s.step}</span>
                      <span>{s.name}</span>
                    </div>
                    <span className="text-[10px]">
                      {activeStageIndex === idx
                        ? '● EXECUTING'
                        : activeStageIndex > idx
                        ? '✓ PASSED'
                        : '○ QUEUED'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center text-[11px] font-mono text-stone-400">
                End-to-End Latency Target: &lt; 15 milliseconds
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
