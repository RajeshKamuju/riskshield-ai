import React from 'react';
import { ArrowRight, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LandingFinalCTAProps {
  onExploreDashboard: () => void;
  onTrySimulator: () => void;
}

export function LandingFinalCTA({ onExploreDashboard, onTrySimulator }: LandingFinalCTAProps) {
  return (
    <section className="py-24 bg-[#063d2f] text-white relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/80 text-emerald-300 text-xs font-mono font-bold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>PRODUCTION-READY RISK ARCHITECTURE</span>
        </div>

        {/* Big Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Make every payment decision{' '}
          <span className="text-emerald-300 block sm:inline">explainable.</span>
        </h2>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Detect suspicious behaviour. Understand the risk. Act before it becomes a loss.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreDashboard}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          >
            <span>Explore Risk Dashboard</span>
            <ArrowRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onTrySimulator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-900/80 hover:bg-emerald-900 text-white font-semibold text-sm px-8 py-4 rounded-xl border border-emerald-700/80 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Try Risk Simulator</span>
          </button>
        </div>

        {/* Assurance Line */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-emerald-200/70">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Pre-Auth Evaluation (&lt;15ms)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Explainable Attribution</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Multi-Signal Defense Engine</span>
          </div>
        </div>

      </div>
    </section>
  );
}
