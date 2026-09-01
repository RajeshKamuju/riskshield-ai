import React, { useState } from 'react';
import { 
  HelpCircle, 
  ShieldAlert, 
  ShieldX, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Sparkles, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Fingerprint,
  Activity,
  Globe2
} from 'lucide-react';

export function LandingExplainableAI() {
  const [activeTab, setActiveTab] = useState<'explanation' | 'factors' | 'audit'>('explanation');

  return (
    <section className="py-24 bg-[#062c21] text-white border-b border-emerald-900/60 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Black-Box Decisioning Is A Liability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Don't just flag a transaction.{' '}
            <span className="text-emerald-300 block">Explain it.</span>
          </h2>
          <p className="mt-4 text-lg text-emerald-100/80 leading-relaxed">
            Machine learning models that cannot explain their reasoning create compliance blindspots and operational paralysis. RiskShield AI delivers 100% mathematical factor transparency for every basis point scored.
          </p>
        </div>

        {/* Explainable AI Visual Feature Card */}
        <div className="bg-stone-950 rounded-2xl border border-emerald-800/80 shadow-2xl overflow-hidden">
          
          {/* Card Top Navigation Tabs */}
          <div className="bg-stone-900/90 px-6 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-stone-200 uppercase tracking-wider">
                EXPLAINABLE AI ENGINE • TXN-92841
              </span>
            </div>

            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab('explanation')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'explanation'
                    ? 'bg-emerald-900 text-emerald-200 font-bold border border-emerald-700'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Rationale Overview
              </button>
              <button
                onClick={() => setActiveTab('factors')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'factors'
                    ? 'bg-emerald-900 text-emerald-200 font-bold border border-emerald-700'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Factor Attributions (+92)
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'audit'
                    ? 'bg-emerald-900 text-emerald-200 font-bold border border-emerald-700'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Compliance Audit Trail
              </button>
            </div>
          </div>

          {/* Main Inspection Grid */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Prominent Score & Level */}
            <div className="lg:col-span-4 bg-stone-900/80 p-6 sm:p-8 rounded-xl border border-stone-800 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono text-stone-400 uppercase tracking-wider font-semibold">
                  COMPOSITE RISK INDEX
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-6xl font-extrabold font-mono text-rose-500 tracking-tight">
                    92
                  </span>
                  <span className="text-xl font-mono text-stone-500 font-bold">/ 100</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block text-xs font-mono font-extrabold uppercase px-3 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    CRITICAL RISK
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 space-y-2">
                <div className="text-xs font-mono text-stone-400 uppercase font-semibold">
                  Recommended action
                </div>
                <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-base bg-rose-950/60 p-3 rounded-lg border border-rose-900">
                  <ShieldX className="w-5 h-5 shrink-0" />
                  <span>BLOCK / INVESTIGATE</span>
                </div>
                <p className="text-[11px] text-stone-400 font-sans">
                  Hard block payment at gateway level and auto-generate prioritized investigation case.
                </p>
              </div>
            </div>

            {/* Right: "Why was this flagged?" Explainable Factors */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold mb-1">
                  EXPLAINABLE AI REASONING
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Why was this transaction flagged?
                </h3>
              </div>

              {activeTab === 'explanation' && (
                <div className="space-y-3">
                  <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 flex items-start gap-3.5 hover:border-emerald-700/60 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-rose-950/80 text-rose-400 flex items-center justify-center shrink-0 border border-rose-800/80 mt-0.5">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        Amount is 8.4× the customer's historical average.
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5 font-sans">
                        Attempted value ₹75,000 exceeds the 30-day baseline average of ₹8,920 with a standard deviation Z-score of +3.8.
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 flex items-start gap-3.5 hover:border-emerald-700/60 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center shrink-0 border border-amber-800/80 mt-0.5">
                      <Fingerprint className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        New device detected.
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5 font-sans">
                        Zero prior sessions associated with canvas hash <span className="font-mono text-emerald-400">c88a7...f9</span>. Operating system declared as Linux on desktop user-agent.
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 flex items-start gap-3.5 hover:border-emerald-700/60 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-rose-950/80 text-rose-400 flex items-center justify-center shrink-0 border border-rose-800/80 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        6 attempts occurred within 3 minutes.
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5 font-sans">
                        High velocity burst exceeding the sliding window threshold of 2 attempts / 5 minutes on this customer VPA.
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 flex items-start gap-3.5 hover:border-emerald-700/60 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-rose-950/80 text-rose-400 flex items-center justify-center shrink-0 border border-rose-800/80 mt-0.5">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        IP has previous suspicious activity.
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5 font-sans">
                        Origin IP <span className="font-mono text-rose-400">185.220.101.99</span> matches confirmed Tor Exit Node blacklist and has 12 prior dispute incidents across payment switches.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'factors' && (
                <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-2 font-mono text-xs">
                  <div className="flex justify-between py-2 border-b border-stone-800">
                    <span className="text-stone-300">RULE_EXTREME_AMOUNT_ANOMALY (8.4x baseline)</span>
                    <span className="text-rose-400 font-bold">+20 pts</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-800">
                    <span className="text-stone-300">RULE_TRANSACTION_VELOCITY_BURST (6 / 180s)</span>
                    <span className="text-rose-400 font-bold">+25 pts</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-800">
                    <span className="text-stone-300">RULE_NEW_HARDWARE_FINGERPRINT (Unknown Linux)</span>
                    <span className="text-amber-400 font-bold">+15 pts</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-800">
                    <span className="text-stone-300">RULE_TOR_EXIT_NODE_RELAY (Confirmed Proxy)</span>
                    <span className="text-rose-400 font-bold">+20 pts</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-stone-300">RULE_GEO_TRANSIT_ANOMALY (Frankfurt / Mumbai)</span>
                    <span className="text-amber-400 font-bold">+12 pts</span>
                  </div>
                  <div className="pt-3 border-t border-stone-700 flex justify-between font-bold text-sm">
                    <span className="text-white">TOTAL ATTRIBUTION SCORE:</span>
                    <span className="text-rose-400">92 / 100</span>
                  </div>
                </div>
              )}

              {activeTab === 'audit' && (
                <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-2 text-xs font-mono">
                  <div className="text-emerald-400 font-bold">COMPLIANCE &amp; AUDIT LOG:</div>
                  <p className="text-stone-300 font-sans leading-relaxed">
                    Evaluated by RiskShield Engine Kernel v3.4.1 at 2026-09-01T08:50:00Z. Decision tree snapshot permanently archived for RBI &amp; card network dispute compliance.
                  </p>
                  <div className="bg-stone-950 p-3 rounded border border-stone-800 text-[11px] text-stone-400">
                    SHA256: 4b1f8e83f08992a014e7a781b0a887019de564177263b65287f311ef304e8d02
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
